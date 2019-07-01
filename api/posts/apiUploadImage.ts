
import {RequestHandler} from 'express';
// import uuidv4 from 'uuid/v4';
import { DataJson } from '../../data/data';
import { NewPost } from '../../interface/newPost';
import { getFileUpload } from '../general/static';


export const apiUploadImage: RequestHandler = (req, res) => {
    const postIndex = DataJson.posts.findIndex((item: any) => item.id == req.params.id);
    
    console.log(postIndex);
    if(postIndex == -1){
        //没有找到
        res.status(404).json({status: 'error', message: 'Did not find photo!'});
    }else{
        //上传图片
        const upload = getFileUpload(req.app.get('env'));
        upload(req, res, err => {
            if (err){
                console.log(err);
                res.status(404).json({status: 'error!', message: 'File upload failed!'});
            }else{
                console.log(req.file.filename);
                DataJson.posts[postIndex].img.push(req.file.filename);
                res.status(200).json({status: 'succeefully', message: "Be uploaded successfully!"});
            }
        })
        
    }   
        

};


    

