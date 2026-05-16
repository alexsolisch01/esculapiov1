

        <!-- /.col -->
        <div class="col-md-12" style="margin-top: 1em;">
          <div class="box box-primary box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">UBICACIONES</h3>

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
              <li class="active"><a href="#servicio" data-toggle="tab">PROVINCIA</a></li>
              <li><a href="#estadistico" data-toggle="tab">CANTON</a></li>
              <li><a href="#especialidad" data-toggle="tab">PARROQUIA</a></li>         
              
             
             
            </ul>
            <div class="tab-content">
              <div class="tab-pane" id="servicio">
                <!-- Post -->
                 <!-- /.box-header -->
           
              
                   <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">REGISTRO DE PROVINCIAS</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form" method="post" id="RegistroProvincia">
                      <div class="box-body">
                        <div class="form-group col-md-4">
                          <label for="Nombre">NOMBRE</label>
                          <input type="text" required class="form-control input-sm" id="Nombre" name="codigovih" placeholder="Nombre...">
                        </div>

                       

                       

                     </div>

                      
                        
                      <!-- /.box-body -->

                      <div class="box-footer">
                        
                        <button type="reset" class="btn btn-info" id="Limpiar"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                        <button type="submit" id="GuardarPro" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>                
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
                            <h2>PROVINCIAS REGISTRADAS  </br>  <small>Para modificar o eliminar un perfil, de doble click sobre la tabla</small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                              </li>
                             
                            </ul>
                            <div class="clearfix"></div>
                          </div>
                          <div class="x_content">
                           
                            <table id="datatableProvincia" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Nombre</th>                             
                                  <th>Fecha Registro</th>    
                                 
                                </tr>
                              </thead>


                              <tbody class="pointer tablaProvincia">
                                
                                <?php

                                  $Perfil = new Con_Ubicaciones();

                                  $Perfil->CargarProvincia();
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
                      <h3 class="box-title">CANTONES</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form" method="post" id="RegistroCanton">
                      <div class="box-body">
                        <div class="box-body">

                          <div class="form-group col-md-4">
                          <label for="Nombre">Provincias Cargadas</label>
                          <select id="Provi"  name="provi" class="form-control input-sm">
                              <?php
                                  $TipoServicio = new Con_consultaAmbu();
                                  $TipoServicio->LlenarComboTipoProvincia();
                                ?>
                            </select>
                        </div>



                        <div class="form-group col-md-4">
                          <label for="Nombre">NOMBRE</label>
                          <input type="text" required class="form-control input-sm" id="Nombre" name="nombre" placeholder="Nombre...">
                        </div>

                          

                        

                        
                          </div>
                        
                         </div>
                        
                      <!-- /.box-body -->

                      <div class="box-footer">
                        
                      <button type="reset" class="btn btn-info" id="Limpiar"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                        <button type="submit" id="GuardarCan" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>                
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
                             <h2> REGISTRO DE CANTONES  </br>  <small>Para modificar o eliminar un canton, de doble click sobre la tabla</small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                              </li>
                             
                            </ul>
                            <div class="clearfix"></div>
                          </div>
                          <div class="x_content">
                           
                            <table id="datatableCanton" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Nombre</th>
                                  <th>FECHA DE REGISTRO</th>
                                </tr>
                              </thead>


                              <tbody class="pointer tablaCanton">
                             
                                <?php

                                  $Perfil = new Con_Ubicaciones();

                                  $Perfil->CargarCanton();
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
                      <h3 class="box-title">PARROQUIA </h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form" method="post" id="RegistroParroquia">
                      <div class="box-body">


                        <div class="form-group col-md-4">
                          <label for="Nombre">Cantones Cargados</label>
                          <select id="Canto"  name="canto" class="form-control input-sm">
                              <?php
                                  $TipoServicio = new Con_consultaAmbu();
                                  $TipoServicio->LlenarComboTipoCanton();
                                ?>
                            </select>
                        </div>
                         <div class="form-group col-md-4">
                          <label for="Nombre">NOMBRE </label>
                          <input type="text" required class="form-control input-sm" id="Nombre" name="nombreCome" placeholder="NOMBRE COMERCIAL">
                        </div>
                    
                        
                     </div>
                        
                      <!-- /.box-body -->

                      <div class="box-footer">
                        
                        <button type="reset" class="btn btn-info" id="Limpiar"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                        <button type="submit" id="GuardarParro" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>                
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
                             <h2>PARROQUIAS REGISTRADAS  </br>  <small>Para modificar o eliminar una parroquia, de doble click sobre la tabla</small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                              </li>
                             
                            </ul>
                            <div class="clearfix"></div>
                          </div>
                          <div class="x_content">
                           
                            <table id="datatableParro" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                 <th>Id</th>
                                  <th>Nombre</th>
                                  <th>FECHA DE REGISTRO</th>
                                 
                                </tr>
                              </thead>


                              <tbody class="pointer tablaParro">
                             
                              <?php

                                  $Perfil = new Con_Ubicaciones();

                                  $Perfil->CargarParro();
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
             
          </div>


          <!-- /.nav-tabs-custom -->

          
                   


            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        </div>
        <!-- /.col -->

