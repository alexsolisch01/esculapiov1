    

          <!-- /.col -->
        <div class="col-md-12" style="margin-top: 1em;">
          <div class="box box-primary box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">Mantenimiento de Cantones</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="box-body">
              
                   <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">REGISTRO DE CANTONES</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form" method="post" id="RegistroProvincia">
                      <div class="box-body">
                        <div class="form-group">
                          <label for="Nombre">NOMBRE</label>
                          <input type="text" class="form-control input-sm" id="Nombre" name="nombre" placeholder="Nombre Del Relacion">
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
                 </div> 

                   <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="x_panel">
                          <div class="x_title">
                            <h2>PROVINCIAS REGISTRADAS </br> <small> Para modificar o eliminar una provincia, de doble click sobre el tipo de relacion en la tabla </small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                              <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                              </li>
                             
                            </ul>
                            <div class="clearfix"></div>
                          </div>
                          <div class="x_content">
                           
                            <table id="datatableTipoRelacion" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Nombre</th>
                                  <th>Descripcion</th>
                                  <th>USUARIO REGISTRO</th>
                                  <th>FECHA DE REGISTRO</th>
                                </tr>
                              </thead>


                              <tbody class="pointer tablaTipoRelacion">
                                
                                <?php

                                  $Perfil = new Con_Especialidad();

                                  $Perfil->CargarTipoRelacion();
                                ?>
                                
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                  </div>


            </div>
          </div>
        </div>