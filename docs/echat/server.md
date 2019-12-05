# 服务端

配置服务器消息设置时，需要配置 `token` 和 `aes key` 配置到agent的对应的配置中：   
```js
let config = {
    CorpInfo: {
        ApiUrl: 'http://1.2.3.4:8082', //请勿带 " / "
        CorpID: 'wl47sadasw3w', //找到对应的企业ID
        OauthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize', //网页授权链接，一般不需要改变
    },
    AgentInfo: {
        AgentId: 1000177,
        AgentSecret: 'yIgAOVx0XDla6Qka_81pbHZ6BPoLPXyZFSKUTCBqeN4',
        token: 'TDkvYZyk',
        EncodingAESKey: 'XxIctVYOTgowmJdXliwvCMiFZH9LICQQvcLYGGe8rSS',
        oauth: {
            // scopes: 'snsapi_userinfo',  //  snsapi_base | snsapi_userinfo | snsapi_privateinfo , 
            // redirect_uri: '' //框架内一般不用填写，中间件可自动获取当前的页面，也可自定义
        }
    }
}


const echat = this.ctx.echat(config);
```
其他的使用方法和入门讲解的示例相同：


```js
const response = await echat.server().send();

this.ctx.body = response; //eggjs 需要返回响应给微信（企业微信）服务器对应的明文
```
此处详细的使用方法，查看 [快速入门](/echat/index.md) 的实例讲解。
