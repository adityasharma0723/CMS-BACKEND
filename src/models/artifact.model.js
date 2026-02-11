const mongoose = require("mongoose");
const artifactSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                text: String,
            }
        ],
    },
    { timestamps: true },
);
module.exports = mongoose.model("Artifact", artifactSchema);