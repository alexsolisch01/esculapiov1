<?php

session_start();
require_once "autoloadAjax.php";

if (isset($_POST['Requerimiento'])) {


	if ($_POST['Requerimiento'] == "GuardarEmpresa") {

		$datos = array(
			"razon_social" => $_POST["Razon"],
			"ruc" => $_POST["RucAdmi"],
			"act_comercial" => $_POST["Actividad"],
			"direccion" => $_POST["DireccionEmpre"],
			"telefono" => $_POST["TelefonoEmpre"],
			"tipo_personeria" => $_POST["TipoEmpre"],
			"repre_legal" => $_POST["RepreAdmin"],
			"correo1" => $_POST["CorreoEmpre1"],
			"correo2" => $_POST["CorreoEmpre2"],
			"correo3" => $_POST["CorreoEmpre3"],
			"id_institucion" => $_POST["Institucion"],
			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->GuardarAjax("empresa", $datos);
	}


	if ($_POST['Requerimiento'] == "GuardaEsta") {

		$datos = array(
			"id_empresa" => $_POST["IdEmpresa"],
			"nombre_comercial" => $_POST["NombreComer"],
			"act_comercial" => $_POST["ActividadCome"],
			"id_parroquia" => $_POST["ParroquiaEsta"],
			"area_salud" => $_POST["AreaSalud"],
			"id_licenciamiento" => $_POST["Licenciamiento"],
			"id_tipo_establecimiento" => $_POST["TipoEsta"],
			"direccion" => $_POST["DireccionEm"],
			"telefono" => $_POST["TelefonoEmpre"],
			"correo" => $_POST["CorreoEm"],
			"id_estado" => 1,
			"codigo" => $_POST["Codigo"],
			"usuario_registro" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->GuardarAjax("establecimiento", $datos);
	}

	if ($_POST['Requerimiento'] == "ModificaEmpresa") {

		$ruta1 = "";
		if (isset($_FILES['Logo1'])) {
			$allowed = ["image/jpeg","image/png","image/svg+xml","image/bmp"];

			if (!in_array($_FILES['Logo1']['type'], $allowed)) {
				echo json_encode([false, "Formato inválido"]);
				exit;
			}

			if ($_FILES['Logo1']['size'] > 2097152) {
				echo json_encode([false, "Archivo supera 2MB"]);
				exit;
			}
			$subir = new SubirArchivo();
			$ruta1 = $subir->SubirFotos("USUARIOS", "Logo1" . $_POST['RucAdmi'], $_FILES["Logo1"]);
		}
		$ruta2 = "";
		if (isset($_FILES['Logo2'])) {
			$allowed = ["image/jpeg","image/png","image/svg+xml","image/bmp"];

			if (!in_array($_FILES['Logo2']['type'], $allowed)) {
				echo json_encode([false, "Formato inválido"]);
				exit;
			}

			if ($_FILES['Logo2']['size'] > 2097152) {
				echo json_encode([false, "Archivo supera 2MB"]);
				exit;
			}
			$subir = new SubirArchivo();
			$ruta2 = $subir->SubirFotos("USUARIOS", "Logo2" . $_POST['RucAdmi'], $_FILES["Logo2"]);
		}

		$_SESSION["empresa"] = $_POST["Razon"];
		$_SESSION["horario"] = $_POST["HorarioEmpre"];
		$_SESSION["direccion"] = $_POST["DireccionEmpre"];
		$_SESSION["telefono"] = $_POST["TelefonoEmpre"];

		$_SESSION["correoEmpresa"] = $_POST["CorreoEmpre1"];
		$_SESSION["correoResultados"] = $_POST["CorreoEmpre2"];
		$_SESSION["correoBasura"] = $_POST["CorreoEmpre3"];

		$_SESSION["PsdCorreo1"] = $_POST["PsdCorreo1"];
		$_SESSION["PsdCorreo2"] = $_POST["PsdCorreo2"];
		$_SESSION["PsdCorreo3"] = $_POST["PsdCorreo3"];

		$_SESSION["HostSmtp"] = $_POST["HostSmtp"];
		$_SESSION["PuertoSmtp"] = $_POST["PuertoSmtp"];
		$_SESSION["SmtpSecure"] = $_POST["SmtpSecure"];

		$datos = array(
			"razon_social" => $_POST["Razon"],
			"ruc" => $_POST["RucAdmi"],
			"act_comercial" => $_POST["Actividad"],
			"direccion" => $_POST["DireccionEmpre"],
			"telefono" => $_POST["TelefonoEmpre"],
			"tipo_personeria" => $_POST["TipoEmpre"],
			"repre_legal" => $_POST["RepreAdmin"],
			"correo1" => $_POST["CorreoEmpre1"],
			"correo2" => $_POST["CorreoEmpre2"],
			"correo3" => $_POST["CorreoEmpre3"],
			"psd1" => $_POST["PsdCorreo1"],
			"psd2" => $_POST["PsdCorreo2"],
			"psd3" => $_POST["PsdCorreo3"],
			"host" => $_POST["HostSmtp"],
			"puerto" => $_POST["PuertoSmtp"],
			"smtpsecure" => $_POST["SmtpSecure"],
			"id_institucion" => $_POST["Institucion"],
			"horario" => $_POST["HorarioEmpre"],
			"usuario_modifico" => $_SESSION["usuario"]
		);

		if ($ruta1 != "") {
			$_SESSION["logo1"] = substr($ruta1, 3);
			$datos["logo"] = substr($ruta1, 3);
		}
		if ($ruta2 != "") {
			$_SESSION["logo2"] = substr($ruta2, 3);
			$datos["logo2"] = substr($ruta2, 3);
		}

		$dao = new Dao();
		$dao->ModificarAjax("empresa", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminaEmpresa") {

		$datos = array("id_estado" => 2);

		$dao = new Dao();
		$dao->ModificarAjax("empresa", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ModificaEsta") {

		$datos = array(
			"id_empresa" => 1,
			"nombre_comercial" => $_POST["NombreComer"],
			"act_comercial" => $_POST["ActividadCome"],
			"id_parroquia" => $_POST["ParroquiaEsta"],
			"area_salud" => $_POST["AreaSalud"],
			"id_licenciamiento" => $_POST["Licenciamiento"],
			"id_tipo_establecimiento" => $_POST["TipoEsta"],
			"direccion" => $_POST["DireccionEm"],
			"telefono" => $_POST["TelefonoEmpre"],
			"correo" => $_POST["CorreoEm"],
			"codigo" => $_POST["Codigo"],
			"usuario_modifico" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("establecimiento", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminaEsta") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("establecimiento", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ConsultarEmpresa") {

		$dao = new Dao();

		$dao->Campo(" * ", "");

		$dao->Tabla("empresa", "");
		$dao->Where("id_estado", "1", "");
		$dao->ConsultarAjax();
	}



	///////////////////////PARA EL SRI PARAMETRO.......//////////////////////////////////	

	if ($_POST['Requerimiento'] == "GuardarParametro") {


		$datos = array(
			"parametro" => $_POST["Parametro"],
			"descripcion" => $_POST["Descripcion"],
			"usuario_registro" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->GuardarAjax("parametros", $datos);
	}

	if ($_POST['Requerimiento'] == "CargarTablaEstablecimientoJS") {
		
		$dao = new Dao();
		
		$dao->Campo("e.id","");//0
		$dao->Campo("e.codigo","");//1
		$dao->Campo("e.nombre_comercial","");//2
		$dao->Campo("e.act_comercial","");//3
		$dao->Campo("p.nombre","");//4
		$dao->Campo("e.area_salud","");//5
		$dao->Campo("t.nombre","");//6
		$dao->Campo("l.nombre","");//7
		$dao->Campo("e.direccion","");//8
		$dao->Campo("e.telefono","");//9
		$dao->Campo("e.correo","");//10
		$dao->Campo("pr.nombre","");//11
		$dao->Campo("e.codigo","");//12
		$dao->Campo("t.id","");//13
		$dao->Campo("l.id","");//14
		$dao->Campo("pr.id","");//15
		$dao->Campo("c.id","");//16
		$dao->Campo("p.id","");//17

		$dao->TablasInnerAlias("establecimiento","e","tipo_establecimiento","t");
		$dao->TablasInnerAlias("establecimiento","e","licenciamiento","l");
		$dao->TablasInnerAlias("establecimiento","e","empresa","em");
		$dao->TablasInnerAlias("establecimiento","e","parroquia","p");
		$dao->TablasInnerAlias("parroquia","p","canton","c");
		$dao->TablasInnerAlias("canton","c","provincia","pr");
		$dao->Where("e.id_estado","1","and");
		$dao->Where("em.id_estado","1","and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("e.nombre_comercial", $_POST["search"]["value"], "");
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
	if ($_POST['Requerimiento'] == "CargarTablaPuntoVentaJS") {
		
		$dao = new Dao();
		
		$dao->Campo("p.id","");//0
		$dao->Campo("e.nombre_comercial","");//1
		$dao->Campo("pe.secuencia","");//2
		$dao->Campo("p.nombre","");//3
		$dao->Campo("p.ambiente","");//4
		$dao->Campo("p.secuencia_fc","");//5
		$dao->Campo("p.secuencia_nc","");//6
		$dao->Campo("p.secuencia_nb","");//7
		$dao->Campo("p.secuencia_re","");//8
		$dao->Campo("p.impresora","");//9
		$dao->Campo("p.usuario_registro","");//10
		$dao->Campo("p.fecha_registro","");//11
		$dao->Campo("p.descuento","");//12
		$dao->Campo("e.id","");//13

		$dao->TablasInnerAlias("punto_venta","p","establecimiento","e");
		$dao->TablasInnerAlias("punto_venta","p","punto_emision","pe");
		
		$dao->Where("p.id_estado","1","and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("p.nombre", $_POST["search"]["value"], "");
			}
		}

		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;
			
			//$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			//$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';
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

	if ($_POST['Requerimiento'] == "SubirLogo") {

		$file = $_FILES['file'];

		$ruta = "uploads/" . uniqid() . ".jpg";
		move_uploaded_file($file['tmp_name'], $ruta);

		echo json_encode(["ok" => true, "path" => $ruta]);
		exit;
	}
}
