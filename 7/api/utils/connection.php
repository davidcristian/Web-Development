<?php
function open_connection(): mysqli {
    $server = "127.0.0.1";
    $user = "root";
    $password = "";
    $database = "restaurant";

    $connection = mysqli_connect($server, $user, $password, $database);

    if (!$connection) die('Could not connect to DB');
    return $connection;
}

function close_connection(mysqli $connection) {
    $connection->close();
}
