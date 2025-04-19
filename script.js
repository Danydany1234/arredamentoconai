const apiKey =279d9a7e23764faeafdf4c589992bb32; // Sostituisci con la tua chiave API di InteriorDecorator

// Funzione per caricare l'immagine e inviarla all'API per arredarla
function caricaEArreda() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        fetch('https://api.interiordecorator.ai/design', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.image_url) {
                // Visualizza l'immagine arredamento
                const imgElement = document.createElement('img');
                imgElement.src = data.image_url;
                document.getElementById('design-result').appendChild(imgElement);
            } else {
                alert('Errore nell\'arredare la stanza');
            }
        })
        .catch(error => {
            console.error('Errore:', error);
            alert('Si è verificato un errore, riprova.');
        });
    } else {
        alert('Per favore, carica un\'immagine della stanza.');
    }
}
