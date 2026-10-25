const navEl = document.querySelector('.nav-project');
const projectsSection = document.querySelector('.page-projects');
const sections = document.querySelectorAll('.page-section');

const contentDom = document.getElementById('txtContent');

// 加载 content.txt
fetch('/assets/txt/self-intro.txt')
    .then(res => res.text())
    .then(text => {
        contentDom.textContent = text;
    })
    .catch(err => {
        contentDom.textContent = "读取 content.txt 失败，请确认文件放在和 index.html 同一个文件夹";
        console.error(err);
    });

// PPT 翻页：滚动时切换 active 状态
function updateActiveSection() {
    let currentIndex = 0;
    let minDistance = Infinity;

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < minDistance) {
            minDistance = distance;
            currentIndex = parseInt(section.dataset.index, 10);
        }
    });

    sections.forEach((section, i) => {
        section.classList.toggle('active', i === currentIndex);
    });

    // 导航入场动画
    if (projectsSection.classList.contains('active')) {
        navEl.classList.add('show');
    } else {
        navEl.classList.remove('show');
    }
}

// 导航锚点跳转
function scrollToSection(target) {
    const el = document.querySelector(target);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

document.querySelectorAll('.dropdown-item[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        scrollToSection(link.getAttribute('href'));
    });
});

window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('resize', () => {
    navEl.classList.remove('show');
    updateActiveSection();
});

// 初始状态
updateActiveSection();
