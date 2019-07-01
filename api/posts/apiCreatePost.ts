
import {RequestHandler} from 'express';
import uuidv4 from 'uuid/v4';
import { DataJson } from '../../data/data';
import { NewPost } from '../../interface/newPost';
import { ApiError, PublicInfo } from '../../model/shared/message';


export const apiCreatePost: RequestHandler = (req, res, next) => {
    // console.log(req.body);
    const requireFields = ["title", "body"];
    const givenField = Object.getOwnPropertyNames(req.body);
    if(!requireFields.every(fie => givenField.includes(fie))){
        return next(new ApiError("数据缺失", "Not all required fields supplied", 400));
    }

    const newPost: NewPost = {
        id: uuidv4(),
        userId: req.body.userId || 1,
        title: req.body.title,
        body: req.body.body,
        price: req.body.price,
        currency: req.body.currency,
        img: []
    };

    DataJson.posts.push(newPost);
    // res.send("newPost 添加数据成功！");
    // res.json(newPost);
    res.json(new PublicInfo("Post success", 200, {post: newPost}));

};


    

