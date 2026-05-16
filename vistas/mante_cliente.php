<!--<div class="col-md-12">
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">CLIENTES</h3>
    </div>
    <div class="box-body ">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-1">
          <button id="nuevoRegistro" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
        </div>
        <div class="col-md-3">
          <br><br>
          <button class="btn btn-success" id="GenerarArchivo"> <i class="fa fa-database" aria-hidden="true"></i>EXPORTAR DATOS</button>
        </div>
        <div class="col-md-6" id="elementoDescarga">

        </div>
      </div>
      <div class="col-md-12 col-sm-12 col-xs-12">
      <br><br>
        <table id="datatableCliente" class="table nowrap table-condensed">
          <thead>
            <tr>
              <th></th>
              <th>CÉDULA</th>
              <th>APELLIDO PATERNO</th>
              <th>APELLIDO MATERNO</th>
              <th>NOMBRES</th>
              <th>CORREO</th>
              <th>DIRECCION</th>
              <th>TELEFONO</th>
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
        <h4 class="modal-title">CLIENTE</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            <form role="form" method="post" id="RegistroCliente">
              <div class="form-group col-md-6">
                <label for="Nombre" style="color: red;">CEDULA</label>
                <input type="text" class="form-control input-sm" id="cedula" autocomplete="off" name="nombre" autocomplete="off">
              </div>
              <div class="form-group col-md-6">
                <label for="Nombre" style="color: red;">APELLIDOS</label>
                <input type="text" class="form-control input-sm" id="apellido" autocomplete="off" name="nombre" autocomplete="off">
              </div>

              <div class="form-group col-md-6">
                <label for="Nombre" style="color: red;">NOMBRES</label>
                <input type="text" class="form-control input-sm" id="nombre" autocomplete="off" name="nombre" autocomplete="off">
              </div>

              <div class="form-group col-md-6">
                <label for="Nombre">TELEFONO (OPCIONAL)</label>
                <input type="text" class="form-control input-sm" id="telefono" autocomplete="off" name="nombre" autocomplete="off">
              </div>

              <div class="form-group col-md-6">
                <label for="Nombre">CORREO ELECTRONICO (OPCIONAL)</label>
                <input type="text" class="form-control input-sm" id="correo" autocomplete="off" name="nombre" autocomplete="off">
              </div>

              <div class="form-group col-md-6">
                <label for="Nombre">DIRECCION (OPCIONAL)</label>
                <input type="text" class="form-control input-sm" id="direccion" autocomplete="off" name="nombre" autocomplete="off">
              </div>
              <div class="form-group col-md-6">
                <label for="Nombre">CREDITO</label>
                <select class="form-control" id="credito">
                  <option value="N">NO</option>
                  <option value="S">SI</option>
                </select>
              </div>
              <div class="col-md-12">
                <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="GuardarCliente" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                <button type="submit" id="ModificarCliente" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-cargando" tabindex="-1" role="dialog" aria-hidden="true" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-sm">
    <div class="modal-content" style="background:rgba(0,0,0,0);">
      <div class="modal-body" aria-hidden="true">
        <div class="col-md-12">
          <div class="box box-primary box-solid">
            <div class="box-header">
              <h3 class="box-title">Procesando..</h3>
            </div>
            <div class="box-body">
            </div>
            <div class="overlay">
              <i class="fa fa-refresh fa-spin"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="js/Js_Cliente.js?v=1.2"></script>-->
<div class="row">
<div class="col-md-12">

  <div class="card">

    <div class="card-title">👥 Clientes</div>

    <!-- ACCIONES -->
    <div class="row" style="margin-bottom:10px;">

      <div class="col-md-6">
        <button id="nuevoRegistro" class="btn btn-primary">
          ➕ Nuevo Cliente
        </button>
      </div>

      <div class="col-md-6 text-right">
        <button class="btn btn-success" id="GenerarArchivo">
          <i class="fa fa-database"></i> Exportar Datos
        </button>
      </div>

    </div>

    <!-- DESCARGA -->
    <div id="elementoDescarga" style="margin-bottom:10px;"></div>

    <!-- TABLA -->
    <div class="table-responsive saas-table-container">

      <table id="datatableCliente" class="table saas-table">

        <thead>
          <tr>
            <th>Acciones</th>
            <th>Cédula</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Nombres</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Teléfono</th>
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
        <h4 class="card-title">👤 Cliente</h4>
      </div>

      <div class="modal-body">

        <form method="post" id="RegistroCliente">

          <div class="card">

            <div class="card-title">📋 Información</div>

            <div class="row">

              <div class="col-md-4">
                <label class="form-label">Cédula</label>
                <input type="text" class="form-control" id="cedula">
              </div>

              <div class="col-md-4">
                <label class="form-label">Apellidos</label>
                <input type="text" class="form-control" id="apellido">
              </div>

              <div class="col-md-4">
                <label class="form-label">Nombres</label>
                <input type="text" class="form-control" id="nombre">
              </div>

              <div class="col-md-4">
                <label class="form-label">Teléfono</label>
                <input type="text" class="form-control" id="telefono">
              </div>

              <div class="col-md-4">
                <label class="form-label">Correo</label>
                <input type="text" class="form-control" id="correo">
              </div>

              <div class="col-md-4">
                <label class="form-label">Dirección</label>
                <input type="text" class="form-control" id="direccion">
              </div>

              <div class="col-md-4">
                <label class="form-label">Crédito</label>
                <select class="form-control" id="credito">
                  <option value="N">NO</option>
                  <option value="S">SI</option>
                </select>
              </div>

            </div>

          </div>

          <!-- BOTONES -->
          <div class="text-right" style="margin-top:15px;">

            <button type="reset" class="btn btn-default" data-dismiss="modal">
              Cancelar
            </button>

            <button type="submit" id="GuardarCliente" class="btn btn-success">
              💾 Guardar Cambios
            </button>

            <button type="submit" id="ModificarCliente" class="btn btn-primary">
              Modificar
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>

</div>


<!-- ================= LOADER ================= -->
<div class="modal fade" id="modal-cargando" data-backdrop="static" data-keyboard="false">

  <div class="modal-dialog modal-sm">

    <div class="modal-content loader-modal">

      <div class="modal-body text-center">

        <div class="loader-spinner"></div>
        <p style="margin-top:10px;">Procesando...</p>

      </div>

    </div>

  </div>

</div>

<script src="js/Js_Cliente.js?v=1.2"></script>