async function cardsload() {
    const cardsload = await (await fetch('cards.json')).json();
    return cardsload;
}
cardsload().then(json => {
    const parent = document.getElementById("cards")
    const cards = json.cards;
    var elements = [];
    for (let i = 0; i < cards.length; i++) {
        div = document.createElement("div");
        div.classList.add("card");
        div.id = "card-"+i.toString();
        parent.appendChild(div);

        tags = document.createElement("div");
        tags.classList.add("card-tags");
        div.appendChild(tags);
        for (let j = 0; j < cards[i].tags.length; j++) {
            tag = document.createElement("a");
            tag.href = "";
            tag.textContent = cards[i].tags[j];
            tag.classList.add(cards[i].tags[j], "card-tag");
            tags.appendChild(tag)
        }
        
        title = document.createElement("a");
        title.href = i.toString();
        title.textContent = cards[i].title;
        title.classList.add("card-title");
        div.appendChild(title);
        
        time = document.createElement("time");
        time.datetime = cards[i].year.toString()+"/"+cards[i].month.toString();
        time.textContent = cards[i].year.toString()+"/"+cards[i].month.toString().padStart(2,"0");
        div.appendChild(time);
    }
})