"use strict";
const btns = document.querySelectorAll(".tip-btn");
const customBtn = document.querySelector(".custom-btn-input");
let tipAmount = document.querySelector(".tip-amount");
let total = document.querySelector(".total-amount");
let numberOfPeople = document.querySelector(".num-input");
let bill = document.querySelector(".bill-input");
const reset = document.querySelector(".reset-btn-container");
const errorMessage = document.querySelector(".error-message");
const removeActive = function () {
  btns.forEach((btn) => {
    btn.classList.remove("active");
    customBtn.value = "";
  });
};
const init = () => {
  removeActive();
  tipAmount.textContent = 0.0;
  total.textContent = 0.0;
  location.reload();
};
let tipper;

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeActive();
    btn.classList.toggle("active");
    if (btn.classList.contains("active")) {
      tipper = btn.value;
      console.log("active button", tipper);
    }
    calculate();
  });
});

function calculate() {
  let billAmt = Number(bill.value);
  let numPeople = Number(numberOfPeople.value);
  let tipVal = tipper / 100;

  if ((billAmt > 0) & (numPeople > 0) & (tipVal > 0)) {
    tipAmount.textContent = ((billAmt * tipVal) / numPeople).toFixed(2);
    total.textContent = ((billAmt * (tipVal + 1)) / numPeople).toFixed(2);
  } else {
    tipAmount.textContent = "0.00";
    total.textContent = "0.00";
  }
}

bill.addEventListener("input", (e) => {
  // console.log(e.target.value == "");
  let value = e.target.value;
  let inputField = e.target;
  calculate();
  checkValidation(bill);
});
numberOfPeople.addEventListener("input", () => {
  errorPopUp(numberOfPeople);
  checkValidation(numberOfPeople);
  calculate();
});
customBtn.addEventListener("input", () => {
  let value = Number(customBtn.value);
  tipper = value;
  calculate();
  checkValidation(customBtn);
});

reset.addEventListener("click", init);

function checkValidation(target) {
  if (target.value > 0) {
    target.classList.add("valid");
    target.classList.remove("invalid");
  } else if (target.value == "") {
    console.log("value empty");
    target.classList.remove("valid");
    target.classList.remove("invalid");
    errorMessage.textContent = "";
  } else {
    target.classList.remove("valid");
    target.classList.add("invalid");
  }
}
function errorPopUp(target) {
  if (target.value == 0) {
    errorMessage.textContent = `Can't be zero`;
  }
}
