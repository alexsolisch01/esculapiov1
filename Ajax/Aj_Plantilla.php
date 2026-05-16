<?php
session_start();

require_once "autoloadAjax.php";

if (isset($_POST['Requerimiento'])) {

	if ($_POST['Requerimiento'] == "GuardarPlantilla") {

		$datos = array(
			"id_procedimiento_laboratorio" => $_POST["IdProc"],
			"descripcion" => $_POST["Descripcion"],
			"resultado" => $_POST["Resultado"],
			"unidad_medida" => $_POST["Um"],
			"referencia" => $_POST["Referencia"],
			"referencia_min" => $_POST["Referencia_Min"],
			"referencia_max" => $_POST["Referencia_Max"]
		);
		$dao = new Dao();
		$dao->GuardarAjax("plantilla", $datos);
	}

	if ($_POST['Requerimiento'] == "CargarPlantillaPorProc") {
		$dao = new Dao();

		$dao->Campo("DISTINCT p.id", "");
		$dao->Campo("p.id_procedimiento_laboratorio", "");
		$dao->Campo("pl.nombre", "");
		$dao->Campo("p.resultado", "");
		$dao->Campo("p.unidad_medida", "");
		$dao->Campo("p.referencia_min", "");
		$dao->Campo("p.referencia_max", "");
		$dao->Campo("p.descripcion", "");
		$dao->Campo("p.referencia", "");

		$dao->TablasInnerAlias("plantilla", "p", "procedimiento_laboratorio", "pl");

		$dao->In_Where("pl.id_estado", "1,11", "and");
		$dao->Where("p.id_procedimiento_laboratorio", $_POST["IdProc"], "");

		//$dao->Agrupar("pl.nombre");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarPlantillaPorPaciente") {
		$dao = new Dao();

		$dao->Campo("DISTINCT p.id", "");
		$dao->Campo("p.id_procedimiento_laboratorio", "");
		$dao->Campo("pl.nombre", "");
		$dao->Campo("p.resultado", "");
		$dao->Campo("p.unidad_medida", "");
		$dao->Campo("p.referencia_min", "");
		$dao->Campo("p.referencia_max", "");
		$dao->Campo("pa.id", "");
		$dao->Campo("ci.id_consulta", "");
		$dao->Campo("p.descripcion", "");
		$dao->Campo("p.referencia", "");

		$dao->TablasInnerAlias("plantilla", "p", "procedimiento_laboratorio", "pl");
		$dao->TablasInnerAliasOtra("consulta_item", "ci", "procedimiento_laboratorio", "pl");
		$dao->TablasInnerAlias("procedimiento_laboratorio", "pl", "grupo_examen", "g");
		$dao->TablasInnerAlias("consulta_item", "ci", "consulta", "c");
		$dao->TablasInnerAlias("consulta", "c", "paciente", "pa");



		$dao->In_Where("pl.id_estado", "1,11", "and");
		$dao->IN_Diferente("ci.id_estado", "10,12", "and");
		$dao->Where("pa.id", $_POST["Paciente"], "AND");
		$dao->Where("ci.id_estado", "6", "AND");
		$dao->Where("c.id", $_POST["Consulta"], "");
		$dao->Ordenar("g.orden");

		$dao->ConsultarAjax();
		//$respuesta = $dao->Consultar();

		//echo json_encode($dao->Consultar2());
	}

	if ($_POST['Requerimiento'] == "EliminaPlantilla") {
		$dao = new Dao();

		$jsondata = array();

		$jsondata[0] = $dao->Eliminar("plantilla", "id_procedimiento_laboratorio=" . $_POST["IdProc"]);

		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}

	if ($_POST['Requerimiento'] == "ActualizarEstadoProcedimientoLaboratoio") {

		$datos = array("id_estado" => 11);
		$dao = new Dao();
		$dao->ModificarAjax("procedimiento_laboratorio", $datos, "id=" . $_POST['IdProc'], $_POST['IdProc']);
	}



	if ($_POST['Requerimiento'] == "GuardarResultadoLaboratorio") {

		$array = json_decode($_POST["Detalle"], true);
		$jsondata = array();
		$j = 1;
		$proce = 0;
		$proce1 = 0;
		$existedatos = false;
		$consulta = 0;
		for ($i = 0; $i < sizeof($array); $i++) {
			$fila = $array[$i];
			if (!is_array($array[$i])) {
				$fila = json_decode($array[$i], true);
			}
			if ($proce != $fila[0]) {
				if (!$existedatos) {
					$dao = new Dao();
					$dao->Eliminar("resultado_laboratorio", "id_consulta=" . $fila[2] . " AND id_procedimiento_laboratorio=" . $proce);
					$datos = array("id_estado" => 6);
					$dao = new Dao();
					$dao->Modificar("consulta_item", $datos, "id_consulta=" . $fila[2] . " AND id_procedimiento_laboratorio=" . $proce, 0);
				}
				$proce = $fila[0];
				$dao = new Dao();
				$dao->Eliminar("resultado_laboratorio", "id_consulta=" . $fila[2] . " AND id_procedimiento_laboratorio=" . $proce);
				$existedatos = false;
			}
			$consulta = $fila[2];
			$datos = array(
				"id_procedimiento_laboratorio" => $fila[0],
				"id_paciente" => $fila[1],
				"id_consulta" => $fila[2],
				"id_estado" => 1,
				"usuario_registro" => $_SESSION["nombres"],
				"descripcion" => $fila[3],
				"resultado" => $fila[4],
				"unidad_medida" => $fila[5],
				"referencia" => $fila[6],
				"referencia_min" => $fila[7],
				"referencia_max" => $fila[8]
			);
			if ($fila[4] != "") {
				$existedatos = true;
			}

			$dao = new Dao();
			$respuesta = $dao->Guardar("resultado_laboratorio", $datos);

			if (!$respuesta[0]) {
				$jsondata[0] = false;
				$jsondata[$j] = $respuesta;
				$j++;
			} else {
				if ($proce1 != $fila[0]) {
					$proce1 = $fila[0];

					$datos = array("id_estado" => 10);
					$dao = new Dao();
					$dao->Modificar("consulta_item", $datos, "id_consulta=" . $fila[2] . " AND id_procedimiento_laboratorio=" . $fila[0], 0);
				}
			}
		}
		if (!$existedatos) {
			$dao = new Dao();
			$dao->Eliminar("resultado_laboratorio", "id_consulta=" . $consulta . " AND id_procedimiento_laboratorio=" . $proce);
			$datos = array("id_estado" => 6);
			$dao = new Dao();
			$dao->Modificar("consulta_item", $datos, "id_consulta=" . $consulta . " AND id_procedimiento_laboratorio=" . $proce, 0);
		}

		if (sizeof($jsondata) > 0) {
			echo json_encode($jsondata, JSON_FORCE_OBJECT);
		} else {
			$jsondata[0] = true;
			echo json_encode($jsondata, JSON_FORCE_OBJECT);
		}
	}

	if ($_POST['Requerimiento'] == "ValidarResultadoLaboratorio") {

		$jsondata = array();

		if(!isset($_SESSION["nombres"])){
			$jsondata[0] = false;
			$jsondata[1] = "Su sesion a expirado, Recargue y vuelva a iniciar sesion";
			echo json_encode($jsondata, JSON_FORCE_OBJECT);
			return;
		}
		if($_SESSION["nombres"]==""){
			$jsondata[0] = false;
			$jsondata[1] = "Su sesion a expirado, Recargue y vuelva a iniciar sesion";
			echo json_encode($jsondata, JSON_FORCE_OBJECT);
			return;
		}
		$array = json_decode($_POST["Detalle"], true);
		
		$j = 1;
		$proce = 0;
		for ($i = 0; $i < sizeof($array); $i++) {
			$fila = $array[$i];


			$datos = array(
				"usuario_valido" => $_SESSION["nombres"],
				"resultado" => $fila[2]
			);

			$dao = new Dao();
			$respuesta = $dao->Modificar("resultado_laboratorio", $datos, "id=" . $fila[3], 0);

			if (!$respuesta[0]) {
				$jsondata[0] = false;
				$jsondata[$j] = "No se pudo validar el resultado " . $fila[0];
				$j++;
			} else {
				if ($proce != $fila[0]) {
					$proce = $fila[0];
					$datos = array("id_estado" => 12);
					$dao = new Dao();
					$dao->Modificar("consulta_item", $datos, " id_estado in(10,12) and id_consulta=" . $fila[1] . " AND id_procedimiento_laboratorio=" . $fila[0], 0);
				}
			}
		}

		if (sizeof($jsondata) > 0) {
			echo json_encode($jsondata, JSON_FORCE_OBJECT);
		} else {
			$jsondata[0] = true;
			echo json_encode($jsondata, JSON_FORCE_OBJECT);
		}
	}

	if ($_POST['Requerimiento'] == "CargarPlantillaPorPacienteResultado") {
		$dao = new Dao();

		$dao->Campo("DISTINCT p.id", "");
		$dao->Campo("p.id_procedimiento_laboratorio", "");
		$dao->Campo("pl.nombre", "");
		$dao->Campo("p.resultado", "");
		$dao->Campo("p.unidad_medida", "");
		$dao->Campo("p.referencia_min", "");
		$dao->Campo("p.referencia_max", "");
		$dao->Campo("pa.id", "");
		$dao->Campo("p.descripcion", "");
		$dao->Campo("p.referencia", "");
		$dao->Campo("p.id_consulta", "");
		$dao->Campo("p.usuario_registro", "");
		$dao->Campo("p.usuario_valido", "");
		$dao->Campo("p.fecha_registro", "");
		$dao->Campo("p.fecha_valido", "");

		$dao->TablasInnerAlias("resultado_laboratorio", "p", "procedimiento_laboratorio", "pl");
		$dao->TablasInnerAlias("procedimiento_laboratorio", "pl", "grupo_examen", "g");
		$dao->TablasInnerAlias("resultado_laboratorio", "p", "paciente", "pa");

		//$dao->In_Where("pl.id_estado","1,11","and");
		$dao->Where("pa.id", $_POST["Paciente"], "AND");
		$dao->Where("p.id_consulta", $_POST["Consulta"], "");
		$dao->Ordenar("g.orden");

		$dao->ConsultarAjax();
		//$respuesta = $dao->Consultar();

		//echo json_encode($dao->Consultar2());
	}
}
