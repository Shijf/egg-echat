## 成员管理 {docsify-ignore}


#### <span style="color: green">读取成员</span>

> - userId 用户id
> - avatar_addr 用户头像 1.外网链接 2.内网链接 默认为内网，一般如果只是在企业微信内部打开H5页面，则不用填写此参数，企业微信会自动匹配连接，并获取到头像信息。

```js
const user = await echat.contacts().user.get(userId, avatar_addr);
```
#### 更新成员
> - userId 用户id
> - data 修改的用户数据
 data的数据格式：

 ```json
 //最好根据当前的企业的数据格式，可先通过get(userId)获取当前的企业数据格式，后进行更新。
 {
   "name": "李四",
   "department": [1],
   "order": [10],
   "position": "后台工程师",
   "mobile": "15913215421",
   "gender": "1",
   "email": "zhangsan@gzdev.com",
   "isleader": 0,
   "enable": 1,
   "avatar_mediaid": "2-G6nrLmr5EC3MNb_-zL1dDdzkd0p7cNliYu9V5w7o8K0",
   "telephone": "020-123456",
   "english_name": "jackzhang",
   "initpwd": "1234abcdE",
   "isnotify":1,
   "extattr": {"attrs":[{"name":"爱好","value":"旅游"},{"name":"卡号","value":"1234567234"}]}
 }

 ```

```js
await echat.contacts().user.update(userId, data);
```
#### 删除成员(支持批量)

> - userId 用户id （可传入字符串即一条数据， 也可以传入数组，批量删除）
```js
await echat.contacts().user.delete(userId);

//或者删除多个

await echat.contacts().user.delete(['userId01', 'userId02', ...]);

```
#### 创建成员

```javascript
    let data = {
    "userid": "zhangsan",
    "name": "张三",
    "english_name": "jackzhang"
    "mobile": "15913215421",
    "department": [1, 2],
    "order":[10,40],
    "position": "产品经理",
    "gender": "1",
    "email": "zhangsan@gzdev.com",
    "isleader": 1,
    "enable":1,
    "initpwd":"1234abcdE",
    "isnotify":1,
    "avatar_mediaid": "2-G6nrLmr5EC3MNb_-zL1dDdzkd0p7cNliYu9V5w7o8K0",
    "telephone": "020-123456"，
    "extattr": {"attrs":[{"name":"爱好","value":"旅游"},{"name":"卡号","value":"1234567234"}]}
};
const user = await echat.contacts().user.create(data);
```

#### <span style="color: green">获取部门成员</span>

> - departmentId 部门ID

```js
const users = await echat.contacts().user.getDepartmentUsers(departmentId);

// 递归获取子部门下面的成员
const userFeach = await echat.contacts().user.getDepartmentUsers(departmentId, true);
```
#### <span style="color: green">获取部门成员详情</span>
> - departmentId 部门ID

```js
const users = await echat.contacts().user.getDepartmentUsers(departmentId);

// 递归获取子部门下面的成员
const userFeach = await echat.contacts().user.getDetailedDepartmentUsers(departmentId, true);
```
#### 重置密码

> - userId 用户id
> - pwd 设置的用户密码 8-16字节，必须包含数字、字母大小写。如没有该字段，后台随机生成密码
> - isnotify 是否在修改密码后，发送邮件后短信通知用户密码。默认通知，不通知可设置为 false  

```js
await echat.contacts().user.resetpwd(userId, pwd, isnotify = true);
```
#### 用户踢下线

> - *userid* 用户id，若为单个用户，请将 *userid* 改为 *string* 类型

```js
await echat.contacts().user.offline('180*****');

//批量下线
await echat.contacts().user.offline(['180*****', '181*****']);
```
