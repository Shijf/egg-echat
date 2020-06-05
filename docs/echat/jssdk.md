# 构建配置

### 获取 jssdk 实例
```js
const echat = await this.ctx.echat(); //获取echat实例

const jssdk = echat.jssdk(); //获取jssdk的实例
```

#### 接口配置说明

jssdk 一般分为两种，即 config 和 agentConfig； 
config注入的是企业的身份与权限，而agentConfig注入的是应用的身份与权限。尤其是当调用者为第三方服务商时，通过config无法准确区分出调用者是哪个第三方应用，而在部分场景下，又必须严谨区分出第三方应用的身份，此时即需要通过agentConfig来注入应用的身份信息。

> 需要agentConfig的接口列表
- getStepCount
- addCalendarEvent
- openUserProfile
- getAllPhoneContacts
- selectExternalContact
- selectEnterpriseContact
- openEnterpriseChat

除以上的七个接口以外，其他接口只需要config即可。

#### 生成配置

> - jsApiList    接口列表，请以数组的形式传入 如： ['scanQRCode', 'chooseVideo']
> - beat 是否生成 agentConfig配置， true、false
> - debug 是否开始调试模式，默认关闭，一般在开发阶段，最好为true
```js
const build = await jssdk.buildConfig(jsApiList, beat, debug);
```

示例：

```js
    const build = await jssdk.buildConfig(['scanQRCode'], true, true);

    console.log(build);
```

返回的配置：

```json
{
  js_config: {
    appId: 'wl3584b9fc00',
    nonceStr: 'Xk5JFQji3e',
    timestamp: 1575253339,
    url: 'http://127.0.0.1:7001/jssdk',
    signature: 'bb5463c3f929b614e77a973e26ca4487fde3275d',
    debug: true,
    beta: true,
    jsApiList: [ 'scanQRCode' ]
  },
  js_agent_config: {
    agentid: 1000177,
    corpid: 'wl3584b9fc00',
    nonceStr: 'D8b2W3Gy4i',
    timestamp: 1575253339,
    url: 'http://127.0.0.1:7001/jssdk',
    signature: 'eb3d7485149039be6405d1e57bbb67fe419dfd72'
  }
}
```

在前端页面直接转换成响应的配直接即可；

#### 查看全部js列表接口

```js
let jsApilist = jssdk.jsApiList();
```

#### 自定义设置当前的url

> - url 可以传入自定义的 url
```js
//只需在实例化时候将 url传入即可
const jssdk = echat.jssdk(url);
```
如果不想用默认读取的URL，可以使用此方法手动设置，通常不需要。
