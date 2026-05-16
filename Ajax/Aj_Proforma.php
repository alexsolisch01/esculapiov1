<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){
	function ObtenerNumero($campo,$tabla){
		$dao= new Dao();
		$dao->Maximo($campo,"");		
		$dao->Tabla($tabla,"");		
		$dao->Where("1","1","");
		$respuesta = $dao->Consultar();
		$jsondata = 0;
		foreach ($respuesta as $row => $item){
			$jsondata=$item[0];			
		}
		return $jsondata+1;
	}
	function GuardarDetalle($idConsulta,$tipo,$detalle,$idFactura=0){
		$array = json_decode($detalle,true);
		$jsondata = array();
		$turnos = array();
		$j=0;
		$k=0;		
		for($i=0; $i<sizeof($array); $i++) {		  
			$producto = $array[$i];
			$turno = 0;
          	$datos = array("id_consulta"=>$idConsulta,
								"id_empleado"=>$producto[1],
								"id_estado"=>7,
								"fecha_atencion"=>$producto[2],
								"precio"=>$producto[3],
								"descuento"=>$producto[4],
								"subtotal"=>$producto[5],
								"turno"=>$turno);
          	$medico = "";
          	if($tipo==1){
				$datos['id_procedimiento']=$producto[0];
				$medico = $producto[9];
			}
			if($tipo==2){
				$datos['id_procedimiento_laboratorio']=$producto[0];
			}
			if($tipo==3){
				$datos['id_procedimiento_eco']=$producto[0];
			}
			if($tipo==4){				
				$datos['id_procedimiento_rx']=$producto[0];
			}
			if($tipo==5){
				$datos['id_procedimiento_tomo']=$producto[0];
			}

          $dao= new Dao();
	      $respuesta = $dao->Guardar("proforma_item",$datos,true);
	      if(!$respuesta[0]){
	    	
	      	$jsondata[$j]="No se puedo guardar el item  ".$producto[6]." ".$respuesta[1]." SQL ".$respuesta[2];
	      	$j++;
		  }else{
		  	$turnosconsulta = "";
		  	if($tipo==1){
		  		$itemconsulta = json_decode($respuesta[1],true);
		  		$turnos[$k] = $itemconsulta[0][9];
		  		$turnosconsulta = $itemconsulta[0][9];
		  		$k++;
		  	}			
		  }           
        }
        if(sizeof($jsondata)>0){
        	return $jsondata;
        }else{
        	return $turnos;
        }        
	}

	if($_POST['Requerimiento'] == "GuardarConsulta"){

		$mismosdatos=null;

		if($_POST["Paciente"] !=$_POST["Cliente"]){
			$mismosdatos='N';
		}else{
			$mismosdatos='S';
		}

		if($_POST["Cliente"]==1){
			$mismosdatos='N';
		}
		$numero =ObtenerNumero("numero","proforma");

		$datos = array("id_punto_venta"=>$_POST["Punto"],
								"id_paciente"=>$_POST["Paciente"],
								"descuento"=>$_POST["Descuento"],
								"cambios"=>0,
								"id_estado"=>1,
								"id_estado_rx"=>1,
								"id_estado_eco"=>1,
								"id_estado_lab"=>1,
								"id_estado_tomo"=>1,
								"id_estado_orden_rx"=>0,
								"id_estado_orden_eco"=>0,
								"id_estado_orden_lab"=>0,
								"id_estado_orden_tomo"=>0,
								"id_estado_receta"=>0,
								"autorizada"=>"N",
								"mismosdatos"=>$mismosdatos,
								"total"=>$_POST["Total"],
								"tipoid"=>$_POST["TipoIde"],
								"numero"=>$numero);

		
			if($_POST["Cliente"]=="" || $_POST["Cliente"] ==null){
				$_POST["Cliente"]=1;
			}
			$datos['id_paciente_cliente']=$_POST["Cliente"];
		
		if(isset($_POST["Referente"])){
			if($_POST["Referente"]!="" && $_POST["Referente"]!=0 ){
				$datos['id_referencia']=$_POST["Referente"];
			}
		}

		$dao= new Dao();
		$respuesta = $dao->Guardar("proforma",$datos);
	    if($respuesta[0]){	    				    
		    $idFactura = 0;
			$errores1 = GuardarDetalle($respuesta[1],1,$_POST["Procedimiento"],$idFactura);
			$errores2 = GuardarDetalle($respuesta[1],2,$_POST["Laboratorio"],$idFactura);
			$errores3 = GuardarDetalle($respuesta[1],3,$_POST["Eco"],$idFactura);
			$errores4 = GuardarDetalle($respuesta[1],4,$_POST["Rx"],$idFactura);
			$errores5 = GuardarDetalle($respuesta[1],5,$_POST["Tac"],$idFactura);
			$errores = array_merge($errores2, $errores3, $errores4,$errores5);
			
			if(sizeof($errores)>0){
	    		echo json_encode($errores, JSON_FORCE_OBJECT);	
	    	}else{
	    			    		
	    		$jsondata = array();
	    		$jsondata[0]=true;
	    		$jsondata[1]=$respuesta[1];
	    		$jsondata[2]=$numero;
	    		$jsondata[3]=$_POST["Paciente"];
	    		$jsondata[4]=json_encode($errores1, JSON_FORCE_OBJECT);	    		
	    		$jsondata[5]="";
	    		echo json_encode($jsondata, JSON_FORCE_OBJECT);
	    	}
	    }else{
	    	echo json_encode($respuesta, JSON_FORCE_OBJECT);
	    }
		
	}

	//////////////////////////////////////////////////////////////////////////////////////////////
	if($_POST['Requerimiento'] == "LlenartablaProformasConFechas"){

		$dao = new Dao(); 

		$dao->Campo("c.numero","");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente","");
		$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente","");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')","");
		$dao->Campo("c.total","");
		$dao->Campo("c.id_estado","");
		$dao->Campo("c.autorizada","");
		$dao->Campo("c.nc","");

		$dao->TablasInnerAlias("proforma","c","paciente","p");
		$dao->TablasInnerAlias("proforma","c","paciente_cliente","pc");
		$dao->In_Where("c.id_estado","1,9,13,19,21","and");
						
		if(isset($_POST['columns'][0]["search"]["value"]) )  
		{  
			if(trim($_POST['columns'][0]["search"]["value"])==""){
				$dao->Where("1","1","and");
			}else{
				$dao->Filtrar("c.numero",$_POST['columns'][0]["search"]["value"],"and");
			}
		} 
		if(isset($_POST['columns'][1]["search"]["value"]))  
		{  
			if(trim($_POST['columns'][1]["search"]["value"])==""){
				$dao->Where("1","1","and");
			}else{
				$dao->Filtrar("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre)",$_POST['columns'][1]["search"]["value"],"and");
					//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}
		
		if(isset($_POST['columns'][2]["search"]["value"]) )  
		{  
			if(trim($_POST['columns'][2]["search"]["value"])==""){
				$dao->Where("1","1","");
			}else{
				$dao->Filtrar("CONCAT(pc.apellido,' ',pc.nombre)",$_POST['columns'][2]["search"]["value"],"");
					//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}
		   
		if($_POST["length"] != -1)  
		{  
		   $dao->Limite($_POST['start'].",".$_POST['length']);  
		}  
		
		$dao->Ordenar("c.id desc");  
		

		$respuesta =$dao->Consultar();
		
		$data = array();
		$total=0;
		foreach ($respuesta as $row => $item){
			$total++;
			$sub_array = array(); 
		
			$sub_array[] =$item[0];
			$sub_array[] =$item[1];
			$sub_array[] =$item[2];			
			$sub_array[] =$item[3];
			$sub_array[] =$item[4];
			$boton = '';			
			
			if($item[5]==21){
				$boton = '<button idEstado='.$item[5].' type="button" class="btn btn-sm btn-danger">Anulada</button>';
			}
			$sub_array[] =$boton;
			$sub_array[] =$item[7];
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
	if($_POST['Requerimiento'] == "CargarProformaConsulta"){

		
		$dao= new Dao();

		$dao->Campo("c.id","");
		$dao->Campo("c.id_paciente","");
		$dao->Campo("p.nombre","");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno)","");
		$dao->Campo("p.cedula","");
		$dao->Campo("p.direccion","");
		$dao->Campo("p.telefono","");
		$dao->Campo("p.email","");
		$dao->Campo("p.fecha_nacimiento","");
		$dao->Campo("p.apellido","");
		$dao->Campo("c.id_paciente_cliente","");
		$dao->Campo("c.mismosdatos","");
		$dao->Campo("c.total","");
		$dao->Campo("c.descuento","");
		$dao->Campo("c.id_estado","");
		$dao->Campo("c.id_estado_lab","");
		$dao->Campo("c.id_estado_rx","");
		$dao->Campo("c.id_estado_eco","");
		$dao->Campo("c.id_estado_tomo","");
		$dao->Campo("c.autorizada","");
		$dao->Campo("CONVERT(c.fecha_registro,Date)","");
		$dao->Campo("c.clave_sri","");
		$dao->Campo('CASE WHEN CONVERT(c.fecha_registro,date) < Curdate() THEN false ELSE true END',"");
		$dao->Campo("c.cambios","");
		$dao->Campo("c.tipoid","");
		$dao->TablasInnerAlias("proforma","c","paciente","p");
		
		$dao->Where("c.numero","'".$_POST['Numero']."'","");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}
	if($_POST['Requerimiento'] == "ConsultarDetalleProforma"){

		
		$dao= new Dao();
		
		$dao->Campo("c.*","");
		$dao->Campo("e.apellidos","");
		$dao->Campo("e.nombres","");
		

		$dao->TablasInnerAlias("proforma_item","c","empleado","e");
		
		$dao->Where("c.id_consulta",$_POST['Consulta'],"");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}
	if($_POST['Requerimiento'] == "ActualizarEstadoProformaOrden"){

		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("proforma",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
		
	}
}