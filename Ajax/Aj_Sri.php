<?php
session_start();
date_default_timezone_set('America/Guayaquil');

require_once "autoloadAjax.php";
require_once('lib/nusoap.php');

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

$ruta_validar = "https://cel.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl";
$ruta_autorizar = "https://cel.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl";


//$ruta_validar="https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl";
//$ruta_autorizar="https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline?wsdl";

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
function ObtenerCliente($id)
{

  $datos = null;

  $dao2 = new Dao();
  $dao2->Campo("CONCAT(apellido,' ',nombre) paciente", "");
  $dao2->Campo("direccion", "");
  $dao2->Campo("telefono", "");
  $dao2->Campo("ruc", "");
  $dao2->Campo("email", "");
  $dao2->Tabla("paciente_cliente", "");
  $dao2->Where("id", $id, "");

  $respuesta2 = $dao2->Consultar();
  foreach ($respuesta2 as $row => $item1) {
    $datos = $item1;
  }

  return $datos;
}
function ObtenerItemId($tabla, $idBuscar)
{

  $producto = '';
  $dao = new Dao();
  $dao->Campo("nombre", "");
  $dao->Tabla($tabla, "");

  $dao->Where("id", $idBuscar, "");
  $respuesta = $dao->Consultar();
  foreach ($respuesta as $row => $item) {
    $producto = $item[0];
  }
  return $producto;
}
function ObtenerDetalleFactura($idConsulta)
{
  $dao = new Dao();
  $dao->Campo("c.*", "");
  $dao->Campo("CONCAT(e.apellidos,' ',e.nombres)", "");
  $dao->TablasInnerAlias("consulta_item", "c", "empleado", "e");
  $dao->Where("c.id_consulta", $idConsulta, "");
  $respuesta = $dao->Consultar();
  return $respuesta;
}
function ObtenerFormaPago($idConsulta)
{
  $dao = new Dao();
  $dao->Campo("f.*", "");
  $dao->Tabla("forma_pago", "f");
  $dao->Where("f.id_consulta", $idConsulta, "");
  $respuesta = $dao->Consultar();
  return $respuesta;
}
function CrearRide($clave, $factura, $fechaEmision, $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $paciente, $subtotal, $descuento, $total, $idConsulta)
{

  include_once 'barcode.php';
  barcode('../imagenes/barras/' . $clave . '.png', $clave, 30, 'horizontal', 'code128', true);


  $empresa = $_SESSION["empresa"];
  $ruc = $_SESSION["ruc"];
  $direccion = $_SESSION["direccion"];
  $ambiente = 'PRODUCCION';
  $emision = 'NORMAL';
  $fechaAutorizacion = date("d/m/Y H:i:s");

  $respuesta = CargarReporteDiseno(4);
  $htmlfinal = "";
  $estilosfinal = "";

  foreach ($respuesta as $row => $item) {

    $htmlfinal = str_replace("°", '"', $item[0]);
    $estilosfinal = str_replace("°", '"', $item[1]);
    $estilosfinal = str_replace("http://localhost:8080/", '../', $estilosfinal);
    $estilosfinal = str_replace("http://94.130.108.30/perlanegra/", '../', $estilosfinal);
    $estilosfinal = str_replace("http://quickcont.ipse.com.ec/", '../', $estilosfinal);

    $htmlfinal = str_replace("{rucempresa}", $ruc, $htmlfinal);
    $htmlfinal = str_replace("{numerofactura}", $factura, $htmlfinal);
    $htmlfinal = str_replace("{autorizacion}", $clave, $htmlfinal);
    $htmlfinal = str_replace("{ambiente}", $ambiente, $htmlfinal);
    $htmlfinal = str_replace("{emision}", $emision, $htmlfinal);
    $htmlfinal = str_replace("{fechaautorizacion}", $fechaAutorizacion, $htmlfinal);
    $htmlfinal = str_replace("imagenes/barras.png", "../imagenes/barras/" . $clave . ".png", $htmlfinal);
    $htmlfinal = str_replace("imagenes/producto.png", '../' . $_SESSION["logo1"], $htmlfinal);


    $htmlfinal = str_replace("{empresa}", $empresa, $htmlfinal);
    $htmlfinal = str_replace("{dirempresa}", $direccion, $htmlfinal);
    $htmlfinal = str_replace("{dirsucursal}", $direccion, $htmlfinal);
    $htmlfinal = str_replace("{contabilidad}", Configuracion::CONTABILIDAD, $htmlfinal);


    $htmlfinal = str_replace("{cliente}", $cliente, $htmlfinal);
    $htmlfinal = str_replace("{ruccliente}", $cedulaClie, $htmlfinal);
    $htmlfinal = str_replace("{direccioncliente}", $dirCliente, $htmlfinal);
    $htmlfinal = str_replace("{emailcliente}", $emailClie, $htmlfinal);
    $htmlfinal = str_replace("{emisionfactura}", $fechaEmision, $htmlfinal);
    $htmlfinal = str_replace("{paciente}", $paciente, $htmlfinal);

    $htmlfinal = str_replace("{documento}", $idConsulta, $htmlfinal);
    $htmlfinal = str_replace("{guiaremision}", "", $htmlfinal);
    $htmlfinal = str_replace("{observciones}", "", $htmlfinal);
    $htmlfinal = str_replace("{vendedor}", "", $htmlfinal);

    $htmlfinal = str_replace("{subtotal12}", "$ " . number_format(0, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{subtotal0}", "$ " . number_format($subtotal, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{descuento}", "$ " . number_format($descuento, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{subtotal}", "$ " . number_format($subtotal, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{totalice}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{impuesto}", "$ " . number_format(0, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{irbpnr}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{propina}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{valortotal}", "$ " . number_format($total, 2, '.', ','), $htmlfinal);

    $dom = new DomDocument();
    $dom->loadHTML('<?xml encoding="utf-8" ?>' . $htmlfinal);
    $tabladetalle = $dom->getElementById('tabladetalle');
    $filastabla = $tabladetalle->getElementsByTagName('tr');
    $primerafila = $filastabla->item(1);
    $fila = $dom->saveHTML($primerafila);

    $respuesta = ObtenerDetalleFactura($idConsulta);
    foreach ($respuesta as $row => $item) {

      $tabla = '';
      $idBuscar = 0;
      $codigo = '';
      if ($item[2] != null) {
        $tabla = 'procedimiento';
        $idBuscar = $item[2];
        $codigo = 'CON' . $idBuscar;
      }
      if ($item[10] != null) {
        $tabla = 'procedimiento_laboratorio';
        $idBuscar = $item[10];
        $codigo = 'LAB' . $idBuscar;
      }
      if ($item[11] != null) {
        $tabla = 'procedimiento_rx';
        $idBuscar = $item[11];
        $codigo = 'RX' . $idBuscar;
      }
      if ($item[12] != null) {
        $tabla = 'procedimiento_eco';
        $idBuscar = $item[12];
        $codigo = 'ECO' . $idBuscar;
      }
      if ($item[13] != null) {
        $tabla = 'procedimiento_tomo';
        $idBuscar = $item[13];
        $codigo = 'TOMO' . $idBuscar;
      }
      $producto = ObtenerItemId($tabla, $idBuscar);
      $descuentoXml = ($item[6] * $item[7]) / 100;
      $subtotalXml = $item[6];
      $resta = $subtotalXml - $descuentoXml;

      $agregar = str_replace("{codigo}", $codigo, $fila);
      $agregar = str_replace("{descripcion}", '<div>' . $producto . '</div>' . '<div>' . $item[20] . '</div>', $agregar);
      $agregar = str_replace("{cantidad}", number_format(1, 2, '.', ','), $agregar);
      $agregar = str_replace("{precio}", number_format($item[6], 4, '.', ','), $agregar);
      $agregar = str_replace("{iva}", "N", $agregar);
      $agregar = str_replace("{importe}", number_format($resta, 2, '.', ','), $agregar);

      $dom_to_add = new DOMDocument();
      $dom_to_add->loadHTML('<?xml encoding="utf-8" ?>' . $agregar);
      $new_element = $dom_to_add->documentElement;
      $imported_element = $dom->importNode($new_element, true);
      $primerafila->parentNode->insertBefore($imported_element, $primerafila->nextSibling);
    }

    $tablapagos = $dom->getElementById('tablapagos');
    $filastabla = $tablapagos->getElementsByTagName('tr');
    $primerafilafp = $filastabla->item(1);
    $fila = $dom->saveHTML($primerafilafp);

    $respuesta = ObtenerFormaPago($id);
    foreach ($respuesta as $row => $item) {
      $plazo = "";

      if ($item[16] == "MENSUAL") {
        $plazo = "30";
      }
      if ($item[16] == "QUINCENAL") {
        $plazo = "15";
      }
      if ($item[16] == "SEMANAL") {
        $plazo = "7";
      }
      if ($plazo != "") {
        $plazo .= " Dias";
      }
      $totalOtros = 0;
      if ($item[4] == "EFECTIVO") {
        $item[0] = "SIN UTILIZACION DEL SISTEMA FINANCIERO";
        $totalOtros = $item[5];
      } else {
        $item[0] = "OTROS CON UTILIZACION DEL SISTEMA FINANCIERO";
        if ($item[4] == 'CHEQUE') {
          $totalOtros = $item[9];
        }
        if ($item[4] == 'TARJETA') {
          $totalOtros = $item[14];
        }
        if ($item[4] == 'CREDITO') {
          $totalOtros = $item[22];
        }
        if ($item[4] == 'ANTICIPO') {
          $totalOtros = $item[25];
        }
        if ($item[4] == 'TRANSFERENCIA') {
          $totalOtros = $item[33];
        }
      }
      $agregar = str_replace("{formapago}", $item[0], $fila);
      $agregar = str_replace("{totalfp}", number_format($totalOtros, 2, '.', ','), $agregar);
      $agregar = str_replace("{plazo}", $plazo, $agregar);

      $dom_to_add = new DOMDocument();
      $dom_to_add->loadHTML('<?xml encoding="utf-8" ?>' . $agregar);
      $new_element = $dom_to_add->documentElement;
      $imported_element = $dom->importNode($new_element, true);
      $primerafilafp->parentNode->insertBefore($imported_element, $primerafilafp->nextSibling);
    }
    $primerafilafp->parentNode->removeChild($primerafilafp);
    $primerafila->parentNode->removeChild($primerafila);
    $htmlfinal = $dom->saveHTML();
  }


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

  file_put_contents('../Rides/' . $clave . '.pdf', $output);
  unlink('../imagenes/barras/' . $clave . '.png');

  return true; //EnviarEmail($emailClie,$clave,$cliente,round($total,2));
}
function ObtenerDetalleFactura2($idConsulta)
{
  $dao = new Dao();
  $dao->Campo("c.*", "");
  $dao->Campo("i.nombre", "");
  $dao->Campo("i.iva", "");

  $dao->TablasInnerAlias("farmacia_item", "c", "inventario", "i");
  $dao->Where("c.id_farmacia", $idConsulta, "");
  $respuesta = $dao->Consultar();
  return $respuesta;
}
function ObtenerFormaPago2($idConsulta)
{
  $dao = new Dao();
  $dao->Campo("f.*", "");
  $dao->Tabla("forma_pago", "f");
  $dao->Where("f.id_farmacia", $idConsulta, "");
  $respuesta = $dao->Consultar();
  return $respuesta;
}
function CrearRideFarmacia($clave, $factura, $fechaEmision, $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $paciente, $subtotal, $descuento, $total, $idConsulta, $TotalIva)
{

  include_once 'barcode.php';
  barcode('../imagenes/barras/' . $clave . '.png', $clave, 30, 'horizontal', 'code128', true);

  $empresa = $_SESSION["empresa"];
  $ruc = $_SESSION["ruc"];
  $direccion = $_SESSION["direccion"];
  $ambiente = 'PRODUCCION';
  $emision = 'NORMAL';
  $fechaAutorizacion = date("d/m/Y H:i:s");

  $respuesta = CargarReporteDiseno(4);
  $htmlfinal = "";
  $estilosfinal = "";

  foreach ($respuesta as $row => $item) {

    $htmlfinal = str_replace("°", '"', $item[0]);
    $estilosfinal = str_replace("°", '"', $item[1]);
    $estilosfinal = str_replace("http://localhost:8080/", '../', $estilosfinal);
    $estilosfinal = str_replace("http://94.130.108.30/perlanegra/", '../', $estilosfinal);
    $estilosfinal = str_replace("http://quickcont.ipse.com.ec/", '../', $estilosfinal);

    $htmlfinal = str_replace("{rucempresa}", $ruc, $htmlfinal);
    $htmlfinal = str_replace("{numerofactura}", $factura, $htmlfinal);
    $htmlfinal = str_replace("{autorizacion}", $clave, $htmlfinal);
    $htmlfinal = str_replace("{ambiente}", $ambiente, $htmlfinal);
    $htmlfinal = str_replace("{emision}", $emision, $htmlfinal);
    $htmlfinal = str_replace("{fechaautorizacion}", $fechaAutorizacion, $htmlfinal);
    $htmlfinal = str_replace("imagenes/barras.png", "../imagenes/barras/" . $clave . ".png", $htmlfinal);
    $htmlfinal = str_replace("imagenes/producto.png", '../' . $_SESSION["logo1"], $htmlfinal);


    $htmlfinal = str_replace("{empresa}", $empresa, $htmlfinal);
    $htmlfinal = str_replace("{dirempresa}", $direccion, $htmlfinal);
    $htmlfinal = str_replace("{dirsucursal}", $direccion, $htmlfinal);
    $htmlfinal = str_replace("{contabilidad}", Configuracion::CONTABILIDAD, $htmlfinal);


    $htmlfinal = str_replace("{cliente}", $cliente, $htmlfinal);
    $htmlfinal = str_replace("{ruccliente}", $cedulaClie, $htmlfinal);
    $htmlfinal = str_replace("{direccioncliente}", $dirCliente, $htmlfinal);
    $htmlfinal = str_replace("{emailcliente}", $emailClie, $htmlfinal);
    $htmlfinal = str_replace("{emisionfactura}", $fechaEmision, $htmlfinal);
    $htmlfinal = str_replace("{paciente}", $paciente, $htmlfinal);

    $htmlfinal = str_replace("{documento}", $idConsulta, $htmlfinal);
    $htmlfinal = str_replace("{guiaremision}", "", $htmlfinal);
    $htmlfinal = str_replace("{observciones}", "", $htmlfinal);
    $htmlfinal = str_replace("{vendedor}", "", $htmlfinal);

    $subtotal12 = 0;
    $subtotal0 = 0;
    $subtotalFinal = 0;
    $respuesta = ObtenerDetalleFactura2($idConsulta);

    foreach ($respuesta as $row => $item) {

      $totalFinal = $item[6] - (($item[6] * $item[7]) / 100);
      
      if ($item[9] == "S") {
        $subtotal12 = $subtotal12 + $item[6];
      } else {
        $subtotal0 = $subtotal0 + $item[6];
      }
      $subtotalFinal = $subtotalFinal + $totalFinal;

    }

    $htmlfinal = str_replace("{subtotal12}", "$ " . number_format($subtotal12, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{subtotal0}", "$ " . number_format($subtotal0, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{descuento}", "$ " . number_format($descuento, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{subtotal}", "$ " . number_format($subtotalFinal, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{totalice}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{impuesto}", "$ " . number_format($TotalIva, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{irbpnr}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{propina}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{valortotal}", "$ " . number_format($total, 2, '.', ','), $htmlfinal);


    $dom = new DomDocument();
    $dom->loadHTML('<?xml encoding="utf-8" ?>' . $htmlfinal);
    $tabladetalle = $dom->getElementById('tabladetalle');
    $filastabla = $tabladetalle->getElementsByTagName('tr');
    $primerafila = $filastabla->item(1);
    $fila = $dom->saveHTML($primerafila);

    
    

    foreach ($respuesta as $row => $item) {

      $totalFinal = $item[6] - (($item[6] * $item[7]) / 100);
      if ($item[9] == "S") {
        $subtotal12 = $subtotal12 + $totalFinal;
      } else {
        $subtotal0 = $subtotal0 + $totalFinal;
      }
      $subtotalFinal = $subtotalFinal + $item[6];

      $agregar = str_replace("{codigo}", $item[2], $fila);
      $agregar = str_replace("{descripcion}", '<div>' . $item['nombre'] . '</div>' . '<div>' . $item[3] . '</div>', $agregar);
      $agregar = str_replace("{cantidad}", number_format($item[4], 2, '.', ','), $agregar);
      $agregar = str_replace("{precio}", number_format($item[5], 4, '.', ','), $agregar);
      $agregar = str_replace("{iva}", "N", $agregar);
      $agregar = str_replace("{importe}", number_format($totalFinal, 2, '.', ','), $agregar);

      $dom_to_add = new DOMDocument();
      $dom_to_add->loadHTML('<?xml encoding="utf-8" ?>' . $agregar);
      $new_element = $dom_to_add->documentElement;
      $imported_element = $dom->importNode($new_element, true);
      $primerafila->parentNode->insertBefore($imported_element, $primerafila->nextSibling);
    }


    $tablapagos = $dom->getElementById('tablapagos');
    $filastabla = $tablapagos->getElementsByTagName('tr');
    $primerafilafp = $filastabla->item(1);
    $fila = $dom->saveHTML($primerafilafp);

    $respuesta = ObtenerFormaPago2($id);
    foreach ($respuesta as $row => $item) {
      $plazo = "";

      if ($item[16] == "MENSUAL") {
        $plazo = "30";
      }
      if ($item[16] == "QUINCENAL") {
        $plazo = "15";
      }
      if ($item[16] == "SEMANAL") {
        $plazo = "7";
      }
      if ($plazo != "") {
        $plazo .= " Dias";
      }
      $totalOtros = 0;
      if ($item[4] == "EFECTIVO") {
        $item[0] = "SIN UTILIZACION DEL SISTEMA FINANCIERO";
        $totalOtros = $item[5];
      } else {
        $item[0] = "OTROS CON UTILIZACION DEL SISTEMA FINANCIERO";
        if ($item[4] == 'CHEQUE') {
          $totalOtros = $item[9];
        }
        if ($item[4] == 'TARJETA') {
          $totalOtros = $item[14];
        }
        if ($item[4] == 'CREDITO') {
          $totalOtros = $item[22];
        }
        if ($item[4] == 'ANTICIPO') {
          $totalOtros = $item[25];
        }
        if ($item[4] == 'TRANSFERENCIA') {
          $totalOtros = $item[33];
        }
      }
      $agregar = str_replace("{formapago}", $item[0], $fila);
      $agregar = str_replace("{totalfp}", number_format($totalOtros, 2, '.', ','), $agregar);
      $agregar = str_replace("{plazo}", $plazo, $agregar);

      $dom_to_add = new DOMDocument();
      $dom_to_add->loadHTML('<?xml encoding="utf-8" ?>' . $agregar);
      $new_element = $dom_to_add->documentElement;
      $imported_element = $dom->importNode($new_element, true);
      $primerafilafp->parentNode->insertBefore($imported_element, $primerafilafp->nextSibling);
    }
    $primerafilafp->parentNode->removeChild($primerafilafp);
    $primerafila->parentNode->removeChild($primerafila);
    $htmlfinal = $dom->saveHTML();
  }

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

  file_put_contents('../Rides/' . $clave . '.pdf', $output);
  unlink('../imagenes/barras/' . $clave . '.png');

  return true; //EnviarEmail($emailClie,$clave,$cliente,round($total,2));
}
function ObtenerDetalleNc($idConsulta)
{
  $dao = new Dao();
  $dao->Campo("c.*", "");
  $dao->Campo("CONCAT(e.apellidos,' ',e.nombres)", "");
  $dao->TablasInnerAlias("nc_consulta_item", "c", "empleado", "e");
  $dao->Where("c.id_nc_consulta", $idConsulta, "");
  $respuesta = $dao->Consultar();
  return $respuesta;
}

function CrearRideNcCon($clave, $factura, $fechaEmision, $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $paciente, $subtotal, $descuento, $total, $idConsulta, $facturaCon, $fecha_factura, $razon)
{

  include_once 'barcode.php';
  barcode('../imagenes/barras/' . $clave . '.png', $clave, 30, 'horizontal', 'code128', true);

  $empresa = $_SESSION["empresa"];
  $ruc = $_SESSION["ruc"];
  $direccion = $_SESSION["direccion"];
  $ambiente = 'PRODUCCION';
  $emision = 'NORMAL';
  $fechaAutorizacion = date("d/m/Y H:i:s");

  $respuesta = CargarReporteDiseno(5);
  $htmlfinal = "";
  $estilosfinal = "";

  foreach ($respuesta as $row => $item) {

    $htmlfinal = str_replace("°", '"', $item[0]);
    $estilosfinal = str_replace("°", '"', $item[1]);
    $estilosfinal = str_replace("http://localhost:8080/", '../', $estilosfinal);
    $estilosfinal = str_replace("http://94.130.108.30/perlanegra/", '../', $estilosfinal);
    $estilosfinal = str_replace("http://quickcont.ipse.com.ec/", '../', $estilosfinal);

    $htmlfinal = str_replace("{rucempresa}", $ruc, $htmlfinal);
    $htmlfinal = str_replace("{numerofactura}", $factura, $htmlfinal);
    $htmlfinal = str_replace("{autorizacion}", $clave, $htmlfinal);
    $htmlfinal = str_replace("{ambiente}", $ambiente, $htmlfinal);
    $htmlfinal = str_replace("{emision}", $emision, $htmlfinal);
    $htmlfinal = str_replace("{fechaautorizacion}", $fechaAutorizacion, $htmlfinal);
    $htmlfinal = str_replace("imagenes/barras.png", "../imagenes/barras/" . $clave . ".png", $htmlfinal);
    $htmlfinal = str_replace("imagenes/producto.png", '../' . $_SESSION["logo1"], $htmlfinal);


    $htmlfinal = str_replace("{empresa}", $empresa, $htmlfinal);
    $htmlfinal = str_replace("{dirempresa}", $direccion, $htmlfinal);
    $htmlfinal = str_replace("{dirsucursal}", $direccion, $htmlfinal);
    $htmlfinal = str_replace("{contabilidad}", Configuracion::CONTABILIDAD, $htmlfinal);


    $htmlfinal = str_replace("{cliente}", $cliente, $htmlfinal);
    $htmlfinal = str_replace("{ruccliente}", $cedulaClie, $htmlfinal);
    $htmlfinal = str_replace("{direccioncliente}", $dirCliente, $htmlfinal);
    $htmlfinal = str_replace("{emailcliente}", $emailClie, $htmlfinal);
    $htmlfinal = str_replace("{emisionfactura}", $fechaEmision, $htmlfinal);
    $htmlfinal = str_replace("{paciente}", $paciente, $htmlfinal);

    $htmlfinal = str_replace("{documento}", $idConsulta, $htmlfinal);
    $htmlfinal = str_replace("{guiaremision}", "", $htmlfinal);
    $htmlfinal = str_replace("{observciones}", $facturaCon, $htmlfinal);
    $htmlfinal = str_replace("{vendedor}", "", $htmlfinal);

    $htmlfinal = str_replace("{subtotal12}", "$ " . number_format(0, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{subtotal0}", "$ " . number_format($subtotal, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{descuento}", "$ " . number_format($descuento, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{subtotal}", "$ " . number_format($subtotal, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{totalice}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{impuesto}", "$ " . number_format(0, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{irbpnr}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{propina}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{valortotal}", "$ " . number_format($total, 2, '.', ','), $htmlfinal);

    $dom = new DomDocument();
    $dom->loadHTML('<?xml encoding="utf-8" ?>' . $htmlfinal);
    $tabladetalle = $dom->getElementById('tabladetalle');
    $filastabla = $tabladetalle->getElementsByTagName('tr');
    $primerafila = $filastabla->item(1);
    $fila = $dom->saveHTML($primerafila);

    $respuesta = ObtenerDetalleNc($idConsulta);
    foreach ($respuesta as $row => $item) {

      $tabla = '';
      $idBuscar = 0;
      $codigo = '';
      if ($item[2] != null) {
        $tabla = 'procedimiento';
        $idBuscar = $item[2];
        $codigo = 'CON' . $idBuscar;
      }
      if ($item[10] != null) {
        $tabla = 'procedimiento_laboratorio';
        $idBuscar = $item[10];
        $codigo = 'LAB' . $idBuscar;
      }
      if ($item[11] != null) {
        $tabla = 'procedimiento_rx';
        $idBuscar = $item[11];
        $codigo = 'RX' . $idBuscar;
      }
      if ($item[12] != null) {
        $tabla = 'procedimiento_eco';
        $idBuscar = $item[12];
        $codigo = 'ECO' . $idBuscar;
      }
      if ($item[13] != null) {
        $tabla = 'procedimiento_tomo';
        $idBuscar = $item[13];
        $codigo = 'TOMO' . $idBuscar;
      }
      $producto = ObtenerItemId($tabla, $idBuscar);

      $agregar = str_replace("{codigo}", $codigo, $fila);
      $agregar = str_replace("{descripcion}", '<div>' . $producto . '</div>' . '<div>' . $item[20] . '</div>', $agregar);
      $agregar = str_replace("{cantidad}", number_format(1, 2, '.', ','), $agregar);
      $agregar = str_replace("{precio}", number_format($item[6], 4, '.', ','), $agregar);
      $agregar = str_replace("{iva}", "N", $agregar);
      $agregar = str_replace("{importe}", number_format($item[6], 2, '.', ','), $agregar);

      $dom_to_add = new DOMDocument();
      $dom_to_add->loadHTML('<?xml encoding="utf-8" ?>' . $agregar);
      $new_element = $dom_to_add->documentElement;
      $imported_element = $dom->importNode($new_element, true);
      $primerafila->parentNode->insertBefore($imported_element, $primerafila->nextSibling);
    }

    $tablapagos = $dom->getElementById('tablapagos');
    $filastabla = $tablapagos->getElementsByTagName('tr');
    $primerafilafp = $filastabla->item(1);
    $fila = $dom->saveHTML($primerafilafp);

    $agregar = str_replace("{formapago}", "SIN UTILIZACION DEL SISTEMA FINANCIERO", $fila);
    $agregar = str_replace("{totalfp}", number_format($total, 2, '.', ','), $agregar);
    $agregar = str_replace("{plazo}", "", $agregar);

    $dom_to_add = new DOMDocument();
    $dom_to_add->loadHTML('<?xml encoding="utf-8" ?>' . $agregar);
    $new_element = $dom_to_add->documentElement;
    $imported_element = $dom->importNode($new_element, true);
    $primerafilafp->parentNode->insertBefore($imported_element, $primerafilafp->nextSibling);

    $primerafilafp->parentNode->removeChild($primerafilafp);
    $primerafila->parentNode->removeChild($primerafila);
    $htmlfinal = $dom->saveHTML();
  }

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

  file_put_contents('../Rides/' . $clave . '.pdf', $output);
  unlink('../imagenes/barras/' . $clave . '.png');

  return true; //EnviarEmail($emailClie,$clave,$cliente,round($total,2));
}
function ObtenerDetalleNc2($idConsulta)
{
  $dao = new Dao();
  $dao->Campo("c.*", "");
  $dao->Campo("i.nombre", "");
  $dao->TablasInnerAlias("nc_farmacia_item", "c", "inventario", "i");
  $dao->Where("c.id_nc_farmacia", $idConsulta, "");
  $respuesta = $dao->Consultar();
  return $respuesta;
}
function CrearRideNcFarm($clave, $factura, $fechaEmision, $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $paciente, $subtotal, $descuento, $total, $idConsulta, $facturaCon, $fecha_factura, $razon, $TotalIva)
{

  include_once 'barcode.php';
  barcode('../imagenes/barras/' . $clave . '.png', $clave, 30, 'horizontal', 'code128', true);
  $empresa = $_SESSION["empresa"];
  $ruc = $_SESSION["ruc"];
  $direccion = $_SESSION["direccion"];
  $ambiente = 'PRODUCCION';
  $emision = 'NORMAL';
  $fechaAutorizacion = date("d/m/Y H:i:s");

  $respuesta = CargarReporteDiseno(5);
  $htmlfinal = "";
  $estilosfinal = "";

  foreach ($respuesta as $row => $item) {

    $htmlfinal = str_replace("°", '"', $item[0]);
    $estilosfinal = str_replace("°", '"', $item[1]);
    $estilosfinal = str_replace("http://localhost:8080/", '../', $estilosfinal);
    $estilosfinal = str_replace("http://94.130.108.30/perlanegra/", '../', $estilosfinal);
    $estilosfinal = str_replace("http://quickcont.ipse.com.ec/", '../', $estilosfinal);

    $htmlfinal = str_replace("{rucempresa}", $ruc, $htmlfinal);
    $htmlfinal = str_replace("{numerofactura}", $factura, $htmlfinal);
    $htmlfinal = str_replace("{autorizacion}", $clave, $htmlfinal);
    $htmlfinal = str_replace("{ambiente}", $ambiente, $htmlfinal);
    $htmlfinal = str_replace("{emision}", $emision, $htmlfinal);
    $htmlfinal = str_replace("{fechaautorizacion}", $fechaAutorizacion, $htmlfinal);
    $htmlfinal = str_replace("imagenes/barras.png", "../imagenes/barras/" . $clave . ".png", $htmlfinal);
    $htmlfinal = str_replace("imagenes/producto.png", '../' . $_SESSION["logo1"], $htmlfinal);


    $htmlfinal = str_replace("{empresa}", $empresa, $htmlfinal);
    $htmlfinal = str_replace("{dirempresa}", $direccion, $htmlfinal);
    $htmlfinal = str_replace("{dirsucursal}", $direccion, $htmlfinal);
    $htmlfinal = str_replace("{contabilidad}", Configuracion::CONTABILIDAD, $htmlfinal);


    $htmlfinal = str_replace("{cliente}", $cliente, $htmlfinal);
    $htmlfinal = str_replace("{ruccliente}", $cedulaClie, $htmlfinal);
    $htmlfinal = str_replace("{direccioncliente}", $dirCliente, $htmlfinal);
    $htmlfinal = str_replace("{emailcliente}", $emailClie, $htmlfinal);
    $htmlfinal = str_replace("{emisionfactura}", $fechaEmision, $htmlfinal);
    $htmlfinal = str_replace("{paciente}", $paciente, $htmlfinal);

    $htmlfinal = str_replace("{documento}", $idConsulta, $htmlfinal);
    $htmlfinal = str_replace("{guiaremision}", "", $htmlfinal);
    $htmlfinal = str_replace("{observciones}", "", $htmlfinal);
    $htmlfinal = str_replace("{vendedor}", "", $htmlfinal);

    $htmlfinal = str_replace("{subtotal12}", "$ " . number_format($subtotal, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{subtotal0}", "$ " . number_format(0, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{descuento}", "$ " . number_format($descuento, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{subtotal}", "$ " . number_format($subtotal, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{totalice}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{impuesto}", "$ " . number_format($TotalIva, 2, '.', ','), $htmlfinal);
    $htmlfinal = str_replace("{irbpnr}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{propina}", "$ 0.00", $htmlfinal);
    $htmlfinal = str_replace("{valortotal}", "$ " . number_format($total, 2, '.', ','), $htmlfinal);

    $dom = new DomDocument();
    $dom->loadHTML('<?xml encoding="utf-8" ?>' . $htmlfinal);
    $tabladetalle = $dom->getElementById('tabladetalle');
    $filastabla = $tabladetalle->getElementsByTagName('tr');
    $primerafila = $filastabla->item(1);
    $fila = $dom->saveHTML($primerafila);

    $respuesta = ObtenerDetalleNc2($idConsulta);

    foreach ($respuesta as $row => $item) {

      $agregar = str_replace("{codigo}", $item[2], $fila);
      $agregar = str_replace("{descripcion}", '<div>' . $item['nombre'] . '</div>' . '<div>' . $item[3] . '</div>', $agregar);
      $agregar = str_replace("{cantidad}", number_format($item[4], 2, '.', ','), $agregar);
      $agregar = str_replace("{precio}", number_format($item[5], 4, '.', ','), $agregar);
      $agregar = str_replace("{iva}", "N", $agregar);
      $agregar = str_replace("{importe}", number_format($item[6], 2, '.', ','), $agregar);

      $dom_to_add = new DOMDocument();
      $dom_to_add->loadHTML('<?xml encoding="utf-8" ?>' . $agregar);
      $new_element = $dom_to_add->documentElement;
      $imported_element = $dom->importNode($new_element, true);
      $primerafila->parentNode->insertBefore($imported_element, $primerafila->nextSibling);
    }



    $tablapagos = $dom->getElementById('tablapagos');
    $filastabla = $tablapagos->getElementsByTagName('tr');
    $primerafilafp = $filastabla->item(1);
    $fila = $dom->saveHTML($primerafilafp);

    $agregar = str_replace("{formapago}", "SIN UTILIZACION DEL SISTEMA FINANCIERO", $fila);
    $agregar = str_replace("{totalfp}", number_format($total, 2, '.', ','), $agregar);
    $agregar = str_replace("{plazo}", "", $agregar);

    $primerafilafp->parentNode->removeChild($primerafilafp);
    $primerafila->parentNode->removeChild($primerafila);
    $htmlfinal = $dom->saveHTML();
  }

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
  
  file_put_contents('../Rides/' . $clave . '.pdf', $output);
  unlink('../imagenes/barras/' . $clave . '.png');

  return true; //EnviarEmail($emailClie,$clave,$cliente,round($total,2));
}

function EnviarEmail($destinatario, $clave, $cliente, $total)
{
  session_write_close();
  
  $mail = new PHPMailer;
  $mail->IsSMTP();
  $mail->SMTPAuth = true;
  $mail->Host = strtolower($_SESSION["HostSmtp"]);
  $mail->Username = strtolower($_SESSION["correoEmpresa"]);
  $mail->Password = $_SESSION["PsdCorreo1"];
  $mail->SMTPSecure = ($_SESSION["SmtpSecure"] == "S") ? 'ssl' : "tls";
  $mail->Port = $_SESSION["PuertoSmtp"];
  $mail->From = $_SESSION["correoEmpresa"];
  $mail->FromName = $_SESSION["empresa"];

  if ($destinatario == "") {

    $dao = new Dao();

    $dao->Campo("correo1", "");

    $dao->Tabla("empresa", "");
    $dao->Where("id", "2", "");

    $respuesta = $dao->Consultar();

    foreach ($respuesta as $row => $item) {
      $destinatario = $item[0];
    }
  }


  $correos = explode(";", $destinatario);
  for ($i = 0; $i < sizeof($correos); $i++) {
    $mail->addAddress($correos[$i]);
  }


  $mail->addAttachment('../Firmados/' . $clave . ".xml");
  $mail->addAttachment('../Rides/' . $clave . ".pdf");

  $mail->isHTML(true);

  $mail->Subject = "COMPROBANTE ELECTRONICO";
  $mail->Body = "ESTIMADO " . $cliente . " SIRVASE A ENCONTRAR ADJUNTOS LOS ARCHVIOS XML Y RIDE DE SU COMPROBANTE POR UN VALOR DE $ " . $total;

  return  $mail->send();
}

if (isset($_POST['Requerimiento'])) {

  if ($_POST['Requerimiento'] == "ValidarComprobante") {

    $jsondata = array();

    $client = new nusoap_client($ruta_validar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $param = array('xml' => $_POST['Binario']);
    $result = $client->call('validarComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
    $jsondata[0] = $result;
    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobante") {

    $jsondata = array();

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $param = array('claveAccesoComprobante' => $_POST['Clave']);

    $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");

    if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

      $dao = new Dao();
      $dao->Campo("c.clave_sri", "");
      $dao->Campo("c.numero", "");
      $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
      $dao->Campo("c.id_paciente_cliente", "");
      $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
      $dao->Campo("p.direccion", "");
      $dao->Campo("p.telefono", "");
      $dao->Campo("p.cedula", "");
      $dao->Campo("p.email", "");

      $dao->Campo("c.descuento", "");
      $dao->Campo("c.total", "");
      $dao->Campo("c.id", "");

      $dao->TablasInnerAlias("consulta", "c", "paciente", "p");
      $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
      $dao->Where("c.id", $_POST['Consulta'], "");

      $respuesta = $dao->Consultar();
      $i = 0;
      foreach ($respuesta as $row => $item) {


        $datos = array(
          "autorizada" => 'S',
          "mensaje_sri" => ''
        );

        $dao = new Dao();

        $dao->Modificar("consulta", $datos, "id=" . $item[11], 0);

        $cliente = '';
        $dirCliente = '';
        $telefonoClie = '';
        $cedulaClie = '';
        $emailClie = '';
        if ($item[3] == null) {

          $cliente = $item[4];
          $dirCliente = $item[5];
          $telefonoClie = $item[6];
          $cedulaClie = $item[7];
          $emailClie = $item[8];
        } else {
          $datos = ObtenerCliente($item[3]);
          $cliente = $datos[0];
          $dirCliente = $datos[1];
          $telefonoClie = $datos[2];
          $cedulaClie = $datos[3];
          $emailClie = $datos[4];
        }

        $jsondata[$i] = CrearRide($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], $item[10], $item[9], $item[10], $item[11]);

        if ($_SESSION["FcCorreos"] == 1) {
          $i++;
          $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
          if ($respuestaEmail) {
          }
          $jsondata[$i] = $respuestaEmail;
        }
      }
    } else {



      $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

      $dao = new Dao();

      $dao->Modificar("consulta", $datos, "id=" . $item[11], 0);
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobanteFarmacia") {

    $jsondata = array();

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $param = array('claveAccesoComprobante' => $_POST['Clave']);

    $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");

    if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

      $dao = new Dao();
      $dao->Campo("c.clave_sri", "");
      $dao->Campo("c.numero", "");
      $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
      $dao->Campo("c.id_paciente_cliente", "");
      $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
      $dao->Campo("p.direccion", "");
      $dao->Campo("p.telefono", "");
      $dao->Campo("p.cedula", "");
      $dao->Campo("p.email", "");

      $dao->Campo("c.descuento", "");
      $dao->Campo("c.total", "");
      $dao->Campo("c.id", "");
      $dao->Campo("c.total_iva", "");

      $dao->TablasInnerAlias("farmacia", "c", "paciente", "p");
      $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
      $dao->Where("c.id", $_POST['Consulta'], "");

      $respuesta = $dao->Consultar();
      $i = 0;
      foreach ($respuesta as $row => $item) {


        $datos = array(
          "autorizada" => 'S',
          "mensaje_sri" => ''
        );

        $dao = new Dao();

        $dao->Modificar("farmacia", $datos, "id=" . $item[11], 0);

        $cliente = '';
        $dirCliente = '';
        $telefonoClie = '';
        $cedulaClie = '';
        $emailClie = '';
        if ($item[3] == null) {

          $cliente = $item[4];
          $dirCliente = $item[5];
          $telefonoClie = $item[6];
          $cedulaClie = $item[7];
          $emailClie = $item[8];
        } else {
          $datos = ObtenerCliente($item[3]);
          $cliente = $datos[0];
          $dirCliente = $datos[1];
          $telefonoClie = $datos[2];
          $cedulaClie = $datos[3];
          $emailClie = $datos[4];
        }

        $jsondata[$i] = CrearRideFarmacia($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], ($item[10] - $item[12]), $item[9], $item[10], $item[11], $item[12]);
        if ($_SESSION["FcCorreos"] == 1) {
          $i++;
          $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
          if ($respuestaEmail) {
          }
          $jsondata[$i] = $respuestaEmail;
        }
      }
    } else {



      $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

      $dao = new Dao();

      $dao->Modificar("farmacia", $datos, "id=" . $item[11], 0);
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobanteNcConsulta") {

    $jsondata = array();

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $param = array('claveAccesoComprobante' => $_POST['Clave']);

    $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");

    if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

      $dao = new Dao();
      $dao->Campo("c.clave_sri", "");
      $dao->Campo("c.numero", "");
      $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
      $dao->Campo("c.id_paciente_cliente", "");
      $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
      $dao->Campo("p.direccion", "");
      $dao->Campo("p.telefono", "");
      $dao->Campo("p.cedula", "");
      $dao->Campo("p.email", "");

      $dao->Campo("c.descuento", "");
      $dao->Campo("c.total", "");
      $dao->Campo("c.id", "");
      $dao->Campo("con.numero", "");
      $dao->Campo("con.fecha_registro", "");
      $dao->Campo("c.observacion", "");



      $dao->TablasInnerAlias("nc_consulta", "c", "paciente", "p");
      $dao->TablasInnerAlias("nc_consulta", "c", "consulta", "con");
      $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
      $dao->Where("c.id", $_POST['Consulta'], "");

      $respuesta = $dao->Consultar();
      $i = 0;
      foreach ($respuesta as $row => $item) {


        $datos = array(
          "autorizada" => 'S',
          "mensaje_sri" => ''
        );

        $dao = new Dao();

        $dao->Modificar("nc_consulta", $datos, "id=" . $item[11], 0);

        $cliente = '';
        $dirCliente = '';
        $telefonoClie = '';
        $cedulaClie = '';
        $emailClie = '';
        if ($item[3] == null) {

          $cliente = $item[4];
          $dirCliente = $item[5];
          $telefonoClie = $item[6];
          $cedulaClie = $item[7];
          $emailClie = $item[8];
        } else {
          $datos = ObtenerCliente($item[3]);
          $cliente = $datos[0];
          $dirCliente = $datos[1];
          $telefonoClie = $datos[2];
          $cedulaClie = $datos[3];
          $emailClie = $datos[4];
        }

        $jsondata[$i] = CrearRideNcCon($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], $item[10], $item[9], $item[10], $item[11], $item[12], $item[13], $item[14]);
        if ($_SESSION["FcCorreos"] == 1) {
          $i++;
          $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
          if ($respuestaEmail) {
          }
          $jsondata[$i] = $respuestaEmail;
        }
      }
    } else {



      $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

      $dao = new Dao();

      $dao->Modificar("nc_consulta", $datos, "id=" . $item[11], 0);
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobanteNcFarm") {

    $jsondata = array();

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $param = array('claveAccesoComprobante' => $_POST['Clave']);

    $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");

    if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

      $dao = new Dao();
      $dao->Campo("c.clave_sri", "");
      $dao->Campo("c.numero", "");
      $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
      $dao->Campo("c.id_paciente_cliente", "");
      $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
      $dao->Campo("p.direccion", "");
      $dao->Campo("p.telefono", "");
      $dao->Campo("p.cedula", "");
      $dao->Campo("p.email", "");

      $dao->Campo("c.descuento", "");
      $dao->Campo("c.total", "");
      $dao->Campo("c.id", "");
      $dao->Campo("con.numero", "");
      $dao->Campo("con.fecha_registro", "");
      $dao->Campo("c.observacion", "");
      $dao->Campo("c.total_iva", "");


      $dao->TablasInnerAlias("nc_farmacia", "c", "paciente", "p");
      $dao->TablasInnerAlias("nc_farmacia", "c", "farmacia", "con");
      $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
      $dao->Where("c.id", $_POST['Consulta'], "");

      $respuesta = $dao->Consultar();
      $i = 0;
      foreach ($respuesta as $row => $item) {


        $datos = array(
          "autorizada" => 'S',
          "mensaje_sri" => ''
        );

        $dao = new Dao();

        $dao->Modificar("nc_farmacia", $datos, "id=" . $item[11], 0);

        $cliente = '';
        $dirCliente = '';
        $telefonoClie = '';
        $cedulaClie = '';
        $emailClie = '';
        if ($item[3] == null) {

          $cliente = $item[4];
          $dirCliente = $item[5];
          $telefonoClie = $item[6];
          $cedulaClie = $item[7];
          $emailClie = $item[8];
        } else {
          $datos = ObtenerCliente($item[3]);
          $cliente = $datos[0];
          $dirCliente = $datos[1];
          $telefonoClie = $datos[2];
          $cedulaClie = $datos[3];
          $emailClie = $datos[4];
        }

        $jsondata[$i] = CrearRideNcFarm($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], $item[10], $item[9], ($item[10] - $item[15]), $item[11], $item[12], $item[13], $item[14], $item[15]);
        if ($_SESSION["FcCorreos"] == 1) {
          $i++;
          $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
          if ($respuestaEmail) {
          }
          $jsondata[$i] = $respuestaEmail;
        }
      }
    } else {



      $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

      $dao = new Dao();

      $dao->Modificar("nc_farmacia", $datos, "id=" . $item[11], 0);
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "ValidarComprobanteOffiline") {

    $jsondata = array();

    $client = new nusoap_client($ruta_validar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.id", "");
    $dao->Tabla("consulta", "c");
    $dao->MayorIgual("TIMESTAMPDIFF(HOUR,c.fecha_registro,CURRENT_TIMESTAMP)", $_SESSION["FcElentronica"], "and");
    $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
    $dao->Diferente("c.id_estado", '21', "");

    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {
        $byte_array = file_get_contents($filename);
        $param = array('xml' => base64_encode($byte_array));
        $result = $client->call('validarComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        $jsondata[$i] = $result;
        $i++;

        if ($result['RespuestaRecepcionComprobante']['estado'] == 'DEVUELTA') {

          if (isset($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'])) {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'] . " == " . $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'],
                "autorizada" => 'D'
              );
            }
          } else {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'],
                "autorizada" => 'D'
              );
            }
          }


          $dao = new Dao();

          $dao->Modificar("consulta", $datos, "id=" . $item[1], 0);
        }
      }
    }

    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobanteOffiline") {

    $jsondata = array();

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");

    $dao->TablasInnerAlias("consulta", "c", "paciente", "p");
    $dao->MayorIgual("TIMESTAMPDIFF(HOUR,c.fecha_registro,CURRENT_TIMESTAMP)", $_SESSION["FcElentronica"], "and");
    $dao->Diferente("c.autorizada", '"' . 'S' . '"', "and");
    $dao->Diferente("c.id_estado", '21', "");


    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {
      $filename = "../Firmados/" . $item[0] . ".xml";
      if (is_file($filename)) {
        $param = array('claveAccesoComprobante' => $item[0]);
        $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        if ($result['RespuestaAutorizacionComprobante']['numeroComprobantes'] > 0) {

          $jsondata[$i] = $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'];
          $i++;
          if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

            $datos = array(
              "autorizada" => 'S',
              "mensaje_sri" => ''
            );

            $dao = new Dao();

            $dao->Modificar("consulta", $datos, "id=" . $item[11], 0);

            $cliente = '';
            $dirCliente = '';
            $telefonoClie = '';
            $cedulaClie = '';
            $emailClie = '';
            if ($item[3] == null) {

              $cliente = $item[4];
              $dirCliente = $item[5];
              $telefonoClie = $item[6];
              $cedulaClie = $item[7];
              $emailClie = $item[8];
            } else {
              $datos = ObtenerCliente($item[3]);
              $cliente = $datos[0];
              $dirCliente = $datos[1];
              $telefonoClie = $datos[2];
              $cedulaClie = $datos[3];
              $emailClie = $datos[4];
            }

            $jsondata[$i] = CrearRide($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], $item[10], $item[9], $item[10], $item[11]);
            if ($_SESSION["FcCorreos"] == 1) {
              $i++;
              $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
              if ($respuestaEmail) {
              }
              $jsondata[$i] = $respuestaEmail;
            }
          } else {



            $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

            $dao = new Dao();

            $dao->Modificar("consulta", $datos, "id=" . $item[11], 0);
          }
        }
      }
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "ValidarComprobanteOffilineFarmacia") {

    $jsondata = array();

    $client = new nusoap_client($ruta_validar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.id", "");
    $dao->Tabla("farmacia", "c");

    $dao->MayorIgual("TIMESTAMPDIFF(HOUR,c.fecha_registro,CURRENT_TIMESTAMP)", $_SESSION["FcElentronica"], "and");
    $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
    $dao->Diferente("c.id_estado", '21', "");

    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {
        $byte_array = file_get_contents($filename);
        $param = array('xml' => base64_encode($byte_array));
        $result = $client->call('validarComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        $jsondata[$i] = $result;
        $i++;

        if ($result['RespuestaRecepcionComprobante']['estado'] == 'DEVUELTA') {
          if (isset($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'])) {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'] . " == " . $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'],
                "autorizada" => 'D'
              );
            }
          } else {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'],
                "autorizada" => 'D'
              );
            }
          }


          $dao = new Dao();

          $dao->Modificar("farmacia", $datos, "id=" . $item[1], 0);
        }
      }
    }

    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobanteOffilineFarmacia") {

    $jsondata = array();

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");
    $dao->Campo("c.total_iva", "");

    $dao->TablasInnerAlias("farmacia", "c", "paciente", "p");
    $dao->MayorIgual("TIMESTAMPDIFF(HOUR,c.fecha_registro,CURRENT_TIMESTAMP)", $_SESSION["FcElentronica"], "and");
    $dao->Diferente("c.autorizada", '"' . 'S' . '"', "and");
    $dao->Diferente("c.id_estado", '21', "");


    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {
      $filename = "../Firmados/" . $item[0] . ".xml";
      if (is_file($filename)) {
        $param = array('claveAccesoComprobante' => $item[0]);
        $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        if ($result['RespuestaAutorizacionComprobante']['numeroComprobantes'] > 0) {

          $jsondata[$i] = $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'];
          $i++;
          if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

            $datos = array(
              "autorizada" => 'S',
              "mensaje_sri" => ''
            );

            $dao = new Dao();

            $dao->Modificar("farmacia", $datos, "id=" . $item[11], 0);

            $cliente = '';
            $dirCliente = '';
            $telefonoClie = '';
            $cedulaClie = '';
            $emailClie = '';
            if ($item[3] == null) {

              $cliente = $item[4];
              $dirCliente = $item[5];
              $telefonoClie = $item[6];
              $cedulaClie = $item[7];
              $emailClie = $item[8];
            } else {
              $datos = ObtenerCliente($item[3]);
              $cliente = $datos[0];
              $dirCliente = $datos[1];
              $telefonoClie = $datos[2];
              $cedulaClie = $datos[3];
              $emailClie = $datos[4];
            }

            $jsondata[$i] = CrearRideFarmacia($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], ($item[10] - $item[12]), $item[9], $item[10], $item[11], $item[12]);
            if ($_SESSION["FcCorreos"] == 1) {
              $i++;
              $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
              if ($respuestaEmail) {
              }
              $jsondata[$i] = $respuestaEmail;
            }
          } else {



            $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

            $dao = new Dao();

            $dao->Modificar("farmacia", $datos, "id=" . $item[11], 0);
          }
        }
      }
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "ValidarComprobanteOffilineNcCon") {

    $jsondata = array();

    $client = new nusoap_client($ruta_validar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.id", "");
    $dao->Tabla("nc_consulta", "c");
    $dao->MayorIgual("TIMESTAMPDIFF(HOUR,c.fecha_registro,CURRENT_TIMESTAMP)", $_SESSION["FcElentronica"], "and");
    $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
    $dao->Diferente("c.id_estado", '21', "");

    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {
        $byte_array = file_get_contents($filename);
        $param = array('xml' => base64_encode($byte_array));
        $result = $client->call('validarComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        $jsondata[$i] = $result;
        $i++;

        if ($result['RespuestaRecepcionComprobante']['estado'] == 'DEVUELTA') {
          if (isset($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'])) {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'] . " == " . $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'],
                "autorizada" => 'D'
              );
            }
          } else {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'],
                "autorizada" => 'D'
              );
            }
          }


          $dao = new Dao();

          $dao->Modificar("nc_consulta", $datos, "id=" . $item[1], 0);
        }
      }
    }

    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobanteOffilineNcCon") {

    $jsondata = array();

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");
    $dao->Campo("con.numero", "");
    $dao->Campo("con.fecha_registro", "");
    $dao->Campo("c.observacion", "");



    $dao->TablasInnerAlias("nc_consulta", "c", "paciente", "p");
    $dao->TablasInnerAlias("nc_consulta", "c", "consulta", "con");
    $dao->MayorIgual("TIMESTAMPDIFF(HOUR,c.fecha_registro,CURRENT_TIMESTAMP)", $_SESSION["FcElentronica"], "and");
    $dao->Diferente("c.autorizada", '"' . 'S' . '"', "and");
    $dao->Diferente("c.id_estado", '21', "");





    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {
      $filename = "../Firmados/" . $item[0] . ".xml";
      if (is_file($filename)) {
        $param = array('claveAccesoComprobante' => $item[0]);
        $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        if ($result['RespuestaAutorizacionComprobante']['numeroComprobantes'] > 0) {

          $jsondata[$i] = $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'];
          $i++;
          if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

            $datos = array(
              "autorizada" => 'S',
              "mensaje_sri" => ''
            );

            $dao = new Dao();

            $dao->Modificar("nc_consulta", $datos, "id=" . $item[11], 0);

            $cliente = '';
            $dirCliente = '';
            $telefonoClie = '';
            $cedulaClie = '';
            $emailClie = '';
            if ($item[3] == null) {

              $cliente = $item[4];
              $dirCliente = $item[5];
              $telefonoClie = $item[6];
              $cedulaClie = $item[7];
              $emailClie = $item[8];
            } else {
              $datos = ObtenerCliente($item[3]);
              $cliente = $datos[0];
              $dirCliente = $datos[1];
              $telefonoClie = $datos[2];
              $cedulaClie = $datos[3];
              $emailClie = $datos[4];
            }

            $jsondata[$i] = CrearRideNcCon($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], $item[10], $item[9], $item[10], $item[11], $item[12], $item[13], $item[14]);
            if ($_SESSION["FcCorreos"] == 1) {
              $i++;
              $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
              if ($respuestaEmail) {
              }
              $jsondata[$i] = $respuestaEmail;
            }
          } else {



            $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

            $dao = new Dao();

            $dao->Modificar("nc_consulta", $datos, "id=" . $item[11], 0);
          }
        }
      }
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "ValidarComprobanteOffilineNcFarm") {

    $jsondata = array();

    $client = new nusoap_client($ruta_validar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.id", "");
    $dao->Tabla("nc_farmacia", "c");

    $dao->MayorIgual("TIMESTAMPDIFF(HOUR,c.fecha_registro,CURRENT_TIMESTAMP)", $_SESSION["FcElentronica"], "and");
    $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
    $dao->Diferente("c.id_estado", '21', "");

    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {
        $byte_array = file_get_contents($filename);
        $param = array('xml' => base64_encode($byte_array));
        $result = $client->call('validarComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        $jsondata[$i] = $result;
        $i++;

        if ($result['RespuestaRecepcionComprobante']['estado'] == 'DEVUELTA') {
          if (isset($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'])) {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'] . " == " . $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'],
                "autorizada" => 'D'
              );
            }
          } else {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'],
                "autorizada" => 'D'
              );
            }
          }


          $dao = new Dao();

          $dao->Modificar("nc_farmacia", $datos, "id=" . $item[1], 0);
        }
      }
    }

    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobanteOffilineNcFarm") {

    $jsondata = array();

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");
    $dao->Campo("con.numero", "");
    $dao->Campo("con.fecha_registro", "");
    $dao->Campo("c.observacion", "");
    $dao->Campo("c.total_iva", "");


    $dao->TablasInnerAlias("nc_farmacia", "c", "paciente", "p");
    $dao->TablasInnerAlias("nc_farmacia", "c", "farmacia", "con");
    $dao->MayorIgual("TIMESTAMPDIFF(HOUR,c.fecha_registro,CURRENT_TIMESTAMP)", $_SESSION["FcElentronica"], "and");
    $dao->Diferente("c.autorizada", '"' . 'S' . '"', "and");
    $dao->Diferente("c.id_estado", '21', "");





    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {
      $filename = "../Firmados/" . $item[0] . ".xml";
      if (is_file($filename)) {
        $param = array('claveAccesoComprobante' => $item[0]);
        $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        if ($result['RespuestaAutorizacionComprobante']['numeroComprobantes'] > 0) {

          $jsondata[$i] = $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'];
          $i++;
          if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

            $datos = array(
              "autorizada" => 'S',
              "mensaje_sri" => ''
            );

            $dao = new Dao();

            $dao->Modificar("nc_farmacia", $datos, "id=" . $item[11], 0);

            $cliente = '';
            $dirCliente = '';
            $telefonoClie = '';
            $cedulaClie = '';
            $emailClie = '';
            if ($item[3] == null) {

              $cliente = $item[4];
              $dirCliente = $item[5];
              $telefonoClie = $item[6];
              $cedulaClie = $item[7];
              $emailClie = $item[8];
            } else {
              $datos = ObtenerCliente($item[3]);
              $cliente = $datos[0];
              $dirCliente = $datos[1];
              $telefonoClie = $datos[2];
              $cedulaClie = $datos[3];
              $emailClie = $datos[4];
            }

            $jsondata[$i] = CrearRideNcFarm($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], $item[10], $item[9], ($item[10] - $item[15]), $item[11], $item[12], $item[13], $item[14], $item[15]);
            if ($_SESSION["FcCorreos"] == 1) {
              $i++;
              $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
              if ($respuestaEmail) {
              }
              $jsondata[$i] = $respuestaEmail;
            }
          } else {



            $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

            $dao = new Dao();

            $dao->Modificar("nc_farmacia", $datos, "id=" . $item[11], 0);
          }
        }
      }
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "ValidarComprobanteLote") {

    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $client = new nusoap_client($ruta_validar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.id", "");
    $dao->Tabla("consulta", "c");
    $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
    $dao->In_Where("c.id", $id, "and");
    $dao->Diferente("c.id_estado", '21', "");

    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {
        $byte_array = file_get_contents($filename);
        $param = array('xml' => base64_encode($byte_array));
        $result = $client->call('validarComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        $jsondata[$i] = $result;
        $i++;

        if ($result['RespuestaRecepcionComprobante']['estado'] == 'DEVUELTA') {
          if (isset($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'])) {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'] . " == " . $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'],
                "autorizada" => 'D'
              );
            }
          } else {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'],
                "autorizada" => 'D'
              );
            }
          }


          $dao = new Dao();

          $dao->Modificar("consulta", $datos, "id=" . $item[1], 0);
        }
      }
    }

    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobanteLote") {



    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");

    $dao->TablasInnerAlias("consulta", "c", "paciente", "p");
    $dao->Diferente("c.autorizada", '"' . 'S' . '"', "and");
    $dao->In_Where("c.id", $id, "and");
    $dao->Diferente("c.id_estado", '21', "");


    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {
      $filename = "../Firmados/" . $item[0] . ".xml";
      if (is_file($filename)) {
        $param = array('claveAccesoComprobante' => $item[0]);
        $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        if ($result['RespuestaAutorizacionComprobante']['numeroComprobantes'] > 0) {
          $jsondata[$i] = $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'];
          $i++;
          if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

            $datos = array(
              "autorizada" => 'S',
              "mensaje_sri" => ''
            );

            $dao = new Dao();

            $dao->Modificar("consulta", $datos, "id=" . $item[11], 0);

            $cliente = '';
            $dirCliente = '';
            $telefonoClie = '';
            $cedulaClie = '';
            $emailClie = '';
            if ($item[3] == null) {

              $cliente = $item[4];
              $dirCliente = $item[5];
              $telefonoClie = $item[6];
              $cedulaClie = $item[7];
              $emailClie = "";
            } else {
              $datos = ObtenerCliente($item[3]);
              $cliente = $datos[0];
              $dirCliente = $datos[1];
              $telefonoClie = $datos[2];
              $cedulaClie = $datos[3];
              $emailClie = $datos[4];
            }

            $jsondata[$i] = CrearRide($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], $item[10], $item[9], $item[10], $item[11]);
            if ($_SESSION["FcCorreos"] == 1) {
              $i++;
              $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
              if ($respuestaEmail) {
              }
              $jsondata[$i] = $respuestaEmail;
            }
          } else {



            $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

            $dao = new Dao();

            $dao->Modificar("consulta", $datos, "id=" . $item[11], 0);
          }
        }
      }
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "EnviarCorreos") {

    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");

    $dao->TablasInnerAlias("consulta", "c", "paciente", "p");
    $dao->Where("c.autorizada", '"' . 'S' . '"', "and");
    $dao->In_Where("c.id", $id, "");



    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {

        $cliente = '';
        $dirCliente = '';
        $telefonoClie = '';
        $cedulaClie = '';
        $emailClie = '';
        if ($item[3] == null) {

          $cliente = $item[4];
          $dirCliente = $item[5];
          $telefonoClie = $item[6];
          $cedulaClie = $item[7];
          $emailClie = $item[8];
        } else {
          $datos = ObtenerCliente($item[3]);
          $cliente = $datos[0];
          $dirCliente = $datos[1];
          $telefonoClie = $datos[2];
          $cedulaClie = $datos[3];
          $emailClie = $datos[4];
        }

        EnviarEmail($emailClie, $item[0], $cliente, $item[10]);
      }
    }

    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "ValidarComprobanteLoteFarmacia") {

    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $client = new nusoap_client($ruta_validar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.id", "");
    $dao->Tabla("farmacia", "c");
    $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
    $dao->In_Where("c.id", $id, "and");
    $dao->Diferente("c.id_estado", '21', "");

    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {
        $byte_array = file_get_contents($filename);
        $param = array('xml' => base64_encode($byte_array));
        $result = $client->call('validarComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        $jsondata[$i] = $result;
        $i++;

        if ($result['RespuestaRecepcionComprobante']['estado'] == 'DEVUELTA') {

          if (isset($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'])) {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'] . " == " . $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'],
                "autorizada" => 'D'
              );
            }
          } else {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'],
                "autorizada" => 'D'
              );
            }
          }

          $dao = new Dao();

          $dao->Modificar("farmacia", $datos, "id=" . $item[1], 0);
        }
      }
    }

    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobanteLoteFarmacia") {



    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");
    $dao->Campo("c.total_iva", "");

    $dao->TablasInnerAlias("farmacia", "c", "paciente", "p");
    $dao->Diferente("c.autorizada", '"' . 'S' . '"', "and");
    $dao->In_Where("c.id", $id, "and");
    $dao->Diferente("c.id_estado", '21', "");


    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {
      $filename = "../Firmados/" . $item[0] . ".xml";
      if (is_file($filename)) {
        $param = array('claveAccesoComprobante' => $item[0]);
        $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        if ($result['RespuestaAutorizacionComprobante']['numeroComprobantes'] > 0) {
          $jsondata[$i] = $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'];
          $i++;
          if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

            $datos = array(
              "autorizada" => 'S',
              "mensaje_sri" => ''
            );

            $dao = new Dao();

            $dao->Modificar("farmacia", $datos, "id=" . $item[11], 0);

            $cliente = '';
            $dirCliente = '';
            $telefonoClie = '';
            $cedulaClie = '';
            $emailClie = '';
            if ($item[3] == null) {

              $cliente = $item[4];
              $dirCliente = $item[5];
              $telefonoClie = $item[6];
              $cedulaClie = $item[7];
              $emailClie = $item[8];
            } else {
              $datos = ObtenerCliente($item[3]);
              $cliente = $datos[0];
              $dirCliente = $datos[1];
              $telefonoClie = $datos[2];
              $cedulaClie = $datos[3];
              $emailClie = $datos[4];
            }

            $jsondata[$i] = CrearRideFarmacia($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], ($item[10] - $item[12]), $item[9], $item[10], $item[11], $item[12]);
            if ($_SESSION["FcCorreos"] == 1) {
              $i++;
              $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
              if ($respuestaEmail) {
              }
              $jsondata[$i] = $respuestaEmail;
            }
          } else {



            $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

            $dao = new Dao();

            $dao->Modificar("farmacia", $datos, "id=" . $item[11], 0);
          }
        }
      }
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "EnviarCorreosFarmacia") {

    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");

    $dao->TablasInnerAlias("farmacia", "c", "paciente", "p");
    $dao->Where("c.autorizada", '"' . 'S' . '"', "and");
    $dao->In_Where("c.id", $id, "");



    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {

        $cliente = '';
        $dirCliente = '';
        $telefonoClie = '';
        $cedulaClie = '';
        $emailClie = '';
        if ($item[3] == null) {

          $cliente = $item[4];
          $dirCliente = $item[5];
          $telefonoClie = $item[6];
          $cedulaClie = $item[7];
          $emailClie = $item[8];
        } else {
          $datos = ObtenerCliente($item[3]);
          $cliente = $datos[0];
          $dirCliente = $datos[1];
          $telefonoClie = $datos[2];
          $cedulaClie = $datos[3];
          $emailClie = $datos[4];
        }

        EnviarEmail($emailClie, $item[0], $cliente, $item[10]);
      }
    }

    echo json_encode($jsondata);
  }


  if ($_POST['Requerimiento'] == "ValidarComprobanteLoteNcCon") {

    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $client = new nusoap_client($ruta_validar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.id", "");
    $dao->Tabla("nc_consulta", "c");
    $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
    $dao->In_Where("c.id", $id, "and");
    $dao->Diferente("c.id_estado", '21', "");

    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {
        $byte_array = file_get_contents($filename);
        $param = array('xml' => base64_encode($byte_array));
        $result = $client->call('validarComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        $jsondata[$i] = $result;
        $i++;

        if ($result['RespuestaRecepcionComprobante']['estado'] == 'DEVUELTA') {

          if (isset($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'])) {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'] . " == " . $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'],
                "autorizada" => 'D'
              );
            }
          } else {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'],
                "autorizada" => 'D'
              );
            }
          }

          $dao = new Dao();

          $dao->Modificar("nc_consulta", $datos, "id=" . $item[1], 0);
        }
      }
    }

    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobanteLoteNcCon") {



    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }


    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");
    $dao->Campo("con.numero", "");
    $dao->Campo("con.fecha_registro", "");
    $dao->Campo("c.observacion", "");



    $dao->TablasInnerAlias("nc_consulta", "c", "paciente", "p");
    $dao->TablasInnerAlias("nc_consulta", "c", "consulta", "con");
    $dao->Diferente("c.autorizada", '"' . 'S' . '"', "and");
    $dao->In_Where("c.id", $id, "and");
    $dao->Diferente("c.id_estado", '21', "");

    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {
      $filename = "../Firmados/" . $item[0] . ".xml";
      if (is_file($filename)) {
        $param = array('claveAccesoComprobante' => $item[0]);
        $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        if ($result['RespuestaAutorizacionComprobante']['numeroComprobantes'] > 0) {
          $jsondata[$i] = $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'];
          $i++;
          if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

            $datos = array(
              "autorizada" => 'S',
              "mensaje_sri" => ''
            );

            $dao = new Dao();

            $dao->Modificar("nc_consulta", $datos, "id=" . $item[11], 0);

            $cliente = '';
            $dirCliente = '';
            $telefonoClie = '';
            $cedulaClie = '';
            $emailClie = '';
            if ($item[3] == null) {

              $cliente = $item[4];
              $dirCliente = $item[5];
              $telefonoClie = $item[6];
              $cedulaClie = $item[7];
              $emailClie = $item[8];
            } else {
              $datos = ObtenerCliente($item[3]);
              $cliente = $datos[0];
              $dirCliente = $datos[1];
              $telefonoClie = $datos[2];
              $cedulaClie = $datos[3];
              $emailClie = $datos[4];
            }

            $jsondata[$i] = CrearRideNcCon($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], $item[10], $item[9], $item[10], $item[11], $item[12], $item[13], $item[14]);
            if ($_SESSION["FcCorreos"] == 1) {
              $i++;
              $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
              if ($respuestaEmail) {
              }
              $jsondata[$i] = $respuestaEmail;
            }
          } else {



            $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

            $dao = new Dao();

            $dao->Modificar("nc_consulta", $datos, "id=" . $item[11], 0);
          }
        }
      }
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "EnviarCorreosNcCon") {

    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");
    $dao->Campo("con.numero", "");
    $dao->Campo("con.fecha_registro", "");
    $dao->Campo("c.observacion", "");



    $dao->TablasInnerAlias("nc_consulta", "c", "paciente", "p");
    $dao->TablasInnerAlias("nc_consulta", "c", "consulta", "con");
    $dao->Diferente("c.autorizada", '"' . 'S' . '"', "and");
    $dao->In_Where("c.id", $id, "");



    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {

        $cliente = '';
        $dirCliente = '';
        $telefonoClie = '';
        $cedulaClie = '';
        $emailClie = '';
        if ($item[3] == null) {

          $cliente = $item[4];
          $dirCliente = $item[5];
          $telefonoClie = $item[6];
          $cedulaClie = $item[7];
          $emailClie = $item[8];
        } else {
          $datos = ObtenerCliente($item[3]);
          $cliente = $datos[0];
          $dirCliente = $datos[1];
          $telefonoClie = $datos[2];
          $cedulaClie = $datos[3];
          $emailClie = $datos[4];
        }

        EnviarEmail($emailClie, $item[0], $cliente, $item[10]);
      }
    }

    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "ValidarComprobanteLoteNcFarm") {

    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $client = new nusoap_client($ruta_validar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.id", "");
    $dao->Tabla("nc_farmacia", "c");
    $dao->Where("c.autorizada", '"' . 'N' . '"', "and");
    $dao->In_Where("c.id", $id, "and");
    $dao->Diferente("c.id_estado", '21', "");

    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {
        $byte_array = file_get_contents($filename);
        $param = array('xml' => base64_encode($byte_array));
        $result = $client->call('validarComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        $jsondata[$i] = $result;
        $i++;

        if ($result['RespuestaRecepcionComprobante']['estado'] == 'DEVUELTA') {

          if (isset($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'])) {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'] . " == " . $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['informacionAdicional'],
                "autorizada" => 'D'
              );
            }
          } else {
            if (strpos($result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'], 'CLAVE DE ACCESO') !== false) {
            } else {
              $datos = array(
                "mensaje_sri" => $result['RespuestaRecepcionComprobante']['comprobantes']['comprobante']['mensajes']['mensaje']['mensaje'],
                "autorizada" => 'D'
              );
            }
          }

          $dao = new Dao();

          $dao->Modificar("nc_farmacia", $datos, "id=" . $item[1], 0);
        }
      }
    }

    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "autorizacionComprobanteLoteNcFarm") {



    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $client = new nusoap_client($ruta_autorizar, true);
    $client->soap_defencoding = 'utf-8';
    $client->setHTTPEncoding('gzip, deflate');

    $err = $client->getError();
    if ($err) {
      $jsondata[0] = $err . ' ERRORSASO';
    }


    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");
    $dao->Campo("con.numero", "");
    $dao->Campo("con.fecha_registro", "");
    $dao->Campo("c.observacion", "");
    $dao->Campo("c.total_iva", "");


    $dao->TablasInnerAlias("nc_farmacia", "c", "paciente", "p");
    $dao->TablasInnerAlias("nc_farmacia", "c", "farmacia", "con");
    $dao->Diferente("c.autorizada", '"' . 'S' . '"', "and");
    $dao->In_Where("c.id", $id, "and");
    $dao->Diferente("c.id_estado", '21', "");

    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {
      $filename = "../Firmados/" . $item[0] . ".xml";
      if (is_file($filename)) {
        $param = array('claveAccesoComprobante' => $item[0]);
        $result = $client->call('autorizacionComprobante', $param, "http://ec.gob.sri.ws.recepcion/");
        if ($result['RespuestaAutorizacionComprobante']['numeroComprobantes'] > 0) {
          $jsondata[$i] = $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'];
          $i++;
          if ($result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] == "AUTORIZADO") {

            $datos = array(
              "autorizada" => 'S',
              "mensaje_sri" => ''
            );

            $dao = new Dao();

            $dao->Modificar("nc_farmacia", $datos, "id=" . $item[11], 0);

            $cliente = '';
            $dirCliente = '';
            $telefonoClie = '';
            $cedulaClie = '';
            $emailClie = '';
            if ($item[3] == null) {

              $cliente = $item[4];
              $dirCliente = $item[5];
              $telefonoClie = $item[6];
              $cedulaClie = $item[7];
              $emailClie = $item[8];
            } else {
              $datos = ObtenerCliente($item[3]);
              $cliente = $datos[0];
              $dirCliente = $datos[1];
              $telefonoClie = $datos[2];
              $cedulaClie = $datos[3];
              $emailClie = $datos[4];
            }

            $jsondata[$i] = CrearRideNcFarm($item[0], $item[1], $item[2], $cliente, $dirCliente, $telefonoClie, $cedulaClie, $emailClie, $item[4], $item[10], $item[9], ($item[10] - $item[15]), $item[11], $item[12], $item[13], $item[14], $item[15]);
            if ($_SESSION["FcCorreos"] == 1) {
              $i++;
              $respuestaEmail = EnviarEmail($emailClie, $item[0], $cliente, round($item[10], 2));
              if ($respuestaEmail) {
              }
              $jsondata[$i] = $respuestaEmail;
            }
          } else {



            $datos = array("mensaje_sri" => $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['estado'] . ' ' . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['mensaje'] . " " . $result['RespuestaAutorizacionComprobante']['autorizaciones']['autorizacion']['mensajes']['mensaje']['informacionAdicional']);

            $dao = new Dao();

            $dao->Modificar("nc_farmacia", $datos, "id=" . $item[11], 0);
          }
        }
      }
    }


    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "EnviarCorreosNcFarm") {

    $jsondata = array();
    $id = substr(trim($_POST['Id']), 0, -1);

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.numero", "");
    $dao->Campo("CONVERT(c.fecha_registro,DATE)", "");
    $dao->Campo("c.id_paciente_cliente", "");
    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
    $dao->Campo("p.direccion", "");
    $dao->Campo("p.telefono", "");
    $dao->Campo("p.cedula", "");
    $dao->Campo("p.email", "");

    $dao->Campo("c.descuento", "");
    $dao->Campo("c.total", "");
    $dao->Campo("c.id", "");
    $dao->Campo("con.numero", "");
    $dao->Campo("con.fecha_registro", "");
    $dao->Campo("c.observacion", "");



    $dao->TablasInnerAlias("nc_farmacia", "c", "paciente", "p");
    $dao->TablasInnerAlias("nc_farmacia", "c", "farmacia", "con");
    $dao->Diferente("c.autorizada", '"' . 'S' . '"', "and");
    $dao->In_Where("c.id", $id, "");



    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../Firmados/" . $item[0] . ".xml";

      if (is_file($filename)) {

        $cliente = '';
        $dirCliente = '';
        $telefonoClie = '';
        $cedulaClie = '';
        $emailClie = '';
        if ($item[3] == null) {

          $cliente = $item[4];
          $dirCliente = $item[5];
          $telefonoClie = $item[6];
          $cedulaClie = $item[7];
          $emailClie = $item[8];
        } else {
          $datos = ObtenerCliente($item[3]);
          $cliente = $datos[0];
          $dirCliente = $datos[1];
          $telefonoClie = $datos[2];
          $cedulaClie = $datos[3];
          $emailClie = $datos[4];
        }

        EnviarEmail($emailClie, $item[0], $cliente, $item[10]);
      }
    }

    echo json_encode($jsondata);
  }

  if ($_POST['Requerimiento'] == "Refirmar") {

    $jsondata = array();

    $dao = new Dao();
    $dao->Campo("c.clave_sri", "");
    $dao->Campo("c.id", "");
    $dao->Tabla("farmacia", "c");
    $dao->Where("c.autorizada", '"' . 'D' . '"', "and");
    $dao->Diferente("c.id_estado", '21', "");
    $respuesta = $dao->Consultar();
    $i = 0;
    foreach ($respuesta as $row => $item) {

      $filename = "../farmacia/" . $item[0] . ".xml";

      if (is_file($filename)) {

        $oldMessage = '<razonSocialComprador>FINAL  CONSUMIDOR</razonSocialComprador>';
        $oldMessage2 = '<razonSocialComprador>CONSUMIDOR  FINAL</razonSocialComprador>';
        $deletedFormat = '<razonSocialComprador>CONSUMIDOR FINAL</razonSocialComprador>';
        $str = file_get_contents($filename);
        $str = str_replace($oldMessage, $deletedFormat, $str);
        $str = str_replace($oldMessage2, $deletedFormat, $str);
        file_put_contents($filename, $str);

        $xmlFirmar = $filename;
        $certificado = "../facturas/wecare.p12";
        $clave = "Wecare2018firma";
        $rutaFirmados = "../Firmados/";
        $nombreXml = $item[0] . ".xml";
        $parametros = $certificado . " " . $clave . " " . $xmlFirmar . " " . $rutaFirmados . " " . $nombreXml;
        $respuestajava = shell_exec('java -jar "../java/FirmaXades.jar" ' . $parametros);
        $jsondata[] = $respuestajava;
      }
    }
    echo json_encode($jsondata);
  }
}
