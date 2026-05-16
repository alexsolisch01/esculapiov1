<!-- /.col -->
        <div class="col-md-12" style="margin-top: 1em;">
          <div class="box box-primary box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">ARCHIVO LEGAL</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                

            <div class="col-md-12" >
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#procedimientos" data-toggle="tab">Datos de Admision</a></li>
              <li><a href="#especialidad" data-toggle="tab">Certificados MEDICOs</a></li>
              <li><a href="#estadistico" data-toggle="tab">Documentos de nacido vivo</a></li>         
              <li class=""><a href="#servicio" data-toggle="tab">Documento de defuncion</a></li>
              <li class=""><a href="#legal" data-toggle="tab">Hoja de Emergencia</a></li>
              <li class=""><a href="#epicrisis" data-toggle="tab">Epicrisis</a></li>
              <li class=""><a href="#quirurgico" data-toggle="tab">Parte Quirurgico</a></li>
              <li class=""><a href="#consentimiento" data-toggle="tab">Consentimiento Informado</a></li>
              <li class=""><a href="#negacion" data-toggle="tab">Negacion de Consentimiento</a></li>
              <li class=""><a href="#revocatoria" data-toggle="tab">Revocatoria de consentimiento</a></li>
             
             
            </ul>
            <div class="tab-content">
              <div class="tab-pane" id="epicrisis">
                <!-- Post -->
                 <!-- /.box-header -->
           
              
                   <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Epicrisis</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form" method="post" id="RegistroTipoResumen">
                      <div class="box-body">
                       <div class="form-group">                
                          <label>Resumen Cuadro Clinico</label>
                          <textarea class="form-control input-sm" rows="3" id="Resumen" name="resumen" placeholder="resumen cuadro Clinico..."></textarea>
                        </div>

                         <div class="form-group">                
                          <label>Resumen Evolucion y Complicaciones</label>
                          <textarea class="form-control input-sm" rows="3" id="Evolucion" name="evolucion" placeholder="resumen Evolucion y Complicaciones..."></textarea>
                        </div>
                          
                          <div class="form-group">                
                          <label>HALLAZGOS RELEVANTES</label>
                          
                        </div>
                        <div class="form-group col-md-8">                
                          <label for="Firma">EXAMENES DE LABORATORIO</label>
                          <input type="file" class="form-control input-sm" id="Laboratorio" name="laboratorio" placeholder="VACIO...">   

                           <label for="Firma">Impresion Diagnostica de RX</label>
                          <input type="file" class="form-control input-sm" id="Rx" name="rx" placeholder="VACIO...">


                          <label for="Firma">Impresion Diagnostica de ECO</label>
                          <input type="file" class="form-control input-sm" id="Rx" name="rx" placeholder="VACIO...">

                          <label for="Firma">Impresion Diagnostica de RMN/TAC</label>
                          <input type="file" class="form-control input-sm" id="Rmn" name="rmn" placeholder="VACIO...">
                        </div>
                           </BR></BR></BR></BR></BR></BR></BR></BR></BR></BR></BR></BR></BR>                         
                        <div class="form-group">                
                          <label>Resumen Tratamientos y Procesos Terapeuticos</label>
                          <textarea class="form-control input-sm" rows="3" id="Resumen" name="resumen" placeholder="resumen cuadro Clinico..."></textarea>
                        </div>

                        <div class="form-group">                
                          <label>Condiciones de Egreso y Pronostico</label>
                          <textarea class="form-control input-sm" rows="2" id="Resumen" name="resumen" placeholder="resumen cuadro Clinico..."></textarea>
                        </div>

                        <div class="form-group col-md-4">
                          <label for="Nombre">NOMBRE DEL MEDICO</label>
                          <input type="text" required class="form-control input-sm" id="Nombre" name="nombre" placeholder="Nombre del MEDICO">
                        </div>  

                          


                         

                        
                          





                     </div>


                      
                        
                      <!-- /.box-body -->

                      <div class="box-footer">
                        
                        <button type="reset" class="btn btn-info" id="Limpiar"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                        <button type="submit" id="Guardar" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>                
                        <button type="submit" id="Guardar" class="btn btn-primary"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                         <button type="submit" id="Inactivar" class="btn btn-warning "><i class="fa  fa-ban " aria-hidden="true"></i> Inactivar </button>
                        <button type="submit" id="Guardar" class="btn btn-danger pull-right"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                      </div>

                    </form>
                  </div>
                  <!-- /.box -->  
                  

                   <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="x_panel">
                          <div class="x_title">
                            <h2>TIPO DE SERVICIOS REGISTRADOS  </br>  <small>Para modificar o eliminar un perfil, de doble click sobre la tabla</small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                              </li>
                             
                            </ul>
                            <div class="clearfix"></div>
                          </div>
                          <div class="x_content">
                           
                            <table id="datatable" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Nombre</th>
                                  <th>Descripcion</th>
                                  <th>USUARIO REGISTRO</th>
                                  <th>FECHA DE REGISTRO</th>
                                </tr>
                              </thead>


                              <tbody class="pointer tablaTipoServicio">
                                  <?php

                                  //$Perfil = new Con_Especialidad();

                                  //$Perfil->CargarTipoServicio();
                                ?>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                  </div>


          
            <!-- /.box-body -->
                <!-- /.post -->

                <!-- Post -->
               
                <!-- /.post -->

                <!-- Post -->
                
                <!-- /.post -->
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="estadistico">
                <!-- The timeline -->
               <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">EPIDEMIOLOGICOS</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form" method="post" id="RegistroGrupoEstadistico">
                      <div class="box-body">
                        <div class="form-group col-md-4">
                          <label for="Nombre">GENERO</label>
                          <select id="Genero"  name="Genero" class="form-control input-sm">
                              <?php
                                  $TipoServicio = new Con_consultaAmbu();
                                  $TipoServicio->LlenarComboCategoria();
                                ?>
                            </select>
                        </div> 

                          <div class="form-group col-md-4">
                          <label for="Nombre">AUTO IDENTIFICACION ETNICA</label>
                          <select id="Etnia"  name="etnia" class="form-control input-sm">
                              <?php
                                  $TipoServicio = new Con_consultaAmbu();
                                  $TipoServicio->LlenarComboCategoria();
                                ?>
                            </select>
                        </div> 

                        <div class="form-group col-md-4">
                          <label for="Nombre">MIGRANTE</label>
                          <select id="Migrante"  name="Migrante" class="form-control input-sm">
                              <?php
                                  $TipoServicio = new Con_consultaAmbu();
                                  $TipoServicio->LlenarComboCategoria();
                                ?>
                            </select>
                        </div> 

                        <div class="form-group col-md-4">
                          <label for="Nombre">GRUPOS PRIORITARIOS</label>
                          <select id="Grupo"  name="Grupo" class="form-control input-sm">
                              <?php
                                  $TipoServicio = new Con_consultaAmbu();
                                  $TipoServicio->LlenarComboCategoria();
                                ?>
                            </select>
                        </div> 

                        <div class="form-group col-md-4">
                          <label for="Nombre">SECTOR RESIDENCIA</label>
                          <select id="Sector"  name="Sector" class="form-control input-sm">
                              <?php
                                  $TipoServicio = new Con_consultaAmbu();
                                  $TipoServicio->LlenarComboCategoria();
                                ?>
                            </select>
                        </div> 





                     </div>
                        
                      <!-- /.box-body -->

                      <div class="box-footer">
                        
                      <button type="reset" class="btn btn-info" id="Limpiar"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                        <button type="submit" id="Guardar" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>                
                        <button type="submit" id="Guardar" class="btn btn-primary"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                         <button type="submit" id="Inactivar" class="btn btn-warning "><i class="fa  fa-ban " aria-hidden="true"></i> Inactivar </button>
                        <button type="submit" id="Guardar" class="btn btn-danger pull-right"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                         
                      </div>

                    </form>
                  </div>
                  <!-- /.box -->  
                  

                   <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="x_panel">
                          <div class="x_title">
                             <h2>GRUPOS EPIDEMIOLOGICOS  </br>  <small>Para modificar o eliminar un registro, de doble click sobre la tabla</small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                              </li>
                             
                            </ul>
                            <div class="clearfix"></div>
                          </div>
                          <div class="x_content">
                           
                            <table id="datatableGrupos" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Nombre</th>
                                  <th>Descripcion</th>
                                  <th>USUARIO REGISTRO</th>
                                  <th>FECHA DE REGISTRO</th>
                                </tr>
                              </thead>


                              <tbody class="pointer tablaGrupoEstadistico">
                             
                                <?php

                                  //$Perfil = new Con_Especialidad();

                                  //$Perfil->CargarGrupoEstadistico();
                                ?>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                  </div>


              </div>
              <!-- /.tab-pane -->

              <div class="tab-pane" id="especialidad">
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">CLIENTE </h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form" method="post" id="RegistroEspecialidad">
                      <div class="box-body">
                         <div class="form-group col-md-4">
                          <label for="Nombre">CÉDULA/RUC</label>
                          <input type="text" required class="form-control input-sm" id="CÉDULA" name="CÉDULA" placeholder="CÉDULA">
                        </div>

                        <div class="form-group col-md-4">
                          <label for="Nombre">NOMBRE</label>
                          <input type="text" required class="form-control input-sm" id="Nombre" name="nombre" placeholder="Nombre">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">APELLIDO</label>
                          <input type="text" required class="form-control input-sm" id="Apellido" name="apellido" placeholder="Apellido">
                        </div>

                           <div class="form-group col-md-4">
                          <label for="Nombre">TIPO PERSONERIA</label>
                          <select id="Personeria"  name="Personeria" class="form-control input-sm">
                              <?php
                                  $TipoServicio = new Con_consultaAmbu();
                                  $TipoServicio->LlenarComboCategoria();
                                ?>
                            </select>
                        </div> 

                         <div class="form-group col-md-4">
                          <label for="Nombre">DIRECCIÓN</label>
                          <input type="text" required class="form-control input-sm" id="DIRECCIÓN" name="DIRECCIÓN" placeholder="DIRECCIÓN">
                        </div> 

                        <div class="form-group col-md-4">
                          <label for="Nombre">TÉLEFONO</label>
                          <input type="text"  class="form-control input-sm" id="TÉLEFONO" name="TÉLEFONO" placeholder="fijo o celular...">
                        </div>

                         <div class="form-group col-md-4">
                          <label for="Correo ELECTRÓNICO">CORREO ELECTRÓNICO</label>
                          <input type="email"  class="form-control input-sm" id="Correo" name="correo" placeholder="Correo">
                           </div> 



                        
                        
                     </div>
                        
                      <!-- /.box-body -->

                      <div class="box-footer">
                        
                        <button type="reset" class="btn btn-info" id="Limpiar"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                        <button type="submit" id="Guardar" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>                
                        <button type="submit" id="Guardar" class="btn btn-primary"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                         <button type="submit" id="Inactivar" class="btn btn-warning "><i class="fa  fa-ban " aria-hidden="true"></i> Inactivar </button>
                        <button type="submit" id="Guardar" class="btn btn-danger pull-right"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                      </div>

                    </form>
                  </div>

                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="x_panel">
                          <div class="x_title">
                             <h2>CLIENTES REGISTRADOS  </br>  <small>Para modificar o eliminar un cliente, de doble click sobre la tabla</small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                              </li>
                             
                            </ul>
                            <div class="clearfix"></div>
                          </div>
                          <div class="x_content">
                           
                            <table id="datatableEspecialidad" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Tipo de Servicio</th>
                                  <th>Grupo Estadistico</th>
                                  <th>Nombre</th>
                                  <th>Descripcion</th>
                                  <th>USUARIO REGISTRO</th>
                                  <th>FECHA DE REGISTRO</th>
                                </tr>
                              </thead>


                              <tbody class="pointer tablaEspecialidad">
                             
                              <?php

                                  //$Perfil = new Con_Especialidad();

                                  //$Perfil->CargarEspecialidad();
                                ?>
                                
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                  </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
              <div class="active tab-pane" id="procedimientos">
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">REGISTRO DE ADMISION DE PACIENTES</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form" method="post" id="RegistroAmbu">
                      <div class="box-body">
                        <div class="form-group col-md-4" >
                          <label for="Nombre">Numero de HCU</label>
                          <input type="text" required class="form-control input-sm" id="HCU" name="hcu" placeholder="Numero HCU">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">NOMBRE</label>
                          <input type="text" required class="form-control input-sm" id="Nombre" name="nombre" placeholder="Nombre">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">APELLIDO</label>
                          <input type="text" required class="form-control input-sm" id="Apellido" name="apellido" placeholder="Apellido">
                        </div>
                        <div class="form-group col-md-4">                
                          <label for="Fecha Nacimiento">FECHA NACIMIENTO</label>
                          <input type="date" required class="form-control input-sm" id="Fecha" name="fecha" placeholder="Consultorio / Domicilio">
                        </div>
                        
                        <div class="form-group col-md-4">
                          <label for="Nombre">CÉDULA / PASAPORTE</label>
                          <input type="text" required class="form-control input-sm" id="CÉDULA" name="CÉDULA" placeholder="CÉDULA/Pasaporte">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">DIRECCIÓN</label>
                          <input type="text" required class="form-control input-sm" id="DIRECCIÓN" name="DIRECCIÓN" placeholder="Apellido">
                        </div>
                        
                        <div class="form-group col-md-4">
                          <label for="Nombre">PROVINCIA</label>
                          <select id="Provincia"  name="Provincia" class="form-control input-sm">
                              <?php
                                  $TipoServicio = new Con_consultaAmbu();
                                  $TipoServicio->LlenarComboCategoria();
                                ?>
                            </select>
                        </div>
                         <div class="form-group col-md-4">
                          <label for="Nombre">CANTON</label>
                          <select id="Canton" name="Canton" class="form-control input-sm">
                              <?php
                                  $TipoServicio = new Con_consultaAmbu();
                                  $TipoServicio->LlenarComboCategoria();
                                ?>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">TÉLEFONO</label>
                          <input type="text"  class="form-control input-sm" id="TÉLEFONO" name="TÉLEFONO" placeholder="fijo o celular...">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Correo ELECTRÓNICO">CORREO ELECTRÓNICO</label>
                          <input type="email"  class="form-control input-sm" id="Correo" name="correo" placeholder="Correo">
                           </div>
                           <div class="form-group col-md-4">
                          <label for="Nombre">ESTADO CIVIL</label>
                          <input type="text" required class="form-control input-sm" id="Estado" name="estado" placeholder="Apellido">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">OCUPACION</label>
                          <input type="text" required class="form-control input-sm" id="Ocupacion" name="ocupacion" placeholder="Ocupacion">
                        </div>
                        <div class="form-group col-md-8">                
                          <label for="Firma">TIPO DE DOCUMENTO</label>
                          <input type="file" class="form-control input-sm" id="tipo" name="tipo" placeholder="VACIO...">                         
                        </div>

                         
                     </div>
                        
                      <!-- /.box-body -->

                      <div class="box-footer">
                        
                        <button type="reset" class="btn btn-info" id="Limpiar"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                        <button type="submit" id="Guardar" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>                
                        <button type="submit" id="Guardar" class="btn btn-primary"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                         <button type="submit" id="Inactivar" class="btn btn-warning "><i class="fa  fa-ban " aria-hidden="true"></i> Inactivar </button>
                        <button type="submit" id="Guardar" class="btn btn-danger pull-right"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                      </div>

                    </form>
                  </div>

                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="x_panel">
                          <div class="x_title">
                            <h2>ADMISION DE PACIENTES  </br>  <small>Para modificar o eliminar un paciente, de doble click sobre la tabla</small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                              </li>
                             
                            </ul>
                            <div class="clearfix"></div>
                          </div>
                          <div class="x_content">
                           
                            <table id="datatableProcedimientos" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Especialidad</th>
                                  <th>Nombre</th>
                                  <th>Descripcion</th>
                                  <th>Precio</th>
                                  <th>USUARIO REGISTRO</th>
                                  <th>FECHA DE REGISTRO</th>
                                </tr>
                              </thead>


                              <tbody class="pointer tablaAmbu">
                             
                              <?php

                                  //$Perfil = new Con_Especialidad();

                                  //$Perfil->CargarProcedimientos();
                                ?>
                                
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                  </div>
          </div>


          <!-- /.nav-tabs-custom -->

          
                   


            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
<script src="../../plugins/timepicker/bootstrap-timepicker.min.js"></script>