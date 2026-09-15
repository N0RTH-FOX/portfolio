import { cardsJson, cardsLoadEnd } from "./card-edit.js";

let ascending = true;
let item = [];
const cards = document.getElementById("cards");
document.getElementById("sort-button").addEventListener("click", sortButton);
function sortButton(){
    cardsLoadEnd && sort();
}

function sort(){
    ascending = !ascending;
    for (let i = 0; i < cards.children.length; i++) {
        item[i] = cards.children[i]
    }
    item.reverse();
    cards.innerHTML = "";
    for (let j = 0; j < item.length; j++) {
        cards.appendChild(item[j]);
    }
}