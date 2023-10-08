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

Solve the same exercise you got for the PHP task, but using the ASP .NET technology.
In addition to the specification for the PHP task, your application must implement user
authentication and ask users to authenticate themselves prior to actually using
the web application (based on an username and password saved in the database).
