import { cardsJson, cardsLoadEnd } from "./card-edit.js";

let abc = true;
let item = [];
document.getElementById("sort-button").addEventListener("click", sortButton);
function sortButton(){
    cardsLoadEnd && sort()
}

function sort(){
    console.log("sort!")
}
