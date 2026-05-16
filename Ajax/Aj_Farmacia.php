<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if($_POST['Requerimiento'] == "CargarFacturaConsultaFarmacia"){

		$dao= new Dao();

	    $dao->Campo("c.id","");
	    $dao->Campo("c.id_paciente","");
	    $dao->Campo("p.nombre","");
	    $dao->Campo("p.apellido","");
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
	    $dao->Campo("c.numero","");
	    $dao->Campo("CONVERT(c.fecha_registro,DATE)","");	
	    $dao->Campo("c.id_estado","");
	    $dao->Campo("c.autorizada","");
	    $dao->Campo("c.tipoid","");
	    $dao->Campo("c.clave_sri","");
	
		$dao->TablasInnerAlias("farmacia","c","paciente","p");
		
		$dao->Where("c.numero","'".$_POST['Numero']."'","");

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarItemIdFarmacia"){

		$dao= new Dao();
		$dao->Campo("nombre","");
		$dao->Tabla($_POST['Tabla'],"");
		
		$dao->Where("id",$_POST['Id'],"");

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "ConsultarDetalleConsultaFarmacia"){

		$dao= new Dao();
		
		$dao->Campo("f.*","");
	    $dao->Campo("i.iva","");
	    $dao->Campo("i.nombre","");
	    $dao->Campo("i.presentacion","");
	    $dao->Campo("i.prst1","");
	    $dao->Campo("i.costo1","");
	    $dao->Campo("i.cantidad2","");
	    
		$dao->TablasInnerAlias("farmacia_item","f","inventario","i");
		
		$dao->Where("f.id_farmacia",$_POST['Farmacia'],"and");
		$dao->Diferente("f.id_estado","25","");

		$dao->ConsultarAjax();
	}
	if($_POST['Requerimiento'] == "ConsultarDetalleConsultaFarmaciaFactura"){

		$dao= new Dao();
		
		$dao->Campo("f.*","");
	    $dao->Campo("i.iva","");
	    $dao->Campo("i.nombre","");
	    $dao->Campo("i.presentacion","");
	    $dao->Campo("i.prst1","");
	    $dao->Campo("i.costo1","");
	    $dao->Campo("i.cantidad2","");
	    
		$dao->TablasInnerAlias("farmacia_item","f","inventario","i");
		
		$dao->Where("f.id_farmacia",$_POST['Farmacia'],"");

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarNotaCredito"){

		$dao= new Dao();

	    $dao->Campo("c.id","");
	    $dao->Campo("c.id_paciente","");
	    $dao->Campo("p.nombre","");
	    $dao->Campo("p.apellido","");
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
	    $dao->Campo("c.numero","");
	    $dao->Campo("CONVERT(c.fecha_registro,DATE)","");	
	    $dao->Campo("c.id_estado","");
	    $dao->Campo("c.clave_sri","");
	
		$dao->TablasInnerAlias("nc_farmacia","c","paciente","p");
		
		$dao->Where("c.numero","'".$_POST['Numero']."'","");

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "ConsultarDetalleNotaCredito"){

		$dao= new Dao();
		
		$dao->Campo("f.*","");
	    $dao->Campo("i.iva","");
	    $dao->Campo("i.nombre","");
	    $dao->Campo("i.presentacion","");
	    $dao->Campo("i.prst1","");
	    
		$dao->TablasInnerAlias("nc_farmacia_item","f","inventario","i");
		
		$dao->Where("f.id_nc_farmacia",$_POST['Farmacia'],"");
		//$dao->Diferente("f.id_estado","25","");

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarRecetaPorid"){

		$dao= new Dao();

	    $dao->Campo("c.id","");
	    $dao->Campo("c.id_paciente","");
	    $dao->Campo("p.nombre","");
	    $dao->Campo("p.apellido","");
	    $dao->Campo("p.cedula","");
	    $dao->Campo("p.direccion","");
	    $dao->Campo("p.telefono","");
	    $dao->Campo("p.email","");
	    $dao->Campo("p.fecha_nacimiento","");
	    $dao->Campo("p.apellido","");
	    

	
		$dao->TablasInnerAlias("receta","c","paciente","p");
		
		$dao->Where("c.id","'".$_POST['Numero']."'","");

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "ConsultarDetalleReceta"){

		$dao= new Dao();
		
		$dao->Campo("d.*","");
	    $dao->Campo("i.iva","");
	    $dao->Campo("i.nombre","");
	    $dao->Campo("i.presentacion","");
	    $dao->Campo("i.pvp1","");
	    $dao->Campo("i.pvp2","");

	    $dao->Campo("i.cantidad1","");
	    $dao->Campo("i.cantidad2","");
	    $dao->Campo("i.fracciones_stock","");
	    $dao->Campo("i.prst1","");
	    $dao->Campo("i.costo1","");
	    $dao->Campo("i.pvp_caja","");
	    $dao->Campo("i.pvpf_caja","");
	    
		$dao->TablasInnerAlias("receta_detalle","d","inventario","i");
		
		$dao->Where("d.id_receta",$_POST['Farmacia'],"");

		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "HabilitarFarmacia"){

		
		$datos = array("nc"=>1);
		$dao= new Dao();
		$dao->ModificarAjax("farmacia",$datos,"id IN(".substr(trim($_POST['Id']),0,-1).")",0);
		
	}

	////////////////////////////////////// /NOTA DE CREDITO ////////////////////////////////////	

	if($_POST['Requerimiento'] == "LlenarTablaFacturasConFechasNcFarm"){

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

		$dao->TablasInnerAlias("nc_farmacia","c","paciente","p");
		//$dao->In_Where("c.id_estado","1,9,13,19","and");
		if($_POST['Estado']!="T"){
			$dao->Where("c.autorizada",'"'.$_POST['Estado'].'"',"and");	
		}
		
		if(isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])){
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
			
		}else{
			$dao->Where("CONVERT(c.fecha_registro,DATE)",'CURDATE()',"and");
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
				$boton = '<button idEstado='.$item[5].' type="button" class="btn btn-sm btn-warning col-md-12 nopadding">No Autorizada</button>';
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

	if($_POST['Requerimiento'] == "ActualizarEstadoFarmacia"){

		
		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("farmacia",$datos,"id=".$_POST['Farmacia'],$_POST['Farmacia']);
		
	}
}