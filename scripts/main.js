"use strict";

let btn1 = document.querySelector(".choosebtn");
let btn2 = document.querySelector(".createbtn");
let rtrn = document.querySelector(".rtrn");
let rtrn1 = document.querySelector(".rtrn1");

let sections = document.querySelectorAll(".mainsec, .choose, .create");

function action(s) {
  sections.forEach(function (sec) {
    if (sec.classList.contains(s)) {
      sec.classList.add("block");
      sec.classList.remove("none");
    } else {
      sec.classList.remove("block");
      sec.classList.add("none");
    }
  });
}

btn1.addEventListener("click", function () {
  action("choose");
});

btn2.addEventListener("click", function () {
  action("create");
});

rtrn.addEventListener("click", function () {
  action("mainsec");
});

rtrn1.addEventListener("click", function () {
  action("mainsec");
});
