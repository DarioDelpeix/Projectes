<?php
$host = "localhost";
$dbname = "SKYSTREAM";
$dbuser = "root";
$dbpass = "";
$conn = new mysqli($host, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);                                                             
}

$message = "";                                                             

if ($_SERVER["REQUEST_METHOD"] === "POST") {                                                             
    $username = trim($_POST["username"]); // Eliminar espacios extra
    $email = trim($_POST["email"]);                                                             
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];

    // Verificar que las contraseñas coincidan
    if ($password !== $confirm_password) {
        $message = "Las contraseñas no coinciden. Por favor, inténtelo de nuevo.";
    } else {
        // Hashear la contraseña
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Comprobar si el nombre de usuario ya existe
        $comUsrSql = "SELECT * FROM USUARIOS WHERE username = '$username'";
        $ResultUsrSql = $conn->query($comUsrSql);

        // Comprobar si el correo ya existe
        $ComEmailSql = "SELECT * FROM USUARIOS WHERE email = '$email'";                                                             
        $ResultEmailSql = $conn->query($ComEmailSql);                                                             

        if ($ResultUsrSql->num_rows > 0) {                                                             
            $message = "El nombre de usuario ya está en uso. Por favor, elija otro.";
        } elseif ($ResultEmailSql->num_rows > 0) {
            $message = "Esta dirección de correo electrónico ya está en uso. Por favor, elija otra.";
        } else {
            // Insertar el nuevo usuario
            $sql = "INSERT INTO USUARIOS (username, email, passw0rd) VALUES ('$username', '$email', '$hashed_password')";
            if ($conn->query($sql) === TRUE) {
                $message = "Registro realizado correctamente.";
            } else {
                $message = "Error al registrar el nuevo usuario: " . $conn->error; 
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyStream - Registro</title>
    <link rel="stylesheet" href="../CSS/sesion_i_registro.css">
    <link rel="shortcut icon" href="../IMG/ICONO.png">   
</head>
<body>
    <nav>
        <a href="#"><img src="../IMG/LOGO.png" alt="logo"></a>
    </nav>
    <div class="form-wrapper">
        <h2>Registrarse</h2>
        <form action="register.php" method="POST">
            <div class="form-control">
                <input type="text" name="username" placeholder="Nombre de usuario" required>
                <label>Nombre de usuario</label>
            </div>
            <div class="form-control">
                <input type="email" name="email" placeholder="Correo electrónico" required>
                <label>Correo electrónico</label>
            </div>
            <div class="form-control">
                <input type="password" name="password" placeholder="Contraseña" required>
                <label>Contraseña</label>
            </div>
            <div class="form-control">
                <input type="password" name="confirm_password" placeholder="Confirmar Contraseña" required>
                <label>Confirmar Contraseña</label>
            </div>
            <button type="submit">Registrarse</button>
            
            <?php if (!empty($message)): ?>
        <div class="message <?php echo (strpos($message, 'correctamente') !== false) ? 'success' : 'error'; ?>">
            <?php echo htmlspecialchars($message); ?>
        </div>
        <?php endif; ?>

        </form>
        <p>¿Ya tienes cuenta? <a href="../index.php">Inicia sesión aquí</a></p>
    </div>
</body>
</html>
