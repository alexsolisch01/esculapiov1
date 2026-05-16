<?php

class Con_Laboratorio{

	public function CargarMuestra(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("id_estado","");
		

		$dao->Tabla("muestra","");
		$dao->In_Where("id_estado","1,2","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                    <td>'.$item[0].'</td>
                    <td>'.$item[1].'</td>
                    <td>'.$item[2].'</td>
                    <td>'.$item[3].'</td>
                  </tr>';
		}
	}

	public function CargarExamenes(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("orden","");
		$dao->Campo("id_estado","");

		$dao->Tabla("grupo_examen","");
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

		$dao->Tabla("grupo_examen","");
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

	public function CargarEntidad(){

		$dao = new Dao();

		$dao->Campo("e.id","");
		$dao->Campo("e.nombre","");
		$dao->Campo("em.nombres","");
		$dao->Campo("em.apellidos","");
		$dao->Campo("e.usuario_registro","");
		$dao->Campo("e.fecha_registro","");
		$dao->Campo("e.id_estado","");

		$dao->TablasInnerAlias("entidad","e","empleado","em");
		$dao->In_Where("e.id_estado","1,2","");

		$respuesta =$dao->Consultar();

		//echo $respuesta;
		foreach ($respuesta as $row => $item){
			
			echo '<tr id='.$item["id"].' estado='.$item["id_estado"].'>
                    <td>'.$item[0].'</td>
                    <td>'.$item[1].'</td>
                    <td>'.$item[3].' '.$item[2].'</td>
                    <td>'.$item[4].'</td>
                    <td>'.$item[5].'</td>
                  </tr>';
		}
	}

	public function CargarEquipo(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("usuario_registro","");
		$dao->Campo("fecha_registro","");
		$dao->Campo("id_estado","");

		$dao->Tabla("equipo","");
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

	public function CargarProLab(){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("m.nombre","");
		$dao->Campo("g.nombre","");
		$dao->Campo("e.nombre","");
		$dao->Campo("q.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("p.pago","");
		$dao->Campo("p.valor_pago","");
		$dao->Campo("p.usuario_registro","");
		$dao->Campo("p.fecha_registro","");

		$dao->TablasInnerAlias("procedimiento_laboratorio","p","muestra","m");
		$dao->TablasInnerAlias("procedimiento_laboratorio","p","grupo_examen","g");
		$dao->TablasInnerAlias("procedimiento_laboratorio","p","entidad","e");
		$dao->TablasInnerAlias("procedimiento_laboratorio","p","equipo","q");
		$dao->In_Where("p.id_estado","1,11","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '<tr id='.$item["id"].'>
                    <td>'.$item[0].'</td>
                    <td>'.$item[1].'</td>
                    <td>'.$item[2].'</td>
                    <td>'.$item[3].'</td>
                    <td>'.$item[4].'</td>
                    <td>'.$item[5].'</td>
                    <td>'.$item[6].'</td>
                    <td>'.$item[7].'</td>
                    <td>'.$item[8].'</td>
                    <td>'.$item[9].'</td>
                    <td>'.$item[10].'</td>
                  </tr>';
		}
	}

	public function CargarProLabNombre(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		$dao->Campo("id_estado","");

		$dao->Tabla("procedimiento_laboratorio","");
		$dao->In_Where("id_estado","1,11","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){

			$boton = '<button idEstado='.$item[2].' type="submit" id="CargarPlantilla" class="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i> Agregar Plantilla</button>';
			if($item[2]==11){
				$boton = '<button idEstado='.$item[2].' type="submit" id="CargarPlantilla" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
			}
			
			echo '<tr id='.$item[0].'>
                    <td id="IdProc">'.$item[0].'</td>
                    <td id="NombreProc">'.$item[1].'</td>
                    <td>'.$boton.'</td>
                  </tr>';
		}
	}

	public function CargarProcedimientosConsulta(){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.pvp","");

		$dao->TablasInnerAlias("procedimiento_laboratorio","p","grupo_examen","e");

		$dao->Where("p.id_estado","1","and");
		$dao->Where("e.id_estado","1","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '<tr id='.$item[0].'>
                    <td>'.$item[1].'</td>
                    <td>'.$item[2].'</td>
                    <td> <div class="checkbox checkbox-info checkbox-circle">
                                            <input idGrupoProcedimiento="'.$item[0].'" class="checkGrupoProceFact" id="checkbox'.$item[0].'" type="checkbox">
                                            <label for="checkbox'.$item[0].'">                                                
                                           </label>
                                        </div>
                    </td>
                  </tr>';
		}
	}

	public function CargarProcedimientosAgenda(){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("e.nombre","");

		$dao->TablasInnerAlias("procedimiento_laboratorio","p","grupo_examen","e");

		$dao->In_Where("p.id_estado","1,11","and");
		$dao->Where("e.id_estado","1","");
		$dao->Ordenar("p.nombre");

		$respuesta =$dao->Consultar();
		
		foreach ($respuesta as $row => $item){			
			echo '<li grupo="'.$item[3].'" id="'.$item[0].'" class="list-group-item" title="Precio $ '.$item[2].'" data-color="success" >'.$item[1].'</li>';
		}
	}

	public function LlenarComboMuestra(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("muestra","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}
	}

	public function LlenarComboGrupoExamen(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("grupo_examen","");
		$dao->Where("id_estado","1","");
		$dao->Ordenar("orden");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}
	}
	public function CargarProcedimientosAcordion($grupo){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.pvp","");
		$dao->Campo("e.nombre","");

		$dao->TablasInnerAlias("procedimiento_laboratorio","p","grupo_examen","e");

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
                              <ul id="check-list-box"  class="list-group checked-list-box procelab">
                                  '.$proce.'
                              </ul>                                                                                           
                            </div> ';
        return $procedimientos;                    
	}
	public function LLenarAcordionAgenda(){
		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("grupo_examen","");
		$dao->Where("id_estado","1","");
		$dao->Ordenar("orden");

		$respuesta =$dao->Consultar();

		$acordion = '
				          <div class="box box-solid">				            
				            <div class="box-body">
				              <div class="box-group" id="accordion">
				                
				               ';
		foreach ($respuesta as $row => $item){
			$acordion .=' <div class="panel box ">
			                  <div>
			                      <a data-toggle="collapse" data-parent="#accordion" href="#Acordion'.$item[0].'" style="font-size: 15px !important;">
			                        '.$item[1].'
			                      </a>
			                  </div>
			                  <div id="Acordion'.$item[0].'" class="panel-collapse collapse">
			                    <div class="box-body">
			                      <div class="row">
			                      	<div class="col-md-12 label label-primary">
                                    	<input type="texto"  class="form-control input-sm buscarLab">
                                    </div>
                                  </div>                                                
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

	public function LlenarComboEntidad(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("entidad","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}
	}

	public function LlenarComboEquipo(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("equipo","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}
	}
}