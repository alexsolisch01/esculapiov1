<?php

session_start();
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){


if($_POST['Requerimiento'] == "GuardarTarjeta"){

		$datos = array("nombre"=>$_POST["Nombre"],
								
								"id_estado"=>1,
								"usuario_registro"=>$_SESSION["usuario"]);

			


		$dao= new Dao();
	    $dao->GuardarAjax("tarjeta",$datos);
		
		
	}


////////////////////////////////////////////////////MODIFICAR//////////////////////////////////////////////////////


		if($_POST['Requerimiento'] == "ModificaTarjeta"){

		
		$datos = array("nombre"=>$_POST["Nombre"],
								
								"usuario_modifico"=>$_SESSION["usuario"]);
		
	    $dao= new Dao();
		 $dao->ModificarAjax("tarjeta",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
		
	}

////////////////////////////////////////////////////ELIMINAR//////////////////////////////////////////////////////	


	if($_POST['Requerimiento'] == "EliminaTarjeta"){

			
			$dao= new Dao();
			$dao->EliminarAjax("tarjeta",$_POST['Id']);
	}

////////////////////////////////////////////////////GUARDAR BANCO//////////////////////////////////////////////////////

	if($_POST['Requerimiento'] == "GuardarBanco"){

		$datos = array("nombre"=>$_POST["Nombre"],
								"prefijo"=>$_POST["Prefijo"],
								"id_estado"=>1,
								"usuario_registro"=>$_SESSION["usuario"]);

			


		$dao= new Dao();
	    $dao->GuardarAjax("banco",$datos);
		
		
	}
////////////////////////////////////////////////////MODIFICAR//////////////////////////////////////////////////////


		if($_POST['Requerimiento'] == "ModificaBanco"){

		
	$datos = array("nombre"=>$_POST["Nombre"],
								"prefijo"=>$_POST["Prefijo"],
								"usuario_modifico"=>$_SESSION["usuario"]);
		
	    $dao= new Dao();
		 $dao->ModificarAjax("banco",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
		
	}

////////////////////////////////////////////////////ELIMINAR//////////////////////////////////////////////////////	


	if($_POST['Requerimiento'] == "EliminaBanco"){

			
			$dao= new Dao();
			$dao->EliminarAjax("banco",$_POST['Id']);
	}

}

