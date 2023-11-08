function squares(diff) {
    let height = 0;
    let width = 0;
    if (diff == 1) {
        height = 110;
        width = 110;
    } else if (diff == 2) {
        height = 50;
        width = 50;
    } else if (diff == 3) {
        height = 36;
        width = 36;
    }
    let index = 1;
    for (let i = 1; i <= 3 * diff; i++) {
        var item = document.createElement("div");
        item.classList.add("panel-row");
        document.getElementById("panel").appendChild(item);
        for (let j = 1; j <= 3 * diff; j++) {
            var subItem = document.createElement("div");
            subItem.classList.add("square");
            subItem.setAttribute("style", `height: ${height}px; width: ${width}px;`)
            subItem.setAttribute("id", `${index}`);
            item.appendChild(subItem);
            index++;
        }
    }
    let random = Math.floor(Math.random() * 9);
    let enemy = document.getElementById(`${random}`);
    enemy.classList.add("enemy");
}

function addListenerDiff() {
    document.querySelectorAll(".diff").forEach((diff) => {
        diff.addEventListener("mousedown", () => {
            if (diff.id === "diff1") {
                localStorage.setItem("diffValue", 1);
            } else if (diff.id === "diff2") {
                localStorage.setItem("diffValue", 2);
            } else if (diff.id === "diff3") {
                localStorage.setItem("diffValue", 3);
            }
        })
    });
}
addListenerDiff();

let getValueDiff = localStorage.getItem('diffValue');
squares(getValueDiff);

const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    value: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        hitPosition: 0,
        result: 0,
        currentTime: 15,
    },
};

function countDown() {
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;
    if (state.value.currentTime <= 0) {
        clearInterval(state.value.countDownTimerId);    
        clearInterval(state.value.timerId);
        alert(`Game Over! You scored ${state.value.result} points.`);
        window.location.href="./index.html";
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare(diff) {
    let maxPosition;
    if (diff == 1) {
        maxPosition = 9;
    } else if (diff == 2) {
        maxPosition = 36;
    } else if (diff == 3) {
        maxPosition = 81;
    }
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * maxPosition);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.value.timerId = setInterval(randomSquare(getValueDiff), 0);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.value.hitPosition) {
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound("arcade-retro.m4a");
                moveEnemy();
            }
        })
    })
}

function init() {
    moveEnemy();
    addListenerHitBox();
}
init();