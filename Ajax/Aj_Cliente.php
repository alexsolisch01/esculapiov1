<?php

session_start();
date_default_timezone_set('America/Guayaquil');
require_once "autoloadAjax.php";
require_once 'Spout/Autoloader/autoload.php';
require_once 'Iterador.php';

use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Common\Entity\Row;
use Box\Spout\Writer\Common\Creator\Style\StyleBuilder;

if(isset($_POST['Requerimiento'])){


if($_POST['Requerimiento'] == "GuardarCliente"){

		$datos = array("ruc"=>$_POST["Ruc"],
								"apellido"=>$_POST["Apellido"],
								"nombre"=>$_POST["Nombre"],
								"telefono"=>$_POST["Telefono"],
								"email"=>$_POST["Email"],
								"direccion"=>$_POST["Direccion"],
								"credito"=>$_POST["Credito"],
								"id_estado"=>1,
								"usuario_registro"=>$_SESSION["usuario"]);

			


		$dao= new Dao();
	    $dao->GuardarAjax("paciente_cliente",$datos);
		
		
	}


////////////////////////////////////////////////////MODIFICAR//////////////////////////////////////////////////////


		if($_POST['Requerimiento'] == "ModificarCliente"){

		
		$datos = array("ruc"=>$_POST["Ruc"],
								"apellido"=>$_POST["Apellido"],
								"nombre"=>$_POST["Nombre"],
								"telefono"=>$_POST["Telefono"],
								"email"=>$_POST["Email"],
								"direccion"=>$_POST["Direccion"],
								"credito"=>$_POST["Credito"],
								"id_estado"=>1,
								"usuario_registro"=>$_SESSION["usuario"]);
		
	    $dao= new Dao();
		$dao->ModificarAjax("paciente_cliente",$datos,"ruc=".$_POST['Ruc'],$_POST['Ruc']);
		
		
	}

////////////////////////////////////////////////////ELIMINAR//////////////////////////////////////////////////////	


	if($_POST['Requerimiento'] == "EliminarCliente"){

			
			$dao= new Dao();
			$dao->EliminarAjax("paciente_cliente",$_POST['Id']);
	}



	////////////////////////////////////////////////VALIDACION DE CEDULA///////////////////////////////////////////

	if($_POST['Requerimiento'] == "ExisteCedula"){

    $dao= new Dao();
    $cedula  = $_POST['Ruc'];
    if(strlen($cedula)>10){
        $cedula = substr($cedula,0,10);;
      }
	    $dao->Campo("id","");
	    $dao->Tabla("paciente_cliente","");
	    $dao->Where("ruc",$cedula,"");

    	$dao->ConsultarAjax();
  }



 /////////////////////////////////////////////SERVER SIDE///////////////////////////////////////////////
	if($_POST['Requerimiento'] == "LlenarTablaClienteJS"){

		$dao = new Dao(); 

		$dao->Campo("id","");
		$dao->Campo("ruc","");		
		$dao->Campo("CONCAT(apellido,' ',nombre) nombres","");
		$dao->Campo("email","");
		$dao->Campo("direccion","");
		$dao->Campo("telefono","");
		$dao->Campo("credito","");		

		$dao->Tabla("paciente_cliente","");		
		$dao->Where("id_estado","1","and");	
		$dao->Diferente("id","1","and");		
		
		
        if(isset($_POST["search"]["value"]) )  
        {  
                if(trim($_POST["search"]["value"])==""){
                	$dao->Where("1","1","");
                }else{
                	$dao->Filtrar("CONCAT(ruc,' ',apellido,' ',nombre)",$_POST["search"]["value"],"");
                }
                
                
        }    
        $dao->Ordenar("apellido,nombre");
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
		
        

		$respuesta =$dao->Consultar();
		
		$data = array();
		$total = 0;
		foreach ($respuesta as $row => $item){
			$total++;
			$sub_array = array(); 
			$Apellidos = explode(" ",$item[2]);

			if(!isset($Apellidos[0])){
				$Apellidos[0]=" ";
			}
			if(!isset($Apellidos[1])){
				$Apellidos[1]=" ";
			}
			if(!isset($Apellidos[2])){
				$Apellidos[2]=" ";
			}
			if(!isset($Apellidos[3])){
				$Apellidos[3]=" ";
			}
		/*	$editar = ' <i class="fa fa-pencil btn btn-sm btn-success btnEditar" registro="' . $item[0] . '" title="MODIFICAR REGISTRO"></i> ';
			$eliminar = ' <i class="fa fa-trash-o btn btn-sm btn-danger btnEliminar" registro="' . $item[0] . '" title="ELIMINAR REGISTRO"></i> ';*/
			$editar = '<button class="action-btn edit btnEditar" registro="' . $item[0] . '" title="Modificar"><i class="fa fa-pencil"></i></button>';
			$eliminar = '<button class="action-btn delete btnEliminar" registro="' . $item[0] . '" title="Eliminar"><i class="fa fa-trash-o"></i></button>';
		

			$item[0] = $editar . $eliminar;
			$sub_array[] =$item[0];
            $sub_array[] =$item[1];
            $sub_array[] =$Apellidos[0];
            $sub_array[] =$Apellidos[1];
            $sub_array[] =$Apellidos[2].' '.$Apellidos[3];
            $sub_array[] =$item[3];
            $sub_array[] =$item[4];
            $sub_array[] =$item[5];
            $sub_array[] =$item[6];
                   
            $data[] = $sub_array; 
		}

		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $total,  
                "recordsFiltered"=> $total,  
                "data"           => $data  
        );  
        echo json_encode($output);
	}
	if($_POST['Requerimiento'] == "LlenarTablaCliente"){

		$dao = new Dao(); 

		$dao->Campo("id","");
		$dao->Campo("ruc","");		
		$dao->Campo("CONCAT(apellido,' ',nombre) nombres","");
		$dao->Campo("email","");
		$dao->Campo("direccion","");
		$dao->Campo("telefono","");
		$dao->Campo("credito","");		

		$dao->Tabla("paciente_cliente","");		
		$dao->Where("id_estado","1","and");	
		$dao->Diferente("id","1","and");		
		
		
        if(isset($_POST["search"]["value"]) )  
        {  
                if(trim($_POST["search"]["value"])==""){
                	$dao->Where("1","1","");
                }else{
                	$dao->Filtrar("CONCAT(ruc,' ',apellido,' ',nombre)",$_POST["search"]["value"],"");
                }
                
                
        }    
        $dao->Ordenar("apellido,nombre");
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
		
        

		$respuesta =$dao->Consultar();
		
		$data = array();
		$total = 0;
		foreach ($respuesta as $row => $item){
			$total++;
			$sub_array = array(); 
			$Apellidos = explode(" ",$item[2]);

			if(!isset($Apellidos[0])){
				$Apellidos[0]=" ";
			}
			if(!isset($Apellidos[1])){
				$Apellidos[1]=" ";
			}
			if(!isset($Apellidos[2])){
				$Apellidos[2]=" ";
			}
			if(!isset($Apellidos[3])){
				$Apellidos[3]=" ";
			}
			$boton = '<button id="CargarDatos" idCliente="'.$item[0].'" class="btn btn-primary"><i class="fa fa-pencil" aria-hidden="true"></i></button>';
			$sub_array[] =$item[0];
            $sub_array[] =$item[1];
            $sub_array[] =$Apellidos[0];
            $sub_array[] =$Apellidos[1];
            $sub_array[] =$Apellidos[2].' '.$Apellidos[3];
            $sub_array[] =$item[3];
            $sub_array[] =$item[4];
            $sub_array[] =$item[5];            
            $sub_array[] =$boton;
            $sub_array[] =$item[6];
                   
            $data[] = $sub_array; 
		}

		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $total,  
                "recordsFiltered"=> $total,  
                "data"           => $data  
        );  
        echo json_encode($output);
	}
	if($_POST['Requerimiento'] == "ExportarDatos"){		
		$c = new Conexion();
		$conexion = $c->conectar();
		
		$writer = WriterEntityFactory::createXLSXWriter();
		$ruta = '../documentos/Clientes_'.date("Y-m-d H m i").".xlsx";
		//$writer->openToBrowser('Pacientes_'.date("Y-m-d H m i").".xlsx");
		$writer->openToFile($ruta);
		$dao = new Dao(); 

		$dao->Campo("id","");
		$dao->Campo("ruc","");
		$dao->Campo("apellido","");
		$dao->Campo("nombre","");
		$dao->Campo("email","");
		$dao->Campo("direccion","");
		$dao->Campo("telefono","");
		$dao->Campo("credito","");		

		$dao->Tabla("paciente_cliente","");		
		$dao->Where("id_estado","1","and");	
		$dao->Diferente("id","1","");		

		$query =$dao->Consultar2();

		$headerRow = ["ID","CEDULA/RUC","APELLIDOS","NOMBRES","EMAIL","DIRECCION","TELEFONO","CREDITO"];

		$headerStyle = (new StyleBuilder())->setFontBold()->build();
		$cabecera = WriterEntityFactory::createRowFromArray($headerRow, $headerStyle);
		$writer->addRow($cabecera);

		$idFieldName = 'id';	    	    
	    $iterador = new Iterador($conexion, $query, $idFieldName,1000);

	    foreach ($iterador as $dbRows) {	    	
	        foreach ($dbRows as $dbRow) {
	        	$reportRow = array();
	            for ($i=0; $i < count($dbRow); $i++) { 
	            	if(isset($dbRow[$i])){
	            		$reportRow [] = $dbRow[$i];
	            	}	                
	            }           
	            $rowFromValues = WriterEntityFactory::createRowFromArray($reportRow); 
	            $writer->addRow($rowFromValues);
	        }
	    }
	    $writer->close();
	    $jsondata = ["0" => substr($ruta,3) ];
	    echo json_encode($jsondata, JSON_FORCE_OBJECT);
	}
}

