# 单应用开发

只需要在框架的配置文件 `{app_root}/config/config.default.js` 中配置即可

```js
exports.echat = {
    cache: {
        flag: 'echat', //此处可自行更改，主要在采用文件存储accessToken时，为了区别不同的企业，如果只有一个企业则可忽略
        // driver: 'redis' //此处可配置缓存accessToken的驱动，目前支持文件【默认】和redis，采用redis时，需要安装egg-redis插件
    },
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
    },
};
```