<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if ($_POST['Requerimiento'] == "CargarTablaTipoServicioJS") {

		$dao = new Dao();

		$dao->Campo("id","");//0
		$dao->Campo("nombre","");//1
		$dao->Campo("descripcion","");//2
		$dao->Campo("usuario_registro","");//3
		$dao->Campo("fecha_registro","");//4
		$dao->Campo("id_estado","");//5
		

		$dao->Tabla("tipo_servicio","");
		$dao->Where("id_estado","1","and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("concat(nombre,' ',descripcion)", $_POST["search"]["value"], "");
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
	if ($_POST['Requerimiento'] == "CargarTablaGrupoEstadisticoJS") {

		$dao = new Dao();

		$dao->Campo("id","");//0
		$dao->Campo("nombre","");//1
		$dao->Campo("descripcion","");//2
		$dao->Campo("usuario_registro","");//3
		$dao->Campo("fecha_registro","");//4
		$dao->Campo("id_estado","");//5

		$dao->Tabla("grupo_estadistico","");
		$dao->Where("id_estado","1","and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("concat(nombre,' ',descripcion)", $_POST["search"]["value"], "");
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
	if ($_POST['Requerimiento'] == "CargarTablaEspecialidadJS") {

		$dao = new Dao();

		$dao->Campo("e.id","");//0
		$dao->Campo("e.nombre","");//1
		$dao->Campo("s.nombre","");//2
		$dao->Campo("g.nombre","");//3
		$dao->Campo("e.descripcion","");//4
		$dao->Campo("e.usuario_registro","");//5
		$dao->Campo("e.fecha_registro","");//6
		$dao->Campo("e.id_estado","");//7

		$dao->TablasInnerAlias("especialidad","e","tipo_servicio","s");
		$dao->TablasInnerAlias("especialidad","e","grupo_estadistico","g");
		$dao->In_Where("e.id_estado","1","and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("concat(e.nombre,' ',s.nombre,' ',g.nombre)", $_POST["search"]["value"], "");
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
	if ($_POST['Requerimiento'] == "CargarTablaProcedimientosJS") {

		$dao = new Dao();

		$dao->Campo("p.id", "");//0
		$dao->Campo("p.nombre", "");//1
		$dao->Campo("e.nombre", "");//2
		$dao->Campo("p.precio", "");//3
		$dao->Campo("p.usuario_registro", "");//4
		$dao->Campo("p.fecha_registro", "");//5
		$dao->Campo("p.id_estado", "");//6
		$dao->Campo("plantilla","");//7

		$dao->TablasInnerAlias("procedimiento", "p", "especialidad", "e");

		$dao->In_Where("p.id_estado", "1,20", "and");

		if (isset($_POST["search"]["value"])) {
			if (trim($_POST["search"]["value"]) == "") {
				$dao->Where("1", "1", "");
			} else {
				$dao->Filtrar("concat(e.nombre,' ',p.nombre)", $_POST["search"]["value"], "");
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
	if($_POST['Requerimiento'] == "GuardarTipoServicio"){

		$datos = array("nombre"=>$_POST["Nombre"],
								"descripcion"=>$_POST["Descripcion"],
								"usuario_registro"=>$_SESSION["usuario"],
								"id_estado"=>1);

		$dao= new Dao();
	    $dao->GuardarAjax("tipo_servicio",$datos);
		
		
	}

	if($_POST['Requerimiento'] == "GuardarGrupoEstadistico"){

		$datos = array("nombre"=>$_POST["Nombre"],
								"descripcion"=>$_POST["Descripcion"],
								"usuario_registro"=>$_SESSION["usuario"],
								"id_estado"=>1);

		$dao= new Dao();
	    $dao->GuardarAjax("grupo_estadistico",$datos);
		
		
	}

	if($_POST['Requerimiento'] == "GuardarEspecialidad"){

		$datos = array("id_tipo_servicio"=>$_POST["TipoServicio"],
								"id_grupo_estadistico"=>$_POST["GrupoEstadistico"],
								"nombre"=>$_POST["Nombre"],
								"descripcion"=>$_POST["Descripcion"],
								"usuario_registro"=>$_SESSION["usuario"],
								"id_estado"=>1);

		$dao= new Dao();
	    $dao->GuardarAjax("especialidad",$datos);
		
		
	}

	if($_POST['Requerimiento'] == "GuardarAmbu"){

		$datos = array("id_especialidad"=>$_POST["Especialidad"],
								
								"nombre"=>$_POST["Nombre"],
								"id_estado"=>$_POST["Descripcion"],
								"precio"=>$_POST["Precio"],
								"plantilla"=>$_POST["Plantilla"],
								"usuario_registro"=>$_SESSION["usuario"]);

		$dao= new Dao();
	    $dao->GuardarAjax("procedimiento",$datos);
		
		
	}

	if($_POST['Requerimiento'] == "GuardarTipoRelacion"){

		$datos = array("nombre"=>$_POST["Nombre"],
								"descripcion"=>$_POST["Descripcion"],
								"usuario_registro"=>$_SESSION["usuario"],
								"id_estado"=>1);

		$dao= new Dao();
	    $dao->GuardarAjax("tipo_relacion",$datos);
		
		
	}


	if($_POST['Requerimiento'] == "GuardarTipoCategoria"){

		$datos = array("nombre"=>$_POST["Nombre"],
								"descripcion"=>$_POST["Descripcion"],
								"usuario_registro"=>$_SESSION["usuario"],
								"id_estado"=>1);

		$dao= new Dao();
	    $dao->GuardarAjax("categoria",$datos);
		
		
	}

	if($_POST['Requerimiento'] == "ModificaTipoServicio"){

		$datos = array("nombre"=>$_POST["Nombre"],
			"usuario_modifico"=>$_SESSION["usuario"],
								"descripcion"=>$_POST["Descripcion"],
							"id_estado"=>1);

		$dao= new Dao();
	    $dao->ModificarAjax("tipo_servicio",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
		
	}



	if($_POST['Requerimiento'] == "ModificaGrupoEstadistico"){

		$datos = array("nombre"=>$_POST["Nombre"],
			"usuario_modifico"=>$_SESSION["usuario"],
								"descripcion"=>$_POST["Descripcion"],
							"id_estado"=>1);

		$dao= new Dao();
	    $dao->ModificarAjax("grupo_estadistico",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
		
	}

	if($_POST['Requerimiento'] == "ModificaEspecialidad"){

		$datos = array("id_tipo_servicio"=>$_POST["TipoServicio"],
								"id_grupo_estadistico"=>$_POST["GrupoEstadistico"],
								"nombre"=>$_POST["Nombre"],
								"usuario_modifico"=>$_SESSION["usuario"],
								"descripcion"=>$_POST["Descripcion"],
							"id_estado"=>1);
		$dao= new Dao();
	    $dao->ModificarAjax("especialidad",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	

	if($_POST['Requerimiento'] == "ModificaAmbu"){

		$datos = array("id_especialidad"=>$_POST["Especialidad"],
								
								"nombre"=>$_POST["Nombre"],
								"id_estado"=>$_POST["Descripcion"],
								"usuario_modifico"=>$_SESSION["usuario"],
								"plantilla"=>$_POST["Plantilla"],
								"precio"=>$_POST["Precio"],
							"id_estado"=>1);

		$dao= new Dao();
	    $dao->ModificarAjax("procedimiento",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}


	if($_POST['Requerimiento'] == "EliminaTipoServicio"){

		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("tipo_servicio",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaGrupoEstadistico"){

		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("grupo_estadistico",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaEspecialidad"){

		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("especialidad",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaProcedimiento"){

		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("procedimiento",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	

	if($_POST['Requerimiento'] == "CargarProcedimientos"){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.precio","");

		$dao->TablasInnerAlias("procedimiento","p","especialidad","e");

		$dao->In_Where("p.id_estado","1,20","and");
		$dao->Where("e.id_estado","1","and");
		$dao->Where("p.id_especialidad",$_POST['Id'],"");

		$dao->Ordenar("p.nombre");
		$dao->ConsultarAjax();

	}

	function ObtTurnosVendidos($Id){

		$dao = new Dao();

		$sql =' SELECT x.fecha_atencion,COUNT(x.id_consulta)
				FROM
				(SELECT ci.fecha_atencion,ci.id_consulta,COUNT(ci.id_consulta) 
				FROM consulta_item ci
				WHERE CONVERT(fecha_atencion,DATE) = CURDATE() 
				AND ci.id_procedimiento IS NOT NULL AND ci.id_procedimiento_laboratorio IS NULL
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
				WHERE ci.id_estado = 19 and CONVERT(ci.fecha_atencion,DATE) = CURDATE() 
				AND ci.id_empleado = '.$Id.'
				GROUP by ci.fecha_atencion ';

		$respuesta =$dao->ConsultarSqlNativo($sql);
		
		$turnos =0;

		foreach ($respuesta as $row => $item){
			$turnos = $item[1];		

		}
		return $turnos;

	}

	if($_POST['Requerimiento'] == "CargarProcedimientosMedicosFact"){

		
		$dao = new Dao();

		$sql =' SELECT e.id , e.nombres , e.apellidos , e.foto,ms.id,mh.turnos  
				FROM   medico_procedimiento p 
				INNER JOIN empleado e ON(p.id_empleado =e.id )
				INNER JOIN medico_especialidad ms ON(ms.id_empleado =e.id )
				INNER JOIN medico_especialidad_horario mh ON(ms.id = mh.id_medico_especialidad)   
				WHERE  e.id_estado = 5 and  p.id_procedimiento IN('.substr(trim($_POST['Id']),0,-1).')
				/*AND mh.dia = (ELT(WEEKDAY(CURDATE()) + 1, "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO")) */
				GROUP BY e.id   
				union
				SELECT em.id , em.nombres , em.apellidos , em.foto,ms.id,mh.turnos 
				from empleado em INNER JOIN medico_especialidad ms ON(ms.id_empleado =em.id )
				INNER JOIN medico_especialidad_horario mh ON(ms.id = mh.id_medico_especialidad) 
				where em.id_estado = 5 and ms.id_especialidad = '.$_POST['IdEspecialidad'].' and ms.id_tipo_relacion 
				in (1) /*AND mh.dia = (ELT(WEEKDAY(CURDATE()) + 1, "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"))*/ GROUP BY em.id ';

		//$dao->ConsultarSqlNativoAjax($sql);

		$respuesta =$dao->ConsultarSqlNativo($sql);
		$jsondata = array();
		$i=0;

		foreach ($respuesta as $row => $item){

					$datos = array();
					
					$datos[0] = $item[0];
					$datos[1] = $item[1];
					$datos[2] = $item[2];
					$datos[3] = $item[3];
					$datos[4] = $item[4];
					$datos[5] = $item[5];
					$datos[6] = ObtTurnosVendidos($item[0]);
					$datos[7] = ObtAtendidos($item[0]);

					$jsondata[$i]=$datos;
					$i++;					

		}
		echo json_encode($jsondata);

	}

	if($_POST['Requerimiento'] == "CargarMedicosPorEspecialidad"){

		
		$dao = new Dao();

		$sql =' SELECT em.id , em.nombres , em.apellidos , em.foto,ms.id,mh.turnos 
				from empleado em INNER JOIN medico_especialidad ms ON(ms.id_empleado =em.id )
				INNER JOIN medico_especialidad_horario mh ON(ms.id = mh.id_medico_especialidad) 
				where em.id_estado = 5 and ms.id_especialidad = '.$_POST['IdEspecialidad'].' and ms.id_tipo_relacion 
				in (1) /*AND mh.dia = (ELT(WEEKDAY(CURDATE()) + 1, "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"))*/ GROUP BY em.id ';

		//$dao->ConsultarSqlNativoAjax($sql);

		$respuesta =$dao->ConsultarSqlNativo($sql);
		$jsondata = array();
		$i=0;

		foreach ($respuesta as $row => $item){

					$datos = array();
					
					$datos[0] = $item[0];
					$datos[1] = $item[1];
					$datos[2] = $item[2];
					$datos[3] = $item[3];
					$datos[4] = $item[4];
					$datos[5] = $item[5];
					$datos[6] = ObtTurnosVendidos($item[0]);
					$datos[7] = ObtAtendidos($item[0]);
					
					$jsondata[$i]=$datos;
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

	if($_POST['Requerimiento'] == "MostrarHorarioMedicoFact"){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("horaI","");
		$dao->Campo("horaF","");
		$dao->Campo("turnos","");
		$dao->Campo("dia","");

		$dao->Tabla("medico_especialidad_horario","");
		$dao->Where("id_medico_especialidad",$_POST['Id'],"");

		$respuesta =$dao->Consultar();
		$jsondata = array();
		$i=0;

		foreach ($respuesta as $row => $item){
					$evento = array();
					
					$evento['id'] =$item[0];
					//$evento['title'] = "TURNOS ".$item[3];
					$evento['start'] = $item[1];
					$evento['end'] = $item[2];
					$evento['dow'] = ObtDia($item[4]);
					$evento['backgroundColor'] ='#00a65a';
					$evento['borderColor'] ='#00a65a';

					$jsondata[$i]=$evento;
					$i++;

		}
		echo json_encode($jsondata);

	}


	if($_POST['Requerimiento'] == "CargarTurnosDisponiblesMedicos"){

		$dao = new Dao();

		$sql =' SELECT x.fechaatencion,COUNT(x.id_consulta)
				FROM
				(SELECT convert(ci.fecha_atencion,date) fechaatencion,ci.id_consulta,COUNT(ci.id_consulta) 
				FROM consulta_item ci
				WHERE convert(fecha_atencion,date) >= CURDATE() 
				AND ci.id_procedimiento IS NOT NULL AND ci.id_procedimiento_laboratorio IS NULL
				AND ci.id_empleado = '.$_POST['Id'].'
				GROUP BY convert(fecha_atencion,date) ,ci.id_consulta) x
				GROUP BY x.fechaatencion ';

		$respuesta = $dao->ConsultarSqlNativo($sql);
		$jsondata = array();
		$i=0;

		foreach ($respuesta as $row => $item){
					$evento = array();
					
					$evento['allDay'] =true;
					$evento['title'] = "PAC ".$item[1];
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

	if($_POST['Requerimiento'] == "CargarReservacionesLaboratorioHoy"){
		$dao = new Dao();

		$sql =' SELECT x.fecha_atencion,COUNT(x.id_consulta)
				FROM
				(SELECT ci.fecha_atencion,ci.id_consulta,COUNT(ci.id_consulta) 
				FROM consulta_item ci
				WHERE fecha_atencion = CURDATE() 
				AND ci.id_procedimiento_laboratorio IS NOT NULL
				GROUP BY ci.fecha_atencion,ci.id_consulta) x
				GROUP BY x.fecha_atencion ';

		$respuesta = $dao->ConsultarSqlNativo($sql);
		$jsondata = array();
		

		foreach ($respuesta as $row => $item){
				$jsondata[0]=$item[1];		
		}

		$dao = new Dao();

		$sql =' SELECT x.fecha_atencion,COUNT(x.id_consulta)
				FROM
				(SELECT ci.fecha_atencion,ci.id_consulta,COUNT(ci.id_consulta) 
				FROM consulta_item ci
				WHERE fecha_atencion = CURDATE() 
				AND ci.id_procedimiento_laboratorio IS NOT NULL AND ci.id_estado !=7
				GROUP BY ci.fecha_atencion,ci.id_consulta) x
				GROUP BY x.fecha_atencion ';

		$respuesta = $dao->ConsultarSqlNativo($sql);			

		foreach ($respuesta as $row => $item){
			$jsondata[1]=$item[1];		
		}
		echo json_encode($jsondata);
	}
	if($_POST['Requerimiento'] == "CargarReservacionesLaboratorio"){

		
		$dao = new Dao();

		$sql =' SELECT x.fecha_atencion,COUNT(x.id_consulta)
				FROM
				(SELECT ci.fecha_atencion,ci.id_consulta,COUNT(ci.id_consulta) 
				FROM consulta_item ci
				WHERE fecha_atencion >= CURDATE() 
				AND ci.id_procedimiento_laboratorio IS NOT NULL
				GROUP BY ci.fecha_atencion,ci.id_consulta) x
				GROUP BY x.fecha_atencion ';

		$respuesta = $dao->ConsultarSqlNativo($sql);

		$jsondata = array();
		$i=0;

		foreach ($respuesta as $row => $item){
					$evento = array();
					
					$evento['allDay'] =true;
					$evento['title'] = "PAC ".$item[1];
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

	if($_POST['Requerimiento'] == "ObtenerConsulta"){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.precio","");
		$dao->Campo("e.id_tipo_servicio","");

		$dao->TablasInnerAlias("procedimiento","p","especialidad","e");

		$dao->In_Where("p.id_estado","1,20","and");
		$dao->Where("e.id_estado","1","and");
		$dao->Where("p.nombre","'CONSULTA'","and");
		$dao->Where("p.id_especialidad",$_POST['Id'],"");

		$dao->ConsultarAjax();

	}

	function EnviarResultadosNube($paciente,$procedimiento,$resultado,$consulta,$cedula,$sexo,$edad,$fechatoma,$fecharesultado)
	{
		$headers =  [
			'Content-Type: application/x-www-form-urlencoded'
		];
		$data = array(
			'Requerimiento' => "Guardar",
			'Paciente' => $paciente,
			'Procedimiento' => $procedimiento,
			'Resultado' => $resultado,
			'Consulta' => $consulta,
			'Cedula' => $cedula,
			'Sexo' => $sexo,
			'Edad' => $edad,
			'FechaToma' => $fechatoma,
			'FechaResultado' => $fecharesultado
		);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://www.fundacionsantaisabel.org.ec/ResultadosEsculapio/Ajax/Aj_Resultados.php");
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
		$result = curl_exec($ch);
		curl_close($ch);
		
	}
	function ObtenerResultadosCovid($consulta)
	{
		$dao = new Dao();

		$dao->Campo("CONCAT(pa.apellido,' ',pa.apellido_materno,' ',pa.nombre)", "");//0
		$dao->Campo("pro.nombre", "");//1
		$dao->Campo("p.resultado", "");//2
		$dao->Campo("p.id_consulta", "");//3
		$dao->Campo("pa.cedula", "");//4
		$dao->Campo("g.nombre", "");//5
		$dao->Campo("TIMESTAMPDIFF(YEAR,pa.fecha_nacimiento,CURDATE())", "");//6
		$dao->Campo("p.fecha_registro", "");//7
		$dao->Campo("p.fecha_valido", "");//8

		$dao->TablasInnerAlias("resultado_laboratorio", "p", "procedimiento_laboratorio", "pro");
		$dao->TablasInnerAlias("resultado_laboratorio", "p", "consulta", "c");
		$dao->TablasInnerAlias("consulta", "c","paciente","pa");
		$dao->TablasInnerAlias("paciente","pa","genero2","g");

		$dao->Where("p.id_consulta", $consulta, "and");
		$dao->Where("pro.generar_qr", "'S'", "");
		$dao->Ordenar("p.id");
		$respuesta = $dao->Consultar();
		$confirma = false;
		foreach ($respuesta as $key => $value) {
			if ($value[2] != "") {
				$confirma = true;
				EnviarResultadosNube($value[0],$value[1],$value[2],$value[3],$value[4],$value[5],$value[6],$value[7],$value[8]);
				break;
			}
		}
		return $confirma;
	}
	if ($_POST['Requerimiento'] == "ObtenerQR") {
		require_once "phpqrcode/qrlib.php";
		$ruta = '../imagenes/' . $_POST["Consulta"] . ".png";
		$t = 10;
		$l = 'M';
		$f = 3;

		$confirma = ObtenerResultadosCovid($_POST["Consulta"]);
		$contenido = "https://www.fundacionsantaisabel.org.ec/ResultadosEsculapio/index.php?Codigo=" . $_POST["Consulta"];

		QRcode::png($contenido, $ruta, $l, $t, $f);
		$jsondata = [];
		if ($confirma) {
			$jsondata[] = 'imagenes/' . $_POST["Consulta"] . ".png";
		}
		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}
}
