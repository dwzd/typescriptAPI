"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
// import {PostSummary} from "../../model/shared/postSummary"
const postDetail_1 = require("../../model/shared/postDetail");
exports.apiGetPostDetail = (req, res) => {
    const selectPost = data_1.DataJson.posts.find((ele) => ele.id == req.params.id);
    if (selectPost) {
        const selectedTodos = data_1.DataJson.todos.filter((item) => (item.postId == req.params.id));
        const imgURLs = selectPost.img.map((it) => {
            if (req.app.get('env') == "development") {
                return "http://localhost:7099/static/" + it;
            }
            else {
                return "https://www.google.com" + it;
            }
        });
        console.log(req.app.get("env"));
        res.json(new postDetail_1.PostDetail(selectPost, selectedTodos, imgURLs));
    }
    else {
        res.status(404).json({ status: 'failed', message: '找不到！' });
    }
    // DataJson.posts.forEach((item: any) => {
    //     if(item.id == req.params.id){
    //         res.json(new PostSummary(item));
    //     }
    // });
};
