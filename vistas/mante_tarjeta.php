<div class="col-md-12" style="margin-top: 1em;">
  <div class="box box-primary box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">TARJETA DE CREDITO</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="box-body">
      <div class="col-md-12" >
        <div class="nav-tabs-custom">
           
       
              <div class="active tab-pane" id="procedimientos">
                <div class="box box-primary">
                  <div class="box-header with-border">
                    
                  </div>
                  <form role="form" method="post" id="RegistroTarjeta">
                    <div class="box-body">
                      <div class="form-group col-md-4" >
                        <label for="Nombre">Entidad Emisora</label>
                        <input type="text"  class="form-control input-sm" id="nombre" autocomplete="off" name="razon" autocomplete="off" placeholder="-------">
                      </div>
                     
                                                              
                    </div>                        
                    <div class="box-footer">                        
                      <button type="reset" class="btn btn-info" id="LimpiarTarjeta"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                      <button type="submit" id="GuardarTarjeta" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar(F10)</button>                
                      <button type="submit" id="ModificarTarjeta" class="btn btn-primary"><i class="fa fa-pencil-square" aria-hidden="true"></i> MODIFICAR(F11)</button>
                      <button type="submit" id="EliminarTarjeta" class="btn btn-danger pull-right"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                    </div>
                  </form>
                </div>
                 <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <div class="x_panel">
                    <div class="x_title">
                      <h2>Tarjetas Registradas</h2>
                       <ul class="nav navbar-right panel_toolbox">
                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                        </li>
                             
                       </ul>
                      <div class="clearfix"></div>
                     </div>
                    <div class="x_content">
                      <table id="datatableTarjeta" class="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th>Id</th>                                
                              <th>Entidad Emisora</th>
                                                            
                             
                            </tr>
                          </thead>
                          <tbody class="pointer tablaLinea">
                                  <?php

                                  $Perfil = new Con_Banco();

                                  $Perfil->CargarTarjeta();
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
          </div>
        </div>
      </div>
    



    <script src="js/Js_tarjeta.js"></script> 
    




