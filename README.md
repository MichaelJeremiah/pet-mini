# 策方微商城

基于gulp构建的微信小程序开发流

## 本地开发
```bash
# 安装依赖
$ yarn

# 运行gulp
$ yarn dev

# 运行gulp，并且打开开发者工具
$ yarn dev --open

# 指定首页模板 tpl参数可选：ds(电商) ls(零售)
$ yarn dev --tpl ds
```

默认使用`wx.config.yaml`中配置的test1小程序开发，如果想要使用其他小程序，在`wx.config.yaml`中自己定义，并在启动的时候传入自定义的名称，例如：`yarn dev --mini prod1`

## 生产发布

打包前请先修改版本号，执行`node scripts/version.js`[版本号规则](./docs/version.md) 

```bash
# 安装依赖
$ yarn

# 打发布包
$ yarn deploy

# 打包指定首页模板 --tpl [ls|ds]
$ yarn build --mini prod3 --tpl ls
```

每一个发布都要认真对待，发布前请先检查环境、相关配置等是否正确。
本地检查完，删除dist文件夹下面`ext.json`文件，然后上传草稿，微信开发者工具将提供版本建议，填写预期版本和相关描述提交即可。

以上发布后续用node脚本实现，减少步骤，希望大家一起努力参与共建。

## wx.config.yaml 说明

- appid 代表你需要使用哪个服务商的开发小程序进行开发
    - 「每日上香」用于测试环境
    - 「即麦」用于生产环境 **微拍堂策方** 服务商打包
    - 「策方测试2」用户生产环境 **成都策方** 服务商打包
- extConfig 代表你要使用哪个小程序的数据，包含小程序授权的公司uri、小程序appid、小程序uri、接口域名等配置信息，这些信息会挂载在小程序实例上`app.extConfig`

## 开发指南

- 用户登录token缓存24小时有效；
- 自定义组件可以使用`baseComponent`创建，内部集成了一些有用的功能，它可以为你省很多事；
- 页面必须使用`basePage`创建；
- class命名采用`BEM`风格 [BEM简介](./docs/bem.md)；
- 开发规范详见 [开发规范]('./docs/dev.md')；
- `components`下部分常用组件已在`app.json`中全局注册，页面中不再需要重复注册；
- 如果要使用`getUserProfile`获取用户信息，可以使用`get-user-profile`组件包裹，`bind:click`属性绑定你的方法，这样就会在执行click方法之前先提示用户授权用户信息。（因为`getUserProfile`方法必须在用户点击按钮后才能调用，所以不能直接调用）；
- 路由跳转使用`import wxapi from @utils/wxapi`方法，内部已经使用`Promise`封装；使用`navigateTo`时，如果页面栈大于等于9层将使用`redirectTo`跳转；另外新增`gotoWebview`可以直接跳转webview页面；
- 新增npm包，在根路径下安装依赖，需要在`gulp/npm`增加相关脚本，将资源拷贝到modules目录（参考`list-helper-core`）；
- 原生点击事件使用`bind:tap`绑定，如果需要给方法传递参数，使用`data-*`自定义属性绑定在对应点击元素上，在方法中可以通过`event.currentTarget.dataset`获取；
- 页面中方法与生命周期同级定义，在组件中方法需要放在 `methods: { }` 里面；
- `wxml` 中只能使用`properties`、`data`、`computed`中的属性，业务逻辑判断尽量在js层优先处理；
- 在自定义组件里，如果使用createVideoContext， 必须要this传入到第二个参数wx.createVideoContext('myVideo', this); 具体参考vip/components/goods-banner
- 为兼容`navigateTo`跳转不知道是否`TabBar`页面，需要将`TabBar`页面路由维护在`constants/index`中

## baseComponent 做了什么？

baseComponent是基于Component函数封装
- 支持`vx-class`和`vx-hover-class`属性传递class给组件用于修改组件内的样式
- 开启组件内启用多slot支持
- 集成了iPhoneX安全区域信息，在组件内使用`useSafeArea`启用安全区域`behavior`，此时会在组件data中自动注入`safeAreaConfig`、`safeAreaInset`、`statusBarHeight`、`isIPhoneX` [详见](./src/behaviors/safeAreaBehavior.ts)
- 扩展`computed`计算属性（类似vue中的计算属性） [详见](./src/behaviors/computedBehavior.js)
- 扩展安全设置data方法`this.safeSetData` [详见](./src/behaviors/safeSetDataBehavior.js)

## basePage 做了什么？

basePage是基于Page函数封装，在执行`onLoad`之前先调用用户登录，保证在调用业务接口的时候一定是登录状态

## 开发小程序

```yaml
# 每日上香
# appid: "wx49a127b04708655c"
# 即麦
# appid: "wx5390da723a1487fc"
# 策方测试2
# appid: "wxbe4e25610fb29520"
```

## TODO

- [ ] 开发文档
- [ ] 自定义测试小程序，交互式选择
- [ ] icon图标库，考虑使用svg base64作为背景图
