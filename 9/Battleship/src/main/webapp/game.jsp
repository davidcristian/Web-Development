<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <title>Battleship</title>
    <link rel="stylesheet" type="text/css" href="css/style.css" />
  </head>

  <body>
    <header id="greeting">
      <h1>Welcome, <span id="username"><%= session.getAttribute("username") %></span>!</h1>

      <button onclick="startGame()">Start Game</button>
      <input type="button" onclick="location.href='logout';" value="Log out" />
    </header>

    <main id="game">
      <div class="board">
        <h2 id="enemy">Opponent Grid (waiting)</h2>
        <table id="enemyGrid"></table>
      </div>

      <div class="board">
        <h2>Your Grid (<%= session.getAttribute("username") %>)</h2>
        <table id="playerGrid"></table>
      </div>
    </main>

    <script type="text/javascript" src="js/game.js"></script>
  </body>
</html>
