<?php

session_start();
date_default_timezone_set('America/Guayaquil');
require_once "autoloadAjax.php";

$ambiente=2;
if(isset($_POST['Requerimiento'])){


   if($_POST['Requerimiento'] == "CrearXML"){
      if( !isset($_POST["Emision"]) ){
        $_POST["Emision"] = "";
      }
      $dao = new Dao();

      $dao->Campo("razon_social","");
      $dao->Campo("ruc","");
      $dao->Campo("direccion","");
      $dao->Campo("telefono","");
      $dao->Campo("correo1","");

      $dao->Tabla("empresa","");
      $dao->Where("id","2","");

      $respuesta =$dao->Consultar();

      $nombre = '';
      $ruc = '';
      $direccion = '';
      $telefono = '';
      $cabecera = null;
      $correoEmpresa = '';
      foreach ($respuesta as $row => $item){      
        $nombre = $item[0];
        $ruc = $item[1];
        $direccion = $item[2];
        $telefono = $item[3];
        $correoEmpresa = $item[4];
        $cabecera = $item;

      }
      $cabecera[4]=$_POST['Cedula'];
      $cabecera[5]=$_POST['Cliente'];
      $cabecera[6]=$_POST['DireccionC'];

      $cabecera[7]=$_POST['Subtotal'];
      $cabecera[8]=0.0;
      $cabecera[9]=$_POST['Subtotal'];
      $cabecera[10]=$_POST['DesctoTotal'];

      $cabecera[11]=$_POST['Paciente'];
      $cabecera[12]=$_POST['Correo'];
      $cabecera[13]=$correoEmpresa;       

      $detalle1 = json_decode($_POST['Productos'],true);
      $detalle2 = json_decode($_POST['ProductosLab'],true);
      $detalle3 = json_decode($_POST['ProductosRx'],true);
      $detalle4 = json_decode($_POST['ProductosEco'],true);
      $detalle5 = json_decode($_POST['ProductosTac'],true);
      
      $establecimiento = substr(str_replace("-","",$_POST['Numero']),0,3);
      $punto = substr(str_replace("-","",$_POST['Numero']),3,3);
      $secuencial = substr(str_replace("-","",$_POST['Numero']),6);
      $fecha =  $_POST["Emision"] == "" ? date("d/m/Y") : date_format(date_create($_POST["Emision"]),"d/m/Y");
      $comprador = $cabecera[5];
      $direccionComprador =$cabecera[6];
      $subtotal = $cabecera[7];
      $iva = $cabecera[8];
      $total = $cabecera[9];
      $descuento = $cabecera[10];
      $detalle = '';
      $paciente = $cabecera[11];
      $correo = $cabecera[12];

      $fechaclave = $_POST["Emision"] == "" ? date("dmY") : date_format(date_create($_POST["Emision"]),"dmY");

      $claveAcceso = $fechaclave."01".$ruc.$ambiente.$establecimiento.$punto.$secuencial."41261533"."1";
      $digitoVerificador=-1;

      $arrayClave = str_split($claveAcceso);

      $arrayMultiplicacion = array();

      $arrayMultiplicacion[0]=$arrayClave[0] * 7;
      $arrayMultiplicacion[1]=$arrayClave[1] * 6;
      $arrayMultiplicacion[2]=$arrayClave[2] * 5;
      $arrayMultiplicacion[3]=$arrayClave[3] * 4;
      $arrayMultiplicacion[4]=$arrayClave[4] * 3;
      $arrayMultiplicacion[5]=$arrayClave[5] * 2;

      $arrayMultiplicacion[6]=$arrayClave[6] * 7;
      $arrayMultiplicacion[7]=$arrayClave[7] * 6;
      $arrayMultiplicacion[8]=$arrayClave[8] * 5;
      $arrayMultiplicacion[9]=$arrayClave[9] * 4;
      $arrayMultiplicacion[10]=$arrayClave[10] * 3;
      $arrayMultiplicacion[11]=$arrayClave[11] * 2;

      $arrayMultiplicacion[12]=$arrayClave[12] * 7;
      $arrayMultiplicacion[13]=$arrayClave[13] * 6;
      $arrayMultiplicacion[14]=$arrayClave[14] * 5;
      $arrayMultiplicacion[15]=$arrayClave[15] * 4;
      $arrayMultiplicacion[16]=$arrayClave[16] * 3;
      $arrayMultiplicacion[17]=$arrayClave[17] * 2;

      $arrayMultiplicacion[18]=$arrayClave[18] * 7;
      $arrayMultiplicacion[19]=$arrayClave[19] * 6;
      $arrayMultiplicacion[20]=$arrayClave[20] * 5;
      $arrayMultiplicacion[21]=$arrayClave[21] * 4;
      $arrayMultiplicacion[22]=$arrayClave[22] * 3;
      $arrayMultiplicacion[23]=$arrayClave[23] * 2;

      $arrayMultiplicacion[24]=$arrayClave[24] * 7;
      $arrayMultiplicacion[25]=$arrayClave[25] * 6;
      $arrayMultiplicacion[26]=$arrayClave[26] * 5;
      $arrayMultiplicacion[27]=$arrayClave[27] * 4;
      $arrayMultiplicacion[28]=$arrayClave[28] * 3;
      $arrayMultiplicacion[29]=$arrayClave[29] * 2;

      $arrayMultiplicacion[30]=$arrayClave[30] * 7;
      $arrayMultiplicacion[31]=$arrayClave[31] * 6;
      $arrayMultiplicacion[32]=$arrayClave[32] * 5;
      $arrayMultiplicacion[33]=$arrayClave[33] * 4;
      $arrayMultiplicacion[34]=$arrayClave[34] * 3;
      $arrayMultiplicacion[35]=$arrayClave[35] * 2;

      $arrayMultiplicacion[36]=$arrayClave[36] * 7;
      $arrayMultiplicacion[37]=$arrayClave[37] * 6;
      $arrayMultiplicacion[38]=$arrayClave[38] * 5;
      $arrayMultiplicacion[39]=$arrayClave[39] * 4;
      $arrayMultiplicacion[40]=$arrayClave[40] * 3;
      $arrayMultiplicacion[41]=$arrayClave[41] * 2;

      $arrayMultiplicacion[42]=$arrayClave[42] * 7;
      $arrayMultiplicacion[43]=$arrayClave[43] * 6;
      $arrayMultiplicacion[44]=$arrayClave[44] * 5;
      $arrayMultiplicacion[45]=$arrayClave[45] * 4;
      $arrayMultiplicacion[46]=$arrayClave[46] * 3;
      $arrayMultiplicacion[47]=$arrayClave[47] * 2;

      $sumaClave = 0;
      foreach ($arrayMultiplicacion as $valor) {
        $sumaClave =$sumaClave + $valor;
      }
      $mod = fmod($sumaClave, 11);
      $digitoVerificador = 11 - $mod;
      if($digitoVerificador==11){
        $digitoVerificador = 0;
      }
      if($digitoVerificador==10){
        $digitoVerificador = 1;
      }
      $claveAcceso = $claveAcceso.$digitoVerificador;
      $direccionPaciente = $direccionComprador;

      $tipoIdentificacionComprador = "05";
      $identificacionComprador=$cabecera[4];
      if(strlen($cabecera[4])==13){
        $tipoIdentificacionComprador = "04";
      }
      if($cabecera[4]=='9999999999'){
        $direccionPaciente = $direccion;
        $identificacionComprador='9999999999999';
        $tipoIdentificacionComprador = "07";
        $correo =  $cabecera[12];
      }
      if($_POST["TipoIde"] == '2'){
        $tipoIdentificacionComprador = "06";           
      }
      if($correo==""){
        $correo="----";
      }
      if($direccionComprador==""){
        $direccionComprador="----";
      }
      for($i=0; $i<sizeof($detalle1); $i++) {    
        $descuentoXml = ($detalle1[$i][3] * $detalle1[$i][4]) / 100;
        $subtotalXml = $detalle1[$i][3];
        $resta = $subtotalXml - $descuentoXml;
        $detalle .= ' <detalle>
                        <codigoPrincipal>CON'.$detalle1[$i][8].'</codigoPrincipal>
                        <codigoAuxiliar>CON'.$detalle1[$i][8].'</codigoAuxiliar> 
                        <descripcion>'.$detalle1[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle1[$i][3].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle2); $i++) { 
        $descuentoXml = ($detalle2[$i][2] * $detalle2[$i][3]) / 100;
        $subtotalXml = $detalle2[$i][2];
        $resta = $subtotalXml - $descuentoXml;                
        $detalle .= ' <detalle>
                        <codigoPrincipal>LAB'.$detalle2[$i][5].'</codigoPrincipal>
                        <codigoAuxiliar>LAB'.$detalle2[$i][5].'</codigoAuxiliar> 
                        <descripcion>'.$detalle2[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle2[$i][2].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle3); $i++) {
        $descuentoXml = ($detalle3[$i][2] * $detalle3[$i][3]) / 100;
        $subtotalXml = $detalle3[$i][2];
        $resta = $subtotalXml - $descuentoXml;                    
        $detalle .= ' <detalle>
                        <codigoPrincipal>RX'.$detalle3[$i][5].'</codigoPrincipal>
                        <codigoAuxiliar>RX'.$detalle3[$i][5].'</codigoAuxiliar> 
                        <descripcion>'.$detalle3[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle3[$i][2].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle4); $i++) {
        $descuentoXml = ($detalle4[$i][2] * $detalle4[$i][3]) / 100;
        $subtotalXml = $detalle4[$i][2];
        $resta = $subtotalXml - $descuentoXml;         
        $detalle .= ' <detalle>
                        <codigoPrincipal>ECO'.$detalle4[$i][5].'</codigoPrincipal>
                        <codigoAuxiliar>ECO'.$detalle4[$i][5].'</codigoAuxiliar> 
                        <descripcion>'.$detalle4[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle4[$i][2].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle5); $i++) {
        $descuentoXml = ($detalle5[$i][2] * $detalle5[$i][3]) / 100;
        $subtotalXml = $detalle5[$i][2];
        $resta = $subtotalXml - $descuentoXml;                    
        $detalle .= ' <detalle>
                        <codigoPrincipal>TOMO'.$detalle5[$i][5].'</codigoPrincipal>
                        <codigoAuxiliar>TOMO'.$detalle5[$i][5].'</codigoAuxiliar> 
                        <descripcion>'.$detalle5[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle5[$i][2].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }

      if($descuento=="NaN" || $descuento==""){
        $descuento=0;
      }
$subtotal=$subtotal;//+$descuento;
$total=$total;//+$descuento;
$string = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<factura xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:noNamespaceSchemaLocation="../xml/factura.xsd" id="comprobante" version="2.1.0">
    <infoTributaria>
        <ambiente>$ambiente</ambiente>
        <tipoEmision>1</tipoEmision>
        <razonSocial>$nombre</razonSocial>
        <nombreComercial>$nombre</nombreComercial>
        <ruc>$ruc</ruc>
        <claveAcceso>$claveAcceso</claveAcceso>
        <codDoc>01</codDoc>
        <estab>$establecimiento</estab>
        <ptoEmi>$punto</ptoEmi>
        <secuencial>$secuencial</secuencial>
        <dirMatriz>$direccion</dirMatriz>
        <agenteRetencion>00000001</agenteRetencion>
    </infoTributaria>
    <infoFactura>
        <fechaEmision>$fecha</fechaEmision>
        <dirEstablecimiento>$direccion</dirEstablecimiento>
        
        <obligadoContabilidad>SI</obligadoContabilidad>        
        <tipoIdentificacionComprador>$tipoIdentificacionComprador</tipoIdentificacionComprador>        
        <razonSocialComprador>$comprador</razonSocialComprador>
        <identificacionComprador>$identificacionComprador</identificacionComprador>
        <direccionComprador>$direccionComprador</direccionComprador>
        <totalSinImpuestos>$subtotal</totalSinImpuestos>                
        <totalDescuento>$descuento</totalDescuento>
        <totalConImpuestos>
            <totalImpuesto>
                <codigo>2</codigo>
                <codigoPorcentaje>0</codigoPorcentaje>                
                <baseImponible>$total</baseImponible>                
                <valor>00.00</valor>
            </totalImpuesto>
        </totalConImpuestos>
        <propina>00.00</propina>
        <importeTotal>$total</importeTotal>
        <moneda>DOLAR</moneda>        
    </infoFactura>
    <detalles>
           $detalle
    </detalles>
    <infoAdicional>
      <campoAdicional nombre="Direccion">$direccionComprador</campoAdicional> 
      <campoAdicional nombre="email">$correo</campoAdicional> 
      <campoAdicional nombre="Nota">$paciente</campoAdicional> 
    </infoAdicional>
     
</factura>

XML;

$xml = new SimpleXMLElement($string);
  
 


 $xml->asXML('../facturas/'.$claveAcceso.'.xml');

$xmlFirmar = "../facturas/".$claveAcceso.".xml";
$certificado = "../facturas/0992894512001.p12";
$clave="FEisabel2022";
$rutaFirmados="../Firmados/";
$nombreXml=$claveAcceso.".xml";

$parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;

$respuestajava = shell_exec('java -jar "../java/FirmaXades.jar" '.$parametros);

 $filename = '../Firmados/'.$claveAcceso.'.xml'; 
 $byte_array = file_get_contents($filename);
 $valores =  array('binario' => base64_encode($byte_array),
                   'clave'=>$claveAcceso,
                   'java'=>$respuestajava);

 $datos = array("autorizada"=>'N',
                "clave_sri"=>$claveAcceso);

  $dao= new Dao();
  
  $dao->Modificar("consulta",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
  echo json_encode($valores, JSON_FORCE_OBJECT);   

  }


  if($_POST['Requerimiento'] == "CrearXMLFarmacia"){
      
      $dao = new Dao();

      $dao->Campo("razon_social","");
      $dao->Campo("ruc","");
      $dao->Campo("direccion","");
      $dao->Campo("telefono","");
      $dao->Campo("correo1","");

      $dao->Tabla("empresa","");
      $dao->Where("id","2","");

      $respuesta =$dao->Consultar();

      $nombre = '';
      $ruc = '';
      $direccion = '';
      $telefono = '';
      $cabecera = null;
      $correoEmpresa = '';
      foreach ($respuesta as $row => $item){      
        $nombre = $item[0];
        $ruc = $item[1];
        $direccion = $item[2];
        $telefono = $item[3];
        $correoEmpresa = $item[4];
        $cabecera = $item;

      }
      $cabecera[4]=$_POST['Cedula'];
      $cabecera[5]=$_POST['Cliente'];
      $cabecera[6]=$_POST['DireccionC'];

      $cabecera[7]=$_POST['Subtotal'];
      $cabecera[8]=0.0;
      $cabecera[9]=$_POST['Subtotal'];
      $cabecera[10]=$_POST['DesctoTotal'];

      $cabecera[11]=$_POST['Paciente'];
      $cabecera[12]=$_POST['Correo'];
      $cabecera[13]=$correoEmpresa;       

      $detalle1 = json_decode($_POST['Productos'],true);
      
      $establecimiento = substr(str_replace("-","",$_POST['Numero']),0,3);
      $punto = substr(str_replace("-","",$_POST['Numero']),3,3);
      $secuencial = substr(str_replace("-","",$_POST['Numero']),6);
      $fecha = date("d/m/Y");
      $comprador = $cabecera[5];
      $direccionComprador =$cabecera[6];
      $subtotal = $cabecera[7];
      $iva = $cabecera[8];
      $total = $cabecera[9];
      $descuento = $cabecera[10];
      $detalle = '';
      $paciente = $cabecera[11];
      $correo = $cabecera[12];

      $claveAcceso = date("dmY")."01".$ruc.$ambiente.$establecimiento.$punto.$secuencial."41261533"."1";
      $digitoVerificador=-1;

      $arrayClave = str_split($claveAcceso);

      $arrayMultiplicacion = array();

      $arrayMultiplicacion[0]=$arrayClave[0] * 7;
      $arrayMultiplicacion[1]=$arrayClave[1] * 6;
      $arrayMultiplicacion[2]=$arrayClave[2] * 5;
      $arrayMultiplicacion[3]=$arrayClave[3] * 4;
      $arrayMultiplicacion[4]=$arrayClave[4] * 3;
      $arrayMultiplicacion[5]=$arrayClave[5] * 2;

      $arrayMultiplicacion[6]=$arrayClave[6] * 7;
      $arrayMultiplicacion[7]=$arrayClave[7] * 6;
      $arrayMultiplicacion[8]=$arrayClave[8] * 5;
      $arrayMultiplicacion[9]=$arrayClave[9] * 4;
      $arrayMultiplicacion[10]=$arrayClave[10] * 3;
      $arrayMultiplicacion[11]=$arrayClave[11] * 2;

      $arrayMultiplicacion[12]=$arrayClave[12] * 7;
      $arrayMultiplicacion[13]=$arrayClave[13] * 6;
      $arrayMultiplicacion[14]=$arrayClave[14] * 5;
      $arrayMultiplicacion[15]=$arrayClave[15] * 4;
      $arrayMultiplicacion[16]=$arrayClave[16] * 3;
      $arrayMultiplicacion[17]=$arrayClave[17] * 2;

      $arrayMultiplicacion[18]=$arrayClave[18] * 7;
      $arrayMultiplicacion[19]=$arrayClave[19] * 6;
      $arrayMultiplicacion[20]=$arrayClave[20] * 5;
      $arrayMultiplicacion[21]=$arrayClave[21] * 4;
      $arrayMultiplicacion[22]=$arrayClave[22] * 3;
      $arrayMultiplicacion[23]=$arrayClave[23] * 2;

      $arrayMultiplicacion[24]=$arrayClave[24] * 7;
      $arrayMultiplicacion[25]=$arrayClave[25] * 6;
      $arrayMultiplicacion[26]=$arrayClave[26] * 5;
      $arrayMultiplicacion[27]=$arrayClave[27] * 4;
      $arrayMultiplicacion[28]=$arrayClave[28] * 3;
      $arrayMultiplicacion[29]=$arrayClave[29] * 2;

      $arrayMultiplicacion[30]=$arrayClave[30] * 7;
      $arrayMultiplicacion[31]=$arrayClave[31] * 6;
      $arrayMultiplicacion[32]=$arrayClave[32] * 5;
      $arrayMultiplicacion[33]=$arrayClave[33] * 4;
      $arrayMultiplicacion[34]=$arrayClave[34] * 3;
      $arrayMultiplicacion[35]=$arrayClave[35] * 2;

      $arrayMultiplicacion[36]=$arrayClave[36] * 7;
      $arrayMultiplicacion[37]=$arrayClave[37] * 6;
      $arrayMultiplicacion[38]=$arrayClave[38] * 5;
      $arrayMultiplicacion[39]=$arrayClave[39] * 4;
      $arrayMultiplicacion[40]=$arrayClave[40] * 3;
      $arrayMultiplicacion[41]=$arrayClave[41] * 2;

      $arrayMultiplicacion[42]=$arrayClave[42] * 7;
      $arrayMultiplicacion[43]=$arrayClave[43] * 6;
      $arrayMultiplicacion[44]=$arrayClave[44] * 5;
      $arrayMultiplicacion[45]=$arrayClave[45] * 4;
      $arrayMultiplicacion[46]=$arrayClave[46] * 3;
      $arrayMultiplicacion[47]=$arrayClave[47] * 2;

      $sumaClave = 0;
      foreach ($arrayMultiplicacion as $valor) {
        $sumaClave =$sumaClave + $valor;
      }
      $mod = fmod($sumaClave, 11);
      $digitoVerificador = 11 - $mod;
      if($digitoVerificador==11){
        $digitoVerificador = 0;
      }
      if($digitoVerificador==10){
        $digitoVerificador = 1;
      }
      $claveAcceso = $claveAcceso.$digitoVerificador;
      $direccionPaciente = $direccionComprador;

      $tipoIdentificacionComprador = "05";
      $identificacionComprador=$cabecera[4];
      if(strlen($cabecera[4])==13){
        $tipoIdentificacionComprador = "04";
      }
      if($cabecera[4]=='9999999999'){
        $direccionPaciente = $direccion;
        $identificacionComprador='9999999999999';
        $tipoIdentificacionComprador = "07";
        $correo =  $cabecera[12];
      }
      if($_POST["TipoIde"] == '2'){
        $tipoIdentificacionComprador = "06";           
      }
      if($correo==""){
        $correo="----";
      }
      if($direccionComprador==""){
        $direccionComprador="----";
      }
      $totalConIva=0;
      $totalSinIva=0;
      for($i=0; $i<sizeof($detalle1); $i++) {       

        $iva = 0;
        $codigo=0;
        $tarifa=0;
        $descuentoXml = ($detalle1[$i][5] * $detalle1[$i][4]) / 100;
        $subtotalXml = $detalle1[$i][5];
        $resta = $subtotalXml - $descuentoXml;
        if($detalle1[$i][7]=='S'){
          $iva = $resta * 0.12;
          $codigo=2;
          $tarifa=12;
          $totalConIva = $totalConIva + $resta;
        }else{
          $totalSinIva = $totalSinIva + $resta;
        }             
        $detalle .= ' <detalle>
                        <codigoPrincipal>'.$detalle1[$i][6].'</codigoPrincipal>
                        <codigoAuxiliar>'.$detalle1[$i][6].'</codigoAuxiliar> 
                        <descripcion>'.$detalle1[$i][0].'</descripcion>                        
                        <cantidad>'.$detalle1[$i][2].'</cantidad>
                        <precioUnitario>'.$detalle1[$i][3].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>'.$codigo.'</codigoPorcentaje>
                                <tarifa>'.$tarifa.'</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>'.number_format($iva, 2, '.', '').'</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';

      }
      $xmlTotalConIva = '';
      $xmlTotalSinIva = '';

      if($totalConIva>0){
        $iva = $totalConIva * 0.12;
        $xmlTotalConIva = ' <totalImpuesto>
                              <codigo>2</codigo> 
                              <codigoPorcentaje>2</codigoPorcentaje> 
                              <baseImponible>'.number_format($totalConIva, 2, '.', '').'</baseImponible> 
                              <valor>'.number_format($iva, 2, '.', '').'</valor> 
                            </totalImpuesto>
                           
                           ';
      }
      if($totalSinIva>0){
        
        $xmlTotalSinIva = ' <totalImpuesto>
                              <codigo>2</codigo> 
                              <codigoPorcentaje>0</codigoPorcentaje> 
                              <baseImponible>'.number_format($totalSinIva, 2, '.', '').'</baseImponible> 
                              <valor>0.00</valor> 
                            </totalImpuesto>
                           
                           ';
      }
      $xmlTotalConImpuestos = $xmlTotalConIva.$xmlTotalSinIva;
      $total = $totalSinIva + ($totalConIva * 1.12); 
      $total = number_format($total, 2, '.', ''); 
      $totalSinImpuestos = $totalConIva + $totalSinIva;
      if($descuento=="NaN" || $descuento==""){
        $descuento=0;
      }
      $totalSinImpuestos = number_format($totalSinImpuestos, 2, '.', ''); 

$string = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<factura xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:noNamespaceSchemaLocation="../xml/factura.xsd" id="comprobante" version="2.1.0">
    <infoTributaria>
        <ambiente>$ambiente</ambiente>
        <tipoEmision>1</tipoEmision>
        <razonSocial>$nombre</razonSocial>
        <nombreComercial>$nombre</nombreComercial>
        <ruc>$ruc</ruc>
        <claveAcceso>$claveAcceso</claveAcceso>
        <codDoc>01</codDoc>
        <estab>$establecimiento</estab>
        <ptoEmi>$punto</ptoEmi>
        <secuencial>$secuencial</secuencial>
        <dirMatriz>$direccion</dirMatriz>
        <agenteRetencion>00000001</agenteRetencion>
    </infoTributaria>
    <infoFactura>
        <fechaEmision>$fecha</fechaEmision>
        <dirEstablecimiento>$direccion</dirEstablecimiento>
        
        <obligadoContabilidad>SI</obligadoContabilidad>        
        <tipoIdentificacionComprador>$tipoIdentificacionComprador</tipoIdentificacionComprador>        
        <razonSocialComprador>$comprador</razonSocialComprador>
        <identificacionComprador>$identificacionComprador</identificacionComprador>
        <direccionComprador>$direccionComprador</direccionComprador>
        <totalSinImpuestos>$totalSinImpuestos</totalSinImpuestos>                
        <totalDescuento>$descuento</totalDescuento>
        <totalConImpuestos>
            $xmlTotalConImpuestos
        </totalConImpuestos>
        <propina>00.00</propina>
        <importeTotal>$total</importeTotal>
        <moneda>DOLAR</moneda>        
    </infoFactura>
    <detalles>
           $detalle
    </detalles>
    <infoAdicional>
      <campoAdicional nombre="Direccion">$direccionComprador</campoAdicional> 
      <campoAdicional nombre="email">$correo</campoAdicional> 
      <campoAdicional nombre="Nota">$paciente</campoAdicional> 
    </infoAdicional>
     
</factura>

XML;

$xml = new SimpleXMLElement($string);
  
 


 $xml->asXML('../farmacia/'.$claveAcceso.'.xml');


$xmlFirmar = "../farmacia/".$claveAcceso.".xml";
$certificado = "../facturas/0992894512001.p12";
$clave="FEisabel2022";
$rutaFirmados="../Firmados/";
$nombreXml=$claveAcceso.".xml";

$parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;

$respuestajava = shell_exec('java -jar "../java/FirmaXades.jar" '.$parametros);

 $filename = '../Firmados/'.$claveAcceso.'.xml'; 
 $byte_array = file_get_contents($filename);
 $valores =  array('binario' => base64_encode($byte_array),
                   'clave'=>$claveAcceso,
                   'java'=>$respuestajava);

 $datos = array("autorizada"=>'N',
                "clave_sri"=>$claveAcceso);

  $dao= new Dao();
  
  $dao->Modificar("farmacia",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
  echo json_encode($valores, JSON_FORCE_OBJECT);   

  }


  if($_POST['Requerimiento'] == "CrearXMLNC"){
      
      $dao = new Dao();

      $dao->Campo("razon_social","");
      $dao->Campo("ruc","");
      $dao->Campo("direccion","");
      $dao->Campo("telefono","");
      $dao->Campo("correo1","");

      $dao->Tabla("empresa","");
      $dao->Where("id","2","");

      $respuesta =$dao->Consultar();


      $nombre = '';
      $ruc = '';
      $direccion = '';
      $telefono = '';
      $cabecera = null;
      $correoEmpresa = '';
      $observacion = 'DEVOLUCION';
      foreach ($respuesta as $row => $item){      
        $nombre = $item[0];
        $ruc = $item[1];
        $direccion = $item[2];
        $telefono = $item[3];
        $correoEmpresa = $item[4];
        
        $cabecera = $item;

      }
      $cabecera[4]=$_POST['Cedula'];
      $cabecera[5]=$_POST['Cliente'];
      $cabecera[6]=$_POST['DireccionC'];

      $cabecera[7]=$_POST['Subtotal'];
      $cabecera[8]=0.0;
      $cabecera[9]=$_POST['Subtotal'];
      $cabecera[10]=$_POST['DesctoTotal'];

      $cabecera[11]=$_POST['Paciente'];
      $cabecera[12]=$_POST['Correo'];
      $cabecera[13]=$correoEmpresa;       

      $detalle1 = json_decode($_POST['Productos'],true);
      $detalle2 = json_decode($_POST['ProductosLab'],true);
      $detalle3 = json_decode($_POST['ProductosRx'],true);
      $detalle4 = json_decode($_POST['ProductosEco'],true);
      $detalle5 = json_decode($_POST['ProductosTac'],true);
      
      $establecimiento = substr(str_replace("-","",$_POST['Numero']),0,3);
      $punto = substr(str_replace("-","",$_POST['Numero']),3,3);
      $secuencial = substr(str_replace("-","",$_POST['Numero']),6);
      $fecha = date("d/m/Y");
      $comprador = $cabecera[5];
      $direccionComprador =$cabecera[6];
      $subtotal = $cabecera[7];
      $iva = $cabecera[8];
      $total = $cabecera[9];
      $descuento = $cabecera[10];
      $detalle = '';
      $paciente = $cabecera[11];
      $correo = $cabecera[12];
      $facturaModificada = $_POST['Factura'];
      $fechaFactura= date_format(date_create($_POST['FechaFactura']),"d/m/Y"); 

      $claveAcceso = date("dmY")."04".$ruc.$ambiente.$establecimiento.$punto.$secuencial."41261533"."1";
      $digitoVerificador=-1;

      $arrayClave = str_split($claveAcceso);

      $arrayMultiplicacion = array();

      $arrayMultiplicacion[0]=$arrayClave[0] * 7;
      $arrayMultiplicacion[1]=$arrayClave[1] * 6;
      $arrayMultiplicacion[2]=$arrayClave[2] * 5;
      $arrayMultiplicacion[3]=$arrayClave[3] * 4;
      $arrayMultiplicacion[4]=$arrayClave[4] * 3;
      $arrayMultiplicacion[5]=$arrayClave[5] * 2;

      $arrayMultiplicacion[6]=$arrayClave[6] * 7;
      $arrayMultiplicacion[7]=$arrayClave[7] * 6;
      $arrayMultiplicacion[8]=$arrayClave[8] * 5;
      $arrayMultiplicacion[9]=$arrayClave[9] * 4;
      $arrayMultiplicacion[10]=$arrayClave[10] * 3;
      $arrayMultiplicacion[11]=$arrayClave[11] * 2;

      $arrayMultiplicacion[12]=$arrayClave[12] * 7;
      $arrayMultiplicacion[13]=$arrayClave[13] * 6;
      $arrayMultiplicacion[14]=$arrayClave[14] * 5;
      $arrayMultiplicacion[15]=$arrayClave[15] * 4;
      $arrayMultiplicacion[16]=$arrayClave[16] * 3;
      $arrayMultiplicacion[17]=$arrayClave[17] * 2;

      $arrayMultiplicacion[18]=$arrayClave[18] * 7;
      $arrayMultiplicacion[19]=$arrayClave[19] * 6;
      $arrayMultiplicacion[20]=$arrayClave[20] * 5;
      $arrayMultiplicacion[21]=$arrayClave[21] * 4;
      $arrayMultiplicacion[22]=$arrayClave[22] * 3;
      $arrayMultiplicacion[23]=$arrayClave[23] * 2;

      $arrayMultiplicacion[24]=$arrayClave[24] * 7;
      $arrayMultiplicacion[25]=$arrayClave[25] * 6;
      $arrayMultiplicacion[26]=$arrayClave[26] * 5;
      $arrayMultiplicacion[27]=$arrayClave[27] * 4;
      $arrayMultiplicacion[28]=$arrayClave[28] * 3;
      $arrayMultiplicacion[29]=$arrayClave[29] * 2;

      $arrayMultiplicacion[30]=$arrayClave[30] * 7;
      $arrayMultiplicacion[31]=$arrayClave[31] * 6;
      $arrayMultiplicacion[32]=$arrayClave[32] * 5;
      $arrayMultiplicacion[33]=$arrayClave[33] * 4;
      $arrayMultiplicacion[34]=$arrayClave[34] * 3;
      $arrayMultiplicacion[35]=$arrayClave[35] * 2;

      $arrayMultiplicacion[36]=$arrayClave[36] * 7;
      $arrayMultiplicacion[37]=$arrayClave[37] * 6;
      $arrayMultiplicacion[38]=$arrayClave[38] * 5;
      $arrayMultiplicacion[39]=$arrayClave[39] * 4;
      $arrayMultiplicacion[40]=$arrayClave[40] * 3;
      $arrayMultiplicacion[41]=$arrayClave[41] * 2;

      $arrayMultiplicacion[42]=$arrayClave[42] * 7;
      $arrayMultiplicacion[43]=$arrayClave[43] * 6;
      $arrayMultiplicacion[44]=$arrayClave[44] * 5;
      $arrayMultiplicacion[45]=$arrayClave[45] * 4;
      $arrayMultiplicacion[46]=$arrayClave[46] * 3;
      $arrayMultiplicacion[47]=$arrayClave[47] * 2;

      $sumaClave = 0;
      foreach ($arrayMultiplicacion as $valor) {
        $sumaClave =$sumaClave + $valor;
      }
      $mod = fmod($sumaClave, 11);
      $digitoVerificador = 11 - $mod;
      if($digitoVerificador==11){
        $digitoVerificador = 0;
      }
      if($digitoVerificador==10){
        $digitoVerificador = 1;
      }
      $claveAcceso = $claveAcceso.$digitoVerificador;
      $direccionPaciente = $direccionComprador;

      $tipoIdentificacionComprador = "05";
      $identificacionComprador=$cabecera[4];
      if(strlen($cabecera[4])==13){
        $tipoIdentificacionComprador = "04";
      }
      if($cabecera[4]=='9999999999'){
        $direccionPaciente = $direccion;
        $identificacionComprador='9999999999999';
        $tipoIdentificacionComprador = "07";
        $correo =  $cabecera[12];
      }
      if($_POST["TipoIde"] == '2'){
        $tipoIdentificacionComprador = "06";           
      }
      if($correo==""){
        $correo="----";
      }
      if($direccionComprador==""){
        $direccionComprador="----";
      }
      
      for($i=0; $i<sizeof($detalle1); $i++) {
        $descuentoXml = ($detalle1[$i][3] * $detalle1[$i][4]) / 100;
        $subtotalXml = $detalle1[$i][3];
        $resta = $subtotalXml - $descuentoXml;                    
        $detalle .= ' <detalle>
                        <codigoInterno>CON'.$detalle1[$i][8].'</codigoInterno>
                        <codigoAdicional>CON'.$detalle1[$i][8].'</codigoAdicional> 
                        <descripcion>'.$detalle1[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle1[$i][3].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle2); $i++) {      
        $descuentoXml = ($detalle2[$i][2] * $detalle2[$i][3]) / 100;
        $subtotalXml = $detalle2[$i][2];
        $resta = $subtotalXml - $descuentoXml;

        $detalle .= ' <detalle>
                        <codigoInterno>LAB'.$detalle2[$i][5].'</codigoInterno>
                        <codigoAdicional>LAB'.$detalle2[$i][5].'</codigoAdicional> 
                        <descripcion>'.$detalle2[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle2[$i][2].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle3); $i++) {   
        $descuentoXml = ($detalle3[$i][2] * $detalle3[$i][3]) / 100;
        $subtotalXml = $detalle3[$i][2];
        $resta = $subtotalXml - $descuentoXml;

        $detalle .= ' <detalle>
                        <codigoInterno>RX'.$detalle3[$i][5].'</codigoInterno>
                        <codigoAdicional>RX'.$detalle3[$i][5].'</codigoAdicional> 
                        <descripcion>'.$detalle3[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle3[$i][2].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle4); $i++) {    
        $descuentoXml = ($detalle4[$i][2] * $detalle4[$i][3]) / 100;
        $subtotalXml = $detalle4[$i][2];
        $resta = $subtotalXml - $descuentoXml;

        $detalle .= ' <detalle>
                        <codigoInterno>ECO'.$detalle4[$i][5].'</codigoInterno>
                        <codigoAdicional>ECO'.$detalle4[$i][5].'</codigoAdicional> 
                        <descripcion>'.$detalle4[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle4[$i][2].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle5); $i++) { 
        $descuentoXml = ($detalle5[$i][2] * $detalle5[$i][3]) / 100;
        $subtotalXml = $detalle5[$i][2];
        $resta = $subtotalXml - $descuentoXml;
                         
        $detalle .= ' <detalle>
                        <codigoInterno>TOMO'.$detalle5[$i][5].'</codigoInterno>
                        <codigoAdicional>TOMO'.$detalle5[$i][5].'</codigoAdicional> 
                        <descripcion>'.$detalle5[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle5[$i][2].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }

$string = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<notaCredito xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:noNamespaceSchemaLocation="../xml/notaCredito.xsd" id="comprobante" version="1.1.0">
    <infoTributaria>
        <ambiente>$ambiente</ambiente>
        <tipoEmision>1</tipoEmision>
        <razonSocial>$nombre</razonSocial>
        <nombreComercial>$nombre</nombreComercial>
        <ruc>$ruc</ruc>
        <claveAcceso>$claveAcceso</claveAcceso>
        <codDoc>04</codDoc>
        <estab>$establecimiento</estab>
        <ptoEmi>$punto</ptoEmi>
        <secuencial>$secuencial</secuencial>
        <dirMatriz>$direccion</dirMatriz>
        <agenteRetencion>00000001</agenteRetencion>
    </infoTributaria>
    <infoNotaCredito>
        <fechaEmision>$fecha</fechaEmision>
        <dirEstablecimiento>$direccion</dirEstablecimiento>    
        <tipoIdentificacionComprador>$tipoIdentificacionComprador</tipoIdentificacionComprador>        
        <razonSocialComprador>$comprador</razonSocialComprador>
        <identificacionComprador>$identificacionComprador</identificacionComprador>
        
        <obligadoContabilidad>SI</obligadoContabilidad>
        <codDocModificado>01</codDocModificado>
        <numDocModificado>$facturaModificada</numDocModificado>
        <fechaEmisionDocSustento>$fechaFactura</fechaEmisionDocSustento>
        <totalSinImpuestos>$total</totalSinImpuestos>
        <valorModificacion>$total</valorModificacion>
        <moneda>DOLAR</moneda>  
        <totalConImpuestos>
            <totalImpuesto>
                <codigo>2</codigo>
                <codigoPorcentaje>0</codigoPorcentaje>                
                <baseImponible>$total</baseImponible>                
                <valor>00.00</valor>
            </totalImpuesto>
        </totalConImpuestos>   

        <motivo>$observacion</motivo>
    </infoNotaCredito>
    
         
    
    <detalles>
           $detalle
    </detalles>
    <infoAdicional>
      <campoAdicional nombre="Direccion">$direccionComprador</campoAdicional> 
      <campoAdicional nombre="email">$correo</campoAdicional> 
      <campoAdicional nombre="Nota">$paciente</campoAdicional> 
    </infoAdicional>
     
</notaCredito>

XML;

$xml = new SimpleXMLElement($string);
  
 


 $xml->asXML('../facturas/'.$claveAcceso.'.xml');


$xmlFirmar = "../facturas/".$claveAcceso.".xml";
$certificado = "../facturas/0992894512001.p12";
$clave="FEisabel2022";
$rutaFirmados="../Firmados/";
$nombreXml=$claveAcceso.".xml";

$parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;

$respuestajava = shell_exec('java -jar "../java/FirmaXades.jar" '.$parametros);

 $filename = '../Firmados/'.$claveAcceso.'.xml'; 
 $byte_array = file_get_contents($filename);
 $valores =  array('binario' => base64_encode($byte_array),
                   'clave'=>$claveAcceso,
                   'java'=>$respuestajava);

 $datos = array("autorizada"=>'N',
                "clave_sri"=>$claveAcceso);

  $dao= new Dao();
  
  $dao->Modificar("nc_consulta",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
  echo json_encode($valores, JSON_FORCE_OBJECT);   

  }
  
    if($_POST['Requerimiento'] == "CrearXMLNCFarmacia"){
      
      $dao = new Dao();

      $dao->Campo("razon_social","");
      $dao->Campo("ruc","");
      $dao->Campo("direccion","");
      $dao->Campo("telefono","");
      $dao->Campo("correo1","");

      $dao->Tabla("empresa","");
      $dao->Where("id","2","");

      $respuesta =$dao->Consultar();


      $nombre = '';
      $ruc = '';
      $direccion = '';
      $telefono = '';
      $cabecera = null;
      $correoEmpresa = '';
      $observacion = 'DEVOLUCION';
      foreach ($respuesta as $row => $item){      
        $nombre = $item[0];
        $ruc = $item[1];
        $direccion = $item[2];
        $telefono = $item[3];
        $correoEmpresa = $item[4];
        
        $cabecera = $item;

      }
      $cabecera[4]=$_POST['Cedula'];
      $cabecera[5]=$_POST['Cliente'];
      $cabecera[6]=$_POST['DireccionC'];

      $cabecera[7]=$_POST['Subtotal'];
      $cabecera[8]=0.0;
      $cabecera[9]=$_POST['Subtotal'];
      $cabecera[10]=$_POST['DesctoTotal'];

      $cabecera[11]=$_POST['Paciente'];
      $cabecera[12]=$_POST['Correo'];
      $cabecera[13]=$correoEmpresa;       

      $detalle1 = json_decode($_POST['Productos'],true);
      
      $establecimiento = substr(str_replace("-","",$_POST['Numero']),0,3);
      $punto = substr(str_replace("-","",$_POST['Numero']),3,3);
      $secuencial = substr(str_replace("-","",$_POST['Numero']),6);
      $fecha = date("d/m/Y");
      $comprador = $cabecera[5];
      $direccionComprador =$cabecera[6];
      $subtotal = $cabecera[7];
      $iva = $cabecera[8];
      $total = $cabecera[9];
      $descuento = $cabecera[10];
      $detalle = '';
      $paciente = $cabecera[11];
      $correo = $cabecera[12];
      $facturaModificada = $_POST['Factura'];
      $fechaFactura= date_format(date_create($_POST['FechaFactura']),"d/m/Y"); 

      $claveAcceso = date("dmY")."04".$ruc.$ambiente.$establecimiento.$punto.$secuencial."41261533"."1";
      $digitoVerificador=-1;

      $arrayClave = str_split($claveAcceso);

      $arrayMultiplicacion = array();

      $arrayMultiplicacion[0]=$arrayClave[0] * 7;
      $arrayMultiplicacion[1]=$arrayClave[1] * 6;
      $arrayMultiplicacion[2]=$arrayClave[2] * 5;
      $arrayMultiplicacion[3]=$arrayClave[3] * 4;
      $arrayMultiplicacion[4]=$arrayClave[4] * 3;
      $arrayMultiplicacion[5]=$arrayClave[5] * 2;

      $arrayMultiplicacion[6]=$arrayClave[6] * 7;
      $arrayMultiplicacion[7]=$arrayClave[7] * 6;
      $arrayMultiplicacion[8]=$arrayClave[8] * 5;
      $arrayMultiplicacion[9]=$arrayClave[9] * 4;
      $arrayMultiplicacion[10]=$arrayClave[10] * 3;
      $arrayMultiplicacion[11]=$arrayClave[11] * 2;

      $arrayMultiplicacion[12]=$arrayClave[12] * 7;
      $arrayMultiplicacion[13]=$arrayClave[13] * 6;
      $arrayMultiplicacion[14]=$arrayClave[14] * 5;
      $arrayMultiplicacion[15]=$arrayClave[15] * 4;
      $arrayMultiplicacion[16]=$arrayClave[16] * 3;
      $arrayMultiplicacion[17]=$arrayClave[17] * 2;

      $arrayMultiplicacion[18]=$arrayClave[18] * 7;
      $arrayMultiplicacion[19]=$arrayClave[19] * 6;
      $arrayMultiplicacion[20]=$arrayClave[20] * 5;
      $arrayMultiplicacion[21]=$arrayClave[21] * 4;
      $arrayMultiplicacion[22]=$arrayClave[22] * 3;
      $arrayMultiplicacion[23]=$arrayClave[23] * 2;

      $arrayMultiplicacion[24]=$arrayClave[24] * 7;
      $arrayMultiplicacion[25]=$arrayClave[25] * 6;
      $arrayMultiplicacion[26]=$arrayClave[26] * 5;
      $arrayMultiplicacion[27]=$arrayClave[27] * 4;
      $arrayMultiplicacion[28]=$arrayClave[28] * 3;
      $arrayMultiplicacion[29]=$arrayClave[29] * 2;

      $arrayMultiplicacion[30]=$arrayClave[30] * 7;
      $arrayMultiplicacion[31]=$arrayClave[31] * 6;
      $arrayMultiplicacion[32]=$arrayClave[32] * 5;
      $arrayMultiplicacion[33]=$arrayClave[33] * 4;
      $arrayMultiplicacion[34]=$arrayClave[34] * 3;
      $arrayMultiplicacion[35]=$arrayClave[35] * 2;

      $arrayMultiplicacion[36]=$arrayClave[36] * 7;
      $arrayMultiplicacion[37]=$arrayClave[37] * 6;
      $arrayMultiplicacion[38]=$arrayClave[38] * 5;
      $arrayMultiplicacion[39]=$arrayClave[39] * 4;
      $arrayMultiplicacion[40]=$arrayClave[40] * 3;
      $arrayMultiplicacion[41]=$arrayClave[41] * 2;

      $arrayMultiplicacion[42]=$arrayClave[42] * 7;
      $arrayMultiplicacion[43]=$arrayClave[43] * 6;
      $arrayMultiplicacion[44]=$arrayClave[44] * 5;
      $arrayMultiplicacion[45]=$arrayClave[45] * 4;
      $arrayMultiplicacion[46]=$arrayClave[46] * 3;
      $arrayMultiplicacion[47]=$arrayClave[47] * 2;

      $sumaClave = 0;
      foreach ($arrayMultiplicacion as $valor) {
        $sumaClave =$sumaClave + $valor;
      }
      $mod = fmod($sumaClave, 11);
      $digitoVerificador = 11 - $mod;
      if($digitoVerificador==11){
        $digitoVerificador = 0;
      }
      if($digitoVerificador==10){
        $digitoVerificador = 1;
      }
      $claveAcceso = $claveAcceso.$digitoVerificador;
      $direccionPaciente = $direccionComprador;

      $tipoIdentificacionComprador = "05";
      $identificacionComprador=$cabecera[4];
      if(strlen($cabecera[4])==13){
        $tipoIdentificacionComprador = "04";
      }
      if($cabecera[4]=='9999999999'){
        $direccionPaciente = $direccion;
        $identificacionComprador='9999999999999';
        $tipoIdentificacionComprador = "07";
        $correo =  $cabecera[12];
      }
      if($_POST["TipoIde"] == '2'){
        $tipoIdentificacionComprador = "06";           
      }
      if($correo==""){
        $correo="----";
      }
      if($direccionComprador==""){
        $direccionComprador="----";
      }
      $totalConIva=0;
      $totalSinIva=0;
      for($i=0; $i<sizeof($detalle1); $i++) {       

        $iva = 0;
        $codigo=0;
        $tarifa=0;
        
        $descuentoXml = ($detalle1[$i][5] * $detalle1[$i][4]) / 100;
        $subtotalXml = $detalle1[$i][5];
        $resta = $subtotalXml - $descuentoXml;
        if($detalle1[$i][7]=='S'){
          $iva = $resta * 0.12;
          $codigo=2;
          $tarifa=12;
          $totalConIva = $totalConIva + $detalle1[$i][5];
        }else{
          $totalSinIva = $totalSinIva + $detalle1[$i][5];
        }             
        $detalle .= ' <detalle>
                        <codigoInterno>'.$detalle1[$i][6].'</codigoInterno>
                        <codigoAdicional>'.$detalle1[$i][6].'</codigoAdicional> 
                        <descripcion>'.$detalle1[$i][0].'</descripcion>                        
                        <cantidad>'.$detalle1[$i][2].'</cantidad>
                        <precioUnitario>'.$detalle1[$i][3].'</precioUnitario>
                        
                        <descuento>'.number_format($descuentoXml, 2, '.', '').'</descuento>
                        <precioTotalSinImpuesto>'.number_format($resta, 2, '.', '').'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>'.$codigo.'</codigoPorcentaje>
                                <tarifa>'.$tarifa.'</tarifa>
                                <baseImponible>'.number_format($resta, 2, '.', '').'</baseImponible>
                                <valor>'.number_format($iva, 2, '.', '').'</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';

      }
      $xmlTotalConIva = '';
      $xmlTotalSinIva = '';

      if($totalConIva>0){
        $iva = $totalConIva * 0.12;
        $xmlTotalConIva = ' <totalImpuesto>
                              <codigo>2</codigo> 
                              <codigoPorcentaje>2</codigoPorcentaje> 
                              <baseImponible>'.number_format($totalConIva, 2, '.', '').'</baseImponible> 
                              <valor>'.number_format($iva, 2, '.', '').'</valor> 
                            </totalImpuesto>
                           
                           ';
      }
      if($totalSinIva>0){
        
        $xmlTotalSinIva = ' <totalImpuesto>
                              <codigo>2</codigo> 
                              <codigoPorcentaje>0</codigoPorcentaje> 
                              <baseImponible>'.number_format($totalSinIva, 2, '.', '').'</baseImponible> 
                              <valor>0.00</valor> 
                            </totalImpuesto>
                           
                           ';
      }
      $xmlTotalConImpuestos = $xmlTotalConIva.$xmlTotalSinIva;
      $total = $totalSinIva + ($totalConIva * 1.12); 
      $total = number_format($total, 2, '.', '');     
      

$string = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<notaCredito xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:noNamespaceSchemaLocation="../xml/notaCredito.xsd" id="comprobante" version="1.1.0">
    <infoTributaria>
        <ambiente>$ambiente</ambiente>
        <tipoEmision>1</tipoEmision>
        <razonSocial>$nombre</razonSocial>
        <nombreComercial>$nombre</nombreComercial>
        <ruc>$ruc</ruc>
        <claveAcceso>$claveAcceso</claveAcceso>
        <codDoc>04</codDoc>
        <estab>$establecimiento</estab>
        <ptoEmi>$punto</ptoEmi>
        <secuencial>$secuencial</secuencial>
        <dirMatriz>$direccion</dirMatriz>
        <agenteRetencion>00000001</agenteRetencion>
    </infoTributaria>
    <infoNotaCredito>
        <fechaEmision>$fecha</fechaEmision>
        <dirEstablecimiento>$direccion</dirEstablecimiento>    
        <tipoIdentificacionComprador>$tipoIdentificacionComprador</tipoIdentificacionComprador>        
        <razonSocialComprador>$comprador</razonSocialComprador>
        <identificacionComprador>$identificacionComprador</identificacionComprador>
        
        <obligadoContabilidad>SI</obligadoContabilidad>
        <codDocModificado>01</codDocModificado>
        <numDocModificado>$facturaModificada</numDocModificado>
        <fechaEmisionDocSustento>$fechaFactura</fechaEmisionDocSustento>
        <totalSinImpuestos>$total</totalSinImpuestos>
        <valorModificacion>$total</valorModificacion>
        <moneda>DOLAR</moneda>  
        <totalConImpuestos>
           $xmlTotalConImpuestos
        </totalConImpuestos>   

        <motivo>$observacion</motivo>
    </infoNotaCredito>
    
         
    
    <detalles>
           $detalle
    </detalles>
    <infoAdicional>
      <campoAdicional nombre="Direccion">$direccionComprador</campoAdicional> 
      <campoAdicional nombre="email">$correo</campoAdicional> 
      <campoAdicional nombre="Nota">$paciente</campoAdicional> 
    </infoAdicional>
     
</notaCredito>

XML;

$xml = new SimpleXMLElement($string);
  
 


 $xml->asXML('../farmacia/'.$claveAcceso.'.xml');


$xmlFirmar = "../farmacia/".$claveAcceso.".xml";
$certificado = "../facturas/0992894512001.p12";
$clave="FEisabel2022";
$rutaFirmados="../Firmados/";
$nombreXml=$claveAcceso.".xml";

$parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;

$respuestajava = shell_exec('java -jar "../java/FirmaXades.jar" '.$parametros);

 

 $filename = '../Firmados/'.$claveAcceso.'.xml'; 
 $byte_array = file_get_contents($filename);
 $valores =  array('binario' => base64_encode($byte_array),
                   'clave'=>$claveAcceso,
                   'java'=>$respuestajava);

 $datos = array("autorizada"=>'N',
                "clave_sri"=>$claveAcceso);

  $dao= new Dao();
  
  $dao->Modificar("nc_farmacia",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
  echo json_encode($valores, JSON_FORCE_OBJECT);   

  }


}
