使用通讯录管理接口，原则上需要使用通讯录管理 secret，不过也可以使用应用 secret。
但是其它应用 secret 只能进行 “查询” 非写操作( <span style="color: green">绿色字样</span> )，而且只能操作应用可见范围内的通讯录。

在需要用到 “写操作” 时，需要到服务器管理后台获得通讯录的 secret。

- 1、进入本地版管理后台，在“管理工具” — “通讯录同步助手”开启“API接口同步”

    ![开启“API接口同步”](./../images/ContactsAPISyncHelper.png "开启“API接口同步”")

- 2、开启后，可设置通讯录API的权限：读取或者编辑通讯录

    ![服务端配置](./../images/ContactsSyncHelper.png "服务端配置")