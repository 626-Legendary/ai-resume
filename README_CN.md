# 🎯 AI Resume - 智能简历生成与管理平台

一个功能强大的在线简历生成、编辑和导出工具。使用 React + Vite 构建，提供直观的用户界面和实时预览功能。

## ✨ 主要特性

- 📝 **多部分简历编辑**：个人信息、工作经验、教育背景、项目、技能和证书
- 👁️ **实时预览**：在编辑时实时查看简历效果
- 🖨️ **打印和导出**：支持 HTML 格式导出和打印为 PDF
- 💾 **本地存储**：使用浏览器 localStorage 自动保存数据
- 📱 **响应式设计**：完美适配各种设备和屏幕尺寸
- 🎨 **现代 UI**：使用 Tailwind CSS 和 Radix UI 组件
- 📄 **分页显示**：内容超出一页时自动分页，无滚动条

## 🛠️ 技术栈

- **前端框架**：React 19.1.1
- **构建工具**：Vite 7.1.7
- **样式**：Tailwind CSS 4.1.17
- **UI 组件**：Radix UI
- **路由**：React Router DOM 7.9.5
- **其他**：GSAP, Three.js, Lucide Icons

## 📋 项目结构

```
ai-resume/
├── src/
│   ├── components/
│   │   ├── dashboard/          # 仪表板组件
│   │   │   ├── DashboardCreate.jsx      # 简历创建主页面
│   │   │   ├── ResumePreview.jsx        # 实时预览
│   │   │   ├── PersonalInfoForm.jsx     # 个人信息表单
│   │   │   ├── WorkExperienceForm.jsx   # 工作经验表单
│   │   │   ├── EducationForm.jsx        # 教育背景表单
│   │   │   ├── ProjectsForm.jsx         # 项目表单
│   │   │   ├── SkillsForm.jsx           # 技能表单
│   │   │   ├── CertificatesForm.jsx     # 证书表单
│   │   │   └── Summary.jsx              # 个人总结表单
│   │   ├── home/                        # 首页组件
│   │   └── ui/                          # 通用 UI 组件
│   ├── pages/
│   │   ├── Home.jsx            # 首页
│   │   └── Dashboard.jsx        # 仪表板页面
│   ├── lib/
│   ├── hooks/
│   ├── context/
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
├── public/                      # 静态资源
├── package.json
├── vite.config.js
├── index.html
└── jsconfig.json
```

## 🚀 快速开始

### 前置要求

- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/626-Legendary/ai-resume.git
   cd ai-resume
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

   应用将在 `http://localhost:5173` 打开（Vite 默认端口）

4. **编辑代码**
   项目支持 HMR (Hot Module Replacement)，修改代码后会自动刷新

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

生成的文件将在 `dist/` 目录中。

### 预览构建结果

```bash
npm run preview
# 或
yarn preview
```

## 📦 部署指南

### 1. Vercel 部署（推荐）

**优点**：快速、简单、免费、自动 CI/CD

1. 推送代码到 GitHub
   ```bash
   git push origin main
   ```

2. 访问 [Vercel](https://vercel.com) 官网
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 选择你的 `ai-resume` 仓库
   - 点击 "Deploy"

3. Vercel 会自动检测 Vite 配置并部署
   - 构建命令：`npm run build`
   - 输出目录：`dist`

**部署完成**后，你会得到一个类似 `https://your-project.vercel.app` 的链接

### 2. Netlify 部署

1. 推送代码到 GitHub
2. 访问 [Netlify](https://netlify.com)
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub
   - 选择 `ai-resume` 仓库

3. 配置构建设置：
   - 构建命令：`npm run build`
   - 发布目录：`dist`
   - 点击 "Deploy site"

### 3. GitHub Pages 部署

1. 编辑 `vite.config.js` 添加 base 路径：
   ```javascript
   export default defineConfig({
     base: '/ai-resume/', // 如果仓库名是 ai-resume
     // ... 其他配置
   });
   ```

2. 构建项目
   ```bash
   npm run build
   ```

3. 推送到 GitHub
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. 在 GitHub 仓库设置中：
   - 进入 "Settings" → "Pages"
   - "Source" 选择 "GitHub Actions"
   - 创建 `.github/workflows/deploy.yml` 文件：

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
         
         - name: Install dependencies
           run: npm install
         
         - name: Build
           run: npm run build
         
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

5. 推送 workflow 文件，GitHub Actions 会自动部署

### 4. Docker 部署

创建 `Dockerfile`：

```dockerfile
# 构建阶段
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

创建 `nginx.conf`：

```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

构建和运行：

```bash
docker build -t ai-resume .
docker run -p 8080:80 ai-resume
```

访问 `http://localhost:8080`

### 5. 传统服务器部署（如 Apache、Nginx）

1. 构建项目
   ```bash
   npm run build
   ```

2. 将 `dist/` 目录下的所有文件上传到服务器

3. **Nginx 配置**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           root /var/www/ai-resume;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Apache 配置**（需要 mod_rewrite）
   ```apache
   <Directory /var/www/ai-resume>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
   </Directory>
   ```

5. 重启服务器
   ```bash
   sudo systemctl restart nginx
   # 或
   sudo systemctl restart apache2
   ```

## 📝 可用命令

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 代码检查
npm run lint

# 预览构建结果
npm run preview
```

## 🔒 数据安全

- 所有数据存储在浏览器的 localStorage 中
- 没有与服务器通信（完全离线可用）
- 用户数据永远不会上传到任何服务器

## 🤝 主要功能说明

### 个人信息
- 姓名、职位、位置
- 联系方式：电话、邮箱、LinkedIn、作品集等

### 工作经验
- 职位、公司、时间范围
- 工作地点
- 工作描述（支持多行）

### 教育背景
- 学校、学位、专业
- 学习时间
- GPA（可选）
- 所在城市和国家

### 项目经验
- 项目名称和链接
- 时间范围
- 所属组织
- 项目描述

### 技能
- 支持多行输入
- 自动格式化（用 | 分隔）

### 证书
- 证书名称
- 颁发机构
- 颁发日期
- 凭证 ID 和 URL

### 个人总结
- 自由格式的职业总结
- 支持多行输入

## 🎨 自定义

### 修改颜色主题

编辑 `src/index.css` 或 Tailwind 配置文件来自定义颜色。

### 修改简历样式

编辑 `src/components/dashboard/ResumePreview.jsx` 中的样式类和内联样式。

## 🐛 故障排查

### 端口已被占用

```bash
# 指定其他端口
npm run dev -- --port 3000
```

### 依赖安装失败

```bash
# 清除缓存后重新安装
npm cache clean --force
npm install
```

### 构建失败

```bash
# 删除 node_modules 和 package-lock.json 后重新安装
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📞 支持和反馈

如有问题或建议，请提交 Issue 或 Pull Request。

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🙏 致谢

感谢所有开源项目的贡献者：

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

---

**祝你使用愉快！** 🚀
