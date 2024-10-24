// index.js
import express from "express";
import path from "path";

// Reads the PORT value from the environment variable `PORT`.
// If not found, uses the default value of 3000.
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

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
