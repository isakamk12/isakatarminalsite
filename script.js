const DATA = {
  works: {
    new: [
      "RUBORISTA",
      "Exalt or Fall",
      "KINGS SWORD",
      "Truth Cascades"
    ],
    ongoing: [
      "SIGNIA",
      "UNDYING DUTY"
    ],
    archive: [
      "BROKEN FANTASIA",
      "FAULT LINE",
      "SYNTOX",
      "TwisteD Children"
    ]
  },

  links: [
    { name: "小説家になろう", status: "active" },
    { name: "カクヨム", status: "active" },
    { name: "GitHub", status: "active" },
    { name: "X", status: "active" }
  ],

  meta: {
    siteName: "Stadio Vault",
    status: "Rebuilding"
  }
};
function renderWorks() {
  println("=== WORKS : CURRENT ===");

  printHTML(`
    <div class="terminal-section">
      <h3>New</h3>
      ${DATA.works.new.map(w => `<div class="w-item">${w}</div>`).join("")}

      <h3>Ongoing</h3>
      ${DATA.works.ongoing.map(w => `<div class="w-item">${w}</div>`).join("")}

      <h3>Archive</h3>
      <div class="w-note">Archive is being reorganized.</div>
    </div>
  `);
}
const COMMANDS = {
  help() {
    println("Available commands:");
    println("  works     - show current works");
    println("  links     - official platforms");
    println("  status    - site status");
    println("  clear     - clear terminal");
  },

  works() {
    renderWorks();
  },

  links() {
    println("=== OFFICIAL LINKS ===");
    DATA.links.forEach(l => {
      println(`[${l.status}] ${l.name}`);
    });
  },

  status() {
    println(`${DATA.meta.siteName}`);
    println(`Status : ${DATA.meta.status}`);
  }
};
function runCommand(cmd) {
  if (COMMANDS[cmd]) {
    COMMANDS[cmd]();
  } else {
    println(`Command not found: ${cmd}`);
  }
}
(() => {
  const markHeader = () => {
    // 1) まず一番それっぽいのを優先
    const header =
      document.querySelector('header[role="banner"]') ||
      document.querySelector('header') ||                 // 先頭のheader
      document.querySelector('body > *');                 // 最悪

    if (!header) return;

    // すでに付いてたら二重にしない
    header.classList.add('svhdr');

    // ヘッダー内のリンクも目印付け（visited色を必ず殺す）
    header.querySelectorAll('a').forEach(a => a.classList.add('svhdr-link'));

    // スクロールで薄くする（指示通り：常時表示だが目立ちすぎない）
    const onScroll = () => header.classList.toggle('svhdr-scrolled', window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markHeader);
  } else {
    markHeader();
  }
})();