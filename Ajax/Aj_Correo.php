<?php
session_start();

require_once "autoloadAjax.php";

require_once 'dompdf/lib/html5lib/Parser.php';
require_once 'dompdf/src/Autoloader.php';

require_once '../mail/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

Dompdf\Autoloader::register();

use Dompdf\Dompdf;
use Dompdf\Options;
use Dompdf\Css\Stylesheet;

function CargarReporteDiseno($numero)
{
	$dao = new Dao();
	$dao->Campo("html", "");
	$dao->Campo("estilos", "");
	$dao->Tabla("reporte", "");
	$dao->Where("reporte", $numero, "");
	$respuesta = $dao->Consultar();
	return $respuesta;
}
function ObtenerFirmaMedico($id)
{
	$dao = new Dao();
	$dao->Campo("e.firma", "");
	$dao->Campo("e.cedula", "");
	$dao->TablasInnerAlias("consulta_item","ci","empleado", "e");
	$dao->Where("id_consulta", $id, "");
	$dao->Limite("1");
	$respuesta = $dao->Consultar();
	$foto = [];
	foreach ($respuesta as $row => $item) {
		$foto = $item;
	}
	return $foto;
}

function EnviarResultadosNube($pdf,$consulta)
{
	$headers =  [
		'Content-Type: application/x-www-form-urlencoded'
	];
	$data = array(
		'Requerimiento' => "GuardarPDF",
		'Pdf' => $pdf,
		'Consulta' => $consulta
	);
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://localhost:8888/ResultadosEsculapio/Ajax/Aj_Resultados.php");
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
	$result = curl_exec($ch);
	curl_close($ch);

	
}
function CrearPdf($fecha, $paciente, $identificacion, $edad, $hcu, $detalle,$consulta)
{
	$respuesta = CargarReporteDiseno(1);
	$htmlfinal = "";
	$estilosfinal = "";
	$datosmedico = ObtenerFirmaMedico($consulta);
	$imgqr = "";
	if($_POST["SubirPdf"]=="S"){
		$rutaqr = '../imagenes/' . $consulta . ".png";
		$imgqr = '<img src="'.$rutaqr.'" style="width: 150px;height: 150px;"></img>';
		$imgqr .= '<img src="../imagenes/qrsantaisabel.png" style="width: 150px;height: 150px;margin-left:3em;"></img>';
	}
	foreach ($respuesta as $row => $item) {

		$htmlfinal = str_replace("°", '"', $item[0]);
		$estilosfinal = str_replace("°", '"', $item[1]);
		$estilosfinal = str_replace("http://localhost/", '../', $estilosfinal);
		$estilosfinal = str_replace("http://localhost:8080/", '../', $estilosfinal);
		$estilosfinal = str_replace("http://94.130.108.30/perlanegra/", '../', $estilosfinal);
		$estilosfinal = str_replace("http://quickcont.ipse.com.ec/", '../', $estilosfinal);

		$htmlfinal = str_replace("{empresa}", $_SESSION["empresa"], $htmlfinal);
		$htmlfinal = str_replace("{ruc}", $_SESSION["ruc"], $htmlfinal);
		$htmlfinal = str_replace("{direccion}", $_SESSION["direccion"], $htmlfinal);
		$htmlfinal = str_replace("{telefono}", $_SESSION["telefono"], $htmlfinal);
		$htmlfinal = str_replace("{horarioatencion}", $_SESSION["horario"], $htmlfinal);

		$htmlfinal = str_replace("IMAGENES/MEDICO.PNG", "../" . $_SESSION["logo2"], $htmlfinal);
		$htmlfinal = str_replace("imagenes/producto.png", "../" . $_SESSION["logo1"], $htmlfinal);
		$htmlfinal = str_replace("IMAGENES/FIRMAMEDICO.PNG", "../" . $datosmedico[0], $htmlfinal);

		$htmlfinal = str_replace("{fecha}", $fecha, $htmlfinal);
		$htmlfinal = str_replace("{paciente}", $paciente, $htmlfinal);
		$htmlfinal = str_replace("{identificacion}", $identificacion, $htmlfinal);
		$htmlfinal = str_replace("{edad}", $edad, $htmlfinal);
		$htmlfinal = str_replace("{hcu}", $hcu, $htmlfinal);

		$htmlfinal = str_replace("{medico}", $_POST["MedicoEnvio"], $htmlfinal);
		$htmlfinal = str_replace("{fechavalidacion}", $_POST["FechaValido"], $htmlfinal);
		$htmlfinal = str_replace("{nombredoctor}", $_POST["NombreDoctor"], $htmlfinal);
		$htmlfinal = str_replace("{ceduladoctor}", $datosmedico[1]. "<br><br>" . $imgqr, $htmlfinal);

	}
	$dom = new DomDocument();
	$dom->loadHTML('<?xml encoding="utf-8" ?>' . $htmlfinal);
	$tabladetalle = $dom->getElementById('tablaresultado');
	$filastabla = $tabladetalle->getElementsByTagName('tr');
	$primerafila = $filastabla->item(1);
	$fila = $dom->saveHTML($primerafila);

	$array = json_decode($detalle, true);
	for ($i = sizeof($array) - 1; $i >= 0; $i--) {
		$producto = $array[$i];
		$agregar = str_replace("{procedimiento}", $producto[0], $fila);
		$agregar = str_replace("{resultado}", $producto[1], $agregar);
		$agregar = str_replace("{unidad}", $producto[2], $agregar);
		$agregar = str_replace("{descripcion}", $producto[3], $agregar);
		$agregar = str_replace("{minimo}", $producto[4], $agregar);
		$agregar = str_replace("{maximo}", $producto[5], $agregar);
		if ($producto[0] != "__" && $producto[1] != "__" && $producto[3] != "__") {
			$dom_to_add = new DOMDocument();
			$dom_to_add->loadHTML('<?xml encoding="utf-8" ?>' . $agregar);
			$new_element = $dom_to_add->documentElement;
			$imported_element = $dom->importNode($new_element, true);
			$primerafila->parentNode->insertBefore($imported_element, $primerafila->nextSibling);
		}
	}
	$primerafila->parentNode->removeChild($primerafila);
	$htmlfinal = $dom->saveHTML();

	$codigoHTML = ' <!DOCTYPE html>
                        <html>
                        <head>
                        <meta charset="utf-8">
                            <style type="text/css">
                              @page{margin:10px;}                                
                            </style>
                            ' . $estilosfinal . '                          
                        </head>
                        <body>
                          ' . $htmlfinal . '
                        </body>
                    </html> ';

	$options = new Options();
	$options->set('isHtml5ParserEnabled', true);
	$dompdf = new Dompdf($options);
	$dompdf->loadHtml($codigoHTML);
	$dompdf->render();
	$output = $dompdf->output();
	if($_POST["SubirPdf"]=="S"){
		EnviarResultadosNube($output,$consulta);
	}

	file_put_contents('../documentos/' . $hcu . '.pdf', $output);
}

if ($_POST['Requerimiento'] == "enviarCorreo") {

	session_write_close();
	$nombre = $_POST['Paciente'];
	$mensaje = 'Estimado paciente ' . $nombre . ', ' . $_SESSION["nombreComercial"] . ' agradece su confianza. Adjunto encontrará los resultados del procedimiento que se realizó en nuestra institución.';

	CrearPdf($_POST["Fecha"], $_POST['Paciente'], $_POST['Cedula'], $_POST['Edad'], $_POST['HCU'], $_POST['Detalle'], $_POST['Consulta']);

	$mail = new PHPMailer;
	$mail->IsSMTP();
	$mail->SMTPAuth = true;
	$mail->CharSet = 'UTF-8';
	$mail->Host = $_SESSION["HostSmtp"];
	$mail->Username = $_SESSION["correoResultados"];
	$mail->Password = $_SESSION["PsdCorreo2"];
	$mail->SMTPSecure = ($_SESSION["SmtpSecure"] == "S") ? 'ssl' : "tls";
	$mail->Port = $_SESSION["PuertoSmtp"];
	$mail->From = $_SESSION["correoResultados"];
	$mail->FromName = $_SESSION["empresa"];

	$mail->addAddress($_POST['Email']);
	$mail->isHTML(true);

	$mail->Subject = 'RESULTADOS DE LABORATORIO - ' . $_SESSION["nombreComercial"];

	$mail->addAttachment('../documentos/' . $_POST['HCU'] . '.pdf');

	$mail->Body = $mensaje;
	if($_POST["SubirPdf"]=="N"){
		$envio = $mail->send();
	}
	
	echo json_encode(true);

	unlink('../documentos/' . $_POST['HCU'] . '.pdf');
}
