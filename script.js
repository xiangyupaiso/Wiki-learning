// script.js - 所有交互逻辑

// 1. 搜索功能：过滤左侧Project列表
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function (e) {
    const searchText = e.target.value.trim().toLowerCase();
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach(item => {
        const itemText = item.textContent.trim().toLowerCase();
        // 匹配则显示，不匹配则隐藏
        item.style.display = itemText.includes(searchText) ? 'block' : 'none';
    });
});

// 2. 左侧Project点击事件（加载对应项目详情）
const projectItems = document.querySelectorAll('.project-item');
projectItems.forEach(item => {
    item.addEventListener('click', function () {
        const projectName = this.dataset.project;
        alert(`正在加载 ${projectName} 的详情页面...`);
        // 实际开发中可替换为：
        // window.location.href = `./${projectName}.html`;
    });
});

// 3. 所有卡片点击跳转（圆形/长方形/底部通栏）
const clickableCards = document.querySelectorAll('[data-link]');
clickableCards.forEach(card => {
    card.addEventListener('click', function () {
        const link = this.dataset.link;
        // 新标签页打开详情页
        window.open(link, '_blank');
    });
});