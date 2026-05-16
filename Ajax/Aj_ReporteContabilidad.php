<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if($_POST['Requerimiento'] == "CargarVentasContabilidadFecha"){
			
			$dao = new Dao(); 

			$dao->Campo("t.nombre","");			
			$dao->Campo("COUNT(c.id)","");
			$dao->Campo("SUM(ci.subtotal)","");
			

			$dao->TablasInnerAlias("consulta_item","ci","consulta","c");
			$dao->TablasInnerAlias("consulta_item","ci","procedimiento","p");
			$dao->TablasInnerAlias("procedimiento","p","especialidad","e");
			$dao->TablasInnerAlias("especialidad","e","tipo_servicio","t");

			$dao->Diferente("c.id_estado","21","and");

			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"");
			$dao->Agrupar("t.nombre");

			$respuesta1 = $dao->Consultar();


			$dao = new Dao(); 

			$dao->Campo("'LABORATORIO'","");			
			$dao->Campo("COUNT(c.id)","");
			$dao->Campo("SUM(ci.subtotal)","");
			

			$dao->TablasInnerAlias("consulta_item","ci","consulta","c");
			$dao->TablasInnerAlias("consulta_item","ci","procedimiento_laboratorio","p");

			$dao->Diferente("c.id_estado","21","and");
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"");
						

			$respuesta2=$dao->Consultar();


			$dao = new Dao(); 

			$dao->Campo("'RX'","");			
			$dao->Campo("COUNT(c.id)","");
			$dao->Campo("SUM(ci.subtotal)","");
			

			$dao->TablasInnerAlias("consulta_item","ci","consulta","c");
			$dao->TablasInnerAlias("consulta_item","ci","procedimiento_rx","p");

			$dao->Diferente("c.id_estado","21","and");
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"");			

			$respuesta3=$dao->Consultar();


			$dao = new Dao(); 

			$dao->Campo("'ECO'","");			
			$dao->Campo("COUNT(c.id)","");
			$dao->Campo("SUM(ci.subtotal)","");
			

			$dao->TablasInnerAlias("consulta_item","ci","consulta","c");
			$dao->TablasInnerAlias("consulta_item","ci","procedimiento_eco","p");

			$dao->Diferente("c.id_estado","21","and");
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"");			

			$respuesta4=$dao->Consultar();


			$dao = new Dao(); 

			$dao->Campo("'TAC/RMN'","");			
			$dao->Campo("COUNT(c.id)","");
			$dao->Campo("SUM(ci.subtotal)","");
			

			$dao->TablasInnerAlias("consulta_item","ci","consulta","c");
			$dao->TablasInnerAlias("consulta_item","ci","procedimiento_tomo","p");

			$dao->Diferente("c.id_estado","21","and");
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"");			

			$respuesta5=$dao->Consultar();

			$dao = new Dao(); 

			$dao->Campo("'FARMACIA'","");			
			$dao->Campo("COUNT(c.id)","");
			$dao->Campo("SUM(c.total)","");
			

			$dao->Tabla("farmacia","c");			
			$dao->Diferente("c.id_estado","21","and");
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"");			

			$respuesta6=$dao->Consultar();

			$dao = new Dao(); 

			$dao->Campo("'NC CONSULTA'","");			
			$dao->Campo("COUNT(c.id)","");
			$dao->Campo("SUM(c.total)","");
			

			$dao->Tabla("nc_consulta","c");			
			$dao->Diferente("c.id_estado","21","and");
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"");			

			$respuesta7=$dao->Consultar();

			$dao = new Dao(); 

			$dao->Campo("'NC FARMACIA'","");			
			$dao->Campo("COUNT(c.id)","");
			$dao->Campo("SUM(c.total)","");
			

			$dao->Tabla("nc_farmacia","c");			
			$dao->Diferente("c.id_estado","21","and");
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"");			

			$respuesta8=$dao->Consultar();

			$respuestaFinal = array_merge($respuesta1,$respuesta2,$respuesta3,$respuesta4,$respuesta5,$respuesta6,$respuesta7,$respuesta8);

			echo json_encode($respuestaFinal,true);
			
	}

	if($_POST['Requerimiento'] == "CargarVentasFarmaciaFecha"){

			$sql=' SELECT 
					CONVERT(f.fecha_registro,date),
					(SUM(f.total)-SUM(f.total_iva)),
					SUM(f.descuento), 
					((SUM(f.total_iva)*100)/12) BASE12, 
					SUM(f.total_iva),
					(SUM(f.total)) TOTAL 
				   FROM farmacia f 					
				   WHERE  CONVERT(f.fecha_registro,date) BETWEEN "'.$_POST["FechaDesde"].'" AND "'.$_POST["FechaHasta"].'"
				   AND f.id_estado!=21
				   GROUP BY CONVERT(f.fecha_registro,date) ';

			$dao = new Dao(); 
			$dao->ConsultarSqlNativoAjax($sql);


	}

	if($_POST['Requerimiento'] == "CargarCosto"){

			$dao = new Dao(); 

			$dao->Sumar("k.s_total","");			

			$dao->Tabla("kardex","k");			
			$dao->Where("k.concepto","'VENTAS'","and");
			$dao->Where("CONVERT(k.fecha_registro,DATE)",'"'.$_POST['Fecha'].'"',"");
			$dao->ConsultarAjax();


	}

	if($_POST['Requerimiento'] == "CargarLiquidacion"){

		
		$dao = new Dao(); 

		$especialidad =' ';
		if($_POST['Especialidad']!=0){
			$especialidad =' AND p.id_especialidad ='.$_POST['Especialidad'];
		}

		$medico =' ';
		if($_POST['Medico']!=0){
			$medico =' AND em.id ='.$_POST['Medico'];
		}

		if($_POST['Servicio']==1){
			$sql=' 
					SELECT em.id ,p.id idpc,concat(em.apellidos," ",em.nombres) empleados,p.nombre procedimientos,COUNT(ci.id),SUM(ci.subtotal),ci.id_estado,0,em.sistema
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN procedimiento p ON(p.id=ci.id_procedimiento)
					INNER JOIN especialidad e on(e.id=p.id_especialidad)					
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$especialidad.$medico.' and e.id_tipo_servicio = 1 
					GROUP BY p.id,em.id
					order by empleados,procedimientos				
				';
		}
		if($_POST['Servicio']==2){
			$sql=' 
					SELECT em.id ,p.id idpc,concat(em.apellidos," ",em.nombres) empleados,p.nombre procedimientos,COUNT(ci.id),SUM(ci.subtotal),ci.id_estado,0,em.sistema
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN procedimiento p ON(p.id=ci.id_procedimiento)
					INNER JOIN especialidad e on(e.id=p.id_especialidad)	
					
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$especialidad.$medico.' and e.id_tipo_servicio = 13 
					GROUP BY p.id,em.id
					order by empleados,procedimientos				
				';
		}
		if($_POST['Servicio']==3){
			$sql=' 
					SELECT em.id ,p.id idpc,concat(em.apellidos," ",em.nombres) empleados,p.nombre procedimientos,COUNT(ci.id),SUM(ci.subtotal),ci.id_estado,0,em.sistema
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN procedimiento p ON(p.id=ci.id_procedimiento)
					INNER JOIN especialidad e on(e.id=p.id_especialidad)
									
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$especialidad.$medico.' and e.id_tipo_servicio = 14 
					GROUP BY p.id,em.id
					order by empleados,procedimientos				
				';
		}
		if($_POST['Servicio']==4){
			$sql=' 
					SELECT em.id ,p.id idpc,concat(em.apellidos," ",em.nombres) empleados,p.nombre procedimientos,COUNT(ci.id),SUM(ci.subtotal),ci.id_estado,0,em.sistema
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN procedimiento_laboratorio p ON(p.id=ci.id_procedimiento_laboratorio)
					INNER JOIN entidad erx ON(erx.id_empleado=em.id)
					
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$medico.' 
					GROUP BY p.id,em.id
					order by empleados,procedimientos				
				';
		}
		if($_POST['Servicio']==5){
			$sql=' 
					SELECT em.id ,p.id idpc,concat(em.apellidos," ",em.nombres) empleados,p.nombre procedimientos,COUNT(ci.id),SUM(ci.subtotal),ci.id_estado,erx.valor_pago,em.sistema
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN procedimiento_rx p ON(p.id=ci.id_procedimiento_rx)
					INNER JOIN entidad_rx erx ON(erx.id_empleado=em.id)
					
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$medico.' 
					GROUP BY p.id,em.id
					order by empleados,procedimientos				
				';
		}
		if($_POST['Servicio']==6){
			$sql=' 
					SELECT em.id ,p.id idpc,concat(em.apellidos," ",em.nombres) empleados,p.nombre procedimientos,COUNT(ci.id),SUM(ci.subtotal),ci.id_estado,erx.valor_pago,em.sistema
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN procedimiento_eco p ON(p.id=ci.id_procedimiento_eco)
					INNER JOIN entidad_eco erx ON(erx.id_empleado=em.id)
					
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$medico.' 
					GROUP BY p.id,em.id
					order by empleados,procedimientos				
				';
		}
		if($_POST['Servicio']==7){
			$sql=' 
					SELECT em.id ,p.id idpc,concat(em.apellidos," ",em.nombres) empleados,p.nombre procedimientos,COUNT(ci.id),SUM(ci.subtotal),ci.id_estado,erx.valor_pago,em.sistema
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN procedimiento_tomo p ON(p.id=ci.id_procedimiento_tomo)
					INNER JOIN entidad_tomo erx ON(erx.id_empleado=em.id)
					
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$medico.' 
					GROUP BY p.id,em.id
					order by empleados,procedimientos				
				';
		}
		
		$dao->ConsultarSqlNativoAjax($sql);
		
	}

	if($_POST['Requerimiento'] == "CargarLiquidacionDetallado"){

		
		$dao = new Dao(); 

		$especialidad =' ';
		if($_POST['Especialidad']!=0){
			$especialidad =' AND e.id ='.$_POST['Especialidad'];
		}

		$medico =' ';
		if($_POST['Medico']!=0){
			$medico =' AND em.id ='.$_POST['Medico'];
		}

		if($_POST['Servicio']==1){
			$sql=' 
					SELECT  e.nombre,
					concat(em.apellidos," ",em.nombres) empleados,c.numero,CONVERT(ci.fecha_atencion,date), Concat(pa.apellido," ",pa.apellido_materno," ",pa.nombre),p.nombre procedimientos,ci.subtotal,ci.id_estado,ci.id_empleado,ci.id_procedimiento idpc,c.id_estado_rx,0,em.sistema,c.id_estado estadoCon 
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado) 
					INNER JOIN procedimiento p ON(p.id=ci.id_procedimiento) 
					INNER JOIN especialidad e ON(e.id=p.id_especialidad) 
					INNER JOIN consulta c ON (c.id=ci.id_consulta)
					INNER JOIN paciente pa ON (c.id_paciente=pa.id)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$especialidad.$medico.' and e.id_tipo_servicio = 1
					GROUP BY ci.id
					order by e.nombre,empleados,procedimientos				
				';
		}
		if($_POST['Servicio']==2){
			$sql=' 
					SELECT  e.nombre,
					concat(em.apellidos," ",em.nombres) empleados,c.numero,CONVERT(ci.fecha_atencion,date), Concat(pa.apellido," ",pa.apellido_materno," ",pa.nombre),p.nombre procedimientos,ci.subtotal,ci.id_estado,ci.id_empleado,ci.id_procedimiento idpc,c.id_estado_rx,0,em.sistema,c.id_estado estadoCon 
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado) 
					INNER JOIN procedimiento p ON(p.id=ci.id_procedimiento) 
					INNER JOIN especialidad e ON(e.id=p.id_especialidad) 
					INNER JOIN consulta c ON (c.id=ci.id_consulta)
					INNER JOIN paciente pa ON (c.id_paciente=pa.id)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$especialidad.$medico.' and e.id_tipo_servicio = 13
					GROUP BY ci.id					
					order by e.nombre,empleados,procedimientos				
				';
		}
		if($_POST['Servicio']==3){
			$sql=' 
					SELECT  e.nombre,
					concat(em.apellidos," ",em.nombres) empleados,c.numero,CONVERT(ci.fecha_atencion,date), Concat(pa.apellido," ",pa.apellido_materno," ",pa.nombre),p.nombre procedimientos,ci.subtotal,ci.id_estado,ci.id_empleado,ci.id_procedimiento idpc,c.id_estado_rx,0,em.sistema,c.id_estado estadoCon 
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado) 
					INNER JOIN procedimiento p ON(p.id=ci.id_procedimiento) 
					INNER JOIN especialidad e ON(e.id=p.id_especialidad) 
					INNER JOIN consulta c ON (c.id=ci.id_consulta)
					INNER JOIN paciente pa ON (c.id_paciente=pa.id)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$especialidad.$medico.' and e.id_tipo_servicio = 14
					GROUP BY ci.id
					order by e.nombre,empleados,procedimientos
								
				';
		}
		if($_POST['Servicio']==4){
			$sql=' 
					SELECT  e.nombre,
					concat(em.apellidos," ",em.nombres) empleados,c.numero,CONVERT(ci.fecha_atencion,date), Concat(pa.apellido," ",pa.apellido_materno," ",pa.nombre),p.nombre procedimientos,ci.subtotal,ci.id_estado,ci.id_empleado,ci.id,p.id idpc,p.valor_pago ,em.sistema,c.id_estado estadoCon
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado) 
					INNER JOIN procedimiento_laboratorio p ON(p.id=ci.id_procedimiento_laboratorio)  
					INNER JOIN grupo_examen e ON(e.id=p.id_grupo_examen) 
					INNER JOIN consulta c ON (c.id=ci.id_consulta)
					INNER JOIN paciente pa ON (c.id_paciente=pa.id)
					INNER JOIN entidad erx ON(erx.id_empleado=em.id)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$medico.'
					GROUP BY ci.id
					order by e.nombre,empleados,procedimientos				
				';
		}
		if($_POST['Servicio']==5){
			$sql=' 
					SELECT  e.nombre,
					concat(em.apellidos," ",em.nombres) empleados,c.numero,CONVERT(ci.fecha_atencion,date), Concat(pa.apellido," ",pa.apellido_materno," ",pa.nombre),p.nombre procedimientos,ci.subtotal,ci.id_estado,ci.id_empleado,ci.id,c.id_estado_rx,erx.valor_pago,em.sistema,p.id idpc,c.id_estado estadoCon 
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado) 
					INNER JOIN procedimiento_rx p ON(p.id=ci.id_procedimiento_rx)  
					INNER JOIN grupo_rx e ON(e.id=p.id_grupo_rx) 
					INNER JOIN consulta c ON (c.id=ci.id_consulta)
					INNER JOIN paciente pa ON (c.id_paciente=pa.id)
					INNER JOIN entidad_rx erx ON(erx.id_empleado=em.id)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$medico.'
					GROUP BY ci.id
					order by e.nombre,empleados,procedimientos				
				';
		}
		if($_POST['Servicio']==6){
			$sql=' 
					SELECT  e.nombre,
					concat(em.apellidos," ",em.nombres) empleados,c.numero,CONVERT(ci.fecha_atencion,date), Concat(pa.apellido," ",pa.apellido_materno," ",pa.nombre),p.nombre procedimientos,ci.subtotal,ci.id_estado,ci.id_empleado,ci.id,c.id_estado_eco,erx.valor_pago,em.sistema,p.id idpc,c.id_estado estadoCon 
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado) 
					INNER JOIN procedimiento_eco p ON(p.id=ci.id_procedimiento_eco)  
					INNER JOIN grupo_eco e ON(e.id=p.id_grupo_eco) 
					INNER JOIN consulta c ON (c.id=ci.id_consulta)
					INNER JOIN paciente pa ON (c.id_paciente=pa.id)
					INNER JOIN entidad_eco erx ON(erx.id_empleado=em.id)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$medico.'
					GROUP BY ci.id
					order by e.nombre,empleados,procedimientos				
				';
		}
		if($_POST['Servicio']==7){
			$sql=' 
					SELECT  e.nombre,
					concat(em.apellidos," ",em.nombres) empleados,c.numero,CONVERT(ci.fecha_atencion,date), Concat(pa.apellido," ",pa.apellido_materno," ",pa.nombre),p.nombre procedimientos,ci.subtotal,ci.id_estado,ci.id_empleado,ci.id,c.id_estado_eco,erx.valor_pago,em.sistema,p.id idpc,c.id_estado estadoCon 
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado) 
					INNER JOIN procedimiento_tomo p ON(p.id=ci.id_procedimiento_tomo)  
					INNER JOIN grupo_tomo e ON(e.id=p.id_grupo_tomo) 
					INNER JOIN consulta c ON (c.id=ci.id_consulta)
					INNER JOIN paciente pa ON (c.id_paciente=pa.id)
					INNER JOIN entidad_tomo erx ON(erx.id_empleado=em.id)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					'.$medico.'
					GROUP BY ci.id
					order by e.nombre,empleados,procedimientos				
				';
		}		

		$dao->ConsultarSqlNativoAjax($sql);
		
	}

	if($_POST['Requerimiento'] == "CargarPorEstado"){

		
		$dao = new Dao(); 
		$sql="";
		if($_POST['Servicio']==1){
			$sql=' 
					SELECT em.id,concat(em.apellidos," ",em.nombres),COUNT(ci.id),SUM(ci.subtotal)
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN consulta c ON(c.id=ci.id_consulta)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					AND ci.id_estado in('.$_POST['Estado'].') AND em.id = '.$_POST['Empleado'].'
					AND ci.id_procedimiento ='.$_POST['Procedimiento'].' and c.id_estado != 21
					GROUP BY em.id				
				';
		}

		if($_POST['Servicio']==2){
			$sql=' 
					SELECT em.id,concat(em.apellidos," ",em.nombres),COUNT(ci.id),SUM(ci.subtotal)
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN consulta c ON(c.id=ci.id_consulta)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					AND ci.id_estado in('.$_POST['Estado'].') AND em.id = '.$_POST['Empleado'].'
					AND ci.id_procedimiento ='.$_POST['Procedimiento'].' and c.id_estado != 21
					GROUP BY em.id				
				';
		}
		if($_POST['Servicio']==3){
			$sql=' 
					SELECT em.id,concat(em.apellidos," ",em.nombres),COUNT(ci.id),SUM(ci.subtotal)
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN consulta c ON(c.id=ci.id_consulta)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					AND ci.id_estado in('.$_POST['Estado'].') AND em.id = '.$_POST['Empleado'].'
					AND ci.id_procedimiento ='.$_POST['Procedimiento'].' and c.id_estado != 21
					GROUP BY em.id				
				';
		}
		if($_POST['Servicio']==4){
			$sql=' 
					SELECT em.id,concat(em.apellidos," ",em.nombres),COUNT(ci.id),SUM(ci.subtotal)
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN consulta c ON(c.id=ci.id_consulta)
					INNER JOIN consulta c ON(c.id=ci.id_consulta)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					AND (ci.id_estado in('.$_POST['Estado'].') OR c.id_estado_lab in('.$_POST['Estado'].') )AND em.id = '.$_POST['Empleado'].'
					AND ci.id_procedimiento_laboratorio ='.$_POST['Procedimiento'].' and c.id_estado != 21
					GROUP BY em.id			
				';
		}

		if($_POST['Servicio']==5){
			$sql=' 
					SELECT em.id,concat(em.apellidos," ",em.nombres),COUNT(ci.id),SUM(ci.subtotal)
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN consulta c ON(c.id=ci.id_consulta)
					INNER JOIN consulta c ON(c.id=ci.id_consulta)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					AND (ci.id_estado in('.$_POST['Estado'].') OR c.id_estado_rx in('.$_POST['Estado'].') )AND em.id = '.$_POST['Empleado'].'
					AND ci.id_procedimiento_rx ='.$_POST['Procedimiento'].' and c.id_estado != 21
					GROUP BY em.id	
				';
		}

		if($_POST['Servicio']==6){
			$sql=' 
					SELECT em.id,concat(em.apellidos," ",em.nombres),COUNT(ci.id),SUM(ci.subtotal)
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN consulta c ON(c.id=ci.id_consulta)
					INNER JOIN consulta c ON(c.id=ci.id_consulta)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					AND (ci.id_estado in('.$_POST['Estado'].') OR c.id_estado_eco in('.$_POST['Estado'].') )AND em.id = '.$_POST['Empleado'].'
					AND ci.id_procedimiento_eco ='.$_POST['Procedimiento'].' and c.id_estado != 21
					GROUP BY em.id
				';
		}
		if($_POST['Servicio']==7){
			$sql=' 
					SELECT em.id,concat(em.apellidos," ",em.nombres),COUNT(ci.id),SUM(ci.subtotal)
					FROM consulta_item ci INNER JOIN empleado em ON(em.id=ci.id_empleado)
					INNER JOIN consulta c ON(c.id=ci.id_consulta)
					INNER JOIN consulta c ON(c.id=ci.id_consulta)
					WHERE CONVERT(ci.fecha_atencion,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'"
					AND (ci.id_estado in('.$_POST['Estado'].') OR c.id_estado_tomo in('.$_POST['Estado'].') )AND em.id = '.$_POST['Empleado'].'
					AND ci.id_procedimiento_tomo ='.$_POST['Procedimiento'].' and c.id_estado != 21
					GROUP BY em.id
				';
		}

		
		$dao->ConsultarSqlNativoAjax($sql);
		//	echo json_encode($sql);	
		
	}

	if($_POST['Requerimiento'] == "CargarComision"){

			if($_POST['Servicio'] == 4){
				$dao = new Dao(); 

				$dao->Campo("m.valor_pago","");
				$dao->Campo("m.pago","");			

				$dao->Tabla("procedimiento_laboratorio","m");		
				$dao->Where("m.id",$_POST['Procedimiento'],"");
				$dao->ConsultarAjax();
			}
			if($_POST['Servicio'] == 5){
				$dao = new Dao(); 

				$dao->Campo("m.valor_pago","");
				$dao->Campo("m.pago","");			

				$dao->Tabla("entidad_rx","m");		
				$dao->Where("m.id_empleado",$_POST['Empleado'],"");
				$dao->ConsultarAjax();
			}
			if($_POST['Servicio'] == 6){
				$dao = new Dao(); 

				$dao->Campo("m.valor_pago","");
				$dao->Campo("m.pago","");			

				$dao->Tabla("entidad_eco","m");		
				$dao->Where("m.id_empleado",$_POST['Empleado'],"");
				$dao->ConsultarAjax();
			}
			if($_POST['Servicio'] == 7){
				$dao = new Dao(); 

				$dao->Campo("m.valor_pago","");
				$dao->Campo("m.pago","");			

				$dao->Tabla("entidad_eco","m");		
				$dao->Where("m.id_empleado",$_POST['Empleado'],"");
				$dao->ConsultarAjax();
			}
			if($_POST['Servicio'] < 4){
				$dao = new Dao(); 

				$dao->Campo("m.valor","");
				$dao->Campo("m.tipo","");			

				$dao->Tabla("medico_procedimiento","m");			
				$dao->Where("m.id_empleado",$_POST['Empleado'],"and");
				$dao->Where("m.id_procedimiento",$_POST['Procedimiento'],"");
				$dao->ConsultarAjax();	
			}
			


	}

	if($_POST['Requerimiento'] == "CargarFacturas"){

			$dao = new Dao(); 

			$dao->Campo("c.numero","");
			$dao->Campo("Concat(p.apellido,' ',p.apellido_materno,' ',p.nombre)","");
			$dao->Campo("ci.subtotal","");

			$dao->TablasInnerAlias("consulta_item","ci","consulta","c");
			$dao->TablasInnerAlias("consulta","c","paciente","p");			
			$dao->Entre("CONVERT(ci.fecha_atencion,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"AND");	
			$dao->Where("ci.id_procedimiento",$_POST['Procedimiento'],"AND");
			$dao->Where("ci.id_empleado",$_POST['Empleado'],"");
			$dao->ConsultarAjax();


	}
}