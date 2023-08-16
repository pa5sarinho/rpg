let map = [
    [1, 5, 0, 0, 0, 4, 2, 0, 5, 6, 3, 5, 7, 0],
    [9, 3, 0, 1, 1, 0, 0, 0, 3, 0, 0, 2, 4, 4],
    [3, 4, 6, 0, 0, 3, 0, 1, 1, 2, 6, 6, 6, 3],
    [1, 5, 0, 0, 0, 4, 2, 0, 5, 6, 3, 5, 7, 0],
    [9, 3, 0, 1, 1, 0, 0, 0, 3, 0, 0, 2, 4, 4],
    [3, 4, 6, 0, 0, 3, 0, 1, 1, 2, 6, 6, 6, 3],
    [1, 5, 0, 0, 0, 4, 2, 0, 5, 6, 3, 5, 7, 0],
    [9, 3, 0, 1, 1, 0, 0, 0, 3, 0, 0, 2, 4, 4],
    [3, 4, 6, 0, 0, 3, 0, 1, 1, 2, 6, 6, 6, 3],
    [1, 5, 0, 0, 0, 4, 2, 0, 5, 6, 3, 5, 7, 0],
    [9, 3, 0, 1, 1, 0, 0, 0, 3, 0, 0, 2, 4, 4],
    [3, 4, 6, 0, 0, 3, 0, 1, 1, 2, 6, 6, 6, 3],
    [1, 5, 0, 0, 0, 4, 2, 0, 5, 6, 3, 5, 7, 0],
    [9, 3, 0, 1, 1, 0, 0, 0, 3, 0, 0, 2, 4, 4],
    [3, 4, 6, 0, 0, 3, 0, 1, 1, 2, 6, 6, 6, 3]
];

const gridSize = 50;
const mapobj = document.getElementById("map");
let grid_Xaxis = Math.ceil(window.innerWidth/gridSize);
let grid_Yaxis = Math.ceil(window.innerHeight/gridSize);

// esse loop renderiza apenas a área visível na tela
for (let y_index = 0; y_index < grid_Yaxis; y_index++)
{
    const grid_row = document.createElement('div');
    grid_row.className = 'grid-row';
    
    for (let x_index = 0; x_index < grid_Xaxis; x_index++)
    {
        const grid = document.createElement('div');
        grid.className = 'grid-item';
        grid.id = `(${x_index}, ${y_index})`;
        //grid.textContent = map[y_index][x_index];
        grid_row.appendChild(grid);
    }
    mapobj.appendChild(grid_row);
}