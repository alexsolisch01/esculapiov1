<div class="row">
  <div class="col-md-12">
    <div class="card">
      <div class="card-title">⚙️ Mantenimiento de Procedimientos de Laboratorio</div>
      <!-- ===== TABS ===== -->
      <ul class="nav nav-tabs wizard-tabs">
        <li class="active"><a href="#tab_1" data-toggle="tab">📋 Tipo de Toma</a></li>
        <li><a href="#tab_2" data-toggle="tab">Grupo de Examenes</a></li>
        <li><a href="#tab_3" data-toggle="tab">Entidad del Procedimiento</a></li>
        <li><a href="#tab_4" data-toggle="tab">Equipo Periférico</a></li>
        <li><a href="#tab_5" data-toggle="tab">Procedimientos</a></li>
      </ul>
  
      <div class="tab-content">
      <!-- ================= TAB 1 ================= -->
        <div class="tab-pane active" id="tab_1">
          <div class="row">
            <div class="col-md-12">
              <div class="text-right" style="margin-bottom:10px;">
                <button id="nuevoRegistroMuestra" class="btn btn-primary"> ➕ Nuevo Tipo de Toma</button>
              </div>
              <div class="table-responsive saas-table-container">
                <table id="datatableMuestra" class="table saas-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOMBRE</th>
                      <th>USUARIO DE REGISTRO</th>
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

      <!-- ================= TAB 2 ================= -->
        <div class="tab-pane" id="tab_2">
          <div class="row">
            <div class="col-md-12">
              <div class="text-right" style="margin-bottom:10px;">
                <button id="nuevoRegistroExamen" class="btn btn-primary"> ➕ Nuevo Grupo de Examenes</button>
              </div>

              <div class="table-responsive saas-table-container">
                <table id="datatableExamenes" class="table saas-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOMBRE</th>
                      <th>USUARIO DE REGISTRO</th>
                      <th>FECHA DE REGISTRO</th>
                      <th>ORDEN</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>  
        
      <!-- ================= TAB 3 ================= -->
        <div class="tab-pane" id="tab_3">
          <div class="row">
            <div class="col-md-12">
              <div class="text-right" style="margin-bottom:10px;">
                <button id="nuevoRegistroEntidad" class="btn btn-primary"> ➕ Nueva Entidad</button>
              </div>
              <div class="table-responsive saas-table-container">
                <table id="datatableEntidad" class="table saas-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOMBRE</th>
                      <th>RESPONSABLE</th>
                      <th>USUARIO DE REGISTRO</th>
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

      <!-- ================= TAB 4 ================= -->
        <div class="tab-pane" id="tab_4">
          <div class="row">
            <div class="col-md-12">
              <div class="text-right" style="margin-bottom:10px;">
                <button id="nuevoRegistroEquipo" class="btn btn-primary"> ➕ Nuevo Equipo</button>
              </div>
              <div class="table-responsive saas-table-container">
                <table id="datatableEquipo" class="table saas-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOMBRE</th>
                      <th>USUARIO DE REGISTRO</th>
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

      <!-- ================= TAB 5 ================= -->
        <div class="tab-pane" id="tab_5">
          <div class="row">
            <div class="col-md-12">
              <div class="text-right" style="margin-bottom:10px;">
                <button id="nuevoRegistroProcedimiento" class="btn btn-primary"> ➕ Nuevo Procedimiento</button>
              </div>
              <div class="table-responsive saas-table-container">
                <table id="datatableProLab" class="table saas-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOMBRE</th>
                      <th>TIPO DE TOMA</th>
                      <th>GRUPO DE EXAMEN</th>
                      <th>ENTIDAD</th>
                      <th>EQUIPO</th>
                      <th>PVP</th>
                      <th>PAGO</th>
                      <th>VALOR</th>
                      <th>USUARIO DE REGISTRO</th>
                      <th>FECHA DE REGISTRO</th>
                    </tr>
                  </thead>
                  <tbody class="pointer tablaEquipo">
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      <!-- ================= Tab Content ================= -->
      </div>
    <!-- ================= card ================= -->
    </div>
  </div>
</div>   

          
<div class="modal fade modalNuevoMuestra" tabindex='1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="card-title">📋 TIPO DE TOMA</h4>
      </div>

      <div class="modal-body">
        <form role="form" method="post" id="RegistroMuestra">
          <div class="card">
            <div class="card-title">📋 Información</div>
            <div class="form-group">
              <label for="Nombre">NOMBRE MUESTRA</label>
              <input type="text" required class="form-control" autocomplete="off" id="NombreMuestra" autofocus placeholder="NOMBRE DE LA MUESTRA">
            </div>
          </div>  
          <div class="text-right" style="margin-top:15px;">
            <button type="reset" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            <button type="submit" id="GuardarMuestra" class="btn btn-success">💾 Guardar Cambios</button>
            <button type="submit" id="ModificarMuestra" class="btn btn-primary">✏️ Modificar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
        
<div class="modal fade modalNuevoGrupo" tabindex='1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="card-title">GRUPO DE EXAMEN</h4>
      </div>
      
      <div class="modal-body">
        <form role="form" method="post" id="RegistroExamenes">
          <div class="card">
            <div class="form-group">
              <label for="Nombre">NOMBRE GRUPO</label>
              <input type="text" required class="form-control" autofocus autocomplete="off" id="NombreExa" placeholder="NOMBRE DEL GRUPO">
            </div>
            <div class="form-group">
              <label for="Orden">ORDEN</label>
              <input type="number" required class="form-control" autocomplete="off" id="OrdenExa" placeholder="ORDEN DE VISUALIZACION">
            </div>
            <div class="text-right" style="margin-top:15px;">
              <button type="reset" class="btn btn-default" data-dismiss="modal">Cancelar</button>
              <button type="submit" id="GuardarExa" class="btn btn-success">💾 Guardar Cambios</button>
              <button type="submit" id="ModificarExa" class="btn btn-primary">✏️ Modificar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
        
      
<div class="modal fade modalNuevoEntidad" tabindex='1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="card-title">ENTIDAD</h4>
      </div>
      
      <div class="modal-body">
        <form role="form" method="post" id="RegistroEntidad">
          <div class="card">  
            <div class="form-group">
              <label for="Nombre">NOMBRE ENTIDAD</label>
              <input type="text" required class="form-control" autofocus autocomplete="off" id="NombreEntidad" name="nombreproce" placeholder="NOMBRE DE ENTIDAD">
            </div>
            <div class="form-group">
              <label for="Nombre">RESPONSABLE</label>
              <select id="cbmMedicoEntidad" name="cbmMedicoEntidad" class="form-control" data-live-search="true">
                <option value="0">SELECCIONAR..</option>
                <?php
                $TipoServicio = new Con_Empleado();
                $TipoServicio->LlenarComboMEDICO();
                ?>
              </select>
            </div>
            <div class="text-right" style="margin-top:15px;">
              <button type="reset" class="btn btn-default" data-dismiss="modal">Cancelar</button>
              <button type="submit" id="GuardarEntidad" class="btn btn-success">💾 Guardar Cambios</button>
              <button type="submit" id="ModificarEntidad" class="btn btn-primary">✏️ Modificar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

      <div class="modal fade modalNuevoEquipo" tabindex='1' data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="card-title">EQUIPO</h4>
            </div>

            <div class="modal-body">
              <form role="form" method="post" id="RegistroEquipo">
                <div class="card">
                  <div class="form-group">
                    <label for="Nombre">NOMBRE</label>
                    <input type="text" required class="form-control" autofocus autocomplete="off" id="NombreEquipo" name="nombreperi" placeholder="NOMBRE DEL PERIFÉRICO">
                  </div>
                  <div class="text-right" style="margin-top:15px;">
                      <button type="reset" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                      <button type="submit" id="GuardarEquipo" class="btn btn-success">💾 Guardar Cambios</button>
                      <button type="submit" id="ModificarEquipo" class="btn btn-primary">✏️ Modificar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade modalNuevoProcedimiento" tabindex='1' data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="card-title">PROCEDIMIENTO</h4>
            </div>
            <div class="modal-body">
              <form role="form" method="post" id="RegistroProLab">
                <div class="card">
                  <div class="form-group col-md-12">
                      <label for="Nombre">NOMBRE</label>
                      <input type="text" required class="form-control" autocomplete="off" autocomplete="off" id="NombreProLab" name="nombreperi" placeholder="NOMBRE PROCEDIMIENTO">
                  </div>
                  <div class="form-group col-md-12">
                    <label for="Nombre">TIPO DE TOMA</label>
                    <select id="ComboMuestra" name="TipoServicio" class="form-control" data-live-search="true">
                      <option value="0">Seleccionar..</option>
                      <?php
                      $TipoServicio = new Con_Laboratorio();
                      $TipoServicio->LlenarComboMuestra();
                      ?>
                    </select>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="Nombre">GRUPO DE EXAMEN</label>
                    <select id="ComboGrupo" name="TipoServicio" class="form-control" data-live-search="true">
                      <option value="0">Seleccionar..</option>
                      <?php
                      $TipoServicio = new Con_Laboratorio();
                      $TipoServicio->LlenarComboGrupoExamen();
                      ?>
                    </select>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="Nombre">ENTIDAD</label>
                    <select id="ComboEntidad" name="TipoServicio" class="form-control" data-live-search="true">
                      <?php
                      $TipoServicio = new Con_Laboratorio();
                      $TipoServicio->LlenarComboEntidad();
                      ?>
                    </select>
                  </div>
                  <div class="form-group col-md-12" id="PERIFÉRICO">
                    <label for="Nombre">EQUIPO PERIFÉRICO</label>
                    <select id="ComboEquipo" name="TipoServicio" class="form-control" data-live-search="true">
                      <?php
                      $TipoServicio = new Con_Laboratorio();
                      $TipoServicio->LlenarComboEquipo();
                      ?>
                    </select>
                  </div>
                  <div class="form-group col-md-12" id="Pvprecio">
                    <label for="Nombre">PVP</label>
                    <input type="number" required step="any" value="0.00" class="form-control" autocomplete="off" id="Pvp" name="nombreperi" placeholder="PVP">
                    <span class="help-block" style="display:none;">Valor Obligatorio</span>
                  </div>
                  <div class="form-group col-md-12" style="display:none;" id="PagoPro">
                    <label for="Nombre">PAGO</label>
                    <select class="form-control" id="Pago">
                      <option value="PORCENTAJE">PORCENTAJE</option>
                      <option value="VALOR">VALOR</option>
                    </select>
                  </div>
                  <div class="form-group col-md-12" style="display: none;" id="ValorProc">
                    <label for="Nombre">VALOR</label>
                    <input type="number" step='any' class="form-control" autocomplete="off" autocomplete="off" id="ValorPro" name="valor" placeholder="Valor">
                    <span class="help-block" style="display:none;">Valor mayor al Precio</span>
                  </div>
                  <div class="form-group col-md-12">
                    <label>GENERAR QR</label>
                    <select id="generarQr" class="form-control" data-live-search="true">
                      <option value="N">NO</option>
                      <option value="S">SI</option>
                    </select>
                  </div>
                  <div class="text-right" style="margin-top:15px;">
                    <button type="reset" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                    <button type="submit" id="GuardarProLab" class="btn btn-success">💾 Guardar Cambios</button>
                    <button type="submit" id="ModificarProLab" class="btn btn-primary">✏️ Modificar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <script src="js/Js_Laboratorio.js?v=3.0"></script>