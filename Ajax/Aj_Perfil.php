<?php

session_start();
require_once "autoloadAjax.php";

if (isset($_POST['Requerimiento'])) {

	if ($_POST['Requerimiento'] == "GuardarPerfil") {

		$datos = array(
			"nombre" => $_POST["Nombre"],
			"descripcion" => $_POST["Descripcion"],
			"id_establecimiento" => $_SESSION['establecimiento'],
			"usuario_registro" => $_SESSION['usuario'],
			"id_estado" => 1
		);

		$dao = new Dao();
		$dao->GuardarAjax("perfil", $datos);
	}

	if ($_POST['Requerimiento'] == "ModificarPerfil") {

		$datos = array(
			"nombre" => $_POST["Nombre"],
			"usuario_modifico" => $_SESSION['usuario'],
			"descripcion" => $_POST["Descripcion"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("perfil", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminarPerfil") {
		$dao = new Dao();
		$dao->EliminarAjax("perfil", $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "InactivarPerfil") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("perfil", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ActivarPerfil") {

		$datos = array("id_estado" => 1);
		$dao = new Dao();
		$dao->ModificarAjax("perfil", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "GuardarPantalla") {

		$datos = array(
			"id_perfil" => $_POST["Perfil"],

			"id_pantalla" => $_POST["Pantalla"]
		);

		$dao = new Dao();
		$dao->GuardarAjax("perfil_pantalla", $datos);
	}

	if ($_POST['Requerimiento'] == "EliminarPantalla") {
		$dao = new Dao();
		$dao->Eliminar("perfil_pantalla", "id_perfil=" . $_POST["Perfil"]);
	}

	if ($_POST['Requerimiento'] == "CargarPantallas") {

		$dao = new Dao();

		$dao->Campo("id_pantalla", "");
		$dao->Tabla("perfil_pantalla", "");
		$dao->Where("id_perfil", $_POST['Perfil'], "");
		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "AgregarPantalla") {

		if ($_POST["Accion"] == "Agregar") {
			$datos = array(
				"id_perfil" => $_POST["Perfil"],
				"id_pantalla" => $_POST["Pantalla"]
			);

			$dao = new Dao();
			$dao->Eliminar("perfil_pantalla", "id_perfil=" . $_POST["Perfil"] . " and id_pantalla = " . $_POST["Pantalla"]);
			$dao->GuardarAjax("perfil_pantalla", $datos);
		} else {
			$dao = new Dao();
			$dao->Eliminar("perfil_pantalla", "id_perfil=" . $_POST["Perfil"] . " and id_pantalla = " . $_POST["Pantalla"]);
			echo true;
		}
	}
	               
	if ($_POST['Requerimiento'] == "CargarTablaPerfilJS") {
		
		$dao = new Dao();
		
		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("descripcion","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("id_estado","");

		$dao->Tabla("perfil","");
		$dao->In_Where("id_estado","1,2","and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("nombre", $_POST["search"]["value"], "");
			}
		}
          
		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;
			
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
}
