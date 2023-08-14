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

const mapobj = document.getElementById("map");

map.forEach(row => {
    const grid_row = document.createElement('div');
    grid_row.classList.add('grid-row');

    row.forEach(gridItem => {
        const grid = document.createElement('div');
        grid.classList.add('grid-item');
        grid.textContent = gridItem;
        grid_row.appendChild(grid);
    });

    mapobj.appendChild(grid_row);
});