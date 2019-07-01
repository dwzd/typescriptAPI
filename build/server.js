"use strict";
// console.log("这儿是 node typescript api");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
// import {DataJson} from './data/data';
const apiGetPosts_1 = require("./api/posts/apiGetPosts");
const apiGetPostDetail_1 = require("./api/posts/apiGetPostDetail");
const apiCreatePost_1 = require("./api/posts/apiCreatePost");
const apiDeletePost_1 = require("./api/posts/apiDeletePost");
const apiUpdatePost_1 = require("./api/posts/apiUpdatePost");
const apiUploadImage_1 = require("./api/posts/apiUploadImage");
const errorHanding_1 = require("./api/general/errorHanding");
const message_1 = require("./model/shared/message");
const apiDownloadImage_1 = require("./api/posts/apiDownloadImage");
const app = express_1.default();
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
const authenticator = (req, res, next) => {
    const userName = "DarwinZh";
    req.user = userName;
    next();
};
app.use(authenticator);
const logger = (req, res, next) => {
    console.log("用户：" + req.user + " " +
        new Date() + ' - ' + req.method + ' - ' + ' This one Request to ' + req.path);
    next();
};
app.use(logger);
// console.log(JSON.parse(JSON.stringify(DataJson.posts)));
//static give the "path"
app.use('/static', express_1.default.static(path_1.default.resolve('./', 'public', 'img')));
//解决跨域的问题
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Alllow-Methods': 'GET, POST, PUT, PATCH, DELETE'
    });
    next();
});
//routes
app.get('/', (req, res, next) => {
    res.send('node typescript api 在工作！!!');
});
app.get('/posts', apiGetPosts_1.apiGetPosts);
app.get("/posts/:id", apiGetPostDetail_1.apiGetPostDetail);
app.post('/posts', apiCreatePost_1.apiCreatePost);
app.delete('/posts/:id', apiDeletePost_1.apiDeletePost);
app.put("/posts/:id", apiUpdatePost_1.apiUpdatePost);
//upload 图片
app.post('/posts/:id/img', apiUploadImage_1.apiUploadImage);
//处理错误信息
app.use(errorHanding_1.apiErrorHandler);
app.use((req, res, next) => {
    if (req.accepts('application/json')) {
        next();
    }
    else {
        next(new message_1.ApiError("Content Type not supported", "This API only supports application/json", 400));
    }
});
app.get('/headers', (req, res, next) => {
    res.json(req.headers);
});
app.post('/headers', (req, res, next) => {
    res.json(req.headers);
});
app.get('/static/download/:id', apiDownloadImage_1.apiDownloadImage);
app.disable("x-powered-by");
app.listen(process.env.PORT || 7099, () => {
    console.log('服务器启动了......');
});
