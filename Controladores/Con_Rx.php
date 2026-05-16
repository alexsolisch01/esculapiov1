<?php

class Con_Rx{

	public function CargarExamenesRx(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("orden","");
		$dao->Campo("id_estado","");

		$dao->Tabla("grupo_rx","");
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

	public function CargarProRxNombre(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("id_estado","");
		$dao->Campo("plantilla1","");
		$dao->Campo("plantilla2","");
		$dao->Campo("plantilla3","");

		$dao->Tabla("procedimiento_rx","");
		$dao->In_Where("id_estado","1,11","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){

			$boton1 = '<button nplantilla="1" idEstado='.$item[3].' type="submit" id="CargarPlantillaRx" class="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Plantilla</button>';

			$boton2 = '<button nplantilla="2" idEstado='.$item[4].' type="submit" id="CargarPlantillaRx" class="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Plantilla</button>';

			$boton3 = '<button nplantilla="3" idEstado='.$item[5].' type="submit" id="CargarPlantillaRx" class="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Plantilla</button>';

			if($item[3]==11){
				$boton1 = '<button nplantilla="1" idEstado='.$item[3].' type="submit" id="CargarPlantillaRx" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
			}
			if($item[4]==11){
				$boton2 = '<button nplantilla="2" idEstado='.$item[4].' type="submit" id="CargarPlantillaRx" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
			}
			if($item[5]==11){
				$boton3 = '<button nplantilla="3" idEstado='.$item[5].' type="submit" id="CargarPlantillaRx" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
			}
			
			echo '<tr id='.$item[0].'>
                    <td id="IdProc">'.$item[0].'</td>
                    <td id="NombreProc">'.$item[1].'</td>
                    <td>'.$boton1.'</td>
                    <td>'.$boton2.'</td>
                    <td>'.$boton3.'</td>
                  </tr>';
		}
	}

	public function CargarExamenesConsulta(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("orden","");

		$dao->Tabla("grupo_rx","");
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

	public function CargarEntidadRx(){

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

		$dao->TablasInnerAlias("entidad_rx","e","empleado","em");
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

	public function CargarEquipoRx(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("id_estado","");

		$dao->Tabla("equipo_rx","");
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

	public function CargarProLabRx(){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("g.nombre","");
		
		$dao->Campo("q.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("p.usuario_registro","");
		$dao->Campo("p.fecha_registro","");

		$dao->TablasInnerAlias("procedimiento_rx","p","grupo_rx","g");
		$dao->TablasInnerAlias("procedimiento_rx","p","equipo_rx","q");
		$dao->In_Where("p.id_estado","1,11","");

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

	public function LlenarComboGrupoExamenRx(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("grupo_rx","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}
	}

	public function LlenarComboEntidadRx(){

		$dao = new Dao();

		$dao->Campo("e.id","");
		$dao->Campo("e.nombre","");
		$dao->Campo("em.nombres","");
		$dao->Campo("em.apellidos","");

		$dao->TablasInnerAlias("entidad_rx","e","empleado","em");
		$dao->In_Where("e.id_estado","1,2","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value='.$item[0].'>'.$item[1].' - '.$item[3].' '. $item[2].'</option>';
		}
	}

	public function LlenarComboEquipoRx(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("equipo_rx","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}
	}

	public function CargarProLabRxCheck(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("pvp","");

		$dao->Tabla("procedimiento_rx","");
		$dao->In_Where("id_estado","1,11","");


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

	public function CargarProcedimientosRxAgenda(){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("e.nombre","");

		$dao->TablasInnerAlias("procedimiento_rx","p","grupo_rx","e");

		$dao->In_Where("p.id_estado","1,11","and");
		$dao->Where("e.id_estado","1","");
		$dao->Ordenar("p.nombre");
		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo '<li grupo="'.$item[3].'" id="'.$item[0].'" class="list-group-item" title="Precio $ '.$item[2].'" data-color="success" >'.$item[1].'</li>';
		}
	}

	public function CargarProcedimientosAcordion($grupo){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("e.nombre","");

		$dao->TablasInnerAlias("procedimiento_rx","p","grupo_rx","e");

		$dao->In_Where("p.id_estado","1,11","and");
		$dao->Where("e.id_estado","1","and");
		$dao->Where("e.id",$grupo,"");
		$dao->Ordenar("p.nombre");

		$respuesta =$dao->Consultar();
		$proce = '';

		foreach ($respuesta as $row => $item){			
			$proce .= '<li grupo="'.$item[3].'" id="'.$item[0].'" class="list-group-item" title="Precio $ '.$item[2].'" data-color="success" >'.$item[1].'</li>';
		}

		$procedimientos = ' <div class="">
                              <ul id="check-list-box"  class="list-group checked-list-box procerx">
                                  '.$proce.'
                              </ul>                                                                                           
                            </div> ';
        return $procedimientos;                    
	}
	public function LLenarAcordionAgenda(){
		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("grupo_rx","");
		$dao->Where("id_estado","1","");
		$dao->Ordenar("orden");

		$respuesta =$dao->Consultar();

		$acordion = '
				          <div class="box box-solid">				            
				            <div class="box-body">
				              <div class="box-group" id="accordion2">
				                
				               ';
		foreach ($respuesta as $row => $item){
			$acordion .=' <div class="panel box ">
			                  <div>
			                      <a data-toggle="collapse" data-parent="#accordion2" href="#AcordionRx'.$item[0].'" style="font-size: 15px !important;">
			                        '.$item[1].'
			                      </a>
			                  </div>
			                  <div id="AcordionRx'.$item[0].'" class="panel-collapse collapse">
			                    <div class="box-body">
			                      '.$this->CargarProcedimientosAcordion($item[0]).'
			                    </div>
			                  </div>
			                </div> '; 
		}
		$acordion .=' </div>
				     </div>
				    </div>'; 
		echo $acordion;
	}
}