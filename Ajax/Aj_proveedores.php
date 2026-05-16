<?php

session_start();
require_once "autoloadAjax.php";

if (isset($_POST['Requerimiento'])) {


	if ($_POST['Requerimiento'] == "GuardarProveedor") {

		$datos = array(
			"id_provincia" => $_POST["Provincia"],
			"id_estado" => 1,
			"descripcion" => $_POST["Descripcion"],
			"ruc" => $_POST["Ruc"],
			"direccion" => $_POST["Direccion"],
			"representante" => $_POST["Representante"],
			"telefono" => $_POST["Telefono"],
			"email" => $_POST["Email"],
			"tipo" => $_POST["Tipo"],
			"contabilidad" => $_POST["Contabilidad"],
			"usuario_registro" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->GuardarAjax("proveedor", $datos);
	}


	if ($_POST['Requerimiento'] == "ModificarProveedor") {


		$datos = array(
			"id_provincia" => $_POST["Provincia"],
			"descripcion" => $_POST["Descripcion"],
			"ruc" => $_POST["Ruc"],
			"direccion" => $_POST["Direccion"],
			"representante" => $_POST["Representante"],
			"telefono" => $_POST["Telefono"],
			"email" => $_POST["Email"],
			"tipo" => $_POST["Tipo"],
			"contabilidad" => $_POST["Contabilidad"],
			"usuario_modifico" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("proveedor", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}



	if ($_POST['Requerimiento'] == "EliminaProvedor") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("proveedor", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}



	if ($_POST['Requerimiento'] == "InactivarProveedor") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("proveedor", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "ActivarProveedor") {

		$datos = array("id_estado" => 1);
		$dao = new Dao();
		$dao->ModificarAjax("proveedor", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}
	if($_POST['Requerimiento'] == "LlenarTablaProveedorJS"){

		$dao = new Dao(); 

		$dao->Campo("p.id","");
		$dao->Campo("pr.nombre","");
		$dao->Campo("p.descripcion","");
		$dao->Campo("p.ruc","");
		$dao->Campo("p.direccion","");
		$dao->Campo("p.representante","");
		$dao->Campo("p.telefono","");
		$dao->Campo("p.email","");
		$dao->Campo("p.tipo","");
		$dao->Campo("p.contabilidad","");

		$dao->TablasInnerAlias("proveedor","p","provincia","pr");
		$dao->Where("p.id_estado","1","and");	
        $dao->Filtrar("CONCAT(p.descripcion)",$_POST["search"]["value"],"");
        
		$dao->Ordenar("p.descripcion");
		
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
