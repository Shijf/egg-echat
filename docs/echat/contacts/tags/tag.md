## 标签管理 {docsify-ignore}

#### 获取标签列表

```js
await echat.contacts().tag.list();
```

#### 创建标签

> - tagName 标签名称，长度限制为32个字（汉字或英文字母），标签名不可与其他标签重名。
> - tagId 标签id，非负整型，指定此参数时新增的标签会生成对应的标签id，不指定时则以目前最大的id自增。

```js
await echat.contacts().tag.create();
```
返回结果：
```json
{ errcode: 0, errmsg: 'created', tagid: 30 } //返回 创建的标签id
```

#### 更新标签名字

> - tagId  标签ID，必填
> - tagName 要更新的标签名称，必填

```js
await echat.contacts().tag.update(tagId, tagName);
```
#### 删除标签

> - tagId  标签ID，必填

```js
await echat.contacts().tag.delete(tagId);
```

#### 获取标签成员(标签详情)
> - tagId  标签ID，必填

```js
await echat.contacts().tag.get(tagId);
```
#### 增加标签成员
> - tagId 标签 id ,必填
> - userid00* 用户id
> - departmentid00* 部门id

第一个参数是标签id， 后边的参数为成员或部门列表，示例如下：
```js
await echat.contacts().tag.tagAddUsers(tagId, userid001, userid002, ...);
//or
await echat.contacts().tag.tagAddUsers(tagId, ['userid001', 'userid002', ...]);

//指定部门
await echat.contacts().tag.tagAddDepartments(tagId, departmentid001, departmentid002, ...);
//or
await echat.contacts().tag.tagAddDepartments(tagId, ['departmentid001', 'departmentid002', ...]);
```

#### 删除标签成员

> - tagId 标签 id ,必填
> - userid00* 用户id
> - departmentid00* 部门id

第一个参数是标签id， 后边的参数为成员或部门列表，示例如下：
```js
await echat.contacts().tag.tagDeleteUsers(tagId, userid001, userid002, ...);
//or
await echat.contacts().tag.tagDeleteUsers(tagId, ['userid001', 'userid002', ...]);

//指定部门
await echat.contacts().tag.tagDeleteDepartments(tagId, departmentid001, departmentid002, ...);
//or
await echat.contacts().tag.tagDeleteDepartments(tagId, ['departmentid001', 'departmentid002', ...]);
```




