// 导航栏交互
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 汉堡菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // 平滑滚动和活动链接高亮
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // 移除所有活动类
                navLinks.forEach(link => link.classList.remove('active'));

                // 添加活动类到当前链接
                this.classList.add('active');

                // 关闭移动菜单
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // 滚动时更新活动导航链接
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('.section, .hero');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // 初始化 GitHub 项目
    initGitHubProjects();

    // 联系表单处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// GitHub 项目集成
async function initGitHubProjects() {
    const projectsContainer = document.getElementById('github-projects');

    // 替换为你的 GitHub 用户名
    const githubUsername = 'YS-Qd';

    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);

        if (!response.ok) {
            throw new Error('无法获取 GitHub 数据');
        }

        const repos = await response.json();

        if (repos.length === 0) {
            projectsContainer.innerHTML = `
                <div class="project-card">
                    <div class="project-header">
                        <i class="fab fa-github"></i>
                    </div>
                    <h3 class="project-title">暂无项目</h3>
                    <p class="project-description">请在 script.js 中设置你的 GitHub 用户名</p>
                </div>
            `;
            return;
        }

        projectsContainer.innerHTML = '';

        repos.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsContainer.appendChild(projectCard);
        });

    } catch (error) {
        console.error('获取 GitHub 项目失败:', error);
        projectsContainer.innerHTML = `
            <div class="project-card">
                <div class="project-header">
                    <i class="fab fa-github"></i>
                </div>
                <h3 class="project-title">加载失败</h3>
                <p class="project-description">请检查 GitHub 用户名设置或网络连接。在 script.js 文件中的 githubUsername 变量设置你的 GitHub 用户名。</p>
            </div>
        `;
    }
}

// 创建项目卡片
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';

    // 处理描述
    const description = repo.description || '暂无描述';
    const truncatedDescription = description.length > 100
        ? description.substring(0, 100) + '...'
        : description;

    // 获取主要语言
    const language = repo.language || 'Unknown';

    // 创建卡片HTML
    card.innerHTML = `
        <div class="project-header">
            <i class="fab fa-github"></i>
            <div class="project-stats">
                <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
            </div>
        </div>
        <h3 class="project-title">${repo.name}</h3>
        <p class="project-description">${truncatedDescription}</p>
        <div class="project-footer">
            <span class="project-language">${language}</span>
        </div>
    `;

    // 点击卡片跳转到项目
    card.addEventListener('click', function() {
        window.open(repo.html_url, '_blank');
    });

    return card;
}

// 表单提交处理
function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const message = e.target.querySelector('textarea').value;

    // 这里可以添加实际的表单提交逻辑
    // 例如：发送到后端API或使用第三方服务

    // 显示成功消息
    alert('感谢你的消息！我会尽快回复。');

    // 重置表单
    e.target.reset();
}

// 滚动动画
function revealOnScroll() {
    const elements = document.querySelectorAll('.card, .timeline-item, .log-entry, .project-card');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 初始化滚动动画
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// 设置所有可动画元素的初始状态
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.card, .timeline-item, .log-entry, .project-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // 立即触发一次检查
    revealOnScroll();
});

// 更新 GitHub 链接
document.addEventListener('DOMContentLoaded', function() {
    const githubUsername = 'YOUR_GITHUB_USERNAME';
    const githubLink = document.getElementById('github-link');

    if (githubLink && githubUsername !== 'YOUR_GITHUB_USERNAME') {
        githubLink.href = `https://github.com/${githubUsername}`;
    }
});

// 动态加载文章（示例）
function loadArticles() {
    // 这里可以从API或JSON文件加载文章
    // 示例：从本地JSON文件加载
    const articles = [
        {
            title: "构建现代化的Web应用",
            description: "探讨如何使用最新的Web技术栈构建高性能、可扩展的Web应用程序...",
            tag: "技术",
            date: "2025-10-29",
            link: "#"
        },
        {
            title: "CSS Grid布局完全指南",
            description: "深入理解CSS Grid布局系统，掌握现代网页布局的核心技术...",
            tag: "前端",
            date: "2025-10-25",
            link: "#"
        },
        {
            title: "异步编程最佳实践",
            description: "从Promise到async/await，学习JavaScript异步编程的最佳实践...",
            tag: "JavaScript",
            date: "2025-10-20",
            link: "#"
        }
    ];

    const articlesGrid = document.getElementById('articles-grid');
    if (articlesGrid) {
        articlesGrid.innerHTML = '';

        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <span class="tag">${article.tag}</span>
                    <span class="date">${article.date}</span>
                </div>
                <h3 class="card-title">${article.title}</h3>
                <p class="card-description">${article.description}</p>
                <a href="${article.link}" class="card-link">阅读更多 →</a>
            `;
            articlesGrid.appendChild(card);
        });
    }
}

// 主题切换（可选功能）
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');

            // 保存主题偏好
            const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });

        // 加载保存的主题偏好
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// 打字机效果（可选）
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// 使用示例（取消注释以启用）
// document.addEventListener('DOMContentLoaded', function() {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 50);
//     }
// });

