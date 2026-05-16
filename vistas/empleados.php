<!--<div class="col-md-12">
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">EMPLEADOS</h3>
    </div>
    <div class="box-body ">
      <div class="row">
        <div class="col-md-12">
          <button id="nuevoRegistro" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <br>
          <table id="datatableEmpleados" cellspacing="0" class="table nowrap table-condensed">
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
                
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
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
        <h4 class="modal-title">EMPLEADO</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            <form role="form" method="post" id="RegistroEmpleados">
              <div class="form-group col-md-6">
                <div style="background: url(imagenes/user.png) no-repeat; height: 15em; background-size: cover;background-position: center center;" class="btn btn-default btn-file col-md-12">
                  <input type="file" name="fotoMEDICO" id="FotoEmpleado" accept="image/x-png,image/jpeg">
                </div>
              </div>
              <div class="form-group col-md-6">
                <label for="Nombre">CÉDULA</label>
                <input type="text" class="form-control input-sm" id="CedulaEmpleado" name="CÉDULA" placeholder="CÉDULA">
              </div>
              <div class="form-group col-md-6">
                <label for="Apellido">APELLIDO</label>
                <input type="text" class="form-control input-sm" id="ApellidoEmpleado" name="apellido" placeholder="Apellido">
              </div>
              <div class="form-group col-md-6">
                <label for="Nombre">NOMBRE</label>
                <input type="text" class="form-control input-sm" id="NombreEmpleado" name="nombre" placeholder="Nombre">
              </div>
              <div class="form-group col-md-6">
                <label for="TÉLEFONO Convencional">TELÉFONO</label>
                <input type="text" class="form-control input-sm" id="TelefonoEmpleado" name="TÉLEFONO" placeholder="Convencional / Celular">
              </div>
              <div class="form-group col-md-6">
                <label for="Correo ELECTRÓNICO">CORREO ELECTRÓNICO</label>
                <input type="email" class="form-control input-sm" id="CorreoEmpleado" name="correo" placeholder="Correo">
              </div>
              <div class="form-group col-md-6">
                <label for="DIRECCIÓN">DIRECCIÓN</label>
                <input type="text" class="form-control input-sm" id="DireccionEmpleado" name="DIRECCIÓN" placeholder="Consultorio / Domicilio">
              </div>
              <div class="form-group col-md-6">
                <label for="Fecha Nacimiento">FECHA NACIMIENTO</label>
                <input type="date" class="form-control input-sm" id="FechaEmpleado" name="fecha" value="<?php echo date("Y-m-d"); ?>">
              </div>
              <div class="form-group col-md-6">
                <label for="DIRECCIÓN" style="color: white;">-</label>
                <div class="btn btn-default btn-file col-md-12">
                  <i class="fa fa-paperclip"></i> FIRMA ESCANEADA
                  <input type="file" name="firmaMEDICO" id="FirmaEmpleado">
                </div>
              </div>
              <div class="col-md-12">
                <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="GuardarEmpleado" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                <button type="submit" id="ModificarEmpleado" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="js/Js_Empleado.js?v=1.0"></script>-->
<div class="row">

  <div class="col-md-12">

    <div class="card">

    <div class="card-title">👥 Empleados</div>

    <!-- BOTÓN -->
    <div class="text-right" style="margin-bottom:10px;">
      <button id="nuevoRegistro" class="btn btn-primary">
        ➕ Nuevo Empleado
      </button>
    </div>

    <!-- TABLA -->
    <div class="table-responsive saas-table-container">

      <table id="datatableEmpleados" class="table saas-table">

        <thead>
          <tr>
            <th>Acciones</th>
            <th>Cédula</th>
            <th>Apellidos</th>
            <th>Nombres</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Usuario Registro</th>
            <th>Fecha Registro</th>
            <th>Dirección</th>
          </tr>
        </thead>

        <tbody></tbody>

      </table>

    </div>

  </div>
</div>
</div>


<!-- ================= MODAL ================= -->
<div class="modal fade modalNuevo" tabindex='1' data-backdrop="static" data-keyboard="false">

  <div class="modal-dialog modal-lg">

    <div class="modal-content">

      <div class="modal-header">
        <h4 class="card-title">👤 Empleado</h4>
      </div>

      <div class="modal-body">

        <form role="form" method="post" id="RegistroEmpleados">

          <!-- ===== CARD ===== -->
          <div class="card">

            <div class="card-title">📋 Información Personal</div>

            <div class="row">

              <!-- FOTO -->
              <div class="col-md-4">
                <label class="form-label">Foto</label>
                <div class="image-upload-box">
                  <input type="file" name="fotoMEDICO" id="FotoEmpleado" accept="image/png,image/jpeg">
                </div>
              </div>

              <!-- CÉDULA -->
              <div class="col-md-4">
                <label class="form-label">Cédula</label>
                <input type="text" class="form-control" id="CedulaEmpleado" name="CÉDULA">
              </div>

              <!-- APELLIDO -->
              <div class="col-md-4">
                <label class="form-label">Apellido</label>
                <input type="text" class="form-control" id="ApellidoEmpleado" name="apellido">
              </div>

              <!-- NOMBRE -->
              <div class="col-md-4">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-control" id="NombreEmpleado" name="nombre">
              </div>

              <!-- TELÉFONO -->
              <div class="col-md-4">
                <label class="form-label">Teléfono</label>
                <input type="text" class="form-control" id="TelefonoEmpleado" name="TÉLEFONO">
              </div>

              <!-- EMAIL -->
              <div class="col-md-4">
                <label class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" id="CorreoEmpleado" name="correo">
              </div>

              <!-- DIRECCIÓN -->
              <div class="col-md-6">
                <label class="form-label">Dirección</label>
                <input type="text" class="form-control" id="DireccionEmpleado" name="DIRECCIÓN">
              </div>

              <!-- FECHA -->
              <div class="col-md-6">
                <label class="form-label">Fecha Nacimiento</label>
                <input type="date" class="form-control" id="FechaEmpleado" name="fecha" value="<?php echo date("Y-m-d"); ?>">
              </div>

              <!-- FIRMA -->
              <div class="col-md-6">
                <label class="form-label">Firma Escaneada</label>
                <div class="file-upload-box">
                  <input type="file" name="firmaMEDICO" id="FirmaEmpleado">
                </div>
              </div>

            </div>

          </div>

          <!-- BOTONES -->
          <div class="text-right" style="margin-top:15px;">

            <button type="reset" class="btn btn-default" data-dismiss="modal">
              Cancelar
            </button>

            <button type="submit" id="GuardarEmpleado" class="btn btn-success">
              💾 Guardar
            </button>

            <button type="submit" id="ModificarEmpleado" class="btn btn-primary">
              Modificar
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>

</div>

<script src="js/Js_Empleado.js?v=1.0"></script>