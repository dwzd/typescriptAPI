import {DataJson} from '../../data/data';
import {RequestHandler} from 'express';
import {PostSummary} from "../../model/shared/postSummary"


export const apiGetPosts: RequestHandler = (req, res) => {
    res.json(DataJson.posts.map((item: any) => 
        new PostSummary(item)
    ));
};

