function filterData(type){

let rows = document.querySelectorAll("#reportBody tr");

rows.forEach(row => {

    if(type === "all"){
        row.style.display = "table-row";
    }
    else if(row.classList.contains(type)){
        row.style.display = "table-row";
    }
    else{
        row.style.display = "none";
    }

});

}

/* BACKGROUND DOTS */
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

ctx.fillStyle="rgba(79,140,255,0.8)";
ctx.beginPath();
ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
ctx.fill();
});

requestAnimationFrame(animate);
}

animate();

}