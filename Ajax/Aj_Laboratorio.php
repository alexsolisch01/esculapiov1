<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if ($_POST['Requerimiento'] == "CargarTablaMuestraJS") {

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("id_estado","");
		
		$dao->Tabla("muestra","");
		$dao->Where("id_estado", "1", "and");

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

	if($_POST['Requerimiento'] == "GuardaMuestra"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"id_estado"=>1,
						"usuario_registro"=>$_SESSION["usuario"]);
						$dao= new Dao();
			            $dao->GuardarAjax("muestra",$datos);
	}

	if($_POST['Requerimiento'] == "ModificaMuestra"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"usuario_modifico"=>$_SESSION["usuario"]);
						$dao= new Dao();
						$dao->ModificarAjax("muestra",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaMuestra"){

		$dao= new Dao();
		$dao->EliminarAjax("muestra",$_POST['Id']);
	}
	

	if($_POST['Requerimiento'] == "InactivarMuestra"){
		
		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("muestra",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	if($_POST['Requerimiento'] == "ActivarMuestra"){
		
		$datos = array("id_estado"=>1);
		$dao= new Dao();
	    $dao->ModificarAjax("muestra",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}




	//////////////////////////////////////////////////////////////////////////////////////////////////////////

	if ($_POST['Requerimiento'] == "CargarTablaExamenJS") {

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("orden","");
		$dao->Campo("id_estado","");

		$dao->Tabla("grupo_examen","");
		$dao->Where("id_estado", "1", "and");

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

	if($_POST['Requerimiento'] == "GuardaExamen"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"id_estado"=>1,
						"orden"=>$_POST["Orden"],
						"usuario_registro"=>$_SESSION["usuario"]);
						$dao= new Dao();
			            $dao->GuardarAjax("grupo_examen",$datos);
	}

	if($_POST['Requerimiento'] == "ModificaExamen"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"orden"=>$_POST["Orden"],
						"usuario_modifico"=>$_SESSION["usuario"]);
						$dao= new Dao();
						$dao->ModificarAjax("grupo_examen",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaExamen"){

		$dao= new Dao();
		$dao->EliminarAjax("grupo_examen",$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "InactivarExamen"){
		
		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("grupo_examen",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	if($_POST['Requerimiento'] == "ActivarExamen"){
		
		$datos = array("id_estado"=>1);
		$dao= new Dao();
	    $dao->ModificarAjax("grupo_examen",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////

	if ($_POST['Requerimiento'] == "CargarTablaEntidadJS") {

		$dao = new Dao();

		$dao->Campo("e.id","");
		$dao->Campo("e.nombre","");
		$dao->Campo("concat(em.apellidos,' ',em.nombres)","");
		$dao->Campo("e.usuario_registro","");
		$dao->Campo("e.fecha_registro","");
		$dao->Campo("e.id_estado","");

		$dao->TablasInnerAlias("entidad","e","empleado","em");
		$dao->In_Where("e.id_estado","1","and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("concat(em.apellidos,' ',em.nombres,' ',e.nombre)", $_POST["search"]["value"], "");
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

	if($_POST['Requerimiento'] == "GuardaEntidad"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"id_empleado"=>$_POST["Responsable"],
						"id_estado"=>1,
						"usuario_registro"=>$_SESSION["usuario"]);
						$dao= new Dao();
			            $dao->GuardarAjax("entidad",$datos);
	}

	if($_POST['Requerimiento'] == "ModificaEntidad"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"id_empleado"=>$_POST["Responsable"],
						"usuario_modifico"=>$_SESSION["usuario"]);
						$dao= new Dao();
						$dao->ModificarAjax("entidad",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaEntidad"){

		$dao= new Dao();
		$dao->EliminarAjax("entidad",$_POST['Id']);
	}


	if($_POST['Requerimiento'] == "InactivarEntidad"){
		
		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("entidad",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	if($_POST['Requerimiento'] == "ActivarEntidad"){
		
		$datos = array("id_estado"=>1);
		$dao= new Dao();
	    $dao->ModificarAjax("entidad",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	if ($_POST['Requerimiento'] == "CargarTablaEquipoJS") {

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("id_estado","");

		$dao->Tabla("equipo","");
		$dao->Where("id_estado", "1", "and");

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

	if($_POST['Requerimiento'] == "GuardaEquipo"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"id_estado"=>1,
						"usuario_registro"=>$_SESSION["usuario"]);
						$dao= new Dao();
			            $dao->GuardarAjax("equipo",$datos);
	}

	if($_POST['Requerimiento'] == "ModificaEquipo"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"usuario_modifico"=>$_SESSION["usuario"]);
						$dao= new Dao();
						$dao->ModificarAjax("equipo",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaEquipo"){

		$dao= new Dao();
		$dao->EliminarAjax("equipo",$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "InactivarEquipo"){
		
		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("equipo",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	if($_POST['Requerimiento'] == "ActivarEquipo"){
		
		$datos = array("id_estado"=>1);
		$dao= new Dao();
	    $dao->ModificarAjax("equipo",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if ($_POST['Requerimiento'] == "CargarTablaProcedimientoJS") {

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("m.nombre","");
		$dao->Campo("g.nombre","");
		$dao->Campo("e.nombre","");
		$dao->Campo("q.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("p.pago","");
		$dao->Campo("p.valor_pago","");
		$dao->Campo("p.usuario_registro","");
		$dao->Campo("p.fecha_registro","");
		$dao->Campo("p.generar_qr","");

		$dao->TablasInnerAlias("procedimiento_laboratorio","p","muestra","m");
		$dao->TablasInnerAlias("procedimiento_laboratorio","p","grupo_examen","g");
		$dao->TablasInnerAlias("procedimiento_laboratorio","p","entidad","e");
		$dao->TablasInnerAlias("procedimiento_laboratorio","p","equipo","q");
		$dao->In_Where("p.id_estado","1,11","and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("concat(m.nombre,' ',g.nombre,' ',e.nombre,' ',q.nombre,' ',p.nombre)", $_POST["search"]["value"], "");
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

	if($_POST['Requerimiento'] == "GuardaProLab"){


		$datos = array("nombre"=>$_POST["Nombre"],
						"id_muestra"=>$_POST["Muestra"],
						"id_grupo_examen"=>$_POST["Grupo"],
						"id_entidad"=>$_POST["Entidad"],
						"generar_qr" => $_POST["QR"],
						"pvp"=>$_POST["Pvp"],
						"pago"=>$_POST["Pago"],
						"valor_pago"=>$_POST["Valor"],
						"id_estado"=>1,
						"usuario_registro"=>$_SESSION["usuario"]);

		if($_POST["Entidad"]==4){
			$datos["id_equipo"] =$_POST["Equipo"];
		}
		if($_POST["Entidad"]==5){
			$datos["id_equipo"] =3;
		}
						$dao= new Dao();
			            $dao->GuardarAjax("procedimiento_laboratorio",$datos);
	}

	if($_POST['Requerimiento'] == "ModificaProLab"){


		$datos = array("nombre"=>$_POST["Nombre"],
						"id_muestra"=>$_POST["Muestra"],
						"id_grupo_examen"=>$_POST["Grupo"],
						"id_entidad"=>$_POST["Entidad"],
						"generar_qr" => $_POST["QR"],
						"pvp"=>$_POST["Pvp"],
						"pago"=>$_POST["Pago"],
						"valor_pago"=>$_POST["Valor"],
						"usuario_modifico"=>$_SESSION["usuario"]);

		if($_POST["Entidad"]==4){
			$datos["id_equipo"] =$_POST["Equipo"];
		}
						$dao= new Dao();
						$dao->ModificarAjax("procedimiento_laboratorio",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaProLab"){

		$dao= new Dao();
		$dao->EliminarAjax("procedimiento_laboratorio",$_POST['Id']);
	}


	if($_POST['Requerimiento'] == "CargarGrupoProcedimientos"){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("en.nombres","");
		$dao->Campo("en.apellidos","");
		$dao->Campo("en.id","");

		$dao->TablasInnerAlias("procedimiento_laboratorio","p","grupo_examen","e");
		$dao->TablasInnerAlias("procedimiento_laboratorio","p","entidad","t");
		$dao->TablasInnerAlias("entidad","t","empleado","en");

		$dao->In_Where("p.id_estado","1,11","and");
		$dao->Where("e.id_estado","1","and");
		$dao->Where("p.id_grupo_examen",$_POST['Id'],"");


		$dao->ConsultarAjax();

	}

	if($_POST['Requerimiento'] == "CargarTodosGrupoProcedimientos"){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("en.nombres","");
		$dao->Campo("en.apellidos","");
		$dao->Campo("en.id","");
		$dao->Campo("e.nombre","");

		$dao->TablasInnerAlias("procedimiento_laboratorio","p","grupo_examen","e");
		$dao->TablasInnerAlias("procedimiento_laboratorio","p","entidad","t");
		$dao->TablasInnerAlias("entidad","t","empleado","en");

		$dao->In_Where("p.id_estado","1,11","and");
		$dao->Where("e.id_estado","1","");


		$dao->ConsultarAjax();

	}
}
