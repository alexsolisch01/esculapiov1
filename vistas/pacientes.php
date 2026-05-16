<div class="col-md-12">
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">PACIENTES</h3>
    </div>
    <div class="box-body ">
      <div class="row">
        <div class="col-md-1">
          <button id="nuevoRegistro" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
        </div>
        <div class="col-md-6">
          <div class="col-md-6">
            <button class="btn btn-success" id="GenerarArchivo"> <i class="fa fa-database" aria-hidden="true"></i>EXPORTAR DATOS</button>
          </div>
          <div class="col-md-6" id="elementoDescarga">

          </div>
          <br>
        </div>
      </div>
      <div class="row">

        <div class="col-md-12">

          <div class="form-group col-md-3"><br>
            <input type="text" class="form-control input-sm" id="cedulaFiltro" placeholder="CÉDULA">
          </div>
          <div class="form-group col-md-3"><br>
            <input type="text" class="form-control input-sm" id="apellidoPFiltro" placeholder="Apellido Paterno">
          </div>
          <div class="form-group col-md-3"><br>
            <input type="text" class="form-control input-sm" id="apellidoMFiltro" placeholder="Apellido Materno">
          </div>
          <div class="form-group col-md-3"><br>
            <input type="text" class="form-control input-sm" id="nombreFiltro" placeholder="Nombre">
          </div>
          <div class="clearfix"></div>
          <table id="datatableAdmisionPacientes" width="100%" cellspacing="0" class="table nowrap table-condensed">
            <thead>
              <tr>
                <th></th>
                <th>CÉDULA</th>
                <th>APELLIDOS P</th>
                <th>APELLIDOS M</th>
                <th>NOMBRES</th>
                <th>EDAD</th>
                <th>EMAIL</th>
                <th>DIRECCIÓN</th>
                <th>TÉLEFONO</th>
                <th>OCUPACION</th>
                <th>CANTON</th>
                <th>ESTADO CIVIL</th>
                <th>FECHA NACIMIENTO</th>
                <th>OTROS</th>
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

<div class="modal fade" id="modal-cargando" tabindex="-1" role="dialog" aria-hidden="true" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-sm">
    <div class="modal-content" style="background:rgba(0,0,0,0);">
      <div class="modal-body" aria-hidden="true">
        <div class="col-md-12">
          <div class="box box-primary box-solid">
            <div class="box-header">
              <h3 class="box-title">Procesando..</h3>
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

<div class="modal fade modalNuevo" tabindex='1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">PACIENTE</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            <div class="nav-tabs-custom">
              <ul class="nav nav-tabs">
                <li class="active"><a href="#tab_1" data-toggle="tab">Paciente</a></li>
                <li><a href="#tab_2" data-toggle="tab">Epidemiologico</a></li>
                <li><a href="#tab_3" data-toggle="tab">Trabajo Social</a></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane active" id="tab_1">
                  <div class="row">
                    <div class="col-md-12">
                      <form role="form" method="post" id="RegistroAdmision">
                        <div class="form-group col-md-6">
                          <label for="Nombre">CÉDULA / PASAPORTE</label>
                          <input type="text" class="form-control input-sm" id="CedulaAdmi" autocomplete="off"  placeholder="CÉDULA/PASAPORTE">
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">APELLIDO PATERNO</label>
                          <input type="text" class="form-control input-sm" id="ApellidoAdmi" autocomplete="off"  placeholder="APELLIDO PATERNO">
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">APELLIDO MATERNO</label>
                          <input type="text" class="form-control input-sm" id="ApellidoMAdmi" autocomplete="off" placeholder="APELLIDO MATERNO">
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">NOMBRES</label>
                          <input type="text" class="form-control input-sm" id="NombreAdmi" autocomplete="off"  placeholder="NOMBRES">
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Fecha Nacimiento">FECHA NACIMIENTO</label>
                          <input type="date" class="form-control input-sm" id="FechaAdmi" autocomplete="off" >
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">DIRECCIÓN</label>
                          <input type="text" class="form-control input-sm" id="DireccionAdmi" autocomplete="off"  placeholder="DIRECCIÓN">
                        </div>

                        <div class="form-group col-md-6">
                          <label for="Nombre">CANTON</label>
                          <select id="CantonAdmi" name="estadoDepa" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">SELECCIONAR..</option>
                            <?php
                            $TipoServicio = new Con_Paciente();
                            $TipoServicio->LlenarDataListCanton();
                            ?>
                          </select>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="Nombre">PARROQUIA</label>
                          <select id="ParroquiaAdmi" class="selectpicker show-tick form-control input-sm" data-live-search="true">

                          </select>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="Nombre">SECTOR</label>
                          <select id="SectorAdmi" class="selectpicker show-tick form-control input-sm" data-live-search="true">

                          </select>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="Nombre">TÉLEFONO</label>
                          <input type="text" class="form-control input-sm" id="TelefonoAdmi" name="TÉLEFONOAdmi" placeholder="FIJO O CELULAR...">
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Correo ELECTRÓNICO">CORREO ELECTRÓNICO</label>
                          <input type="email" class="form-control input-sm" id="CorreoAdmi" name="correoAdmi" placeholder="CORREO">
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">ESTADO CIVIL</label>
                          <select id="EstadoCivilAdmi" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                            <option value="SOLTERO/A">SOLTERO/A</option>
                            <option value="CASADO/A">CASADO/A</option>
                            <option value="UNIDO/A">UNIDO/A</option>
                            <option value="DIVORCIADO/A">DIVORCIADO/A</option>
                            <option value="VIUDO/A">VIUDO/A</option>
                          </select>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">OCUPACION</label>
                          <input type="text" class="form-control input-sm" id="OcupacionAdmi" name="ocupacionAdmi" placeholder="OCUPACION">
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">EDAD</label>
                          <input type="text" class="form-control input-sm" disabled id="EdadAdmi" name="" placeholder="EDAD">
                        </div>
                        <div class="col-md-12">
                          <button type="submit" id="GuardarAdmision" class="btn btn-success "><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar(F10)</button>
                          <button type="submit" id="ModificarAdmision" class="btn btn-primary" ><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar(F11)</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="tab_2">
                  <div class="row">
                    <div class="col-md-12">
                      <form role="form" method="post" id="RegistroEpidemiologicos">
                        <div class="form-group col-md-6">
                          <label for="Nombre">ORIENTACION SEXUAL</label>
                          <select id="Genero" name="Genero" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoGene();
                            ?>
                          </select>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">IDENTIDAD DE GENERO</label>
                          <select id="Genero2" name="Genero" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoGene2();
                            ?>
                          </select>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="Nombre">AUTO IDENTIFICACION</label>
                          <select id="Etnia" name="etnia" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoEtnia();
                            ?>
                          </select>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="Nombre">NACIONALIDAD</label>
                          <select id="Migrante" name="Migrante" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoMigra();
                            ?>
                          </select>
                        </div>



                        <div class="form-group col-md-6">
                          <label for="Nombre">NACIONALIDADES</label>
                          <select id="Migrante2" name="Migrante" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoMigra2();
                            ?>
                          </select>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="Nombre">GRUPOS PRIORITARIOS</label>
                          <select id="Grupo" name="grupo" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoPrioridad();
                            ?>
                          </select>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="Nombre">SECTOR RESIDENCIA</label>
                          <select id="Sector" name="Sector" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoSector();
                            ?>
                          </select>
                        </div>
                        <div class="col-md-12">
                          <button type="submit" id="GuardarEpidemia" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar(F10)</button>
                        </div>
                      </form>
                    </div>

                  </div>
                </div>

                <div class="tab-pane" id="tab_3">
                  <div class="row">
                    <div class="col-md-12">
                      <form role="form" method="post" id="RegistroTrabajoSocial">
                        <div class="form-group col-md-6">
                          <label for="Nombre">CODIGO PARA VIH</label>
                          <input type="text" required class="form-control input-sm" autocomplete="off" id="Codigovih" name="codigovih" placeholder="CODIGO...">
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">TIPO DE AFILIACION</label>
                          <select id="Afiliacion" name="afiliacion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">NO APORTA</option>
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoAfi();
                            ?>
                          </select>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">NIVEL DE INSTRUCCION</label>
                          <select id="Instruccion" name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <?php
                            $TipoServicio = new Con_consultaAmbu();
                            $TipoServicio->LlenarComboTipoNivel();
                            ?>
                          </select>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">NOMBRE DEL RESPONSABLE :</label>
                          <input type="text" required class="form-control input-sm" autocomplete="off" id="Responsable" name="responsable" placeholder="RESPONSABLE">
                        </div>
                        <div class="form-group col-md-6">
                          <label for="Nombre">EN CASO NECESARIO LLAMAR A :</label>
                          <input type="text" required class="form-control input-sm" autocomplete="off" id="Parentesco" name="parentesco" placeholder="PARENTESCO">
                        </div>
                        <div class="form-group col-md-6">
                          <label style="color: white;" for="Nombre">-</label>
                          <input type="text" required class="form-control input-sm" autocomplete="off" id="Numero" name="numero" placeholder="NUMERO CELULAR O FIJO">
                        </div>
                        <div class="col-md-12">
                          <button type="submit" id="GuardarTrabajo" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar(F10)</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <!-- /.tab-pane -->
              </div>
              <!-- /.tab-content -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<script src="js/Js_Paciente.js?v=1.4"></script>