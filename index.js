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

    // Hover Image Preview
    const hoverContainer = document.getElementById('hover-image-container');
    const hoverImage = document.getElementById('hover-image');

    if (hoverContainer && hoverImage) {
        document.querySelectorAll('.w-item[data-image]').forEach(item => {
            item.addEventListener('mouseenter', function (e) {
                const imgSrc = this.getAttribute('data-image');
                if (imgSrc) {
                    hoverImage.src = imgSrc;
                    hoverContainer.classList.add('visible');
                    // Optional: slight random rotation for style
                    const rot = (Math.random() - 0.5) * 6;
                    hoverContainer.style.transform = `translate(-50%, -50%) scale(1) rotate(${rot}deg)`;
                }
            });

            item.addEventListener('mousemove', function (e) {
                hoverContainer.style.left = e.clientX + 'px';
                hoverContainer.style.top = e.clientY + 'px';
            });

            item.addEventListener('mouseleave', function () {
                hoverContainer.classList.remove('visible');
                hoverContainer.style.transform = `translate(-50%, -50%) scale(0.9)`;
            });
        });
    }
})();
