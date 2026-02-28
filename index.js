(function () {
    // 背景グリッドランダム化
    const bgGrid = document.getElementById('cover-bg-grid');
    if (bgGrid) {
        const TOTAL = 34;
        const nums = Array.from({ length: TOTAL }, (_, i) => i + 1).sort(() => Math.random() - .5);
        nums.slice(0, 4).forEach(n => {
            const img = document.createElement('img');
            img.src = `image/background-${n}.png`;
            bgGrid.appendChild(img);
        });
    }
    // ロゴランダム化
    const logoImg = document.getElementById('cover-logo');
    if (logoImg) {
        const logos = [1, 2, 3, 5];
        logoImg.src = `image/logo-${logos[Math.floor(Math.random() * logos.length)]}.png`;
    }

    // カテゴリ名に作品数バッジを自動追加
    document.querySelectorAll('.category-name').forEach(cat => {
        const grid = cat.nextElementSibling;
        if (grid && grid.classList.contains('works-grid')) {
            const count = grid.querySelectorAll('.w-item').length;
            const badge = document.createElement('span');
            badge.className = 'category-count';
            badge.textContent = `${count} works`;
            cat.appendChild(badge);
        }
    });

    // reveal
    function runReveal() {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('active');
            }
        });
    }
    // スクロール
    window.addEventListener('scroll', () => {
        const masthead = document.getElementById('masthead');
        if (masthead) masthead.classList.toggle('scrolled', window.scrollY > 80);
        runReveal();
    });
    runReveal();
})();
