<?php
session_start();
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

  if($_POST['Requerimiento'] == "CargaComboAnidado"){

    $dao= new Dao();

	    $dao->Campo("id","");
	    $dao->Campo("nombre","");
	    $dao->Tabla("canton","");
	    $dao->Where("id_estado","1","and");
	    $dao->Where("id_provincia",$_POST['Id'],"");

    $dao->ConsultarAjax();
  }


   if($_POST['Requerimiento'] == "CargaComboAnidadoMotivo"){

    $dao= new Dao();

	    $dao->Campo("id","");
	    $dao->Campo("descripcion","");
	    $dao->Tabla("canton","");
	    $dao->Where("id_estado","1","and");
	    $dao->Where("id_provincia",$_POST['Id'],"");

    $dao->ConsultarAjax();
  }


  if($_POST['Requerimiento'] == "CargaComboAnidado2"){

    $dao= new Dao();

	    $dao->Campo("id","");
	    $dao->Campo("nombre","");
	    $dao->Tabla("parroquia","");
	    $dao->Where("id_estado","1","and");
	    $dao->Where("id_canton",$_POST['Id'],"");

    $dao->ConsultarAjax();
  }

  if($_POST['Requerimiento'] == "GuardaPaciente"){

		$datos = array("cedula"=>$_POST["Cedula"],
						"nombre"=>$_POST["Nombre"],
						"apellido"=>$_POST["Apellido"],
						"telefono"=>$_POST["Telefono"],
						"email"=>$_POST["Correo"],
						"direccion"=>$_POST["Direccion"],
						"fecha_nacimiento"=>$_POST["Fecha"],
						"ocupacion"=>$_POST["Ocupacion"],
						"id_canton"=>$_POST["Canton"],
						"estado_civil"=>$_POST["EstadoCivil"],
						"id_genero"=>4,	
						"id_genero2"=>3,	
						"id_migrante"=>1,
						"id_migrante2"=>16,
						"id_etnia"=>6,
						"id_prioridad"=>14,
						"id_residencia"=>1,
						"id_afiliacion"=>10,
						"id_instruccion"=>1,
						"id_estado"=>1,
						"usuario_registro"=>$_SESSION["usuario"]);
		$dao= new Dao();
	    $dao->GuardarAjax("paciente",$datos);	
	}

	if($_POST['Requerimiento'] == "ModificaEpidemia"){

		$datos = array("id_genero"=>$_POST["Genero"],	
						"id_genero2"=>$_POST["Genero2"],											
						"id_etnia"=>$_POST["Etnia"],
						"id_migrante"=>$_POST["Migrante"],	
						"id_migrante2"=>$_POST["Migrante2"],						
						"id_prioridad"=>$_POST["Grupo"],
						"id_residencia"=>$_POST["Sector"],
						"usuario_modifico"=>$_SESSION["usuario"]);
						$dao= new Dao();
						$dao->ModificarAjax("paciente",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "ModificaTrabajo"){

		$datos = array("id_afiliacion"=>$_POST["Afiliacion"],							
						"id_instruccion"=>$_POST["Instruccion"],
						"nombre_responsable"=>$_POST["NombreRes"],
						"parentesco"=>$_POST["ResParen"],
						"codigo_vih"=>$_POST["Codigo"],
						"parentes_telefono"=>$_POST["NumeroRes"],
						"usuario_modifico"=>$_SESSION["usuario"]);
						
						$dao= new Dao();
						$dao->ModificarAjax("paciente",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}

	if($_POST['Requerimiento'] == "GuardaClientePaciente"){

		$datos = array("ruc"=>$_POST["Ruc"],
						"nombre"=>$_POST["Nombre"],
						"apellido"=>$_POST["Apellido"],
						"telefono"=>$_POST["Telefono"],
						"email"=>$_POST["Correo"],
						"direccion"=>$_POST["Direccion"],
						"id_paciente"=>$_POST["IdPaciente"],
						"id_estado"=>1);
		$dao= new Dao();
	    $dao->GuardarAjax("paciente_cliente",$datos);	
	}

	if($_POST['Requerimiento'] == "ModificaPaciente"){

		$datos = array("cedula"=>$_POST["Cedula"],
						"nombre"=>$_POST["Nombre"],
						"apellido"=>$_POST["Apellido"],
						"telefono"=>$_POST["Telefono"],
						"email"=>$_POST["Correo"],
						"direccion"=>$_POST["Direccion"],
						"fecha_nacimiento"=>$_POST["Fecha"],
						"ocupacion"=>$_POST["Ocupacion"],
						"id_canton"=>$_POST["Canton"],
						"estado_civil"=>$_POST["EstadoCivil"],
						"usuario_modifico"=>$_SESSION["usuario"]);

						$dao= new Dao();
					    $dao->ModificarAjax("paciente",$datos,"id=".$_POST['Id'],$_POST['Id']);	
	}

	if($_POST['Requerimiento'] == "ModificaSoloCorreo"){

		$datos = array("email"=>$_POST["Correo"]);

						$dao= new Dao();
					    $dao->ModificarAjax("paciente",$datos,"id=".$_POST['Id'],$_POST['Id']);	
	}

	if($_POST['Requerimiento'] == "EliminaPaciente"){

		$datos = array("id_estado"=>2);
		$dao= new Dao();
	    $dao->ModificarAjax("paciente",$datos,"id=".$_POST['Id'],$_POST['Id']);
	}


	if($_POST['Requerimiento'] == "LlenarTablaPaciente"){

		$dao = new Dao(); 

		$dao->Campo("p.id","");
		$dao->Campo("p.cedula","");
		$dao->Campo("p.apellido","");
		$dao->Campo("p.nombre","");		
		$dao->Campo("Date_format(p.fecha_nacimiento,'%Y-%m-%d')","");
		$dao->Campo("p.direccion","");
		$dao->Campo("c.nombre","");
		$dao->Campo("p.telefono","");		
		$dao->Campo("p.email","");
		$dao->Campo("p.estado_civil","");
		$dao->Campo("p.ocupacion","");
		$dao->Campo("g.nombre","");
		$dao->Campo("g2.nombre","");
		$dao->Campo("e.nombre","");
		$dao->Campo("m.nombre","");	
		$dao->Campo("m2.nombre","");		
		$dao->Campo("pr.nombre","");
		$dao->Campo("r.nombre","");
		$dao->Campo("p.codigo_vih","");
		$dao->Campo("a.nombre","");
		$dao->Campo("i.nombre","");
		$dao->Campo("p.nombre_responsable","");
		$dao->Campo("p.parentesco","");
		$dao->Campo("p.parentes_telefono","");
		$dao->Campo("p.usuario_registro","");
		$dao->Campo("p.fecha_registro","");
		$dao->Campo("c.id","");
		$dao->Campo("CONCAT(p.apellido,' ',p.nombre) nombres","");

		$dao->TablasInnerAlias("paciente","p","genero","g");
		$dao->TablasInnerAlias("paciente","p","genero2","g2");
		$dao->TablasInnerAlias("paciente","p","migrante","m");
		$dao->TablasInnerAlias("paciente","p","migrante2","m2");
		$dao->TablasInnerAlias("paciente","p","etnia","e");
		$dao->TablasInnerAlias("paciente","p","prioridad","pr");
		$dao->TablasInnerAlias("paciente","p","residencia","r");
		$dao->TablasInnerAlias("paciente","p","afiliacion","a");
		$dao->TablasInnerAlias("paciente","p","instruccion","i");
		$dao->TablasInnerAlias("paciente","p","canton","c");
		$dao->TablasInnerAlias("canton","c","provincia","pro");
		$dao->In_Where("p.id_estado","1,16","and");		
		
		$apellidosBuscar="";
		if(isset($_POST['columns'][2]["search"]["value"]))  
        {  
        		if(trim($_POST['columns'][2]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->FiltrarIzquierda("p.apellido",$_POST['columns'][2]["search"]["value"],"and");
                	//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
                }
                
                
        }
        
        if(isset($_POST['columns'][3]["search"]["value"]) )  
        {  
                
                if(trim($_POST['columns'][3]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->FiltrarDerecha("p.apellido",$_POST['columns'][3]["search"]["value"],"and");
                	$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
                }

                
                
        }

       /* if($apellidosBuscar!=""){
        	$dao->FULLTEXT("apellido",$apellidosBuscar,"and");
        }*/

        if(isset($_POST['columns'][4]["search"]["value"]) )  
        {  
                if(trim($_POST['columns'][4]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->FiltrarIzquierda("p.nombre",$_POST['columns'][4]["search"]["value"],"and");
                }
                
                
        }
        if(isset($_POST['columns'][1]["search"]["value"]) )  
        {  
                if(trim($_POST['columns'][1]["search"]["value"])==""){
                	$dao->Where("1","1","");
                }else{
                	$dao->FiltrarIzquierda("p.cedula",$_POST['columns'][1]["search"]["value"],"");
                }
                
                
        }    
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
		
        //$dao->Ordenar("apellido,nombre");  
		

		$respuesta =$dao->Consultar();
		
		$data = array();

		function array_sort_by(&$arrIni, $col, $order = SORT_ASC)
		{
		    $arrAux = array();
		    foreach ($arrIni as $key=> $row)
		    {
		        $arrAux[$key] = is_object($row) ? $arrAux[$key] = $row->$col : $row[$col];
		        $arrAux[$key] = strtolower($arrAux[$key]);
		    }
		    array_multisort($arrAux, $order, $arrIni);
		}
		array_sort_by($respuesta, 'nombres', $order = SORT_ASC);

		foreach ($respuesta as $row => $item){

			$sub_array = array(); 
		
            $sub_array[] =$item[0];
            $sub_array[] =$item[1];
            $sub_array[] =$item[2];
            $sub_array[] =$item[3];
            $sub_array[] =$item[4];
            $sub_array[] =$item[5];
            $sub_array[] =$item[24].' '.$item[6];
            
            $sub_array[] =$item[7];
            $sub_array[] =$item[8];
            $sub_array[] =$item[9];
            $sub_array[] =$item[10];
            $sub_array[] =$item[11];
            $sub_array[] =$item[12];
            $sub_array[] =$item[13];
            $sub_array[] =$item[14];
            $sub_array[] =$item[15];
            $sub_array[] =$item[16];
            $sub_array[] =$item[17];
            $sub_array[] =$item[18];
            $sub_array[] =$item[19];
            $sub_array[] =$item[20];
            $sub_array[] =$item[21];
            $sub_array[] =$item[22];
            $sub_array[] =$item[23];
            $sub_array[] =$item[24];
            $sub_array[] =$item[25];
                        
            $data[] = $sub_array; 
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("paciente","");
	    $dao->In_Where("id_estado","1,16","");

	    $respuesta1 =$dao->Consultar();
	    $total=0;
	    foreach ($respuesta1 as $row => $item){
	    	$total= $item[0];
	    }

		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $total,  
                "recordsFiltered"=> $total,  
                "data"           => $data  
        );  
        echo json_encode($output);
	}

	if($_POST['Requerimiento'] == "LlenarTablaPacienteFactura"){

		$dao = new Dao(); 

		$dao->Campo("id","");
		$dao->Campo("cedula","");		
		$dao->Campo("CONCAT(apellido,' ',nombre) nombres","");
		//$dao->Campo("nombre","");
		$dao->Campo("email","");
		$dao->Campo("direccion","");
		$dao->Campo("telefono","");
		$dao->Campo("CONVERT(fecha_nacimiento,DATE)","");		

		$dao->Tabla("paciente","");		
		$dao->In_Where("id_estado","16,1","and");	
		//$dao->Where("YEAR(fecha_nacimiento)","2000","and");		
		$apellidosBuscar="";
		if(isset($_POST['columns'][2]["search"]["value"]))  
        {  
        		if(trim($_POST['columns'][2]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->FiltrarIzquierda("apellido",$_POST['columns'][2]["search"]["value"],"and");
                	//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
                }
                
                
        }
        
        if(isset($_POST['columns'][3]["search"]["value"]) )  
        {  
                
                if(trim($_POST['columns'][3]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->FiltrarDerecha("apellido",$_POST['columns'][3]["search"]["value"],"and");
                	$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
                }

                
                
        }

       /* if($apellidosBuscar!=""){
        	$dao->FULLTEXT("apellido",$apellidosBuscar,"and");
        }*/

        if(isset($_POST['columns'][4]["search"]["value"]) )  
        {  
                if(trim($_POST['columns'][4]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->FiltrarIzquierda("nombre",$_POST['columns'][4]["search"]["value"],"and");
                }
                
                
        }
        if(isset($_POST['columns'][1]["search"]["value"]) )  
        {  
                if(trim($_POST['columns'][1]["search"]["value"])==""){
                	$dao->Where("1","1","");
                }else{
                	$dao->FiltrarIzquierda("cedula",$_POST['columns'][1]["search"]["value"],"");
                }
                
                
        }    
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
		
       // $dao->Ordenar("nombres");  

		$respuesta =$dao->Consultar();
		
		$data = array();
		

		function array_sort_by(&$arrIni, $col, $order = SORT_ASC)
		{
		    $arrAux = array();
		    foreach ($arrIni as $key=> $row)
		    {
		        $arrAux[$key] = is_object($row) ? $arrAux[$key] = $row->$col : $row[$col];
		        $arrAux[$key] = strtolower($arrAux[$key]);
		    }
		    array_multisort($arrAux, $order, $arrIni);
		}
		array_sort_by($respuesta, 'nombres', $order = SORT_ASC);
		foreach ($respuesta as $row => $item){

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

            $sub_array[] =$item[0];
            $sub_array[] =$item[1];
            $sub_array[] =$Apellidos[0];
            $sub_array[] =$Apellidos[1];
            $sub_array[] =$Apellidos[2].' '.$Apellidos[3];
            $sub_array[] =$item[3];
            $sub_array[] =$item[4];
            $sub_array[] ='<span fecha_nacimiento="'.$item[6].'">'.$item[5].'</span>';
           
                        
            $data[] = $sub_array; 
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("paciente","");
	    $dao->In_Where("id_estado","1,16","");

	    $respuesta1 =$dao->Consultar();
	    $total=0;
	    foreach ($respuesta1 as $row => $item){
	    	$total= $item[0];
	    }

		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $total,  
                "recordsFiltered"=> $total,  
                "data"           => $data  
        );  
        echo json_encode($output);
	}

	if($_POST['Requerimiento'] == "LlenarTablaClienteFactura"){

		$dao = new Dao(); 

		$dao->Campo("id","");
		$dao->Campo("ruc","");		
		$dao->Campo("CONCAT(apellido,' ',nombre) nombres","");
		$dao->Campo("email","");
		$dao->Campo("direccion","");
		$dao->Campo("telefono","");		

		$dao->Tabla("paciente_cliente","");		
		$dao->Where("id_estado","1","and");	
		$dao->Diferente("id","1","and");		
		
		if(isset($_POST['columns'][2]["search"]["value"]))  
        {  
        		if(trim($_POST['columns'][2]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->FiltrarIzquierda("apellido",$_POST['columns'][2]["search"]["value"],"and");
                }
                
                
        }  
        if(isset($_POST['columns'][3]["search"]["value"]) )  
        {  
                
                if(trim($_POST['columns'][3]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->FiltrarDerecha("apellido",$_POST['columns'][3]["search"]["value"],"and");
                }

                
                
        }
        if(isset($_POST['columns'][4]["search"]["value"]) )  
        {  
                if(trim($_POST['columns'][4]["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->FiltrarIzquierda("nombre",$_POST['columns'][4]["search"]["value"],"and");
                }
                
                
        }
        if(isset($_POST['columns'][1]["search"]["value"]) )  
        {  
                if(trim($_POST['columns'][1]["search"]["value"])==""){
                	$dao->Where("1","1","");
                }else{
                	$dao->FiltrarIzquierda("ruc",$_POST['columns'][1]["search"]["value"],"");
                }
                
                
        }    
		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
		
        

		$respuesta =$dao->Consultar();
		
		$data = array();

		function array_sort_by(&$arrIni, $col, $order = SORT_ASC)
		{
		    $arrAux = array();
		    foreach ($arrIni as $key=> $row)
		    {
		        $arrAux[$key] = is_object($row) ? $arrAux[$key] = $row->$col : $row[$col];
		        $arrAux[$key] = strtolower($arrAux[$key]);
		    }
		    array_multisort($arrAux, $order, $arrIni);
		}
		array_sort_by($respuesta, 'nombres', $order = SORT_ASC);

		foreach ($respuesta as $row => $item){

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

            $sub_array[] =$item[0];
            $sub_array[] =$item[1];
            $sub_array[] =$Apellidos[0];
            $sub_array[] =$Apellidos[1];
            $sub_array[] =$Apellidos[2].' '.$Apellidos[3];
            $sub_array[] =$item[3];
            $sub_array[] =$item[4];
            $sub_array[] =$item[5];
           
                        
            $data[] = $sub_array; 
		}

		$dao = new Dao();

		$dao->Contar();
		$dao->Tabla("paciente_cliente","");
	    $dao->Where("id_estado","1","");

	    $respuesta1 =$dao->Consultar();
	    $total=0;
	    foreach ($respuesta1 as $row => $item){
	    	$total= $item[0];
	    }

		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $total,  
                "recordsFiltered"=> $total,  
                "data"           => $data  
        );  
        echo json_encode($output);
	}

	if($_POST['Requerimiento'] == "CargarPacientePorId"){

		$dao = new Dao(); 

		$dao->Campo("p.id","");
		$dao->Campo("p.cedula","");
		$dao->Campo("p.apellido","");
		$dao->Campo("p.nombre","");		
		$dao->Campo("Date_format(p.fecha_nacimiento,'%Y-%m-%d')","");
		$dao->Campo("p.direccion","");
		$dao->Campo("c.id","");
		$dao->Campo("c.nombre","");
		$dao->Campo("p.telefono","");		
		$dao->Campo("p.email","");
		$dao->Campo("p.estado_civil","");
		$dao->Campo("p.ocupacion","");

		$dao->TablasInnerAlias("paciente","p","canton","c");
		$dao->In_Where("p.id_estado","1,16","and");	
		$dao->Where("p.id",$_POST['Id'],"");
		
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarClientePorIdConsulta"){

		$dao = new Dao(); 

		$dao->Campo("p.id","");
		$dao->Campo("p.ruc","");
		$dao->Campo("p.apellido","");
		$dao->Campo("p.nombre","");			
		$dao->Campo("p.direccion","");
		$dao->Campo("p.telefono","");		
		$dao->Campo("p.email","");
		

		$dao->Tabla("paciente_cliente","p");
		$dao->Where("p.id_estado","1","and");	
		$dao->Where("p.id",$_POST['Id'],"");
		
		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
	}

	if($_POST['Requerimiento'] == "CargarEpidemiologico"){

		$dao = new Dao(); 

		$dao->Campo("p.id_genero","");
		$dao->Campo("p.id_genero2","");
		$dao->Campo("p.id_etnia","");
		$dao->Campo("p.id_migrante","");			
		$dao->Campo("p.id_migrante2","");
		$dao->Campo("p.id_prioridad","");		
		$dao->Campo("p.id_residencia","");
		$dao->Campo("p.codigo_vih","");
		$dao->Campo("p.id_afiliacion","");
		$dao->Campo("p.id_instruccion","");
		$dao->Campo("p.nombre_responsable","");
		$dao->Campo("p.parentesco","");
		$dao->Campo("p.parentes_telefono","");

		$dao->Tabla("paciente","p");
		$dao->Where("p.id_estado","1","and");	
		$dao->Where("p.id",$_POST['IdPaciente'],"");
		
		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoPaciente"){

		$datos = array("id_estado"=>$_POST["Estado"]);

		$dao= new Dao();
		$dao->ModificarAjax("paciente",$datos,"id=".$_POST['Id'],$_POST['Id']);	
	}

}
