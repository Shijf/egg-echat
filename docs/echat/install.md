# 安装

#### 环境要求

> - [Node.js](https://nodejs.org/zh-cn/): >= 8.0.0
> - [egg-js](http://php.net/manual/en/book.curl.php): >= 2.x

#### 使用 [npm](https://www.npmjs.com/package/npm):

```bash
$ npm i egg-echat --save
```

## 在框架中启用配置

`{app_root}/config/plugin.js`

```js
exports.echat = {
  enable: true,
  package: 'egg-echat'
};
```

## 配置

`{app_root}/config/config.default.js`

```js
config.echat = {
  cache: {
    flag: 'echat' //此处可自行更改，主要在采用文件存储accessToken时，为了区别不同的企业，如果只有一个企业则可忽略
    // driver: 'redis' //此处可配置缓存accessToken的驱动，目前支持文件【默认】和redis，采用redis时，需要安装egg-redis插件
  },
  CorpInfo: {
    ApiUrl: 'http://1.2.3.4:8082', //请勿带 " / "
    CorpID: 'wl47sadasw3w', //找到对应的企业ID
    OauthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize', //网页授权链接，一般不需要改变
    UserApiSecret: 'Hms1tvGDN6zHHyTEDFasTZ9h6P6T32mO1SDI_K0vg2g', //通讯录操作密钥 【可选】
    AgentApiSecret: 'B5-wRTi_sOtHL8qEtMPadrfxgYHRsN12w8r770MR1Jo', //应用操作密钥 【可选】
    DeviceApiSecret: 'tm2poySc0NliMkZ-mrVO85EHg5g9fJG4YAVt3PWbyqQ', //设备操作密钥 【可选】
    //日志功能还在进一步开发中
    LogApiSecret: 'CjPRcGAK2rpw3LFSYkPjtaderilfYDZ9AFOGkyge6CM' //日志操作密钥 【可选】
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
    // redirect_domain: '', //可信域名、不写http(https)协议
    // home_url: '', //主页链接，若没有则不写 写http(https)协议
  }
};
```
