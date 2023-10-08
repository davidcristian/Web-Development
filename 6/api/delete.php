<?php
require $_SERVER['DOCUMENT_ROOT'] . '/api/utils/connection.php';

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
    $id = filter_var($data['id'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    if (empty($id)) {
        http_response_code(400);
        $response = array(
            'status' => 'error',
            'message' => 'Back end validation error!',
            'data' => array('ID is required!')
        );
        echo json_encode($response);
        exit();
    }

    $connection = open_connection();

    $query = $connection->prepare("DELETE FROM recipes WHERE id=?");
    $query->bind_param("i", $id);

    if ($query->execute()) {
        http_response_code(200);
        $response = array(
            'status' => 'success',
            'message' => 'Recipe deleted successfully!'
        );
    } else {
        http_response_code(500);
        $response = array(
            'status' => 'error',
            'message' => 'Failed to delete recipe!'
        );
    }

    echo json_encode($response);
    close_connection($connection);
}
