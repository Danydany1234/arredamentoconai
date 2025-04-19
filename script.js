const response = await fetch("/api/replicate/predictions", {
  method: "POST",
  headers: {
    "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    version: "db21e45c-76f7-44e2-b45c-8c1f788ebf3e", // Stable Diffusion v1.5
    input: { prompt: prompt }
  })
});
