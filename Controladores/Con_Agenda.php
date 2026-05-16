<?php

class Con_Agenda{
	public function CargarConsultaExterna(){
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
		$dao->Campo("p.nombre","");
		$dao->Campo("p.id","");
		$dao->Campo("es.id","");
		$dao->Campo("em.id","");
		$dao->TablasInnerAlias("consulta","b","paciente","e");
		$dao->TablasInnerAliasOtra("consulta_item","ci","consulta","b");
		$dao->TablasInnerAlias("consulta_item","ci","procedimiento","p");
		$dao->TablasInnerAlias("procedimiento","p","especialidad","es");
		$dao->TablasInnerAlias("consulta_item","ci","empleado","em");
		$dao->In_Where("b.id_estado","1,9","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo '<tr id="'.$item[8].'">
		        <td>'.$item[11].'</td>
			    <td>'.$item[7].' '.$item[6].'</td>
			    <td>'.$item[1].'</td>
			    <td >'.$item[12].'</td>
			    <td>'.$item[13].'</td>
			    <td>'.$item[14].'</td>
			    <td>'.$item[15].'</td>
		    </tr>';
		}
	}



	public function LlenarComboParteDiario(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("procedimiento_parte_diario","");
		$dao->Where("id_estado","1","");

		$respuesta =$dao->Consultar();
		echo ' <option value="0">Todos</option>';
		foreach ($respuesta as $row => $item){
			echo ' <option value="'.$item[1].'">'.$item['nombre'].'</option>';
		}
	}
}