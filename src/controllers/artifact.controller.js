const Artifact = require("../models/artifact.model");

// Create a new artifact
exports.createArtifact = async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ message: "Request body is missing" });

        const artifact = await Artifact.create({
            ...req.body,
            createdBy: req.user.id,
        });
        res.status(201).json(artifact);
    } catch (err) {
        console.error("Error creating artifact:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// Get all artifacts
exports.getArtifacts = async (req, res) => {
    try {
        const artifacts = await Artifact.find().populate("createdBy", "email");
        res.json(artifacts);
    } catch (err) {
        console.error("Error fetching artifacts:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// Like an artifact
exports.likeArtifact = async (req, res) => {
    try {
        const artifact = await Artifact.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likes: req.user.id } }, // $addToSet prevents duplicate likes
            { new: true }
        );

        if (!artifact) return res.status(404).json({ message: "Artifact not found" });

        res.json(artifact);
    } catch (err) {
        console.error("Error liking artifact:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// Comment on an artifact
exports.commentArtifact = async (req, res) => {
    try {
        if (!req.body.text) return res.status(400).json({ message: "Comment text is required" });

        const artifact = await Artifact.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: { user: req.user.id, text: req.body.text } } },
            { new: true }
        );

        if (!artifact) return res.status(404).json({ message: "Artifact not found" });

        res.json(artifact);
    } catch (err) {
        console.error("Error commenting on artifact:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};