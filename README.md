# 🎯 AI Resume - Intelligent Resume Generation & Management Platform

A powerful online resume builder with real-time preview, editing, and export capabilities. Built with React + Vite for fast performance and smooth user experience.

**[中文版 README](./README_CN.md)**

## ✨ Key Features

- 📝 **Multi-Section Resume Editing**: Personal info, work experience, education, projects, skills, and certificates
- 👁️ **Real-Time Preview**: See changes instantly as you edit
- 🖨️ **Print & Export**: Export to HTML and print to PDF
- 💾 **Auto-Save**: Browser localStorage automatically saves your data
- 📱 **Responsive Design**: Works perfectly on all devices and screen sizes
- 🎨 **Modern UI**: Built with Tailwind CSS and Radix UI components
- 📄 **Pagination**: Automatically splits content into multiple pages without scrollbars

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.17
- **UI Components**: Radix UI
- **Routing**: React Router DOM 7.9.5
- **Animations**: GSAP, Three.js
- **Icons**: Lucide Icons

## 📋 Project Structure

```
ai-resume/
├── src/
│   ├── components/
│   │   ├── dashboard/          # Dashboard components
│   │   │   ├── DashboardCreate.jsx      # Main resume creation page
│   │   │   ├── ResumePreview.jsx        # Real-time preview
│   │   │   ├── PersonalInfoForm.jsx     # Personal info form
│   │   │   ├── WorkExperienceForm.jsx   # Work experience form
│   │   │   ├── EducationForm.jsx        # Education form
│   │   │   ├── ProjectsForm.jsx         # Projects form
│   │   │   ├── SkillsForm.jsx           # Skills form
│   │   │   ├── CertificatesForm.jsx     # Certificates form
│   │   │   └── Summary.jsx              # Summary form
│   │   ├── home/                        # Home page components
│   │   └── ui/                          # Reusable UI components
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   └── Dashboard.jsx        # Dashboard page
│   ├── lib/
│   ├── hooks/
│   ├── context/
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
├── public/                      # Static assets
├── package.json
├── vite.config.js
├── index.html
└── jsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/626-Legendary/ai-resume.git
   cd ai-resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will open at `http://localhost:5173` (Vite default port)

4. **Edit code**
   The project supports HMR (Hot Module Replacement) for instant updates

### Build for Production

```bash
npm run build
# or
yarn build
```

Output files will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📦 Deployment Guide

### 1. Vercel Deployment (Recommended) ⭐

**Advantages**: Fast, simple, free, automatic CI/CD

1. Push code to GitHub
   ```bash
   git push origin main
   ```

2. Visit [Vercel](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Select your `ai-resume` repository
   - Click "Deploy"

3. Vercel automatically detects Vite configuration
   - Build Command: `npm run build`
   - Output Directory: `dist`

**Done!** Your app will be live at a URL like `https://your-project.vercel.app`

### 2. Netlify Deployment

1. Push code to GitHub
2. Visit [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your `ai-resume` repository

3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

### 3. GitHub Pages Deployment

1. Edit `vite.config.js` to add base path:
   ```javascript
   export default defineConfig({
     base: '/ai-resume/', // if your repo name is ai-resume
     // ... other config
   });
   ```

2. Build the project
   ```bash
   npm run build
   ```

3. Push to GitHub
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. In repository settings:
   - Go to "Settings" → "Pages"
   - Select "GitHub Actions" as source
   - Create `.github/workflows/deploy.yml`:

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

5. Push the workflow file, GitHub Actions will deploy automatically

### 4. Docker Deployment

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

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

Build and run:

```bash
docker build -t ai-resume .
docker run -p 8080:80 ai-resume
```

Visit `http://localhost:8080`

### 5. Traditional Server Deployment (Apache, Nginx)

1. Build the project
   ```bash
   npm run build
   ```

2. Upload all files from `dist/` to your server

3. **Nginx Configuration**
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

4. **Apache Configuration** (requires mod_rewrite)
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

5. Restart your server
   ```bash
   sudo systemctl restart nginx
   # or
   sudo systemctl restart apache2
   ```

## 📝 Available Commands

```bash
# Development mode
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Preview build
npm run preview
```

## 🔒 Data Security

- All data is stored in browser's localStorage
- No server communication (completely offline capable)
- Your data never leaves your device

## 🤝 Features Overview

### Personal Information
- Name, job title, location
- Contact: phone, email, LinkedIn, portfolio, etc.

### Work Experience
- Position, company, date range
- Work location
- Description (multi-line support)

### Education
- School, degree, field of study
- Study period
- GPA (optional)
- City and country

### Projects
- Project name and link
- Date range
- Organization
- Description

### Skills
- Multi-line input support
- Auto-formatted (separated by |)

### Certificates
- Certificate name
- Issuing organization
- Issue date
- Credential ID and URL

### Summary
- Free-form professional summary
- Multi-line support

## 🎨 Customization

### Change Color Theme

Edit `src/index.css` or Tailwind configuration to customize colors.

### Modify Resume Style

Edit styles in `src/components/dashboard/ResumePreview.jsx`.

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Specify a different port
npm run dev -- --port 3000
```

### Dependency Installation Failed

```bash
# Clear cache and reinstall
npm cache clean --force
npm install
```

### Build Failed

```bash
# Delete node_modules and package-lock.json, then reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📞 Support & Feedback

Please submit issues and pull requests for bug reports and feature requests.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

Thanks to all the open-source project contributors:

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

---

**Happy coding!** 🚀
