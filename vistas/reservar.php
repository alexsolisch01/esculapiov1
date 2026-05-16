<div class="col-md-12" >
  <div class="box box-default box-solid" style="height: 200px;">
    <div class="box-header with-border">
      <h3 class="box-title">DATOS DEL PACIENTE</h3>
      <div class="box-tools pull-right col-md-10" >
        <div class="col-md-2" style="margin-top: 0.3em;">
          <a id="BuscarPaciente" style="margin-left: 0em;" href="" data-toggle="modal" data-target="#modal-default" ><img src="imagenes/buscarPaci.png" /> Buscar (F1)</a>
        </div>
        <div class="col-md-2" style="margin-top: 0.3em;">
          <a id="BuscarReservas" style="margin-left: 0em;" href="" data-toggle="modal" data-target="#modal-reservaciones" ><img src="imagenes/october.png" /> Reservaciones</a>
        </div>
        <div id="limpiarFact" class="pull-right" >
          <img src="imagenes/broom.png">
          <strong>Limpiar</strong>
        </div>        
      </div>
    </div>
    <div class="box-body">
      <div class="row invoice-info">
        <div class="col-md-4 invoice-col">
          <strong>Datos del Paciente</strong>
          <address>
            <strong fecha="" data-toggle="modal" data-target="#modal-modificar-paciente" idPaciente="0" id="nombreCompleto"  >------</strong><img style="margin-left: 5px;" data-toggle="modal" data-target="#modal-modificar-paciente" id="clickModificar" src="imagenes/lapi.png"><br>
            <span id="cedula"  >------</span><br>            
            <span id="telefono" >------</span><br>
            <span id="direccion" >------</span><br>
            <span id="email" >----------</span><br>
            <span > EDAD DEL PACIENTE: </span>
            <span id="edad" >----</span>
          </address>
        </div>
        <div class="col-md-3 invoice-col">
          <label for="message">CONSULTORIO </label>
          <select id="cbmConsultorio" class="selectpicker show-tick form-control" data-live-search="true" >            
            <?php
                $dao = new Con_Especialidad();
                $dao->LlenarComboConsultorio();
            ?>
          </select>
        </div>
      <div class="col-md-2 invoice-col">
          <label for="Fecha Nacimiento">FECHA RESERVACION</label>
          <input type="date"  class="form-control input-sm" id="FechaReservacion" value="<?php echo date("Y-m-d");?>">
      </div>
      </div> 
  </div>
 </div>
</div>

<div class="col-md-12" style="margin-top: -1em;">
  <div class="box box-default box-solid">
    <div class="box-header with-border">     
          <h3 class="box-title">DATOS DE LA RESERVACION</h3> 
    </div>
    <div class="box-body">
      <div class="col-md-12">
  
          <div class="col-md-3">
            <h4 class="modal-title">ESPECIALIDAD (F1)</h4>
            <div class="x_content">
              <table id="datatableEspecialidadConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>ESPECIALIDAD</th>                 
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                     
                </tbody>                  
              </table>
            </div>
          </div>
          <div class="col-md-4">
            <h4 class="modal-title">PROCEDIMIENTOS (F2)</h4>
            <div class="x_content">
              <table id="datatableProcedimientoConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>PROCEDIMIENTO</th>
                    <th>PRECIO $</th>
                    <th></th>               
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                
                </tbody>                  
              </table>
            </div>
          </div>
          <div class="col-md-5">
            <h4 class="modal-title">DOCTOR (F3)</h4>
            <div class="x_content">
              <table id="datatableDoctoresProcedimientosFact" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>MÉDICO</th>                    
                    <th></th>                              
                    <th></th>            
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                  
                </tbody>                  
              </table>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-default" tabindex='1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">PACIENTES</h4>
      </div>
      <div class="modal-body">        
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientes" id="cedulaFiltro" autocomplete="off" name="CÉDULA" placeholder="Cédula">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientes" id="apellidoPFiltro" autocomplete="off" name="CÉDULA" placeholder="Apellido Paterno">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientes" id="apellidoMFiltro" autocomplete="off" name="CÉDULA" placeholder="Apellido Materno">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientes" id="nombreFiltro" autocomplete="off" name="CÉDULA" placeholder="Nombre">
              </div>
              <div class="x_content" style="height: 350px;max-height: 350px;overflow-y: auto;overflow-x: auto;">                
                <table id="datatableFactura" cellspacing="0" class="table  table-condensed">                
                  <thead style="font-size: 12px;">                      
                    <tr>
                      <th>ID</th>
                      <th>CÉDULA</th>
                      <th>APELLIDO PATERNO</th>
                      <th>APELLIDO MATERNO</th>
                      <th>NOMBRE</th>                        
                      <th>EMAIL</th>                     
                      <th style="display: none;">DIRECCIÓN</th>                     
                      <th>TÉLEFONO</th>
                      <th>FECHA CREACION</th>
                    </tr>
                  </thead>
                  <tbody style="padding: 0;font-size: 11px;">
                   
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

<div class="modal fade" id="modal-modificar-paciente" tabindex='14' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" style="">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">DATOS PACIENTE</h4>
      </div>
      <div class="modal-body">
        <div class="box box-default">
          <form role="form" method="post" id="ModificarPacienteFact">
                      <div class="box-body">
                        <div class="form-group col-md-4">
                          <label for="Nombre">CÉDULA / PASAPORTE</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" id="CedulaModificarPaciente" name="CÉDULAAdmi" placeholder="CÉDULA/PASAPORTE">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">APELLIDO PATERNO</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" required id="ApellidoPModificarPaciente" name="apellidoAdmi" placeholder="APELLIDO PATERNO">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">APELLIDO MATERNO</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" id="ApellidoMModificarPaciente" name="apellidoAdmi" placeholder="APELLIDO MATERNO">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">NOMBRES</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" required id="NombreModificarPaciente" name="nombreAdmi" placeholder="NOMBRES">
                        </div>
                        <div class="form-group col-md-4">                
                          <label for="Fecha Nacimiento">FECHA NACIMIENTO</label>
                          <input type="date"  class="form-control input-sm" autocomplete="off" id="FechaModificarPaciente" name="fechaAdmi">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">DIRECCIÓN</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" id="DireccionModificarPaciente" name="DIRECCIÓNAdmi" placeholder="DIRECCIÓN">
                        </div>                  

                        <div class="form-group col-md-4">
                          <label for="Nombre">CANTON</label>
                          <select id="CantonModificarPaciente"  name="estadoDepa" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">SELECCIONAR..</option>
                            <?php
                                  $TipoServicio = new Con_Paciente();
                                  $TipoServicio->LlenarDataListCanton();
                            ?>
                          </select>
                        </div>

                        <div class="form-group col-md-4">
                          <label for="Nombre">TÉLEFONO</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" id="TelefonoModificarPaciente" name="TÉLEFONOAdmi" placeholder="FIJO O CELULAR...">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Correo ELECTRÓNICO">CORREO ELECTRÓNICO</label>
                          <input type="email"  class="form-control input-sm" autocomplete="off" required id="CorreoModificarPaciente" value="email@hotmail.com" name="correoAdmi" placeholder="CORREO">
                           </div>
                           <div class="form-group col-md-4">
                          <label for="Nombre">ESTADO CIVIL</label>
                          <select id="EstadoCivilModificarPaciente"  name="ProvinciaAdmi" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                            <option value="SOLTERO/A">SOLTERO/A</option>
                            <option value="CASADO/A">CASADO/A</option>
                            <option value="UNIDO/A">UNIDO/A</option>
                            <option value="DIVORCIADO/A">DIVORCIADO/A</option>
                            <option value="VIUDO/A">VIUDO/A</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">OCUPACION</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" id="OcupacionModificarPaciente" name="ocupacionAdmi" placeholder="OCUPACION">
                        </div>
                        <div class="form-group col-md-2">
                          <label for="Nombre">IDENTIDAD DE GENERO</label>
                          <select id="Genero2"  name="Genero" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                              <?php
                                $TipoServicio = new Con_consultaAmbu();
                                $TipoServicio->LlenarComboTipoGene2();
                               ?>
                          </select>
                        </div> 
                        <div class="form-group col-md-2">
                          <label for="Nombre">EDAD</label>
                          <input type="text" class="form-control input-sm" autocomplete="off" disabled id="EdadModificarPaciente" name="" placeholder="EDAD">
                        </div>
                     </div>
                      <!-- /.box-body -->
                      <div class="box-footer">                        
                        <button type="reset" class="btn btn-info" id="LimpiarDatosFact"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                        <button type="submit" id="GuardarModificarPaciente" class="btn btn-success " disabled><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar(F10)</button>                
                        <button type="submit" id="ModificarPaciente" class="btn btn-primary" disabled><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar(F11)</button>
                      </div>

                    </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>  
      </div>
    </div>
  </div>
</div>


<div class="modal  fade" id="modal-horarios">
  <div class="modal-dialog">
    <div class="modal-content">
       <div class="modal-header">
        <h4>HORARIOS DISPONIBLES</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>                
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
                <table id="TablaHorarios" width="100%" class="table table-bordered">
                    <thead>
                      <tr>
                        <th>DIA</th>
                        <th>HORA</th>
                        <th></th>                    
                      </tr>
                    </thead>
                    <tbody class="pointer tablaPerfil">
                      
                    </tbody>                  
                  </table>
            </div>
        </div>
      </div>
      <div class="modal-footer">       
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<div class="modal  fade" id="modal-reservaciones" tabindex='17' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>        
        <h4>RESERVACIONES</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">

            <div class="form-group col-md-4" >    
                <label for="Nombre">FECHA DESDE </label>                      
                <input class="form-control input-sm"  type="date" id="fechaDesdeRe" value="<?php echo date("Y-m-d");?>">
            </div>
            <div class="form-group col-md-4" >    
                <label for="Nombre">FECHA HASTA</label>                      
                <input class="form-control input-sm"  type="date" id="fechaHastaRe" value="<?php echo date("Y-m-d");?>">
            </div>

            <div class="x_content">
              <table id="datatableReservaciones" width="100%" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>PACIENTE</th>
                    <th>TELEFONO</th>
                    <th>FECHA</th> 
                    <th>CONSULTORIO</th>
                    <th>ESPECIALIDAD</th>
                    <th>PROCEDIMIENTO</th>
                    <th>MEDICO</th>
                    <th>CONFIRMAR</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                   
                </tbody>                  
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">       
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<script src="js/Js_Reservar.js?v=0.12"></script>