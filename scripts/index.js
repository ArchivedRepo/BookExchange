"use strict";
// ------------------ Change the image on hover -----------------
const dealImage = document.querySelector("#dealImage");
const chatImage = document.querySelector("#chatImage");
const cardImage = document.querySelector("#cardImage");
const saveImage = document.querySelector("#saveImage");
dealImage.addEventListener("mouseover", dealImageChange);
dealImage.addEventListener("mouseout", dealImageRevert);
chatImage.addEventListener("mouseover", chatImageChange);
chatImage.addEventListener("mouseout", chatImageRevert);
cardImage.addEventListener("mouseover", cardImageChange);
cardImage.addEventListener("mouseout", cardImageRevert);
saveImage.addEventListener("mouseover", saveImageChange);
saveImage.addEventListener("mouseout", saveImageRevert);

function dealImageChange(e) {
    e.target.setAttribute("src", "images/index/price-tag-color.svg");
}

function dealImageRevert(e) {
    e.target.setAttribute("src", "images/index/price-tag.svg");
}

function chatImageChange(e) {
    e.target.setAttribute("src", "images/index/chatting.svg");
}

function chatImageRevert(e) {
    e.target.setAttribute("src", "images/index/chat.svg");
}

function cardImageChange(e) {
    e.target.setAttribute("src", "images/index/debit-card.svg");
}

function cardImageRevert(e) {
    e.target.setAttribute("src", "images/index/credit-cards-payment.svg");
}

function saveImageChange(e) {
    e.target.setAttribute("src", "images/index/piggy-bank-color.svg");
}

function saveImageRevert(e) {
    e.target.setAttribute("src", "images/index/piggy-bank.svg");
}