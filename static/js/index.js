function handleDragOver(event) {
  event.preventDefault();
  event.stopPropagation();
}

function handleDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  
  const files = event.dataTransfer.files;

  for (var i = 0; i < files.length; i++) {
    var archivo = files[i];
    
    // Create a URL object for the dropped image.
    var urlImagen = URL.createObjectURL(archivo);
    
    // Create an image element.
    var img = document.createElement('img');

    img.onload = function() {
      const resolution = `Size: ${this.width} width | ${this.height} height`;
      insertResolution(resolution)
    };

    img.src = urlImagen;
    
    // Insert the image into the drop area.
    var dropArea = document.getElementById('drop-area');
    dropArea.innerHTML = ''; 
    dropArea.appendChild(img);
  }
}

function insertResolution(resolution) {
  // Insert resolution image.
  const elemetClase = document.querySelector('#drop-area');
  const elementContent = elemetClase.parentNode;
  const childrenElements = elementContent.children;

  if (childrenElements.length >= 4) {
    const newElement = document.createElement('div');

    newElement.classList.add('resolution')
    newElement.textContent = resolution;
    
    elementContent.insertBefore(newElement, childrenElements[2].nextSibling);
  } else {
    console.error("There are not enough child elements: ", childrenElements.length);
  }
} 

var button = document.getElementById("myButton");

button.addEventListener("click", function() {

  if(document.querySelector('#drop-area img')){
    animationLoadingImage();
    selectImage();
  }else {
    var alert = document.getElementById('alertDanger')
    alert.style.display = 'block';
  }
  
});


function selectImage() {
  const imgElement = document.querySelector('#drop-area img');
  const srcImage = imgElement.src;

  if (srcImage) {
    sendData(srcImage);
  } else {
    console.error("No image available.");
  }
}

async function sendData(file_image) {
  
  try {
    
    const fileImage = await transformImageToBinary(file_image);

    const formData = new FormData();

    formData.append('image', fileImage);

    const response = await fetch('/formatting_image', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Sucessful sended file image:', {response});
      
    } else {
      console.error('Error sended file image:', response.statusText);
    }
    
  } catch (error) {
    console.error('Error of send Image:', error);
  }
}

async function transformImageToBinary(file_image){
  
  const blob = await fetch(file_image)
    .then(response => response.blob());

  const fileImage = new File([blob], 'image.jpg', { type: 'image/jpeg' });

  return fileImage;
}

function animationLoadingImage() {
  var progressBar = document.getElementById('progress-bar');
  var dropAre = document.getElementById('drop-area');

  dropAre.style.display= "none";
  progressBar.style.display = 'block';
  progressBar.value = 0;
  progressBar.style.backgroundColor = 'red';

  progressBarUpDate(progressBar);
}

function progressBarUpDate(progressBar){
 
  setTimeout(() => {
    progressBar.value += 20;
    console.log(progressBar.value);

    if (progressBar.value >= 100) {
      progressBar.style.display = 'none';
    }else if (progressBar.value <= 100){
      progressBarUpDate(progressBar)
    }

  }, 1000);
}



