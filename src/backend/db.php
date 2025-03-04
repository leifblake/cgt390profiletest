<?php
$servername = "goss.tech.purdue.edu";
$username = "cgt456web1c";  
$password = "Reflected1c3828";  
$dbname = "cgt456web1c";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
