<?php

session_start();
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){


	if($_POST['Requerimiento'] == "GuardarOdontograma"){

		
		$dao = new Dao();

		$datos = array("id_consulta"=>$_POST["Consulta"],
						"id_estado"=>1,
						"odontograma"=>$_POST["Odontograma"],
						"id_paciente"=>$_POST["Paciente"],
						"usuario_registro"=>$_SESSION["usuario"]);
						$dao= new Dao();
			            $dao->GuardarAjax("paciente_odontograma",$datos);
		
		
	}
	if($_POST['Requerimiento'] == "GuardarOdontogramaDetalle"){

		
		$dao = new Dao();

		$datos = array("id_paciente_odontograma"=>$_POST["Odontograma"],
						"id_estado"=>1,
						"diente"=>$_POST["Diente"],
						"observacion"=>$_POST["Observacion"],
						"procedimiento"=>$_POST["Procedimiento"],
						"usuario_registro"=>$_SESSION["usuario"]);

						$dao= new Dao();
			            $dao->GuardarAjax("odontograma_detalle",$datos);
		
		
	}

	if($_POST['Requerimiento'] == "CargarOdontograma"){

		
		$dao= new Dao();
		
		$dao->Campo("odontograma","");
	    
	    

		$dao->Tabla("paciente_odontograma","");
		
		$dao->Where("id_consulta",$_POST['Consulta'],"and");
		$dao->Where("id_paciente",$_POST['Paciente'],"");


		$dao->ConsultarAjax();
		
		
	}
	if($_POST['Requerimiento'] == "CargarUltimoOdontograma"){

		
		$dao= new Dao();
		
		$dao->Campo("odontograma","");
	    	 
		$dao->Tabla("paciente_odontograma","");		
		$dao->Where("id_paciente",$_POST['Paciente'],"");
		$dao->Ordenar("id desc");
		$dao->Limite("0,1");
		$dao->ConsultarAjax();
		
		
	}
	if($_POST['Requerimiento'] == "CargarOdontogramaDetalle"){

		
		$dao= new Dao();
		
		$dao->Campo("CONVERT(od.fecha_registro,DATE)","");
	    $dao->Campo("od.procedimiento","");
	    $dao->Campo("od.diente","");
	    $dao->Campo("od.observacion","");
	    $dao->Campo("od.usuario_registro","");

		
		$dao->TablasInnerAlias("odontograma_detalle","od","paciente_odontograma","po");
		
		$dao->Where("po.id_paciente",$_POST['Paciente'],"");


		$dao->ConsultarAjax();
		
		
	}

	if($_POST['Requerimiento'] == "GuardarOrdenOdon"){

		
		$dao = new Dao();

		$datos = array("id_consulta"=>$_POST["Consulta"],
						"id_estado"=>1,
						"id_paciente"=>$_POST["Paciente"],
						"periodo"=>$_POST["Periodo"],
						"fecha_inicio"=>$_POST["FechaI"],
						"pagos"=>$_POST["Pagos"],
						"monto"=>$_POST["Monto"],
						"id_procedimiento"=>$_POST["Procedimiento"],
						"id_empleado"=>$_SESSION["id_empleado"],
						"usuario_registro"=>$_SESSION["usuario"]);

						$dao= new Dao();
			            $dao->GuardarAjax("orden_odon",$datos);
		
		
	}

	if($_POST['Requerimiento'] == "GuardarOrdenOdonDetalle"){

		
		$dao = new Dao();

		$datos = array("id_orden_odon"=>$_POST["Orden"],
						"id_estado"=>1,
						"pago"=>$_POST["Pago"],
						"fecha"=>$_POST["Fecha"],						
						"monto"=>$_POST["Monto"]
						);

						$dao= new Dao();
			            $dao->GuardarAjax("orden_odon_detalle",$datos);
		
		
	}


	if($_POST['Requerimiento'] == "CargarHistoricoConsultas"){

		$dao = new Dao(); 

		$dao->Campo("fecha_atencion","");
		$dao->Campo("especialidad","");
		$dao->Campo("evolucion","");
		$dao->Campo("medico","");

		$dao->Tabla("paciente_historico ","");		
		$dao->Where("id_paciente",$_POST['Id'],"");
		
		$dao->Ordenar("fecha_atencion desc");

		$dao->ConsultarAjax();
	}
}
