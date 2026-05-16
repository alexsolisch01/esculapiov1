<?php

session_start();
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){


if($_POST['Requerimiento'] == "GuardarAnticipo"){

		$datos = array("valor"=>$_POST["Valor"],
					   "valor_ingreso"=>$_POST["Valor"],
					   "t_pago"=>$_POST["TipoPago"],
					   "id_estado"=>1,
					   "id_punto_venta"=>$_SESSION["puntoVenta"],
			     	   "usuario_registro"=>$_SESSION["usuario"]);
						if($_POST["Tipo"]=='cliente'){
							$datos["id_paciente_cliente"]=$_POST["IdPaciente"];
						}else{
							$datos["id_paciente"]=$_POST["IdPaciente"];
						}
					   
		$dao= new Dao();
	    $dao->GuardarAjax("anticipo",$datos);
		
		
	}


////////////////////////////////////////////////////MODIFICAR//////////////////////////////////////////////////////


		if($_POST['Requerimiento'] == "ModificaAnticipo"){

		
		$datos = array(
					   "valor"=>$_POST["Valor"],
					   "t_pago"=>$_POST["T_pago"],
					   "id_paciente"=>$_POST["IdPaciente"],
			     	   "usuario_modifico"=>$_SESSION["usuario"]);

		
	    $dao= new Dao();
		 $dao->ModificarAjax("anticipo",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
		
	}

////////////////////////////////////////////////////ELIMINAR//////////////////////////////////////////////////////	


	if($_POST['Requerimiento'] == "EliminaAnticipo"){

		$dao = new Dao();

		$dao->Campo("id","");

		$dao->Tabla("ic_caja","");
		$dao->Where("id_anticipo",$_POST["Id"],"");

		$respuesta =$dao->Consultar();
		$idIcCaja = 0;

		foreach ($respuesta as $row => $item){
			$idIcCaja = $item[0];
			$dao1= new Dao();
			$dao1->Eliminar("forma_pago_ingreso","id_ic_caja = ".$idIcCaja);
		}

		$dao2= new Dao();
		$dao->Eliminar("ic_caja","id_anticipo = ".$_POST["Id"]);

		$dao3= new Dao();
		$dao3->EliminarAjax("anticipo",$_POST['Id']);
	}


/////////////////////////////////////////////CARGAR TABLA POR NOMBRE////////////////////////////////////////
	if($_POST['Requerimiento'] == "CargarUltimosAnticiposPaciente"){
			
			$dao = new Dao();

			$dao->Campo("a.id","");
			$dao->Campo("pa.apellido","");
			$dao->Campo("pa.apellido_materno","");
			$dao->Campo("pa.nombre","");
			$dao->Campo("a.valor","");
			$dao->Campo("a.t_pago","");
			$dao->Campo("a.fecha_registro","");
			$dao->Campo("a.valor_ingreso","");

			$dao->TablasInnerAlias("anticipo","a","paciente","pa");
			$dao->MayorIgual("a.valor","0","and");
			$dao->Where("a.id_paciente",$_POST['Id'],"");
			//$dao->Limite("3");  
			$dao->ConsultarAjax();
			//echo json_encode($dao->Consultar2());
			
		}

	if($_POST['Requerimiento'] == "CargarUltimosAnticiposCliente"){
			
			$dao = new Dao();

			$dao->Campo("a.id","");
			$dao->Campo("pc.apellido","");
			$dao->Campo("pc.nombre","");
			$dao->Campo("a.valor","");
			$dao->Campo("a.t_pago","");
			$dao->Campo("a.fecha_registro","");
			$dao->Campo("a.valor_ingreso","");

			$dao->TablasInnerAlias("anticipo","a","paciente_cliente","pc");
			$dao->MayorIgual("a.valor","0","and");
			$dao->Where("a.id_paciente_cliente",$_POST['Id'],"");
			//$dao->Limite("3");  
			$dao->ConsultarAjax();
			//echo json_encode($dao->Consultar2());
			
	}

	if($_POST['Requerimiento'] == "CargarParaEgreso"){

		$dao = new Dao();
		$cadena = '';
		$fechaDesde = $_POST['FechaDesde'];
		$fechaHasta = $_POST['FechaHasta'];
		if(isset($_POST['columns'][1]["search"]["value"]) )  
        { 
        	$cadena = $_POST['columns'][1]["search"]["value"];    
        }
        if(isset($_POST['columns'][2]["search"]["value"])&&$_POST['columns'][2]["search"]["value"]!="")  
        { 
        	$fechaDesde = $_POST['columns'][2]["search"]["value"];    
        }
        if(isset($_POST['columns'][3]["search"]["value"])&&$_POST['columns'][3]["search"]["value"]!="")  
        { 
        	$fechaHasta = $_POST['columns'][3]["search"]["value"];    
        }

		$sql ='	SELECT a.id, pc.ruc, CONCAT(pc.nombre ," ", pc.apellido) paciente, a.valor_ingreso,a.valor,a.fecha_registro, a.id_estado FROM anticipo a INNER JOIN paciente_cliente pc on(a.id_paciente_cliente=pc.id) WHERE CONCAT(pc.nombre," ",pc.apellido) LIKE "%'.$cadena.'%" and CONVERT(a.fecha_registro,DATE) BETWEEN "'.$fechaDesde.'" and "'.$fechaHasta.'"
					group by a.id;';

			//$dao->ConsultarSqlNativoAjax($sql);

		$respuesta =$dao->ConsultarSqlNativo($sql);
		$total=0;
		$data = array();

		foreach ($respuesta as $row => $item){
			if($item[6]==1 || $item[6]==22){
				$boton = '<button type="button" class="btn btn-sm btn-danger">INHABILITADO</button>';
				$accion = '<input type="checkbox" id="'.$item[0].'">';
			}
			if($item[6]==10){
				$boton = '<button type="button" class="btn btn-sm btn-info">DEVUELTO</button>';
				$accion = '';
			}
			if($item[6]==12){
				$boton = '<button type="button" class="btn btn-sm btn-success">HABILITADO</button>';
				$accion = '';
			}
			if($item[6]==15){
				$boton = '<button type="button" class="btn btn-sm btn-success">HABILITADO FACTURACION</button>';
				$accion = '';
			}
			if($item[6]==20){
				$boton = '<button type="button" class="btn btn-sm btn-warning">SALDADO</button>';
				$accion = '';
			}
			
			$sub_array = array(); 
				
			$sub_array[] = $accion;
			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = number_format($item[3], 2, '.', '');
			$sub_array[] = number_format($item[4], 2, '.', '');
			$sub_array[] = $item[5];
			$sub_array[] = $boton;
	                        
	        $data[] = $sub_array; 
	        $total++;
		}

		$output = array(  
	        "draw"=> intval($_POST["draw"]),  
	        "recordsTotal"=> $total,  
	        "recordsFiltered"=> $total,  
	        "data"=> $data  
	        );  
	    echo json_encode($output);
	}

	if($_POST['Requerimiento'] == "CargarParaEgresoHabilitado"){

		$dao = new Dao();
		$cadena = '';
		$fechaDesde = $_POST['FechaDesde'];
		$fechaHasta = $_POST['FechaHasta'];
		if(isset($_POST['columns'][1]["search"]["value"]) )  
        { 
        	$cadena = $_POST['columns'][1]["search"]["value"];    
        }
        if(isset($_POST['columns'][2]["search"]["value"])&&$_POST['columns'][2]["search"]["value"]!="")  
        { 
        	$fechaDesde = $_POST['columns'][2]["search"]["value"];    
        }
        if(isset($_POST['columns'][3]["search"]["value"])&&$_POST['columns'][3]["search"]["value"]!="")  
        { 
        	$fechaHasta = $_POST['columns'][3]["search"]["value"];    
        }

			$sql ='	SELECT a.id, ic.numero, pc.ruc, CONCAT(pc.nombre ," ", pc.apellido) paciente, a.valor_ingreso,a.valor,a.fecha_registro, pc.direccion, pc.telefono, pc.email
					FROM anticipo a INNER JOIN paciente_cliente pc on(a.id_paciente_cliente=pc.id) INNER JOIN ic_caja ic ON (ic.id_anticipo = a.id) 
                    WHERE a.valor > 0 and a.id_estado = 12 and CONCAT(pc.nombre," ",pc.apellido) LIKE "%'.$cadena.'%" and CONVERT(a.fecha_registro,DATE) BETWEEN "'.$fechaDesde.'" and "'.$fechaHasta.'"
					group by a.id;';

			//$dao->ConsultarSqlNativoAjax($sql);

			$respuesta =$dao->ConsultarSqlNativo($sql);
			$total=0;
			$data = array();


			foreach ($respuesta as $row => $item){
				$sub_array = array(); 
				$accion = '<input type="checkbox" id="'.$item[0].'">';
				$sub_array[] = $accion;
				$sub_array[] = $item[0];
				$sub_array[] = "IC-".$item[1];
				$sub_array[] = $item[2];
				$sub_array[] = $item[3];
				$sub_array[] = number_format($item[4], 2, '.', '');
				$sub_array[] = number_format($item[5], 2, '.', '');
				$sub_array[] = $item[6];
				$sub_array[] = $item[7];
				$sub_array[] = $item[8];
				$sub_array[] = $item[9];
	                        
	            $data[] = $sub_array; 
	           	$total++;
			}

			$output = array(  
	                "draw"           => intval($_POST["draw"]),  
	                "recordsTotal"   => $total,  
	                "recordsFiltered"=> $total,  
	                "data"           => $data  
	        );  
	        echo json_encode($output);
		}

	if($_POST['Requerimiento'] == "ConsultarUltimoEgreso"){

		$dao= new Dao();

	    $dao->Campo("numero","");
	    
		$dao->Tabla("ec_caja","");
		$dao->Where("id_punto_venta",$_SESSION['puntoVenta'],"");
		$dao->Ordenar("id DESC");
		$dao->Limite("1");

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "GuardarEgreso"){

		$datos = array("numero"=>$_POST["Numero"],
					   "monto"=>$_POST["Monto"],
					   //"id_anticipo"=>$_POST["Anticipo"],
					   "id_punto_venta"=>$_SESSION["puntoVenta"]);
					   
		$dao= new Dao();
	    $dao->GuardarAjax("ec_caja",$datos);
		

	}

	if($_POST['Requerimiento'] == "GuardarEgresoDetalle"){
		$datos = array("id_ec_caja"=>$_POST["IdEgreso"],
								"id_anticipo"=>$_POST["Anticipo"]);

		$dao= new Dao();
	    $dao->Guardar("ec_caja_detalle",$datos);

	    $datos1 = array("valor"=>0,
					   "id_estado"=>10,
			     	   "usuario_modifico"=>$_SESSION["usuario"]);

		$dao1= new Dao();
		$dao1->ModificarAjax("anticipo",$datos1,"id=".$_POST['Anticipo'],$_POST['Anticipo']);
		
	}

	if($_POST['Requerimiento'] == "ModificarEstadoAnticipo"){

		$datos = array("id_estado"=>12,
			     	   "usuario_modifico"=>$_SESSION["usuario"]);

		
	    $dao= new Dao();
		$dao->ModificarAjax("anticipo",$datos,"id=".$_POST['Anticipo'],$_POST['Anticipo']);
	}

	if($_POST['Requerimiento'] == "ModificarEstadoAnticipoFacturacion"){

		$datos = array("id_estado"=>15,
			     	   "usuario_modifico"=>$_SESSION["usuario"]);

		
	    $dao= new Dao();
		$dao->ModificarAjax("anticipo",$datos,"id=".$_POST['Anticipo'],$_POST['Anticipo']);
	}
}