## 应用分组管理 {docsify-ignore}

#### 设置工作台展示方式

> - show_type 1：九宫格格式； 0：列表格式

```js
await echat.agents().group.setWorkBench(show_type);
```

#### 创建应用分组

> - groupName 要增加的分组名称

```js
await echat.agents().group.create(groupName);
```
#### 更新组名称

> - obj 对象
    - groupid  应用分组的id [必填参数]   
    - name 应用分组的名字， 1-16个字符   
    - order 应用分组的排序，有效的值范围是(0, 2^32)

```js
let dataInfo = {
    groupid: 456,
    name: '测试组',
    order: 5
}

await echat.agents().group.update(dataInfo);
```

#### 删除分组名称

```js
await echat.agents().group.delete(groupid);
```

#### 增加分组应用
```js
await echat.agents().group.addApps(groupid, [
    12, 35 //  需要添加的应用id 列表 
]);
```

#### 从组中移除应用
> tip：分组中移除的应用被添加到默认分组

```js
await echat.agents().group.removeApp(groupid, agentid);
```
#### 获取分组列表
```js
await echat.agents().group.groupList();
```

#### 获取指定分组的应用列表

```js
await echat.agents().group.appList(groupid);
```