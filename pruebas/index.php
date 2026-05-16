
<!--$xmlFirmar = "//CONTABLE-PC//htdocs//galenos//facturas//factura0010010000170.xml";
$certificado = "//CONTABLE-PC//htdocs//galenos//facturas//0992894512001.p12";
$clave="FUNSISAmp3108";
$rutaFirmados="//CONTABLE-PC//htdocs//galenos//Firmados//";
$nombreXml="factura0010010000170.xml";

$parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;


echo shell_exec('java -jar "//CONTABLE-PC//htdocs//galenos\java/FirmaXades.jar" '.$parametros);-->

<?php 
    require_once '../Lib/dompdf/lib/html5lib/Parser.php';
	require_once '../Lib/dompdf/src/Autoloader.php';
	include '../Controladores/barcode.php';
	Dompdf\Autoloader::register();

$codigoHTML = '<div style="margin-top: 1em; width:100%;">
				<div style="width: 63%; height: 100px; margin: 6px;">
					<img src="../imagenes/LOGO.jpg" width="100%" height="100%" >
				</div>
				<div style="width: 63%; height: 130px; border-style: solid; margin: 6px; border-radius: 10px;">
					<div style="margin-top:0.5em; margin-left: 0.5em;">
						<label style="font-weight: bold; font-size: 12px;">FUNDACION SANTA ISABEL MADRE DEL PRECURSOR</label><br>
						<label style="font-size: 12px;">Dir. Matriz</label><br>
						<label style="font-weight: bold; font-size: 12px;">AUTORIZACION</label><br>
						<label style="font-weight: bold; font-size: 12px;">CLAVE DE ACCESO</label><br>
						<img src="../Controladores/nombre.png" width="98%">
						<label style="font-size: 12px;">&nbsp;&nbsp;&nbsp;&nbsp;</label>
					</div>
					<div style="float: right; margin-top: -7.3em; margin-right: 5px;">
						<label style="font-size: 12px;">SAUCES 6 MANZANA 259-49 SOLAR 25</label><br>
						<label style="font-weight: bold; font-size: 12px;">2208201801099289451200120010080000132650001326517</label><br>
					</div>
				</div>
				<div style="width: 34%; height: 237px; border-style: solid; margin-left: 30em; position: absolute; margin-top:5em; border-radius: 10px;">
					<div>
						<center>
							<label style="font-size: 12px;">RUC: 0992894512001</label><br>
							<label style="font-weight: bold; font-size: 12px;">FACTURA</label><br>
							<label style="font-weight: bold; font-size: 12px;">No. 001-008-000013265</label><br>
						</center>
					</div>
					<div style="margin-left: 1.2em;">
						<label style="font-size: 12px;">Fecha Emisión: <label style="font-weight: bold; font-size:12px;">22/ago/2018</label></label><br><br>
						<label style="font-size: 12px;">FECHA Y HORA DE AUTORIZACIÓN</label><br><br>
					</div>
					<div style="margin-left: 1.2em; margin-top: 0.5em;">
					<label style="font-size: 12px;"><label style="font-weight: bold; font-size: 12px;">22/08/2018 14:29</label></label><br>
						<label style="font-size: 12px;">AMBIENTE: <label style="font-weight: bold; font-size: 12px;">PRUEBA</label></label><br>
						<label style="font-size: 12px;">EMISIÓN: <label style="font-weight: bold; font-size: 12px;">NORMAL</label></label><br>
						<label style="font-size: 10px;">Obligado a llevar contabilidad: SI</label>
					</div>
				</div>
				<div style="width: 99%; height: 65px; border-style: solid; margin: 6px; margin-top: -4.5em;">
					<div style="margin-top:0em; margin-left: 0.5em;">
						<label style="font-size: 12px;">Nombre:</label><br>
						<label style="font-size: 12px;">Dirección:</label><br>
						<label style="font-size: 12px;">Teléfono:</label>
					</div>
					<div style="margin-top:-6em; margin-left: 6em;">
						<label style="font-size: 12px; font-weight: bold;">GENSY MIGUEL CARDOSO BARROSO</label><br>
						<label style="font-size: 12px; font-weight: bold;">PEDRO CARBO</label><br>
						<label style="font-size: 12px; font-weight: bold;">0960099849</label>
					</div>
					<div style="margin-top:-120px; margin-left: 22em;">
						<label style="font-size: 12px;">Identificación:</label><br>
						<label style="font-size: 12px;">Email:</label><br>
						<label style="font-size: 12px;">Paciente:</label>
					</div>
					<div style="margin-top:-3.1em; margin-left: 29em;">
						<label style="font-size: 12px; font-weight: bold;">0916892581</label><br>
						<label style="font-size: 12px; font-weight: bold;">gensycardoso@hotmail.com</label><br>
						<label style="font-size: 12px; font-weight: bold;">CHAVEZ PINARGOTE INOCENSIO NICOLAS</label>
					</div>
				</div>
				<div style="width: 99%; margin: 6px; ">
					<table style="width: 100%" border="1">
						<thead>
							<td style="text-align: center; font-weight: bold;">Código</td>
							<td style="text-align: center; font-weight: bold;">Cantidad</td>
							<td style="text-align: center; font-weight: bold;">Descripción</td>
							<td style="text-align: center; font-weight: bold;">Precio Unita</td>
							<td style="text-align: center; font-weight: bold;">Descto.</td>
							<td style="text-align: center; font-weight: bold;">Precio Total</td>
						</thead>
						<tbody>
							<tr>
								<td style=" font-size: 12px;">24121200</td>
								<td style="text-align: right; font-size: 12px;">1.00000</td>
								<td style=" font-size: 12px;">PSICOLOGIA-CONSULTA-MELENDEZ MONTERO DENISSE</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
								<td style="text-align: right; font-size: 12px;">0.0000%</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
							</tr>
							<tr>
								<td style=" font-size: 12px;">24121200</td>
								<td style="text-align: right; font-size: 12px;">1.00000</td>
								<td style=" font-size: 12px;">PSICOLOGIA-CONSULTA-MELENDEZ MONTERO DENISSE</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
								<td style="text-align: right; font-size: 12px;">0.0000%</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
							</tr>
							<tr>
								<td style=" font-size: 12px;">24121200</td>
								<td style="text-align: right; font-size: 12px;">1.00000</td>
								<td style=" font-size: 12px;">PSICOLOGIA-CONSULTA-MELENDEZ MONTERO DENISSE</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
								<td style="text-align: right; font-size: 12px;">0.0000%</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
							</tr>
							<tr>
								<td style=" font-size: 12px;">24121200</td>
								<td style="text-align: right; font-size: 12px;">1.00000</td>
								<td style=" font-size: 12px;">PSICOLOGIA-CONSULTA-MELENDEZ MONTERO DENISSE</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
								<td style="text-align: right; font-size: 12px;">0.0000%</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
							</tr>
							<tr>
								<td style=" font-size: 12px;">24121200</td>
								<td style="text-align: right; font-size: 12px;">1.00000</td>
								<td style=" font-size: 12px;">PSICOLOGIA-CONSULTA-MELENDEZ MONTERO DENISSE</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
								<td style="text-align: right; font-size: 12px;">0.0000%</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
							</tr>
							<tr>
								<td style=" font-size: 12px;">24121200</td>
								<td style="text-align: right; font-size: 12px;">1.00000</td>
								<td style=" font-size: 12px;">PSICOLOGIA-CONSULTA-MELENDEZ MONTERO DENISSE</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
								<td style="text-align: right; font-size: 12px;">0.0000%</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
							</tr>
							<tr>
								<td style=" font-size: 12px;">24121200</td>
								<td style="text-align: right; font-size: 12px;">1.00000</td>
								<td style=" font-size: 12px;">PSICOLOGIA-CONSULTA-MELENDEZ MONTERO DENISSE</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
								<td style="text-align: right; font-size: 12px;">0.0000%</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
							</tr>
							<tr>
								<td style=" font-size: 12px;">24121200</td>
								<td style="text-align: right; font-size: 12px;">1.00000</td>
								<td style=" font-size: 12px;">PSICOLOGIA-CONSULTA-MELENDEZ MONTERO DENISSE</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
								<td style="text-align: right; font-size: 12px;">0.0000%</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
							</tr>
							<tr>
								<td style=" font-size: 12px;">24121200</td>
								<td style="text-align: right; font-size: 12px;">1.00000</td>
								<td style=" font-size: 12px;">PSICOLOGIA-CONSULTA-MELENDEZ MONTERO DENISSE</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
								<td style="text-align: right; font-size: 12px;">0.0000%</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
							</tr>
							<tr>
								<td style=" font-size: 12px;">24121200</td>
								<td style="text-align: right; font-size: 12px;">1.00000</td>
								<td style=" font-size: 12px;">PSICOLOGIA-CONSULTA-MELENDEZ MONTERO DENISSE</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
								<td style="text-align: right; font-size: 12px;">0.0000%</td>
								<td style="text-align: right; font-size: 12px;">$ 8.00</td>
							</tr>
						</tbody>
					</table>
				</div>				
				<div style="width: 55%; height: 240px; position:relative; border-style: solid; margin: 7px; border-radius: 10px;">
					<div style="margin-top:0.5em;">
						<center>
							<label style="font-weight: bold;">FORMA PAGO</label><br>
						</center>
						<table style="width: 100%" border="1">
						  <thead>
							<tr>
						    <th>FORMA PAGO</th>
						    <th>$TOTAL</th>
						  </tr>
						 </thead>
						 <tbody>
						     
						 </tbody>
						</table>
					</div>					
				</div>

				<div style="width: 42%; height: 240px; border-style: solid; float: right;  margin-top: -300px; border-radius: 10px;">
					<div style="margin-top:0.5em; margin-left: 0.5em;">
						<label style="font-size: 14px;">SUBTOTAL</label><br>
						<label style="font-size: 14px;">DESCUENTO:</label><br>
						<label style="font-size: 14px;">SUBTOTAL 12%:</label><br>
						<label style="font-size: 14px;">SUBTOTAL 0%:</label><br>
						<label style="font-size: 14px;">SUBTOTAL No objeto de IV</label><br>
						<label style="font-size: 14px;">SUBTOTAL SIN IMPUESTOS</label><br>
						<label style="font-size: 14px;">SUBTOTAL Exento de IVA:</label><br>
						<label style="font-size: 14px;">ICE:</label><br>
						<label style="font-size: 14px;">IVA:</label><br>
						<label style="font-size: 14px;">IRBPNR:</label><br>
						<label style="font-size: 14px;">PROPINA:</label><br>
						<label style="font-size: 14px; font-weight: bold;">VALOR TOTAL:</label>
					</div>
					<div style="margin-top:-14em; float: right; margin-right: 0.5em;">
						<label style="font-size: 14px; font-weight: bold;">$ 8.00</label><br>
						<label style="font-size: 14px; font-weight: bold;">$ 0.00</label><br>
						<label style="font-size: 14px; font-weight: bold;">$ 0.00</label><br>
						<label style="font-size: 14px; font-weight: bold;">$ 8.00</label><br>
						<label style="font-size: 14px; font-weight: bold;">$ 0.00</label><br>
						<label style="font-size: 14px; font-weight: bold;">$ 8.00</label><br>
						<label style="font-size: 14px; font-weight: bold;">$ 0.00</label><br>
						<label style="font-size: 14px; font-weight: bold;">$ 0.00</label><br>
						<label style="font-size: 14px; font-weight: bold;">$ 0.00</label><br>
						<label style="font-size: 14px; font-weight: bold;">$ 0.00</label><br>
						<label style="font-size: 14px; font-weight: bold;">$ 0.00</label><br>
						<label style="font-size: 14px; font-weight: bold;">$ 8.00</label>
					</div>
				</div>
			</div>';
use Dompdf\Dompdf;
use Dompdf\Options;



$options = new Options();
$options->set('defaultFont', 'Courier');
$options->set('isHtml5ParserEnabled', true);
$dompdf = new Dompdf($options);
$dompdf->loadHtml($codigoHTML);
$dompdf->render();
ob_end_clean();
$output = $dompdf->output();
file_put_contents('../filename.pdf', $output);
