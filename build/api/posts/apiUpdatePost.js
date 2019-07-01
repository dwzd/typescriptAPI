"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import uuidv4 from 'uuid/v4';
const data_1 = require("../../data/data");
exports.apiUpdatePost = (req, res) => {
    // console.log(req.body);
    const postIndex = data_1.DataJson.posts.findIndex((item) => item.id == req.params.id);
    if (postIndex > -1) {
        const originPost = data_1.DataJson.posts[postIndex];
        const updatePost = {
            id: req.params.id,
            userId: req.body.userId || originPost.userId,
            title: req.body.title || originPost.title,
            body: req.body.body || originPost.body,
            price: req.body.price || originPost.price,
            currency: req.body.currency || originPost.currency,
            img: originPost.img
        };
        //更新数据
        data_1.DataJson.posts[postIndex] = updatePost;
        res.status(200).json({ status: "It's success!", message: "Wonderful! updated!" });
    }
    else {
        res.status(404).json({ status: "It's failed!", message: "Oh, come on!" });
    }
};
