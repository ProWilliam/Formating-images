console.log('this Is js');

export function handleDragOver(event) {
  event.preventDefault();
  event.stopPropagation();
  event.dataTransfer.dropEffect = 'copy';
  event.target.classList.add('dragover');
}

export function handleDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  event.target.classList.remove('dragover');
  var files = event.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
      var file = files[i];
      if (file.type.startsWith('image/')) {
          var reader = new FileReader();
          reader.onload = function(e) {
              var img = document.createElement('img');
              img.src = e.target.result;
              document.getElementById('drop-area').appendChild(img);
          };
          reader.readAsDataURL(file);
      }
  }
}

var button = document.querySelector("myButton");

// Agrega un event listener para el evento 'click'
button.addEventListener("click", function() {
    // Llama a la función que deseas que se active cuando se hace clic en el botón
    miFuncion();
});


// Define la función que se activará cuando se haga clic en el botón
function miFuncion() {
  // Haz lo que quieras aquí
  console.log("Se ha hecho clic en el botón");
  alert("¡Se ha hecho clic en el botón!");
}