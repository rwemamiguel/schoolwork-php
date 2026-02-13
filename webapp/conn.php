<?php
$host='localhost';
$user="root";
$pass="";
$db="l4_stock";
$dsn="mysql:host=$host;dbname=$db;charset=utf8mb4";
$conn=new PDO($dsn,$user,$pass);
?>