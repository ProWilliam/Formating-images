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