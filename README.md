# 个人网站

一个现代化、响应式的个人网站，展示文章、思考、日志和开源项目。

## 功能特点

- 响应式设计，支持所有设备
- 深色主题界面
- GitHub 项目集成，自动展示你的开源项目
- 文章、思考和日志展示
- 平滑滚动和动画效果
- 联系表单

## 技术栈

- HTML5
- CSS3（使用 CSS Grid 和 Flexbox）
- 原生 JavaScript（无框架依赖）
- Font Awesome 图标

## 快速开始

### 1. 配置 GitHub 用户名

打开 `script.js` 文件，找到以下代码并替换为你的 GitHub 用户名：

```javascript
const githubUsername = 'YOUR_GITHUB_USERNAME';
```

### 2. 自定义个人信息

编辑 `index.html` 文件，更新以下内容：

- **导航栏品牌名称**：在 `<div class="nav-brand">` 中修改
- **主标题**：在 `.hero-title` 中修改
- **副标题**：在 `.hero-subtitle` 中修改
- **社交媒体链接**：在 `.social-links` 部分更新链接
- **联系信息**：在 `#contact` 部分更新邮箱等信息

### 3. 添加你的内容

#### 文章

在 `index.html` 中的 `#articles` 部分添加或修改文章卡片，或者使用 JavaScript 动态加载。

#### 思考笔记

在 `#thoughts` 部分的时间线中添加你的思考内容。

#### 开发日志

在 `#logs` 部分添加你的开发日志条目。

### 4. 本地测试

可以直接打开 `index.html` 文件在浏览器中查看，或使用本地服务器：

**使用 Python：**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**使用 Node.js：**
```bash
# 安装 http-server
npm install -g http-server

# 运行服务器
http-server
```

然后访问 `http://localhost:8000`

## 部署到云服务器

### 方法 1：直接上传

1. 将所有文件上传到服务器的 web 目录（如 `/var/www/html/`）
2. 确保文件权限正确：
   ```bash
   chmod 644 index.html styles.css script.js
   ```
3. 配置 Nginx 或 Apache

### 方法 2：使用 Git

在服务器上克隆仓库：
```bash
cd /var/www/html/
git clone <你的仓库地址> .
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Apache 配置示例

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/html

    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # 启用压缩
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/javascript
    </IfModule>
</VirtualHost>
```

## 自定义样式

所有样式都在 `styles.css` 文件中。你可以通过修改 CSS 变量来快速自定义颜色方案：

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --dark-bg: #0f172a;
    --darker-bg: #020617;
    --light-text: #f1f5f9;
    --gray-text: #94a3b8;
}
```

## 添加新功能

### 博客文章系统

你可以创建一个 JSON 文件来存储文章数据：

```json
// articles.json
[
    {
        "title": "文章标题",
        "description": "文章描述",
        "tag": "技术",
        "date": "2025-10-29",
        "link": "article.html"
    }
]
```

然后在 JavaScript 中加载：

```javascript
fetch('articles.json')
    .then(response => response.json())
    .then(articles => {
        // 渲染文章
    });
```

### 评论系统

可以集成第三方评论系统：
- [Disqus](https://disqus.com/)
- [Gitalk](https://github.com/gitalk/gitalk)
- [Utterances](https://utteranc.es/)

### 数据分析

添加 Google Analytics：

```html
<!-- 在 </head> 之前添加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 性能优化

1. **图片优化**：使用 WebP 格式，添加懒加载
2. **代码压缩**：使用工具压缩 CSS 和 JS
3. **CDN**：使用 CDN 托管静态资源
4. **缓存**：配置适当的缓存策略

## 浏览器支持

- Chrome（最新版本）
- Firefox（最新版本）
- Safari（最新版本）
- Edge（最新版本）

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎通过网站联系表单或 GitHub Issues 联系我。

## 截图

网站包含以下部分：
- 主页横幅
- 文章展示
- 思考笔记（时间线）
- 开发日志
- GitHub 开源项目展示
- 联系表单

---

**提示**：记得在 `script.js` 中设置你的 GitHub 用户名，这样网站才能正确显示你的开源项目！
