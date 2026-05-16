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

class Con_Impresion{

  public function ClaveAcceso($ruc,$factura){

      $establecimiento = substr(str_replace("-","",$factura),0,3);
      $punto = substr(str_replace("-","",$factura),3,3);
      $secuencial = '00'.substr(str_replace("-","",$factura),6);

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
      return $claveAcceso;
  }
  public function ObtenerDia($fecha)
  {
    $datetime = DateTime::createFromFormat('Y-m-d', $fecha);
    $dia = $datetime->format('D');
              if($dia=="Mon"){
                  $dia ="Lunes";
              }
              if($dia=="Tue"){
                  $dia ="Martes";
              }
              if($dia=="Wed"){
                  $dia ="Miercoles";
              }
              if($dia=="Thu"){
                  $dia ="Jueves";
              }
              if($dia=="Fri"){
                  $dia ="Viernes";
              }
              if($dia=="Sat"){
                  $dia ="Sabado";
              }
              if($dia=="Sun"){
                  $dia ="Domingo";
              }
     return $dia;         
  }
  public function CargarFactura($factura,$cliente,$cedula,$direccionC,$telefonoC,$correo,$hc,$edad,$obser,$subtotal,$desctoTotal,$item,$productos,$paciente,$recibido,$cambio,$productos_lab,$productos_rx,$productos_eco,$productos_tac,$idConsulta){
    mb_internal_encoding("UTF-8");
    try {

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

      $cabecera[4]=$cedula;
      $cabecera[5]=$cliente;
      $cabecera[6]=$direccionC;

      $cabecera[7]=$subtotal;
      $cabecera[8]=0.0;
      $cabecera[9]=$subtotal;
      $cabecera[10]=$desctoTotal;

      $cabecera[11]=$paciente;
      $cabecera[12]=$correo;
      $cabecera[13]=$correoEmpresa;
    
      $centrar = Printer::JUSTIFY_CENTER;
      $izquierda = Printer::JUSTIFY_LEFT;
      $derecha = Printer::JUSTIFY_RIGHT;
      $tamano = Printer::FONT_B;
      $tamano1 = Printer::FONT_A;
      
      $emision = date("d-m-Y H:i:s");   
      $claveAcceso=$this->ClaveAcceso($ruc,$factura);         

      $detalle = json_decode($productos,true);
      $detalle_lab = json_decode($productos_lab,true);
      $detalle_rx = json_decode($productos_rx,true);
      $detalle_eco = json_decode($productos_eco,true);
      $detalle_tac = json_decode($productos_tac,true);

      $totalItem = count($detalle) + count($detalle_lab) + count($detalle_rx) + count($detalle_eco) + count($detalle_tac);

      $tarifa12 = '0.00';
      $tarifa0 = '0.00';
      $iva = '0.00';
      $total = $subtotal;
      $formapago = 'EFECTIVO';
      $cajero = $_SESSION["usuario"];
      

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
      $printer->text("FACTURA ELECTRONICA\n");
      $printer->setJustification($izquierda);
      $printer->text("FACTURA ".$factura."\n");
      $printer->text("Emision : ".$emision."\n");
      $printer->text("Cliente : ".$cliente."\n");
      $printer->text("Ced-Ruc : ".$cedula."\n");
      $printer->text("Direcc. : ".$direccionC."\n");
      $printer->text("Telefono: ".$telefonoC."\n");
      $printer->text("Correo  : ".$correo."\n");
      $printer->text("------------------------------------------\n");
      $printer->setTextSize(1, 2);
      $printer->setJustification($centrar);
      $printer->text($paciente."\n");
      $printer->setJustification($izquierda);
      $printer->setTextSize(1, 1);
        
      $printer->text("------------------------------------------\n");        
                       
       
      $printer->setFont($tamano);
      $printer->text("Sub-Total:  ".$subtotal."    ");
      $printer->text("(-)Dcto:   -".$desctoTotal."   ");            
      $printer->text("IVA 12%:    ".$iva."    ");
      $printer->text("Total:       $".$total." \n");

        
      $printer->setJustification($izquierda);
      $printer->text("Forma de Pago: \n");
        
      $dao= new Dao();
      $dao->Campo("f.*","");            

      $dao->Tabla("forma_pago","f");
      
      $dao->Where("f.id_consulta",$idConsulta,"");
      $respuesta =$dao->Consultar();
      $norepetir=false;

      foreach ($respuesta as $row => $item){
        if($item[4]=='EFECTIVO'){
          $printer->text("EFECTIVO :  $".number_format($item[5], 2, '.', '')." \n");
        }
        if($item[4]=='CHEQUE'){
          $printer->text("CHEQUE :  $".number_format($item[9], 2, '.', '')." \n");
        }
        if($item[4]=='TARJETA'){
          $printer->text("TARJETA :  $".number_format($item[14], 2, '.', '')." \n");
        }
         if($item[4]=='CREDITO' && $norepetir==false){
          $norepetir=true;
          $printer->text("CREDITO :  $".number_format($item[20], 2, '.', '')." \n");
        }
        if($item[4]=='ANTICIPO'){
          $printer->text("ANTICIPO :  $".number_format($item[25], 2, '.', '')." \n");
         }
        if($item[4]=='TRANSFERENCIA'){
          $printer->text("TRANSFERENCIA :  $".number_format($item[33], 2, '.', '')." \n");
        }
      }
              
      $printer->text("Cajero : ".$cajero." \n");
      $printer->text("T.RECIBIDO : $".$recibido.".00   ");
      $printer->text("T.CAMBIO :  $".$cambio." \n");
      $printer->setFont($tamano);
      $printer->text("Consulte su factura electronica en el Sri con clave\n");
      $printer->text($claveAcceso."\n");
      $printer->text("Con este documento sera atendido y retire resultados\n");
       
      $printer->setJustification($centrar);       
      
      $printer->cut();

      if(sizeof($detalle)>0){
          $printer->setFont();
          $printer->setTextSize(1,1);
          $printer->setJustification($centrar);
          $printer->text($paciente."\n");
          $printer->text("Edad: ".substr($edad,0,strrpos($edad,","))."   H.C. ".$hc."\n");
          $printer->setJustification($izquierda);
          $printer->text("FACTURA ".$factura."\n");
          $printer->text("Emision : ".$emision."\n");
          $printer->setTextSize(1, 1);
          $printer->setJustification($centrar);
          $printer->text("CONSULTA EXTERNA\n");
          $printer->setFont($tamano);      
          $printer->setJustification($izquierda);
          /*$printer->text("--------------------------------------------------------\n");
          $printer->text("ITEM                     PRECIO    DESCTO(%)    TOTAL($)\n");
          $printer->text("--------------------------------------------------------\n");*/
          for($i=0; $i<sizeof($detalle); $i++) {
            
            // $p =$detalle[$i] 30
              $nombrePro = $detalle[$i][0];

              if(strlen($nombrePro)>22){
                $nombrePro = substr($nombrePro,0,22);
              }else{
                $nombrePro = str_pad($nombrePro, 22); 
              }
              
            //$linea = "» ".$nombrePro."  ".$detalle[$i][3]."         ".$detalle[$i][4]."          ".$detalle[$i][5]."\n";
              $linea = $nombrePro."                     ".$detalle[$i][5];
              $printer->text($linea."\n");
              $printer->setFont($tamano1); 
              $printer->setTextSize(1, 1);
              $dia=$this->ObtenerDia(substr($detalle[$i][2], 0, 10));   

            //$linea1 = $detalle[$i][6]." - ".$detalle[$i][7]."\nF.ATENCION: ".$dia." ".substr($detalle[$i][2], 0, 10)."  TURNO: ".$detalle[$i][1];
              
              
              
              $linea1 = $detalle[$i][6]."           TURNO: ".$detalle[$i][1];              
              $printer->text($linea1."\n");
              

              $linea1 = $detalle[$i][7];              
              $printer->text($linea1."\n");

              
              
              $linea1 = "F.ATENCION:         ".$dia." ".date("d-m-Y", strtotime(substr($detalle[$i][2], 0, 10)));
              $printer->text($linea1."\n");
              $printer->setFont($tamano); 
              $printer->setTextSize(1, 1);
              $printer->text("---------------------------------------------------\n");                       
          }
         // $printer->text("Cajero : ".$cajero." \n");
          $printer->cut();
        }

        if(sizeof($detalle_lab)>0){
          $printer->setFont();
          $printer->setTextSize(1,1);
          $printer->setJustification($centrar);
          $printer->text($paciente."\n");
          $printer->text("Edad: ".substr($edad,0,strrpos($edad,","))."   H.C. ".$hc."\n");
          $printer->setJustification($izquierda);
          $printer->text("FACTURA ".$factura."\n");
          $printer->text("Emision : ".$emision."\n");
          $printer->setTextSize(1, 1);
          $printer->setJustification($centrar);
          $printer->text("LABORATORIO\n");
          $printer->setFont($tamano);      
          $printer->setJustification($izquierda);
          $printer->text("--------------------------------------------------------\n");
          $printer->text("ITEM                     PRECIO    DESCTO(%)    TOTAL($)\n");
          $printer->text("--------------------------------------------------------\n");
          $fechalab="";
          for($i=0; $i<sizeof($detalle_lab); $i++) {

              if($fechalab != $detalle_lab[$i][1]){
                $fechalab = $detalle_lab[$i][1];
                $printer->setFont(); 
                $printer->setTextSize(1, 1);
                $dia=$this->ObtenerDia(substr($detalle_lab[$i][1], 0, 10));   
                $linea1_lab = "F.ATENCION: ".$dia." ".date("d-m-Y", strtotime(substr($detalle_lab[$i][1], 0, 10)));
                $printer->text($linea1_lab."\n");
                $printer->setFont($tamano);   
              }
              $nombreProLab = $detalle_lab[$i][0];

              if(strlen($nombreProLab)>22){
                $nombreProLab = substr($nombreProLab,0,22);
              }else{
                $nombreProLab = str_pad($nombreProLab, 22); 
              }
              
              $lineaLab = "» ".$nombreProLab."  ".$detalle_lab[$i][2]."       ".$detalle_lab[$i][3]."       ".$detalle_lab[$i][4];
              
              $printer->text($lineaLab."\n");
              $printer->setFont($tamano); 
              $printer->setTextSize(1, 1);                  
          }
         
          $printer->cut();
        }

      if(sizeof($detalle_rx)>0){
        $printer->setFont();
        $printer->setTextSize(1,1);
        $printer->setJustification($centrar);
        $printer->text($paciente."\n");
        $printer->text("Edad: ".substr($edad,0,strrpos($edad,","))."   H.C. ".$hc."\n");
        $printer->setJustification($izquierda);
        $printer->text("FACTURA ".$factura."\n");
        $printer->text("Emision : ".$emision."\n");
        $printer->setTextSize(1, 1);
        $printer->setJustification($centrar);
        $printer->text("RAYOS X\n");
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("--------------------------------------------------------\n");
        $printer->text("ITEM                     PRECIO    DESCTO(%)    TOTAL($)\n");
        $printer->text("--------------------------------------------------------\n");
        $fecharx="";
        for($i=0; $i<sizeof($detalle_rx); $i++) {

              if($fecharx != $detalle_rx[$i][1]){
                $fecharx = $detalle_rx[$i][1];
                $printer->setFont(); 
                $printer->setTextSize(1, 1);
                $dia=$this->ObtenerDia(substr($detalle_rx[$i][1], 0, 10));   
                $linea1_lab = "F.ATENCION: ".$dia." ".date("d-m-Y", strtotime(substr($detalle_rx[$i][1], 0, 10)));
                $printer->text($linea1_lab."\n");
                $printer->setFont($tamano);   
              }

          $nombreProRx = $detalle_rx[$i][0];
          if(strlen($nombreProRx)>22){
            $nombreProRx = substr($nombreProRx,0,22);
          }else{
            $nombreProRx = str_pad($nombreProRx, 22); 
          }
          $lineaRx = "» ".$nombreProRx."  ".$detalle_rx[$i][2]."       ".$detalle_rx[$i][3]."       ".$detalle_rx[$i][4];
              
          $printer->text($lineaRx."\n");   
          $printer->setFont($tamano); 
          $printer->setTextSize(1, 1);              
        }
        $printer->cut();
      }

      if(sizeof($detalle_eco)>0){
        $printer->setFont();
        $printer->setTextSize(1,1);
        $printer->setJustification($centrar);
        $printer->text($paciente."\n");
        $printer->text("Edad: ".substr($edad,0,strrpos($edad,","))."   H.C. ".$hc."\n");
        $printer->setJustification($izquierda);
        $printer->text("FACTURA ".$factura."\n");
        $printer->text("Emision : ".$emision."\n");
        $printer->setTextSize(1, 1);
        $printer->setJustification($centrar);
        $printer->text("ECOGRAFIA\n");
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("--------------------------------------------------------\n");
        $printer->text("ITEM                     PRECIO    DESCTO(%)    TOTAL($)\n");
        $printer->text("--------------------------------------------------------\n");
        $fechaec="";
        for($i=0; $i<sizeof($detalle_eco); $i++) {

              if($fechaec != $detalle_eco[$i][1]){
                $fechaec = $detalle_eco[$i][1];
                $printer->setFont(); 
                $printer->setTextSize(1, 1);
                $dia=$this->ObtenerDia(substr($detalle_eco[$i][1], 0, 10));   
                $linea1_lab = "F.ATENCION: ".$dia." ".date("d-m-Y", strtotime(substr($detalle_eco[$i][1], 0, 10)));
                $printer->text($linea1_lab."\n");
                $printer->setFont($tamano);   
              }
          $nombreProEco = $detalle_eco[$i][0];

          if(strlen($nombreProEco)>22){
            $nombreProEco = substr($nombreProEco,0,22);
          }else{
            $nombreProEco = str_pad($nombreProEco, 22); 
          }
              
          $lineaEco = "» ".$nombreProEco."  ".$detalle_eco[$i][2]."       ".$detalle_eco[$i][3]."       ".$detalle_eco[$i][4];
              
          $printer->text($lineaEco."\n");  
          $printer->setFont($tamano); 
          $printer->setTextSize(1, 1);                 
        }      
        $printer->cut();
      }

      if(sizeof($detalle_tac)>0){
        $printer->setFont();
        $printer->setTextSize(1,1);
        $printer->setJustification($centrar);
        $printer->text($paciente."\n");
        $printer->text("Edad: ".substr($edad,0,strrpos($edad,","))."   H.C. ".$hc."\n");
        $printer->setJustification($izquierda);
        $printer->text("FACTURA ".$factura."\n");
        $printer->text("Emision : ".$emision."\n");
        $printer->setTextSize(1, 1);
        $printer->setJustification($centrar);
        $printer->text("TAC/RM\n");
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("--------------------------------------------------------\n");
        $printer->text("ITEM                     PRECIO    DESCTO(%)    TOTAL($)\n");
        $printer->text("--------------------------------------------------------\n");
        $fechatac="";
        for($i=0; $i<sizeof($detalle_tac); $i++) {
              if($fechatac != $detalle_tac[$i][1]){
                $fechatac = $detalle_tac[$i][1];
                $printer->setFont(); 
                $printer->setTextSize(1, 1);
                $dia=$this->ObtenerDia(substr($detalle_tac[$i][1], 0, 10));   
                $linea1_lab = "F.ATENCION: ".$dia." ".date("d-m-Y", strtotime(substr($detalle_tac[$i][1], 0, 10)));
                $printer->text($linea1_lab."\n");
                $printer->setFont($tamano);   
              }
          $nombreProTac = $detalle_tac[$i][0];

          if(strlen($nombreProTac)>22){
            $nombreProTac = substr($nombreProTac,0,22);
          }else{
            $nombreProTac = str_pad($nombreProTac, 22); 
          }
          
          $lineaTac = "» ".$nombreProTac."  ".$detalle_tac[$i][2]."       ".$detalle_tac[$i][3]."     ".$detalle_tac[$i][4];
              
          $printer->text($lineaTac."\n");    
          $printer->setFont($tamano); 
          $printer->setTextSize(1, 1);               
        }
        $printer->cut();      
        }

        $printer->close();
        
      $responde=true;
      echo json_encode($responde);
        
    } catch (Exception $e) {
      echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
    }
  }

  public function CargarNotaCredito($factura,$cliente,$cedula,$direccionC,$telefonoC,$correo,$hc,$edad,$obser,$subtotal,$desctoTotal,$item,$productos,$paciente,$recibido,$cambio,$productos_lab,$productos_rx,$productos_eco,$productos_tac,$idConsulta){
    mb_internal_encoding("UTF-8");
    try {

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

      $cabecera[4]=$cedula;
      $cabecera[5]=$cliente;
      $cabecera[6]=$direccionC;

      $cabecera[7]=$subtotal;
      $cabecera[8]=0.0;
      $cabecera[9]=$subtotal;
      $cabecera[10]=$desctoTotal;

      $cabecera[11]=$paciente;
      $cabecera[12]=$correo;
      $cabecera[13]=$correoEmpresa;
    
      $centrar = Printer::JUSTIFY_CENTER;
      $izquierda = Printer::JUSTIFY_LEFT;
      $derecha = Printer::JUSTIFY_RIGHT;
      $tamano = Printer::FONT_B;
      
      $emision = date("d-m-Y H:i:s");   
      $claveAcceso=$this->ClaveAcceso($ruc,$factura);         

      $detalle = json_decode($productos,true);
      $detalle_lab = json_decode($productos_lab,true);
      $detalle_rx = json_decode($productos_rx,true);
      $detalle_eco = json_decode($productos_eco,true);
      $detalle_tac = json_decode($productos_tac,true);

      $totalItem = count($detalle) + count($detalle_lab) + count($detalle_rx) + count($detalle_eco) + count($detalle_tac);

      $tarifa12 = '0.00';
      $tarifa0 = '0.00';
      $iva = '0.00';
      $total = $subtotal;
      $formapago = 'EFECTIVO';
      $cajero = $_SESSION["usuario"];

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
      $printer->text("NOTA DE CREDITO ELECTRONICA\n");
      $printer->setJustification($izquierda);
      $printer->text("NOTA DE CREDITO ".$factura."\n");
      $printer->text("Emision : ".$emision."\n");
      $printer->text("Cliente : ".$cliente."\n");
      $printer->text("Ced-Ruc : ".$cedula."\n");
      $printer->text("Direcc. : ".$direccionC."\n");
      $printer->text("Telefono: ".$telefonoC."\n");
      $printer->text("Correo  : ".$correo."\n");
      $printer->text("------------------------------------------\n");
      $printer->setTextSize(1, 2);
      $printer->setJustification($centrar);
      $printer->text($paciente."\n");
      $printer->setJustification($izquierda);
      $printer->setTextSize(1, 1);
      $printer->text("------------------------------------------\n");

      $printer->setFont($tamano);
      $printer->text("Sub-Total:  ".$subtotal."    ");
      $printer->text("(-)Dcto:   -".$desctoTotal."   ");      
      $printer->text("IVA 12%:    ".$iva."    ");
      $printer->text("Total:       $".$total." \n");
            
      $printer->text("Cajero : ".$cajero." \n");
      $printer->setFont($tamano);
      $printer->text("Consulte su nota de credito electronica en el Sri con clave de acceso: \n");
      $printer->text($claveAcceso."\n");
                                 
      $printer->cut();      
      $printer->close();
        
      $responde=true;
      echo json_encode($responde);
        
    } catch (Exception $e) {
      echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
    }
  }
    public function CargarUsuario($punto){
      $dao = new Dao();
      $dao->Campo("u.usuario","");
      $dao->TablasInnerAlias("usuario","u","punto_venta","pv");
      $dao->Where("pv.id_punto_emision",$punto,"");
      
      $respuesta = $dao->Consultar();
      $usuario = "";
      foreach ($respuesta as $row => $item){
        $usuario = $item[0];
      }
      return $usuario;
    }
  public function ReimprimirConsulta($factura,$cliente,$cedula,$direccionC,$telefonoC,$correo,$hc,$edad,$obser,$subtotal,$desctoTotal,$item,$productos,$paciente,$recibido,$cambio,$productos_lab,$productos_rx,$productos_eco,$productos_tac,$idConsulta,$emision,$claveAcceso){
    mb_internal_encoding("UTF-8");
    try {

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
      $cabecera[4]=$cedula;
      $cabecera[5]=$cliente;
      $cabecera[6]=$direccionC;

      $cabecera[7]=$subtotal;
      $cabecera[8]=0.0;
      $cabecera[9]=$subtotal;
      $cabecera[10]=$desctoTotal;

      $cabecera[11]=$paciente;
      $cabecera[12]=$correo;
      $cabecera[13]=$correoEmpresa;
      $centrar = Printer::JUSTIFY_CENTER;
      $izquierda = Printer::JUSTIFY_LEFT;
      $derecha = Printer::JUSTIFY_RIGHT;
      $tamano = Printer::FONT_B;
      $tamano1 = Printer::FONT_A;

      $detalle = json_decode($productos,true);
      $detalle_lab = json_decode($productos_lab,true);
      $detalle_rx = json_decode($productos_rx,true);
      $detalle_eco = json_decode($productos_eco,true);
      $detalle_tac = json_decode($productos_tac,true);

      
      
      $totalItem = count($detalle) + count($detalle_lab) + count($detalle_rx) + count($detalle_eco) + count($detalle_tac);

      $tarifa12 = '0.00';
      $tarifa0 = '0.00';
      $iva = '0.00';
      $total = $subtotal;
      $formapago = 'EFECTIVO';
      $cajero = $this->CargarUsuario(substr(str_replace("-","",$factura),3,3)); //$_SESSION["usuario"];
      
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
      $printer->text("FACTURA ELECTRONICA\n");
      $printer->setJustification($izquierda);
      $printer->text("FACTURA ".$factura."\n");
      $printer->text("Emision : ".date("d-m-Y", strtotime($emision))."\n");
      $printer->text("Cliente : ".$cliente."\n");
      $printer->text("Ced-Ruc : ".$cedula."\n");
      $printer->text("Direcc. : ".$direccionC."\n");
      $printer->text("Telefono: ".$telefonoC."\n");
      $printer->text("Correo  : ".$correo."\n");
      $printer->text("------------------------------------------\n");
      $printer->setTextSize(1, 2);
      $printer->setJustification($centrar);
      $printer->text($paciente."\n");
      $printer->setJustification($izquierda);
      $printer->setTextSize(1, 1);
      $printer->text("------------------------------------------\n");

       
      $printer->setFont($tamano);
      $printer->text("Sub-Total:  ".$subtotal."    ");
      $printer->text("(-)Dcto:   -".$desctoTotal."   ");        
      $printer->text("IVA 12%:    ".$iva."    ");
      $printer->text("Total:       $".$total." \n");

        
      $printer->setJustification($izquierda);
      $printer->text("Forma de Pago: \n");
      $dao= new Dao();
      $dao->Campo("f.*","");            

      $dao->Tabla("forma_pago","f");
      
      $dao->Where("f.id_consulta",$idConsulta,"");
      $respuesta =$dao->Consultar();
      $norepetir=false;
        foreach ($respuesta as $row => $item){
          if($item[4]=='EFECTIVO'){
            $printer->text("EFECTIVO :  $".number_format($item[5], 2, '.', '')." \n");
          }
          if($item[4]=='CHEQUE'){
            $printer->text("CHEQUE :  $".number_format($item[9], 2, '.', '')." \n");
          }
          if($item[4]=='TARJETA'){
            $printer->text("TARJETA :  $".number_format($item[14], 2, '.', '')." \n");
          }
          if($item[4]=='CREDITO' && $norepetir==false){
            $norepetir=true;
            $printer->text("CREDITO :  $".number_format($item[20], 2, '.', '')." \n");
          }
          if($item[4]=='ANTICIPO'){
            $printer->text("ANTICIPO :  $".number_format($item[25], 2, '.', '')." \n");
          }
          if($item[4]=='TRANSFERENCIA'){
            $printer->text("TRANSFERENCIA :  $".number_format($item[33], 2, '.', '')." \n");
          }
        }
        $printer->text("Cajero : ".$cajero." \n");        
        $printer->setFont($tamano);
        $printer->text("Consulte su factura electronica en el Sri con clave\n");
        $printer->text($claveAcceso."\n");
        $printer->text("Con este documento sera atendido y retire resultados\n");
        
        $printer->setJustification($centrar);        
        
        $printer->cut();

        if(sizeof($detalle)>0){
          $printer->setFont();
          $printer->setTextSize(1,1);
          $printer->setJustification($centrar);
          $printer->text($paciente."\n");
          $printer->text("Edad: ".substr($edad,0,strrpos($edad,","))."   H.C. ".$hc."\n");
          $printer->setJustification($izquierda);
          $printer->text("FACTURA ".$factura."\n");
          $printer->text("Emision : ".date("d-m-Y", strtotime($emision))."\n");
          $printer->setTextSize(1, 1);
          $printer->setJustification($centrar);
          $printer->text("CONSULTA EXTERNA\n");
          $printer->setFont($tamano);      
          $printer->setJustification($izquierda);
          
          for($i=0; $i<sizeof($detalle); $i++) {
            
             // $p =$detalle[$i] 30
              $nombrePro = $detalle[$i][0];

              if(strlen($nombrePro)>22){
                $nombrePro = substr($nombrePro,0,22);
              }else{
                $nombrePro = str_pad($nombrePro, 22); 
              }
              
            //$linea = "» ".$nombrePro."  ".$detalle[$i][3]."         ".$detalle[$i][4]."          ".$detalle[$i][5]."\n";
              $linea = $nombrePro."                     ".$detalle[$i][5];
              $printer->text($linea."\n");
              $printer->setFont($tamano1); 
              $printer->setTextSize(1, 1);
              $dia=$this->ObtenerDia(substr($detalle[$i][2], 0, 10));   

            //$linea1 = $detalle[$i][6]." - ".$detalle[$i][7]."\nF.ATENCION: ".$dia." ".substr($detalle[$i][2], 0, 10)."  TURNO: ".$detalle[$i][1];
              
              
              
              $linea1 = $detalle[$i][6]."           TURNO: ".$detalle[$i][1];              
              $printer->text($linea1."\n");
              

              $linea1 = $detalle[$i][7];              
              $printer->text($linea1."\n");

              
              
              $linea1 = "F.ATENCION:         ".$dia." ".date("d-m-Y", strtotime(substr($detalle[$i][2], 0, 10)));
              $printer->text($linea1."\n");
              $printer->setFont($tamano); 
              $printer->setTextSize(1, 1);
              $printer->text("---------------------------------------------------\n");                   
          }
          $printer->cut();
        }

        if(sizeof($detalle_lab)>0){
          $printer->setFont();
          $printer->setTextSize(1,1);
          $printer->setJustification($centrar);
          $printer->text($paciente."\n");
          $printer->text("Edad: ".substr($edad,0,strrpos($edad,","))."   H.C. ".$hc."\n");
          $printer->setJustification($izquierda);
          $printer->text("FACTURA ".$factura."\n");
          $printer->text("Emision : ".date("d-m-Y", strtotime($emision))."\n");
          $printer->setTextSize(1, 1);
          $printer->setJustification($centrar);
          $printer->text("LABORATORIO\n");
          $printer->setFont($tamano);      
          $printer->setJustification($izquierda);
          $printer->text("--------------------------------------------------------\n");
          $printer->text("ITEM                     PRECIO    DESCTO(%)    TOTAL($)\n");
          $printer->text("--------------------------------------------------------\n");
          $fechalab="";
          for($i=0; $i<sizeof($detalle_lab); $i++) {

              if($fechalab != $detalle_lab[$i][1]){
                $fechalab = $detalle_lab[$i][1];
                $printer->setFont(); 
                $printer->setTextSize(1, 1);
                $dia=$this->ObtenerDia(substr($detalle_lab[$i][1], 0, 10));   
                $linea1_lab = "F.ATENCION: ".$dia." ".date("d-m-Y", strtotime(substr($detalle_lab[$i][1], 0, 10)));
                $printer->text($linea1_lab."\n");
                $printer->setFont($tamano);   
              }
              $nombreProLab = $detalle_lab[$i][0];

              if(strlen($nombreProLab)>22){
                $nombreProLab = substr($nombreProLab,0,22);
              }else{
                $nombreProLab = str_pad($nombreProLab, 22); 
              }
              
              $lineaLab = "» ".$nombreProLab."  ".$detalle_lab[$i][2]."       ".$detalle_lab[$i][3]."       ".$detalle_lab[$i][4];
              
              $printer->text($lineaLab."\n");
              $printer->setFont($tamano); 
              $printer->setTextSize(1, 1);
                                
          }
          $printer->cut();
        }

      if(sizeof($detalle_rx)>0){
        $printer->setFont();
        $printer->setTextSize(1,1);
        $printer->setJustification($centrar);
        $printer->text($paciente."\n");
        $printer->text("Edad: ".substr($edad,0,strrpos($edad,","))."   H.C. ".$hc."\n");
        $printer->setJustification($izquierda);
        $printer->text("FACTURA ".$factura."\n");
        $printer->text("Emision : ".date("d-m-Y", strtotime($emision))."\n");
        $printer->setTextSize(1, 1);
        $printer->setJustification($centrar);
        $printer->text("RAYOS X\n");
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("--------------------------------------------------------\n");
        $printer->text("ITEM                     PRECIO    DESCTO(%)    TOTAL($)\n");
        $printer->text("--------------------------------------------------------\n");
        $fecharx="";
        for($i=0; $i<sizeof($detalle_rx); $i++) {

              if($fecharx != $detalle_rx[$i][1]){
                $fecharx = $detalle_rx[$i][1];
                $printer->setFont(); 
                $printer->setTextSize(1, 1);
                $dia=$this->ObtenerDia(substr($detalle_rx[$i][1], 0, 10));   
                $linea1_lab = "F.ATENCION: ".$dia." ".date("d-m-Y", strtotime(substr($detalle_rx[$i][1], 0, 10)));
                $printer->text($linea1_lab."\n");
                $printer->setFont($tamano);   
              }

          $nombreProRx = $detalle_rx[$i][0];
          if(strlen($nombreProRx)>22){
            $nombreProRx = substr($nombreProRx,0,22);
          }else{
            $nombreProRx = str_pad($nombreProRx, 22); 
          }
          $lineaRx = "» ".$nombreProRx."  ".$detalle_rx[$i][2]."       ".$detalle_rx[$i][3]."       ".$detalle_rx[$i][4];
              
          $printer->text($lineaRx."\n");     
          $printer->setFont($tamano); 
          $printer->setTextSize(1, 1);            
        }
        $printer->cut();
      }

      if(sizeof($detalle_eco)>0){
        $printer->setFont();
        $printer->setTextSize(1,1);
        $printer->setJustification($centrar);
        $printer->text($paciente."\n");
        $printer->text("Edad: ".substr($edad,0,strrpos($edad,","))."   H.C. ".$hc."\n");
        $printer->setJustification($izquierda);
        $printer->text("FACTURA ".$factura."\n");
        $printer->text("Emision : ".date("d-m-Y", strtotime($emision))."\n");
        $printer->setTextSize(1, 1);
        $printer->setJustification($centrar);
        $printer->text("ECOGRAFIA\n");
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("--------------------------------------------------------\n");
        $printer->text("ITEM                     PRECIO    DESCTO(%)    TOTAL($)\n");
        $printer->text("--------------------------------------------------------\n");
        $fechaec="";
        for($i=0; $i<sizeof($detalle_eco); $i++) {

              if($fechaec != $detalle_eco[$i][1]){
                $fechaec = $detalle_eco[$i][1];
                $printer->setFont(); 
                $printer->setTextSize(1, 1);
                $dia=$this->ObtenerDia(substr($detalle_eco[$i][1], 0, 10));   
                $linea1_lab = "F.ATENCION: ".$dia." ".date("d-m-Y", strtotime(substr($detalle_eco[$i][1], 0, 10)));
                $printer->text($linea1_lab."\n");
                $printer->setFont($tamano);   
              }
          $nombreProEco = $detalle_eco[$i][0];

          if(strlen($nombreProEco)>22){
            $nombreProEco = substr($nombreProEco,0,22);
          }else{
            $nombreProEco = str_pad($nombreProEco, 22); 
          }
              
          $lineaEco = "» ".$nombreProEco."  ".$detalle_eco[$i][2]."       ".$detalle_eco[$i][3]."       ".$detalle_eco[$i][4];
              
          $printer->text($lineaEco."\n");  
          $printer->setFont($tamano); 
          $printer->setTextSize(1, 1);                 
        }      
        $printer->cut();
      }

      if(sizeof($detalle_tac)>0){
        $printer->setFont();
        $printer->setTextSize(1,1);
        $printer->setJustification($centrar);
        $printer->text($paciente."\n");
        $printer->text("Edad: ".substr($edad,0,strrpos($edad,","))."   H.C. ".$hc."\n");
        $printer->setJustification($izquierda);
        $printer->text("FACTURA ".$factura."\n");
        $printer->text("Emision : ".date("d-m-Y", strtotime($emision))."\n");
        $printer->setTextSize(1, 1);
        $printer->setJustification($centrar);
        $printer->text("TAC/RM\n");
        $printer->setFont($tamano);      
        $printer->setJustification($izquierda);
        $printer->text("--------------------------------------------------------\n");
        $printer->text("ITEM                     PRECIO    DESCTO(%)    TOTAL($)\n");
        $printer->text("--------------------------------------------------------\n");
        $fechatac="";
        for($i=0; $i<sizeof($detalle_tac); $i++) {
              if($fechatac != $detalle_tac[$i][1]){
                $fechatac = $detalle_tac[$i][1];
                $printer->setFont(); 
                $printer->setTextSize(1, 1);
                $dia=$this->ObtenerDia(substr($detalle_tac[$i][1], 0, 10));   
                $linea1_lab = "F.ATENCION: ".$dia." ".date("d-m-Y", strtotime(substr($detalle_tac[$i][1], 0, 10)));
                $printer->text($linea1_lab."\n");
                $printer->setFont($tamano);   
              }
          $nombreProTac = $detalle_tac[$i][0];

          if(strlen($nombreProTac)>22){
            $nombreProTac = substr($nombreProTac,0,22);
          }else{
            $nombreProTac = str_pad($nombreProTac, 22); 
          }
          
          $lineaTac = "» ".$nombreProTac."  ".$detalle_tac[$i][2]."       ".$detalle_tac[$i][3]."     ".$detalle_tac[$i][4];
              
          $printer->text($lineaTac."\n"); 
          $printer->setFont($tamano); 
          $printer->setTextSize(1, 1);                  
        }
        $printer->cut();      
        }

        $printer->close();
        
        $responde=true;
        echo json_encode($responde);
        
      } catch (Exception $e) {
          echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
      }

    }


  public function ReimprimirNotaCredito($factura,$cliente,$cedula,$direccionC,$telefonoC,$correo,$hc,$edad,$obser,$subtotal,$desctoTotal,$item,$productos,$paciente,$recibido,$cambio,$productos_lab,$productos_rx,$productos_eco,$productos_tac,$idConsulta,$emision,$claveAcceso){
    mb_internal_encoding("UTF-8");
    try {

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
      $cabecera[4]=$cedula;
      $cabecera[5]=$cliente;
      $cabecera[6]=$direccionC;

      $cabecera[7]=$subtotal;
      $cabecera[8]=0.0;
      $cabecera[9]=$subtotal;
      $cabecera[10]=$desctoTotal;

      $cabecera[11]=$paciente;
      $cabecera[12]=$correo;
      $cabecera[13]=$correoEmpresa;

      $centrar = Printer::JUSTIFY_CENTER;
      $izquierda = Printer::JUSTIFY_LEFT;
      $derecha = Printer::JUSTIFY_RIGHT;
      $tamano = Printer::FONT_B;


      $detalle = json_decode($productos,true);
      $detalle_lab = json_decode($productos_lab,true);
      $detalle_rx = json_decode($productos_rx,true);
      $detalle_eco = json_decode($productos_eco,true);
      $detalle_tac = json_decode($productos_tac,true);

      
      
      $totalItem = count($detalle) + count($detalle_lab) + count($detalle_rx) + count($detalle_eco) + count($detalle_tac);

      $tarifa12 = '0.00';
      $tarifa0 = '0.00';
      $iva = '0.00';
      $total = $subtotal;
      $formapago = 'EFECTIVO';
      $cajero = $this->CargarUsuario(substr(str_replace("-","",$factura),3,3));//$_SESSION["usuario"];
      
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
        $printer->text("NOTA DE CREDITO ELECTRONICA\n");
        $printer->setJustification($izquierda);
        $printer->text("NOTA DE CREDITO ".$factura."\n");
        $printer->text("Emision : ".$emision."\n");
        $printer->text("Cliente : ".$cliente."\n");
        $printer->text("Ced-Ruc : ".$cedula."\n");
        $printer->text("Direcc. : ".$direccionC."\n");
        $printer->text("Telefono: ".$telefonoC."\n");
        $printer->text("Correo  : ".$correo."\n");
        $printer->text("------------------------------------------\n");
        $printer->setTextSize(1, 2);
        $printer->setJustification($centrar);
        $printer->text($paciente."\n");
        $printer->setJustification($izquierda);
        $printer->setTextSize(1, 1);
        $printer->text("------------------------------------------\n");

        $printer->setFont($tamano);
        $printer->text("Sub-Total:  ".$subtotal."    ");
        $printer->text("(-)Dcto:   -".$desctoTotal."   ");                
        $printer->text("IVA 12%:    ".$iva."    ");
        $printer->text("Total:       $".$total." \n");                
        $printer->text("Cajero : ".$cajero." \n");
        $printer->setFont($tamano);
        $printer->text("Consulte su nota de credito electronica en el Sri con clave de acceso: \n");
        $printer->text($claveAcceso."\n");
        
              
        $printer->cut();

        $printer->close();
        
        $responde=true;
        echo json_encode($responde);
        
      } catch (Exception $e) {
          echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
      }

    }
      
public function CargarFactInventario($factura,$cliente,$cedula,$direccionC,$telefonoC,$correo,$subtotal,$desctoTotal,$item,$productos,$recibido,$cambio,$ahorro,$iva,$idFarmacia){
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


      $claveAcceso=$this->ClaveAcceso($ruc,$factura); 
      $emision = date("d-m-Y H:i:s");  
      if($_POST["FechaCargada"]!=""){
        $emision = $_POST["FechaCargada"];  
      } 
      

      $detalle = json_decode($productos,true);
      
      $tarifa12 = '0.00';
      $tarifa0 = '0.00';
      
      $total = $subtotal;
      $formapago = 'EFECTIVO';
      $cajero = $this->CargarUsuario(substr(str_replace("-","",$factura),3,3));//$_SESSION["usuario"];
      
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
      $printer->text("FACTURA ELECTRONICA\n");
      $printer->setJustification($izquierda);
      $printer->text("FACTURA ".$factura."\n");
      $printer->text("Emision : ".$emision."\n");
      $printer->text("Cliente : ".$cliente."\n");
      $printer->text("Ced-Ruc : ".$cedula."\n");
      $printer->text("Direcc. : ".$direccionC."\n");
      $printer->text("Telefono: ".$telefonoC."\n");
      $printer->text("Correo  : ".$correo."\n");
      $printer->setFont($tamano);      
      $printer->setJustification($izquierda);
      $printer->text("----------------------------------------------------\n");
      $printer->text("ITEM                  PREC    CANT  DESC(%)   TOT($)\n");
      $printer->text("----------------------------------------------------\n");

      for($i=0; $i<sizeof($detalle); $i++) {

            $nombrePro = $detalle[$i][0];

            if(strlen($nombrePro)>22){
              $nombrePro = substr($nombrePro,0,22);
            }else{
              $nombrePro = str_pad($nombrePro, 22); 
            }

            $cantidadPro= $detalle[$i][2];

            if(strlen($cantidadPro)>3){
              $cantidadPro = substr($cantidadPro,0,3);
            }else{
              $cantidadPro = str_pad($cantidadPro, 3); 
            }
            
            $linea = "» ".$nombrePro."  ".$detalle[$i][3]."   ".$cantidadPro."     ".$detalle[$i][4]."      ".$detalle[$i][5];
            
            $printer->text($linea."\n");                   
        }
          
        $printer->setFont($tamano);
        $printer->text("Sub-Total:  ".$subtotal."    ");
        $printer->text("(-)Dcto:   -".$desctoTotal."   ");        
        $printer->text("IVA 12%:    ".$iva."    ");
        $printer->text("Total:       $".$total." \n");

        
        $printer->setJustification($izquierda);
        $printer->text("Forma de Pago: \n");

        $dao= new Dao();
        $dao->Campo("f.*","");            

        $dao->Tabla("forma_pago","f");
      
        $dao->Where("f.id_farmacia",$idFarmacia,"");
        $respuesta =$dao->Consultar();
        $norepetir=false;
        foreach ($respuesta as $row => $item){
          if($item[4]=='EFECTIVO'){
            $printer->text("EFECTIVO :  $".number_format($item[5], 2, '.', '')." \n");
          }
          if($item[4]=='CHEQUE'){
            $printer->text("CHEQUE :  $".number_format($item[9], 2, '.', '')." \n");
          }
          if($item[4]=='TARJETA'){
            $printer->text("TARJETA :  $".number_format($item[14], 2, '.', '')." \n");
          }
          if($item[4]=='CREDITO' && $norepetir==false){
            $norepetir=true;
            $printer->text("CREDITO :  $".number_format($item[20], 2, '.', '')." \n");
          }
          if($item[4]=='ANTICIPO'){
            $printer->text("ANTICIPO :  $".number_format($item[25], 2, '.', '')." \n");
          }
          if($item[4]=='TRANSFERENCIA'){
            $printer->text("TRANSFERENCIA :  $".number_format($item[33], 2, '.', '')." \n");
          }
        }

        $printer->text("Cajero : ".$cajero." \n");
        $printer->text("T.RECIBIDO : $".$recibido.".00   ");
        $printer->text("T.CAMBIO :  $".$cambio." \n");
        $printer->setFont($tamano);
        $printer->text("Consulte su factura electronica en el Sri con clave\n");
        $printer->text($claveAcceso."\n");        
        $printer->setJustification($centrar);
        $printer->text("SALIDA LA MERCANCIA NO HAY DEVOLUCION\n");
        $printer->setJustification($derecha);

        $printer->cut();
       
        $printer->close();

      } catch (Exception $e) {
          echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
      }
  }


  public function CargarNotaCreditoInventario($factura,$cliente,$cedula,$direccionC,$telefonoC,$correo,$subtotal,$desctoTotal,$item,$productos,$recibido,$cambio,$ahorro,$iva){
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

      $claveAcceso=$this->ClaveAcceso($ruc,$factura);  
      $emision = date("d-m-Y H:i:s");            

      $detalle = json_decode($productos,true);
      
      $tarifa12 = '0.00';
      $tarifa0 = '0.00';
      
      $total = $subtotal;
      $formapago = 'EFECTIVO';
      $cajero = $this->CargarUsuario(substr(str_replace("-","",$factura),3,3));//$_SESSION["usuario"];
      
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
      $printer->text("NOTA DE CREDITO ELECTRONICA\n");
      $printer->setJustification($izquierda);
      $printer->text("NOTA CREDITO ".$factura."\n");
      $printer->text("Emision : ".$emision."\n");
      $printer->text("Cliente : ".$cliente."\n");
      $printer->text("Ced-Ruc : ".$cedula."\n");
      $printer->text("Direcc. : ".$direccionC."\n");
      $printer->text("Telefono: ".$telefonoC."\n");
      $printer->text("Correo  : ".$correo."\n");
      $printer->setFont($tamano);      
      $printer->setJustification($izquierda);
      $printer->text("----------------------------------------------------\n");
      $printer->text("ITEM                  PREC    CANT  DESC(%)   TOT($)\n");
      $printer->text("----------------------------------------------------\n");

      for($i=0; $i<sizeof($detalle); $i++) {

            $nombrePro = $detalle[$i][0];

            if(strlen($nombrePro)>22){
              $nombrePro = substr($nombrePro,0,22);
            }else{
              $nombrePro = str_pad($nombrePro, 22); 
            }

            $cantidadPro= $detalle[$i][2];

            if(strlen($cantidadPro)>3){
              $cantidadPro = substr($cantidadPro,0,3);
            }else{
              $cantidadPro = str_pad($cantidadPro, 3); 
            }
            
            $linea = "» ".$nombrePro."  ".$detalle[$i][3]."   ".$cantidadPro."     ".$detalle[$i][4]."       ".$detalle[$i][5];
            
            $printer->text($linea."\n");                   
        }                  
        $printer->setFont($tamano);
        $printer->text("Sub-Total:  ".$subtotal."    ");
        $printer->text("(-)Dcto:   -".$desctoTotal."   ");        
        $printer->text("IVA 12%:    ".$iva."    ");
        $printer->text("Total:       $".$total." \n");
                
        $printer->text("Cajero : ".$cajero." \n");
        $printer->setFont($tamano);
        $printer->text("Consulte su nota de credito electronica en el Sri con clave de acceso: \n");
        $printer->text($claveAcceso."\n");
                
        $printer->cut();        
        $printer->close();

      } catch (Exception $e) {
          echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
      }
  }


}


if(isset($_POST['Requerimiento'])){

  if($_POST['Requerimiento'] == "ImprimirConsulta"){
      $impresion = new Con_Impresion();

      $impresion->CargarFactura($_POST['Numero'],$_POST['Cliente'],$_POST['Cedula'],$_POST['DireccionC'],$_POST['TelefonoC'],$_POST['Correo'],$_POST['HC'],$_POST['Edad'],$_POST['Observacion'],$_POST['Subtotal'],$_POST['DesctoTotal'],$_POST['Item'],$_POST['Productos'],$_POST['Paciente'],$_POST['Recibido'],$_POST['Cambio'],$_POST['ProductosLab'],$_POST['ProductosRx'],$_POST['ProductosEco'],$_POST['ProductosTac'],$_POST['Consulta']);
  }

  if($_POST['Requerimiento'] == "ImprimirNotaCredito"){
      $impresion = new Con_Impresion();

      $impresion->CargarNotaCredito($_POST['Numero'],$_POST['Cliente'],$_POST['Cedula'],$_POST['DireccionC'],$_POST['TelefonoC'],$_POST['Correo'],$_POST['HC'],$_POST['Edad'],$_POST['Observacion'],$_POST['Subtotal'],$_POST['DesctoTotal'],$_POST['Item'],$_POST['Productos'],$_POST['Paciente'],$_POST['Recibido'],$_POST['Cambio'],$_POST['ProductosLab'],$_POST['ProductosRx'],$_POST['ProductosEco'],$_POST['ProductosTac'],$_POST['Consulta']);
  }

  if($_POST['Requerimiento'] == "ImprimirInventario"){
      $impresion = new Con_Impresion();

      $impresion->CargarFactInventario($_POST['Numero'],$_POST['Cliente'],$_POST['Cedula'],$_POST['DireccionC'],$_POST['TelefonoC'],$_POST['Correo'],$_POST['Subtotal'],$_POST['DesctoTotal'],$_POST['Item'],$_POST['Productos'],$_POST['Recibido'],$_POST['Cambio'],$_POST['Ahorro'],$_POST['Iva'],$_POST['Consulta']);
  }

  if($_POST['Requerimiento'] == "ImprimirInventarioNC"){
      $impresion = new Con_Impresion();

      $impresion->CargarNotaCreditoInventario($_POST['Numero'],$_POST['Cliente'],$_POST['Cedula'],$_POST['DireccionC'],$_POST['TelefonoC'],$_POST['Correo'],$_POST['Subtotal'],$_POST['DesctoTotal'],$_POST['Item'],$_POST['Productos'],$_POST['Recibido'],$_POST['Cambio'],$_POST['Ahorro'],$_POST['Iva']);
  }

  if($_POST['Requerimiento'] == "ReImprimirConsulta"){
      $impresion = new Con_Impresion();

      $impresion->ReimprimirConsulta($_POST['Numero'],$_POST['Cliente'],$_POST['Cedula'],$_POST['DireccionC'],$_POST['TelefonoC'],$_POST['Correo'],$_POST['HC'],$_POST['Edad'],$_POST['Observacion'],$_POST['Subtotal'],$_POST['DesctoTotal'],$_POST['Item'],$_POST['Productos'],$_POST['Paciente'],$_POST['Recibido'],$_POST['Cambio'],$_POST['ProductosLab'],$_POST['ProductosRx'],$_POST['ProductosEco'],$_POST['ProductosTac'],$_POST['Consulta'],$_POST['Emision'],$_POST['Autorizacion']);
  }

  if($_POST['Requerimiento'] == "ReimprimirNotaCredito"){
      $impresion = new Con_Impresion();

      $impresion->ReimprimirNotaCredito($_POST['Numero'],$_POST['Cliente'],$_POST['Cedula'],$_POST['DireccionC'],$_POST['TelefonoC'],$_POST['Correo'],$_POST['HC'],$_POST['Edad'],$_POST['Observacion'],$_POST['Subtotal'],$_POST['DesctoTotal'],$_POST['Item'],$_POST['Productos'],$_POST['Paciente'],$_POST['Recibido'],$_POST['Cambio'],$_POST['ProductosLab'],$_POST['ProductosRx'],$_POST['ProductosEco'],$_POST['ProductosTac'],$_POST['Consulta'],$_POST['Emision'],$_POST['Autorizacion']);
  }
 

}

