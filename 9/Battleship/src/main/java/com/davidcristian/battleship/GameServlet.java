
package com.davidcristian.battleship;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/game")
public class GameServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = (String) request.getSession().getAttribute("username");
        Game game = (Game) getServletContext().getAttribute("game");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        if (game == null || !(game.getPlayer1().equals(username) || game.getPlayer2().equals(username))) {
            out.print("{\"result\":\"You are not in a game!\"}");
            out.close();
            return;
        }

        String enemyName = username.equals(game.getPlayer1()) ? game.getPlayer2() : game.getPlayer1();
        Game.Cell[][] playerGrid = username.equals(game.getPlayer1()) ? game.getPlayer1Grid() : game.getPlayer2Grid();
        Game.Cell[][] enemyGrid = username.equals(game.getPlayer1()) ? game.getPlayer2Grid() : game.getPlayer1Grid();

        // check if there are any ships left in the player grid
        boolean shipsLeft = checkShipsLeft(playerGrid);

        out.print("{");
        if (!shipsLeft) {
            getServletContext().setAttribute("game", null);
            out.print("\"result\":\"loss\",");
        } else {
            out.print("\"enemy\":\"" + enemyName + "\",");
        }

        out.print("\"playerGrid\":" + gridToJson(playerGrid, true) + ",");
        out.print("\"enemyGrid\":" + gridToJson(enemyGrid, false));
        out.print("}");

        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = (String) request.getSession().getAttribute("username");
        Game game = (Game) getServletContext().getAttribute("game");
        String action = request.getParameter("action");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        switch (action) {
            case "start":
                handleStartAction(username, game, out);
                break;
            case "move":
                try {
                    handleMoveAction(request, username, game, out);
                } catch (IndexOutOfBoundsException e) {
                    out.print("{\"result\":\"Invalid coordinates!\"}");
                    out.close();
                }
                break;
            default:
                out.print("{\"result\":\"Unknown action!\"}");
                out.close();
        }
    }

    private void handleStartAction(String username, Game game, PrintWriter out) {
        if (username == null) {
            out.print("{\"result\":\"Session expired, please log in again.\"}");
            out.close();
            return;
        } else if (game == null) {
            game = new Game(username);
            getServletContext().setAttribute("game", game);
        } else if (game.getPlayer2() == null) {
            game.setPlayer2(username);
        } else {
            out.print("{\"result\":\"The game is already full!\"}");
            out.close();
            return;
        }

        out.print("{");
        out.print("\"playerGrid\":" + gridToJson(username.equals(game.getPlayer1()) ? game.getPlayer1Grid() : game.getPlayer2Grid(), true) + ",");
        out.print("\"enemyGrid\":" + gridToJson(username.equals(game.getPlayer1()) ? game.getPlayer2Grid() : game.getPlayer1Grid(), false));
        out.print("}");
        out.close();
    }

    private void handleMoveAction(HttpServletRequest request, String username, Game game, PrintWriter out) throws IndexOutOfBoundsException {
        if (game == null || game.getCurrentPlayer() == null || !game.getCurrentPlayer().equals(username)) {
            out.print("{\"result\":\"It's not your turn!\"}");
            out.close();
            return;
        }

        if (game.getPlayer2() == null) {
            out.print("{\"result\":\"Waiting for another player to join...\"}");
            out.close();
            return;
        }

        int x = Integer.parseInt(request.getParameter("x"));
        int y = Integer.parseInt(request.getParameter("y"));
        Game.Cell[][] enemyGrid = username.equals(game.getPlayer1()) ? game.getPlayer2Grid() : game.getPlayer1Grid();

        if (enemyGrid[x][y] == Game.Cell.SHIP) {
            enemyGrid[x][y] = Game.Cell.HIT;

            // Check if there are any ships left
            boolean shipsLeft = checkShipsLeft(enemyGrid);

            if (!shipsLeft) {
                out.print("{");
                out.print("\"result\":\"win\",");
                out.print("\"enemyGrid\":" + gridToJson(enemyGrid, false));
                out.print("}");

                out.close();
                return;
            }

            out.print("{");
            out.print("\"result\":\"You hit a ship!\",");
            out.print("\"enemyGrid\":" + gridToJson(enemyGrid, false));
            out.print("}");
        } else if (enemyGrid[x][y] == Game.Cell.HIT || enemyGrid[x][y] == Game.Cell.MISS) {
            out.print("{\"result\":\"You already attacked that tile!\"}");
            return;
        } else {
            enemyGrid[x][y] = Game.Cell.MISS;  // Assuming a miss is represented by an EMPTY state. Adjust as needed.
            out.print("{");
            out.print("\"result\":\"You missed!\",");
            out.print("\"enemyGrid\":" + gridToJson(enemyGrid, false));
            out.print("}");
        }

        game.setCurrentPlayer(username.equals(game.getPlayer1()) ? game.getPlayer2() : game.getPlayer1());
        out.close();
    }

    private boolean checkShipsLeft(Game.Cell[][] grid) {
        for (Game.Cell[] cellStates : grid) {
            for (Game.Cell cellState : cellStates) {
                if (cellState == Game.Cell.SHIP) {
                    return true;
                }
            }
        }

        return false;
    }

    private String gridToJson(Game.Cell[][] grid, boolean showShips) {
        StringBuilder json = new StringBuilder("[");
        for (Game.Cell[] cellStates : grid) {
            json.append("[");
            for (Game.Cell cellState : cellStates) {
                if (cellState == Game.Cell.SHIP && !showShips) {
                    json.append("\"hidden\",");
                } else {
                    json.append("\"").append(cellState.toString().toLowerCase()).append("\",");
                }
            }

            json.setLength(json.length() - 1);  // remove trailing comma
            json.append("],");
        }

        json.setLength(json.length() - 1);  // remove trailing comma
        json.append("]");

        return json.toString();
    }
}
