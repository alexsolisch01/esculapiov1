<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){ 

	if($_POST['Requerimiento'] == "CargarCuentas"){
		$dao = new Dao();
		
		$dao->Campo("c.numero","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.apellido","");
		$dao->Campo("p.apellido_materno","");
		$dao->Campo("c.id_paciente_cliente","");
		$dao->Campo("c.mismosdatos","");
		$dao->Campo("c.fecha_registro","");
		$dao->Campo("c.total","");
		$dao->Campo("fp.tipo","");
		$dao->Campo("c.id","");
		$dao->Campo("fp.id_estado","");
		$dao->Sumar("fp.saldo","");

		$dao->TablasInnerAlias("forma_pago","fp","consulta","c");
		$dao->TablasInnerAlias("consulta","c","paciente","p");
		//$dao->TablasInnerAlias("consulta","c","paciente_cliente","pc");
		$dao->Diferente("c.id_estado","21","and");
		if(isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])){
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
			
		}else{
			$dao->Where("CONVERT(c.fecha_registro,DATE)",'CURDATE()',"and");
		}
		
		$dao->Where("fp.tipo","'CREDITO'","");
		$dao->Agrupar("c.id");
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarCuentasPorPaciente"){
		$dao = new Dao();
		
		$dao->Campo("c.numero","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.apellido","");
		$dao->Campo("p.apellido_materno","");
		$dao->Campo("c.id_paciente_cliente","");
		$dao->Campo("c.mismosdatos","");
		$dao->Campo("c.fecha_registro","");
		$dao->Campo("c.total","");
		$dao->Campo("fp.tipo","");
		$dao->Campo("c.id","");
		$dao->Campo("fp.id_estado","");
		$dao->Sumar("fp.saldo","");
		$dao->Sumar("p.id","");

		$dao->TablasInnerAlias("forma_pago","fp","consulta","c");
		$dao->TablasInnerAlias("consulta","c","paciente","p");
		$dao->Diferente("c.id_estado","21","and");
		if(isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])){
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
			
		}
		if($_POST['Tipo']=='cliente'){
			$dao->Where("c.id_paciente_cliente",$_POST['Paciente'],"and");
		}else{
			$dao->Where("c.id_paciente",$_POST['Paciente'],"and");
		}
		
		$dao->Where("fp.tipo","'CREDITO'","");
		$dao->Agrupar("c.id");
		//$dao->ConsultarAjax();
		$respuesta1 =$dao->Consultar();


		$dao = new Dao();
		
		$dao->Campo("c.numero","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.apellido","");
		$dao->Campo("p.apellido_materno","");
		$dao->Campo("c.id_paciente_cliente","");
		$dao->Campo("c.mismosdatos","");
		$dao->Campo("c.fecha_registro","");
		$dao->Campo("c.total","");
		$dao->Campo("fp.tipo","");
		$dao->Campo("c.id","");
		$dao->Campo("fp.id_estado","");
		$dao->Sumar("fp.saldo","");
		$dao->Sumar("p.id","");

		$dao->TablasInnerAlias("forma_pago","fp","farmacia","c");
		$dao->TablasInnerAlias("farmacia","c","paciente","p");
		$dao->Diferente("c.id_estado","21","and");
		if(isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])){
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
			
		}
		if($_POST['Tipo']=='cliente'){
			$dao->Where("c.id_paciente_cliente",$_POST['Paciente'],"and");
		}else{
			$dao->Where("c.id_paciente",$_POST['Paciente'],"and");
		}
		
		$dao->Where("fp.tipo","'CREDITO'","");
		$dao->Agrupar("c.id");
		$respuesta2 =$dao->Consultar();
		$respuesta= array_merge($respuesta1,$respuesta2);

		echo json_encode($respuesta);
		
	}

	if($_POST['Requerimiento'] == "CargarComprobantes"){
		$dao = new Dao();
		
		$dao->Campo("c.numero","");
		$dao->Campo("ic.numero","");
		$dao->Campo("ic.monto","");
		$dao->Campo("ic.fecha_registro","");
		$dao->Campo("ic.tipo_pago","");

		$dao->TablasInnerAlias("ic_abonos","ia","ic_caja","ic");
		$dao->TablasInnerAlias("ic_abonos","ia","forma_pago","fp");
		$dao->TablasInnerAlias("forma_pago","fp","consulta","c");
		$dao->Where("fp.id",$_POST['FormaPago'],"");
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarDetalleCuentas"){
		$dao = new Dao();
		
		$dao->Campo("fp.pago_credito","");
		$dao->Campo("fp.periodo","");
		$dao->Campo("fp.fecha_pago_credito","");
		$dao->Campo("fp.pago","");
		$dao->Campo("fp.pagado","");
		$dao->Campo("fp.saldo","");
		$dao->Campo("c.numero","");
		$dao->Campo("c.id","");
		$dao->Campo("fp.id","");
		$dao->Campo("fp.id_ic_caja","");

		$dao->TablasInnerAlias("forma_pago","fp","consulta","c");
		$dao->Diferente("c.id_estado","21","and");
		if($_POST['Tipo']=='cliente'){
			$dao->Where("c.id_paciente_cliente","'".$_POST['Paciente']."'","and");
		}
		$dao->Where("fp.tipo","'"."CREDITO"."'","");
		$dao->Ordenar("c.id");

		$respuesta1 =$dao->Consultar();

		$dao = new Dao();
		
		$dao->Campo("fp.pago_credito","");
		$dao->Campo("fp.periodo","");
		$dao->Campo("fp.fecha_pago_credito","");
		$dao->Campo("fp.pago","");
		$dao->Campo("fp.pagado","");
		$dao->Campo("fp.saldo","");
		$dao->Campo("c.numero","");
		$dao->Campo("c.id","");
		$dao->Campo("fp.id","");
		$dao->Campo("fp.id_ic_caja","");

		$dao->TablasInnerAlias("forma_pago","fp","farmacia","c");
		$dao->Diferente("c.id_estado","21","and");
		if($_POST['Tipo']=='cliente'){
			$dao->Where("c.id_paciente_cliente","'".$_POST['Paciente']."'","and");
		}
		$dao->Where("fp.tipo","'"."CREDITO"."'","");
		$dao->Ordenar("c.id");

		$respuesta2 =$dao->Consultar();
		
		$respuesta= array_merge($respuesta1,$respuesta2);

		echo json_encode($respuesta);
	}

	if($_POST['Requerimiento'] == "CargarDetalleCuentasHistorico"){
		$dao = new Dao();
		
		$dao->Campo("fp.pago_credito","");
		$dao->Campo("fp.periodo","");
		$dao->Campo("fp.fecha_pago_credito","");
		$dao->Campo("fp.pago","");
		$dao->Campo("fp.pagado","");
		$dao->Campo("fp.saldo","");
		$dao->Campo("c.numero","");
		$dao->Campo("c.id","");
		$dao->Campo("fp.id","");
		$dao->Campo("fp.id_ic_caja","");

		$dao->TablasInnerAlias("forma_pago","fp","consulta","c");
		$dao->Diferente("c.id_estado","21","and");
		$dao->Where("c.id_paciente_cliente","'".$_POST['Paciente']."'","and");
		$dao->Where("fp.tipo","'"."CREDITO"."'","");
		$dao->Ordenar("c.id");
		

		$respuesta1 =$dao->Consultar();

		$dao = new Dao();
		
		$dao->Campo("fp.pago_credito","");
		$dao->Campo("fp.periodo","");
		$dao->Campo("fp.fecha_pago_credito","");
		$dao->Campo("fp.pago","");
		$dao->Campo("fp.pagado","");
		$dao->Campo("fp.saldo","");
		$dao->Campo("c.numero","");
		$dao->Campo("c.id","");
		$dao->Campo("fp.id","");
		$dao->Campo("fp.id_ic_caja","");

		$dao->TablasInnerAlias("forma_pago","fp","farmacia","c");
		$dao->Diferente("c.id_estado","21","and");
		$dao->Where("c.id_paciente_cliente","'".$_POST['Paciente']."'","and");
		$dao->Where("fp.tipo","'"."CREDITO"."'","");
		$dao->Ordenar("c.id");
		
		
		$respuesta2 =$dao->Consultar();

		$respuesta= array_merge($respuesta1,$respuesta2);

		echo json_encode($respuesta);
	}

	if($_POST['Requerimiento'] == "CobrarCuentas"){
		$datos = array("pagado"=>($_POST["Valor"]+$_POST["Pagado"]),
						"saldo"=>($_POST["Pagar"]-$_POST["Valor"]),
						"id_estado"=>22);
						$dao= new Dao();
						$dao->Modificar("forma_pago",$datos,"id=".$_POST['Consulta']." AND pago_credito = ".$_POST["NumeroPago"],$_POST['Consulta']);

		$jsondata = array();
		$jsondata[0]='sfsdf';	
		$jsondata[1]=$_POST["Pagar"]-$_POST["Valor"];	
        echo json_encode($jsondata);
	}

	if($_POST['Requerimiento'] == "GuardaIngresoCaja"){

		$datos = array("numero"=>$_POST["Numero"],
						"tipo"=>$_POST["Tipo"],
						"id_punto_venta"=>$_SESSION["puntoVenta"],
						"monto"=>$_POST["Monto"],
						"tipo_pago"=>$_POST["TipoPago"]);
		if($_POST["Tipo"]=='ANTICIPO'){
			$datos["id_anticipo"]=$_POST["IdAnticipo"];
		}
		if($_POST["TipoCliente"]=='cliente'){
			$datos["id_paciente_cliente"]=$_POST["Paciente"];
		}
		$dao= new Dao();
	    $dao->GuardarAjax("ic_caja",$datos);
	}

	if($_POST['Requerimiento'] == "GuardarIngresoAbono"){

		$datos = array("id_ic_caja"=>$_POST["Ingreso"],
						"id_forma_pago"=>$_POST["FormaPago"]);
		$dao= new Dao();
	    $dao->GuardarAjax("ic_abonos",$datos);	
	}

	
	if($_POST['Requerimiento'] == "CargarIngresos"){
			
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
		/*
		echo json_encode($jsondata);*/
		$sql ='	SELECT ic.id, ic.numero, ic.tipo, CONCAT(pc.nombre," ",pc.apellido) cliente, SUM(ic.monto), ic.fecha_registro, "ingreso" tipo
				FROM ic_caja ic INNER JOIN paciente_cliente pc ON (ic.id_paciente_cliente = pc.id)
				WHERE CONCAT(pc.nombre," ",pc.apellido) LIKE "%'.$cadena.'%" and CONVERT(ic.fecha_registro,DATE) BETWEEN "'.$fechaDesde.'" and "'.$fechaHasta.'"
                GROUP BY ic.numero
                UNION
                SELECT ec.id, ec.numero, "EGRESO ANTICIPO", CONCAT(pc.nombre," ",pc.apellido) cliente, ec.monto, ec.fecha_registro, "egreso" tipo
				FROM ec_caja ec INNER JOIN ec_caja_detalle ecd ON (ec.id = ecd.id_ec_caja) INNER JOIN anticipo a ON (ecd.id_anticipo = a.id) INNER JOIN paciente_cliente pc ON (a.id_paciente_cliente = pc.id)
				WHERE CONCAT(pc.nombre," ",pc.apellido) LIKE "%'.$cadena.'%" and CONVERT(ec.fecha_registro,DATE) BETWEEN "'.$fechaDesde.'" and "'.$fechaHasta.'"
				GROUP BY ec.numero;';

		$respuesta =$dao->ConsultarSqlNativo($sql);
		$total=0;
		$data = array();

		foreach ($respuesta as $row => $item){

			$sub_array = array(); 
			$sub_array[] = $item[0];
			if($item[6]=='ingreso'){
				$sub_array[] = "IC-".$item[1];
			}else{
				$sub_array[] = "EC-".$item[1];
			}
			$sub_array[] = $item[2];
			$sub_array[] = $item[3];
			$sub_array[] = number_format($item[4], 2, '.', '');
			$sub_array[] = $item[5];
                        
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

	if($_POST['Requerimiento'] == "CargarIngresosDetalle"){
		$dao = new Dao();
		
		$dao->Campo("id","");
		$dao->Campo("numero","");
		$dao->Campo("tipo","");
		$dao->Campo("monto","");
		$dao->Campo("tipo_pago","");

		$dao->Tabla("ic_caja","");
		$dao->Where("numero","'".$_POST['Numero']."'","");
		$dao->Ordenar("id");
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarDetalleFacturaPorAnticipo"){
		$dao = new Dao();
		
		$dao->Campo("c.numero","");
		$dao->Campo("c.total","");
		$dao->Campo("fp.monto_anticipo","");
		$dao->Campo("c.clave_sri","");

		$dao->TablasInnerAlias("forma_pago","fp","anticipo","a");
		$dao->TablasInnerAlias("forma_pago","fp","consulta","c");
		$dao->Where("a.id",$_POST['Anticipo'],"");
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}
}