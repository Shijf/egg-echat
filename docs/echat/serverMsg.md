## 接收服务器消息推送 {docsify-ignore}

消息类型：`文本消息`、`图片消息`、`语音消息`、`图片消息`、`视频消息`、`位置消息`、`链接消息`；

注意：接收此处的消息推送，一定需要先对接服务器回调。参考[快速入门](echat/server.md)；

示例代码：

```js
const echat = await this.ctx.echat();
        const server = echat.server();
        let result = await server.server().push(async(message) => { //回调中使用
            switch (message['MsgType']) {
                case 'event':
                    return '收到事件消息'; //此处判断是哪一个事件还需要进一步通过message['Event']来判断
                break;
                case 'text':
                    return '收到文字消息';
                break;
                case 'image':
                    return '收到图片消息';
                break;
                case 'voice':
                    return '收到语音消息';
                break;
                case 'video':
                    return '收到视频消息';
                break;
                case 'location':
                    return '收到坐标消息';
                break;
                case 'link':
                    return '收到链接消息';
                break;
                case 'file':
                   return '收到文件消息';
                // ... 其它消息
                default:
                    return '收到其它消息';
                break;
    }
        });

```

当前，因为这里 `push` 接收一个回调的函数，所以一般是要传一个Closure 闭包；注意，此处写的是一个async函数；

某些情况，我们需要直接使用 `message` 参数，那么怎么在 `push` 的闭包外调用呢？

```js
await server.getMessage();
```

#### 注册多个消息处理器

有时候你可能需要对消息记日志，或者一系列的自定义操作,可以多注册几个handler：
```js
await server.server().push(logHandler);
await server.server().push(enventHandler);
...
```

#### 请求消息的属性
当你接收到用户发来的消息时，可能会提取消息中的相关属性，参考：
请求消息基本属性(以下所有消息都有的基本属性)：

>  - `ToUserName`    接收方帐号（企业微信CorpID）
>  - `FromUserName`  发送方帐号（UserID, 代表用户的唯一标识）
>  - `CreateTime`    消息创建时间（时间戳 整型）
>  - `MsgId`        消息 ID（64位整型）
>  - `AgentID`      企业应用的id，整型。可在应用的设置页面查看

### 文本：

>  - `MsgType`  text
>  - `Content`  文本消息内容

### 图片：

>  - `MsgType`  image
>  - `MediaId`  图片消息媒体id，可以调用多媒体文件下载接口拉取数据。
>  - `PicUrl`   图片链接

### 语音：

>  - `MsgType`        voice
>  - `MediaId`        语音消息媒体id，可以调用多媒体文件下载接口拉取数据。
>  - `Format`         语音格式，如 amr，speex 等

### 视频：

>  - `MsgType`       video
>  - `MediaId`       视频消息媒体id，可以调用多媒体文件下载接口拉取数据。


### 地理位置：

>  - `MsgType`     location
>  - `Latitude`  地理位置纬度
>  - `Longitude`  地理位置经度
>  - `Precision`       地理位置精度

### 链接：

>  - `MsgType`      link
>  - `Title`        消息标题
>  - `Description`  消息描述
>  - `Url`          消息链接

### 文件：

>  `MsgType`      file   
>  `Title`        文件名   
>  `Description`  文件描述，可能为null   
>  `FileKey`      文件KEY   
>  `FileMd5`      文件MD5值   
>  `FileTotalLen` 文件大小，单位字节  

### 事件：

>  - `MsgType`     event
>  - `Event`       事件类型 （如：CLICK 等）

#### 进入应用

本事件在成员进入企业微信的应用时触发

> - `Event` enter_agent
> - `EventKey`  事件KEY值，此事件该值为空


#### 通讯录变更事件
企业微信的成员可在客户端变更自己的个人信息。当企业通过通讯录助手开通通讯录写权限后，成员的变更会通知给企业。变更的事件，将推送到企业微信管理端通讯录助手中的‘接收事件服务器’。
根据ChangeType来判断如何处理响应的事件，由于此事件只有特定的权限才能操作，此处不做详细的解释，有需要请邮箱联系！非常用接口事件！！！

#### 菜单事件
成员点击自定义菜单后，企业微信会把点击事件推送给应用。
点击菜单弹出子菜单，不会产生上报。
企业微信iPhone1.2.2/Android1.2.2版本开始支持菜单事件，旧版本企业微信成员点击后将没有回应，应用不能正常接收到事件推送。
自定义菜单可以在管理后台的应用设置界面配置。
##### 点击菜单的事件推送
> - `MsgType` 消息类型，此时固定为：event
> - `Event` 事件类型：click
##### 点击菜单跳转链接的事件推送
> - `MsgType` 消息类型，此时固定为：event
> - `Event` view
##### 扫码推事件的事件推送 
> - `MsgType` 消息类型，此时固定为：event
> - `Event` scancode_push
>  - `EventKey`    事件KEY值，事件KEY值，与自定义菜单接口中KEY值对应
> - `ScanCodeInfo` 扫描信息
> - `ScanType` 扫描类型，一般是qrcode
> - `ScanResult` 扫描结果，即二维码对应的字符串信息
##### 扫码推事件且弹出“消息接收中”提示框的事件推送
> - `Event` scancode_waitmsg
其他的参数如上述的扫码推事件相同

##### 弹出系统拍照发图的事件推送
> - `Event` pic_sysphoto
> - `EventKey` 事件KEY值，事件KEY值，与自定义菜单接口中KEY值对应
> - `ScanCodeInfo` 发送的图片信息
> - `Count` 发送的图片数量
> - `PicList` 	图片列表
> - `PicMd5Sum` 图片的MD5值，开发者若需要，可用于验证接收到图片
##### 弹出拍照或者相册发图的事件推送
> - `Event` pic_photo_or_album
其他的事件参数参考 弹出系统拍照发图的事件推送

#### 弹出微信相册发图器的事件推送
> - `Event` pic_weixin
其他的事件参数参考 弹出系统拍照发图的事件推送
##### 弹出地理位置选择器的事件推送
> - `Event` location_select
> - `Location_X` X坐标信息
> - `Location_Y` Y坐标信息
> - `Scale` 精度，可理解为精度或者比例尺、越精细的话 scale越高
> - `Label` 	地理位置的字符串信息
> - `Poiname` POI的名字，可能为空

#### 上报地理位置事件
>  - `Latitude`    23.137466   地理位置纬度
>  - `Longitude`   113.352425  地理位置经度
>  - `Precision`   119.385040  地理位置精度

#### 自定义菜单事件
>  - `EventKey`    事件KEY值，与自定义菜单接口中KEY值对应，如：CUSTOM_KEY_001, www.qq.com

