// Renders the main scenes in prize-assets/scenes.js to previews/<screen>/<id>.png at each LED screen's real size, using headless Chrome (Edge as a fallback:
// when Edge is already running it hands the job to that window and writes nothing).
// Needs the site served locally first (the "mockup" server in .claude/launch.json, port 5173).
//   node tools/render-previews.js [baseUrl]
const fs = require("fs"), path = require("path"), vm = require("vm"), { execFileSync } = require("child_process");

const root = path.join(__dirname, "..");
const base = (process.argv[2] || "http://localhost:5173").replace(/\/$/, "");
const out = path.join(root, "previews");

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "prize-assets/scenes.js"), "utf8"), ctx);
const scenes = ctx.window.SCENES.filter(s => s.group === "main");   // test cases stay as live thumbnails only
const SETS = [ { id: "main", w: 4096, h: 1024 }, { id: "mini", w: 1408, h: 768 } ];   // Main Stage 16x4 m, Mini Stage 5.5x3 m

const browser = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find(p => fs.existsSync(p));
if(!browser){ console.error("No Edge or Chrome found."); process.exit(1); }

// fail fast if the site is not being served, otherwise Edge writes nothing and old PNGs look current
try { require("child_process").execFileSync(process.execPath, ["-e", `fetch("${base}/show-screen.html").then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))`], { stdio: "ignore" }); }
catch { console.error(`Cannot reach ${base}. Start the "mockup" preview server first.`); process.exit(1); }

// own throwaway profile, so an Edge/Chrome window that is already open does not swallow the headless run
const profile = fs.mkdtempSync(path.join(require("os").tmpdir(), "render-previews-"));
for(const set of SETS) for(const s of scenes){
  fs.mkdirSync(path.join(out, set.id), { recursive: true });
  const file = path.join(out, set.id, `${s.id}.png`);
  let ok = false;
  // headless Edge occasionally exits without writing the screenshot, so retry a few times
  for(let attempt = 0; attempt < 4 && !ok; attempt++){
    const started = Date.now();
    try {
      execFileSync(browser, [
        "--headless=new", `--user-data-dir=${profile}`, "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
        `--window-size=${set.w},${set.h}`, "--virtual-time-budget=5000",
        `--screenshot=${file}`, `${base}/show-screen.html?still&screen=${set.id}&${s.q}`,
      ], { stdio: "ignore", timeout: 60000 });
    } catch {}
    ok = fs.existsSync(file) && fs.statSync(file).mtimeMs >= started;
  }
  if(!ok){ console.error(`${set.id}/${s.id}.png was not rendered`); process.exit(1); }
  console.log(`${set.id}/${s.id}.png  ${(fs.statSync(file).size / 1024 | 0)} KB`);
}
fs.rmSync(profile, { recursive: true, force: true });
