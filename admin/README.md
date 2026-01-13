# 后台管理系统入口

这个目录包含后台管理系统的独立入口文件。

## 访问地址

- **生产环境**: `https://dszk.fzu.edu.cn/admin/index.html`
- **开发环境**: `http://localhost:5173/admin/`

## 文件说明

- `index.html` - 后台管理系统的 HTML 入口文件
- 该文件会加载 `src/admin.ts` 作为 JavaScript 入口

## 相关文件

- 入口脚本: `src/admin.ts`
- 布局组件: `src/layouts/AdminLayout.vue`
- 路由配置: `src/router/modules/admin.ts`
- 页面组件: `src/views/admin/`

## 构建

运行以下命令构建生产版本：

```bash
npm run build
```

构建后的文件将位于 `dist/admin/index.html`

## 更多信息

详细的部署和配置说明，请参考根目录下的 `后台管理系统部署说明.md`






