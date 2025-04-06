<?php
session_start();

$host = "localhost";
$dbname = "SKYSTREAM";
$dbuser = "root";
$dbpass = "";
$conn = new mysqli($host, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$message = ""; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $info = "SELECT * FROM USUARIOS WHERE email = '$email'";
    $result = $conn->query($info);
    
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row["passw0rd"])) {
            $_SESSION["id"] = $row["id"];
            $_SESSION["email"] = $row["email"];
            $_SESSION["rol"] = $row["rol"];
            header("Location: ./Pagina_principal/index.html");
            exit(); // Acaba el script despres de redirigir
        } else {
            $message = "Contraseña incorrecta"; // Missatge d'error
        }
    } else {
        $message = "Correo electrónico no encontrado"; // Missatge d'error
    }
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyStream - Inicio Sesión</title>
    <link rel="stylesheet" href="./CSS/sesion_i_registro.css">
    <link rel="shortcut icon" href="./IMG/ICONO.png">   
</head>
<body>
<!--  -->
    <nav>
        <a href="#"><img src="./IMG/LOGO.png" alt="logo"></a>
    </nav>
    <div class="form-wrapper">
        <h2>Iniciar Sesión</h2>
        <form action="index.php" method="POST">
    <div class="form-control">
        <input type="email" name="email" placeholder=" " required>
        <label>Correo electrónico</label>
    </div>
    <div class="form-control">
        <input type="password" name="password" placeholder=" " required>
        <label>Contraseña</label>
    </div>
            <button type="submit">Iniciar Sesión</button>
        <?php if (!empty($message)): ?>
            <div class="message error">
                <?php echo htmlspecialchars($message); ?>
            </div>
        <?php endif; ?>
        </form>
        <p>¿No tienes cuenta? <a href="./INICIO SESION/register.php">Regístrate aquí</a></p>
    </div>
</body>
</html>
