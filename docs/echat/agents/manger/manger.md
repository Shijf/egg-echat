## 应用管理 {docsify-ignore}

#### 创建应用

> - *report_location_flag* 企业应用是否打开地理位置上报 0：不上报；1：进入会话上报；
> - *logo_mediaid*  企业应用头像的mediaid，通过多媒体接口上传图片获得mediaid，上传后会自动裁剪成方形和圆形两个头像  必须参数
> - *name* 企业应用名称，1~32个字符 必须参数
> - *description*  企业应用详情，4~120个字符
> - *redirect_domain*  企业应用可信域名 ，多个用 ‘|’隔开，原企业微信没有写，但是从获取的应用信息来看，是这样的 :）
> - *isreportenter* 是否上报用户进入应用事件。0：不接收；1：接收。
> - *home_url* 主页连接
> - *isforbidden* 应用是否关闭，0：开启，1关闭
> - *allow_userinfos*    允许的用户列表    
    - user  数组对象  

示例:      
```js
user: [
    {
        "userid": "userid1"
    },{
        "userid": "userid2"
    },
    ...
]
```
> - *allow_partys*   允许的部门列表   
    - partyid 数组

示例：

```js
partyid: [
    1,34
]
```

> - *allow_tags*    允许的标签列表   
    - tagid 标签id列表

```js
tagid : [
    33,35
]
```

完整示例：

```js
let data = {
   report_location_flag: 0,
   logo_mediaid: "xxxxx",
   name: "NAME",
   description: "DESC",
   redirect_domain: "xxxxxx",
   isreportenter:0,
   home_url:"http://www.qq.com",
   isforbidden:0 ,
   allow_userinfos: {
        user: [
            {
                userid: "userid1"
            },
            {
                userid: "userid2"
            }
        ]
    },
    allow_partys: {
        partyid: [
            1,34
        ]
    },
    allow_tags: {
        tagid: [
            33
        ]
    }
}
//新增应用
await echat.agents().manger.create(data);
```

#### <span style="color:green">获取应用信息</span>

> - agentid 需要获取的应用id 在非应用管理密钥的情况下，可不填写 agentid，则会默认为当前的应用的 agentid，下文中有涉及agentid的也同样适用

```js
await echat.agents().manger.get(agentid); 


```

#### 获取应用列表

```js
await echat.agents().manger.list();
```

#### <span style="color:green">设置（更新）应用信息</span>
此处仅演示设置主页链接，其他的字段参考[创建应用](/echat/agents/manger/manger?id=创建应用)的字段。
```js
//

let data = {
    agentid: 1800454, //必填，若没有则默认为当期的应用id
    home_url: 'https://www.ebchina.com' //设置（更新）主页连接
};

await echat.agents().manger.set(data);
```

#### 删除应用
> - *agentid* 应用id
```js
await echat.agents().manger.delete(agentid);
```

#### <span style="color:green">启用/停用应用</span>
> - *agentid* 应用id

```js
//启用
await echat.agents().manger.open(agentid);
//停用
await echat.agents().manger.close(agentid);
```
返回结果

```js
{
    "errcode": 0,
    "errmsg": "ok",
    //启用/停用应用的应用密钥
    "secret": "9hjZ-dlI3wKjDeuyVv_5AjUGwE7TP0w8BB-tjsQIceA"
}
```

#### <span style="color:green">重置应用secret</span>

```js
await echat.agents().manger.resetSecret(agentid);
```

#### 开启/更新应用回调

> - token	可任意填写，用于生成签名（长度为3~32之间的英文或数字）
> - aeskey 用于消息体的加密，是AES密钥的Base64编码（43位的英文或数字）

```js
let callData = {
    callback_url: 'http://xxx.xxx.xxx',
    token:  'hJqcu3uJ9Tn2gXPmxx2w9kkCkCE2EPYo',
    aeskey: '6qkdMrq68nTKduznJYO1A37W2oEgpkMUvkttRToqhUt',
    agentid: 1854575
}
//开启
await echat.agents().manger.openCallback(callData);
//更新
await echat.agents().manger.updateCallback(callData);
```

#### <span style="color:green">停用应用回调</span>

```js
await echat.agents().manger.closecallback(agentid);
```







