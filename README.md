# mpvue-starter

> 基于 [mpvue-quickstart](https://github.com/mpvue/mpvue-quickstart) 定制化的项目模板

## 新增功能

- [x] 保留了原有的数据状态管理demo
- [x] 对常用小程序接口的 `Promise` 封装
- [x] `SASS` 的样式风格
- [x] 使用 [flyio](https://github.com/wendux/fly) 进行 `HTTP` 请求，并添加基本的请求拦截器功能
- [x] 统一化的接口管理风格。
- [x] 页面 `mixins` 功能演示：全局注入 `onShareAppMessage`
- [x] 初次进入小程序的授权弹层
- [x] 对用户拒绝授权后的处理机制
- [x] 针对 `content-type` 为 `application/x-www-form-urlencoded` 的数据处理机制

## 开发步骤

``` bash
# 安装依赖
npm install

# 启动开发服务，代码热更新
npm run dev

# 构建项目
npm run build

# 构建项目，并进行依赖分析
npm run build --report
```

## License

[MIT](/LICENSE)
