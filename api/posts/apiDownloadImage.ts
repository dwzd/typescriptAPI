import { RequestHandler } from "express";
import path from "path";
import { ApiError } from "../../model/shared/message";

export const apiDownloadImage: RequestHandler = (req, res, next) => {
    const fileID = req.params.id;
    res.download(path.resolve('./', 'public', 'img', fileID), err => {
        if (err) {
            next(
                new ApiError('Download failed!', "Can't download requested photo", 400)
            );
        }
    });
    
}