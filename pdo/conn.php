<?php

$host="localhost";
$user="root";
$pass="";
$db="pdo_db";

$dsn="mysql:host=$host;dbname=$db";
$conn=new PDO($dsn,$user,$pass);

?>