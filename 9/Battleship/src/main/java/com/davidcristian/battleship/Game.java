
package com.davidcristian.battleship;

import java.util.Random;

public class Game {
    private static final int GRID_SIZE = 10;
    private static final int SHIPS = 4;

    public enum Cell {
        EMPTY, SHIP, HIT, MISS
    }

    private final Cell[][] player1Grid;
    private final Cell[][] player2Grid;

    private String player1;
    private String player2;
    private String currentPlayer;

    public Game(String player) {
        setPlayer1(player);
        setCurrentPlayer(player);

        this.player1Grid = new Cell[GRID_SIZE][GRID_SIZE];
        this.player2Grid = new Cell[GRID_SIZE][GRID_SIZE];

        // initialize grids to EMPTY state
        for (int i = 0; i < GRID_SIZE; i++) {
            for (int j = 0; j < GRID_SIZE; j++) {
                this.player1Grid[i][j] = Cell.EMPTY;
                this.player2Grid[i][j] = Cell.EMPTY;
            }
        }

        // place ships ensuring no overlap
        for (int i = 0; i < SHIPS; i++) {
            placeRandomShip(this.player1Grid);
            placeRandomShip(this.player2Grid);
        }
    }

    private void placeRandomShip(Cell[][] grid) {
        Random random = new Random();
        int x, y;

        do {
            x = random.nextInt(GRID_SIZE);
            y = random.nextInt(GRID_SIZE);
        } while (grid[x][y] == Cell.SHIP);

        grid[x][y] = Cell.SHIP;
    }

    public Cell[][] getPlayer1Grid() {
        return player1Grid;
    }

    public Cell[][] getPlayer2Grid() {
        return player2Grid;
    }

    public String getPlayer1() {
        return player1;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }

    public String getPlayer2() {
        return player2;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }

    public String getCurrentPlayer() {
        return currentPlayer;
    }

    public void setCurrentPlayer(String currentPlayer) {
        this.currentPlayer = currentPlayer;
    }
}
