<?php

session_start();
require_once "autoloadAjax.php";
date_default_timezone_set('America/Guayaquil'); 
if(isset($_POST['Requerimiento'])){


if($_POST['Requerimiento'] == "GuardarSignos"){

				
				 $datos = array("fecha_atencion"=>$_POST["Fecha_atencion"],
				 				"id_paciente"=>$_POST["Id_paciente"],
								"edad"=>$_POST["Edad"],
								"triage"=>$_POST["Triage"],
								"presion"=>$_POST["Presion"],
								"pulso"=>$_POST["Pulso"],
								"peso"=>$_POST["Peso"],
								"talla"=>$_POST["Talla"],
								"imc"=>$_POST["Imc"],
								"id_consulta"=>$_POST["Consulta"],
								"id_consulta_item"=>$_POST["ConsultaItem"],
								"prioridad"=>$_POST["Priordad"],
								"temp_bucal"=>$_POST["Temp_bucal"],
								"temp_rectal"=>$_POST["Temp_rectal"],
								"temp_axilar"=>$_POST["Temp_axilar"],
								"perim_cefalico"=>$_POST["Perim_cefalico"],
								"perim_abdominal"=>$_POST["Perim_abdominal"],
								"puntual"=>$_POST["Puntual"],
								"codigo"=>$_POST["Codigo"],
								"id_estado"=>1,
								"usuario_registro"=>$_SESSION["usuario"],
								"fr"=>$_POST["FR"]);



		$dao= new Dao();
	    $dao->GuardarAjax("signo",$datos);
		
		
	}


if($_POST['Requerimiento'] == "ModificarSignos"){

				
				 $datos = array("fecha_atencion"=>$_POST["Fecha_atencion"],
				 				"codigo"=>$_POST["Codigo"],
								"edad"=>$_POST["Edad"],
								"triage"=>$_POST["Triage"],
								"presion"=>$_POST["Presion"],
								"id_consulta_item"=>$_POST["ConsultaItem"],
								"pulso"=>$_POST["Pulso"],
								"peso"=>$_POST["Peso"],
								"talla"=>$_POST["Talla"],
								"imc"=>$_POST["Imc"],
								"id_consulta"=>$_POST["Consulta"],
								"prioridad"=>$_POST["Priordad"],
								"temp_bucal"=>$_POST["Temp_bucal"],
								"temp_rectal"=>$_POST["Temp_rectal"],
								"temp_axilar"=>$_POST["Temp_axilar"],
								"perim_cefalico"=>$_POST["Perim_cefalico"],
								"perim_abdominal"=>$_POST["Perim_abdominal"],
								"usuario_modifico"=>$_SESSION["usuario"],
								"fr"=>$_POST["FR"]);
		$dao= new Dao();
	    $dao->ModificarAjax("signo",$datos,"id_consulta_item=".$_POST['ConsultaItem'],$_POST['ConsultaItem']);
		
		
	}


	///////////////////////////////////////////////////9999999999//////////////////////////////////////////////////////
	

	if($_POST['Requerimiento'] == "CambiarEstadoConsultaSignos"){
		
		$datos = array("id_estado"=>9);
		$dao= new Dao();
	    $dao->ModificarAjax("consulta_item",$datos,"id=".$_POST['ConsultaItem'],$_POST['ConsultaItem']);
		
	}

	////////////////////////////////////////////////////modal creo YO//////////////////////////////////////////////////////
	

	if($_POST['Requerimiento'] == "CargarUltimos3SignosVitales"){
		
		$dao = new Dao();

		$dao->Campo("p.id","");
		
				
		//$dao->Campo("SUBSTRING(s.edad,1, 17)","");
		$dao->Campo("Convert(s.fecha_atencion,date)","");
		$dao->Campo("s.presion","");
		$dao->Campo("s.pulso","");
		$dao->Campo("s.peso","");
		$dao->Campo("s.talla","");		
		$dao->Campo("s.imc","");
		$dao->Campo("s.temp_bucal","");
		$dao->Campo("s.temp_rectal","");
		$dao->Campo("s.temp_axilar","");
		$dao->Campo("s.fr","");
		$dao->Campo("Convert(s.fecha_atencion,date)","");

		$dao->TablasInnerAlias("signo","s","paciente","p");
		$dao->Where("s.id_paciente",$_POST['Id'] ,"");
		$dao->Ordenar("s.id desc");  
		$dao->Limite("10");  


		$dao->ConsultarAjax();
		
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if($_POST['Requerimiento'] == "CargarPacienteConsultasHoy"){

				
		$dao = new Dao();

		$dao->Campo("DISTINCT b.numero","");
		$dao->Campo("es.nombre","");
		$dao->Campo("e.apellido","");
		$dao->Campo("e.nombre","");
		$dao->Campo("ci.turno","");
		
			
		$dao->Campo("CONVERT(e.fecha_nacimiento,DATE)","");	
		$dao->Campo("em.nombres","");
		$dao->Campo("em.apellidos","");
		$dao->Campo("e.id","");
		$dao->Campo("b.id","");
		$dao->Campo("b.id_estado","");
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		
		

		$dao->TablasInnerAlias("consulta","b","paciente","e");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","b");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento","p");
		$dao->TablasInnerAlias("procedimiento","p","especialidad","es");
		$dao->TablasInnerAlias("consulta_item","ci","empleado","em");

		
		$dao->In_Where("b.id_estado","1,9","and");
		$dao->Where("CONVERT(ci.fecha_atencion,DATE)",'CURDATE()',"");


		$dao->ConsultarAjax();	
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if($_POST['Requerimiento'] == "ModificarPaci"){
		
		$dao = new Dao();

		$dao->Campo("s.id","");
		$dao->Campo("s.fecha_registro","");
		$dao->Campo("p.apellido","");
		$dao->Campo("p.nombre","");		
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
		$dao->Campo("s.usuario_registro","");
		$dao->Campo("s.id_consulta","");
		$dao->Campo("s.triage","");
		$dao->Campo("s.fr","");

		$dao->TablasInnerAlias("signo","s","paciente","p");
		
		$dao->Where("s.id_consulta",$_POST['Consulta'],"");

		


		$dao->ConsultarAjax();
		
	}

	function CargarTiempo($id){
		$dao = new Dao();

		$dao->Campo("s.puntual","");
		
		$dao->Tabla("signo","s");				
		$dao->Where("s.id_consulta_item",$id,"");
		//$dao->Ordenar("apellidos");

		$respuesta =$dao->Consultar();

		$jsondata = 'SI';
		
		foreach ($respuesta as $row => $item){
			$jsondata = $item[0];
		
		}

		return $jsondata;
	}

	if($_POST['Requerimiento'] == "CargarSignosVitales"){

		$fecha2 = date("Y-m-d"); //5 agosto de 2004 por ejemplo  
		$finalRespuesta = "";
		if (trim($_POST['columns'][1]["search"]["value"]) != "") {
			$fecha2 = $_POST['columns'][1]["search"]["value"];
		}
		$fechats = strtotime($fecha2); //a timestamp 

		//el parametro w en la funcion date indica que queremos el dia de la semana 
		//lo devuelve en numero 0 domingo, 1 lunes,.... 
		switch (date('w', $fechats)){ 
		    case 0: $finalRespuesta = "DOMINGO"; break; 
		    case 1: $finalRespuesta = "LUNES"; break; 
		    case 2: $finalRespuesta = "MARTES"; break; 
		    case 3: $finalRespuesta = "MIERCOLES"; break; 
		    case 4: $finalRespuesta = "JUEVES"; break; 
		    case 5: $finalRespuesta = "VIERNES"; break; 
		    case 6: $finalRespuesta = "SABADO"; break; 
		}

		$dao = new Dao();

		$dao->Campo("DISTINCT b.numero","");
		$dao->Campo("es.nombre","");
		$dao->Campo("CONCAT(e.apellido,' ',e.apellido_materno)","");
		$dao->Campo("e.nombre","");
		$dao->Campo("ci.turno","");
		$dao->Campo("CONVERT(e.fecha_nacimiento,DATE)","");	
		$dao->Campo("em.nombres","");
		$dao->Campo("em.apellidos","");
		$dao->Campo("e.id","");
		$dao->Campo("b.id","");
		$dao->Campo("ci.id_estado","");
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		$dao->Campo("meh.horaI","");
		$dao->Campo("meh.horaF","");
		$dao->Campo("ci.id","");
		//$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		
		$dao->TablasInnerAlias("consulta","b","paciente","e");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","b");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento","p");
		$dao->TablasInnerAlias("procedimiento","p","especialidad","es");
		$dao->TablasInnerAlias("consulta_item","ci","empleado","em");
		$dao->TablasInnerAliasOtra("medico_especialidad","me","empleado","em");
		$dao->TablasInnerAlias("medico_especialidad","me","especialidad","ess");
		$dao->TablasInnerAliasOtra("medico_especialidad_horario","meh","medico_especialidad","me");
		
		$dao->In_Where("b.id_estado","1,9","and");
		$dao->In_Diferente("ci.id_estado","19,25","and");
		$dao->Diferente("es.id","73","and");
		$dao->Where("CONVERT(ci.fecha_atencion,DATE)","'".$fecha2."'","and");
		$dao->Where("meh.dia","'".$finalRespuesta."'","and");
		if(isset($_POST["search"]["value"]) )  
		{  
			if(trim($_POST["search"]["value"])==""){
				$dao->Where("1","1","");
			}else{
				$dao->Filtrar("CONCAT(e.apellido,' ',e.apellido_materno,' ',e.nombre,' ',em.apellidos,' ',em.nombres,' ',b.numero,' ',es.nombre)",$_POST["search"]["value"],"");			
			}
		}
		$dao->Agrupar("ci.id");
		$respuesta= $dao->Consultar();
		//$query= $dao->Consultar2();
		$data = array();
		$total=0;
		foreach ($respuesta as $row => $item){
			$total++;
			$sub_array = array(); 
			
			$boton = '<button idEstado='.$item[10].' type="button" class="btn btn-block btn-danger">Pendiente</button>';
			if($item[10]==9){
				$tiempo = CargarTiempo($item[14]);
				if($tiempo=="SI"){
					$boton = '<button idEstado='.$item[10].' type="button" class="btn btn-block btn-success">Listo (PUNTUAL)</button>';
				}else{
					$boton = '<button idEstado='.$item[10].' type="button" class="btn btn-block btn-success">Listo (ATRASADO)</button>';	
				}
				
			}

			$sub_array[] =$item[0];
			$sub_array[] =$item[1];
			$sub_array[] =$item[2];
			$sub_array[] =$item[3];
			
			$sub_array[] ='<span idPaciente="'.$item[8].'" idConsulta="'.$item[9].'" fecha_atencion="'.$item[11].'"> '.$item[4].'</span>';
			$sub_array[] ='<span fecha_nacimiento="'.$item[5].'">'.$item[6].' '.$item[7].'</span>';
			$sub_array[] =$boton;
			$sub_array[] =$item[12];
			$sub_array[] =$item[13];
			$sub_array[] =$item[14];
			
			$data[] = $sub_array; 
		}		

		$output = array(  
				"draw"           => intval($_POST["draw"]),  
				"recordsTotal"   => $total,  
				"recordsFiltered"=> $total,  
				"data"           => $data  
		); 

		echo json_encode($output);
	}

	if($_POST['Requerimiento'] == "ValidarExisteCodigo"){
		
		$dao = new Dao();
		$dao->Campo("id","");
		$dao->Tabla("empleado","");
		$dao->Where("codigo","'".$_POST['Codigo']."'","and");
		$dao->Diferente("id_estado","2","");

		$dao->ConsultarAjax();
		
	}

}