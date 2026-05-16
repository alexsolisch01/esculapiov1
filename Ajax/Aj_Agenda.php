<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if($_POST['Requerimiento'] == "CargarConsultas"){

		$dao = new Dao();
		
		$dao->Campo("DISTINCT b.id","");
		$dao->Campo("es.nombre","");					
		$dao->Campo("em.nombres","");
		$dao->Campo("em.apellidos","");		
		$dao->Campo("b.id_estado","");
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.id","");
		$dao->Campo("es.id","");
		$dao->Campo("em.id","");
		$dao->Campo("ci.id_estado_orden_lab","");
		$dao->Campo("ci.id_estado_orden_rx","");
		$dao->Campo("ci.id_estado_orden_eco","");
		$dao->Campo("ci.id_estado_orden_tomo","");
		$dao->Campo("ci.id_estado_receta","");
		$dao->Campo("t.id","");
		$dao->Campo("ci.id","");
		$dao->Campo("ci.id_estado","");
		
		$dao->TablasInnerAlias("consulta_item","ci","consulta","b");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento","p");
		$dao->TablasInnerAlias("procedimiento","p","especialidad","es");
		$dao->TablasInnerAlias("especialidad","es","tipo_servicio","t");
		$dao->TablasInnerAlias("consulta_item","ci","empleado","em");
		//$dao->TablasInnerAlias("paciente_alergia","pa","paciente","pac");
		$dao->In_Where("ci.id_estado","9,19,13","and");
		$dao->Diferente("ci.id_estado","25","and");		
		$dao->Where("b.id_paciente",$_POST['IdPaciente'],"and");
		$dao->MenorIgual("CONVERT(ci.fecha_atencion,DATE)",'CURDATE()',"");
		$dao->Agrupar("ci.id");
		$dao->Ordenar("ci.fecha_atencion DESC,ci.id desc");


		$dao->ConsultarAjax();

	}
	if($_POST['Requerimiento'] == "CargarConsultasAdmin"){

		$dao = new Dao();
		
		$dao->Campo("DISTINCT b.id","");
		$dao->Campo("es.nombre","");					
		$dao->Campo("em.nombres","");
		$dao->Campo("em.apellidos","");		
		$dao->Campo("b.id_estado","");
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.id","");
		$dao->Campo("es.id","");
		$dao->Campo("em.id","");
		$dao->Campo("ci.id_estado_orden_lab","");
		$dao->Campo("ci.id_estado_orden_rx","");
		$dao->Campo("ci.id_estado_orden_eco","");
		$dao->Campo("ci.id_estado_orden_tomo","");
		$dao->Campo("ci.id_estado_receta","");
		$dao->Campo("t.id","");
		$dao->Campo("ci.id","");
		$dao->Campo("ci.id_estado","");
		
		$dao->TablasInnerAlias("consulta_item","ci","consulta","b");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento","p");
		$dao->TablasInnerAlias("procedimiento","p","especialidad","es");
		$dao->TablasInnerAlias("especialidad","es","tipo_servicio","t");
		$dao->TablasInnerAlias("consulta_item","ci","empleado","em");
		//$dao->TablasInnerAlias("paciente_alergia","pa","paciente","pac");
		$dao->In_Where("ci.id_estado","19","and");
		$dao->Diferente("ci.id_estado","25","and");		
		$dao->Where("b.id_paciente",$_POST['IdPaciente'],"and");
		$dao->MenorIgual("CONVERT(ci.fecha_atencion,DATE)",'CURDATE()',"");
		$dao->Agrupar("ci.id");
		$dao->Ordenar("ci.fecha_atencion DESC,ci.id desc");


		$dao->ConsultarAjax();

	}

	if($_POST['Requerimiento'] == "CargarSignosPorPacienteFecha"){

		$dao = new Dao();

		$dao->Campo("s.edad","");
		$dao->Campo("s.presion","");
		$dao->Campo("s.pulso","");
		$dao->Campo("s.talla","");
		$dao->Campo("s.peso","");
		$dao->Campo("s.imc","");
		$dao->Campo("s.temp_bucal","");
		$dao->Campo("s.temp_rectal","");
		$dao->Campo("s.temp_axilar","");
		$dao->Campo("s.perim_cefalico","");
		$dao->Campo("s.perim_abdominal","");
		$dao->Campo("s.prioridad","");
		$dao->Campo("s.fr","");
		$dao->TablasInnerAlias("signo","s","paciente","e");
		$dao->TablasInnerAlias("signo","s","consulta","b");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","b");
		$dao->TablasInnerAlias("consulta_item","ci","empleado","em");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento","p");
		$dao->TablasInnerAlias("procedimiento","p","especialidad","es");

		$dao->Where("CONVERT(ci.fecha_atencion,DATE)",'"'.$_POST['FechaAtencion'].'"',"and");
		$dao->Where("e.id",$_POST['IdPaciente'],"and");
		$dao->Where("em.id",$_POST['IdMedico'],"and");
		$dao->Where("es.id",$_POST['IdEspecialidad'],"and");
		$dao->Where("p.id",$_POST['IdProcedimiento'],"and");

		if($_POST['FechaAtencion']>'2019-06-30'){
	      $dao->Where("s.id_consulta_item",$_POST['ConsultaItem'],"and"); // en santa isabel se puede caer
	    }
		
		$dao->In_Where("ci.id_estado","9,19","");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}
	if($_POST['Requerimiento'] == "CargarSignosPorPaciente"){

		$dao = new Dao();

		$dao->Campo("s.edad","");
		$dao->Campo("s.presion","");
		$dao->Campo("s.pulso","");
		$dao->Campo("s.talla","");
		$dao->Campo("s.peso","");
		$dao->Campo("s.imc","");
		$dao->Campo("s.temp_bucal","");
		$dao->Campo("s.temp_rectal","");
		$dao->Campo("s.temp_axilar","");
		$dao->Campo("s.perim_cefalico","");
		$dao->Campo("s.perim_abdominal","");
		$dao->Campo("s.prioridad","");
		$dao->Campo("s.fr","");
		$dao->Tabla("signo","s");

		$dao->Where("s.id_consulta",$_POST['Consulta'],"");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarSignosPorItem"){

		$dao = new Dao();

		$dao->Campo("Convert(s.fecha_atencion,date)","");
		$dao->Campo("s.presion","");
		$dao->Campo("s.pulso","");		
		$dao->Campo("s.peso","");
		$dao->Campo("s.talla","");
		$dao->Campo("s.imc","");
		$dao->Campo("s.temp_bucal","");
		$dao->Campo("s.temp_rectal","");
		$dao->Campo("s.temp_axilar","");
		$dao->Campo("s.perim_cefalico","");
		$dao->Campo("s.perim_abdominal","");
		$dao->Campo("s.prioridad","");
		$dao->Campo("s.fr","");
		$dao->Tabla("signo","s");

		$dao->Where("s.id_consulta_item",$_POST['Item'],"");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "GuardarAlergia"){

		$dao = new Dao();

		$datos = array("alergia"=>$_POST["Alergia"],
						"id_estado"=>1,
						"id_paciente"=>$_POST["Paciente"],
						"id_empleado"=>$_POST["Medico"],
						"id_especialidad"=>$_POST["Especialidad"],
						"usuario_registro"=>$_SESSION["usuario"]);
						$dao= new Dao();
			            $dao->GuardarAjax("paciente_alergia",$datos);
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarAlergiaPorPaciente"){

		$dao = new Dao();
		
		$dao->Campo("pc.id","");
		$dao->Campo("CONVERT(pc.fecha_registro,DATE)","");
		$dao->Campo("e.apellidos","");
		$dao->Campo("e.nombres","");
		$dao->Campo("pc.alergia","");
		$dao->TablasInnerAlias("paciente_alergia","pc","paciente","p");
		$dao->TablasInnerAlias("paciente_alergia","pc","empleado","e");
		$dao->Where("pc.id_estado","1","and");
		$dao->Where("p.id",$_POST['IdPaciente'],"");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "GuardarEnfermedad"){

		$dao = new Dao();

		$datos = array("id_estado"=>1,
						"id_paciente"=>$_POST["Paciente"],
						"enfermedad"=>$_POST["Enfermedad"],
						"descripcion"=>$_POST["Descripcion"],
						"usuario_registro"=>$_SESSION["usuario"]);
						$dao= new Dao();
			            $dao->GuardarAjax("hc_paciente",$datos);
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarEnfermedad"){

		$dao = new Dao();
		
		$dao->Campo("hc.id","");
		$dao->Campo("hc.enfermedad","");
		$dao->Campo("hc.descripcion","");
		$dao->Tabla("hc_paciente","hc","");
		$dao->Where("hc.id_estado","1","and");
		$dao->Where("hc.id_paciente",$_POST['IdPaciente'],"");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}
	
	if($_POST['Requerimiento'] == "EliminaEnfermedad"){
		$dao= new Dao();
		$dao->EliminarPorCamposAjax("hc_paciente","id_paciente=".$_POST["IdPaciente"]." AND enfermedad='".$_POST["Enfermedad"]."'");
	}

	if($_POST['Requerimiento'] == "GuardarProblema"){

		

		$datos = array("id_paciente"=>$_POST["Paciente"],
						"id_empleado"=>$_SESSION["id_empleado"],
						"enfermedad"=>$_POST["Problema"],
						"id_consulta"=>$_POST["Consulta"],
						"id_consulta_item"=>$_POST["Item"],
						"grupos_lab"=>$_POST["Lab"],
						"grupos_rx"=>$_POST["Rx"],
						"grupos_eco"=>$_POST["Eco"],
						"grupos_tomo"=>$_POST["Tomo"],
						"grupo_receta"=>$_POST["Receta"],
						//"orden_total"=>$_POST["OrdenTotal"],
						"usuario_registro"=>$_SESSION["usuario"]);
		$dao= new Dao();
		$dao->GuardarAjax("paciente_enfermedad",$datos);
		
	}

	if($_POST['Requerimiento'] == "CargarProblema"){

		$dao = new Dao();
		
		$dao->Campo("pe.id","");
		$dao->Campo("pe.enfermedad","");
		$dao->Campo("pe.grupos_lab","");
		$dao->Campo("pe.grupos_rx","");
		$dao->Campo("pe.grupos_eco","");
		$dao->Campo("pe.grupos_tomo","");
		$dao->Campo("pe.grupo_receta","");
		$dao->Campo("pe.orden_total","");
		$dao->Campo("pe.orden_lab","");
		$dao->Campo("pe.orden_rx","");
		$dao->Campo("pe.orden_eco","");
		$dao->Campo("pe.orden_tac","");
		$dao->Campo("pe.orden_receta","");
		$dao->Campo("pe.certificado","");
		$dao->Campo("pe.certificado2","");
		$dao->Tabla("paciente_enfermedad","pe","");
		$dao->Where("pe.id_paciente",$_POST['IdPaciente'],"and");
		$dao->Where("pe.id_consulta",$_POST['Consulta'],"and");
		$dao->Where("pe.id_consulta_item",$_POST['Item'],"");
		
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarProblemaPorItem"){

		$dao = new Dao();
				
		$dao->Campo("pe.enfermedad","");
		$dao->Campo("pe.grupos_lab","");
		$dao->Campo("pe.grupos_rx","");
		$dao->Campo("pe.grupos_eco","");
		$dao->Campo("pe.grupos_tomo","");
		$dao->Campo("pe.grupo_receta","");		

		$dao->Tabla("paciente_enfermedad","pe","");
		$dao->Where("pe.id_consulta_item",$_POST['Item'],"");
		
		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "GuardarGineco"){

		$dao = new Dao();

		$datos = array("id_paciente"=>$_POST["Paciente"],
						"id_empleado"=>$_SESSION["id_empleado"],
						"gestacion"=>$_POST["Gestacion"],
						"abortos"=>$_POST["Abortos"],
						"partos"=>$_POST["Partos"],
						"cesarea"=>$_POST["Cesarea"],
						"vaginales"=>$_POST["Vaginales"],
						"vivos"=>$_POST["Vivos"],
						"muertos"=>$_POST["Muertos"],
						"tipo_sangre"=>$_POST["Sangre"],
						"fecha_gestacion"=>$_POST["FechaGestacion"],
						"fecha_parto"=>$_POST["FechaParto"],
						"diabetes"=>$_POST["Diabetes"],
						"hipertension"=>$_POST["Hiper"],
						"pulmonar"=>$_POST["Pulmonar"],
						"gemelares"=>$_POST["Gemelares"],
						"otros"=>$_POST["Otros"],
						"diabetesf"=>$_POST["DiabetesF"],
						"hipertensionf"=>$_POST["HiperF"],
						"pulmonarf"=>$_POST["PulmonarF"],
						"gemelaresf"=>$_POST["GemelaresF"],
						"otrosf"=>$_POST["OtrosF"]);
						$dao= new Dao();
			            $dao->GuardarAjax("ginecostetrico",$datos);
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarGineco"){

		$dao = new Dao();
		
		$dao->Campo("g.id","");
		$dao->Campo("g.gestacion","");
		$dao->Campo("g.abortos","");
		$dao->Campo("g.partos","");
		$dao->Campo("g.cesarea","");
		$dao->Campo("g.vaginales","");
		$dao->Campo("g.vivos","");
		$dao->Campo("g.muertos","");
		$dao->Campo("g.tipo_sangre","");
		$dao->Campo("CONVERT(g.fecha_gestacion,DATE)","");
		$dao->Campo("CONVERT(g.fecha_parto,DATE)","");
		$dao->Campo("g.diabetes","");
		$dao->Campo("g.hipertension","");
		$dao->Campo("g.pulmonar","");
		$dao->Campo("g.gemelares","");
		$dao->Campo("g.otros","");
		$dao->Campo("g.diabetesf","");
		$dao->Campo("g.hipertensionf","");
		$dao->Campo("g.pulmonarf","");
		$dao->Campo("g.gemelaresf","");
		$dao->Campo("g.otrosf","");
		$dao->TablasInnerAlias("ginecostetrico","g","paciente","e");
		$dao->Where("e.id",$_POST['IdPaciente'],"");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "EliminaGineco"){
		$dao= new Dao();
		$dao->EliminarPorCampoAjax("ginecostetrico","id_paciente",$_POST['Paciente']);
	}

	if($_POST['Requerimiento'] == "CargarPlantillasLaboratorio"){

		$dao = new Dao();
		
		$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$dao->Campo("r.descripcion","");
		$dao->Campo("r.resultado","");
		$dao->Campo("r.unidad_medida","");
		$dao->Campo("r.referencia","");
		$dao->Campo("r.referencia_min","");
		$dao->Campo("r.referencia_max","");	
		$dao->Campo("p.nombre","");

		$dao->TablasInnerAlias("resultado_laboratorio","r","procedimiento_laboratorio","p");
		$dao->Where("r.id_estado","1","and");
		$dao->Where("r.id_paciente",$_POST['IdPaciente'],"");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarLaboratorioPorConsulta"){

		$dao = new Dao();
		
		$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$dao->Campo("r.descripcion","");
		$dao->Campo("r.resultado","");
		$dao->Campo("r.unidad_medida","");
		$dao->Campo("r.referencia","");
		$dao->Campo("r.referencia_min","");
		$dao->Campo("r.referencia_max","");	
		$dao->Campo("p.nombre","");

		$dao->TablasInnerAlias("resultado_laboratorio","r","procedimiento_laboratorio","p");
		$dao->Where("r.id_estado","1","and");
		$dao->Where("r.id_consulta",$_POST['IdConsulta'],"");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarHistoricoRx"){

		$dao = new Dao();
		
		$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$dao->Campo("p.nombre","");				
		$dao->Campo("r.plantilla","");
		
		
		$dao->TablasInnerAlias("resultado_rx","r","procedimiento_rx","p");		
		
		$dao->Where("r.id_paciente",$_POST['IdPaciente'],"");		
		

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarOrdenRx"){

		$dao = new Dao();
		
		$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$dao->Campo("p.nombre","");				
		$dao->Campo("r.plantilla","");
		
		
		$dao->TablasInnerAlias("resultado_rx","r","procedimiento_rx","p");		
		
		$dao->Where("r.id_consulta",$_POST['IdConsulta'],"");		
		

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarHistoricoEco"){

		$dao = new Dao();
		
		$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$dao->Campo("p.nombre","");				
		$dao->Campo("r.plantilla","");
		
		
		$dao->TablasInnerAlias("resultado_eco","r","procedimiento_eco","p");		
		
		$dao->Where("r.id_paciente",$_POST['IdPaciente'],"");		
		

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarOrdenEco"){

		$dao = new Dao();
		
		$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$dao->Campo("p.nombre","");				
		$dao->Campo("r.plantilla","");
		
		
		$dao->TablasInnerAlias("resultado_eco","r","procedimiento_eco","p");		
		
		$dao->Where("r.id_consulta",$_POST['IdConsulta'],"");		
		

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarHistoricoTac"){

		$dao = new Dao();
		
		$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$dao->Campo("p.nombre","");				
		$dao->Campo("r.plantilla","");
		
		
		$dao->TablasInnerAlias("resultado_tomo","r","procedimiento_tomo","p");		
		
		$dao->Where("r.id_paciente",$_POST['IdPaciente'],"");		
		

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarOrdenTomo"){

		$dao = new Dao();
		
		$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$dao->Campo("p.nombre","");				
		$dao->Campo("r.plantilla","");
		
		
		$dao->TablasInnerAlias("resultado_tomo","r","procedimiento_tomo","p");		
		
		$dao->Where("r.id_consulta",$_POST['IdConsulta'],"");		
		

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarOrdenReceta"){
		$dao = new Dao();
		
		//$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$sql ='SELECT i.id, CONCAT(CASE WHEN i.principio1 = "(NINGUNO)" THEN "" ELSE i.principio1 END," ",CASE WHEN i.principio2 = "(NINGUNO)" THEN "" ELSE i.principio2 END," ",CASE WHEN i.principio3 = "(NINGUNO)" THEN "" ELSE i.principio3 END," ",CASE WHEN i.principio4 = "(NINGUNO)" THEN "" ELSE i.principio4 END) Prescripcion, i.nombre, rd.presentacion, rd.cantidad, CONCAT(rd.observaciones," ",rd.observaciones2) Observaciones, CASE WHEN r.proxima_consulta = "0000-00-00 00:00:00" THEN "NO" ELSE r.proxima_consulta END, CASE WHEN r.consulta_control = "0000-00-00 00:00:00" THEN "NO" ELSE r.consulta_control END, r.fecha_registro
			FROM receta r INNER JOIN receta_detalle rd ON (rd.id_receta = r.id) INNER JOIN inventario i ON (rd.id_inventario = i.id) 
			WHERE r.id_consulta_item = '.$_POST['IdConsulta'].'
			UNION
			SELECT 0, rd.prescripcion Prescripcion, rd.sugerencia, rd.presentacion, rd.cantidad, CONCAT(rd.observaciones," ",rd.observaciones2) Observaciones, CASE WHEN r.proxima_consulta = "0000-00-00 00:00:00" THEN "NO" ELSE r.proxima_consulta 	END, CASE WHEN r.consulta_control = "0000-00-00 00:00:00" THEN "NO" ELSE r.consulta_control END, r.fecha_registro
			FROM receta r INNER JOIN receta_detalle rd ON (rd.id_receta = r.id) 
			WHERE r.id_consulta_item = '.$_POST['IdConsulta'].' and rd.sugerencia IS NOT NULL and rd.prescripcion IS NOT NULL';
		
		$respuesta =$dao->ConsultarSqlNativoAjax($sql);
	}

/**************************************************************RECETA-*********************************************************/
	if($_POST['Requerimiento'] == "GuardarReceta"){

		

		$datos = array("id_paciente"=>$_POST["Paciente"],
						"id_consulta"=>$_POST["Consulta"],
						"id_consulta_item"=>$_POST["Item"],
						"id_empleado"=>$_SESSION["id_empleado"],
						"especialidad"=>$_POST["Especialidad"],
						"id_estado"=>1,
						"usuario_registro"=>$_SESSION["usuario"]);

		if($_POST["Proxima"]==1){
			$datos['proxima_consulta']=$_POST["FechaP"];
		}
		if($_POST["Control"]==1){
			$datos['consulta_control']=$_POST["FechaC"];
		}
		
		$dao= new Dao();
		$dao->GuardarAjax("receta",$datos);
		
	}

	if($_POST['Requerimiento'] == "GuardarDetalleReceta"){

		if($_POST["Item"]==0){
			$datos = array("id_receta"=>$_POST["Receta"],
						"prescripcion"=>$_POST["Prescripcion"],
						"presentacion"=>$_POST["Presentacion"],
						"cantidad"=>$_POST["Cantidad"],
						"sugerencia"=>$_POST["Sugerencia"],
						"observaciones"=>$_POST["Observaciones"],
						"observaciones2"=>$_POST["Observaciones2"]);
		}else{
			$datos = array("id_receta"=>$_POST["Receta"],
						"id_inventario"=>$_POST["Item"],
						"presentacion"=>$_POST["Presentacion"],
						"cantidad"=>$_POST["Cantidad"],
						"observaciones"=>$_POST["Observaciones"],
						"observaciones2"=>$_POST["Observaciones2"]);	
		}

		
		$dao= new Dao();
		$dao->GuardarAjax("receta_detalle",$datos);
		
	}

/**************************************************************ORDEN-*********************************************************/
	if($_POST['Requerimiento'] == "GuardarOrden"){

		

		$datos = array("id_paciente"=>$_POST["Paciente"],
						"id_consulta"=>$_POST["Consulta"],
						"id_consulta_item"=>$_POST["Item"],
						"id_empleado"=>$_SESSION["id_empleado"],
						"id_estado"=>1,
						"motivo"=>$_POST["Motivo"],
						"usuario_registro"=>$_SESSION["usuario"]);
		$dao= new Dao();
		$dao->GuardarAjax("orden",$datos);
		
	}

	if($_POST['Requerimiento'] == "GuardarDetalleOrden"){

		$datos = array("id_orden"=>$_POST["Orden"],						
						"precio"=>$_POST["Precio"],
						"id_estado"=>1);

		if(isset($_POST["Laboratorio"])){
			if($_POST["Laboratorio"]!=-1){
				$datos['id_procedimiento_laboratorio']=$_POST["Laboratorio"];
			}			
		}
		if(isset($_POST["Rx"])){
			if($_POST["Rx"]!=-1){
				$datos['id_procedimiento_rx']=$_POST["Rx"];
			}			
		}
		if(isset($_POST["Eco"])){
			if($_POST["Eco"]!=-1){
				$datos['id_procedimiento_eco']=$_POST["Eco"];
			}			
		}
		if(isset($_POST["Tac"])){
			if($_POST["Tac"]!=-1){
				$datos['id_procedimiento_tomo']=$_POST["Tac"];
			}			
		}
		if(isset($_POST["Nombre"])){						
			$datos['nombre']=$_POST["Nombre"];
		}

		$dao= new Dao();
		$dao->GuardarAjax("orden_item",$datos);
		
	}

/**************************************************************ORDEN-*********************************************************/
	if($_POST['Requerimiento'] == "GuardarDiagnostico"){

		

		$datos = array("id_cie"=>$_POST["Cie"],
						"id_consulta"=>$_POST["Consulta"],
						"id_empleado"=>$_SESSION["id_empleado"],
						"tipo"=>$_POST["Tipo"],
						"tiempo"=>$_POST["Tiempo"],
						"procedimiento"=>$_POST["Procedimiento"],
						"actividades"=>$_POST["Actividades"],
						"interconsulta"=>$_POST["Interconsulta"],
						"condicion"=>$_POST["Condicion"],
						
						"usuario_registro"=>$_SESSION["usuario"]);

		if(isset($_POST["Descripcion"])){
			$datos['descripcion']=$_POST["Descripcion"];
		}
		if(isset($_POST["Item"])){
			$datos['id_consulta_item']=$_POST["Item"];
		}

		$dao= new Dao();
		$dao->GuardarAjax("diagnostico",$datos);
		
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoOP"){

		
		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("consulta",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
		
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoItem"){

		
		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("consulta_item",$datos,"id=".$_POST['Item'],$_POST['Item']);
		
	}

	if($_POST['Requerimiento'] == "CargarProcedimientosParteDiario"){

		
		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("procedimiento_parte_diario","");
		$dao->Where("id_estado","1","and");
		$dao->In_Where("id",$_POST['Ids'],"");
		$dao->Ordenar("nombre");

		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "CargarPacientesSinSignoVitales"){

		
		$dao2 = new Dao();

			$dao2->Campo("DISTINCT c.id","");
			$dao2->Campo("CONCAT(p.apellido,' ',p.apellido_materno)","");
			$dao2->Campo("p.nombre","");
			$dao2->Campo("p.id","");
			$dao2->Campo("c.id_estado","");
			$dao2->Campo("p.cedula","");
			$dao2->TablasInnerAlias("consulta","c","paciente","p");	
			$dao2->TablasInnerAliasOtra("consulta_item","ci","consulta","c");		
			$dao2->TablasInnerAlias("consulta_item","ci","empleado","em");
			$dao2->Where("c.id_estado","1","and");
			$dao2->Where("CONVERT(ci.fecha_atencion,DATE)",'CURDATE()',"and");
			$dao2->Where("em.id",$_SESSION["id_empleado"],"and");
			$dao2->Where("c.id",$_POST["Consulta"],"");
			
			
			$respuesta2 =$dao2->Consultar();

			$jsondata = array();
			$i=0;
			$pacientes='';
			foreach ($respuesta2 as $row2 => $item2){
					$nombre2 = $item2[2];
					$nombre3 = explode(" ",$nombre2);
					$pacientes='<li class="pointer "   id="PacienteConsultaExterna"><a idConsulta="'.$item2[0].'" idPaciente="'.$item2[3].'" nombrePaciente="'.$item2[1].' '.$item2[2].'" cedulaPaciente="'.$item2[5].'" Estado="'.$item2[4].'"><i class="fa fa-circle-o"></i> '.$item2[1].' '.$nombre3[0].'</a></li>';
					$jsondata[$i]=$pacientes;
					$i++;					

		}
		echo json_encode($jsondata);
		
	}

	if($_POST['Requerimiento'] == "CargarPacientesConSignoVitales"){

			$dao1 = new Dao();

			$dao1->Campo("DISTINCT c.id","");
			$dao1->Campo("CONCAT(p.apellido,' ',p.apellido_materno)","");
			$dao1->Campo("p.nombre","");
			$dao1->Campo("p.id","");
			$dao1->Campo("c.id_estado","");
			$dao1->Campo("p.cedula","");
			$dao1->Campo("s.triage","");
			$dao1->Campo("s.prioridad","");
			$dao1->Campo("g.nombre","");
			$dao1->Campo("s.edad","");
			$dao1->Campo("s.presion","");
			$dao1->Campo("s.pulso","");
			$dao1->Campo("s.talla","");
			$dao1->Campo("s.peso","");
			$dao1->Campo("s.imc","");
			$dao1->Campo("s.temp_bucal","");
			$dao1->Campo("s.temp_rectal","");
			$dao1->Campo("s.temp_axilar","");
			$dao1->Campo("s.perim_cefalico","");
			$dao1->Campo("s.perim_abdominal","");
			$dao1->Campo("s.prioridad","");
			$dao1->Campo("s.usuario_registro","");
			$dao1->Campo("s.id_consulta","");
			$dao1->Campo("s.fr","");
			$dao1->Campo("ci.id_estado","");
			$dao1->TablasInnerAlias("signo","s","paciente","p");
			$dao1->TablasInnerAlias("consulta","c","paciente","p");
			$dao1->TablasInnerAlias("signo","s","consulta","c");
			$dao1->TablasInnerAlias("paciente","p","genero","g");
			$dao1->TablasInnerAliasOtra("consulta_item","ci","consulta","c");		
			$dao1->TablasInnerAlias("consulta_item","ci","empleado","em");
			$dao1->In_Where("c.id_estado","9,19","and");
			$dao1->Where("CONVERT(ci.fecha_atencion,DATE)",'CURDATE()',"and");
			$dao1->Where("em.id",$_SESSION["id_empleado"],"and");
			$dao1->Where("c.id",$_POST["Consulta"],"");
			
			
			$respuesta1 =$dao1->Consultar();

			$jsondata = array();
			$i=0;
			$pacientes='';
			
			foreach ($respuesta1 as $row1 => $item1){
					$nombre = $item1[2];
					$nombre1 = explode(" ",$nombre);
					if($item1[7]=='PACIENTE EN SILLA DE RUEDAS'){
						$prioridad ='<img style="width:20px; margin-top:-0.2em; margin-left:0.3em;" src="imagenes/silla.jpg">';
					}
					if($item1[7]=='DISCAPACITADO'){
						$prioridad ='<img style="width:20px; margin-top:-0.2em; margin-left:0.3em;" src="imagenes/camilla.png">';
					}
					if($item1[7]=='TERCERA EDAD'){
						$prioridad ='<img style="width:20px; margin-top:-0.2em; margin-left:0.3em;" src="imagenes/tercera.jpg">';
					}
					if($item1[7]=='SELECCIONAR'){
						$prioridad ='<img style="width:20px; margin-top:-0.2em; margin-left:0.3em;" src="">';
					}

					if($item1[24]!=19){
							if($item1[6]=='EMERGENCIA'){
								$pacientes.='<li class="pointer "   id="PacienteConsultaExterna"><a idConsulta="'.$item1[0].'" idPaciente="'.$item1[3].'" nombrePaciente="'.$item1[1].' '.$nombre1[0].'" cedulaPaciente="'.$item1[5].'" Estado="'.$item1[4].'" Sexo="'.$item1[8].'" Edad="'.$item1[9].'" Presion="'.$item1[10].'" Pulso="'.$item1[11].'" FreRes="'.$item1[23].'" TAxilar="'.$item1[17].'" Peso="'.$item1[13].'" Talla="'.$item1[12].'" Imc="'.$item1[14].'" PCefalico="'.$item1[18].'" ><i class="fa fa-circle-o text-orange"></i>'.$item1[1].' '.$nombre1[0].' '.$prioridad.'</a></li>';
							}
							if($item1[6]=='RESUCITACION'){
								$pacientes.='<li class="pointer "   id="PacienteConsultaExterna"><a idConsulta="'.$item1[0].'" idPaciente="'.$item1[3].'" nombrePaciente="'.$item1[1].' '.$nombre1[0].'" cedulaPaciente="'.$item1[5].'" Estado="'.$item1[4].'" Sexo="'.$item1[8].'" Edad="'.$item1[9].'" Presion="'.$item1[10].'" Pulso="'.$item1[11].'" FreRes="'.$item1[23].'" TAxilar="'.$item1[17].'" Peso="'.$item1[13].'" Talla="'.$item1[12].'" Imc="'.$item1[14].'" PCefalico="'.$item1[18].'"> <i class="fa fa-circle-o text-red"></i> '.$item1[1].' '.$nombre1[0].' '.$prioridad.'</a></li>';
							}
							if($item1[6]=='URGENCIA'){
								$pacientes.='<li class="pointer "   id="PacienteConsultaExterna"><a idConsulta="'.$item1[0].'" idPaciente="'.$item1[3].'" nombrePaciente="'.$item1[1].' '.$nombre1[0].'" cedulaPaciente="'.$item1[5].'" Estado="'.$item1[4].'" Sexo="'.$item1[8].'" Edad="'.$item1[9].'" Presion="'.$item1[10].'" Pulso="'.$item1[11].'" FreRes="'.$item1[23].'" TAxilar="'.$item1[17].'" Peso="'.$item1[13].'" Talla="'.$item1[12].'" Imc="'.$item1[14].'" PCefalico="'.$item1[18].'" ><i class="fa fa-circle-o text-yellow"></i> '.$item1[1].' '.$nombre1[0].' '.$prioridad.'</a></li>';
							}
							if($item1[6]=='URGENCIA MENOR'){
								$pacientes.='<li class="pointer "   id="PacienteConsultaExterna"><a idConsulta="'.$item1[0].'" idPaciente="'.$item1[3].'" nombrePaciente="'.$item1[1].' '.$nombre1[0].'" cedulaPaciente="'.$item1[5].'" Estado="'.$item1[4].'" Sexo="'.$item1[8].'" Edad="'.$item1[9].'" Presion="'.$item1[10].'" Pulso="'.$item1[11].'" FreRes="'.$item1[23].'" TAxilar="'.$item1[17].'" Peso="'.$item1[13].'" Talla="'.$item1[12].'" Imc="'.$item1[14].'" PCefalico="'.$item1[18].'" ><i class="fa fa-circle-o text-green"></i> '.$item1[1].' '.$nombre1[0].' '.$prioridad.'</a></li>';
							}
							if($item1[6]=='SIN URGENCIA'||$item1[6]=='SELECCIONAR'){
								$pacientes.='<li class="pointer "   id="PacienteConsultaExterna"><a idConsulta="'.$item1[0].'" idPaciente="'.$item1[3].'" nombrePaciente="'.$item1[1].' '.$nombre1[0].'" cedulaPaciente="'.$item1[5].'" Estado="'.$item1[4].'" Sexo="'.$item1[8].'" Edad="'.$item1[9].'" Presion="'.$item1[10].'" Pulso="'.$item1[11].'" FreRes="'.$item1[23].'" TAxilar="'.$item1[17].'" Peso="'.$item1[13].'" Talla="'.$item1[12].'" Imc="'.$item1[14].'" PCefalico="'.$item1[18].'" ><i class="fa fa-square-o text-aqua"></i> '.$item1[1].' '.$nombre1[0].' '.$prioridad.'</a></li>';
							}
							
					}else{

							if($item1[6]=='EMERGENCIA'){
								$pacientesAtendidos.='<li class="pointer "   id="PacienteConsultaExterna"><a idConsulta="'.$item1[0].'" idPaciente="'.$item1[3].'" nombrePaciente="'.$item1[1].' '.$nombre1[0].'" cedulaPaciente="'.$item1[5].'" Estado="'.$item1[4].'" Sexo="'.$item1[8].'" Edad="'.$item1[9].'" Presion="'.$item1[10].'" Pulso="'.$item1[11].'" FreRes="'.$item1[23].'" TAxilar="'.$item1[17].'" Peso="'.$item1[13].'" Talla="'.$item1[12].'" Imc="'.$item1[14].'" PCefalico="'.$item1[18].'" ><i class="fa fa-circle-o text-orange"></i>'.$item1[1].' '.$nombre1[0].' '.$prioridad.'</a></li>';
							}
							if($item1[6]=='RESUCITACION'){
								$pacientesAtendidos.='<li class="pointer "   id="PacienteConsultaExterna"><a idConsulta="'.$item1[0].'" idPaciente="'.$item1[3].'" nombrePaciente="'.$item1[1].' '.$nombre1[0].'" cedulaPaciente="'.$item1[5].'" Estado="'.$item1[4].'" Sexo="'.$item1[8].'" Edad="'.$item1[9].'" Presion="'.$item1[10].'" Pulso="'.$item1[11].'" FreRes="'.$item1[23].'" TAxilar="'.$item1[17].'" Peso="'.$item1[13].'" Talla="'.$item1[12].'" Imc="'.$item1[14].'" PCefalico="'.$item1[18].'"> <i class="fa fa-circle-o text-red"></i> '.$item1[1].' '.$nombre1[0].' '.$prioridad.'</a></li>';
							}
							if($item1[6]=='URGENCIA'){
								$pacientesAtendidos.='<li class="pointer "   id="PacienteConsultaExterna"><a idConsulta="'.$item1[0].'" idPaciente="'.$item1[3].'" nombrePaciente="'.$item1[1].' '.$nombre1[0].'" cedulaPaciente="'.$item1[5].'" Estado="'.$item1[4].'" Sexo="'.$item1[8].'" Edad="'.$item1[9].'" Presion="'.$item1[10].'" Pulso="'.$item1[11].'" FreRes="'.$item1[23].'" TAxilar="'.$item1[17].'" Peso="'.$item1[13].'" Talla="'.$item1[12].'" Imc="'.$item1[14].'" PCefalico="'.$item1[18].'" ><i class="fa fa-circle-o text-yellow"></i> '.$item1[1].' '.$nombre1[0].' '.$prioridad.'</a></li>';
							}
							if($item1[6]=='URGENCIA MENOR'){
								$pacientesAtendidos.='<li class="pointer "   id="PacienteConsultaExterna"><a idConsulta="'.$item1[0].'" idPaciente="'.$item1[3].'" nombrePaciente="'.$item1[1].' '.$nombre1[0].'" cedulaPaciente="'.$item1[5].'" Estado="'.$item1[4].'" Sexo="'.$item1[8].'" Edad="'.$item1[9].'" Presion="'.$item1[10].'" Pulso="'.$item1[11].'" FreRes="'.$item1[23].'" TAxilar="'.$item1[17].'" Peso="'.$item1[13].'" Talla="'.$item1[12].'" Imc="'.$item1[14].'" PCefalico="'.$item1[18].'" ><i class="fa fa-circle-o text-green"></i> '.$item1[1].' '.$nombre1[0].' '.$prioridad.'</a></li>';
							}
							if($item1[6]=='SIN URGENCIA'||$item1[6]=='SELECCIONAR'){
								$pacientesAtendidos.='<li class="pointer "   id="PacienteConsultaExterna"><a idConsulta="'.$item1[0].'" idPaciente="'.$item1[3].'" nombrePaciente="'.$item1[1].' '.$nombre1[0].'" cedulaPaciente="'.$item1[5].'" Estado="'.$item1[4].'" Sexo="'.$item1[8].'" Edad="'.$item1[9].'" Presion="'.$item1[10].'" Pulso="'.$item1[11].'" FreRes="'.$item1[23].'" TAxilar="'.$item1[17].'" Peso="'.$item1[13].'" Talla="'.$item1[12].'" Imc="'.$item1[14].'" PCefalico="'.$item1[18].'" ><i class="fa fa-square-o text-aqua"></i> '.$item1[1].' '.$nombre1[0].' '.$prioridad.'</a></li>';
							}
							
					}
									
				$jsondata[$i]=$pacientes;
				$i++;	
				
			}
		echo json_encode($jsondata);
		
	}

	if($_POST['Requerimiento'] == "ActualizarOrdenTotal"){

		
		$datos = array("orden_total"=>$_POST["OrdenTotal"],
						"orden_lab"=>$_POST["OrdenLab"],
						"orden_rx"=>$_POST["OrdenRx"],
						"orden_eco"=>$_POST["OrdenEco"],
						"orden_receta"=>$_POST["OrdenReceta"],
						"certificado"=>$_POST["Certificado"],
						"certificado2"=>$_POST["Certificado2"],
						"orden_tac"=>$_POST["OrdenTac"]);
		$dao= new Dao();
		$dao->ModificarAjax("paciente_enfermedad",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
	}

	if($_POST['Requerimiento'] == "CargarDiagnosticoPorItem"){

		
		$dao= new Dao();
	    
		$dao->Campo("ci.descripcion","");		
		$dao->Campo("ci.codigo","");
		$dao->Campo("d.condicion","");
	
		$dao->TablasInnerAlias("diagnostico","d","cie","ci");		
		$dao->Where("d.id_consulta_item",$_POST['Item'],"");

		$dao->ConsultarAjax();
		
		
	}				
}
