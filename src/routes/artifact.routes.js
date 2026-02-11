const router = require("express").Router();
const ctrl = require("../controllers/artifact.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/create", auth, ctrl.createArtifact);
router.get("/get", auth, ctrl.getArtifacts);

// Like
router.post("/like/:id", auth, ctrl.likeArtifact);
router.get("/like/:id", auth, ctrl.likeArtifact);

// Comment
router.post("/comment/:id", auth, ctrl.commentArtifact);
router.get("/comment/:id", auth, ctrl.commentArtifact);

module.exports = router;

































// const express = require("express");
// const router = express.Router();
// const { createArtifact, getArtifacts, getArtifactById, updateArtifact, deleteArtifact } = require("../controllers/artifact.controller");
// const { verifyToken } = require("../middlewares/auth.middleware");

// // Protect all routes
// router.use(verifyToken);

// router.post("/create", createArtifact);
// router.get("/", getArtifacts);
// router.post("/like/:id", likeArtifact);
// router.get("/like/:id", )
// router.post("/comment/:id", commentArtifact);
// router.get("/comment/:id", getArtifactById);
// router.get("/:id", getArtifactById);


// module.exports = router;


// {
//     "title": "My first artifact",
//     "description": "This is a test",
//     "createdBy": "698aeef965e87e65bcb8f913",
//     "_id": "698c030f104fdd00c82b8fb5",
//     "createdAt": "2026-02-11T04:18:23.981Z",
//     "updatedAt": "2026-02-11T04:18:23.981Z",
//     "__v": 0
// }