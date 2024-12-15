$(".open").on("click", function (e) {
  e.preventDefault();
  $(".result").removeClass("done");
  $(".present").toggleClass("is-open");
  var $this = $(this);
  if ($this.text() === "Open") {
    drawNumber();
    $this.text("Close");
  } else {
    $this.text("Open");
  }
});
const Acardslist = []; // 你的數字列表
const AcardContainer = document.getElementById("AcardContainer");

const predefinedNumbers = [1, 2, 6, 7, 9, 10, 13, 14, 15, 19];
const remainingNumbers = Array.from(
  {
    length: 25
  },
  (_, i) => i + 1
).filter((num) => !predefinedNumbers.includes(num));
const drawnNumbers = [];

function drawNumber() {
  $(".card").addClass("avoid-clicks");
  $(".result").removeClass("done");
  if (drawnNumbers.length === 25) {
    alert("All numbers have been drawn!");
    return;
  }
  let number;
  if (drawnNumbers.length < predefinedNumbers.length) {
    // Randomize the order for predefined numbers
    const availablePredefined = predefinedNumbers.filter(
      (num) => !drawnNumbers.includes(num)
    );
    const randomIndex = Math.floor(Math.random() * availablePredefined.length);
    number = availablePredefined[randomIndex];
  } else {
    // Randomly select from remaining numbers
    const availableRemaining = remainingNumbers.filter(
      (num) => !drawnNumbers.includes(num)
    );
    const randomIndex = Math.floor(Math.random() * availableRemaining.length);
    number = availableRemaining[randomIndex];
  }
  const resultElement = document.getElementById("result");
  let speed = 150;
  let iterations = 0;
  const interval = setInterval(() => {
    $(".bauble").addClass("light");
    $(".star").addClass("star-light");
    const allAvailableNumbers = [
      ...predefinedNumbers,
      ...remainingNumbers
    ].filter((num) => !drawnNumbers.includes(num));
    const randomDisplay =
      allAvailableNumbers[
        Math.floor(Math.random() * allAvailableNumbers.length)
      ];
    resultElement.textContent = randomDisplay;
    iterations++;
    speed = 10;
    if (iterations > 20) {
      $(".bauble").removeClass("light");
      $(".card").removeClass("avoid-clicks");
      clearInterval(interval);
      resultElement.textContent = number;
      $(".result").addClass("done");
      drawnNumbers.push(number);
      Acardslist.push(number);

      updateHistory(number);
    }
  }, speed);
}

function updateHistory(number) {
  const Acard = document.createElement("div");
  Acard.className = "Acard";
  Acard.textContent = number; // 將數字添加到卡片上
  AcardContainer.appendChild(Acard); // 將卡片添加到容器中
}

function resetDraw() {
  drawnNumbers.length = 0;
  document.getElementById("result").textContent = "?";
}