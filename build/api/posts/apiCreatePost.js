"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const data_1 = require("../../data/data");
const message_1 = require("../../model/shared/message");
exports.apiCreatePost = (req, res, next) => {
    // console.log(req.body);
    const requireFields = ["title", "body"];
    const givenField = Object.getOwnPropertyNames(req.body);
    if (!requireFields.every(fie => givenField.includes(fie))) {
        return next(new message_1.ApiError("数据缺失", "Not all required fields supplied", 400));
    }
    const newPost = {
        id: v4_1.default(),
        userId: req.body.userId || 1,
        title: req.body.title,
        body: req.body.body,
        price: req.body.price,
        currency: req.body.currency,
        img: []
    };
    data_1.DataJson.posts.push(newPost);
    // res.send("newPost 添加数据成功！");
    // res.json(newPost);
    res.json(new message_1.PublicInfo("Post success", 200, { post: newPost }));
};
