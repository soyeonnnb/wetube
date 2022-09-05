export const home = (req, res) => {
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
  res.render("home", { pageTitle: "Home", videos });
};
export const search = (req, res) => res.send("Search");

export const see = (req, res) => res.send("see Videos");
export const upload = (req, res) => res.send("Upload Videos");
export const remove = (req, res) => res.send("Remove Videos");
export const edit = (req, res) => res.send("Edit Videos");
