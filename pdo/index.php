<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body><div class="form-container">
    <form action="index.php" method="POST" class="styled-form">
        <fieldset>
            <h1>Registration Form</h1>
        <label>Name</label><br>
    <input type="text" name="name" placeholder="Name" required><br>
        <label>Email</label><br>
    <input type="email" name="email" placeholder="Email" required><br>
        <label>Password</label><br>
    <input type="password" name="password" placeholder="Password" required><br>
    <button type="submit" name="send">Submit</button>
        </fieldset>
    </form>
    <button><a href="view.php">View</a></button>
</div>
</body>
</html>


<?php 
include "conn.php";

if(isset($_POST['send'])){
    $name=$_POST['name'];
    $email=$_POST['email'];
    $password=password_hash($_POST['password'],PASSWORD_DEFAULT);

$sql="SELECT id FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);

if ($stmt->rowCount() > 0) {
    echo " Email already exists";
} 
else {
$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?,?,?)");
$stmt->execute([$name, $email, $password]);
?>
<script>
    alert("Registration Successful");
</script>
<?php
        header("Location: view.php");
        exit;
}



}