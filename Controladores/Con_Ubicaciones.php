<?php

class Con_Ubicaciones{
	public function CargarProvincia(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("fecha_registro","");
		

		$dao->Tabla("provincia","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["nombre"].'</td>
                           <td>'.$item["fecha_registro"].'</td>
                          
                        </tr>';


		}

	}

		public function CargarCanton(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("fecha_registro","");
		

		$dao->Tabla("canton","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["nombre"].'</td>
                           <td>'.$item["fecha_registro"].'</td>
                          
                        </tr>';


		}

	}


		public function CargarParro(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("fecha_registro","");
		

		$dao->Tabla("parroquia","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr>
                          <td>'.$item["id"].'</td>
                          <td>'.$item["nombre"].'</td>
                           <td>'.$item["fecha_registro"].'</td>
                          
                        </tr>';


		}

	}
	}