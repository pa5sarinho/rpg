let cursor = {x: 0, y: 0};
let isWindowOpen = false;
let actionButtonsActivated = false;
let windowMode = 'null';

function animateElement(obj, x, y, xtravel=0, ytravel=0, center=false)
// o objeto, o X inicial, o Y inicial, quanto deve andar para x e y em pixels
{
    obj.style.opacity = 0;
    obj.style.transition = 'all 0.4s ease-in-out';

    obj.style.left = x + "px";
    obj.style.top = y + "px";

    document.body.appendChild(obj);

    void obj.offsetWidth;
    obj.style.opacity = 1;

    if (center)
    {
        obj.style.justifyContent = 'center';
    }

    else {

        if (x+xtravel >= 0 && x+xtravel <= window.innerWidth) x += xtravel;
        else x = 0;

        if (y+ytravel >= 0 && y+ytravel <= window.innerHeight) y += ytravel;
        else y = 0;

        obj.style.left = x + "px";
        obj.style.top = y + "px";
    }
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

    animateElement(observar, x-100, y, 0, -60);
    animateElement(virAqui, x-100, y, -90, 0);
    animateElement(acampar, x-60, y, 120, 0)
}

function removeActionButtons()
{
    const observar = document.getElementById('btn-observar');
    const virAqui = document.getElementById('btn-viraqui');
    const acampar = document.getElementById('btn-acampar');

    observar.remove();
    virAqui.remove();
    acampar.remove();

    actionButtonsActivated = false;
}

function openWindow(kind)
{
    ui_window = document.createElement('div');
    ui_window.className = 'ui-layer';
    ui_window.id = 'ui-window';

    windowMode = kind;

    // TO-DO estilizar cada tipo de janela
    if (kind == 'map')
    {
        ui_window.innerText = 'this is the map';
    }

    else if (kind == 'inventario')
    {
        ui_window.innerText = 'inventário';
    }

    else if (kind == 'menu')
    {
        ui_window.innerText = 'menu';
    }

    ytravel = (-window.innerHeight/2);

    animateElement(ui_window, window.innerWidth/4, window.innerHeight, center=true);

    isWindowOpen = true;
}

function closeWindow()
{
    ui_window = document.getElementById('ui-window');
    ui_window.remove();
    isWindowOpen = false;
}

// esse evento tem controle sobre todos os cliques na janela de jogo
document.addEventListener("click", function(event)
{
    cursor.x = event.clientX;
    cursor.y = event.clientY;

    console.log("clicou nas coordenadas ("+cursor.x+", "+cursor.y+")")

    // checando se o alvo foi o mapa
    const zIndex = window.getComputedStyle(event.target).getPropertyValue('z-index');
    if (zIndex != 0 && zIndex != 1 && zIndex != 2 && !actionButtonsActivated && !isWindowOpen)
    {
        showActionButtons(cursor.x, cursor.y);
        event.stopPropagation();
        actionButtonsActivated = true;
    }
    
    else if (actionButtonsActivated && zIndex != 1) removeActionButtons();

    if (actionButtonsActivated)
    {
        btn_observar = document.getElementById('btn-observar');
        btn_viraqui = document.getElementById('btn-viraqui');
        btn_acampar = document.getElementById('btn-acampar');

        btn_observar.addEventListener('click', function(event)
        {
            removeActionButtons();
            // TO-DO codigo da ação de observar
        });

        btn_viraqui.addEventListener('click', function(event)
        {
            removeActionButtons();
            // TO-DO codigo de locomoção
        });

        btn_acampar.addEventListener('click', function(event)
        {
            removeActionButtons();
            // TO-DO codigo de montar acampamento
        });
    }

    if (isWindowOpen)
    {
        if (windowMode == 'menu')
        {
            // TO-DO pegar os botões do menu, adicionar eventos pra cada
            console.log('menu');
        }
        // TO-DO adicionar outros tipos de janela
    }
});

// esse evento tem controle sobre todas as teclas pressionadass
document.addEventListener('keydown', function(event)
{
    const key = event.key;
    console.log('pressionou', key);

    if (key == 'Escape')
    {
        if (actionButtonsActivated) removeActionButtons();
        else if (isWindowOpen) closeWindow();
        else openWindow('menu');
    }
    else if (key == 'm')
    {
        if(isWindowOpen) closeWindow();
        openWindow('map');
    }
    else if (key == 'i')
    {
        if (isWindowOpen) closeWindow();
        openWindow('inventario')
    }
});

