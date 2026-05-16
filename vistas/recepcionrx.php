<div class="col-md-12">
  <div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
      <li class="active"><a href="#tab_1" data-toggle="tab">RAYOSX</a></li>
      <li><a href="#tab_2" data-toggle="tab">LLENAR INFORME</a></li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane active" id="tab_1">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group col-md-3">
              <label for="Nombre">FECHA DESDE </label>
              <input class="form-control input-sm" type="date" id="fecha_consultaDesdeRx" value="<?php echo date("Y-m-d"); ?>">
            </div>
            <div class="form-group col-md-3">
              <label for="Nombre">FECHA HASTA</label>
              <input class="form-control input-sm" type="date" id="fecha_consultaHastaRx" value="<?php echo date("Y-m-d"); ?>">
            </div>

            <div class="form-group col-md-1">
              <label for="Nombre" style="color: white;">------</label>
              <button type="submit" id="ConsultarReccioncion" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
            </div>

            <div class="x_content">
              <table id="datatablePacienteRx" width="100%" class="table nowrap table-striped table-bordered table-condensed">
                <thead>
                  <tr>
                    <th>ATENCION</th>
                    <th>PACIENTE</th>
                    <th>EDAD</th>
                    <th>RESPONSABLE</th>
                    <th>PROCEDIMIENTO</th>
                    <th>ACCION</th>
                  </tr>
                </thead>
                <tbody class="pointer tableBodega" id="tbodyPaciente">

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
            <button type="submit" id="GuardarResultadoRx" disabled="true" class="btn btn-primary"><i class="fa fa-floppy-o" aria-hidden="true"></i> GUARDAR (F10)</button>
            <button type="submit" id="ValidarResultadoRx" disabled="true" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> VALIDAR (F9)</button>
            <button type="button" onclick="printTextArea()" disabled="true" class="btn btn-dark" id="imprimirDatos"> <i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR (F12)</button>
            <button type="" disabled class="btn btn-info" id="enviarPorCorreo"> <i class="fa fa-send" aria-hidden="true"></i> ENVIAR POR CORREO</button>
            <button type="" disabled class="btn btn-danger" id="DesvalidarEco"> <i class="fa fa-refresh" aria-hidden="true"></i> DESVALIDAR</button>
            <button data-toggle="modal" data-target="#modal-historico" class="btn btn-warning"> <i class="fa fa-folder" aria-hidden="true"></i> HISTORICO</button>
            <button data-toggle="modal" data-target="#modal-evolucion" class="btn btn-primary"> <i class="fa fa-folder" aria-hidden="true"></i> EVOLUCIÓN</button>
            <button type="submit" id="BuscarPacientes" data-toggle="modal" data-target="#modal-pacientes" class="btn btn-default pull-right"><i class="fa fa-search" aria-hidden="true"></i> Buscar Paciente (F1)</button>
          </div>
          <div class="col-md-12">
            <label hidden id="IdPacienteResultado"></label>
            <div class="form-group col-md-4">
              <div id="DatosPaciente" class="form-group col-md-12">
                <br>
                <label for="Nombre">CÉDULA: </label>
                <label id="CedulaPacienteResultado" name="CÉDULA"></label><br>
                <label for="Apellido">APELLIDOS: </label>
                <label id="ApellidoPacienteResultado" name="CÉDULA"></label><br>
                <label for="Nombre">NOMBRES: </label>
                <label id="NombrePacienteResultado" name="CÉDULA"></label><br>
                <label for="Nombre">EDAD: </label>
                <label id="EdadPacienteResultado" name="CÉDULA"></label><br>
                <label for="Nombre">CORREO: </label>
                <label id="CorreoPacienteResultado" name="correo"></label>
              </div>
              <div class="form-group col-md-12">
                <table id="datatableProcedimientoPacienteRx" width="100%" class="table table-condensed table-striped table-bordered">
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
                  <tbody class="pointer tableBodega" id="tbodyPaciente">
                    <?php
                    /*$espe = new Con_Recepcion();
                              $espe->CargarPacientesLaboratorio();*/
                    ?>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="form-group col-md-8">
              <div class="box-body pad">
                <form id="AlergiasForm">
                  <textarea id="plantillarxWord" class="textarea" placeholder="Ingrese el texto aqui" style="width: 100%; height: 500px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.tab-pane -->
    </div>
    <!-- /.tab-content -->
  </div>
</div>

<div class="modal fade" id="modal-pacientes" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>

        <div class="form-group col-md-3">
          <label for="Nombre">FECHA DESDE </label>
          <input class="form-control input-sm" type="date" id="fecha_consultaDesdeRxInforme" value="<?php echo date("Y-m-d"); ?>">
        </div>
        <div class="form-group col-md-3">
          <label for="Nombre">FECHA HASTA</label>
          <input class="form-control input-sm" type="date" id="fecha_consultaHastaRxInforme" value="<?php echo date("Y-m-d"); ?>">
        </div>

        <div class="form-group col-md-1">
          <label for="Nombre" style="color: white;">----</label>
          <button type="submit" id="ConsultarPacientesReceptadosRx" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
        </div>

      </div>

      <div class="modal-body">
        <table id="datatablePacientesListoRx" width="100%" class="table nowrap table-striped table-bordered table-condensed">
          <thead>
            <tr>
              <th>ID</th>
              <th>CÉDULA</th>
              <th>APELLIDOS</th>
              <th>NOMBRES</th>
              <th>EMAIL</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody class="pointer tableBodega" id="tbodyPaciente">
            <?php
            //$espe = new Con_Recepcion();
            //$espe->CargarPacientesLaboratorio();
            ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-plantillasRx" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content" style="width: 50%; margin-left: 26%;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <div class="form-group col-md-12">
          <label for="Nombre">PLANTILLAS DE: </label>
          <label id="nombreRx">----</label>
        </div>
      </div>
      <div class="modal-body">
        <table id="datatablePlantillasRx" class="table table-striped table-bordered table-condensed">
          <thead>
            <tr>
              <th>PLANTILLA</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody class="pointer tableBodega" id="tbodyPaciente">
            <?php
            //$espe = new Con_Recepcion();
            //$espe->CargarPacientesLaboratorio();
            ?>
          </tbody>
        </table>
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
        <form role="form" method="post" id="ModificarPacienteFact">
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
        </form>
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
          <table id="HistorioRxAgenda" width="100%" cellspacing="0" class="table nowrap table-condensed">
            <thead>
              <tr>
                <th>FECHA</th>
                <th>PROCEDIMIENTO</th>
                <th></th>
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

<script src="Lib/bootstrap3-wysihtml5.all.min.js"></script>
<script src="js/Js_RecepcionRx.js?v=1.3"></script>