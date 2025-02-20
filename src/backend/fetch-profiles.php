<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php';

$sql = "SELECT id, name, email, role, bio, image FROM user_profiles";
$result = $conn->query($sql);

$profiles = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $profiles[] = $row;
    }
}

echo json_encode(['success' => true, 'profiles' => $profiles]);

$conn->close();
?>
