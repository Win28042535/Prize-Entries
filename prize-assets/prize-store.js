// Shared draw state for Prize Entries, the Control Panel and (through the Control Panel) the Show Screen.
// One localStorage record is the single source of truth, so a winner confirmed in the Control Panel
// shows up in Prize Entries, and a winner removed in Prize Entries returns to the draw pool.
// Always call load() right before changing something, so a stale copy never overwrites newer state.
(function(){
  const KEY = "bt2026-prize-control";

  // winners/skipped/pending hold person ids (pid) and prize indexes into PRIZE_DATA.PRIZES
  const fresh = () => ({
    prize: 0, ticket: -1, countdown: 5, scene: "idle", seq: 0, pending: null,
    winners: [
      { pid: 1, prize: 0, at: "5/10/69 17:57" },
      { pid: 4, prize: 0, at: "5/10/69 17:58" },
    ],
    skipped: [], last: null,
  });

  function load(){
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if(s){
        const state = Object.assign(fresh(), s);
        if(state.scene === "blank") state.scene = "idle";   // the hide-screen scene no longer exists
        return state;
      }
    } catch(e) {}
    return fresh();
  }
  function save(S){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) {} }

  // fires in the OTHER open tabs when one tab saves
  function onChange(cb){ addEventListener("storage", e => { if(e.key === KEY) cb(load()); }); }

  window.PrizeStore = { KEY, fresh, load, save, onChange };
})();
