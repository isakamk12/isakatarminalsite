(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'mouse-trail-canvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let points = [];
    const maxPoints = 20;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        points.push({
            x: e.clientX,
            y: e.clientY,
            age: 0
        });
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        if (points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length; i++) {
                const p = points[i];
                const prev = points[i - 1];

                // Draw line with varying width based on proximity to the end
                const size = (i / points.length) * 5;
                ctx.lineWidth = size;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                // Set glow effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
                const opacity = (i / points.length) * (1 - points[i].age / maxPoints);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;

                ctx.lineTo(p.x, p.y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
            }
        }

        // Update age and filter out old points
        for (let i = points.length - 1; i >= 0; i--) {
            points[i].age++;
            if (points[i].age > maxPoints) {
                points.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
})();
