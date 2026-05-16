<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////

	if ($_POST['Requerimiento'] == "CargarTablaGrupoJS") {

		$dao = new Dao();

		$dao->Campo("id","");//0
		$dao->Campo("nombre","");//1
		$dao->Campo("usuario_registro","");//2
		$dao->Campo("fecha_registro","");//3
		$dao->Campo("orden","");//4
		$dao->Campo("id_estado","");//5

		$dao->Tabla("grupo_rx","");
		$dao->Where("id_estado","1","and");

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

	if($_POST['Requerimiento'] == "GuardaExamenRx"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"id_estado"=>1,
						"orden"=>$_POST["Orden"],
						"usuario_registro"=>$_SESSION["usuario"]);
						$dao= new Dao();
			            $dao->GuardarAjax("grupo_rx",$datos);
	}

	if($_POST['Requerimiento'] == "ModificaExamenRx"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"orden"=>$_POST["Orden"],
						"id_estado"=>1,
						"usuario_modifico"=>$_SESSION["usuario"]);
						$dao= new Dao();
						$dao->ModificarAjax("grupo_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaExamenRx"){

		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("grupo_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "InactivarExamenRx"){
		
		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("grupo_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	if($_POST['Requerimiento'] == "ActivarExamenRx"){
		
		$datos = array("id_estado"=>1);
		$dao= new Dao();
	    $dao->ModificarAjax("grupo_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////

	if ($_POST['Requerimiento'] == "CargarTablaEntidadJS") {

		$dao = new Dao();

		$dao->Campo("e.id","");//0
		$dao->Campo("e.nombre","");//1
		$dao->Campo("concat(em.apellidos,' ',em.nombres)","");//2
		$dao->Campo("e.pago","");//3
		$dao->Campo("e.valor_pago","");//4
		$dao->Campo("e.usuario_registro","");//5
		$dao->Campo("e.fecha_registro","");//6
		$dao->Campo("e.id_estado","");//7
		

		$dao->TablasInnerAlias("entidad_rx","e","empleado","em");
		$dao->Where("e.id_estado","1","and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("e.nombre", $_POST["search"]["value"], "");
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

	if($_POST['Requerimiento'] == "GuardaEntidadRx"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"id_empleado"=>$_POST["Responsable"],
						"id_estado"=>1,						
						"pago"=>$_POST["Pago"],
						"valor_pago"=>$_POST["Valor"],
						"usuario_registro"=>$_SESSION["usuario"]);
						$dao= new Dao();
			            $dao->GuardarAjax("entidad_rx",$datos);
	}

	if($_POST['Requerimiento'] == "EliminarEntidadHorario"){

		$dao= new Dao();
		$dao->EliminarPorCampoAjax("entidad_rx_horario","id_entidad_rx",$_POST['Entidad']);
	}

	if($_POST['Requerimiento'] == "GuardarEntidadHorario"){

		$datos = array("dia"=>$_POST["Dia"],
						"id_entidad_rx"=>$_POST["Entidad"],
						"id_estado"=>1,						
						"horaI"=>$_POST["HoraI"],
						"horaF"=>$_POST["HoraF"]);

						$dao= new Dao();
			            $dao->GuardarAjax("entidad_rx_horario",$datos);
	}

	if($_POST['Requerimiento'] == "CargarHorarioEntidad"){

		
		$dao= new Dao();

	    $dao->Campo("id","");
	    $dao->Campo("dia","");
	    $dao->Campo("horaI","");
	    $dao->Campo("horaF","");
	    
		$dao->Tabla("entidad_rx_horario","");
		$dao->Where("id_entidad_rx",$_POST['Entidad'],"");


		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "ModificaEntidadRx"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"id_empleado"=>$_POST["Responsable"],						
						"pago"=>$_POST["Pago"],
						"id_estado"=>1,
						"valor_pago"=>$_POST["Valor"],
						"usuario_modifico"=>$_SESSION["usuario"]);
						$dao= new Dao();
						$dao->ModificarAjax("entidad_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaEntidadRx"){

		$dao= new Dao();
		$dao->EliminarPorCampoAjax("entidad_rx_horario","id_entidad_rx",$_POST['Id']);

		$dao= new Dao();
		$dao->EliminarAjax("entidad_rx",$_POST['Id']);
	}


	if($_POST['Requerimiento'] == "InactivarEntidadRx"){
		
		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("entidad_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	if($_POST['Requerimiento'] == "ActivarEntidadRx"){
		
		$datos = array("id_estado"=>1);
		$dao= new Dao();
	    $dao->ModificarAjax("entidad_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	if ($_POST['Requerimiento'] == "CargarTablaEquipoJS") {

		$dao = new Dao();

		$dao->Campo("id","");//0
		$dao->Campo("nombre","");//1
		$dao->Campo("usuario_registro","");//2
		$dao->Campo("fecha_registro","");//3
		$dao->Campo("id_estado","");//4

		$dao->Tabla("equipo_rx","");
		$dao->Where("id_estado","1","and");

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

	if($_POST['Requerimiento'] == "GuardaEquipoRx"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"id_estado"=>1,
						"usuario_registro"=>$_SESSION["usuario"]);
						$dao= new Dao();
			            $dao->GuardarAjax("equipo_rx",$datos);
	}

	if($_POST['Requerimiento'] == "ModificaEquipoRx"){

		$datos = array("nombre"=>$_POST["Nombre"],
						"id_estado"=>1,
						"usuario_modifico"=>$_SESSION["usuario"]);
						$dao= new Dao();
						$dao->ModificarAjax("equipo_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaEquipoRx"){

		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("equipo_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "InactivarEquipoRx"){
		
		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("equipo_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	if($_POST['Requerimiento'] == "ActivarEquipoRx"){
		
		$datos = array("id_estado"=>1);
		$dao= new Dao();
	    $dao->ModificarAjax("equipo_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if ($_POST['Requerimiento'] == "CargarTablaProcedimientoJS") {

		$dao = new Dao();

		$dao->Campo("p.id","");//0
		$dao->Campo("p.nombre","");//1
		$dao->Campo("g.nombre","");//2
		
		$dao->Campo("q.nombre","");//3
		$dao->Campo("p.pvp","");//4
		$dao->Campo("p.usuario_registro","");//5
		$dao->Campo("p.fecha_registro","");//6

		$dao->TablasInnerAlias("procedimiento_rx","p","grupo_rx","g");
		$dao->TablasInnerAlias("procedimiento_rx","p","equipo_rx","q");
		$dao->In_Where("p.id_estado","1,11","and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("concat(p.nombre,' ',g.nombre,' ',q.nombre)", $_POST["search"]["value"], "");
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

	if($_POST['Requerimiento'] == "GuardaProLabRx"){


		$datos = array("nombre"=>$_POST["Nombre"],
						"id_grupo_rx"=>$_POST["Grupo"],
						
						"id_equipo_rx"=>$_POST["Equipo"],
						"pvp"=>$_POST["Pvp"],						
						"id_estado"=>1,
						"usuario_registro"=>$_SESSION["usuario"]);						
						$dao= new Dao();
			            $dao->GuardarAjax("procedimiento_rx",$datos);
	}

	if($_POST['Requerimiento'] == "ModificaProLabRx"){


		$datos = array("nombre"=>$_POST["Nombre"],
						"id_grupo_rx"=>$_POST["Grupo"],
						"id_estado"=>1,
						"id_equipo_rx"=>$_POST["Equipo"],
						"pvp"=>$_POST["Pvp"],
						"usuario_modifico"=>$_SESSION["usuario"]);

						
						$dao= new Dao();
						$dao->ModificarAjax("procedimiento_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaProLabRx"){

		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("procedimiento_rx",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	


	if($_POST['Requerimiento'] == "CargarGrupoProcedimientos"){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("en.nombres","");
		$dao->Campo("en.apellidos","");
		$dao->Campo("en.id","");

		$dao->TablasInnerAlias("procedimiento_lrx","p","grupo_rx","e");
		$dao->TablasInnerAlias("procedimiento_rx","p","entidad","t");
		$dao->TablasInnerAlias("entidad","t","empleado","en");

		$dao->In_Where("p.id_estado","1,11","and");
		$dao->Where("e.id_estado","1","and");
		$dao->Where("p.id_grupo_rx",$_POST['Id'],"");


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

		$dao->TablasInnerAlias("procedimiento_rx","p","grupo_rx","e");
		$dao->TablasInnerAlias("procedimiento_rx","p","entidad","t");
		$dao->TablasInnerAlias("entidad","t","empleado","en");

		$dao->In_Where("p.id_estado","1,11","and");
		$dao->Where("e.id_estado","1","");


		$dao->ConsultarAjax();

	}

	if($_POST['Requerimiento'] == "EliminarProcedimientos"){

		$dao= new Dao();
		$dao->EliminarPorCampoAjax("entidad_procedimiento_rx","id_entidad_rx",$_POST['Entidad']);
	}

	if($_POST['Requerimiento'] == "GuardarProcedimientos"){


		$datos = array("id_entidad_rx"=>$_POST["Entidad"],
						"id_procedimiento_rx"=>$_POST["Procedimiento"]);

						$dao= new Dao();
			            $dao->GuardarAjax("entidad_procedimiento_rx",$datos);
	}

	if($_POST['Requerimiento'] == "CargarAsignacionesRx"){
		
		$dao= new Dao();

	    $dao->Campo("id_procedimiento_rx","");
		$dao->Tabla("entidad_procedimiento_rx","");
		$dao->Where("id_entidad_rx",$_POST['Entidad'],"");


		$dao->ConsultarAjax();
		
		
	}

	if($_POST['Requerimiento'] == "CargarTodosProcedimientosRx"){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("g.nombre","");

		$dao->TablasInnerAlias("procedimiento_rx","p","grupo_rx","g");
		

		$dao->In_Where("p.id_estado","1,11","and");
		$dao->Where("g.id_estado","1","");


		$dao->ConsultarAjax();
		
	}

	function ObtTurnosVendidos($Id){

		$dao = new Dao();

		$sql =' SELECT x.fecha_atencion,COUNT(x.id_consulta)
				FROM
				(SELECT ci.fecha_atencion,ci.id_consulta,COUNT(ci.id_consulta) 
				FROM consulta_item ci
				WHERE CONVERT(fecha_atencion,DATE) = CURDATE() 
				AND ci.id_procedimiento_rx IS NOT NULL
				AND ci.id_empleado = '.$Id.'
				GROUP BY ci.fecha_atencion,ci.id_consulta) x
				GROUP BY x.fecha_atencion ';

		$respuesta =$dao->ConsultarSqlNativo($sql);
		
		$turnos =0;

		foreach ($respuesta as $row => $item){
			$turnos = $item[1];		

		}
		return $turnos;

	}

	function ObtAtendidos($Id){

		$dao = new Dao();

		$sql =' SELECT ci.fecha_atencion,COUNT(c.id)
				FROM consulta c INNER JOIN consulta_item ci ON(c.id = ci.id_consulta)
				WHERE c.id_estado_rx = 13 and CONVERT(ci.fecha_atencion,DATE) = CURDATE() 
				AND ci.id_empleado = '.$Id.'
				GROUP by c.id ';

		$respuesta =$dao->ConsultarSqlNativo($sql);
		
		$turnos =0;

		foreach ($respuesta as $row => $item){
			$turnos = $item[1];		

		}
		return $turnos;

	}

	if($_POST['Requerimiento'] == "CargarTecnologos"){

		$dao = new Dao();

		$dao->Campo("DISTINCT en.id","");
		$dao->Campo("en.nombres","");
		$dao->Campo("en.apellidos","");
		$dao->Campo("e.id","");
		$dao->Campo("en.foto","");

		$dao->TablasInnerAlias("entidad_procedimiento_rx","ep","entidad_rx","e");
		$dao->TablasInnerAlias("entidad_procedimiento_rx","ep","procedimiento_rx","p");
		$dao->TablasInnerAlias("entidad_rx","e","empleado","en");

		$dao->In_Where("ep.id_procedimiento_rx",substr(trim($_POST['Id']),0,-1),"and");
		$dao->Where("e.id_estado","1","");


		$respuesta =$dao->Consultar();
		$jsondata = array();
		$i=0;

		foreach ($respuesta as $row => $item){

					$datos = array();
					
					$datos[0] = $item[0];
					$datos[1] = $item[1];
					$datos[2] = $item[2];
					$datos[3] = $item[3];
					$datos[4] = $item[4];
					$datos[5] = ObtTurnosVendidos($item[0]);
					$datos[6] = ObtAtendidos($item[0]);

					$jsondata[$i]=$datos;
					$i++;					

		}
		echo json_encode($jsondata);
		
	}

	if($_POST['Requerimiento'] == "CargarTecnologosPorEspecialidad"){

		$dao = new Dao();

		$dao->Campo("DISTINCT en.id","");
		$dao->Campo("en.nombres","");
		$dao->Campo("en.apellidos","");
		$dao->Campo("e.id","");
		$dao->Campo("en.foto","");

		$dao->TablasInnerAlias("entidad_procedimiento_rx","ep","entidad_rx","e");
		$dao->TablasInnerAlias("entidad_procedimiento_rx","ep","procedimiento_rx","p");
		$dao->TablasInnerAlias("entidad_rx","e","empleado","en");
		$dao->Where("e.id_estado","1","");


		$respuesta =$dao->Consultar();
		$jsondata = array();
		$i=0;

		foreach ($respuesta as $row => $item){

					$datos = array();
					
					$datos[0] = $item[0];
					$datos[1] = $item[1];
					$datos[2] = $item[2];
					$datos[3] = $item[3];
					$datos[4] = $item[4];
					$datos[5] = ObtTurnosVendidos($item[0]);
					$datos[6] = ObtAtendidos($item[0]);

					$jsondata[$i]=$datos;
					$i++;					

		}
		echo json_encode($jsondata);
		
	}

	if($_POST['Requerimiento'] == "CargarReservacionesRx"){

		
		$dao = new Dao();

		$sql =' SELECT x.fecha_atencion,COUNT(x.id_consulta)
				FROM
				(SELECT ci.fecha_atencion,ci.id_consulta,COUNT(ci.id_consulta) 
				FROM consulta_item ci
				WHERE fecha_atencion >= CURDATE() 
				AND ci.id_procedimiento_rx IS NOT NULL AND ci.id_procedimiento IS NULL
				AND ci.id_procedimiento_laboratorio IS NULL AND ci.id_empleado = '.$_POST['Id'].'
				GROUP BY ci.fecha_atencion,ci.id_consulta) x
				GROUP BY x.fecha_atencion ';

		$respuesta = $dao->ConsultarSqlNativo($sql);

		$jsondata = array();
		$i=0;

		foreach ($respuesta as $row => $item){
					$evento = array();
					
					$evento['allDay'] =true;
					$evento['title'] = "PACIENTES ".$item[1];
					$evento['start'] = $item[0];
					//$evento['end'] = $item[2];
					//$evento['dow'] = ObtDia($item[4]);
					$evento['backgroundColor'] ='#00c0ef';
					$evento['borderColor'] ='#00c0ef';

					$jsondata[$i]=$evento;
					$i++;

		}
		echo json_encode($jsondata);

	}

	function ObtDia($dia){
		$numeroDia="";

		if($dia=="LUNES"){
			$numeroDia="[1]";
		}
		if($dia=="MARTES"){
			$numeroDia="[2]";
		}
		if($dia=="MIERCOLES"){
			$numeroDia="[3]";
		}
		if($dia=="JUEVES"){
			$numeroDia="[4]";
		}
		if($dia=="VIERNES"){
			$numeroDia="[5]";
		}
		if($dia=="SABADO"){
			$numeroDia="[6]";
		}
		if($dia=="DOMINGO"){
			$numeroDia="[0]";
		}

		return $numeroDia;
	}	

	if($_POST['Requerimiento'] == "MostrarHorarioRx"){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("horaI","");
		$dao->Campo("horaF","");
		
		$dao->Campo("dia","");

		$dao->Tabla("entidad_rx_horario","");
		$dao->Where("id_entidad_rx",$_POST['Id'],"");

		$respuesta =$dao->Consultar();
		$jsondata = array();
		$i=0;

		foreach ($respuesta as $row => $item){
					$evento = array();
					
					$evento['id'] =$item[0];
					//$evento['title'] = "TURNOS ".$item[3];
					$evento['start'] = $item[1];
					$evento['end'] = $item[2];
					$evento['dow'] = ObtDia($item[3]);
					$evento['backgroundColor'] ='#00a65a';
					$evento['borderColor'] ='#00a65a';

					$jsondata[$i]=$evento;
					$i++;

		}
		echo json_encode($jsondata);

	}

	if($_POST['Requerimiento'] == "CargarPacientesRx"){

		$dao = new Dao();

		$dao->Campo("DISTINCT c.id","");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno)","");
		$dao->Campo("p.nombre","");
		$dao->Campo("TIMESTAMPDIFF(YEAR,p.fecha_nacimiento,CURDATE())","");
		$dao->Campo("c.total","");
		$dao->Campo("e.nombres","");
		$dao->Campo("e.apellidos","");
		$dao->Campo("pr.id","");

		$dao->Campo("ci.id_estado","");
		$dao->Campo("p.id","");
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		$dao->Campo("pr.nombre","");

		
		$dao->TablasInnerAlias("consulta","c","paciente","p");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","c");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento_rx","pr");
		$dao->TablasInnerAlias("consulta_item","ci","empleado","e");
		$dao->In_Where("p.id_estado","1,16","and");
		$dao->IN_Diferente("c.id_estado_rx","13","and");
		$dao->Diferente("c.id_estado","21","and");
		$dao->Diferente("ci.id_estado","25","and");
		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
		$dao->NO_NULL("ci.id_procedimiento_rx","");

		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "GuardarRecepcionRx"){
		
		$datos = array("id_estado_rx"=>13);
		$dao= new Dao();
	    $dao->ModificarAjax("consulta",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	if($_POST['Requerimiento'] == "CargarPacientesListosRx"){

		$dao = new Dao();

		$dao->Campo("DISTINCT c.id","");
		$dao->Campo("p.id","");
		$dao->Campo("p.cedula","");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno)","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.email","");
		$dao->Campo("c.id_estado","");
		$dao->Campo("p.fecha_nacimiento","");
		$dao->Campo("ci.id_estado","");
		$dao->Campo("c.id_orden","");
		$dao->Campo("ci.fecha_atencion","");
		
		$dao->TablasInnerAlias("consulta","c","paciente","p");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","c");
		$dao->Where("c.id_estado_rx","13","and");
		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
		$dao->NO_NULL("ci.id_procedimiento_rx","");
		$dao->Agrupar("c.id","");

		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "CargarProcedimientosPacientesRx"){

		$dao = new Dao();

		$dao->Campo("c.id","");
		$dao->Campo("pr.id","");
		$dao->Campo("pr.nombre","");				
		$dao->Campo("c.id_estado","");
		$dao->Campo("ci.id_estado","");
		
		$dao->TablasInnerAlias("consulta_item","ci","consulta","c");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento_rx","pr");		
		
		$dao->Where("c.id",$_POST['Consulta'],"AND");	
		$dao->Diferente("c.id_estado","21","and");	
		$dao->Diferente("ci.id_estado","25","and");
		$dao->NO_NULL("ci.id_procedimiento_rx","");

		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "CargarTablaJSMante"){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("pvp","");		

		$dao->Tabla("procedimiento_rx","");
		$dao->Diferente("id_estado","2","and");

		if(isset($_POST["search"]["value"]))  
        {  
        		if(trim($_POST["search"]["value"])==""){
                	$dao->Where("1","1","");
                }else{
                	$dao->Filtrar("nombre",$_POST["search"]["value"],"");                	
                }
                
                
        }              
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
		
        $dao->Ordenar("nombre");  

		$respuesta =$dao->Consultar();
		$data = array();
		$totalFilter=0;		
		foreach ($respuesta as $row => $item){
			$totalFilter++;
			
			$fila = array();			
			$fila[] = $item[0];
			$fila[] = $item[1];
			$fila[] = $item[2];
			$fila[] = '<input type="checkbox" id="'.$item[0].'" class="chEntidadRx">';			
            $data[] = $fila; 
		}
		
		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $totalFilter,  
                "recordsFiltered"=> $totalFilter,  
                "data"           => $data  
        );  
        echo json_encode($output);
			
	}

	if($_POST['Requerimiento'] == "AgregarProcedimiento"){

		if($_POST["Accion"]=="Agregar"){
			$datos = array("id_entidad_rx"=>$_POST["Entidad"],
						"id_procedimiento_rx"=>$_POST["Procedimiento"]);
						
			
			$dao= new Dao();
			$dao->Eliminar("entidad_procedimiento_rx","id_entidad_rx=".$_POST["Entidad"]." and id_procedimiento_rx = ".$_POST["Procedimiento"]);
			$dao->GuardarAjax("entidad_procedimiento_rx",$datos);
			
		}else{
			
			$dao= new Dao();
			$dao->Eliminar("entidad_procedimiento_rx","id_entidad_rx=".$_POST["Entidad"]." and id_procedimiento_rx = ".$_POST["Procedimiento"]);
			echo true;
		}
					
		
	}
}
