      <div class="col-md-12">
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li class="active"><a href="#tab_1" data-toggle="tab">Tipo de Servicios</a></li>
            <li><a href="#tab_2" data-toggle="tab">Grupo Estadistico</a></li>
            <li><a href="#tab_3" data-toggle="tab">Especialidades</a></li>
            <li><a href="#tab_4" data-toggle="tab">Procedimiento de la Consulta Ambulatoria</a></li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab_1">
              <div class="row">
                <div class="col-md-12">
                  <button id="nuevoRegistroTipoServicio" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <table id="datatableTipoServicio" width="100%" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>USUARIO REGISTRO</th>
                        <th>FECHA DE REGISTRO</th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.tab-pane -->
            <div class="tab-pane" id="tab_2">
              <div class="row">
                <div class="col-md-12">
                  <button id="nuevoRegistroGrupo" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <table id="datatableGrupos" width="100%" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>USUARIO REGISTRO</th>
                        <th>FECHA DE REGISTRO</th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.tab-pane -->
            <div class="tab-pane" id="tab_3">
              <div class="row">
                <div class="col-md-12">
                  <button id="nuevoRegistroEspecialidad" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <table id="datatableEspecialidad" width="100%" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Especialidad</th>
                        <th>Tipo de Servicio</th>
                        <th>Grupo Estadistico</th>
                        <th>Descripcion</th>
                        <th>USUARIO REGISTRO</th>
                        <th>FECHA DE REGISTRO</th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.tab-pane -->
            <div class="tab-pane" id="tab_4">
              <div class="row">
                <div class="col-md-12">
                  <button id="nuevoRegistroProcedimiento" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <table id="datatableProcedimientos" width="100%" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Procedimiento</th>
                        <th>Especialidad</th>
                        <th>Precio</th>
                        <th>USUARIO REGISTRO</th>
                        <th>FECHA DE REGISTRO</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.tab-pane -->
          </div>
          <!-- /.tab-content -->
        </div>
      </div>

      <div class="modal fade modalNuevoTipo" tabindex='1' data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">TIPO DE SERVICIO</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <form role="form" method="post" id="RegistroTipoServicio">
                    <div class="form-group col-md-12">
                      <label for="Nombre">NOMBRE</label>
                      <input type="text" class="form-control input-sm" autocomplete="off" id="NombreTipoServicio" name="nombre" placeholder="Nombre Tipo de Servicio">
                    </div>
                    <div class="form-group col-md-12">
                      <label>DESCRIPCIÓN</label>
                      <textarea class="form-control input-sm" rows="3" id="DescripcionTipoServicio" name="descripcion" placeholder="Descripcion ..."></textarea>
                    </div>
                    <div class="col-md-12">
                      <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                      <button type="submit" id="Guardar" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                      <button type="submit" id="ModificarTipoServicio" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade modalNuevoGrupo" tabindex='1' data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">GRUPO ESTADISTICO</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <form role="form" method="post" id="RegistroGrupoEstadistico">
                    <div class="form-group col-md-12">
                      <label for="Nombre">NOMBRE</label>
                      <input type="text" class="form-control input-sm" autocomplete="off" id="NombreGrupo" name="nombre" placeholder="Nombre Grupos Estadistico">
                    </div>
                    <div class="form-group col-md-12">
                      <label>DESCRIPCIÓN</label>
                      <textarea class="form-control input-sm" rows="3" id="DescripcionGrupo" name="descripcion" placeholder="Descripcion ..."></textarea>
                    </div>
                    <div class="col-md-12">
                      <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                      <button type="submit" id="GuardarGrupo" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                      <button type="submit" id="ModificarGrupo" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade modalNuevoEspecialidad" tabindex='1' data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">ESPECIALIDAD</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <form role="form" method="post" id="RegistroEspecialidad">

                    <div class="form-group col-md-6">
                      <label for="Nombre">TIPO DE SERVICIO</label>
                      <select id="TipoServicio" name="TipoServicio" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                        <option value="0">Seleccionar..</option>
                        <?php
                        $TipoServicio = new Con_Especialidad();
                        $TipoServicio->LlenarComboTipoServicio();
                        ?>
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="Nombre">GRUPO ESTADÍSTICO</label>
                      <select id="GrupoEstadistico" name="GrupoEstadistico" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                        <option value="0">Seleccionar..</option>
                        <?php
                        $GrupoEstadistico = new Con_Especialidad();
                        $GrupoEstadistico->LlenarComboGrupoEstadistico();
                        ?>
                      </select>
                    </div>
                    <div class="form-group col-md-12">
                      <label for="Nombre">NOMBRE</label>
                      <input type="text" class="form-control input-sm" id="NombreEspecialidad" name="nombre" placeholder="Nombre Especialidad">
                    </div>
                    <div class="form-group col-md-12">
                      <label>DESCRIPCIÓN</label>
                      <textarea class="form-control input-sm" rows="3" id="DescripcionEspecialidad" name="descripcion" placeholder="Descripcion ..."></textarea>
                    </div>

                    <div class="col-md-12">
                      <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                      <button type="submit" id="GuardarEspe" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                      <button type="submit" id="ModificarEspe" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade modalNuevoProcedimiento" tabindex='1' data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">PROCEDIMIENTO</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <form role="form" method="post" id="RegistroAmbu">
                    <div class="form-group col-md-6">
                      <label for="Especialidad">ESPECIALIDAD</label>
                      <select id="Especialidad" name="Especialidad" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                        <option value="0">Seleccionar..</option>
                        <?php
                        $TipoServicio = new Con_consultaAmbu();
                        $TipoServicio->LlenarComboTipoEspe();
                        ?>
                      </select>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="Nombre">NOMBRE</label>
                      <input type="text" class="form-control" autocomplete="off" id="NombreProcedimiento" name="nombre" placeholder="Nombre">
                    </div>

                    <div class="form-check col-md-12" style="display: none;">
                      <label><input type="checkbox" value="20" id="cxcPorcedimiento"> <span class="label-text">Cuentas Por Cobrar</span></label>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="Nombre">PRECIO</label>
                      <input type="number" step="any" class="form-control" autocomplete="off" id="Precio" name="precio">
                    </div>

                    <div class="form-group col-md-12" style="display: none;">
                      <label for="Nombre">PLATILLA PARA IMPRESIÓN DE RESULTADOS</label>
                      <textarea id="plantillaecoWord" class="textarea" placeholder="Ingrese el texto aqui"
                                    style="width: 100%; height: 400px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                    </div>

                    <div class="col-md-12">
                      <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                      <button type="submit" id="GuardarProcedimiento" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                      <button type="submit" id="ModificarProcedimiento" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <script src="Lib/bootstrap3-wysihtml5.all.min.js"></script>
      <script src="js/Js_Procedimiento.js?v=1.1"></script>