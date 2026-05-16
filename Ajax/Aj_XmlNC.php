<?php

session_start();
date_default_timezone_set('America/Guayaquil');
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){


   if($_POST['Requerimiento'] == "CrearXMLNC"){
      
      $dao = new Dao();

      $dao->Campo("e.razon_social","");
      $dao->Campo("e.ruc","");
      $dao->Campo("e.direccion","");
      $dao->Campo("e.telefono","");
      $dao->Campo("e.correo1","");
      $dao->Campo("nc.observacion","");

      $dao->TablasInnerAlias("empresa","e" , "nc_consulta","nc" );
      $dao->Where("e.id","2","");

      $respuesta =$dao->Consultar();

      $nombre = '';
      $ruc = '';
      $direccion = '';
      $telefono = '';
      $cabecera = null;
      $correoEmpresa = '';
      $observacion = '';
      foreach ($respuesta as $row => $item){      
        $nombre = $item[0];
        $ruc = $item[1];
        $direccion = $item[2];
        $telefono = $item[3];
        $correoEmpresa = $item[4];
        $observacion = $item[5];
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
      $secuencial = '00'.substr(str_replace("-","",$_POST['Numero']),6);
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

      $claveAcceso = date("dmY")."01".$ruc."1".$establecimiento.$punto.$secuencial."41261533"."1";
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
      
      for($i=0; $i<sizeof($detalle1); $i++) {                    
        $detalle .= ' <detalle>
                        <codigoPrincipal>CON'.$detalle1[$i][8].'</codigoPrincipal>
                        <codigoAuxiliar>CON'.$detalle1[$i][8].'</codigoAuxiliar> 
                        <descripcion>'.$detalle1[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle1[$i][3].'</precioUnitario>
                        
                        <descuento>'.$detalle1[$i][4].'</descuento>
                        <precioTotalSinImpuesto>'.$detalle1[$i][5].'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.$detalle1[$i][5].'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle2); $i++) {                    
        $detalle .= ' <detalle>
                        <codigoPrincipal>LAB'.$detalle2[$i][5].'</codigoPrincipal>
                        <codigoAuxiliar>LAB'.$detalle2[$i][5].'</codigoAuxiliar> 
                        <descripcion>'.$detalle2[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle2[$i][2].'</precioUnitario>
                        
                        <descuento>'.$detalle2[$i][3].'</descuento>
                        <precioTotalSinImpuesto>'.$detalle2[$i][4].'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.$detalle2[$i][4].'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle3); $i++) {                    
        $detalle .= ' <detalle>
                        <codigoPrincipal>RX'.$detalle3[$i][5].'</codigoPrincipal>
                        <codigoAuxiliar>RX'.$detalle3[$i][5].'</codigoAuxiliar> 
                        <descripcion>'.$detalle3[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle3[$i][2].'</precioUnitario>
                        
                        <descuento>'.$detalle3[$i][3].'</descuento>
                        <precioTotalSinImpuesto>'.$detalle3[$i][4].'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.$detalle3[$i][4].'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle4); $i++) {                    
        $detalle .= ' <detalle>
                        <codigoPrincipal>ECO'.$detalle4[$i][5].'</codigoPrincipal>
                        <codigoAuxiliar>ECO'.$detalle4[$i][5].'</codigoAuxiliar> 
                        <descripcion>'.$detalle4[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle4[$i][2].'</precioUnitario>
                        
                        <descuento>'.$detalle4[$i][3].'</descuento>
                        <precioTotalSinImpuesto>'.$detalle4[$i][4].'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.$detalle4[$i][4].'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }
      for($i=0; $i<sizeof($detalle5); $i++) {                    
        $detalle .= ' <detalle>
                        <codigoPrincipal>TOMO'.$detalle5[$i][5].'</codigoPrincipal>
                        <codigoAuxiliar>TOMO'.$detalle5[$i][5].'</codigoAuxiliar> 
                        <descripcion>'.$detalle5[$i][0].'</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>'.$detalle5[$i][2].'</precioUnitario>
                        
                        <descuento>'.$detalle5[$i][3].'</descuento>
                        <precioTotalSinImpuesto>'.$detalle5[$i][4].'</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>'.$detalle5[$i][4].'</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
      }

$string = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<factura xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:noNamespaceSchemaLocation="../xml/factura.xsd" id="comprobante" version="2.1.0">
    <infoTributaria>
        <ambiente>2</ambiente>
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
    </infoTributaria>
    <infoNotaCredito>
        <fechaEmision>$fecha</fechaEmision>
        <dirEstablecimiento>$direccion</dirEstablecimiento>    
        <tipoIdentificacionComprador>$tipoIdentificacionComprador</tipoIdentificacionComprador>        
        <razonSocialComprador>$comprador</razonSocialComprador>
        <identificacionComprador>$identificacionComprador</identificacionComprador>
        
        <obligadoContabilidad>SI</obligadoContabilidad>
        <codDocModificado>01</codDocModificado>
        <numDocModificado>002-001-000000001</numDocModificado>
        <fechaEmisionDocSustento>21/10/2011</fechaEmisionDocSustento>
        <totalSinImpuestos>295000.00</totalSinImpuestos>
        <valorModificacion>346920.00</valorModificacion>
        <moneda>DOLAR</moneda>   .
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
     
</factura>

XML;

$xml = new SimpleXMLElement($string);
  
 


 $xml->asXML('../facturas/'.$claveAcceso.'.xml');

$xmlFirmar = "//CONTABLE-PC//htdocs//galenos//facturas//".$claveAcceso.".xml";
$certificado = "//CONTABLE-PC//htdocs//galenos//facturas//0992894512001.p12";
$clave="FUNSISAmp3108";
$rutaFirmados="//CONTABLE-PC//htdocs//galenos//Firmados//";
$nombreXml=$claveAcceso.".xml";

$parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;


$respuestajava = shell_exec('java -jar "//CONTABLE-PC//htdocs//galenos//java//FirmaXades.jar" '.$parametros);

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
  
}
