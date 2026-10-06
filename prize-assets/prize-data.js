// Shared sample data + channel for the Control Panel and Show Screen mockups.
// Names are fictional placeholders, not real participants.
window.PRIZE_DATA = {
  CHANNEL: "bt2026-prize-show",
  TICKETS: ["บัตร Ultimate 1 วัน", "บัตร Ultimate 2 วัน"],
  PRIZES: [
    { name: "ตั๋วเครื่องบิน", qty: 3 },
    { name: "Gift Voucher 5,000", qty: 5 },
    { name: "Personalized Playbook", qty: 10 },
    { name: "ของที่ระลึก", qty: 20 },
  ],
  CHARS: {
    guardian: "The Guardian", harvester: "The Harvester", steadyhand: "The Steady Hand", diamondhand: "The Diamond Hand",
    analyst: "The Analyst", planner: "The Planner", explorer: "The Explorer", sage: "The Sage", maverick: "The Maverick",
    waverider: "The Wave Rider", contrarian: "The Contrarian", collector: "The Collector",
  },
  // c = Investor DNA character slug, or null when the assessment was not taken
  PEOPLE: [
    { id: 1,  n: "สมชาย ใจดี",          t: 1, c: "guardian" },
    { id: 2,  n: "สมหญิง รักเรียน",      t: 0, c: "analyst" },
    { id: 3,  n: "ธนากร วงศ์ประเสริฐ",    t: 1, c: "explorer" },
    { id: 4,  n: "พิมพ์ชนก ศรีสวัสดิ์",    t: 1, c: null },
    { id: 5,  n: "อนุชา มั่นคง",          t: 0, c: "diamondhand" },
    { id: 6,  n: "กมลวรรณ แสงทอง",       t: 1, c: "collector" },
    { id: 7,  n: "วีรยุทธ เจริญสุข",       t: 0, c: "waverider" },
    { id: 8,  n: "ณัฐธิดา บุญมา",         t: 1, c: "planner" },
    { id: 9,  n: "ปกรณ์ ทองดี",           t: 1, c: null },
    { id: 10, n: "ศิริพร อินทร์แก้ว",      t: 0, c: "sage" },
    { id: 11, n: "จิรายุ พงษ์พันธ์",        t: 1, c: "maverick" },
    { id: 12, n: "อรอุมา สุขเจริญ",        t: 0, c: "harvester" },
    { id: 13, n: "ภานุวัฒน์ ชัยมงคล",      t: 1, c: "contrarian" },
    { id: 14, n: "ชลธิชา นาคสวัสดิ์",      t: 1, c: "steadyhand" },
    { id: 15, n: "Kittipong -",          t: 0, c: null },   // "-" = no surname on record, like the live data
  ],
};
