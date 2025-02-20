<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include 'db.php';

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

if ($id > 0) {
    $imageQuery = $conn->prepare("SELECT image FROM user_profiles WHERE id = ?");
    $imageQuery->bind_param("i", $id);
    $imageQuery->execute();
    $result = $imageQuery->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $imagePath = $row['image'];
        
        $stmt = $conn->prepare("DELETE FROM user_profiles WHERE id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
            echo json_encode(['success' => true, 'message' => 'Profile deleted successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error deleting profile: ' . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Profile not found.']);
    }
    
    $imageQuery->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid profile ID.']);
}

$conn->close();
?>
