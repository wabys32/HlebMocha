const audio = document.getElementById('bg-music');
const loadButton = document.getElementById('loadButton');

const video = document.getElementById('hleb');
let direction = null;
let animationFrameId = null;
video.pause();


function loadPage(){
    audio.play();
    loadButton.style.opacity = 0;
    loadButton.style.pointerEvents = "none";

    hleb.style.opacity = 1;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'main.js';
    document.head.appendChild(script); // or document.body.appendChild(script);

    console.log("page loaded")
}


loadButton.style.left = (window.innerWidth/2 - loadButton.offsetWidth/2) + "px";
loadButton.style.top = (window.innerHeight/2 - loadButton.offsetHeight/2) + "px";
video.style.left = (window.innerWidth/2 - 400/2) + "px";
video.style.top = (window.innerHeight/2 - 540/2) + "px";


addEventListener("resize", (event) => {
    loadButton.style.left = (window.innerWidth/2 - loadButton.offsetWidth/2) + "px";
    loadButton.style.top = (window.innerHeight/2 - loadButton.offsetHeight/2) + "px";
    video.style.left = (window.innerWidth/2 - 400/2) + "px";
    video.style.top = (window.innerHeight/2 - 540/2) + "px";
})