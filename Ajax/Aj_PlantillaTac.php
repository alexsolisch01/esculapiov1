<?php
session_start();
date_default_timezone_set('America/Guayaquil'); 
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if($_POST['Requerimiento'] == "GuardarPlantillaTac"){

		$dao= new Dao();
		
		$dao->Eliminar("plantilla_tomo","id_procedimiento_tomo=".$_POST["Procedimiento"]." AND numero=".$_POST["Numero"]);


		$datos = array("id_procedimiento_tomo"=>$_POST["Procedimiento"],
						"plantilla"=>$_POST["Plantilla"],						
						"id_estado"=>1,
						"numero"=>$_POST["Numero"],
						"nombre"=>$_POST["Nombre"],
					    "usuario_registro"=>$_SESSION["usuario"]);

						
		$dao->GuardarAjax("plantilla_tomo",$datos);
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoProcedimientoTac"){
		
		$columna="plantilla1";
		if($_POST["Numero"]==2){
			$columna="plantilla2";
		}
		if($_POST["Numero"]==3){
			$columna="plantilla3";
		}

		$datos = array($columna=>11);
		$dao= new Dao();
	    $dao->ModificarAjax("procedimiento_tomo",$datos,"id=".$_POST['Procedimiento'],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "CargarPlantillaTac"){
		
		$dao= new Dao();

	    $dao->Campo("plantilla","");
	    $dao->Campo("nombre","");

		$dao->Tabla("plantilla_tomo","");
		$dao->Where("id_procedimiento_tomo",$_POST['Procedimiento'],"AND");
		$dao->Where("numero",$_POST['Numero'],"");

		//echo json_encode($dao->Consultar2());
		$dao->ConsultarAjax();
		 
	}

	if($_POST['Requerimiento'] == "CargarPlantillaTac2"){
		
		$dao= new Dao();

	    $dao->Campo("plantilla","");
	    $dao->Campo("nombre","");

		$dao->Tabla("plantilla_tomo","");
		$dao->Where("id_procedimiento_tomo",$_POST['Procedimiento'],"AND");
		$dao->Where("nombre","'".$_POST['Nombre']."'","");

		//echo json_encode($dao->Consultar2());
		$dao->ConsultarAjax();
		 
	}

	

//////////////////////////////////////para la pantalla de recepcion de eco PRUEBA////////////////////////////////////////////////
	

   if($_POST['Requerimiento'] == "GuardarResultadoTac"){

		$dao= new Dao();
		
		$dao->EliminarPorCampos("resultado_tomo","id_procedimiento_tomo=".$_POST["Procedimiento"]." AND id_consulta = ".$_POST["Consulta"]);


		$datos = array("id_procedimiento_tomo"=>$_POST["Procedimiento"],
						"plantilla"=>$_POST["Plantilla"],
						"id_consulta"=>$_POST["Consulta"],
						"id_paciente"=>$_POST["Paciente"],						
						"id_estado"=>1,
					    "usuario_registro"=>$_SESSION["usuario"]);

						
		$dao->GuardarAjax("resultado_tomo",$datos);
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoProcedimientoTacFactura"){
		
		$datos = array("id_estado"=>14);
		$dao= new Dao();
	    $dao->ModificarAjax("consulta_item",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_tomo = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "CargarResultadoTac"){
		
		$dao= new Dao();

	    $dao->Campo("plantilla","");
	    $dao->Campo("usuario_registro","");
	    $dao->Campo("fecha_registro","");
	    $dao->Campo("usuario_valido","");
	    $dao->Campo("fecha_valido","");
	    
		$dao->Tabla("resultado_tomo","");
		$dao->Where("id_procedimiento_tomo",$_POST['Procedimiento'],"AND");
		$dao->Where("id_consulta",$_POST['Consulta'],"");


		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "ValidarResultadoTac"){
		
		$datos = array(
						"plantilla"=>$_POST["Plantilla"],
						"fecha_valido"=>date("Y-m-d H:i:s"),												
					    "usuario_valido"=>$_SESSION["nombres"]);

		$dao= new Dao();
	    $dao->ModificarAjax("resultado_tomo",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_tomo = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoProcedimientoTacValidadoFactura"){
		
		$datos = array("id_estado"=>15);
		$dao= new Dao();
	    $dao->ModificarAjax("consulta_item",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_tomo = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoDesvalidado"){
		
		$dao= new Dao();
		
		$datos = array("id_estado"=>14);
		$dao= new Dao();
	    $dao->ModificarAjax("consulta_item",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_tomo = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "CargarPlantillaTac1"){
		
		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("pe.nombre","");
		$dao->TablasInnerAlias("plantilla_tomo","pe","procedimiento_tomo","p");
		$dao->Where("pe.id_procedimiento_tomo",$_POST['Procedimiento'] ,"");
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

}