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

  function typeLines(lines, delay = 18, done) {
    let i = 0, j = 0, buf = "";
    const lineEl = document.createElement('div');
    output.appendChild(lineEl);

    function tick() {
      if (i >= lines.length) {
        if (done) done();
        return;
      }
      const line = lines[i];
      if (j < line.length) {
        buf += line[j];
        lineEl.textContent = buf;
        j++;
      } else {
        i++;
        j = 0;
        buf = "";
        output.appendChild(document.createElement('br'));
      }
      terminal.scrollTop = terminal.scrollHeight;
      setTimeout(tick, delay);
    }
    tick();
  }

  // ---- Background animation (simple matrix rain) ----
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

  // ---- Command handlers ----
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
      typeLines([
        "こんにちは。ここは私のポートフォリオ。",
        "AI × クリエイティブ × 物語制作を中心に活動しています。",
        "設計、文章、画像生成、軽いツール開発まで、理屈と手触りを両立させるのが得意です。"
      ]);
    },
    projects() {
      typeLines([
        "最近の制作：",
        "・TRPG/小説 IP『Isaka-Akasi』の章構成とビジュアル検証",
        "・LoRA/タグ運用の自動化スクリプト原型",
        "・縦長9:16の一貫出力テンプレート（画像/表紙）"
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

  // ---- Input handling ----
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      runCommand(input.value);
      input.value = '';
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      commands.clear();
    }
  });

  // ---- Opening video (random one) ----
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

    // 動画が終わったらオープニングを消す
    video.addEventListener("ended", () => {
      opening.style.display = "none";
      done();
    });
  }

  // ---- Boot ----
  function boot() {
    showOpening(() => {
      initMatrixRain();
      typeLines([
        "Booting portfolio terminal...",
        "Type 'help' to begin."
      ], 14);
      input.focus();
    });
  }

  document.addEventListener('click', () => input.focus());
  boot();
})();
