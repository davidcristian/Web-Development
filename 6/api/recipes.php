<?php
require $_SERVER['DOCUMENT_ROOT'] . '/api/utils/connection.php';
require $_SERVER['DOCUMENT_ROOT'] . '/api/models/recipe.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $connection = open_connection();
    $query = "SELECT * FROM recipes";

    $result = mysqli_query($connection, $query);

    if ($result !== false) {
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
