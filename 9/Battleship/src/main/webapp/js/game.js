"use strict";

async function startGame() {
  const response = await fetch("/battleship_war_exploded/game", {
    method: "POST",
    body: new URLSearchParams({ action: "start" }),
  });
  const data = await response.json();

  if (data.result) {
    alert(data.result);
    return;
  }

  if (data.playerGrid && data.enemyGrid) {
    updateGrids(data.playerGrid, data.enemyGrid);
    document.getElementById("greeting").style.display = "none";
    document.getElementById("game").style.display = "block";

    // start polling for updates
    pollUpdates(true);
  } else {
    console.error("Invalid response from the server:", data);
  }
}

function pollUpdates(firstPoll) {
  fetch("/battleship_war_exploded/game", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      updateGrids(data.playerGrid, data.enemyGrid);

      if (data.result && data.result === "loss") {
        alert("You lose!");
        location.reload();
      }

      if (firstPoll) {
        const enemy = data.enemy && data.enemy !== "null" ? data.enemy : "unknown";
        document.getElementById("enemy").innerHTML = `Enemy Grid (${enemy})`;
      }
    })
    .finally(() => {
      // poll again after a short delay
      setTimeout(() => {
        pollUpdates(false);
      }, 1000);
    });
}

function updateGrids(playerGrid, enemyGrid) {
  if (playerGrid) {
    document.getElementById("playerGrid").innerHTML = gridToHtml(playerGrid);
  }

  if (enemyGrid) {
    document.getElementById("enemyGrid").innerHTML = gridToHtml(
      enemyGrid,
      true
    );
  }
}

function gridToHtml(grid, isEnemy) {
  let html = "";
  for (let i = 0; i < grid.length; i++) {
    html += "<tr>";
    for (let j = 0; j < grid[i].length; j++) {
      html += '<td onclick="';
      if (isEnemy) html += `makeMove(${i},${j})`;
      html += `" class="${grid[i][j]}"></td>`;
    }
    html += "</tr>";
  }

  return html;
}

function makeMove(x, y) {
  fetch("game", {
    method: "POST",
    body: new URLSearchParams(`action=move&x=${x}&y=${y}`),
  })
    .then((response) => response.json())
    .then((data) => {
      updateGrids(data.playerGrid, data.enemyGrid);

      if (data.result === "win") {
        alert("You win!");
        location.reload();
        return;
      }

      alert(data.result);
    });
}

function onPageLoaded() {
  const notLogged = document.getElementById("username").innerText === "null";
  if (notLogged) location.href = "index.jsp";
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onPageLoaded);
} else {
  onPageLoaded();
}
