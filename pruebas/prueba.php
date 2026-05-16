



<?php

 /*$files = array('0' => '2708201801099289451200110010010000001984126153311.pdf' ,
							 '1' => 'signed.xml' );

    // email fields: to, from, subject, and so on
    $to = "mauro_vv96@hotmail.com";
    $from = "example@gmail.com"; 
    $subject ="My subject"; 
    $message = "My message";
    $headers = "From: $from";

    // boundary 
    $semi_rand = md5(time()); 
    $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x"; 

    // headers for attachment 
    $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\""; 

    // multipart boundary 
    $message = "This is a multi-part message in MIME format.\n\n" . "--{$mime_boundary}\n" . "Content-Type: text/plain; charset=\"iso-8859-1\"\n" . "Content-Transfer-Encoding: 7bit\n\n" . $message . "\n\n"; 
    $message .= "--{$mime_boundary}\n";

    // preparing attachments
    for($x=0;$x<count($files);$x++){
        $file = fopen($files[$x],"rb");
        $data = fread($file,filesize($files[$x]));
        fclose($file);
        $data = chunk_split(base64_encode($data));
        $message .= "Content-Type: {\"application/octet-stream\"};\n" . " name=\"$files[$x]\"\n" . 
        "Content-Disposition: attachment;\n" . " filename=\"$files[$x]\"\n" . 
        "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n";
        $message .= "--{$mime_boundary}\n";
    }

    // send

    $ok = mail($to, $subject, $message, $headers); 
    if ($ok) { 
        echo "<p>mail sent to $to!</p>"; 
    } else { 
        echo "<p>mail could not be sent!</p>"; 
    } 
}
}
/*
$claveAcceso='2608201801099289451200110010010000002034126153310';
 $xmlFirmar = "C:\Users\Mauro\Downloads\galenos/facturas/".$claveAcceso.".xml";
$certificado = "C:\Users\Mauro\Downloads\galenos/facturas/0992894512001.p12";
$clave="FUNSISAmp3108";
$rutaFirmados="C:\Users\Mauro\Downloads\galenos/Firmados/";
$nombreXml=$claveAcceso.".xml";

$parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;


echo shell_exec('java -jar "C:\Users\Mauro\Downloads\galenos\java/FirmaXades.jar" '.$parametros);

$name        = "Name goes here";
$email       = "mauro_vv96@hotmail.com";
$to          = "mauro_vv96@hotmail.com";
$from        = "John-Smith ";
$subject     = "Here is your attachment";
$mainMessage = "HOLA ";
$fileatt     = "../Rides/2708201801099289451200110010010000001984126153311.pdf";
$fileatttype = "application/pdf";
$fileattname = "RIDE.pdf";
$headers = "From: $from";

// File
$file = fopen($fileatt, 'rb');
$data = fread($file, filesize($fileatt));
fclose($file);

// This attaches the file
$semi_rand     = md5(time());
$mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";
$headers      .= "\nMIME-Version: 1.0\n" .
"Content-Type: multipart/mixed;\n" .
" boundary=\"{$mime_boundary}\"";

$message = "This is a multi-part message in MIME format.\n\n" .
"-{$mime_boundary}\n" .
"Content-Type: text/plain; charset=\"iso-8859-1\n" .
"Content-Transfer-Encoding: 7bit\n\n" .
$mainMessage  . "\n\n";

$message = "This is a multi-part message in MIME format.\n\n" . "--{$mime_boundary}\n" . "Content-Type: text/plain; charset=\"iso-8859-1\"\n" . "Content-Transfer-Encoding: 7bit\n\n" . $mainMessage . "\n\n"; 
    

$data = chunk_split(base64_encode($data));
$message .= "--{$mime_boundary}\n" .
"Content-Type: {$fileatttype};\n" .
" name=\"{$fileattname}\"\n" .
"Content-Disposition: attachment;\n" .
" filename=\"{$fileattname}\"\n" .
"Content-Transfer-Encoding: base64\n\n" .
$data . "\n\n" .
"-{$mime_boundary}-\n";

$fileattname = "RIDE.xml";
$file = fopen('signed.xml', 'rb');
$data = fread($file, filesize($fileatt));
fclose($file);

$data = chunk_split(base64_encode($data));
$message .= "--{$mime_boundary}\n" .
"Content-Type: {$fileatttype};\n" .
" name=\"{$fileattname}\"\n" .
"Content-Disposition: attachment;\n" .
" filename=\"{$fileattname}\"\n" .
"Content-Transfer-Encoding: base64\n\n" .
$data . "\n\n" .
"-{$mime_boundary}-\n";

// Send the email
if(mail($to, $subject, $message, $headers)) {

    echo "The email was sent.";

}
else {

    echo "There was an error sending the mail.";

}
*/

//require_once('lib/nusoap.php');


		/*$facturas  = scandir('../Firmados');
		foreach ($facturas as $valor) {
			if(is_file("../Firmados/".$valor)){
				echo basename(str_replace("factura","",$valor), ".xml").PHP_EOL."<br>";
			}
        	
      	}*/


	/*$client = new nusoap_client('https://cel.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl',true);
		$client->soap_defencoding = 'utf-8';
		$client->setHTTPEncoding('gzip, deflate');
		
		$err = $client->getError();
		  if ($err) {
		    $jsondata[0]=$err.' ERRORSASO';
		  }


 		$filename ="../Firmados/0907202101099289451200120010310000266544126153319.xml";
        
        if(is_file($filename)){
          $byte_array = file_get_contents($filename);
          $param = array('xml' => base64_encode($byte_array));
          //print_r(base64_encode($byte_array));
          $result = $client->call('validarComprobante',$param,"http://ec.gob.sri.ws.recepcion/");
          print_r($result);



        
        }
		
		/*$param = array('xml' => base64_encode($byte_array));
	/*	$param = array('claveAccesoComprobante' =>'0210201801099289451200110010080000003544126153319');
  
  		$result = $client->call('autorizacionComprobante',$param,"http://ec.gob.sri.ws.recepcion/");*/
		
//$result['RespuestaRecepcionComprobante']['estado']
  		//$result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje']
//print_r($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje']);
       
      /* $datetime = DateTime::createFromFormat('Y-m-d', '2019-02-24');
       echo $datetime->format('D'); */


require_once '../mail/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
$mail = new PHPMailer;
$mail->IsSMTP();
$mail->SMTPDebug = 1;
    $mail->SMTPAuth = true;    
    $mail->Host = "smtp.gmail.com";
    $mail->Username = "santaisabelcorreo@gmail.com";
    $mail->Password = "santaisabel1";
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';
    //From email address and name
    $mail->From = "santaisabelcorreo@gmail.com";
    $mail->FromName = "CENTRO MEDICO SANTA ISABEL";
    $mail->isHTML(true);



  $email = "mauro_vv96@hotmail.com";
  $nombre = "MAuro";
  $titulo = "Santa ISABEL";
  $mensaje = "pruebas";

  $para = $email;
  $mail->addAddress($para);
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

    

    $mail->Subject = "RESULTADOS DE LABORATORIO ";

      $mail->Body = $cuerpo;

  echo $mail->send();
?>
