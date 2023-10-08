<?php
function console_log($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('" . $output . "' );</script>";
}

function function_alert($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>alert('" . $output . "');</script>";
}
