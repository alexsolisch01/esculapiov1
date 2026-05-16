<?php

class Con_Especialidad
{

	public function LlenarComboConsultorio()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");

		$dao->Tabla("consultorio", "");
		$dao->Where("id_estado", "1", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['nombre'] . '</option>';
		}
	}
	public function LlenarComboTipoServicio()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");

		$dao->Tabla("tipo_servicio", "");
		$dao->Where("id_estado", "1", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['nombre'] . '</option>';
		}
	}
	public function LlenarComboTipoProvincia()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");

		$dao->Tabla("provincia", "");
		$dao->Where("id_estado", "1", "");
		$dao->Ordenar("nombre ASC");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['nombre'] . '</option>';
		}
	}

	public function LlenarComboTipoLicenciamiento()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");

		$dao->Tabla("licenciamiento", "");
		$dao->Where("id_estado", "1", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['nombre'] . '</option>';
		}
	}

	public function LlenarComboTipoEstablecimiento()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");

		$dao->Tabla("tipo_establecimiento", "");
		$dao->Where("id_estado", "1", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['nombre'] . '</option>';
		}
	}



	public function LlenarComboTipoEstablecimiento2()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");

		$dao->Tabla("institucion", "");
		$dao->Where("id_estado", "1", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['nombre'] . '</option>';
		}
	}

	public function LlenarComboTipoCanton()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");

		$dao->Tabla("canton", "");
		$dao->Where("id_estado", "1", "");
		$dao->Ordenar("nombre ASC");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['nombre'] . '</option>';
		}
	}



	public function LlenarComboTipoParroquia()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");

		$dao->Tabla("parroquia", "");
		$dao->Where("id_estado", "1", "");
		$dao->Ordenar("nombre ASC");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['nombre'] . '</option>';
		}
	}

	public function CargarTipoServicio2()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Campo("descripcion", "");
		$dao->Campo("usuario_registro", "");
		$dao->Campo("fecha_registro", "");
		$dao->Campo("id_estado", "");



		$dao->Tabla("tipo_servicio", "");
		$dao->In_Where("id_estado", "1,2", "");



		$respuesta = $dao->Consultar();


		foreach ($respuesta as $row => $item) {

			echo '		<tr id=' . $item["id"] . ' estado=' . $item["id_estado"] . '>
                          <td>' . $item[0] . '</td>
		                    <td>' . $item[1] . '</td>
		                    <td>' . $item[2] . '</td>
		                    <td>' . $item[3] . '</td>
		                    <td>' . $item[4] . '</td>
                         
                          
                          
                        </tr>';
		}
	}

	public function CargarGrupoEstadistico()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Campo("descripcion", "");
		$dao->Campo("usuario_registro", "");
		$dao->Campo("fecha_registro", "");
		$dao->Campo("id_estado", "");

		$dao->Tabla("grupo_estadistico", "");
		$dao->In_Where("id_estado", "1,2", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo '		<tr id=' . $item["id"] . ' estado=' . $item["id_estado"] . '>
                          <td>' . $item["id"] . '</td>
                          <td>' . $item["nombre"] . '</td>
                          <td>' . $item["descripcion"] . '</td>
                          <td>' . $item["usuario_registro"] . '</td>
                          <td>' . $item["fecha_registro"] . '</td>
                        </tr>';
		}
	}

	public function CargarEspecialidad()
	{

		$dao = new Dao();

		$dao->Campo("e.id", "");
		$dao->Campo("s.nombre", "");
		$dao->Campo("g.nombre", "");
		$dao->Campo("e.nombre", "");
		$dao->Campo("e.descripcion", "");
		$dao->Campo("e.usuario_registro", "");
		$dao->Campo("e.fecha_registro", "");
		$dao->Campo("e.id_estado", "");

		$dao->TablasInnerAlias("especialidad", "e", "tipo_servicio", "s");
		$dao->TablasInnerAlias("especialidad", "e", "grupo_estadistico", "g");
		$dao->In_Where("e.id_estado", "1,2", "");


		$respuesta = $dao->Consultar();


		foreach ($respuesta as $row => $item) {

			echo '		<tr id=' . $item["id"] . ' estado=' . $item["id_estado"] . '>
                          <td>' . $item[0] . '</td>
                          <td>' . $item[3] . '</td>
                          <td>' . $item[1] . '</td>
                          <td>' . $item[2] . '</td>
                          <td>' . $item[4] . '</td>
                          <td>' . $item[5] . '</td>
                          <td>' . $item[6] . '</td>
                        </tr>';
		}
	}

	public function LlenarComboGrupoEstadistico()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");

		$dao->Tabla("grupo_estadistico", "");
		$dao->Where("id_estado", "1", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['nombre'] . '</option>';
		}
	}
	public function CargarProcedimientos()
	{

		$dao = new Dao();

		$dao->Campo("p.id", "");
		$dao->Campo("e.nombre", "");
		$dao->Campo("p.nombre", "");
		$dao->Campo("p.id_estado", "");
		$dao->Campo("p.precio", "");
		$dao->Campo("p.usuario_registro", "");
		$dao->Campo("p.fecha_registro", "");
		$dao->Campo("p.id_estado", "");

		$dao->TablasInnerAlias("procedimiento", "p", "especialidad", "e");

		$dao->In_Where("p.id_estado", "1,2,20", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {
			$cxc = 'N';
			if ($item[3] == 20) {
				$cxc = 'S';
			}
			echo '		<tr id=' . $item["id"] . ' estado=' . $item["id_estado"] . '>
                          <td>' . $item[0] . '</td>
                          <td>' . $item[2] . '</td>
                          <td>' . $item[1] . '</td>
                          <td>' . $cxc . '</td>
                          <td>' . $item[4] . '</td>
                          <td>' . $item[5] . '</td>
                          <td>' . $item[6] . '</td>
                        </tr>';
		}
	}

	public function LlenarComboProcedimientos()
	{

		$dao = new Dao();

		$dao->Campo("p.id", "");
		$dao->Campo("p.nombre", "");
		$dao->Campo("p.precio", "");


		$dao->Tabla("procedimiento", "p");

		$dao->Where("p.id_estado", "20", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {
			echo ' <option pvp=' . $item[2] . ' value=' . $item[0] . '>' . $item[1] . '</option>';
		}
	}

	public function CargarTipoRelacion()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Campo("descripcion", "");
		$dao->Campo("usuario_registro", "");
		$dao->Campo("fecha_registro", "");

		$dao->Tabla("tipo_relacion", "");
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

	public function CargarTipoCategoria()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Campo("descripcion", "");
		$dao->Campo("usuario_registro", "");
		$dao->Campo("fecha_registro", "");

		$dao->Tabla("categoria", "");
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

	public function CargarEspecialidadCheck()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Campo("descripcion", "");

		$dao->Tabla("especialidad", "");
		$dao->Where("id_estado", "1", "");
		$dao->Ordenar("nombre ASC");

		$respuesta = $dao->Consultar();
		$TipoServicio = new Con_consultaAmbu();


		echo '<div class="col-md-5" style="margin-top: 1em; height: 500px; max-height: 500px; overflow-y:auto; ">
				  <div class="box box-primary box-solid">
				    <div class="box-header with-border">
				      <h3 class="box-title">ESPECIALIDADES</h3>
				     </div> 
      		';
		$combo = '<select class="form-control">' . $TipoServicio->LlenarComboTipoRela() . ' </select>';

		foreach ($respuesta as $row => $item) {

			echo '			<div class="col-md-12 filaEspe" style="border-style: outset;">
								<div class="col-md-4 ">
									<li><span id="nombreEs" style="font-size: 100%;">' . $item['nombre'] . '</span><br>
	                                 </li>
	                             </div>
	                                  <div class="col-md-8"><li>
	                                  <div class="material-switch pull-right" style="margin-top: 5px;">
	                                     <input class="check" id="especa' . $item['id'] . '" name="check" value="' . $item['id'] . '" type="checkbox"/>
	                                      <label for="especa' . $item['id'] . '" class="label-success"></label>
	                                  </div>
	                                  </li><br><br>
	                             </div>
	                         </div>    
                     ';
		}
		echo '</div> </div> ';
		/***********************************************************************************************************************/
		echo '<div id="hora" class="col-md-7" style="margin-top: 1em; height: 500px; max-height: 500px; overflow-y:auto; ">
				  <div class="box box-primary box-solid"  >
				    <div class="box-header with-border">
				      <h3 class="box-title">Horarios</h3>
				     </div> 
			 </div> </div>
      		';
	}


	public function CargarEspecialidadCheckFactura()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Campo("descripcion", "");

		$dao->Tabla("especialidad", "");
		$dao->Where("id_estado", "1", "and");
		$dao->Where("id_tipo_servicio", "1", "");
		$dao->Ordenar("nombre ASC");

		$respuesta = $dao->Consultar();


		foreach ($respuesta as $row => $item) {

			echo '		<tr id=' . $item["id"] . '>
                          <td >' . $item["nombre"] . '</td>
                        </tr>';
		}
	}

	public function CargarEspecialidadServicosCheckFactura()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Campo("descripcion", "");

		$dao->Tabla("especialidad", "");
		$dao->Where("id_estado", "1", "and");
		$dao->Where("id_tipo_servicio", "14", "");
		$dao->Ordenar("nombre ASC");

		$respuesta = $dao->Consultar();


		foreach ($respuesta as $row => $item) {

			echo '		<tr id=' . $item["id"] . '>
                          <td >' . $item["nombre"] . '</td>
                        </tr>';
		}
	}



	public function CargarTipoEstablecimiento()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("nombre", "");
		$dao->Campo("descripcion", "");
		$dao->Campo("usuario_registro", "");
		$dao->Campo("fecha_registro", "");

		$dao->Tabla("tipo_establecimiento", "");
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


	public function CargarEmpresa()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("razon_social", "");
		$dao->Campo("ruc", "");
		$dao->Campo("act_comercial", "");
		$dao->Campo("direccion", "");
		$dao->Campo("telefono", "");
		$dao->Campo("correo1", "");
		$dao->Campo("correo2", "");
		$dao->Campo("correo3", "");
		$dao->Campo("tipo_personeria", "");
		$dao->Campo("repre_legal", "");


		$dao->Tabla("empresa", "");
		$dao->Where("id_estado", "1", "");


		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo '		
						  <tr id=' . $item["id"] . '>
                          <td>' . $item["id"] . '</td>
                          <td>' . $item["razon_social"] . '</td>
                          <td>' . $item["ruc"] . '</td>
                          <td>' . $item["act_comercial"] . '</td>
                          <td>' . $item["direccion"] . '</td>
                          <td>' . $item["telefono"] . '</td>
                          <td>' . $item["correo1"] . '</td>
                          <td>' . $item["correo2"] . '</td>
                          <td>' . $item["correo3"] . '</td>
                          <td>' . $item["tipo_personeria"] . '</td>
                          <td>' . $item["repre_legal"] . '</td>
                        </tr>';
		}
	}



	public function LlenarComboEmpresas()
	{

		$dao = new Dao();

		$dao->Campo("id", "");
		$dao->Campo("razon_social", "");

		$dao->Tabla("empresa", "");
		$dao->Where("id_estado", "1", "");

		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo ' <option value=' . $item['id'] . '>' . $item['razon_social'] . '</option>';
		}
	}


	public function CargarProveedores()
	{

		$dao = new Dao();

		$dao->Campo("p.id", "");
		$dao->Campo("pr.nombre", "");
		$dao->Campo("p.descripcion", "");
		$dao->Campo("p.ruc", "");
		$dao->Campo("p.direccion", "");
		$dao->Campo("p.representante", "");
		$dao->Campo("p.telefono", "");
		$dao->Campo("p.email", "");

		$dao->Campo("p.tipo", "");
		$dao->Campo("p.contabilidad", "");




		//$dao->Tabla("proveedor","");
		//$dao->In_Where("id_estado","1,2","");


		$dao->TablasInnerAlias("proveedor", "p", "provincia", "pr");
		$dao->In_Where("p.id_estado", "1,2", "");

		$respuesta = $dao->Consultar();

		foreach ($respuesta as $row => $item) {

			echo '		
						  
                        <tr id=' . $item[0] . ' >
                          <td>' . $item[0] . '</td>
                          <td>' . $item[1] . '</td>
                          <td>' . $item[2] . '</td>
                          <td>' . $item[3] . '</td>
                          <td>' . $item[4] . '</td>
                          <td>' . $item[5] . '</td>
                          <td>' . $item[6] . '</td>
                          <td>' . $item[7] . '</td>                          
                          <td>' . $item[8] . '</td>
                          <td>' . $item[9] . '</td>

                        </tr>';
		}
	}
}
