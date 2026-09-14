export let cardsLoadEnd = false;
export let cardsJson = "";

async function cardsload() {
    const cardsload = await (await fetch('cards.json')).json();
    return cardsload;
}
cardsload().then(json => {
    cardsLoadEnd = true;
    cardsJson = json;
    const parent = document.getElementById("cards")
    const cards = json.cards;
    for (let i = 0; i < cards.length; i++) {
        const div = document.createElement("div");
        div.classList.add("card");
        div.id = "card-"+i.toString();
        parent.appendChild(div);

        const tags = document.createElement("div");
        tags.classList.add("card-tags");
        div.appendChild(tags);
        for (let j = 0; j < (cards[i].tags || []).length; j++) {
            const tag = document.createElement("a");
            tag.href = "";
            tag.innerHTML = cards[i].tags[j];
            tag.classList.add(cards[i].tags[j], "card-tag");
            tags.appendChild(tag)
        }
        
        const headline = document.createElement("div");
        headline.classList.add("card-headline");
        div.appendChild(headline);

        const title = document.createElement("a");
        title.href = i.toString();
        title.innerHTML = cards[i].title;
        title.classList.add("card-title");
        headline.appendChild(title);

        const icon = document.createElement("img");
        icon.classList.add("card-icon")
        icon.src = i.toString() + "/icon.png"
        headline.appendChild(icon);
        
        const time = document.createElement("time");
        time.datetime = cards[i].year.toString()+"/"+cards[i].month.toString();
        time.innerHTML = cards[i].year.toString()+"/"+cards[i].month.toString().padStart(2,"0");
        div.appendChild(time);
    }
})