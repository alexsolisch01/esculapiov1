<?php

session_start();
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if ($_POST['Requerimiento'] == "Guardar") {

		$datos = array(
			"codigo" => $_POST["Codigo"],
			"descripcion" => $_POST["Descripcion"],
			"id_estado" => 1,
			"usuario_registro" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->GuardarAjax("cie", $datos);
	}
	if ($_POST['Requerimiento'] == "Modificar") {

		$datos = array(
			"codigo" => $_POST["Codigo"],
			"descripcion" => $_POST["Descripcion"],
			"id_estado" => 1,
			"usuario_modifico" => $_SESSION["usuario"]
		);

		$dao = new Dao();
		$dao->ModificarAjax("cie", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "Eliminar") {
		$dao = new Dao();
		$dao->EliminarAjax("cie", $_POST['Id']);
	}

	if($_POST['Requerimiento'] == "CargarTablaCieJS"){

		$dao = new Dao(); 

		$dao->Campo("c.id","");
		$dao->Campo("c.codigo","");
		$dao->Campo("c.descripcion","");
		
		$dao->Tabla("cie","c");
		$dao->Where("c.id_estado","1","and");	
        $dao->Filtrar("CONCAT(c.codigo,' ',c.descripcion)",$_POST["search"]["value"],"");
        
		$dao->Ordenar("c.descripcion");
		
		$dao->Limite("0,200");  
		
		$respuesta =$dao->Consultar();
		$data = array();
		$total = 0;
		foreach ($respuesta as $row => $item){
			$total++;
			/*$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';	*/
			//$item[0] = $editar . $eliminar;
            $editar = '<button class="action-btn edit btnEditar" registro="' . $item[0] . '" title="Modificar"><i class="fa fa-pencil"></i></button>';
			$eliminar = '<button class="action-btn delete btnEliminar" registro="' . $item[0] . '" title="Eliminar"><i class="fa fa-trash-o"></i></button>';
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

	if($_POST['Requerimiento'] == "CargarCie"){

		$dao = new Dao(); 

		$dao->Campo("id","");
		$dao->Campo("codigo","");
		$dao->Campo("descripcion","");		

		$dao->Tabla("cie","");
		$dao->Where("id_estado","1","and");	

        if(isset($_POST["search"]["value"]) )  
        {  
                
                if(trim($_POST["search"]["value"])==""){
                	$dao->Where("1","1","");
                }else{
                	$dao->Filtrar("Concat(codigo,' ',descripcion)",$_POST["search"]["value"],"");
                	
                }
                               
        }
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
		
        $dao->Ordenar("descripcion");  
		

		$respuesta =$dao->Consultar();
		
		$data = array();

		$totalFilter=0;
		foreach ($respuesta as $row => $item){
			$totalFilter++;
			$sub_array = array(); 
		
            $sub_array[] ='<span id="'.$item[0].'">'.$item[1].'<span>';
            $sub_array[] =$item[2];
                        
            $data[] = $sub_array; 
		}
		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $totalFilter,  
                "recordsFiltered"=> $totalFilter,  
                "data"           => $data  
        );  
        echo json_encode($output);
	}

	if($_POST['Requerimiento'] == "CargarDiagnostico"){

		
		$dao= new Dao();

	    $dao->Campo("ci.codigo","");
		$dao->Campo("ci.descripcion","");		
	
		$dao->TablasInnerAlias("diagnostico","d","cie","ci");
		
		$dao->Where("d.id_consulta",$_POST['Consulta'],"and");
		$dao->Where("d.id_consulta_item",$_POST['Item'],"");

		$dao->ConsultarAjax();
		
		
	}
	if($_POST['Requerimiento'] == "CargarDiagnosticos"){

		
		$dao= new Dao();

	    $dao->Campo("ci.codigo","");
		$dao->Campo("ci.descripcion","");		
	
		$dao->TablasInnerAlias("diagnostico","d","cie","ci");
		$dao->TablasInnerAlias("diagnostico","d","consulta","c");
		
		
		$dao->Where("c.id_paciente",$_POST['Paciente'],"");

		$dao->ConsultarAjax();
		
		
	}

	if($_POST['Requerimiento'] == "CargarProcedimientos"){

		
		$dao= new Dao();

	    $dao->Campo("c.id","");
	    $dao->Campo("p.nombre","");	
	    $dao->Campo("pe.enfermedad","");
	    $dao->Campo("Convert(pe.fecha_registro,Date)","");	
	
		$dao->TablasInnerAlias("paciente_enfermedad","pe","consulta_item","c");
		$dao->TablasInnerAlias("consulta_item","c","procedimiento","p");
		
		
		$dao->Where("pe.id_paciente",$_POST['Paciente'],"");

		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
	}
	
}
