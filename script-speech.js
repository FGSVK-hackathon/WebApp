function speak() {
    let input = document.getElementById("text").value;
    // Create a SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(input);

    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; // Choose a specific voice

    // Speak the text
    speechSynthesis.speak(utterance);

    const url = `http://10.0.3.113:8000/tts/${input}`;

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
}

