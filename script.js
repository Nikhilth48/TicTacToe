const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const restartBtn = document.querySelector(".restart-btn");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => handleCellClick(cell));
});

restartBtn.addEventListener("click", restartGame);

function handleCellClick(cell) {
    const index = cell.getAttribute("data-index");

    if (gameBoard[index] !== "" || !isGameActive) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === "X" ? "#ff4e50" : "#33ccff";

    checkWinner();
    togglePlayer();
}

function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            statusText.textContent = `Player ${gameBoard[a]} Wins!`;
            highlightWinningCells([a, b, c]);
            isGameActive = false;
            return;
        }
    }

    if (!gameBoard.includes("")) {
        statusText.textContent = "It's a Draw!";
        isGameActive = false;
    }
}

function highlightWinningCells(cellsToHighlight) {
    cellsToHighlight.forEach(index => {
        cells[index].style.backgroundColor = "rgba(0, 255, 0, 0.5)";
        cells[index].style.color = "#fff";
    });
}

function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        cell.style.color = "#fff";
    });
    isGameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
}
