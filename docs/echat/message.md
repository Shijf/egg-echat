# 消息发送

## 主动发送消息

创建消息实例

```js
const echat = await this.ctx.echat();

const messenger = echat.message().messenger;
```

消息发送需要设定消息类型，主要类型有 `文本` 、`图片` 、`语音` 、`视频` 、`文件` 、`文本卡片` 、`图文`,下文中括号内对应的是抽象出来的类型方法名称：

#### 文本消息 (textMsg)

> - content 消息内容，最长不超过 2048 个字节
> - 可以支持换行、以及 A 标签，即可打开自定义的网页（可参考示例代码）

```js
let content = `你的快递已到，请携带工卡前往邮件中心领取。<br>出发前可查看<a href=\"http://echat.ebchina.com\">邮件中心视频实况</a>，聪明避开排队。`;
let message = messenger.textMsg(content);
```

效果：

![服务端配置](./images/test_msg.png '服务端配置')

#### 图片消息（imgMsg）

> - mediaId 媒体资源 ID

```js
//mediaId 需要上传至企业微信服务器，后文关于mediaId不再赘述
let message = messenger.imgMsg(mediaId);
```

#### 语音消息（voiceMsg）

> - mediaId 媒体资源 ID

```js
let message = messenger.voiceMsg(mediaId);
```

> - mediaId 媒体资源 ID
> - title 视频标题
> - description 关于此视频的描述

#### 视频消息（videoMsg）

```js
let message = messenger.voiceMsg({
  mediaId,
  title, //视频标题
  description //关于此视频的描述
});
```

#### 文件消息（fileMsg）

> - mediaId 媒体资源 ID

```js
let message = messenger.fileMsg(mediaId);
```

#### 文本卡片消息（cardMsg）

> - title 标题，不超过 128 个字节，超过会自动截断
> - description 描述，不超过 512 个字节，超过会自动截断
> - url 点击后跳转的链接
> - btntxt 此参数非必须参数，默认为【详情】，最多支持 4 个字符，超过后会截断

卡片消息的展现形式非常灵活，支持使用 br 标签或者空格来进行换行处理，也支持使用 div 标签来使用不同的字体颜色，目前内置了 3 种文字颜色：灰色(gray)、高亮(highlight)、默认黑色(normal)，将其作为 div 标签的 class 属性即可，具体用法请参考下面的示例。

```js
let cardMessage = {
  title: '领奖通知', //标题，不超过128个字节，超过会自动截断
  description:
    '<div class="gray">2016年9月26日</div> <div class="normal">恭喜你抽中iPhone 7一台，领奖码：xxxx</div><div class="highlight">请于2016年10月10日前联系行政同事领取</div>', //描述，不超过512个字节，超过会自动截断
  url: 'http://example.com', //点击后跳转的链接。
  btntxt: '' //此参数非必须参数，默认为【详情】，最多支持4个字符，超过后会截断！
};

let message = messenger.cardMsg(cardMessage);
```

#### 图文消息（newsMsg）

> - title 标题，不超过 128 个字节，超过会自动截断
> - description 描述，不超过 512 个字节，超过会自动截断
> - url 点击后跳转的链接
> - picurl 图文消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 640x320，小图 80x80
> - btntxt 按钮文字，仅在图文数为 1 条时才生效。 默认为“阅读全文”， 不超过 4 个文字，超过自动截断

```js
//一篇文章
let newsMessage_one = {
               title : "中秋节礼品领取",
               description : "今年中秋节公司有豪礼相送",
               url : "URL",
               picurl : "/wwopen/api/static/embed_image/load/test_pic_msg1.png",
               btntxt: '阅读全文'
           };
//多篇（最多支持8篇）文章
let newsMessage_more = [
    {
        title : "中秋节礼品领取",
        description : "今年中秋节公司有豪礼相送",
        url : "URL",
        picurl : "/wwopen/api/static/embed_image/load/test_pic_msg1.png",
        btntxt: '阅读全文'
    },
    {
        title : "中秋节礼品领取",
        description : "今年中秋节公司有豪礼相送",
        url : "URL",
        picurl : "/wwopen/api/static/embed_image/load/test_pic_msg1.png",
        btntxt: '阅读全文'
    },
    ··· 最多八个
];

let message_one = messenger.newsMsg(newsMessage_one);
let message_more = messenger.newsMsg(newsMessage_more);
```

#### 发送消息的完整示例（以文本消息为例）

```js
const echat = await this.ctx.echat();

const messenger = echat.message();

let message = messenger.textMsg(`你的快递已到，请携带工卡前往邮件中心领取。<br>出发前可查看<a href=\"http://echat.ebchina.com\">邮件中心视频实况</a>，聪明避开排队。`);

message.toUser(userid).send(); //发给单个人
message.toUser([userid01, userid02, ...]).send(); //发给多个人（最多1000个人）
message.toParty(PartyID).send(); //发给单个部门
message.toParty([PartyID1, PartyID2, ...]).send(); //发给多个部门 （最多100个部门）
message.toTag(TagID).send(); //发给单个部门
message.toTag([TagID1, TagID2, ...]).send(); //发给多个部门
// 也可以给单（多）个人（部门|标签（最多100个标签））一起发送
message.toUser(userid).toParty(PartyID).toTag(TagID)send();
//发送给当前应用的所有人
message.toUser('@all').send();

```

## 被动回复消息

被动接收消息，与回复消息，请参考：[服务端](/echat/server.md)
