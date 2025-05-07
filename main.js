// for sounds
let leftSoundIndex = 1;
let rightSoundIndex = 1;

const maxSoundIndex = 9;
const soundBasePath = 'res/sounds/hlebMacha/';

// for insults
let insultPrefix = "insultSilent";
let insultIndex = 1;
const maxInsultsIndex = 3;
const minInsultAttempts = 6;
const maxInsultAttempts = 7;
var currentInsultAttempts = randint(minInsultAttempts, maxInsultAttempts);
const insultsBasePath = 'res/sounds/insults/';

function playSound(side){
    let filePrefix = "";
    if (side === 'left') {
        filePrefix = 'macha';
        const sound = new Audio(`${soundBasePath}${filePrefix}${leftSoundIndex}.mp3`);
        sound.play();
        if(leftSoundIndex < maxSoundIndex) leftSoundIndex+=1;
        else leftSoundIndex = 1;
    } else if (side === 'right') {
        filePrefix = 'hleb';
        const sound = new Audio(`${soundBasePath}${filePrefix}${rightSoundIndex}.mp3`);
        sound.play();
        if(rightSoundIndex < maxSoundIndex) rightSoundIndex+=1;
        else rightSoundIndex = 1;
    } else {
        return;
    }
}

function playInsults(){
    const sound = new Audio(`${insultsBasePath}${insultPrefix}${insultIndex}.mp3`);
    sound.play();
    if(insultIndex < maxInsultsIndex) insultIndex+=1;
    else insultIndex = 1;
}

function playTo(targetTime, speed = 0.03) {
    cancelAnimationFrame(animationFrameId);
    function step() {
        const delta = speed * (targetTime > video.currentTime ? 1 : -1);
        video.currentTime += delta;
        if ((delta > 0 && video.currentTime < targetTime) ||
            (delta < 0 && video.currentTime > targetTime)) {
            animationFrameId = requestAnimationFrame(step);
        } else {
            video.currentTime = targetTime;
        }
    }
    step();
}


function updatePlayback(clientX) {
    const screenWidth = window.innerWidth;
    const center = screenWidth / 2;
    const threshold = 100;
    const leftBound = center - threshold;
    const rightBound = center + threshold;
  
    if (clientX < leftBound && direction !== 'forward') {
        playSound("left");
        currentInsultAttempts -= 1;
        if(currentInsultAttempts <= 0){
            playInsults();
            currentInsultAttempts = randint(minInsultAttempts, maxInsultAttempts);
        }
        direction = 'forward';
        playTo(video.duration);
        
    } else if (clientX > rightBound && direction !== 'reverse') {
        playSound("right");
        currentInsultAttempts -= 1;
        if(currentInsultAttempts <= 0){
            playInsults();
            currentInsultAttempts = randint(minInsultAttempts, maxInsultAttempts);
        }
        direction = 'reverse';
        playTo(0);
        
    } else if (clientX >= leftBound && clientX <= rightBound && direction !== 'center') {
        direction = 'center';
        playTo(video.duration / 2);
    }
}
  
window.addEventListener('mousemove', e => {
    if (video.readyState >= 1) { // Ensure metadata is loaded
        updatePlayback(e.clientX);
    }
});

function randint(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('touchstart', e => {
    if (video.readyState < 1) return;

    const touch = e.touches[0];
    if (!touch) return;

    updatePlayback(touch.clientX);
});

direction = 'center';
playTo(video.duration / 2);
