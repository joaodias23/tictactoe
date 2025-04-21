const startGame = document.getElementById("start-button");

startGame.onclick = function () {
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");

    if (!player1Input.value.trim() || !player2Input.value.trim()) {
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "#1e1e1e";
        popup.style.padding = "40px";
        popup.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.8)";
        popup.style.borderRadius = "12px";
        popup.style.textAlign = "center";
        popup.style.zIndex = "1000";
        popup.style.width = "400px";
        popup.style.fontFamily = "'Arial', sans-serif";
        popup.style.fontSize = "18px";
        popup.style.color = "#f5f5f5";

        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        overlay.style.backdropFilter = "blur(5px)";
        overlay.style.zIndex = "999";
        document.body.appendChild(overlay);

        const message = document.createElement("p");
        message.textContent = "Both players must enter their names";
        message.style.marginBottom = "30px";
        message.style.color = "#f5f5f5";
        message.style.fontWeight = "bold";
        popup.appendChild(message);

        const closeButton = document.createElement("button");
        closeButton.textContent = "Dismiss";
        closeButton.style.padding = "12px 20px";
        closeButton.style.border = "none";
        closeButton.style.borderRadius = "8px";
        closeButton.style.backgroundColor = "#333";
        closeButton.style.color = "#f5f5f5";
        closeButton.style.cursor = "pointer";
        closeButton.style.fontSize = "16px";
        closeButton.style.fontWeight = "bold";
        closeButton.onclick = function () {
            document.body.removeChild(popup);
            document.body.removeChild(overlay);
        };
        popup.appendChild(closeButton);

        document.body.appendChild(popup);
        return;
    }

    const player1 = { name: player1Input.value.trim(), symbol: "X", score: 0 };
    const player2 = { name: player2Input.value.trim(), symbol: "O", score: 0 };

    const board = Array(9).fill(null);
    let currentPlayer = player1;
    let gameOver = false;

    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";

    board.forEach((_, index) => {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.style.height = "100px";
        cell.style.width = "100px";
        cell.style.backgroundColor = "#ffffff";
        cell.style.border = "2px solid #9198e5";
        cell.style.borderRadius = "10px";
        cell.style.fontSize = "24px";
        cell.style.fontWeight = "bold";
        cell.style.color = "#121212";
        cell.style.cursor = "pointer";
        cell.style.transition = "transform 0.2s, background-color 0.2s";

        cell.onclick = function () {
            if (gameOver || board[index]) return;

            board[index] = currentPlayer.symbol;
            cell.textContent = currentPlayer.symbol;

            if (checkWinner(board, currentPlayer.symbol)) {
                gameOver = true;
                showWinnerPopup(`${currentPlayer.name} wins!`);
                return;
            }

            if (board.every(cell => cell !== null)) {
                gameOver = true;
                showWinnerPopup("It's a draw!");
                return;
            }

            currentPlayer = currentPlayer === player1 ? player2 : player1;

            updateTurnMessage();
        };

        boardElement.appendChild(cell);
    });

    startGame.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    startGame.style.opacity = "0";
    startGame.style.transform = "translateY(-20px)";
    setTimeout(() => {
        startGame.style.display = "none";
        updateTurnMessage();
    }, 500);

    function updateTurnMessage() {
        let turnMessage = document.getElementById("turn-message");
        if (!turnMessage) {
            turnMessage = document.createElement("div");
            turnMessage.id = "turn-message";
            turnMessage.style.textAlign = "center";
            turnMessage.style.fontSize = "24px";
            turnMessage.style.fontWeight = "bold";
            turnMessage.style.color = "#f5f5f5";
            turnMessage.style.marginTop = "20px";
            turnMessage.style.padding = "10px";
            turnMessage.style.width = "200px";
            turnMessage.style.marginLeft = "34%";
            turnMessage.style.borderRadius = "8px";
            turnMessage.style.background = "linear-gradient(135deg, #2c3e50, #34495e)";
            turnMessage.style.boxShadow = "0 2px 8px rgba(0, 0, 255, 0.5)";
            turnMessage.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.7)";
            boardElement.parentElement.appendChild(turnMessage);
        }
        turnMessage.textContent = `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
    }

    function checkWinner(board, symbol) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations.some(combination =>
            combination.every(index => board[index] === symbol)
        );
    }

    function showWinnerPopup(message) {
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "#1e1e1e";
        popup.style.padding = "40px";
        popup.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.8)";
        popup.style.borderRadius = "12px";
        popup.style.textAlign = "center";
        popup.style.zIndex = "1000";
        popup.style.width = "400px";
        popup.style.fontFamily = "'Arial', sans-serif";
        popup.style.fontSize = "18px";
        popup.style.color = "#f5f5f5";

        const messageElement = document.createElement("p");
        messageElement.textContent = message;
        messageElement.style.marginBottom = "30px";
        messageElement.style.color = "#f5f5f5";
        messageElement.style.fontWeight = "bold";
        popup.appendChild(messageElement);

        const newGameButton = document.createElement("button");
        newGameButton.textContent = "New Game";
        newGameButton.style.padding = "12px 20px";
        newGameButton.style.border = "none";
        newGameButton.style.borderRadius = "8px";
        newGameButton.style.backgroundColor = "#4caf50";
        newGameButton.style.color = "#f5f5f5";
        newGameButton.style.cursor = "pointer";
        newGameButton.style.fontSize = "16px";
        newGameButton.style.fontWeight = "bold";
        newGameButton.onclick = function () {
            document.body.removeChild(popup);
            resetGame();
        };
        popup.appendChild(newGameButton);

        document.body.appendChild(popup);
    }

    function resetGame() {
        boardElement.innerHTML = "";
        board.fill(null);
        currentPlayer = player1;
        gameOver = false;
        updateTurnMessage();

        board.forEach((_, index) => {
            const cell = document.createElement("button");
            cell.classList.add("cell");
            cell.dataset.index = index;
            cell.style.height = "100px";
            cell.style.width = "100px";
            cell.style.backgroundColor = "#ffffff";
            cell.style.border = "2px solid #9198e5";
            cell.style.borderRadius = "10px";
            cell.style.fontSize = "24px";
            cell.style.fontWeight = "bold";
            cell.style.color = "#121212";
            cell.style.cursor = "pointer";
            cell.style.transition = "transform 0.2s, background-color 0.2s";

            cell.onclick = function () {
                if (gameOver || board[index]) return;

                board[index] = currentPlayer.symbol;
                cell.textContent = currentPlayer.symbol;

                if (checkWinner(board, currentPlayer.symbol)) {
                    gameOver = true;
                    showWinnerPopup(`${currentPlayer.name} wins!`);
                    return;
                }

                if (board.every(cell => cell !== null)) {
                    gameOver = true;
                    showWinnerPopup("It's a draw!");
                    return;
                }

                currentPlayer = currentPlayer === player1 ? player2 : player1;

                updateTurnMessage();
            };

            boardElement.appendChild(cell);
        });
    }
};