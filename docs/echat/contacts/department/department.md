## 部门管理 {docsify-ignore}

#### 创建部门

> - *name* 部门名称。长度限制为1~128个字符，字符不能包括\:?”<>｜
> - *parentid* 父部门id，32位整型
> - *order* 在父部门中的次序值。order值大的排序靠前。有效的值范围是[0, 2^32)
> - *id* 部门id，32位整型，指定时必须大于1。若不填该参数，将自动生成id


```js
let data = {
   name "广州研发中心",
   parentid: 1,
   order: 1,
   id: 2
}

await echat.contacts().department.create(data);
```
#### 更新部门

```js
let data = {
   "id": 2,
   "name": "广州研发中心",
   "parentid": 1,
   "order": 1
}


await echat.contacts().department.update(data);
```
#### 删除部门

> - *departmentId*  部门id

```js
await echat.contacts().department.delete(departmentId);
```

#### 获取部门列表


> - *departmentId* 部门id, 获取指定部门及其下的子部门。 如果不填，默认获取全量组织架构 （注：不能删除根部门；不能删除含有子部门、成员的部门）

```js
await echat.contacts().department.list(departmentId);
```
