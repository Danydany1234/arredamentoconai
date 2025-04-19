document.getElementById("arredaButton").addEventListener("click", async function () {
    const fileInput = document.getElementById("uploadImage");
    const image = fileInput.files[0];

    if (!image) {
        alert("Carica prima un'immagine.");
        return;
    }

    document.getElementById("loading").style.display = "block";

    // Carica l'immagine su un servizio di hosting temporaneo
    const formData = new FormData();
    formData.append("file", image);

    const uploadRes = await fetch("https://api.imgbb.com/1/upload?key=r8_duSHH3qhMAhZhBuw2ujFa51KuaVS1yd1BpJQV, {
        method: "POST",
        body: formData
    });

    const uploadData = await uploadRes.json();
    const imageUrl = uploadData.data.url;

    // Ora passa l'immagine a Replicate
    const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
            "Authorization": `Token ${REPLICATE_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            version: "YOUR_MODEL_VERSION", // <-- sostituisci con la versione del modello
            input: {
                image: imageUrl
            }
        })
    });

    const result = await response.json();
    document.getElementById("loading").style.display = "none";

    if (result?.prediction?.output) {
        document.getElementById("result").innerHTML = `<img src="${result.prediction.output}" alt="Risultato AI">`;
    } else {
        alert("Errore nell'elaborazione dell'immagine.");
        console.error(result);
    }
});
