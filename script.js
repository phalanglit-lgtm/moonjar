// Simple stars, tabs, soft password gate, gallery, and countdown
const PASSWORD_HASH = "foryou".split('').reduce((a,c)=>a+c.charCodeAt(0),0);
// If you want a new password, change "earth-love" above, or compute a simple sum.

// gate
const app = document.getElementById('app');
const gate = document.getElementById('gate');
const form = document.getElementById('gate-form');
const pass = document.getElementById('pass');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const sum = (pass.value||'').split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  if(sum === PASSWORD_HASH){
    gate.classList.add('hidden');
    app.classList.remove('hidden');
    localStorage.setItem('auth-ok','1');
  }else{
    alert('รหัสไม่ถูกต้อง ลองอีกครั้งนะครับ');
  }
});
if(localStorage.getItem('auth-ok')==='1'){
  gate.classList.add('hidden');
  app.classList.remove('hidden');
}

// tabs
document.querySelectorAll('.tabs button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  })
});

// starfield
const canvas = document.getElementById('stars');
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
  for(const s of stars){
    ctx.globalAlpha = s.a + Math.sin(Date.now()/500*s.v)*0.2;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
window.addEventListener('resize', resize);
resize(); draw();

// gallery images — add filenames in /images
const images = [
  // "images/earth-1.jpg",
  // "images/earth-2.jpg",
];
const grid = document.getElementById('gallery-grid');
images.forEach(src=>{
  const el = document.createElement('img');
  el.src = src;
  el.style.width = '100%';
  el.style.borderRadius = '12px';
  el.style.border = '1px solid #22306c';
  grid.appendChild(el);
});

// countdown
// Set your next meet date (YYYY-MM-DD)
const NEXT_MEET_DATE = "2026-09-17";
const target = new Date(NEXT_MEET_DATE + "T00:00:00");
function tick(){
  const now = new Date();
  const diff = target - now;
  if(diff <= 0){
    document.querySelector('#cd-days').textContent = '0';
    document.querySelector('#cd-hours').textContent = '0';
    document.querySelector('#cd-mins').textContent = '0';
    document.querySelector('#cd-secs').textContent = '0';
    return;
  }
  const d = Math.floor(diff/ (1000*60*60*24));
  const h = Math.floor((diff/ (1000*60*60)) % 24);
  const m = Math.floor((diff/ (1000*60)) % 60);
  const s = Math.floor((diff/ 1000) % 60);
  document.querySelector('#cd-days').textContent = d;
  document.querySelector('#cd-hours').textContent = h;
  document.querySelector('#cd-mins').textContent = m;
  document.querySelector('#cd-secs').textContent = s;
}
setInterval(tick, 1000); tick();
