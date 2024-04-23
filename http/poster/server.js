const Requests = require("./requests");

const PORT = 8050;
const server = new Requests();

const USERS = [
  { id: 1, name: "John Doe", username: "johndoe", password: "password" },
  { id: 2, name: "Jane Doe", username: "janedoe", password: "password" },
  { id: 3, name: "Jim Doe", username: "jimdoe", password: "password" },
];

const POSTS = [
  { id: 1, title: "Post 1", body: "This is post 1", userId: 1 },
  { id: 2, title: "Post 2", body: "This is post 2", userId: 2 },
  { id: 3, title: "Post 3", body: "This is post 3", userId: 3 },
];

const SESSIONS = [];

// Files Routes
server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/style.css", (req, res) => {
  res.sendFile("./public/style.css", "text/css");
});

server.route("get", "/script.js", (req, res) => {
  res.sendFile("./public/script.js", "text/javascript");
});

server.route("get", "/login", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/profile", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});
// API Routes
server.route("get", "/api/posts", (req, res) => {
  const posts = POSTS.map(post => {
    const user = USERS.find(user => user.id === post.userId);
    return { ...post, author: user.name };
  });

  res.status(200).json(posts);
});

server.route("post", "/api/login", (req, res) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", () => {
    body = JSON.parse(body);

    const user = USERS.find(user => user.username === body.username && user.password === body.password);

    const token = Math.floor(Math.random() * 1000000).toString();

    if (user) {
      SESSIONS.push({ token: token, userId: user.id });

      // set cookie
      res.setHeader("Set-Cookie", `token=${token}; Path=/;`);
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

server.route("get", "/api/user", (req, res) => {
  const token = req.headers.cookie.split("=")[1];
  const session = SESSIONS.find(session => session.token === token);

  if (session) {
    const user = USERS.find(user => user.id === session.userId);
    res.status(200).json({ username: user.username, name: user.name });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// server.route("get", "/upload", (req, res) => {
//   res.status(200).sendFile("upload.html");
// });

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
