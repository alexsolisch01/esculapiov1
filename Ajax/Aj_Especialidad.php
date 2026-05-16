<?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if($_POST['Requerimiento'] == "CararEspecialidades"){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("especialidad","");
		$dao->Where("id_estado","1","and");

		if(isset($_POST["GrupoEstadistico"])){
			$dao->Where("id_grupo_estadistico",$_POST['GrupoEstadistico'],"and");
		}
		if(isset($_POST['Tipo'])){
			$dao->Where("id_tipo_servicio",$_POST['Tipo'],"");
		}else{
			$dao->Where("1","1","");
		}
		
		$dao->Ordenar("nombre ASC");


		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarEspecialidades"){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		if($_POST['Servicio']==1){
			$dao->Tabla("especialidad","");
			$dao->Where("id_estado","1","and");
			$dao->Where("id_tipo_servicio","1","");
			$dao->Ordenar("nombre ASC");
		}
		if($_POST['Servicio']==2){
			$dao->Tabla("especialidad","");
			$dao->Where("id_estado","1","and");
			$dao->Where("id_tipo_servicio","13","");
			$dao->Ordenar("nombre ASC");
		}
		if($_POST['Servicio']==3){
			$dao->Tabla("especialidad","");
			$dao->Where("id_estado","1","and");
			$dao->Where("id_tipo_servicio","14","");
			$dao->Ordenar("nombre ASC");
		}

		if($_POST['Servicio']==4){
			$dao->Tabla("especialidad","");
			$dao->Where("id_estado","1","and");
			$dao->Where("id","53","");
			$dao->Ordenar("nombre ASC");
		}
		if($_POST['Servicio']==5){
			$dao->Tabla("especialidad","");
			$dao->Where("id_estado","1","and");
			$dao->Where("id","55","");
			$dao->Ordenar("nombre ASC");
		}
		if($_POST['Servicio']==6){
			$dao->Tabla("especialidad","");
			$dao->Where("id_estado","1","and");
			$dao->Where("id","54","");
			$dao->Ordenar("nombre ASC");
		}
		if($_POST['Servicio']==7){
			$dao->Tabla("especialidad","");
			$dao->Where("id_estado","1","and");
			$dao->In_Where("id","56,57","");
			$dao->Ordenar("nombre ASC");
		}


		$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarMedicoEspecialidades"){

		$dao = new Dao();
		
		$dao->Campo("e.id","");
		$dao->Campo("e.nombres","");
		$dao->Campo("e.apellidos","");
		$dao->TablasInnerAlias("medico_especialidad","me","empleado","e");
		$dao->TablasInnerAlias("medico_especialidad","me","especialidad","es");
		$dao->Where("es.id",$_POST['Especialidad'],"");
		$dao->Ordenar("e.apellidos ASC");
		
		$dao->ConsultarAjax();
	}
	function CargarComboRelacion(){
		$dao= new Dao();

	    $dao->Campo("id","");
	    $dao->Campo("nombre","");
		$dao->Tabla("tipo_relacion","");
		$dao->Where("id_estado",1,"");
		$respuesta =$dao->Consultar();
		$combo = '<select class="tipoRelacion">';
		foreach ($respuesta as $row => $item){
			$combo .='<option value="'.$item[0].'">'.$item[1].'</option>';
		}
		$combo .='</select>';
		return $combo;
	}
	if($_POST['Requerimiento'] == "CargarTablaJSMante"){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("especialidad","");
		$dao->Where("id_estado","1","and");

		if(isset($_POST["search"]["value"]))  
        {  
        		if(trim($_POST["search"]["value"])==""){
                	$dao->Where("1","1","");
                }else{
                	$dao->Filtrar("nombre",$_POST["search"]["value"],"");                	
                }
                
                
        }              
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
		
        $dao->Ordenar("nombre");  

		$respuesta =$dao->Consultar();
		$data = array();
		$totalFilter=0;
		$comboRelacion = CargarComboRelacion();
		foreach ($respuesta as $row => $item){
			$totalFilter++;
			
			$fila = array();
			$fila[] = $item[1];			
			$fila[] = $comboRelacion;
			$fila[] = '<input type="checkbox" id="'.$item[0].'" class="chEspecialidad">';
            $data[] = $fila; 
		}
		
		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $totalFilter,  
                "recordsFiltered"=> $totalFilter,  
                "data"           => $data  
        );  
        echo json_encode($output);
			
	}
}
