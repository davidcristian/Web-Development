<?php
require $_SERVER['DOCUMENT_ROOT'] . '/api/utils/connection.php';
require $_SERVER['DOCUMENT_ROOT'] . '/api/models/recipe.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle CORS pre-flight request
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Parse JSON input
    $data = json_decode(file_get_contents("php://input"), true);

    // Sanitize and validate user input
    $type = filter_var($data['type'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    if (empty($type)) {
        http_response_code(400);
        $response = array(
            'status' => 'error',
            'message' => 'Back end validation error!',
            'data' => array('Type is required!')
        );
        echo json_encode($response);
        exit();
    }

    $connection = open_connection();

    if ($type == "All") {
        $query = $connection->prepare("SELECT * FROM recipes");
    } else {
        $query = $connection->prepare("SELECT * FROM recipes WHERE type=?");
        $query->bind_param("s", $type);
    }

    if ($query->execute()) {
        http_response_code(200);

        $result = $query->get_result();
        $recipes = [];

        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $recipe = new Recipe(
                    $row['id'],
                    $row['author'],
                    $row['name'],
                    $row['type'],
                    $row['recipe']
                );
                $recipes[] = $recipe;
            }
        }
    } else {
        http_response_code(500);
        $response = array(
            'status' => 'error',
            'message' => 'Failed to fetch recipes!'
        );
    }

    echo json_encode($recipes);
    close_connection($connection);
}
