<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){ 

	if($_POST['Requerimiento'] == "CargarFacturasCabecera"){
		$dao = new Dao();
		$sql =' SELECT "FV",c.numero,Date_format(c.fecha_registro,"%d/%m/%Y"),Date_format(c.fecha_registro,"%H:%i"),"N",
						cli.nombre,cli.apellido,cli.direccion,cli.telefono,cli.ruc,c.total,"0","0","0",
				        Date_format(DATE_ADD(c.fecha_registro,INTERVAL 1 DAY),"%d/%m/%Y"),"0","0","0","0","0","0","0","0","0","","","0","","",
				        "","","","","","","","","S",c.clave_sri,c.clave_sri,Date_format(c.fecha_registro,"%d/%m/%Y"),
				        e.cedula,u.usuario,cli.email,"A",concat(p.apellido," ",p.apellido_materno," ",p.nombre)
				FROM consulta c INNER JOIN paciente_cliente cli ON(cli.id=c.id_paciente_cliente)
				INNER JOIN punto_venta pv ON (c.id_punto_venta=pv.id)
				INNER JOIN usuario u ON (u.id_punto_venta = pv.id)
				INNER JOIN empleado e ON (e.id = u.id_empleado)
				INNER JOIN paciente p ON (p.id =c.id_paciente)
				WHERE c.fecha_registro BETWEEN "'.$_POST["Desde"].'" AND "'.$_POST["Hasta"].'" 
				UNION
				SELECT "FV",c.numero,Date_format(c.fecha_registro,"%d/%m/%Y"),Date_format(c.fecha_registro,"%H:%i"),"N",
						cli.nombre,cli.apellido,cli.direccion,cli.telefono,cli.ruc,c.total,"0","0","0",
				        Date_format(DATE_ADD(c.fecha_registro,INTERVAL 1 DAY),"%d/%m/%Y"),"0","0","0","0","0","0","0","0","0","","","0","","",
				        "","","","","","","","","S",c.clave_sri,c.clave_sri,Date_format(c.fecha_registro,"%d/%m/%Y"),
				        e.cedula,u.usuario,cli.email,"A",concat(p.apellido," ",p.apellido_materno," ",p.nombre)
				FROM farmacia c INNER JOIN paciente_cliente cli ON(cli.id=c.id_paciente_cliente)
				INNER JOIN punto_venta pv ON (c.id_punto_venta=pv.id)
				INNER JOIN usuario u ON (u.id_punto_venta = pv.id)
				INNER JOIN empleado e ON (e.id = u.id_empleado)
				INNER JOIN paciente p ON (p.id =c.id_paciente)
				WHERE c.fecha_registro BETWEEN "'.$_POST["Desde"].'" AND "'.$_POST["Hasta"].'" ';		

		$dao->ConsultarSqlNativoAjax($sql);
	}

	if($_POST['Requerimiento'] == "CargarFacturasDetalle"){
		$dao = new Dao();
		$sql =' SELECT "FV",c.numero,Concat("CON","",p.id) codigo,Concat(e.nombre,"-",p.nombre,"-",m.apellidos," ",m.nombres),
				"CONSULTAS MEDICAS","UND","1" cantidad,ci.precio,ci.descuento,"N","","","","","","2"
				FROM consulta c INNER JOIN consulta_item ci ON(ci.id_consulta=c.id)
				INNER JOIN procedimiento p ON (p.id=ci.id_procedimiento)
                INNER JOIN especialidad e ON (e.id = p.id_especialidad)
                INNER JOIN empleado m ON (m.id=ci.id_empleado)
				WHERE c.fecha_registro BETWEEN "'.$_POST["Desde"].'" AND "'.$_POST["Hasta"].'" 
				UNION
				SELECT "FV",c.numero,Concat("LAB","",p.id) codigo,Concat(e.nombre,"-",p.nombre,"-",m.apellidos," ",m.nombres),
				"LABORATORIO","UND","1" cantidad,ci.precio,ci.descuento,"N","","","","","","2"
				FROM consulta c INNER JOIN consulta_item ci ON(ci.id_consulta=c.id)
				INNER JOIN procedimiento_laboratorio p ON (p.id=ci.id_procedimiento_laboratorio)
                INNER JOIN entidad e ON (e.id = p.id_entidad)
                INNER JOIN empleado m ON (m.id=ci.id_empleado) 
                WHERE c.fecha_registro BETWEEN "'.$_POST["Desde"].'" AND "'.$_POST["Hasta"].'" 
                UNION
                SELECT "FV",c.numero,Concat("RX","",p.id) codigo,Concat("RADIOLOGIA -",p.nombre,"-",m.apellidos," ",m.nombres),
				"RX - RADIOLOGIA","UND","1" cantidad,ci.precio,ci.descuento,"N","","","","","","2"
				FROM consulta c INNER JOIN consulta_item ci ON(ci.id_consulta=c.id)
				INNER JOIN procedimiento_rx p ON (p.id=ci.id_procedimiento_rx)                
                INNER JOIN empleado m ON (m.id=ci.id_empleado)
                WHERE c.fecha_registro BETWEEN "'.$_POST["Desde"].'" AND "'.$_POST["Hasta"].'" 
                UNION
                SELECT "FV",c.numero,Concat("ECO","",p.id) codigo,Concat("ECOGRAFIA -",p.nombre,"-",m.apellidos," ",m.nombres),
				"ECOGRAFIA","UND","1" cantidad,ci.precio,ci.descuento,"N","","","","","","2"
				FROM consulta c INNER JOIN consulta_item ci ON(ci.id_consulta=c.id)
				INNER JOIN procedimiento_eco p ON (p.id=ci.id_procedimiento_eco)                
                INNER JOIN empleado m ON (m.id=ci.id_empleado) 
                WHERE c.fecha_registro BETWEEN "'.$_POST["Desde"].'" AND "'.$_POST["Hasta"].'" 
                UNION
                SELECT "FV",c.numero,Concat("ECO","",p.id) codigo,Concat("TAC/RMN -",p.nombre,"-",m.apellidos," ",m.nombres),
				"TAC/RMN","UND","1" cantidad,ci.precio,ci.descuento,"N","","","","","","2"
				FROM consulta c INNER JOIN consulta_item ci ON(ci.id_consulta=c.id)
				INNER JOIN procedimiento_tomo p ON (p.id=ci.id_procedimiento_tomo)                
                INNER JOIN empleado m ON (m.id=ci.id_empleado) 
                WHERE c.fecha_registro BETWEEN "'.$_POST["Desde"].'" AND "'.$_POST["Hasta"].'" 
                UNION
                SELECT "FV",c.numero,p.id,p.nombre,
				case p.iva  when "S" then "MEDICINAS 12%"  when "N" then "MEDICINAS 0%"  end  ,"UND",ci.cantidad,ci.precio,ci.descuento,p.iva,"","","","","","2"
				FROM farmacia c INNER JOIN farmacia_item ci ON(ci.id_farmacia=c.id)
				INNER JOIN inventario p ON (p.id=ci.id_inventario)     
				WHERE c.fecha_registro BETWEEN "'.$_POST["Desde"].'" AND "'.$_POST["Hasta"].'" 
                ';		

		$dao->ConsultarSqlNativoAjax($sql);
	}

	if($_POST['Requerimiento'] == "ValidarFacturasFormaPago"){

		
		$dao = new Dao();

		$sql =' SELECT id,total 
				FROM consulta 
				WHERE CONVERT(fecha_registro,date) = CURDATE() and id_punto_venta = '.$_SESSION['puntoVenta'].'
				AND id  NOT IN (SELECT id_consulta FROM forma_pago WHERE  CONVERT(fecha_registro,date) = CURDATE() and id_farmacia is null ) ';

		$respuesta = $dao->ConsultarSqlNativo($sql);

		foreach ($respuesta as $row => $item){
			$datos = array("id_consulta"=>$item[0],
							"tipo"=>"EFECTIVO",
							"monto"=>$item[1],
							"id_estado"=>1);


			$dao= new Dao();
		    $dao->Guardar("forma_pago",$datos);
		}

		$dao = new Dao();

		$sql =' SELECT id,total 
				FROM farmacia 
				WHERE CONVERT(fecha_registro,date) = CURDATE() and id_punto_venta = '.$_SESSION['puntoVenta'].'
				AND id  NOT IN (SELECT id_farmacia FROM forma_pago WHERE CONVERT(fecha_registro,date) = CURDATE()  and id_consulta is null) ';

		$respuesta = $dao->ConsultarSqlNativo($sql);

		foreach ($respuesta as $row => $item){
			$datos = array("id_farmacia"=>$item[0],
							"tipo"=>"EFECTIVO",
							"monto"=>$item[1],
							"id_estado"=>1);


			$dao= new Dao();
		    $dao->Guardar("forma_pago",$datos);
		}
		
	}

}