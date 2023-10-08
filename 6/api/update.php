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

    $id = filter_var($data['id'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $author = filter_var($data['author'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $name = filter_var($data['name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $type = filter_var($data['type'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $recipe = filter_var($data['recipe'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    $recipeObj = new Recipe(0, $author, $name, $type, $recipe);
    $errors = $recipeObj->validate();

    if (!empty($errors)) {
        http_response_code(400);
        $response = array(
            'status' => 'error',
            'message' => 'Back end validation error!',
            'data' => $errors
        );
        echo json_encode($response);
        exit();
    }

    $connection = open_connection();

    $query = $connection->prepare("UPDATE recipes SET author=?, name=?, type=?, recipe=? WHERE id=?");
    $query->bind_param("ssssi", $author, $name, $type, $recipe, $id);

    if ($query->execute()) {
        http_response_code(200);
        $response = array(
            'status' => 'success',
            'message' => 'Recipe updated successfully!'
        );
    } else {
        http_response_code(500);
        $response = array(
            'status' => 'error',
            'message' => 'Failed to update recipe!'
        );
    }

    echo json_encode($response);
    close_connection($connection);
}
