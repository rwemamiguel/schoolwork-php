<?php
include "conn.php";

if(isset($_POST['login'])){
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $sql = "SELECT * FROM users WHERE email='$email' AND password='$pass'";
    if(mysql_num_rows($sql)){
        $row=mysql_fetch_array($sql);
        $oldpass=$row['password'];
        if(password_verify($pass,$oldpass)){
            $_SESSION['userid']=$row['userid']; 
            $_SESSION['username']=$row['username'];
            $_SESSION['role']=$row['role'];
            ?>
            <script></script>
                window.alert("Welcome <?php echo $_SESSION['username']; ?>");
                window.location.href = "admin/";
            </script>
            <?php
    }
    else{
        ?>
        <script>
            window.alert("Password is incorrect");
            window.location.href = "admin/login.php";
        </script>
        <?php
    }
    }

}
?>