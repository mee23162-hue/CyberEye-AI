const hero = document.querySelector(".hero");

const images = [
"image/bg.png",
"image/bg1.png",
"image/bg2.png",
"image/bg4.png",
"image/bg9.png"
];

let index = 0;

function changeBackground() {

    if (!hero) return;

    hero.style.backgroundImage = `url('${images[index]}')`;

    index++;

    if (index >= images.length) {
        index = 0;
    }
}

changeBackground();

setInterval(changeBackground, 4000);