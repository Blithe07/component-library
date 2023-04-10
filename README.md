# yh-element-plus

- 基于 vue3、element-plus 组件二次封装

- 支持 Typescript

## 项目安装

```sh
# npm
npm install yh-element-plus

# pnpm(推荐)
pnpm add yh-element-plus
```

## 使用

### 全局注册

```javascript
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

app.use(ElementPlus);
```

### 组件

- yh-card 卡片组件
- yh-dicts-analysis 词典解析组件
- yh-dicts-select 词典下拉组件
- yh-divide、yh-divide-item 间隔组件
- yh-link 统一链接组件
- yh-page-layout 表格搜索统一基础布局
- yh-product-select 产品选择

### http

```javascript
import { http, useHttp } from "yh-element-plus";

http(config);
http.get(url[,config]);
http.post(url[,data[,config]);
// ....
const { loading, data, execute } = useHttp(url[,config]);

// loading -> 加载
// data -> 返回数据
// excute -> 请求函数

```

### typscript 支持

根目录下 env.d.ts 添加

```typscript
/// <reference types="yh-element-plus/dist/http/env" />
/// <reference types="yh-element-plus/dist/global" />
```
