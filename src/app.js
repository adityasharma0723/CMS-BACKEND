const express = require("express")
const cors = require("cors");
const morgan = require("morgan");
const app = express();
// cors:-cross origin resource sharing
//       CORS controls who can access your backend from the browser.
// morgan:-HTTP request logger middleware
//         it logs every HTTP request that comes to your server.
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("CMS API Running"));

app.use("/api/auth", require("./routes/auth.routes.js"))
app.use("/api/artifact", require("./routes/artifact.routes.js"))

module.exports = app;