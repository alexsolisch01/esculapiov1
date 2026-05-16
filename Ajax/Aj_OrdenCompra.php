<?php
session_start();
require_once "autoloadAjax.php";
if(isset($_POST['Requerimiento'])){
	function GuardarDetalleOrden($idOrden,$detalle){
		$array = json_decode($detalle,true);
		$jsondata = array();
		$j=0;		
		for($i=0; $i<sizeof($array); $i++) {		  
		  $producto = $array[$i];
          	$datos = array("id_inventario"=>$producto[0],
								"id_orden_compra"=>$idOrden,
								"presentacion"=>$producto[1],
								"cantidad"=>$producto[2],
								"precio"=>0,
								"descuento"=>0,
								"subtotal"=>0,
								"total"=>0);
			$dao= new Dao();			         
	      	$respuesta = $dao->Guardar("orden_compra_item",$datos);
	      if(!$respuesta[0]){	    	
	      	$jsondata[$j]="No se puedo guardar el producto ".$producto[0];
	      	$j++;
		  }           
        }                
        return $jsondata;
	}
	if($_POST['Requerimiento'] == "GuardarOrden"){
		$datos = array("tipo"=>"INGRESO",
								"id_motivo"=>19,
								"id_proveedor"=>$_POST["Id_proveedor"],
								"numero"=>$_POST["Numero"],
								"fecha"=>date("Y-m-d"),
								"observaciones"=>"",
								"subtotal"=>0,
								"iva"=>0,
								"descuento"=>0,
								"total"=>0,
								"estado"=>1,
								"usuario_registro"=>$_SESSION["usuario"]);		
		$dao= new Dao();		
	    $respuesta = $dao->Guardar("orden_compra",$datos);
	    if($respuesta[0]){
	    	$errores = GuardarDetalleOrden($respuesta[1],$_POST["Detalle"]);
	    	if(sizeof($errores)>0){
	    		echo json_encode($errores, JSON_FORCE_OBJECT);	
	    	}else{
	    		$jsondata = array();
	    		$jsondata[0]=true;	    		
	    		$jsondata[1]=$respuesta[1];
	    		echo json_encode($jsondata, JSON_FORCE_OBJECT);	    			    	
	    	}
	    }else{
	    	echo json_encode($respuesta, JSON_FORCE_OBJECT);
	    }	
	}
	if($_POST['Requerimiento'] == "LlenarTablaOrden"){
		$dao = new Dao(); 
		$dao->Campo("oc.id","");
		$dao->Campo("p.descripcion","");
		$dao->Campo("Date_format(oc.fecha,'%Y-%m-%d')","");
		$dao->Campo("oc.estado","");
		$dao->TablasInnerAlias("orden_compra","oc","proveedor","p");
		$dao->Where("CONVERT(oc.fecha,DATE)",'"'.date("Y-m-d").'"',"and");
		if(isset($_POST['columns'][0]["search"]["value"]) )  
        {  
            if(trim($_POST['columns'][0]["search"]["value"])==""){
                $dao->Where("1","1","and");
            }else{
               	$dao->Filtrar("oc.numero",$_POST['columns'][0]["search"]["value"],"and");
            }
        } 
		if(isset($_POST['columns'][1]["search"]["value"]))  
        {  
        	if(trim($_POST['columns'][1]["search"]["value"])==""){
                $dao->Where("1","1","");
            }else{
                $dao->Filtrar("p.descripcion",$_POST['columns'][1]["search"]["value"],"");
                	//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
            }
        }
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
        //$dao->Ordenar("apellido,nombre");  
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
		//array_sort_by($respuesta, 'oc.numero', $order = SORT_ASC);
		$total = 0;
		$boton="";
		foreach ($respuesta as $row => $item){
			$sub_array = array(); 
            $sub_array[] =$item[0];
            $sub_array[] =$item[1];
            $sub_array[] =$item[2];
            if($item[3]==2){
				$boton = '<button idEstado='.$item[3].' type="button" class="btn btn-sm btn-success col-md-12 nopadding">INGRESADA</button>';
			}else{
				$boton = '<button idEstado='.$item[3].' type="button" class="btn btn-sm btn-warning col-md-12 nopadding">NO INGRESADA</button>';
			}
			$sub_array[] =$boton;
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
	if($_POST['Requerimiento'] == "LlenarTablaOrdenFechas"){
		$dao = new Dao(); 
		$dao->Campo("oc.id","");
		$dao->Campo("p.descripcion","");
		$dao->Campo("Date_format(oc.fecha,'%Y-%m-%d')","");
		$dao->Campo("oc.estado","");
		$dao->TablasInnerAlias("orden_compra","oc","proveedor","p");
		if(isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])){
			$dao->Entre("CONVERT(oc.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
		}else{
			$dao->Where("CONVERT(oc.fecha_registro,DATE)",'"'.date("Y-m-d").'"',"and");
		}
		if(isset($_POST['columns'][0]["search"]["value"]) )  
        {  
            if(trim($_POST['columns'][0]["search"]["value"])==""){
                $dao->Where("1","1","and");
            }else{
               	$dao->Filtrar("oc.numero",$_POST['columns'][0]["search"]["value"],"and");
            }
        } 
		if(isset($_POST['columns'][1]["search"]["value"]))  
        {  
        	if(trim($_POST['columns'][1]["search"]["value"])==""){
                $dao->Where("1","1","");
            }else{
                $dao->Filtrar("p.descripcion",$_POST['columns'][1]["search"]["value"],"");
                	//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
            }
        }
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
        //$dao->Ordenar("apellido,nombre");  
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
		//array_sort_by($respuesta, 'numero', $order = SORT_ASC);
		$total = 0;
		$boton="";
		foreach ($respuesta as $row => $item){
			$sub_array = array(); 
            $sub_array[] =$item[0];
            $sub_array[] =$item[1];
            $sub_array[] =$item[2];
            if($item[3]==2){
				$boton = '<button idEstado='.$item[3].' type="button" class="btn btn-sm btn-success col-md-12 nopadding">INGRESADA</button>';
			}else{
				$boton = '<button idEstado='.$item[3].' type="button" class="btn btn-sm btn-warning col-md-12 nopadding">NO INGRESADA</button>';
			}
			$sub_array[] =$boton;
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
	if($_POST['Requerimiento'] == "LlenarTablaOrdenFechas2"){
		$dao = new Dao(); 
		$dao->Campo("LPAD(oc.id,7,'0')","");
		$dao->Campo("p.descripcion","");
		$dao->Campo("Date_format(oc.fecha,'%Y-%m-%d')","");
		$dao->Campo("oc.estado","");
		$dao->TablasInnerAlias("orden_compra","oc","proveedor","p");
		if(trim($_POST['columns'][0]["search"]["value"]) == ''){
			$dao->Where("CONVERT(oc.fecha,DATE)",'"'.date("Y-m-d").'"',"and");	
		}else{
			$dao->Entre("CONVERT(oc.fecha,DATE)",'CONVERT("'.$_POST['columns'][0]["search"]["value"].'",DATE)','CONVERT("'.$_POST['columns'][1]["search"]["value"].'",DATE)',"and");
		}
		if(isset($_POST['columns'][2]["search"]["value"]) )  
        {  
            if(trim($_POST['columns'][2]["search"]["value"])==""){
                $dao->Where("1","1","and");
            }else{
               	$dao->Filtrar("oc.id",$_POST['columns'][2]["search"]["value"],"and");
            }
        } 
		if(isset($_POST['columns'][3]["search"]["value"]))  
        {  
        	if(trim($_POST['columns'][3]["search"]["value"])==""){
                $dao->Where("1","1","");
            }else{
                $dao->Filtrar("p.descripcion",$_POST['columns'][3]["search"]["value"],"");
            }
        }
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
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
		//array_sort_by($respuesta, 'numero', $order = SORT_ASC);
		$total = 0;
		$boton="";
		/*$sub_array = array(); 
		$sub_array[] = $respuesta;
		$sub_array[] = "";
		$sub_array[] = "";
		$sub_array[] = "";
		$sub_array[] = "";
		$data[] = $sub_array;*/
		foreach ($respuesta as $row => $item){
			$sub_array = array(); 
			$botonModificar = '<button type="button" class="btn btn-info btn-sm visualizar" title="VISUALIZAR"><i class="fa fa-eye"></i></button>';
        	$sub_array[] = $botonModificar;
            $sub_array[] =$item[0];
            $sub_array[] =$item[1];
            $sub_array[] =$item[2];
            if($item[3]==2){
				$boton = '<button idEstado='.$item[3].' type="button" class="btn btn-sm btn-success col-md-12 nopadding">INGRESADA</button>';
			}else{
				$boton = '<button idEstado='.$item[3].' type="button" class="btn btn-sm btn-warning col-md-12 nopadding">NO INGRESADA</button>';
			}
			$sub_array[] =$boton;
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
	if($_POST['Requerimiento'] == "CargarOrdenItems"){
		$dao= new Dao();
		$dao->Campo("m.*","");
		$dao->Campo("i.nombre","");
		$dao->Campo("i.iva","");
		$dao->Campo("i.presentacion","");
		$dao->Campo("(IF(m.presentacion=i.prst1,2,1))","NIVEL");
		$dao->TablasInnerAlias("orden_compra_item","m","inventario","i");
		$dao->Where("m.id_orden_compra",$_POST['OrdenCompra'],"");
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}
	if($_POST['Requerimiento'] == "CargarDetalleOrden"){
		$dao= new Dao();
		$dao->Campo("i.id","");
		$dao->Campo("i.nombre","");
		$dao->Campo("m.presentacion","");
		$dao->Campo("m.cantidad","");
		$dao->TablasInnerAlias("orden_compra_item","m","inventario","i");
		$dao->Where("m.id_orden_compra",$_POST['IdOrden'],"");
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}
	if($_POST['Requerimiento'] == "CargarOrdenConsulta"){
		$dao = new Dao(); 
		$dao->Campo("id","");
		$dao->Campo("numero","");
		$dao->Campo("id_proveedor","");
		$dao->Campo("tipo","");			
		$dao->Campo("id_motivo","");
		$dao->Campo("CONVERT(fecha,DATE)","");		
		$dao->Campo("observaciones","");
		$dao->Campo("subtotal","");
		$dao->Campo("iva","");
		$dao->Campo("descuento","");
		$dao->Campo("total","");
		$dao->Tabla("orden_compra","");
		$dao->Where("id",$_POST['Id'],"");	
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}
	if($_POST['Requerimiento'] == "ModificarOrdenCompra"){
		$datos = array("estado"=>2);
		$dao= new Dao();
		$dao->ModificarAjax("orden_compra",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}
}