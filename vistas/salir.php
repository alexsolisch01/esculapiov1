<?php

$dao= new Dao();
$dao->Eliminar("sesiones ","id_usuario=".$_SESSION['id']);

session_destroy();

echo '<script>
			 window.location.href = "index.php";
		</script>';