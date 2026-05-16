<!--<div class="col-md-12">
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">USUARIOS</h3>
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
          <table id="datatableUsuarios" width="100%" class="table table-striped table-bordered nowrap">
            <thead>
              <tr>
                <th></th>
                <th>EMPLEADO</th>
                <th>PERFIL</th>
                <th>USUARIO</th>
                <th>PUNTO DE VENTA</th>
                <th>FECHA DE REGISTRO</th>
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
        <h4 class="modal-title">USUARIO</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            <form role="form" method="post" id="RegistroUsuario">
              <div class="form-group col-md-6" id="ComboEmpleado">
                <label for="Nombre">EMPLEADOS</label>
                <select id="cbmEmpleado" name="cbmEmpleado" class="form-control input-sm">
                  <option value="0">SELECCIONAR..</option>>
                  <?php
                 /* $TipoServicio = new Con_Empleado();
                  $TipoServicio->LlenarCombo();*/
                  ?>
                </select>
              </div>
              <div class="form-group col-md-6" id="ComboMedico">
                <label for="Nombre">MEDICOS</label>
                <select id="cbmMedico" name="cbmMEDICO" class="form-control input-sm">
                  <option value="0">SELECCIONAR..</option>>
                  <?php
                  /*$TipoServicio = new Con_Empleado();
                  $TipoServicio->LlenarComboMEDICO();*/
                  ?>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="Nombre">PERFIL</label>
                <select id="cbmPerfiles" name="cbmPerfiles" class="form-control input-sm">
                  <option value="0">SELECCIONAR..</option>
                  <?php
                  /*$Perfil = new Con_Perfil();
                  $Perfil->LlenarCombo();*/
                  ?>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="Nombre">PUNTO DE VENTA ("OPCIONAL")</label>
                <select id="cbmPuntos" name="cbmPuntos" class="form-control input-sm">
                  <?php
                  /*$TipoServicio = new Con_Establecimiento();
                  $TipoServicio->LlenarComboPuntos();*/
                  ?>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="DIRECCIÓN">USUARIO</label>
                <input type="text"  class="form-control input-sm" id="Usuario" name="DIRECCIÓN" placeholder="Usuario">
              </div>
              <div class="col-md-12">
                <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="GuardarUsuario" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                <button type="submit" id="ModificarUsuario" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="js/Js_Usuarios.js?v=1.1"></script>-->
<div class="row">

  <div class="col-md-12">

    <div class="card">
      <div class="card-title">👤 Usuarios</div>

      <div class="text-right" style="margin-bottom:10px;">
        <button id="nuevoRegistro" class="btn btn-primary">
          ➕ Nuevo Usuario
        </button>
      </div>

      <div class="table-responsive saas-table-container">
        <table id="datatableUsuarios" class="table saas-table">

          <thead>
            <tr>
              <th>Acciones</th>
              <th>Empleado</th>
              <th>Perfil</th>
              <th>Usuario</th>
              <th>Punto de Venta</th>
              <th>Fecha Registro</th>
            </tr>
          </thead>

          <tbody></tbody>

        </table>
      </div>

    </div>

  </div>

</div>

<!-- ================= MODAL ================= -->
<div class="modal fade modalNuevo" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">

    <div class="modal-content">

      <div class="modal-header">
        <h4 class="card-title">👤 Usuario</h4>
      </div>

      <div class="modal-body">

        <form id="RegistroUsuario">

          <!-- ===== INFORMACIÓN USUARIO ===== -->
          <div class="card">
            <div class="card-title">👤 Información del Usuario</div>

            <div class="row">

              <div class="col-md-6">
                <label>Empleado</label>
                <select id="cbmEmpleado" class="form-control">
                  <option value="0">Seleccionar..</option>
                  <?php
                  $TipoServicio = new Con_Empleado();
                  $TipoServicio->LlenarCombo();
                  ?>
                </select>
              </div>

              <div class="col-md-6">
                <label>Médico</label>
                <select id="cbmMedico" class="form-control">
                  <option value="0">Seleccionar..</option>
                  <?php
                  $TipoServicio->LlenarComboMEDICO();
                  ?>
                </select>
              </div>

            </div>

            <div class="row">

              <div class="col-md-6">
                <label>Perfil</label>
                <select id="cbmPerfiles" class="form-control">
                  <option value="0">Seleccionar..</option>
                  <?php
                  $Perfil = new Con_Perfil();
                  $Perfil->LlenarCombo();
                  ?>
                </select>
              </div>

              <div class="col-md-6">
                <label>Punto de Venta (Opcional)</label>
                <select id="cbmPuntos" class="form-control">
                  <?php
                  $TipoServicio = new Con_Establecimiento();
                  $TipoServicio->LlenarComboPuntos();
                  ?>
                </select>
              </div>

            </div>

          </div>

          <!-- ===== CREDENCIALES ===== -->
          <div class="card">
            <div class="card-title">🔐 Credenciales</div>

            <div class="row">

              <div class="col-md-6">
                <label>Usuario</label>
                <input type="text" class="form-control" id="Usuario" placeholder="Ingrese usuario">
              </div>

            </div>

          </div>

          <!-- ===== BOTONES ===== -->
          <div class="text-right" style="margin-top:15px;">

            <button type="button" class="btn btn-default" data-dismiss="modal">
              Cancelar
            </button>

            <button type="submit" id="GuardarUsuario" class="btn btn-success">
              💾 Guardar Cambios
            </button>

            <button type="submit" id="ModificarUsuario" class="btn btn-primary">
              Modificar
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
</div>

<script src="js/Js_Usuarios.js?v=2.0"></script>