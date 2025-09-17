// ================== Settings ==================
const PASSWORD_PLAIN = "foryou"; // ← เปลี่ยนรหัสผ่านแค่จุดนี้
const NEXT_MEET_DATE = "2026-09-17"; // YYYY-MM-DD (ปรับได้)

// ================== Helpers ==================
const sumChars = (s) => (s || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
const PASSWORD_HASH = sumChars(PASSWORD_PLAIN);

// localStorage safe-get/set
const storage = {
  get(k) {
    try { return window.localStorage.getItem(k); } catch { return null; }
  },
  set(k, v) {
    try { window.localStorage.setItem(k, v); } catch {}
  }
};

function showApp() {
  const app = document.getElementById("app");
  const gate = document.getElementById("gate");
  if (gate) gate.classList.add("hidden");
  if (app) app.classList.remove("hidden");
  storage.set("auth-ok", "1");
}

// ================== Main ==================
window.addEventListener("DOMContentLoaded", () => {
  // ----- Gate -----
  const app = document.getElementById("app");
  const gate = document.getElementById("gate");
  const form = document.getElementById("gate-form");
  const pass = document.getElementById("pass");

  // 1) auto-unlock if already authed
  if (storage.get("auth-ok") === "1") {
    showApp();
  }

  // 2) allow ?key=... as a one-time shortcut
  const url = new URL(window.location.href);
  const keyRaw = url.searchParams.get("key");
  if (keyRaw) {
    const key = keyRaw.trim().toLowerCase();
    if (sumChars(key) === PASSWORD_HASH) {
      showApp();
      // ล้าง query ออกให้ลิงก์ดูสะอาด
      url.searchParams.delete("key");
      history.replaceState({}, "", url.toString());
    }
  }

  // 3) form submit
  if (form && pass) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = (pass.value || "").trim().toLowerCase();
      if (sumChars(input) === PASSWORD_HASH) {
        showApp();
      } else {
        alert("รหัสไม่ถูกอะะ ลองใหม่นะคั้บบ");
      }
    });
  }

  // ----- Tabs -----
  const tabButtons = document.querySelectorAll(".tabs button");
  if (tabButtons.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tabs button").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        btn.classList.add("active");
        const tabEl = document.getElementById(btn.dataset.tab);
        if (tabEl) tabEl.classList.add("active");
      });
    });
  }

  // ----- Starfield -----
  const canvas = document.getElementById("stars");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let w, h, stars = [];
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = Array.from({ length: Math.floor((w * h) / 4000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.5 + 0.3,
        v: Math.random() * 0.5 + 0.1
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      const t = Date.now();
      for (const s of stars) {
        ctx.globalAlpha = s.a + Math.sin((t / 500) * s.v) * 0.2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    resize(); draw();
  }

  // ----- Gallery -----
  const images = [
    // "images/earth-1.jpg",
    // "images/earth-2.jpg",
  ];
  const grid = document.getElementById("gallery-grid");
  if (grid && images.length) {
    images.forEach((src) => {
      const el = document.createElement("img");
      el.src = src;
      el.style.width = "100%";
      el.style.borderRadius = "12px";
      el.style.border = "1px solid #22306c";
      grid.appendChild(el);
    });
  }

  // ----- Countdown -----
  const cdDays = document.querySelector("#cd-days");
  const cdHours = document.querySelector("#cd-hours");
  const cdMins = document.querySelector("#cd-mins");
  const cdSecs = document.querySelector("#cd-secs");

  if (cdDays && cdHours && cdMins && cdSecs) {
    const target = new Date(`${NEXT_MEET_DATE}T00:00:00`);
    function tick() {
      const now = new Date();
      const diff = target - now;
      const clamp = (n) => Math.max(0, n);
      if (diff <= 0) {
        cdDays.textContent = "0";
        cdHours.textContent = "0";
        cdMins.textContent = "0";
        cdSecs.textContent = "0";
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      cdDays.textContent  = clamp(d).toString();
      cdHours.textContent = clamp(h).toString();
      cdMins.textContent  = clamp(m).toString();
      cdSecs.textContent  = clamp(s).toString();
    }
    tick();
    setInterval(tick, 1000);
  }
});
