<?php

class Con_Consulta{

	public function TotalConsultas(){

		$dao = new Dao();
		
		$dao->Contar();
		
		$dao->Tabla("consulta","");
		
		$dao->In_Diferente("id_punto_venta","1,13,14,15","and");
		$dao->Where("CONVERT(fecha_registro,DATE)",'CURDATE()',"");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo $item[0];
		}
	}

	public function TotalFarmacia(){

		$dao = new Dao();
		
		$dao->Contar();
		
		$dao->Tabla("farmacia","");		
		$dao->Where("CONVERT(fecha_registro,DATE)",'CURDATE()',"");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo $item[0];
		}
	}

	public function TotalAtendidos(){

		$dao = new Dao();
		
		$dao->Contar();
		
		$dao->TablasInnerAlias("consulta_item","ci","consulta","b");
		
		$dao->Where("ci.id_estado",'19',"and");
		$dao->Where("CONVERT(fecha_atencion,DATE)",'CURDATE()',"");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo $item[0];
		}
	}

	public function TotalPacientesActivos(){

		$dao = new Dao();
		
		$dao->Contar();
		
		$dao->Tabla("paciente","");		
		$dao->In_Where("id_estado","1,16","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo $item[0];
		}
	}

	public function VentasConsultas(){

		$dao = new Dao();
		
		$dao->Sumar("total");
		
		$dao->Tabla("consulta","");
		
		$dao->Where("CONVERT(fecha_registro,DATE)",'CURDATE()',"");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			if($item[0]!=''){
				echo "$ ".number_format($item[0], 2, '.', '');
			}else{
				echo "$ 0.0";	
			}
			
			
		}
	}
	public function VentasFarmacia(){

		$dao = new Dao();
		
		$dao->Sumar("total");
		
		$dao->Tabla("farmacia","");
		
		$dao->Where("CONVERT(fecha_registro,DATE)",'CURDATE()',"");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			if($item[0]!=''){
				echo "$ ".number_format($item[0], 2, '.', '');
			}else{
				echo "$ 0.0";	
			}
			
			
		}
	}

	public function FacturasSinAutorizar(){

		$dao = new Dao();
		
		$dao->Contar();
		
		$dao->Tabla("consulta","");
		
		
		$dao->Where("CONVERT(fecha_registro,DATE)",'CURDATE()',"and");
		$dao->Where("autorizada","'N'","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo $item[0];
		}
	}
	public function FacturasAutorizadas(){

		$dao = new Dao();
		
		$dao->Contar();
		
		$dao->Tabla("consulta","");
		
		
		$dao->Where("CONVERT(fecha_registro,DATE)",'CURDATE()',"and");
		$dao->Where("autorizada","'S'","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo $item[0];
		}
	}
	public function TotalProformas(){
		$dao = new Dao();
		$dao->Maximo("numero","");
		$dao->Tabla("proforma","");		
		$dao->Where("1","1","");
		$respuesta =$dao->Consultar();
		$total = 0;
		foreach ($respuesta as $row => $item){
			$total = $item[0];
		}
		echo ($total + 1);
	}
}