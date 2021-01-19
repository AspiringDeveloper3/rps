const game = () => {
  let pScore = 0;
  let cScore = 0;
  const introScreen = document.querySelector(".intro");
  const matchArea = document.querySelector(".match");
  const playBtn = document.querySelector("button.play");

  const startGame = () => {
    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      matchArea.classList.remove("fadeOut");
      matchArea.style.transform = `translate(-50%, -50%)`;
    });
  };

  const playerHand = document.querySelector(".player-hand");
  const computerHand = document.querySelector(".computer-hand");
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });
    // computer options
    const cOptions = ["paper", "rock", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        let playerImage = this.innerHTML;
        const computerImageNum = Math.floor(Math.random() * 3);
        let computerImage = cOptions[computerImageNum];
        setTimeout(() => {
          playerHand.setAttribute("src", `../assets/${playerImage}.png`);
          computerHand.setAttribute("src", `../assets/${computerImage}.png`);
          compareHands();
        }, 2000);

        // animation
        computerHand.style.animation = "shakeComputer 2s ease";
        playerHand.style.animation = "shakePlayer 2s ease";
        checkWinner();
      });
    });
  };
  let winText = document.querySelector(".win-text");

  const checkWinner = () => {
    if (pScore == 5) {
      winText.textContent = "You are the Champion! 🎉🎉";
      winText.style.color = "#fabb3c";
      winText.style.fontSize = "5rem";
    }
    if (cScore == 5) {
      winText.textContent = "Computer is the Champion 😥😥";
      winText.style.color = "#fa9b3c";
      winText.style.fontSize = "5rem";
    }
  };

  const compareHands = () => {
    console.log(pScore, cScore);
    let loseSound = new Audio("../sounds/lose.mp3");
    let winSound = new Audio("../sounds/win.mp3");
    let computerSrc = computerHand.getAttribute("src");
    let playerSrc = playerHand.getAttribute("src");

    if (computerSrc == playerSrc) winText.innerHTML = "Its a Draw!";

    if (
      playerSrc == "../assets/rock.png" &&
      computerSrc == "../assets/paper.png"
    ) {
      winText.innerHTML = `Aww...Computer Wins`;
      cScore += 1;
      loseSound.play();
    }
    if (
      playerSrc == "../assets/rock.png" &&
      computerSrc == "../assets/scissors.png"
    ) {
      winText.innerHTML = `Yay! You Win`;
      pScore += 1;
      winSound.play();
    }
    if (
      playerSrc == "../assets/paper.png" &&
      computerSrc == "../assets/scissors.png"
    ) {
      winText.innerHTML = `Aww...Computer Wins`;
      cScore += 1;
      loseSound.play();
    }
    if (
      playerSrc == "../assets/paper.png" &&
      computerSrc == "../assets/rock.png"
    ) {
      winText.innerHTML = `Yay! You Win`;
      pScore += 1;
      winSound.play();
    }
    if (
      playerSrc == "../assets/scissors.png" &&
      computerSrc == "../assets/rock.png"
    ) {
      winText.innerHTML = `Aww...Computer Wins`;
      cScore += 1;
      loseSound.play();
    }
    if (
      playerSrc == "../assets/scissors.png" &&
      computerSrc == "../assets/paper.png"
    ) {
      winText.innerHTML = `Yay! You Win`;
      pScore += 1;
      winSound.play();
    }

    const playerScore = document.querySelector(".player-score");
    const computerScore = document.querySelector(".computer-score");
    computerScore.innerHTML = cScore;
    playerScore.innerHTML = pScore;

    checkWinner();
  };

  startGame();
  playMatch();
};

game();
