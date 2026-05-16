<div class="col-md-12">
	<div class="box box-primary">
		<div class="box-header with-border">
			<h3 class="box-title">MÉDICOS</h3>
		</div>
		<div class="box-body">
			<button type="submit" id="nuevoRegistro" class="btn btn-primary"><i class="fa fa-plus" aria-hidden="true"></i> NUEVO</button>
			<div class="clearfix"></div>
			<div class="col-md-12 col-sm-12 col-xs-12">
				<br><br>
				<table id="datatableDoctores" class="table nowrap table-condensed">
					<thead>
						<tr>
							<th></th>
							<th>CÉDULA</th>
							<th>APELLIDOS</th>
							<th>NOMBRES</th>
							<th>TELÉFONO</th>
							<th>EMAIL</th>
							<th>USUARIO REGISTRO</th>
							<th>FECHA DE REGISTRO</th>
							<th>DIRECCIÓN</th>
							<th>FOTO</th>
							<th>FIRMA</th>
							<th>FECHA NACIMIENTO</th>
							<th>Reg.Sanitario</th>
							<th>Usa El Sistema</th>
							<th>Codigo E.</th>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<div class="modal fade modalNuevo" tabindex='1' data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">ADMISIÓN</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12">
						<form role="form" method="post" id="PrimerPestanaEmpleado">
							<div class="form-group col-md-6">
								<div style="background: url(imagenes/user.png) no-repeat; height: 15em; background-size: cover;background-position: center center;" class="btn btn-default btn-file col-md-12">
									<input type="file" name="fotoMedico" id="FotoMedico" accept="image/x-png,image/jpeg">
								</div>
							</div>
							<div class="form-group col-md-6">
								<label for="Nombre">CÉDULA</label>
								<input type="text" class="form-control input-sm" id="CedulaMedico" name="CÉDULA" placeholder="CÉDULA">
							</div>
							<div class="form-group col-md-6">
								<label for="Apellido">APELLIDO</label>
								<input type="text" class="form-control input-sm" id="ApellidoMedico" name="apellido" placeholder="Apellido">
							</div>
							<div class="form-group col-md-6">
								<label for="Nombre">NOMBRE</label>
								<input type="text" class="form-control input-sm" id="NombreMedico" name="nombre" placeholder="Nombre">
							</div>
							<div class="clearfix"></div>
							<div class="form-group col-md-6">
								<label for="TÉLEFONO Convencional">TÉLEFONO</label>
								<input type="text" class="form-control input-sm" id="TelefonoMedico" name="TÉLEFONO" placeholder="Convencional / Celular">
							</div>
							<div class="form-group col-md-6">
								<label for="Correo ELECTRÓNICO">CORREO ELECTRÓNICO</label>
								<input type="email" class="form-control input-sm" id="CorreoMedico" name="correo" placeholder="Correo">
							</div>
							<div class="form-group col-md-6">
								<label for="DIRECCIÓN">DIRECCIÓN</label>
								<input type="text" class="form-control input-sm" id="DireccionMedico" name="DIRECCIÓN" placeholder="Consultorio / Domicilio">
							</div>
							<div class="form-group col-md-6">
								<label for="Fecha Nacimiento">FECHA NACIMIENTO</label>
								<input type="date" class="form-control input-sm" id="FechaMedico" name="fecha">
							</div>
							<div class="form-group col-md-6">
								<label for="SANITARIO">REGISTRO SANITARIO</label>
								<input type="text" class="form-control input-sm" id="sanitario" name="DIRECCIÓN" placeholder="Registro Sanitario">
							</div>
							<div class="form-group col-md-6">
								<label for="SANITARIO">CODIGO EMERGENCIAS</label>
								<input type="password" class="form-control input-sm" id="codigo" placeholder="Codigo para emergencias">
							</div>
							<div class="form-group col-md-6">
								<div style="background: url(imagenes/firmamedico.png) no-repeat; height: 15em; background-size: cover;background-position: center center;" class="btn btn-default btn-file col-md-12">
									<input type="file" name="FirmaMedico" id="FirmaMedico" accept="image/x-png,image/jpeg">
								</div>
							</div>
							<div class="form-group col-md-6">
								<label for="Nombre">USA EL SISTEMA PARA LIQUIDAR</label>
								<select id="cbmUsa" class="selectpicker show-tick form-control input-sm" data-live-search="true">
									<option value="S">SI</option>
									<option value="N">NO</option>
								</select>
							</div>
							<div class="col-md-12">
								<button id="ModificarMedico" class="btn btn-primary pull-right" style="display: none;"><i class="fa fa-pencil-square" aria-hidden="true"></i> MODIFICAR</button>
								<button id="GuardarMedico" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> GUARDAR</button>
								<button class="btn btn-danger" data-dismiss="modal"><i class="fa fa-sign-out" aria-hidden="true"></i> SALIR</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>



<div class="modal  fade modalProcedimientos" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">

			<div class="modal-header btn-info">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
				</button>
				<h4 class="modal-title" id="TituloModal2">ESPECIALIDAD</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12">
						<table id="datatableProcedimientos" width="100%" class="table table-striped table-bordered">
							<thead>
								<tr>
									<th>Id</th>
									<th>Procedimiento</th>
									<th>Precio</th>
									<th>Forma Pago</th>
									<th>Valor</th>
									<th class="btn btn-warning"><input type="checkbox" id="MarcarTodoProce"></th>
								</tr>
							</thead>
							<tbody>

							</tbody>
						</table>
					</div>
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Aceptar</button>
			</div>

		</div>
	</div>
</div>

<script src="js/Js_Medico.js?v=1.7"></script>
<!--<script src="js/Js_Empleado.js"></script>-->