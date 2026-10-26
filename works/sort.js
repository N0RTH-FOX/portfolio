import { cardsJson, cardsLoadEnd } from "./card-edit.js";

let ascending = true;
let item = [];
const tagFilters = {
    fanmade: true,
    web: true,
    program: true,
    original: true,
    game: true,
    vrc: true,
    b3d: true,
    haihu: true
}
let tags = ["fanmade", "web", "program", "original", "game", "vrc", "b3d", "haihu"]
document.addEventListener("cards-loaded", sort);

document.getElementById("show-fanmade").addEventListener("click", () => filterRemove("fanmade"));
document.getElementById("show-web").addEventListener("click", () => filterRemove("web"));
document.getElementById("show-program").addEventListener("click", () => filterRemove("program"));
document.getElementById("show-original").addEventListener("click", () => filterRemove("original"));
document.getElementById("show-game").addEventListener("click", () => filterRemove("game"));
document.getElementById("show-vrc").addEventListener("click", () => filterRemove("vrc"));
document.getElementById("show-b3d").addEventListener("click", () => filterRemove("b3d"));
document.getElementById("show-haihu").addEventListener("click", () => filterRemove("haihu"));

document.getElementById("hide-fanmade").addEventListener("click", () => filterAdd("fanmade"));
document.getElementById("hide-web").addEventListener("click", () => filterAdd("web"));
document.getElementById("hide-program").addEventListener("click", () => filterAdd("program"));
document.getElementById("hide-original").addEventListener("click", () => filterAdd("original"));
document.getElementById("hide-game").addEventListener("click", () => filterAdd("game"));
document.getElementById("hide-vrc").addEventListener("click", () => filterAdd("vrc"));
document.getElementById("hide-b3d").addEventListener("click", () => filterAdd("b3d"));
document.getElementById("hide-haihu").addEventListener("click", () => filterAdd("haihu"));

function sortButton() {
    cardsLoadEnd && sort();
}
function filterRemove(tagname) {
    tagFilters[tagname] = false;
    sort();
}
function filterAdd(tagname) {
    tagFilters[tagname] = true;
    console.log(tags)
    sort();
}
function sort() {
    for (let i = 0; i < tags.length; i++) {
        if(tagFilters[tags[i]]){
            document.getElementById("show-"+tags[i]).style.display = "block";
            document.getElementById("hide-"+tags[i]).style.display = "none";
        } else {
            document.getElementById("show-"+tags[i]).style.display = "none";
            document.getElementById("hide-"+tags[i]).style.display = "block";
        }
    }
}
