// BACKGROUND ANIMATION

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];

for (let i = 0; i < 60; i++) {
dots.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
r: Math.random() * 2,
dx: Math.random() - 0.5,
dy: Math.random() - 0.5
});
}

function animate() {

ctx.clearRect(0, 0, canvas.width, canvas.height);

dots.forEach(d => {

    d.x += d.dx;
    d.y += d.dy;

    if (d.x < 0) d.x = canvas.width;
    if (d.y < 0) d.y = canvas.height;
    if (d.x > canvas.width) d.x = 0;
    if (d.y > canvas.height) d.y = 0;

    ctx.fillStyle = "rgba(79,140,255,0.8)";
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();

});

requestAnimationFrame(animate);

}

animate();



// EMAIL SCANNER

async function scanEmail() {

let email = document.getElementById("emailInput").value;

let resultBox = document.getElementById("resultBox");

let loading = document.getElementById("loading");


if (email.trim() === "") {

    resultBox.innerHTML =
    "<p style='color:orange'>⚠ Please paste email</p>";

    return;

}


loading.classList.remove("hidden");


try {


let response = await fetch(
"http://127.0.0.1:5000/api/scan-email",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email:email
})

}

);



let data = await response.json();


loading.classList.add("hidden");


resultBox.innerHTML = `

<h3>${data.result}</h3>

<p>Confidence: <b>${data.score}%</b></p>

<p>Risk Level: <b>${data.risk}</b></p>

`;



}

catch(error){


loading.classList.add("hidden");


resultBox.innerHTML =
"<p style='color:red'>⚠ Backend server not connected</p>";


console.log(error);


}

}



// SIDE PANEL


function openSidePanel(){

document.getElementById("sidePanel")
.classList.add("open");

}



function closeSidePanel(){

document.getElementById("sidePanel")
.classList.remove("open");

}