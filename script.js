async function getData(word) {
    try {
        const main = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`,
            {
                method: "GET",
            }
        );
        const data = await main.json();          
        const container = document.getElementById("container");
        let ele = data[0];
        let mainDiv = document.createElement("div");
        mainDiv.classList.add("contentOne");
        mainDiv.innerHTML =
            `
            <div class="mainDiv">
            <div>Searched word</div>
            <div>${ele.word}</div>
            <div>Text</div>
            <div>${ele.phonetics[0].text}</div>
            <audio src="${ele.phonetics[0].audio}" controls></audio>
            </div>
            `;
        container.append(mainDiv);
        const el = data[0].meanings;
        el.forEach((el) => {
            let anotherDiv = document.createElement("div");
            anotherDiv.classList.add("contentTwo");
            anotherDiv.innerHTML =
                `
                <div class="anotherDiv">
                <div>Part of Speech</div>
                <div>${el.partOfSpeech}</div>
                <div>Definition</div>
                <div>${el.definitions[0].definition}</div>
                <div>Example</div>
                <div>${el.definitions[0].example}</div>
                </div>
                `;
            container.append(anotherDiv);
        });
    } catch (err) {
        console.log(err);
        maindiv.innerText = err;
    }
}
function search() {
    const word = document.getElementById("word").value;
    if (word == "") {
        alert("Enter a word to Search");
    }
    else {
        getData(word);
        container.innerHTML = "";
    }
}
