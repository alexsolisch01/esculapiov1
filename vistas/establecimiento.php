<div class="row">

  <div class="col-md-12">

    <div class="card">
      <div class="card-title">🏥 Establecimientos</div>

      <div class="text-right" style="margin-bottom:10px;">
        <button id="nuevoRegistro" class="btn btn-primary">
          ➕ Nuevo Establecimiento
        </button>
      </div>

      <div class="table-responsive saas-table-container">
        <table id="datatableEstablecimientos" class="table saas-table">
          <thead>
            <tr>
              <th>Acciones</th>
              <th>Código MSP</th>
              <th>Establecimiento</th>
              <th>Actividad</th>
              <th>Parroquia</th>
              <th>Área Salud</th>
              <th>Licenciamiento</th>
              <th>Tipo</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Provincia</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

    </div>

  </div>

</div>

<!-- MODAL -->
<div class="modal fade modalNuevo" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">

    <div class="modal-content">

      <div class="modal-header">
        <h4 class="card-title">🏥 Establecimientos</h4>
      </div>

      <div class="modal-body">

        <form id="RegistroEstablecimientoEmpresa">

          <div class="card">
            <div class="card-title">🏥 Información del establecimiento</div>
            <div class="row">

              <div class="col-md-6">
                <label>Nombre Comercial</label>
                <input type="text" class="form-control" id="NombreComercialEsta">
              </div>

              <div class="col-md-6">
                <label>Código MSP</label>
                <input type="text" class="form-control" id="CodigoEstablecimiento">
              </div>

            </div>

            <div class="row">

              <div class="col-md-6">
                <label>Actividad Comercial</label>
                <input type="text" class="form-control" id="ActividadCome">
              </div>

              <div class="col-md-6">
                <label>Área de Salud</label>
                <input type="text" class="form-control" id="AreaSalud">
              </div>

            </div>
          
            <div class="row">
              <div class="col-md-6">
                <label>Licenciamiento</label>
                <select id="Licenciamiento" class="form-control">
                  <option value="0">Seleccionar..</option>
                  <?php
                  $TipoServicio = new Con_Especialidad();
                  $TipoServicio->LlenarComboTipoLicenciamiento();
                  ?>
                </select>
              </div>
              <div class="col-md-6">
                <label>Tipo Establecimiento</label>
                <select id="TipoEstablecimiento" class="form-control">
                  <option value="0">Seleccionar..</option>
                  <?php
                  $TipoServicio = new Con_Especialidad();
                  $TipoServicio->LlenarComboTipoEstablecimiento();
                  ?>
                </select>
              </div>
            </div>
            
          </div>

          <div class="card">
            <div class="card-title">📍 Ubicación</div>
            <div class="row">
                <div class="col-md-6">
                  <label>Provincia</label>
                  <select id="ProvinciaEsta" class="form-control">
                    <option value="0">Seleccionar..</option>
                    <?php
                    $TipoServicio = new Con_Especialidad();
                    $TipoServicio->LlenarComboTipoProvincia();
                    ?>
                  </select>
                </div>
              
                <div class="col-md-6">
                  <label>Cantón</label>
                  <select id="CantonEsta" class="form-control"></select>
                </div>

                <div class="col-md-6">
                  <label>Parroquia</label>
                  <select id="ParroquiaEsta" class="form-control"></select>
                </div>
            </div>

            <div class="row">

              <div class="col-md-12">
                <label>Dirección</label>
                <input type="text" class="form-control" id="DireccionEm">
              </div>

            </div>
          </div>

           <div class="card">
              <div class="card-title">📞 Datos de Contacto</div>
              <div class="row">

                <div class="col-md-6">
                  <label>Teléfono</label>
                  <input type="text" class="form-control" id="TelefonoEm">
                </div>

                <div class="col-md-6">
                  <label>Correo</label>
                  <input type="email" class="form-control" id="CorreoEm">
                </div>

              </div>
          </div>

          <div class="text-right" style="margin-top:15px;">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              Cancelar
            </button>
            <button type="submit" id="GuardarEsta" class="btn btn-success">
              💾 Guardar Cambios
            </button>
            <button type="submit" id="ModificarEsta" class="btn btn-primary">
              Modificar
            </button>
          </div>

        </form>

      </div>

    </div>

  </div>
</div>

<script src="js/Js_Establecimiento.js?v=2.0"></script>