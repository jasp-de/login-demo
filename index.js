// index.js
import express from "express";
import path from "path";

// Reads the PORT value from the environment variable `PORT`.
// If not found, uses the default value of 3000.
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const dirName = path.dirname(new URL(import.meta.url).pathname);

// GET HOMEPAGE
app.get("/", function (req, res) {
  console.log("serving index.html...");
  const dirName = path.dirname(new URL(import.meta.url).pathname);
  res.sendFile(path.join(dirName, "/index.html"));
});

// GET ECHO MESSAGE
app.get("/echo/:message", (req, res) => {
  const message = req.params.message;
  if (message === "secret") {
    res.send("The secret is... 42!");
  } else {
    res.json({
      message: message,
    });
  }
});

//GET LOGIN PAGE
app.get("/login", (req, res) => {
  const dirName = path.dirname(new URL(import.meta.url).pathname);
  res.sendFile(path.join(dirName, "/loginPage.html"));
});

// LOGIN FORM
app.post("/login", (req, res) => {
  console.log("Login attempt:", req.body);
  const userData = req.body;
  const dirName = path.dirname(new URL(import.meta.url).pathname);

  if (
    userData.password === "very-secret" &&
    userData.email === "user@email.com"
  ) {
    res.redirect("/myAccount");
  } else {
    res.status(401).redirect("/loginError");
  }
});

// Login Succes Page
app.get("/myAccount", (req, res) => {
  const dirName = path.dirname(new URL(import.meta.url).pathname);
  res.sendFile(path.join(dirName, "/accountPage.html"));
});

// Login Fail Page
app.get("/loginError", (req, res) => {
  const dirName = path.dirname(new URL(import.meta.url).pathname);
  res.sendFile(path.join(dirName, "/errorPage.html"));
});
