<?php
session_start();
date_default_timezone_set('America/Guayaquil'); 
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if($_POST['Requerimiento'] == "GuardarPlantillaRx"){

		$dao= new Dao();
		
		$dao->Eliminar("plantilla_rx","id_procedimiento_rx=".$_POST["Procedimiento"]);


		$datos = array("id_procedimiento_rx"=>$_POST["Procedimiento"],
						"plantilla"=>$_POST["Plantilla"],						
						"id_estado"=>1,
						"numero"=>$_POST["Numero"],
						"nombre"=>$_POST["Nombre"],
					    "usuario_registro"=>$_SESSION["usuario"]);

						
		$dao->GuardarAjax("plantilla_rx",$datos);
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoProcedimientoRx"){
		
		$columna="plantilla1";
		if($_POST["Numero"]==2){
			$columna="plantilla2";
		}
		if($_POST["Numero"]==3){
			$columna="plantilla3";
		}

		$datos = array($columna=>11);
		$dao= new Dao();
	    $dao->ModificarAjax("procedimiento_rx",$datos,"id=".$_POST['Procedimiento'],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "CargarPlantillaRx"){
		
		$dao= new Dao();

	    $dao->Campo("plantilla","");
	    $dao->Campo("nombre","");
	    
		$dao->Tabla("plantilla_rx","");
		$dao->Where("id_procedimiento_rx",$_POST['Procedimiento'],"AND");
		$dao->Where("numero",$_POST['Numero'],"");


		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "CargarPlantillaRx2"){
		
		$dao= new Dao();

	    $dao->Campo("plantilla","");
	    $dao->Campo("nombre","");

		$dao->Tabla("plantilla_rx","");
		$dao->Where("id_procedimiento_rx",$_POST['Procedimiento'],"AND");
		$dao->Where("nombre","'".$_POST['Nombre']."'","");

		//echo json_encode($dao->Consultar2());
		$dao->ConsultarAjax();
		 
	}

	if($_POST['Requerimiento'] == "GuardarResultadoRx"){

		$dao= new Dao();
		
		$dao->EliminarPorCampos("resultado_rx","id_procedimiento_rx=".$_POST["Procedimiento"]." AND id_consulta = ".$_POST["Consulta"]);


		$datos = array("id_procedimiento_rx"=>$_POST["Procedimiento"],
						"plantilla"=>$_POST["Plantilla"],
						"id_consulta"=>$_POST["Consulta"],
						"id_paciente"=>$_POST["Paciente"],						
						"id_estado"=>1,
					    "usuario_registro"=>$_SESSION["usuario"]);

						
		$dao->GuardarAjax("resultado_rx",$datos);
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoProcedimientoRxFactura"){
		
		$datos = array("id_estado"=>14);
		$dao= new Dao();
	    $dao->ModificarAjax("consulta_item",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_rx = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "CargarResultadoRx"){
		
		$dao= new Dao();

	    $dao->Campo("plantilla","");
	    $dao->Campo("usuario_registro","");
	    $dao->Campo("fecha_registro","");
	    $dao->Campo("usuario_valido","");
	    $dao->Campo("fecha_valido","");
	    
		$dao->Tabla("resultado_rx","");
		$dao->Where("id_procedimiento_rx",$_POST['Procedimiento'],"AND");
		$dao->Where("id_consulta",$_POST['Consulta'],"");


		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "ValidarResultadoRx"){
		
		$datos = array(
						"plantilla"=>$_POST["Plantilla"],
						"fecha_valido"=>date("Y-m-d H:i:s"),												
					    "usuario_valido"=>$_SESSION["nombres"]);

		$dao= new Dao();
	    $dao->ModificarAjax("resultado_rx",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_rx = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoProcedimientoRxValidadoFactura"){
		
		$datos = array("id_estado"=>15);
		$dao= new Dao();
	    $dao->ModificarAjax("consulta_item",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_rx = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}
	if($_POST['Requerimiento'] == "ActualizarEstadoDesvalidado"){
		
		$dao= new Dao();
		
	
		$datos = array("id_estado"=>14);
		$dao= new Dao();
	    $dao->ModificarAjax("consulta_item",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_rx = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "CargarPlantillaRx1"){
		
		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("pe.nombre","");
		$dao->TablasInnerAlias("plantilla_rx","pe","procedimiento_rx","p");
		$dao->Where("pe.id_procedimiento_rx",$_POST['Procedimiento'] ,"");
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

}