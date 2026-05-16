<?php

session_start();
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){


if($_POST['Requerimiento'] == "GuardarPlan"){

		$datos = array("nombre"=>$_POST["Nombre"],
								"valor"=>$_POST["Valor"],
								"valor_descuento"=>$_POST["Descuento"],
								"id_estado"=>1,
								"usuario_registro"=>$_SESSION["usuario"]);

			


		$dao= new Dao();
	    $dao->GuardarAjax("plan",$datos);
		
		
	}
////////////////////////////////////////////////////////DETALLA DEL PLAN////////////////////////////////////////////////

	if($_POST['Requerimiento'] == "GuardarDetallePlanes"){

		$datos = array($_POST["Tipo"]=>$_POST["Id"],
						"id_plan"=>$_POST["Plan"]);
		$dao= new Dao();
	    $dao->GuardarAjax("plan_detalle",$datos);
		
		
	}

	////////////////////////////////////////////////////MODIFICAR//////////////////////////////////////////////////////


	if($_POST['Requerimiento'] == "ModificaPlan"){

		
		$datos = array("nombre"=>$_POST["Nombre"],
								"valor"=>$_POST["Valor"],
								"valor_descuento"=>$_POST["Descuento"],
								"usuario_modifico"=>$_SESSION["usuario"]);
		
	    $dao= new Dao();

		$dao->Eliminar("plan_detalle","id_plan=".$_POST['Id']);

		$dao->ModificarAjax("plan",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
		
	}


	////////////////////////////////////////////////////ELIMINAR//////////////////////////////////////////////////////	


	if($_POST['Requerimiento'] == "EliminaPlan"){

			
			$dao= new Dao();
			$dao->Eliminar("plan_detalle","id_plan=".$_POST['Id']);

			$dao->EliminarAjax("plan",$_POST['Id']);
	}

	function CargarPlanProcedimientos($plan){

		$dao = new Dao();

		//$dao->Campo("p.id","");
		$dao->Campo("e.nombre","");
		$dao->Campo("p.nombre","");
		
		$dao->TablasInnerAlias("plan_detalle","pd","procedimiento","p");
		$dao->TablasInnerAlias("procedimiento","p","especialidad","e");
		$dao->Where("pd.id_plan",$plan,"");
		

		$respuesta =$dao->Consultar();

		$jsondata = '';
		$i = 0;
		foreach ($respuesta as $row => $item){
			$jsondata .= $item[0].' - '.$item[1].'<br>';
			$i++;
		}

		return $jsondata;
	}
	function CargarPlanLaboratorio($plan){

		$dao = new Dao();

		//$dao->Campo("p.id","");
		//$dao->Campo("e.nombre","");
		$dao->Campo("p.nombre","");
		
		$dao->TablasInnerAlias("plan_detalle","pd","procedimiento_laboratorio","p");
		//$dao->TablasInnerAlias("procedimiento","p","especialidad","e");
		$dao->Where("pd.id_plan",$plan,"");
		

		$respuesta =$dao->Consultar();

		$jsondata = '';
		$i = 0;
		foreach ($respuesta as $row => $item){
			$jsondata .= $item[0].'<br>';
			$i++;
		}

		return $jsondata;
	}
	function CargarPlanRx($plan){

		$dao = new Dao();

		//$dao->Campo("p.id","");
		//$dao->Campo("e.nombre","");
		$dao->Campo("p.nombre","");
		
		$dao->TablasInnerAlias("plan_detalle","pd","procedimiento_rx","p");
		//$dao->TablasInnerAlias("procedimiento","p","especialidad","e");
		$dao->Where("pd.id_plan",$plan,"");
		

		$respuesta =$dao->Consultar();

		$jsondata = '';
		$i = 0;
		foreach ($respuesta as $row => $item){
			$jsondata .= $item[0].'<br>';
			$i++;
		}

		return $jsondata;
	}
	function CargarPlanEco($plan){

		$dao = new Dao();

		//$dao->Campo("p.id","");
		//$dao->Campo("e.nombre","");
		$dao->Campo("p.nombre","");
		
		$dao->TablasInnerAlias("plan_detalle","pd","procedimiento_eco","p");
		//$dao->TablasInnerAlias("procedimiento","p","especialidad","e");
		$dao->Where("pd.id_plan",$plan,"");
		

		$respuesta =$dao->Consultar();

		$jsondata = '';
		$i = 0;
		foreach ($respuesta as $row => $item){
			$jsondata .= $item[0].'<br>';
			$i++;
		}

		return $jsondata;
	}
	function CargarPlanTomo($plan){ 

		$dao = new Dao();

		//$dao->Campo("p.id","");
		//$dao->Campo("e.nombre","");
		$dao->Campo("p.nombre","");
		
		$dao->TablasInnerAlias("plan_detalle","pd","procedimiento_tomo","p");
		//$dao->TablasInnerAlias("procedimiento","p","especialidad","e");
		$dao->Where("pd.id_plan",$plan,"");
		

		$respuesta =$dao->Consultar();

		$jsondata = '';
		$i = 0;
		foreach ($respuesta as $row => $item){
			$jsondata .= $item[0].'<br>';
			$i++;
		}

		return $jsondata;
	}
	if($_POST['Requerimiento'] == "CargarTablaPlanes"){

			
		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("valor","");
		$dao->Campo("valor_descuento","");		
		//$dao->Campo("id_estado","");
		

		$dao->Tabla("plan","");
		$dao->In_Where("id_estado","1","");


		$respuesta =$dao->Consultar();
		$jsondata = array();
		$i=0;

		foreach ($respuesta as $row => $item){
			
			$datos = array();
					
					$datos[0] = $item[0];
					$datos[1] = $item[1];
					$datos[2] = $item[2];
					$datos[3] = $item[3];
					$datos[4] = CargarPlanProcedimientos($item["id"]);
					$datos[5] = CargarPlanLaboratorio($item["id"]);
					$datos[6] = CargarPlanRx($item["id"]);
					$datos[7] = CargarPlanEco($item["id"]);
					$datos[8] = CargarPlanTomo($item["id"]);

					$jsondata[$i]=$datos;
					$i++;					

		}
		echo json_encode($jsondata);
	}

	if($_POST['Requerimiento'] == "CargarPlanesDetalle"){

			
		$dao = new Dao();

		$dao->Campo($_POST["Tipo"],"");
		
		$dao->Tabla("plan_detalle","");
		
		$dao->Where("id_plan",$_POST["Plan"],"and");
		$dao->No_NULL($_POST["Tipo"],"");
		

		$dao->ConsultarAjax();
	}

}	