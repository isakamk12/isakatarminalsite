// ===== Terminal Portfolio Script =====
(function () {
  const output = document.getElementById('output');
  const input = document.getElementById('input');
  const terminal = document.getElementById('terminal');
  const bg = document.getElementById('background-container');

  // ---- Helper: print to terminal ----
  function println(text = "") {
    const line = document.createElement('div');
    line.textContent = text;
    output.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }

  // 複数行をまとめて即時出力
  function printLines(lines, done) {
    lines.forEach(text => println(text));
    if (done) done();
  }

  // ---- Matrix Rain ----
  function initMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.15';
    bg.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 14;
    const columns = () => Math.floor(canvas.width / fontSize);
    let drops = new Array(columns()).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px Courier New, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ---- ランダム背景（4枚） ----
  function setRandomBackgroundGrid() {
    const bgImages = [];
    for (let i = 1; i <= 34; i++) {
      bgImages.push(`image/background-${i}.png`);
    }

    const chosen = [];
    while (chosen.length < 4) {
      const pick = bgImages[Math.floor(Math.random() * bgImages.length)];
      if (!chosen.includes(pick)) chosen.push(pick);
    }

    const grid = document.getElementById("background-grid");
    grid.innerHTML = "";
    chosen.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      grid.appendChild(img);
    });
  }
function fadeOutBackground() {
  const grid = document.getElementById("background-grid");
  setTimeout(() => {
    grid.style.opacity = "0.2"; // ← 数字を変えれば残り方調整できる
  }, 5000); // ← 5秒後に実行
}
  // ---- ランダムロゴ（1枚） ----
  function setRandomLogo() {
    const logos = [
      "image/logo-1.png",
      "image/logo-2.png",
      "image/logo-3.png",
      "image/logo-4.png",
      "image/logo-5.png",
      "image/logo-6.png"
    ];
    const chosen = logos[Math.floor(Math.random() * logos.length)];
    document.getElementById("logo").src = chosen;
  }

  // ---- Commands ----
  const commands = {
    help() {
      println("Available commands:");
      println("- help: show this help");
      println("- about: about me");
      println("- projects: recent works");
      println("- contact: how to reach me");
      println("- clear: clear the screen");
    },
    about() {
      printLines(["AI × クリエイティブ × 物語制作"]);
    },
    projects() {
      printLines([
        "最近の活動：",
        "・AI 開発",
        "・小説執筆",
        "",
        "詳細は以下のページから：",
        "- GitHub: https://github.com/isakamk12/isakatarminalsite",
        "- note: https://note.com/your-username",
        "- pixiv: https://www.pixiv.net/users/your-userid",
        "- Website: https://your-portfolio-site.example"
      ]);
    },
    contact() {
      println("Contact:");
      println("- X/Twitter: @your_account");
      println("- Email: your.name@example.com");
    },
    clear() {
      output.innerHTML = "";
    }
  };

  function runCommand(cmd) {
    const clean = (cmd || "").trim();
    if (!clean) return;
    println("> " + clean);
    const [head] = clean.split(/\s+/);
    if (commands[head]) {
      commands[head]();
    } else {
      println(`Command not found: ${head}`);
      println(`Type 'help' to see available commands.`);
    }
  }

  // ---- Input ----
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      runCommand(input.value);
      input.value = '';
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      commands.clear();
    }
  });

  // ---- Opening Video ----
  function showOpening(done) {
    const opening = document.getElementById("opening");
    const video = opening.querySelector("video");
    const source = video.querySelector("source");

    const videos = [
      "image/header_page-1.mp4",
      "image/header_page-2.mp4",
      "image/header_page-3.mp4",
      "image/header_page-4.mp4",
      "image/header_page-5.mp4",
      "image/header_page-6.mp4",
      "image/header_page-7.mp4",
      "image/header_page-8.mp4",
      "image/header_page-9.mp4",
      "image/header_page-10.mp4"
    ];

    source.src = videos[Math.floor(Math.random() * videos.length)];
    video.load();
    video.play();

    opening.style.display = "flex";

    video.addEventListener("ended", () => {
      opening.style.display = "none";
      done();
    });
  }

  // ---- Boot ----
  function boot() {
    showOpening(() => {
      setRandomBackgroundGrid();
      setRandomLogo();
      initMatrixRain();
      fadeOutBackground(); // ← ここで背景フェードアウト開始
      printLines([
        "Portfolio Terminal 起動完了",
        "Type 'help' でコマンド一覧を表示します"
      ]);
      input.focus();
    });
  }

  document.addEventListener('click', () => input.focus());
  boot();
})();
