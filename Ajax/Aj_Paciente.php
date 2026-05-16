<?php
session_start();
date_default_timezone_set('America/Guayaquil');
require_once "autoloadAjax.php";
require_once 'Spout/Autoloader/autoload.php';
require_once 'Iterador.php';

use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Common\Entity\Row;
use Box\Spout\Writer\Common\Creator\Style\StyleBuilder;

if (isset($_POST['Requerimiento'])) {

	if ($_POST['Requerimiento'] == "CargaComboAnidado") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Tabla("canton", "");
		$dao->Where("id_estado", "1", "and");
		$dao->Where("id_provincia", $_POST['Id'], "");

		$dao->ConsultarAjax();
	}


	if ($_POST['Requerimiento'] == "CargaComboAnidadoMotivo") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("descripcion", "");
		$dao->Tabla("canton", "");
		$dao->Where("id_estado", "1", "and");
		$dao->Where("id_provincia", $_POST['Id'], "");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "ExisteCedula") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Tabla("paciente", "");
		$dao->Where("cedula", $_POST['Cedula'], "");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "ExisteCedulaCliente") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Tabla("paciente_cliente", "");
		$dao->Where("ruc", $_POST['Cedula'], "");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargaComboAnidado2") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Tabla("parroquia", "");
		$dao->Where("id_estado", "1", "and");
		$dao->Where("id_canton", $_POST['Id'], "");

		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CargaComboAnidado3") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Tabla("sectores", "");
		$dao->Where("id_estado", "1", "and");
		$dao->Where("id_canton", $_POST['Id'], "");

		$dao->ConsultarAjax();
	}

	function ObtUltimoId()
	{

		$dao = new Dao();

		$dao->Maximo("id", "");
		$dao->Tabla("paciente", "");

		$respuesta = $dao->Consultar();

		$id = 0;

		foreach ($respuesta as $row => $item) {
			$id = $item[0] * 100;
		}
		return $id;
	}

	if ($_POST['Requerimiento'] == "GuardaPaciente") {

		$cedula = '';
		if ($_POST["Cedula"] == '') {
			$cedula = ObtUltimoId();
		} else {
			$cedula = $_POST["Cedula"];
		}
		$datos = array(
			"cedula" => $cedula,
			"nombre" => $_POST["Nombre"],
			"apellido" => $_POST["Apellido"],
			"apellido_materno" => $_POST["ApellidoM"],
			"telefono" => $_POST["Telefono"],
			"email" => $_POST["Correo"],
			"direccion" => $_POST["Direccion"],
			"fecha_nacimiento" => $_POST["Fecha"],
			"ocupacion" => $_POST["Ocupacion"],
			"id_canton" => $_POST["Canton"],
			"estado_civil" => $_POST["EstadoCivil"],
			"id_parroquia" => $_POST["Parroquia"],
			"sector" => $_POST["Sector"],
			"id_genero" => 4,
			"id_genero2" => 3,
			"id_migrante" => 1,
			"id_migrante2" => 16,
			"id_etnia" => 6,
			"id_prioridad" => 14,
			"id_residencia" => 1,
			"id_afiliacion" => 10,
			"id_instruccion" => 1,
			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);
		if (isset($_POST["Genero"])) {
			$datos["id_genero2"] = $_POST["Genero"];
		}
		$dao = new Dao();
		$dao->GuardarAjax("paciente", $datos);
	}

	if ($_POST['Requerimiento'] == "ModificaEpidemia") {

		$datos = array(
			"id_genero" => $_POST["Genero"],
			"id_genero2" => $_POST["Genero2"],
			"id_etnia" => $_POST["Etnia"],
			"id_migrante" => $_POST["Migrante"],
			"id_migrante2" => $_POST["Migrante2"],
			"id_prioridad" => $_POST["Grupo"],
			"id_residencia" => $_POST["Sector"],
			"usuario_modifico" => $_SESSION["usuario"]
		);
		$dao = new Dao();
		$dao->ModificarAjax("paciente", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ModificaTrabajo") {

		$datos = array(
			"id_afiliacion" => $_POST["Afiliacion"],
			"id_instruccion" => $_POST["Instruccion"],
			"nombre_responsable" => $_POST["NombreRes"],
			"parentesco" => $_POST["ResParen"],
			"codigo_vih" => $_POST["Codigo"],
			"parentes_telefono" => $_POST["NumeroRes"],
			"usuario_modifico" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("paciente", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "GuardaClientePaciente") {

		$datos = array(
			"ruc" => $_POST["Ruc"],
			"nombre" => $_POST["Nombre"],
			"apellido" => $_POST["Apellido"],
			"telefono" => $_POST["Telefono"],
			"email" => $_POST["Correo"],
			"direccion" => $_POST["Direccion"],
			"id_estado" => 1
		);
		$dao = new Dao();
		$dao->GuardarAjax("paciente_cliente", $datos);
	}

	if ($_POST['Requerimiento'] == "ModificarClientePaciente") {

		$datos = array(
			"ruc" => $_POST["Ruc"],
			"nombre" => $_POST["Nombre"],
			"apellido" => $_POST["Apellido"],
			"telefono" => $_POST["Telefono"],
			"email" => $_POST["Correo"],
			"direccion" => $_POST["Direccion"],
			"id_estado" => 1
		);
		$dao = new Dao();
		$dao->ModificarAjax("paciente_cliente", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ModificaPaciente") {

		$datos = array(
			"cedula" => $_POST["Cedula"],
			"nombre" => $_POST["Nombre"],
			"apellido" => $_POST["Apellido"],
			"apellido_materno" => $_POST["ApellidoM"],
			"telefono" => $_POST["Telefono"],
			"email" => $_POST["Correo"],
			"direccion" => $_POST["Direccion"],
			"fecha_nacimiento" => $_POST["Fecha"],
			"ocupacion" => $_POST["Ocupacion"],
			"id_canton" => $_POST["Canton"],
			"estado_civil" => $_POST["EstadoCivil"],
			"id_parroquia" => $_POST["Parroquia"],
			"sector" => $_POST["Sector"],
			"usuario_modifico" => $_SESSION["usuario"]
		);

		if (isset($_POST["Genero"])) {
			$datos["id_genero2"] = $_POST["Genero"];
		}

		$dao = new Dao();
		$dao->ModificarAjax("paciente", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ModificaSoloCorreo") {

		$datos = array("email" => $_POST["Correo"]);

		$dao = new Dao();
		$dao->ModificarAjax("paciente", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminaPaciente") {

		$dao = new Dao();
		$dao->EliminarAjax("paciente", $_POST['Id']);
	}


	if ($_POST['Requerimiento'] == "LlenarTablaPaciente") {

		$dao = new Dao();

		$dao->Campo("p.id", "");
		$dao->Campo("p.cedula", "");
		$dao->Campo("p.apellido", "");
		$dao->Campo("p.apellido_materno", "");
		$dao->Campo("p.nombre", "");
		$dao->Campo("p.email", "");
		$dao->Campo("p.direccion", "");
		$dao->Campo("p.telefono", "");
		$dao->Campo("p.ocupacion", "");
		$dao->Campo("c.nombre", "");
		$dao->Campo("p.estado_civil", "");
		$dao->Campo("Date_format(p.fecha_nacimiento,'%Y-%m-%d')", "");
		$dao->Campo("p.id_genero", "");
		$dao->Campo("p.id_genero2", "");
		$dao->Campo("p.id_etnia", "");
		$dao->Campo("p.id_migrante", "");
		$dao->Campo("p.id_migrante2", "");
		$dao->Campo("p.id_prioridad", "");
		$dao->Campo("p.id_residencia", "");
		$dao->Campo("p.codigo_vih", "");
		$dao->Campo("p.id_afiliacion", "");
		$dao->Campo("p.id_instruccion", "");
		$dao->Campo("p.nombre_responsable", "");
		$dao->Campo("p.parentesco", "");
		$dao->Campo("p.parentes_telefono", "");
		$dao->Campo("TIMESTAMPDIFF(YEAR,p.fecha_nacimiento,CURDATE())", "");


		$dao->Campo("CONCAT(p.apellido,' ',p.nombre) nombres", "");
		$dao->Campo("p.id_parroquia", "");
		$dao->Campo("p.sector", "");
		$dao->TablasInnerAlias("paciente", "p", "canton", "c");
		$dao->In_Where("p.id_estado", "1,16", "and");

		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->FiltrarIzquierda("p.apellido", $_POST['columns'][2]["search"]["value"], "and");
			}
		}

		if (isset($_POST['columns'][3]["search"]["value"])) {

			if (trim($_POST['columns'][3]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->FiltrarIzquierda("p.apellido_materno", $_POST['columns'][3]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][4]["search"]["value"])) {
			if (trim($_POST['columns'][4]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->FiltrarIzquierda("p.nombre", $_POST['columns'][4]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->FiltrarIzquierda("p.cedula", $_POST['columns'][1]["search"]["value"], "");
			}
		}
		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}
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
		array_sort_by($respuesta, 'nombres', $order = SORT_ASC);

		$total = 0;
		foreach ($respuesta as $row => $item) {
			$total++;
			$sub_array = array();

			$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';

			$item[0] = $editar . $eliminar;

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[25];
			$sub_array[] = $item[5];
			$sub_array[] = $item[6];
			$sub_array[] = $item[7];
			$sub_array[] = $item[8];
			$sub_array[] = $item[9];
			$sub_array[] = $item[10];
			$sub_array[] = $item[11];
			$sub_array[] = '<span genero="' . $item[12] . '" genero2="' . $item[13] . '" etnia="' . $item[14] . '" 
            				migrante="' . $item[15] . '" migrante2="' . $item[16] . '" prioridad="' . $item[17] . '" 
            				residencia="' . $item[18] . '" codigo_vih="' . $item[19] . '" afeliacion="' . $item[20] . '"
            				instruccion="' . $item[21] . '" nombre_responsable="' . $item[22] . '" 
            				parentesco="' . $item[23] . '" parentes_telefono="' . $item[24] . '" 
            				parroquia="' . $item[27] . '" sector="' . $item[28] . '" ></span>';

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

	if ($_POST['Requerimiento'] == "LlenarTablaPacienteFactura") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("cedula", "");
		$dao->Campo("apellido", "");
		$dao->Campo("apellido_materno", "");
		$dao->Campo("nombre", "");
		$dao->Campo("email", "");
		$dao->Campo("direccion", "");
		$dao->Campo("telefono", "");
		$dao->Campo("CONVERT(fecha_nacimiento,DATE)", "");
		$dao->Campo("CONCAT(apellido,' ',apellido_materno,' ',nombre)", "nombres");
		$dao->Campo("CONVERT(fecha_registro,DATE)", "");

		$dao->Tabla("paciente", "");
		$dao->In_Where("id_estado", "16,1", "and");
		//$dao->Where("YEAR(fecha_nacimiento)","2000","and");		
		$apellidosBuscar = "";
		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("apellido", $_POST['columns'][2]["search"]["value"], "and");
				//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}

		if (isset($_POST['columns'][3]["search"]["value"])) {
			if (trim($_POST['columns'][3]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("apellido_materno", $_POST['columns'][3]["search"]["value"], "and");
				$apellidosBuscar .= $_POST['columns'][3]["search"]["value"] . " ";
			}
		}

		/* if($apellidosBuscar!=""){
        	$dao->FULLTEXT("apellido",$apellidosBuscar,"and");
        }*/

		if (isset($_POST['columns'][4]["search"]["value"])) {
			if (trim($_POST['columns'][4]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("nombre", $_POST['columns'][4]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("cedula", $_POST['columns'][1]["search"]["value"], "");
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("nombres");

		$respuesta = $dao->Consultar();

		$data = array();


		function array_sort_by(&$arrIni, $col, $order = SORT_ASC)
		{
			$arrAux = array();
			foreach ($arrIni as $key => $row) {
				$arrAux[$key] = is_object($row) ? $arrAux[$key] = $row->$col : $row[$col];
				$arrAux[$key] = strtolower($arrAux[$key]);
			}
			array_multisort($arrAux, $order, $arrIni);
		}
		$total = 0;
		foreach ($respuesta as $row => $item) {
			$total++;
			$sub_array = array();
			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];
			$sub_array[] = $item[6];
			$sub_array[] = '<span fecha_nacimiento="' . $item[8] . '">' . $item[7] . '</span>';
			$sub_array[] = $item[10];


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

	if ($_POST['Requerimiento'] == "LlenarTablaClienteFactura") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("ruc", "");
		$dao->Campo("CONCAT(apellido,' ',nombre) nombres", "");
		$dao->Campo("email", "");
		$dao->Campo("direccion", "");
		$dao->Campo("telefono", "");

		$dao->Tabla("paciente_cliente", "");
		$dao->Where("id_estado", "1", "and");
		$dao->Diferente("id", "1", "and");


		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("CONCAT(ruc,' ',apellido,' ',nombre)", $_POST["search"]["value"], "");
			}
		}
		$dao->Ordenar("apellido,nombre");
		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}



		$respuesta = $dao->Consultar();

		$data = array();
		$total = 0;
		foreach ($respuesta as $row => $item) {
			$total++;
			$sub_array = array();
			$Apellidos = explode(" ", $item[2]);

			if (!isset($Apellidos[0])) {
				$Apellidos[0] = " ";
			}
			if (!isset($Apellidos[1])) {
				$Apellidos[1] = " ";
			}
			if (!isset($Apellidos[2])) {
				$Apellidos[2] = " ";
			}
			if (!isset($Apellidos[3])) {
				$Apellidos[3] = " ";
			}
			$boton = '<button id="CargarDatos" idCliente="' . $item[0] . '" class="btn btn-primary"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $Apellidos[0];
			$sub_array[] = $Apellidos[1];
			$sub_array[] = $Apellidos[2] . ' ' . $Apellidos[3];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];
			$sub_array[] = $boton;

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

	if ($_POST['Requerimiento'] == "CargarPacientePorId") {

		$dao = new Dao();

		$dao->Campo("p.id", "");
		$dao->Campo("p.cedula", "");
		$dao->Campo("p.apellido", "");
		$dao->Campo("p.nombre", "");
		$dao->Campo("Date_format(p.fecha_nacimiento,'%Y-%m-%d')", "");
		$dao->Campo("p.direccion", "");
		$dao->Campo("c.id", "");
		$dao->Campo("c.nombre", "");
		$dao->Campo("p.telefono", "");
		$dao->Campo("p.email", "");
		$dao->Campo("p.estado_civil", "");
		$dao->Campo("p.ocupacion", "");
		$dao->Campo("p.apellido_materno", "");
		$dao->Campo("p.id_genero2", "");
		$dao->Campo("p.id_parroquia", ""); //14
		$dao->Campo("p.sector", ""); //15

		$dao->TablasInnerAlias("paciente", "p", "canton", "c");
		$dao->In_Where("p.id_estado", "1,16", "and");
		$dao->Where("p.id", $_POST['Id'], "");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if ($_POST['Requerimiento'] == "CargarPacientePorCedula") {

		$dao = new Dao();

		$dao->Campo("p.id", "");
		$dao->Campo("p.cedula", "");
		$dao->Campo("p.apellido", "");
		$dao->Campo("p.nombre", "");
		$dao->Campo("Date_format(p.fecha_nacimiento,'%Y-%m-%d')", "");
		$dao->Campo("p.direccion", "");
		$dao->Campo("c.id", "");
		$dao->Campo("c.nombre", "");
		$dao->Campo("p.telefono", "");
		$dao->Campo("p.email", "");
		$dao->Campo("p.estado_civil", "");
		$dao->Campo("p.ocupacion", "");
		$dao->Campo("p.apellido_materno", "");
		$dao->Campo("p.id_genero2", "");

		$dao->TablasInnerAlias("paciente", "p", "canton", "c");
		$dao->In_Where("p.id_estado", "1,16", "and");
		$dao->Where("p.cedula", $_POST['Cedula'], "");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if ($_POST['Requerimiento'] == "CargarClientePorIdConsulta") {

		$dao = new Dao();

		$dao->Campo("p.id", "");
		$dao->Campo("p.ruc", "");
		$dao->Campo("p.apellido", "");
		$dao->Campo("p.nombre", "");
		$dao->Campo("p.direccion", "");
		$dao->Campo("p.telefono", "");
		$dao->Campo("p.email", "");


		$dao->Tabla("paciente_cliente", "p");
		$dao->Where("p.id_estado", "1", "and");
		$dao->Where("p.id", $_POST['Id'], "");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if ($_POST['Requerimiento'] == "CargarEpidemiologico") {

		$dao = new Dao();

		$dao->Campo("p.id_genero", "");
		$dao->Campo("p.id_genero2", "");
		$dao->Campo("p.id_etnia", "");
		$dao->Campo("p.id_migrante", "");
		$dao->Campo("p.id_migrante2", "");
		$dao->Campo("p.id_prioridad", "");
		$dao->Campo("p.id_residencia", "");
		$dao->Campo("p.codigo_vih", "");
		$dao->Campo("p.id_afiliacion", "");
		$dao->Campo("p.id_instruccion", "");
		$dao->Campo("p.nombre_responsable", "");
		$dao->Campo("p.parentesco", "");
		$dao->Campo("p.parentes_telefono", "");

		$dao->Tabla("paciente", "p");
		$dao->Where("p.id_estado", "1", "and");
		$dao->Where("p.id", $_POST['IdPaciente'], "");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "ActualizarEstadoPaciente") {

		$datos = array("id_estado" => $_POST["Estado"]);

		$dao = new Dao();
		$dao->ModificarAjax("paciente", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}


	if ($_POST['Requerimiento'] == "Cargar") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("cedula", "");
		$dao->Campo("apellido", "");
		$dao->Campo("apellido_materno", "");
		$dao->Campo("nombre", "");
		$dao->Campo("email", "");
		$dao->Campo("direccion", "");
		$dao->Campo("telefono", "");
		$dao->Campo("CONVERT(fecha_nacimiento,DATE)", "");
		$dao->Campo("CONCAT(apellido,' ',apellido_materno,' ',nombre)", "nombres");
		$dao->Campo("CONVERT(fecha_registro,DATE)", "");

		$dao->Tabla("paciente", "");
		$dao->In_Where("id_estado", "16,1", "and");
		if (strlen($_POST['Cedula']) > 9) {
			$dao->Where("cedula", "'" . $_POST['Cedula'] . "'", "and");
		}
		$dao->Filtrar("apellido", $_POST['ApellidoP'], "and");
		$dao->Filtrar("apellido_materno", $_POST['ApellidoM'], "and");
		$dao->Filtrar("nombre", $_POST['Nombres'], "");

		$dao->Ordenar('apellido,apellido_materno,nombre');
		$dao->Limite('0,400');
		/*$respuesta = */
		$dao->ConsultarAjax();/*$dao->Consultar2();*/
		//echo json_encode($respuesta);
	}

	if ($_POST['Requerimiento'] == "CargarPacienteCuentas") {

		$dao = new Dao();
		$cadena = '';
		if (isset($_POST['columns'][0]["search"]["value"])) {
			$cadena = $_POST['columns'][0]["search"]["value"];
		}

		$sql = '	SELECT pc.id, pc.ruc identificacion, CONCAT(pc.nombre ," ", pc.apellido) cliente, pc.telefono, pc.email, pc.direccion, "cliente" tipo
				FROM forma_pago f INNER JOIN consulta c on(f.id_consulta=c.id) 
				INNER JOIN paciente_cliente pc ON(c.id_paciente_cliente=pc.id) 
				WHERE CONCAT(pc.ruc," ",pc.nombre," ",pc.apellido) LIKE "%' . $cadena . '%" and f.tipo = "CREDITO" and pc.id != 1 
				group by pc.id

				UNION 

				SELECT pc.id, pc.ruc identificacion, CONCAT(pc.nombre ," ", pc.apellido) cliente, pc.telefono, pc.email, pc.direccion, "cliente" tipo
				FROM forma_pago f INNER JOIN farmacia c on(f.id_farmacia=c.id) 
				INNER JOIN paciente_cliente pc ON(c.id_paciente_cliente=pc.id) 
				WHERE CONCAT(pc.ruc," ",pc.nombre," ",pc.apellido) LIKE "%' . $cadena . '%" and f.tipo = "CREDITO" and pc.id != 1 
				group by pc.id
				';

		//$dao->ConsultarSqlNativoAjax($sql);

		$respuesta = $dao->ConsultarSqlNativo($sql);
		$total = 0;
		$data = array();

		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];
			$sub_array[] = $item[6];

			$data[] = $sub_array;
			$total++;
		}

		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $total,
			"recordsFiltered" => $total,
			"data"           => $data
		);
		echo json_encode($output);
	}

	if ($_POST['Requerimiento'] == "CargarPacienteCuentasSinDeuda") {


		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("ruc", "");
		$dao->Campo("CONCAT(pc.nombre ,' ', pc.apellido)", "");
		$dao->Campo("telefono", "");
		$dao->Campo("email", "");
		$dao->Campo("direccion", "");
		$dao->Campo("'cliente'", "");

		$dao->Tabla("paciente_cliente", "pc");
		$dao->Diferente("id", "1", "and");

		if (trim($_POST['columns'][0]["search"]["value"]) == "") {
			$dao->Where("1", '1', "");
		} else {
			$dao->Filtrar("CONCAT(pc.nombre ,' ', pc.apellido,' ',pc.ruc)", $_POST['columns'][0]["search"]["value"], "");
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar('CONCAT(pc.nombre ," ", pc.apellido)');
		$respuesta = $dao->Consultar();

		$total = 0;
		$data = array();

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

	if ($_POST['Requerimiento'] == "ConsultarClientePorCedula") {

		$dao = new Dao();

		$dao->Campo("id", "");

		$dao->Tabla("paciente_cliente", "");
		$dao->Where("ruc", $_POST['Cedula'], "");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarHistoricoConsultas") {

		$dao = new Dao();

		$dao->Campo("fecha_atencion", "");
		$dao->Campo("especialidad", "");
		$dao->Campo("evolucion", "");
		$dao->Campo("medico", "");

		$dao->Tabla("paciente_historico ", "");
		$dao->Where("id_paciente", $_POST['Id'], "");

		$dao->Ordenar("fecha_atencion desc");

		$dao->ConsultarAjax();
	}


	////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////
	if ($_POST['Requerimiento'] == "CargarHistoricoConsultas2") {
		$fecha2 = date("Y-m-d"); //5 agosto de 2004 por ejemplo  
		$finalRespuesta = "";
		if (trim($_POST['columns'][1]["search"]["value"]) != "") {
			$fecha2 = $_POST['columns'][1]["search"]["value"];
		}

		$fechats = strtotime($fecha2); //a timestamp 

		//el parametro w en la funcion date indica que queremos el dia de la semana 
		//lo devuelve en numero 0 domingo, 1 lunes,.... 
		switch (date('w', $fechats)) {
			case 0:
				$finalRespuesta = "DOMINGO";
				break;
			case 1:
				$finalRespuesta = "LUNES";
				break;
			case 2:
				$finalRespuesta = "MARTES";
				break;
			case 3:
				$finalRespuesta = "MIERCOLES";
				break;
			case 4:
				$finalRespuesta = "JUEVES";
				break;
			case 5:
				$finalRespuesta = "VIERNES";
				break;
			case 6:
				$finalRespuesta = "SABADO";
				break;
		}

		$dao = new Dao();

		$cadena = '';
		if (isset($_POST["search"]["value"])) {
			$cadena = $_POST["search"]["value"];
		}

		$sql = 'SELECT
				 * FROM(SELECT  c.id , CONCAT(p.apellido," ",p.apellido_materno," ",p.nombre) , p.nombre nombres, em.apellidos , pro.nombre nppro , p.id idP, ci.id_estado , p.cedula , s.triage , s.prioridad npprop, g.nombre , s.edad , s.presion , s.pulso , s.talla , s.peso , s.imc , s.temp_bucal , s.temp_rectal , s.temp_axilar , s.perim_cefalico , s.perim_abdominal , s.prioridad , s.usuario_registro , s.id_consulta , s.fr , ci.id_estado npestado, ci.turno , c.id_paciente , s.puntual , meh.horaI,p.sexo 
						
						 FROM consulta_item ci INNER JOIN consulta c ON (c.id=ci.id_consulta)
						 INNER JOIN paciente p ON (c.id_paciente=p.id)
						 INNER JOIN signo s ON(s.id_consulta_item =ci.id ) 
						 INNER JOIN genero2 g ON(g.id = p.id_genero2) 
						 INNER JOIN empleado em ON(em.id = ci.id_empleado) 
						 INNER JOIN procedimiento pro ON(pro.id = ci.id_procedimiento) 
						 INNER JOIN medico_especialidad me ON(em.id = me.id_empleado) 
						 INNER JOIN especialidad ess ON(ess.id = me.id_especialidad)
						 INNER JOIN medico_especialidad_horario meh ON(me.id = meh.id_medico_especialidad) 

				WHERE ci.id_estado IN(7,9) and CONVERT(ci.fecha_atencion,DATE) = "' . $fecha2 . '" and em.id = ' . $_SESSION["id_empleado"] . ' and meh.dia = "' . $finalRespuesta . '" and CONCAT(p.apellido," ",p.apellido_materno," ",p.nombre) LIKE "%' . $cadena . '%" and 1 = 1 and ci.id_estado not in(25,19) GROUP BY c.id_paciente,ci.id 
			UNION 

			SELECT
				  c.id , CONCAT(p.apellido," ",p.apellido_materno," ",p.nombre) , p.nombre nombres, em.apellidos , pro.nombre nppro , p.id idP, ci.id_estado , p.cedula , "NoSignos" , "prioridad" npprop, "g.nombre" , "s.edad" , "s.presion" , "s.pulso" , "s.talla" , "s.peso" , "s.imc" , "s.temp_bucal" , "s.temp_rectal" , "s.temp_axilar" , "s.perim_cefalico" , "s.perim_abdominal" , "s.prioridad" , "s.usuario_registro" , "s.id_consulta" , "s.fr" , ci.id_estado npestado, ci.turno , c.id_paciente , "s.puntual" , meh.horaI,p.sexo 

				 	FROM consulta c INNER JOIN paciente p ON(c.id_paciente =p.id ) 
				 	INNER JOIN consulta_item ci ON(c.id = ci.id_consulta) 
				 	INNER JOIN empleado em ON(em.id = ci.id_empleado) 
				 	INNER JOIN procedimiento pro ON(pro.id = ci.id_procedimiento) 
				 	INNER JOIN medico_especialidad me ON(em.id = me.id_empleado) 
				 	INNER JOIN especialidad ess ON(ess.id = me.id_especialidad) 
				 	INNER JOIN medico_especialidad_horario meh ON(me.id = meh.id_medico_especialidad)  

				 WHERE CONCAT(p.apellido," ",p.apellido_materno," ",p.nombre) LIKE "%' . $cadena . '%" and ci.id_estado not in(25,9,19) 
				 		and c.id_estado = 1 and CONVERT(ci.fecha_atencion,DATE) = "' . $fecha2 . '" and em.id = ' . $_SESSION["id_empleado"] . ' and meh.dia = "' . $finalRespuesta . '"
				 		 GROUP BY c.id_paciente,ci.id
				) x  ORDER BY x.turno';

		//$dao->ConsultarSqlNativoAjax($sql);

		$respuesta = $dao->ConsultarSqlNativo($sql);
		$total = 0;
		$data = array();
		$total = 0;
		foreach ($respuesta as $row => $item) {
			$minutoAnadir = 0;
			$minutoAnadirInicial = 0;
			$boton = '';
			$boton1 = '';
			$boton2 = '';
			$total++;
			if ($item[29] == 'NO') {
				$boton = '<button type="button" class="btn btn-sm nopaddingBoton btn-warning">ATRASADO</button>';
			} else if ($item[29] == 'SI') {
				$boton = '<button type="button" class="btn btn-sm nopaddingBoton btn-success">A TIEMPO</button>';
			} else {
				$boton = '<button type="button" class="btn btn-sm nopaddingBoton btn-danger">PENDIENTE</button>';
			}


			if ($item[8] == 'SELECCIONAR' || $item[8] == 'SIN URGENCIA') {
				$boton1 = '<button type="button" class="btn btn-sm nopaddingBoton btn-primary">SIN URGENCIA</button>';
			}

			if ($item[8] == 'RESUCITACION') {
				$boton1 = '<button type="button" class="btn btn-sm nopaddingBoton btn-danger">RESUCITACION</button>';
			}

			if ($item[8] == 'EMERGENCIA') {
				$boton1 = '<button type="button" class="btn btn-sm nopaddingBoton btn-warning">EMERGENCIA</button>';
			}

			if ($item[8] == 'URGENCIA') {
				$boton1 = '<button type="button" class="btn btn-sm nopaddingBoton" style="background-color:yellow;">EMERGENCIA</button>';
			}

			if ($item[8] == 'URGENCIA MENOR') {
				$boton1 = '<button type="button" class="btn btn-sm nopaddingBoton" style="background-color:green;color:white;">URGENCIA MENOR</button>';
			}

			$boton2 = '<button type="button" class="btn btn-sm nopaddingBoton btn-default">' . $item[9] . '</button>';
			if ($item[9] == 'SELECCIONAR') {
				$boton2 = '';
			}
			if ($item[9] == 'prioridad') {
				$boton2 = '';
			}


			$accion = '<a idconsulta="' . $item[0] . '" triage="' . $item[8] . '" prioridad="' . $item[9] . '" idpaciente="' . $item[28] . '" nombrepaciente="' . $item[1] . '" cedulapaciente="' . $item[7] . '" estado="' . $item[6] . '" sexo="' . $item[10] . '" edad="' . $item[11] . '" presion="' . $item[12] . '" pulso="' . $item[13] . '" taxilar="' . $item[19] . '" peso="' . $item[15] . '" talla="' . $item[14] . '" imc="' . $item[16] . '" pcefalico="' . $item[20] . '">';

			$horaInicial = $item[30];
			$minutoAnadir = ($item[27] * 15);
			$minutoAnadirInicial = ($item[27] * 15) - 15;
			$segundos_horaInicial = strtotime($horaInicial);

			$segundos_minutoAnadir = $minutoAnadir * 60;
			$segundos_minutoAnadirInicial = $minutoAnadirInicial * 60;

			$nuevaHora = date("H:i", $segundos_horaInicial + $segundos_minutoAnadir);
			$nuevaHoraInicial = date("H:i", $segundos_horaInicial + $segundos_minutoAnadirInicial);

			$sub_array = array();
			$sub_array[] = $accion;
			$sub_array[] = $item[27];
			$sub_array[] = $item[1];
			$sub_array[] = $item[4];
			$sub_array[] = $boton1;
			$sub_array[] = $boton2;
			$sub_array[] = $nuevaHoraInicial;
			$sub_array[] = $nuevaHora;
			$sub_array[] = $boton;
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


	if ($_POST['Requerimiento'] == "CargarTablaUtilidades") {


		$dao = new Dao();

		$dao->Campo("apellido", "");
		$dao->Campo("apellido_materno", "");
		$dao->Campo("nombre", "");
		$dao->Campo("id", "");
		$dao->Campo("0", "otro");
		$dao->Campo("p.id_genero2", "");

		$dao->Tabla("paciente", "p");

		if (trim($_POST["search"]["value"]) == "") {
			$dao->FiltrarIzquierda("apellido", "A", "");
		} else {
			$dao->FiltrarIzquierda("apellido", $_POST["search"]["value"], "");
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar('CONCAT(apellido," ",apellido_materno," ",nombre)');
		$respuesta = $dao->Consultar();

		$total = 0;
		$totalfiltrado = 0;
		$data = array();
		foreach ($respuesta as $row => $item) {
			$totalfiltrado++;

			if ($item[5] == 6) {
				$item[4] = '<input type="checkbox" class="chSexo" idGenero=6 checked idPaciente="' . $item[3] . '">';
			} else {
				$item[4] = '<input type="checkbox" class="chSexo" idGenero=6 idPaciente="' . $item[3] . '">';
			}
			if ($item[5] == 5) {
				$item[3] = '<input type="checkbox" class="chSexo" idGenero=5 checked idPaciente="' . $item[3] . '">';
			} else {
				$item[3] = '<input type="checkbox" class="chSexo" idGenero=5 idPaciente="' . $item[3] . '">';
			}

			$data[] = $item;
		}


		$dao = new Dao();
		$dao->Contar();
		$dao->Tabla("paciente", "p");
		if (trim($_POST["search"]["value"]) == "") {
			$dao->FiltrarIzquierda("apellido", "A", "");
		} else {
			$dao->FiltrarIzquierda("apellido", $_POST["search"]["value"], "");
		}
		$respuesta = $dao->Consultar();
		foreach ($respuesta as $row => $item) {
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


	if ($_POST['Requerimiento'] == "ActualizarSexo") {

		$datos = array(
			"id_genero2" => $_POST["Genero"],
			"usuario_modifico" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("paciente", $datos, "id=" . $_POST['Paciente'], $_POST['Paciente']);
	}

	if ($_POST['Requerimiento'] == "CargarPacienteSelect") {

		$dao = new Dao();
		$dao->Campo('CONCAT(cedula," ",apellido," ",apellido_materno," ",nombre)', "paciente");
		$dao->Campo("id", "");

		$dao->Tabla("paciente", "p");

		$dao->Filtrar('CONCAT(apellido," ",apellido_materno," ",nombre," ",cedula)', $_POST["q"], "");
		$dao->Ordenar('CONCAT(apellido," ",apellido_materno," ",nombre)');
		$dao->Limite("200");

		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "UnificarHCU") {

		$datos = array("id_paciente" => $_POST["PacienteUnificar"]);

		$dao = new Dao();
		$dao->Modificar("consulta", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("farmacia", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("ginecostetrico", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("hc_paciente", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("nc_consulta", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("nc_farmacia", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("orden", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("orden_odon", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("paciente_alergia", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("paciente_enfermedad", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("paciente_historico", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("paciente_odontograma", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("receta", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("resultado_eco", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("resultado_laboratorio", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("resultado_rx", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("resultado_tomo", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("signo", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->Modificar("reservaciones", $datos, "id_paciente=" . $_POST['PacienteEliminar'], 0);

		$dao = new Dao();
		$dao->EliminarAjax("paciente", $_POST['PacienteEliminar']);
	}

	function Escribir($texto){
        $myfile = fopen("debug.txt", "w") or die("Unable to open file!");        
        fwrite($myfile, $texto."\n");        
        fclose($myfile);
    }

	if ($_POST['Requerimiento'] == "ExportarDatos") {
		$c = new Conexion();
		$conexion = $c->conectar();

		$writer = WriterEntityFactory::createXLSXWriter();
		$ruta = '../documentos/Pacientes_' . date("Y-m-d H m i") . ".xlsx";
		//$writer->openToBrowser('Pacientes_'.date("Y-m-d H m i").".xlsx");
		$writer->openToFile($ruta);
		$dao = new Dao();

		$dao->Campo("p.id", "");
		$dao->Campo("p.cedula", "");
		$dao->Campo("p.apellido", "");
		$dao->Campo("p.apellido_materno", "");
		$dao->Campo("p.nombre", "");
		$dao->Campo("p.email", "");
		$dao->Campo("p.direccion", "");
		$dao->Campo("p.telefono", "");
		$dao->Campo("p.ocupacion", "");
		$dao->Campo("c.nombre", "");
		$dao->Campo("p.estado_civil", "");
		$dao->Campo("Date_format(p.fecha_nacimiento,'%Y-%m-%d')", "");
		$dao->Campo("g.nombre", "");
		$dao->Campo("p.fecha_registro", "");
		$dao->TablasInnerAlias("paciente", "p", "canton", "c");
		$dao->TablasInnerAlias("paciente", "p", "genero2", "g");
		$dao->In_Where("p.id_estado", "1,16", "");

		$query = $dao->Consultar2();


		$headerRow = ["HCU", "CEDULA", "APELLIDO PATERNO", "APELLIDO MATERNO", "NOMBRES", "EMAIL", "DIRECCION", "TELEFONO", "OCUPACION", "CANTON", "ESTADO CIVIL", "FECHA DE NACIMIENTO", "GENERO", "FECHA DE REGISTRO"];

		$headerStyle = (new StyleBuilder())->setFontBold()->build();
		$cabecera = WriterEntityFactory::createRowFromArray($headerRow, $headerStyle);
		$writer->addRow($cabecera);

		$idFieldName = 'p.id';
		$iterador = new Iterador($conexion, $query, $idFieldName, 1000);

		foreach ($iterador as $dbRows) {
			foreach ($dbRows as $dbRow) {
				$reportRow = array();
				for ($i = 0; $i < count($dbRow); $i++) {
					if (isset($dbRow[$i])) {
						$reportRow[] = $dbRow[$i];
					}
				}
				$rowFromValues = WriterEntityFactory::createRowFromArray($reportRow);
				$writer->addRow($rowFromValues);
			}
		}
		$writer->close();
		$jsondata = ["0" => substr($ruta, 3)];
		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}
	function TotalConsultasHastaHoy($paciente){
		$dao = new Dao();
		$dao->Campo("COUNT(*)", "");
		$dao->Tabla("consulta", "c");
		$dao->Where("c.id_paciente",$paciente, "");
		$respuesta = $dao->Consultar();
		$total = 0;
		foreach ($respuesta as $row => $item) {
			$total = $item[0];
		}
		return $total;
	}
	if ($_POST['Requerimiento'] == "CargarPacientesNuevos") {

		$dao = new Dao();

		$dao->Campo("p.id", "");
		$dao->Campo("p.cedula", "");
		$dao->Campo("concat(p.apellido,' ',p.apellido_materno,' ',p.nombre)", "");
		$dao->Campo("p.direccion", "");
		$dao->Campo("p.telefono", "");
		$dao->Campo("p.email", "");
		$dao->Campo("p.fecha_registro", "");
		$dao->Campo("COUNT(DISTINCT(c.id))", "");
		$dao->TablasInnerAlias("consulta","c","paciente", "p");
		$dao->TablasInnerAliasOtra("consulta_item", "ci", "consulta", "c");
		$dao->In_Where("p.id_estado", "1,16", "and");
		$dao->In_Diferente("c.id_estado", "21", "and");
		$dao->Filtrar("concat(p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',p.cedula,' ',p.id)", $_POST["search"]["value"], "and");

		if (trim($_POST['columns'][1]["search"]["value"]) == "") {
			$dao->Where("CONVERT(p.fecha_registro,DATE)", 'CURDATE()', "");
		} else {
			if ($_POST['columns'][3]["search"]["value"] == 1 || $_POST['columns'][3]["search"]["value"] == 2 || $_POST['columns'][3]["search"]["value"] == 3 ) {
				$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "pr");
				$dao->TablasInnerAlias("procedimiento", "pr", "especialidad", "e");
			}
			if ($_POST['columns'][3]["search"]["value"] == 4) {
				$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento_laboratorio", "pr");
				$dao->TablasInnerAlias("procedimiento_laboratorio", "pr", "grupo_examen", "e");
			}
			if ($_POST['columns'][3]["search"]["value"] == 5) {
				$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento_rx", "pr");
				$dao->TablasInnerAlias("procedimiento_rx", "pr", "grupo_rx", "e");
			}
			if ($_POST['columns'][3]["search"]["value"] == 6) {
				$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento_eco", "pr");
				$dao->TablasInnerAlias("procedimiento_eco", "pr", "grupo_eco", "e");
			}
			if ($_POST['columns'][3]["search"]["value"] == 7) {
				$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento_tomo", "pr");
				$dao->TablasInnerAlias("procedimiento_tomo", "pr", "grupo_tomo", "e");
			}
			if ($_POST['columns'][4]["search"]["value"] != 0) {
				$dao->Where("e.id", $_POST['columns'][4]["search"]["value"], "and");
			}
			if ($_POST['columns'][3]["search"]["value"] == 1) {
				$dao->Where("e.id_tipo_servicio", "1", "and");
			}
			if ($_POST['columns'][3]["search"]["value"] == 2) {
				$dao->Where("e.id_tipo_servicio", "13", "and");
			}
			if ($_POST['columns'][3]["search"]["value"] == 3) {
				$dao->Where("e.id_tipo_servicio", "14", "and");
			}
			$dao->Entre("CONVERT(p.fecha_registro,DATE)", "'" . $_POST['columns'][1]["search"]["value"] . "'", "'" . $_POST['columns'][2]["search"]["value"] . "'", "");
		}

		$dao->Agrupar("p.id");
		$respuesta = $dao->Consultar();
		
		$data = array();

		$total = 0;
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
	if ($_POST['Requerimiento'] == "CargarPacientesPorDiagnostico") {

		$dao = new Dao();

		$dao->Campo("CONVERT(d.fecha_registro,DATE)", "");
		$dao->Campo("concat(p.apellido,' ',p.apellido_materno,' ',p.nombre)", "");
		$dao->Campo("p.direccion", "");
		$dao->Campo("p.telefono", "");
		$dao->Campo("c.descripcion", "");
		$dao->Campo("d.procedimiento", "");
		$dao->Campo("pe.enfermedad", "");
		
		$dao->TablasInnerAlias("paciente_enfermedad","pe","paciente", "p");
		$dao->TablasInnerAliasOnNativo("paciente_enfermedad","pe","diagnostico", "d","pe.id_consulta_item=d.id_consulta_item");
		$dao->TablasInnerAlias("diagnostico","d","cie", "c");
		
		$dao->Filtrar("concat(p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',p.cedula,' ',d.procedimiento,' ',c.descripcion)", $_POST["search"]["value"], "and");

		if (trim($_POST['columns'][1]["search"]["value"]) == "") {
			$dao->Where("CONVERT(d.fecha_registro,DATE)", 'CURDATE()', "");
		} else {
			if ($_POST['columns'][3]["search"]["value"] != "" && $_POST['columns'][3]["search"]["value"] !="0" && $_POST['columns'][3]["search"]["value"] !="null" ) {
				$dao->Where("c.id", $_POST['columns'][3]["search"]["value"], "and");
			}
			if ($_POST['columns'][4]["search"]["value"] != "" && $_POST['columns'][4]["search"]["value"] !="Todos" ) {
				$dao->Where("d.procedimiento","'". $_POST['columns'][4]["search"]["value"]."'", "and");
			}
			$dao->Entre("CONVERT(d.fecha_registro,DATE)", "'" . $_POST['columns'][1]["search"]["value"] . "'", "'" . $_POST['columns'][2]["search"]["value"] . "'", "");
		}

		$respuesta = $dao->Consultar();
		
		$data = array();

		$total = 0;
		foreach ($respuesta as $row => $item) {
			$total++;
			//$item[6] = '<button consultaitem=' . $item[6] . ' class="btn btn-sm btn-warning col-md-12 nopadding">Ver</button>';
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
