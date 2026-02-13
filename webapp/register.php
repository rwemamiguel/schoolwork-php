


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        
    </style>
</head>
<body>
    <h2>Register Form</h2>
    <form action="server_login.php" method="POST">
        <label for="">First Name</label>
        <input type="text" name="fname" placeholder=" Firstname" required><br>
        <label for="">Last Name</label>
        <input type="text" name="lname" placeholder="Last name" required><br>
        <label for="">Email</label>
        <input type="email" name="email" placeholder="email" required><br>
        <label for="">Password</label>
        <input type="password" name="password" placeholder="password" required><br>
        <button type="submit" name="register">Register</button>
    </form>
    <p>Already have account <a href="login.php">Login</a></p>
</body>
</html>
