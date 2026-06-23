// BACKGROUND (same style optional if needed)
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];

for(let i=0;i<60;i++){
dots.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2,
dx:(Math.random()-0.5),
dy:(Math.random()-0.5)
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

dots.forEach(d=>{
d.x += d.dx;
d.y += d.dy;

if(d.x<0) d.x=canvas.width;
if(d.y<0) d.y=canvas.height;
if(d.x>canvas.width) d.x=0;
if(d.y>canvas.height) d.y=0;

ctx.fillStyle="rgba(79,140,255,0.8)";
ctx.beginPath();
ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
ctx.fill();
});

requestAnimationFrame(animate);
}

animate();


// URL SCAN FUNCTION
function scanURL(){

let url = document.getElementById("urlInput").value;
let resultBox = document.getElementById("resultBox");
let loading = document.getElementById("loading");

if(url.trim() === ""){
resultBox.innerHTML = "<p style='color:orange'>⚠ Please enter URL</p>";
return;
}

loading.classList.remove("hidden");

setTimeout(()=>{

loading.classList.add("hidden");

let score = Math.floor(Math.random()*100);

let status = "";
let cls = "";

if(score > 70){
status = "🚨 Phishing URL Detected";
cls = "phishing";
}
else if(score > 40){
status = "⚠ Suspicious URL";
cls = "warning";
}
else{
status = "✅ Safe URL";
cls = "safe";
}

resultBox.innerHTML = `
<h3 class="${cls}">${status}</h3>
<p>Confidence: <b>${score}%</b></p>
<p>Risk Level: ${score>70?"High":score>40?"Medium":"Low"}</p>
`;

},1500);
}


// SIDE PANEL
function openSidePanel(){
document.getElementById("sidePanel").classList.add("open");
}

function closeSidePanel(){
document.getElementById("sidePanel").classList.remove("open");
}