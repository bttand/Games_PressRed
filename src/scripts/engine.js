function squares(level) {
    let height = 0;
    let width = 0;
    if (level == 1) {
        height = 110;
        width = 110;
    } else if (level == 2) {
        height = 50;
        width = 50;
    } else if (level == 3) {
        height = 36;
        width = 36;
    }
    let index = 1;
    for (let i = 1; i <= 3 * level; i++) {
        var item = document.createElement("div");
        item.classList.add("panel-row");
        document.getElementById("panel").appendChild(item);
        for (let j = 1; j <= 3 * level; j++) {
            var subItem = document.createElement("div");
            subItem.classList.add("square");
            subItem.setAttribute("style", `height: ${height}px; width: ${width}px;`)
            subItem.setAttribute("id", `${index}`);
            item.appendChild(subItem);
            index++;
        }
    }
}

function addListenerLevel() {
    document.querySelectorAll(".level").forEach((lvl) => {
        lvl.addEventListener("click", () => {
            if (lvl.id === "lvl1") {
                localStorage.setItem("level", 1);
            } else if (lvl.id === "lvl2") {
                localStorage.setItem("level", 2);
            } else if (lvl.id === "lvl3") {
                localStorage.setItem("level", 3);
            }
        })
    });
}

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

function randomSquare(level) {
    state.view.squares.forEach((square) => {
        square.classList.remove("press");
    });
    let randomNumber = Math.floor(Math.random() * (level * level * 9));
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("press");
    state.value.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.value.timerId = randomSquare(getLevel);
}

function addListenerHitBox() {
    moveEnemy();
    state.view.squares.forEach((square) => {
        square.addEventListener("click", () => {
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

addListenerLevel();

let getLevel = localStorage.getItem('level');

squares(getLevel);

const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        press: document.querySelector(".press"),
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

addListenerHitBox();
