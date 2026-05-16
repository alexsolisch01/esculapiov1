<?php

session_start();
require_once "autoloadAjax.php";

if (isset($_POST['Requerimiento'])) {

	function ActualizarPrecioPorPVP($inventario,$preciocaja,$preciofraccion,$iva){
		if($_SESSION["HABILITARDESCUENTOPREDEFINIDO"]=="SI"){
			$dividir = $iva == "N" ? 1 : 1.12;
			$datos2 = array(
				"tipo_pvp" => "VALOR",
				"pvp1" => round($preciofraccion / $dividir, 2),
				"pvp2" => round($preciocaja / $dividir, 2)
			);
			$dao = new Dao();
			$dao->Modificar("inventario", $datos2, "id=" . $inventario,0);
		}
	}
	function RestarKardex($idInventario, $nivel, $cantidad, $totalEgreso, $concepto, $numero, $idMovimiento, $proveedor)
	{
		$dao = new Dao();

		$dao->Campo("ss_cantidad", "");
		$dao->Campo("ss_total", "");
		$dao->Campo("ss_precio", "");

		$dao->Tabla("kardex", "");
		$dao->Where("id_inventario", $idInventario, "");
		$dao->Ordenar("id desc");
		$dao->Limite("1");

		$respuesta = $dao->Consultar();
		$cantidadAntigua = 0;
		$total = 0.0;
		$nuevoCosto = 0.0;
		$costoAntiguo = 0.0;
		$jsondata = array();

		foreach ($respuesta as $row => $item) {
			$cantidadAntigua = $item[0];
			$total = $item[1];
			$costoAntiguo = $item[2];
		}

		if ($nivel == 2 || $nivel == "Dos") {

			/////////////////////////////////////////////////////////		
			$cantidadAntigua = $cantidadAntigua - $cantidad;
			$total = $total - $totalEgreso;

			if ($cantidadAntigua < 1) {
				$nuevoCosto = 0.0;
			} else {
				$nuevoCosto = $total / $cantidadAntigua;
			}


			$datos = array(
				"id_inventario" => $idInventario,
				"concepto" => $concepto,
				"numero" => $numero,
				"s_cantidad" => $cantidad,
				"s_precio" => $costoAntiguo,
				"s_total" => $totalEgreso,
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $nuevoCosto,
				"ss_total" => ($cantidadAntigua * $nuevoCosto)
			);

			if (isset($idMovimiento)) {
				$datos['id_movimiento_bodega'] = $idMovimiento;
			}
			if (isset($proveedor)) {
				if ($proveedor != "Seleccionar..") {
					$datos['proveedor'] = $proveedor;
				}
			}

			$dao = new Dao();
			$dao->Guardar("kardex", $datos);
		} else {

			$dao = new Dao();

			$dao->Campo("cantidad2", "");
			$dao->Campo("cantidad1", "");

			$dao->Tabla("inventario", "");
			$dao->Where("id", $idInventario, "");

			$respuesta = $dao->Consultar();

			$cantidad2 = 1;
			$cantidad1 = 0;
			foreach ($respuesta as $row => $item) {
				$cantidad2 = $item[0];
				$cantidad1 = $item[1];
			}
			/////////////////////////////////////////////////////////		
			$cantidadAntigua = $cantidadAntigua - ($cantidad * $cantidad2);
			$total = $total - (($cantidad * $cantidad2) * $costoAntiguo);

			if ($cantidadAntigua < 1) {
				$nuevoCosto = 0.0;
			} else {
				$nuevoCosto = $total / $cantidadAntigua;
			}


			$datos = array(
				"id_inventario" => $idInventario,
				"concepto" => $concepto,

				"numero" => $numero,
				"s_cantidad" => $cantidad * $cantidad2,
				"s_precio" => round($costoAntiguo, 2),
				"s_total" => round(($cantidad * $cantidad2) * $costoAntiguo, 2),
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => round($nuevoCosto, 2),
				"ss_total" => round($total, 2)
			);

			if (isset($idMovimiento)) {
				$datos['id_movimiento_bodega'] = $idMovimiento;
			}
			if (isset($proveedor)) {
				if ($proveedor != "Seleccionar..") {
					$datos['proveedor'] = $proveedor;
				}
			}

			$dao = new Dao();
			$dao->Guardar("kardex", $datos);
		}
	}
	function SumarKardex($idInventario, $nivel, $cantidad, $totalIngreso, $concepto, $numero, $idMovimiento, $proveedor)
	{
		$dao = new Dao();

		$dao->Campo("ss_cantidad", "");
		$dao->Campo("ss_total", "");

		$dao->Tabla("kardex", "");
		$dao->Where("id_inventario", $idInventario, "");
		$dao->Ordenar("id desc");
		$dao->Limite("1");

		$respuesta = $dao->Consultar();
		$cantidadAntigua = 0;
		$total = 0.0;
		$nuevoCosto = 0.0;
		$jsondata = array();

		foreach ($respuesta as $row => $item) {
			$cantidadAntigua = $item[0];
			$total = $item[1];
		}

		$dao = new Dao();

		$dao->Campo("utilidad1", "");
		$dao->Campo("utilidad2", "");
		$dao->Campo("iva", "");
		$dao->Campo("cantidad2", "");
		$dao->Campo("cantidad1", "");
		$dao->Campo("tipo_pvp", "");

		$dao->Tabla("inventario", "");
		$dao->Where("id", $idInventario, "");

		$respuesta = $dao->Consultar();

		$utilidad1 = 0.0;
		$utilidad2 = 0.0;
		$iva = "N";
		$cantidad2 = 1;
		$cantidad1 = 0;
		$tipoprecio = "";
		foreach ($respuesta as $row => $item) {
			$utilidad1 = $item[0];
			$utilidad2 = $item[1];
			$iva = $item[2];
			$cantidad2 = $item[3];
			$cantidad1 = $item[4];
			$tipoprecio = $item[5];
		}

		if ($nivel == 2 || $nivel == "Dos") {

			$cantidadAntigua = $cantidadAntigua + $cantidad;
			$total = $total + $totalIngreso;
			$nuevoCosto = $total / $cantidadAntigua;
			$costoIngreso = $totalIngreso / $cantidad;

			$datos = array(
				"id_inventario" => $idInventario,
				"concepto" => $concepto,
				"numero" => $numero,
				"e_cantidad" => $cantidad,
				"e_precio" => $costoIngreso,
				"e_total" => $totalIngreso,
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $nuevoCosto,
				"ss_total" => $total
			);

			if (isset($idMovimiento)) {
				$datos['id_movimiento_bodega'] = $idMovimiento;
			}
			if (isset($proveedor)) {
				if ($proveedor != "Seleccionar..") {
					$datos['proveedor'] = $proveedor;
				}
			}

			$pvpNuevo = (($nuevoCosto * $cantidad2) * ($utilidad2 / 100)) + ($nuevoCosto * $cantidad2);

			$pvpNuevo2 = ($nuevoCosto * ($utilidad1 / 100)) + $nuevoCosto;



			if (isset($totalIngreso)) {
				$datos2 = [];
				if ($tipoprecio == "PORCENTAJE") {
					$datos2 = array(
						"costo1" => ($nuevoCosto),
						"pvp1" => round($pvpNuevo2, 2),
						"pvp2" => round($pvpNuevo, 2)
					);
				}else{
					$datos2 = array("costo1" => $nuevoCosto);
				}

				$dao = new Dao();
				$dao->Modificar("inventario", $datos2, "id=" . $idInventario, $idInventario);

				$dao = new Dao();
				$dao->Guardar("kardex", $datos);
			}
		} else {

			$cantidadAntigua = $cantidadAntigua + ($cantidad * $cantidad2);

			$total = $total + $totalIngreso;
			$nuevoCosto = $total / $cantidadAntigua;
			$costoIngreso = $totalIngreso / $cantidad;

			$datos = array(
				"id_inventario" => $idInventario,
				"concepto" => $concepto,
				"numero" => $numero,
				"e_cantidad" => ($cantidad * $cantidad2),
				"e_precio" => ($costoIngreso / $cantidad2),
				"e_total" => $totalIngreso,
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $nuevoCosto,
				"ss_total" => $total
			);

			if (isset($idMovimiento)) {
				$datos['id_movimiento_bodega'] = $idMovimiento;
			}
			if (isset($proveedor)) {
				if ($proveedor != "Seleccionar..") {
					$datos['proveedor'] = $proveedor;
				}
			}

			$pvpNuevo = (($nuevoCosto * $cantidad2) * ($utilidad2 / 100)) + ($nuevoCosto * $cantidad2);
			$pvpNuevo2 = ($nuevoCosto * ($utilidad1 / 100)) + $nuevoCosto;

			if (isset($totalIngreso)) {

				$datos2 = [];
				if ($tipoprecio == "PORCENTAJE") {
					$datos2 = array(
						"costo1" => ($nuevoCosto),
						"pvp1" => round($pvpNuevo2, 2),
						"pvp2" => round($pvpNuevo, 2)
					);
				}else{
					$datos2 = array("costo1" => $nuevoCosto);
				}

				$dao = new Dao();
				$dao->Modificar("inventario", $datos2, "id=" . $idInventario, $idInventario);
			}


			$dao = new Dao();
			$dao->Guardar("kardex", $datos);
		}
	}
	function AumentarStock($idInventario, $nivel, $cantidad, $precio)
	{

		$dao = new Dao();

		$dao->Campo("cantidad1", "");
		$dao->Campo("cantidad2", "");
		$dao->Campo("fracciones_stock", "");
		$dao->Campo("iva", "");

		$dao->Tabla("inventario", "");
		$dao->Where("id", $idInventario, "");

		$respuesta = $dao->Consultar();
		$cantidadAntigua = 0;
		$fracciones = 0;
		$cantidad2 = 0;
		$cantidad1 = 0;
		$pvpf_caja = 0;
		$iva = "N";
		foreach ($respuesta as $row => $item) {
			$cantidadAntigua = $item[0];
			$cantidad1 = $item[0];
			$cantidad2 = $item[1];
			$fracciones = $item[2];
			$iva = $item[3];
		}
		if ($nivel == 1 || $nivel == "Uno") {
			$cantidadAntigua = $cantidadAntigua + $cantidad;
			if ($precio != "") {
				$pvpf_caja = $precio / $cantidad2;
			}
			$datos = array(
				"cantidad1" => $cantidadAntigua,
				"pvp_caja" => $precio,
				"pvpf_caja" => $pvpf_caja
			);

			$dao = new Dao();
			$dao->Modificar("inventario", $datos, "id=" . $idInventario, $idInventario);
			ActualizarPrecioPorPVP($idInventario,$precio,$pvpf_caja,$iva);
		}

		if ($nivel == 2 || $nivel == "Dos") {

			$cantidadAntigua = ($cantidad1 * $cantidad2) + $fracciones;
			$cantidadAntigua = $cantidadAntigua + $cantidad;

			$cantidadNueva = intval($cantidadAntigua / $cantidad2);
			$fracciones_stock = $cantidadAntigua - ($cantidadNueva * $cantidad2);

			$pvpf_caja = 0;
			if ($precio != "") {
				$pvpf_caja = $precio / $cantidad2;
			}

			$datos = array(
				"cantidad1" => $cantidadNueva,
				"fracciones_stock" => $fracciones_stock,
				"pvp_caja" => $precio,
				"pvpf_caja" => $pvpf_caja
			);

			$dao = new Dao();
			$dao->Modificar("inventario", $datos, "id=" . $idInventario, $idInventario);
			ActualizarPrecioPorPVP($idInventario,$precio,$pvpf_caja,$iva);
		}
	}
	function DisminuirStok($idInventario, $nivel, $cantidad)
	{

		$dao = new Dao();

		$dao->Campo("cantidad1", "");
		$dao->Campo("nombre", "");
		$dao->Campo("cantidad2", "");
		$dao->Campo("fracciones_stock", "");

		$dao->Tabla("inventario", "");
		$dao->Where("id", $idInventario, "");

		$respuesta = $dao->Consultar();
		$cantidadAntigua = 0;
		$nombre = "";
		$jsondata = array();
		$cantidad2 = 0;
		$fracciones = 0;
		foreach ($respuesta as $row => $item) {
			$cantidadAntigua = $item[0];
			$nombre = $item[1];
			$cantidad2 = $item[2];
			$fracciones = $item[3];
		}
		if ($nivel == 1 || $nivel == "Uno") {
			if ($cantidadAntigua < $cantidad) {
				$jsondata[] = false;
				$jsondata[] = $nombre . " NO CUENTA CON STOCK SUFICIENTE";
			} else {
				$cantidadAntigua = $cantidadAntigua - $cantidad;

				$datos = array("cantidad1" => $cantidadAntigua);

				$dao = new Dao();
				$dao->Modificar("inventario", $datos, "id=" . $idInventario, $idInventario);
			}
		} else {
			$totalFracciones = 0;
			if ($cantidad2 > 1) {
				$totalFracciones = ($cantidadAntigua * $cantidad2) + $fracciones;
			} else {
				$totalFracciones = $cantidadAntigua + $fracciones;
			}
			if ($totalFracciones < $cantidad) {
				$jsondata[] = false;
				$jsondata[] = $nombre . " NO CUENTA CON STOCK SUFICIENTE";
			} else {

				$cantidadAntigua = ($cantidadAntigua * $cantidad2) + $fracciones;
				$cantidadAntigua = $cantidadAntigua  - $cantidad;

				$cantidadNueva = intval($cantidadAntigua / $cantidad2);
				$fracciones_stock = $cantidadAntigua - ($cantidadNueva * $cantidad2);

				$datos = array(
					"cantidad1" => $cantidadNueva,
					"fracciones_stock" => $fracciones_stock
				);
				$dao = new Dao();
				$dao->Modificar("inventario", $datos, "id=" . $idInventario, $idInventario);
			}
		}
	}
	function GuardarDetalle($idMovimiento, $detalle, $tipo, $concepto, $numero, $proveedor)
	{
		$array = json_decode($detalle, true);
		$jsondata = array();
		$j = 0;
		for ($i = 0; $i < sizeof($array); $i++) {
			$producto = $array[$i];

			$datos = array(
				"id_inventario" => $producto[0],
				"id_movimiento_bodega" => $idMovimiento,
				"presentacion" => $producto[1],
				"cantidad" => $producto[2],
				"precio" => $producto[3],
				"precioCaja" => $producto[4],
				"subtotal" => $producto[5],
				"Descuento" => $producto[7],
				"total" => $producto[8]
			);
			$dao = new Dao();
			$respuesta = $dao->Guardar("movimiento_bodega_item", $datos);
			if (!$respuesta[0]) {
				$jsondata[$j] = "No se puedo guardar el producto " . $producto[1];
				$j++;
			} else {
				if ($tipo == "INGRESO") {
					AumentarStock($producto[0], $producto[9], $producto[2], $producto[4]);
					$total = $producto[8];
					if ($producto[6] == "S") {
						$total = $total / 1.12;
					}
					SumarKardex($producto[0], $producto[9], $producto[2], $total, $concepto, $numero, $idMovimiento, $proveedor);
				} else {
					DisminuirStok($producto[0], $producto[9], $producto[2]);
					$total = $producto[8];
					if ($producto[6] == "S") {
						$total = $total / 1.12;
					}
					RestarKardex($producto[0], $producto[9], $producto[2], $total, $concepto, $numero, $idMovimiento, $proveedor);
				}
			}
		}
		return $jsondata;
	}

	if ($_POST['Requerimiento'] == "GuardarMovimiento") {

		$datos = array(
			"tipo" => $_POST["Tipo"],
			"id_motivo" => $_POST["Id_motivo"],
			"id_proveedor" => $_POST["Id_proveedor"],
			"id_bodega" => $_POST["Id_bodega"],
			"numero" => $_POST["Numero"],
			"fecha" => $_POST["Fecha"],
			"observaciones" => $_POST["Observaciones"],
			"subtotal" => $_POST["Subtotal"],
			"iva" => $_POST["Iva"],
			"descuento" => $_POST["Descuento"],
			"total" => $_POST["Total"],
			"usuario_registro" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$respuesta = $dao->Guardar("movimiento_bodega", $datos);
		if ($respuesta[0]) {
			$errores = GuardarDetalle($respuesta[1], $_POST["Detalle"], $_POST["Tipo"], $_POST["Concepto"], $_POST["Numero"], $_POST["Id_proveedor"]);
			if (sizeof($errores) > 0) {
				echo json_encode($errores, JSON_FORCE_OBJECT);
			} else {
				echo json_encode($respuesta, JSON_FORCE_OBJECT);
			}
		} else {
			echo json_encode($respuesta, JSON_FORCE_OBJECT);
		}
	}

	if ($_POST['Requerimiento'] == "GuardarMovimientoDetalle") {

		$datos = array(
			"id_inventario" => $_POST["Inventario"],
			"id_movimiento_bodega" => $_POST["Movimiento"],
			"presentacion" => $_POST["Presentacion"],
			"cantidad" => $_POST["Cantidad"],
			"precio" => $_POST["Precio"],
			"precioCaja" => $_POST["PrecioCaja"],
			"subtotal" => $_POST["Subtotal"],
			"Descuento" => $_POST["Descuento"],
			"total" => $_POST["Total"]
		);
		$dao = new Dao();
		$dao->GuardarAjax("movimiento_bodega_item", $datos);
	}

	if ($_POST['Requerimiento'] == "LlenarTablaMovimientos") {

		$dao = new Dao();

		$dao->Campo("CASE WHEN id_motivo =22 THEN CONCAT('FC','-',numero) WHEN id_motivo =23 THEN CONCAT('NC','-',numero) ELSE numero END", "numero");
		$dao->Campo("p.descripcion", "");
		$dao->Campo("mb.tipo", "");
		$dao->Campo("Date_format(mb.fecha,'%Y-%m-%d')", "");
		$dao->Campo("mb.total", "");
		$dao->Campo("mb.id", "");

		$dao->TablasInnerAlias("movimiento_bodega", "mb", "proveedor", "p");
		$dao->Where("CONVERT(mb.fecha,DATE)", '"' . date("Y-m-d") . '"', "and");

		$apellidosBuscar = "";

		if (isset($_POST['columns'][0]["search"]["value"])) {
			if (trim($_POST['columns'][0]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("mb.numero", $_POST['columns'][0]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("p.descripcion", $_POST['columns'][1]["search"]["value"], "and");
				//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}

		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("mb.tipo", $_POST['columns'][2]["search"]["value"], "");
				//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		//$dao->Ordenar("apellido,nombre");  


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


		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];

			$data[] = $sub_array;
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("movimiento_bodega", "");

		$respuesta1 = $dao->Consultar();
		$total = 0;
		foreach ($respuesta1 as $row => $item) {
			$total = $item[0];
		}

		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $total,
			"recordsFiltered" => $total,
			"data"           => $data
		);
		echo json_encode($output);
	}

	if ($_POST['Requerimiento'] == "LlenarTablaMovimientosFechas") {

		$dao = new Dao();

		$dao->Campo("CASE WHEN id_motivo =22 THEN CONCAT('FC','-',numero) WHEN id_motivo =23 THEN CONCAT('NC','-',numero) ELSE numero END", "numero");
		$dao->Campo("p.descripcion", "");
		$dao->Campo("mb.tipo", "");
		$dao->Campo("Date_format(mb.fecha,'%Y-%m-%d')", "");
		$dao->Campo("mb.total", "");
		$dao->Campo("mb.id", "");

		$dao->TablasInnerAlias("movimiento_bodega", "mb", "proveedor", "p");
		if (isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])) {
			$dao->Entre("CONVERT(mb.fecha,DATE)", '"' . $_POST['FechaDesde'] . '"', '"' . $_POST['FechaHasta'] . '"', "and");
		} else {
			$dao->Where("CONVERT(mb.fecha,DATE)", '"' . date("Y-m-d") . '"', "and");
		}

		$apellidosBuscar = "";

		if (isset($_POST['columns'][0]["search"]["value"])) {
			if (trim($_POST['columns'][0]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->FiltrarIzquierda("mb.numero", $_POST['columns'][0]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("p.descripcion", $_POST['columns'][1]["search"]["value"], "and");
				//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}

		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("mb.tipo", $_POST['columns'][2]["search"]["value"], "");
				//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		//$dao->Ordenar("apellido,nombre");  


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


		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];

			$data[] = $sub_array;
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("movimiento_bodega", "");

		$respuesta1 = $dao->Consultar();
		$total = 0;
		foreach ($respuesta1 as $row => $item) {
			$total = $item[0];
		}

		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $total,
			"recordsFiltered" => $total,
			"data"           => $data
		);
		echo json_encode($output);
	}

	if ($_POST['Requerimiento'] == "CargarMovimientos") {

		$dao = new Dao();

		$dao->Campo("CASE WHEN id_motivo =22 THEN CONCAT('FC','-',numero) WHEN id_motivo =23 THEN CONCAT('NC','-',numero) ELSE numero END", "numero");
		$dao->Campo("p.descripcion", "");
		$dao->Campo("mb.tipo", "");
		$dao->Campo("Date_format(mb.fecha,'%Y-%m-%d')", "");
		$dao->Campo("mb.total", "");
		$dao->Campo("mb.id", "");

		$dao->TablasInnerAlias("movimiento_bodega", "mb", "proveedor", "p");
		$dao->Entre("CONVERT(mb.fecha,DATE)", '"' . $_POST['FechaDesde'] . '"', '"' . $_POST['FechaHasta'] . '"', "and");
		if (isset($_POST["Tipo"])) {
			if ($_POST["Tipo"] != "SELECCIONAR") {
				$dao->Where("mb.tipo", '"' . $_POST['Tipo'] . '"', "and");
			}
		}
		if (isset($_POST["Motivo"])) {
			if ($_POST["Motivo"] != 0) {
				$dao->Where("mb.id_motivo", $_POST['Motivo'], "and");
			}
		}
		$dao->Where("1", "1", "");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarSecuencia") {

		$dao = new Dao();
		$dao->Campo("p.id + 1", "");

		$dao->Tabla("movimiento_bodega", "p");
		$dao->Where("1", "1", "");
		$dao->Ordenar("p.id desc");

		$dao->ConsultarAjax();
	}
}
