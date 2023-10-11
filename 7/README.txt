In this task you will have to develop a server-side web application in PHP.
The web application manipulates a MySql database with 1 to 3 tables
and implements the following base operations on the tables:
select, insert, delete, update. The web application must use AJAX for
getting data asynchronously from the web server and the web application
should contain at least 5 web pages (client-side html or server-side php).

Please make sure that you avoid sql-injection attacks when working with the database.

Keep the user experience in mind when implementing the solution:
    add different validation logic for input fields
    do not force the user to input an ID for an item if they want to delete/edit/insert it;
        this should happen automatically (e.g. the user clicks an item from a list, and
        a page/modal pre-populated with the data for that particular item is opened, where
        the user can edit it)
    add confirmation when the user deletes/cancels an operation for an item
    do the bare minimum CSS that at least aligns the various input fields

Write a web application for managing food recipes.
The application maintains various information about recipe in
the database (i.e. author, name, type, the actual recipe etc.)
The application implements: recipe browsing (use AJAX for retrieving
recipes of a specific type), adding, removing and updating a recipe.
Also, on the browsing page, the filter used for the previous browsing
action (i.e. recipe type), should be displayed (do this in javascript). 
