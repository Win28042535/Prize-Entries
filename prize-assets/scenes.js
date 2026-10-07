// Preview list shared by the scene gallery (index.html) and the PNG export (tools/render-previews.js).
// q = query string for show-screen.html; the gallery adds "still" for thumbnails, the export for PNGs.
window.SCENES = [
  { group: "main", id: "idle",       title: "หน้ารอ",               q: "scene=idle" },
  { group: "main", id: "prize",      title: "ประกาศรางวัล",          q: "scene=prize" },
  { group: "main", id: "drawing-a",  title: "กำลังสุ่ม · A ไพ่",      q: "scene=drawing&draw=A" },
  { group: "main", id: "drawing-b",  title: "กำลังสุ่ม · B รายชื่อ",   q: "scene=drawing&draw=B" },
  { group: "main", id: "reveal",     title: "ผู้โชคดี",               q: "scene=reveal" },
  { group: "main", id: "board",      title: "ตารางผู้ชนะ · A การ์ด",     q: "scene=board" },
  { group: "main", id: "board-b",    title: "ตารางผู้ชนะ · B ลำดับ",     q: "scene=board&board=B" },
  { group: "main", id: "board-c",    title: "ตารางผู้ชนะ · C ตามรางวัล",  q: "scene=board&board=C" },

  { group: "case", id: "reveal-long",      title: "ผู้โชคดี · ชื่อยาวพิเศษ",       q: "scene=reveal&case=long" },
  { group: "case", id: "reveal-nosurname", title: "ผู้โชคดี · ไม่มีนามสกุล",       q: "scene=reveal&case=nosurname" },
  { group: "case", id: "prize-last",       title: "ประกาศรางวัล · รางวัลที่ 4",    q: "scene=prize&prize=4" },
  { group: "case", id: "board-1",          title: "ตารางผู้ชนะ · 1 คน",          q: "scene=board&n=1" },
  { group: "case", id: "board-12",         title: "ตาราง A · ครบ 12 คน + ชื่อยาว", q: "scene=board&n=12&case=long" },
  { group: "case", id: "board-12-b",       title: "ตาราง B · ครบ 12 คน + ชื่อยาว", q: "scene=board&n=12&case=long&board=B" },
  { group: "case", id: "board-12-c",       title: "ตาราง C · ครบ 12 คน + ชื่อยาว", q: "scene=board&n=12&case=long&board=C" },
  { group: "case", id: "board-0",          title: "ตารางผู้ชนะ · ยังไม่มีผู้ชนะ",    q: "scene=board&n=0" },
];
