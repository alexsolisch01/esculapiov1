<?php 

$parametros = "A"." "."B"." "."c"." "."D"." "."f";
$respuestajava = shell_exec('java -jar "java/FirmaXades.jar" '.$parametros);
echo $respuestajava;

 ?>