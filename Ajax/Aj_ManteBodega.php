<?php

session_start();
date_default_timezone_set('America/Guayaquil');
require_once "autoloadAjax.php";
require_once '../Apis/Quickcont/Factura.php';
require_once '../Apis/Quickcont/NotaCredito.php';
if (isset($_POST['Requerimiento'])) {
	function Escribir($texto)
	{
		$myfile = fopen("debug.txt", "w") or die("Unable to open file!");
		fwrite($myfile, $texto . "\n");
		fclose($myfile);
	}
	if ($_POST['Requerimiento'] == "CargarTablaBodegaJS") {

		$dao = new Dao();

		$dao->Campo("b.id", ""); //0
		$dao->Campo("e.nombre_comercial", ""); //1
		$dao->Campo("b.nombre", ""); //2
		$dao->Campo("b.descripcion", ""); //3
		$dao->Campo("b.estado", ""); //4
		$dao->Campo("b.usuario_registro", ""); //5
		$dao->Campo("b.fecha_registro", ""); //6
		$dao->Campo("b.id_estado", ""); //7

		$dao->TablasInnerAlias("bodega", "b", "establecimiento", "e");

		$dao->Where("b.id_estado", "1", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("b.nombre", $_POST["search"]["value"], "");
			}
		}

		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;

			$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';

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

	if ($_POST['Requerimiento'] == "CargarTablaDepartamentoJS") {

		$dao = new Dao();

		$dao->Campo("id", ""); //0
		$dao->Campo("descripcion", ""); //1
		$dao->Campo("Cuenta_Contable", ""); //2
		$dao->Campo("Cuenta_Presupuestaria", ""); //3
		$dao->Campo("id_estado", ""); //4

		$dao->Tabla("departamento", "");

		$dao->Where("id_estado", "1", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("descripcion", $_POST["search"]["value"], "");
			}
		}

		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;

			$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';

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

	if ($_POST['Requerimiento'] == "CargarTablaMotivosJS") {

		$dao = new Dao();

		$dao->Campo("id", ""); //0
		$dao->Campo("descripcion", ""); //1
		$dao->Campo("prefijo", ""); //2
		$dao->Campo("estado", ""); //3
		$dao->Campo("Cuenta_Contable", ""); //4
		$dao->Campo("Cuenta_Presupuestaria", ""); //5
		$dao->Campo("id_estado", ""); //6

		$dao->Tabla("motivo", "");

		$dao->Where("id_estado", "1", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("descripcion", $_POST["search"]["value"], "");
			}
		}

		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;

			$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';

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

	if ($_POST['Requerimiento'] == "CargarTablaLiniasJS") {

		$dao = new Dao();

		$dao->Campo("id", ""); //0
		$dao->Campo("descripcion", ""); //1
		$dao->Campo("id_estado", ""); //2

		$dao->Tabla("linea", "");

		$dao->Where("id_estado", "1", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("descripcion", $_POST["search"]["value"], "");
			}
		}

		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;

			$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';

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

	if ($_POST['Requerimiento'] == "CargarTablaPresentacionJS") {

		$dao = new Dao();

		$dao->Campo("id", ""); //0
		$dao->Campo("descripcion", ""); //1
		$dao->Campo("prefijo", ""); //2
		$dao->Campo("fecha_registro", ""); //3
		$dao->Campo("id_estado", ""); //4

		$dao->Tabla("unidad", "");

		$dao->Where("id_estado", "1", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("descripcion", $_POST["search"]["value"], "");
			}
		}

		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;

			$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';

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

	if ($_POST['Requerimiento'] == "CargarTablaPrincipioJS") {

		$dao = new Dao();

		$dao->Campo("id", ""); //0
		$dao->Campo("clasificacion", ""); //1
		$dao->Campo("descripcion", ""); //2
		$dao->Campo("fecha_registro", ""); //3
		$dao->Campo("id_estado", ""); //4

		$dao->Tabla("clasificacion", "");

		$dao->Where("id_estado", "1", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("descripcion", $_POST["search"]["value"], "");
			}
		}

		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;

			$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';

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

	if ($_POST['Requerimiento'] == "CargarTablaFarmacologiaJS") {

		$dao = new Dao();

		$dao->Campo("f.id", ""); //0
		$dao->Campo("b.nombre", ""); //1
		$dao->Campo("f.descripcion", ""); //2
		$dao->TablasInnerAlias("farmacologia", "f", "bodega", "b");

		$dao->Where("f.id_estado", "1", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("f.descripcion", $_POST["search"]["value"], "");
			}
		}

		$respuesta = $dao->Consultar();
		$data = array();
		$totalFilter = 0;
		foreach ($respuesta as $row => $item) {
			$totalFilter++;

			$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';

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

	if ($_POST['Requerimiento'] == "GuardarBodega") {

		$datos = array(
			"nombre" => $_POST["Nombre"],
			"id_establecimiento" => $_POST["Id_establecimiento"],
			"descripcion" => $_POST["Descripcion"],
			"estado" => $_POST["Estado"],
			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);




		$dao = new Dao();
		$dao->GuardarAjax("bodega", $datos);
	}



	if ($_POST['Requerimiento'] == "GuardarDepartamento") {

		$datos = array(
			"descripcion" => $_POST["Descripcion"],
			"Cuenta_Contable" => $_POST["Cuenta_Contable"],
			"Cuenta_Presupuestaria" => $_POST["Cuenta_Presupuestaria"],
			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);
		$dao = new Dao();
		$dao->GuardarAjax("departamento", $datos);
	}


	if ($_POST['Requerimiento'] == "GuardarIngreso") {

		$datos = array(
			"descripcion" => $_POST["Descripcion"],
			"prefijo" => $_POST["Prefijo"],
			"cuenta_contable" => $_POST["Cuenta_Contable"],
			"cuenta_presupuestaria" => $_POST["Cuenta_Presupuestaria"],
			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("motivo", $datos);
	}


	if ($_POST['Requerimiento'] == "GuardarLinea") {

		$datos = array(
			"descripcion" => $_POST["Descripcion"],
			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("linea", $datos);
	}


	if ($_POST['Requerimiento'] == "GuardarUnidad") {

		$datos = array(
			"descripcion" => $_POST["Descripcion"],
			"prefijo" => $_POST["Prefijo"],


			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("unidad", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarClasificacion") {

		$datos = array(
			"clasificacion" => $_POST["Clasificacion"],
			"descripcion" => $_POST["Descripcion"],


			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("clasificacion", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarFarmaco") {

		$datos = array(
			"id_bodega" => $_POST["Bodega_registrada"],
			"descripcion" => $_POST["Descripcion"],


			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);


		$dao = new Dao();
		$dao->GuardarAjax("farmacologia", $datos);
	}


	if ($_POST['Requerimiento'] == "GuardarInventario") {

		$ruta = "";
		if (!isset($_FILES['Imagen'])) {
			$ruta = "../imagenes/producto.png";
		} else {
			$subir = new SubirArchivo();
			$ruta = $subir->SubirFotos("INVENTARIO", $_POST["Nombre"], $_FILES["Imagen"]);
		}

		$datos = array(
			"id_bodega" => $_POST["Id_Bodega"],
			"id_linea" => $_POST["Id_Linea"],
			"id_unidad" => $_POST["Id_Unidad"],
			"id_farmacologia" => $_POST["Id_Farmacologia"],
			"id_estado" => 1,
			"nombre" => $_POST["Nombre"],
			"presentacion" => $_POST["Presentacion"],
			"codigo_barra" => $_POST["Codigo_Barra"],
			"principio1" => $_POST["Principio1"],
			"principio2" => $_POST["Principio2"],
			"principio3" => $_POST["Principio3"],
			"principio4" => $_POST["Principio4"],
			"medida1" => $_POST["Medida1"],
			"medida2" => $_POST["Medida2"],
			"medida3" => $_POST["Medida3"],
			"medida4" => $_POST["Medida4"],
			"um1" => $_POST["Um1"],
			"um2" => $_POST["Um2"],
			"um3" => $_POST["Um3"],
			"um4" => $_POST["Um4"],
			"iva" => $_POST["Iva"],
			"utilidad1" => $_POST["Utilidad1"],
			"utilidad2" => $_POST["Utilidad2"],
			"nivel2" => $_POST["Nivel2"],
			"nivel1" => $_POST["Nivel1"],
			"cantidad1" => 0,
			"cantidad2" => $_POST["Cantidad2"],
			"prst1" => $_POST["Presentacion1"],
			"prst2" => $_POST["Presentacion2"],
			"fracciones_stock" => 0,
			"pvp_caja" => $_POST["Valor"],
			"pvpf_caja" => $_POST["Valor"] / $_POST["Cantidad2"],
			"usuario_registro" => $_SESSION["usuario"],
			"percha" => $_POST["Percha"],
			"tipo_pvp" => $_POST["TipoPrecio"],

			"pvp1" => $_POST["Pvp1"],
			"pvp2" => $_POST["Pvp2"],

			"prescripcion" => $_POST["Prescripcion"],

			"descuento_efectivo" => $_POST["DescuentoEfectivo"],
			"descuento_tarjeta" => $_POST["DescuentoTarjeta"],

			"imagen" => substr($ruta, 3)
		);


		$dao = new Dao();
		$dao->GuardarAjax("inventario", $datos);
	}



	////////////////////////////////////////////////////MODIFICAR//////////////////////////////////////////////////////


	if ($_POST['Requerimiento'] == "ModificaBodega") {


		$datos = array(
			"nombre" => $_POST["Nombre"],
			"id_establecimiento" => $_POST["Id_establecimiento"],
			"descripcion" => $_POST["Descripcion"],
			"estado" => $_POST["Estado"],
			"id_estado" => 1,
			"usuario_modifico" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("bodega", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ModificaDepartamento") {


		$datos = array(
			"descripcion" => $_POST["Descripcion"],
			"Cuenta_Contable" => $_POST["Cuenta_Contable"],
			"id_estado" => 1,
			"Cuenta_Presupuestaria" => $_POST["Cuenta_Presupuestaria"],

			"usuario_modifico" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("departamento", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}


	if ($_POST['Requerimiento'] == "ModificaIngreso") {


		$datos = array(
			"descripcion" => $_POST["Descripcion"],
			"prefijo" => $_POST["Prefijo"],
			"id_estado" => 1,
			"cuenta_contable" => $_POST["Cuenta_Contable"],
			"cuenta_presupuestaria" => $_POST["Cuenta_Presupuestaria"],
			"estado" => $_POST["Estado"],
			"usuario_modifico" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("motivo", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}


	if ($_POST['Requerimiento'] == "ModificaLinea") {


		$datos = array(
			"descripcion" => $_POST["Descripcion"],
			"id_estado" => 1,
			"usuario_modifico" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("linea", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ModificaUnidad") {


		$datos = array(
			"descripcion" => $_POST["Descripcion"],
			"prefijo" => $_POST["Prefijo"],
			"id_estado" => 1,
			"usuario_modifico" => $_SESSION["usuario"]
		);
		$dao = new Dao();
		$dao->ModificarAjax("unidad", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ModificaActivo") {


		$datos = array(
			"clasificacion" => $_POST["Clasificacion"],
			"descripcion" => $_POST["Descripcion"],
			"id_estado" => 1,
			"usuario_modifico" => $_SESSION["usuario"]
		);
		$dao = new Dao();
		$dao->ModificarAjax("clasificacion", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}


	if ($_POST['Requerimiento'] == "ModificaFarmaco") {


		$datos = array(
			"id_bodega" => $_POST["Bodega_registrada"],
			"descripcion" => $_POST["Descripcion"],
			"id_estado" => 1,
			"usuario_modifico" => $_SESSION["usuario"]
		);
		$dao = new Dao();
		$dao->ModificarAjax("farmacologia", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}


	if ($_POST['Requerimiento'] == "ModificaInvetario") {

		$ruta = "";
		if (!isset($_FILES['Imagen'])) {
			$ruta = "../imagenes/producto.png";
		} else {
			$subir = new SubirArchivo();
			$ruta = $subir->SubirFotos("INVENTARIO", $_POST["Nombre"], $_FILES["Imagen"]);
		}
		$datos = array(
			"id_bodega" => $_POST["Id_Bodega"],
			"id_linea" => $_POST["Id_Linea"],
			"id_unidad" => $_POST["Id_Unidad"],
			"id_farmacologia" => $_POST["Id_Farmacologia"],
			"id_estado" => 1,
			"nombre" => $_POST["Nombre"],
			"presentacion" => $_POST["Presentacion"],
			"codigo_barra" => $_POST["Codigo_Barra"],
			"principio1" => $_POST["Principio1"],
			"principio2" => $_POST["Principio2"],
			"principio3" => $_POST["Principio3"],
			"principio4" => $_POST["Principio4"],
			"medida1" => $_POST["Medida1"],
			"medida2" => $_POST["Medida2"],
			"medida3" => $_POST["Medida3"],
			"medida4" => $_POST["Medida4"],
			"um1" => $_POST["Um1"],
			"um2" => $_POST["Um2"],
			"um3" => $_POST["Um3"],
			"um4" => $_POST["Um4"],

			"prescripcion" => $_POST["Prescripcion"],

			"tipo_pvp" => $_POST["TipoPrecio"],

			"pvp1" => $_POST["Pvp1"],
			"pvp2" => $_POST["Pvp2"],
			"iva" => $_POST["Iva"],
			"pvp_caja" => $_POST["Valor"],
			"pvpf_caja" => $_POST["Valor"] / $_POST["Cantidad2"],
			"utilidad1" => $_POST["Utilidad1"],
			"utilidad2" => $_POST["Utilidad2"],
			"nivel2" => $_POST["Nivel2"],
			"nivel1" => $_POST["Nivel1"],
			"prst1" => $_POST["Presentacion1"],
			"cantidad2" => $_POST["Cantidad2"],
			"prst2" => $_POST["Presentacion2"],
			"percha" => $_POST["Percha"],
			"descuento_efectivo" => $_POST["DescuentoEfectivo"],
			"descuento_tarjeta" => $_POST["DescuentoTarjeta"],
			"imagen" => substr($ruta, 3)
		);
		$dao = new Dao();
		$dao->ModificarAjax("inventario", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	////////////////////////////////////////////////////ELIMINAR//////////////////////////////////////////////////////

	if ($_POST['Requerimiento'] == "EliminaBodega") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("bodega", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminaDepartamento") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("departamento", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminaIngreso") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("motivo", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminaLinea") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("linea", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminaUnidad") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("unidad", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminaActivo") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("clasificacion", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminaFarmaco") {
		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("farmacologia", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "EliminaInventario") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("inventario", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}


	////////////////////////////////////////////////////2222222222//////////////////////////////////////////////////////
	////////////////////////////////////////////////////2222222222//////////////////////////////////////////////////////
	////////////////////////////////////////////////////2222222222//////////////////////////////////////////////////////
	////////////////////////////////////////////////////2222222222//////////////////////////////////////////////////////
	////////////////////////////////////////////////////2222222222//////////////////////////////////////////////////////
	if ($_POST['Requerimiento'] == "InactivarBodega") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("bodega", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ActivarBodega") {

		$datos = array("id_estado" => 1);
		$dao = new Dao();
		$dao->ModificarAjax("bodega", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}


	if ($_POST['Requerimiento'] == "InactivarDepa") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("departamento", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ActivarDepa") {

		$datos = array("id_estado" => 1);
		$dao = new Dao();
		$dao->ModificarAjax("departamento", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "InactivarIngre") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("motivo", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ActivarIngre") {

		$datos = array("id_estado" => 1);
		$dao = new Dao();
		$dao->ModificarAjax("motivo", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}


	if ($_POST['Requerimiento'] == "InactivarLinea") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("linea", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ActivarLinea") {

		$datos = array("id_estado" => 1);
		$dao = new Dao();
		$dao->ModificarAjax("linea", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}


	if ($_POST['Requerimiento'] == "InactivarPresen") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("unidad", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ActivarPresen") {

		$datos = array("id_estado" => 1);
		$dao = new Dao();
		$dao->ModificarAjax("unidad", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "InactivarClasi") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("clasificacion", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ActivarClasi") {

		$datos = array("id_estado" => 1);
		$dao = new Dao();
		$dao->ModificarAjax("clasificacion", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "InactivarFarmaco") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("farmacologia", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ActivarFarmaco") {

		$datos = array("id_estado" => 1);
		$dao = new Dao();
		$dao->ModificarAjax("farmacologia", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "CargarInventarioKardex") {
		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Tabla("inventario", "");
		$dao->Where("id_estado", "1", "and");
		$dao->Filtrar("nombre", $_POST["Nombre"], "");
		$dao->Ordenar("nombre");
		$dao->Limite("50");
		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "LlenarTablaInvtarioFact") {

		$dao = new Dao();

		$dao->Campo("i.id", "");//0
		$dao->Campo("i.nombre", "");//1
		$dao->Campo("i.presentacion", "");//2
		$dao->Campo("i.costo1", "");//3
		$dao->Campo("i.pvp1", "");//4
		$dao->Campo("i.pvp2", "");//5
		$dao->Campo("i.iva", "");//6
		$dao->Campo("i.pvp_caja", "");//7
		$dao->Campo("i.nivel1", "");//8
		$dao->Campo("i.nivel2", "");//9
		$dao->Campo("i.cantidad1", "");//10
		$dao->Campo("i.fracciones_stock", "");//11
		$dao->Campo("i.cantidad2", "");//12
		$dao->Campo("i.pvpf_caja", "");//13
		$dao->Campo("i.prst1", "");//14
		$dao->Campo("i.prst2", "");//15
		$dao->Campo("i.descuento_efectivo", "");//16
		$dao->Campo("i.descuento_tarjeta", "");//17

		$dao->Tabla("inventario", "i");
		$dao->Diferente("(i.cantidad1 * i.cantidad2)+i.fracciones_stock", "0", "and");


		$dao->Where("i.id_estado", "1", "and");


		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("i.nombre", $_POST['columns'][1]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("CONCAT(i.presentacion,' ',i.prst2)", $_POST['columns'][2]["search"]["value"], "AND");
			}
		}
		if (isset($_POST['columns'][3]["search"]["value"])) {
			if (trim($_POST['columns'][3]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Where("i.id_bodega", $_POST['columns'][3]["search"]["value"], "AND");
			}
		}
		if (isset($_POST['columns'][4]["search"]["value"])) {
			if (trim($_POST['columns'][4]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {

				$dao->Filtrar("CONCAT(i.principio1,' ',i.principio2,' ',i.principio3,' ',i.principio4)", $_POST['columns'][4]["search"]["value"], "");
			}
		}
		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}
		$dao->Ordenar("i.nombre");
		$respuesta = $dao->Consultar();

		$data = array();

		$totalfilter = 0;
		foreach ($respuesta as $row => $item) {
			$stock = ($item["cantidad1"] * $item["cantidad2"]) + $item["fracciones_stock"];
			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = number_format($item[4], 2, '.', '');
			$sub_array[] = number_format($item[5], 2, '.', '');
			$sub_array[] = $item[6];
			$sub_array[] = $item[7];
			$sub_array[] = $item[8];
			$sub_array[] = $item[9];
			$sub_array[] = $item[10];
			$sub_array[] = $item[11];
			$sub_array[] = $item[12];
			$sub_array[] = $item[13];
			$sub_array[] = $item[14];
			$sub_array[] = $item[15];
			$sub_array[] = $stock;
			$sub_array[] = $item[16];
			$sub_array[] = $item[17];
			$data[] = $sub_array;
			$totalfilter++;
		}

		$output = array(
			"draw"           => intval($_POST["draw"]),
			"recordsTotal"   => $totalfilter,
			"recordsFiltered" => $totalfilter,
			"data"           => $data
		);
		echo json_encode($output);
	}

	if ($_POST['Requerimiento'] == "LlenarTablaInvtarioMovimiento1") {

		$dao = new Dao();

		$dao->Campo("i.id", "");
		$dao->Campo("i.nombre", "");
		$dao->Campo("i.presentacion", "");
		$dao->Campo("i.principio1", "");
		$dao->Campo("i.principio2", "");
		$dao->Campo("i.principio3", "");
		$dao->Campo("i.principio4", "");
		$dao->Campo("i.costo1", "");
		$dao->Campo("i.pvp1", "");
		$dao->Campo("i.pvp2", "");
		$dao->Campo("i.iva", "");
		$dao->Campo("i.prst2", "galenica");
		$dao->Campo("i.pvp_caja", "");
		$dao->Campo("i.nivel1", "");
		$dao->Campo("i.nivel2", "");
		$dao->Campo("i.cantidad1", "");
		$dao->Campo("i.fracciones_stock", "");
		$dao->Campo("i.cantidad2", "");
		$dao->Campo("i.prst1", "");
		$dao->Campo("i.prst2", "");

		$dao->Tabla("inventario", "i");

		$dao->Where("i.id_estado", "1", "and");

		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("i.nombre", $_POST['columns'][1]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("CONCAT(i.presentacion,' ',i.prst2)", $_POST['columns'][2]["search"]["value"], "AND");
			}
		}
		if (isset($_POST['columns'][3]["search"]["value"])) {
			if (trim($_POST['columns'][3]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Where("i.id_bodega", $_POST['columns'][3]["search"]["value"], "AND");
			}
		}
		if (isset($_POST['columns'][4]["search"]["value"])) {
			if (trim($_POST['columns'][4]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {

				$dao->Filtrar("CONCAT(i.principio1,' ',i.principio2,' ',i.principio3,' ',i.principio4)", $_POST['columns'][4]["search"]["value"], "");
			}
		}
		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}
		$dao->Ordenar("i.nombre");

		$respuesta = $dao->Consultar();

		$data = array();

		$total = 0;
		foreach ($respuesta as $row => $item) {
			$sub_array = array();
			$stock = ($item[15] * $item[17]) + $item[16];
			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];
			$sub_array[] = $item[6];
			$sub_array[] = $item[7];
			$sub_array[] = $item[8];
			$sub_array[] = $item[9];
			$sub_array[] = $item[10];
			$sub_array[] = $item[11];
			$sub_array[] = $item[12];
			$sub_array[] = $item[13];
			$sub_array[] = $item[14];
			$sub_array[] = $item[15];
			$sub_array[] = $item[16];
			$sub_array[] = $item[17];
			$sub_array[] = $item[18];
			$sub_array[] = $item[19];
			$sub_array[] = $stock;
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
	if ($_POST['Requerimiento'] == "LlenarTablaInvtarioMovimiento") {

		$dao = new Dao();

		$dao->Campo("i.id", "");
		$dao->Campo("i.nombre", "");
		$dao->Campo("i.presentacion", "");
		$dao->Campo("i.principio1", "");
		$dao->Campo("i.principio2", "");
		$dao->Campo("i.principio3", "");
		$dao->Campo("i.principio4", "");
		$dao->Campo("i.costo1", "");
		$dao->Campo("i.pvp1", "");
		$dao->Campo("i.pvp2", "");
		$dao->Campo("i.iva", "");
		$dao->Campo("u.descripcion", "");
		$dao->Campo("i.pvp_caja", "");
		$dao->Campo("i.nivel1", "");
		$dao->Campo("i.nivel2", "");
		$dao->Campo("i.cantidad1", "");
		$dao->Campo("i.fracciones_stock", "");
		$dao->Campo("i.cantidad2", "");
		$dao->Campo("i.prst1", "");
		$dao->Campo("i.prst2", "");
		$dao->Campo("l.descripcion", "");
		$dao->Campo("f.descripcion", "");

		$dao->TablasInnerAlias("inventario", "i", "unidad", "u");
		$dao->TablasInnerAlias("inventario", "i", "linea", "l");
		$dao->TablasInnerAlias("inventario", "i", "farmacologia", "f");
		//$dao->Diferente("((CASE WHEN i.cantidad1 = 0 THEN 1 ELSE i.cantidad1 END )*i.fracciones_stock)","0","and");

		$dao->Where("i.id_estado", "1", "and");

		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("i.nombre", $_POST['columns'][1]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("CONCAT(i.presentacion,' ',u.descripcion)", $_POST['columns'][2]["search"]["value"], "AND");
			}
		}
		if (isset($_POST['columns'][3]["search"]["value"])) {
			if (trim($_POST['columns'][3]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Where("i.id_bodega", $_POST['columns'][3]["search"]["value"], "AND");
			}
		}
		if (isset($_POST['columns'][4]["search"]["value"])) {
			if (trim($_POST['columns'][4]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {

				$dao->Filtrar("CONCAT(i.principio1,' ',i.principio2,' ',i.principio3,' ',i.principio4)", $_POST['columns'][4]["search"]["value"], "AND");
			}
		}
		if (isset($_POST['columns'][5]["search"]["value"])) {
			if (trim($_POST['columns'][5]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {

				$dao->Filtrar("l.descripcion", $_POST['columns'][5]["search"]["value"], "AND");
			}
		}
		if (isset($_POST['columns'][6]["search"]["value"])) {
			if (trim($_POST['columns'][6]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {

				$dao->Filtrar("f.descripcion", $_POST['columns'][6]["search"]["value"], "");
			}
		}
		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}
		$dao->Ordenar("i.nombre");

		$respuesta = $dao->Consultar();

		$data = array();


		foreach ($respuesta as $row => $item) {
			$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';

			$item[0] = $editar . $eliminar;

			$sub_array = array();
			$stock = ($item[15] * $item[17]) + $item[16];
			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[20];
			$sub_array[] = $item[21];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];
			$sub_array[] = $item[6];
			$data[] = $sub_array;
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("inventario", "");
		if (isset($_POST['columns'][3]["search"]["value"])) {
			if (trim($_POST['columns'][3]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Where("id_bodega", $_POST['columns'][3]["search"]["value"], "AND");
			}
		}
		/*if(isset($_POST['columns'][3]["search"]["value"]) )  
		{  
				if(trim($_POST['columns'][3]["search"]["value"])==""){
					$dao->Where("1","1","and");
					$dao->Diferente("fracciones_stock","0","and");
				}else{
					$dao->Where("id_bodega",$_POST['columns'][3]["search"]["value"],"AND");
					$dao->Diferente("fracciones_stock","0","and");
				}
		}*/
		$dao->Where("id_estado", "1", "");

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


	if ($_POST['Requerimiento'] == "LlenarTablaInventario") {

		$dao = new Dao();

		$dao->Campo("i.id", "");
		$dao->Campo("b.nombre", "");
		$dao->Campo("i.nombre", "");
		$dao->Campo("i.presentacion", "");
		$dao->Campo("l.descripcion", "");
		$dao->Campo("u.descripcion", "");
		$dao->Campo("f.descripcion", "");
		$dao->Campo("i.codigo_barra", "");
		$dao->Campo("i.principio1", "");
		$dao->Campo("i.medida1", "");
		$dao->Campo("i.um1", "");
		$dao->Campo("i.principio2", "");
		$dao->Campo("i.medida2", "");
		$dao->Campo("i.um2", "");
		$dao->Campo("i.principio3", "");
		$dao->Campo("i.medida3", "");
		$dao->Campo("i.um3", "");
		$dao->Campo("i.principio4", "");
		$dao->Campo("i.medida4", "");
		$dao->Campo("i.um4", "");
		$dao->Campo("i.presentacion1", "");
		$dao->Campo("i.cantidad1", "");
		$dao->Campo("i.costo1", "");
		$dao->Campo("i.descuento1", "");
		$dao->Campo("i.pvp1", "");
		$dao->Campo("i.presentacion2", "");
		$dao->Campo("i.cantidad2", "");
		$dao->Campo("i.costo2", "");
		$dao->Campo("i.descuento2", "");
		$dao->Campo("i.pvp2", "");
		$dao->Campo("Date_format(i.fecha_caducidad,'%Y-%m-%d')", "");
		$dao->Campo("i.imagen", "");
		$dao->Campo("i.stock_minimo", "");
		$dao->Campo("e.descripcion", "");


		$dao->TablasInnerAlias("inventario", "i", "bodega", "b");
		$dao->TablasInnerAlias("inventario", "i", "linea", "l");
		$dao->TablasInnerAlias("inventario", "i", "unidad", "u");
		$dao->TablasInnerAlias("inventario", "i", "farmacologia", "f");
		$dao->TablasInnerAlias("inventario", "i", "estado", "e");
		$dao->Where("i.id_estado", "1", "AND");
		$dao->Diferente("i.cantidad1", "0", "and");
		$dao->Diferente("i.cantidad2", "0", "and");

		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("i.nombre", $_POST['columns'][2]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][3]["search"]["value"])) {
			if (trim($_POST['columns'][3]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("CONCAT(i.presentacion,' ',u.descripcion)", $_POST['columns'][3]["search"]["value"], "AND");
			}
		}

		if (isset($_POST['columns'][8]["search"]["value"])) {
			if (trim($_POST['columns'][8]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {

				$dao->Filtrar("CONCAT(i.principio1,' ',i.principio2,' ',i.principio3,' ',i.principio4)", $_POST['columns'][8]["search"]["value"], "");
			}
		}
		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

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
		//array_sort_by($respuesta, 'i.nombre', $order = SORT_ASC);

		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];
			$sub_array[] = $item[6];
			$sub_array[] = $item[7];
			$sub_array[] = $item[8];
			$sub_array[] = $item[9];
			$sub_array[] = $item[10];
			$sub_array[] = $item[11];
			$sub_array[] = $item[12];
			$sub_array[] = $item[13];
			$sub_array[] = $item[14];
			$sub_array[] = $item[15];
			$sub_array[] = $item[16];
			$sub_array[] = $item[17];
			$sub_array[] = $item[18];
			$sub_array[] = $item[19];
			$sub_array[] = $item[20];
			$sub_array[] = $item[21];
			$sub_array[] = $item[22];
			$sub_array[] = $item[23];
			$sub_array[] = $item[24];
			$sub_array[] = $item[25];
			$sub_array[] = $item[26];
			$sub_array[] = $item[27];
			$sub_array[] = $item[28];
			$sub_array[] = $item[29];
			$sub_array[] = $item[30];
			$sub_array[] = $item[31];
			$sub_array[] = $item[32];
			$sub_array[] = $item[33];
			$data[] = $sub_array;
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("inventario", "");
		$dao->Where("id_estado", "1", "");

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

	if ($_POST['Requerimiento'] == "LlenarTablaInventarioReceta") {

		$dao = new Dao();

		$dao->Campo("i.id", "");
		$dao->Campo("i.nombre", "");
		$dao->Campo("i.principio1", "");
		$dao->Campo("i.principio2", "");
		$dao->Campo("i.principio3", "");
		$dao->Campo("i.principio4", "");
		$dao->Campo("f.descripcion", "");
		$dao->Campo("i.presentacion", "");
		$dao->Campo("u.descripcion", "");
		$dao->Campo("i.pvp1", "");
		$dao->Campo("i.pvp2", "");
		$dao->Campo("((i.cantidad1*i.cantidad2)+i.fracciones_stock)", "");

		$dao->TablasInnerAlias("inventario", "i", "farmacologia", "f");
		$dao->TablasInnerAlias("inventario", "i", "unidad", "u");

		$dao->Where("i.id_estado", "1", "and");
		$dao->Where("i.id_bodega", "33", "and");
		$dao->IN_Diferente("i.id", " SELECT id FROM inventario i WHERE i.cantidad1 = 0 AND i.fracciones_stock = 0 ", "and");

		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("i.nombre", $_POST['columns'][1]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("f.descripcion", $_POST['columns'][2]["search"]["value"], "AND");
			}
		}

		if (isset($_POST['columns'][4]["search"]["value"])) {
			if (trim($_POST['columns'][4]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {

				$dao->Filtrar("CONCAT(i.principio1,' ',i.principio2,' ',i.principio3,' ',i.principio4)", $_POST['columns'][4]["search"]["value"], "");
			}
		}
		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

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
		array_sort_by($respuesta, 'nombre', $order = SORT_ASC);

		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = '<div style="background: #00a7d0;" class="checkbox checkbox-info checkbox-circle"> <input presentacion1="' . $item[7] . '" presentacion2="' . $item[8] . '" precio1="' . $item[9] . '" precio2="' . $item[10] . '" idItem="' . $item[0] . '"  class="checkItemReceta" id="checkboxItem' . $item[0] . '" type="checkbox"><label for="checkboxItem' . $item[0] . '"> </label></div>'; //$item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];
			$sub_array[] = $item[6];
			$sub_array[] = $item[11];

			$data[] = $sub_array;
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("inventario", "");
		$dao->Where("id_estado", "1", "and");
		$dao->IN_Diferente("id", " SELECT id FROM inventario i WHERE i.cantidad1 = 0 AND i.fracciones_stock = 0 ", "and");
		$dao->Where("id_bodega", "33", "");

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

	if ($_POST['Requerimiento'] == "CargarProductosJS") {

		$dao = new Dao();

		$dao->Campo("i.id", ""); //0
		$dao->Campo("i.nombre", ""); //1
		$dao->Campo("i.principio1", ""); //2
		$dao->Campo("i.principio2", ""); //3
		$dao->Campo("i.principio3", ""); //4
		$dao->Campo("i.principio4", ""); //5
		$dao->Campo("f.descripcion", ""); //6
		$dao->Campo("i.prst2", ""); //7
		$dao->Campo("i.prst1", ""); //8
		$dao->Campo("ROUND( i.pvp1 - (i.pvp1 * (i.descuento_tarjeta / 100)) ,2)", "pvp1"); //9
		$dao->Campo("ROUND( i.pvp2 - (i.pvp2 * (i.descuento_tarjeta / 100)) ,2)", "pvp2"); //10
		$dao->Campo("((i.cantidad1*i.cantidad2)+i.fracciones_stock)", "stock"); //11
		$dao->Campo("i.presentacion", ""); //12
		$dao->Campo("i.iva", ""); //13
		$dao->Campo("i.prescripcion", ""); //14

		$dao->TablasInnerAlias("inventario", "i", "farmacologia", "f");

		$dao->Where("i.id_estado", "1", "and");
		$dao->Where("i.id_bodega", "33", "and");
		if ($_SESSION["INVENTARIOSINSTOCK"] == 0) {
			$dao->Diferente("(i.cantidad1 * i.cantidad2)+i.fracciones_stock", "0", "and");
		}
		$dao->Filtrar("CONCAT(i.principio1,' ',i.principio2,' ',i.principio3,' ',i.principio4,' ',f.descripcion,' ',i.nombre)", $_POST["q"], "");
		$dao->Ordenar("i.nombre");
		$dao->Limite("200");
		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "BuscarPorCodigo") {

		$dao = new Dao();

		$dao->Campo("i.id", "");
		$dao->Campo("i.nombre", "");
		$dao->Campo("i.presentacion", "");
		$dao->Campo("i.codigo_barra", "");
		$dao->Campo("i.principio1", "");
		$dao->Campo("i.principio2", "");
		$dao->Campo("i.principio3", "");
		$dao->Campo("i.principio4", "");
		$dao->Campo("i.medida1", "");
		$dao->Campo("i.medida2", "");
		$dao->Campo("i.medida3", "");
		$dao->Campo("i.medida4", "");
		$dao->Campo("i.um1", "");
		$dao->Campo("i.um2", "");
		$dao->Campo("i.um3", "");
		$dao->Campo("i.um4", "");
		$dao->Campo("i.cantidad1", "");
		$dao->Campo("i.cantidad2", "");
		$dao->Campo("i.costo1", "");
		$dao->Campo("i.pvp1", "");
		$dao->Campo("i.pvp2", "");
		$dao->Campo("i.imagen", "");
		$dao->Campo("i.stock_minimo", "");
		$dao->Campo("u.descripcion", "");
		$dao->Campo("i.iva", "");
		$dao->Campo("i.pvp_caja", "");
		$dao->Campo("i.pvpf_caja", "");
		$dao->Campo("i.nivel1", "");
		$dao->Campo("i.nivel2", "");
		$dao->Campo("i.fracciones_stock", "");

		$dao->TablasInnerAlias("inventario", "i", "unidad", "u");
		$dao->Where("i.codigo_barra", '"' . $_POST['CodBarra'] . '"', "");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if ($_POST['Requerimiento'] == "BuscarPorId") {

		$dao = new Dao();

		$dao->Campo("i.id", "");
		$dao->Campo("i.nombre", "");
		$dao->Campo("i.presentacion", "");
		$dao->Campo("i.codigo_barra", "");
		$dao->Campo("i.principio1", "");
		$dao->Campo("i.principio2", "");
		$dao->Campo("i.principio3", "");
		$dao->Campo("i.principio4", "");
		$dao->Campo("i.medida1", "");
		$dao->Campo("i.medida2", "");
		$dao->Campo("i.medida3", "");
		$dao->Campo("i.medida4", "");
		$dao->Campo("i.um1", "");
		$dao->Campo("i.um2", "");
		$dao->Campo("i.um3", "");
		$dao->Campo("i.um4", "");
		$dao->Campo("i.cantidad1", "");
		$dao->Campo("i.cantidad2", "");
		$dao->Campo("i.costo1", "");
		$dao->Campo("i.pvp1", "");
		$dao->Campo("i.pvp2", "");
		$dao->Campo("i.imagen", "");
		$dao->Campo("i.stock_minimo", "");
		$dao->Campo("u.descripcion", "");
		$dao->Campo("i.iva", "");
		$dao->Campo("i.pvp_caja", "");
		$dao->Campo("i.pvpf_caja", "");
		$dao->Campo("i.nivel1", "");
		$dao->Campo("i.nivel2", "");
		$dao->Campo("i.fracciones_stock", "");

		$dao->TablasInnerAlias("inventario", "i", "unidad", "u");
		$dao->Where("i.id", '"' . $_POST['Id'] . '"', "");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if ($_POST['Requerimiento'] == "BuscarPorIdStock") {

		$dao = new Dao();

		$dao->Campo("i.cantidad1", "");
		$dao->Campo("i.cantidad2", "");
		$dao->Campo("i.fracciones_stock", "");

		$dao->TablasInnerAlias("inventario", "i", "unidad", "u");
		$dao->Where("i.id", '"' . $_POST['Id'] . '"', "");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
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
	function ObtenerCosto($id)
	{

		$dao = new Dao();
		$dao->Campo("p.costo1", "");
		$dao->Tabla("inventario", "p");
		$dao->Where("p.id", $id, "");

		$respuesta = $dao->Consultar();
		$costo = 0;
		foreach ($respuesta as $row => $item) {
			$costo = $item[0];
		}
		return $costo;
	}
	function ActualizarSecuencia($secuencia)
	{
		$datos = array("secuencia_fc" => $secuencia);
		$dao = new Dao();
		$dao->Modificar("punto_venta", $datos, "id_punto_emision=" . $_SESSION["puntoEmision"], $_SESSION["puntoEmision"]);
	}

	function GuardarDetalleMovimiento($idMovimiento, $detalle)
	{
		$array = json_decode($detalle, true);
		$jsondata = array();
		$j = 0;
		$costoTotal = 0;
		for ($i = 0; $i < sizeof($array); $i++) {
			$producto = $array[$i];

			$costoTotal += $producto[3];
			$datos = array(
				"id_inventario" => $producto[0],
				"id_movimiento_bodega" => $idMovimiento,
				"presentacion" => $producto[1],
				"cantidad" => $producto[2],
				"precio" => $producto[3],
				"descuento" => $producto[4],
				"precioCaja" => 0,
				"subtotal" => $producto[5],
				"total" => $producto[6]
			);
			$dao = new Dao();
			$respuesta = $dao->Guardar("movimiento_bodega_item", $datos);
			if (!$respuesta[0]) {
				$jsondata[$j] = "No se puedo guardar el producto " . $producto[7];
				$j++;
			}
		}
		return $jsondata;
	}
	if ($_POST['Requerimiento'] == "GuardarMovimiento") {
		$motivo = 22;
		if ($_POST["Tipo"] == "INGRESO") {
			$motivo = 23;
		}
		$subtotal = 0;
		if (is_numeric($_POST["Total"])) {
			$subtotal = $_POST["Total"];
			if (is_numeric($_POST["Iva"])) {
				$subtotal = $_POST["Total"] - $_POST["Iva"];
			}
		}
		$datos = array(
			"tipo" => $_POST["Tipo"],
			"id_motivo" => $motivo,
			"id_proveedor" => 1,
			"id_bodega" => 33,
			"numero" => $_POST["Numero"],
			"fecha" => date("Y-m-d"),
			"observaciones" => "",
			"subtotal" => $subtotal,
			"iva" => $_POST["Iva"],
			"descuento" => $_POST["Descuento"],
			"total" => $_POST["Total"],
			"usuario_registro" => $_SESSION["usuario"]
		);
		$dao = new Dao();
		$respuesta = $dao->Guardar("movimiento_bodega", $datos);
		if ($respuesta[0]) {

			$errores = GuardarDetalleMovimiento($respuesta[1], $_POST["Detalle"]);
			if (sizeof($errores) > 0) {
				echo json_encode($errores, JSON_FORCE_OBJECT);
			} else {

				$jsondata = array();
				$jsondata[0] = true;
				$jsondata[1] = $respuesta[1];
				echo json_encode($jsondata, JSON_FORCE_OBJECT);
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
			"precioCaja" => $_POST["PrecioCaja"],
			"subtotal" => $_POST["Subtotal"],
			"total" => $_POST["Total"]
		);

		if (isset($_POST["Descuento"])) {
			$datos["descuento"] = $_POST["Descuento"];
		} else {
			$datos["descuento"] = 0;
		}
		if (isset($_POST["Precio"])) {
			$datos["precio"] = $_POST["Precio"];
		} else {
			$datos["precio"] = ObtenerCosto($_POST["Inventario"]);
		}
		$dao = new Dao();
		$dao->GuardarAjax("movimiento_bodega_item", $datos);
	}
	function ActualizarStock($IdInventario, $cantidadEgresa, $nivel)
	{

		$dao = new Dao();
		$dao->Campo("cantidad1", "");
		$dao->Campo("cantidad2", "");
		$dao->Campo("fracciones_stock", "");
		$dao->Tabla("inventario", "");
		$dao->Where("id", $IdInventario, "");
		$respuesta = $dao->Consultar();

		$cantidad1 = 1;
		$cantidad2 = 1;
		$fracciones_stock = 0;
		foreach ($respuesta as $row => $item) {
			$cantidad1 = $item[0];
			$cantidad2 = $item[1];
			$fracciones_stock = $item[2];
		}
		if ($nivel == 2 || $nivel == "Dos") {
			$fracciones_stock = ($cantidad1 * $cantidad2) + $fracciones_stock;
			$fracciones_stock = $fracciones_stock - $cantidadEgresa;
			$cantidad1 = intval($fracciones_stock / $cantidad2);
			$fracciones_stock = $fracciones_stock - ($cantidad1 * $cantidad2);
		} else {
			$cantidad1 = $cantidad1 - $cantidadEgresa;
		}

		$datos = array(
			"cantidad1" => $cantidad1,
			"fracciones_stock" => $fracciones_stock,
		);

		$dao = new Dao();
		$dao->Modificar("inventario", $datos, "id=" . $IdInventario, 0);
	}
	function GuardarKardex($IdInventario, $cantidadRestar, $nivel, $numero)
	{
		$dao = new Dao();

		$dao->Campo("ss_cantidad", "");
		$dao->Campo("ss_total", "");
		$dao->Campo("ss_precio", "");

		$dao->Tabla("kardex", "");
		$dao->Where("id_inventario", $IdInventario, "");
		$dao->Ordenar("id desc");
		$dao->Limite("1");

		$respuesta = $dao->Consultar();
		$cantidadAntigua = 0;
		$total = 0.0;
		$nuevoCosto = 0.0;
		$costoAntiguo = 0.0;
		$cantidad2 = 1;
		$jsondata = array();
		$costoContabilizar = 0;
		foreach ($respuesta as $row => $item) {
			$cantidadAntigua = $item[0];
			$total = $item[1];
			$costoAntiguo = $item[2];
		}

		if ($nivel == 2 || $nivel == "Dos") {
			$cantidadAntigua = $cantidadAntigua - $cantidadRestar;
			$total = $total - ($cantidadRestar * $costoAntiguo);

			$datos = array(
				"id_inventario" => $IdInventario,
				"concepto" => "VENTAS",
				"numero" => $numero,
				"s_cantidad" => $cantidadRestar,
				"s_precio" => $costoAntiguo,
				"s_total" => ($cantidadRestar * $costoAntiguo),
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $costoAntiguo,
				"ss_total" => $total
			);

			$dao = new Dao();
			$dao->Guardar("kardex", $datos);
			$costoContabilizar = ($cantidadRestar * $costoAntiguo);
		} else {

			$dao = new Dao();
			$dao->Campo("cantidad2", "");
			$dao->Campo("fracciones_stock", "");
			$dao->Tabla("inventario", "");
			$dao->Where("id", $IdInventario, "");
			$respuesta = $dao->Consultar();


			$cantidad2 = 1;

			foreach ($respuesta as $row => $item) {
				$cantidad2 = $item[0];
			}

			$cantidadAntigua = $cantidadAntigua - ($cantidadRestar * $cantidad2);
			$total = $total - (($cantidadRestar * $cantidad2) * $costoAntiguo);

			$datos = array(
				"id_inventario" => $IdInventario,
				"concepto" => "VENTAS",
				"numero" => $numero,
				"s_cantidad" => ($cantidadRestar * $cantidad2),
				"s_precio" => $costoAntiguo,
				"s_total" => (($cantidadRestar * $cantidad2) * $costoAntiguo),
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $costoAntiguo,
				"ss_total" => $total
			);

			$dao = new Dao();
			$dao->Guardar("kardex", $datos);
			$costoContabilizar = (($cantidadRestar * $cantidad2) * $costoAntiguo);
		}
		ActualizarStock($IdInventario, $cantidadRestar, $nivel);
		return $costoContabilizar;
	}
	function GuardarDetalle($idFarmacia, $detalle, $numero)
	{
		$array = json_decode($detalle, true);
		$jsondata = array();
		$j = 0;
		$costoTotal = 0;
		for ($i = 0; $i < sizeof($array); $i++) {
			$producto = $array[$i];

			$datos = array(
				"id_farmacia" => $idFarmacia,
				"presentacion" => $producto[1],
				"cantidad" => $producto[2],
				"id_inventario" => $producto[6],
				"id_estado" => 1,
				"descuento" => $producto[4],
				"precio" => $producto[3],
				"subtotal" => $producto[5]
			);
			$dao = new Dao();
			$respuesta = $dao->Guardar("farmacia_item", $datos);
			if (!$respuesta[0]) {
				$jsondata[$j] = "No se puedo guardar el producto " . $producto[0];
				$j++;
			} else {
				$costoTotal += GuardarKardex($producto[6], $producto[2], $producto[8], $numero);
			}
		}

		return $jsondata;
	}
	function ValidarExisteStock($detalle)
	{

		$array = json_decode($detalle, true);
		$sms = "";

		for ($i = 0; $i < sizeof($array); $i++) {
			$producto = $array[$i];
			$dao = new Dao();

			$dao->Campo("i.cantidad1", "");
			$dao->Campo("i.fracciones_stock", "");
			$dao->Campo("i.cantidad2", "");

			$dao->Tabla("inventario", "i");
			$dao->Where("i.id", $producto[6], "");

			$respuesta = $dao->Consultar();

			$stock = 0;
			$fracciones = 0;
			$fracciones_stock = 0;
			$cantidad = $producto[2];
			$nivel = $producto[8];
			foreach ($respuesta as $row => $item) {
				$stock = $item[0];
				$fracciones_stock = $item[1];
				$fracciones = $item[2];
				if ($nivel == "Uno") {
					if ($stock < $cantidad) {
						$sms .= "El Item " . $producto[0] . " Solo cuenta con un stock de " . $stock;
					}
				} else {
					$stock = ($stock * $fracciones) + $fracciones_stock;
					if ($stock < $cantidad) {
						$sms .= "El Item " . $producto[0] . " Solo cuenta con un stock de " . $stock;
					}
				}
			}
		}
		return $sms;
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
	function ObtenerCodigoProducto($id)
	{

		$dao = new Dao();
		$dao->Campo("p.codigo_barra", "");
		$dao->Campo("p.prst2", "");
		$dao->Tabla("inventario", "p");
		$dao->Where("p.id", $id, "");

		$respuesta = $dao->Consultar();
		$datos = [];
		foreach ($respuesta as $row => $item) {
			$datos = $item;
		}
		return $datos;
	}
	function ObtenerDetalleDetalle($detalle)
	{
		$array = json_decode($detalle, true);
		$jsondata = array();
		for ($i = 0; $i < sizeof($array); $i++) {
			$producto = $array[$i];
			$unidad = "Entero";
			if ($producto[8] == 2 || $producto[8] == "Dos") {
				$unidad = "Fracciones";
			}
			$iva = $producto[7];
			$descuento = $producto[5] * ($producto[4] / 100);
			$otros = ObtenerCodigoProducto($producto[6]);
			if ($otros[1] == "(NINGUNO)") {
				$unidad = "Entero";
			}
			$item = array(
				"Codigo" => $otros[0],
				"Bodega" => $_SESSION["QUICKCONT_ID BODEGA"],
				"Cantidad" => $producto[2],
				"Unidad" => $unidad,
				"Descuento" => $descuento,
				"Precio" => $producto[3],
				"Nota" => $producto[1],
				"Iva" => $iva,
				"Tipo" => "P"
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

	if ($_POST['Requerimiento'] == "GuardarInventarioFactura") {

		usleep(rand(400, 999) * 1000);
		$sms = ValidarExisteStock($_POST["Detalle"]);
		if ($sms != "") {
			$jsondata = array();
			$jsondata[0] = false;
			$jsondata[1] = $sms;
			echo json_encode($jsondata, JSON_FORCE_OBJECT);
			return;
		}

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
			"tipoid" => $_POST["TipoIde"],
			"id_estado" => 1,
			"mismosdatos" => $mismosdatos,
			"total" => number_format($_POST["Total"], 2, '.', ''),
			"total_iva" => number_format($_POST["Iva"], 2, '.', ''),
			"numero" => $nfc
		);

		if ($_POST["Cliente"] == "" || $_POST["Cliente"] == null) {
			$_POST["Cliente"] = 1;
		}
		$datos['id_paciente_cliente'] = $_POST["Cliente"];

		$_SESSION["secuencia_fc"] = str_pad($numero[1] + 1,  9, "0", STR_PAD_LEFT);
		$dao = new Dao();
		$respuesta = $dao->Guardar("farmacia", $datos);
		if ($respuesta[0]) {
			ActualizarSecuencia($numero[1] + 1);
			$clave_sri = ClaveAcceso($_SESSION["ruc"], $nfc);
			$errores = GuardarDetalle($respuesta[1], $_POST["Detalle"], $nfc);
			if (sizeof($errores) > 0) {
				echo json_encode($errores, JSON_FORCE_OBJECT);
			} else {

				$jsondata = array();
				$jsondata[0] = true;
				$jsondata[1] = $nfc;
				$jsondata[2] = $respuesta[1];
				$jsondata[3] = $clave_sri;
				$jsondata[4] = "";
				echo json_encode($jsondata, JSON_FORCE_OBJECT);
			}
		} else {
			echo json_encode($respuesta, JSON_FORCE_OBJECT);
		}
	}

	function ObtenerFormaPagoFarmacia($farmacia)
	{
		$dao = new Dao();

		$dao->Campo("c.tipo", "");
		$dao->Tabla("forma_pago", "c");
		$dao->Where("c.id_farmacia", $farmacia, "");
		$respuesta = $dao->Consultar();
		$fp = "Efectivo";
		foreach ($respuesta as $row => $item) {
			if ($item[0] != "EFECTIVO") {
				$fp = "Credito";
			}
		}
		return $fp;
	}

	function ProcesarValorAnticipo($farmacia)
	{

		$dao = new Dao();

		$dao->Campo("numero", "");

		$dao->Tabla("ic_caja", "");
		$dao->Where("id_punto_venta", $_SESSION['puntoVenta'], "");
		$dao->Ordenar("id DESC");
		$dao->Limite("1");
		$respuesta = $dao->Consultar();
		$secuencia = 1;
		foreach ($respuesta as $row => $item) {
			$secuencia = str_pad(substr($item[0], -7) + 1,  7, "0", STR_PAD_LEFT);
		}

		$dao = new Dao();

		$dao->Campo("c.monto_anticipo", "");
		$dao->Tabla("forma_pago", "c");
		$dao->Where("c.id_farmacia", $farmacia, "AND");
		$dao->Where("c.tipo", "'ANTICIPO'", "");
		$dao->Limite("1");
		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			$datos = array(
				"valor" => $item[0],
				"valor_ingreso" => $item[0],
				"t_pago" => "NOTA DE CREDITO",
				"id_estado" => 1,
				"id_punto_venta" => $_SESSION["puntoVenta"],
				"usuario_registro" => $_SESSION["usuario"]
			);


			if (isset($_POST["Cliente"])) {
				$datos["id_paciente_cliente"] = $_POST["Cliente"];
			}

			$dao = new Dao();
			$respuestaat = $dao->Guardar("anticipo", $datos);


			$datos = array(
				"numero" => str_pad($_SESSION["puntoVenta"],  3, "0", STR_PAD_LEFT) . "-" . $secuencia,
				"tipo" => "ANTICIPO",
				"id_anticipo" => $respuestaat[1],
				"id_punto_venta" => $_SESSION["puntoVenta"],
				"monto" => $item[0],
				"tipo_pago" => "NOTA DE CREDITO"
			);


			if (isset($_POST["Cliente"])) {
				$datos["id_paciente_cliente"] = $_POST["Cliente"];
			}
			$dao = new Dao();
			$dao->Guardar("ic_caja", $datos);
		}
	}
	function ProcesarValorCredito($farmacia)
	{

		$dao = new Dao();

		$dao->Campo("numero", "");

		$dao->Tabla("ic_caja", "");
		$dao->Where("id_punto_venta", $_SESSION['puntoVenta'], "");
		$dao->Ordenar("id DESC");
		$dao->Limite("1");
		$respuesta = $dao->Consultar();
		$secuencia = 1;
		foreach ($respuesta as $row => $item) {
			$secuencia = str_pad(substr($item[0], -7) + 1,  7, "0", STR_PAD_LEFT);
		}

		$dao = new Dao();

		$dao->Campo("c.monto_credito", "");
		$dao->Campo("saldo", "");
		$dao->Campo("pagado", "");
		$dao->Campo("id", "");
		$dao->Tabla("forma_pago", "c");
		$dao->Where("c.id_farmacia", $farmacia, "AND");
		$dao->Where("c.tipo", "'CREDITO'", "");
		$dao->Limite("1");
		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			$datos = array(
				"numero" => str_pad($_SESSION["puntoVenta"],  3, "0", STR_PAD_LEFT) . "-" . $secuencia,
				"tipo" => "ABONO",
				"id_punto_venta" => $_SESSION["puntoVenta"],
				"monto" => $item[0],
				"tipo_pago" => "NOTA DE CREDITO"
			);


			if (isset($_POST["Cliente"])) {
				$datos["id_paciente_cliente"] = $_POST["Cliente"];
			}
			$dao = new Dao();
			$respuestaic = $dao->Guardar("ic_caja", $datos);

			$datos = array(
				"tipo" => "NOTA DE CREDITO",
				"monto" => $item[0],
				"id_ic_caja" => $respuestaic[1],
				"id_estado" => 1
			);


			$dao = new Dao();
			$dao->Guardar("forma_pago_ingreso", $datos);

			$saldo = $item[1];
			$abono = $item[2];

			$saldo = $saldo - $item[0];
			$abono = $abono + $item[0];
			$datos = array(
				"pagado" => $abono,
				"saldo" => $saldo
			);

			$dao = new Dao();
			$dao->Modificar("forma_pago", $datos, "id=" . $item[3], 0);
		}
	}

	function ClaveAccesonc($ruc, $factura)
	{

		$establecimiento = substr(str_replace("-", "", $factura), 0, 3);
		$punto = substr(str_replace("-", "", $factura), 3, 3);
		$secuencial = '00' . substr(str_replace("-", "", $factura), 6);

		$claveAcceso = date("dmY") . "04" . $ruc . "1" . $establecimiento . $punto . $secuencial . "41261533" . "1";
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

	function ObtenerDetalleDetalleNC($detalle)
	{
		$array = json_decode($detalle, true);
		$jsondata = array();
		for ($i = 0; $i < sizeof($array); $i++) {
			$producto = $array[$i];
			$unidad = "Entero";
			if ($producto[9] == 2 || $producto[9] == "Dos") {
				$unidad = "Fracciones";
			}
			$iva = $producto[8];
			$otros = ObtenerCodigoProducto($producto[0]);
			if ($otros[1] == "(NINGUNO)") {
				$unidad = "Entero";
			}
			$item = array(
				"Codigo" => $otros[0],
				"Bodega" => $_SESSION["QUICKCONT_ID BODEGA"],
				"Cantidad" => $producto[2],
				"Unidad" => $unidad,
				"Precio" => $producto[10],
				"Nota" => $producto[1],
				"Iva" => $iva,
				"Motivo" => "Devolucion",
				"Tipo" => "P"
			);
			$jsondata[] = $item;
		}
		return $jsondata;
	}

	function EnviarNotaCreditoQuickCont($notacredito, $tipoidentificacion, $identificacion, $cliente, $email, $motivo, $referencia, $subtotal, $iva, $total, $detalle, $formapago)
	{
		
		$obj = new NotaCredito();
		$respuesta = $obj->CrearNotaCredito(
			/*datos de la empresa*/
			$_SESSION["QUICKCONT_ID EMPRESA"],
			$_SESSION["QUICKCONT_USUARIO"],
			$_SESSION["QUICKCONT_CONTRASEÑA"],
			/*cabecera factura*/
			$notacredito,
			date("Y-m-d"),
			$tipoidentificacion,
			$identificacion,
			$cliente,
			$email,
			$motivo,
			$referencia,
			$subtotal,
			$iva,
			$total,
			/*detalle de la factura */
			$detalle,
			$formapago,

			file_get_contents("../facturas/firmaelectronica.p12"),
			Configuracion::CLAVE_CERTIFICADO,
			$_SESSION["QUICKCONT_SERVICIO WEB NOTA DE CREDITO"]
		);
		return $respuesta;
	}

	if ($_POST['Requerimiento'] == "GuardarInventarioFactura2") {

		$mismosdatos = null;

		if ($_POST["Paciente"] != $_POST["Cliente"]) {
			$mismosdatos = 'N';
		} else {
			$mismosdatos = 'S';
		}

		if ($_POST["Cliente"] == 1) {
			$mismosdatos = 'N';
		}

		$datos = array(
			"id_punto_venta" => $_POST["Punto"],
			"id_paciente" => $_POST["Paciente"],
			"id_farmacia" => $_POST["Farmacia"],
			"descuento" => $_POST["Descuento"],
			"tipoid" => $_POST["TipoIde"],
			"id_estado" => 1,
			"mismosdatos" => $mismosdatos,
			"total" => $_POST["Total"],
			"total_iva" => $_POST["Iva"],
			"numero" => $_POST["Numero"]
		);

		if ($mismosdatos == 'N') {
			$datos['id_paciente_cliente'] = $_POST["Cliente"];
		}

		ProcesarValorCredito($_POST['Farmacia']);
		ProcesarValorAnticipo($_POST['Farmacia']);

		$datos1 = array("nc" => 0);
		$dao1 = new Dao();
		$dao1->Modificar("farmacia", $datos1, "id = " . $_POST['Farmacia'], 0);
		$clave_sri = ClaveAccesonc($_SESSION["ruc"], $_POST["Numero"]);
		$dao = new Dao();
		$respuesta = $dao->Guardar("nc_farmacia", $datos);
		if ($respuesta[0]) {

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
				$detalle = ObtenerDetalleDetalleNC($_POST["Detalle"]);

				$pagoconsulta = ObtenerFormaPagoFarmacia($_POST['Farmacia']);

				$formapago = ObtenerFormaPago(
					$pagoconsulta == "Efectivo" ? $_POST["Total"] : 0,
					0,
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					$pagoconsulta == "Credito" ? $_POST["Total"] : 0,
					3,
					date("Y-m-d")
				);

				$wsrespuesta = EnviarNotaCreditoQuickCont(
					$_POST["Numero"],
					$tipoidentificacion,
					$_POST["CedulaCliente"],
					$_POST["NombreCliente"],
					$_POST["EmailCliente"],
					"Devolucion",
					$_POST["NumeroFactura"],
					$_POST["Total"] - $_POST["Iva"],
					$_POST["Iva"],
					$_POST["Total"],
					$detalle,
					$formapago
				);
			}*/

			$jsondata = array();
			$jsondata[0] = true;
			$jsondata[1] = $respuesta[1];
			$jsondata[2] = $_POST["Numero"];
			$jsondata[3] = $clave_sri;
			$jsondata[4] = date("Y-m-d H:i:s");
			echo json_encode($jsondata, JSON_FORCE_OBJECT);
		} else {
			echo json_encode($respuesta, JSON_FORCE_OBJECT);
		}
	}

	if ($_POST['Requerimiento'] == "ActualizaSecuencia") {

		$datos = array("secuencia_fc" => $_POST["Secuencia"]);

		$dao = new Dao();
		$_SESSION["secuencia_fc"] = str_pad($_POST["Secuencia"],  9, "0", STR_PAD_LEFT);
		$dao->ModificarAjax("punto_venta", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ActualizaSecuenciaNc") {

		$datos = array("secuencia_nc" => $_POST["Secuencia"]);

		$dao = new Dao();
		$_SESSION["secuencia_nc"] = str_pad($_POST["Secuencia"],  9, "0", STR_PAD_LEFT);
		$dao->ModificarAjax("punto_venta", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "GuardarConsultaDetalle") {
		$datos = array(
			"id_farmacia" => $_POST["Consulta"],
			"presentacion" => $_POST["Presentacion"],
			"cantidad" => $_POST["Cantidad"],
			"id_inventario" => $_POST["Inventario"],
			"id_estado" => 1,
			"descuento" => $_POST["Descuento"],
			"precio" => $_POST["Precio"],
			"subtotal" => $_POST["Subtotal"]
		);
		$dao = new Dao();
		$dao->GuardarAjax("farmacia_item", $datos);
	}

	if ($_POST['Requerimiento'] == "GuardarConsultaDetalle2") {
		$datos = array(
			"id_nc_farmacia" => $_POST["Consulta"],
			"presentacion" => $_POST["Presentacion"],
			"cantidad" => $_POST["Cantidad"],
			"id_inventario" => $_POST["Inventario"],
			"descuento" => $_POST["Descuento"],
			"precio" => $_POST["Precio"],
			"subtotal" => $_POST["Subtotal"]
		);

		$datos1 = array("id_estado" => 25);
		$dao1 = new Dao();
		$dao1->Modificar("farmacia_item", $datos1, "id_farmacia = " . $_POST['CCargada'] . " and id_inventario = " . $_POST["Inventario"], 0);

		$dao = new Dao();
		$dao->GuardarAjax("nc_farmacia_item", $datos);
	}

	if ($_POST['Requerimiento'] == "BuscarInventarioPorId") {

		$dao = new Dao();

		$dao->Campo("i.id", "");
		$dao->Campo("b.id", "");
		$dao->Campo("i.nombre", "");
		$dao->Campo("i.presentacion", "");
		$dao->Campo("l.id", "");
		$dao->Campo("u.id", "");
		$dao->Campo("f.id", "");
		$dao->Campo("i.codigo_barra", "");
		$dao->Campo("i.principio1", "");
		$dao->Campo("i.medida1", "");
		$dao->Campo("i.um1", "");
		$dao->Campo("i.principio2", "");
		$dao->Campo("i.medida2", "");
		$dao->Campo("i.um2", "");
		$dao->Campo("i.principio3", "");
		$dao->Campo("i.medida3", "");
		$dao->Campo("i.um3", "");
		$dao->Campo("i.principio4", "");
		$dao->Campo("i.medida4", "");
		$dao->Campo("i.um4", "");
		$dao->Campo("(i.cantidad1*i.cantidad2)+i.fracciones_stock", "");
		$dao->Campo("i.costo1", "");
		$dao->Campo("i.pvp1", ""); //22
		$dao->Campo("i.cantidad2", "");
		$dao->Campo("i.pvp2", ""); //24
		$dao->Campo("Date_format(i.fecha_caducidad,'%Y-%m-%d')", "");
		$dao->Campo("i.imagen", "");
		$dao->Campo("i.stock_minimo", "");
		$dao->Campo("e.descripcion", "");
		$dao->Campo("i.utilidad1", "");
		$dao->Campo("i.utilidad2", "");
		$dao->Campo("i.iva", "");
		$dao->Campo("i.nivel2", "");
		$dao->Campo("i.nivel1", "");
		$dao->Campo("i.pvp_caja", "");
		$dao->Campo("i.prst1", "");
		$dao->Campo("i.prst2", "");
		$dao->Campo("i.percha", "");
		$dao->Campo("i.tipo_pvp", ""); //38
		$dao->Campo("i.prescripcion", ""); //39
		$dao->Campo("i.descuento_efectivo", ""); //40
		$dao->Campo("i.descuento_tarjeta", ""); //41

		$dao->TablasInnerAlias("inventario", "i", "bodega", "b");
		$dao->TablasInnerAlias("inventario", "i", "linea", "l");
		$dao->TablasInnerAlias("inventario", "i", "unidad", "u");
		$dao->TablasInnerAlias("inventario", "i", "farmacologia", "f");
		$dao->TablasInnerAlias("inventario", "i", "estado", "e");
		$dao->Where("i.id_estado", "1", "AND");
		/*$dao->Diferente("i.cantidad1","0","and");
		$dao->Diferente("i.cantidad2","0","and");*/
		$dao->Where("i.id", $_POST['IdInventario'], "");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}


	////////////////////////////////////////////////////////////////////////////////////////////////

	if ($_POST['Requerimiento'] == "CargarComboPrincipio") {
		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("clasificacion", "");

		$dao->Tabla("clasificacion", "");
		$dao->Where("id_estado", "1", "");


		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CargarComboFarmacologia") {
		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("descripcion", "");

		$dao->Tabla("farmacologia", "");
		$dao->Where("id_estado", "1", "");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarComboLinea") {
		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("descripcion", "");

		$dao->Tabla("linea", "");
		$dao->Where("id_estado", "1", "");


		$dao->ConsultarAjax();
	}



	if ($_POST['Requerimiento'] == "CargarComboProveedores") {
		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("descripcion", "");

		$dao->Tabla("proveedor", "");
		$dao->Where("id_estado", "1", "");


		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarComboPresentacionGalenica") {
		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("descripcion", "");

		$dao->Tabla("unidad", "");
		$dao->Where("id_estado", "1", "");
		$dao->Ordenar("descripcion");

		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "AumentarStock") {

		$dao = new Dao();

		$dao->Campo("cantidad1", "");
		$dao->Campo("cantidad2", "");
		$dao->Campo("fracciones_stock", "");

		$dao->Tabla("inventario", "");
		$dao->Where("id", $_POST["Inventario"], "");

		$respuesta = $dao->Consultar();
		$cantidadAntigua = 0;
		$fracciones = 0;
		$cantidad2 = 0;
		$cantidad1 = 0;
		foreach ($respuesta as $row => $item) {
			$cantidadAntigua = $item[0];
			$cantidad1 = $item[0];
			$cantidad2 = $item[1];
			$fracciones = $item[2];
		}
		if ($_POST["Nivel"] == 1 || $_POST["Nivel"] == "Uno") {
			$cantidadAntigua = $cantidadAntigua + $_POST["Cantidad"];
			if ($_POST["Precio"] != "") {
				$pvpf_caja = $_POST["Precio"] / $cantidad2;
			}
			$datos = array(
				"cantidad1" => $cantidadAntigua,
				"pvp_caja" => $_POST["Precio"],
				"pvpf_caja" => $pvpf_caja
			);

			$dao = new Dao();
			$dao->ModificarAjax("inventario", $datos, "id=" . $_POST['Inventario'], $_POST['Inventario']);
		}

		if ($_POST["Nivel"] == 2 || $_POST["Nivel"] == "Dos") {

			$cantidadAntigua = ($cantidad1 * $cantidad2) + $fracciones;
			$cantidadAntigua = $cantidadAntigua + $_POST["Cantidad"];

			$cantidadNueva = intval($cantidadAntigua / $cantidad2);
			$fracciones_stock = $cantidadAntigua - ($cantidadNueva * $cantidad2);

			$pvp_caja = 0;
			if ($_POST["Precio"] != "") {
				$pvpf_caja = $_POST["Precio"] / $cantidad2;
			}


			$datos = array(
				"cantidad1" => $cantidadNueva,
				"fracciones_stock" => $fracciones_stock,
				"pvp_caja" => $_POST["Precio"],
				"pvpf_caja" => $pvpf_caja
			);

			$dao = new Dao();
			$dao->ModificarAjax("inventario", $datos, "id=" . $_POST['Inventario'], $_POST['Inventario']);
		}
	}

	if ($_POST['Requerimiento'] == "DisminuirStock") {

		$dao = new Dao();

		$dao->Campo("cantidad1", "");
		$dao->Campo("nombre", "");
		$dao->Campo("cantidad2", "");
		$dao->Campo("fracciones_stock", "");

		$dao->Tabla("inventario", "");
		$dao->Where("id", $_POST["Inventario"], "");

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
		if ($_POST["Nivel"] == 1) {
			if ($cantidadAntigua < $_POST["Cantidad"]) {
				$jsondata[0] = false;
				$jsondata[1] = $nombre . " NO CUENTA CON STOCK SUFICIENTE";
				echo json_encode($jsondata, JSON_FORCE_OBJECT);
			} else {
				$cantidadAntigua = $cantidadAntigua - $_POST["Cantidad"];

				$datos = array("cantidad1" => $cantidadAntigua);

				$dao = new Dao();
				$dao->ModificarAjax("inventario", $datos, "id=" . $_POST['Inventario'], $_POST['Inventario']);
			}
		} else {
			$totalFracciones = 0;
			if ($cantidad2 > 1) {
				$totalFracciones = ($cantidadAntigua * $cantidad2) + $fracciones;
			} else {
				$totalFracciones = $cantidadAntigua;
			}


			if ($totalFracciones < $_POST["Cantidad"]) {
				$jsondata[0] = false;
				$jsondata[1] = $nombre . " NO CUENTA CON STOCK SUFICIENTE";
				echo json_encode($jsondata, JSON_FORCE_OBJECT);
			} else {

				$cantidadNueva = $_POST["Cantidad"] / $cantidad2;

				$cantidadCaja = $cantidadAntigua - intval($cantidadNueva);

				$cantidadFraccion = $cantidadNueva - intval($cantidadNueva);

				$valorCantidadF = $cantidadFraccion * $cantidad2;

				$valorFraccionFinal = $fracciones - $valorCantidadF;

				$datos = array(
					"cantidad1" => $cantidadCaja,
					"fracciones_stock" => $valorFraccionFinal
				);

				$dao = new Dao();
				$dao->ModificarAjax("inventario", $datos, "id=" . $_POST['Inventario'], $_POST['Inventario']);
			}
		}
	}

	if ($_POST['Requerimiento'] == "DisminuirStockFarmacia") {

		$dao = new Dao();

		$dao->Campo("cantidad1", "");

		$dao->Tabla("inventario", "");
		$dao->Where("id", $_POST["Inventario"], "");

		$respuesta = $dao->Consultar();
		$cantidadAntigua = 0;

		foreach ($respuesta as $row => $item) {
			$cantidadAntigua = $item[0];
		}

		$total = $cantidadAntigua - $_POST["Cantidad"];
		$datos = array("cantidad1" => $total);

		$dao1 = new Dao();
		$dao1->ModificarAjax("inventario", $datos, "id=" . $_POST['Inventario'], $_POST['Inventario']);
	}

	if ($_POST['Requerimiento'] == "DisminuirStockFarmaciaFraccion") {

		$dao = new Dao();

		$dao->Campo("cantidad1", "");
		$dao->Campo("cantidad2", "");
		$dao->Campo("fracciones_stock", "");

		$dao->Tabla("inventario", "");
		$dao->Where("id", $_POST["Inventario"], "");

		$respuesta = $dao->Consultar();
		$cantidadAntigua = 0;
		$cantidadAntiguaF = 0;
		$fraccion = 0;

		foreach ($respuesta as $row => $item) {
			$cantidadAntigua = $item[0];
			$cantidadAntiguaF = $item[1];
			$fraccion = $item[2];
		}

		$cantidadNueva = $_POST["Cantidad"] / $cantidadAntiguaF;

		$cantidadCaja = $cantidadAntigua - intval($cantidadNueva);

		$cantidadFraccion = $cantidadNueva - intval($cantidadNueva);

		$valorCantidadF = $cantidadFraccion * $cantidadAntiguaF;

		$valorFraccionFinal = $fraccion - $valorCantidadF;

		$datos = array(
			"cantidad1" => $cantidadCaja,
			"fracciones_stock" => $valorFraccionFinal
		);

		$dao1 = new Dao();
		$dao1->ModificarAjax("inventario", $datos, "id=" . $_POST['Inventario'], $_POST['Inventario']);
	}

	if ($_POST['Requerimiento'] == "INGRESO") {

		$dao = new Dao();

		$dao->Campo("ss_cantidad", "");
		$dao->Campo("ss_total", "");

		$dao->Tabla("kardex", "");
		$dao->Where("id_inventario", $_POST["Inventario"], "");
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

		$dao->Tabla("inventario", "");
		$dao->Where("id", $_POST["Inventario"], "");

		$respuesta = $dao->Consultar();

		$utilidad1 = 0.0;
		$utilidad2 = 0.0;
		$iva = "N";
		$cantidad2 = 1;
		$cantidad1 = 0;
		foreach ($respuesta as $row => $item) {
			$utilidad1 = $item[0];
			$utilidad2 = $item[1];
			$iva = $item[2];
			$cantidad2 = $item[3];
			$cantidad1 = $item[4];
		}

		if ($_POST["Nivel"] == 2 || $_POST["Nivel"] == "Dos") {

			$cantidadAntigua = $cantidadAntigua + $_POST["Cantidad"];
			$total = $total + $_POST['Total'];
			$nuevoCosto = $total / $cantidadAntigua;
			$costoIngreso = $_POST['Total'] / $_POST["Cantidad"];

			$datos = array(
				"id_inventario" => $_POST["Inventario"],
				"concepto" => $_POST["Concepto"],
				"numero" => $_POST["Numero"],
				"e_cantidad" => $_POST["Cantidad"],
				"e_precio" => $costoIngreso,
				"e_total" => $_POST['Total'],
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $nuevoCosto,
				"ss_total" => $total
			);

			if (isset($_POST["Movimiento"])) {
				$datos['id_movimiento_bodega'] = $_POST["Movimiento"];
			}
			if (isset($_POST["Proveedor"])) {
				if ($_POST["Proveedor"] != "Seleccionar..") {
					$datos['proveedor'] = $_POST["Proveedor"];
				}
			}
			//pvp2 precio caja

			$pvpNuevo = (($nuevoCosto * $cantidad2) * ($utilidad2 / 100)) + ($nuevoCosto * $cantidad2);

			$pvpNuevo2 = ($nuevoCosto * ($utilidad1 / 100)) + $nuevoCosto;



			if (isset($_POST['Total'])) {
				$datos2 = array(
					"costo1" => ($nuevoCosto),
					"pvp1" => round($pvpNuevo2, 2),
					"pvp2" => round($pvpNuevo, 2)
				);

				$dao = new Dao();
				$dao->Modificar("inventario", $datos2, "id=" . $_POST['Inventario'], $_POST['Inventario']);

				$dao = new Dao();
				$dao->GuardarAjax("kardex", $datos);
			}
		} else {

			$cantidadAntigua = $cantidadAntigua + ($_POST["Cantidad"] * $cantidad2);

			$total = $total + $_POST['Total'];
			$nuevoCosto = $total / $cantidadAntigua;
			$costoIngreso = $_POST['Total'] / $_POST["Cantidad"];

			$datos = array(
				"id_inventario" => $_POST["Inventario"],
				"concepto" => $_POST["Concepto"],
				"numero" => $_POST["Numero"],
				"e_cantidad" => ($_POST["Cantidad"] * $cantidad2),
				"e_precio" => ($costoIngreso / $cantidad2),
				"e_total" => $_POST['Total'],
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $nuevoCosto,
				"ss_total" => $total
			);

			if (isset($_POST["Movimiento"])) {
				$datos['id_movimiento_bodega'] = $_POST["Movimiento"];
			}
			if (isset($_POST["Proveedor"])) {
				if ($_POST["Proveedor"] != "Seleccionar..") {
					$datos['proveedor'] = $_POST["Proveedor"];
				}
			}

			$pvpNuevo = (($nuevoCosto * $cantidad2) * ($utilidad2 / 100)) + ($nuevoCosto * $cantidad2);
			$pvpNuevo2 = ($nuevoCosto * ($utilidad1 / 100)) + $nuevoCosto;

			if (isset($_POST['Total'])) {
				$datos2 = array(
					"costo1" => ($nuevoCosto),
					"pvp1" => round($pvpNuevo2, 2),
					"pvp2" => round($pvpNuevo, 2)
				);

				$dao = new Dao();
				$dao->Modificar("inventario", $datos2, "id=" . $_POST['Inventario'], $_POST['Inventario']);
			}


			$dao = new Dao();
			$dao->GuardarAjax("kardex", $datos);
		}
	}

	if ($_POST['Requerimiento'] == "INGRESOkardexFactura") {

		$dao = new Dao();

		$dao->Campo("ss_cantidad", "");
		$dao->Campo("ss_total", "");
		$dao->Campo("ss_precio", "");

		$dao->Tabla("kardex", "");
		$dao->Where("id_inventario", $_POST["Inventario"], "");
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
			$nuevoCosto = $item[2];
		}

		$dao = new Dao();

		$dao->Campo("utilidad1", "");
		$dao->Campo("utilidad2", "");
		$dao->Campo("iva", "");
		$dao->Campo("cantidad2", "");
		$dao->Campo("cantidad1", "");

		$dao->Tabla("inventario", "");
		$dao->Where("id", $_POST["Inventario"], "");

		$respuesta = $dao->Consultar();

		$utilidad1 = 0.0;
		$utilidad2 = 0.0;
		$iva = "N";
		$cantidad2 = 1;
		$cantidad1 = 0;
		foreach ($respuesta as $row => $item) {
			$utilidad1 = $item[0];
			$utilidad2 = $item[1];
			$iva = $item[2];
			$cantidad2 = $item[3];
			$cantidad1 = $item[4];
		}

		if ($_POST["Nivel"] == 2 || $_POST["Nivel"] == "Dos") {

			$cantidadAntigua = $cantidadAntigua + $_POST["Cantidad"];
			$total = $total + ($_POST['Cantidad'] * $nuevoCosto);


			$datos = array(
				"id_inventario" => $_POST["Inventario"],
				"concepto" => $_POST["Concepto"],
				"numero" => $_POST["Numero"],
				"e_cantidad" => $_POST["Cantidad"],
				"e_precio" => $nuevoCosto,
				"e_total" => ($_POST['Cantidad'] * $nuevoCosto),
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $nuevoCosto,
				"ss_total" => $total
			);


			$dao = new Dao();
			$dao->GuardarAjax("kardex", $datos);
		} else {

			$cantidadAntigua = $cantidadAntigua + ($_POST["Cantidad"] * $cantidad2);

			$total = $total + (($_POST["Cantidad"] * $cantidad2) * $nuevoCosto);



			$datos = array(
				"id_inventario" => $_POST["Inventario"],
				"concepto" => $_POST["Concepto"],
				"numero" => $_POST["Numero"],
				"e_cantidad" => ($_POST["Cantidad"] * $cantidad2),
				"e_precio" => ($nuevoCosto),
				"e_total" => (($_POST["Cantidad"] * $cantidad2) * $nuevoCosto),
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $nuevoCosto,
				"ss_total" => $total
			);



			$dao = new Dao();
			$dao->GuardarAjax("kardex", $datos);
		}
	}

	if ($_POST['Requerimiento'] == "EGRESO") {

		$dao = new Dao();

		$dao->Campo("ss_cantidad", "");
		$dao->Campo("ss_total", "");
		$dao->Campo("ss_precio", "");

		$dao->Tabla("kardex", "");
		$dao->Where("id_inventario", $_POST["Inventario"], "");
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


		if ($_POST["Nivel"] == 2 || $_POST["Nivel"] == "Dos") {

			/////////////////////////////////////////////////////////		
			$cantidadAntigua = $cantidadAntigua - $_POST["Cantidad"];
			$total = $total - $_POST['Total'];

			if ($cantidadAntigua < 1) {
				$nuevoCosto = 0.0;
			} else {
				$nuevoCosto = $total / $cantidadAntigua;
			}


			$datos = array(
				"id_inventario" => $_POST["Inventario"],
				"concepto" => $_POST["Concepto"],
				"numero" => $_POST["Numero"],
				"s_cantidad" => $_POST["Cantidad"],
				"s_precio" => $costoAntiguo,
				"s_total" => $_POST['Total'],
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $nuevoCosto,
				"ss_total" => ($cantidadAntigua * $nuevoCosto)
			);

			if (isset($_POST["Movimiento"])) {
				$datos['id_movimiento_bodega'] = $_POST["Movimiento"];
			}
			if (isset($_POST["Proveedor"])) {
				if ($_POST["Proveedor"] != "Seleccionar..") {
					$datos['proveedor'] = $_POST["Proveedor"];
				}
			}


			/*$datos2 = array("costo1"=>$nuevoCosto);

			$dao= new Dao();
			$dao->Modificar("inventario",$datos2,"id=".$_POST['Inventario'],$_POST['Inventario']);	*/

			$dao = new Dao();
			$dao->GuardarAjax("kardex", $datos);
		} else {

			$dao = new Dao();

			$dao->Campo("cantidad2", "");
			$dao->Campo("cantidad1", "");

			$dao->Tabla("inventario", "");
			$dao->Where("id", $_POST["Inventario"], "");

			$respuesta = $dao->Consultar();

			$cantidad2 = 1;
			$cantidad1 = 0;
			foreach ($respuesta as $row => $item) {
				$cantidad2 = $item[0];
				$cantidad1 = $item[1];
			}
			/////////////////////////////////////////////////////////		
			$cantidadAntigua = $cantidadAntigua - ($_POST["Cantidad"] * $cantidad2);
			$total = $total - (($_POST["Cantidad"] * $cantidad2) * $costoAntiguo);

			if ($cantidadAntigua < 1) {
				$nuevoCosto = 0.0;
			} else {
				$nuevoCosto = $total / $cantidadAntigua;
			}


			$datos = array(
				"id_inventario" => $_POST["Inventario"],
				"concepto" => $_POST["Concepto"],

				"numero" => $_POST["Numero"],
				"s_cantidad" => $_POST["Cantidad"] * $cantidad2,
				"s_precio" => round($costoAntiguo, 2),
				"s_total" => round(($_POST["Cantidad"] * $cantidad2) * $costoAntiguo, 2),
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => round($nuevoCosto, 2),
				"ss_total" => round($total, 2)
			);

			if (isset($_POST["Movimiento"])) {
				$datos['id_movimiento_bodega'] = $_POST["Movimiento"];
			}
			if (isset($_POST["Proveedor"])) {
				if ($_POST["Proveedor"] != "Seleccionar..") {
					$datos['proveedor'] = $_POST["Proveedor"];
				}
			}

			/*$datos2 = array("costo1"=>$nuevoCosto);

			$dao= new Dao();
			$dao->Modificar("inventario",$datos2,"id=".$_POST['Inventario'],$_POST['Inventario']);	*/

			$dao = new Dao();
			$dao->GuardarAjax("kardex", $datos);
		}
	}

	if ($_POST['Requerimiento'] == "EgresoKardex") {

		$dao = new Dao();

		$dao->Campo("ss_cantidad", "");
		$dao->Campo("ss_total", "");
		$dao->Campo("ss_precio", "");

		$dao->Tabla("kardex", "");
		$dao->Where("id_inventario", $_POST["Inventario"], "");
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

		if ($_POST["Nivel"] == 2 || $_POST["Nivel"] == "Dos") {
			$cantidadAntigua = $cantidadAntigua - $_POST["Cantidad"];
			$total = $total - ($_POST["Cantidad"] * $costoAntiguo);
			//$nuevoCosto = $total / $cantidadAntigua;

			$datos = array(
				"id_inventario" => $_POST["Inventario"],
				"concepto" => "VENTAS",
				"numero" => $_POST["Numero"],
				"s_cantidad" => $_POST["Cantidad"],
				"s_precio" => $costoAntiguo,
				"s_total" => ($_POST["Cantidad"] * $costoAntiguo),
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $costoAntiguo,
				"ss_total" => $total
			);

			$dao = new Dao();
			$dao->GuardarAjax("kardex", $datos);
		} else {

			$dao = new Dao();
			$dao->Campo("cantidad2", "");
			$dao->Tabla("inventario", "");
			$dao->Where("id", $_POST["Inventario"], "");
			$respuesta = $dao->Consultar();


			$cantidad2 = 1;

			foreach ($respuesta as $row => $item) {
				$cantidad2 = $item[0];
			}

			$cantidadAntigua = $cantidadAntigua - ($_POST["Cantidad"] * $cantidad2);
			$total = $total - (($_POST["Cantidad"] * $cantidad2) * $costoAntiguo);
			//$nuevoCosto = $total / $cantidadAntigua;

			$datos = array(
				"id_inventario" => $_POST["Inventario"],
				"concepto" => "VENTAS",
				"numero" => $_POST["Numero"],
				"s_cantidad" => ($_POST["Cantidad"] * $cantidad2),
				"s_precio" => $costoAntiguo,
				"s_total" => (($_POST["Cantidad"] * $cantidad2) * $costoAntiguo),
				"ss_cantidad" => $cantidadAntigua,
				"ss_precio" => $costoAntiguo,
				"ss_total" => $total
			);

			$dao = new Dao();
			$dao->GuardarAjax("kardex", $datos);
		}
	}

	if ($_POST['Requerimiento'] == "CargarKardex") {
		$dao = new Dao();

		$dao->Campo("CONVERT(k.fecha_registro,DATE)", "");
		$dao->Campo("k.concepto", "");
		$dao->Campo("k.numero", "");

		$dao->Campo("k.e_cantidad", "");
		$dao->Campo("k.e_precio", "");
		$dao->Campo("k.e_total", "");

		$dao->Campo("k.s_cantidad", "");
		$dao->Campo("k.s_precio", "");
		$dao->Campo("k.s_total", "");

		$dao->Campo("k.ss_cantidad", "");
		$dao->Campo("k.ss_precio", "");
		$dao->Campo("k.ss_total", "");

		$dao->Campo("i.nombre", "");
		$dao->Campo("k.id_movimiento_bodega", "");

		$dao->TablasInnerAlias("kardex", "k", "inventario", "i");
		$dao->In_Where("id_inventario", $_POST['Inventario'], "and");
		$dao->Entre("CONVERT(k.fecha_registro,DATE)", '"' . $_POST['FechaDesde'] . '"', '"' . $_POST['FechaHasta'] . '"', "");


		$dao->ConsultarAjax();
	}


	if ($_POST['Requerimiento'] == "CargarMovimientoConsulta") {

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("CASE WHEN id_motivo =22 THEN CONCAT('FC','-',numero) WHEN id_motivo =23 THEN CONCAT('NC','-',numero) ELSE numero END", "");
		$dao->Campo("id_bodega", "");
		$dao->Campo("id_proveedor", "");
		$dao->Campo("tipo", "");
		$dao->Campo("id_motivo", "");
		$dao->Campo("CONVERT(fecha,DATE)", "");
		$dao->Campo("observaciones", "");
		$dao->Campo("subtotal", "");
		$dao->Campo("iva", "");
		$dao->Campo("descuento", "");
		$dao->Campo("total", "");


		$dao->Tabla("movimiento_bodega", "");
		$dao->Where("id", $_POST['Id'], "");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}


	if ($_POST['Requerimiento'] == "CargarMovimientoItems") {

		$dao = new Dao();

		$dao->Campo("m.*", "");
		$dao->Campo("i.nombre", "");
		$dao->Campo("i.iva", "");
		$dao->Campo("i.presentacion", "");


		$dao->TablasInnerAlias("movimiento_bodega_item", "m", "inventario", "i");

		$dao->Where("m.id_movimiento_bodega", $_POST['Movimiento'], "");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());



	}

	if ($_POST['Requerimiento'] == "GuardarTemporal") {
		$dao = new Dao();

		$dao->Campo("cantidad1", "");
		$dao->Campo("cantidad2", "");
		$dao->Campo("fracciones_stock", "");

		$dao->Tabla("inventario", "");
		$dao->Where("id", $_POST["Inventario"], "");

		$respuesta = $dao->Consultar();
		$cantidadAntigua = 0;
		$cantidadAntiguaF = 0;
		$fraccion = 0;
		$cantidad = 0;
		$fracciones = 0;
		foreach ($respuesta as $row => $item) {
			$cantidadAntigua = $item[0];
			$cantidadAntiguaF = $item[1];
			$fraccion = $item[2];
		}

		$datos2 = array(
			"id_inventario" => $_POST["Inventario"],
			"nivel" => $_POST["Nivel"],
			"cantidad" => $_POST["Cantidad"],
			"punto_emision" => $_POST["PuntoEmision"]
		);
		$dao2 = new Dao();
		$dao2->Guardar("inventario_temporal", $datos2);

		if ($_POST["Nivel"] == "Uno") {
			$cantidadAntigua = $cantidadAntigua - $_POST["Cantidad"];
		} else {
			$fracciones = ($cantidadAntigua * $cantidadAntiguaF) + $fraccion;
			$fracciones = $fracciones - $_POST["Cantidad"];

			$cantidad = intval($fracciones / $cantidadAntiguaF);
			$fracciones = $fracciones - ($cantidad * $cantidadAntiguaF);
		}
		$cantidadCaja = $cantidad;
		$valorFraccionFinal = $fracciones;
		/*$nuevaCantidad = $cantidadAntigua - $_POST["Cantidad"];
		$cantidadNueva = $_POST["Cantidad"] / $cantidadAntiguaF;
		$cantidadCaja = $cantidadAntigua - intval($cantidadNueva);
		$cantidadFraccion = $cantidadNueva - intval($cantidadNueva);
		$valorCantidadF = $cantidadFraccion * $cantidadAntiguaF;
		$valorFraccionFinal = $fraccion - $valorCantidadF;*/
		if ($cantidadAntigua < 0) {
			$cantidadAntigua = 0;
		}
		if ($cantidadCaja < 0) {
			$cantidadCaja = 0;
		}
		if ($valorFraccionFinal < 0) {
			$valorFraccionFinal = 0;
		}
		if ($_POST["Nivel"] == "Uno") {
			$datos1 = array("cantidad1" => $cantidadAntigua);
		} else {
			$datos1 = array(
				"cantidad1" => $cantidadCaja,
				"fracciones_stock" => $valorFraccionFinal
			);
		}

		$dao1 = new Dao();
		$dao1->ModificarAjax("inventario", $datos1, "id=" . $_POST['Inventario'], $_POST['Inventario']);
	}

	if ($_POST['Requerimiento'] == "EliminarTemporal") {
		$dao = new Dao();

		$dao->Campo("cantidad", "");
		$dao->Tabla("inventario_temporal", "");
		$dao->Where("id_inventario", $_POST["Inventario"], "and");
		$dao->Where("nivel", '"' . $_POST["Nivel"] . '"', "and");
		$dao->Where("punto_emision", $_POST["PuntoEmision"], "");

		$respuesta = $dao->Consultar();

		$dao3 = new Dao();

		$dao3->Campo("cantidad1", "");
		$dao3->Campo("cantidad2", "");
		$dao3->Campo("fracciones_stock", "");
		$dao3->Tabla("inventario", "");
		$dao3->Where("id", $_POST["Inventario"], "");

		$respuesta3 = $dao3->Consultar();

		$cantidadAntigua = 0;
		$cantidadAntiguaF = 0;
		$fraccion = 0;
		$cantidadSumar = 0;
		$fracciones = 0;
		$cantidad = 0;
		foreach ($respuesta as $row => $item) {
			$cantidadSumar = $item[0];
		}

		foreach ($respuesta3 as $row3 => $item3) {
			$cantidadAntigua = $item3[0];
			$cantidadAntiguaF = $item3[1];
			$fraccion = $item3[2];
		}
		if ($_POST["Nivel"] == "Uno") {
			$cantidadAntigua = $cantidadAntigua + $cantidadSumar;
		} else {
			$fracciones = ($cantidadAntigua * $cantidadAntiguaF) + $fraccion;
			$fracciones = $fracciones + $cantidadSumar;

			$cantidad = intval($fracciones / $cantidadAntiguaF);
			$fracciones = $fracciones - ($cantidad * $cantidadAntiguaF);
		}

		$cantidadCaja = $cantidad;
		$valorFraccionFinal = $fracciones;

		$dao2 = new Dao();
		$dao2->Eliminar("inventario_temporal", "id_inventario = " . $_POST['Inventario'] . " and nivel = '" . $_POST["Nivel"] . "' and punto_emision = " . $_POST["PuntoEmision"]);


		if ($_POST["Nivel"] == "Uno") {
			$datos1 = array("cantidad1" => $cantidadAntigua);
		} else {
			$datos1 = array(
				"cantidad1" => $cantidadCaja,
				"fracciones_stock" => $valorFraccionFinal
			);
		}
		$dao1 = new Dao();
		$dao1->ModificarAjax("inventario", $datos1, "id=" . $_POST['Inventario'], $_POST['Inventario']);
	}

	if ($_POST['Requerimiento'] == "DestruirTemporal") {

		$dao = new Dao();
		$dao->Eliminar("inventario_temporal", "id_inventario = " . $_POST['Inventario'] . " and nivel = '" . $_POST["Nivel"] . "' and punto_emision = " . $_POST["PuntoEmision"]);
	}

	if ($_POST['Requerimiento'] == "DestruirTablaTemporal") {
		$dao = new Dao();

		$dao->Campo("cantidad", "");
		$dao->Campo("id_inventario", "");
		$dao->Campo("nivel", "");
		$dao->Tabla("inventario_temporal", "");
		$dao->Where("punto_emision", $_SESSION["puntoVentaSecuencia"], "");

		$respuesta = $dao->Consultar();

		$Inventario = 0;
		$cantidadSumar = 0;
		$nivel = '';

		foreach ($respuesta as $row => $item) {

			$cantidadSumar = $item[0];
			$Inventario = $item[1];
			$nivel = $item[2];

			$dao3 = new Dao();

			$dao3->Campo("cantidad1", "");
			$dao3->Campo("cantidad2", "");
			$dao3->Campo("fracciones_stock", "");
			$dao3->Tabla("inventario", "");
			$dao3->Where("id", $Inventario, "");

			$respuesta3 = $dao3->Consultar();

			$cantidadAntigua = 0;
			$cantidadAntiguaF = 0;
			$fraccion = 0;

			foreach ($respuesta3 as $row3 => $item3) {
				$cantidadAntigua = $item3[0];
				$cantidadAntiguaF = $item3[1];
				$fraccion = $item3[2];
			}

			$dao2 = new Dao();
			$dao2->Eliminar("inventario_temporal", "id_inventario = " . $Inventario . " and nivel = '" . $nivel . "' and punto_emision = " . $_SESSION["puntoVentaSecuencia"]);



			if ($nivel == "Uno") {
				$cantidadAntigua = $cantidadAntigua + $cantidadSumar;
				$datos1 = array("cantidad1" => $cantidadAntigua);
			} else {

				$fracciones = ($cantidadAntigua * $cantidadAntiguaF) + $fraccion;
				$fracciones = $fracciones + $cantidadSumar;

				$cantidad = intval($fracciones / $cantidadAntiguaF);
				$fracciones = $fracciones - ($cantidad * $cantidadAntiguaF);

				$cantidadCaja = $cantidad;
				$valorFraccionFinal = $fracciones;
				$datos1 = array(
					"cantidad1" => $cantidadCaja,
					"fracciones_stock" => $valorFraccionFinal
				);
			}
			$dao1 = new Dao();
			$dao1->ModificarAjax("inventario", $datos1, "id=" . $Inventario, $Inventario);
		}
	}

	if ($_POST['Requerimiento'] == "LlenarTablaFacturas") {

		$dao = new Dao();

		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
		$dao->Campo("c.id_paciente_cliente", "");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')", "");
		$dao->Campo("c.total", "");
		$dao->Campo("c.id_estado", "");
		$dao->Campo("c.nc", "");

		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");
		$dao->In_Where("c.id_estado", "1,9,13,19,21", "and");
		$dao->Where("CONVERT(c.fecha_registro,DATE)", 'CURDATE()', "and");

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

		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
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
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$boton = '';
			if ($item[5] == 21) {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger">Anulada</button>';
			}
			$sub_array[] = $boton;
			$sub_array[] = $item[6];

			$data[] = $sub_array;
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("consulta", "");
		$dao->In_Where("id_estado", "1,9,13,19", "");

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

	//////////////////////////////////////////////////////////////////////////////////////////////
	if ($_POST['Requerimiento'] == "LlenarTablaFacturasConFechas") {

		$dao = new Dao();

		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
		$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente", "");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')", "");
		$dao->Campo("c.total", "");
		$dao->Campo("c.id_estado", "");
		$dao->Campo("c.autorizada", "");
		$dao->Campo("c.nc", "");

		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");
		$dao->TablasInnerAlias("consulta", "c", "paciente_cliente", "pc");
		$dao->In_Where("c.id_estado", "1,9,13,19,21", "and");

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
				$dao->Filtrar("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre)", $_POST['columns'][1]["search"]["value"], "and");
				//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}

		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("CONCAT(pc.apellido,' ',pc.nombre)", $_POST['columns'][2]["search"]["value"], "");
				//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("c.id desc");


		$respuesta = $dao->Consultar();

		$data = array();
		$total = 0;
		foreach ($respuesta as $row => $item) {
			$total++;
			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$boton = '';
			if ($item[6] == 'N') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-warning">No Autorizada</button>';
			}
			if ($item[6] == 'S') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-success">Autorizada</button>';
			}
			if ($item[5] == 21) {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger">Anulada</button>';
			}
			$sub_array[] = $boton;
			$sub_array[] = $item[7];
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
	if ($_POST['Requerimiento'] == "LlenarTablaFacturasnc") {

		$dao = new Dao();

		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
		$dao->Campo("c.id_paciente_cliente", "");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')", "");
		$dao->Campo("c.total", "");
		$dao->Campo("c.id_estado", "");
		$dao->Campo("c.autorizada", "");

		$dao->TablasInnerAlias("consulta", "c", "paciente", "p");
		$dao->TablasInnerAlias("consulta", "c", "paciente_cliente", "pc");

		$dao->Where("c.nc", "1", "and");
		$dao->Diferente("c.id_estado", "21", "and");

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
				$dao->Filtrar("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre)", $_POST['columns'][1]["search"]["value"], "and");
				//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}

		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("CONCAT(pc.apellido,' ',pc.nombre)", $_POST['columns'][2]["search"]["value"], "");
				//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("c.fecha_registro desc");


		$respuesta = $dao->Consultar();

		$data = array();

		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
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
			//$sub_array[] =$item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$boton = '';
			if ($item[6] == 'N') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger">No Autorizada</button>';
			}
			if ($item[6] == 'S') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-success">Autorizada</button>';
			}
			if ($item[5] == 21) {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger">Anulada</button>';
			}
			$sub_array[] = $boton;
			$data[] = $sub_array;
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("consulta", "");
		$dao->In_Where("id_estado", "1,9,13,19", "");

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

	if ($_POST['Requerimiento'] == "LlenarTablaFacturasFarmacia") {

		$dao = new Dao();

		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.nombre) paciente", "");
		$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente", "");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')", "");
		$dao->Campo("c.total", "");
		$dao->Campo("c.id_estado", "");
		$dao->Campo("c.autorizada", "");

		$dao->TablasInnerAlias("farmacia", "c", "paciente", "p");
		$dao->TablasInnerAlias("farmacia", "c", "paciente_cliente", "pc");
		$dao->In_Where("c.id_estado", "1,9,13,19,21", "and");
		$dao->Where("CONVERT(c.fecha_registro,DATE)", 'CURDATE()', "and");

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
				$dao->Filtrar("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre)", $_POST['columns'][1]["search"]["value"], "and");
				//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}

		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("CONCAT(pc.apellido,' ',pc.nombre)", $_POST['columns'][2]["search"]["value"], "");
				//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		//$dao->Ordenar("fecha_registro");  


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


		Array_sort_by($respuesta, 'numero', $order = SORT_ASC);


		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];

			$boton = '';
			if ($item[6] == 'N') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger">No Autorizada</button>';
			}
			if ($item[6] == 'S') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-success">Autorizada</button>';
			}
			if ($item[5] == 21) {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger">Anulada</button>';
			}
			$sub_array[] = $boton;

			$data[] = $sub_array;
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("farmacia", "");
		$dao->In_Where("id_estado", "1,9,13,19,21", "");

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

	if ($_POST['Requerimiento'] == "LlenarTablaFacturasConFechasFarmacia") {

		$dao = new Dao();

		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
		$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente", "");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')", "");
		$dao->Campo("c.total", "");
		$dao->Campo("c.id_estado", "");
		$dao->Campo("c.autorizada", "");

		$dao->TablasInnerAlias("farmacia", "c", "paciente", "p");
		$dao->TablasInnerAlias("farmacia", "c", "paciente_cliente", "pc");
		$dao->In_Where("c.id_estado", "1,9,13,19,21", "and");

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
				$dao->Filtrar("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre)", $_POST['columns'][1]["search"]["value"], "and");
				//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}

		if (isset($_POST['columns'][2]["search"]["value"])) {
			if (trim($_POST['columns'][2]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("CONCAT(pc.apellido,' ',pc.nombre)", $_POST['columns'][2]["search"]["value"], "");
				//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("c.numero desc");

		$respuesta = $dao->Consultar();

		$data = array();



		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];

			$boton = '';
			if ($item[6] == 'N') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-warning">No Autorizada</button>';
			}
			if ($item[6] == 'S') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-success">Autorizada</button>';
			}
			if ($item[5] == 21) {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger">Anulada</button>';
			}
			$sub_array[] = $boton;

			$data[] = $sub_array;
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("farmacia", "");
		$dao->In_Where("id_estado", "1,9,13,19,21", "");

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
	if ($_POST['Requerimiento'] == "LlenarTablaFacturasConFechasFarmacianc") {

		$dao = new Dao();

		$dao->Campo("c.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.nombre) paciente", "");
		$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente", "");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')", "");
		$dao->Campo("c.total", "");
		$dao->Campo("c.id_estado", "");
		$dao->Campo("c.autorizada", "");

		$dao->TablasInnerAlias("farmacia", "c", "paciente", "p");
		$dao->TablasInnerAlias("farmacia", "c", "paciente_cliente", "pc");
		$dao->Diferente("c.id_estado", "21", "and");
		$dao->Where("c.nc", "1", "and");


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
				$dao->Filtrar("CONCAT(pc.apellido,' ',pc.nombre)", $_POST['columns'][2]["search"]["value"], "");
				//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("c.id desc");

		$respuesta = $dao->Consultar();

		$data = array();

		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];

			$boton = '';
			if ($item[6] == 'N') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-warning">No Autorizada</button>';
			}
			if ($item[6] == 'S') {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-success">Autorizada</button>';
			}
			if ($item[5] == 21) {
				$boton = '<button idEstado=' . $item[5] . ' type="button" class="btn btn-sm btn-danger">Anulada</button>';
			}
			$sub_array[] = $boton;

			$data[] = $sub_array;
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("farmacia", "");
		$dao->In_Where("id_estado", "1,9,13,19", "and");
		$dao->Where("nc", "1", "");

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

	if ($_POST['Requerimiento'] == "LlenarTablaNc") {

		$dao = new Dao();

		$dao->Campo("c.numero", "");
		$dao->Campo("f.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
		$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente", "");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')", "");
		$dao->Campo("c.total", "");
		$dao->Campo("c.id_estado", "");
		$dao->Campo("c.autorizada", "");

		$dao->TablasInnerAlias("nc_farmacia", "c", "paciente", "p");
		$dao->TablasInnerAlias("nc_farmacia", "c", "farmacia", "f");
		$dao->TablasInnerAlias("nc_farmacia", "c", "paciente_cliente", "pc");

		$dao->In_Where("c.id_estado", "1", "and");

		if (isset($_POST["search"]["value"])) {
			$dao->Filtrar("CONCAT(c.numero,' ',p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',pc.apellido,' ',pc.nombre)", $_POST["search"]["value"], "");
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("c.fecha_registro desc");
		$respuesta = $dao->Consultar();
		$total = 0;
		$data = array();
		foreach ($respuesta as $row => $item) {
			$total++;
			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];

			$boton = '';
			if ($item[7] == 'N') {
				$boton = '<button idEstado=' . $item[6] . ' type="button" class="btn btn-sm btn-warning col-md-12 nopadding">No Autorizada</button>';
			}
			if ($item[7] == 'D') {
				$boton = '<button idEstado=' . $item[6] . ' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Devuelta</button>';
			}
			if ($item[7] == 'S') {
				$boton = '<button idEstado=' . $item[6] . ' type="button" class="btn btn-sm btn-success col-md-12 nopadding">Autorizada</button>';
			}
			if ($item[6] == 21) {
				$boton = '<button idEstado=' . $item[6] . ' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Anulada</button>';
			}
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
	if ($_POST['Requerimiento'] == "LlenarTablaReporteNc") {

		$dao = new Dao();

		$dao->Campo("c.numero", "");
		$dao->Campo("f.numero", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
		$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente", "");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')", "");
		$dao->Campo("c.total", "");
		$dao->Campo("c.id_estado", "");
		$dao->Campo("c.autorizada", "");

		$dao->TablasInnerAlias("nc_farmacia", "c", "paciente", "p");
		$dao->TablasInnerAlias("nc_farmacia", "c", "farmacia", "f");
		$dao->TablasInnerAlias("nc_farmacia", "c", "paciente_cliente", "pc");

		$dao->In_Where("c.id_estado", "1", "and");

		if (isset($_POST["search"]["value"])) {
			$dao->Filtrar("CONCAT(c.numero,' ',p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',pc.apellido,' ',pc.nombre)", $_POST["search"]["value"], "and");
		}
		if (trim($_POST['columns'][1]["search"]["value"]) == "") {
			$dao->Where("CONVERT(c.fecha_registro,DATE)", 'CURDATE()', "");
		} else {

			$dao->Entre("CONVERT(c.fecha_registro,DATE)", "'" . $_POST['columns'][1]["search"]["value"] . "'", "'" . $_POST['columns'][2]["search"]["value"] . "'", "");
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("c.fecha_registro desc");
		$respuesta = $dao->Consultar();
		$total = 0;
		$data = array();
		foreach ($respuesta as $row => $item) {
			$total++;
			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];

			$boton = '';
			if ($item[7] == 'N') {
				$boton = '<button idEstado=' . $item[6] . ' type="button" class="btn btn-sm btn-warning col-md-12 nopadding">No Autorizada</button>';
			}
			if ($item[7] == 'D') {
				$boton = '<button idEstado=' . $item[6] . ' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Devuelta</button>';
			}
			if ($item[7] == 'S') {
				$boton = '<button idEstado=' . $item[6] . ' type="button" class="btn btn-sm btn-success col-md-12 nopadding">Autorizada</button>';
			}
			if ($item[6] == 21) {
				$boton = '<button idEstado=' . $item[6] . ' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Anulada</button>';
			}
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

	if ($_POST['Requerimiento'] == "LlenarTablaOrdenes") {

		$dao = new Dao();

		$dao->Campo("o.id", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.nombre) paciente", "");
		$dao->Campo("Date_format(o.fecha_registro,'%Y-%m-%d')", "");

		$dao->TablasInnerAlias("orden", "o", "paciente", "p");
		$dao->In_Where("o.id_estado", "1,9,13,19", "and");
		$dao->Where("CONVERT(o.fecha_registro,DATE)", '"' . date("Y-m-d") . '"', "and");

		$apellidosBuscar = "";

		if (isset($_POST['columns'][0]["search"]["value"])) {
			if (trim($_POST['columns'][0]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("o.id", $_POST['columns'][0]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("CONCAT(p.apellido,' ',p.nombre)", $_POST['columns'][1]["search"]["value"], "");
				//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("o.fecha_registro");


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

		array_sort_by($respuesta, 'id', $order = SORT_ASC);

		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];

			$data[] = $sub_array;
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("orden", "");
		$dao->In_Where("id_estado", "1,9,13,19", "");

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

	if ($_POST['Requerimiento'] == "LlenarTablaOrdenesFechas") {

		$dao = new Dao();

		$dao->Campo("o.id", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
		$dao->Campo("Date_format(o.fecha_registro,'%Y-%m-%d')", "");

		$dao->TablasInnerAlias("orden", "o", "paciente", "p");
		$dao->In_Where("o.id_estado", "1,9,13,19", "and");

		if (isset($_POST['columns'][0]["search"]["value"])) {
			if (trim($_POST['columns'][0]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("o.id", $_POST['columns'][0]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre)", $_POST['columns'][1]["search"]["value"], "");
			}
		}

		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("o.id desc");

		$respuesta = $dao->Consultar();
		$data = array();
		$total = 0;
		foreach ($respuesta as $row => $item) {
			$total++;
			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];

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


	if ($_POST['Requerimiento'] == "LlenarTablaFacturasConFechasFarmaciaSri") {

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

		$dao->TablasInnerAlias("farmacia", "c", "paciente", "p");
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


	if ($_POST['Requerimiento'] == "CargarReceta") {

		$dao = new Dao();

		$dao->Campo("r.id", "");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente", "");
		$dao->Campo("CONCAT(e.apellidos,' ',e.nombres) doctor", "");
		$dao->Campo("r.fecha_registro", "");

		$dao->TablasInnerAlias("receta", "r", "paciente", "p");
		$dao->TablasInnerAlias("receta", "r", "empleado", "e");
		$dao->Where("r.id_estado", "1", "and");

		if (isset($_POST['columns'][0]["search"]["value"])) {
			if (trim($_POST['columns'][0]["search"]["value"]) == "") {
				$dao->Where("1", "1", "and");
			} else {
				$dao->Filtrar("r.id", $_POST['columns'][0]["search"]["value"], "and");
			}
		}
		if (isset($_POST['columns'][1]["search"]["value"])) {
			if (trim($_POST['columns'][1]["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre)", $_POST['columns'][1]["search"]["value"], "");
				//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}


		if ($_POST["length"] != -1) {
			$dao->Limite($_POST['start'] . "," . $_POST['length']);
		}

		$dao->Ordenar("r.fecha_registro desc");


		$respuesta = $dao->Consultar();

		$data = array();
		$total = 0;
		foreach ($respuesta as $row => $item) {

			$sub_array = array();

			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];

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

	if ($_POST['Requerimiento'] == "CargarExistencias") {

		$dao = new Dao();
		$dao->Campo("i.id", "");
		$dao->Campo("i.nombre", "");
		$dao->Tabla("inventario", "i");
		$dao->Where("i.id_estado", "1", "and");
		$dao->Where("id_bodega", $_POST['Bodega'], "");
		$dao->Ordenar("i.nombre");

		//$dao->ConsultarAjax();


		$respuesta = $dao->Consultar();

		$jsondata = array();
		$i = 0;
		foreach ($respuesta as $row => $item) {
			$dao = new Dao();
			$dao->Campo("i.nombre", "");
			$dao->Campo("i.prst1", "");
			$dao->Campo("i.costo1", "");


			$dao->Campo("k.ss_cantidad", "");
			$dao->Campo("((i.cantidad1*i.cantidad2)+i.fracciones_stock)", "");
			$dao->Campo("k.ss_total", "");
			$dao->Campo("i.percha", "");
			$dao->Campo("i.iva", "");
			$dao->Campo("i.cantidad2", "");
			$dao->Campo('CASE WHEN i.prst2 = "(NINGUNO)" 
						THEN i.pvp1
						ELSE i.pvp2 END', "");
			$dao->Campo("i.cantidad1", "");
			$dao->Campo("i.fracciones_stock", "");
			$dao->TablasInnerAlias("kardex", "k", "inventario", "i");
			$dao->Where("i.id_estado", "1", "and");
			$dao->Where("id_bodega", $_POST['Bodega'], "and");
			$dao->Where("k.id_inventario", $item[0], "and");
			$dao->MenorIgual("convert(k.fecha_registro,date)", "'" . $_POST['Fecha'] . "'", "");
			$dao->Ordenar("k.id desc");
			$dao->Limite("0,1");
			$respuesta1 = $dao->Consultar();
			foreach ($respuesta1 as $row1 => $item1) {
				$jsondata[$i] = $item1;
				$i++;
			}
		}
		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}

	if ($_POST['Requerimiento'] == "ValidarNumero") {
		$dao = new Dao();

		$dao->Contar();

		$dao->Tabla("movimiento_bodega", "");
		$dao->Where("numero", "'" . $_POST["Numero"] . "'", "");
		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "ActualizarStockKardex") {

		///////////////////////////////////////////// ELIMINO LOS PRODUCTOS DE LA TABLA TEMPORAL
		$dao = new Dao();
		$dao->Eliminar("inventario_temporal", "1 = 1");

		$dao3 = new Dao();

		$dao3->Campo("id", "");
		$dao3->Campo("cantidad1", "");
		$dao3->Campo("cantidad2", "");
		$dao3->Campo("fracciones_stock", "");
		$dao3->Tabla("inventario", "");
		$dao3->Where("id_estado", "1", "");

		$respuesta3 = $dao3->Consultar();

		$jsondata = array();
		foreach ($respuesta3 as $row3 => $item3) {
			$dao = new Dao();

			$dao->Campo("ss_cantidad", "");
			$dao->Tabla("kardex", "");
			$dao->Where("id_inventario", $item3[0], "");
			$dao->Ordenar("id desc");
			$dao->Limite("0,1");
			$respuesta = $dao->Consultar();

			foreach ($respuesta as $row => $item) {
				$cantidadnueva = 0;
				$fracciones = 0;
				if ($item3[2] == 1) {
					$cantidadnueva = $item[0];
				} else {
					$fracciones = $item[0];
					$cantidadnueva = intval($fracciones / $item3[2]);
					$fracciones = $fracciones - ($cantidadnueva * $item3[2]);
				}
				$datos1 = array(
					"cantidad1" => $cantidadnueva,
					"fracciones_stock" => $fracciones
				);

				$jsondata[] = $datos1;
				$jsondata[] = $item3;
				$dao1 = new Dao();
				$dao1->Modificar("inventario", $datos1, "id=" . $item3[0], 0);
			}
		}
		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}

	if ($_POST['Requerimiento'] == "CorregirCosto") {
		$dao3 = new Dao();

		$dao3->Campo("id", "");
		$dao3->Tabla("inventario", "");
		$dao3->Where("id_estado", "1", "");

		$respuesta3 = $dao3->Consultar();

		$jsondata = array();
		foreach ($respuesta3 as $row3 => $item3) {
			$dao = new Dao();


			$dao->Campo("ss_precio", "");
			$dao->Tabla("kardex", "");
			$dao->Where("id_inventario", $item3[0], "");
			$dao->Ordenar("id");
			$dao->Limite("0,1");
			$respuesta = $dao->Consultar();

			foreach ($respuesta as $row => $item) {

				$datos1 = array(
					"e_precio" => $item[0],
					"s_precio" => $item[0],
					"ss_precio" => $item[0]
				);

				$jsondata[] = $datos1;
				$jsondata[] = $item3;
				$dao1 = new Dao();
				$dao1->Modificar("kardex", $datos1, "id_inventario=" . $item3[0], 0);

				$datos1 = array("costo1" => $item[0]);

				$dao1 = new Dao();
				$dao1->Modificar("inventario", $datos1, "id=" . $item3[0], 0);
			}
		}
		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}
	if ($_POST['Requerimiento'] == "SincronizarStock") {
		require_once '../Apis/Quickcont/Inventario.php';
		$obj = new Inventario();
		$respuesta = $obj->SincronizarStock(
			$_SESSION["QUICKCONT_ID BODEGA"],
			$_SESSION["QUICKCONT_ID EMPRESA"],
			$_SESSION["QUICKCONT_USUARIO"],
			$_SESSION["QUICKCONT_CONTRASEÑA"],
			file_get_contents("../facturas/firmaelectronica.p12"),
			Configuracion::CLAVE_CERTIFICADO,
			$_SESSION["QUICKCONT_SERVICIO WEB STOCK"]
		);
		//Escribir( print_r($respuesta,true));
		$respuesta = json_decode($respuesta, true);
		
		foreach ($respuesta as $key => $item) {
			$datos = array(
				'cantidad1' => $item["Enteros"],
				'fracciones_stock' => $item["Fracciones"]
			);
			$dao1 = new Dao();
			$r = $dao1->Modificar("inventario", $datos, "codigo_barra= '" . $item["Codigo"] . "'", 0);
		}
	}
	if ($_POST['Requerimiento'] == "EnviarFacturasQuickCont") {
		if ($_SESSION["QUICKCONT_INTEGRADO A QUICKCONT"] == "SI") {
			session_write_close();
			$obj = new Con_QuickCont();
			$obj->EnviarFacturasFarmacia();
			$obj->EnviarFacturasFarmaciaNc();
		}
	}

	if ($_POST['Requerimiento'] == "ObtenerCostoAnterior") {

		$dao = new Dao();

		$dao->Campo("i.precio", ""); //0
		$dao->Campo("p.descripcion", ""); //1
		$dao->Campo("i.descuento", ""); //2

		
		$dao->TablasInnerAlias("movimiento_bodega_item", "i", "movimiento_bodega", "f");
		$dao->TablasInnerAlias("movimiento_bodega", "f","proveedor","p");

		$dao->Where("f.tipo", "'INGRESO'", "and");
		$dao->Where("i.id_inventario", $_POST["Item"], "and");
		$dao->Menor("f.id", $_POST["Ingreso"], "and");
		$dao->Where("i.presentacion", "'".$_POST["Presentacion"]."'", "");
		
		$dao->Ordenar("f.id desc");
		$dao->Limite("0,1");
		$dao->ConsultarAjax();
	}
	
}
