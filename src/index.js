import { Buffer } from 'buffer';
import { Client } from "@gradio/client";

const photoInput = document.getElementById('photo');
const submitButton = document.getElementById('submit');
const resultsDiv = document.getElementById('results');

async function handleSubmit() {
  if (!photoInput.files.length) {
    alert('Please select a file!');
    return;
  }

  const file = photoInput.files[0];
  const reader = new FileReader();

  reader.onload = async (event) => {
    const imageUrl = event.target.result;
    
    const response = await fetch(imageUrl);
    const exampleImage = await response.blob();

    const client = await Client.connect("majabig/hello-bears");
    const result = await client.predict("/predict", { 
      img: exampleImage, 
    });

    const label = result.data[0].label;
    resultsDiv.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image" width="300"> <p>${label}</p>`;
  };

  reader.readAsDataURL(file);
}

submitButton.addEventListener('click', handleSubmit);
