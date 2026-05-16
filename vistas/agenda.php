<input type="hidden" name="nombreCompleto" id="nombreCompleto" value="<?php echo $_SESSION["nombres"]; ?>">
<input type="hidden" name="reporteEmelec" id="reporteEmelec" value="">
<input type="hidden" name="reporteEmelecLab" id="reporteEmelecLab" value="">
<input type="hidden" name="reporteEmelecRx" id="reporteEmelecRx" value="">
<input type="hidden" name="reporteEmelecEco" id="reporteEmelecEco" value="">
<input type="hidden" name="reporteEmelecTac" id="reporteEmelecTac" value="">
<input type="hidden" name="reporteEmelecReceta" id="reporteEmelecReceta" value="">

<span style="display: none;" id="idEspecialidad">------</span>
<span style="display: none;" id="idProcedimiento">------</span>
<span style="display: none;" id="idMedico">------</span>
<span style="display: none;" id="NombreEspecialidad">------</span>
<input class="form-control input-sm" style="display: none;" type="date" id="fechaMovi" value="<?php echo date("Y-m-d"); ?>">
<label style="display: none;" class="form-control input-sm" id="HoraMovi"> <?php echo date("H:i:s"); ?></label>

<div class="col-md-12">
  <div class="box box-primary">
    <div class="box-header with-border">

      <button title="HCU (F2)" type="reset" class="btn btn-default " id="HcuPaciente" data-toggle="modal" data-target="#modal-consultas"> <img src="imagenes/paciente.png" /></button>

      <button id="btnEnfermeria" data-toggle="modal" data-target="#modal-enfermeria" title="ENFERMERIA" class="btn btn-default"><img src="imagenes/nurse.png" /></button>

      <button disabled data-toggle="modal" title="HISTORICO" data-target="#modal-historico" id="Historico" class="btn btn-default"><img src="imagenes/historial.png" /></button>

      <button disabled="true" title="PRESCRIPCION(F4)" type="submit" class="btn btn-default  " id="PrescriPaciente" data-toggle="modal" data-target="#modal-receta"><img src="imagenes/prescripcion.png" /></button>

      <button disabled="true" type="submit" title="SERVICIOS(F5)" class="btn btn-default  " id="ServicioPaciente" data-toggle="modal" data-target="#modal-consultas4"><img src="imagenes/botiquin.png" /></button>

      <button disabled="true" title="PARTE DIARIO" data-toggle="modal" data-target="#modal-partediaria" type="submit" id="parteDiaria" class="btn btn-default"><img width="33px;" src="imagenes/CIE10.jpg" /></button>

      <button disabled data-toggle="modal" title="CERTIFICADO" data-target="#modal-certificado" id="Certificado" class="btn btn-default"><img src="imagenes/certificado.png" /></button>

      <button data-toggle="modal" title="CERTIFICADO DE ASISTENCIA" data-target="#modal-certificado-asistencia" id="Certificado2" class="btn btn-default"><img src="imagenes/certificado-medico.png" /></button>

      <img id="alergiaPac" class="pull-right" src="imagenes/sirena.gif">
      <div class="col-sm-1 pull-right nopadding" data-toggle="modal" data-target="#modal-alergia">
        <img id="alergiaPaci" class="pull-right" style="width: 83px;height: 30px;" src="imagenes/Alergia.png">
      </div>

      <button disabled type="submit" id="GuardarProblema" title="GUARDAR" class="btn btn-default pull-right"><img src="imagenes/guardar.png" /></button>

      <button id="ImprimirTodo" title="IMPRIMIR" style="display: none;" class="btn btn-default pull-right"><img src="imagenes/printer.png" /></button>

      <button id="ImprimirTodoEmelec" title="IMPRIMIR" style="display: none;" class="btn btn-default pull-right"><img src="imagenes/printer.png" /></button>

      <button data-toggle="modal" data-target="#modal-historico2" title="AGENDA" id="turnos" class="btn btn-default pull-right"><img src="imagenes/agendam.png" /></button>

    </div>
    <!-- /.box-header -->
    <div class="row">
      <div class="col-md-12">
        <div class="box-body">
          <div class="col-sm-12 invoice-info nopadding direct-chat-text">
            <div class="col-md-1 nopadding">
              <label>HC :</label> <span style="font-weight: bold; font-size: 14px;" id="HCU">------</span>
            </div>
            <div class="col-md-3 nopadding">
              <label>PACIENTE :</label> <span style="font-weight: bold; font-size: 14px;" id="NombrePaci">------</span>
            </div>
            <div class="col-md-2 nopadding">
              <label>EDAD :</label> <span style="font-weight: bold; font-size: 14px;" id="EdadPaci">------</span>
            </div>
            <div class="col-md-2 nopadding">
              <label>SEXO :</label> <span style="font-size: 14px;font-weight: bold;" id="CedulaPaci">------</span>
            </div>
            <div class="col-md-2 nopadding">
              <label>TRIAGE :</label> <span style="font-size: 14px;font-weight: bold;" id="TriagePaci">------</span>
            </div>
            <div class="col-md-2 nopadding">
              <label>PRIORIDAD :</label> <span style="font-size: 14px;font-weight: bold;" id="PrioridadPaci">------</span>
            </div>
          </div>
          <div class="col-md-12">
            <table id="datatableConsultaExterna" width="100%" cellspacing="0" class="table nowrap table-condensed">
              <thead>
                <tr>
                  <th>FECHA DE ATENCION</th>
                  <th>DOCTOR RESPONSABLE</th>
                  <th>ESPECIALIDAD</th>
                  <th>PROCEDIMIENTO A REALIZAR</th>
                  <th>ID PROCEDIMIENTO</th>
                  <th>ID ESPECIALIDAD</th>
                  <th>ID MEDICO</th>
                  <th>ID CONSULTA</th>
                  <th>LAB</th>
                  <th>RX</th>
                  <th>ECO</th>
                  <th>TAC</th>
                  <th>REC</th>
                  <th>ITEM</th>
                  <th>estado</th>
                  <th>tipo</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <div>
            <div class="col-md-8">
              <label>ENFERMEDAD O PROBLEMA ACTUAL</label>
              <textarea id="DescripcionEnfermedad" class="textareaEnfermedad" placeholder="Ingrese el texto aqui" style="width: 100%; height: 130px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd;"></textarea>
            </div>
            <div class="col-md-4">
              <label>DIAGNOSTICO CIE</label>
              <div id="ListaEnfe" class="box-body" style="height: 150px;max-height: 150px; overflow-y: auto;">
                <ul bgcolor="LIME" class="todo-list" id="diagnosticoPaciente">

                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="box-footer">
          <div class="col-md-12" id="planTratamientos">
            <label class="form-control">PLAN DE DIAGNOSTICO Y TRATAMIENTO</label>
            <div class="col-md-3" id="ProcedimientosLaboratorio">
            </div>
            <div class="col-md-2" id="ProcedimientosRayos">
            </div>
            <div class="col-md-2" id="ProcedimientosEcografia">
            </div>
            <div class="col-md-2" id="ProcedimientosTac">
            </div>
            <div class="col-md-3" id="FarmacoReceta">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="modal-consultas" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title">HISTORIA CLINICA UNICA</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <div class="box-body">
              <div class="col-md-12">
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li id="app" class="active"><a href="#servicio" data-toggle="tab">APP-Antecedentes Patologicos Personales</a></li>
                    <li id="apf"><a href="#servicio2" data-toggle="tab">APF- Antecedentes Patologicos Familiares</a></li>
                    <li id="rev"><a href="#servicio3" data-toggle="tab">Revision Actual de Organos y Sistemas</a></li>
                    <li id="exa"><a href="#servicio4" data-toggle="tab">Examen Fisico regional y sistemico</a></li>
                    <li id="Femenino"><a href="#servicio5" data-toggle="tab">Antecedentes Gineco-Obstetricos</a></li>
                  </ul>
                  <div class="tab-content">
                    <div class="active tab-pane" id="servicio">
                      <div class="row">
                        <div id="ListaEnfe" class="box-body" style="max-height: 25em; overflow-y: auto;">
                          <ul bgcolor="LAVENDER" class="todo-list form-check" id="ListaAAP">
                            <li bgcolor="LAVENDER"><input type="checkbox" id="ePerinatal" value="Enfermedad Perinatal"><span class="text">Enfermedad Perinatal </span></li>
                            <li><input type="checkbox" id="eInfancia" value="Enfermedad De La Infancia"><span class="text">Enfermedad De La Infancia </span></li>
                            <li><input type="checkbox" id="eAlergia" value="Enfermedad Alergia"><span class="text">Enfermedad Alergia </span></li>
                            <li><input type="checkbox" id="eCardiaca" value="Enfermedad Cardiaca"><span class="text">Enfermedad Cardiaca </span></li>
                            <li><input type="checkbox" id="eRespiratoria" value="Enfermedad Respiratoria"><span class="text">Enfermedad Respiratoria</span></li>
                            <li><input type="checkbox" id="eDisgestiva" value="Enfermedad Digestiva"><span class="text">Enfermedad Digestiva </span></li>
                            <li><input type="checkbox" id="eNeurologica" value="Enfermedad Neurologica"><span class="text">Enfermedad Neurologica</span></li>
                            <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text">Enfermedad Metabolica </span></li>
                            <li><input type="checkbox" id="eLinfatica" value="Enfermedad Hemo Linfatica"><span class="text">Enfermedad Hemo Linfatica </span></li>
                            <li><input type="checkbox" id="eUrinaria" value="Enfermedad Urinaria"><span class="text">Enfermedad Urinaria </span></li>
                            <li><input type="checkbox" id="eTraumatologia" value="Enfermedad Traumatologia"><span class="text">Enfermedad Traumatologia </span></li>
                            <li><input type="checkbox" id="eQuirurgica" value="Enfermedad Quirurgica"><span class="text">Enfermedad Quirurgica </span></li>
                            <li><input type="checkbox" id="eMental" value="Enfermedad Mental"><span class="text">Enfermedad Mental </span></li>
                            <li><input type="checkbox" id="eSexual" value="Enfermedad Sexual"><span class="text">Enfermedad Sexual </span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="servicio2">
                      <div class="row">
                        <div id="ListaEnfe2" class="box-body" style="max-height: 25em; overflow-y: auto;">
                          <ul class="todo-list" id="ListaAPF">
                            <li><input type="checkbox" id="Cardiopatia" value="Cardiopatia"><span class="text">Cardiopatia </span></li>
                            <li><input type="checkbox" id="Diabetes" value="Diabetes"><span class="text">Diabetes </span></li>
                            <li><input type="checkbox" id="eCardiovascular" value="Enfermedad Cardiovascular"><span class="text">Enfermedad Cardiovascular</span></li>
                            <li><input type="checkbox" id="Hipertencion" value="Hipertencion"><span class="text">Hipertension </span></li>
                            <li><input type="checkbox" id="Cancer" value="Cancer"><span class="text">Cancer </span></li>
                            <li><input type="checkbox" id="Tuberculosis" value="Tuberculosis"><span class="text">Tuberculosis</span></li>
                            <li><input type="checkbox" id="eMental2" value="Enfermedad Mental"><span class="text">Enfermedad Mental </span></li>
                            <li><input type="checkbox" id="eInfecciosa" value="Enfermedad Infecciosa"><span class="text">Enfermedad Infecciosa </span></li>
                            <li><input type="checkbox" id="malFormacion" value="Mal Formacion"><span class="text">Mal Formacion </span></li>
                            <li><input type="checkbox" id="Otro" value="Otro"><span class="text">Otro </span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="servicio3">
                      <div class="row">
                        <div id="ListaEnfe3" class="box-body" style="max-height: 25em; overflow-y: auto;">
                          <ul class="todo-list" id="ListaRevision">
                            <li><input type="checkbox" id="Sentidos" value="Organos de los sentidos"><span class="text">Organos de los sentidos </span></li>
                            <li><input type="checkbox" id="Respiratorio" value="Respiratorio"><span class="text">Respiratorio </span></li>
                            <li><input type="checkbox" id="Cardiovascular" value="Cardiovascular"><span class="text"> Cardiovascular</span></li>
                            <li><input type="checkbox" id="Digestivo" value="Digestivo"><span class="text">Digestivo </span></li>
                            <li><input type="checkbox" id="Genital" value="Genital"><span class="text">Genital </span></li>
                            <li><input type="checkbox" id="Urinario" value="Urinario"><span class="text">Urinario</span></li>
                            <li><input type="checkbox" id="Esqueletico" value="Musculo Esqueletico"><span class="text">Musculo Esqueletico </span></li>
                            <li><input type="checkbox" id="Endocrino" value="Endocrino"><span class="text">Endocrino </span></li>
                            <li><input type="checkbox" id="Linfatico" value="Hemo Linfatico"><span class="text">Hemo Linfatico </span></li>
                            <li><input type="checkbox" id="Nervioso" value="Nervioso"><span class="text">Nervioso </span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="servicio4">
                      <div class="row">
                        <div id="ListaEnfe4" class="box-body" style="max-height: 25em; overflow-y: auto;">
                          <ul class="todo-list" id="ListaExamenFisico">
                            <li><input type="checkbox" id="Cabeza" value="Cabeza"><span class="text">Cabeza </span></li>
                            <li><input type="checkbox" id="Cuello" value="Cuello"><span class="text">Cuello </span></li>
                            <li><input type="checkbox" id="Torax" value="Torax"><span class="text"> Torax</span></li>
                            <li><input type="checkbox" id="Abdomen" value="Abdomen"><span class="text">Abdomen </span></li>
                            <li><input type="checkbox" id="Pelvis" value="Pelvis"><span class="text">Pelvis </span></li>
                            <li><input type="checkbox" id="Extremidades" value="Extremidades"><span class="text">Extremidades</span></li>
                            <li><input type="checkbox" id="Piel" value="Piel"><span class="text">Piel</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="servicio5">
                      <div class="row">
                        <div class="box-body" style="max-height: 25em; overflow-y: auto;">
                          <div class="form-group col-md-2">
                            <label for="Nombre">Gestacion </label>
                            <input type="text" class="form-control input-sm" id="Gestaciones" required name="nombre">
                          </div>
                          <div class="form-group col-md-2">
                            <label for="Nombre">Abortos </label>
                            <input type="text" class="form-control input-sm" id="Abortos" required name="nombre">
                          </div>
                          <div class="form-group col-md-2">
                            <label for="Nombre">Partos </label>
                            <input type="text" class="form-control input-sm" id="Partos" required name="nombre">
                          </div>
                          <div class="form-group col-md-2">
                            <label for="Nombre">Cesarea </label>
                            <input type="text" class="form-control input-sm" id="Cesarea" required name="nombre">
                          </div>
                          <div class="form-group col-md-2">
                            <label for="Nombre">Vaginales </label>
                            <input type="text" class="form-control input-sm" id="Vaginales" name="nombre">
                          </div>
                          <div class="form-group col-md-2">
                            <label for="Nombre"> Vivos </label>
                            <input type="text" class="form-control input-sm" id="Vivos" name="nombre">
                          </div>
                          <div class="form-group col-md-2">
                            <label for="Nombre"> Muertos </label>
                            <input type="text" class="form-control input-sm" id="Muertos" name="nombre">
                          </div>
                          <div class="form-group col-md-2">
                            <label for="Nombre"> Tipo Sangre </label>
                            <input type="text" class="form-control input-sm" id="TSangre" name="nombre">
                          </div>
                          <div class="form-group col-md-4">
                            <label for="Fecha Nacimiento">Se encuentra en Gestacion</label>
                            <input type="date" class="form-control input-sm" id="FechaGesta" name="fecha" placeholder="Consultorio / Domicilio">
                          </div>
                          <div class="form-group col-md-4">
                            <label for="Fecha Nacimiento">Fecha Posible de Parto</label>
                            <input type="date" class="form-control input-sm" id="FechaParto" name="fecha" placeholder="Consultorio / Domicilio">
                          </div>
                          <div class="form-group col-md-12">
                            <h3>Antecedentes Personales</h3>
                            <div class="form-check col-md-2" id="DiabetesDiv">
                              <h5>Diabetes</h5>
                              <label><input type="radio" value="0" name="Diabetes" checked> <span class="label-text">NO</span></label>
                              <label><input type="radio" value="1" name="Diabetes" id="DiabetesS"> <span class="label-text">SI</span></label>
                            </div>
                            <div class="form-check col-md-2">
                              <h5>Hipertension</h5>
                              <label><input type="radio" value="0" name="Hipertension" checked> <span class="label-text">NO</span></label>
                              <label><input type="radio" value="1" name="Hipertension" id="HipertensionS"> <span class="label-text">SI</span></label>
                            </div>
                            <div class="form-check col-md-2">
                              <h5>TB Pulmonar</h5>
                              <label><input type="radio" value="0" name="Pulmonar" checked> <span class="label-text">NO</span></label>
                              <label><input type="radio" value="1" name="Pulmonar" id="PulmonarS"> <span class="label-text">SI</span></label>
                            </div>
                            <div class="form-check col-md-2">
                              <h5>Gemelares</h5>
                              <label><input type="radio" value="0" name="Gemelares" checked> <span class="label-text">NO</span></label>
                              <label><input type="radio" value="1" name="Gemelares" id="GemelaresS"> <span class="label-text">SI</span></label>
                            </div>
                            <div class="form-check col-md-2">
                              <h5>Otros</h5>
                              <label><input type="radio" value="0" name="Otros" checked> <span class="label-text">NO</span></label>
                              <label><input type="radio" value="1" name="Otros" id="OtrosS"> <span class="label-text">SI</span></label>
                            </div>
                          </div>
                          <div class="form-group col-md-12">
                            <h3>Antecedentes Familiares</h3>
                            <div class="form-check col-md-2" id="DiabetesDiv">
                              <h5>Diabetes</h5>
                              <label><input type="radio" value="0" name="DiabetesF" checked> <span class="label-text">NO</span></label>
                              <label><input type="radio" value="1" name="DiabetesF" id="DiabetesFS"> <span class="label-text">SI</span></label>
                            </div>
                            <div class="form-check col-md-2">
                              <h5>Hipertension</h5>
                              <label><input type="radio" value="0" name="HipertensionF" checked> <span class="label-text">NO</span></label>
                              <label><input type="radio" value="1" name="HipertensionF" id="HipertensionFS"> <span class="label-text">SI</span></label>
                            </div>
                            <div class="form-check col-md-2">
                              <h5>TB Pulmonar</h5>
                              <label><input type="radio" value="0" name="PulmonarF" checked> <span class="label-text">NO</span></label>
                              <label><input type="radio" value="1" name="PulmonarF" id="PulmonarFS"> <span class="label-text">SI</span></label>
                            </div>
                            <div class="form-check col-md-2">
                              <h5>Gemelares</h5>
                              <label><input type="radio" value="0" name="GemelaresF" checked> <span class="label-text">NO</span></label>
                              <label><input type="radio" value="1" name="GemelaresF" id="GemelaresFS"> <span class="label-text">SI</span></label>
                            </div>
                            <div class="form-check col-md-2">
                              <h5>Otros</h5>
                              <label><input type="radio" value="0" name="OtrosF" checked> <span class="label-text">NO</span></label>
                              <label><input type="radio" value="1" name="OtrosF" id="OtrosFS"> <span class="label-text">SI</span></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-success pull-right" id="GuardarAAP"> <i class="fa fa-save" aria-hidden="true"></i> Guardar</button>
        <button type="submit" style="display: none;" class="btn btn-success pull-right" id="GuardarAPF"> <i class="fa fa-save" aria-hidden="true"></i> Guardar</button>
        <button type="submit" style="display: none;" class="btn btn-success pull-right" id="GuardarRevision"> <i class="fa fa-save" aria-hidden="true"></i> Guardar</button>
        <button type="submit" style="display: none;" class="btn btn-success pull-right" id="GuardarExamenFisico"> <i class="fa fa-save" aria-hidden="true"></i> Guardar</button>
        <button type="submit" style="display: none;" class="btn btn-success pull-right" id="GuardarGineco"> <i class="fa fa-save" aria-hidden="true"></i> Guardar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-alergia" tabindex='-1'>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title">Alergias</h4>
      </div>
      <div class="modal-body">
        <div class="x_content">
          <table id="datatableAlergias" width="100%" cellspacing="0" class="table nowrap table-condensed">
            <thead>
              <tr>
                <th>FECHA</th>
                <th>MEDICO RESPONSABLE</th>
                <th>ALERGIAS</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
        <div class="box-body pad">
          <form id="AlergiasForm">
            <textarea id="DescripcionAlergia" class="textarea" placeholder="Ingrese el texto aqui" style="width: 100%; height: 200px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success pull-right" id="GuardarAlergia">Guardar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-receta" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title">PRESCRIPCION</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="row">
            <div class="form-check col-md-3">
              <label><input type="checkbox" value="Proxima Consulta" id="proxima"> <span class="label-text">Proxima Consulta</span>
                <input style="display: none;" class="form-control input-sm" type="date" id="fecha_proxima" value="<?php echo date("Y-m-d"); ?>"></label>
            </div>
            <div class="form-check col-md-3">
              <label><input type="checkbox" value="Consulta de Control" id="control"> <span class="label-text">Consulta de Control</span><input style="display: none;" class="form-control input-sm" type="date" id="fecha_control" value="<?php echo date("Y-m-d"); ?>"></label>
            </div>

            <div class="form-check col-md-6">
              <label>Derivar Especialidad</label>
              <select id="Especialidad" name="Especialidad" multiple class="selectpicker form-control col-md-12" data-live-search="true">
                <?php
                $TipoServicio = new Con_consultaAmbu();
                $TipoServicio->LlenarComboTipoEspe();
                ?>
              </select>
            </div>
            <div class="clearfix"></div>
            <div class="col-md-12">
              <label for="Nombre">FARMACIA </label>
              <select id="cbmProducto" class="form-control input-sm selectpicker" data-live-search="true">
              </select>
            </div>
          </div>



          <div class="col-md-12">
            <table id="datatableDetalleReceta" width="100%" cellspacing="0" class="table  nowrap table-condensed">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>RECIPE</th>
                  <th>SUGERENCIA</th>
                  <th>PRESENTACION</th>
                  <th>CANT</th>
                  <th>TIEMPO</th>
                  <th>PRESCRIPCION</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success pull-right" data-dismiss="modal">Guardar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-certificado" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">CERTIFICADO</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <button id="ImprimeCertificado" type="button" class="btn btn-primary pull-right"><i class="fa fa-print"></i>Imprimir</button>
            <div class="form-group col-md-2">
              <label for="Nombre">Número de Días</label>
              <input type="number" class="form-control input-sm" value="1" min="1" pattern="^[0-9]+" id="NumeroDias" name="" placeholder="Número de Días">
            </div>
            <label>CERTIFICADO MEDICO</label>
            <form id="CertificadoForm">
              <textarea id="CertificadoMedico" class="textareaCertificado" placeholder="Ingrese el texto aqui" style="width: 100%; height: 300px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd;"></textarea>
            </form>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-certificado-asistencia" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">CERTIFICADO DE ASISTENCIA</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <button id="ImprimeCertificado2" type="button" class="btn btn-primary pull-right"><i class="fa fa-print"></i>Imprimir</button>
            <form id="CertificadoForm">
              <textarea id="CertificadoMedico2" class="textareaCertificado2" placeholder="Ingrese el texto aqui" style="width: 100%; height: 300px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd;"></textarea>
            </form>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-consultas4" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title">SERVICIOS </h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="row">
            <div class="nav-tabs-custom">
              <ul class="nav nav-tabs">
                <li class="active" id="TabLab"><a href="#LAB" data-toggle="tab">ORDEN LABORATORIO<img src="imagenes/lab.png" style="margin-left: 2px; margin-top: -12px;" /></a></li>
                <li id="TabRadi"><a href="#RADIO" data-toggle="tab">ORDEN RADIOGRAFIA <img src="imagenes/radi.png" style="margin-left: 2px; margin-top: -12px;" /> </a></li>
                <li id="TabEco"><a href="#ECO" data-toggle="tab">ORDEN ECOGRAFIA <img src="imagenes/eco.png" style="margin-left: 2px; margin-top: -12px;" /> </a></li>
                <li id="TabTomo"><a href="#RMN" data-toggle="tab">ORDEN RMN/TAC <img src="imagenes/x.png" style="margin-left: 2px; margin-top: -12px;" /></a></li>
                <li><a href="#HISTO" data-toggle="modal" data-target="#modal-consultas5">HISTORICO DE RESULTADOS <img src="imagenes/folder.png" style="margin-left: 2px; margin-top: -12px;" /></a></li>
              </ul>
              <div class="tab-content">
                <div class="active tab-pane" id="LAB">
                  <div class="row">

                    <div class="col-md-6" style="max-height: 350px;overflow-y: auto;font-size: 12px !important;">
                      <div class="row">
                        <label class="pull-right" id="precioTotal" for="message">TOTAL: $0.00</label>
                      </div>
                      <?php
                      $dao = new Con_Laboratorio();
                      $dao->LLenarAcordionAgenda();
                      ?>
                    </div>
                    <div class="col-md-6">
                      <button class="btn btn-info pull-right" id="AddLabBlanco"> <i class="fa fa-item" aria-hidden="true"></i>Otro Item</button>
                      <table id="datatableProcedimientoGrupoAgenda" width="100%" cellspacing="0" class="table nowrap table-condensed">
                        <thead>
                          <tr>
                            <th>PROCEDIMIENTO</th>
                            <th>$</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="RADIO">
                  <div class="row">
                    <div class="col-md-6" style="max-height: 350px;overflow-y: auto;font-size: 12px !important;">
                      <div class="row">
                        <label class="pull-right" id="precioTotalRx" for="message">TOTAL: $0.00</label>
                      </div>
                      <?php
                      $dao = new Con_Rx();
                      $dao->LLenarAcordionAgenda();
                      ?>
                    </div>
                    <div class="col-md-6">
                      <button class="btn btn-info pull-right" id="AddRxBlanco"> <i class="fa fa-item" aria-hidden="true"></i>Otro Item</button>
                      <table id="datatableProcedimientoGrupoRxAgenda" width="100%" cellspacing="0" class="table nowrap table-condensed">
                        <thead>
                          <tr>
                            <th>PROCEDIMIENTO</th>
                            <th>$</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="ECO">
                  <div class="row">
                    <div class="col-md-6" style="max-height: 350px;overflow-y: auto;font-size: 12px !important;">
                      <div class="row">
                        <label class="pull-right" id="precioTotalEco" for="message">TOTAL: $0.00</label>
                      </div>
                      <?php
                      $dao = new Con_Eco();
                      $dao->LLenarAcordionAgenda();
                      ?>
                    </div>
                    <div class="col-md-6">
                      <button class="btn btn-info pull-right" id="AddEcoBlanco"> <i class="fa fa-item" aria-hidden="true"></i>Otro Item</button>
                      <table id="datatableProcedimientoGrupoEcoAgenda" width="100%" cellspacing="0" class="table nowrap table-condensed">
                        <thead>
                          <tr>
                            <th>PROCEDIMIENTO</th>
                            <th>$</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="RMN">
                  <div class="row">
                    <div class="col-md-6" style="max-height: 350px;overflow-y: auto;font-size: 12px !important;">
                      <div class="row">
                        <label class="pull-right" id="precioTotalTac" for="message">TOTAL: $0.00</label>
                      </div>
                      <?php
                      $dao = new Con_Tac();
                      $dao->LLenarAcordionAgenda();
                      ?>
                    </div>
                    <div class="col-md-6">
                      <button class="btn btn-info pull-right" id="AddTacBlanco"> <i class="fa fa-item" aria-hidden="true"></i>Otro Item</button>
                      <table id="datatableProcedimientoGrupoTacAgenda" width="100%" cellspacing="0" class="table nowrap table-condensed">
                        <thead>
                          <tr>
                            <th>PROCEDIMIENTO</th>
                            <th>$</th>
                            <th></th>
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
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success pull-right" data-dismiss="modal">Guardar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-consultas5" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">HISTORICO DE RESULTADOS</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <div class="box-body">
              <div class="col-md-12">
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active" id="TabLab" data-toggle="tooltip" title data-original-title="Paso 1"><a href="#LAB1" data-toggle="tab">LABORATORIO<img src="imagenes/lab.png" style="margin-left: 2px; margin-top: -12px;" /> </a></li>
                    <li id="TabRadi" data-toggle="tooltip" title data-original-title="Paso 2"><a href="#RADIO1" data-toggle="tab">RADIOGRAFIA <img src="imagenes/radi.png" style="margin-left: 2px; margin-top: -12px;" /> </a></li>
                    <li id="TabEco" data-toggle="tooltip" title data-original-title="Paso 3"><a href="#ECO1" data-toggle="tab">ECOGRAFIA <img src="imagenes/eco.png" style="margin-left: 2px; margin-top: -12px;" /> </a></li>
                    <li id="TabTomo" data-toggle="tooltip" title data-original-title="Paso 3"><a href="#RMN1" data-toggle="tab">RMN/TAC <img src="imagenes/x.png" style="margin-left: 2px; margin-top: -12px;" /></a></li>
                  </ul>
                  <div class="tab-content">
                    <div class="active tab-pane" id="LAB1">
                      <div class="box box-primary">
                        <div class="modal-body">
                          <div class="box-body">
                            <div class="col-md-12">
                              <div class="x_content">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="RADIO1">
                      <div class="box box-primary">
                        <div class="modal-body">
                          <div class="box-body">
                            <div class="col-md-12">
                              <button id="ImprimeAgendaRx" type="button" class="btn btn-primary" disabled><i class="fa fa-print"></i>Imprimir</button>
                              <div class="x_content">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="ECO1">
                      <div class="box box-primary">
                        <div class="modal-body">
                          <div class="box-body">
                            <div class="col-md-12">
                              <button id="ImprimeAgendaEco" type="button" class="btn btn-primary" disabled><i class="fa fa-print"></i>Imprimir</button>
                              <div class="x_content">
                                <table id="HistorioEcoAgenda" width="100%" cellspacing="0" class="table nowrap table-condensed">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="RMN1">
                      <div class="box box-primary">
                        <div class="modal-body">
                          <div class="box-body">
                            <div class="col-md-12">
                              <button id="ImprimeAgendaTac" type="button" class="btn btn-primary" disabled><i class="fa fa-print"></i>Imprimir</button>
                              <div class="x_content">
                                <table id="HistorioTacAgenda" width="100%" cellspacing="0" class="table nowrap table-condensed">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-partediaria" tabindex='-1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title">CIE </h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-6 nopadding">
            <table id="datatableCiePateDiaria" width="100%" cellspacing="0" class="table nowrap table-condensed">
              <thead>
                <tr>
                  <th>CIE</th>
                  <th>EMFERMEDAD</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <div class="col-md-6 nopadding">
            <div class="box box-primary direct-chat direct-chat-primary">
              <div class="box-header with-border">
                <h3 class="box-title">Diagnostico</h3>
              </div>
              <div class="box-body">
                <div class="direct-chat-messages col-md-12" id="EnfermedadesSeleccionadas" style="height: 350px !important;">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button id="AgregarAlInicio" type="button" data-dismiss="modal" class="btn btn-success pull-right">Guardar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-diagnostico" tabindex='-1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content" style="width: 160%;margin-left: -10em;">
      <div class="modal-header" style="background: #00c0ef;">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title">TIPO DE DIAGNOSTICO</h4>
      </div>
      <div class="modal-body">

        <div class="box box-info">
          <div class="box-header with-border">

          </div>
          <form class="form-horizontal diagnosticos">
            <div class="box-body col-md-12">
              <div class="form-check col-md-6 nivel1PareDiario" name="general">
                <label><input type="radio" value="PREVENCION-GENERAL" diagnostico="morbilidad" id="rdPreG" name="radio" checked> <span class="label-text">PREVENCION-GENERAL</span></label>
              </div>

              <div class="form-check col-md-6 nivel1PareDiario" name="fertil">
                <label><input type="radio" value="PREVENCION-EDAD FERTIL" diagnostico="prevencion" name="radio"> <span class="label-text">PREVENCION-EDAD FERTIL</span></label>
              </div>

              <div class="form-check col-md-6 nivel1PareDiario" name="morbilidad">
                <label><input type="radio" value="MORBILIDAD" diagnostico="prevencion" name="radio"> <span class="label-text">MORBILIDAD</span></label>
              </div>

              <div class="form-check col-md-6 nivel1PareDiario" name="familiar">
                <label><input type="radio" value="PLANIFICACION FAMILIAR" diagnostico="prevencion" name="radio"> <span class="label-text">PLANIFICACION FAMILIAR</span></label>
              </div>
              <div class="col-md-6"></div>
              <div class="form-check col-md-6 nivel1PareDiario" name="cancer">
                <label><input type="radio" value="DETECCION OPORTUNA DEL CANCER" diagnostico="prevencion" name="radio"> <span class="label-text">DETECCION OPORTUNA DEL CANCER</span></label>
              </div>

            </div>
            <div class="box-footer">

            </div>
          </form>
        </div>

        <div class="box box-info" id="frmPVG">
          <div class="box-header with-border">
            <h3 id="tituloDiagnostico" class="box-title">DIAGNOSTICO POR PREVENCION-GENERAL</h3>
          </div>
          <form class="form-horizontal">
            <div class="box-body col-md-12">
              <div class="form-check col-md-4">
                <label><input type="radio" value="PRIMERA" diagnostico="prevencion" id="RdPrim" name="prevencionG" checked> <span class="label-text">PRIMERA</span></label>
              </div>
              <div class="form-check col-md-4">
                <label><input type="radio" value="SUBSECUENTE" diagnostico="prevencion" name="prevencionG"> <span class="label-text">SUBSECUENTE</span></label>
              </div>
            </div>
            <div class="box-footer">

            </div>
          </form>
        </div>

        <div style="display: none;" class="box box-info" id="frmEF">
          <div class="box-header with-border">
            <h3 id="tituloDiagnostico" class="box-title">DIAGNOSTICO POR PREVENCION-EDAD FERTIL</h3>
          </div>
          <form class="form-horizontal">
            <div class="box-body col-md-12">
              <div class="form-check col-md-3">
                <label><input type="radio" value="PRIMERA" diagnostico="prevencion" name="prevencionEF" checked> <span class="label-text">PRIMERA</span></label>
              </div>
              <div class="form-check col-md-3">
                <label><input type="radio" value="SUBSECUENTE" diagnostico="prevencion" name="prevencionEF"> <span class="label-text">SUBSECUENTE</span></label>
              </div>
              <div class="col-md-6">

                <select id="cbmEF" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                  <option value="Ninguno">Seleccionar..</option>
                  <option tipo="frmEF" value="PRENATAL">PRENATAL</option>
                  <option tipo="frmEF" value="PARTO">PARTO</option>
                  <option tipo="frmEF" value="POST-PARTO">POST-PARTO</option>

                  <option tipo="frmPF" value="DISPOSITIVO INTRA UTERINO">DISPOSITIVO INTRA UTERINO</option>
                  <option tipo="frmPF" value="ANTICONCEPTIVOS ORALES COMBINADOS">ANTICONCEPTIVOS ORALES COMBINADOS</option>
                  <option tipo="frmPF" value="ANTICONCEPTIVOS ORALES-PROGESTERONA">ANTICONCEPTIVOS ORALES-PROGESTERONA</option>
                  <option tipo="frmPF" value="ANTICONCEPCION DE EMERGENCIA">ANTICONCEPCION DE EMERGENCIA</option>
                  <option tipo="frmPF" value="INYECTABLES">INYECTABLES</option>
                  <option tipo="frmPF" value="PRESERVATIVOS">PRESERVATIVOS</option>
                  <option tipo="frmPF" value="IMPLANTES">IMPLANTES</option>
                  <option tipo="frmPF" value="VASECTOMIA">VASECTOMIA</option>
                  <option tipo="frmPF" value="SALPINGECTOMIA">SALPINGECTOMIA</option>
                  <option tipo="frmPF" value="ANILLO VAGINAL">ANILLO VAGINAL</option>
                  <option tipo="frmPF" value="PARCHE TRANSDERMICO">PARCHE TRANSDERMICO</option>

                  <option tipo="frmDOC" value="CERVICIO UTERINO">CERVICIO UTERINO</option>
                  <option tipo="frmDOC" value="MAMARIO">MAMARIO</option>
                  <option tipo="frmDOC" value="PULMONAR">PULMONAR</option>
                  <option tipo="frmDOC" value="GASTRICO">GASTRICO</option>
                  <option tipo="frmDOC" value="HEPATICO">HEPATICO</option>
                  <option tipo="frmDOC" value="COLO RECTAL">COLO RECTAL</option>
                  <option tipo="frmDOC" value="PIEL">PIEL</option>
                  <option tipo="frmDOC" value="PROSTATA">PROSTATA</option>

                </select>
              </div>
            </div>
            <div class="box-footer">

            </div>
          </form>
        </div>

        <div class="box box-info">
          <div class="box-header with-border">

          </div>
          <form class="form-horizontal">
            <div class="box-body col-md-12">
              <div class="col-md-3">
                <label for="Nombre">PROCEDIMIENTO</label>
                <select id="cbmProcedimiento" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                  <<option value="0">Seleccionar..</option>
                    <?php
                    $TipoServicio = new Con_Agenda();
                    //$TipoServicio->LlenarComboParteDiario();
                    ?>
                </select>
              </div>
              <div class="col-md-3" style="display:none">
                <label for="Nombre">ACTIVIDADES</label>
                <select id="cbmActividad" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                  <option value="1" selected>1</option>

                </select>
              </div>

              <div class="col-md-3 3nivelParteDiaria" name="condicion">
                <label for="Nombre">CONDICION DEL DIAGNOSTICO</label>
                <select id="cbmDiagnostico" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                  <option value="0">Seleccionar..</option>
                  <option value="PRESUNTIVO">PRESUNTIVO</option>
                  <option value="DEFINITIVO INICIAL">DEFINITIVO INICIAL</option>
                  <option value="DEFINITIVO INICIAL CONFIRMADO POR LABORATORIO">DEFINITIVO INICIAL CONFIRMADO POR LABORATORIO</option>
                  <option value="DEFINITIVO CONTROL">DEFINITIVO CONTROL</option>
                </select>
              </div>
              <div class="col-md-3 3nivelParteDiaria" name="interconsulta">
                <label for="Nombre">INTERCONSULTA</label>
                <select id="cbmInterconsulta" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                  <option value="Ninguno">Seleccionar..</option>
                  <option value="REFERENCIA">REFERENCIA</option>
                  <option value="CONTRAREFERENCIA">CONTRAREFERENCIA</option>
                  <option value="INTERCONSULTA SOLICITADA">INTERCONSULTA SOLICITADA</option>
                  <option value="INTERCONSULTA REALIZADA">INTERCONSULTA REALIZADA</option>
                </select>
              </div>
            </div>
            <div class="box-footer">

            </div>
          </form>
        </div>


      </div>
      <div class="modal-footer" style="background: #00c0ef;">
        <button id="AgregarDiagnostico" type="button" data-dismiss="modal" class="btn btn-success pull-right">Guardar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-epidemiologico" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title">EPIDEMIOLOGICO</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <div class="nav-tabs-custom">
              <ul class="nav nav-tabs">
                <li id="TabEpidemia" class="active"><a href="#estadistico" data-toggle="tab">EPIDEMIOLOGICOS</a></li>
                <li id="TabTrabajo"><a href="#trabajoSocial" data-toggle="tab">TRABAJO SOCIAL </a></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane" id="trabajoSocial">
                  <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">TRABAJO SOCIAL</h3>
                    </div>
                    <form role="form" method="post" id="RegistroTrabajoSocial">
                      <div class="box-body">
                        <div class="form-group col-md-4">
                          <label for="Nombre">CODIGO PARA VIH</label>
                          <input type="text" required class="form-control input-sm" id="Codigovih" name="codigovih" placeholder="CODIGO...">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">TIPO DE AFILIACION</label>
                          <select id="Afiliacion" name="afiliacion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoAfi();
                            ?>
                          </select>
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">NIVEL DE INSTRUCCION</label>
                          <select id="Instruccion" name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoNivel();
                            ?>
                          </select>
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">NOMBRE DEL RESPONSABLE :</label>
                          <input type="text" required class="form-control input-sm" id="Responsable" name="responsable" placeholder="RESPONSABLE">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">EN CASO NECESARIO LLAMAR A :</label>
                          <input type="text" required class="form-control input-sm" id="Parentesco" name="parentesco" placeholder="PARENTESCO">
                        </div>
                        <div class="form-group col-md-4">
                          <label style="color: white;" for="Nombre">-</label>
                          <input type="text" required class="form-control input-sm" id="Numero" name="numero" placeholder="NUMERO CELULAR O FIJO">
                        </div>
                      </div>
                      <div class="box-footer">

                      </div>
                    </form>
                  </div>
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane active" id="estadistico">
                  <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">EPIDEMIOLOGICOS</h3>
                    </div>
                    <form role="form" method="post" id="RegistroEpidemiologicos">
                      <div class="box-body">
                        <div class="form-group col-md-4">
                          <label for="Nombre">ORIENTACION SEXUAL</label>
                          <select id="Genero" name="Genero" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoGene();
                            ?>
                          </select>
                        </div>


                        <div class="form-group col-md-4">
                          <label for="Nombre">IDENTIDAD DE GENERO</label>
                          <select id="Genero2" name="Genero" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoGene2();
                            ?>
                          </select>
                        </div>

                        <div class="form-group col-md-4">
                          <label for="Nombre">AUTO IDENTIFICACION</label>
                          <select id="Etnia" name="etnia" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoEtnia();
                            ?>
                          </select>
                        </div>

                        <div class="form-group col-md-4">
                          <label for="Nombre">NACIONALIDAD</label>
                          <select id="Migrante" name="Migrante" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoMigra();
                            ?>
                          </select>
                        </div>



                        <div class="form-group col-md-4">
                          <label for="Nombre">NACIONALIDADES</label>
                          <select id="Migrante2" name="Migrante" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoMigra2();
                            ?>
                          </select>
                        </div>

                        <div class="form-group col-md-4">
                          <label for="Nombre">GRUPOS PRIORITARIOS</label>
                          <select id="Grupo" name="grupo" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoPrioridad();
                            ?>
                          </select>
                        </div>

                        <div class="form-group col-md-4">
                          <label for="Nombre">SECTOR RESIDENCIA</label>
                          <select id="Sector" name="Sector" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoSector();
                            ?>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" id="GuardarEpidemia" data-dismiss="modal" class="btn btn-success">Guardar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-orden-lab" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <div class="x_content">
              <table id="datatableOrdenLab" width="100%" cellspacing="0" class="table nowrap table-condensed">
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
        </div>
      </div>
      <div class="modal-footer">

      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-orden-rx" tabindex='-1'>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <button id="ImprimeAgendaRx" type="button" class="btn btn-primary" disabled><i class="fa fa-print"></i>Imprimir</button>
            <div class="x_content" style="margin-top: -30px;">
              <table id="datatableOrdenRx" width="100%" cellspacing="0" class="table nowrap table-condensed">
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
        </div>
      </div>
      <div class="modal-footer">

      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-orden-eco" tabindex='-1'>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <button id="ImprimeAgendaEco" type="button" class="btn btn-primary" disabled><i class="fa fa-print"></i>Imprimir</button>
            <div class="x_content">
              <table id="datatableOrdenEco" width="100%" cellspacing="0" class="table nowrap table-condensed">
                <thead>
                  <tr>
                    <th>FECHA</th>
                    <th>PROCEDIMIENTO</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">

      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-orden-tomo" tabindex='-1'>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <button id="ImprimeAgendaTac" type="button" class="btn btn-primary" disabled><i class="fa fa-print"></i>Imprimir</button>
            <div class="x_content">
              <table id="datatableOrdenTomo" width="100%" cellspacing="0" class="table nowrap table-condensed">
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
        </div>
      </div>
      <div class="modal-footer">

      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-orden-receta" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <button id="ImprimeRecetaNueva" type="button" class="btn btn-primary"><i class="fa fa-print"></i>Imprimir</button>
            <div class="x_content">
              <label id="FechaControlReceta"></label>
              <table id="datatableOrdenReceta" width="100%" cellspacing="0" class="table nowrap table-condensed">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>PRESCRIPCION</th>
                    <th>SUGERENCIA</th>
                    <th>PRESENTACION</th>
                    <th>CANTIDAD</th>
                    <th>OBSERVACIONES</th>
                    <th>PROXIMA</th>
                    <th>CONTROL</th>
                    <th>GGG</th>
                  </tr>
                </thead>
                <tbody class="pointer tablaEquipo">

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">

      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-historico" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title">CONSULTAS ANTERIORES</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="row">
            <table id="datatableHistorico" width="100%" cellspacing="0" class="table table-condensed table-striped table-bordered">
              <thead>
                <tr>
                  <th>FECHA ATENCION</th>
                  <th>ESPECIALIDAD</th>
                  <th>EVOLUCION</th>
                  <th>MEDICO</th>
                </tr>
              </thead>
              <tbody class="pointer tablaEquipo">

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="modal-historico2" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title">PACIENTES PENDIENTES
          <div class="col-md-3 pull-right">
            <input type="date" value="<?php echo date("Y-m-d"); ?>" class="form-control input-sm" id="FechaAgenda">
          </div>
        </h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <table id="datatableHistorico2" width="100%" cellspacing="0" class="table nowrap table-striped table-bordered table-condensed">
            <thead>
              <tr>
                <th></th>
                <th style="text-align: center;">TURNOS</th>
                <th>PACIENTE</th>
                <th>PROCEDIMIENTO</th>
                <th>TRIAGE</th>
                <th>PRIORIDAD</th>
                <th>DESDE</th>
                <th>HASTA</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody class="pointer">

            </tbody>
          </table>


        </div>
      </div>
      <div class="modal-footer">
        <button type="button" style="display: none;" class="btn btn-outline pull-right close" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-enfermeria" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cerrar</button>
        <h4 class="modal-title">ENFERMERIA</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <table id="datatableUltimosSignosVitales" width="100%" class="table nowrap table-condensed">
                <thead>
                  <tr>
                    <th>FECHA</th>
                    <th>PRESIÓN </th>
                    <th>PULSO </th>
                    <th>PESO </th>
                    <th>TALLA </th>
                    <th>IMC </th>
                    <th>TEMP BUCAL </th>
                    <th>TEMP RECTAL </th>
                    <th>TEMP AXILAR </th>
                  </tr>
                </thead>
                <tbody class="pointer">

                </tbody>
              </table>
            </div>
            <div class="col-md-6">
              <div class="chart">
                <canvas height="150" id="lineChart"></canvas>
              </div>
            </div>
            <div class="col-md-6">
              <div class="chart">
                <canvas height="150" id="lineChart2"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<div class="modal  fade modalGuardar" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog   modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            <div class="box box-widget widget-user">
              <div class="widget-user-header bg-black">
                <h3 class="widget-user-username"><?php echo $_SESSION["nombres"] ?></h3>
              </div>
              <div class="widget-user-image">
                <img class="img-circle" src="<?php echo $_SESSION["foto"] ?>" alt="User Avatar">
              </div>
              <div class="box-footer">
                <div class="row">
                  <ul class="nav nav-stacked">
                    <li><a href="#">Seguro de registrar los cambios en la historia clinica del paciente</a></li>
                    <li><a href="#">Recuerde que una vez acepte esta informacion, usted no podra realizar niungun cambio en la atencion prestada.</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="modal-footer">
        <button type="button" id="GConsulta" class="btn btn-success" data-dismiss="modal">Guardar</button>
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancelar</button>
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

<script src="Lib/bootstrap3-wysihtml5.all.min.js"></script>

<script src="Lib/icheck.min.js"></script>
<script src="js/Js_NumeroALetras.js"></script>
<script src="js/Js_Agenda.js?v=1.49"></script>
<script src="js/Js_AgendaServicios.js?v=1.5"></script>
<script src="js/Js_AgendaReceta.js?v=1.7"></script>