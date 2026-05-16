 <?php
 
session_start();
date_default_timezone_set('America/Guayaquil'); 
require_once "autoloadAjax.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
		
if(isset($_POST['Requerimiento'])){

	function EnviarEmail($destinatario,$cliente,$fecha,$hora,$especialidad,$empresa){
	    session_write_close();
	    require_once '/usr/share/php/libphp-phpmailer/autoload.php';
	    $mail = new PHPMailer;

	    $mail->SMTPAuth = true;
	    $mail->Host = $_SESSION["HostSmtp"];
	    $mail->Username = $_SESSION["correoResultados"];
	    $mail->Password = $_SESSION["PsdCorreo2"];
	    $mail->SMTPSecure = ($_SESSION["SmtpSecure"]=="S") ? 'ssl' : "tls";
	    $mail->Port = $_SESSION["PuertoSmtp"];
	    $mail->From = $_SESSION["correoResultados"];
	    $mail->FromName = $_SESSION["empresa"];
	   
	    $mail->addAddress($destinatario); //Recipient name is optional
	    $mail->isHTML(true);

	    $mail->Subject = "RESERVACION CITA MEDICA";
	    $mail->Body = "ESTIMADO ".$cliente." SU CITA PARA LA ESPECIALIDAD ".$especialidad." FUE RESERVADA PARA EL DIA ".strtoupper($fecha)." A LAS ".$hora." HORAS <br>POR FAVOR LLEGAR 10 MINUTOS ANTES DE LA CITA.";
	    $mail->CharSet = 'UTF-8';
	    return  $mail->send();
	}
	function ObtenerFechaFormateada($fecha){
	    $datetime = DateTime::createFromFormat('Y-m-d', $fecha);
	    $dia = $datetime->format('D');
	    $mes = $datetime->format('F');	    
	     if($dia=="Mon"){
	         $dia ="Lunes";
	     }
	     if($dia=="Tue"){
	         $dia ="Martes";
	     }
	     if($dia=="Wed"){
	         $dia ="Miercoles";
	     }
	     if($dia=="Thu"){
	         $dia ="Jueves";
	     }
	     if($dia=="Fri"){
	         $dia ="Viernes";
	     }
	     if($dia=="Sat"){
	         $dia ="Sabado";
	     }
	     if($dia=="Sun"){
	         $dia ="Domingo";
	     }
	     switch ($mes) {
            case "January":
                $mes = "Enero";
                break;
            case "February":
                $mes = "Febrero";
                break;
            case "March":
                $mes = "Marzo";
                break;
            case "April":
                $mes = "Abril";
                break;
            case "May":
                $mes = "Mayo";
                break;
            case "June":
                $mes = "Junio";
                break;
            case "July":
                $mes = "Julio";
                break;
            case "August":
                $mes = "Agosto";
                break;
            case "September":
                $mes = "Septiembre";
                break;
            case "October":
                $mes = "Octubre";
                break;
            case "November":
                $mes = "Noviembre";
                break;
            case "December":
                $mes = "Diciembre";
                break;
        }
	     $dia = $dia . ", " . $datetime->format('d') . " de " . $mes . " de " . $datetime->format('Y');
	     return $dia;         
	}
	if($_POST['Requerimiento'] == "Reservar"){
		$datos = array(
			"id_paciente"=>$_POST["Paciente"],
			"fecha_reserva"=>$_POST["FechaReserva"],
			"id_empleado"=>$_POST["Empleado"],
			"id_especialidad"=>$_POST["Especialidad"],
			"id_procedimiento"=>$_POST["Procedimiento"],
			"consultorio"=>$_POST["Consultorio"],
			"id_estado"=>1
		);
		$dao= new Dao();
	    $dao->GuardarAjax("reservaciones",$datos);
	    $datetime = DateTime::createFromFormat('Y-m-d H:i:s', $_POST["FechaReserva"]);

	    EnviarEmail($_POST["Email"],
	    			$_POST["NPaciente"],
	    			ObtenerFechaFormateada($datetime->format('Y-m-d')),
	    			$datetime->format('H:i'),
	    			$_POST["NEspecialidad"],
	    			"WECARE"
	    		);	
	}

	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	function ObtenerDia($fecha){
	    $datetime = DateTime::createFromFormat('Y-m-d', $fecha);
	    $dia = $datetime->format('D');	    
	     if($dia=="Mon"){
	         $dia ="LUNES";
	     }
	     if($dia=="Tue"){
	         $dia ="MARTES";
	     }
	     if($dia=="Wed"){
	         $dia ="MIERCOLES";
	     }
	     if($dia=="Thu"){
	         $dia ="JUEVES";
	     }
	     if($dia=="Fri"){
	         $dia ="VIERNES";
	     }
	     if($dia=="Sat"){
	         $dia ="SABADO";
	     }
	     if($dia=="Sun"){
	         $dia ="DOMINGO";
	     }
	     
	     return $dia;         
	}
	


	function ObtenerReservados($fecha,$especialidad,$medico){

		$dao = new Dao();

		
		$dao->Campo("DATE_FORMAT(r.fecha_reserva,'%H:%i')","");	
		$dao->Tabla("reservaciones","r");

		$dao->In_Where("r.id_estado","1,26","and");
		$dao->Where("r.id_especialidad","'".$especialidad."'","and");
		$dao->Where("r.id_empleado","'".$medico."'","and");
		$dao->Where("CONVERT(r.fecha_reserva,date)","'".$fecha."'","");		

		$respuesta =$dao->Consultar();

		return $respuesta;
	}

	function ObtenerHorarios($inicio,$fin,$fecha){

        $disponibles = array();

        $hi=0;//hora inicio
        $hf=0;//hora fin

        $mi=0;//minitos inicio
        $mf=0;//minutos fin

        $hi=substr($inicio,0,strpos($inicio,":"));
        $mi=substr($inicio,strpos($inicio,":")+1);


        $hf=substr($fin,0,strpos($fin,":"));
        $mf=substr($fin,strpos($fin,":")+1);

             while (true){
                
                $d = array();
                $d[]=str_pad($hi,2, "0", STR_PAD_LEFT);
                $d[]=str_pad($mi,2, "0", STR_PAD_LEFT);

                $hoy = date("Y-m-d");
                if($hoy==$fecha){
                	$horaactual = date("H");
                	$minutoactual = date("i");
                	if($hi==$horaactual){
                		if($mi>$minutoactual){
                			$disponibles[] = $d;
                		}
                	}
                	if($hi>$horaactual){
	                    $disponibles[] = $d;
	                }	                
                }else{
                	if(strtotime($fecha) > time()) {                		
					    $disponibles[] = $d;
					}else{
						break;
					}
                }
                if($hi>$hf){
                	break;
                }
                if($hi==$hf){                	
                	if($mi>=$mf){
                		break;
                	}                    
                }

                $mi=$mi+30;
                if($mi>=60){
                    $hi++;
                    $mi=$mi-60;
                }
            }
            array_pop($disponibles);
        return $disponibles;
    }

	if($_POST['Requerimiento'] == "CargarTablaJS"){

		$dao = new Dao();

		
		$dao->Campo("meh.dia","");	
		$dao->Campo("meh.horaI","");
		$dao->Campo("meh.horaF","");
		$dao->Campo("0","boton");
		

		$dao->TablasInnerAlias("medico_especialidad_horario","meh","medico_especialidad","me");
		$dao->Where("1","1","and");

		if(isset($_POST["search"]["value"]))  
        {  
        		if(trim($_POST["search"]["value"])==""){
                	$dao->Where("1","1","and");
                }else{
                	$dao->Filtrar("meh.horaI",$_POST["search"]["value"],"and");                	
                }
                
                
        }
        $fechaUsuario = "";
        $especialidad = "0";
        $medico = "0";
        if(trim($_POST['columns'][1]["search"]["value"])==""){
			$dao->Where("1","2","");
		}else{
			
			$dao->Where("me.id_especialidad",$_POST['columns'][0]["search"]["value"],"and");
			$dao->Where("me.id_empleado",$_POST['columns'][1]["search"]["value"],"and");			

			$dao->Where("meh.dia","'".ObtenerDia($_POST['columns'][2]["search"]["value"])."'","");
			$fechaUsuario = $_POST['columns'][2]["search"]["value"];
			$especialidad = $_POST['columns'][0]["search"]["value"];
        	$medico = $_POST['columns'][1]["search"]["value"];
		}

		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
        
		$dao->Ordenar("meh.horaI");
        
		$respuesta =$dao->Consultar();
		
		$data = array();

		$totalFilter=0;		
		$turnosreservados = ObtenerReservados($fechaUsuario,$especialidad,$medico);
		foreach ($respuesta as $row => $item){

			$turnos = ObtenerHorarios($item[1],$item[2],$fechaUsuario);

			foreach ($turnosreservados as $row2 => $item2){
				foreach ($turnos as $key => $value) {
					$turno = $value[0].":".$value[1];
					if($item2[0] == $turno){
			            unset($turnos[$key]);
			            unset($turnosreservados[$row2]);
			            break;
			        }
				}
			}
			foreach ($turnos as $row1 => $item1){
				$totalFilter++;
				$fila = array();
				$fila[] = ObtenerFechaFormateada($fechaUsuario);
				$fila[] = $item1[0].":".$item1[1];
				$fila[] = '<input type="button" class="btn btn-sm btn-success reservarturno" value="Reservar">';				
				$data[] = $fila;				
			}            
		}		

		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $totalFilter,  
                "recordsFiltered"=> $totalFilter,  
                "data"           => $data  
        );  
        echo json_encode($output);
			
	}

	if($_POST['Requerimiento'] == "CargarTablaReservasFacturarJS"){

		$dao = new Dao();

		$dao->Campo("concat(p.apellido,' ',p.apellido_materno,' ',p.nombre)","");	
		$dao->Campo("r.fecha_reserva","");
		$dao->Campo("r.consultorio","");
		$dao->Campo("e.nombre","");
		$dao->Campo("pr.nombre","");
		$dao->Campo("concat(em.apellidos,' ',em.nombres)","");
		$dao->Campo("e.id","");
		$dao->Campo("em.id","");
		$dao->Campo("pr.id","");
		$dao->Campo("pr.precio","");
		$dao->Campo("e.id_tipo_servicio","");
		$dao->Campo("p.id","");
		$dao->Campo("p.cedula","");		
		$dao->Campo("p.apellido","");
		$dao->Campo("p.apellido_materno","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.email","");
		$dao->Campo("p.direccion","");
		$dao->Campo("p.telefono","");
		$dao->Campo("CONVERT(p.fecha_nacimiento,DATE)","");
		$dao->Campo("r.id","");
		$dao->TablasInnerAlias("reservaciones","r","paciente","p");
		$dao->TablasInnerAlias("reservaciones","r","especialidad","e");
		$dao->TablasInnerAlias("reservaciones","r","procedimiento","pr");
		$dao->TablasInnerAlias("reservaciones","r","empleado","em");
		$dao->Where("r.id_estado","1","and");
		

		if(isset($_POST["search"]["value"]))  
        {  
			if(trim($_POST["search"]["value"])==""){
				$dao->Where("1","1","and");
			}else{
				$dao->Filtrar("concat(p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',e.nombre,' ',em.apellidos,' ',em.nombres)",$_POST["search"]["value"],"and");                	
			}
        }
		
		if(trim($_POST['columns'][1]["search"]["value"])==""){
			$dao->Where("CONVERT(r.fecha_reserva,DATE)",'CURDATE()',"");
		}else{				
			
			$dao->Entre("CONVERT(r.fecha_reserva,DATE)","'".$_POST['columns'][1]["search"]["value"]."'","'".$_POST['columns'][2]["search"]["value"]."'","");
		}        

		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
        
		$dao->Ordenar("r.fecha_reserva,concat(p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',e.nombre,' ',em.apellidos,' ',em.nombres)");
        
		$respuesta =$dao->Consultar();
		
		$data = array();

		$totalFilter=0;		
		
		foreach ($respuesta as $row => $item){
			$totalFilter++;		
			$data[] = $item;             
		}		

		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $totalFilter,  
                "recordsFiltered"=> $totalFilter,  
                "data"           => $data  
        );  
        echo json_encode($output);
			
	}
	function Escribir($texto){
        $myfile = fopen("debug.txt", "w") or die("Unable to open file!");        
        fwrite($myfile, $texto."\n");        
        fclose($myfile);
    }
	if($_POST['Requerimiento'] == "CargarTablaReservasReservaJS"){

		$dao = new Dao();

		$dao->Campo("concat(p.apellido,' ',p.apellido_materno,' ',p.nombre)","");	
		$dao->Campo("p.telefono","");
		$dao->Campo("r.fecha_reserva","");
		$dao->Campo("r.consultorio","");
		$dao->Campo("e.nombre","");
		$dao->Campo("pr.nombre","");
		$dao->Campo("concat(em.apellidos,' ',em.nombres)","");
		$dao->Campo("r.id","");
		$dao->Campo("r.id","");
		$dao->Campo("r.confirmada","");
		
		$dao->TablasInnerAlias("reservaciones","r","paciente","p");
		$dao->TablasInnerAlias("reservaciones","r","especialidad","e");
		$dao->TablasInnerAlias("reservaciones","r","procedimiento","pr");
		$dao->TablasInnerAlias("reservaciones","r","empleado","em");
		$dao->Diferente("r.cancelada","'S'","and");
		

		if(isset($_POST["search"]["value"]))  
        {  
			if(trim($_POST["search"]["value"])==""){
				$dao->Where("1","1","and");
			}else{
				$dao->Filtrar("concat(p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',e.nombre,' ',em.apellidos,' ',em.nombres)",$_POST["search"]["value"],"and");                	
			}
        }
		
		if(trim($_POST['columns'][1]["search"]["value"])==""){
			$dao->Where("CONVERT(r.fecha_reserva,DATE)",'CURDATE()',"");
		}else{				
			
			$dao->Entre("CONVERT(r.fecha_reserva,DATE)","'".$_POST['columns'][1]["search"]["value"]."'","'".$_POST['columns'][2]["search"]["value"]."'","");
		}        

		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
        
		$dao->Ordenar("r.fecha_reserva,concat(p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',e.nombre,' ',em.apellidos,' ',em.nombres)");
        
		$respuesta =$dao->Consultar();
		
		$data = array();

		$totalFilter=0;		
		
		foreach ($respuesta as $row => $item){
			$totalFilter++;
			if($item[9]=="S"){
				$item[7] = '<input type="checkbox" checked class="ConfirmarReserva" id="'.$item[7].'">';
			}else{
				$item[7] = '<input type="checkbox" class="ConfirmarReserva" id="'.$item[7].'">';
			}
				
			
			$item[8] = '<button idReserva='.$item[8].' type="button" class="EliminarReserva btn btn-sm btn-danger col-md-12 nopadding">Eliminar</button>
				<button idReserva='.$item[8].' type="button" class="CancelarReserva btn btn-sm btn-warning col-md-12 nopadding">Cancelar</button>';
			$data[] = $item;             
		}		

		$output = array(  
                "draw"           => intval($_POST["draw"]),  
                "recordsTotal"   => $totalFilter,  
                "recordsFiltered"=> $totalFilter,  
                "data"           => $data  
        );  
        echo json_encode($output);
			
	}

	if($_POST['Requerimiento'] == "EliminarReserva"){

		$dao= new Dao();
	    $dao->EliminarAjax("reservaciones",$_POST['Reserva']);		
		
	}

	if($_POST['Requerimiento'] == "ConfirmarReserva"){
		$datos = array("confirmada"=>$_POST["Confirmada"]);
		$dao= new Dao();
		$dao->ModificarAjax("reservaciones",$datos,"id=".$_POST['Reserva'],$_POST['Reserva']);
	}
	if($_POST['Requerimiento'] == "CancelarReserva"){
		$datos = array("cancelada"=>"S");
		$dao= new Dao();
		$dao->ModificarAjax("reservaciones",$datos,"id=".$_POST['Reserva'],$_POST['Reserva']);
	}

	if($_POST['Requerimiento'] == "CargarReservaciones"){

		$dao = new Dao();

		$dao->Campo("concat(p.apellido,' ',p.apellido_materno,' ',p.nombre)","");	
		$dao->Campo("p.telefono","");
		$dao->Campo("r.fecha_reserva","");		
		$dao->Campo("e.nombre","");
		$dao->Campo("pr.nombre","");
		$dao->Campo("concat(em.apellidos,' ',em.nombres)","");		
		$dao->Campo("r.confirmada","");
		$dao->Campo("r.cancelada","");
		
		$dao->TablasInnerAlias("reservaciones","r","paciente","p");
		$dao->TablasInnerAlias("reservaciones","r","especialidad","e");
		$dao->TablasInnerAlias("reservaciones","r","procedimiento","pr");
		$dao->TablasInnerAlias("reservaciones","r","empleado","em");
		
		if(isset($_POST["search"]["value"]))  
        {  
			if(trim($_POST["search"]["value"])==""){
				$dao->Where("1","1","and");
			}else{
				$dao->Filtrar("concat(p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',e.nombre,' ',em.apellidos,' ',em.nombres)",$_POST["search"]["value"],"and");                	
			}
        }
		
		if(trim($_POST['columns'][1]["search"]["value"])==""){
			$dao->Where("CONVERT(r.fecha_reserva,DATE)",'CURDATE()',"");
		}else{				
			
			$dao->Entre("CONVERT(r.fecha_reserva,DATE)","'".$_POST['columns'][1]["search"]["value"]."'","'".$_POST['columns'][2]["search"]["value"]."'","");
		}        

		if($_POST["length"] != -1)  
        {  
           $dao->Limite($_POST['start'].",".$_POST['length']);  
        }  
        
		$dao->Ordenar("r.fecha_reserva,concat(p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',e.nombre,' ',em.apellidos,' ',em.nombres)");
        
		$respuesta =$dao->Consultar();
		
		$data = array();

		$totalFilter=0;		
		
		foreach ($respuesta as $row => $item){
			$totalFilter++;			
			$data[] = $item;             
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
