// Renders every scene in prize-assets/scenes.js to previews/<id>.png at 1920x1080, using headless Edge or Chrome.
// Needs the site served locally first (the "mockup" server in .claude/launch.json, port 5173).
//   node tools/render-previews.js [baseUrl]
const fs = require("fs"), path = require("path"), vm = require("vm"), { execFileSync } = require("child_process");

const root = path.join(__dirname, "..");
const base = (process.argv[2] || "http://localhost:5173").replace(/\/$/, "");
const out = path.join(root, "previews");

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "prize-assets/scenes.js"), "utf8"), ctx);
const scenes = ctx.window.SCENES;

const browser = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find(p => fs.existsSync(p));
if(!browser){ console.error("No Edge or Chrome found."); process.exit(1); }

fs.mkdirSync(out, { recursive: true });
for(const s of scenes){
  const file = path.join(out, `${s.id}.png`);
  execFileSync(browser, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
    "--window-size=1920,1080", "--virtual-time-budget=5000",
    `--screenshot=${file}`, `${base}/show-screen.html?still&${s.q}`,
  ], { stdio: "ignore" });
  console.log(`${s.id}.png  ${(fs.statSync(file).size / 1024 | 0)} KB`);
}
