## 应用底部菜单 {docsify-ignore}

#### 获取当前/某个应用的菜单配置

```js
await echat.agents().menu.get(agentid); //agentid , 不填则为当期的应用
```

#### 设置应用菜单

示例：构造click和view类型的请求包如下

```json
{
   "button":[
       {    
           "type":"click",
           "name":"今日歌曲",
           "key":"V1001_TODAY_MUSIC"
       },
       {
           "name":"菜单",
           "sub_button":[
               {
                   "type":"view",
                   "name":"搜索",
                   "url":"http://www.soso.com/"
               },
               {
                   "type":"click",
                   "name":"赞一下我们",
                   "key":"V1001_GOOD"
               }
           ]
      }
   ]
}
```

示例：其他新增按钮类型的请求

```json
{
    "button": [
        {
            "name": "扫码", 
            "sub_button": [
                {
                    "type": "scancode_waitmsg", 
                    "name": "扫码带提示", 
                    "key": "rselfmenu_0_0", 
                    "sub_button": [ ]
                }, 
                {
                    "type": "scancode_push", 
                    "name": "扫码推事件", 
                    "key": "rselfmenu_0_1", 
                    "sub_button": [ ]
                }
            ]
        }, 
        {
            "name": "发图", 
            "sub_button": [
                {
                    "type": "pic_sysphoto", 
                    "name": "系统拍照发图", 
                    "key": "rselfmenu_1_0", 
                   "sub_button": [ ]
                 }, 
                {
                    "type": "pic_photo_or_album", 
                    "name": "拍照或者相册发图", 
                    "key": "rselfmenu_1_1", 
                    "sub_button": [ ]
                }, 
                {
                    "type": "pic_weixin", 
                    "name": "微信相册发图", 
                    "key": "rselfmenu_1_2", 
                    "sub_button": [ ]
                }
            ]
        }, 
        {
            "name": "发送位置", 
            "type": "location_select", 
            "key": "rselfmenu_2_0"
        }
    ]
}
```
> - menuData 菜单配置项，具体参考为上述的示例json，只需将转换为js对象即可
```js
await echat.agents().menu.create(menuData);
```

##### 删除应用菜单

```js
await echat.agents().menu.delete(agentid);
```

