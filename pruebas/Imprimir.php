<?php
session_start();
date_default_timezone_set('America/Guayaquil');
require_once __DIR__ . '/autoload.php';
//require_once "autoloadAjax.php";
//require_once('lib/nusoap.php');
use Esculapio\Escpos\Printer;
use Esculapio\Escpos\EscposImage;
use Esculapio\Escpos\PrintConnectors\WindowsPrintConnector;
use Esculapio\Escpos\CapabilityProfile;
use Esculapio\Escpos\PrintConnectors\NetworkPrintConnector;

/*class Imprimir{

  public function CargarReciboAbono($consecutivo,$referencia,$cliente,$cedula,$direccionC,$telefonoC,$correo,$valor,$saldo){
    mb_internal_encoding("UTF-8");
    try {
///////////////////////////////DATOS DE LA EMPRESA//////////////////////////////////
      $dao = new Dao();

      $dao->Campo("razon_social","");
      $dao->Campo("ruc","");
      $dao->Campo("direccion","");
      $dao->Campo("telefono","");

      $dao->Tabla("empresa","");
      $dao->Where("id","2","");

      $respuesta =$dao->Consultar();

      $nombre = '';
      $ruc = '';
      $direccion = '';
      $telefono = '';

      foreach ($respuesta as $row => $item){      
        $nombre = $item[0];
        $ruc = $item[1];
        $direccion = $item[2];
        $telefono = $item[3];
      }
  ///////////////////////////////FIN DATOS DE LA EMPRESA//////////////////////////////////
      $centrar = Printer::JUSTIFY_CENTER;
      $izquierda = Printer::JUSTIFY_LEFT;
      $derecha = Printer::JUSTIFY_RIGHT;
      $tamano = Printer::FONT_B;*/

///////////////////////////////CABECERA DE LA FACTURA//////////////////////////////////      

      
      $emision = date("Y-m-d H:i:s");            
  ///////////////////////////////FIN CABECERA DE LA FACTURA//////////////////////////////////  

  ///////////////////////////////DETALLE DE LA FACTURA//////////////////////////////////   

      $cajero = $_SESSION["usuario"];
      //$path = dirname(__FILE__).'/Avenger.png'; //exit($path);
        //$img_logo = EscposImage::load( $path, false); //exit(var_dump($img_logo));

      $connector = new WindowsPrintConnector("smb://".$_SESSION["impresora"]);

        
      //$profile = CapabilityPr1ofile::load("simple");
      $printer = new Printer($connector);

      $printer->initialize();
          
      //$printer->setJustification($centrar);
          
      /*$printer->setFont($tamano);
      $printer->text($nombre."\n");
      $printer->setJustification($centrar);
      $printer->text("R.U.C. ".$ruc."\n");
      $printer->text("Direccion: ".$direccion."\n");
      $printer->text("Telefono: ".$telefono."\n");
      $printer->text("\n");
      $printer->setFont();
      $printer->setTextSize(1, 1);*/
      $printer->text("COMPROBANTE DE RECIBO\n");
      /*$printer->setJustification($izquierda);
      $printer->text("TRANSACCION ".$consecutivo."\n");
      $printer->text("Doc. de Referencia ".$referencia."\n");
      $printer->text("Emision : ".$emision."\n");
      $printer->text("Cliente : ".$cliente."\n");
      $printer->text("Ced-Ruc : ".$cedula."\n");
      $printer->text("Direcc. : ".$direccionC."\n");
      $printer->text("Telefono: ".$telefonoC."\n");
      $printer->text("Correo  : ".$correo."\n");
      $printer->setFont($tamano); 
      $printer->text("TOTAL RECIBIDO :    $".$valor.".00 \n");
      $printer->text("TOTAL SALDO :      $".$saldo." \n");
      $printer->text("Usuario : ".$cajero." \n");
      $printer->setFont($tamano);
      $printer->setJustification($derecha);
      $printer->text("Software desarrollado por Arthan\n");*/

      $printer->feed();

      $printer->cut();

      $printer->pulse();

      $printer->close();

    /*} catch (Exception $e) {
      echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
    }
  }
}

if($_POST['Requerimiento'] == "ImprimirRecibo"){
  $impresion = new Con_Impresion_Recibo();
  $impresion->CargarReciboAbono($_POST['Consecutivo'],$_POST['Referencia'],$_POST['Cliente'],$_POST['Cedula'],$_POST['DireccionC'],$_POST['TelefonoC'],$_POST['Correo'],$_POST['Valor'],$_POST['Saldo']);
}*/