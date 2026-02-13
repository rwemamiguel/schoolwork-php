<?php
include "conn.php";

if(isset($_POST['register'])){
    $fname=$_POST['fname'];
    $lname=$_POST['lname'];
    $email=$_POST['email'];
    $password=$_POST['password'];
    $hashedpassword=password_hash($password,PASSWORD_DEFAULT);

    //verifying email
    $check=$conn->prepare("SELECT * FROM users WHERE email =?");
    $check->execute([$email]);
    if ($check->rowCount()) {
        ?>
        <script>
            window.alert("Email already exists");
            window.history.back();
        </script>
<?php   
exit;
    }
    $insert=$conn->prepare("INSERT INTO users(fname,lname,email,password) VALUES(?,?,?,?)");
    $insert->execute([$fname,$lname,$email,$password]);
    if ($insert) {
        ?>
        <script>
            window.alert("Registration Successfull");
            window.location.href="login.php";
        </script>
        <?php
    }
    else {
        ?>
        <script>
        window.alert("failed");
        window.history.back();
        </script>
        <?php
    }
}

?>