<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include 'db.php';

$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
$role = isset($_POST['role']) ? htmlspecialchars(trim($_POST['role'])) : '';
$bio = isset($_POST['bio']) ? htmlspecialchars(trim($_POST['bio'])) : '';
$image = '';

$uploadDir = __DIR__ . '/uploads/';
$uploadUrl = 'https://web.ics.purdue.edu/~blake50/cgt390/lab8/backend/uploads/';
$imageName = '';

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $imageName = uniqid() . '_' . basename($_FILES['image']['name']);
    $uploadFile = $uploadDir . $imageName;

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
        $image = $uploadUrl . $imageName;
    } else {
        echo json_encode(['success' => false, 'message' => 'Error uploading the image.']);
        exit;
    }
}

$stmt = $conn->prepare("INSERT INTO user_profiles (name, email, role, bio, image) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $email, $role, $bio, $image);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Profile saved successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
