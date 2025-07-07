let quizTime = 15 * 60; // 15 minutes in seconds
let timerInterval;
let currentQ = 0;
let score = 0;

const questions = [
  {"q":"Which block makes decisions?","options":["forever","if-else","show"],"a":1},
  {"q":"Which is a control block?","options":["forever","move 10 steps","play sound"],"a":0},
  {"q":"What block in PictoBlox starts your code?","options":["start block","when flag clicked","repeat block"],"a":1},
  {"q":"Which control structure repeats with condition?","options":["repeat","repeat until","hide"],"a":1},
  {"q":"What is the use of sensors?","options":["Display colors","Detect changes in the environment","Cook food"],"a":1},
  {"q":"What is the purpose of a loop?","options":["Run code once","Repeat actions","Stop actions"],"a":1},
  {"q":"Which tab helps create new blocks?","options":["My Blocks","Costume","Looks"],"a":0},
  {"q":"What is the use of 'if' block?","options":["Add music","Control actions with condition","Draw circle"],"a":1},
  {"q":"How do you switch backdrop in PictoBlox?","options":["switch costume","switch backdrop","say"],"a":1},
  {"q":"Which is not a control block?","options":["repeat","wait","move 10 steps"],"a":2},
  {"q":"Which block runs code when green flag is clicked?","options":["when green flag clicked","if clicked","go when"],"a":0},
  {"q":"Which PictoBlox block sets motor speed?","options":["set speed","control motor","set motor speed"],"a":2},
  {"q":"What is the full form of LED?","options":["Light Enabled Device","Light Emitting Diode","Low Energy Display"],"a":1},
  {"q":"Which part of PictoBlox shows blocks?","options":["Stage","Script area","Block palette"],"a":2},
  {"q":"What is an output device?","options":["Buzzer","LDR","Sensor"],"a":0},
  {"q":"Which tab shows the output of your program?","options":["Stage","Costume","Backpack"],"a":0},
  {"q":"Where do you drag blocks in PictoBlox?","options":["Stage","Script Area","Block Bin"],"a":1},
  {"q":"What does LDR stand for?","options":["Light Dependent Resistor","Light Drawing Resistor","Linear Drop Resistor"],"a":0},
  {"q":"Which extension is used to control hardware?","options":["Text to Speech","Arduino","Music"],"a":1},
  {"q":"Which block makes a sprite say something?","options":["say","show","move"],"a":0},
  {"q":"Which block is used to repeat code?","options":["if","repeat","hide"],"a":1},
  {"q":"What component is used to detect light?","options":["LDR","Buzzer","Motor"],"a":0},
  {"q":"What is a sprite?","options":["A sound","A block","A character that performs actions"],"a":2},
  {"q":"How do you create a variable in PictoBlox?","options":["Control tab","Variables tab","Motion tab"],"a":1},
  {"q":"What does 'forever' block do?","options":["Repeat once","Repeat forever","Repeat twice"],"a":1},
  {"q":"What is the use of 'wait' block?","options":["Pause actions","Change color","Stop robot"],"a":0},
  {"q":"What block pauses the program?","options":["pause","wait","stop"],"a":1},
  {"q":"Which tab shows code blocks in PictoBlox?","options":["Backpack","Blocks","Scripts"],"a":1},
  {"q":"What device stores charge?","options":["Resistor","Capacitor","Switch"],"a":1},
  {"q":"Which control block checks condition?","options":["if","repeat","say"],"a":0},
  {"q":"What color is the 'control' block category?","options":["Blue","Orange","Purple"],"a":1},
  {"q":"Which block checks condition?","options":["if","move","sound"],"a":0},
  {"q":"What component produces sound?","options":["LED","Buzzer","LDR"],"a":1},
  {"q":"Which block stops all scripts?","options":["stop all","wait","say"],"a":0},
  {"q":"What can control a loop?","options":["Sensor","Condition","LED"],"a":1},
  {"q":"What connects components on breadboard?","options":["Jump wires","Glue","Paper"],"a":0},
  {"q":"What block runs code continuously?","options":["repeat until","forever","hide"],"a":1},
  {"q":"What is a variable?","options":["It stores values","A robot","A resistor"],"a":0},
  {"q":"Which block in PictoBlox starts your code?","options":["start block","when flag clicked","repeat block"],"a":1},
  {"q":"Where can you find the robot extension?","options":["Motion tab","Extensions tab","Looks tab"],"a":1},
  {"q":"What is used to spin wheels?","options":["Motor","LED","Button"],"a":0},
  {"q":"What component lights up when powered?","options":["Switch","LED","Wire"],"a":1},
  {"q":"What is the correct block to repeat actions?","options":["repeat","say","hide"],"a":0},
  {"q":"What does an LED do?","options":["Stores energy","Lights up","Rotates"],"a":1},
  {"q":"What is the function of ‘repeat until’?", "options": ["Repeat always", "Repeat with condition", "Repeat once"], "a": 1},
  {"q":"Which component senses light?", "options": ["LDR", "Capacitor", "Speaker"], "a": 0},
  {"q":"Which block allows sprite to move?", "options": ["say", "move 10 steps", "repeat"], "a": 1},
  {"q":"Which device is used to store electricity?", "options": ["Resistor", "Capacitor", "Buzzer"], "a": 1},
  {"q":"What happens when the green flag is clicked?", "options": ["Nothing", "Code starts", "It shuts down"], "a": 1}
];

function startQuiz() {
  const name = document.getElementById("student-name").value.trim();
  if (!name) {
    alert("Please enter your name to start.");
    return;
  }

  // Save the student name globally
  window.studentName = name;

  document.getElementById("start-screen").style.display = "none";
  document.querySelector(".container").style.display = "block";
  document.getElementById("timer").classList.remove("hidden");

  startTimer();
  loadQuestion();
}


function startTimer() {
  const timerEl = document.getElementById("time-remaining");
  timerInterval = setInterval(() => {
    if (quizTime <= 0) {
      clearInterval(timerInterval);
      showResult();
      return;
    }
    quizTime--;
    const mins = Math.floor(quizTime / 60);
    const secs = quizTime % 60;
    timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

function loadQuestion() {
  const q = questions[currentQ];
  document.getElementById("question").innerText = `${currentQ + 1}. ${q.q}`;
  const opts = document.getElementById("options");
  opts.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => {
      if (idx === q.a) score++;
      nextQuestion();
    };
    opts.appendChild(btn);
  });
}

function nextQuestion() {
  currentQ++;
  if (currentQ < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  clearInterval(timerInterval);
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("timer").classList.add("hidden");

  const percent = Math.round((score / questions.length) * 100);
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").innerText = percent;

  const badgeText = document.getElementById("badge");
  const audio = document.getElementById("success-audio");

  // Retrieve student name safely
  const name = window.studentName && window.studentName !== "" ? window.studentName : "Student";

  if (percent > 80) {
    badgeText.innerText = `${name}, you earned a 🏅 GOLDEN BADGE!`;
    audio.play();
  } else if (percent > 50) {
    badgeText.innerText = `${name}, you earned a 🥈 SILVER BADGE!`;
  } else {
    badgeText.innerText = `${name}, you earned a 🥉 BRONZE BADGE!`;
  }
}

window.onload = () => {
  document.querySelector(".container").style.display = "none";
};
