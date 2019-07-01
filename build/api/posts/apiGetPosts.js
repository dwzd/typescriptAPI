"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const postSummary_1 = require("../../model/shared/postSummary");
exports.apiGetPosts = (req, res) => {
    res.json(data_1.DataJson.posts.map((item) => new postSummary_1.PostSummary(item)));
};
