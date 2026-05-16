<?php

session_start();
require_once "autoloadAjax.php";

if (isset($_POST['Requerimiento'])) {

	if ($_POST['Requerimiento'] == "Guardar") {

		$datos = array(
			"nombre" => $_POST["Nombre"],
			"id_canton" => $_POST["Canton"],
			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->GuardarAjax("parroquia", $datos);
	}
	if ($_POST['Requerimiento'] == "Modificar") {

		$datos = array(
			"nombre" => $_POST["Nombre"],
			"id_canton" => $_POST["Canton"],
			"id_estado" => 1,
			"usuario_modifico" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("parroquia", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "Eliminar") {
		$dao = new Dao();
		$dao->EliminarAjax("parroquia", $_POST['Id']);
	}
	if($_POST['Requerimiento'] == "CargarTablaParroquiaJS"){

		$dao = new Dao(); 

		$dao->Campo("p.id","");
		$dao->Campo("c.nombre","");
		$dao->Campo("p.nombre","");
        $dao->Campo("c.id","");
		
		$dao->TablasInnerAlias("parroquia","p","canton","c");	
		$dao->Where("p.id_estado","1","and");	
        $dao->Filtrar("CONCAT(c.nombre,' ',p.nombre)",$_POST["search"]["value"],"");
        
		$dao->Ordenar("p.nombre");
		
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
