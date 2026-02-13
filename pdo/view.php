<?php
include "conn.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Retrieving</title>
    <style>
        table {
            width: 50%;
            margin: auto;
            border-collapse: collapse;
            place-items: center;
            margin-top: auto;
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center; 
            height: 200px; 
        }
        th, td {
            padding: 5px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        a {
            text-decoration: none;
            color: blue;
        }
        a:hover {
            text-decoration: underline;
        }
        button {
            margin-left: 50%;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }

    </style>
</head>
<body>
    <table border="1">
        <tr>
            <th>SN</th>
            <th>Name</th>
            <th>Email</th>
            <th colspan="2">Actions</th>
        </tr>
        <?php
        $stmt = $conn->prepare("SELECT * FROM users");
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $i = 1;

        foreach ($users as $user) { ?>
        <tr>
            <td><?php echo $i; ?></td>
            <td><?php echo $user['name']; ?></td>
            <td><?php echo $user['email']; ?></td>
            <td><a href="edit.php?id=<?php echo $user['id']; ?>">Edit</a></td>
            <td><a href="delete.php?id=<?php echo $user['id']; ?>" onclick="return confirm('You sure?')">Delete</a></td>
        </tr>
        <?php
            $i++;
        }
        ?>
    </table>
    <br>
    <button><a href="index.php">Back</a></button>
</body>
</html>
