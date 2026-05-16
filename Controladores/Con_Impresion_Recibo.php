<?php
session_start();
date_default_timezone_set('America/Guayaquil');
require_once __DIR__ . '/autoload.php';
require_once "autoloadAjax.php";
//require_once('lib/nusoap.php');
use Esculapio\Escpos\Printer;
use Esculapio\Escpos\EscposImage;
use Esculapio\Escpos\PrintConnectors\WindowsPrintConnector;
//use Esculapio\Escpos\CapabilityProfile;
use Esculapio\Escpos\PrintConnectors\NetworkPrintConnector;

class Con_Impresion_Recibo{

  public function CargarReciboAbono($consecutivo,$referencia,$cliente,$cedula,$direccionC,$telefonoC,$correo,$valor,$saldo,$tipo){
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
      $tamano = Printer::FONT_B;

///////////////////////////////CABECERA DE LA FACTURA//////////////////////////////////      

      
      $emision = date("Y-m-d H:i:s");            
  ///////////////////////////////FIN CABECERA DE LA FACTURA//////////////////////////////////  

  ///////////////////////////////DETALLE DE LA FACTURA//////////////////////////////////   

      $cajero = $_SESSION["usuario"];
      //$path = dirname(__FILE__).'/Avenger.png'; //exit($path);
        //$img_logo = EscposImage::load( $path, false); //exit(var_dump($img_logo));

      $connector = new WindowsPrintConnector("smb://".$_SESSION["impresora"]);

        
      //$profile = CapabilityPr1ofile::load("simple");
      $printer = new Printer($connector/*,$profile*/);

      $printer->initialize();
          
      $printer->setJustification($centrar);
          
      $printer->setFont($tamano);
      $printer->text($nombre."\n");
      $printer->setJustification($centrar);
      $printer->text("R.U.C. ".$ruc."\n");
      $printer->text("Direccion: ".$direccion."\n");
      $printer->text("Telefono: ".$telefono."\n");
      $printer->text("\n");
      $printer->setFont();
      $printer->setTextSize(1, 1);
      if($tipo == 'anticipo'){
        $printer->text("I.C. ANTICIPO RECIBIDO\n");
      }else{
        $printer->text("I.C. LIQ. CUENTA POR COBRAR\n");
      }
      $printer->setJustification($izquierda);
      $printer->text("TRANSACCION ".$consecutivo."\n");
      if($tipo != 'anticipo'){
        $printer->text("Doc. de Referencia ".$referencia."\n");
      }
      $printer->text("Emision : ".$emision."\n");
      $printer->text("Cliente : ".$cliente."\n");
      $printer->text("Ced-Ruc : ".$cedula."\n");
      $printer->text("Direcc. : ".$direccionC."\n");
      $printer->text("Telefono: ".$telefonoC."\n");
      $printer->text("Correo  : ".$correo."\n");
      $printer->setFont($tamano); 
      $printer->text("TOTAL RECIBIDO :    $".$valor." \n");
      if($tipo != 'anticipo'){
        $printer->text("TOTAL SALDO :      $".$saldo." \n");
      }
      $printer->text("Usuario : ".$cajero." \n\n");
      $printer->setJustification($derecha);
      $printer->text("Software desarrollado por Arthan\n");

      $printer->feed();

      $printer->cut();

      $printer->pulse();

      $printer->close();
      $responde=true;
      echo json_encode($responde);

    } catch (Exception $e) {
      echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
    }
  }

  public function CargarReciboEgreso($consecutivo,$referencia,$cliente,$cedula,$direccionC,$telefonoC,$correo,$valor){
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
      $tamano = Printer::FONT_B;

///////////////////////////////CABECERA DE LA FACTURA//////////////////////////////////      

      
      $emision = date("Y-m-d H:i:s");            
  ///////////////////////////////FIN CABECERA DE LA FACTURA//////////////////////////////////  

  ///////////////////////////////DETALLE DE LA FACTURA//////////////////////////////////   

      $cajero = $_SESSION["usuario"];
      //$path = dirname(__FILE__).'/Avenger.png'; //exit($path);
        //$img_logo = EscposImage::load( $path, false); //exit(var_dump($img_logo));

      $connector = new WindowsPrintConnector("smb://".$_SESSION["impresora"]);

        
      //$profile = CapabilityPr1ofile::load("simple");
      $printer = new Printer($connector/*,$profile*/);

      $printer->initialize();
          
      $printer->setJustification($centrar);
          
      $printer->setFont($tamano);
      $printer->text($nombre."\n");
      $printer->setJustification($centrar);
      $printer->text("R.U.C. ".$ruc."\n");
      $printer->text("Direccion: ".$direccion."\n");
      $printer->text("Telefono: ".$telefono."\n");
      $printer->text("\n");
      $printer->setFont();
      $printer->setTextSize(1, 1);
      $printer->text("EGRESO DE CAJA\n");
      $printer->setJustification($izquierda);
      $printer->text("TRANSACCION ".$consecutivo."\n");
      $printer->text("Doc. de Referencia ".$referencia."\n");
      $printer->text("Emision : ".$emision."\n");
      $printer->text("Cliente : ".$cliente."\n");
      $printer->text("Ced-Ruc : ".$cedula."\n");
      $printer->text("Direcc. : ".$direccionC."\n");
      $printer->text("Telefono: ".$telefonoC."\n");
      $printer->text("Correo  : ".$correo."\n");
      $printer->setFont($tamano); 
      $printer->text("TOTAL ENTREGADO :    $".$valor." \n");
      $printer->text("Usuario : ".$cajero." \n\n");
      $printer->setJustification($derecha);

      $printer->text("----------------------          \n");
      $printer->text("        CLIENTE                  \n\n");
      $printer->text("Software desarrollado por Arthan\n");

      $printer->feed();

      $printer->cut();

      $printer->pulse();

      $printer->close();
      $responde=true;
      echo json_encode($responde);

    } catch (Exception $e) {
      echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
    }
  }

  public function CargarReciboCuadre($productos,$productos1,$productos2,$productos3,$productos4,$productos5,$productos6,$productos7,$productos8,$productos9,$nAvance,$vAvance,$nAnticipoR,$vAnticipoR,$nAbonos,$vAbonos,$nAnticipoD,$vAnticipoD,$nCuenta,$vCuenta,$nNota,$vNota,$nEgresos,$vEgresos,$nTarjeta,$vTarjeta,$nCheque,$vCheque,$nTransferencia,$vTranferencia,$fechaFondo,$vFondo,$vEfectivo,$efectivoCd,$diferencia,$totalDinero){
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
      $tamano = Printer::FONT_B;

///////////////////////////////CABECERA DE LA FACTURA//////////////////////////////////      
      $cajero = $_SESSION["nombres"];
      
      $emision = date("Y-m-d H:i");            
  ///////////////////////////////FIN CABECERA DE LA FACTURA//////////////////////////////////  

      $detalle = json_decode($productos,true);
      $detalle1 = json_decode($productos1,true);
      $detalle2 = json_decode($productos2,true);
      $detalle3 = json_decode($productos3,true);
      $detalle4 = json_decode($productos4,true);
      $detalle5 = json_decode($productos5,true);
      $detalle6 = json_decode($productos6,true);
      $detalle7 = json_decode($productos7,true);
      $detalle8 = json_decode($productos8,true);
      $detalle9 = json_decode($productos9,true);
  ///////////////////////////////DETALLE DE LA FACTURA//////////////////////////////////   

      $cajero = $_SESSION["nombres"];
      //$path = dirname(__FILE__).'/Avenger.png'; //exit($path);
        //$img_logo = EscposImage::load( $path, false); //exit(var_dump($img_logo));

      $connector = new WindowsPrintConnector("smb://".$_SESSION["impresora"]);

        
      //$profile = CapabilityPr1ofile::load("simple");
      $printer = new Printer($connector/*,$profile*/);

      $printer->initialize();
          
      $printer->setJustification($centrar);
          
      $printer->setFont($tamano);
      $printer->text($nombre."\n");
      $printer->setJustification($centrar);
      $printer->text("R.U.C. ".$ruc."\n");
      $printer->text("Direccion: ".$direccion."\n");
      $printer->text("Telefono: ".$telefono."\n");
      $printer->text("\n");
      $printer->setFont();
      $printer->setTextSize(1, 1);
      $printer->text("CUADRE DE CAJA DIARIO - ".$emision."\n");
      $printer->setJustification($izquierda);
      $printer->setFont($tamano);
      $printer->text("--------------------------------------------------------\n");
      $printer->text("FONDO DE CAJA      ".$fechaFondo."          ".$vFondo."\n");
      $printer->text("--------------------------------------------------------\n");
      $printer->text("ANTICIPOS RECIBIDOS       ".$nAnticipoR."                   ".$vAnticipoR."\n");
      if(sizeof($detalle1)>0){
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("NUMERO                     TOTAL              FORMA PAGO\n");
        for($i=0; $i<sizeof($detalle1); $i++) {
          $linea1 = $detalle1[$i][0]."            $".round($detalle1[$i][1],2)."                      $".$detalle1[$i][2];
          $printer->text($linea1."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("LIQ. CUENTAS X COBRAR     ".$nAbonos."                   ".$vAbonos."\n");
      if(sizeof($detalle2)>0){
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("NUMERO                     TOTAL              FORMA PAGO\n");
        for($i=0; $i<sizeof($detalle2); $i++) {
          $linea2 = $detalle2[$i][0]."            $".round($detalle2[$i][1],2)."                      $".$detalle2[$i][2];
          $printer->text($linea2."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("AVANCES                   ".$nAvance."                   ".$vAvance."\n");
      if(sizeof($detalle)>0){
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("FECHA-HORA                                         TOTAL\n");
        for($i=0; $i<sizeof($detalle); $i++) {
          $linea = $detalle[$i][0]."                               $".round($detalle[$i][1],2);
          $printer->text($linea."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("CUENTAS X COBRAR          ".$nCuenta."                   ".$vCuenta."\n");
      if(sizeof($detalle4)>0){  
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("NUMERO                     TOTAL                  PAGADO\n");
        for($i=0; $i<sizeof($detalle4); $i++) {  
          $linea4 = $detalle4[$i][0]."            $".round($detalle4[$i][1],2)."                      $".$detalle4[$i][2];
          $printer->text($linea4."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("ANTICIPOS DEVENGADOS      ".$nAnticipoD."                   ".$vAnticipoD."\n");
      if(sizeof($detalle3)>0){
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("NUMERO                     TOTAL                  PAGADO\n");
        for($i=0; $i<sizeof($detalle3); $i++) {
          $linea3 = $detalle3[$i][0]."            $".round($detalle3[$i][1],2)."                      $".$detalle3[$i][2];
          $printer->text($linea3."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("NOTAS DE CREDITO          ".$nNota."                   ".$vNota."\n");
      if(sizeof($detalle5)>0){
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("NUMERO NC                NUMERO FC                 TOTAL\n");
        for($i=0; $i<sizeof($detalle5); $i++) {
          $linea5 = $detalle5[$i][0]."       ".$detalle5[$i][1]."               $".$detalle5[$i][2];
          $printer->text($linea5."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("EGRESOS DE CAJA           ".$nEgresos."                   ".$vEgresos."\n");
      if(sizeof($detalle6)>0){  
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("NUMERO                     TOTAL              FORMA PAGO\n");
        for($i=0; $i<sizeof($detalle6); $i++) {
          $linea6 = $detalle6[$i][0]."            $".round($detalle6[$i][1],2)."                  ".$detalle6[$i][2];
          $printer->text($linea6."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("CHEQUE                    ".$nCheque."                   ".$vCheque."\n");
      if(sizeof($detalle8)>0){    
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("NUMERO          BANCO               TOTAL         PAGADO\n");
        for($i=0; $i<sizeof($detalle8); $i++) {
          $nombreBanco = $detalle8[$i][1];
          if(strlen($nombreBanco)>17){
            $nombreBanco = substr($nombreBanco,0,17);
          }else{
            $nombreBanco = str_pad($nombreBanco, 17); 
          }
          $linea8 = $detalle8[$i][0]."  ".$nombreBanco."   $".round($detalle8[$i][2],2)."          $".$detalle8[$i][3];
          $printer->text($linea8."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("TARJETA DE CREDITO        ".$nTarjeta."                   ".$vTarjeta."\n");
      if(sizeof($detalle7)>0){    
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("NUMERO          TARJETA             TOTAL         PAGADO\n");
        for($i=0; $i<sizeof($detalle7); $i++) {
          $nombreBanco1 = $detalle7[$i][1];
          if(strlen($nombreBanco1)>17){
            $nombreBanco1 = substr($nombreBanco1,0,17);
          }else{
            $nombreBanco1 = str_pad($nombreBanco1, 17); 
          }
          $linea7 = $detalle7[$i][0]."  ".$nombreBanco1."   $".round($detalle7[$i][2],2)."          $".$detalle7[$i][3];
          $printer->text($linea7."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("TRANFERENCIAS             ".$nTransferencia."                   ".$vTranferencia."\n");
      if(sizeof($detalle9)>0){
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("NUMERO          BANCO               TOTAL         PAGADO\n");
        for($i=0; $i<sizeof($detalle9); $i++) {
          $nombreBanco2 = $detalle9[$i][1];
          if(strlen($nombreBanco2)>17){
            $nombreBanco2 = substr($nombreBanco2,0,17);
          }else{
            $nombreBanco2 = str_pad($nombreBanco2, 17); 
          }
          $linea9 = $detalle9[$i][0]."  ".$nombreBanco2."   $".round($detalle9[$i][2],2)."          $".$detalle9[$i][3];
          $printer->text($linea9."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("EFECTIVO AL CIERRE                              $ ".number_format($vEfectivo, 2, '.', '')."\n");
      $printer->text("--------------------------------------------------------\n");
      $printer->text("CUADRE DEL SISTEMA                              $ ".number_format($totalDinero, 2, '.', '')."\n");
      $printer->text("--------------------------------------------------------\n");
      $printer->text("USUARIO: ".$cajero."\n");
      $printer->text("--------------------------------------------------------\n");
      if(number_format($vEfectivo, 2, '.', '')<number_format($totalDinero, 2, '.', '')){
        $printer->text("SU CAJA ESTA DESCUADRADA, TIENE UN FALTANTE DE $ ".number_format($diferencia, 2, '.', '')."\n\n\n\n\n"); //\nEl Efectivo que deberia tener es $ ".$efectivoCd."\n\n\n\n");
      }
      if(number_format($vEfectivo, 2, '.', '')>number_format($totalDinero, 2, '.', '')){
        $printer->text("SU CAJA ESTA DESCUADRADA, TIENE UN SOBRANTE DE $ ".number_format($diferencia, 2, '.', '')."\n\n\n\n\n"); //\nEl Efectivo que deberia tener es $ ".$efectivoCd."\n\n\n\n");
      }
      if(number_format($vEfectivo, 2, '.', '')==number_format($totalDinero, 2, '.', '')){
        $printer->text("SU CAJA ESTA CUADRADA\n\n\n\n");    
      }
      $printer->text("----------------------          ------------------------\n");
      $printer->text("        CAJERO                         SUPERVISOR \n\n");
      $printer->setJustification($derecha);
      

      $printer->feed();

      $printer->cut();

      $printer->pulse();

      $printer->close();
      $responde=true;
      echo json_encode($responde);

    } catch (Exception $e) {
      echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
    }
  }

  public function CargarReciboAvance($productos,$efectivo,$tipo){
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

      $cajero = $_SESSION["nombres"];

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
      $tamano = Printer::FONT_B;

///////////////////////////////CABECERA DE LA FACTURA//////////////////////////////////      

      
      $emision = date("Y-m-d H:i");            
  ///////////////////////////////FIN CABECERA DE LA FACTURA////////////////////////////////// 

    $detalle = json_decode($productos,true); 
  ///////////////////////////////DETALLE DE LA FACTURA//////////////////////////////////   

      $cajero = $_SESSION["nombres"];
      //$path = dirname(__FILE__).'/Avenger.png'; //exit($path);
        //$img_logo = EscposImage::load( $path, false); //exit(var_dump($img_logo));

      $connector = new WindowsPrintConnector("smb://".$_SESSION["impresora"]);

        
      //$profile = CapabilityPr1ofile::load("simple");
      $printer = new Printer($connector/*,$profile*/);

      $printer->initialize();
          
      $printer->setJustification($centrar);
          
      $printer->setFont($tamano);
      $printer->text($nombre."\n");
      $printer->setJustification($centrar);
      $printer->text("R.U.C. ".$ruc."\n");
      $printer->text("Direccion: ".$direccion."\n");
      $printer->text("Telefono: ".$telefono."\n");
      $printer->text("\n");
      $printer->setFont();
      $printer->setTextSize(1, 1);
      if($tipo=='avance'){
        $printer->text("AVANCE DE CAJA - ".$emision."\n");
      }else{
        $printer->text("FONDO DE CAJA - ".$emision."\n");
      }
      $printer->text("USUARIO - ".$cajero."\n");
      $printer->setJustification($izquierda);
      $printer->setFont($tamano);
      
      if(sizeof($detalle)>0){
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("--------------------------------------------------------\n");
        $printer->text("DENOMINACION             CANTIDAD               TOTAL\n");
        for($i=0; $i<sizeof($detalle); $i++) {
          $linea = $detalle[$i][0]."                       ".$detalle[$i][1]."                 ".$detalle[$i][2];
          $printer->text($linea."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("EFECTIVO - CAJERO                              $ ".$efectivo."\n");
      $printer->text("--------------------------------------------------------\n\n\n\n");
      $printer->text("----------------------          ------------------------\n");
      $printer->text("        CAJERO                         SUPERVISOR \n\n");
      $printer->setJustification($derecha);
      $printer->text("Software desarrollado por Arthan\n");

      $printer->feed();

      $printer->cut();

      $printer->pulse();

      $printer->close();
      $responde=true;
      echo json_encode($responde);

    } catch (Exception $e) {
      echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
    }
  }

  public function CargarReciboArqueo($productos,$efectivo,$efectivoSistema,$diferencia){
    mb_internal_encoding("UTF-8");
    try {

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

      $cajero = $_SESSION["nombres"];

      foreach ($respuesta as $row => $item){      
        $nombre = $item[0];
        $ruc = $item[1];
        $direccion = $item[2];
        $telefono = $item[3];
      }
  
      $centrar = Printer::JUSTIFY_CENTER;
      $izquierda = Printer::JUSTIFY_LEFT;
      $derecha = Printer::JUSTIFY_RIGHT;
      $tamano = Printer::FONT_B;      
      
      $emision = date("Y-m-d H:i");            

      $detalle = json_decode($productos,true); 
   
      $cajero = $_POST["Caja"];
      
      $connector = new WindowsPrintConnector("smb://".$_SESSION["impresora"]);
      
      
      $printer = new Printer($connector);

      $printer->initialize();
          
      $printer->setJustification($centrar);
          
      $printer->setFont($tamano);
      $printer->text($nombre."\n");
      $printer->setJustification($centrar);
      $printer->text("R.U.C. ".$ruc."\n");
      $printer->text("Direccion: ".$direccion."\n");
      $printer->text("Telefono: ".$telefono."\n");
      $printer->text("\n");
      $printer->setFont();
      $printer->setTextSize(1, 1);
      
      $printer->text("ARQUEO DE CAJA - ".$emision."\n");
      
      $printer->text("CAJA - ".$cajero."\n");
      $printer->text("SUPERVISOR - ".$_SESSION["usuario"]."\n");
      $printer->setJustification($izquierda);
      $printer->setFont($tamano);
      
      if(sizeof($detalle)>0){
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("--------------------------------------------------------\n");
        $printer->text("DENOMINACION             CANTIDAD               TOTAL\n");
        for($i=0; $i<sizeof($detalle); $i++) {
          $linea = $detalle[$i][0]."                       ".$detalle[$i][1]."                 ".$detalle[$i][2];
          $printer->text($linea."\n");                   
        }
      }
      $printer->text("--------------------------------------------------------\n");
      $printer->text("EFECTIVO - CAJERO                              $ ".$efectivo."\n");
      $printer->text("EFECTIVO - SISTEMA                             $ ".$efectivoSistema."\n");
      if($diferencia>0){
        $printer->text("TIENE UN SOBRANTE DE                           $ ".$diferencia."\n");
      }
      if($diferencia<0){
        $printer->text("TIENE UN FALTANTE DE                           $ ".number_format(($diferencia*-1), 2, '.', '')."\n");
      }
      
      $printer->text("--------------------------------------------------------\n\n\n\n");
      $printer->text("----------------------          ------------------------\n");
      $printer->text("        CAJERO                         SUPERVISOR \n\n");
      $printer->setJustification($derecha);
      $printer->text("Software desarrollado por IPSE\n");

      $printer->feed();

      $printer->cut();

      $printer->pulse();

      $printer->close();
      $responde=true;
      echo json_encode($responde);

    } catch (Exception $e) {
      echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
    }
  }
}

if($_POST['Requerimiento'] == "ImprimirRecibo"){
  $impresion = new Con_Impresion_Recibo();
  $impresion->CargarReciboAbono($_POST['Consecutivo'],$_POST['Referencia'],$_POST['Cliente'],$_POST['Cedula'],$_POST['DireccionC'],$_POST['TelefonoC'],$_POST['Correo'],$_POST['Valor'],$_POST['Saldo'],$_POST['Tipo']);
}

if($_POST['Requerimiento'] == "ImprimirReciboEgreso"){
  $impresion = new Con_Impresion_Recibo();
  $impresion->CargarReciboEgreso($_POST['Consecutivo'],$_POST['Referencia'],$_POST['Cliente'],$_POST['Cedula'],$_POST['DireccionC'],$_POST['TelefonoC'],$_POST['Correo'],$_POST['Valor']);
}

if($_POST['Requerimiento'] == "ImprimirReciboCuadre"){
  $impresion = new Con_Impresion_Recibo();
  $impresion->CargarReciboCuadre($_POST['Productos'],$_POST['Productos1'],$_POST['Productos2'],$_POST['Productos3'],$_POST['Productos4'],$_POST['Productos5'],$_POST['Productos6'],$_POST['Productos7'],$_POST['Productos8'],$_POST['Productos9'],$_POST['NAvance'],$_POST['VAvance'],$_POST['NAnticipoR'],$_POST['VAnticipoR'],$_POST['NAbonos'],$_POST['VAbonos'],$_POST['NAnticipoD'],$_POST['VAnticipoD'],$_POST['NCuentas'],$_POST['VCuentas'],$_POST['NNotas'],$_POST['VNotas'],$_POST['NEgresos'],$_POST['VEgresos'],$_POST['NTarjetas'],$_POST['VTarjetas'],$_POST['NCheque'],$_POST['VCheque'],$_POST['NTransferencia'],$_POST['VTransferencia'],$_POST['FechaFondo'],$_POST['VFondo'],$_POST['VEfectivo'],$_POST['EfectivoCd'],$_POST['Diferencia'],$_POST['TotalDinero']);
}

if($_POST['Requerimiento'] == "ImprimirReciboAvance"){
  $impresion = new Con_Impresion_Recibo();
  $impresion->CargarReciboAvance($_POST['Productos'],$_POST['Efectivo'],$_POST['Tipo']);
}
if($_POST['Requerimiento'] == "ImprimirReciboArqueo"){
  $impresion = new Con_Impresion_Recibo();
  $impresion->CargarReciboArqueo($_POST['Productos'],$_POST['Efectivo'],$_POST['EfectivoSistema'],$_POST['Diferencia']);
}