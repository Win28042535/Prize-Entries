// Declarative liquid-metal buttons.
//   <div data-lmb="เริ่มสุ่ม" data-action="go" data-fill></div>
// Any element with [data-lmb] gets a real liquid-metal button, including ones
// added later by innerHTML. Clicking fires a bubbling "lmb-click" event (unless
// the slot has .is-off). data-fill = button takes the slot's full width.
// Buttons are destroyed when their slot leaves the DOM so WebGL contexts don't pile up.
import { createLiquidMetalButton } from './js/liquid-metal-button.js';

// config from liquid-metal-button-kit README (Better Trade original)
const BASE = {
  height: 56, fontSize: 20, fontWeight: 400, fontFamily: "'FC Minimal'",
  textColor: '#111318', textShadow: 'none',
  pillBackground: 'linear-gradient(180deg, #ffffff 0%, #f3f4f8 55%, #e4e7ee 100%)',
  rimPalette: 'linear-gradient(90deg, #00d4fe, #1f87e6, #113cf3, #722df4, #e63bd8, #f79319)',
  paddingX: 64, rim: 3, metalShiftRed: 0.2, metalShiftBlue: 0.2,
};
const COMPACT = { height: 49, fontSize: 18, paddingX: 56 };
// compact size on narrow screens, and on short ones (a phone held sideways) so the button doesn't eat the page
const compactQuery = matchMedia('(max-width: 575px), (max-height: 480px)');
const live = new Map();   // slot -> { btn, w, compact }

// A full-width button has a fixed pixel width. Without containment that width becomes the slot's
// minimum size, so a grid column could never shrink again after the viewport got narrower.
const style = document.createElement('style');
style.textContent = '[data-lmb][data-fill]{contain:inline-size;min-width:0}';
document.head.appendChild(style);

function build(slot){
  const compact = compactQuery.matches;
  const fill = slot.hasAttribute('data-fill');
  const w = fill ? Math.floor(slot.clientWidth) : undefined;
  const prev = live.get(slot);
  if(prev && prev.compact === compact && prev.w === w) return;
  if(fill && !w) return;   // not laid out yet (e.g. inside a closed dialog)
  prev?.btn.destroy();
  const btn = createLiquidMetalButton({
    ...BASE, ...(compact ? COMPACT : {}),
    label: slot.dataset.lmb, width: w,
    onClick: () => {
      if(slot.classList.contains('is-off')) return;
      slot.dispatchEvent(new CustomEvent('lmb-click', { bubbles: true }));
    },
  });
  slot.replaceChildren(btn.el);
  live.set(slot, { btn, w, compact });
}

const ro = new ResizeObserver(entries => entries.forEach(e => build(e.target)));

function scan(root){
  const slots = root.matches?.('[data-lmb]') ? [root] : [];
  root.querySelectorAll?.('[data-lmb]').forEach(s => slots.push(s));
  slots.forEach(s => { if(!live.has(s)){ ro.observe(s); build(s); } });
}
function sweep(){
  for(const [slot, v] of live){
    if(!slot.isConnected){ v.btn.destroy(); ro.unobserve(slot); live.delete(slot); }
  }
}

(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
  scan(document.body);
  new MutationObserver(muts => {
    let removed = false;
    for(const m of muts){
      m.addedNodes.forEach(n => n.nodeType === 1 && scan(n));
      if(m.removedNodes.length) removed = true;
    }
    if(removed) sweep();
  }).observe(document.body, { childList: true, subtree: true });
  compactQuery.addEventListener('change', () => [...live.keys()].forEach(build));
});
