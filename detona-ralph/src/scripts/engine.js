//variaveis que aparecem pro usuario/alterado visualmente (views) e os que estao funcionando por baixo (values)
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
    },
    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    }
}
// audio
// coloca o volume um pouco mais baixo e coloca pra tocar no listener
//`crases e ${nome}, "nome". o nome tem que ser oque ta no audio, nao pode ser qualquer um
// colocamos uma interpolaçao para que se tivermos mais de um audio
//nao precisamos criaroutra funçao e colocar o outro audio la
// o negocio é colocar nome para identificaçao
// para tocar sons genericos
function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
    let audio2 = new Audio(`./src/audios/${audioName}.mp3`);
    audio2.volume = 0.2;
    audio2.play();
}



//acessa todos os quadrados pra limpar primeiro qualquer uma que tenha o enemy
// e entao sorteia usando a bib math e pegando apenas de 1 a 9
// dps pega o quadrado do numero soteado anteriormenente e add o enemy
// pegar a posiçao do enemy que será clicado para ajudar na funçao posterior
function randomSquare(){
    state.view.squares.forEach((square)=> {
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}
// para que o enemy se mova aleatoriamente sem precisar ficar atualizando a pag
// a cada x tempo de intervalo chama a funçao randomsquare em miliseg
// por termos de estetica guarda o tempo em uma variavel ja setada
function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

//para ouvir o click do mouse do usuario ao interagir
// quando mouse clicar no square vai acontecer algo
// o result é a pontuação
// coloca null pra que o usuario nao ganhe score/pontos quando não clicar
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=> {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    } )
}
//implementar um tempo para decrementar, para que o suario tenha um tempo definido para jogar e conseguir o max de pontos
// o timer tem que ser chamado a todo momento e tem que limpar seu intervalo
// verifica se o tempo acabou e imprime uma msg
// ao limpar toda vez que o tempo acabar, para resetar e não da bug
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game over😓   Pontuação: " + state.values.result); 
        playSound("gameov");
    }
}

//funçao principal para chamar outras coisas, pode colocar qualquer nome
function init() {
    moveEnemy();
    addListenerHitBox();
}
init();
