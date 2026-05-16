<?php 

$ipPinPad = "192.168.100.59";//"20.20.20.250";
$puertoPinPad = "9999";
$TimeOut = "300000";
$CodigoComercio = "1791310101";
$NombrePinPad = "PPSYSSAP";
$CodigoCaja = "001";

$nombreProceso = "ProcesoControl";

$CodigoComercio = "1791310101";
$nombrePinPad = "PPSYSSAP";
$CodigoCaja = "001";
$Lote = "001";
$Referencia = "001";

$parametros = $ipPinPad." ".
			  $puertoPinPad." ".
			  $TimeOut." ".
			  $CodigoComercio." ".
			  $NombrePinPad." ".
			  $CodigoCaja." ".
			  $nombreProceso." ".
			  $CodigoComercio." ".
			  $nombrePinPad." ".
			  $CodigoCaja." ".
			  $Lote." ".
			  $Referencia; 
//echo $parametros."<br/>";
$respuestajava =shell_exec('java -jar "../java/pinpad.jar" '.$parametros);

echo $respuestajava."---";

#192.168.100.59 9999 300000 1791310101 PPSYSSAP 001 ProcesoControl 1791310101 PPSYSSAP 001 001 001

$nombreProceso = "ProcesoPago";

$tipo = "1";
$redAdquiriente = "1";
$CodigoDiferido = "00";
$Total = "11.20";
$Base12 = "10";
$Base0 = "0";
$Iva = "1.20";
$Factura = "1";

$parametros = $ipPinPad." ".
			  $puertoPinPad." ".
			  $TimeOut." ".
			  $CodigoComercio." ".
			  $NombrePinPad." ".
			  $CodigoCaja." ".
			  $nombreProceso." ".
			  $tipo." ".
			  $redAdquiriente." ".
			  $CodigoDiferido." ".
			  $Total." ".
			  $Base12." ".
			  $Base0." ".
			  $Iva." ".
			  $Factura; 

//$respuestajava =shell_exec('java -jar "../java/pinpad.jar" '.$parametros);

//echo $respuestajava;


?>