<?php

session_start();
require_once "autoloadAjax.php";

if (isset($_POST['Requerimiento'])) {


	if ($_POST['Requerimiento'] == "GuardarRefe") {

		$datos = array(
			"nombre" => $_POST["Nombre"],
			"apellidos" => $_POST["Apellido"],
			"direccion" => $_POST["Direccion"],
			"telefono" => $_POST["Telefono"],
			"correo" => $_POST["Correo"],
			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);




		$dao = new Dao();
		$dao->GuardarAjax("referencia", $datos);
	}


	////////////////////////////////////////////////////MODIFICAR//////////////////////////////////////////////////////


	if ($_POST['Requerimiento'] == "ModificaRefe") {


		$datos = array(
			"nombre" => $_POST["Nombre"],
			"apellidos" => $_POST["Apellido"],
			"direccion" => $_POST["Direccion"],
			"telefono" => $_POST["Telefono"],
			"correo" => $_POST["Correo"],
			"usuario_modifico" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("referencia", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	////////////////////////////////////////////////////ELIMINAR//////////////////////////////////////////////////////	


	if ($_POST['Requerimiento'] == "EliminaRefe") {


		$dao = new Dao();
		$dao->EliminarAjax("referencia", $_POST['Id']);
	}
	if($_POST['Requerimiento'] == "LlenarTablaReferentesJS"){

		$dao = new Dao(); 

		$dao->Campo("id","");
		$dao->Campo("apellidos","");
		$dao->Campo("nombre","");
		$dao->Campo("direccion","");
		$dao->Campo("telefono","");
		$dao->Campo("correo","");
		$dao->Campo("id_estado","");

		$dao->Tabla("referencia","");	
		$dao->Where("id_estado","1","and");	
        $dao->Filtrar("CONCAT(apellidos,' ',nombre)",$_POST["search"]["value"],"");
        
		$dao->Ordenar("apellidos,nombre");
		
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
		
		$respuesta =$dao->Consultar();
		$data = array();
		$total = 0;
		foreach ($respuesta as $row => $item){
			$total++;
			$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';
			$item[0] = $editar . $eliminar;
            $data[] = $item; 
		}

		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $total,  
                "recordsFiltered"=> $total,  
                "data"           => $data  
        );  
        echo json_encode($output);
	}
}
