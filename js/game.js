const key = {
    keyDown : {},
    keyValue : {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        88: 'attack'
    }
}

const allMonsterComProp = {
    arr : []
}

// 수리검 배열
const bulletComProp = {
    launch: false,
    arr: []
}

const gameBackground = {
    gameBox: document.querySelector('.game')
}

const gameProp = {
    screenWidth : window.innerWidth,
    screenHeight : window.innerHeight,
    gameOver: false

}

const renderGame = () => {
    hero.keyMotion();
    setGameBackground();
    
    bulletComProp.arr.forEach((arr, i) => {
        console.log('test', bulletComProp.arr.length)
        arr.moveBullet();
    })

    allMonsterComProp.arr.forEach((arr,i)=>{
        arr.moveMonster();
    })
    window.requestAnimationFrame(renderGame);        
}

const endGame = () => {
    gameProp.gameOver = true;
    key.keyDown.left = false;
    key.keyDown.right = false;
    document.querySelector('.game_over').classList.add('active');
}

const setGameBackground = () => {
    let parallaxValue = Math.min(0, ((hero.movex-gameProp.screenWidth/3) * -1));
    
    gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`
}

const windowEvent = () => {
    // 키를 누를때
    window.addEventListener('keydown', e => {        
        if(!gameProp.gameOver) {
            key.keyDown[key.keyValue[e.which]] = true;
        }        
        // console.log(key.keyDown)
        // console.log(e.which)        
    })
    // 키를 뗄때
    window.addEventListener('keyup', e => {
        key.keyDown[key.keyValue[e.which]] = false;        
    })

    window.addEventListener('resize', e => {
        gameProp.screenWidth = window.innerWidth;
        gameProp.screenHeight = window.innerHeight;
    })
}

const loadImg = () => {
    const preLoadImgSrc = ['../../lib/images/ninja_attack.png','../../lib/images/ninja_run.png','../../lib/images/ninja_idle.png']
    preLoadImgSrc.forEach(arr => {
        const img = new Image();
        img.src = arr;
    })
}

let hero;

const init = () => {
    hero = new Hero('.hero');
    allMonsterComProp.arr[0] = new Monster(700, 7777);
    allMonsterComProp.arr[1] = new Monster(1500, 5555);
    loadImg();
    windowEvent();
    renderGame();
    console.log(hero.position());
}

window.onload = () => {
    init();
}