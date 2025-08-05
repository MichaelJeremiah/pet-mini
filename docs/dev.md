# 开发规范

## 导言

> 好的代码不仅读起来赏心悦目，同时能大大提高多人协作和往后维护的效率，如何才能算好的代码呢？首先所必须的就是要遵守团队的代码规范，良好的规范会让协作变得容易和流畅。下面介绍本团队所必须遵守的代码规范。

## 必要插件

- `EsLint`：检验代码规范并提示

  - 小程序项目有 commit 验证，验证不通过的话会阻止提交

- `Prettier - Code formatter`：自动格式化工具

  - commit 提交代码时，会自动格式化代码，如果没有安装这个插件便不能自动格式化

  - 可以将 Prettier 设置为默认格式化代码工具，每次保存前都格式化一下代码，也可以设置为保存默认格式化

- `code-spell-checker`：检查代码中的命名是否有拼写错误

- `小程序开发助手`：修改自minapp-vscode扩展，微信小程序标签、属性的智能补全

  - 支持json跳转自定义组件

  - 支持less样式智能提示

  - 支持公共组件，支持app.json中usingComponents引入的组件

  - wxml跳转组件，支持wxml中tag跳转到自定义的组件

  - 组件可选参数，自定义组件prop如果是可选列表，可通过 @enum注释指定可选参数

  - 方法提示，组件bind方法提示（不通用，只支持typescript类写法）
  
  - 组件属性烤串化，组件的属性在wxml中提示为 a-b-c 格式

## 命名规范

- 目录/文件名/变量/常量/方法/类 等等 `必须遵循语义化`

- 禁止使用 `_ 或 __` 开头命名

- 目录/文件名: `全部字母小写`，单词间用`横杠 - 隔开`；如`example-name`

- js 变量/方法名: `小驼峰命名`，第一个单词的首字母小写，其他单词的首字母大写；如：`exampleName`

- js 常量：`全部字母大写`，单词用`下划线 _ 隔开`；如：`EXAMPLE_NAME`

- js 类: `大驼峰命名`，全部单词首字母大写；如：`ExampleName`

- 函数/方法：`动语 + 宾语`结构；如：`doSomething、openFile、setName、addNumber...`

- 属性/变量/常量：`定语 + 名词`结构；如：`fileName, maxLength, textSize，MAX_WIDTH`

- 谨慎使用缩写；如：`button -> btn`

## 组件开发使用规范

- 组件文件名：`全部字母小写`，单词间用`横杠 - 隔开`，如：`top-bar`

- json 文件引入组件时`命名必须与组件名一致`；如：`"top-bar": "./components/top-bar/index"`；通用组件引入时加上 `vx-`

- 组件`properties`自定义属性：`小驼峰命名`；如：`propertyName`

- 组件传参时：`全部字母小写`，单词间用`横杠 - 隔开`；如：`property-name="value"`

- 使用`通用组件`（ /src/components 目录下的组件）时，用相对根路径 `/components/...` 禁止使用 `../../`

- 使用 `baseComponent.ts` 创建组件

- 区分业务组件/通用组件；原则上禁止组件之间相互调用，通用方法抽离到通用组件内或 API 组件

- 组件规范示例：`<custom-component data-props="data" bind:triggerLogin="...">内容...</custom-component>`

## 事件规范

- 处理事件：`handleEvent`；如：`bind:tap="handleEvent"`

- 触发事件：`triggerEvent`；如：`this.triggerEvent('triggerLoginOut')`

- 普通事件：`动语 + 宾语`；如：`doSomethingEvent`

## 注释规范

- 块注释/行注释

- 函数/方法注释 注明入参

## 其他规范

- 标签自闭合：标签没有子节点时使用自闭合；如：`<image />` `<input />` `<view />` `<custom-component />`

- 提交文件中`不留有打印 console.log 函数`

- 防止`getApp`滥用，`禁止在 App 下挂载方法和数据`