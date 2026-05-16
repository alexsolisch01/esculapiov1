<?php

class Con_Pantalla{

	
	public function Cargar(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("descripcion","");

		$dao->Tabla("pantalla","");
		$dao->Where("id_estado","1","");
		$dao->Ordenar("nombre");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '			<li style="border-style: outset;" ><a>
                                  '.$item['nombre'].'
                                  <div class="material-switch pull-right">
                                      <input id="check'.$item['id'].'" name="check" value='.$item['id'].' type="checkbox"/>
                                      <label for="check'.$item['id'].'" class="label-success"></label>
                                  </div>
                              </a></li>
                     ';

		}

	}

	public function CargarTablaPantalla(){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("descripcion","");

		$dao->Tabla("pantalla","p");		
		$dao->Where("1","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			$boton = '<input type="checkbox" class="chpantalla" id="'.$item[0].'">';
			echo '		<tr>
                          <td>'.$item[0].'</td>
                          <td title="'.$item[2].'">'.$item[1].'</td>
                          <td>'.$boton.'</td>                          
                        </tr>';


		}

	}


	

}