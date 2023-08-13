let cursor = {x: 0, y: 0};

document.addEventListener("click", function(event){
    cursor.x = event.clientX;
    cursor.y = event.clientY;

    console.log("clicou nas coordenadas ("+cursor.x+", "+cursor.y+")")

    // checando se a camada pertence ao mapa (-1)
    const zIndex = window.getComputedStyle(event.target).getPropertyValue('z-index');
    if (zIndex == '-1') {
        console.log('map targeted');
    }
    console.log(zIndex);
});