const express = require("express");
const app = express();
const proxy = require('express-http-proxy');

let token;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0


app.use('/', proxy('https://test-dev.motiw.ru',{
    userResHeaderDecorator: (hdrs) => {
        let newToken = hdrs["set-cookie"];
        if(newToken) {
            token = newToken;
            console.log(token);
        }
        return hdrs;
    },
    proxyReqOptDecorator: (reqOpts) => {
        if(token) reqOpts.headers.cookie = token;
        return reqOpts;
    },
}))
   

app.listen(4000,  (err)=> {
   err? console.log(err) : console.log("Сервер запущен...")
});
  

