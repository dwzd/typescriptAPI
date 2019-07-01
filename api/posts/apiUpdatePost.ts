
import {RequestHandler} from 'express';
// import uuidv4 from 'uuid/v4';
import { DataJson } from '../../data/data';
import { NewPost } from '../../interface/newPost';


export const apiUpdatePost: RequestHandler = (req, res) => {
    // console.log(req.body);
    const postIndex = DataJson.posts.findIndex((item: any) => item.id == req.params.id);
    if(postIndex > -1){
        const originPost = DataJson.posts[postIndex];
        const updatePost: NewPost = {
            id: req.params.id,
            userId: req.body.userId || originPost.userId,
            title: req.body.title || originPost.title,
            body: req.body.body || originPost.body,
            price: req.body.price || originPost.price,
            currency: req.body.currency || originPost.currency,
            img: originPost.img
        };

        //更新数据
        DataJson.posts[postIndex] = updatePost;
        res.status(200).json({status:"It's success!", message:"Wonderful! updated!"});
    }else{
        res.status(404).json({status:"It's failed!", message:"Oh, come on!"});
    }   
        

};


    

