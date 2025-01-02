const boxPlay = document.querySelector('.boxPlay');
const boxGanti = document.querySelector('.boxGanti');
const btnHistory = document.querySelector('.btnHistory');
const boxClose = document.querySelector('.boxClose');
const boxHistory = document.querySelector('.boxHistory');
const winner = document.querySelector('.winner');
const time = document.querySelector('.time');
const mahkota = document.querySelector('#mahkota');
const audioTime = document.querySelector('#audioTime');
const boxTimer = document.querySelector('.boxTimer');
const angkaWinner = document.querySelector('.angkaWinner');
const box1X = document.querySelector('.box1-x')
const box2O = document.querySelector('.box2-o')
const audio = document.querySelector('#audio1');
const audioStart = document.querySelector('#audioStart');
const audioBonus = document.querySelector('#audioBonus');
const volumeParent = document.querySelector('.volumeParent')
volumeParent.addEventListener('click', function () {
    const audioBg = document.querySelector('#audioBg');
    const line = document.querySelector('.line')

    line.classList.toggle('open')
    if (line.classList.contains('open')) {
        audioBg.play()
        audioBg.addEventListener('ended', function () {
            audioBg.currentTime = 0
            audioBg.play()
        })
    } else if (!line.classList.contains('open')) {
        audioBg.pause()
    }
})

btnHistory.addEventListener('click', function () {
    boxHistory.style.zIndex = 1100
    boxHistory.style.opacity = 1
    boxHistory.style.transition = '0.3s'
    var historyData = localStorage.getItem('history');
    let isi = ''

    if (historyData) {
        var historyArray = JSON.parse(historyData);
        var length = historyArray.length;
        for (let index = 0; index < length; index++) {
            let currentHistory = historyArray[index];

            if (currentHistory.winner === "p1") {
                isi += ` <div class="boxContentH">
        <img id="imgMahkota" src="mahkota.png" width="30">
       <span>PLAYER 1</span>
       <span>VS</span>
       <span>PLAYER 2</span>
    </div>`
            }

            else if (currentHistory.winner === "p2") {
                isi += ` <div class="boxContentH">
            <img id="imgMahkota" src="mahkota.png" width="30" style="left:775px;">
           <span>PLAYER 1</span>
           <span>VS</span>
           <span>PLAYER 2</span>
        </div>`
            }

            else if (currentHistory.winner === "seri") {
                isi += ` <div class="boxContentH">
                <img id="imgMahkota" src="mahkota.png" width="30" style="display:none;">
               <span>PLAYER 1</span>
               <span>VS</span>
               <span>PLAYER 2</span>
            </div>` ``
            }
        }

    } else {
        isi += `<div class="teks">Tidak ada history</div>`
    }





    boxGanti.innerHTML = isi

})
boxClose.addEventListener('click', function () {
    boxHistory.style.zIndex = -10
    boxHistory.style.opacity = 0
    boxHistory.style.transition = '0.3s'
})
const boxPopUp = document.querySelector('.boxPopUp')
const ulang = document.querySelector('#ulang')
const canvas = document.querySelector('canvas');
canvas.width = '400'
canvas.height = '400'
const ctx = canvas.getContext('2d')
canvas.style.borderRadius = '5px'
const cellSize = 100
const gap = 17
let currentPlayer = 'X'
let SetInterval

let board = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
]
let play = false


let gameEnded = false;
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoxNoShadow()
}
let timer = 10
function fungsiInterval() {
    SetInterval = setInterval(() => {
        timer--
        if (timer < 4) {
            time.style.color = '#ff7070'
            boxTimer.style.color = '#ff7070'
            audioTime.play()
        }
        if (timer < 0) {
            timer = 10
            time.style.color = 'white'
            boxTimer.style.color = 'white'
            audioTime.pause()
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'

            if (currentPlayer == 'O') {
                border2O()
            }
            else if (currentPlayer == 'X') {
                border1X()
            }

        }
        time.innerHTML = timer
    }, 1000)
}
function handlePlay() {
    play = true
    drawBoxShadow()
    box1X.style.border = '2px solid rgba(247, 247, 247, 0.877)'
    audioStart.play()
    boxPlay.style.cursor = 'no-drop'
    boxPlay.removeEventListener('click', handlePlay)

    canvas.addEventListener('click', handleCanvas);
    fungsiInterval()
}
drawBoxNoShadow()

boxPlay.addEventListener('click', handlePlay)


function handleCanvas(e) {
    if (gameEnded) return false;

    //jika gameEnded true kode di bawah tidak di jalankan
    const x = e.clientX - canvas.getBoundingClientRect().left
    const y = e.clientY - canvas.getBoundingClientRect().top
    if (currentPlayer == 'O') {
        border1X()
    }
    else if (currentPlayer == 'X') {
        border2O()
    }
    if (timer < 4) {
        audioTime.pause()
        time.style.color = 'white'
        boxTimer.style.color = 'white'
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let startX = 34 + i * (cellSize + gap)
            let endX = startX + cellSize
            let startY = 37 + j * (cellSize + gap)
            let endY = startY + cellSize

            if (x >= startX && x <= endX && y >= startY && y <= endY && !board[i][j]) {
                if (currentPlayer === 'X') {
                    ctx.fillStyle = 'white'
                } else if (currentPlayer === 'O') {
                    ctx.fillStyle = '#1777ff'
                }
                timer = 11
                ctx.font = ' 900 75px Quicksand '; // Gaya teks
                ctx.textAlign = 'center'; // Posisi teks di tengah horizontal
                ctx.textBaseline = 'middle'; // Posisi teks di tengah vertikal
                ctx.fillText(currentPlayer, startX + (cellSize / 2), startY + (cellSize / 2) + 5); // Penempatan teks 'X'
                board[i][j] = currentPlayer
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'


                // vertilkal
                if (board[0][0] == 'X' && board[0][1] == 'X' && board[0][2] == 'X') {
                    drawBoxV(0, 0)
                    audio.currentTime = 0;
                    audio.play()


                    setTimeout(() => {
                        drawBoxV(0, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxV(0, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);



                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)
                        angkaWinner.innerHTML = '1'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p1' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));


                } else if (board[0][0] == 'O' && board[0][1] == 'O' && board[0][2] == 'O') {
                    drawBoxVO(0, 0)
                    audio.currentTime = 0;
                    audio.play()


                    setTimeout(() => {
                        drawBoxVO(0, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxVO(0, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);



                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)

                        angkaWinner.innerHTML = '2'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p2' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));
                }


                if (board[1][0] == 'X' && board[1][1] == 'X' && board[1][2] == 'X') {
                    drawBoxV(1, 0)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxV(1, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxV(1, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)
                        angkaWinner.innerHTML = '1'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p1' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));


                } else if (board[1][0] == 'O' && board[1][1] == 'O' && board[1][2] == 'O') {
                    drawBoxVO(1, 0)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxVO(1, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxVO(1, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)

                        angkaWinner.innerHTML = '2'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p2' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));
                }


                if (board[2][0] == 'X' && board[2][1] == 'X' && board[2][2] == 'X') {
                    drawBoxV(2, 0)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxV(2, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxV(2, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)
                        angkaWinner.innerHTML = '1'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p1' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));


                }
                else if (board[2][0] == 'O' && board[2][1] == 'O' && board[2][2] == 'O') {
                    drawBoxVO(2, 0)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxVO(2, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxVO(2, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)

                        angkaWinner.innerHTML = '2'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p2' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));
                }
                //end vertikal



                //horizontal
                if (board[0][0] == 'X' && board[1][0] == 'X' && board[2][0] == 'X') {
                    drawBoxV(0, 0)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxV(1, 0)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxV(2, 0)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)
                        angkaWinner.innerHTML = '1'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p1' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));



                } else if (board[0][0] == 'O' && board[1][0] == 'O' && board[2][0] == 'O') {
                    drawBoxVO(0, 0)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxVO(1, 0)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxVO(2, 0)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)

                        angkaWinner.innerHTML = '2'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p2' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));
                }
                // else{
                //     function semuaKotakTerisi() {
                //         for (let i = 0; i < 3; i++) {
                //             for (let j = 0; j < 3; j++) {
                //                 if (!board[i][j]) {
                //                     return false; 
                //                 }
                //             }
                //         }
                //         return true;
                //     }

                //     if(semuaKotakTerisi()){
                //       alert('ya')
                //     }

                // }

                if (board[0][1] == 'X' && board[1][1] == 'X' && board[2][1] == 'X') {
                    drawBoxV(0, 1)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxV(1, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxV(2, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)
                        angkaWinner.innerHTML = '1'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p1' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));



                } else if (board[0][1] == 'O' && board[1][1] == 'O' && board[2][1] == 'O') {
                    drawBoxVO(0, 1)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxVO(1, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxVO(2, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)

                        angkaWinner.innerHTML = '2'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p2' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));
                }

                if (board[0][2] == 'X' && board[1][2] == 'X' && board[2][2] == 'X') {
                    drawBoxV(0, 2)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxV(1, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxV(2, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)
                        angkaWinner.innerHTML = '1'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p1' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));



                } else if (board[0][2] == 'O' && board[1][2] == 'O' && board[2][2] == 'O') {
                    drawBoxVO(0, 2)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxVO(1, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxVO(2, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)

                        angkaWinner.innerHTML = '2'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p2' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));
                }


                if (board[0][0] == 'X' && board[1][1] == 'X' && board[2][2] == 'X') {

                    drawBoxDK(0, 0)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxDK(1, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxDK(2, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)
                        angkaWinner.innerHTML = '1'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p1' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));



                } else if (board[0][0] == 'O' && board[1][1] == 'O' && board[2][2] == 'O') {

                    drawBoxDKO(0, 0)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxDKO(1, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxDKO(2, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)

                        angkaWinner.innerHTML = '2'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p2' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));
                }


                if (board[2][0] == 'X' && board[1][1] == 'X' && board[0][2] == 'X') {

                    drawBoxDKiri(2, 0)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxDKiri(1, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxDKiri(0, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)
                        angkaWinner.innerHTML = '1'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p1' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));



                } else if (board[2][0] == 'O' && board[1][1] == 'O' && board[0][2] == 'O') {
                    drawBoxDKiriO(2, 0)
                    audio.currentTime = 0;
                    audio.play()

                    setTimeout(() => {
                        drawBoxDKiriO(1, 1)
                        audio.currentTime = 0;
                        audio.play()
                    }, 400);

                    setTimeout(() => {
                        drawBoxDKiriO(0, 2)
                        audio.currentTime = 0;
                        audio.play()
                    }, 800);


                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)

                        angkaWinner.innerHTML = '2'
                        mahkota.innerHTML = `<img  src="mahkota.png" width="200">`
                        winner.innerHTML = `Player ${angkaWinner.innerHTML} Winner`
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1500)
                    let history = localStorage.getItem('history');
                    let win = { winner: 'p2' }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));
                }
                function semuaKotakTerisi() {
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            if (!board[i][j]) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                function checkWinner() {
                    // Pengecekan kondisi pemenang horizontal
                    for (let i = 0; i < 3; i++) {
                        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                            return true; // Pemenang ditemukan
                        }
                    }

                    // Pengecekan kondisi pemenang vertikal
                    for (let i = 0; i < 3; i++) {
                        if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                            return true; // Pemenang ditemukan
                        }
                    }

                    // Pengecekan kondisi pemenang diagonal
                    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
                        return true; // Pemenang ditemukan
                    }
                    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
                        return true; // Pemenang ditemukan
                    }

                    return false; // Tidak ada pemenang
                }

                if (semuaKotakTerisi() && !checkWinner()) {

                    gameEnded = true
                    setTimeout(() => {
                        clearInterval(SetInterval)
                        mahkota.innerHTML = ` <div class="colXO">
                       <img src="x.png" width="100">
                       <img src="bulat.png" width="100">
                   </div>`
                        winner.innerHTML = 'Player Tie'
                        winner.style.top = '50.5%'
                        audioBonus.play()
                        boxPopUp.style.opacity = 1
                        boxPopUp.style.zIndex = 5
                        boxPopUp.style.transition = '0.5s'
                        board = [
                            [false, false, false],
                            [false, false, false],
                            [false, false, false]
                        ]
                        drawBoard();
                    }, 1000)
                    let history = localStorage.getItem('history');
                    let win = { winner: "seri" }
                    if (!history) {
                        history = [];
                    } else {
                        history = JSON.parse(history);
                    }
                    history.push(win);

                    localStorage.setItem('history', JSON.stringify(history));
                }

            }
        }
    }
}


ulang.addEventListener('click', function () {
    timer = 11
    fungsiInterval()
    boxPopUp.style.opacity = '0'
    drawBoxShadow()
    boxPopUp.style.zIndex = '-5'
    gameEnded = false
    board = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ]
    currentPlayer = 'X'
    box2O.style.border = '2px solid rgba(247, 247, 247, 0.055)'
    box1X.style.border = '2px solid rgba(247, 247, 247, 0.877)'

})

function drawBoxV(x, y) {
    ctx.beginPath()
    ctx.strokeStyle = 'white';
    ctx.lineWidth = '5';

    ctx.roundRect(34 + x * (cellSize + gap), 37 + y * (cellSize + gap), cellSize, cellSize, 5);
    ctx.stroke();
}
function drawBoxVO(x, y) {
    ctx.beginPath()
    ctx.strokeStyle = '#1777ff';
    ctx.lineWidth = '5';

    ctx.roundRect(34 + x * (cellSize + gap), 37 + y * (cellSize + gap), cellSize, cellSize, 5);
    ctx.stroke();
}

function drawBoxH(x, y) {
    ctx.beginPath()
    ctx.strokeStyle = 'white';
    ctx.lineWidth = '5';

    ctx.roundRect(34 + x * (cellSize + gap), 37 + y * (cellSize + gap), cellSize, cellSize, 5);
    ctx.stroke();
}
function drawBoxHO(x, y) {
    ctx.beginPath()
    ctx.strokeStyle = '#1777ff';
    ctx.lineWidth = '5';

    ctx.roundRect(34 + x * (cellSize + gap), 37 + y * (cellSize + gap), cellSize, cellSize, 5);
    ctx.stroke();
}

function drawBoxDK(x, y) {
    ctx.beginPath()
    ctx.strokeStyle = 'white';
    ctx.lineWidth = '5';

    ctx.roundRect(34 + x * (cellSize + gap), 37 + y * (cellSize + gap), cellSize, cellSize, 5);
    ctx.stroke();
}
function drawBoxDKO(x, y) {
    ctx.beginPath()
    ctx.strokeStyle = '#1777ff';
    ctx.lineWidth = '5';

    ctx.roundRect(34 + x * (cellSize + gap), 37 + y * (cellSize + gap), cellSize, cellSize, 5);
    ctx.stroke();
}

function drawBoxDKiri(x, y) {
    ctx.beginPath()
    ctx.strokeStyle = 'white';
    ctx.lineWidth = '5';

    ctx.roundRect(34 + x * (cellSize + gap), 37 + y * (cellSize + gap), cellSize, cellSize, 5);
    ctx.stroke();
}
function drawBoxDKiriO(x, y) {
    ctx.beginPath()
    ctx.strokeStyle = '#1777ff';
    ctx.lineWidth = '5';

    ctx.roundRect(34 + x * (cellSize + gap), 37 + y * (cellSize + gap), cellSize, cellSize, 5);
    ctx.stroke();
}
// window.addEventListener('load',function(){


// })
function drawBoxNoShadow() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            ctx.beginPath();
            ctx.fillStyle = '#22242a'
            // ctx.rect(34 + i * (cellSize + gap), 37 + j * (cellSize + gap), cellSize, cellSize);
            ctx.roundRect(34 + i * (cellSize + gap), 37 + j * (cellSize + gap), cellSize, cellSize, 5)  
            ctx.fill()
            ctx.closePath();
        }
    }
}
function drawBoxShadow() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            ctx.beginPath();
            ctx.fillStyle = '#22242a'
            ctx.shadowColor = '  rgba(58, 136, 240, 0.51)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            // ctx.rect(34 + i * (cellSize + gap), 37 + j * (cellSize + gap), cellSize, cellSize);
            ctx.roundRect(34 + i * (cellSize + gap), 37 + j * (cellSize + gap), cellSize, cellSize, 5)
            ctx.fill()
            ctx.closePath();
        }
    }
}
function border1X() {

    box1X.style.border = '2px solid rgba(247, 247, 247, 0.877)'
    box2O.style.border = '2px solid rgba(247, 247, 247, 0.055)'

}
function border2O() {
    box2O.style.border = '2px solid rgba(247, 247, 247, 0.877)'
    box1X.style.border = '2px solid rgba(247, 247, 247, 0.055)'
}

drawBoard();







