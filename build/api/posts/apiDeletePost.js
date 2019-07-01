"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const message_1 = require("../../model/shared/message");
exports.apiDeletePost = (req, res) => {
    // console.log(req.params.id);
    const postIndex = data_1.DataJson.posts.findIndex((item) => item.id == req.params.id);
    if (postIndex > -1) {
        data_1.DataJson.posts.splice(postIndex, 1);
        // res.status(200).json({status: "!", message: "Delete successfully!"});
        res.json(new message_1.PublicInfo("Successfully deleted!", 200));
    }
    else {
        // res.status(404).json({status: "Failed!", message: "Delete failed!"});
        res.json(new message_1.ApiError("Delete failed!", "Failed", 400));
    }
};
