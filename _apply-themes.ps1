$dir = 'C:\Users\rpgmi\Documents\isakatarminalsite-main'

$themeMap = @{
  'dark'   = @('broken-fantasia', 'exaxion', 'fault-line', 'fearless-tellers', 'gacha=deus', 'holmes-return', 'justify-paragon', 'kelvin-market', 'legal-weapon', 'milkprotocol', 'recyclerecital', 'signia', 'syntox', 'tool-or-human', 'undingduty', 'voltage-bandit')
  'horror' = @('cheaterpool', 'cthulhumeshi', 'dirtydetective', 'foaming-brain', 'imprisonment-by-relatives', 'rainingscreech', 'scary-sweet-story', 'session-in-last', 'twisted-children', 'urbansick', 'without-gospel')
  'epic'   = @('aninquiryintothenatureandcausesofthedeitiesofnations', 'canonization', 'declarationtostars', 'epocadejulgamento', 'exaltorfall', 'ignis-ad-ignem', 'kingssword', 'longinus', 'martyrdom', 'ordealsofsky', 'shinkaikunsho', 'simon-bolivar')
  'sepia'  = @('accidentoclock', 'bad-blank-beyond', 'boy-in-a-wedding-dress', 'broken-heart-doctor', 'carrington-eve', 'closetandcontact', 'corona-borealis', 'datchwife', 'frenchguilty', 'gangster-grace-grade', 'half-winged-halt', 'hateful-rough-story', 'heartattackdiva', 'heavens-callcenter', 'looks-of-me', 'love-comi-cleanup', 'overcharged-romance', 'papers-purity-performance', 'proof-of-photographs', 'raining-ruin-letter', 'relation-translation', 'reverse-logic-rough-love', 'tall-order-tales', 'torutsume', 'trendy-treading-tragedy', 'twobirdsascent', 'unlabel-love', 'updown-swap', 'villainess-dog', 'voiswitching')
  'pastel' = @('escalation-hearts', 'fitmatch', 'flowers-in-may', 'heat-charge', 'lovely-buddy', 'tracks-and-strucks', 'trade-and-taste', 'when-stormy-whether')
  'grave'  = @('anywayreals', 'hazuretasharin', 'theseusnofune', 'trigonometryplane')
}

$ok = 0
$err = 0

foreach ($theme in $themeMap.Keys) {
  $tplFile = Join-Path $dir "_tpl-$theme.html"
  $tpl = [System.IO.File]::ReadAllText($tplFile, [System.Text.Encoding]::UTF8)

  foreach ($base in $themeMap[$theme]) {
    $file = Join-Path $dir "$base.html"
    if (-not (Test-Path $file)) {
      Write-Warning "MISSING: $file"
      $err++
      continue
    }
    try {
      $raw = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

      # 背景画像URL
      $bgMatch = [regex]::Match($raw, "url\('([^']+)'\)")
      $bg = if ($bgMatch.Success) { $bgMatch.Groups[1].Value } else { "image/$base.png" }

      # 各要素
      $rx1 = [regex]::Match($raw, '(?s)class="catch-copy"[^>]*>(.*?)</p>')
      $catch = if ($rx1.Success) { $rx1.Groups[1].Value.Trim() } else { '' }

      $rx2 = [regex]::Match($raw, '(?s)class="work-title"[^>]*>(.*?)</h1>')
      $title = if ($rx2.Success) { $rx2.Groups[1].Value.Trim() } else { $base }

      $rx3 = [regex]::Match($raw, '(?s)class="meta-info"[^>]*>(.*?)</p>')
      $meta = if ($rx3.Success) { $rx3.Groups[1].Value.Trim() } else { 'NOVEL' }

      $rx4 = [regex]::Match($raw, '(?s)class="synopsis-box"[^>]*>(.*?)</div>')
      $syn = if ($rx4.Success) { $rx4.Groups[1].Value.Trim() } else { '' }

      $rx5 = [regex]::Match($raw, '(?s)class="button-grid"[^>]*>(.*?)</div>(?=\s*</div>)')
      $btns = if ($rx5.Success) { $rx5.Groups[1].Value.Trim() } else { '' }

      # テンプレートに差し込む
      $out = $tpl.Replace('{{BG}}', $bg).Replace('{{CATCH}}', $catch).Replace('{{TITLE}}', $title).Replace('{{META}}', $meta).Replace('{{SYNOPSIS}}', $syn).Replace('{{BUTTONS}}', $btns)

      [System.IO.File]::WriteAllText($file, $out, [System.Text.Encoding]::UTF8)
      Write-Host "OK [$theme] $base.html"
      $ok++
    }
    catch {
      Write-Warning "ERR ${base}: $_"
      $err++
    }
  }
}

Write-Host ""
Write-Host "=== 完了: $ok 件処理, $err 件エラー ==="
