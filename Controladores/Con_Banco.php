<?php

class Con_Banco{

	
		public function LlenarComboBanco(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("prefijo","");
		
		
		

		$dao->Tabla("banco","");
		$dao->In_Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option prefijo="'.$item['prefijo'].'" value='.$item['id'].'>'.$item['nombre'].'</option>';


		}

	}


	public function LlenarComboBanco2(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		
		$dao->Tabla("tarjeta","");
		$dao->In_Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option nombre="'.$item['nombre'].'" value='.$item['id'].'>'.$item['nombre'].'</option>';


		}

	}


	public function CargarBanco(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("prefijo","");
		
		$dao->Campo("id_estado","");
		
		
		

		$dao->Tabla("banco","");
		$dao->In_Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["nombre"].'</td>
                          <td>'.$item["prefijo"].'</td>
                          


                         
                        </tr>';


		}

	}


	public function CargarTarjeta(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("id_estado","");
		
		
		

		$dao->Tabla("tarjeta","");
		$dao->In_Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["nombre"].'</td>
                                                 
                        </tr>';


		}

	}

	public function CargarAnticipo(){

		$dao = new Dao();

		$dao->Campo("a.id","");
		$dao->Campo("pa.apellido","");
		$dao->Campo("pa.nombre","");
		$dao->Campo("a.valor","");
		$dao->Campo("a.t_pago","");
		
		$dao->Campo("a.fecha_registro","");

		$dao->TablasInnerAlias("anticipo","a","paciente","pa");
		$dao->Where("a.id_estado","1","");



		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item[0].' id_estado='.$item[4].'>
                          <td>'.$item[0].'</td>
                          <td>'.$item[1].'</td>
                          <td>'.$item[2].'</td>
                          <td>'.$item[3].'</td>
                          <td>'.$item[4].'</td>

                        
                         
                                                 
                        </tr>';


		}

	}

	public function LlenarComboReferente(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("apellidos","");
		$dao->Campo("nombre","");
					

		$dao->Tabla("referencia","");
		$dao->In_Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option  value='.$item['id'].'>'.$item['apellidos']." ".$item["nombre"].'</option>';


		}

	}



	public function LlenarComboPlam(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
					

		$dao->Tabla("plan","");
		$dao->In_Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
				echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';


		}

	}
	
}