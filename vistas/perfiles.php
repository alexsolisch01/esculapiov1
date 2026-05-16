<div class="row">
  <div class="col-md-12">

    <div class="card">
      <div class="card-title">🛡️ Gestión de Perfiles</div>

      <!-- ===== TABS ===== -->
      <ul class="nav nav-tabs wizard-tabs">
        <li class="active"><a href="#tab_1" data-toggle="tab">📋 Perfiles</a></li>
        <li><a href="#tab_2" data-toggle="tab">🔐 Asignación de Pantallas</a></li>
      </ul>

      <div class="tab-content">

        <!-- ================= TAB 1 ================= -->
        <div class="tab-pane active" id="tab_1">
          <div class="row">
            <div class="col-md-12">
              <div class="text-right" style="margin-bottom:10px;">
                <button id="nuevoRegistro" class="btn btn-primary"> ➕ Nuevo Perfil</button>
              </div>
              <div class="table-responsive saas-table-container">

                <table id="datatablePerfil"  class="table saas-table">

                  <thead>
                    <tr>
                      <th>Acciones</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                    </tr>
                  </thead>

                  <tbody>
                    <?php
                    $Perfil = new Con_Perfil();
                    $Perfil->Cargar();
                    ?>
                  </tbody>

                </table>

              </div>
            </div>
          </div>
        </div>

        <!-- ================= TAB 2 ================= -->
        <div class="tab-pane" id="tab_2">

          <div class="row">
            <div class="col-md-6">
              <label>PERFIL</label>
              <select id="cbmPerfilPantalla" class="form-control" data-live-search="true">
                <option value="0">Seleccionar</option>
                <?php
                $dao = new Con_Perfil();
                $dao->LlenarCombo();
                ?>
              </select>

            </div>
          </div>

          <div class="row">
            <div class="col-md-12">

              <div class="table-responsive saas-table-container">

                <table id="datatablePantalla" class="table saas-table">

                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Pantalla</th>
                      <th style="text-align:center;">
                        <input type="checkbox" id="MarcarTodos" title="Seleccionar todos">
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <?php
                    $Perfil = new Con_Pantalla();
                    $Perfil->CargarTablaPantalla();
                    ?>
                  </tbody>

                </table>

              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  </div>  
</div>


<!-- ================= MODAL ================= -->
<div class="modal fade modalNuevo" tabindex='1' data-backdrop="static" data-keyboard="false">

  <div class="modal-dialog modal-sm">

    <div class="modal-content">

      <div class="modal-header">
        <h4 class="card-title">🛡️ Perfil</h4>
      </div>

      <div class="modal-body">

        <form role="form" method="post" id="RegistroPerfil">

          <div class="card">

            <div class="card-title">📋 Información</div>

            <div class="form-group">
              <label>NOMBRE</label>
              <input type="text" class="form-control" autocomplete="off" id="Nombre" name="nombre" placeholder="Nombre del perfil">
            </div>

            <div class="form-group">
              <label>DESCRIPCIÓN</label>
              <textarea class="form-control" rows="3" id="Descripcion" name="descripcion" placeholder="Descripción..."></textarea>
            </div>

          </div>

          <div class="text-right" style="margin-top:15px;">
            <button type="reset" class="btn btn-default" data-dismiss="modal">
              Cancelar
            </button>

            <button type="submit" id="Guardar" class="btn btn-success">
              💾 Guardar Cambios
            </button>

            <button type="submit" id="Modificar" class="btn btn-primary">
              Modificar
            </button>
          </div>

        </form>

      </div>

    </div>

  </div>

</div>

<script src="js/Js_Perfil.js?v=1.0"></script>