<?php

class Con_Ats{


	public function CargarTabla(){

		$dao = new Dao();

		$dao->Campo("mes","");
		$dao->Campo("anio","");
		$dao->Campo("ruta","");
		

		$dao->Tabla("ats","");	
		$dao->Where("1","1","");
		$dao->Ordenar("id desc");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr >
                          <td>'.$item[0].'</td>
                          <td>'.$item[1].'</td>
                          <td><a href="'.$item[2].'" class="btn btn-sm btn-success" download>Descargar</a></td>
                          
                        </tr>';


		}

	}
	
	

}