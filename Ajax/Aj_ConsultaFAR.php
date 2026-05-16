  <?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

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

		$datos = array("id_punto_venta"=>$_POST["Punto"],
								"id_paciente"=>$_POST["Paciente"],
								"descuento"=>$_POST["Descuento"],
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
								"mismosdatos"=>$mismosdatos,
								"total"=>$_POST["Total"],
								"numero"=>$_POST["Numero"],
								"observacion"=>$_POST["OBS"],
								"id_consulta"=>$_POST["Consulta"]);

		if($mismosdatos=='N'){
			$datos['id_paciente_cliente']=$_POST["Cliente"];
		}
		if(isset($_POST["Referente"])){
			if($_POST["Referente"]!="" && $_POST["Referente"]!=0 ){
				$datos['id_referencia']=$_POST["Referente"];
			}
		}
		

		$dao= new Dao();
	    $dao->GuardarAjax("nc_consulta",$datos);
		
		
	}
	if($_POST['Requerimiento'] == "ModificarConsulta"){

		$mismosdatos=null;

		if($_POST["Paciente"] !=$_POST["Cliente"]){
			$mismosdatos='N';
		}else{
			$mismosdatos='S';
		}

		if($_POST["Cliente"]==1){
			$mismosdatos='N';
		}

				$datos = array("id_paciente"=>$_POST["Paciente"],
								"descuento"=>$_POST["Descuento"],
																
								"mismosdatos"=>$mismosdatos,
								"total"=>$_POST["Total"]);

		if($mismosdatos=='N'){
			$datos['id_paciente_cliente']=$_POST["Cliente"];
		}
		if(isset($_POST["Referente"])){
			if($_POST["Referente"]!="" && $_POST["Referente"]!=0 ){
				$datos['id_referencia']=$_POST["Referente"];
			}
		}
		

		$dao= new Dao();
	    $dao->ModificarAjax("nc_consulta",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
		
		
	}

	if($_POST['Requerimiento'] == "GuardarConsultaDetalle"){

		$datos = array("id_nc_consulta"=>$_POST["Consulta"],
								"id_empleado"=>$_POST["Empleado"],
								"id_estado"=>7,
								"fecha_atencion"=>$_POST["Fecha"],
								"precio"=>$_POST["Precio"],
								"descuento"=>$_POST["Descuento"],
								"subtotal"=>$_POST["Subtotal"],
								"turno"=>$_POST["Turno"]);

		if(isset($_POST["Procedimiento"])){
			$datos['id_procedimiento']=$_POST["Procedimiento"];
		}

		if(isset($_POST["Laboratorio"])){
			$datos['id_procedimiento_laboratorio']=$_POST["Laboratorio"];
		}
		if(isset($_POST["Rx"])){
			$datos['id_procedimiento_rx']=$_POST["Rx"];
		}
		if(isset($_POST["Eco"])){
			$datos['id_procedimiento_eco']=$_POST["Eco"];
		}
		if(isset($_POST["Tac"])){
			$datos['id_procedimiento_tomo']=$_POST["Tac"];
		}

		$dao= new Dao();
	    $dao->GuardarAjax("nc_consulta_item",$datos);
		
		
	}
	if($_POST['Requerimiento'] == "EliminarDetalleConsulta"){
		$dao= new Dao();
		$dao->EliminarPorCampoAjax("nc_consulta_item","id_consulta",$_POST['Consulta']);
		//$dao= new Dao();
		//$dao->EliminarPorCampoAjax("forma_pago","id_consulta",$_POST['Consulta']);
	}
	if($_POST['Requerimiento'] == "ModificarConsultaDetalle"){


		

		$datos = array("id_consulta"=>$_POST["Consulta"],
								"id_empleado"=>$_POST["Empleado"],
								"id_estado"=>7,
								"fecha_atencion"=>$_POST["Fecha"],
								"precio"=>$_POST["Precio"],
								"descuento"=>$_POST["Descuento"],
								"subtotal"=>$_POST["Subtotal"],
								"turno"=>$_POST["Turno"]);

		if(isset($_POST["Procedimiento"])){
			$datos['id_procedimiento']=$_POST["Procedimiento"];
		}

		if(isset($_POST["Laboratorio"])){
			$datos['id_procedimiento_laboratorio']=$_POST["Laboratorio"];
		}
		if(isset($_POST["Rx"])){
			$datos['id_procedimiento_rx']=$_POST["Rx"];
		}
		if(isset($_POST["Eco"])){
			$datos['id_procedimiento_eco']=$_POST["Eco"];
		}
		if(isset($_POST["Tac"])){
			$datos['id_procedimiento_tomo']=$_POST["Tac"];
		}

		$dao= new Dao();
	    $dao->GuardarAjax("nc_consulta_item",$datos);
		
		
	}

	if($_POST['Requerimiento'] == "ActualizaSecuencia"){

		$datos = array("secuencia_nc"=>$_POST["Secuencia"]);

		$dao= new Dao();
	    $_SESSION["secuencia_nc"] = str_pad($_POST["Secuencia"],  7, "0", STR_PAD_LEFT);
	    $dao->ModificarAjax("punto_venta",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
		
	}
	if($_POST['Requerimiento'] == "FacturaAutorizada"){

		$datos = array("autorizada"=>'S',
					   "clave_sri"=>$_POST['Clave']);

		$dao= new Dao();
	
	    $dao->ModificarAjax("nc_consulta",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
		
		
	}

	if($_POST['Requerimiento'] == "CargarFacturaConsulta"){

		
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
		$dao->TablasInnerAlias("nc_consulta","c","paciente","p");
		
		$dao->Where("c.numero","'".$_POST['Numero']."'","");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}

	if($_POST['Requerimiento'] == "ConsultarDetalleConsulta"){

		
		$dao= new Dao();
		
		$dao->Campo("c.*","");
	    $dao->Campo("e.apellidos","");
	    $dao->Campo("e.nombres","");
	    

		$dao->TablasInnerAlias("nc_consulta_item","c","empleado","e");
		
		$dao->Where("c.id_nc_consulta",$_POST['Consulta'],"");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}


	if($_POST['Requerimiento'] == "CargarItemId"){

		
		$dao= new Dao();
		$dao->Campo("nombre","");
		$dao->Tabla($_POST['Tabla'],"");
		
		$dao->Where("id",$_POST['Id'],"");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}
	if($_POST['Requerimiento'] == "CargarEspecialidadItem"){

		
		$dao= new Dao();
		$dao->Campo("p.id_especialidad","");
		$dao->Campo("e.id_tipo_servicio","");
		$dao->Campo("e.nombre","");
		$dao->TablasInnerAlias("procedimiento","p","especialidad","e");
		
		$dao->Where("p.id",$_POST['Id'],"");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoConsulta"){

		
		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("nc_consulta_item",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
		
	}
	if($_POST['Requerimiento'] == "ActualizarEstadoConsultaLab"){

		
		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("nc_consulta",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
		
	}
	if($_POST['Requerimiento'] == "ActualizarEstadoConsultaOrden"){

		
		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("nc_consulta",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
		
	}	
	if($_POST['Requerimiento'] == "ActualizarEstadoOrden"){

		
		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("orden_item",$datos,"id_orden=".$_POST['Orden']." AND ".$_POST["Campo"]." = ".$_POST["Id"],$_POST['Orden']);
		
	}

	if($_POST['Requerimiento'] == "CargarVentasConsulta"){

		
		$dao = new Dao();

		$sql =' SELECT *
				FROM (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 1 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) e,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 2 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) f,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 3 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) m,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 4 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) a,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 5 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) my,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 6 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) j,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 7 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ju,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 8 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ag,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 9 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) s,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 10 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) o,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 11 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) n,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 12 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) d ';

		$dao->ConsultarSqlNativoAjax($sql);
		
	}
	
	if($_POST['Requerimiento'] == "CargarVentasFactura"){

		
		$dao = new Dao();

		$sql =' SELECT *
				FROM (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 1 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) e,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 2 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) f,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 3 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) m,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 4 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) a,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 5 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) my,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 6 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) j,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 7 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ju,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 8 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ag,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 9 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) s,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 10 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) o,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 11 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) n,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 12 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) d ';

		$dao->ConsultarSqlNativoAjax($sql);
		
	}

	if($_POST['Requerimiento'] == "CargarItemsConsulta"){

		
		$dao= new Dao();
		
		$dao->Campo("c.id","");
	    $dao->Campo("p.nombre","");
	    

		$dao->TablasInnerAlias("nc_consulta_item","c","procedimiento","p");
		
		$dao->Where("c.id_nc_consulta",$_POST['Consulta'],"and");
		$dao->Where("c.id_empleado",$_SESSION['id_empleado'],"AND");
		$dao->Diferente("c.id_estado","19","");


		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "ObtenerReferido"){

		
		$dao= new Dao();
		
		$dao->Campo("r.apellidos","");
	    $dao->Campo("r.nombre","");
	    

		$dao->TablasInnerAlias("nc_consulta","c","referencia","r");
		
		$dao->Where("c.id",$_POST['Consulta'],"");


		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "LlenarTablaFacturasConFechasSri"){

		$dao = new Dao(); 

		$dao->Campo("c.numero","");
		$dao->Campo("CONCAT(p.apellido,' ',p.nombre) paciente","");
		$dao->Campo("c.id_paciente_cliente","");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')","");
		$dao->Campo("c.total","");
		$dao->Campo("c.id_estado","");
		$dao->Campo("c.autorizada","");
		$dao->Campo("c.clave_sri","");
		$dao->Campo("c.mensaje_sri","");
		$dao->Campo("c.id","");

		$dao->TablasInnerAlias("nc_consulta","c","paciente","p");
		$dao->In_Where("c.id_estado","1,9,13,19,21","and");
		if($_POST['Estado']!="T"){
			$dao->Where("c.autorizada",'"'.$_POST['Estado'].'"',"and");	
		}
		
		if(isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])){
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
			
		}else{
			$dao->Where("CONVERT(c.fecha_registro,DATE)",'"'.date("Y-m-d").'"',"and");
		}
		
		$apellidosBuscar="";

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
				$dao->Filtrar("CONCAT(p.apellido,' ',p.nombre)",$_POST['columns'][1]["search"]["value"],"and");
					//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}
		
		if(isset($_POST['columns'][2]["search"]["value"]) )  
		{  
			if(trim($_POST['columns'][2]["search"]["value"])==""){
				$dao->Where("1","1","");
			}else{
				$dao->Filtrar("c.id_paciente_cliente",$_POST['columns'][2]["search"]["value"],"");
					//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}
		   
		if($_POST["length"] != -1)  
		{  
		   $dao->Limite($_POST['start'].",".$_POST['length']);  
		}  
		
		$dao->Ordenar("c.fecha_registro");  
		

		$respuesta =$dao->Consultar();
		
		$data = array();

		function array_sort_by($arrIni, $col, $order = SORT_ASC)
		{
			$arrAux = array();
			foreach ($arrIni as $key=> $row)
			{
				$arrAux[$key] = is_object($row) ? $arrAux[$key] = $row->$col : $row[$col];
				$arrAux[$key] = strtolower($arrAux[$key]);
			}
			array_multisort($arrAux, $order, $arrIni);
		}

		
		array_sort_by($respuesta, 'numero', $order = SORT_ASC);

		$nombreCliente='';
		$total=0;
		foreach ($respuesta as $row => $item){
			$total++;
			$sub_array = array(); 
			$accion = '';
			if($item[6]!='D' && $item[5]!=21){
				$accion = '<input type="checkbox" id="'.$item[9].'">';
			}
			/*if($item[8]=='CLAVE ACCESO REGISTRADA'){
				$accion = '<input type="checkbox" id="'.$item[9].'">';
			}*/

			$sub_array[] =$accion;
			$sub_array[] =$item[0];	
			$sub_array[] =$item[3];
			

			$dao2 = new Dao(); 
			
			if($item[2]==null){
				$sub_array[] = $item[1];
			}else{
				$dao2->Campo("CONCAT(apellido,' ',nombre) paciente","");
				$dao2->Tabla("paciente_cliente","");
				$dao2->Where("id",$item[2],"");

				$respuesta2 =$dao2->Consultar();
				foreach ($respuesta2 as $row => $item1){
					$nombreCliente= $item1[0];
				}
				$sub_array[] = $nombreCliente;
			}
			$sub_array[] = $item[1];		
			
			$sub_array[] =$item[4];
			$boton = '';			
			if($item[6]=='N'){
				$boton = '<button idEstado='.$item[5].' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">No Autorizada</button>';
			}
			if($item[6]=='D'){
				$boton = '<button idEstado='.$item[5].' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Devuelta</button>';
			}
			if($item[6]=='S'){
				$boton = '<button idEstado='.$item[5].' type="button" class="btn btn-sm btn-success col-md-12 nopadding">Autorizada</button>';
			}
			if($item[5]==21){
				$boton = '<button idEstado='.$item[5].' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Anulada</button>';
			}
			$sub_array[] =$boton;
			$sub_array[] =$item[7];
			$sub_array[] =$item[8];
			
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
	
}
