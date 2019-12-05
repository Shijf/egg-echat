开发网页授权的时候，最好先了解 `oAuth2` 的相关理论， 关于企业微信详细的授权过程如下图（来自官方文档）：

![Oauth2授权过程](./images/oauth.png "Oauth2授权过程")   

时间紧急来不及研究，也没有问题，插件内部已经实现好了，只需要配置一下就可以啦，so easy！！！

原理：eggjs中间件实现，中间的用法可参考 `eggjs` 文档 [中间件](eggjs.org/zh-cn/basics/middleware.html#使用中间件) 部分。

示例讲解：

如果全局需要网页授权，则需要在配置文件中配置，如果仅仅是在某几个请求路径需要授权，则只需要在路由配置中应用即可：

`{app_root}/app/router.js`

```js
module.exports = app => {
  const echatOauth2 = app.middleware.echatOauth2(); //此处配置中间件
  const { router, controller } = app;
  ...
  router.get('/oauth2', echatOauth2, controller.home.oauth2); //在oauth2中应用
  ...
};

```
在配置中需要配置相关的 `scope`,默认为：`snsapi_base`,此配置只能拿到基本信息，详见企业微信文档。在控制器中拿到授权信息：

`{app_root}/app/controller.home.js`

```js
const echat = await this.ctx.echat();
//请注意，不要将项目中的session都设置ctx.session 中，否则会覆盖，在平时开发中，也应该在session中对应自己的项目名称。如：存session时应为 ctx.session.projectName = {a: 1; b: 2}
let userInfo = await this.ctx.session.echat;

console.log(userInfo); 

//"userid":"USERID",
//"deviceid":"DEVICEID",
//"user_ticket": "USER_TICKET"，
//"expires_in":7200,
//"usertype":2,
```

可通过:   
`userInfo.userid` 获取用户id      
`userInfo.deviceid` 获取用户设备id   
`userInfo.usertype` 获取用户类型  -->【成员身份信息，2：超级管理员, 4:分级管理员，5：普通成员】   

下列的信息，需要将 `scope` 为 `snsapi_userinfo`，此设置，不包括手机和信箱，如果设置为 `snsapi_privateinfo`,则无限制获取   

`userInfo.name` 获取用户姓名      
`userInfo.mobile` 获取用户手机号   
`userInfo.avatar` 获取用户头像   
`userInfo.email` 获取用户头像   
`userInfo.gender` 获取用户性别  -->【0表示未定义，1表示男性，2表示女性】   

`userInfo.original` 获取企业微信原始的返回数据






