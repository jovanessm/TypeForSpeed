resetGame();

// DOM Variable Extraction
var text_current = $(".text-current");
var text_to_do = $(".text-to-do");
var text_done = $(".text-done");
var inputbox = $(".inputbox");

// Initial Variable
var running = false;

var totalWord = 20;

var paragraph = [];
var commonWordsLen = commonWords.length;

initializeParagraph();

var correctWords = 0;
var currentIndex = 0;
var currentWord = "start";
text_current.html("start");
text_to_do.html(paragraph.join(" ")); // set the to do paragraph
text_done.html("");

// Function Logic Typing test

function resetGame() {
  $(".inputbox").prop("disabled", false);
  var text_current = $(".text-current");
  var text_to_do = $(".text-to-do");
  var text_done = $(".text-done");
  paragraph = [];
  initializeParagraph();
  correctWords = 0;
  currentIndex = 0;
  currentWord = "start";
  text_current.html("start");
  text_to_do.html(paragraph.join(" ")); // set the to do paragraph
  text_done.html("");

  minutes = 0;
  seconds = 0;
  running = false;
  displayStopWatch();
  displayWPM();
}

function checkFinish() {
  if (currentIndex == paragraph.length - 1) {
    inputbox.prop("disabled", true);
    running = false;
  }
}

function initializeParagraph() {
  for (let word = 0; word < totalWord; word++) {
    var index = Math.floor(Math.random() * commonWordsLen);
    while (commonWords[index].length === 1) {
      index = Math.floor(Math.random() * commonWordsLen);
    }
    paragraph.push(commonWords[index]);
  }
  paragraph.push(" ");
}

function setTheNextCurrentWord(correct) {
  if (!running) {
    running = true;
    stopWatch();
  }
  // move the current text html to done html
  appendTextDone(correct);
  // set the new current text variable
  currentWord = paragraph[currentIndex];
  text_current.html(currentWord);
  // remove the current text fromt the to do text
  text_to_do.html(text_to_do.html().split(" ").slice(1).join(" "));

  checkFinish();
  currentIndex++;
}

function appendTextDone(correct) {
  if (correct) {
    text_done.append(currentWord + " ");
  } else {
    text_done.append('<span class="false">' + currentWord + " </span>");
  }
}

$(".dropdown-item").on("click", function () {
  totalWord = $(this).html();
  resetGame();
});

const toastTrigger = $("#liveToastBtn");
const toastLiveExample = $("#liveToast");
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
toastTrigger.on("click",function(){
  toastBootstrap.show();
});



inputbox.on("keydown", function (event) {
  if (event.key === " ") {
    // if the space " " is pressed
    event.preventDefault();
    var currenttyping = this.value;
    var correct = true;
    if (currentWord != currenttyping) {
      correct = false;
    } else correctWords++;
    setTheNextCurrentWord(correct);
    this.value = "";
  }
});

// Implementation Stopwatch

minutes = 0;
seconds = 0;

function stopWatch() {
  if (running) {
    displayStopWatch();
    displayWPM();
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    setTimeout(stopWatch, 1000);
    seconds++;
  }
}

// Display StopWatch

function displayStopWatch() {
  var timerDisplay = $(".timer");
  timerDisplay.html(minutes.toString() + ":" + displaySeconds(seconds));
}

function displaySeconds(second) {
  if (second > 9) return second;
  else return "0" + second;
}

// Implementation WPM Counter

function displayWPM() {
  var totalSec = minutes * 60 + seconds;
  var WPM = Math.round((60 / totalSec) * correctWords);
  if (WPM == Number.POSITIVE_INFINITY) WPM = 0;
  $(".WPM > span").html(WPM);
}

// Implementation Restart Button

$(".reset").on("click", function () {
  resetGame();
});
