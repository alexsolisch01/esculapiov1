<?php

class Con_tomo{

	public function CargarExamenesTomo(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("orden","");
		$dao->Campo("id_estado","");

		$dao->Tabla("grupo_tomo","");
		$dao->In_Where("id_estado","1,2","");
		$dao->Ordenar("orden");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                    <td>'.$item[0].'</td>
                    <td>'.$item[1].'</td>
                    <td>'.$item[2].'</td>
                    <td>'.$item[3].'</td>
                    <td>'.$item[4].'</td>
                  </tr>';
		}
	}

	public function CargarExamenesConsulta(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("orden","");

		$dao->Tabla("grupo_tomo","");
		$dao->Where("id_estado","1","");
		$dao->Ordenar("orden");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '<tr id="'.$item[1].'">
                    <td>'.$item[2].'</td>
                    <td>'.$item[1].'</td>                    
                  </tr>';
		}
	}

	public function CargarEntidadTomo(){

		$dao = new Dao();

		$dao->Campo("e.id","");
		$dao->Campo("e.nombre","");
		$dao->Campo("em.nombres","");
		$dao->Campo("em.apellidos","");
		$dao->Campo("e.usuario_registro","");
		$dao->Campo("e.fecha_registro","");
		$dao->Campo("e.id_estado","");
		$dao->Campo("e.pago","");
		$dao->Campo("e.valor_pago","");

		$dao->TablasInnerAlias("entidad_tomo ","e","empleado","em");
		$dao->In_Where("e.id_estado","1,2","");

		$respuesta =$dao->Consultar();

		//echo $respuesta;
		foreach ($respuesta as $row => $item){
			
			echo '<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                    <td>'.$item[0].'</td>
                    <td>'.$item[1].'</td>
                    <td>'.$item[3].' '.$item[2].'</td>
                    <td>'.$item[7].'</td>
                    <td>'.$item[8].'</td>
                    <td>'.$item[4].'</td>
                    <td>'.$item[5].'</td>
                  </tr>';
		}
	}

	public function CargarEquipoTomo(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("id_estado","");

		$dao->Tabla("equipo_tomo","");
		$dao->In_Where("id_estado","1,2","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '<tr id='.$item["id"].'estado='.$item["id_estado"].'>
                    <td>'.$item[0].'</td>
                    <td>'.$item[1].'</td>
                    <td>'.$item[2].'</td>
                    <td>'.$item[3].'</td>
                  </tr>';
		}
	}

	public function CargarProLabTomo(){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("g.nombre","");
		
		$dao->Campo("q.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("p.usuario_registro","");
		$dao->Campo("p.fecha_registro","");

		$dao->TablasInnerAlias("procedimiento_tomo","p","grupo_tomo","g");
		$dao->TablasInnerAlias("procedimiento_tomo","p","equipo_tomo","q");
		$dao->In_Where("p.id_estado","1","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '<tr id='.$item[0].'>
                    <td>'.$item[0].'</td>
                    <td>'.$item[1].'</td>
                    <td>'.$item[2].'</td>
                    <td>'.$item[3].'</td>
                    <td>'.$item[4].'</td>
                    <td>'.$item[5].'</td>
                    <td>'.$item[6].'</td>
                    
                  </tr>';
		}
	}

	public function LlenarComboGrupoExamenTomo(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("grupo_tomo","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}
	}

	public function LlenarComboEntidadTomo(){

		$dao = new Dao();

		$dao->Campo("e.id","");
		$dao->Campo("e.nombre","");
		$dao->Campo("em.nombres","");
		$dao->Campo("em.apellidos","");

		$dao->TablasInnerAlias("entidad_tomo","e","empleado","em");
		$dao->In_Where("e.id_estado","1,2","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value='.$item[0].'>'.$item[1].' - '.$item[3].' '. $item[2].'</option>';
		}
	}

	public function LlenarComboEquipoTomo(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("equipo_tomo","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}
	}


	public function CargarProLabRxCheckTomo(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("pvp","");

		$dao->Tabla("procedimiento_tomo","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '			<li><a>
                                  '.$item['nombre'].'<br><small>$ '.$item['pvp'].'</small>
                                  <div class="material-switch pull-right">
                                      <input id="check'.$item['id'].'" name="check" value='.$item['id'].' type="checkbox"/>
                                      <label for="check'.$item['id'].'" class="label-success"></label>
                                  </div>
                              </a></li>
                     ';

		}

	}
}