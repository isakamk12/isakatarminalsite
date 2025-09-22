// HTMLの要素を取得
const output = document.getElementById('output');
const input = document.getElementById('input');
const terminal = document.getElementById('terminal');

// 最初に表示するメッセージ
const welcomeMessage = `
Welcome to My Portfolio Terminal!
- Type 'help' to see available commands.
`;

output.innerHTML += welcomeMessage;

// ユーザーがキーを押したときの処理
input.addEventListener('keydown', function(event) {
    // Enterキーが押された場合
    if (event.key === 'Enter') {
        const command = input.value; // 入力されたコマンドを取得
        
        // ユーザーが入力したコマンドを画面に表示
        output.innerHTML += `\n> ${command}\n`;

        // コマンドに応じて処理を分岐
        switch (command.toLowerCase()) {
            case 'help':
                output.innerHTML += `
Available commands:
  help    - Show this help message
  about   - Display information about me
  projects- List my projects
  contact - Show my contact information
  clear   - Clear the terminal screen
`;
                break;
            case 'about':
                // ここにあなたの自己紹介を書きましょう！
                output.innerHTML += 'Hello! 私はウェブサイトを作るのが好きな「コーディング パートナー」です。';
                break;
            case 'projects':
                // ここにあなたの作品リストを書きましょう！
                output.innerHTML += `
My Projects:
1. Terminal Portfolio - (You are here!)
2. Awesome App - A great application I built.
3. Another Project - Description of another project.
`;
                break;
            case 'contact':
                // ここにあなたの連絡先を書きましょう！
                output.innerHTML += `
You can reach me via:
- Email: your-email@example.com
- GitHub: your-github-username
`;
                break;
            case 'clear':
                // 画面をきれいにする
                output.innerHTML = '';
                break;
            default:
                // 知らないコマンドが入力された場合
                output.innerHTML += `Command not found: ${command}`;
                break;
        }

        // 入力欄を空にする
        input.value = '';
        // 常に最新の出力が見えるように一番下までスクロール
        terminal.scrollTop = terminal.scrollHeight;
    }
});