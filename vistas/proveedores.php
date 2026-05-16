<div class="col-md-12">
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">PROVEEDORES</h3>
    </div>
    <div class="box-body">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-1">
          <button id="nuevoRegistro" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
        </div>
      </div>
      <div class="col-md-12">
        <br><br>
        <table id="datatableProveedores" cellspacing="0" class="table nowrap table-condensed">
          <thead>
            <tr>
              <th></th>
              <th>PROVINCIA</th>
              <th>DESCRIPCION</th>
              <th>RUC</th>
              <th>DIRECCIÓN</th>
              <th>REPRESENTANTE</th>
              <th>TÉLEFONO</th>
              <th>EMAIL</th>
              <th>TIPO</th>
              <th>CONTABILIDAD</th>
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
        <h4 class="modal-title">REFERIDO</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            <form role="form" method="post" id="RegistroPrveedores">
              <div class="form-group col-md-6">
                <label for="Nombre">PROVINCIA</label>
                <select id="ProvinciaProve" name="provinciaEsta" autofocus class="form-control input-sm">
                  <option value="0">Seleccionar..</option>
                  <?php
                  $TipoServicio = new Con_Especialidad();
                  $TipoServicio->LlenarComboTipoProvincia();
                  ?>
                </select>
              </div>

              <div class="form-group col-md-6">
                <label for="Nombre">DESCRIPCIÓN</label>
                <input type="text" required class="form-control input-sm" autocomplete="off" id="descriProve" name="actividadCome" placeholder="Descripcion">
              </div>

              <div class="form-group col-md-6">
                <label for="Nombre">RUC</label>
                <input type="number" required class="form-control input-sm" autocomplete="off" id="rucProve" name="actividadCome" placeholder="Ruc">
              </div>

              <div class="form-group col-md-6">
                <label for="Nombre">DIRECCIÓN</label>
                <input type="text" required class="form-control input-sm" autocomplete="off" id="direccionProve" name="actividadCome" placeholder="DIRECCIÓN">
              </div>

              <div class="form-group col-md-6">
                <label for="Nombre">REPRESENTANTE</label>
                <input type="text" required class="form-control input-sm" autocomplete="off" id="repreProve" name="actividadCome" placeholder="Representante">
              </div>

              <div class="form-group col-md-6">
                <label for="Nombre">TÉLEFONO</label>
                <input type="text" required class="form-control input-sm" autocomplete="off" id="teleProve" name="actividadCome" placeholder="TÉLEFONO">
              </div>

              <div class="form-group col-md-6">
                <label for="Nombre">EMAIL</label>
                <input type="email" required class="form-control input-sm" autocomplete="off" id="emailProve" name="actividadCome" placeholder="Email">
              </div>


              <div class="form-group col-md-6">
                <label for="Nombre">TIPO PROVEEDOR</label>
                <select id="TipoProve" name="personeria" class="form-control input-sm">
                  <option value="0">Seleccionar..</option>
                  <option value="PUBLICO">PUBLICO</option>
                  <option value="PRIVADO">PRIVADO</option>
                </select>
              </div>

              <div class="form-group col-md-6">
                <label for="Nombre">CONTABILIDAD</label>
                <select id="ContaProve" name="personeria" class="form-control input-sm">
                  <option value="0">Seleccionar..</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div class="col-md-12">
                <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="GuardarProve" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                <button type="submit" id="ModificarProve" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="js/Js_proveedores.js?v=1.0"></script>