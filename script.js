let cursor = {x: 0, y: 0};
let actionButtonsActivated = false;

function animateBtn(btn, x, y, xtravel, ytravel)
// o objeto do botao, o X inicial, o Y inicial, quanto deve andar para x e y em pixels
{
    btn.style.left = x + "px";
    btn.style.top = y + "px";

    document.body.appendChild(btn);

    void btn.offsetWidth;

    if (x+xtravel >= 0 && x+xtravel <= window.innerWidth) x += xtravel;
    else x = 0;

    if (y+ytravel >= 0 && y+ytravel <= window.innerHeight) y += ytravel;
    else y = 0;

    btn.style.opacity = 1;
    btn.style.left = x + "px";
    btn.style.top = y + "px";
}

function showActionButtons(x, y)
{
    const observar = document.createElement('button');

    observar.className = 'ui-layer';
    observar.id = 'btn-observar';
    observar.innerText = 'Observar arredores';

    animateBtn(observar, x-100, y, 0, -60);
}

function removeActionButtons() {
    const observar = document.getElementById('btn-observar');
    observar.remove();
    actionButtonsActivated = false;
}

// esse evento tem controle sobre todos os cliques na janela de jogo
document.addEventListener("click", function(event)
{
    cursor.x = event.clientX;
    cursor.y = event.clientY;

    console.log("clicou nas coordenadas ("+cursor.x+", "+cursor.y+")")

    // checando se o alvo foi o mapa
    const zIndex = window.getComputedStyle(event.target).getPropertyValue('z-index');
    if (zIndex != 0 && zIndex != 1 && zIndex != 2 && !actionButtonsActivated)
    {
        showActionButtons(cursor.x, cursor.y);
        event.stopPropagation();
        actionButtonsActivated = true;
    }
    
    else if (actionButtonsActivated && zIndex != 1) removeActionButtons();
});