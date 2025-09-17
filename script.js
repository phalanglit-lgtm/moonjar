// ================== Settings ==================
const PASSWORD_PLAIN = "foryou"; // << เปลี่ยนรหัสแค่ตรงนี้
const PASSWORD_HASH = PASSWORD_PLAIN.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
const NEXT_MEET_DATE = "2026-09-17"; // YYYY-MM-DD

// ================== Main ==================
window.addEventListener('DOMContentLoaded', () => {
  // gate
  const app  = document.getElementById('app');
  const gate = document.getElementById('gate');
  const form = document.getElementById('gate-form');
  const pass = document.getElementById('pass');

  function showApp(){
    if(gate) gate.classList.add('hidden');
    if(app)  app.classList.remove('hidden');
    try{ localStorage.setItem('auth-ok','1'); }catch{}
  }

  // auto-unlock
  try{
    if(localStorage.getItem('auth-ok')==='1'){ showApp(); }
  }catch{}

  // ?key=foryou ทางลัด
  const url = new URL(window.location.href);
  const key = (url.searchParams.get('key')||'').trim().toLowerCase();
  if(key && key.split('').reduce((a,c)=>a+c.charCodeAt(0),0) === PASSWORD_HASH){
    showApp();
    url.searchParams.delete('key');
    history.replaceState({},'',url.toString());
  }

  if(form && pass){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const input = (pass.value||'').trim().toLowerCase();
      const sum = input.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
      if(sum === PASSWORD_HASH){
        showApp();
      }else{
        alert('รหัสไม่ถูกต้อง ลองอีกครั้งนะครับ');
      }
    });
  }

  // tabs
  document.querySelectorAll('.tabs button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(btn.dataset.tab);
      if(pane) pane.classList.add('active');
    });
  });

  // starfield
  const canvas = document.getElementById('stars');
  if(canvas && canvas.getContext){
    const ctx = canvas.getContext('2d');
    let w,h,stars=[];
    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = Array.from({length:Math.floor(w*h/4000)}, ()=> ({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.2+0.2,
        a: Math.random()*0.5+0.3,
        v: Math.random()*0.5+0.1
      }));
    }
    function draw(){
      ctx.clearRect(0,0,w,h);
      const t = Date.now();
      for(const s of stars){
        ctx.globalAlpha = s.a + Math.sin(t/500*s.v)*0.2;
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize(); draw();
  }

  // gallery (ใส่รูปเมื่อพร้อม)
  const images = [
    // "images/earth-1.jpg",
    // "images/earth-2.jpg",
  ];
  const grid = document.getElementById('gallery-grid');
  if(grid){
    images.forEach(src=>{
      const el = document.createElement('img');
      el.src = src;
      el.style.width = '100%';
      el.style.borderRadius = '12px';
      el.style.border = '1px solid #22306c';
      grid.appendChild(el);
    });
  }

  // countdown (กัน element ไม่มี)
  const dEl = document.querySelector('#cd-days');
  const hEl = document.querySelector('#cd-hours');
  const mEl = document.querySelector('#cd-mins');
  const sEl = document.querySelector('#cd-secs');
  const target = new Date(NEXT_MEET_DATE + "T00:00:00");
  function safeSet(el, val){ if(el) el.textContent = val; }
  function tick(){
    const now = new Date();
    const diff = target - now;
    if(diff <= 0){
      safeSet(dEl,'0'); safeSet(hEl,'0'); safeSet(mEl,'0'); safeSet(sEl,'0');
      return;
    }
    const d = Math.floor(diff/ (1000*60*60*24));
    const h = Math.floor((diff/ (1000*60*60)) % 24);
    const m = Math.floor((diff/ (1000*60)) % 60);
    const s = Math.floor((diff/ 1000) % 60);
    safeSet(dEl,d); safeSet(hEl,h); safeSet(mEl,m); safeSet(sEl,s);
  }
  tick(); setInterval(tick, 1000);
});
