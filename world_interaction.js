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
    const virAqui = document.createElement('button');
    const acampar = document.createElement('button');

    observar.className = 'ui-layer';
    observar.id = 'btn-observar';
    observar.innerText = 'Observar arredores';

    virAqui.className = 'ui-layer';
    virAqui.id = 'btn-viraqui';
    virAqui.innerText = 'Vir até aqui';

    acampar.className = 'ui-layer';
    acampar.id = 'btn-acampar';
    acampar.innerText = 'Montar acampamento';

    animateBtn(observar, x-100, y, 0, -60);
    animateBtn(virAqui, x-90, y, -90, 0);
    animateBtn(acampar, x-60, y, 120, 0)
}

function removeActionButtons() {
    const observar = document.getElementById('btn-observar');
    const virAqui = document.getElementById('btn-viraqui');
    const acampar = document.getElementById('btn-acampar');

    observar.remove();
    virAqui.remove();
    acampar.remove();

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

// esse evento tem controle sobre todas as teclas pressionadass
document.addEventListener('keydown', function(event)
{
    const key = event.key;
    console.log('pressionou', key);

    if (key == 'Escape')
    {
        if (actionButtonsActivated) removeActionButtons();
    }
});