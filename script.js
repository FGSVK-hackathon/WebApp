const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      volumeSlider = document.querySelector(".volume-slider input"),
      keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    audio = new Audio(`tunes/a.wav`);

let frequency = 0;
let frequencies = []; // Nový zoznam na ukladanie frekvencií

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play();

    switch (key) {
        case "a": frequency = 262; break;
        case "w": frequency = 277; break;
        case "s": frequency = 293; break;
        case "e": frequency = 311; break;
        case "d": frequency = 329; break;
        case "f": frequency = 349; break;
        case "t": frequency = 370; break;
        case "g": frequency = 392; break;
        case "y": frequency = 415; break;
        case "h": frequency = 440; break;
        case "u": frequency = 466; break;
        case "j": frequency = 493; break;
        case "k": frequency = 523; break;
        case "o": frequency = 554; break;
        case "l": frequency = 587; break;
        case "p": frequency = 622; break;
        case ";": frequency = 659; break;
    }

    console.log(`Frequency: ${frequency}, 250 milliseconds.`);
    frequencies.push(frequency);

    if (frequencies.length === 32) {
        console.log(`${frequencies}`);
        console.log(`Sending frequencies to the server.`);

        const url = `http://10.0.3.113:8000/piano/${frequencies.join(',')}`;

        fetch(url, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        frequencies = []; // Clear frequencies after sending
    }

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");

    const startTime = performance.now();
    const endTime = () => {
        const endTime = performance.now();
        clickedKey.classList.remove("active");
    };
    setTimeout(endTime, 250);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);

    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    if(allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);