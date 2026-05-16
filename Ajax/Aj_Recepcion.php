<?php
session_start();
date_default_timezone_set('America/Guayaquil');
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if($_POST['Requerimiento'] == "CargarPacientesPendientesFecha"){

		$dao = new Dao();

		$dao->Campo("DISTINCT c.id","");
		$dao->Campo("CONCAT(c.numero,' ',p.apellido,' ',p.apellido_materno)","");
		$dao->Campo("p.nombre","");
		$dao->Campo("c.total","");
		$dao->Campo("m.nombre","");
		$dao->Campo("m.id","");
		$dao->Campo("pr.id","");
		$dao->Campo("ci.id_estado","");
		$dao->Campo("p.id","");
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		$dao->Campo("TIMESTAMPDIFF(YEAR,p.fecha_nacimiento,CURDATE())","");
		
		$dao->TablasInnerAlias("consulta","c","paciente","p");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","c");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento_laboratorio","pr");
		$dao->TablasInnerAlias("procedimiento_laboratorio","pr","muestra","m");
		$dao->In_Where("p.id_estado","1,16","and");
		$dao->In_Where("ci.id_estado","8,7","and");
		$dao->In_Diferente("c.id_estado","21,25","and");
		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
		$dao->NO_NULL("ci.id_procedimiento_laboratorio","");
		$dao->Ordenar("ci.fecha_atencion desc");

		$respuesta = $dao->Consultar();

		echo json_encode($respuesta);

		
	} 

	if($_POST['Requerimiento'] == "CargarPacientesFecha"){

		$dao = new Dao();

		$dao->Campo("DISTINCT c.id","");
		$dao->Campo("CONCAT(c.numero,' ',p.apellido,' ',p.apellido_materno)","");
		$dao->Campo("p.nombre","");
		$dao->Campo("c.total","");
		$dao->Campo("m.nombre","");
		$dao->Campo("m.id","");
		$dao->Campo("pr.id","");
		$dao->Campo("ci.id_estado","");
		$dao->Campo("p.id","");
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		$dao->Campo("TIMESTAMPDIFF(YEAR,p.fecha_nacimiento,CURDATE())","");
		
		$dao->TablasInnerAlias("consulta","c","paciente","p");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","c");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento_laboratorio","pr");
		$dao->TablasInnerAlias("procedimiento_laboratorio","pr","muestra","m");
		$dao->In_Where("p.id_estado","1,16","and");
		$dao->In_Diferente("c.id_estado","21,25","and");
		$dao->IN_Diferente("ci.id_estado","6,8,10,12,25","and");
		$dao->Entre("CONVERT(ci.fecha_atencion,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
		$dao->NO_NULL("ci.id_procedimiento_laboratorio","");
		$dao->Ordenar("ci.fecha_atencion desc");

		$respuesta = $dao->Consultar();

		echo json_encode($respuesta);

		
	}


	if($_POST['Requerimiento'] == "CargarPacientesHoy"){

		$dao = new Dao();

		$dao->Campo("DISTINCT c.id","");
		$dao->Campo("CONCAT(c.numero,' ',p.apellido,' ',p.apellido_materno)","");
		$dao->Campo("p.nombre","");
		$dao->Campo("c.total","");
		$dao->Campo("m.nombre","");
		$dao->Campo("m.id","");
		$dao->Campo("pr.id","");
		$dao->Campo("ci.id_estado","");
		$dao->Campo("p.id","");
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		$dao->Campo("TIMESTAMPDIFF(YEAR,p.fecha_nacimiento,CURDATE())","");
		
		$dao->TablasInnerAlias("consulta","c","paciente","p");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","c");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento_laboratorio","pr");
		$dao->TablasInnerAlias("procedimiento_laboratorio","pr","muestra","m");
		$dao->In_Where("p.id_estado","1,16","and");
		$dao->Diferente("c.id_estado","21","and");
		$dao->IN_Diferente("ci.id_estado","6,8,10,12,25","and");
		$dao->Where("CONVERT(ci.fecha_atencion,DATE)",'CURDATE()',"and");
		$dao->NO_NULL("ci.id_procedimiento_laboratorio","");
		$dao->Ordenar("ci.fecha_atencion desc");

		$respuesta = $dao->Consultar();

		echo json_encode($respuesta);

		
	}

	if($_POST['Requerimiento'] == "CargarPacientesHoyPendiente"){

		$dao = new Dao();

		$dao->Campo("DISTINCT c.id","");
		$dao->Campo("CONCAT(c.numero,' ',p.apellido,' ',p.apellido_materno)","");
		$dao->Campo("p.nombre","");
		$dao->Campo("c.total","");
		$dao->Campo("m.nombre","");
		$dao->Campo("m.id","");
		$dao->Campo("pr.id","");
		$dao->Campo("ci.id_estado","");
		$dao->Campo("p.id","");
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		$dao->Campo("TIMESTAMPDIFF(YEAR,p.fecha_nacimiento,CURDATE())","");
		
		$dao->TablasInnerAlias("consulta","c","paciente","p");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","c");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento_laboratorio","pr");
		$dao->TablasInnerAlias("procedimiento_laboratorio","pr","muestra","m");
		$dao->In_Where("p.id_estado","1,16","and");
		$dao->In_Diferente("c.id_estado","21,25","and");
		$dao->In_Where("ci.id_estado","8,7","and");
		$dao->EntreDias("ci.fecha_atencion",32,"and");
		//$dao->Where("CONVERT(ci.fecha_atencion,DATE)",'"'.date("Y-m-d").'"',"and");
		$dao->NO_NULL("ci.id_procedimiento_laboratorio","");
		$dao->Ordenar("ci.fecha_atencion desc");

		$respuesta = $dao->Consultar();

		echo json_encode($respuesta);

		//$_POST["Fecha"]
	}

	if($_POST['Requerimiento'] == "GuardarRecepcion"){

		$dao = new Dao();

		$dao->Campo("turno","");
		$dao->Tabla("consulta_item","");
		$dao->Where("CONVERT(fecha_atencion,DATE)","'".$_POST['FechaAtencion']."'","and");
		$dao->Diferente("id_consulta",$_POST['Consulta'],"and");
		$dao->NO_NULL("id_procedimiento_laboratorio","");
		$dao->Ordenar("turno desc");
		$dao->Limite("1");
		$respuesta = $dao->Consultar();
		
		$turno = '1';
		foreach ($respuesta as $row => $item){
			if ($item[0]==null || $item[0] == "") {
				$turno = 1;
			}else{
				$turno = $item[0]+1;	
			}
			
		}
			
			
			$dao= new Dao();
			$jsondata =  $dao->CRUD_Nativo_Ajax('UPDATE consulta_item AS ci
									INNER JOIN procedimiento_laboratorio AS pl ON (ci.id_procedimiento_laboratorio= pl.id)
									INNER JOIN muestra AS m ON (m.id= pl.id_muestra)
									INNER JOIN consulta AS c ON (c.id =ci.id_consulta)
									SET ci.id_estado = 6,c.id_estado_lab=6, ci.turno = '.$turno.'
									WHERE convert(ci.fecha_atencion,date) = "'.$_POST['FechaAtencion'].'" and  m.id = "'.$_POST['Muestra'].'" AND ci.id_estado !=25 AND ci.id_consulta = "'.$_POST['Consulta'].'"');
			if($jsondata[0]==true){
				$jsondata[1]=$turno;
			}

			echo json_encode($jsondata, JSON_FORCE_OBJECT);

	}

	function ObtPlantillas($consulta,$grupo){

		$dao = new Dao();

		$sql =	' SELECT p.descripcion,pl.nombre,pl.id_grupo_examen 
					FROM plantilla p INNER JOIN procedimiento_laboratorio pl ON(pl.id=p.id_procedimiento_laboratorio) 
					INNER JOIN consulta_item ci ON (ci.id_procedimiento_laboratorio = pl.id)
					WHERE ci.id_consulta = '.$consulta.' AND pl.id_grupo_examen = '.$grupo.' ';

		$respuesta =$dao->ConsultarSqlNativo($sql);
		
		$jsondata = array();
		$i=0;
		foreach ($respuesta as $row => $item){
			if($i==0){
				$jsondata[$i]=$item[1];	
			}else{
				$jsondata[$i]=$item[0];
			}
			
			$i++;		

		}
		return $jsondata;
	}

	if($_POST['Requerimiento'] == "CargarProcedimientosPlantilla"){
			
			$dao= new Dao();
			$respuesta = $dao->ConsultarSqlNativo('SELECT DISTINCT g.id,g.nombre FROM consulta_item ci INNER JOIN procedimiento_laboratorio pl ON(pl.id= ci.id_procedimiento_laboratorio) INNER JOIN grupo_examen g ON (g.id=pl.id_grupo_examen) WHERE ci.id_consulta = "'.$_POST['Consulta'].'" order BY g.orden') ;
			$jsondata = array();
			$i=0;

			foreach ($respuesta as $row => $item){
				$datos = array();
				$datos[0] = $item[0];	
				$datos[1] = $item[1];
				$datos[2] = ObtPlantillas($_POST['Consulta'],$item[0]);

				$jsondata[$i]=$datos;
				$i++;	
			}

			echo json_encode($jsondata);
	}

	if($_POST['Requerimiento'] == "GuardarRecepcion2"){
		
		$dao= new Dao();
		$jsondata =	$dao->CRUD_Nativo_Ajax('UPDATE consulta_item AS ci
									INNER JOIN procedimiento_laboratorio AS pl ON (ci.id_procedimiento_laboratorio= pl.id)
									INNER JOIN muestra AS m ON (m.id= pl.id_muestra)
									SET ci.id_estado = 8
									WHERE convert(ci.fecha_atencion,date) = "'.$_POST['FechaAtencion'].'" and  m.id = "'.$_POST['Muestra'].'" AND ci.id_estado !=25 AND ci.id_consulta = "'.$_POST['Consulta'].'"');
		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}

	if($_POST['Requerimiento'] == "CargarProcedimientoPaciente"){

		$dao = new Dao();

		$dao->Campo("DISTINCT p.id","");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno)","");
		$dao->Campo("p.nombre","");
		$dao->Campo("c.total","");
		$dao->Campo("pr.id","");
		$dao->Campo("pr.nombre","");
		$dao->Campo("ci.id_estado","");

		$dao->TablasInnerAlias("consulta","c","paciente","p");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","c");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento_laboratorio","pr");
		$dao->TablasInnerAlias("procedimiento_laboratorio","pr","muestra","m");
		$dao->In_Where("p.id_estado","1,16","and");
		$dao->In_Where("ci.id_estado","6,10,12","and");
		$dao->Diferente("c.id_estado","21","and");
		$dao->Where("p.id",'"'.$_POST["Paciente"].'"',"AND");
		$dao->Where("c.id",'"'.$_POST["Consulta"].'"',"");

		$respuesta =$dao->Consultar();

		echo json_encode($respuesta);
	}
	if($_POST['Requerimiento'] == "VerficarEstadoPacienteLab"){
			$dao = new Dao();
			$dao->Campo("id_estado","");
			$dao->Tabla("consulta_item","ci");
			$dao->In_Where("id_consulta",$_POST['Consulta'],"");
			$dao->Ordenar("id_estado asc");
			$dao->ConsultarAjax();
	}
	if($_POST['Requerimiento'] == "CargarPacientes2"){

		$dao = new Dao();

		$dao->Campo("c.id","");
		$dao->Campo("p.id","");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre)","");		
		$dao->Campo("p.cedula","");
		$dao->Campo("c.total","");				
		$dao->Campo("p.email","");				
		$dao->Campo("p.fecha_nacimiento","");		
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		$dao->Campo("ci.turno","");
		$dao->Campo("c.id_orden","");
		$dao->Campo("ci.id_estado","");

		$dao->TablasInnerAlias("consulta","c","paciente","p");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","c");
		
		$dao->In_Where("p.id_estado","1,16","and");
		$dao->Diferente("c.id_estado","21","and");
		$dao->In_Where("ci.id_estado","6,12,10","and");			
		$dao->NO_NULL("ci.id_procedimiento_laboratorio","and");

		if(isset($_POST["search"]["value"]))  
        {  
        		if(trim($_POST["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->Filtrar("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',c.numero)",$_POST["search"]["value"],"and");                	
                }                                
        }
        if(trim($_POST['columns'][1]["search"]["value"])==""){
			$dao->Where("CONVERT(ci.fecha_atencion,DATE)",'CURDATE()',"");
		}else{				
			
			$dao->Entre("CONVERT(ci.fecha_atencion,DATE)","'".$_POST['columns'][1]["search"]["value"]."'","'".$_POST['columns'][2]["search"]["value"]."'","");
		}
		
		$dao->Ordenar("ci.turno,ci.fecha_atencion,p.id");

		$respuesta = $dao->Consultar();

		$total=0;
		$consulta = 0;		
		$idpaciente = 0;
		$email = 0;
		$cedula = 0;
		$fechanaci = 0;
		$idorden = 0;
		$nombres = 0;
		$atencion = 0;
		$boton ='';
		$turno = 0;
		$listo=0;
        $registrado=0;
        $validado =0;
        $estado =0;
        $data = array(); 
		foreach ($respuesta as $row => $item){
			
			$sub_array = array(); 
			
			if($consulta==0){
				$total++;							
				$consulta = $item[0];				
				$idpaciente = $item[1];
				$email = $item[5];
				$cedula = $item[3];
				$fechanaci = $item[6];
				$idorden = $item[9];				
				$nombres = $item[2];
				$atencion = $item[7];
				$turno = $item[8];
				$listo=0;
		        $registrado=0;
		        $validado =0;
		        $estado =0;
				if($item[10]==6){
                	$estado=6;
                	$listo=1;
	            }
	            if($item[10]==10){
	                $estado=10;
	                $registrado=1;
	            }
	            if($item[10]==12){
	                $validado=1;
	                $estado=12;
	            }
				
			}else{
				if($consulta!=$item[0]){
					
					if($validado>=1){
						$boton = '<button idEstado='.$estado.' type="button" class="btn btn-sm btn-success nopaddingBoton ">' .$turno. '</button>';
					}
					if($registrado>=1){
						$boton = '<button idEstado='.$estado.' type="button" class="btn btn-sm btn-warning nopaddingBoton ">' .$turno. '</button>';
					}
					if($listo>=1){
						$boton = '<button idEstado='.$estado.' type="button" class="btn btn-sm btn-danger nopaddingBoton" >' .$turno. '</button>';
					}

					$sub_array[] = $total;
					$sub_array[] = '<span idPaciente="'.$idpaciente.'" email="'.$email.'" cedula="'.$cedula.'" fecha="'.$fechanaci.'" idOrden="'.$idorden.'" idConsulta='.$consulta.'>'.$nombres.'</span>';
					$sub_array[] = $atencion;
					$sub_array[] = $boton;
					$data[] = $sub_array; 

					$total++;								
					$consulta = $item[0];				
					$idpaciente = $item[1];
					$email = $item[5];
					$cedula = $item[3];
					$fechanaci = $item[6];
					$idorden = $item[9];				
					$nombres = $item[2];
					$atencion = $item[7];
					$turno = $item[8];
					$listo=0;
			        $registrado=0;
			        $validado =0;
			        $estado =0;
					if($item[10]==6){
	                	$estado=6;
	                	$listo=1;
		            }
		            if($item[10]==10){
		                $estado=10;
		                $registrado=1;
		            }
		            if($item[10]==12){
		                $validado=1;
		                $estado=12;
		            }
				}else{
					if($item[10]==6){
	                	$estado=6;
	                	$listo=1;
		            }
		            if($item[10]==10){
		                $estado=10;
		                $registrado=1;
		            }
		            if($item[10]==12){
		                $validado=1;
		                $estado=12;
		            }
				}
			}			
		}
					if($total>=1){
						$sub_array = array(); 
						if($validado>=1){
							$boton = '<button idEstado='.$estado.' type="button" class="btn btn-sm btn-success nopaddingBoton ">' .$turno. '</button>';
						}
						if($registrado>=1){
							$boton = '<button idEstado='.$estado.' type="button" class="btn btn-sm btn-warning nopaddingBoton ">' .$turno. '</button>';
						}
						if($listo>=1){
							$boton = '<button idEstado='.$estado.' type="button" class="btn btn-sm btn-danger nopaddingBoton" >' .$turno. '</button>';
						}

						$sub_array[] = $total;
						$sub_array[] = '<span idPaciente="'.$idpaciente.'" email="'.$email.'" cedula="'.$cedula.'" fecha="'.$fechanaci.'" idOrden="'.$idorden.'" idConsulta='.$consulta.'>'.$nombres.'</span>';
						$sub_array[] = $atencion;
						$sub_array[] = $boton;
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

	if($_POST['Requerimiento'] == "DesvalidarResultado"){

		$dao= new Dao();
	    //$dao->Eliminar("resultado_laboratorio","id_procedimiento_laboratorio = ".$_POST['Laboratorio']." and id_consulta = ".$_POST["Consulta"]);

	    $datos = array("id_estado"=>"10");

	    $datos1 = array("usuario_valido"=>"");

	    $dao= new Dao();
		if( $_POST['Laboratorio'] >0 ){
			$dao->Modificar("resultado_laboratorio",$datos1,"id_procedimiento_laboratorio = ".$_POST['Laboratorio']." and id_consulta = ".$_POST["Consulta"],0);
			$dao->ModificarAjax("consulta_item",$datos,"id_procedimiento_laboratorio = ".$_POST['Laboratorio']." and id_consulta = ".$_POST["Consulta"],$_POST['Consulta']);
		}else{
			$dao->Modificar("resultado_laboratorio",$datos1," id_consulta = ".$_POST["Consulta"],0);
			$dao->ModificarAjax("consulta_item",$datos,"id_consulta = ".$_POST["Consulta"],$_POST['Consulta']);
		}
	    
	}
}


/*****PRIMER PASO******//*
SELECT g.id,g.nombre 
FROM grupo_examen g 
WHERE g.id IN( SELECT pl.id_grupo_examen 
FROM consulta_item ci INNER JOIN procedimiento_laboratorio pl ON(ci.id_procedimiento_laboratorio=pl.id)
INNER JOIN muestra m ON(m.id = pl.id_muestra)
WHERE m.id = 5 AND ci.id_consulta = 723) ORDER by orden*/


/*****SEGUNDO PASO*****//*
SELECT p.descripcion
FROM plantilla p
WHERE p.id_procedimiento_laboratorio in(
SELECT pl.id FROM consulta_item ci INNER JOIN procedimiento_laboratorio pl ON(ci.id_procedimiento_laboratorio=pl.id) INNER JOIN muestra m ON(m.id = pl.id_muestra) WHERE m.id = 5 AND ci.id_consulta = 723 AND pl.id_grupo_examen = 3)*/