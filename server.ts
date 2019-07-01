// console.log("这儿是 node typescript api");

import express from 'express';
import {RequestHandler} from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// import {DataJson} from './data/data';
import { apiGetPosts } from './api/posts/apiGetPosts';
import { apiGetPostDetail } from './api/posts/apiGetPostDetail';
import { apiCreatePost } from './api/posts/apiCreatePost';
import { apiDeletePost } from './api/posts/apiDeletePost';
import { apiUpdatePost } from './api/posts/apiUpdatePost';
import { CustomerRequestHandler } from './interface/express';
import { apiUploadImage } from './api/posts/apiUploadImage';
import { apiErrorHandler } from './api/general/errorHanding';
import { ApiError } from './model/shared/message';
import { apiDownloadImage } from './api/posts/apiDownloadImage';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

const authenticator: CustomerRequestHandler = (req, res, next) => {
    const userName = "DarwinZh";
    req.user = userName;

    next();
}
app.use(authenticator);

const logger: CustomerRequestHandler = (req, res, next) => {
    console.log(
        "用户：" + req.user + " " +
        new Date() + ' - ' + req.method + ' - ' + ' This one Request to ' + req.path);

    next();
};

app.use(logger);

// console.log(JSON.parse(JSON.stringify(DataJson.posts)));

//static give the "path"
app.use('/static', express.static(path.resolve('./', 'public', 'img')));

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

app.get('/posts', apiGetPosts);

app.get("/posts/:id", apiGetPostDetail);

app.post('/posts', apiCreatePost);

app.delete('/posts/:id', apiDeletePost);

app.put("/posts/:id", apiUpdatePost);

//upload 图片
app.post('/posts/:id/img', apiUploadImage);

//处理错误信息
app.use(apiErrorHandler);

app.use((req, res, next) => {
    if (req.accepts('application/json')){
        next();
    }else {
        next(
            new ApiError("Content Type not supported", "This API only supports application/json", 400)
        )
    }
})

app.get('/headers', (req, res, next) => {
    res.json(req.headers)
})

app.post('/headers', (req, res, next) => {
    res.json(req.headers)
})

app.get('/static/download/:id', apiDownloadImage);

app.disable("x-powered-by");

app.listen(process.env.PORT || 7099, () => {
    console.log('服务器启动了......');
}); 
 

