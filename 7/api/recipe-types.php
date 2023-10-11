<?php
require $_SERVER['DOCUMENT_ROOT'] . '/api/utils/connection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $connection = open_connection();
    $query = "SELECT DISTINCT type FROM recipes";

    $result = mysqli_query($connection, $query);

    if ($result !== false) {
        $types = [];

        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $types[] = $row['type'];
            }
        }
    } else {
        http_response_code(500);
        $response = array(
            'status' => 'error',
            'message' => 'Failed to fetch recipe types!'
        );
    }

    echo json_encode($types);
    close_connection($connection);
}
