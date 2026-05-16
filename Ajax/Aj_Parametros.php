<?php
session_start();

require_once "autoloadAjax.php";

if (isset($_POST['Requerimiento'])) {

	if ($_POST['Requerimiento'] == "CargarParametros") {
		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("parametro", "");
		$dao->Campo("descripcion", "");
		$dao->Campo("valor", "");
		$dao->Campo("usuario_modifico", "");
		$dao->Campo("fecha_modifico", "");

		$dao->Tabla("parametros", "");

		$respuesta = $dao->Consultar();

		$_SESSION["CHEQUES"] = "0";
		$_SESSION["TRANSFERENCIAS"] = "0";
		$_SESSION["TARJETA"] = "0";
		$_SESSION["CREDITO"] = "0";

		foreach ($respuesta as $row => $item) {
			if ($item[0] == 1 && $item[3] == 1) {
				$_SESSION["FcElentronica"] = "Online";
			}
			if ($item[0] == 3 && $item[3] == 1) {
				$_SESSION["FcElentronica"] = "Manual";
			}

			if ($item[0] == 5 && $item[3] == 1) {
				$_SESSION["FcElentronica"] = "2";
			}
			if ($item[0] == 6 && $item[3] == 1) {
				$_SESSION["FcElentronica"] = "4";
			}
			if ($item[0] == 7 && $item[3] == 1) {
				$_SESSION["FcElentronica"] = "6";
			}
			if ($item[0] == 8) {
				$_SESSION["FcCorreos"] = $item[3];
			}

			if ($item[0] == 10 && $item[3] == 1) {
				$_SESSION["CHEQUES"] = "1";
			}
			if ($item[0] == 11 && $item[3] == 1) {
				$_SESSION["TRANSFERENCIAS"] = "1";
			}
			if ($item[0] == 12 && $item[3] == 1) {
				$_SESSION["TARJETA"] = "1";
			}
			if ($item[0] == 13 && $item[3] == 1) {
				$_SESSION["CREDITO"] = "1";
			}
		}
		echo json_encode($respuesta);
	}

	if ($_POST['Requerimiento'] == "ModificarParmetroValor") {


		$datos = array("valor" => $_POST["Valor"]);


		$dao = new Dao();
		$dao->ModificarAjax("parametros", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "CargarParametrosSistema") {
		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("parametro", "");
		$dao->Campo("descripcion", "");
		$dao->Campo("valor", "");
		$dao->Campo("usuario_modifico", "");
		$dao->Campo("fecha_modifico", "");

		$dao->Tabla("parametros", "");

		$respuesta = $dao->Consultar();
		$_SESSION["EFECTIVO"] = "0";
		$_SESSION["CHEQUES"] = "0";
		$_SESSION["TRANSFERENCIAS"] = "0";
		$_SESSION["TARJETA CREDITO"] = "0";
		$_SESSION["CREDITO"] = "0";

		foreach ($respuesta as $row => $item) {
			if ($item[0] == 1 && $item[3] == 1) {
				$_SESSION["FcElentronica"] = "Online";
			}
			if ($item[0] == 3 && $item[3] == 1) {
				$_SESSION["FcElentronica"] = "Manual";
			}

			if ($item[0] == 5 && $item[3] == 1) {
				$_SESSION["FcElentronica"] = "2";
			}
			if ($item[0] == 6 && $item[3] == 1) {
				$_SESSION["FcElentronica"] = "4";
			}
			if ($item[0] == 7 && $item[3] == 1) {
				$_SESSION["FcElentronica"] = "6";
			}
			if ($item[0] == 8) {
				$_SESSION["FcCorreos"] = $item[3];
			}

			if ($item[0] == 9 && $item[3] == 1) {
				$_SESSION["EFECTIVO"] = "1";
			}
			if ($item[0] == 10 && $item[3] == 1) {
				$_SESSION["CHEQUES"] = "1";
			}
			if ($item[0] == 11 && $item[3] == 1) {
				$_SESSION["TRANSFERENCIAS"] = "1";
			}
			if ($item[0] == 12 && $item[3] == 1) {
				$_SESSION["TARJETA CREDITO"] = "1";
			}
			if ($item[0] == 13 && $item[3] == 1) {
				$_SESSION["CREDITO"] = "1";
			}
		}
	}
	if ($_POST['Requerimiento'] == "CargarReporteDiseno") {
		$dao = new Dao();
		$dao->Campo("html", "");
		$dao->Campo("estilos", "");
		$dao->Tabla("reporte", "");
		$dao->Where("reporte", $_POST["Reporte"], "");
		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "GuardarReporteDiseno") {
		$datos = array(
			"reporte" => $_POST["Reporte"],
			"html" => $_POST["HTML"],
			"estilos" => $_POST["Estilos"]
		);

		$dao = new Dao();
		$dao->Eliminar("reporte", "reporte = " . $_POST["Reporte"]);

		$dao = new Dao();
		$dao->GuardarAjax("reporte", $datos,false);
	}
}
