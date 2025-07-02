let currentHtmlAnswer = "";
let currentLogicAnswer = "";
let currentDecoderAnswer = "";
let currentRegexAnswer = "";

const unlocked = {
  html: true,
  logic: false,
  decoder: false,
  regex: false
};

function updateButtons() {
  document.querySelectorAll(".mask-controls button").forEach(btn => {
    const key = btn.getAttribute("data-mask");
    btn.disabled = !unlocked[key];
  });
}

function generateHtmlPuzzle() {
  const puzzles = [
    { question: `Fix nesting: &lt;div&gt;&lt;p&gt;Hello&lt;/div&gt;&lt;/p&gt;`, answer: "</p>" },
    { question: `What tag is missing? &lt;a href='link'&gt;Click here`, answer: "</a>" },
    { question: `Fix list tag: &lt;ul&gt;&lt;li&gt;Item 1&lt;/li&gt;&lt;li&gt;Item 2&lt;/ul&gt;`, answer: "</li>" }
  ];
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

function generateLogicPuzzle() {
  const puzzles = [
    { question: `Fix condition: if(x = 5 && y == 10) {...}`, answer: "x == 5" },
    { question: `Fix loop: while(x ! 0) {...}`, answer: "!= 0" },
    { question: `Fix loop: for(let i = 0; i < 10 i++) {...}`, answer: "i++" }
  ];
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

function generateDecoderPuzzle() {
  const puzzles = [
    { question: `Base64 decode this: ${btoa("hacker")}`, answer: "hacker" },
    { question: `Hex decode this: 68 61 63 6b`, answer: "hack" },
    { question: `Binary decode: 01001000 01101001`, answer: "hi" }
  ];
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

function generateRegexPuzzle() {
  const inputs = ["user_01", "test@", "validUser", "123_name", "no space"];
  const valid = inputs.filter(str => /^[a-zA-Z0-9_]+$/.test(str));
  return {
    question: `Find valid usernames: ${inputs.join(", ")}`,
    answer: valid.join(", ")
  };
}

function switchMask(maskName) {
  if (!unlocked[maskName]) {
    alert("This mask is locked. Solve the previous one to unlock.");
    return;
  }

  document.querySelectorAll('.mask').forEach(m => m.classList.remove('active'));
  document.getElementById(`${maskName}-mask`).classList.add('active');

  const input = document.getElementById(`${maskName}-answer`);
  if (input) input.value = "";

  if (maskName === 'html') {
    const p = generateHtmlPuzzle();
    document.querySelector("#html-mask p").innerHTML = p.question;
    currentHtmlAnswer = p.answer.toLowerCase();
  } else if (maskName === 'logic') {
    const p = generateLogicPuzzle();
    document.querySelector("#logic-mask p").innerHTML = p.question;
    currentLogicAnswer = p.answer.toLowerCase();
  } else if (maskName === 'decoder') {
    const p = generateDecoderPuzzle();
    document.querySelector("#decoder-mask p").innerHTML = p.question;
    currentDecoderAnswer = p.answer.toLowerCase();
  } else if (maskName === 'regex') {
    const p = generateRegexPuzzle();
    document.querySelector("#regex-mask p").innerHTML = p.question;
    currentRegexAnswer = p.answer.toLowerCase();
  }
}

function checkAnswer(mask) {
  const input = document.getElementById(`${mask}-answer`).value.trim().toLowerCase();
  let correct = false;
  if (mask === 'html') correct = input === currentHtmlAnswer;
  else if (mask === 'logic') correct = input === currentLogicAnswer;
  else if (mask === 'decoder') correct = input === currentDecoderAnswer;
  else if (mask === 'regex') correct = input === currentRegexAnswer;

  if (correct) {
    alert("Correct!");
    if (mask === 'html') unlocked.logic = true;
    else if (mask === 'logic') unlocked.decoder = true;
    else if (mask === 'decoder') unlocked.regex = true;
    else if (mask === 'regex') {
      alert("You’ve mastered Cyber Shifter! All tools unlocked!");
      document.getElementById("tools").style.display = "block";
      document.querySelectorAll('.mask-controls button').forEach(btn => btn.disabled = true);
    }
    updateButtons();
  } else {
    alert("Try again!");
  }
}

function decodeBase64() {
  const input = document.getElementById("base64Input").value.trim();
  try {
    const output = atob(input);
    document.getElementById("decodedOutput").value = output;
  } catch {
    document.getElementById("decodedOutput").value = "Invalid Base64!";
  }
}

updateButtons();
switchMask('html');