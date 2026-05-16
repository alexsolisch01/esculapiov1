<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){



	if($_POST['Requerimiento'] == "CargarOrdenConsulta"){

		 
		$dao= new Dao();

	    $dao->Campo("o.id","");
	    $dao->Campo("o.id_paciente","");
	    $dao->Campo("p.nombre","");
	    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno)","");
	    $dao->Campo("p.cedula","");
	    $dao->Campo("p.direccion","");
	    $dao->Campo("p.telefono","");
	    $dao->Campo("p.email","");
	    $dao->Campo("p.fecha_nacimiento","");
	    $dao->Campo("o.id_consulta","");
	    	    
	
		$dao->TablasInnerAlias("orden","o","paciente","p");
		
		$dao->Where("o.id",$_POST['Id'],"");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}

	if($_POST['Requerimiento'] == "CargarDetalleOrden"){
		
		$dao= new Dao();	
		$dao->Tabla("orden_item","");		
		$dao->Where("id_orden",$_POST['Orden'],"And");
		$dao->Diferente("id_estado","18","");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}

	if($_POST['Requerimiento'] == "CargarMotivoExamen"){
		
		$dao= new Dao();
		$dao->Campo("o.motivo","");
		$dao->Campo("o.id_consulta_item","");
		$dao->Campo("CONCAT(e.apellidos,' ',e.nombres)","");
		$dao->Campo("convert(o.fecha_registro,date)","");	
		$dao->TablasInnerAlias("orden","o","empleado","e");		
		$dao->Where("o.id",$_POST['Orden'],"");
		

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}

}
