<?php

session_start();
require_once "autoloadAjax.php";

if (isset($_POST['Requerimiento'])) {



	if ($_POST['Requerimiento'] == "GuardarPagoEfectivo") {

		$datos = array(
			"id_consulta" => $_POST["Consulta"],
			"tipo" => "EFECTIVO",
			"monto" => number_format($_POST["Monto"], 2, '.', ''),
			"id_estado" => 1
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoCheque") {

		$datos = array(
			"id_consulta" => $_POST["Consulta"],
			"tipo" => "CHEQUE",
			"monto_cheque" => number_format($_POST["Monto"], 2, '.', ''),
			"id_estado" => 1,
			"id_banco" => $_POST["Banco"],
			"numero_cheque" => $_POST["Numero"],
			"numero_cuenta" => $_POST["Cuenta"],
			"fecha_cobro_cheque" => $_POST["Fecha"],
			"referencia_cheque" => $_POST["Referencia"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}
	if ($_POST['Requerimiento'] == "GuardarPagoTransferencia") {

		$datos = array(
			"id_consulta" => $_POST["Consulta"],
			"tipo" => "TRANSFERENCIA",
			"monto_transferencia" => number_format($_POST["Monto"], 2, '.', ''),
			"id_estado" => 1,
			"id_banco" => $_POST["Banco"],
			"observacion_transferencia" => $_POST["Observaciones"],
			"fecha_transferencia" => $_POST["Fecha"],
			"agencia" => $_POST["Agencia"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}
	if ($_POST['Requerimiento'] == "GuardarPagoTarjeta") {

		$datos = array(
			"id_consulta" => $_POST["Consulta"],
			"tipo" => "TARJETA",
			"monto_tarjeta" => number_format($_POST["Monto"], 2, '.', ''),
			"id_estado" => 1,
			"tipo_tarjeta" => $_POST["TipoTarjeta"],
			"numero_voucher" => $_POST["NumeroVoucher"],
			"entidad_emisora_tarjeta" => $_POST["Entidad"],
			"fecha_vence_tarjeta" => $_POST["Fecha"],
			"numero_referencia_tarjeta" => $_POST["Numero"],
			"recargo_tarjeta" => $_POST["Recargo"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoCredito") {

		$datos = array(
			"id_consulta" => $_POST["Consulta"],
			"tipo" => "CREDITO",
			"monto_credito" => number_format($_POST["Monto"], 2, '.', ''),
			"id_estado" => 1,
			"periodo" => $_POST["Periodo"],
			"dividendo" => $_POST["Dividendo"],
			"fecha_primer_pago" => $_POST["Fecha"],
			"pago_credito" => $_POST["Numero"],
			"fecha_pago_credito" => $_POST["FechaPago"],
			"pago" => number_format($_POST["Pago"], 2, '.', ''),
			"saldo" => number_format($_POST["Pago"], 2, '.', ''),
			"pagado" => 0
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoAnticipo") {

		$datos = array(
			"id_consulta" => $_POST["Consulta"],
			"tipo" => "ANTICIPO",
			"monto_anticipo" => $_POST["MontoAnticipo"],
			"id_anticipo" => $_POST["Anticipo"],
			"id_estado" => 1
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoEfectivoFarmacia") {

		$datos = array(
			"id_farmacia" => $_POST["Consulta"],
			"tipo" => "EFECTIVO",
			"monto" => number_format($_POST["Monto"], 2, '.', ''),
			"id_estado" => 1
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoChequeFarmacia") {

		$datos = array(
			"id_farmacia" => $_POST["Consulta"],
			"tipo" => "CHEQUE",
			"monto_cheque" => number_format($_POST["Monto"], 2, '.', ''),
			"id_estado" => 1,
			"id_banco" => $_POST["Banco"],
			"numero_cheque" => $_POST["Numero"],
			"numero_cuenta" => $_POST["Cuenta"],
			"fecha_cobro_cheque" => $_POST["Fecha"],
			"referencia_cheque" => $_POST["Referencia"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoTransferenciaFarmacia") {

		$datos = array(
			"id_farmacia" => $_POST["Consulta"],
			"tipo" => "TRANSFERENCIA",
			"monto_transferencia" => number_format($_POST["Monto"], 2, '.', ''),
			"id_estado" => 1,
			"id_banco" => $_POST["Banco"],
			"observacion_transferencia" => $_POST["Observaciones"],
			"fecha_transferencia" => $_POST["Fecha"],
			"agencia" => $_POST["Agencia"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoTarjetaFarmacia") {

		$datos = array(
			"id_farmacia" => $_POST["Consulta"],
			"tipo" => "TARJETA",
			"monto_tarjeta" => number_format($_POST["Monto"], 2, '.', ''),
			"id_estado" => 1,
			"entidad_emisora_tarjeta" => $_POST["Entidad"],
			"fecha_vence_tarjeta" => $_POST["Fecha"],
			"numero_referencia_tarjeta" => $_POST["Numero"],
			"numero_voucher" => $_POST["NumeroVoucher"],
			"tipo_tarjeta" => $_POST["TipoTarjeta"],
			"recargo_tarjeta" => $_POST["Recargo"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoCreditoFarmacia") {

		$datos = array(
			"id_farmacia" => $_POST["Consulta"],
			"tipo" => "CREDITO",
			"monto_credito" => number_format($_POST["Monto"], 2, '.', ''),
			"id_estado" => 1,
			"periodo" => $_POST["Periodo"],
			"dividendo" => $_POST["Dividendo"],
			"fecha_primer_pago" => $_POST["Fecha"],
			"pago_credito" => $_POST["Numero"],
			"fecha_pago_credito" => $_POST["FechaPago"],
			"pago" => number_format($_POST["Pago"], 2, '.', ''),
			"saldo" => number_format($_POST["Pago"], 2, '.', ''),
			"pagado" => 0
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoAnticipoFarmacia") {

		$datos = array(
			"id_farmacia" => $_POST["Consulta"],
			"tipo" => "ANTICIPO",
			"monto_anticipo" => $_POST["MontoAnticipo"],
			"id_anticipo" => $_POST["Anticipo"],
			"id_estado" => 1
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago", $datos);
	}

	if ($_POST['Requerimiento'] == "ActualizarAnticipo") {
		$dao = new Dao();

		$dao->Campo("valor", "");

		$dao->Tabla("anticipo", "");
		$dao->Where("id", $_POST["Anticipo"], "");

		$respuesta = $dao->Consultar();
		$cantidadAntigua = 0;

		foreach ($respuesta as $row => $item) {
			$cantidadAntigua = $item[0];
		}

		$total = $cantidadAntigua - $_POST["Valor"];

		if ($total == 0) {
			$datos = array(
				"valor" => $total,
				"id_estado" => 20
			);

			$dao1 = new Dao();
			$dao1->ModificarAjax("anticipo", $datos, "id=" . $_POST['Anticipo'], $_POST['Anticipo']);
		} else {
			$datos = array(
				"valor" => $total,
				"id_estado" => 22
			);

			$dao1 = new Dao();
			$dao1->ModificarAjax("anticipo", $datos, "id=" . $_POST['Anticipo'], $_POST['Anticipo']);
		}
	}

	if ($_POST['Requerimiento'] == "ConsultarAnticipo") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("valor", "");
		$dao->Campo("fecha_registro", "");

		$dao->Tabla("anticipo", "");

		$dao->Where("id_paciente_cliente", $_POST['Id'], "and");
		$dao->Where("id_estado", 15, "");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "ConsultarUltimoRecibo") {

		$dao = new Dao();

		$dao->Campo("numero", "");

		$dao->Tabla("ic_caja", "");
		$dao->Where("id_punto_venta", $_SESSION['puntoVenta'], "");
		$dao->Ordenar("id DESC");
		$dao->Limite("1");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "GuardarPagoEfectivoCuenta") {

		$datos = array(
			"tipo" => "EFECTIVO",
			"monto" => $_POST["Monto"],
			"id_ic_caja" => $_POST["Ingreso"],
			"id_estado" => 1
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago_ingreso", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoChequeCuenta") {

		$datos = array(
			"tipo" => "CHEQUE",
			"monto_cheque" => $_POST["Monto"],
			"id_estado" => 1,
			"id_banco" => $_POST["Banco"],
			"numero_cheque" => $_POST["Numero"],
			"numero_cuenta" => $_POST["Cuenta"],
			"fecha_cobro_cheque" => $_POST["Fecha"],
			"id_ic_caja" => $_POST["Ingreso"],
			"referencia_cheque" => $_POST["Referencia"]
		);
		$dao = new Dao();
		$dao->GuardarAjax("forma_pago_ingreso", $datos);
	}
	if ($_POST['Requerimiento'] == "GuardarPagoTarjetaCuenta") {

		$datos = array(
			"tipo" => "TARJETA",
			"monto_tarjeta" => $_POST["Monto"],
			"id_estado" => 1,
			"entidad_emisora_tarjeta" => $_POST["Entidad"],
			"fecha_vence_tarjeta" => $_POST["Fecha"],
			"numero_referencia_tarjeta" => $_POST["Numero"],
			"id_ic_caja" => $_POST["Ingreso"],
			"recargo_tarjeta" => $_POST["Recargo"]
		);
		$dao = new Dao();
		$dao->GuardarAjax("forma_pago_ingreso", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoAnticipoCuenta") {

		$datos = array(
			"tipo" => "ANTICIPO",
			"monto_anticipo" => $_POST["MontoAnticipo"],
			"id_ic_caja" => $_POST["Ingreso"],
			"id_estado" => 1
		);
		$dao = new Dao();
		$dao->GuardarAjax("forma_pago_ingreso", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarPagoTransferenciaCuenta") {

		$datos = array(
			"id_ic_caja" => $_POST["Ingreso"],
			"tipo" => "TRANSFERENCIA",
			"monto_transferencia" => number_format($_POST["Monto"], 2, '.', ''),
			"id_estado" => 1,
			"id_banco" => $_POST["Banco"],
			"observacion_transferencia" => $_POST["Observaciones"],
			"fecha_transferencia" => $_POST["Fecha"],
			"agencia" => $_POST["Agencia"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("forma_pago_ingreso", $datos);
	}

	function ObtenerTotalFormaPago($tipo)
	{
		$dao = new Dao();

		if ($tipo == "EFECTIVO") {
			$dao->Sumar("fp.monto", "");
		}
		if ($tipo == "CHEQUE") {
			$dao->Sumar("fp.monto_cheque", "");
		}
		if ($tipo == "TRANSFERENCIA") {
			$dao->Sumar("fp.monto_transferencia", "");
		}
		if ($tipo == "TARJETA") {
			$dao->Sumar("fp.monto_tarjeta", "");
		}
		if ($tipo == "ANTICIPO") {
			$dao->Sumar("fp.monto_anticipo", "");
		}
		if ($tipo == "CREDITO") {
			$dao->Campo("fp.monto_credito", "");
		}

		$dao->TablasInnerAlias("forma_pago", "fp", "consulta", "f");
		$dao->Where("MONTH(CONVERT(f.fecha_registro,DATE))", $_POST['Mes'], "and");
		$dao->Where("YEAR(CONVERT(f.fecha_registro,DATE))", $_POST['Año'], "and");
		$dao->Where("fp.tipo", "'" . $tipo . "'", "");

		if ($tipo == "CREDITO") {
			$dao->Agrupar("fp.id_consulta");
		}

		$respuesta = $dao->Consultar();

		$total = 0;

		foreach ($respuesta as $row => $item) {
			$total = $total + $item[0];
		}

		$dao = new Dao();

		if ($tipo == "EFECTIVO") {
			$dao->Sumar("fp.monto", "");
		}
		if ($tipo == "CHEQUE") {
			$dao->Sumar("fp.monto_cheque", "");
		}
		if ($tipo == "TRANSFERENCIA") {
			$dao->Sumar("fp.monto_transferencia", "");
		}
		if ($tipo == "TARJETA") {
			$dao->Sumar("fp.monto_tarjeta", "");
		}
		if ($tipo == "ANTICIPO") {
			$dao->Sumar("fp.monto_anticipo", "");
		}
		if ($tipo == "CREDITO") {
			$dao->Campo("fp.monto_credito", "");
		}

		$dao->TablasInnerAlias("forma_pago", "fp", "farmacia", "f");
		$dao->Where("MONTH(CONVERT(f.fecha_registro,DATE))", $_POST['Mes'], "and");
		$dao->Where("YEAR(CONVERT(f.fecha_registro,DATE))", $_POST['Año'], "and");
		$dao->Where("fp.tipo", "'" . $tipo . "'", "");

		if ($tipo == "CREDITO") {
			$dao->Agrupar("fp.id_farmacia");
		}

		$respuesta = $dao->Consultar();


		foreach ($respuesta as $row => $item) {
			$total = $total + $item[0];
		}
		return number_format($total,2,".","");
	}

	if ($_POST['Requerimiento'] == "CargarTotalFormasPago") {
		$data = array();
		$data[] = ObtenerTotalFormaPago("EFECTIVO");
		$data[] = ObtenerTotalFormaPago("CHEQUE");
		$data[] = ObtenerTotalFormaPago("TRANSFERENCIA");
		$data[] = ObtenerTotalFormaPago("TARJETA");
		$data[] = ObtenerTotalFormaPago("CREDITO");
		$data[] = ObtenerTotalFormaPago("ANTICIPO");
		echo json_encode($data);
	}

	function ObtenerTotalVentas($tipo)
	{
		$dao = new Dao();

		$dao->Campo("f.total", "");

		$dao->TablasInnerAlias("forma_pago", "fp", $tipo, "f");
		$dao->Where("MONTH(CONVERT(f.fecha_registro,DATE))", $_POST['Mes'], "and");
		$dao->Where("YEAR(CONVERT(f.fecha_registro,DATE))", $_POST['Año'], "");
		$dao->Agrupar("fp.id_" . $tipo);
		$respuesta = $dao->Consultar();

		$total = 0;

		foreach ($respuesta as $row => $item) {
			$total = $total + $item[0];
		}
		return number_format($total,2,".","");
	}
	function ObtenerTotalNc($tipo)
	{
		$dao = new Dao();

		$dao->Sumar("f.total", "");

		$dao->Tabla($tipo, "f");
		$dao->Where("MONTH(CONVERT(f.fecha_registro,DATE))", $_POST['Mes'], "and");
		$dao->Where("YEAR(CONVERT(f.fecha_registro,DATE))", $_POST['Año'], "");

		$respuesta = $dao->Consultar();

		$total = 0;

		foreach ($respuesta as $row => $item) {
			$total = $total + $item[0];
		}
		return number_format($total,2,".","");
	}

	if ($_POST['Requerimiento'] == "CargarTotalVentas") {
		$data = array();
		$data[] = ObtenerTotalVentas("consulta");
		$data[] = ObtenerTotalVentas("farmacia");
		$data[] = ObtenerTotalNc("nc_consulta");
		$data[] = ObtenerTotalNc("nc_farmacia");

		echo json_encode($data);
	}
	if ($_POST['Requerimiento'] == "CargarVentasVoucherJS") {

		$dao = new Dao();

		$dao->Campo("'CONSULTA'", "tipofc");
		$dao->Campo("Convert(c.fecha_registro,date)", "fecha");
		$dao->Campo("fp.tipo_tarjeta", "");
		$dao->Campo("t.nombre", "");
		$dao->Campo("fp.numero_referencia_tarjeta", "");
		$dao->Campo("fp.numero_voucher", "");
		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.nombre)", "");
		$dao->Campo("fp.monto_tarjeta", "");

		$dao->TablasInnerAlias("forma_pago", "fp", "consulta", "c");
		$dao->TablasInnerAliasOnNativo("forma_pago", "fp", "tarjeta", "t","t.id=fp.entidad_emisora_tarjeta");
		$dao->TablasInnerAlias("consulta", "c", "paciente_cliente", "p");

		$dao->Diferente("c.id_estado", "21", "and");

		$dao->Filtrar("Concat(p.apellido,' ',p.nombre,' ',c.numero,' ',t.nombre)", $_POST["search"]["value"], "and");
		if (trim($_POST['columns'][1]["search"]["value"]) == "") {
			$dao->Where("1", '2', "");
		} else {

			$dao->Entre("CONVERT(c.fecha_registro,DATE)", "'" . $_POST['columns'][1]["search"]["value"] . "'", "'" . $_POST['columns'][2]["search"]["value"] . "'", "");
		}
	
		$dao->Ordenar("c.id desc");

		$respuesta1 = $dao->Consultar();

		$dao = new Dao();

		$dao->Campo("'FARMACIA'", "tipofc");
		$dao->Campo("Convert(c.fecha_registro,date)", "fecha");
		$dao->Campo("fp.tipo_tarjeta", "");
		$dao->Campo("t.nombre", "");
		$dao->Campo("fp.numero_referencia_tarjeta", "");
		$dao->Campo("fp.numero_voucher", "");
		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.nombre)", "");
		$dao->Campo("fp.monto_tarjeta", "");

		$dao->TablasInnerAlias("forma_pago", "fp", "farmacia", "c");
		$dao->TablasInnerAliasOnNativo("forma_pago", "fp", "tarjeta", "t","t.id=fp.entidad_emisora_tarjeta");
		$dao->TablasInnerAlias("farmacia", "c", "paciente_cliente", "p");

		$dao->Diferente("c.id_estado", "21", "and");

		$dao->Filtrar("Concat(p.apellido,' ',p.nombre,' ',c.numero,' ',t.nombre)", $_POST["search"]["value"], "and");

		if (trim($_POST['columns'][1]["search"]["value"]) == "") {
			$dao->Where("1", '2', "");
		} else {

			$dao->Entre("CONVERT(c.fecha_registro,DATE)", "'" . $_POST['columns'][1]["search"]["value"] . "'", "'" . $_POST['columns'][2]["search"]["value"] . "'", "");
		}

		$data = array();		
		$dao->Ordenar("c.id desc");

		$respuesta2 = $dao->Consultar();
		$respuesta = [];
		if($_POST['columns'][3]["search"]["value"]=="3"){
			$respuesta = array_merge($respuesta1,$respuesta2);
		}
		if($_POST['columns'][3]["search"]["value"]=="1"){
			$respuesta = $respuesta1;
		}
		if($_POST['columns'][3]["search"]["value"]=="2"){
			$respuesta = $respuesta2;
		}

		$total = 0;
		foreach ($respuesta as $row => $item) {
			$total++;
			$item[8] = number_format($item[8], 2, ".", ",");
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
	if ($_POST['Requerimiento'] == "CargarFormasPagosConsulta") {
		$dao = new Dao();

		$dao->Campo("fp.tipo", "");
		$dao->Campo("fp.monto", "");
		$dao->Campo("fp.monto_cheque", "");
		$dao->Campo("fp.monto_tarjeta", "");
		$dao->Campo("fp.monto_credito", "");
		$dao->Campo("fp.monto_anticipo", "");
		$dao->Campo("fp.monto_transferencia", "");
		$dao->Campo("fp.monto_tarjeta", "");

		$dao->TablasInnerAlias("forma_pago", "fp", "consulta", "c");
		$dao->Where("c.id", $_POST["Id"], "");
		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CargarFormasPagosFarmacia") {
		$dao = new Dao();

		$dao->Campo("fp.tipo", "");
		$dao->Campo("fp.monto", "");
		$dao->Campo("fp.monto_cheque", "");
		$dao->Campo("fp.monto_tarjeta", "");
		$dao->Campo("fp.monto_credito", "");
		$dao->Campo("fp.monto_anticipo", "");
		$dao->Campo("fp.monto_transferencia", "");
		$dao->Campo("fp.monto_tarjeta", "");

		$dao->TablasInnerAlias("forma_pago", "fp", "farmacia", "c");
		$dao->Where("c.id", $_POST["Id"], "");
		$dao->ConsultarAjax();
	}
}
