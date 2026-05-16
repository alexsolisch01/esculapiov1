      <div class="col-md-12">
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li class="active"><a href="#tab_1" data-toggle="tab">Grupo de Examenes</a></li>
            <li><a href="#tab_2" data-toggle="tab">Responsable del procedimiento</a></li>
            <li><a href="#tab_3" data-toggle="tab">Equipo Periférico</a></li>
            <li><a href="#tab_4" data-toggle="tab">Procedimientos</a></li>
            <li><a href="#tab_5" data-toggle="tab">Asignaciones</a></li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab_1">
              <div class="row">
                <div class="col-md-12">
                  <button id="nuevoRegistroGrupo" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <table id="datatableExamenesRx" width="100%" cellspacing="0" class="table nowrap table-condensed">
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
            <!-- /.tab-pane -->
            <div class="tab-pane" id="tab_2">
              <div class="row">
                <div class="col-md-12">
                  <button id="nuevoRegistroEntidad" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <table id="datatableEntidadRx" width="100%" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>RESPONSABLE</th>
                        <th>TIPO PAGO</th>
                        <th>VALOR</th>
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
            <!-- /.tab-pane -->
            <div class="tab-pane" id="tab_3">
              <div class="row">
                <div class="col-md-12">
                  <button id="nuevoRegistroEquipo" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <table id="datatableEquipoRx" width="100%" cellspacing="0" class="table nowrap table-condensed">
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
            <!-- /.tab-pane -->
            <div class="tab-pane" id="tab_4">
              <div class="row">
                <div class="col-md-12">
                  <button id="nuevoRegistroProcedimiento" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <table id="datatableProLabRx" width="100%" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>GRUPO DE EXAMEN</th>
                        <th>EQUIPO</th>
                        <th>PVP</th>
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
            <!-- /.tab-pane -->
            <div class="tab-pane" id="tab_5">
              <div class="row">
                <div class="col-md-12 form-group">
                  <select id="cbmProceRx" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                    <option value="0">Seleccionar..</option>
                    <?php
                    $Perfil = new Con_Rx();
                    $Perfil->LlenarComboEntidadRx();
                    ?>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <table id="datatableProceRx" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Procedimiento</th>
                        <th>Precio</th>
                        <th></th>
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

      <div class="modal fade modalNuevoGrupo" tabindex='1' data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">GRUPO DE EXAMEN</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <form role="form" method="post" id="RegistroExamenesRx">
                    <div class="form-group col-md-8">
                      <label for="Nombre">NOMBRE</label>
                      <input type="text" required class="form-control input-sm" autofocus id="NombreExaRx" placeholder="NOMBRE DEL GRUPO">
                    </div>

                    <div class="form-group col-md-4">
                      <label for="Orden">ORDEN</label>
                      <input type="number" required class="form-control input-sm" id="OrdenExaRx" placeholder="ORDEN DE VISUALIZACION">
                    </div>
                    <div class="col-md-12">
                      <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                      <button type="submit" id="GuardarExaRx" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                      <button type="submit" id="ModificarExaRx" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade modalNuevoEntidad" tabindex='1' data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">RESPONSABLE</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <form role="form" method="post" id="RegistroEntidadRx">

                    <div class="form-group col-md-6">
                      <label for="Nombre">NOMBRE</label>
                      <input type="text" required class="form-control input-sm" autofocus id="NombreEntidadRx" placeholder="NOMBRE DE RESPONSABLE">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="Nombre">RESPONSABLE</label>
                      <select id="cbmMedicoEntidadRx" name="cbmMedicoEntidadRx" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                        <option value="0">SELECCIONAR..</option>>
                        <?php
                        $TipoServicio = new Con_Empleado();
                        $TipoServicio->LlenarComboMEDICO();
                        ?>
                      </select>
                    </div>

                    <div class="form-group col-md-6" id="PagoProRx">
                      <label for="Nombre">PAGO</label>
                      <select class="selectpicker show-tick form-control input-sm" data-live-search="true" id="PagoRx">
                        <option value="PORCENTAJE">PORCENTAJE</option>
                        <option value="VALOR">VALOR</option>
                      </select>
                    </div>
                    <div class="form-group col-md-6" id="ValorProcRx">
                      <label for="Nombre">VALOR</label>
                      <input type="number" step='any' class="form-control input-sm" id="ValorRx" name="valor" placeholder="Valor">
                      <span class="help-block" style="display:none;">Valor mayor al Precio</span>
                    </div>
                    <div class="col-md-12 filaEspeAsiganada">
                      <div class="box box-primary box-solid">
                        <div id="colapsar" class="box-header with-border">
                          <h3 class="box-title">Horarios</h3>
                          <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                            </button>
                          </div>
                        </div>
                        <div class="box-body">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                              <div class="x_content">
                                <table id="datatableHorarioRx" class="table table-striped table-bordered">
                                  <thead>
                                    <tr>
                                      <th>DIA</th>
                                      <th>HORA INICIO</th>
                                      <th>HORA SALIDA</th>
                                      <th>ASIGNAR</th>
                                    </tr>
                                  </thead>
                                  <tbody class="pointer tablaGrupoEstadistico">
                                    <tr>
                                      <td style="padding-top: 0px;padding-bottom: 0px; max-height: 5px">LUNES</td>
                                      <td style="padding-top: 0px;padding-bottom: 0px; max-height: 5px">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horai" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="padding-top: 0;padding-bottom: 0; max-height: 5px">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horaf" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="width: 1em; padding-top: 0px;padding-bottom: 0px; max-height: 5px">
                                        <div class="material-switch" style="margin-top: 5px;">
                                          <input value="LUNES" id="LUNES" name="check" type="checkbox" />
                                          <label for="LUNES" class="label-success"></label>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">MARTES</td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horai" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horaf" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="width: 1em; padding-top: 0px;padding-bottom: 0px;">
                                        <div class="material-switch" style="margin-top: 5px;">
                                          <input value="MARTES" id="MARTES" name="check" type="checkbox" />
                                          <label for="MARTES" class="label-success"></label>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">MIERCOLES</td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horai" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horaf" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="width: 1em; padding-top: 0px;padding-bottom: 0px;">
                                        <div class="material-switch" style="margin-top: 5px;">
                                          <input value="MIERCOLES" id="MIERCOLES" name="check" type="checkbox" />
                                          <label for="MIERCOLES" class="label-success"></label>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">JUEVES</td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horai" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horaf" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="width: 1em; padding-top: 0px;padding-bottom: 0px;">
                                        <div class="material-switch" style="margin-top: 5px;">
                                          <input value="JUEVES" id="JUEVES" name="check" type="checkbox" />
                                          <label for="JUEVES" class="label-success"></label>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">VIERNES</td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horai" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horaf" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="width: 1em; padding-top: 0px;padding-bottom: 0px;">
                                        <div class="material-switch" style="margin-top: 5px;">
                                          <input value="VIERNES" id="VIERNES" name="check" type="checkbox" />
                                          <label for="VIERNES" class="label-success"></label>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">SABADO</td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horai" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horaf" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="width: 1em; padding-top: 0px;padding-bottom: 0px;">
                                        <div class="material-switch" style="margin-top: 5px;">
                                          <input value="SABADO" id="SABADO" name="check" type="checkbox" />
                                          <label for="SABADO" class="label-success"></label>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">DOMINGO</td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horai" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="padding-top: 0px;padding-bottom: 0px;">
                                        <div class="bootstrap-timepicker">
                                          <div class="form-group">
                                            <div class="input-group">
                                              <input name="horaf" type="text" class="form-control input-sm timepicker">
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td style="width: 1em; padding-top: 0px;padding-bottom: 0px;">
                                        <div class="material-switch" style="margin-top: 5px;">
                                          <input value="DOMINGO" id="DOMINGO" name="check" type="checkbox" />
                                          <label for="DOMINGO" class="label-success"></label>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                      <button type="submit" id="GuardarEntidadRx" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                      <button type="submit" id="ModificarEntidadRx" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade modalNuevoEquipo" tabindex='1' data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">GRUPO DE EXAMEN</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <form role="form" method="post" id="RegistroEquipoRx">
                    <div class="form-group col-md-12">
                      <label for="Nombre">NOMBRE</label>
                      <input type="text" required class="form-control input-sm" autofocus id="NombreEquipoRx" placeholder="NOMBRE DEL PERIFÉRICO">
                    </div>
                    <div class="col-md-12">
                      <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                      <button type="submit" id="GuardarEquipoRx" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                      <button type="submit" id="ModificarEquipoRx" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
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
                  <form role="form" method="post" id="RegistroProLabRx">
                    <div class="form-group col-md-6">
                      <label for="Nombre">NOMBRE</label>
                      <input type="text" required class="form-control input-sm" id="NombreProLabRx" name="nombreperi" placeholder="NOMBRE PROCEDIMIENTO">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="Nombre">GRUPO DE EXAMEN</label>
                      <select id="ComboGrupoRx" name="TipoServicio" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                        <option value="0">Seleccionar..</option>
                        <?php
                        $TipoServicio = new Con_Rx();
                        $TipoServicio->LlenarComboGrupoExamenRx();
                        ?>
                      </select>
                    </div>

                    <div class="form-group col-md-6" id="PERIFÉRICO">
                      <label for="Nombre">EQUIPO PERIFÉRICO</label>
                      <select id="ComboEquipoRx" name="TipoServicio" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                        <?php
                        $TipoServicio = new Con_Rx();
                        $TipoServicio->LlenarComboEquipoRx();
                        ?>
                      </select>
                    </div>
                    <div class="form-group col-md-6" id="PvprecioRx">
                      <label for="Nombre">PVP</label>
                      <input type="number" required step="any" value="0.00" class="form-control input-sm" id="PvpRx" placeholder="PVP">
                      <span class="help-block" style="display:none;">Valor Obligatorio</span>
                    </div>
                    <div class="col-md-12">
                      <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                      <button type="submit" id="GuardarProLabRx" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                      <button type="submit" id="ModificarProLabRx" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="js/Js_Rx.js?v=1.0"></script>