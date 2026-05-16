<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){ 

	if($_POST['Requerimiento'] == "CargarCuadreResumido"){

		$dao = new Dao();
		$sql='';
		if($_POST['Tipo']==0){
			$sql =' SELECT * 
					FROM   (SELECT SUM(monto) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "EFECTIVO" AND c.id_punto_venta = '.$_POST['Punto'].') x,
					        (SELECT SUM(monto_cheque) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CHEQUE" AND c.id_punto_venta = '.$_POST['Punto'].') x2,
					        (SELECT SUM(monto_tarjeta) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "TARJETA" AND c.id_punto_venta = '.$_POST['Punto'].')x3,
					        (SELECT SUM(monto_anticipo) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "ANTICIPO" AND c.id_punto_venta = '.$_POST['Punto'].')x4,
					        (SELECT SUM(pago)
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CREDITO" AND c.id_punto_venta = '.$_POST['Punto'].')x5 ';
			if($_POST['Punto']==0){
				$sql =' SELECT * 
					FROM   (SELECT SUM(monto) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "EFECTIVO") x,
					        (SELECT SUM(monto_cheque) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CHEQUE") x2,
					        (SELECT SUM(monto_tarjeta) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "TARJETA")x3,
					        (SELECT SUM(monto_anticipo) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "ANTICIPO")x4,
					        (SELECT SUM(pago)
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CREDITO")x5 ';
			}	
		}else{
			$sql =' SELECT * 
					FROM   (SELECT SUM(monto) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "EFECTIVO" AND c.id_punto_venta = '.$_POST['Punto'].') x,
					        (SELECT SUM(monto_cheque) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CHEQUE" AND c.id_punto_venta = '.$_POST['Punto'].') x2,
					        (SELECT SUM(monto_tarjeta) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "TARJETA" AND c.id_punto_venta = '.$_POST['Punto'].')x3,
					        (SELECT SUM(monto_anticipo) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "ANTICIPO" AND c.id_punto_venta = '.$_POST['Punto'].')x4,
					        (SELECT SUM(pago)
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CREDITO" AND c.id_punto_venta = '.$_POST['Punto'].')x5 ';
			if($_POST['Punto']==0){
				$sql =' SELECT * 
					FROM   (SELECT SUM(monto) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "EFECTIVO") x,
					        (SELECT SUM(monto_cheque) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CHEQUE") x2,
					        (SELECT SUM(monto_tarjeta) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "TARJETA")x3,
					        (SELECT SUM(monto_anticipo) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "ANTICIPO")x4,
					        (SELECT SUM(pago)
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CREDITO")x5 ';
			}	
		}			        

		$dao->ConsultarSqlNativoAjax($sql);
	}

	if($_POST['Requerimiento'] == "CargarFacturasefectivo"){
		$sql='';
		$dao = new Dao();
		if($_POST['Tipo']==0){
			$sql =' SELECT c.numero,Concat(p.apellido," ",p.apellido_materno," ",p.nombre),c.fecha_registro,c.total,fp.monto
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="EFECTIVO" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_punto_venta = '.$_POST['Punto'];

			if($_POST['Punto']==0){
				$sql =' SELECT c.numero,Concat(p.apellido," ",p.apellido_materno," ",p.nombre),c.fecha_registro,c.total,fp.monto
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="EFECTIVO" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" ';
			}	
		}
		$dao->ConsultarSqlNativoAjax($sql);

	}

	if($_POST['Requerimiento'] == "CargarFacturasCheque"){
		
		$sql='';
		$dao = new Dao();
		if($_POST['Tipo']==0){
			$sql =' SELECT c.numero,Concat(p.apellido," ",p.apellido_materno," ",p.nombre),c.fecha_registro,c.total,fp.monto_cheque
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="CHEQUE" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_punto_venta = '.$_POST['Punto'];

			if($_POST['Punto']==0){
				$sql =' SELECT c.numero,Concat(p.apellido," ",p.apellido_materno," ",p.nombre),c.fecha_registro,c.total,fp.monto_cheque
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="CHEQUE" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" ';
			}	
		}
		$dao->ConsultarSqlNativoAjax($sql);

	}

	if($_POST['Requerimiento'] == "CargarFacturasVoucher"){
		
		$sql='';
		$dao = new Dao();
		if($_POST['Tipo']==0){
			$sql =' SELECT c.numero,Concat(p.apellido," ",p.apellido_materno," ",p.nombre),c.fecha_registro,c.total,fp.monto_tarjeta
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="TARJETA" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_punto_venta = '.$_POST['Punto'];

			if($_POST['Punto']==0){
				$sql =' SELECT c.numero,Concat(p.apellido," ",p.apellido_materno," ",p.nombre),c.fecha_registro,c.total,fp.monto_tarjeta
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="TARJETA" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" ';
			}	
		}
		$dao->ConsultarSqlNativoAjax($sql);

	}

	if($_POST['Requerimiento'] == "CargarFacturasAnticipo"){
		
		$sql='';
		$dao = new Dao();
		if($_POST['Tipo']==0){
			$sql =' SELECT c.numero,Concat(p.apellido," ",p.apellido_materno," ",p.nombre),c.fecha_registro,c.total,fp.monto_anticipo
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="ANTICIPO" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_punto_venta = '.$_POST['Punto'];

			if($_POST['Punto']==0){
				$sql =' SELECT c.numero,Concat(p.apellido," ",p.apellido_materno," ",p.nombre),c.fecha_registro,c.total,fp.monto_anticipo
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="ANTICIPO" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" ';
			}	
		}
		$dao->ConsultarSqlNativoAjax($sql);

	}

	if($_POST['Requerimiento'] == "CargarFacturasCredito"){
		
		$sql='';
		$dao = new Dao();
		if($_POST['Tipo']==0){
			$sql =' SELECT c.numero,Concat(p.apellido," ",p.apellido_materno," ",p.nombre),c.fecha_registro,c.total,SUM(fp.pago)
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="CREDITO" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_punto_venta = '.$_POST['Punto'].' GROUP BY c.id';

			if($_POST['Punto']==0){
				$sql =' SELECT c.numero,Concat(p.apellido," ",p.apellido_materno," ",p.nombre),c.fecha_registro,c.total,SUM(fp.pago)
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="CREDITO" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" GROUP BY c.id';
			}	
		}
		$dao->ConsultarSqlNativoAjax($sql);

	}

	if($_POST['Requerimiento'] == "GuardarAvance"){

		$datos = array("id_punto_venta"=>$_SESSION["puntoVenta"],
						"denominacion"=>$_POST["Denominacion"],
						"cantidad"=>$_POST["Cantidad"],
						"total"=>$_POST["Total"],
						"tipo"=>'AVANCE',
						"usuario_registro"=>$_SESSION["usuario"]);
		$dao= new Dao();
		$dao->GuardarAjax("caja",$datos);
	}
	if($_POST['Requerimiento'] == "GuardarFondo"){

		$datos = array("id_punto_venta"=>$_SESSION["puntoVenta"],
						"denominacion"=>$_POST["Denominacion"],
						"cantidad"=>$_POST["Cantidad"],
						"total"=>$_POST["Total"],
						"tipo"=>'FONDO',
						"usuario_registro"=>$_SESSION["usuario"]);
		$dao= new Dao();
		$dao->GuardarAjax("caja",$datos);
	}
	if($_POST['Requerimiento'] == "GuardarEfectivoCuadreDiario"){

		$datos = array("id_punto_venta"=>$_SESSION["puntoVenta"],
						"denominacion"=>$_POST["Denominacion"],
						"cantidad"=>$_POST["Cantidad"],
						"total"=>$_POST["Total"],
						"tipo"=>'EFECTIVO',
						"usuario_registro"=>$_SESSION["usuario"]);
		$dao= new Dao();
		$dao->GuardarAjax("caja",$datos);
	}
	function GuardarDetalle($idArqueo,$detalle){
		$array = json_decode($detalle,true);
		$jsondata = array();
		$j=0;
		$costoTotal=0;
		for($i=0; $i<sizeof($array); $i++) {
		  //$producto = json_decode($array[$i],true);
			$producto = $array[$i];
          	$datos = array("id_arqueo"=>$idArqueo,															
								"denominacion"=>$producto[0],
								"cantidad"=>$producto[1],								
								"total"=>$producto[2],
								"tipo"=>'EFECTIVO',
								"usuario_registro"=>$_SESSION["usuario"]								
								);
          $dao= new Dao();
	      $respuesta = $dao->Guardar("caja_arqueo",$datos,false);
	      if(!$respuesta[0]){	    	
	      	$jsondata[$j]="No se puedo guardar ".$producto[0];
	      	$j++;
		  }          
        }
                

        return $jsondata;
	}
	if($_POST['Requerimiento'] == "GuardarArqueo"){

		$datos = array("id_punto_venta"=>$_POST["Punto"],
						"diferencia"=>$_POST["Diferencia"],						
						"total"=>$_POST["Efectivo"],
						"id_estado"=>1,			
						"usuario_registro"=>$_SESSION["usuario"]);
		$dao= new Dao();
		$respuesta = $dao->Guardar("arqueo",$datos);
		if($respuesta[0]){

			$errores = GuardarDetalle($respuesta[1],$_POST["Detalle"]);
	    	if(sizeof($errores)>0){
	    		echo json_encode($errores, JSON_FORCE_OBJECT);	
	    	}else{	    		
	    		$jsondata = array();
	    		$jsondata[0]=true;	    		
	    		echo json_encode($jsondata, JSON_FORCE_OBJECT);	    			    		
	    	}

	    }else{
	    	echo json_encode($respuesta, JSON_FORCE_OBJECT);
	    }	
	}
	if($_POST['Requerimiento'] == "ActualizarEfectivoCuadreDiario"){

		$datos = array("id_punto_venta"=>$_POST["Punto"],
						"denominacion"=>$_POST["Denominacion"],
						"cantidad"=>$_POST["Cantidad"],
						"total"=>$_POST["Total"],
						"tipo"=>'EFECTIVO',
						"usuario_registro"=>$_SESSION["usuario"]);
		$dao= new Dao();
		$dao->GuardarAjax("caja",$datos);
	}
	if($_POST['Requerimiento'] == "GuardarEfectivoCuadreDiarioSupervisor"){

		$datos = array("id_punto_venta"=>$_POST["Punto"],
						"denominacion"=>$_POST["Denominacion"],
						"cantidad"=>$_POST["Cantidad"],
						"total"=>$_POST["Total"],
						"tipo"=>'EFECTIVO SUPERVISOR',
						"fecha_registro"=>date_format(date_create($_POST["Fecha"]),"Y-m-d H:i:s"),
						"usuario_registro"=>$_SESSION["usuario"]);
		$dao= new Dao();
		$dao->GuardarAjax("caja",$datos);
	}
	if($_POST['Requerimiento'] == "CargarAvance"){

		$dao= new Dao();

		//$dao->Campo("*","");

		$dao->Tabla("caja","");
		$dao->Where("tipo","'AVANCE'","and");
		$dao->Where("CONVERT(fecha_registro,DATE)","CURDATE()","AND");
		$dao->Where("id_punto_venta",$_SESSION['puntoVenta'],"");
		//$dao->Agrupar("HOUR(fecha_registro)");

		$dao->ConsultarAjax();
	}
	if($_POST['Requerimiento'] == "CargarAvanceAdmin"){

		$dao= new Dao();

		//$dao->Campo("*","");

		$dao->Tabla("caja","");
		$dao->Where("tipo","'AVANCE'","and");
		$dao->Where("CONVERT(fecha_registro,DATE)","'".$_POST["Fecha"]."'","AND");
		if($_POST['Punto']!=0){
			$dao->Where("id_punto_venta",$_POST['Punto'],"");
		}else{
			$dao->Where("1","1","");
		}
		
		//$dao->Agrupar("HOUR(fecha_registro)");

		$dao->ConsultarAjax();
	}
	if($_POST['Requerimiento'] == "CargarFondo"){

		$dao= new Dao();


		$dao->Tabla("caja","");
		$dao->Where("tipo","'FONDO'","and");
		$dao->Where("CONVERT(fecha_registro,DATE)","CURDATE()","AND");
		$dao->Where("id_punto_venta",$_SESSION['puntoVenta'],"");


		$dao->ConsultarAjax();
	}
	if($_POST['Requerimiento'] == "CargarFondoAdmin"){

		$dao= new Dao();


		$dao->Tabla("caja","");
		$dao->Where("tipo","'FONDO'","and");
		$dao->Where("CONVERT(fecha_registro,DATE)","'".$_POST["Fecha"]."'","AND");
		if($_POST['Punto']!=0){
			$dao->Where("id_punto_venta",$_POST['Punto'],"");
		}else{
			$dao->Where("1","1","");
		}


		$dao->ConsultarAjax();
	}
	if($_POST['Requerimiento'] == "CargarOtros"){

		$sql =' SELECT * 
					FROM   (SELECT SUM(monto),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = CURDATE() AND c.id_estado !=21 AND tipo = "EFECTIVO" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].') x,
					        (SELECT SUM(monto_cheque) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = CURDATE() AND c.id_estado !=21 AND tipo = "CHEQUE" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].') x2,
					        (SELECT SUM(monto_tarjeta),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = CURDATE() AND c.id_estado !=21 AND tipo = "TARJETA" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].')x3,
					        (SELECT SUM(monto_anticipo),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = CURDATE() AND c.id_estado !=21 AND tipo = "ANTICIPO" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].')x4,
					        (SELECT SUM(pago),COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = CURDATE() AND c.id_estado !=21 AND tipo = "CREDITO" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].')x5,
					        (SELECT SUM(valor_ingreso),COUNT(*)  FROM anticipo WHERE CONVERT(fecha_registro,Date) = CURDATE() AND id_punto_venta = '.$_SESSION['puntoVenta'].')x6,

					        (SELECT SUM(monto) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  CURDATE() AND c.id_estado !=21 AND tipo = "EFECTIVO" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].') x7,
					        (SELECT SUM(monto_cheque) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  CURDATE() AND c.id_estado !=21 AND tipo = "CHEQUE" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].') x8,
					        (SELECT SUM(monto_tarjeta),COUNT(*)  
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  CURDATE() AND c.id_estado !=21 AND tipo = "TARJETA" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].')x9,
					        (SELECT SUM(monto_anticipo),COUNT(*)  
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  CURDATE() AND c.id_estado !=21 AND tipo = "ANTICIPO" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].')x10,
					        (SELECT SUM(pago),COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  CURDATE() AND c.id_estado !=21 AND tipo = "CREDITO" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].')x11,
					        (SELECT SUM(monto_transferencia) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  CURDATE() AND c.id_estado !=21 AND tipo = "TRANSFERENCIA" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].') x12,

					        (SELECT SUM(monto_transferencia) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  CURDATE() AND c.id_estado !=21 AND tipo = "TRANSFERENCIA" AND c.id_punto_venta = '.$_SESSION['puntoVenta'].') x13,
					        (SELECT SUM(monto),COUNT(*)  FROM ic_caja  WHERE CONVERT(fecha_registro,Date) = CURDATE() AND id_punto_venta = '.$_SESSION['puntoVenta'].' AND tipo="ABONO" )x14,
					        (SELECT SUM(monto),COUNT(*)  FROM ec_caja   WHERE CONVERT(fecha_registro,Date) = CURDATE() AND id_punto_venta = '.$_SESSION['puntoVenta'].'  )x15,
					        (SELECT SUM(total),COUNT(*) FROM nc_consulta c WHERE CONVERT(c.fecha_registro,date) = CURDATE() AND  id_punto_venta = '.$_SESSION['puntoVenta'].'  )x16,
					        (SELECT SUM(total),COUNT(*) FROM nc_farmacia c WHERE CONVERT(c.fecha_registro,date) = CURDATE() AND  id_punto_venta = '.$_SESSION['puntoVenta'].'  )x17 ';
		
		$dao= new Dao();
		$dao->ConsultarSqlNativoAjax($sql);					        
		
	}

	if($_POST['Requerimiento'] == "CargarOtrosAdmin"){
		
		$sql='';

		if($_POST['Punto']!=0){
			$sql =' SELECT * 
					FROM   (SELECT SUM(monto),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "EFECTIVO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x,
					        (SELECT SUM(monto_cheque) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CHEQUE" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x2,
					        (SELECT SUM(monto_tarjeta),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "TARJETA" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x3,
					        (SELECT SUM(monto_anticipo),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "ANTICIPO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x4,
					        (SELECT SUM(pago),COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CREDITO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x5,
					        (SELECT SUM(valor_ingreso),COUNT(*)  FROM anticipo WHERE CONVERT(fecha_registro,Date) = "'.$_POST["Fecha"].'" AND id_punto_venta = '.$_POST['Punto'].')x6,

					        (SELECT SUM(monto) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "EFECTIVO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x7,
					        (SELECT SUM(monto_cheque) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "CHEQUE" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x8,
					        (SELECT SUM(monto_tarjeta),COUNT(*)  
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "TARJETA" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x9,
					        (SELECT SUM(monto_anticipo),COUNT(*)  
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "ANTICIPO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x10,
					        (SELECT SUM(pago),COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "CREDITO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x11,
					        (SELECT SUM(monto_transferencia) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "TRANSFERENCIA" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x12,

					        (SELECT SUM(monto_transferencia) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "TRANSFERENCIA" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x13,
					        (SELECT SUM(monto),COUNT(*)  FROM ic_caja  WHERE CONVERT(fecha_registro,Date) = "'.$_POST["Fecha"].'" AND id_punto_venta = '.$_POST['Punto'].' AND tipo="ABONO" )x14,
					        (SELECT SUM(monto),COUNT(*)  FROM ec_caja   WHERE CONVERT(fecha_registro,Date) = "'.$_POST["Fecha"].'" AND id_punto_venta = '.$_POST['Punto'].'  )x15,
					        (SELECT SUM(total),COUNT(*) FROM nc_consulta c WHERE CONVERT(c.fecha_registro,date) = "'.$_POST["Fecha"].'" AND  id_punto_venta = '.$_POST['Punto'].'  )x16,
					        (SELECT SUM(total),COUNT(*) FROM nc_farmacia c WHERE CONVERT(c.fecha_registro,date) = "'.$_POST["Fecha"].'" AND  id_punto_venta = '.$_POST['Punto'].'  )x17 ';
		}else{
			$sql =' SELECT * 
					FROM   (SELECT SUM(monto),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "EFECTIVO" AND c.id_estado !=21 ) x,
					        (SELECT SUM(monto_cheque) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CHEQUE" AND c.id_estado !=21 ) x2,
					        (SELECT SUM(monto_tarjeta),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "TARJETA" AND c.id_estado !=21 )x3,
					        (SELECT SUM(monto_anticipo),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "ANTICIPO" AND c.id_estado !=21 )x4,
					        (SELECT SUM(pago),COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) = "'.$_POST["Fecha"].'" AND tipo = "CREDITO" AND c.id_estado !=21 )x5,
					        (SELECT SUM(valor_ingreso),COUNT(*)  FROM anticipo WHERE CONVERT(fecha_registro,Date) = "'.$_POST["Fecha"].'" )x6,

					        (SELECT SUM(monto) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "EFECTIVO" AND c.id_estado !=21 ) x7,
					        (SELECT SUM(monto_cheque) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "CHEQUE" AND c.id_estado !=21 ) x8,
					        (SELECT SUM(monto_tarjeta),COUNT(*)  
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "TARJETA" AND c.id_estado !=21 )x9,
					        (SELECT SUM(monto_anticipo),COUNT(*)  
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "ANTICIPO" AND c.id_estado !=21 )x10,
					        (SELECT SUM(pago),COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "CREDITO" AND c.id_estado !=21 )x11,
					        (SELECT SUM(monto_transferencia) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "TRANSFERENCIA" AND c.id_estado !=21 ) x12,

					        (SELECT SUM(monto_transferencia) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) =  "'.$_POST["Fecha"].'" AND tipo = "TRANSFERENCIA" AND c.id_estado !=21 ) x13,
					        (SELECT SUM(monto),COUNT(*)  FROM ic_caja  WHERE CONVERT(fecha_registro,Date) = "'.$_POST["Fecha"].'"  AND tipo="ABONO" )x14,
					        (SELECT SUM(monto),COUNT(*)  FROM ec_caja   WHERE CONVERT(fecha_registro,Date) = "'.$_POST["Fecha"].'"   )x15,
					        (SELECT SUM(total),COUNT(*) FROM nc_consulta c WHERE CONVERT(c.fecha_registro,date) = "'.$_POST["Fecha"].'"  )x16,
					        (SELECT SUM(total),COUNT(*) FROM nc_farmacia c WHERE CONVERT(c.fecha_registro,date) = "'.$_POST["Fecha"].'"  )x17 ';
		}

		
		$dao= new Dao();
		$dao->ConsultarSqlNativoAjax($sql);					        
		
	}

	if($_POST['Requerimiento'] == "CargarEfectivoCajero"){

		$dao= new Dao();


		$dao->Tabla("caja","");
		$dao->Where("tipo","'EFECTIVO'","and");
		$dao->Where("CONVERT(fecha_registro,DATE)","CURDATE()","AND");
		$dao->Where("id_punto_venta",$_SESSION['puntoVenta'],"");
		


		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarEfectivoCajeroAdmin"){

		$dao= new Dao();


		$dao->Tabla("caja","");
		$dao->Where("tipo","'EFECTIVO'","and");
		$dao->Where("CONVERT(fecha_registro,DATE)","'".$_POST["Fecha"]."'","AND");
		if($_POST['Punto']!=0){
			$dao->Where("id_punto_venta",$_POST['Punto'],"");
		}else{
			$dao->Where("1","1","");
		}


		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarEfectivoSupervisorAdmin"){

		$dao= new Dao();


		$dao->Tabla("caja","");
		$dao->Where("tipo","'EFECTIVO SUPERVISOR'","and");
		$dao->Where("CONVERT(fecha_registro,DATE)","'".$_POST["Fecha"]."'","AND");
		if($_POST['Punto']!=0){
			$dao->Where("id_punto_venta",$_POST['Punto'],"");
		}else{
			$dao->Where("1","1","");
		}


		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarFacturasChequeCajero"){
		
		$sql='';
		$dao = new Dao();
		
			$sql ='SELECT * FROM ( SELECT c.numero,b.prefijo,c.total,fp.monto_cheque
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN banco b ON (b.id=fp.id_banco)
					WHERE fp.tipo ="CHEQUE" AND CONVERT(c.fecha_registro,Date) = CURDATE() AND c.id_punto_venta = '.$_SESSION['puntoVenta'].'
					UNION
					SELECT c.numero,b.prefijo,c.total,fp.monto_cheque
					FROM farmacia c INNER JOIN forma_pago fp ON (c.id=fp.id_farmacia)
							INNER JOIN banco b ON (b.id=fp.id_banco)
					WHERE fp.tipo ="CHEQUE" AND CONVERT(c.fecha_registro,Date) = CURDATE() AND c.id_punto_venta ='.$_SESSION['puntoVenta'].'
					) x ORDER BY x.prefijo';

				
		
		$dao->ConsultarSqlNativoAjax($sql);

	}
	if($_POST['Requerimiento'] == "CargarFacturasChequeCajeroAdmin"){
		
		$sql='';
		$dao = new Dao();
		
			$sql ='SELECT * FROM ( SELECT c.numero,b.prefijo,c.total,fp.monto_cheque
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN banco b ON (b.id=fp.id_banco)
					WHERE fp.tipo ="CHEQUE" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_punto_venta = '.$_POST['Punto'].'
					UNION
					SELECT c.numero,b.prefijo,c.total,fp.monto_cheque
					FROM farmacia c INNER JOIN forma_pago fp ON (c.id=fp.id_farmacia)
							INNER JOIN banco b ON (b.id=fp.id_banco)
					WHERE fp.tipo ="CHEQUE" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_punto_venta ='.$_POST['Punto'].'
					) x ORDER BY x.prefijo';

				
		
		$dao->ConsultarSqlNativoAjax($sql);

	}
	if($_POST['Requerimiento'] == "CargarFacturasTarjetaCajero"){
		
		$sql='';
		$dao = new Dao();
		
		$sql ='SELECT * FROM (  SELECT c.numero,t.nombre,c.total,fp.monto_tarjeta
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN tarjeta t ON (t.id=fp.entidad_emisora_tarjeta)
					WHERE fp.tipo ="TARJETA" AND CONVERT(c.fecha_registro,Date) = CURDATE() AND c.id_estado !=21 AND c.id_punto_venta = '.$_SESSION['puntoVenta'].'
				UNION 
				SELECT c.numero,t.nombre,c.total,fp.monto_tarjeta
					FROM farmacia c INNER JOIN forma_pago fp ON (c.id=fp.id_farmacia)
						 INNER JOIN tarjeta t ON (t.id=fp.entidad_emisora_tarjeta)
					WHERE fp.tipo ="TARJETA" AND CONVERT(c.fecha_registro,Date) = CURDATE() AND c.id_estado !=21 AND c.id_punto_venta ='.$_SESSION['puntoVenta'].'
				) x ORDER BY x.nombre';
				
		
		$dao->ConsultarSqlNativoAjax($sql);

	}
	if($_POST['Requerimiento'] == "CargarFacturasTarjetaCajeroAdmin"){
		
		$sql='';
		$dao = new Dao();
		
		$sql ='SELECT * FROM (  SELECT c.numero,t.nombre,c.total,fp.monto_tarjeta
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN tarjeta t ON (t.id=fp.entidad_emisora_tarjeta)
					WHERE fp.tipo ="TARJETA" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].'
				UNION 
				SELECT c.numero,t.nombre,c.total,fp.monto_tarjeta
					FROM farmacia c INNER JOIN forma_pago fp ON (c.id=fp.id_farmacia)
						 INNER JOIN tarjeta t ON (t.id=fp.entidad_emisora_tarjeta)
					WHERE fp.tipo ="TARJETA" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_estado !=21 AND c.id_punto_venta ='.$_POST['Punto'].'
				) x ORDER BY x.nombre';
				
		
		$dao->ConsultarSqlNativoAjax($sql);

	}
	if($_POST['Requerimiento'] == "CargarFacturasAnticipoCajero"){
		
		$sql='';
		$dao = new Dao();
		
		$sql =' SELECT c.numero,c.total,fp.monto_anticipo
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="ANTICIPO" AND CONVERT(c.fecha_registro,Date) =  CURDATE() AND c.id_estado !=21 AND c.id_punto_venta = '.$_SESSION['puntoVenta'].' UNION 
					SELECT c.numero,c.total,fp.monto_anticipo
					FROM farmacia c INNER JOIN forma_pago fp ON (c.id=fp.id_farmacia)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="ANTICIPO" AND CONVERT(c.fecha_registro,Date) =  CURDATE() AND c.id_estado !=21 AND c.id_punto_venta = '.$_SESSION['puntoVenta'];
		
		$dao->ConsultarSqlNativoAjax($sql);

	}
	if($_POST['Requerimiento'] == "CargarFacturasAnticipoCajeroAdmin"){
		
		$sql='';
		$dao = new Dao();
		
		$sql =' SELECT c.numero,c.total,fp.monto_anticipo
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="ANTICIPO" AND CONVERT(c.fecha_registro,Date) =  "'.$_POST["Fecha"].'" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].' UNION 
					SELECT c.numero,c.total,fp.monto_anticipo
					FROM farmacia c INNER JOIN forma_pago fp ON (c.id=fp.id_farmacia)
						 INNER JOIN paciente p ON (p.id=c.id_paciente)
					WHERE fp.tipo ="ANTICIPO" AND CONVERT(c.fecha_registro,Date) =  "'.$_POST["Fecha"].'" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'];
		
		$dao->ConsultarSqlNativoAjax($sql);

	}
	if($_POST['Requerimiento'] == "CargarFacturasCreditoCajero"){
		
		$sql='';
		$dao = new Dao();
		
		$sql ='SELECT c.numero,c.total,SUM(fp.pago)
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)						 
					WHERE fp.tipo ="CREDITO" AND CONVERT(c.fecha_registro,Date) = CURDATE() AND c.id_estado !=21 AND c.id_punto_venta = '.$_SESSION['puntoVenta'].' GROUP BY c.id 
					UNION 
					 SELECT c.numero,c.total,SUM(fp.pago)
					FROM farmacia c INNER JOIN forma_pago fp ON (c.id=fp.id_farmacia)					
					WHERE fp.tipo ="CREDITO" AND CONVERT(c.fecha_registro,Date) = CURDATE() AND c.id_estado !=21 AND c.id_punto_venta = '.$_SESSION['puntoVenta'].' GROUP BY c.id ';
		
		$dao->ConsultarSqlNativoAjax($sql);

	}
	if($_POST['Requerimiento'] == "CargarFacturasCreditoCajeroAdmin"){
		
		$sql='';
		$dao = new Dao();
		
		$sql ='SELECT c.numero,c.total,SUM(fp.pago)
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)						 
					WHERE fp.tipo ="CREDITO" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].' GROUP BY c.id 
					UNION 
					 SELECT c.numero,c.total,SUM(fp.pago)
					FROM farmacia c INNER JOIN forma_pago fp ON (c.id=fp.id_farmacia)					
					WHERE fp.tipo ="CREDITO" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].' GROUP BY c.id ';
		
		$dao->ConsultarSqlNativoAjax($sql);

	}
	if($_POST['Requerimiento'] == "CargarTransferenciasCajero"){
		
		$sql='';
		$dao = new Dao();
		
			$sql ='SELECT * FROM ( SELECT c.numero,b.prefijo,c.total,fp.monto_transferencia
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN banco b ON (b.id=fp.id_banco)
					WHERE fp.tipo ="TRANSFERENCIA" AND CONVERT(c.fecha_registro,Date) = CURDATE() AND c.id_estado !=21 AND c.id_punto_venta = '.$_SESSION['puntoVenta'].'
					UNION
					SELECT c.numero,b.prefijo,c.total,fp.monto_transferencia
					FROM farmacia c INNER JOIN forma_pago fp ON (c.id=fp.id_farmacia)
							INNER JOIN banco b ON (b.id=fp.id_banco)
					WHERE fp.tipo ="TRANSFERENCIA" AND CONVERT(c.fecha_registro,Date) = CURDATE() AND c.id_estado !=21 AND c.id_punto_venta ='.$_SESSION['puntoVenta'].'
					) x ORDER BY x.prefijo';

				
		
		$dao->ConsultarSqlNativoAjax($sql);

	}

	if($_POST['Requerimiento'] == "CargarTransferenciasCajeroAdmin"){
		
		$sql='';
		$dao = new Dao();
		
			$sql ='SELECT * FROM ( SELECT c.numero,b.prefijo,c.total,fp.monto_transferencia
					FROM consulta c INNER JOIN forma_pago fp ON (c.id=fp.id_consulta)
						 INNER JOIN banco b ON (b.id=fp.id_banco)
					WHERE fp.tipo ="TRANSFERENCIA" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].'
					UNION
					SELECT c.numero,b.prefijo,c.total,fp.monto_transferencia
					FROM farmacia c INNER JOIN forma_pago fp ON (c.id=fp.id_farmacia)
							INNER JOIN banco b ON (b.id=fp.id_banco)
					WHERE fp.tipo ="TRANSFERENCIA" AND CONVERT(c.fecha_registro,Date) = "'.$_POST["Fecha"].'" AND c.id_estado !=21 AND c.id_punto_venta ='.$_POST['Punto'].'
					) x ORDER BY x.prefijo';

				
		
		$dao->ConsultarSqlNativoAjax($sql);

	}

	if($_POST['Requerimiento'] == "CargarIcAnticipoCajero"){
		
		$dao= new Dao();

	    $dao->Campo("Concat('IC','-',numero)","");
	    $dao->Campo("monto","");
	    $dao->Campo("tipo_pago","");
	    
		$dao->Tabla("ic_caja","");
		$dao->Where("id_punto_venta",$_SESSION['puntoVenta'],"and");
		$dao->Where("tipo","'ANTICIPO'","AND");
		$dao->Where("CONVERT(fecha_registro,Date)","CURDATE()","");
		$dao->Ordenar("tipo_pago");
		

		$dao->ConsultarAjax();

	}
	if($_POST['Requerimiento'] == "CargarIcAnticipoCajeroAdmin"){
		
		$dao= new Dao();

	    $dao->Campo("Concat('IC','-',numero)","");
	    $dao->Campo("monto","");
	    $dao->Campo("tipo_pago","");
	    
		$dao->Tabla("ic_caja","");
		$dao->Where("id_punto_venta",$_POST['Punto'],"and");
		$dao->Where("tipo","'ANTICIPO'","AND");
		$dao->Where("CONVERT(fecha_registro,Date)","'".$_POST["Fecha"]."'","");
		$dao->Ordenar("tipo_pago");
		

		$dao->ConsultarAjax();

	}

	if($_POST['Requerimiento'] == "CargarAbonosCajero"){
		
		$dao= new Dao();

	    $dao->Campo("Concat('IC','-',numero)","");
	    $dao->Campo("monto","");
	    $dao->Campo("tipo_pago","");
	    
		$dao->Tabla("ic_caja","");
		$dao->Where("id_punto_venta",$_SESSION['puntoVenta'],"and");
		$dao->Where("tipo","'ABONO'","AND");
		$dao->Where("CONVERT(fecha_registro,Date)","CURDATE()","");
		$dao->Ordenar("tipo_pago");
		

		$dao->ConsultarAjax();

	}

	if($_POST['Requerimiento'] == "CargarAbonosCajeroAdmin"){
		
		$dao= new Dao();

	    $dao->Campo("Concat('IC','-',numero)","");
	    $dao->Campo("monto","");
	    $dao->Campo("tipo_pago","");
	    
		$dao->Tabla("ic_caja","");
		$dao->Where("id_punto_venta",$_POST['Punto'],"and");
		$dao->Where("tipo","'ABONO'","AND");
		$dao->Where("CONVERT(fecha_registro,Date)","'".$_POST["Fecha"]."'","");
		$dao->Ordenar("tipo_pago");
		

		$dao->ConsultarAjax();

	}

	if($_POST['Requerimiento'] == "CargarEgresos"){
		
		$dao= new Dao();

	    $dao->Campo("Concat('EC','-',numero)","");
	    $dao->Campo("monto","");
	    $dao->Campo("'EFECTIVO'","");
	    
		$dao->Tabla("ec_caja","");
		$dao->Where("id_punto_venta",$_SESSION['puntoVenta'],"and");
		$dao->Where("CONVERT(fecha_registro,Date)","CURDATE()","");
		
		

		$dao->ConsultarAjax();

	}

	if($_POST['Requerimiento'] == "CargarEgresosAdmin"){
		
		$dao= new Dao();

	    $dao->Campo("Concat('EC','-',numero)","");
	    $dao->Campo("monto","");
	    $dao->Campo("'EFECTIVO'","");
	    
		$dao->Tabla("ec_caja","");
		$dao->Where("id_punto_venta",$_POST['Punto'],"and");
		$dao->Where("CONVERT(fecha_registro,Date)","'".$_POST["Fecha"]."'","");
		
		

		$dao->ConsultarAjax();

	}
	if($_POST['Requerimiento'] == "CargarNotaCredito"){
		
		$dao= new Dao();

	    $dao->Campo("nc.numero","");
	    $dao->Campo("c.numero","");
	    $dao->Campo("nc.total","");
	    
		$dao->TablasInnerAlias("nc_consulta","nc","consulta","c");
		$dao->Where("nc.id_punto_venta",$_SESSION['puntoVenta'],"and");
		$dao->Where("CONVERT(nc.fecha_registro,Date)","CURDATE()","");
		
		

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());

	}

	if($_POST['Requerimiento'] == "CargarNotaCreditof"){
		
		$dao= new Dao();

	    $dao->Campo("nc.numero","");
	    $dao->Campo("c.numero","");
	    $dao->Campo("nc.total","");
	    
		$dao->TablasInnerAlias("nc_farmacia","nc","farmacia","c");
		$dao->Where("nc.id_punto_venta",$_SESSION['puntoVenta'],"and");
		$dao->Where("CONVERT(nc.fecha_registro,Date)","CURDATE()","");
		
		

		$dao->ConsultarAjax();

	}

	if($_POST['Requerimiento'] == "CargarNotaCreditoAdmin"){
		
		$dao= new Dao();

	    $dao->Campo("nc.numero","");
	    $dao->Campo("c.numero","");
	    $dao->Campo("nc.total","");
	    
		$dao->TablasInnerAlias("nc_consulta","nc","consulta","c");
		$dao->Where("nc.id_punto_venta",$_POST['Punto'],"and");
		$dao->Where("CONVERT(nc.fecha_registro,Date)","'".$_POST["Fecha"]."'","");
		
		

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());

	}

	if($_POST['Requerimiento'] == "CargarNotaCreditofAdmin"){
		
		$dao= new Dao();

	    $dao->Campo("nc.numero","");
	    $dao->Campo("c.numero","");
	    $dao->Campo("nc.total","");
	    
		$dao->TablasInnerAlias("nc_farmacia","nc","farmacia","c");
		$dao->Where("nc.id_punto_venta",$_POST['Punto'],"and");
		$dao->Where("CONVERT(nc.fecha_registro,Date)","'".$_POST["Fecha"]."'","");
		
		

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());

	}

	if($_POST['Requerimiento'] == "EliminarEfectivoCajero"){
		
		$dao= new Dao();
		$dao->Eliminar("caja","tipo='EFECTIVO' AND CONVERT(fecha_registro,Date)='".$_POST['Fecha']."' AND id_punto_venta = ".$_POST['Punto']);

	}

	if($_POST['Requerimiento'] == "CargarPuntos"){
		
		$dao = new Dao();

		$dao->Campo("pv.id","");
		$dao->Campo("pv.nombre","");
		$dao->Campo("u.usuario","");

		$dao->TablasInnerAlias("usuario","u","punto_venta","pv");
		$dao->TablasInnerAlias("punto_venta","pv","punto_emision","pe");
		$dao->Where("pv.id_estado","1","and");
		$dao->In_Diferente("pv.id","1","");
		$dao->Ordenar("u.usuario");

		$dao->ConsultarAjax();

	}

	if($_POST['Requerimiento'] == "CargarInformeResumido"){
		
		$sql =' SELECT * 
					FROM   (SELECT SUM(monto),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "EFECTIVO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x,
					        (SELECT SUM(monto_cheque) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "CHEQUE" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x2,
					        (SELECT SUM(monto_tarjeta),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "TARJETA" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x3,
					        (SELECT SUM(monto_anticipo),COUNT(*)  
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "ANTICIPO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x4,
					        (SELECT SUM(pago),COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "CREDITO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x5,
					        (SELECT SUM(valor_ingreso),COUNT(*)  FROM anticipo WHERE CONVERT(fecha_registro,Date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND id_punto_venta = '.$_POST['Punto'].')x6,

					        (SELECT SUM(monto) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN  "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "EFECTIVO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x7,
					        (SELECT SUM(monto_cheque) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN  "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "CHEQUE" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x8,
					        (SELECT SUM(monto_tarjeta),COUNT(*)  
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN  "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "TARJETA" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x9,
					        (SELECT SUM(monto_anticipo),COUNT(*)  
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN  "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "ANTICIPO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x10,
					        (SELECT SUM(pago),COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN  "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "CREDITO" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].')x11,
					        (SELECT SUM(monto_transferencia) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN consulta c ON(fp.id_consulta=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN  "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "TRANSFERENCIA" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x12,

					        (SELECT SUM(monto_transferencia) ,COUNT(*) 
					        FROM forma_pago fp INNER JOIN farmacia c ON(fp.id_farmacia=c.id)
					        WHERE CONVERT(fp.fecha_registro,date) BETWEEN  "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND tipo = "TRANSFERENCIA" AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x13,
					        (SELECT SUM(monto),COUNT(*)  FROM ic_caja  WHERE CONVERT(fecha_registro,Date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND id_punto_venta = '.$_POST['Punto'].' AND tipo="ABONO" )x14,
					        (SELECT SUM(monto),COUNT(*)  FROM ec_caja   WHERE CONVERT(fecha_registro,Date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND id_punto_venta = '.$_POST['Punto'].'  )x15,
					        (SELECT SUM(total),COUNT(*) FROM nc_consulta c WHERE CONVERT(c.fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND  id_punto_venta = '.$_POST['Punto'].'  )x16,
					        (SELECT SUM(total) FROM caja WHERE tipo = "AVANCE" AND CONVERT(fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND id_punto_venta = '.$_POST['Punto'].'  )x17,
					        (SELECT SUM(total) FROM caja WHERE tipo = "EFECTIVO" AND CONVERT(fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND id_punto_venta = '.$_POST['Punto'].'  )x18,
					        (SELECT SUM(total),COUNT(*) FROM nc_farmacia c WHERE CONVERT(c.fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND  id_punto_venta = '.$_POST['Punto'].'  )x19,
					        (SELECT SUM(total) FROM caja WHERE tipo = "EFECTIVO SUPERVISOR" AND CONVERT(fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND id_punto_venta = '.$_POST['Punto'].'  )x20,
					        (SELECT SUM(c.descuento) descu,COUNT(*)  
					        FROM consulta c 
					        WHERE CONVERT(c.fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'"  AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x21,
					        (SELECT SUM(c.descuento) descu,COUNT(*)  
					        FROM farmacia c 
					        WHERE CONVERT(c.fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'"  AND c.id_estado !=21 AND c.id_punto_venta = '.$_POST['Punto'].') x22 ';
		
		$dao= new Dao();
		$dao->ConsultarSqlNativoAjax($sql);					       

	}

	if($_POST['Requerimiento'] == "CargarInformeDetallado"){
		
		$sql =' SELECT c.fecha_registro,CONCAT(c.numero," - ","CON"),CONCAT(p.apellido," ",p.nombre),c.descuento,c.total,fp.*
				FROM consulta c INNER JOIN paciente_cliente p ON (p.id = c.id_paciente_cliente)
				INNER JOIN forma_pago fp ON (fp.id_consulta=c.id)
				WHERE c.id_estado !=21 AND CONVERT(c.fecha_registro,date) = "'.$_POST["Fecha"].'" AND c.id_punto_venta ='.$_POST['Punto'].' 
				UNION
				SELECT c.fecha_registro,CONCAT(c.numero," - ","FAR"),CONCAT(p.apellido," ",p.nombre),c.descuento,c.total,fp.*
				FROM farmacia c INNER JOIN paciente_cliente p ON (p.id = c.id_paciente_cliente)
				INNER JOIN forma_pago fp ON (fp.id_farmacia=c.id)
				WHERE c.id_estado !=21 AND CONVERT(c.fecha_registro,date) = "'.$_POST["Fecha"].'" AND c.id_punto_venta ='.$_POST['Punto'].' 
				UNION
				SELECT c.fecha_registro,CONCAT(c.numero," - ","NC-CON"),CONCAT(p.apellido," ",p.nombre),c.descuento,c.total,"","","",""
				,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
				FROM nc_consulta c INNER JOIN paciente_cliente p ON (p.id = c.id_paciente_cliente)
				WHERE c.id_estado !=21 AND CONVERT(c.fecha_registro,date) = "'.$_POST["Fecha"].'" AND c.id_punto_venta ='.$_POST['Punto'].' 
				UNION
				SELECT c.fecha_registro,CONCAT(c.numero," - ","NC-FAR"),CONCAT(p.apellido," ",p.nombre),c.descuento,c.total,"","","",""
				,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
				FROM nc_farmacia c INNER JOIN paciente_cliente p ON (p.id = c.id_paciente_cliente)
				WHERE c.id_estado !=21 AND CONVERT(c.fecha_registro,date) = "'.$_POST["Fecha"].'" AND c.id_punto_venta ='.$_POST['Punto'].'
				UNION
				SELECT i.fecha_registro,CONCAT(i.numero," - ","IC"),CONCAT(p.apellido," ",p.nombre),i.tipo,i.monto,i.tipo_pago,"","",""
				,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
				FROM ic_caja i INNER JOIN anticipo a ON(a.id = i.id_anticipo)
				INNER JOIN paciente_cliente p ON (p.id=a.id_paciente_cliente)
				WHERE  CONVERT(i.fecha_registro,date) = "'.$_POST["Fecha"].'" AND i.id_punto_venta ='.$_POST['Punto'].'
				
				UNION

				SELECT i.fecha_registro,CONCAT(i.numero," - ","IC"),CONCAT(p.apellido," ",p.nombre),i.tipo,i.monto,i.tipo_pago,"","",""
				,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
				FROM ic_caja i INNER JOIN ic_abonos a ON(a.id_ic_caja = i.id)
				INNER JOIN forma_pago fp ON (fp.id = a.id_forma_pago)
				INNER JOIN consulta c ON (fp.id_consulta=c.id)
				INNER JOIN paciente_cliente p ON (c.id_paciente_cliente = p.id)
				WHERE  CONVERT(i.fecha_registro,date) = "'.$_POST["Fecha"].'" AND i.id_punto_venta ='.$_POST['Punto'].'

				UNION

				SELECT i.fecha_registro,CONCAT(i.numero," - ","IC"),CONCAT(p.apellido," ",p.nombre),i.tipo,i.monto,i.tipo_pago,"","",""
				,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
				FROM ic_caja i INNER JOIN ic_abonos a ON(a.id_ic_caja = i.id)
				INNER JOIN forma_pago fp ON (fp.id = a.id_forma_pago)
				INNER JOIN farmacia c ON (fp.id_farmacia=c.id)
				INNER JOIN paciente_cliente p ON (c.id_paciente_cliente = p.id)
				WHERE  CONVERT(i.fecha_registro,date) = "'.$_POST["Fecha"].'" AND i.id_punto_venta ='.$_POST['Punto'].'
				
				UNION

				SELECT e.fecha_registro,CONCAT(e.numero," - ","EC"),CONCAT(p.apellido," ",p.nombre),"DEVOLUCION",e.monto,"EFECTIVO","","",""
				,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","" 
				FROM ec_caja e INNER JOIN ec_caja_detalle ed ON (e.id = ed.id_ec_caja)
				INNER JOIN anticipo a ON (a.id = ed.id_anticipo)
				INNER JOIN paciente_cliente p ON (p.id=a.id_paciente_cliente)
				WHERE  CONVERT(e.fecha_registro,date) = "'.$_POST["Fecha"].'" AND e.id_punto_venta ='.$_POST['Punto'].'

				';
		
		$dao= new Dao();
		$dao->ConsultarSqlNativoAjax($sql);					       

	}

	if($_POST['Requerimiento'] == "CargarInformeDetallado2"){
		
		$sql =' SELECT * FROM (

				SELECT CONVERT(c.fecha_registro,date) f1,c.numero,c.clave_sri,CONCAT(p.apellido," ",p.nombre),c.total cst,c.descuento,0,c.total ct
				FROM consulta c INNER JOIN paciente_cliente p ON (p.id = c.id_paciente_cliente)
				
				WHERE c.id_estado !=21 AND  CONVERT(c.fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND c.id_punto_venta ='.$_POST['Punto'].' 
				UNION
				SELECT CONVERT(c.fecha_registro,date) f1,c.numero,c.clave_sri,CONCAT(p.apellido," ",p.nombre),c.total-c.total_iva,c.descuento,c.total_iva,c.total ft
				FROM farmacia c INNER JOIN paciente_cliente p ON (p.id = c.id_paciente_cliente)
				
				WHERE c.id_estado !=21 AND  CONVERT(c.fecha_registro,date) BETWEEN "'.$_POST["FechaI"].'" AND "'.$_POST["FechaF"].'" AND c.id_punto_venta ='.$_POST['Punto'].' 
														
				) x
				ORDER BY x.f1
				';
		
		$dao= new Dao();
		$dao->ConsultarSqlNativoAjax($sql);					       

	}
}