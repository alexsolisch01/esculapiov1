<?php
session_start();

require_once "autoloadAjax.php";
require_once '../Apis/Quickcont/Factura.php';
if (isset($_POST['Requerimiento'])) {

	function Escribir($texto)
	{
		$myfile = fopen("debug.txt", "w") or die("Unable to open file!");
		fwrite($myfile, $texto . "\n");
		fclose($myfile);
	}
	function ObtenerSecuencia()
	{

		$dao = new Dao();
		$dao->Campo("p.id_punto_emision", "");
		$dao->Campo("p.secuencia_fc", "");

		$dao->Tabla("punto_venta", "p");

		$dao->Where("p.id_punto_emision", "'" . $_SESSION["puntoEmision"] . "'", "");

		$respuesta = $dao->Consultar();
		$jsondata = array();
		foreach ($respuesta as $row => $item) {
			$jsondata[0] = $item[0];
			$jsondata[1] = $item[1];
		}
		return $jsondata;
	}
	function ActualizarSecuencia($secuencia)
	{
		$datos = array("secuencia_fc" => $secuencia);
		$dao = new Dao();
		$dao->Modificar("punto_venta", $datos, "id_punto_emision=" . $_SESSION["puntoEmision"], $_SESSION["puntoEmision"]);
	}
	function ObtenerTurno($empleado, $fecha)
	{
		$dao = new Dao();

		$sql = ' SELECT ci.turno
				FROM consulta_item ci 
				WHERE ci.id_empleado = ' . $empleado . ' 
				AND CONVERT(ci.fecha_atencion,date) = "' . $fecha . '" order by ci.turno desc limit 1';

		$respuesta = $dao->ConsultarSqlNativo($sql);

		$turno = 0;
		foreach ($respuesta as $row => $item) {
			$turno = $item[0];
		}
		return $turno + 1;
	}

	function ActualizarEstado($tabla, $tipo, $estado, $id)
	{
		$datos = array($tipo => $estado);
		$dao = new Dao();
		$dao->Modificar($tabla, $datos, "id=" . $id, $id);
	}
	function ActualizarOrden($campo, $estado, $orden, $campo2, $item)
	{
		$datos = array($campo => $estado);
		$dao = new Dao();
		$dao->Modificar("orden_item", $datos, "id_orden=" . $orden . " AND " . $campo2 . " = " . $item, $orden);
	}
	function ObtenerDetalleDetalle($tipo, $detalle)
	{
		$array = json_decode($detalle, true);
		$jsondata = array();
		for ($i = 0; $i < sizeof($array); $i++) {
			$producto = $array[$i];
			$medico = "";
			if ($tipo == 1) {
				$medico = $producto[9];
			}
			$descuento =  $producto[3] - $producto[5];
			$item = array(
				"Codigo" => $tipo." - ".$producto[0],
				"Bodega" => 0,
				"Cantidad" => 1,
				"Unidad" => "Entero",
				"Descuento" => $descuento,
				"Precio" => $producto[3],
				"Nota" => $medico . " FECHA DE ATENCION " . $producto[2],
				"Iva" => "N",
				"Tipo" => "S"
			);
			$jsondata[] = $item;
		}
		return $jsondata;
	}
	function ObtenerFormaPago($efectivo, $cheque, $bancocheque, $numerocheque, $cuentacheque, $tarjeta, $entidadtarjeta, $numerotarjeta, $numerovoucher, $nombretarjeta, $credito, $periodo, $fechacobro)
	{
		$formapago = array();
		if ($efectivo > 0) {
			$pago = array(
				"Tipo" => "Efectivo",
				"Banco" => "",
				"NumeroCuenta" => "",
				"NumeroCheque" => "",
				"EntidadTarjeta" => "",
				"NumeroTarjeta" => "",
				"NumeroVoucher" => "",
				"NombreTarjeta" => "",
				"FechaCobro" => date("Y-m-d"),
				"Periodo" => 0,
				"Monto" => $efectivo
			);
			$formapago[] = $pago;
		}
		if ($cheque > 0) {
			$pago = array(
				"Tipo" => "Banco",
				"Banco" => $bancocheque,
				"NumeroCuenta" => $cuentacheque,
				"NumeroCheque" => $numerocheque,
				"EntidadTarjeta" => "",
				"NumeroTarjeta" => "",
				"NumeroVoucher" => "",
				"NombreTarjeta" => "",
				"FechaGiro" => date("Y-m-d"),
				"FechaCobro" => date("Y-m-d"),
				"Periodo" => 0,
				"Monto" => $cheque
			);
			$formapago[] = $pago;
		}
		if ($tarjeta > 0) {
			$pago = array(
				"Tipo" => "Tarjeta",
				"Banco" => "",
				"NumeroCuenta" => "",
				"NumeroCheque" => "",
				"EntidadTarjeta" => $entidadtarjeta,
				"NumeroTarjeta" => $numerotarjeta,
				"NumeroVoucher" => $numerovoucher,
				"NombreTarjeta" => $nombretarjeta,
				"FechaGiro" => date("Y-m-d"),
				"FechaCobro" => date("Y-m-d"),
				"Periodo" => 0,
				"Monto" => $tarjeta
			);
			$formapago[] = $pago;
		}
		if ($credito > 0) {
			$pago = array(
				"Tipo" => "Tarjeta",
				"Banco" => "",
				"NumeroCuenta" => "",
				"NumeroCheque" => "",
				"EntidadTarjeta" => "",
				"NumeroTarjeta" => "",
				"NumeroVoucher" => "",
				"NombreTarjeta" => "",
				"FechaGiro" => date("Y-m-d"),
				"FechaCobro" => $fechacobro,
				"Periodo" => $periodo,
				"Monto" => $credito
			);
			$formapago[] = $pago;
		}
		return $formapago;
	}
	function GuardarDetalle($idConsulta, $tipo, $detalle)
	{
		$array = json_decode($detalle, true);
		$jsondata = array();
		$turnos = array();
		$j = 0;
		$k = 0;
		for ($i = 0; $i < sizeof($array); $i++) {
			$producto = $array[$i];
			$turno = 0;
			$datos = array(
				"id_consulta" => $idConsulta,
				"id_empleado" => $producto[1],
				"id_estado" => 7,
				"fecha_atencion" => $producto[2],
				"precio" => $producto[3],
				"descuento" => $producto[4],
				"subtotal" => $producto[5],
				"turno" => $turno
			);
			if ($tipo == 1) {
				$datos['id_procedimiento'] = $producto[0];
			}
			if ($tipo == 2) {
				$datos['id_procedimiento_laboratorio'] = $producto[0];
			}
			if ($tipo == 3) {
				$datos['id_procedimiento_eco'] = $producto[0];
			}
			if ($tipo == 4) {
				$datos['id_procedimiento_rx'] = $producto[0];
			}
			if ($tipo == 5) {
				$datos['id_procedimiento_tomo'] = $producto[0];
			}

			$dao = new Dao();
			$respuesta = $dao->Guardar("consulta_item", $datos, true);
			if (!$respuesta[0]) {

				$jsondata[$j] = "No se puedo guardar el item  " . $producto[6] . " " . $respuesta[1] . " SQL " . $respuesta[2];
				$j++;
			} else {
				if ($tipo == 1) {
					$itemconsulta = json_decode($respuesta[1], true);
					$turnos[$k] = $itemconsulta[0][9];
					$k++;
				}
				if ($tipo == 2 && $producto[8] > 0 && $producto[7] > 0) {
					ActualizarOrden("id_estado", 18, $producto[8], "id_procedimiento_laboratorio", $producto[0]);
				}
				if ($tipo == 3 && $producto[8] > 0 && $producto[7] > 0) {
					ActualizarOrden("id_estado", 18, $producto[8], "id_procedimiento_eco", $producto[0]);
				}
				if ($tipo == 4 && $producto[8] > 0 && $producto[7] > 0) {
					ActualizarOrden("id_estado", 18, $producto[8], "id_procedimiento_rx", $producto[0]);
				}
				if ($tipo == 5 && $producto[8] > 0 && $producto[7] > 0) {
					ActualizarOrden("id_estado", 18, $producto[8], "id_procedimiento_tomo", $producto[0]);
				}
			}
		}
		if (sizeof($jsondata) > 0) {
			return $jsondata;
		} else {
			return $turnos;
		}
	}
	function ClaveAcceso($ruc, $factura)
	{

		$establecimiento = substr(str_replace("-", "", $factura), 0, 3);
		$punto = substr(str_replace("-", "", $factura), 3, 3);
		$secuencial = '00' . substr(str_replace("-", "", $factura), 6);

		$claveAcceso = date("dmY") . "01" . $ruc . "1" . $establecimiento . $punto . $secuencial . "41261533" . "1";
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

	function EnviarFacturaQuickCont($factura, $tipoidentificacion, $identificacion, $cliente, $email, $subtotal, $descuento, $iva, $total, $observacion, $referencia, $detalle, $formapago)
	{
		
		$obj = new Factura();
		$respuesta = $obj->CrearFactura(
			/*datos de la empresa*/
			$_SESSION["QUICKCONT_ID EMPRESA"],
			$_SESSION["QUICKCONT_USUARIO"],
			$_SESSION["QUICKCONT_CONTRASEÑA"],
			/*cabecera factura*/
			$factura,
			date("Y-m-d"),
			$tipoidentificacion,
			$identificacion,
			$cliente,
			$email,
			$subtotal,
			$descuento,
			$iva,
			$total,
			0,
			$observacion,
			$referencia,
			/*detalle de la factura */
			$detalle,
			$formapago,

			file_get_contents("../facturas/firmaelectronica.p12"),
			Configuracion::CLAVE_CERTIFICADO,
			$_SESSION["QUICKCONT_SERVICIO WEB FACTURAS"]
		);
		return $respuesta;
	}

	if ($_POST['Requerimiento'] == "GuardarConsulta") {

		$mismosdatos = null;

		if ($_POST["Paciente"] != $_POST["Cliente"]) {
			$mismosdatos = 'N';
		} else {
			$mismosdatos = 'S';
		}

		if ($_POST["Cliente"] == 1) {
			$mismosdatos = 'N';
		}
		$numero = ObtenerSecuencia();

		$nfc = $_SESSION["establecimiento"] . '-' . $_SESSION["puntoEmision"] . '-' . str_pad($numero[1],  9, "0", STR_PAD_LEFT);
		if (!isset($_SESSION["establecimiento"])) {
			$jsondata = array();
			$jsondata[0] = 'recarga';
			echo json_encode($jsondata, JSON_FORCE_OBJECT);
			return;
		}

		$datos = array(
			"id_punto_venta" => $_POST["Punto"],
			"id_paciente" => $_POST["Paciente"],
			"descuento" => $_POST["Descuento"],
			"cambios" => 0,
			"id_estado" => 1,
			"id_estado_rx" => 1,
			"id_estado_eco" => 1,
			"id_estado_lab" => 1,
			"id_estado_tomo" => 1,
			"id_estado_orden_rx" => 0,
			"id_estado_orden_eco" => 0,
			"id_estado_orden_lab" => 0,
			"id_estado_orden_tomo" => 0,
			"id_estado_receta" => 0,
			"autorizada" => "N",
			"mismosdatos" => $mismosdatos,
			"total" => $_POST["Total"],
			"tipoid" => $_POST["TipoIde"],
			"numero" => $nfc
		);


		if ($_POST["Cliente"] == "" || $_POST["Cliente"] == null) {
			$_POST["Cliente"] = 1;
		}
		$datos['id_paciente_cliente'] = $_POST["Cliente"];

		if (isset($_POST["Referente"])) {
			if ($_POST["Referente"] != "" && $_POST["Referente"] != 0) {
				$datos['id_referencia'] = $_POST["Referente"];
			}
		}

		$dao = new Dao();
		$respuesta = $dao->Guardar("consulta", $datos);
		if ($respuesta[0]) {
			$_SESSION["secuencia_fc"] = str_pad($numero[1] + 1,  9, "0", STR_PAD_LEFT);
			ActualizarSecuencia($numero[1] + 1);
			$clave_sri = ClaveAcceso($_SESSION["ruc"], $nfc);

			$errores1 = GuardarDetalle($respuesta[1], 1, $_POST["Procedimiento"]);
			$errores2 = GuardarDetalle($respuesta[1], 2, $_POST["Laboratorio"]);
			$errores3 = GuardarDetalle($respuesta[1], 3, $_POST["Eco"]);
			$errores4 = GuardarDetalle($respuesta[1], 4, $_POST["Rx"]);
			$errores5 = GuardarDetalle($respuesta[1], 5, $_POST["Tac"]);
			$errores = array_merge($errores2, $errores3, $errores4, $errores5);

			if (sizeof($errores) > 0) {
				echo json_encode($errores, JSON_FORCE_OBJECT);
			} else {
				ActualizarEstado("consulta", "id_orden", $_POST["Orden"], $respuesta[1]);
				if ($_POST["Reservacion"] > 0) {
					ActualizarEstado("reservaciones", "id_estado", "26", $_POST["Reservacion"]);
				}

				/*if ($_SESSION["QUICKCONT_INTEGRADO A QUICKCONT"] == "SI") {
					$tipoidentificacion = "PASAPORTE";
					if ($_POST["TipoIde"] == 2) {
						$tipoidentificacion = "PASAPORTE";
					} else {
						if (strlen($_POST["CedulaCliente"]) == 10) {
							$tipoidentificacion = "CEDULA";
						}
						if (strlen($_POST["CedulaCliente"]) == 13) {
							$tipoidentificacion = "RUC";
						}
					}
					$detalle1 = ObtenerDetalleDetalle(1, $_POST["Procedimiento"]);
					$detalle2 = ObtenerDetalleDetalle(2, $_POST["Laboratorio"]);
					$detalle3 = ObtenerDetalleDetalle(3, $_POST["Eco"]);
					$detalle4 = ObtenerDetalleDetalle(4, $_POST["Rx"]);
					$detalle5 = ObtenerDetalleDetalle(5, $_POST["Tac"]);

					$detalle = array_merge($detalle1, $detalle2, $detalle3, $detalle4, $detalle5);
					$formapago = ObtenerFormaPago(
						$_POST["Efectivo"],
						$_POST["Cheque"],
						$_POST["Banco"],
						$_POST["Numero"],
						$_POST["Cuenta"],
						$_POST["Tarjeta"],
						$_POST["EntidadTarjeta"],
						$_POST["NumeroTarjeta"],
						$_POST["NumeroVoucher"],
						$_POST["NEntidadTarjeta"],
						$_POST["Credito"],
						3,
						date("Y-m-d")
					);
					$wsrespuesta = EnviarFacturaQuickCont(
						$nfc,
						$tipoidentificacion,
						$_POST["CedulaCliente"],
						$_POST["NombreCliente"],
						$_POST["EmailCliente"],
						$_POST["Total"],
						0,
						0,
						$_POST["Total"],
						"",
						"",
						$detalle,
						$formapago
					);
					Escribir( print_r($wsrespuesta,true) );
				}*/

				$jsondata = array();
				$jsondata[0] = true;
				$jsondata[1] = $respuesta[1];
				$jsondata[2] = $nfc;
				$jsondata[3] = $_POST["Paciente"];
				$jsondata[4] = json_encode($errores1, JSON_FORCE_OBJECT);
				$jsondata[5] = $clave_sri;
				$jsondata[6] = "";
				echo json_encode($jsondata, JSON_FORCE_OBJECT);
			}
		} else {
			echo json_encode($respuesta, JSON_FORCE_OBJECT);
		}
	}
	if ($_POST['Requerimiento'] == "ModificarConsulta") {

		$mismosdatos = "N";

		if ($_POST["Paciente"] != $_POST["Cliente"]) {
			$mismosdatos = 'N';
		} else {
			$mismosdatos = 'S';
		}

		if ($_POST["Cliente"] == 1) {
			$mismosdatos = 'N';
		}

		$datos = array("autorizada" => $_POST['EstadoSri'], "nc" => 0, "id_estado" => 1, "cambios" => $_POST['Cambios'] + 1);
		$dao = new Dao();
		$dao->ModificarAjax("consulta", $datos, "id=" . $_POST['Consulta'], $_POST['Consulta']);
	}

	if ($_POST['Requerimiento'] == "ActualizarConsultaDetalle") {
		$datos = array(
			"fecha_atencion" => $_POST["Fecha"],
			"turno" => $_POST["Turno"],
			"id_estado" => 7
		);

		$campo = "";
		$valor = "";
		if (isset($_POST["Procedimiento"])) {

			$campo = "id_procedimiento";
			$valor = $_POST["Procedimiento"];
		}

		if (isset($_POST["Laboratorio"])) {

			$campo = "id_procedimiento_laboratorio";
			$valor = $_POST["Laboratorio"];
		}
		if (isset($_POST["Rx"])) {

			$campo = "id_procedimiento_rx";
			$valor = $_POST["Rx"];
		}
		if (isset($_POST["Eco"])) {

			$campo = "id_procedimiento_eco";
			$valor = $_POST["Eco"];
		}
		if (isset($_POST["Tac"])) {

			$campo = "id_procedimiento_tomo";
			$valor = $_POST["Tac"];
		}

		$dao = new Dao();
		$dao->ModificarAjax("consulta_item", $datos, "id=" . $_POST['IdConsultaItem'], $_POST['Consulta']);
	}

	if ($_POST['Requerimiento'] == "EliminarDetalleConsulta") {
		$dao = new Dao();
		$dao->EliminarPorCampoAjax("consulta_item", "id_consulta", $_POST['Consulta']);
	}

	if ($_POST['Requerimiento'] == "EliminarSignosPorConsulta") {
		if (isset($_POST["Item"])) {
			$dao = new Dao();
			$dao->EliminarPorCampoAjax("signo", "id_consulta_item", $_POST['Item']);
		} else {
			$dao = new Dao();
			$dao->EliminarPorCampoAjax("signo", "id_consulta_item", -1);
		}
	}

	if ($_POST['Requerimiento'] == "ModificarConsultaDetalle") {

		$datos = array(
			"id_consulta" => $_POST["Consulta"],
			"id_empleado" => $_POST["Empleado"],
			"id_estado" => 7,
			"fecha_atencion" => $_POST["Fecha"],
			"precio" => $_POST["Precio"],
			"descuento" => $_POST["Descuento"],
			"subtotal" => $_POST["Subtotal"],
			"turno" => $_POST["Turno"]
		);

		if (isset($_POST["Procedimiento"])) {
			$datos['id_procedimiento'] = $_POST["Procedimiento"];
		}

		if (isset($_POST["Laboratorio"])) {
			$datos['id_procedimiento_laboratorio'] = $_POST["Laboratorio"];
		}
		if (isset($_POST["Rx"])) {
			$datos['id_procedimiento_rx'] = $_POST["Rx"];
		}
		if (isset($_POST["Eco"])) {
			$datos['id_procedimiento_eco'] = $_POST["Eco"];
		}
		if (isset($_POST["Tac"])) {
			$datos['id_procedimiento_tomo'] = $_POST["Tac"];
		}

		$dao = new Dao();
		$dao->GuardarAjax("consulta_item", $datos);
	}

	if ($_POST['Requerimiento'] == "ActualizaSecuencia") {

		$datos = array("secuencia_fc" => $_POST["Secuencia"]);
		if ($_SESSION["puntoVenta"] == $_POST['Id']) {
			$dao = new Dao();
			$_SESSION["secuencia_fc"] = str_pad($_POST["Secuencia"],  9, "0", STR_PAD_LEFT);
			$dao->ModificarAjax("punto_venta", $datos, "id=" . $_POST['Id'], $_POST['Id']);
		} else {
			//echo json_encode(true);
		}
	}
	if ($_POST['Requerimiento'] == "FacturaAutorizada") {

		$datos = array(
			"autorizada" => 'S',
			"clave_sri" => $_POST['Clave']
		);

		$dao = new Dao();

		$dao->ModificarAjax("consulta", $datos, "id=" . $_POST['Consulta'], $_POST['Consulta']);
	}

	if ($_POST['Requerimiento'] == "CargarFacturaConsulta") {


		$dao = new Dao();

		$dao->Campo("c.id", "");
		$dao->Campo("c.id_paciente", "");
		$dao->Campo("p.nombre", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno)", "");
		$dao->Campo("p.cedula", "");
		$dao->Campo("p.direccion", "");
		$dao->Campo("p.telefono", "");
		$dao->Campo("p.email", "");
		$dao->Campo("p.fecha_nacimiento", "");
		$dao->Campo("p.apellido", "");
		$dao->Campo("c.id_paciente_cliente", "");
		$dao->Campo("c.mismosdatos", "");
		$dao->Campo("c.total", "");
		$dao->Campo("c.descuento", "");
		$dao->Campo("c.id_estado", "");
		$dao->Campo("c.id_estado_lab", "");
		$dao->Campo("c.id_estado_rx", "");
		$dao->Campo("c.id_estado_eco", "");
		$dao->Campo("c.id_estado_tomo", "");
		$dao->Campo("c.autorizada", "");
		$dao->Campo("CONVERT(c.fecha_registro,Date)", "");
		$dao->Campo("c.clave_sri", "");
		$dao->Campo('CASE WHEN CONVERT(c.fecha_registro,date) < Curdate() THEN false ELSE true END', "");
		$dao->Campo("c.cambios", "");
		$dao->Campo("c.tipoid", "");
		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");

		$dao->Where("c.numero", "'" . $_POST['Numero'] . "'", "");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());


	}

	if ($_POST['Requerimiento'] == "ConsultarDetalleConsulta") {


		$dao = new Dao();

		$dao->Campo("c.*", "");
		$dao->Campo("e.apellidos", "");
		$dao->Campo("e.nombres", "");


		$dao->TablasInnerAlias("consulta_item", "c", "empleado", "e");

		$dao->Where("c.id_consulta", $_POST['Consulta'], "AND");
		$dao->Diferente("c.id_estado", 25, "");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());


	}
	if ($_POST['Requerimiento'] == "ConsultarDetalleConsultaFactura") {


		$dao = new Dao();

		$dao->Campo("c.*", "");
		$dao->Campo("e.apellidos", "");
		$dao->Campo("e.nombres", "");


		$dao->TablasInnerAlias("consulta_item", "c", "empleado", "e");

		$dao->Where("c.id_consulta", $_POST['Consulta'], "");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());


	}

	if ($_POST['Requerimiento'] == "CargarNotasCredito") {


		$dao = new Dao();

		$dao->Campo("nc.numero", "");
		$dao->TablasInnerAlias("nc_consulta", "nc", "consulta", "c");

		$dao->Where("c.id", $_POST['Id'], "");
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());


	}
	if ($_POST['Requerimiento'] == "CargarItemId") {


		$dao = new Dao();
		$dao->Campo("nombre", "");
		$dao->Tabla($_POST['Tabla'], "");

		$dao->Where("id", $_POST['Id'], "");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());


	}
	if ($_POST['Requerimiento'] == "CargarEspecialidadItem") {


		$dao = new Dao();
		$dao->Campo("p.id_especialidad", "");
		$dao->Campo("e.id_tipo_servicio", "");
		$dao->Campo("e.nombre", "");
		$dao->TablasInnerAlias("procedimiento", "p", "especialidad", "e");

		$dao->Where("p.id", $_POST['Id'], "");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());


	}

	if ($_POST['Requerimiento'] == "ActualizarEstadoConsulta") {


		$datos = array($_POST["Tipo"] => $_POST["Estado"]);
		$dao = new Dao();
		$dao->ModificarAjax("consulta_item", $datos, "id=" . $_POST['Consulta'], $_POST['Consulta']);
	}
	if ($_POST['Requerimiento'] == "ActualizarEstadoConsultaLab") {


		$datos = array($_POST["Tipo"] => $_POST["Estado"]);
		$dao = new Dao();
		$dao->ModificarAjax("consulta", $datos, "id=" . $_POST['Consulta'], $_POST['Consulta']);
	}

	if ($_POST['Requerimiento'] == "ActualizarEstadoConsultaOrden") {
		$datos = array($_POST["Tipo"] => $_POST["Estado"]);
		$dao = new Dao();
		$dao->ModificarAjax("consulta", $datos, "id=" . $_POST['Consulta'], $_POST['Consulta']);
	}
	if ($_POST['Requerimiento'] == "ActualizarEstadoOrden") {
		$datos = array($_POST["Tipo"] => $_POST["Estado"]);
		$dao = new Dao();
		$dao->ModificarAjax("orden_item", $datos, "id_orden=" . $_POST['Orden'] . " AND " . $_POST["Campo"] . " = " . $_POST["Id"], $_POST['Orden']);
	}

	if ($_POST['Requerimiento'] == "CargarVentasConsulta") {


		$dao = new Dao();

		$sql = ' SELECT *
				FROM (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 1 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) e,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 2 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) f,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 3 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) m,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 4 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) a,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 5 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) my,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 6 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) j,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 7 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ju,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 8 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ag,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 9 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) s,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 10 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) o,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 11 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) n,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 12 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) d ';

		$dao->ConsultarSqlNativoAjax($sql);
	}

	if ($_POST['Requerimiento'] == "CargarVentasFactura") {


		$dao = new Dao();

		$sql = ' SELECT *
				FROM (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 1 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) e,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 2 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) f,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 3 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) m,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 4 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) a,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 5 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) my,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 6 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) j,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 7 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ju,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 8 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ag,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 9 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) s,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 10 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) o,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 11 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) n,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 12 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) d ';

		$dao->ConsultarSqlNativoAjax($sql);
	}

	if ($_POST['Requerimiento'] == "CargarItemsConsulta") {


		$dao = new Dao();

		$dao->Campo("c.id", "");
		$dao->Campo("p.nombre", "");


		$dao->TablasInnerAlias("consulta_item", "c", "procedimiento", "p");

		$dao->Where("c.id_consulta", $_POST['Consulta'], "and");
		$dao->Where("c.id_empleado", $_SESSION['id_empleado'], "AND");
		//$dao->Where("convert(fecha_atencion,date)","CURDATE()","AND");
		$dao->Diferente("c.id_estado", "19", "");


		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "ObtenerReferido") {


		$dao = new Dao();

		$dao->Campo("r.apellidos", "");
		$dao->Campo("r.nombre", "");


		$dao->TablasInnerAlias("consulta", "c", "referencia", "r");

		$dao->Where("c.id", $_POST['Consulta'], "");


		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "LlenarTablaFacturasConFechasSri") {

		$dao = new Dao();

		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.nombre) paciente", "");
		$dao->Campo("c.id_paciente_cliente", "");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')", "");
		$dao->Campo("c.total", "");
		$dao->Campo("c.id_estado", "");
		$dao->Campo("c.autorizada", "");
		$dao->Campo("c.clave_sri", "");
		$dao->Campo("c.mensaje_sri", "");
		$dao->Campo("c.id", "");

		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");
		if (isset($_POST['Estado'])) {
			if ($_POST['Estado'] != "T") {
				if ($_POST['Estado'] != "A") {
					$dao->In_Where("c.id_estado", "1,9,13,19", "and");
					$dao->Where("c.autorizada", '"' . $_POST['Estado'] . '"', "and");
				} else {
					$dao->Where("c.id_estado", "21", "and");
				}
			}
		}

		if (isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])) {
			$dao->Entre("CONVERT(c.fecha_registro,DATE)", '"' . $_POST['FechaDesde'] . '"', '"' . $_POST['FechaHasta'] . '"', "and");
		} else {
			$dao->Where("CONVERT(c.fecha_registro,DATE)", '"' . date("Y-m-d") . '"', "and");
		}

		$apellidosBuscar = "";

		if (isset($_POST['columns'][0]["search"]["value"])) {
			if (trim($_POST['columns'][0]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("c.numero", $_POST['columns'][0]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("CONCAT(p.apellido,' ',p.nombre)", $_POST['columns'][1]["search"]["value"], "and");
				//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}

		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("c.id_paciente_cliente", $_POST['columns'][2]["search"]["value"], "");
				//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("c.fecha_registro");


		$respuesta = $dao->Consultar();

		$data = array();

		function array_sort_by($arrIni, $col, $order = SORT_ASC)
		{
			$arrAux = array();
			foreach ($arrIni as $key => $row) {
				$arrAux[$key] = is_object($row) ? $arrAux[$key] = $row->$col : $row[$col];
				$arrAux[$key] = strtolower($arrAux[$key]);
			}
			array_multisort($arrAux, $order, $arrIni);
		}


		array_sort_by($respuesta, 'numero', $order = SORT_ASC);

		$nombreCliente = '';
		$total = 0;
		foreach ($respuesta as $row => $item) {
			$total++;
			$sub_array = array();
			$accion = '';
			if ($item[6] != 'D' && $item[5] != 21) {
				$accion = '<input type="checkbox" id="' . $item[9] . '">';
			}
			/*if($item[8]=='CLAVE ACCESO REGISTRADA'){
				$accion = '<input type="checkbox" id="'.$item[9].'">';
			}*/

			$sub_array[] = $accion;
			$sub_array[] = $item[0];
			$sub_array[] = $item[3];


			$dao2 = new Dao();

			if ($item[2] == null) {
				$sub_array[] = $item[1];
			} else {
				$dao2->Campo("CONCAT(apellido,' ',nombre) paciente", "");
				$dao2->Tabla("paciente_cliente", "");
				$dao2->Where("id", $item[2], "");

				$respuesta2 = $dao2->Consultar();
				foreach ($respuesta2 as $row => $item1) {
					$nombreCliente = $item1[0];
				}
				$sub_array[] = $nombreCliente;
			}
			$sub_array[] = $item[1];

			$sub_array[] = $item[4];
			$boton = '';
			if ($item[6] == 'N') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-warning col-md-12 nopadding">No Autorizada</button>';
			}
			if ($item[6] == 'D') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Devuelta</button>';
			}
			if ($item[6] == 'S') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-success col-md-12 nopadding">Autorizada</button>';
			}
			if ($item[5] == 21) {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Anulada</button>';
			}
			$sub_array[] = $boton;
			$sub_array[] = $item[7];
			$sub_array[] = $item[8];

			$data[] = $sub_array;
		}

		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $total,
			"recordsFiltered" => $total,
			"data"           => $data
		);
		echo json_encode($output);
	}

	if ($_POST['Requerimiento'] == "EnviarFacturasQuickCont") {
		if ($_SESSION["QUICKCONT_INTEGRADO A QUICKCONT"] == "SI") {
			session_write_close();
			$obj = new Con_QuickCont();
			$obj->EnviarFacturasConsulta();
		}
	}

	////////////////////////////////////// /NOTA DE CREDITO ////////////////////////////////////	

	if ($_POST['Requerimiento'] == "LlenarTablaFacturasConFechasNC") {

		$dao = new Dao();

		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.nombre) paciente", "");
		$dao->Campo("c.id_paciente_cliente", "");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')", "");
		$dao->Campo("c.total", "");
		$dao->Campo("c.id_estado", "");
		$dao->Campo("c.autorizada", "");
		$dao->Campo("c.clave_sri", "");
		$dao->Campo("c.mensaje_sri", "");
		$dao->Campo("c.id", "");

		$dao->TablasInnerAlias("nc_consulta", "c", "paciente", "p");
		$dao->In_Where("c.id_estado", "1,9,13,19", "and");
		if ($_POST['Estado'] != "T") {
			$dao->Where("c.autorizada", '"' . $_POST['Estado'] . '"', "and");
		}

		if (isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])) {
			$dao->Entre("CONVERT(c.fecha_registro,DATE)", '"' . $_POST['FechaDesde'] . '"', '"' . $_POST['FechaHasta'] . '"', "and");
		} else {
			$dao->Where("CONVERT(c.fecha_registro,DATE)", 'CURDATE()', "and");
		}

		$apellidosBuscar = "";

		if (isset($_POST['columns'][0]["search"]["value"])) {
			if (trim($_POST['columns'][0]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("c.numero", $_POST['columns'][0]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("CONCAT(p.apellido,' ',p.nombre)", $_POST['columns'][1]["search"]["value"], "and");
				//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}

		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("c.id_paciente_cliente", $_POST['columns'][2]["search"]["value"], "");
				//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("c.fecha_registro");


		$respuesta = $dao->Consultar();

		$data = array();



		$nombreCliente = '';
		$total = 0;
		foreach ($respuesta as $row => $item) {
			$total++;
			$sub_array = array();
			$accion = '';
			if ($item[6] != 'D' && $item[5] != 21) {
				$accion = '<input type="checkbox" id="' . $item[9] . '">';
			}
			/*if($item[8]=='CLAVE ACCESO REGISTRADA'){
				$accion = '<input type="checkbox" id="'.$item[9].'">';
			}*/

			$sub_array[] = $accion;
			$sub_array[] = $item[0];
			$sub_array[] = $item[3];


			$dao2 = new Dao();

			if ($item[2] == null) {
				$sub_array[] = $item[1];
			} else {
				$dao2->Campo("CONCAT(apellido,' ',nombre) paciente", "");
				$dao2->Tabla("paciente_cliente", "");
				$dao2->Where("id", $item[2], "");

				$respuesta2 = $dao2->Consultar();
				foreach ($respuesta2 as $row => $item1) {
					$nombreCliente = $item1[0];
				}
				$sub_array[] = $nombreCliente;
			}
			$sub_array[] = $item[1];

			$sub_array[] = $item[4];
			$boton = '';
			if ($item[6] == 'N') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-warning col-md-12 nopadding">No Autorizada</button>';
			}
			if ($item[6] == 'D') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Devuelta</button>';
			}
			if ($item[6] == 'S') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-success col-md-12 nopadding">Autorizada</button>';
			}
			if ($item[5] == 21) {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Anulada</button>';
			}
			$sub_array[] = $boton;
			$sub_array[] = $item[7];
			$sub_array[] = $item[8];

			$data[] = $sub_array;
		}

		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $total,
			"recordsFiltered" => $total,
			"data"           => $data
		);
		echo json_encode($output);
	}

	/********************************************************************************************************************/

	if ($_POST['Requerimiento'] == "LlenarTablaVentasEspecialidad") {

		$dao = new Dao();

		$dao->Campo("t.nombre", "");
		$dao->Campo("e.nombre", "");
		$dao->Campo("COUNT(*)", "");
		$dao->Campo("SUM(c.total)", "");


		$dao->TablasInnerAlias("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "p");
		$dao->TablasInnerAlias("procedimiento", "p", "especialidad", "e");
		$dao->TablasInnerAlias("especialidad", "e", "tipo_servicio", "t");

		//$dao->In_Where("c.id_estado","1,9,13,19,21","and");

		$fechaD = $_POST["FechaDesde"];
		$fechaF = $_POST["FechaHasta"];

		if (isset($_POST['columns'][1]["search"]["value"])) {
			if ($_POST['columns'][1]["search"]["value"] != '') {
				$fechaD = $_POST['columns'][1]["search"]["value"];
				$fechaF = $_POST['columns'][2]["search"]["value"];
			}
		}

		$dao->Entre("CONVERT(c.fecha_registro,DATE)", '"' . $fechaD . '"', '"' . $fechaF . '"', "");




		$dao->Agrupar("e.nombre");

		if ($_POST["length"] != -1) {
			//$dao->Limite($_POST['start'].",".$_POST['length']);  
		}
		$data = array();
		$total = 0;
		$dao->Ordenar("t.nombre");


		$respuesta = $dao->Consultar();


		foreach ($respuesta as $row => $item) {
			$total++;
			$data[] = $item;
		}


		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $total,
			"recordsFiltered" => $total,
			"data"           => $data
		);
		echo json_encode($output);
	}

	if ($_POST['Requerimiento'] == "HabilitarConsulta") {


		$datos = array("nc" => 1);
		$dao = new Dao();
		$dao->ModificarAjax("consulta", $datos, "id IN(" . substr(trim($_POST['Id']), 0, -1) . ")", 0);
	}

	if ($_POST['Requerimiento'] == "HabilitarConsultaModificar") {


		$datos = array("nc" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("consulta", $datos, "id IN(" . substr(trim($_POST['Id']), 0, -1) . ")", 0);
	}

	if ($_POST['Requerimiento'] == "CargarFechasConsultas") {


		$dao = new Dao();

		$sql = ' SELECT c.id,Convert(ci.fecha_atencion,date) fecha
				FROM consulta c INNER JOIN consulta_item ci ON(ci.id_consulta = c.id)
				INNER JOIN procedimiento p ON (p.id=ci.id_procedimiento)
				INNER JOIN especialidad e ON (p.id_especialidad = e.id)
				WHERE e.id in(62,63,67,68)  AND c.id_paciente = ' . $_POST['Paciente'] . '
				GROUP BY c.id order by c.id desc ';

		$dao->ConsultarSqlNativoAjax($sql);
	}

	if ($_POST['Requerimiento'] == "CargarConsultasPendientes") {
		$dao = new Dao();

		$dao->Campo("Convert(ci.fecha_atencion,date)", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
		$dao->Campo("CONCAT(em.apellidos,' ',em.nombres) doctor", "");

		if ($_POST["Especialidad"] == 0) {
			$dao->Campo("CONCAT(e.nombre,'--',pr.nombre)", "");
		} else {
			$dao->Campo("pr.nombre", "");
		}

		$dao->Campo("ci.precio", "");
		$dao->Campo("p.telefono", "");
		$dao->Campo("p.direccion", "");
		$dao->Campo("ci.turno", "");
		$dao->Campo("c.numero", "");
		$dao->Campo("ci.id_estado", "");
		$dao->Campo("c.id_estado", "");

		$dao->Campo("c.id_estado_lab", "");
		$dao->Campo("c.id_estado_rx", "");
		$dao->Campo("c.id_estado_eco", "");
		$dao->Campo("c.id_estado_tomo", "");
		$dao->Campo("ci.id_procedimiento", "");

		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");
		$dao->TablasInnerAliasOtra("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta_item", "ci", "empleado", "em");
		if ($_POST["Servicio"] < 4) {
			$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "pr");
			$dao->TablasInnerAlias("procedimiento", "pr", "especialidad", "e");
		}
		if ($_POST["Servicio"] == 4) {
			$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento_laboratorio", "pr");
			$dao->TablasInnerAlias("procedimiento_laboratorio", "pr", "grupo_examen", "e");
		}
		if ($_POST["Servicio"] == 5) {
			$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento_rx", "pr");
			$dao->TablasInnerAlias("procedimiento_rx", "pr", "grupo_rx", "e");
		}
		if ($_POST["Servicio"] == 6) {
			$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento_eco", "pr");
			$dao->TablasInnerAlias("procedimiento_eco", "pr", "grupo_eco", "e");
		}
		if ($_POST["Servicio"] == 7) {
			$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento_tomo", "pr");
			$dao->TablasInnerAlias("procedimiento_tomo", "pr", "grupo_tomo", "e");
		}
		$dao->In_Diferente("c.id_estado", "21", "and");


		if ($_POST["Medico"] != 0) {
			$dao->Where("em.id", $_POST["Medico"], "and");
		}

		if ($_POST["Especialidad"] != 0) {
			$dao->Where("e.id", $_POST["Especialidad"], "and");
		}

		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)", '"' . $_POST['FechaDesde'] . '"', '"' . $_POST['FechaHasta'] . '"', "and");
		if ($_POST["Servicio"] == 1) {
			$dao->Where("e.id_tipo_servicio", "1", "and");
		}
		if ($_POST["Servicio"] == 2) {
			$dao->Where("e.id_tipo_servicio", "13", "and");
		}
		if ($_POST["Servicio"] == 3) {
			$dao->Where("e.id_tipo_servicio", "14", "and");
		}
		$dao->Where("1", "1", "");
		$dao->Ordenar("1,8");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarReporteLabJs") {

		$dao = new Dao();


		$dao->Campo("Convert(ci.fecha_atencion,date)", "");
		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
		$dao->Campo("TIMESTAMPDIFF(YEAR,p.fecha_nacimiento,CURDATE())", "");
		$dao->Campo("pr.nombre", "");


		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");
		$dao->TablasInnerAliasOtra("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento_laboratorio", "pr");
		$dao->TablasInnerAlias("procedimiento_laboratorio", "pr", "grupo_examen", "e");

		$dao->In_Diferente("c.id_estado", "21", "and");


		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("Concat(c.numero,' ',p.apellido,' ',p.apellido_materno,' ',p.nombre)", $_POST["search"]["value"], "and");
			}
		}
		if (trim($_POST['columns'][1]["search"]["value"]) == "") {
			$dao->Where("CONVERT(ci.fecha_atencion,DATE)", 'CURDATE()', "");
		} else {

			$dao->Entre("CONVERT(ci.fecha_atencion,DATE)", "'" . $_POST['columns'][1]["search"]["value"] . "'", "'" . $_POST['columns'][2]["search"]["value"] . "'", "");
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}
		$dao->Ordenar("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre)");

		$respuesta = $dao->Consultar();

		$data = array();

		$totalFilter = 0;

		foreach ($respuesta as $row => $item) {
			$totalFilter++;
			$data[] = $item;
		}

		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $totalFilter,
			"recordsFiltered" => $totalFilter,
			"data"           => $data
		);
		echo json_encode($output);
	}

	if ($_POST['Requerimiento'] == "CargarVentasFecha") {

		if ($_POST['Tipo'] == "1") {
			$dao = new Dao();

			$dao->Campo("Convert(c.fecha_registro,date)", "");
			$dao->Campo("c.numero", "");
			$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
			$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente", "");
			$dao->Campo("c.total", "");



			$dao->TablasInnerAlias("consulta", "c", "paciente", "p");
			$dao->TablasInnerAlias("consulta", "c", "paciente_cliente", "pc");


			$dao->In_Diferente("c.id_estado", "21", "and");
			$dao->Entre("CONVERT(c.fecha_registro,DATE)", '"' . $_POST['FechaDesde'] . '"', '"' . $_POST['FechaHasta'] . '"', "");




			$dao->ConsultarAjax();
		}

		if ($_POST['Tipo'] == "2") {

			$dao = new Dao();

			$dao->Campo("Convert(c.fecha_registro,date)", "");
			$dao->Campo("c.numero", "");
			$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
			$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente", "");
			$dao->Campo("(c.total-c.total_iva)", "");
			$dao->Campo("c.total_iva", "");
			$dao->Campo("c.total", "");
			$dao->Campo("c.id", "");



			$dao->TablasInnerAlias("farmacia", "c", "paciente", "p");
			$dao->TablasInnerAlias("farmacia", "c", "paciente_cliente", "pc");


			$dao->In_Diferente("c.id_estado", "21", "and");
			$dao->Entre("CONVERT(c.fecha_registro,DATE)", '"' . $_POST['FechaDesde'] . '"', '"' . $_POST['FechaHasta'] . '"', "");




			$dao->ConsultarAjax();
		}

		if ($_POST['Tipo'] == "3") {

			$dao = new Dao();

			$dao->Campo("Convert(c.fecha_registro,date)", "");
			$dao->Campo("c.numero", "");
			$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
			$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente", "");
			$dao->Campo("c.total", "");



			$dao->TablasInnerAlias("consulta", "c", "paciente", "p");
			$dao->TablasInnerAlias("consulta", "c", "paciente_cliente", "pc");


			$dao->In_Diferente("c.id_estado", "21", "and");
			$dao->Entre("CONVERT(c.fecha_registro,DATE)", '"' . $_POST['FechaDesde'] . '"', '"' . $_POST['FechaHasta'] . '"', "");
			$respuesta1 = $dao->Consultar();

			$dao = new Dao();

			$dao->Campo("Convert(c.fecha_registro,date)", "");
			$dao->Campo("c.numero", "");
			$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
			$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente", "");
			$dao->Campo("c.total", "");



			$dao->TablasInnerAlias("farmacia", "c", "paciente", "p");
			$dao->TablasInnerAlias("farmacia", "c", "paciente_cliente", "pc");


			$dao->In_Diferente("c.id_estado", "21", "and");
			$dao->Entre("CONVERT(c.fecha_registro,DATE)", '"' . $_POST['FechaDesde'] . '"', '"' . $_POST['FechaHasta'] . '"', "");




			$respuesta2 = $dao->Consultar();

			$resultado = array_merge($respuesta1, $respuesta2);

			echo json_encode($resultado, true);
		}
	}

	if ($_POST['Requerimiento'] == "CargarDetalle") {

		$dao = new Dao();

		$dao->Campo("i.nombre", "");
		$dao->Campo("c.presentacion", "");
		$dao->Campo("c.cantidad", "");
		$dao->Campo("c.precio", "");
		$dao->Campo("i.iva", "");



		$dao->TablasInnerAlias("farmacia_item", "c", "inventario", "i");


		$dao->Where("c.id_farmacia", $_POST['Id'], "");
		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarReporteMorbilidad") {

		$dao = new Dao();

		$dao->Contar();
		$dao->Sumar("d.actividades", "");

		$dao->TablasInnerAlias("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "pro");
		$dao->TablasInnerAlias("procedimiento", "pro", "especialidad", "e");
		$dao->TablasInnerAliasOtra("diagnostico", "d", "consulta_item", "ci");
		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");

		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)", '"' . $_POST['FechaD'] . '"', '"' . $_POST['FechaH'] . '"', "and");

		if (isset($_POST["Cie"])) {
			$dao->In_Where("d.id_cie", $_POST['Cie'], "and");
		}

		if ($_POST['Genero'] != "0") {
			$dao->Where("p.id_genero2", $_POST['Genero'], "and");
		}

		if ($_POST['Tipo'] != "0") {
			$dao->Where("e.id_tipo_servicio", $_POST['Tipo'], "and");
		}
		if ($_POST['Grupo'] != "0") {
			$dao->Where("e.id_grupo_estadistico", $_POST['Grupo'], "and");
		}
		if ($_POST['Especialidad'] != "0") {
			$dao->Where("pro.id_especialidad", $_POST['Especialidad'], "and");
		}
		if ($_POST['ClaseDiagnostico'] != "0") {
			$dao->Where("d.tiempo", '"' . $_POST['ClaseDiagnostico'] . '"', "and");
		}
		if ($_POST['Diagnostico'] != "0") {
			$dao->Where("d.tipo", '"' . $_POST['Diagnostico'] . '"', "and");
		}
		if ($_POST['Min'] != -1) {
			$dao->Entre("TIMESTAMPDIFF(MONTH,p.fecha_nacimiento,CURDATE())", $_POST['Min'], $_POST['Max'], "and");
		}
		$dao->Where("ci.id_estado", "19", "");
		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarReporteOdontologiaProcedimientos") {

		$dao = new Dao();

		$dao->Campo("d.procedimiento", "");
		$dao->Contar();

		$dao->TablasInnerAlias("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "pro");
		$dao->TablasInnerAlias("procedimiento", "pro", "especialidad", "e");
		$dao->TablasInnerAliasOtra("diagnostico", "d", "consulta_item", "ci");
		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");


		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)", '"' . $_POST['FechaD'] . '"', '"' . $_POST['FechaH'] . '"', "and");
		$dao->Where("e.id_tipo_servicio", "13", "and");
		if ($_POST['Especialidad'] != "0") {
			$dao->Where("pro.id_especialidad", $_POST['Especialidad'], "and");
		}
		if ($_POST['ClaseDiagnostico'] != "0") {
			$dao->Where("d.tiempo", '"' . $_POST['ClaseDiagnostico'] . '"', "and");
		}
		if ($_POST['Diagnostico'] != "0") {
			$dao->Where("d.tipo", '"' . $_POST['Diagnostico'] . '"', "and");
		}
		if ($_POST['Actividades'] != "0") {
			$dao->Where("d.procedimiento", '"' . $_POST['Actividades'] . '"', "and");
		}
		if ($_POST['Min'] != -1) {
			$dao->Entre("TIMESTAMPDIFF(MONTH,p.fecha_nacimiento,CURDATE())", $_POST['Min'], $_POST['Max'], "and");
		}
		$dao->Where("ci.id_estado", "19", "");
		$dao->Agrupar("d.procedimiento");

		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CargarReporteOdontologiEdad") {

		$dao = new Dao();

		$dao->Contar();
		$dao->Sumar("d.actividades", "");

		$dao->TablasInnerAlias("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "pro");
		$dao->TablasInnerAlias("procedimiento", "pro", "especialidad", "e");
		$dao->TablasInnerAliasOtra("diagnostico", "d", "consulta_item", "ci");
		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");

		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)", '"' . $_POST['FechaD'] . '"', '"' . $_POST['FechaH'] . '"', "and");



		if ($_POST['Tipo'] != "0") {
			$dao->Where("e.id_tipo_servicio", $_POST['Tipo'], "and");
		}
		if ($_POST['Grupo'] != "0") {
			$dao->Where("e.id_grupo_estadistico", $_POST['Grupo'], "and");
		}
		if ($_POST['Especialidad'] != "0") {
			$dao->Where("pro.id_especialidad", $_POST['Especialidad'], "and");
		}
		if ($_POST['ClaseDiagnostico'] != "0") {
			$dao->Where("d.tiempo", '"' . $_POST['ClaseDiagnostico'] . '"', "and");
		}
		if ($_POST['Diagnostico'] != "0") {
			$dao->Where("d.tipo", '"' . $_POST['Diagnostico'] . '"', "and");
		}
		if ($_POST['Min'] != -1) {
			$dao->Entre("TIMESTAMPDIFF(MONTH,p.fecha_nacimiento,CURDATE())", $_POST['Min'], $_POST['Max'], "and");
		}
		$dao->Where("ci.id_estado", "19", "");
		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CargarReportMetodosPrevencion") {

		$dao = new Dao();

		$dao->Campo("d.descripcion", "");
		$dao->Contar();

		$dao->TablasInnerAlias("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "pro");
		$dao->TablasInnerAlias("procedimiento", "pro", "especialidad", "e");
		$dao->TablasInnerAliasOtra("diagnostico", "d", "consulta_item", "ci");
		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");


		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)", '"' . $_POST['FechaD'] . '"', '"' . $_POST['FechaH'] . '"', "and");
		if ($_POST['Tipo'] != "0") {
			$dao->Where("e.id_tipo_servicio", $_POST['Tipo'], "and");
		}
		if ($_POST['Especialidad'] != "0") {
			$dao->Where("pro.id_especialidad", $_POST['Especialidad'], "and");
		}
		if ($_POST['ClaseDiagnostico'] != "0") {
			$dao->Where("d.tiempo", '"' . $_POST['ClaseDiagnostico'] . '"', "and");
		}
		if ($_POST['Diagnostico'] != "0") {
			$dao->Where("d.tipo", '"' . $_POST['Diagnostico'] . '"', "and");
		}
		if ($_POST['Actividades'] != "0") {
			$dao->Where("d.descripcion", '"' . $_POST['Actividades'] . '"', "and");
		}
		$dao->Entre("TIMESTAMPDIFF(MONTH,p.fecha_nacimiento,CURDATE())", $_POST['Min'], $_POST['Max'], "and");
		$dao->Where("ci.id_estado", "19", "");
		$dao->Agrupar("d.descripcion");

		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CargarReporteLabClinico") {

		$dao = new Dao();

		$dao->Campo("g.nombre", "");
		$dao->Contar();

		$dao->TablasInnerAlias("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento_laboratorio", "pro");
		$dao->TablasInnerAlias("procedimiento_laboratorio", "pro", "grupo_examen", "g");

		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)", '"' . $_POST['FechaD'] . '"', '"' . $_POST['FechaH'] . '"', "and");

		$dao->Where("ci.id_estado", "12", "");
		$dao->Agrupar("g.nombre");
		$dao->Ordenar("g.orden");

		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CargarReporteFisioterapia") {

		$dao = new Dao();

		$dao->Campo("d.procedimiento", "");
		$dao->Contar();

		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "pro");
		$dao->TablasInnerAliasOtra("diagnostico", "d", "consulta_item", "ci");
		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)", '"' . $_POST['FechaD'] . '"', '"' . $_POST['FechaH'] . '"', "and");
		$dao->Where("pro.id_especialidad", "60", "and");


		$dao->Where("ci.id_estado", "19", "");
		$dao->Agrupar("d.procedimiento");

		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CargarReporteOdontologiaOrdenes") {

		$dao = new Dao();


		$dao->Contar();

		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "pro");
		$dao->TablasInnerAliasOtra("diagnostico", "d", "consulta_item", "ci");
		$dao->TablasInnerAliasOtra("orden", "o", "consulta_item", "ci");
		$dao->TablasInnerAliasOtra("orden_item", "oi", "orden", "o");


		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)", '"' . $_POST['FechaD'] . '"', '"' . $_POST['FechaH'] . '"', "and");
		$dao->Where("pro.id_especialidad", $_POST['Especialidad'], "and");
		$dao->NO_NULL("oi.id_procedimiento_rx", "and");
		$dao->Where("d.tipo", '"' . $_POST['Diagnostico'] . '"', "");


		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarReporteEnfermedades") {

		$dao = new Dao();

		$dao->Campo("dc.codigo", "");
		$dao->Contar();
		$dao->Campo("dc.descripcion", "");

		$dao->TablasInnerAlias("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "pro");
		$dao->TablasInnerAliasOtra("diagnostico", "d", "consulta_item", "ci");
		$dao->TablasInnerAlias("procedimiento", "pro", "especialidad", "e");
		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");
		$dao->TablasInnerAlias("diagnostico", "d", "cie", "dc");

		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)", '"' . $_POST['FechaD'] . '"', '"' . $_POST['FechaH'] . '"', "and");


		if ($_POST['Genero'] != "0") {
			$dao->Where("p.id_genero2", $_POST['Genero'], "and");
		}
		if ($_POST['Tipo'] != "0") {
			$dao->Where("e.id_tipo_servicio", $_POST['Tipo'], "and");
		}
		if ($_POST['Grupo'] != "0") {
			$dao->Where("e.id_grupo_estadistico", $_POST['Grupo'], "and");
		}
		if ($_POST['Especialidad'] != "0") {
			$dao->Where("pro.id_especialidad", $_POST['Especialidad'], "and");
		}
		if ($_POST['Diagnostico'] != "0") {
			$dao->Where("d.tipo", '"' . $_POST['Diagnostico'] . '"', "AND");
		}

		if ($_POST['Min'] != -1) {
			$dao->Entre("TIMESTAMPDIFF(MONTH,p.fecha_nacimiento,CURDATE())", $_POST['Min'], $_POST['Max'], "and");
		}
		$dao->Where("ci.id_estado", "19", "");
		$dao->Agrupar("dc.id");
		$dao->Ordenar("2 desc");
		$dao->Limite($_POST['Frecuencia']);
		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "HabilitarDocumentos") {

		$datos = array("autorizada" => "N");

		$dao = new Dao();
		$dao->Modificar("consulta", $datos, "autorizada='D'", 0);

		$dao = new Dao();
		$dao->Modificar("farmacia", $datos, "autorizada='D'", 0);

		$dao = new Dao();
		$dao->Modificar("nc_consulta", $datos, "autorizada='D'", 0);

		$dao = new Dao();
		$dao->ModificarAjax("nc_farmacia", $datos, "autorizada='D'", 0);
	}

	if ($_POST['Requerimiento'] == "EliminarAtencion") {

		$datos = array("id_estado" => 7);

		$dao = new Dao();
		$dao->Eliminar("diagnostico", "id_consulta_item = " . $_POST["Item"], 0);

		$dao = new Dao();
		$dao->Eliminar("paciente_enfermedad", "id_consulta_item = " . $_POST["Item"], 0);

		$dao = new Dao();
		$dao->Eliminar("orden", "id_consulta_item = " . $_POST["Item"], 0);

		$dao = new Dao();
		$dao->Eliminar("paciente_odontograma", "id_consulta = " . $_POST["Consulta"], 0);

		$dao = new Dao();
		$dao->Eliminar("receta", "id_consulta_item = " . $_POST["Item"], 0);

		$dao = new Dao();
		$dao->Eliminar("signo", "id_consulta_item = " . $_POST["Item"], 0);

		$dao = new Dao();
		$dao->ModificarAjax("consulta_item", $datos, "id=" . $_POST["Item"], 0);
	}

	if ($_POST['Requerimiento'] == "LlenarTablaVentasEspecialidad2") {

		$dao = new Dao();

		$dao->Campo("t.nombre", "");
		$dao->Campo("e.nombre", "");
		$dao->Campo("COUNT(*)", "");
		$dao->Campo("SUM(ci.subtotal)", "");


		$dao->TablasInnerAlias("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "p");
		$dao->TablasInnerAlias("procedimiento", "p", "especialidad", "e");
		$dao->TablasInnerAlias("especialidad", "e", "tipo_servicio", "t");

		$dao->Diferente("c.id_estado", "21", "and");
		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("Concat(e.nombre,' ',t.nombre)", $_POST["search"]["value"], "and");
			}
		}
		if (trim($_POST['columns'][1]["search"]["value"]) == "") {
			$dao->Where("CONVERT(c.fecha_registro,DATE)", 'CURDATE()', "");
		} else {

			$dao->Entre("CONVERT(c.fecha_registro,DATE)", "'" . $_POST['columns'][1]["search"]["value"] . "'", "'" . $_POST['columns'][2]["search"]["value"] . "'", "");
		}

		$dao->Agrupar("e.id");

		if ($_POST["length"] != -1) {
			//$dao->Limite($_POST['start'].",".$_POST['length']);  
		}
		$data = array();
		$total = 0;
		$dao->Ordenar("e.nombre");


		$respuesta = $dao->Consultar();


		foreach ($respuesta as $row => $item) {
			$total++;
			$item[3] = number_format($item[3], 2, ".", ",");
			$data[] = $item;
		}


		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $total,
			"recordsFiltered" => $total,
			"data"           => $data
		);
		echo json_encode($output);
	}
	if ($_POST['Requerimiento'] == "CargarReporteLa2bJs") {

		$dao = new Dao();

		$dao->Campo("0", "secuencia");
		$dao->Campo("Convert(ci.fecha_atencion,date)", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
		$dao->Campo("pr.nombre", "");
		$dao->Sumar("ci.subtotal", "");

		$dao->Sumar(
			'CASE WHEN pr.pago = "PORCENTAJE" 
				          THEN ( ci.subtotal * (pr.valor_pago/100) )
				          ELSE pr.valor_pago END',
			""
		);

		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");
		$dao->TablasInnerAliasOtra("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento_laboratorio", "pr");

		$dao->In_Diferente("c.id_estado", "21", "and");
		$dao->In_Diferente("ci.id_estado", "25", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("Concat(c.numero,' ',p.apellido,' ',p.apellido_materno,' ',p.nombre)", $_POST["search"]["value"], "and");
			}
		}
		if (trim($_POST['columns'][1]["search"]["value"]) == "") {
			$dao->Where("CONVERT(ci.fecha_atencion,DATE)", 'CURDATE()', "");
		} else {

			$dao->Entre("CONVERT(ci.fecha_atencion,DATE)", "'" . $_POST['columns'][1]["search"]["value"] . "'", "'" . $_POST['columns'][2]["search"]["value"] . "'", "");
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}
		if (trim($_POST['columns'][3]["search"]["value"]) == "" || trim($_POST['columns'][3]["search"]["value"]) == "1") {
			$dao->Agrupar("c.id");
		} else {
			$dao->Agrupar("ci.id");
		}

		$dao->Ordenar("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre)");


		$respuesta = $dao->Consultar();

		$data = array();

		$totalFilter = 0;

		foreach ($respuesta as $row => $item) {
			$totalFilter++;
			$item[0] = $totalFilter;
			$item[4] = number_format($item[4], 2, '.', '');
			$item[5] = number_format($item[5], 2, '.', '');
			$item[6] = number_format($item[4] - $item[5], 2, '.', '');
			$data[] = $item;
		}

		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $totalFilter,
			"recordsFiltered" => $totalFilter,
			"data"           => $data
		);
		echo json_encode($output);
	}
	if ($_POST['Requerimiento'] == "CargarCieJs") {

		$dao = new Dao();
		$dao->Campo("id", "");
		$dao->Campo("CONCAT(codigo,' ',descripcion)", "nombre");
		$dao->Tabla("cie", "");
		$dao->Filtrar("CONCAT(codigo,' ',descripcion)", $_POST["q"], "and");
		$dao->In_Where("id_estado", "1", "");
		$dao->Ordenar("codigo");
		$dao->Limite("100");
		$dao->ConsultarAjax();
	}

	

	function ObtenerTarjeta($nombre)
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");

		$dao->Tabla("tarjeta", "");
		$dao->Where("nombre", "'" . $nombre . "'", "");

		$respuesta = $dao->Consultar();
		$jsondata = null;
		$confirma = false;
		foreach ($respuesta as $row => $item) {
			$jsondata = $item;
			$confirma = true;
		}
		if (!$confirma) {
			$datos = array(

				"nombre" => $nombre,
				"id_estado" => 1
			);

			$dao = new Dao();
			$respuesta = $dao->Guardar("tarjeta", $datos, false);

			$item = array();
			$item[] = $respuesta[1];
			$item[] = $nombre;
			$jsondata = $item;
		}
		return $jsondata;
	}

	if ($_POST['Requerimiento'] == "RealizarTransaccionPinPad") {

		$ipPinPad = Configuracion::IP_PINPAD;
		$puertoPinPad = Configuracion::PUERTO_PINPAD;
		$TimeOut = Configuracion::TIMEOUT;
		$CodigoComercio = Configuracion::CODIGO_COMERCIO;
		$NombrePinPad = Configuracion::NOMBRE_PINPAD;
		$CodigoCaja = $_SESSION["puntoEmision"];

		$nombreProceso = "ProcesoPago";

		$tipo = "1";
		$redAdquiriente = "1";
		$CodigoDiferido = "00";
		$Total = $_POST["Total"];
		$Base12 = "0";
		$Base0 = $_POST["Total"];
		$Iva = "0";

		$numero = ObtenerSecuencia();

		$nfc = $_SESSION["establecimiento"] . $_SESSION["puntoEmision"] . str_pad($numero[1],  9, "0", STR_PAD_LEFT);

		$Factura = $nfc;

		$parametros = $ipPinPad . " " .
			$puertoPinPad . " " .
			$TimeOut . " " .
			$CodigoComercio . " " .
			$NombrePinPad . " " .
			$CodigoCaja . " " .
			$nombreProceso . " " .
			$tipo . " " .
			$redAdquiriente . " " .
			$CodigoDiferido . " " .
			$Total . " " .
			$Base12 . " " .
			$Base0 . " " .
			$Iva . " " .
			$Factura;

		$respuestajava = shell_exec('java -jar "../java/pinpad.jar" ' . $parametros);
		Escribir($respuestajava);
		$jsondata = array();
		$jsondata[] = true;
		$respuestajava = substr($respuestajava, strpos($respuestajava, "{"));
		$respuestajava = json_decode($respuestajava, true);
		if (is_array($respuestajava)) {
			$tarjeta = ObtenerTarjeta($respuestajava["AplicacionEMV"]);
			$respuestajava["IdTarjeta"] = $tarjeta[0];
		}
		$jsondata[] = $respuestajava;
		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}

	if ($_POST['Requerimiento'] == "CargarTablaReferidosJS") {

		$dao = new Dao();

		$dao->Campo("convert(c.fecha_registro,date)", "");
		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre)", "");
		if ($_POST['columns'][3]["search"]["value"] != "-1") {
			$dao->Campo("CONCAT(r.apellidos,' ',r.nombre)", "");
		} else {
			$dao->Campo("'NINGUNO'", "");
		}

		$dao->Campo("c.total", "");


		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");
		if ($_POST['columns'][3]["search"]["value"] != "-1") {
			$dao->TablasInnerAlias("consulta", "c", "referencia", "r");
		} else {
			$dao->ES_NULL("c.id_referencia", "and");
		}

		$dao->Diferente("c.id_estado", "21", "and");
		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				if ($_POST['columns'][3]["search"]["value"] != "-1") {
					$dao->Filtrar("Concat(r.apellidos,' ',r.nombre)", $_POST["search"]["value"], "and");
				}
			}
		}
		if ($_POST['columns'][3]["search"]["value"] > 0) {
			$dao->Where("r.id", $_POST['columns'][3]["search"]["value"], "and");
		}
		if (trim($_POST['columns'][1]["search"]["value"]) == "") {
			$dao->Where("1", '2', "");
		} else {

			$dao->Entre("CONVERT(c.fecha_registro,DATE)", "'" . $_POST['columns'][1]["search"]["value"] . "'", "'" . $_POST['columns'][2]["search"]["value"] . "'", "");
		}

		$dao->Ordenar("1,4");

		$data = array();
		$total = 0;

		$respuesta = $dao->Consultar();


		foreach ($respuesta as $row => $item) {
			$total++;
			$item[4] = number_format($item[4], 2, ".", ",");
			$data[] = $item;
		}


		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $total,
			"recordsFiltered" => $total,
			"data"           => $data
		);
		echo json_encode($output);
	}
}
