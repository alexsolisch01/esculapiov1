<?php
session_start();
require_once "autoloadAjax.php";

if (isset($_POST['Requerimiento'])) {



	if ($_POST['Requerimiento'] == "GuardaEmpleado") {


		$ruta = "";
		$ruta2 = "";
		if (!isset($_FILES['Foto'])) {
			$ruta = "../imagenes/USUARIOS/user.png";
		} else {
			$subir = new SubirArchivo();
			$ruta = $subir->SubirFotos("USUARIOS", $_POST["Nombres"], $_FILES["Foto"]);
		}

		if (!isset($_FILES['Firma'])) {
			$ruta2 = "../imagenes/USUARIOS/user.png";
		} else {
			$subir2 = new SubirArchivo();
			$ruta2 = $subir2->SubirFotos("USUARIOS", $_POST["Nombres"], $_FILES["Firma"]);
		}

		$datos = array(
			"cedula" => $_POST["Cedula"],
			"nombres" => $_POST["Nombres"],
			"apellidos" => $_POST["Apellidos"],
			"telefono" => $_POST["Telefono"],
			"email" => $_POST["Correo"],
			"direccion" => $_POST["Direccion"],
			"fecha_nacimiento" => $_POST["FechaNac"],
			"foto" => substr($ruta, 3),
			"firma" => substr($ruta2, 3),
			"id_estado" => 1,
			"id_establecimiento" => $_SESSION["establecimiento"],
			"usuario_registro" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->GuardarAjax("empleado", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarMedico") {

		$ruta = "";
		$ruta2 = "";
		if (!isset($_FILES['Foto'])) {
			$ruta = "../imagenes/USUARIOS/user.png";
		} else {
			$subir = new SubirArchivo();
			$ruta = $subir->SubirFotos("USUARIOS", $_POST["Nombres"], $_FILES["Foto"]);
		}

		if (!isset($_FILES['Firma'])) {
			$ruta2 = "../imagenes/firmamedico.png";
		} else {
			$subir2 = new SubirArchivo();
			$ruta2 = $subir2->SubirFotos("FIRMAS", $_POST["Nombres"], $_FILES["Firma"]);
		}


		$datos = array(
			"cedula" => $_POST["Cedula"],
			"nombres" => $_POST["Nombres"],
			"apellidos" => $_POST["Apellidos"],
			"telefono" => $_POST["Telefono"],
			"email" => $_POST["Correo"],
			"direccion" => $_POST["Direccion"],
			"fecha_nacimiento" => $_POST["FechaNac"],
			"foto" => substr($ruta, 3),
			"firma" => substr($ruta2, 3),
			"id_estado" => 5,
			"id_establecimiento" => $_SESSION["establecimiento"],
			"usuario_registro" => $_SESSION["usuario"],
			"sanitario" => $_POST["Sanitario"],
			"codigo" => $_POST["Codigo"],
			"sistema" => $_POST["Sistema"]
		);
		$dao = new Dao();
		$dao->GuardarAjax("empleado", $datos);
	}

	if ($_POST['Requerimiento'] == "ModificaEmpleado") {

		$ruta = "";
		$datos = array(
			"cedula" => $_POST["Cedula"],
			"nombres" => $_POST["Nombres"],
			"apellidos" => $_POST["Apellidos"],
			"telefono" => $_POST["Telefono"],
			"email" => $_POST["Correo"],
			"direccion" => $_POST["Direccion"],
			"fecha_nacimiento" => $_POST["FechaNac"],

			"firma" => "",
			"usuario_modifico" => $_SESSION["usuario"]
		);

		if (!isset($_FILES['Foto'])) {
			$ruta = "../imagenes/USUARIOS/user.png";
		} else {
			$subir = new SubirArchivo();
			$ruta = $subir->SubirFotos("USUARIOS", $_POST["Nombres"], $_FILES["Foto"]);
			$datos["foto"] = substr($ruta, 3);
		}


		$dao = new Dao();
		$dao->ModificarAjax("empleado", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ModificaMedico") {

		$ruta = "";
		$datos = array(
			"cedula" => $_POST["Cedula"],
			"nombres" => $_POST["Nombres"],
			"apellidos" => $_POST["Apellidos"],
			"telefono" => $_POST["Telefono"],
			"email" => $_POST["Correo"],
			"direccion" => $_POST["Direccion"],
			"codigo" => $_POST["Codigo"],
			"fecha_nacimiento" => $_POST["FechaNac"],
			"sanitario" => $_POST["Sanitario"],
			"sistema" => $_POST["Sistema"],
			"firma" => "",
			"usuario_modifico" => $_SESSION["usuario"]
		);

		if (!isset($_FILES['Foto'])) {
			$ruta = "../imagenes/USUARIOS/user.png";
		} else {
			$subir = new SubirArchivo();
			$ruta = $subir->SubirFotos("USUARIOS", $_POST["Nombres"], $_FILES["Foto"]);
			$datos["foto"] = substr($ruta, 3);
		}


		if (!isset($_FILES['Firma'])) {
			$ruta2 = "../imagenes/USUARIOS/user.png";
		} else {
			$subir2 = new SubirArchivo();
			$ruta2 = $subir2->SubirFotos("FIRMAS", $_POST["Nombres"], $_FILES["Firma"]);
			$datos["firma"] = substr($ruta2, 3);
		}



		$dao = new Dao();
		$dao->ModificarAjax("empleado", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ValidarExisteCodigo") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Tabla("empleado", "");
		$dao->Where("id_estado", "5", "and");
		if ($_POST["Id"] != 0) {
			$dao->Diferente("id", $_POST["Id"], "and");
		}
		$dao->Where("codigo", "'" . $_POST["Codigo"] . "'", "");


		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CambiarFoto") {

		$ruta = "";
		if (!isset($_FILES['Foto'])) {
			$ruta = "../imagenes/USUARIOS/user.png";
		} else {
			$subir = new SubirArchivo();
			$ruta = $subir->SubirFotos("USUARIOS", $_SESSION["nombres"], $_FILES["Foto"]);
			$datos["foto"] = substr($ruta, 3);
			$_SESSION["foto"] = substr($ruta, 3);
		}

		$dao = new Dao();
		$dao->ModificarAjax("empleado", $datos, "id=" . $_SESSION["empleado"], $_SESSION["empleado"]);
	}

	function EliminarHorarioEspecialidad($empleado, $especialidad)
	{
		$dao = new Dao();

		$dao->Campo("mh.id", "");
		$dao->TablasInnerAlias("medico_especialidad_horario", "mh", "medico_especialidad ", "ms");
		$dao->Where("ms.id_empleado", $empleado, "and");
		$dao->Where("ms.id_especialidad", $especialidad, "");
		$respuesta = $dao->Consultar();
		foreach ($respuesta as $row => $item) {
			$dao->Eliminar("medico_especialidad_horario", "id=" . $item[0]);
		}
	}
	function EliminarProcedimientoEspecialidad($empleado, $especialidad)
	{
		$dao = new Dao();

		$dao->Campo("mp.id", "");
		$dao->TablasInnerAlias("medico_procedimiento", "mp", "procedimiento ", "p");
		$dao->Where("mp.id_empleado", $empleado, "and");
		$dao->Where("p.id_especialidad", $especialidad, "");
		$respuesta = $dao->Consultar();
		foreach ($respuesta as $row => $item) {
			$dao->Eliminar("medico_procedimiento", "id=" . $item[0]);
		}
	}
	if ($_POST['Requerimiento'] == "AgregarEspecialidad") {

		if ($_POST["Accion"] == "Agregar") {
			$datos = array(
				"id_empleado" => $_POST["Empleado"],
				"id_estado" => 1,
				"id_especialidad" => $_POST["Especialidad"],
				"id_tipo_relacion" => $_POST["Relacion"]
			);

			EliminarHorarioEspecialidad($_POST["Empleado"], $_POST["Especialidad"]);
			EliminarProcedimientoEspecialidad($_POST["Empleado"], $_POST["Especialidad"]);
			$dao = new Dao();
			$dao->Eliminar("medico_especialidad", "id_empleado=" . $_POST["Empleado"] . " and id_especialidad = " . $_POST["Especialidad"]);
			$dao->GuardarAjax("medico_especialidad", $datos);
		} else {
			EliminarHorarioEspecialidad($_POST["Empleado"], $_POST["Especialidad"]);
			EliminarProcedimientoEspecialidad($_POST["Empleado"], $_POST["Especialidad"]);
			$dao = new Dao();
			$dao->Eliminar("medico_especialidad", "id_empleado=" . $_POST["Empleado"] . " and id_especialidad = " . $_POST["Especialidad"]);
			echo true;
		}
	}
	if ($_POST['Requerimiento'] == "ActualizarDatosMedico") {

		$array = json_decode($_POST["Detalle"], true);
		for ($i = 0; $i < sizeof($array); $i++) {
			$producto = $array[$i];

			$dao = new Dao();

			$dao->Campo("id", "");
			$dao->Tabla("medico_especialidad","");
			$dao->Where("id_empleado", $_POST["Empleado"], "and");
			$dao->Where("id_especialidad", $producto[0], "");
			$respuesta = $dao->Consultar();
			$confirma = true;
			foreach ($respuesta as $row => $item) {
				
				$datos = array(
					"id_empleado" => $_POST["Empleado"],
					"id_estado" => 1,
					"id_tipo_relacion" => $producto[1]
				);
				$dao->Modificar("medico_especialidad", $datos,"id = ".$item[0],0);
				$confirma = false;
			}
			if($confirma){
				$datos = array(
					"id_empleado" => $_POST["Empleado"],
					"id_estado" => 1,
					"id_especialidad" => $producto[0],
					"id_tipo_relacion" => $producto[1]
				);
				$dao->Guardar("medico_especialidad", $datos,false);
			}
		}
		$jsondata = [];
		$jsondata[] = true;
		echo json_encode($jsondata,JSON_FORCE_OBJECT);
	}
	if ($_POST['Requerimiento'] == "AgregarProcedimiento") {

		if ($_POST["Accion"] == "Agregar") {
			$datos = array(
				"id_empleado" => $_POST["Empleado"],
				"id_procedimiento" => $_POST["Procedimiento"],
				"tipo" => $_POST["Tipo"],
				"valor" => $_POST["Valor"]
			);
			$dao = new Dao();
			$dao->Eliminar("medico_procedimiento", "id_empleado=" . $_POST["Empleado"] . " and id_procedimiento = " . $_POST["Procedimiento"]);
			$dao->GuardarAjax("medico_procedimiento", $datos);
		} else {
			$dao = new Dao();
			$dao->Eliminar("medico_procedimiento", "id_empleado=" . $_POST["Empleado"] . " and id_procedimiento = " . $_POST["Procedimiento"]);
			echo true;
		}
	}

	if ($_POST['Requerimiento'] == "EliminarEmpleadoEsp") {

		$dao = new Dao();

		$dao->Campo("mh.id", "");

		$dao->TablasInnerAlias("medico_especialidad", "ms", "empleado", "e");
		$dao->TablasInnerAliasOtra("medico_especialidad_horario", "mh", "medico_especialidad", "ms");
		$dao->Where("e.id", $_POST["Empleado"], "");

		$respuesta = $dao->Consultar();


		try {
			if ($respuesta != "") {
				foreach ($respuesta as $row => $item) {

					$dao->Eliminar("medico_especialidad_horario", "id=" . $item[0]);
				}
			}
		} catch (Exception $e) {
		}
		$jsondata = array();
		//$dao->Eliminar("medico_procedimiento","id_empleado=".$_POST["Empleado"]);
		$jsondata[0] = $dao->Eliminar("medico_especialidad", "id_empleado=" . $_POST["Empleado"]);

		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}

	function CargarIdMedicoEspecialidad($empleado, $especialidad)
	{
		$dao = new Dao();

		$dao->Campo("ms.id", "");
		$dao->Tabla("medico_especialidad ", "ms");
		$dao->Where("ms.id_empleado", $empleado, "and");
		$dao->Where("ms.id_especialidad", $especialidad, "");
		$respuesta = $dao->Consultar();
		$id = 0;
		foreach ($respuesta as $row => $item) {
			$id = $item[0];
		}
		return $id;
	}
	if ($_POST['Requerimiento'] == "GuardarHorario") {

		$datos = array(
			"id_medico_especialidad" => CargarIdMedicoEspecialidad($_POST["Empleado"], $_POST["Especialidad"]),
			"id_estado" => 1,
			"dia" => $_POST["Dia"],
			"horaI" => $_POST["HoraI"],
			"horaF" => $_POST["HoraF"],
			"turnos" => $_POST["Turnos"]
		);
		$dao = new Dao();
		$dao->GuardarAjax("medico_especialidad_horario", $datos);
	}
	if ($_POST['Requerimiento'] == "EliminarHorario") {

		$jsondata = array();
		$dao = new Dao();
		$jsondata[0] = $dao->Eliminar("medico_especialidad_horario", "id=" . $_POST["Id"]);
		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}

	if ($_POST['Requerimiento'] == "GuardarMedicoProce") {

		$dao = new Dao();


		$datos = array(
			"id_empleado" => $_POST["Empleado"],
			"id_procedimiento" => $_POST["Procedimiento"],
			"tipo" => $_POST["Tipo"],
			"valor" => $_POST["Valor"]
		);

		$dao->GuardarAjax("medico_procedimiento", $datos);
	}

	if ($_POST['Requerimiento'] == "EliminarMedicoProce") {

		$jsondata = array();
		$dao = new Dao();
		$jsondata[0] = $dao->Eliminar("medico_procedimiento", "id_empleado=" . $_POST["Empleado"]);

		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}

	if ($_POST['Requerimiento'] == "CargarEspecialidadesMedico") {


		$dao = new Dao();

		$dao->Campo("id_especialidad", "");
		$dao->Campo("id_tipo_relacion", "");
		$dao->Campo("id", "");
		$dao->Tabla("medico_especialidad", "");
		$dao->Where("id_empleado", $_POST['Empleado'], "");


		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarProcedimientosMedico") {


		$dao = new Dao();

		$dao->Campo("mp.id_procedimiento", "");
		$dao->Campo("mp.tipo", "");
		$dao->Campo("mp.valor", "");
		$dao->TablasInnerAlias("medico_procedimiento", "mp", "procedimiento", "p");
		$dao->Where("mp.id_empleado", $_POST['Empleado'], "and");
		$dao->Where("p.id_especialidad", $_POST['Especialidad'], "");


		$dao->ConsultarAjax();
	}


	if ($_POST['Requerimiento'] == "CargarEspecialidadesMedicoHorarios") {


		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("dia", "");
		$dao->Campo("horaI", "");
		$dao->Campo("horaF", "");
		$dao->Campo("turnos", "");
		$dao->Tabla("medico_especialidad_horario", "");
		$dao->Where("id_medico_especialidad", $_POST['EmpleadoEspe'], "");


		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarProcedimientos") {


		$dao = new Dao();

		$dao->Campo("p.id", "");
		$dao->Campo("p.nombre", "");
		$dao->Campo("p.descripcion", "");
		$dao->Campo("p.precio", "");
		$dao->Campo("s.nombre", "");
		$dao->TablasInnerAlias("procedimiento", "p", "especialidad", "s");
		$dao->Where("s.id", $_POST['Especialidad'], "AND");
		$dao->Where("s.id_estado", 1, "");

		/*$jsondata = array();

		$jsondata[0]=$dao->Consultar2();
		echo json_encode($jsondata, JSON_FORCE_OBJECT);*/
		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "EliminaEmpleado") {

		$datos = array("id_estado" => 2);

		$dao = new Dao();
		$dao->ModificarAjax("empleado", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminarMedico") {

		$dao = new Dao();
		$dao->EliminarAjax("empleado", $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "CargarComboRelacion") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Tabla("tipo_relacion", "");
		$dao->Where("id_estado", 1, "");


		$dao->ConsultarAjax();
	}

	function CargarEspe($idEmpleado)
	{
		$dao = new Dao();

		$dao->Campo("e.nombre", "");
		$dao->Campo("tr.nombre", "");

		$dao->TablasInnerAlias("medico_especialidad", "me", "especialidad", "e");
		$dao->TablasInnerAlias("medico_especialidad", "me", "tipo_relacion", "tr");
		$dao->Where("me.id_estado", "1", "and");
		$dao->Where("me.id_empleado", $idEmpleado, "");
		//$dao->Ordenar("apellidos");

		$respuesta = $dao->Consultar();

		$jsondata = '';
		$i = 0;
		foreach ($respuesta as $row => $item) {
			$jsondata .= $item[0] . ' - ' . $item[1] . '<br>';
			$i++;
		}

		return $jsondata;
	}

	if ($_POST['Requerimiento'] == "CargarMedicosProce") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("cedula", "");
		$dao->Campo("apellidos", "");
		$dao->Campo("nombres", "");


		$dao->Tabla("empleado", "");
		$dao->Where("id_estado", "5", "");

		$respuesta = $dao->Consultar();


		$jsondata = array();
		$i = 0;

		foreach ($respuesta as $row => $item) {

			$datos = array();

			$datos[0] = $item[0];
			$datos[1] = $item[1];
			$datos[2] = $item[2];
			$datos[3] = $item[3];
			$datos[4] = CargarEspe($item["id"]);

			$jsondata[$i] = $datos;
			$i++;
		}
		echo json_encode($jsondata);
	}

	if ($_POST['Requerimiento'] == "CargarTablaJSH") {

		$dao = new Dao();

		$dao->Campo("mh.dia", "");
		$dao->Campo("mh.horaI", "");
		$dao->Campo("mh.horaF", "");
		$dao->Campo("mh.turnos", "");
		$dao->Campo("0", "borrar");
		$dao->Campo("mh.id", "");
		$dao->TablasInnerAlias("medico_especialidad_horario", "mh", "medico_especialidad", "ms");

		$dao->Where("mh.id_estado", "1", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("Concat(mh.dia,' ',mh.turnos)", $_POST["search"]["value"], "and");
			}
		}
		if (trim($_POST['columns'][1]["search"]["value"]) == "") {
			$dao->Where("1", "2", "");
		} else {
			$dao->Where("ms.id_empleado", $_POST['columns'][1]["search"]["value"], "and");
			$dao->Where("ms.id_especialidad", $_POST['columns'][2]["search"]["value"], "");
		}
		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$respuesta = $dao->Consultar();
		$data = array();

		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;
			$item[4] = '<button id="' . $item[5] . '" class="btn btn-sm btn-danger EliminarH"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
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

	if ($_POST['Requerimiento'] == "CargarTablaJSProcedimientos") {

		$dao = new Dao();


		$dao->Campo("p.nombre", "");
		$dao->Campo("p.precio", "");
		$dao->Campo("0", "combo");
		$dao->Campo("0", "input");
		$dao->Campo("0", "input2");
		$dao->Campo("p.id", "");

		$dao->Tabla("procedimiento", "p");
		$dao->Diferente("p.id_estado", "2", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("Concat(p.nombre,' ',p.precio)", $_POST["search"]["value"], "and");
			}
		}
		if (trim($_POST['columns'][1]["search"]["value"]) == "") {
			$dao->Where("1", "2", "");
		} else {
			$dao->Where("p.id_especialidad", $_POST['columns'][1]["search"]["value"], "");
		}
		if ($_POST["length"] != -1) {
			//$dao->Limite($_POST['start'].",".$_POST['length']);  
		}

		$respuesta = $dao->Consultar();
		$data = array();

		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;
			$item[2] = '<select class="cbmTipo"><option value="PORCENTAJE">%</option><option value="VALOR">$</option></select>';
			$item[3] = ' <input style="width: 50px;" type="number" class="Valor" placeholder="Valor"> ';
			$item[4] = ' <input type="checkbox" id="' . $item[5] . '" class="chProcdimiento"> ';
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
	function Escribir($texto)
	{
		$myfile = fopen("debug.txt", "w") or die("Unable to open file!");
		fwrite($myfile, $texto . "\n");
		fclose($myfile);
	}
	if ($_POST['Requerimiento'] == "ValidarSiTieneAgendado") {
		$dia = $_POST["Dia"];
		switch ($dia) {
			case "LUNES":
				$dia = "Monday";
				break;
			case "MARTES":
				$dia = "Tuesday";
				break;
			case "MIERCOLES":
				$dia = "Wednesday";
				break;
			case "JUEVES":
				$dia = "Thursday";
				break;
			case "VIERNES":
				$dia = "Friday";
				break;
			case "SABADO":
				$dia = "Saturday";
				break;
			case "DOMINGO":
				$dia = "Sunday";
				break;
			default:
				break;
		}
		$dao = new Dao();
		$dao->Campo("ci.id", "");
		$dao->TablasInnerAlias("consulta_item", "ci", "procedimiento", "p");
		$dao->Where("p.id_especialidad", $_POST["Especialidad"], "and");
		$dao->Where("ci.id_empleado", $_POST["Empleado"], "and");
		$dao->MayorIgual("ci.fecha_atencion", "CURDATE()", "and");
		if ($_POST["Dia"] != "") {
			$dao->Where("DAYNAME(ci.fecha_atencion)", "'" . $dia . "'", "and");
		}
		$dao->IN_Diferente("ci.id_estado", "19,25", "");
		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CargarTablaEmpleadoJS") {

		$dao = new Dao();

		$dao->Campo("id", ""); //0
		$dao->Campo("cedula", ""); //1
		$dao->Campo("nombres", ""); //2
		$dao->Campo("apellidos", ""); //3
		$dao->Campo("telefono", ""); //4
		$dao->Campo("email", ""); //5
		$dao->Campo("usuario_registro", ""); //6
		$dao->Campo("fecha_registro", ""); //7
		$dao->Campo("direccion", ""); //8
		$dao->Campo("foto", ""); //9
		$dao->Campo("firma", ""); //10
		$dao->Campo("Date_format(fecha_nacimiento,'%Y-%m-%d')", ""); //11

		$dao->Tabla("empleado", "");
		$dao->Where("id_estado", "1", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("concat(apellidos,' ',nombres)", $_POST["search"]["value"], "");
			}
		}

		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;

			/*$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';*/
			
			$editar = '<button class="action-btn edit btnEditar" registro="' . $item[0] . '" title="Modificar"><i class="fa fa-pencil"></i></button>';
			$eliminar = '<button class="action-btn delete btnEliminar" registro="' . $item[0] . '" title="Eliminar"><i class="fa fa-trash-o"></i></button>';
		
			$item[0] = $editar . $eliminar;
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
	if ($_POST['Requerimiento'] == "CargarTablaMedicoJS") {

		$dao = new Dao();

		$dao->Campo("id", ""); //0
		$dao->Campo("cedula", ""); //1
		$dao->Campo("apellidos", ""); //2
		$dao->Campo("nombres", ""); //3
		$dao->Campo("telefono", ""); //4
		$dao->Campo("email", ""); //5
		$dao->Campo("usuario_registro", ""); //6
		$dao->Campo("fecha_registro", ""); //7
		$dao->Campo("direccion", ""); //8
		$dao->Campo("foto", ""); //9
		$dao->Campo("firma", ""); //10
		$dao->Campo("Convert(fecha_nacimiento,date)", ""); //11
		$dao->Campo("sanitario", ""); //12		
		$dao->Campo("sistema", ""); //13
		$dao->Campo("codigo", ""); //14

		$dao->Tabla("empleado", "");
		$dao->Where("id_estado", "5", "and");
		$dao->Filtrar("concat(apellidos,' ',nombres)", $_POST["search"]["value"], "");

		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;

			/*$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';*/
			$editar = '<button class="action-btn edit btnEditar" registro="' . $item[0] . '" title="Modificar"><i class="fa fa-pencil"></i></button>';
			$eliminar = '<button class="action-btn delete btnEliminar" registro="' . $item[0] . '" title="Eliminar"><i class="fa fa-trash-o"></i></button>';
			
			$item[0] = $editar . $eliminar;
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
	if ($_POST['Requerimiento'] == "CargarTablaMedicoAsignacionJS") {

		$dao = new Dao();

		$dao->Campo("foto", ""); //0
		$dao->Campo("Concat(apellidos,' ',nombres)", ""); //1
		$dao->Campo("id", ""); //2
		$dao->Campo("firma", ""); //3
		$dao->Campo("cedula", ""); //4
		$dao->Campo("nombres", ""); //5
		$dao->Campo("apellidos", ""); //6
		$dao->Campo("telefono", ""); //7
		$dao->Campo("email", ""); //8
		$dao->Campo("direccion", ""); //9
		$dao->Campo("Convert(fecha_nacimiento,date)", ""); //10
		$dao->Campo("sanitario", ""); //11
		$dao->Campo("sistema", ""); //12
		$dao->Campo("codigo", ""); //13
		$dao->Campo("foto", ""); //14

		$dao->Tabla("empleado", "");
		$dao->Where("id_estado", "5", "and");
		$dao->Filtrar("concat(apellidos,' ',nombres)", $_POST["search"]["value"], "");
		$dao->Ordenar("2");
		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;

			//$editar = ' <i class="fa fa-eye btn btn-sm btn-success btnEditar" registro="' . $item[2] . '" title="ASIGNAR ESPECIALIDAD"></i> ';
			$editar = '<button class="action-btn edit btnEditar" registro="' . $item[2] . '" title="Asignar Especialidad"><i class="fa fa-pencil"></i></button>';
			$item[0] = '<div class="user-block"><img class="img-circle img-bordered-sm" src="' . $item[0] . '"></div>';
			$item[2] = $editar;
			
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

	if ($_POST['Requerimiento'] == "ObtenerDatosMedico") {

		$dao = new Dao();

		$dao->Campo("firma", ""); //0
		$dao->Campo("cedula", ""); //1
		
		$dao->Tabla("empleado", "");
		//$dao->Where("id_estado", "5", "and");
		$dao->Filtrar("concat(apellidos,' ',nombres)",$_POST["Medico"], "");
		
		$respuesta = $dao->Consultar();
		$data = array();
		
		foreach ($respuesta as $row => $item) {
			$data[] = $item;
		}
		
		echo json_encode($data,JSON_FORCE_OBJECT);
	}
}
