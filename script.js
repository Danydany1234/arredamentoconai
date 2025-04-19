// script.js

import { API_KEY, REPLICATE_API_URL } from './config.js';

document.getElementById('generate-button').addEventListener('click', async () => {
    const description = document.getElementById('room-description').value;
    if (!description) {
        alert('Per favore, inserisci una descrizione della stanza.');
        return;
    }

    try {
        const response = await fetch(REPLICATE_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                version:0.14.3.
                input: { prompt: description },
            }),
        });

        const data = await response.json();

        if (data && data.output) {
            const imageUrl = data.output[0];
            document.getElementById('generated-image').src = imageUrl;
        } else {
            alert('Errore nella generazione dell\'immagine.');
        }
    } catch (error) {
        console.error('Errore:', error);
        alert('Si è verificato un errore durante la generazione dell\'immagine.');
    }
});
