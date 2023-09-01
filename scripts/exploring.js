import { Map } from './Map.js';

// win: a janela geral do app; window: as mini janelas dentro do jogo
let win = nw.Window.get();
let cursor = {x: 0, y: 0};
let actionButtonsActivated = false;
let isWindowOpen = false;
let windowMode = 'null';
const WINDOWSIZE = {w: 700, h: 500};

// party-layer da direita pra esquerda
const playerCard = document.getElementById('player-pic');
const partyMemberCard1 = document.getElementById('companion1');
const partyMemberCard2 = document.getElementById('companion2');
const partyMemberCard3 = document.getElementById('companion3');

// botões de lower-toolbar
const btnInventario = document.getElementById('btn-inventario');
const btnCaderno = document.getElementById('btn-caderno');
const btnMapa = document.getElementById('btn-mapa');

win.maximize();

let map = new Map(document.getElementById('map'), 30);
map.draw(win.width, win.height);

function animateElement(obj, x, y, xtravel=0, ytravel=0, rel='left')
// o objeto, o X inicial, o Y inicial
// quanto deve deslocar para x e y em pixels, o lado relativo
{
    obj.style.opacity = 0;
    obj.style.transition = 'all 0.3s ease-in-out';

    obj.style.left = x + "px";
    obj.style.top = y + "px";

    document.body.appendChild(obj);

    void obj.offsetWidth;
    obj.style.opacity = 1;

    if (rel=='right') x -= xtravel;
    else {
        if (x+xtravel > 0) x += xtravel;
        else x = 0;
    }

    if (y+ytravel > 0 && y+ytravel <= win.height) y += ytravel;
    else y = 0;

    obj.style.left = x + "px";
    
    obj.style.top = y + "px";
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

    animateElement(observar, x-100, y-30, 0, -30);
    animateElement(virAqui, x-150, y, -40, 0);
    animateElement(acampar, x, y, 60, 0);

    observar.onclick = () => {
        removeActionButtons();
        // código de observar arredores
    }

    virAqui.onclick = () => {
        removeActionButtons();
        // o código de ir a algum lugar
    }

    acampar.onclick = () => {
        removeActionButtons();
        // codigo de acampar
    }

    actionButtonsActivated = true;
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

function openWindow(kind, x=0, y=win.height,
                    xtravel=(win.width-WINDOWSIZE.w)/2,
                    ytravel=-(win.height/2)-300,
                    rel='left')
{
    let ui_window = document.createElement('div');
    ui_window.className = 'ui-layer';
    ui_window.id = 'ui-window';

    let upperbar = document.createElement('div');
    upperbar.id = 'window-upper-bar';
    upperbar.className = 'ui-layer';

    let windowTitle = document.createElement('div');
    let closebutton = document.createElement('button');
    closebutton.id = 'window-close-button';
    closebutton.className = 'ui-layer';

    windowMode = kind;

    // TO-DO estilizar cada tipo de janela
    if (kind == 'mapa')
    {
        windowTitle.innerText = 'mapa';
    }

    else if (kind == 'inventario')
    {
        windowTitle.innerText = 'inventário';
    }

    else if (kind == 'menu')
    {
        windowTitle.innerText = 'menu';
    }

    animateElement(ui_window, x, y, xtravel, ytravel, rel);
    ui_window.appendChild(upperbar);
    upperbar.appendChild(windowTitle);
    upperbar.appendChild(closebutton);

    closebutton.onclick = () => {closeWindow()};

    isWindowOpen = true;
    console.log('abriu '+kind);
}

function closeWindow(x=0, y=win.height)
{
    let activeWindow = document.getElementById('ui-window');

    void activeWindow.offsetWidth;
    activeWindow.style.opacity = 0;
    activeWindow.style.left = x + "px";
    activeWindow.style.top = y + "px";

    // esperar a animação finalizar pra só então deletar a janela
    setTimeout(function() {
        try
        {
            activeWindow.remove();
            activeWindow = null;
            isWindowOpen = false;
            console.log('janela fechada');
        }
        catch (TypeError) {
            // quando apertamos esc repetidamente isso acontece, nada demais
            console.log('oopsie: activeWindow é nulo');
        }
        
    }, 300);
}

function openPartyWindow()
{
    if (!isWindowOpen) openWindow('partymember', win.width, win.height,
                                (win.width+WINDOWSIZE.w)/2, -(win.height/2)-300,'right');
}

//   ------------- GAME LOOP DO ESTADO "EXPLORANDO" -------------
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
    }
    
    else if (actionButtonsActivated && zIndex != 1) removeActionButtons();

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
        else if (isWindowOpen)
        {
            if (windowMode == 'partymember')
                closeWindow(win.width);
            else closeWindow();
        }
        else openWindow('menu');
    }
    else if (key == 'm')
    {
        if (!isWindowOpen) openWindow('mapa');
    }
    else if (key == 'i')
    {
        if (!isWindowOpen) openWindow('inventario');
    }
});

// event listeners para os perfis da party
playerCard.addEventListener('click', function()
{
    openPartyWindow();
});

btnInventario.addEventListener('click', function()
{
    if (!isWindowOpen) openWindow('inventario');
})

btnMapa.addEventListener('click', function()
{
    if (!isWindowOpen) openWindow('mapa');
})