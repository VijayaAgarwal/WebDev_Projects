const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
})

const getWordInfo = async(word) => {
    try {
        resultDiv.innerHTML = "Fetching Data....";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        resultDiv.innerHTML = `
    <h2><strong>Word : </strong>${data[0].word}</h2>
    <button type="button" onclick="playAudio()" id="pro">
    <span class="material-symbols-outlined">volume_up</span>
    </button>
    <strong>Pronunciation : </strong>${data[0].phonetic===undefined? "Not found" : data[0].phonetic}`;

        for (let j = 0; j < data[0].meanings.length; j++) {
            resultDiv.innerHTML += `
          <p class="partOfSpeech">${data[0].meanings[j].partOfSpeech}</p>
          <p><strong>Meaning : </strong>${data[0].meanings[j].definitions[0].definition===undefined? "Not found" : data[0].meanings[j].definitions[0].definition}</p>
          <p><strong>Example : </strong>${data[0].meanings[j].definitions[0].example===undefined? "Not found" : data[0].meanings[j].definitions[0].example}</p>
           <p><strong>Antonyms : </strong></p>
    `;
            if (data[0].meanings[j].antonyms.length === 0) {
                resultDiv.innerHTML += `<span>Not Found</span>`;
            } else {
                for (let i = 0; i < data[0].meanings[j].antonyms.length; i++) {
                    resultDiv.innerHTML += `<li>${data[0].meanings[j].antonyms[i]}</li>`;
                }
            }
            //synonyms
            resultDiv.innerHTML += `<p><strong>Synonyms : </strong></p>`
            if (data[0].meanings[j].synonyms.length === 0) {
                resultDiv.innerHTML += `<span>Not Found</span>`;
            } else {
                for (let i = 0; i < data[0].meanings[j].synonyms.length; i++) {
                    resultDiv.innerHTML += `<li>${data[0].meanings[j].synonyms[i]}</li>`;
                }
            }
            resultDiv.innerHTML += `<hr>`
        }
        //Adding read more button

        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`
        console.log(data);

        globalThis.ct = 1;

        for (let i = 0; i < data[0].phonetics.length; i++) {
            data[0].phonetics[i].audio === "" ? globalThis.ct = 0 : globalThis.audio = new Audio(data[0].phonetics[i].audio);
        }

    } catch (error) {
        resultDiv.innerHTML = `<p>Sorry, the word could not be found.</p>`;
    }
}

function playAudio() {

    if (ct === 0 || globalThis.audio === "") {
        alert("no audio found");
    } else {
        audio.play();
    }

}