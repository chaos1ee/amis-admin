# Amis admin

基于 [amis](https://github.com/baidu/amis) 低代码引擎的管理系统，通过 JSON schema 快速搭建页面。

<span style="color: #ffc107;font-size: 12px;">注意：本项目适用于开发功能和交互效果简单的中后台管理系统，不适用于有大量定制化需求或交互体验十分复杂的系统。</span>

## 项目结构

```
.
├── dist  // 构建产物，用于在生产环境部署
├── node_modules 
├── public  // 公共资源目录
│   ├── pages // 页面目录，存放 JSON schema，其中的 site.json 文件用于生成导航栏和前端路由
│   └── logo.png
├── src
│   ├── mocks // 与 api mock 相关的配置
│   ├── index.css
│   ├── app-schema.js  // amis app 配置
│   └── main.js // 入口文件
├── README.md
├── config.js   // 全局配置
├── index.html
├── package.json
├── pnpm-lock.yaml
└── webpack.config.js // webpack 配置文件
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 在本地启动服务
pnpm start

# 构建生产版本
pnpm build
```

## 部署

执行 `pnpm build` 命令，待打包完成后将构建工具生成的资源（dist 目录内的资源）拷贝到服务器的静态资源目录内，保持文件的相对位置不变，将后端路由映射到 `index.html` 即可。

## Workflow

1. 与网站主要信息相关（标题、logo 等）的配置保存在文件 `/src/app-schema.js` 中，可以按需配置，配置好后一般无需再频繁调整；

2. Amis 依赖 JSON schema 生成 React 代码，所以使用本项目的关键是创建页面对应的 JSON schema。Amis 有两种方式创建 JSON schema，分别是：

- 参照 Amis 的 [官方文档](https://aisuda.bce.baidu.com/amis/) 手动编写 JSON；
- 在 [可视化编辑器](https://aisuda.github.io/amis-editor-demo/#/hello-world) 内通过图形化的方式生成 JSON schema。

推荐使用第二种方式。

3. 将创建好的 JSON schema 保存在 `pages` 目录中以被 Amis 引擎加载，每次添加页面后记得在 `site.json` 中引入刚创建的 JSON 文件，具体可以参考 https://aisuda.bce.baidu.com/amis/zh-CN/components/app#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95 。



