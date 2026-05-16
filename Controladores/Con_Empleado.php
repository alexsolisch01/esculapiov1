<?php

class Con_Empleado
{

	public function CargarProcedimientos()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Campo("descripcion", "");

		$dao->Tabla("tipo_servicio", "");
		$dao->Where("id_estado", "1", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo '		<tr id=' . $item["id"] . '>
                          <td>' . $item["id"] . '</td>
                          <td>' . $item["nombre"] . '</td>
                          <td>' . $item["descripcion"] . '</td>
                          <td>' . $item["usuario_registro"] . '</td>
                          <td>' . $item["fecha_registro"] . '</td>
                        </tr>';
		}
	}

	public function LlenarCombo()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombres", "");
		$dao->Campo("apellidos", "");

		$dao->Tabla("empleado", "");
		$dao->Where("id_estado", "1", "");
		$dao->Ordenar("apellidos ASC");


		$respuesta = $dao->Consultar();


		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['apellidos'] . ' ' . $item['nombres'] . '</option>';
		}
	}

	public function LlenarComboInventario()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");

		$dao->Tabla("inventario", "");
		$dao->Where("id_estado", "1", "");


		$respuesta = $dao->Consultar();


		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item[0] . '>' . $item[1] . '</option>';
		}
	}

	public function LlenarComboMedico()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombres", "");
		$dao->Campo("apellidos", "");

		$dao->Tabla("empleado", "");
		$dao->Where("id_estado", "5", "");
		$dao->Ordenar("apellidos ASC");


		$respuesta = $dao->Consultar();


		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['apellidos'] . ' ' . $item['nombres'] . '</option>';
		}
	}

	public function CargarEmpleados()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("cedula", "");
		$dao->Campo("nombres", "");
		$dao->Campo("apellidos", "");
		$dao->Campo("telefono", "");
		$dao->Campo("email", "");
		$dao->Campo("usuario_registro", "");
		$dao->Campo("fecha_registro", "");
		$dao->Campo("direccion", "");
		$dao->Campo("foto", "");
		$dao->Campo("firma", "");
		$dao->Campo("Date_format(fecha_nacimiento,'%Y-%m-%d')", "");

		$dao->Tabla("empleado", "");
		$dao->Where("id_estado", "1", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo '		<tr id=' . $item["id"] . '>
                          <td>' . $item["id"] . '</td>
                          <td>' . $item["cedula"] . '</td>
                          <td>' . $item["apellidos"] . '</td>
                          <td>' . $item["nombres"] . '</td>
                          <td>' . $item["telefono"] . '</td>
                          <td>' . $item["email"] . '</td>
                          <td>' . $item["usuario_registro"] . '</td>
                          <td>' . $item["fecha_registro"] . '</td>
                          <td>' . $item["direccion"] . '</td>
                          <td>' . $item["foto"] . '</td>
                          <td>' . $item["firma"] . '</td>
                          <td>' . $item[11] . '</td>
                        </tr>';
		}

		//echo $respuesta;

	}

	public function CargarEspe($idEmpleado)
	{
		$dao = new Dao();

		$dao->Campo("e.nombre", "");
		$dao->Campo("tr.nombre", "");

		$dao->TablasInnerAlias("medico_especialidad", "me", "especialidad", "e");
		$dao->TablasInnerAlias("medico_especialidad", "me", "tipo_relacion", "tr");
		$dao->Where("me.id_estado", "1", "and");
		$dao->Where("me.id_empleado", $idEmpleado, "");
		//$dao->Ordenar("apellidos");

		$respuesta = $dao->Consultar();

		$jsondata = '';
		$i = 0;
		foreach ($respuesta as $row => $item) {
			$jsondata .= $item[0] . ' - ' . $item[1] . '<br>';
			$i++;
		}

		return $jsondata;
	}

	public function CargarMedicosProce()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("cedula", "");
		$dao->Campo("nombres", "");
		$dao->Campo("apellidos", "");

		$dao->Tabla("empleado", "");
		$dao->Where("id_estado", "5", "");

		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo '		<tr id=' . $item["id"] . '>
                          <td>' . $item["id"] . '</td>
                          <td>' . $item["cedula"] . '</td>
                          <td>' . $item["apellidos"] . '</td>
                          <td>' . $item["nombres"] . '</td>
                          <td>' . $this->CargarEspe($item["id"]) . '</td>
                        </tr>';
		}
		//echo $respuesta;
	}
}
