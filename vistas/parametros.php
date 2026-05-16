    

          <!-- /.col -->
        <div class="col-md-12">
          <div class="box box-widget widget-user-2">
            <div class="box-header with-border">
              <h3 class="box-title">FACTURAS</h3>            
            </div>
            <div class="box-body">
              
                 
                   

                   <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="x_panel">
                         
                          <div class="x_content">
                           
                            <table id="datatableTipoCategoria" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Nombre</th>
                                  <th>Descripcion</th>
                                  <th>USUARIO REGISTRO</th>
                                  <th>FECHA DE REGISTRO</th>
                                </tr>
                              </thead>


                              <tbody class="pointer tablaTipoCategoria">
                                
                                <?php

                                  $Perfil = new Con_Especialidad();

                                  $Perfil->CargarTipoCategoria();
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