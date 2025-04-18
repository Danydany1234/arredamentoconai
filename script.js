// Funzione per caricare l'immagine e arredare la stanza
document.getElementById("arredaButton").addEventListener("click", function() {
    const imageInput = document.getElementById("uploadImage");
    const imageFile = imageInput.files[0];

    if (!imageFile) {
        alert("Per favore, carica un'immagine della stanza.");
        return;
    }

    // Mostra il messaggio di caricamento
    document.getElementById("loading").style.display = "block";

    // Prepara l'immagine per l'API (ad esempio, caricarla su Replicate)
    const formData = new FormData();
    formData.append("image", imageFile);

    // Chiamata all'API per processare l'immagine
    fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${REPLICATE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            version: "la-versione-dell-API",  // Sostituisci con la versione corretta
            input: {
                image: formData
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        // Nascondi il messaggio di caricamento
        document.getElementById("loading").style.display = "none";

        // Mostra i risultati o l'immagine modificata
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `<img src="${data.result_url}" alt="Immagine arredamento AI">`;
    })
    .catch(error => {
        console.error('Errore:', error);
        document.getElementById("loading").style.display = "none";
        alert("Si è verificato un errore. Riprova.");
    });
