import {DataJson} from '../../data/data';
import {RequestHandler} from 'express';
import { PublicInfo, ApiError } from '../../model/shared/message';


export const apiDeletePost: RequestHandler = (req, res) => {
    // console.log(req.params.id);

    const postIndex = DataJson.posts.findIndex(
        (item: any) => item.id == req.params.id
    );
    if(postIndex > -1){
        DataJson.posts.splice(postIndex, 1);
        // res.status(200).json({status: "!", message: "Delete successfully!"});
        res.json(new PublicInfo("Successfully deleted!", 200 ));
    }else{
        // res.status(404).json({status: "Failed!", message: "Delete failed!"});
        res.json(new ApiError("Delete failed!", "Failed", 400));
    }
};

