<?php

session_start();
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if($_POST['Requerimiento'] == "GuardaPuntoVenta"){

		$datos = array("id_establecimiento"=>$_POST["Establecimiento"],
			"nombre"=>$_POST["Nombre"],
			"id_punto_emision"=>$_POST["Codigo"],
			"secuencia_fc"=>$_POST["SecuenciaFc"],
			"secuencia_nc"=>$_POST["SecuenciaNc"],
			"secuencia_nb"=>$_POST["SecuenciaNb"],
			"secuencia_re"=>$_POST["SecuenciaRe"],
			"ambiente"=>$_POST["Ambiente"],
			"impresora"=>$_POST["Impresora"],
			"descuento"=>$_POST["Descuento"],
			"id_estado"=>1,
		    "usuario_registro"=>$_SESSION["usuario"]);

		$dao= new Dao();
	    $dao->GuardarAjax("punto_venta",$datos);
		
	}

	if($_POST['Requerimiento'] == "ModificaPuntoVenta"){

		$datos = array("id_establecimiento"=>$_POST["Establecimiento"],
			"nombre"=>$_POST["Nombre"],
			"secuencia_fc"=>$_POST["SecuenciaFc"],
			"secuencia_nc"=>$_POST["SecuenciaNc"],
			"secuencia_nb"=>$_POST["SecuenciaNb"],
			"secuencia_re"=>$_POST["SecuenciaRe"],
			"impresora"=>$_POST["Impresora"],
			"ambiente"=>$_POST["Ambiente"],
			"descuento"=>$_POST["Descuento"],
			"usuario_modifico"=>$_SESSION["usuario"]);


		$dao= new Dao();
	    $dao->ModificarAjax("punto_venta",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "EliminaPunto"){

		$dao= new Dao();
		$dao->EliminarAjax("punto_venta",$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "CambiaEstadoI"){

		$datos = array("id_estado"=>2);

						$dao= new Dao();
						$dao->ModificarAjax("punto_emision",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "CambiaEstadoA"){

		$datos = array("id_estado"=>1);

						$dao= new Dao();
						$dao->ModificarAjax("punto_emision",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}
}
