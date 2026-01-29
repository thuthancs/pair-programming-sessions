const rowInput = document.getElementById("rows");
const colInput = document.getElementById("columns");
const table = document.getElementById("table");
const btnEle = document.getElementById("submit-btn");

function generateTable() {
    const rowNum = parseInt(rowInput.value.trim());
    const colNum = parseInt(colInput.value.trim());
    
    // Validate inputs
    if (!rowNum || !colNum || rowNum <= 0 || colNum <= 0) {
        alert("Please enter valid positive numbers for rows and columns");
        return;
    }
    
    // Clear previous table
    table.innerHTML = "";
    
    // Create a 2D array to store cell values
    const grid = [];
    for (let r = 0; r < rowNum; r++) {
        grid[r] = [];
    }
    
    // Fill column by column (column-major order)
    let cellNumber = 1;
    for (let c = 0; c < colNum; c++) {
        for (let r = 0; r < rowNum; r++) {
            grid[r][c] = cellNumber;
            cellNumber++;
        }
    }
    
    // Generate cells in row-major order for display
    for (let r = 0; r < rowNum; r++) {
        for (let c = 0; c < colNum; c++) {
            const cell = document.createElement("div");
            cell.style.border = "1px solid black";
            cell.style.padding = "10px";
            cell.style.textAlign = "center";
            cell.textContent = grid[r][c];
            table.appendChild(cell);
        }
    }
    
    // Style the table as grid
    table.style.display = "grid";
    table.style.gridTemplateColumns = `repeat(${colNum}, 1fr)`;
    table.style.gap = "0";
}

btnEle.addEventListener("click", generateTable);