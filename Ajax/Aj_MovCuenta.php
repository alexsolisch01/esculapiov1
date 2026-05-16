<?php
session_start();
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

  	if($_POST['Requerimiento'] == "CargarPacienteCuentas"){

		$dao = new Dao();
		$cadena = '';
		if(isset($_POST['columns'][0]["search"]["value"]))  
        { 
        	$cadena = $_POST['columns'][0]["search"]["value"];    
        }

		$sql ='	SELECT pc.id, pc.ruc identificacion, CONCAT(pc.nombre ," ", pc.apellido) cliente, pc.telefono, pc.email, pc.direccion, "cliente" tipo
				FROM forma_pago f INNER JOIN consulta c on(f.id_consulta=c.id) 
				INNER JOIN paciente_cliente pc ON(c.id_paciente_cliente=pc.id) 
				WHERE CONCAT(pc.ruc," ",pc.nombre," ",pc.apellido) LIKE "%'.$cadena.'%" and f.tipo = "CREDITO" and pc.id != 1 
				group by pc.id';

		//$dao->ConsultarSqlNativoAjax($sql);

		$respuesta =$dao->ConsultarSqlNativo($sql);
		$total=0;
		$data = array();

		foreach ($respuesta as $row => $item){

			$sub_array = array(); 
			
			$sub_array[] = $item[0];
			$sub_array[] = $item[1];
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = $item[4];
			$sub_array[] = $item[5];
			$sub_array[] = $item[6];
                        
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

	if($_POST['Requerimiento'] == "CargarCuentasTodas"){
		$dao = new Dao();
		
		$dao->Campo("c.numero","");
		$dao->Campo("c.fecha_registro","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.apellido","");
		$dao->Campo("fp.monto_credito","");
		$dao->Campo("c.id_paciente_cliente","");
		$dao->Campo("c.id","");

		$dao->TablasInnerAlias("forma_pago","fp","consulta","c");
		$dao->TablasInnerAlias("consulta","c","paciente_cliente","p");
		$dao->Diferente("c.id_estado","21","and");
		if(isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])){
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
		}

		if(isset($_POST['columns'][0]["search"]["value"]))  
        {  
        		if(trim($_POST['columns'][0]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->Filtrar("numero",$_POST['columns'][0]["search"]["value"],"and");
                }
        }  
        if(isset($_POST['columns'][2]["search"]["value"]) )  
        {  
                
                if(trim($_POST['columns'][2]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->Filtrar("CONCAT(apellido,' ',nombre)",$_POST['columns'][2]["search"]["value"],"and");
                }  
        }

		$dao->Where("fp.tipo","'CREDITO'","");		
		$dao->Agrupar("c.id");
		$dao->Ordenar("CONVERT(c.fecha_registro,DATE)");

		//$dao->ConsultarAjax();
		$respuesta1 =$dao->Consultar();
		//$query = $dao->Consultar2();


		$dao = new Dao();
		
		$dao->Campo("c.numero","");
		$dao->Campo("c.fecha_registro","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.apellido","");
		$dao->Campo("fp.monto_credito","");
		$dao->Campo("c.id_paciente_cliente","");
		$dao->Campo("c.id","");

		$dao->TablasInnerAlias("forma_pago","fp","farmacia","c");
		$dao->TablasInnerAlias("farmacia","c","paciente_cliente","p");
		$dao->Diferente("c.id_estado","21","and");
		if(isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])){
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
			
		}

		if(isset($_POST['columns'][0]["search"]["value"]))  
        {  
        		if(trim($_POST['columns'][0]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->Filtrar("numero",$_POST['columns'][0]["search"]["value"],"and");
                }
        }  
        if(isset($_POST['columns'][2]["search"]["value"]) )  
        {  
                
                if(trim($_POST['columns'][2]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->Filtrar("CONCAT(apellido,' ',nombre)",$_POST['columns'][2]["search"]["value"],"and");
                }  
        }

		$dao->Where("fp.tipo","'CREDITO'","");
		$dao->Agrupar("c.id");
		$dao->Ordenar("CONVERT(c.fecha_registro,DATE)");
		$respuesta2 =$dao->Consultar();

		$respuesta= array_merge($respuesta1,$respuesta2);

		$data = array();

		function array_sort_by(&$arrIni, $col, $order = SORT_ASC)
		{
		    $arrAux = array();
		    foreach ($arrIni as $key=> $row)
		    {
		        $arrAux[$key] = is_object($row) ? $arrAux[$key] = $row->$col : $row[$col];
		        $arrAux[$key] = strtolower($arrAux[$key]);
		    }
		    array_multisort($arrAux, $order, $arrIni);
		}
		array_sort_by($respuesta, 'fecha_registro', $order = SORT_ASC);
		$total=0;
		foreach ($respuesta as $row => $item){
			$sub_array = array();
			$sub_array[] =$item[0];
            $sub_array[] =$item[1];
            $sub_array[] =$item[3].' '.$item[2];
            $sub_array[] ='$ '.number_format($item[4], 2, '.', '');
            $sub_array[] =$item[5];
            $sub_array[] =$item[6];
                   
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
		//echo json_encode($respuesta);
		
	}
}
