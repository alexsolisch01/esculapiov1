<?php

class Con_Planes{

	public function LlenarComboProc(){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.precio","");
		$dao->Campo("e.nombre","");

		$dao->TablasInnerAlias("procedimiento","p","especialidad","e");
		$dao->Where("p.id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option  pvp="'.$item[2].'" value='.$item['id'].'>'.$item[3].'-'.$item[1].'</option>';
		}

	}


	public function LlenarComboProcEco(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("pvp","");

		$dao->Tabla("procedimiento_eco","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option pvp="'.$item[2].'" value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}


	public function LlenarComboProcLab(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("pvp","");

		$dao->Tabla("procedimiento_laboratorio","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option pvp="'.$item[2].'" value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}

	public function LlenarComboProcPar(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("procedimiento_parte_diario","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}

	public function LlenarComboProcRx(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("pvp","");

		$dao->Tabla("procedimiento_rx","");
		$dao->Diferente("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option pvp="'.$item[2].'" value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}


	public function LlenarComboProcTomo(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("pvp","");

		$dao->Tabla("procedimiento_tomo","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option pvp="'.$item[2].'" value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}



	public function CargarPlan(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("valor","");

		
		$dao->Campo("id_estado","");
		
		
		

		$dao->Tabla("plan","");
		$dao->In_Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["nombre"].'</td>
                          <td>'.$item["valor"].'</td>
                          


                         
                        </tr>';


		}

	}

}