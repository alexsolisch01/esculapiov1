<?php

class Con_Paciente{

	/*public function CargarPacientes(){

		$dao = new Dao();

		$dao->Campo("p.id","");
		$dao->Campo("p.apellido","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.cedula","");
		$dao->Campo("Date_format(p.fecha_nacimiento,'%Y-%m-%d')","");
		$dao->Campo("p.direccion","");
		$dao->Campo("c.nombre","");
		$dao->Campo("pro.nombre","");
		$dao->Campo("p.telefono","");
		$dao->Campo("p.email","");
		$dao->Campo("p.estado_civil","");
		$dao->Campo("p.ocupacion","");
		$dao->Campo("g.nombre","");
		$dao->Campo("m.nombre","");
		$dao->Campo("e.nombre","");
		$dao->Campo("pr.nombre","");
		$dao->Campo("r.nombre","");
		$dao->Campo("p.codigo_vih","");
		$dao->Campo("a.nombre","");
		$dao->Campo("i.nombre","");
		$dao->Campo("p.nombre_responsable","");
		$dao->Campo("p.parentesco","");
		$dao->Campo("p.parentes_telefono","");
		$dao->Campo("p.usuario_registro","");
		$dao->Campo("p.fecha_registro","");

		$dao->TablasInnerAlias("paciente","p","genero","g");
		$dao->TablasInnerAlias("paciente","p","migrante","m");
		$dao->TablasInnerAlias("paciente","p","etnia","e");
		$dao->TablasInnerAlias("paciente","p","prioridad","pr");
		$dao->TablasInnerAlias("paciente","p","residencia","r");
		$dao->TablasInnerAlias("paciente","p","afiliacion","a");
		$dao->TablasInnerAlias("paciente","p","instruccion","i");
		$dao->TablasInnerAlias("paciente","p","canton","c");
		$dao->TablasInnerAlias("canton","c","provincia","pro");
		$dao->Where("p.id_estado","1","");
		//$dao->Limite("500");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].'>
                          <td>'.$item[0].'</td>
                          <td>'.$item[3].'</td>
                          <td>'.$item[1].'</td>
                          <td>'.$item[2].'</td>
                          <td>'.$item[4].'</td>
                          <td>'.$item[5].'</td>
                          <td>'.$item[6].'</td>
                          <td>'.$item[7].'</td>
                          <td>'.$item[8].'</td>
                          <td>'.$item[9].'</td>
                          <td>'.$item[10].'</td>
                          <td>'.$item[11].'</td>
                          <td>'.$item[12].'</td>
                          <td>'.$item[14].'</td>
                          <td>'.$item[13].'</td>
                          <td>'.$item[15].'</td>
                          <td>'.$item[16].'</td>
                          <td>'.$item[17].'</td>
                          <td>'.$item[18].'</td>
                          <td>'.$item[19].'</td>
                          <td>'.$item[20].'</td>
                          <td>'.$item[21].'</td>
                          <td>'.$item[22].'</td>
                          <td>'.$item[23].'</td>
                          <td>'.$item[24].'</td>
                        </tr>';


		}
	}*/

	public function CargarClientesPacientes(){

		$dao = new Dao();

		$dao->Campo("c.id","");
		$dao->Campo("c.apellido","");
		$dao->Campo("c.nombre","");
		$dao->Campo("c.ruc","");
		$dao->Campo("c.direccion","");
		$dao->Campo("c.telefono","");
		$dao->Campo("c.email","");
		$dao->Campo("p.nombre","");
		$dao->Campo("p.apellido","");
		$dao->Campo("c.tipo_persona","");
		$dao->Campo("p.id","");

		$dao->TablasInnerAlias("paciente_cliente","c","paciente","p");
		$dao->Where("p.id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo '		<tr id='.$item["id"].'>
                          <td>'.$item[0].'</td>
                          <td>'.$item[8].' '.$item[7].'</td>
                          <td>'.$item[3].'</td>
                          <td>'.$item[1].'</td>
                          <td>'.$item[2].'</td>
                          <td>'.$item[4].'</td>
                          <td>'.$item[5].'</td>
                          <td>'.$item[6].'</td>
                          <td>'.$item[9].'</td>
                          <td style="display: none;">'.$item[10].'</td>
                        </tr>';


		}
	}

	public function LlenarDataListCanton(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("canton","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value="'.$item['id'].'"> '.$item['nombre'].'</option>';
		}
	}
	public function LlenarDataListParroquia(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("parroquia","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			echo ' <option value="'.$item['id'].'"> '.$item['nombre'].'</option>';
		}
	}

}