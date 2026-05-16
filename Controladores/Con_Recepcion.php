<?php

class Con_Recepcion{

	public function CargarPacientesLaboratorio(){

		$dao = new Dao();

		$dao->Campo("DISTINCT p.id","");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno)","");
		$dao->Campo("p.nombre","");
		$dao->Campo("c.total","");
		$dao->Campo("m.nombre","");
		$dao->Campo("p.cedula","");
		$dao->Campo("p.email","");
		$dao->Campo("ci.id_estado","");
		$dao->Campo("c.id","");
		$dao->Campo("p.fecha_nacimiento","");
		$dao->Campo("c.id_orden","");
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		$dao->Campo("ci.turno","");
		
		$dao->TablasInnerAlias("consulta","c","paciente","p");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","c");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento_laboratorio","pr");
		$dao->TablasInnerAlias("procedimiento_laboratorio","pr","muestra","m");
		$dao->In_Where("p.id_estado","1,16","and");
		$dao->In_Where("ci.id_estado","6,12,10","and");
		$dao->Where("CONVERT(ci.fecha_atencion,DATE)",'CURDATE()',"");
		$dao->Agrupar("c.id");
		$dao->Ordenar("ci.turno");

		$respuesta =$dao->Consultar();
		//echo $dao->Consultar2();
		$i=0;
		foreach ($respuesta as $row => $item){

			$i++;
			$boton = '<button idEstado='.$item[7].' type="button" class="btn btn-sm btn-danger nopaddingBoton">'.$i.'</button>';
			if($item[7]==10){
				$boton = '<button idEstado='.$item[7].' type="button" class="btn btn-sm btn-warning nopaddingBoton">'.$i.'</button>';
			}
			if($item[7]==12){
				$boton = '<button idEstado='.$item[7].' type="button" class="btn btn-sm btn-success nopaddingBoton">'.$i.'</button>';
			}
			
			echo '		
						<tr id='.$item[0].'>
							<td>'.$i.'</td>
                          <td><span idPaciente="'.$item[0].'" email="'.$item[6].'" cedula="'.$item[5].'" fecha="'.$item[9].'" idOrden="'.$item[10].'" idConsulta='.$item[8].'>'.$item[1]." ".$item[2].'</span></td>
                          
                          <td>'.$item[11].'</td>                          
                          
                          <td>'.$boton.'</td>
                        </tr>';
		}
	}


	public function CargarProceLaboratorioConsultaFechaActual($paciente,$procedimiento){

		$dao = new Dao();
		$check='';

		$coninciden = true;

		$dao->Campo("c.id","");
		$dao->Campo("c.id_paciente","");
		$dao->Campo("ci.id_procedimiento_laboratorio","");
		$dao->Campo("m.nombre","");
		
		$dao->TablasInnerAlias("consulta_item","ci","consulta","c");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento_laboratorio","pr");
		$dao->TablasInnerAlias("procedimiento_laboratorio","pr","muestra","m");
		$dao->Where("p.id_estado","1","and");
		$dao->Where("CONVERT(ci.fecha_atencion,DATE)",'CURDATE()',"");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item[0].'>
                          <td>'.$item[0].'</td>
                          <td>'.$item[2].' '.$item[1].'</td>
                          '.$check.'
                        </tr>';
		}

		//echo $respuesta;
	}

	public function CargarMuestraLaboratorio(){

		$dao = new Dao();

		$dao->Campo("nombre","");
		

		$dao->Tabla("muestra","");
		$dao->In_Where("id_estado","1","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '
                    <th>'.$item[0].'</th>
                  ';
		}
	}
}