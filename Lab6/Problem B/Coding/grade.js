// ============================================================
// Lab 6 – Problem B: Grade Calculator
// List of errors found in the ORIGINAL given code:
// Error 1 (grade.html): onSubmit="checkMark()" does not return false, causing the form to submit and the page to reload, which makes the result disappear. FIX: use onsubmit="return checkMark()".
// Error 2 (grade.js): "isNan" is misspelled; the correct function is "isNaN" (with a capital N).
// Error 3 (grade.js): isNaN(mark) is called on a string; an empty string is treated as 0, so an empty mark passes validation. FIX: Add an empty check first.
// Error 4 (grade.js: Logical error – (mark < 0 && mark > 100) can never be true because a number cannot be both less than 0 and greater than 100 at the same time. FIX: Use OR (||) instead of AND (&&).
// Error 5 (grade.js): The order of validation is wrong. parseInt() should be called only after confirming the input is not empty and is a valid number.
// Error 6 (grade.js): The original code returns true even on failure because it lacks proper early-exit logic. FIX: Ensure return false is used correctly in all validation blocks.
// Error 7 (grade.js): The for-loop starts at i = 1 instead of i = 0, which causes the "A" grade row to be skipped and never added to the table.
// Error 8 (grade.html): The <link rel="stylesheet"> tag is missing, so the style.css file is not loaded.
// Error 9 (grade.html): The "Random Mark" button and its associated feature are missing.
// Error 10 (grade.js): The date and time display feature is missing.
// ============================================================

function checkMark() {
  const name = document.forms["gradeForm"]["name"].value.trim();
  const markStr = document.forms["gradeForm"]["mark"].value.trim();

  if (name === "") {
    alert("Name must be filled out.");
    return false;
  }

  if (markStr === "") {
    alert("Mark field cannot be empty.");
    return false;
  }

  if (isNaN(markStr)) {
    alert("Please enter a valid numeric value.");
    return false;
  }

  const mark = parseInt(markStr, 10);

  if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
  }

  let grade;
  if (mark >= 80) {
    grade = "A";
  } else if (mark >= 65) {
    grade = "B";
  } else if (mark >= 50) {
    grade = "C";
  } else {
    grade = "F";
  }

  const resultEl = document.getElementById("result");
  resultEl.innerHTML = name + " got grade " + grade;

  if (grade === "A" || grade === "B") {
    resultEl.style.color = "green";
  } else if (grade === "C") {
    resultEl.style.color = "orange";
  } else {
    resultEl.style.color = "red";
  }

  document.getElementById("checkedOn").innerHTML =
    "Checked on: " + new Date();

  return false;
}

function showTable() {
  const grades = ["A", "B", "C", "F"];
  const ranges = ["80-100", "65-79", "50-64", "0-49"];

  let tableHTML = "<table class='grade-table'>";
  tableHTML += "<tr><th>Grade</th><th>Mark range</th></tr>";

  for (let i = 0; i < grades.length; i++) {
    tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
  }
  tableHTML += "</table>";

  document.getElementById("tableContainer").innerHTML = tableHTML;
}

function randomMark() {
  const n = Math.floor(Math.random() * 101);
  document.getElementById("mark").value = n;
}