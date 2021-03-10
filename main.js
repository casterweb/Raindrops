class Raindrop {
    equation;
    stepTop;
    startAnimation;
    startAnimationOpacityDrop;
    fail = 0;
    opacityDrop = 1;
    constructor(min = 0, max = 10, speed = 1, isBonusRaindrop = false) {
      this.min = min;
      this.max = max;
      this.speed = speed;
      this.isBonusRaindrop = isBonusRaindrop;
      this.initComponents();
      this.createDrop();
      setTimeout(() => {
        requestAnimationFrame(this.moveDrop.bind(this));
      }, this.random(0, 1700));
    }
  
    destroy() {
      cancelAnimationFrame(this.startAnimation);
      requestAnimationFrame(this.hiddenDrop.bind(this));
    }
  
    hiddenDrop() {
      this.opacityDrop -= 0.1;
      this.drop.style.opacity = this.opacityDrop;
      if (this.opacityDrop > 0) {
        requestAnimationFrame(this.hiddenDrop.bind(this));
      } else {
        this.drop.remove();
      }
    }
  
    initComponents() {
      this.wave = document.querySelector(".wave");
      this.gamePlace = document.querySelector(".game-place");
      this.game = document.querySelector(".game");
      this.scoreBoard = document.querySelector(".score-board");
      this.score = document.querySelector(".score");
      this.drop = document.createElement("div");
      this.drop.classList.add("drop");
      this.num1 = document.createElement("div");
      this.num1.classList.add("num1");
      this.num2 = document.createElement("div");
      this.num2.classList.add("num2");
      this.operator = document.createElement("div");
      this.operator.classList.add("operator");
  
      this.drop.appendChild(this.num1);
      this.drop.appendChild(this.num2);
      this.drop.appendChild(this.operator);
  
      this.gamePlace.appendChild(this.drop);
    }
  
    addOnFallEvent(onFallCallBack) {
      this.onFallCallBack = onFallCallBack;
    }
    createDrop() {
      let a = this.random(this.min, this.max);
      let b = this.random(this.min, this.max);
      this.equation = this.createEquation(a, b);
      this.operator.textContent = this.addOperator(a, b);
      this.stepTop = -this.drop.offsetHeight;
      this.drop.style.left = this.getDropLeftPos();
      this.drop.style.top = this.stepTop + "px";
      if (this.isBonusRaindrop) {
        a = this.random(1, 10);
        b = this.random(1, 10);
        this.equation = this.createBonusEquation(a, b);
        this.drop.style.backgroundColor = "orange";
        this.operator.textContent = "*";
      }
      this.num1.textContent = a;
      this.num2.textContent = b;
    }
  
    random(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
  
    addOperator(a, b) {
      if (a > b) {
        return (this.operator.value = "-");
      } else {
        return (this.operator.value = "+");
      }
    }
  
    createBonusEquation(a, b) {
      return eval(a + "*" + b);
    }
  
    createEquation(a, b) {
      return eval(a + this.addOperator(a, b) + b);
    }
  
    checkEquation(value) {
      return this.equation === value;
    }
  
    moveDrop() {
      this.stepTop += this.speed;
      this.drop.style.top = this.stepTop + "px";
      if (
        this.drop.offsetTop + this.drop.offsetHeight <
        this.wave.offsetTop + 20
      ) {
        this.startAnimation = requestAnimationFrame(this.moveDrop.bind(this));
      } else {
        this.onFallCallBack();
        this.increasWave();
        this.createDrop();
        requestAnimationFrame(this.moveDrop.bind(this));
      }
    }
  
    getDropLeftPos() {
      const leftPos = this.random(
        0,
        this.gamePlace.offsetWidth - this.drop.offsetWidth
      );
      return leftPos + "px";
    }
  
    increasWave() {
      this.wave.style.height = this.wave.offsetHeight + 50 + "px";
    }
  }
  
  class Calculator {
    keyNum;
    constructor(checkResult) {
      this.initComponents();
      this.initEvents();
      this.checkResultFunction = checkResult;
    }
  
    initComponents() {
      this.numbers = document.querySelectorAll(".number");
      this.clear = document.querySelector(".clear");
      this.enter = document.querySelector(".enter");
      this.deleteKey = document.querySelector(".delete-key");
      this.display = document.querySelector(".display");
    }
  
    initEvents() {
      this.enter.addEventListener("click", this.pressEnter.bind(this));
  
      this.numbers.forEach((number) => {
        number.addEventListener("click", () => {
          if (this.display.value === "") {
            this.display.value = number.textContent;
          } else {
            this.display.value += number.textContent;
          }
        });
      });
  
      this.clear.addEventListener("click", this.clearDisplayValue.bind(this));
  
      this.deleteKey.addEventListener("click", this.deleteLastChar.bind(this));
  
      window.addEventListener("keyup", this.addKeyControl.bind(this));
    }
  
    deleteLastChar() {
      this.display.value = this.display.value.slice(
        0,
        this.display.value.length - 1
      );
    }
  
    clearDisplayValue() {
      this.display.value = "";
    }
  
    pressEnter() {
      let value = Number(this.display.value);
      this.checkResultFunction(value);
      this.display.value = "";
    }
  
    pressKeyNum() {
      if (this.display.value === "") {
        this.display.value = this.keyNum;
      } else {
        this.display.value += this.keyNum;
      }
    }
  
    addKeyControl(e) {
      switch (e.which) {
        case 110:
          this.deleteLastChar();
          break;
        case 107:
          this.clearDisplayValue();
          break;
        case 13:
          this.pressEnter();
          break;
        case 97:
          this.keyNum = 1;
          this.pressKeyNum();
          break;
        case 98:
          this.keyNum = 2;
          this.pressKeyNum();
          break;
        case 99:
          this.keyNum = 3;
          this.pressKeyNum();
          break;
        case 100:
          this.keyNum = 4;
          this.pressKeyNum();
          break;
        case 101:
          this.keyNum = 5;
          this.pressKeyNum();
          break;
        case 102:
          this.keyNum = 6;
          this.pressKeyNum();
          break;
        case 103:
          this.keyNum = 7;
          this.pressKeyNum();
          break;
        case 104:
          this.keyNum = 8;
          this.pressKeyNum();
          break;
        case 105:
          this.keyNum = 9;
          this.pressKeyNum();
          break;
        case 96:
          this.keyNum = 0;
          this.pressKeyNum();
          break;
      }
    }
  }
  
  class Game {
    currentScore = 0;
    rightAnsweres = 0;
    fail = 0;
    speed = 1;
    raindropArr = [];
    raindropMaxCount = 2;
    countDrop = 0;
    countRightAnswers = 0;
    countAutoDrop = 0;
    timerId;
    timerId2;
    autoFail = 0;
  
    constructor() {
      this.initComponents();
      this.initEvents();
      this.calculator = new Calculator(this.checkResult.bind(this));
    }
  
    startAutoPlay() {
      this.rain.play();
      this.greeting.style.display = "none";
      this.game.style.display = "flex";
      this.setDifficult();
      this.raindropArr.forEach((raindrop) => {
        raindrop.destroy();
      });
      this.raindropArr = [];
      this.countAutoDrop = 0;
      this.autoFail = 0;
      this.display.value = "";
      this.currentScore = 0;
      this.score.textContent = ` Score: ${this.currentScore}`;
      this.startGame();
      this.timerId = setTimeout(this.autoPlay.bind(this), 5000);
    }
  
    autoPlay() {
      if (this.countAutoDrop % 4 === 0) {
        this.display.value = 53;
        this.timerId2 = setTimeout(this.pressEnter.bind(this), 1000);
        this.autoFail++;
      } else {
        this.display.value = this.raindropArr[0].equation;
        this.timerId2 = setTimeout(this.pressEnter.bind(this), 1000);
      }
      this.timerId = setTimeout(this.autoPlay.bind(this), 2000);
  
      if (this.autoFail === 3) {
        clearTimeout(this.timerId);
        clearTimeout(this.timerId2);
      }
    }
  
    pressEnter() {
      let value = Number(this.display.value);
      this.checkResult(value);
      this.display.value = "";
      console.log("pressEnter");
    }
  
   
    startGame() {
      this.rain.play();
      this.setDifficult();
      this.display.value = '';
      this.wave.style.height = "100px";
      this.score.textContent = `Score: ${this.currentScore}`;
      this.createRaindrops();
    }
  
    createRaindrops() {
      while (this.raindropArr.length < this.raindropMaxCount) {
        const isBonusRaindrop = this.countDrop > 3;
        if (isBonusRaindrop) {
          this.countDrop = 0;
        }
        const raindrop = new Raindrop(
          this.min,
          this.max,
          this.speed,
          isBonusRaindrop
        );
        raindrop.addOnFallEvent(this.setScore.bind(this, false));
        this.raindropArr.push(raindrop);
      }
      this.countAutoDrop++;
    }
  
    initComponents() {
      this.howToPlay = document.querySelector(".how-to-play");
      this.play = document.querySelector(".play");
      this.drop = document.querySelector(".drop");
      this.score = document.querySelector(".score");
      this.continueButton = document.querySelector(".continue");
      this.wave = document.querySelector(".wave");
      this.rightSound = document.querySelector(".right-sound");
      this.failSound = document.querySelector(".fail-sound");
      this.game = document.querySelector(".game");
      this.scoreBoard = document.querySelector(".score-board");
      this.gamePlace = document.querySelector(".game-place");
      this.greeting = document.querySelector(".greeting");
      this.rain = document.querySelector(".rain");
      this.continueButton = document.querySelector(".continue");
      this.resultScore = document.querySelector(".result-score");
      this.resultRightAnswers = document.querySelector(".result-right-answers");
      this.resultWrongAnswers = document.querySelector(".result-wrong-answers");
      this.display = document.querySelector(".display");
    }
    
    initEvents() {
      this.howToPlay.addEventListener("click", this.startAutoPlay.bind(this));
      this.play.addEventListener("click", () => {
        this.greeting.style.display = "none";
        this.game.style.display = "flex";
        this.startGame();
      });
      this.continueButton.addEventListener("click", () => {
        this.greeting.style.display = "block";
        this.scoreBoard.style.display = "none";
      });
      window.addEventListener("click", this.addFullScreen);
    }
  
    checkResult(value) {
      const rightRaindrop = this.raindropArr.find((raindrop) => {
        return raindrop.checkEquation(value);
      });
  
      if (rightRaindrop) {
        rightRaindrop.destroy();
        this.raindropArr = this.raindropArr.filter((raindrop) => {
          return raindrop !== rightRaindrop;
        });
        this.setScore(true);
  
        if (rightRaindrop.isBonusRaindrop) {
          this.raindropArr.forEach((raindrop) => {
            raindrop.destroy();
            this.setScore(true);
          });
          this.raindropArr = [];
          this.countDrop = 0;
        }
      } else {
        this.setScore(false);
      }
      this.createRaindrops();
    }
     
    setScore(isRightAnswer) {
      if (isRightAnswer) {
        this.currentScore += 10 + this.rightAnsweres;
        this.rightAnsweres += 1;
      } else {
        this.currentScore -= 20;
        this.rightAnsweres = 0;
      }
      if (this.currentScore < 0) {
        this.currentScore = 0;
      }
      this.score.textContent = `Score: ${this.currentScore}`;
      this.setDifficult(this.currentScore);
      if (isRightAnswer) {
        this.rightSound.play();
        this.countDrop++;
        this.countRightAnswers++;
      } else {
        this.failSound.play();
        this.fail += 1;
      }
      if (this.fail === 3) {
        this.gameOver();
      }
    }
  
    setDifficult() {
      if (this.currentScore < 20) {
        this.min = 0;
        this.max = 10;
        this.speed = 0.8;
      } else if (this.currentScore < 50) {
        this.min = 10;
        this.max = 20;
        this.speed = 1;
      } else if (this.currentScore < 100) {
        this.min = 20;
        this.max = 30;
        this.speed = 1.3;
      } else if (this.currentScore < 300) {
        this.min = 30;
        this.max = 35;
        this.speed = 2;
      }
    }
  
    gameOver() {
      this.game.style.display = "none";
      this.scoreBoard.style.display = "block";
      this.resultWrongAnswers.textContent = `3`;
      this.resultRightAnswers.textContent = this.countRightAnswers;
      this.resultScore.textContent = this.currentScore;
      this.raindropArr.forEach((raindrop) => {
        raindrop.destroy();
      });
      this.raindropArr = [];
      this.countDrop = 0;
      this.fail = 0;
      this.currentScore = 0;
      this.countRightAnswers = 0;
    }
    
    addFullScreen(event) {
      if (!event.target.hasAttribute("data-fullscreen")) return;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  }
  
  const game = new Game();