import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("users/join", { pageTitle: "JOIN" });

export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  if (password !== password2) {
    req.flash("error", "비밀번호가 일치하지 않습니다.");
    return res.status(400).render("users/join", {
      pageTitle: "JOIN",
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    req.flash("error", "이미 존재하는 닉네임/이메일 입니다..");
    return res.status(400).render("users/join", {
      pageTitle: "JOIN",
      errorMessage: "이미 존재하는 닉네임/이메일 입니다.",
    });
  }
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    req.flash("error", "계정 생성에 실패하였습니다.");
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) => {
  return res.render("users/login", { pageTitle: "LOGIN" });
};
export const postLogin = async (req, res) => {
  const pageTitle = "LOGIN";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    req.flash("error", "존재하지 않는 username입니다.");
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "존재하지 않는 Username 입니다.",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    req.flash("error", "비밀번호가 일치하지 않습니다.");
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_WETUBE_TOKEN,
    client_secret: process.env.GH_CLIENT_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({
      email: emailObj.email,
    });
    if (!user) {
      user = await User.create({
        name: userData.name,
        email: emailObj.email,
        username: userData.login,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const getEdit = (req, res) =>
  res.render("users/edit-profile", { pageTitle: "Edit Profile" });

export const postEdit = async (req, res) => {
  const pageTitle = "Edit Profile";
  const {
    session: {
      user,
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;
  const existsUsername = await User.findOne({ username });
  if (user.username !== username && existsUsername) {
    req.flash("error", "이미 존재하는 username입니다.");
    return res.render("users/edit-profile", {
      pageTitle,
      errorMessage: "이미 있는 Username입니다.",
    });
  }
  const existsEmail = await User.findOne({ email });
  if (user.email !== email && existsEmail) {
    req.flash("error", "이미 존재하는 email입니다.");
    return res.render("users/edit-profile", {
      pageTitle,
      errorMessage: "이미 있는 Email입니다.",
    });
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "소셜 로그인 유저는 비밀번호를 변경할 수 없습니다.");
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { oldPassword, newPassword, checkPassword },
  } = req;
  if (newPassword !== checkPassword) {
    req.flash("error", "비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errorMessage: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    });
  }
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    req.flash("error", "기본 비밀번호가 일치하지 않습니다.");
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errorMessage: "기존 비밀번호가 일치하지 않습니다.",
    });
  }
  user.password = newPassword;
  await user.save();
  req.flash("info", "비밀번호 변경이 완료되었습니다.");
  return res.redirect("profile");
};

export const remove = (req, res) => res.send("Remove User");

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  if (!user) {
    return res
      .status(400)
      .render("404", { pageTitle: "존재하지 않는 user입니다." });
  }
  return res.render("users/profile", {
    pageTitle: user.name,
    user,
  });
};

export const logout = (req, res) => {
  req.session.user = null;
  res.locals.loggedInUser = req.session.user;
  req.session.loggedIn = false;
  req.flash("info", "로그아웃 완료");
  return res.redirect("/");
};
