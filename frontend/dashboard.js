
/* =========================
   🔐 PROTECTION SYSTEM
========================= */
if(localStorage.getItem("auth") !== "true"){
window.location.href = "login.html";
}

/* =========================
   PAGE NAVIGATION
========================= */
function openPage(page){
window.location.href = page;
}

/* =========================
   LOGOUT SYSTEM
========================= */
function logoutUser(){

localStorage.removeItem("auth");

document.getElementById("logoutLoading").style.display="flex";

let text = document.querySelector("#logoutLoading h2");
text.innerText = "Securing session...";

setTimeout(()=>{
text.innerText = "Redirecting to Login...";
},500);

setTimeout(()=>{
window.location.href="login.html";
},1000);

}

/* =========================
   BACKGROUND ANIMATION
========================= */
const canvas = document.getElementById("bg");

if(canvas){

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];

for(let i=0;i<50;i++){
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

ctx.beginPath();
ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
ctx.fillStyle="rgba(79,140,255,0.8)";
ctx.fill();
});

requestAnimationFrame(animate);
}

animate();
}
async function loadDashboard() {

    try {

        let response = await fetch("http://127.0.0.1:8000/api/reports");

        let data = await response.json();

        document.getElementById("totalScans").innerText = data.total_scans;
        document.getElementById("safeScans").innerText = data.safe;
        document.getElementById("phishingScans").innerText = data.phishing;

        if(data.accuracy){
            document.getElementById("accuracy").innerText = data.accuracy;
        }

    } catch (error) {

        console.log(error);
        alert(error.message);

    }

}

loadDashboard();