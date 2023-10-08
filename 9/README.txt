All web pages should be accessible only if the user logs in using a username and a password
(create a session each time a user logs in, and destroy the session when the user logs out).

Keep the user experience in mind when implementing the solution:
    add different validation logic for input fields
    do not force the user to input an ID for an item if they want to delete/edit/insert it;
        this should happen automatically (e.g. the user clicks an item from a list, and
        a page/modal pre-populated with the data for that particular item is opened, where
        the user can edit it)
    add confirmation when the user deletes/cancels an operation for an item
    do the bare minimum CSS that at least aligns the various input fields

Solve the following exercise using the JSP/Servlet technology.
You may store state information in cookies/session objects.
Write a web application which allows two (human) players to play the battleship game:
each player has 4 ships deployed in a rectangular grid and they each try to sink the
oponent's ships by bombing them (guessing the position of the ship on the battle grid).
The game can't start unless two playes are connected. If a third player comes in,
they will be rejected from the game with an error message.
