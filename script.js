// ===== Terminal Portfolio Script (Fixed Version) =====
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

  // ---- Helper: Print HTML directly (カード表示用) ----
  function printHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    output.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
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

  // ---- ランダム背景 ----
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
    if(grid) {
        grid.innerHTML = "";
        chosen.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        grid.appendChild(img);
        });
    }
  }

  function fadeOutBackground(opacity = 0.2, delayMs = 5000) {
    const grid = document.getElementById('background-grid');
    if(grid) {
        setTimeout(() => {
            grid.style.opacity = String(opacity);
        }, delayMs);
    }
  }

  // ---- ランダムロゴ ----
  function setRandomLogo() {
    const logos = [
      "image/logo-1.png", "image/logo-2.png", "image/logo-3.png",
      "image/logo-4.png", "image/logo-5.png", "image/logo-6.png"
    ];
    const chosen = logos[Math.floor(Math.random() * logos.length)];
    const logoEl = document.getElementById("logo");
    if(logoEl) logoEl.src = chosen;
  }

  // ---- Commands (ここが一番重要です！) ----
  const commands = {
    help() {
      println("Available commands:");
      println("- help    : このヘルプを表示");
      println("- about   : Stadio Vaultについて");
      println("- projects: 作品・プラットフォーム全一覧を表示");
      println("- clear   : 画面をクリア");
      println("- pdf     : 企画書PDFを開く");
    },
    about() {
      println("Stadio Vault: AI × クリエイティブ × 物語制作");
    },
    projects() {
      // 実行されたことがわかるようにログを出す
      println("Stadio Vault Archive を展開中... (Updated Ver)");
      
      const html = `
        <div class="terminal-archive">
          <h2 class="archive-title">External Platforms</h2>
          <div class="archive-grid">
            <div class="a-card"><span class="a-tag">新作最速投稿!</span><div class="a-name">小説家になろう</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">厳選済み</span><div class="a-name">カクヨム</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">補足多め</span><div class="a-name">アルファポリス</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">祝千フォロー!</span><div class="a-name">Pixiv</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">AI開発</span><div class="a-name">GitHub</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">報告</span><div class="a-name">X (Twitter)</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">使用中</span><div class="a-name">Instagram</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">疎遠</span><div class="a-name">Facebook</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">一応</span><div class="a-name">Threads</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">先行公開</span><div class="a-name">note</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">思考停止</span><div class="a-name">Twitch</div><div class="a-note">配信してみたいが...</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">再生数逆転</span><div class="a-name">TikTok</div><div class="a-note">Youtubeと真逆</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">南アジア</span><div class="a-name">Dailymotion</div><div class="a-note">インド人多め</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">容量厳</span><div class="a-name">Vimeo</div><a href="#" class="a-btn">Click</a></div>
            <div class="a-card"><span class="a-tag">動画予定</span><div class="a-name">Youtube</div><a href="#" class="a-btn">Click</a></div>
          </div>
  
          <h2 class="archive-title">Works Index</h2>
  
          <h3 class="w-cat">実話シリーズ(閲覧注意)</h3>
          <div class="w-grid">
            <div class="w-item">死屍涙々</div>
            <div class="w-item">外れた車輪</div>
            <div class="w-item">テセウスの船</div>
            <div class="w-item">平坦球体或いは三角関数</div>
            <div class="w-item">ダイタイジツワ</div>
          </div>
  
          <h3 class="w-cat">12月投稿短編シリーズ</h3>
          <div class="w-grid">
            <div class="w-item">私なら伝えられる<span class="w-en">Relation Translation</span></div>
            <div class="w-item">読書感想文と君<span class="w-en">Bad Blank Beyond</span></div>
            <div class="w-item">猫の花泥棒<span class="w-en">Faded Floral Felon</span></div>
            <div class="w-item">陸上部vs美術部<span class="w-en">Tracks and Strucks</span></div>
            <div class="w-item">注文の多いラブコメディ<span class="w-en">Tall order tales</span></div>
            <div class="w-item">命を捧ぐ愛<span class="w-en">Trendy Treading Tragedy</span></div>
            <div class="w-item">十年前マッチングアプリ<span class="w-en">Proof of Photographs</span></div>
            <div class="w-item">エスカレーション･ハート<span class="w-en">Escalation Hearts</span></div>
            <div class="w-item">ヘブンズ･コールセンター<span class="w-en">Heavens Callcenter</span></div>
            <div class="w-item">怪奇作家の恋愛事情<span class="w-en">Scary Sweet Story</span></div>
            <div class="w-item">言葉は少し不器用なので<span class="w-en">Miss Leaks & Mosreads</span></div>
            <div class="w-item">半端にスイッチング<span class="w-en">Voiswitching</span></div>
            <div class="w-item">ヘイト･ラブ･コンバージョン<span class="w-en">Reverse Logic</span></div>
            <div class="w-item">調香<span class="w-en">Musk of Mistake</span></div>
            <div class="w-item">元ヤン悪役令嬢<span class="w-en">Gangster Grace Grade</span></div>
            <div class="w-item">レンタル彼氏vs彼女<span class="w-en">Overcharged Romance</span></div>
            <div class="w-item">恋の天気予報士<span class="w-en">When stormy whether</span></div>
            <div class="w-item">逆タイムカプセル<span class="w-en">Papers purity</span></div>
            <div class="w-item">傷だらけの熱田さん<span class="w-en">Hateful rough Story</span></div>
          </div>
  
          <h3 class="w-cat">連載メイン / ゲームシナリオ</h3>
          <div class="w-grid">
            <div class="w-item">RUBORISTA</div>
            <div class="w-item">DOOMSDAY SYNDROMES</div>
            <div class="w-item">花、咲き揃うまで</div>
            <div class="w-item">VOLTAGE BANDIT</div>
            <div class="w-item">BROKEN FANTASIA</div>
            <div class="w-item">Exaxion（XX）</div>
            <div class="w-item">FAULT LINE</div>
            <div class="w-item">SYNTOX</div>
            <div class="w-item">TwisteD Children</div>
            <div class="w-item">FEARLESS TELLERS</div>
            <div class="w-item">GACHA=DEUS</div>
            <div class="w-item">無法聖典</div>
            <div class="w-item">#Unlabel Love</div>
            <div class="w-item">SIGNIA</div>
            <div class="w-item">なりきれない僕らは</div>
            <div class="w-item">UNDYING DUTY</div>
            <div class="w-item">JUSTIFY PARAGON</div>
            <div class="w-item">Re:cycle Re:cital</div>
            <div class="w-item">MILK PROTOCOL</div>
            <div class="w-item">ラブコメディの後始末</div>
            <div class="w-item">都会旅団</div>
            <div class="w-item">泡立つ脳</div>
            <div class="w-item">Lovely Buddy</div>
            <div class="w-item">Fit Match</div>
          </div>
  
          <h3 class="w-cat">継承物語群</h3>
          <div class="w-grid">
            <div class="w-item">平和戦記</div>
            <div class="w-item">KINGS SWORD</div>
            <div class="w-item">Exalt or Fall</div>
            <div class="w-item">継承物語</div>
          </div>
  
          <h3 class="w-cat">拝金主義四部作</h3>
          <div class="w-grid">
            <div class="w-item">拝金主義</div>
            <div class="w-item">廃金主義</div>
            <div class="w-item">廃吟主義</div>
            <div class="w-item">配金主義</div>
          </div>
  
          <h3 class="w-cat">ネガティブ･フェイス三部作</h3>
          <div class="w-grid">
            <div class="w-item">Looks of me</div>
            <div class="w-item">UP DOWN SWAP</div>
            <div class="w-item">失恋専門医</div>
          </div>
  
          <h3 class="w-cat">Truth Cascades三部作</h3>
          <div class="w-grid">
            <div class="w-item">Holmes Return</div>
            <div class="w-item">KELVIN MARKET</div>
            <div class="w-item">LEGAL WEAPON</div>
          </div>
  
          <h3 class="w-cat">シンギュラー･シグナルス三部作</h3>
          <div class="w-grid">
            <div class="w-item">列聖</div>
            <div class="w-item">殉教</div>
            <div class="w-item">LONGINUS</div>
          </div>
  
          <h3 class="w-cat">TRPG / Ordeals of Sky三部作</h3>
          <div class="w-grid">
            <div class="w-item">狂気の機関車ショー</div>
            <div class="w-item">全て、白日の元に</div>
            <div class="w-item">閉鎖海岸/平坂異岸</div>
            <div class="w-item">悪夢の氾濫/認知的不協和</div>
            <div class="w-item">届かねばならぬ場所/心不在</div>
          </div>
  
          <h3 class="w-cat">諸国民の神五部作</h3>
          <div class="w-grid">
            <div class="w-item">天与歴程/種の棄権</div>
            <div class="w-item">大きな森の小さな人間</div>
            <div class="w-item">諸国民の神/宇宙の長い午後</div>
            <div class="w-item">護教正義/急約聖書</div>
            <div class="w-item">功労夢/欠落園</div>
          </div>
          
          <h3 class="w-cat">Other</h3>
          <div class="w-grid">
            <div class="w-item">クトゥルフ飯</div>
          </div>
  
        </div>
      `;
      printHTML(html);
    },
    contact() {
      println("Contact:");
      println("- X/Twitter: @your_account");
    },
    pdf() {
      println("Opening PDF...");
      window.open("image/page.pdf", "_blank");
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

  // ---- Opening Video & Boot ----
  function showOpening(done) {
    const opening = document.getElementById("opening");
    if(!opening) { done(); return; }
    const video = opening.querySelector("video");
    const source = video.querySelector("source");

    const videos = [
      "image/header_page-1.mp4", "image/header_page-2.mp4", "image/header_page-3.mp4",
      "image/header_page-4.mp4", "image/header_page-5.mp4", "image/header_page-6.mp4",
      "image/header_page-7.mp4", "image/header_page-8.mp4", "image/header_page-9.mp4", "image/header_page-10.mp4"
    ];

    source.src = videos[Math.floor(Math.random() * videos.length)];
    video.load();
    video.play().catch(e => { console.log("Autoplay blocked", e); done(); });

    opening.style.display = "flex";

    video.addEventListener("ended", () => {
      opening.style.display = "none";
      done();
    });
  }

  function boot() {
    showOpening(() => {
      setRandomBackgroundGrid();
      setRandomLogo();
      initMatrixRain();
      printLines([
        "Portfolio Terminal 起動完了",
        "System ready...",
        "Type 'projects' to see works."
      ]);
      fadeOutBackground(0.2, 5000);
      
      // 自動で projects を実行して確認しやすくする
      setTimeout(() => {
         runCommand("projects");
      }, 1000);

      input.focus();
    });
  }
  document.addEventListener('click', () => input.focus());
  boot();
})();
