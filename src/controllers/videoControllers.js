const videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 4,
    comments: 3,
    createdAt: "10 minutes ago",
    views: 108,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 2,
    comments: 1,
    createdAt: "20 minutes ago",
    views: 210,
    id: 3,
  },
];
export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};
export const search = (req, res) => res.send("Search");

export const watch = (req, res) => {
  const id = req.params.id;
  const video = videos[id - 1];
  res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const id = req.params.id;
  const video = videos[id - 1];
  res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req, res) => {
  const newVideo = {
    title: req.body.title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
export const remove = (req, res) => res.send("Remove Videos");
