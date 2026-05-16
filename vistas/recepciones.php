<link href="css/handsontable.full.min.css" rel="stylesheet">
<link rel="stylesheet" href="css/handson.css">

<div class="col-md-12">
  <div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
      <li class="active"><a href="#tab_1" data-toggle="tab">LABORATORIO</a></li>
      <li><a href="#tab_2" data-toggle="tab">PENDIENTES</a></li>
      <li><a href="#tab_3" data-toggle="tab">LLENAR INFORME</a></li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane active" id="tab_1">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group col-md-3">
              <label for="Nombre">FECHA DESDE </label>
              <input class="form-control input-sm" type="date" id="fecha_consultaDesde" value="<?php echo date("Y-m-d"); ?>">
            </div>
            <div class="form-group col-md-3">
              <label for="Nombre">FECHA HASTA</label>
              <input class="form-control input-sm" type="date" id="fecha_consultaHasta" value="<?php echo date("Y-m-d"); ?>">
            </div>

            <div class="form-group col-md-1">
              <label for="Nombre" style="color: white;">----</label>
              <button type="submit" id="ConsultarReccioncion" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
            </div>

            <div class="x_content">
              <table id="datatablePacienteLaboratorio" width="100%" class="table nowrap table-striped table-bordered table-condensed">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ATENCION</th>
                    <th>PACIENTE</th>
                    <th>CONSULTA</th>
                    <?php
                    $espe = new Con_Recepcion();
                    $espe->CargarMuestraLaboratorio();
                    ?>
                    <th>ACCION</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- /.tab-pane -->
      <div class="tab-pane" id="tab_2">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group col-md-3">
              <label for="Nombre">FECHA DESDE </label>
              <input class="form-control input-sm" type="date" id="fecha_consultaDesdePendiente" value="<?php echo date("Y-m-d"); ?>">
            </div>
            <div class="form-group col-md-3">
              <label for="Nombre">FECHA HASTA</label>
              <input class="form-control input-sm" type="date" id="fecha_consultaHastaPendiente" value="<?php echo date("Y-m-d"); ?>">
            </div>

            <div class="form-group col-md-1">
              <label for="Nombre" style="color: white;">----</label>
              <button type="submit" id="ConsultarReccioncionPendiente" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
            </div>

            <div class="x_content">
              <table id="datatablePacienteLaboratorioPendientes" width="100%" class="table nowrap table-striped table-bordered table-condensed">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ATENCION</th>
                    <th>PACIENTE</th>
                    <th>CONSULTA</th>
                    <?php
                    $espe = new Con_Recepcion();
                    $espe->CargarMuestraLaboratorio();
                    ?>
                    <th>ACCION</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- /.tab-pane -->
      <div class="tab-pane" id="tab_3">
        <div class="row">
          <div class="col-md-12">
            <button type="submit" id="GuardarResultadoLaboratorio"  class="btn btn-primary"><i class="fa fa-floppy-o" aria-hidden="true"></i> GUARDAR (F10)</button>
            <button type="submit" id="ValidarResultadoLaboratorio"  class="btn btn-success"><i class="fa fa-check" aria-hidden="true"></i> VALIDAR (F9)</button>
            <button class="btn btn-dark" id="imprimirDatos"> <i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR (F12)</button>
            <button disabled class="btn btn-info" id="enviarPorCorreo"> <i class="fa fa-send" aria-hidden="true"></i> ENVIAR POR CORREO</button>
            <button disabled class="btn btn-danger" id="DesvalidarInforme"> <i class="fa fa-recycle" aria-hidden="true"></i> DESVALIDAR</button>
            <button disabled class="btn btn-success" id="exportarDatosResultado"> <i class="fa fa-file-excel-o" aria-hidden="true"></i> Excel</button>
            <button data-toggle="modal" data-target="#modal-historico" class="btn btn-warning"> <i class="fa fa-folder" aria-hidden="true"></i> HISTORICO</button>
            <button data-toggle="modal" data-target="#modal-evolucion" class="btn btn-primary"> <i class="fa fa-folder" aria-hidden="true"></i> EVOLUCIÓN</button>
          </div>

          <div class="col-md-12">
            <label hidden id="IdPacienteResultado"></label>
            <div class="col-md-4 nopadding">
              <div class="col-md-12">
                <input style="width: 125px; margin-left: -1em;" type="date" id="fecha_consultaDesdeInforme" value="<?php echo date("Y-m-d"); ?>">
                <input style="width: 125px;" type="date" id="fecha_consultaHastaInforme" value="<?php echo date("Y-m-d"); ?>">
                <button type="submit" id="ConsultarPacientesReceptados" class="btn btn-sm btn-primary pull-right"><i class="fa fa-search" aria-hidden="true"></i>(F1)</button>
              </div>
              <div class="col-sm-12 nopadding">
                <div style="margin-top: 6em;margin-left: 5em; display: none;" id="loaderPacientes" class="loader"></div>
                <table id="datatablePacientesResultados" cellspacing="0" class="table nowrap table-condensed">
                  <thead>
                    <tr>
                      <th></th>
                      <th>PACIENTE</th>
                      <th>ATENCION</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody class="pointer tableBodega" id="tbodyPaciente">

                  </tbody>
                </table>
              </div>

              <div class="form-group col-md-12">
                <a href="#datatableHandsomeResultado" id="CargarTodaPlantilla"> Mostrar Todos</a>
                <table id="datatableProcedimientoPaciente" width="100%" class="table table-condensed table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>PROCEDIMIENTO</th>
                      <th>
                        <div class="btn btn-info btn-sm">
                          <i class="fa fa-floppy-o"></i>
                        </div>
                      </th>
                      <th>
                        <div class="btn btn-info btn-sm">
                          <i class="fa fa-check"></i>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
            </div>
            <div id="DatosPaciente" class="form-group col-md-8 nopadding">
              <div class="col-md-6" data-toggle="modal" data-target="#modal-modificar-paciente">
                <label for="Nombre">CÉDULA: </label>
                <label id="CedulaPacienteResultado" name="CÉDULA"></label>
              </div>

              <div class="col-md-6">
                <label for="Apellido">PACIENTE: </label>
                <label id="ApellidoPacienteResultado" name="CÉDULA"></label>
              </div>

              <div class="col-md-6">
                <label for="Nombre">EDAD: </label>
                <label id="EdadPacienteResultado" name="CÉDULA"></label>
              </div>
              <div class="col-md-6">
                <label for="Nombre">CORREO: </label>
                <label id="CorreoPacienteResultado" name="correo"></label>
              </div>
            </div>
            <div class="form-group col-md-8 nopadding">
              <div style="margin-top: 5em;margin-left: 20em; display: none;" id="loaderPlantilla" class="loader"> </div>
              <div id="datatableHandsomeResultado" class="dataTable"></div>
            </div>
            <div class="x_content" style="display: none;">
              <table id="datatablePruebaRecepcion" class="table">
                <thead>
                  <tr>
                    <th>PROCEDIMIENTO</th>
                    <th>RESULTADO</th>
                    <th>UNIDAD DE MEDIDA</th>
                    <th>DESCRIPCION</th>
                    <th>MIN</th>
                    <th>MAX</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- /.tab-pane -->
    </div>
    <!-- /.tab-content -->
  </div>
</div>


<div class="modal fade" id="modal-cargando" tabindex="-1" role="dialog" aria-hidden="true" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-sm">
    <div class="modal-content" style="background:rgba(0,0,0,0);">
      <div class="modal-body" aria-hidden="true">
        <div class="col-md-12">
          <div class="box box-primary box-solid">
            <div class="box-header">
              <h3 class="box-title">Guardando..</h3>
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

<div class="modal fade" id="modal-modificar-paciente" tabindex='-1'>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">DATOS PACIENTE: </h4>
        <h4 id="NombrePaciente"></h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="form-group col-md-12">
            <label for="Correo ELECTRÓNICO">CORREO ELECTRÓNICO</label>
            <input type="email" class="form-control input-sm" id="CorreoModificarPaciente" name="correoAdmi" placeholder="CORREO">
          </div>
        </div>
        <div class="box-footer">
          <button type="reset" class="btn btn-info" id="LimpiarDatosFact"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>
          <button type="submit" id="ModificarPaciente" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Guardar Y Enviar</button>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-historico" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">HISTORICO DE RESULTADOS</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <table id="datatablePruebaAgenda" width="100%" cellspacing="0" class="table nowrap table-condensed">
            <thead>
              <tr>
                <th>FECHA</th>
                <th>PROCEDIMIENTO</th>
                <th>RESULTADO</th>
                <th>UNIDAD DE MEDIDA</th>
                <th>DESCRIPCION</th>
                <th>MIN</th>
                <th>MAX</th>
                <th>MAXasdasa</th>
              </tr>
            </thead>
            <tbody class="pointer tablaEquipo">

            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-evolucion" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">EVOLUCIÓN</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12" id="textArea">
            <label id="medicoExamen">MEDICO QUE ENVIO EXAMEN: </label><br>
            <label id="fechaExamen">FECHA EN QUE ENVIO: </label><br>
            <label for="OBSERVACIONES">OBSERVACIONES: </label><br>

          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>


<script src="Lib/handsontable.full.min.js"></script>
<script src="js/Js_Recepcion.js?v=1.31"></script>