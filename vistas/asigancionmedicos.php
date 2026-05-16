<div class="row">
<div class="col-md-4 ">
    <!-- USERS LIST -->
    <div class="box box-danger">
        <div class="box-header with-border">
            <h3 class="box-title">MEDICOS REGISTRADOS</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body no-padding">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <br><br>
                <table id="datatableDoctores" width="100%" class="table nowrap table-condensed">
                    <thead>
                        <tr>
                            <th></th>
                            <th>MEDICO</th>
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

<div class="col-md-8">
    <div class="row">
        <div class="col-md-6" style="display: none;" id="capaDatos">
            <!-- Profile Image -->
            <div class="box box-primary">
                <div class="box-body box-profile">
                    <img class="profile-user-img img-responsive img-circle" src="imagenes/user.png" id="fotoMedico">

                    <h3 class="profile-username text-center" id="nombreMedico">Nina Mcintire</h3>

                    <p class="text-muted text-center" id="cedulaMedico">Software Engineer</p>

                    <ul class="list-group list-group-unbordered">
                        <li class="list-group-item">
                            <b>Dirección</b> <a class="pull-right" id="direccionMedico">1,322</a>
                        </li>
                        <li class="list-group-item">
                            <b>Teléfono</b> <a class="pull-right" id="telefonoMedico">543</a>
                        </li>
                        <li class="list-group-item">
                            <b>E-mail</b> <a class="pull-right" id="emailMedico">13,287</a>
                        </li>
                    </ul>

                    <strong><i class="fa fa-pencil margin-r-5"></i>Especialidades Asignadas  </strong>
                    <hr>
                    <p id="especialidadesAsignadas">
                    </p>
                    <hr>
                    <a href="#" class="btn btn-primary btn-block" id="btnActualizar"><b>Actualizar</b></a>
                </div>
                <!-- /.box-body -->
            </div>
            <!-- /.box -->

            <!-- About Me Box -->
             <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Asignar Especialidades</h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="col-md-12 TablaEspecialidad">
                        <table id="datatableEspecialidad" width="100%" cellspacing="0" class="table nowrap table-condensed">
                            <thead>
                                <tr>
                                    <th>Especialidad</th>
                                    <th>Tipo de Relación</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- /.box-body -->
            </div>
            <!-- /.box -->
        </div>
        <div class="col-md-6" style="display: none;" id="capaEspecialidad">
            <!-- Profile Image -->
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title" id="nombreEspecialidad">Horarios</h3>
                </div>
                <div class="box-body box-profile">
                    <div class="row">
                        <div class="col-md-3">
                            <label>Dia</label>
                            <select class="form-control" id="cbmDia">
                                <option value="LUNES">LUNES</option>
                                <option value="MARTES">MARTES</option>
                                <option value="MIERCOLES">MIERCOLES</option>
                                <option value="JUEVES">JUEVES</option>
                                <option value="VIERNES">VIERNES</option>
                                <option value="SABADO">SABADO</option>
                                <option value="DOMINGO">DOMINGO</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Hora I</label>
                            <div class="bootstrap-timepicker">
                                <div class="form-group">
                                    <div class="input-group">
                                        <input id="horai" type="text" class="form-control timepicker">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label>Hora F</label>
                            <div class="bootstrap-timepicker">
                                <div class="form-group">
                                    <div class="input-group">
                                        <input id="horaf" type="text" class="form-control timepicker">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label>Turnos</label>
                            <input type="number" class="form-control" id="turnos" placeholder="TURNOS">
                        </div>
                        <div class="col-md-12">
                            <button id="GuardarHorario" class="btn btn-info"> Agregar</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <table id="datatableHorarios" width="100%" class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Dia</th>
                                        <th>Hora I</th>
                                        <th>Hora F</th>
                                        <th>Turnos</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- /.box-body -->
            </div>
            <!-- /.box -->

            <!-- About Me Box -->
            <div class="box box-primary" style="display: none;" id="capaProcedimientos">
                <div class="box-header with-border">
                    <h3 class="box-title">Asignar Procedimientos Médicos</h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="col-md-12">
                        <table id="datatableProcedimientos" width="100%" class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Procedimiento</th>
                                    <th>Precio</th>
                                    <th>Forma Pago</th>
                                    <th>Valor</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- /.box-body -->
            </div>
            <!-- /.box -->
        </div>
    </div>
</div>

<script src="js/Js_AsignacionEspecialidades.js?v=1.6"></script>

<!--
<div class="row">

  <div class="col-md-12">

    <div class="card">

      <div class="card-title">👨‍⚕️ Médicos Registrados</div>

      <div class="table-responsive saas-table-container">

        <table id="datatableDoctores" class="table saas-table">

          <thead>
            <tr>
              <th>Acciones</th>
              <th>Médico</th>
              <th></th>
            </tr>
          </thead>

          <tbody></tbody>

        </table>

      </div>

    </div>

  </div>


  <div class="col-md-12">

    <div class="row">

      <div class="col-md-12" style="display:none;" id="capaDatos">

        <div class="card text-center">

          <img class="profile-user-img img-circle"
               src="imagenes/user.png"
               id="fotoMedico"
               style="width:90px; height:90px; margin:auto;">

          <h4 id="nombreMedico"></h4>
          <small id="cedulaMedico"></small>

          <div class="section-divider"></div>

          <ul class="list-group text-left">

            <li class="list-group-item">
              <b>Dirección</b>
              <span class="pull-right" id="direccionMedico"></span>
            </li>

            <li class="list-group-item">
              <b>Teléfono</b>
              <span class="pull-right" id="telefonoMedico"></span>
            </li>

            <li class="list-group-item">
              <b>Email</b>
              <span class="pull-right" id="emailMedico"></span>
            </li>

          </ul>

          <div class="section-divider"></div>

          <b>Especialidades Asignadas</b>

          <div id="especialidadesAsignadas"></div>

          <button class="btn btn-primary btn-block" id="btnActualizar">
            Actualizar
          </button>

        </div>


        <div class="card">

          <div class="card-title">📌 Asignar Especialidades</div>

          <div class="table-responsive saas-table-container">
            
            <table id="datatableEspecialidad" class="col-md-12 table saas-table">

              <thead>
                <tr>
                  <th>Especialidad</th>
                  <th>Tipo</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody></tbody>

            </table>

          </div>

        </div>

      </div>


      <div class="col-md-12" style="display:none;" id="capaEspecialidad">

        <div class="card">

          <div class="card-title" id="nombreEspecialidad">🕒 Horarios</div>

          <div class="row">

            <div class="col-md-12">
              <label class="form-label">Día</label>
              <select class="form-control" id="cbmDia">
                <option>LUNES</option>
                <option>MARTES</option>
                <option>MIERCOLES</option>
                <option>JUEVES</option>
                <option>VIERNES</option>
                <option>SABADO</option>
                <option>DOMINGO</option>
              </select>
            </div>

            <div class="col-md-12">
              <label class="form-label">Hora Inicio</label>
              <input id="horai" type="text" class="form-control timepicker">
            </div>

            <div class="col-md-12">
              <label class="form-label">Hora Fin</label>
              <input id="horaf" type="text" class="form-control timepicker">
            </div>

            <div class="col-md-12">
              <label class="form-label">Turnos</label>
              <input type="number" class="form-control" id="turnos">
            </div>

            <div class="col-md-12 text-right" style="margin-top:10px;">
              <button id="GuardarHorario" class="btn btn-success">
                ➕ Agregar
              </button>
            </div>

          </div>

          <div class="section-divider"></div>

           <div class="table-responsive saas-table-container">

            <table id="datatableHorarios" class="table saas-table">

              <thead>
                <tr>
                  <th>Día</th>
                  <th>Hora I</th>
                  <th>Hora F</th>
                  <th>Turnos</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody></tbody>

            </table>

          </div>

        </div>


        <div class="card" style="display:none;" id="capaProcedimientos">

          <div class="card-title">⚕️ Procedimientos Médicos</div>

          <div class="table-responsive saas-table-container">

            <table id="datatableProcedimientos" class="table saas-table">

              <thead>
                <tr>
                  <th>Procedimiento</th>
                  <th>Precio</th>
                  <th>Forma Pago</th>
                  <th>Valor</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody></tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

<script src="js/Js_AsignacionEspecialidades.js?v=1.6"></script>-->