const express = require("express");
const app = express();
const proxy = require('express-http-proxy');
//попробовать передать ещлут на клиент через что-то (что? хедер не видит, осталось боди)
let token; //пока так

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0


app.use('/', proxy('https://test-dev.motiw.ru',{
    userResHeaderDecorator: (hdrs) => {
        // let token = hdrs["set-cookie"];
        // if(token) hdrs.token = token;
        let newToken = hdrs["set-cookie"];
        if(newToken) {
            token = newToken;
            console.log(token);
        }
        return hdrs;
    },
    proxyReqOptDecorator: (reqOpts) => {
        // reqOpts.headers.cookie = ['PHPSESSID=eskpn75cu9kfpe4hpdvjhu90lv; path=/'];
        // let token = reqOpts.headers.token;
        if(token) reqOpts.headers.cookie = token;
        return reqOpts;
    },
}))
   

app.listen(4000,  (err)=> {
   err? console.log(err) : console.log("Сервер запущен...")
});
  

