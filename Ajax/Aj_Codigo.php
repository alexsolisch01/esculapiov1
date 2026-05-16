<?php

session_start();
date_default_timezone_set('America/Guayaquil');
require_once "autoloadAjax.php";

function ObtenerDatosEmpresa()
{
    $dao = new Dao();

    $dao->Campo("razon_social", "");
    $dao->Campo("ruc", "");
    $dao->Campo("direccion", "");
    $dao->Campo("telefono", "");
    $dao->Campo("correo1", "");

    $dao->Tabla("empresa", "");
    $dao->Where("id", "2", "");

    return $dao->Consultar();
}
function ObtenerClave($numero, $ruc, $ambiente, $fecha, $tipo)
{
    // tipos => 01 = factura - 04 = nc - 07 = retencion - 03 = lq

    $claveAcceso = date_format(date_create($fecha), "dmY") . $tipo . $ruc . $ambiente . $numero . "41261533" . "1";
    $digitoVerificador = -1;

    $arrayClave = str_split($claveAcceso);

    $arrayMultiplicacion = array();

    $arrayMultiplicacion[0] = $arrayClave[0] * 7;
    $arrayMultiplicacion[1] = $arrayClave[1] * 6;
    $arrayMultiplicacion[2] = $arrayClave[2] * 5;
    $arrayMultiplicacion[3] = $arrayClave[3] * 4;
    $arrayMultiplicacion[4] = $arrayClave[4] * 3;
    $arrayMultiplicacion[5] = $arrayClave[5] * 2;

    $arrayMultiplicacion[6] = $arrayClave[6] * 7;
    $arrayMultiplicacion[7] = $arrayClave[7] * 6;
    $arrayMultiplicacion[8] = $arrayClave[8] * 5;
    $arrayMultiplicacion[9] = $arrayClave[9] * 4;
    $arrayMultiplicacion[10] = $arrayClave[10] * 3;
    $arrayMultiplicacion[11] = $arrayClave[11] * 2;

    $arrayMultiplicacion[12] = $arrayClave[12] * 7;
    $arrayMultiplicacion[13] = $arrayClave[13] * 6;
    $arrayMultiplicacion[14] = $arrayClave[14] * 5;
    $arrayMultiplicacion[15] = $arrayClave[15] * 4;
    $arrayMultiplicacion[16] = $arrayClave[16] * 3;
    $arrayMultiplicacion[17] = $arrayClave[17] * 2;

    $arrayMultiplicacion[18] = $arrayClave[18] * 7;
    $arrayMultiplicacion[19] = $arrayClave[19] * 6;
    $arrayMultiplicacion[20] = $arrayClave[20] * 5;
    $arrayMultiplicacion[21] = $arrayClave[21] * 4;
    $arrayMultiplicacion[22] = $arrayClave[22] * 3;
    $arrayMultiplicacion[23] = $arrayClave[23] * 2;

    $arrayMultiplicacion[24] = $arrayClave[24] * 7;
    $arrayMultiplicacion[25] = $arrayClave[25] * 6;
    $arrayMultiplicacion[26] = $arrayClave[26] * 5;
    $arrayMultiplicacion[27] = $arrayClave[27] * 4;
    $arrayMultiplicacion[28] = $arrayClave[28] * 3;
    $arrayMultiplicacion[29] = $arrayClave[29] * 2;

    $arrayMultiplicacion[30] = $arrayClave[30] * 7;
    $arrayMultiplicacion[31] = $arrayClave[31] * 6;
    $arrayMultiplicacion[32] = $arrayClave[32] * 5;
    $arrayMultiplicacion[33] = $arrayClave[33] * 4;
    $arrayMultiplicacion[34] = $arrayClave[34] * 3;
    $arrayMultiplicacion[35] = $arrayClave[35] * 2;

    $arrayMultiplicacion[36] = $arrayClave[36] * 7;
    $arrayMultiplicacion[37] = $arrayClave[37] * 6;
    $arrayMultiplicacion[38] = $arrayClave[38] * 5;
    $arrayMultiplicacion[39] = $arrayClave[39] * 4;
    $arrayMultiplicacion[40] = $arrayClave[40] * 3;
    $arrayMultiplicacion[41] = $arrayClave[41] * 2;

    $arrayMultiplicacion[42] = $arrayClave[42] * 7;
    $arrayMultiplicacion[43] = $arrayClave[43] * 6;
    $arrayMultiplicacion[44] = $arrayClave[44] * 5;
    $arrayMultiplicacion[45] = $arrayClave[45] * 4;
    $arrayMultiplicacion[46] = $arrayClave[46] * 3;
    $arrayMultiplicacion[47] = $arrayClave[47] * 2;

    $sumaClave = 0;
    foreach ($arrayMultiplicacion as $valor) {
        $sumaClave = $sumaClave + $valor;
    }
    $mod = fmod($sumaClave, 11);
    $digitoVerificador = 11 - $mod;
    if ($digitoVerificador == 11) {
        $digitoVerificador = 0;
    }
    if ($digitoVerificador == 10) {
        $digitoVerificador = 1;
    }
    $claveAcceso = $claveAcceso . $digitoVerificador;
    return $claveAcceso;
}
//////////////////////////////////////////////////CONSULTAS
function ObtenerNombreProcedimiento($idpro = 0, $idlab = 0, $ideco = 0, $idrx = 0, $idtomo = 0)
{
    $dao = new Dao();
    $dao->Campo("nombre", ""); //0
    if ($idpro > 0) {
        $dao->Tabla("procedimiento", "");
        $dao->Where("id", $idpro, "");
    }
    if ($idlab > 0) {
        $dao->Tabla("procedimiento_laboratorio", "");
        $dao->Where("id", $idlab, "");
    }
    if ($ideco > 0) {
        $dao->Tabla("procedimiento_eco", "");
        $dao->Where("id", $ideco, "");
    }
    if ($idrx > 0) {
        $dao->Tabla("procedimiento_rx", "");
        $dao->Where("id", $idrx, "");
    }
    if ($idtomo > 0) {
        $dao->Tabla("procedimiento_tomo", "");
        $dao->Where("id", $idtomo, "");
    }
    $nombre = "";
    $respuesta = $dao->Consultar();
    foreach ($respuesta as $row => $item) {
        $nombre = $item[0];
    }
    return $nombre;
}
function CargarDetalleConsulta($consulta)
{
    $dao = new Dao();

    $dao->Campo("c.id_procedimiento", ""); //0
    $dao->Campo("c.id_procedimiento_laboratorio", ""); //1
    $dao->Campo("c.id_procedimiento_eco", ""); //2
    $dao->Campo("c.id_procedimiento_rx", ""); //3
    $dao->Campo("c.id_procedimiento_tomo", ""); //4
    $dao->Campo("e.apellidos", ""); //5
    $dao->Campo("e.nombres", ""); //6
    $dao->Campo("c.precio", ""); //7
    $dao->Campo("c.subtotal", ""); //8
    $dao->Campo("c.turno", ""); //9

    $dao->TablasInnerAlias("consulta_item", "c", "empleado", "e");
    $dao->Where("c.id_consulta", $consulta, "");

    $respuesta = $dao->Consultar();
    $jsondata = array();
    foreach ($respuesta as $row => $item) {
        $nombre = "";
        $descuento =  $item[7] - $item[8];
        $codigo = "";
        if ($item[0] > 0) {
            $codigo = "CON " . $item[0];
            $nombre = ObtenerNombreProcedimiento($item[0]);
        }
        if ($item[1] > 0) {
            $codigo = "LAB " . $item[1];
            $nombre = ObtenerNombreProcedimiento(0, $item[1]);
        }
        if ($item[2] > 0) {
            $codigo = "ECO " . $item[2];
            $nombre = ObtenerNombreProcedimiento(0, 0, $item[2]);
        }
        if ($item[3] > 0) {
            $codigo = "RX " . $item[3];
            $nombre = ObtenerNombreProcedimiento(0, 0, 0, $item[3]);
        }
        if ($item[4] > 0) {
            $codigo = "TOMO " . $item[4];
            $nombre = ObtenerNombreProcedimiento(0, 0, 0, 0, $item[4]);
        }
        $itemfc = array(
            "Id" => 0,
            "Codigo" => $codigo,
            "Bodega" => 0,
            "Descripcion" => $nombre,
            "Cantidad" => 1,
            "Unidad" => "Entero",
            "Descuento" => $descuento,
            "Precio" => $item[7],
            "Nota" => $item[5] . " " . $item[6] . " FECHA DE ATENCION " . $item[9],
            "Iva" => "N",
            "Tipo" => "S"
        );
        $jsondata[] = $itemfc;
    }
    return $jsondata;
}
function CrearXMLConsulta()
{
    $dao = new Dao();

    $dao->Campo("p.ruc", ""); //0
    $dao->Campo("concat(p.apellido,' ',p.nombre)", ""); //1
    $dao->Campo("p.direccion", ""); //2
    $dao->Campo("c.total", ""); //3
    $dao->Campo("c.descuento", ""); //4
    $dao->Campo("CONCAT(pa.apellido,' ',pa.apellido_materno,' ',pa.nombre)", ""); //5
    $dao->Campo("p.email", ""); //6
    $dao->Campo("c.numero", ""); //7
    $dao->Campo("Date_format(c.fecha_registro,'%d/%m/%Y')", ""); //8
    $dao->Campo("c.id", ""); //9
    $dao->Campo("CONVERT(c.fecha_registro,Date)", ""); //10

    $dao->TablasInnerAlias("consulta", "c", "paciente_cliente", "p");
    $dao->TablasInnerAlias("consulta", "c", "paciente", "pa");
    $dao->MayorIgual("Convert(c.fecha_registro,date)", "'2021-09-30'", "");


    $respuesta = $dao->Consultar();
    $datosempresa = ObtenerDatosEmpresa();
    $ambiente = 2;
    $nombre = '';
    $ruc = '';
    $direccion = '';
    $telefono = '';
    $cabecera = null;
    $correoEmpresa = '';
    foreach ($datosempresa as $row => $empresa) {
        $nombre = $empresa[0];
        $ruc = $empresa[1];
        $direccion = $empresa[2];
        $telefono = $empresa[3];
        $correoEmpresa = $empresa[4];
        $cabecera = $empresa;
    }

    foreach ($respuesta as $row => $item) {
        $cabecera[4] = $item[0];
        $cabecera[5] = $item[1];
        $cabecera[6] = $item[2];

        $cabecera[7] = $item[3];
        $cabecera[8] = 0.0;
        $cabecera[9] = $item[3];
        $cabecera[10] = $item[4];

        $cabecera[11] = $item[5];
        $cabecera[12] = $item[6];
        $cabecera[13] = $correoEmpresa;

        $establecimiento = substr(str_replace("-", "", $item[7]), 0, 3);
        $punto = substr(str_replace("-", "", $item[7]), 3, 3);
        $secuencial = substr(str_replace("-", "", $item[7]), 6);
        $fecha = $item[8];
        $comprador = $cabecera[5];
        $direccionComprador = $cabecera[6];
        $subtotal = $cabecera[7];
        $iva = $cabecera[8];
        $total = $cabecera[9];
        $descuento = $cabecera[10];
        $detalle = '';
        $paciente = $cabecera[11];
        $correo = $cabecera[12];

        $claveAcceso = ObtenerClave($establecimiento . $punto . $secuencial, $ruc, $ambiente, $item[10], "01");
        $direccionPaciente = $direccionComprador;
        $tipoIdentificacionComprador = "05";
        $identificacionComprador = $cabecera[4];
        if (strlen($cabecera[4]) == 13) {
            $tipoIdentificacionComprador = "04";
        }
        if ($cabecera[4] == '9999999999') {
            $direccionPaciente = $direccion;
            $identificacionComprador = '9999999999999';
            $tipoIdentificacionComprador = "07";
            $correo =  $cabecera[12];
            $comprador = "CONSUMIDOR FINAL";
        }
        if ($_POST["TipoIde"] == '2') {
            $tipoIdentificacionComprador = "06";
        }
        if ($correo == "") {
            $correo = "----";
        }
        if ($direccionComprador == "") {
            $direccionComprador = "----";
        }
        $detalleconsulta = CargarDetalleConsulta($item[9]);
        foreach ($detalleconsulta as $key => $value) {

            $descuentoXml = ($value["Precio"] * $value["Descuento"]) / 100;
            $subtotalXml = $value["Precio"];
            $resta = $subtotalXml - $descuentoXml;
            $detalle .= ' <detalle>
                        <codigoPrincipal>' . $value["Id"] . '</codigoPrincipal>
                        <codigoAuxiliar>' . $value["Id"] . '</codigoAuxiliar> 
                        <descripcion>' . $value["Descripcion"] . '</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>' . $value["Precio"] . '</precioUnitario>
                        
                        <descuento>' . number_format($descuentoXml, 2, '.', '') . '</descuento>
                        <precioTotalSinImpuesto>' . number_format($resta, 2, '.', '') . '</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>0</codigoPorcentaje>
                                <tarifa>0</tarifa>
                                <baseImponible>' . number_format($resta, 2, '.', '') . '</baseImponible>
                                <valor>00.00</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
        }
        if ($descuento == "NaN" || $descuento == "") {
            $descuento = 0;
        }

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

        $xml->asXML('../facturas/' . $claveAcceso . '.xml');

        $xmlFirmar = "../facturas/" . $claveAcceso . ".xml";
        $certificado = "../facturas/0992894512001.p12";
        $clave = "BCfunsisa2976";
        $rutaFirmados = "../Firmados/";
        $nombreXml = $claveAcceso . ".xml";

        $parametros = $certificado . " " . $clave . " " . $xmlFirmar . " " . $rutaFirmados . " " . $nombreXml;

        $respuestajava = shell_exec('java -jar "../java/FirmaXades.jar" ' . $parametros);

        $datos = array(
            "autorizada" => 'N',
            "clave_sri" => $claveAcceso
        );

        $dao = new Dao();

        $dao->Modificar("consulta", $datos, "id=" . $item[9], 0);
        echo $respuestajava . "<br>";
    }
}
///////////////////////////////////////////////////FARMACIA
function CargarDetalleFarmacia($farmacia)
{
    $dao = new Dao();

    $dao->Campo("c.id_inventario", ""); //0
    $dao->Campo("i.codigo_barra", ""); //1
    $dao->Campo("c.cantidad", ""); //2
    $dao->Campo("c.precio", ""); //3
    $dao->Campo("c.subtotal", ""); //4
    $dao->Campo("c.descuento", ""); //5
    $dao->Campo("c.presentacion", ""); //6
    $dao->Campo("i.prst1", ""); //7
    $dao->Campo("i.iva", ""); //8
    $dao->Campo("i.prst2", ""); //9
    $dao->Campo("i.nombre", ""); //10

    $dao->TablasInnerAlias("farmacia_item", "c", "inventario", "i");
    $dao->Where("c.id_farmacia", $farmacia, "");

    $respuesta = $dao->Consultar();
    $jsondata = array();
    foreach ($respuesta as $row => $item) {

        $unidad = "Entero";
        if ($item[6] == $item[7]) {
            $unidad = "Fracciones";
        }
        if ($item[9] == "(NINGUNO)") {
            $unidad = "Entero";
        }
        $iva = $item[8];
        $descuento =  ($item[2] * $item[3]) - $item[4];

        $itemfc = array(
            "Id" => 0,
            "Codigo" => $item[1],
            "Descripcion" => $item[10],
            "Cantidad" => $item[2],
            "Unidad" => $unidad,
            "Descuento" => $descuento,
            "Precio" => $item[3],
            "Nota" => $item[6],
            "Iva" => $iva,
            "Tipo" => "P"
        );
        $jsondata[] = $itemfc;
    }
    return $jsondata;
}
function CrearXMLFarmacia()
{
    $dao = new Dao();

    $dao->Campo("p.ruc", ""); //0
    $dao->Campo("concat(p.apellido,' ',p.nombre)", ""); //1
    $dao->Campo("p.direccion", ""); //2
    $dao->Campo("c.total", ""); //3
    $dao->Campo("c.descuento", ""); //4
    $dao->Campo("CONCAT(pa.apellido,' ',pa.apellido_materno,' ',pa.nombre)", ""); //5
    $dao->Campo("p.email", ""); //6
    $dao->Campo("c.numero", ""); //7
    $dao->Campo("Date_format(c.fecha_registro,'%d/%m/%Y')", ""); //8
    $dao->Campo("c.id", ""); //9
    $dao->Campo("CONVERT(c.fecha_registro,Date)", ""); //10
    $dao->Campo("c.total_iva", ""); //11

    $dao->TablasInnerAlias("farmacia", "c", "paciente_cliente", "p");
    $dao->TablasInnerAlias("farmacia", "c", "paciente", "pa");
    $dao->Entre("Convert(c.fecha_registro,date)", "'2021-09-30'", "'2021-10-05'", "");


    $respuesta = $dao->Consultar();
    $datosempresa = ObtenerDatosEmpresa();
    $ambiente = 2;
    $nombre = '';
    $ruc = '';
    $direccion = '';
    $telefono = '';
    $cabecera = null;
    $correoEmpresa = '';
    foreach ($datosempresa as $row => $empresa) {
        $nombre = $empresa[0];
        $ruc = $empresa[1];
        $direccion = $empresa[2];
        $telefono = $empresa[3];
        $correoEmpresa = $empresa[4];
        $cabecera = $empresa;
    }

    foreach ($respuesta as $row => $item) {
        $cabecera[4] = $item[0];
        $cabecera[5] = $item[1];
        $cabecera[6] = $item[2];

        $cabecera[7] = $item[3];
        $cabecera[8] = 0.0;
        $cabecera[9] = $item[3];
        $cabecera[10] = $item[4];

        $cabecera[11] = $item[5];
        $cabecera[12] = $item[6];
        $cabecera[13] = $correoEmpresa;

        $establecimiento = substr(str_replace("-", "", $item[7]), 0, 3);
        $punto = substr(str_replace("-", "", $item[7]), 3, 3);
        $secuencial = substr(str_replace("-", "", $item[7]), 6);
        $fecha = $item[8];
        $comprador = $cabecera[5];
        $direccionComprador = $cabecera[6];
        $subtotal = $cabecera[7];
        $iva = $cabecera[8];
        $total = $cabecera[9];
        $descuento = $cabecera[10];
        $detalle = '';
        $paciente = $cabecera[11];
        $correo = $cabecera[12];

        $claveAcceso = ObtenerClave($establecimiento . $punto . $secuencial, $ruc, $ambiente, $item[10], "01");
        $direccionPaciente = $direccionComprador;
        $tipoIdentificacionComprador = "05";
        $identificacionComprador = $cabecera[4];
        if (strlen($cabecera[4]) == 13) {
            $tipoIdentificacionComprador = "04";
        }
        if ($cabecera[4] == '9999999999') {
            $direccionPaciente = $direccion;
            $identificacionComprador = '9999999999999';
            $tipoIdentificacionComprador = "07";
            $correo =  $cabecera[12];
            $comprador = "CONSUMIDOR FINAL";
        }
        if ($_POST["TipoIde"] == '2') {
            $tipoIdentificacionComprador = "06";
        }
        if ($correo == "") {
            $correo = "----";
        }
        if ($direccionComprador == "") {
            $direccionComprador = "----";
        }
        $detalleconsulta = CargarDetalleFarmacia($item[9]);
        $totalConIva = 0;
        $totalSinIva = 0;
        foreach ($detalleconsulta as $key => $value) {
            $iva = 0;
            $codigo = 0;
            $tarifa = 0;
            $descuentoXml = ($value["Precio"] * $value["Descuento"]) / 100;
            $subtotalXml = $value["Precio"];
            $resta = $subtotalXml - $descuentoXml;
            if ($value["Iva"] == 'S') {
                $iva = $resta * 0.12;
                $codigo = 2;
                $tarifa = 12;
                $totalConIva = $totalConIva + $resta;
            } else {
                $totalSinIva = $totalSinIva + $resta;
            }
            $detalle .= ' <detalle>
                        <codigoPrincipal>' . $value["Id"] . '</codigoPrincipal>
                        <codigoAuxiliar>' . $value["Id"] . '</codigoAuxiliar> 
                        <descripcion>' . $value["Descripcion"] . '</descripcion>                        
                        <cantidad>1</cantidad>
                        <precioUnitario>' . $value["Precio"] . '</precioUnitario>
                        
                        <descuento>' . number_format($descuentoXml, 2, '.', '') . '</descuento>
                        <precioTotalSinImpuesto>' . number_format($resta, 2, '.', '') . '</precioTotalSinImpuesto>
                        
                        <impuestos>
                            <impuesto>
                                <codigo>2</codigo>
                                <codigoPorcentaje>' . $codigo . '</codigoPorcentaje>
                                <tarifa>' . $tarifa . '</tarifa>
                                <baseImponible>' . number_format($resta, 2, '.', '') . '</baseImponible>
                                <valor>' . number_format($iva, 2, '.', '') . '</valor>
                            </impuesto>                           
                        </impuestos>
                    </detalle> ';
        }


        $xmlTotalConIva = '';
        $xmlTotalSinIva = '';

        if ($totalConIva > 0) {
            $iva = $totalConIva * 0.12;
            $xmlTotalConIva = ' <totalImpuesto>
                              <codigo>2</codigo> 
                              <codigoPorcentaje>2</codigoPorcentaje> 
                              <baseImponible>' . number_format($totalConIva, 2, '.', '') . '</baseImponible> 
                              <valor>' . number_format($iva, 2, '.', '') . '</valor> 
                            </totalImpuesto>
                           
                           ';
        }
        if ($totalSinIva > 0) {

            $xmlTotalSinIva = ' <totalImpuesto>
                              <codigo>2</codigo> 
                              <codigoPorcentaje>0</codigoPorcentaje> 
                              <baseImponible>' . number_format($totalSinIva, 2, '.', '') . '</baseImponible> 
                              <valor>0.00</valor> 
                            </totalImpuesto>
                           
                           ';
        }
        $xmlTotalConImpuestos = $xmlTotalConIva . $xmlTotalSinIva;
        $total = $totalSinIva + ($totalConIva * 1.12);
        $total = number_format($total, 2, '.', '');
        $totalSinImpuestos = $totalConIva + $totalSinIva;
        if ($descuento == "NaN" || $descuento == "") {
            $descuento = 0;
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

        $xml->asXML('../farmacia/' . $claveAcceso . '.xml');

        $xmlFirmar = "../farmacia/" . $claveAcceso . ".xml";
        $certificado = "../facturas/0992894512001.p12";
        $clave = "BCfunsisa2976";
        $rutaFirmados = "../Firmados/";
        $nombreXml = $claveAcceso . ".xml";

        $parametros = $certificado . " " . $clave . " " . $xmlFirmar . " " . $rutaFirmados . " " . $nombreXml;

        $respuestajava = shell_exec('java -jar "../java/FirmaXades.jar" ' . $parametros);

        $datos = array(
            "autorizada" => 'N',
            "clave_sri" => $claveAcceso
        );

        $dao = new Dao();

        $dao->Modificar("farmacia", $datos, "id=" . $item[9], 0);
        echo $respuestajava . "<br>";
    }
}
//CrearXMLConsulta();
CrearXMLFarmacia();