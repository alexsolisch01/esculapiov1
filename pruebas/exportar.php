<?php

$xmlFirmar = "../facturas/0902202001099314417700120010040000002554126153319.xml";
$certificado = "../facturas/wecare.p12";
$clave="Wecare2018firma";
$rutaFirmados="../Firmados/";
$nombreXml="0902202001099314417700120010040000002554126153319.xml";

$parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;

//$respuestajava =shell_exec('java -jar "C:\Users\Mauro\Downloads\galenos/java/FirmaXades.jar" '.$parametros);
$respuestajava = shell_exec('java -jar "../java/FirmaXades.jar" '.$parametros);
echo $respuestajava;

/*
	$email = "mauro_vv96@hotmail.com";
	$nombre = "Mauro Veliz";
	$titulo = "HOO";
	$mensaje = "prueba";

	$para = $email;

	//$título = 'Respuesta a su mensaje';

	$cuerpo ='<html>
					<head>
						<title>'.$titulo.'</title>
					</head>

					<body>
						<h1>Hola '.$nombre.'</h1>
							'.$mensaje.'
						<hr>
					<br>
				</body>

					 </html>';

		$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
		$cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
		$cabeceras .= 'From: <mauro_vv96@hotmail.com>' . "\r\n";

		$envio = mail($para, $titulo, $cuerpo, $cabeceras);

		echo json_encode(true);*/