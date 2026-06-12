let cards = Array.from(document.getElementById("gameboard").children);

let firstcard = null;
let secondcard = null;
let some = false;

cards.forEach(card => {
    card.addEventListener("click", flipcard);
});

function flipcard(event) {
    if (some) return;

    const clickedcard = event.target;

    if (clickedcard === firstcard) return;

    showanimal(clickedcard);

    if (!firstcard) {
        firstcard = clickedcard;
        return;
    }

    secondcard = clickedcard;

    checkmatch();
}

function showanimal(card) {
    console.log(card.dataset.animal)
    if (card.dataset.animal === "dog") {
        card.textContent = "🐶";
    }
    else if(card.dataset.animal === "cat")
    {
        card.textContent = "🦊";
    }
}
function checkmatch() {
    let ismatch = firstcard.dataset.animal === secondcard.dataset.animal;
    if (ismatch) {
        firstcard.disabled = true;
        secondcard.disabled = true;
        resetturn();
    }
    else {
        some = true;
        setTimeout(() => {
            firstcard.textContent = "?";
            secondcard.textContent = "?";

            resetturn();
        }, 1000
        );

    }
}
function resetturn() {
     firstcard = null;
     secondcard = null;
     some = false;
}