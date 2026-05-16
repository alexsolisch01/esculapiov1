<?php

class Con_Cuenta{


	public function CargarPrueba(){

		$dao = new Dao();

		$dao->Campo("c.numero","");
		$dao->Campo("c.id_paciente","");
		$dao->Campo("c.id_paciente_cliente","");
		$dao->Campo("c.fecha_registro","");
		$dao->Campo("c.total","");
		$dao->Campo("fp.tipo","");

		$dao->TablasInnerAlias("forma_pago","fp","consulta","c");
		$dao->Diferente("c.id_estado","21","and");
		$dao->Where("fp.tipo","'CREDITO'","");

		//echo $dao->Consultar2();



		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item[0].'</td>
                          <td>'.$item[0].'</td>
                          <td>'.$item[1].'</td>
                          <td>'.$item[2].'</td>
                          <td>'.$item[3].'</td>
                          <td>'.$item[4].'</td>
                          <td>'.$item[5].'</td>
                        
                         
                                                 
                        </tr>';


		}

	}

	

	
	
}