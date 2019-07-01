"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import uuidv4 from 'uuid/v4';
const data_1 = require("../../data/data");
const static_1 = require("../general/static");
exports.apiUploadImage = (req, res) => {
    const postIndex = data_1.DataJson.posts.findIndex((item) => item.id == req.params.id);
    console.log(postIndex);
    if (postIndex == -1) {
        //没有找到
        res.status(404).json({ status: 'error', message: 'Did not find photo!' });
    }
    else {
        //上传图片
        const upload = static_1.getFileUpload(req.app.get('env'));
        upload(req, res, err => {
            if (err) {
                console.log(err);
                res.status(404).json({ status: 'error!', message: 'File upload failed!' });
            }
            else {
                console.log(req.file.filename);
                data_1.DataJson.posts[postIndex].img.push(req.file.filename);
                res.status(200).json({ status: 'succeefully', message: "Be uploaded successfully!" });
            }
        });
    }
};
