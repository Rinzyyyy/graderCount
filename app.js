let animation = document.querySelector(".animation-wrapper");
let slider = document.querySelector(".slider");
let title = document.querySelector(".title");
const timeline = gsap.timeline();

timeline
  .fromTo(slider, 1.6, { y: "0%", ease: Power1.easeIn }, { y: "-100%" })
  .from(title, 1, { opacity: 0, scale: 0, ease: "back" }, "-=0.6");

setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 1600);

//===============================================================================

//forbid use enter to submit the form
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

// prevent button submit the form
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// change credit then setGPA
let credits = document.querySelectorAll(".classCredit");
credits.forEach((credit) => {
  credit.addEventListener("change", (e) => {
    setGPA();
  });
});

// different grade different background color
// change grade then setGPA
let gradeselects = document.querySelectorAll(".selectGrade"); //select all form
gradeselects.forEach((gs) => {
  gs.addEventListener("change", (e) => {
    changeColor(e.target); //<select>
    setGPA();
  });
});

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "white";
  } else if (
    target.value == "B+" ||
    target.value == "B" ||
    target.value == "B-"
  ) {
    target.style.backgroundColor = "#FFF0F5";
  } else if (
    target.value == "C+" ||
    target.value == "C" ||
    target.value == "C-"
  ) {
    target.style.backgroundColor = "#FFC0CB";
  } else if (
    target.value == "D+" ||
    target.value == "D" ||
    target.value == "D-"
  ) {
    target.style.backgroundColor = "#FF69B4";
  } else {
    target.style.backgroundColor = "#FF0000";
  }
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.3;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.3;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.3;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0;
    case "":
      return 0;
  }
}

let scoreS = document.querySelectorAll(".classScore");
scoreS.forEach((score, index) => {
  score.addEventListener("change", (e) => {
    convertGPA(e.target, index);
    setAverage();
    setGPA();
  });
});

function convertGPA(score, index) {
  gradeselects = document.querySelectorAll(".selectGrade");
  if (94 <= score.value) {
    gradeselects[index].value = "A";
  } else if (93 <= score.value) {
    gradeselects[index].value = "A-";
  } else if (87 <= score.value) {
    gradeselects[index].value = "B+";
  } else if (84 <= score.value) {
    gradeselects[index].value = "B";
  } else if (80 <= score.value) {
    gradeselects[index].value = "B-";
  } else if (77 <= score.value) {
    gradeselects[index].value = "C+";
  } else if (74 <= score.value) {
    gradeselects[index].value = "C";
  } else if (70 <= score.value) {
    gradeselects[index].value = "C-";
  } else if (67 <= score.value) {
    gradeselects[index].value = "D+";
  } else if (64 <= score.value) {
    gradeselects[index].value = "D";
  } else if (60 <= score.value) {
    gradeselects[index].value = "D-";
  } else if (score.value < 60) {
    gradeselects[index].value = "F";
  }
  changeColor(gradeselects[index]);
}

function setGPA() {
  let gradeselects = document.querySelectorAll(".selectGrade"); //select all form
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".classCredit");
  let sum = 0; //分子＝級分Ｘ權重
  let creditsSum = 0; //分母＝加權總和
  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditsSum += credits[i].valueAsNumber;
      //console.log(selects[1].value);
      sum += credits[i].valueAsNumber * convertor(gradeselects[i].value);
    }
  }

  let result;
  if (creditsSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditsSum).toFixed(2);
  }
  document.getElementById("resultGpa").innerText = result;
}
function setAverage() {
  let scoreS = document.querySelectorAll(".classScore");
  let formLength = document.querySelectorAll("form").length;
  let sum = 0;
  let num = 0;
  for (let i = 0; i < formLength; i++) {
    if (!isNaN(scoreS[i].valueAsNumber)) {
      sum += scoreS[i].valueAsNumber;
      num++;
    }
  }
  let result = (sum / num).toFixed(1);
  if (!isNaN(result)) {
    document.getElementById("resultGrade").innerText = result;
  } else {
    document.getElementById("resultGrade").innerText = "0.0";
  }
}

let plusBtn = document.querySelector(".plusBtn");
plusBtn.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("inputSection");

  let newIn1 = document.createElement("input");
  newIn1.setAttribute("type", "text");
  newIn1.setAttribute("list", "options");
  newIn1.setAttribute("placeholder", "catogory");
  newIn1.classList.add("classType");

  let newIn2 = document.createElement("select");
  newIn2.classList.add("semester");
  newIn2.setAttribute("style", "width: 9rem");
  let I2Pg0 = document.createElement("value", "");
  let I2Pg0Text = document.createTextNode("");
  I2Pg0.appendChild(I2Pg0Text); //text in p
  newIn2.appendChild(I2Pg0); //0opt in s

  var I2Pg1 = document.createElement("optgroup");
  I2Pg1.setAttribute("lable", "freshman");
  let g1p1 = document.createElement("value", "f1");
  let g1p1T = document.createTextNode("freshman-1");
  g1p1.appendChild(g1p1T); //p1 text in
  let g1p2 = document.createElement("value", "f1");
  let g1p2T = document.createTextNode("freshman-2");
  g1p2.appendChild(g1p2T); // p2 text in p
  I2Pg1.appendChild(g1p1); // 1opt in g
  I2Pg1.appendChild(g1p2); // 2opt in g
  newIn2.appendChild(I2Pg1); //1g in s

  var I2Pg2 = document.createElement("optgroup");
  I2Pg2.setAttribute("lable", "sophmore");
  let g2p1 = document.createElement("value", "sm1");
  let g2p1T = document.createTextNode("sophmore-1");
  g2p1.appendChild(g2p1T);
  let g2p2 = document.createElement("value", "sm1");
  let g2p2T = document.createTextNode("sophmore-2");
  g2p2.appendChild(g2p2T);
  I2Pg2.appendChild(g2p1);
  I2Pg2.appendChild(g2p2);
  newIn2.appendChild(I2Pg2); //2g in s

  var I2Pg3 = document.createElement("optgroup");
  I2Pg3.setAttribute("lable", "junior");
  let g3p1 = document.createElement("value", "j1");
  let g3p1T = document.createTextNode("junior-1");
  g3p1.appendChild(g3p1T);
  let g3p2 = document.createElement("value", "j2");
  let g3p2T = document.createTextNode("junior-2");
  g3p2.appendChild(g3p2T);
  I2Pg3.appendChild(g3p1);
  I2Pg3.appendChild(g3p2);
  newIn2.appendChild(I2Pg3); //3g in s

  var I2Pg4 = document.createElement("optgroup");
  I2Pg4.setAttribute("lable", "senior");
  let g4p1 = document.createElement("value", "s1");
  let g4p1T = document.createTextNode("senior-1");
  g4p1.appendChild(g4p1T);
  let g4p2 = document.createElement("value", "s2");
  let g4p2T = document.createTextNode("senior-2");
  g4p2.appendChild(g4p2T);
  I2Pg4.appendChild(g4p1);
  I2Pg4.appendChild(g4p2);
  newIn2.appendChild(I2Pg4); //4g in s

  var I2Pg5 = document.createElement("optgroup");
  I2Pg5.setAttribute("lable", "fifthGrade");
  let g5p1 = document.createElement("value", "fifth1");
  let g5p1T = document.createTextNode("fifthGrade-1");
  g5p1.appendChild(g5p1T);
  let g5p2 = document.createElement("value", "fifth2");
  let g5p2T = document.createTextNode("fifthGrade-2");
  g5p2.appendChild(g5p2T);
  I2Pg5.appendChild(g5p1);
  I2Pg5.appendChild(g5p2);
  newIn2.appendChild(I2Pg5); //5g in s

  let newIn3 = document.createElement("input");
  newIn3.setAttribute("type", "number");
  newIn3.setAttribute("list", "opt");
  newIn3.setAttribute("placeholder", "credit");
  newIn3.setAttribute("style", "width:5rem");
  newIn3.setAttribute("min", "0");
  newIn3.setAttribute("max", "10");
  newIn3.classList.add("classCredit");
  newIn3.addEventListener("change", (e) => {
    setGPA();
  });

  let newIn4 = document.createElement("input");
  newIn4.setAttribute("type", "number");
  newIn4.setAttribute("placeholder", "score");
  newIn4.setAttribute("style", "width:5rem");
  newIn4.setAttribute("min", "0");
  newIn4.setAttribute("max", "100");
  newIn4.classList.add("classScore");
  let index = document.querySelectorAll("form").length;
  newIn4.addEventListener("change", (e) => {
    console.log(index);
    convertGPA(e.target, index);
    setAverage();
    setGPA();
  });

  // grade-select tag
  let newIn5 = document.createElement("select");
  newIn5.classList.add("selectGrade");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newIn5.appendChild(opt1);
  newIn5.appendChild(opt2);
  newIn5.appendChild(opt3);
  newIn5.appendChild(opt4);
  newIn5.appendChild(opt5);
  newIn5.appendChild(opt6);
  newIn5.appendChild(opt7);
  newIn5.appendChild(opt8);
  newIn5.appendChild(opt9);
  newIn5.appendChild(opt10);
  newIn5.appendChild(opt11);
  newIn5.appendChild(opt12);
  newIn5.appendChild(opt13);
  newIn5.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  let newbtn = document.createElement("button");
  newbtn.classList.add("trashButton");
  let btnIcon = document.createElement("i");
  btnIcon.classList.add("fa-regular");
  btnIcon.classList.add("fa-trash-can");
  newbtn.appendChild(btnIcon);

  newbtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards"; // form
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.parentElement.remove();
        setGPA();
        setAverage();
      }
    );
  });

  newDiv.appendChild(newIn1);
  newDiv.appendChild(newIn2);
  newDiv.appendChild(newIn3);
  newDiv.appendChild(newIn4);
  newDiv.appendChild(newIn5);
  newDiv.appendChild(newbtn);
  newForm.appendChild(newDiv);
  document.querySelector(".inputs").appendChild(newForm);
  newForm.style.animation = "scaleUp 0.5s ease forwards ";
});

let alltrash = document.querySelectorAll(".trashButton");
alltrash.forEach((trash) => {
  let form = trash.parentElement.parentElement;
  trash.addEventListener("click", () => {
    form.classList.add("remove");
  });
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA();
    setAverage();
  });
});

let Dbutn = document.querySelector(".D");
let Abutn = document.querySelector(".A");

Dbutn.addEventListener("click", () => {
  sorting("Descending");
});
Abutn.addEventListener("click", () => {
  sorting("Aescending");
});

function sorting(direction) {
  //put value-group in array
  let inpGs = document.querySelectorAll(".inputSection");
  let GBarray = [];
  for (let i = 0; i < inpGs.length; i++) {
    let catogory = inpGs[i].children[0].value;
    let semester = inpGs[i].children[1].value;
    let credit = inpGs[i].children[2].value;
    let score = Number(inpGs[i].children[3].value);
    let grade = inpGs[i].children[4].value;
    if (score != "") {
      let Gobject = {
        catogory,
        semester,
        credit,
        score,
        grade,
      };
      GBarray.push(Gobject);
    }
  }
  // sort value in array
  GBarray = mergesort(GBarray);
  if (direction == "Descending") {
    GBarray = GBarray.reverse();
  }
  console.log(GBarray);

  //clean form
  let inputs = document.querySelector(".inputs");
  inputs.innerHTML = "";
  // add form proto and fill input value
  for (let i = 0; i < GBarray.length; i++) {
    inputs.innerHTML += `<form>
    <div class="inputSection">
      <input
        type="text"
        placeholder="catogory"
        class="classType"
        list="options"
        value=${GBarray[i].catogory}
      /><!-- 
      --><select
        name="selecterSemester"
        class="semester"
        style="width: 9rem"
      >
        <option value=""></option>

        <optgroup label="freshman">
          <option value="f1">freshman-1</option>
          <option value="f2">freshman-2</option>
        </optgroup>

        <optgroup label="sophmore">
          <option value="sm1">sophmore-1</option>
          <option value="sm2">sophmore-2</option>
        </optgroup>

        <optgroup label="junior">
          <option value="j1">junior-1</option>
          <option value="j2">junior-2</option>
        </optgroup>

        <optgroup label="senior">
          <option value="s1">senior-1</option>
          <option value="s2">senior-2</option>
        </optgroup>

        <optgroup label="fifthGrade">
          <option value="fifth1">fifthGrade-1</option>
          <option value="fifth2">fifthGrade-2</option>
        </optgroup></select
      ><!-- 
      --><input
        style="width: 5rem"
        type="number"
        placeholder="credits"
        class="classCredit"
        min="0"
        max="10"
        value=${GBarray[i].credit}
      /><!-- 
      --><input
        style="width: 5rem"
        type="number"
        placeholder="score"
        class="classScore"
        min="0"
        max="100"
        value=${GBarray[i].score}
      /><!-- 
      --><select name="selectGrade" class="selectGrade">
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option></select
      ><!-- 
      --><button class="trashButton">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  </form>`;
  }
  // fill select value
  let inputSection = document.querySelectorAll(".inputSection");
  for (let i = 0; i < inputSection.length; i++) {
    inputSection[i].children[1].value = GBarray[i].semester;
    inputSection[i].children[4].value = GBarray[i].grade;
    console.log(GBarray[i].grade);
  }

  // set eventlistener
  scoreS = document.querySelectorAll(".classScore");
  scoreS.forEach((score, index) => {
    score.addEventListener("change", (e) => {
      convertGPA(e.target, index);
      setAverage();
      setGPA();
    });
  });
  gradeselects = document.querySelectorAll(".selectGrade");
  gradeselects.forEach((gs) => {
    changeColor(gs);
    gs.addEventListener("change", (e) => {
      changeColor(e.target);
      setGPA();
    });
  });

  credits = document.querySelectorAll(".classCredit");
  credits.forEach((credit) => {
    credit.addEventListener("change", (e) => {
      setGPA();
    });
  });

  alltrash = document.querySelectorAll(".trashButton");
  alltrash.forEach((trash) => {
    let form = trash.parentElement.parentElement;
    trash.addEventListener("click", () => {
      form.classList.add("remove");
    });
    form.addEventListener("transitionend", (e) => {
      e.target.remove();
      setGPA();
      setAverage();
    });
  });
}

function merge(Larr, Rarr) {
  let re = [];
  let i = 0;
  let j = 0;
  while (i < Larr.length && j < Rarr.length) {
    if (Larr[i].score < Rarr[j].score) {
      re.push(Larr[i]);
      i++;
    } else {
      re.push(Rarr[j]);
      j++;
    }
  }
  while (i < Larr.length) {
    re.push(Larr[i]);
    i++;
  }
  while (j < Rarr.length) {
    re.push(Rarr[j]);
    j++;
  }
  return re;
}

function mergesort(GBarr) {
  if (GBarr.length == 0) {
    return;
  }
  if (GBarr.length == 1) {
    return GBarr;
  } else {
    let middle = Math.floor(GBarr.length / 2);
    let Left = GBarr.slice(0, middle);
    let Right = GBarr.slice(middle, GBarr.length);
    return merge(mergesort(Left), mergesort(Right));
  }
}
// set firefox refresh to clean form value
window.addEventListener("load", () => {
  inputSection = document.querySelectorAll(".inputSection");
  inputSection.forEach((input) => {
    for (let i = 0; i < input.children.length; i++) {
      input.children[i].value = "";
    }
  });
});
