<?php
session_start();
date_default_timezone_set('America/Guayaquil'); 
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if($_POST['Requerimiento'] == "GuardarPlantillaEco"){

		$dao= new Dao();
		
		$dao->Eliminar("plantilla_eco","id_procedimiento_eco=".$_POST["Procedimiento"]." AND numero=".$_POST["Numero"]);


		$datos = array("id_procedimiento_eco"=>$_POST["Procedimiento"],
						"plantilla"=>$_POST["Plantilla"],						
						"id_estado"=>1,
						"numero"=>$_POST["Numero"],
						"nombre"=>$_POST["Nombre"],
					    "usuario_registro"=>$_SESSION["usuario"]);

						
		$dao->GuardarAjax("plantilla_eco",$datos);
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoProcedimientoEco"){
		
		$columna="plantilla1";
		if($_POST["Numero"]==2){
			$columna="plantilla2";
		}
		if($_POST["Numero"]==3){
			$columna="plantilla3";
		}

		$datos = array($columna=>11);
		$dao= new Dao();
	    $dao->ModificarAjax("procedimiento_eco",$datos,"id=".$_POST['Procedimiento'],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "CargarPlantillaEco"){
		
		$dao= new Dao();

	    $dao->Campo("plantilla","");
	    $dao->Campo("nombre","");

		$dao->Tabla("plantilla_eco","");
		$dao->Where("id_procedimiento_eco",$_POST['Procedimiento'],"AND");
		$dao->Where("numero",$_POST['Numero'],"");

		//echo json_encode($dao->Consultar2());
		$dao->ConsultarAjax();
		 
	}

	if($_POST['Requerimiento'] == "CargarPlantillaEco2"){
		
		$dao= new Dao();

	    $dao->Campo("plantilla","");
	    $dao->Campo("nombre","");

		$dao->Tabla("plantilla_eco","");
		$dao->Where("id_procedimiento_eco",$_POST['Procedimiento'],"AND");
		$dao->Where("nombre","'".$_POST['Nombre']."'","");

		//echo json_encode($dao->Consultar2());
		$dao->ConsultarAjax();
		 
	}

	

//////////////////////////////////////para la pantalla de recepcion de eco PRUEBA////////////////////////////////////////////////
	

   if($_POST['Requerimiento'] == "GuardarResultadoEco"){

		$dao= new Dao();
		
		$dao->EliminarPorCampos("resultado_eco","id_procedimiento_eco=".$_POST["Procedimiento"]." AND id_consulta = ".$_POST["Consulta"]);


		$datos = array("id_procedimiento_eco"=>$_POST["Procedimiento"],
						"plantilla"=>$_POST["Plantilla"],
						"id_consulta"=>$_POST["Consulta"],
						"id_paciente"=>$_POST["Paciente"],						
						"id_estado"=>1,
					    "usuario_registro"=>$_SESSION["usuario"]);

						
		$dao->GuardarAjax("resultado_eco",$datos);
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoProcedimientoEcoFactura"){
		
		$datos = array("id_estado"=>14);
		$dao= new Dao();
	    $dao->ModificarAjax("consulta_item",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_eco = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "CargarResultadoEco"){
		
		$dao= new Dao();

	    $dao->Campo("plantilla","");
	    $dao->Campo("usuario_registro","");
	    $dao->Campo("fecha_registro","");
	    $dao->Campo("usuario_valido","");
	    $dao->Campo("fecha_valido","");
	    
		$dao->Tabla("resultado_eco","");
		$dao->Where("id_procedimiento_eco",$_POST['Procedimiento'],"AND");
		$dao->Where("id_consulta",$_POST['Consulta'],"");


		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "ValidarResultadoEco"){
		
		$datos = array(
						"plantilla"=>$_POST["Plantilla"],
						"fecha_valido"=>date("Y-m-d H:i:s"),												
					    "usuario_valido"=>$_SESSION["nombres"]);

		$dao= new Dao();
	    $dao->ModificarAjax("resultado_eco",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_eco = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoProcedimientoEcoValidadoFactura"){
		
		$datos = array("id_estado"=>15);
		$dao= new Dao();
	    $dao->ModificarAjax("consulta_item",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_eco = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}

	if($_POST['Requerimiento'] == "CargarPlantillaEco1"){
		
		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("pe.nombre","");
		$dao->TablasInnerAlias("plantilla_eco","pe","procedimiento_eco","p");
		$dao->Where("pe.id_procedimiento_eco",$_POST['Procedimiento'] ,"");
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoDesvalidado"){
		
		$dao= new Dao();
		
		//$dao->Eliminar("resultado_eco","id_procedimiento_eco=".$_POST["Procedimiento"]." AND id_consulta=".$_POST["Consulta"]);
		
		$datos = array("id_estado"=>14);
		$dao= new Dao();
	    $dao->ModificarAjax("consulta_item",$datos,"id_consulta=".$_POST['Consulta']." AND id_procedimiento_eco = ".$_POST["Procedimiento"],$_POST['Procedimiento']);
		
	}

}