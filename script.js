const fileInput = document.getElementById('resumeUpload');
const file = fileInput.files[0];

const formData = new FormData();
formData.append('resume', file);

fetch('http://localhost:5000/upload', {
  method: 'POST',
  body: formData
})
.then(responce => responce.json())
.then(data => {
  console.log('Responce from server: ', data);
})
.catch(error => {
  console.error('Error: ', error);
});