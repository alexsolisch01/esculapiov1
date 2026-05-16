<?php

class Con_Signos{
	public function CargarPacientesSignos(){

		$dao = new Dao();

		$dao->Campo("DISTINCT b.numero","");
		$dao->Campo("es.nombre","");
		$dao->Campo("CONCAT(e.apellido,' ',e.apellido_materno)","");
		$dao->Campo("e.nombre","");
		$dao->Campo("ci.turno","");
		
		
		$dao->Campo("CONVERT(e.fecha_nacimiento,DATE)","");	
		$dao->Campo("em.nombres","");
		$dao->Campo("em.apellidos","");
		$dao->Campo("e.id","");
		$dao->Campo("b.id","");
		$dao->Campo("b.id_estado","");
		$dao->Campo("CONVERT(ci.fecha_atencion,DATE)","");
		
		

		$dao->TablasInnerAlias("consulta","b","paciente","e");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","b");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento","p");
		$dao->TablasInnerAlias("procedimiento","p","especialidad","es");
		$dao->TablasInnerAlias("consulta_item","ci","empleado","em");

		
		$dao->In_Where("b.id_estado","1,9","and");
		$dao->Where("CONVERT(ci.fecha_atencion,DATE)",'CURDATE()',"");
		//$dao->Agrupar("e.id");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
		
			$boton = '<button idEstado='.$item[10].' type="button" class="btn btn-block btn-danger">Pendiente</button>';
			if($item[10]==9){
				$boton = '<button idEstado='.$item[10].' type="button" class="btn btn-block btn-success">Listo</button>';
			}
			
			echo '		<tr id="'.$item[8].'">
                         
                          <td>'.$item[0].'</td>
                          <td>'.$item[1].'</td>
                          <td>'.$item[2].'</td>
                          <td >'.$item[3].'</td>
                          <td ><span idConsulta="'.$item[9].'" fecha_atencion="'.$item[11].'"> '.$item[4].'</span></td>
                          <td ><span fecha_nacimiento="'.$item[5].'">'.$item[6].' '.$item[7].'</span></td>
					      <td>'.$boton.'</td>
                         </tr>';
			}



		}		

}