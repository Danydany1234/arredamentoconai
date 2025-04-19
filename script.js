// script.js

import { API_KEY } from './config.js';

document.getElementById('generate-button').addEventListener('click', async () => {
    const description = document.getElementById('room-description').value;
    const imageInput = document.getElementById('room-image');
    const imageFile = imageInput.files[0];  // Prendi il file immagine selezionato

    if (!description) {
        alert('Per favore, inserisci una descrizione della stanza.');
        return;
    }

    // Crea una richiesta a Replicate per generare un'immagine basata sulla descrizione
    try {
        // Imposta i dati per la richiesta
        const response = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                version: "version_id_of_the_model",  // Cambia con la versione del modello che vuoi usare
                input: {
                    prompt: description,  // La descrizione della stanza
                    // Se vuoi usare immagini come input, aggiungi un altro parametro per l'immagine
                    // image: imageFile, // Modifica per l'uso dell'immagine se necessario
                }
            })
        });

        const data = await response.json();
        console.log(data); // Per visualizzare la risposta

        if (data && data.output) {
            const imageUrl = data.output[0]; // Ottieni il link all'immagine generata
            document.getElementById('generated-image').src = imageUrl;
        } else {
            alert('Errore nella generazione dell\'immagine.');
        }
    } catch (error) {
        console.error('Errore durante la generazione dell\'immagine:', error);
        alert('Si è verificato un errore durante la generazione dell\'immagine.');
    }
});
