import {DataJson} from '../../data/data';
import {RequestHandler} from 'express';
// import {PostSummary} from "../../model/shared/postSummary"
import { PostDetail } from "../../model/shared/postDetail";

export const apiGetPostDetail: RequestHandler = (req, res) => {
    const selectPost = DataJson.posts.find(
        (ele: any) => ele.id == req.params.id
    );
    if(selectPost){
        const selectedTodos = DataJson.todos.filter((item: any) => 
            (item.postId == req.params.id)
        );
        const imgURLs = selectPost.img.map((it: string) => {
            if(req.app.get('env') == "development"){
                return "http://localhost:7099/static/" + it;
            }else{
                return "https://www.google.com" + it;
            }
        });

        console.log(req.app.get("env"));
        
        res.json(new PostDetail(selectPost, selectedTodos, imgURLs));
    }else{
        res.status(404).json({status: 'failed', message: '找不到！'});
    }

    // DataJson.posts.forEach((item: any) => {
    //     if(item.id == req.params.id){
    //         res.json(new PostSummary(item));
    //     }
    // });
}