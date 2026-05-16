
<div class="col-md-12" style="margin-top: 1em;">
  <div class="box box-primary box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">REGISTRO DE PLANES</h3>
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
                  <form role="form" method="post" id="RegistroPlanes">
                    <div class="box-body">
                      <div class="form-group col-md-4">
                        <label for="Nombre">Nombre Del Plan</label>
                        <input type="text"  class="form-control input-sm" autocomplete="off" id="nombre" name="razon" placeholder="NOMBRE">
                      </div>

                      <div class="form-group col-md-4">
                        <label for="Nombre">Valor Total</label>
                        <label id="TotalPlan" class="form-control input-sm">$ 0.0</label>
                        
                      </div>
                      
                      <div class="form-group col-md-4">
                        <label for="Nombre">Valor Descuento</label>
                        <input type="number"  class="form-control input-sm" autocomplete="off" id="valorDescuento" name="actividad" placeholder="Descuento">
                      </div>

                        
                                <div class="row">
                                  <div class="col-md-12">
                                    <div class=" form-group col-md-12">
                                      <label class=" col-md-3">PROCEDIMIENTOS</label>
                                      <select id="procedimientos" title="Selecionar"  class="selectpicker col-md-9" multiple data-live-search="true">
                                        
                                          <?php
                                            $TipoServicio = new Con_Planes();
                                            $TipoServicio->LlenarComboProc();
                                          ?>

                                      </select>

                                    </div>
              
                                  </div>
                             </div>

                             <div class="row">
                                  <div class="col-md-12">
                                    <div class=" form-group col-md-12">
                                      <label class=" col-md-3">PROCEDIMIENTOS ECO</label>
                                      <select  id="procedimientosEco" title="Selecionar" class="selectpicker col-md-9" multiple data-live-search="true">
                                        
                                          <?php
                                            $TipoServicio = new Con_Planes();
                                            $TipoServicio->LlenarComboProcEco();
                                          ?>

                                      </select>

                                    </div>
              
                                  </div>
                             </div>

                             <div class="row">
                                  <div class="col-md-12">
                                    <div class=" form-group col-md-12">
                                      <label class=" col-md-3" >PROCEDIMIENTOS LAB</label>
                                      <select id="procedimientosLab" title="Selecionar"   class="selectpicker col-md-9" multiple data-live-search="true">
                                        
                                          <?php
                                            $TipoServicio = new Con_Planes();
                                            $TipoServicio->LlenarComboProcLab();
                                          ?>

                                      </select>

                                    </div>
              
                                  </div>
                             </div>


                           
                             <div class="row">
                                  <div class="col-md-12">
                                    <div class=" form-group col-md-12">
                                      <label class=" col-md-3">PROCEDIMIENTOS RX</label>
                                      <select id="procedimientosRx" title="Selecionar"  class="selectpicker col-md-9" multiple data-live-search="true">
                                        
                                          <?php
                                            $TipoServicio = new Con_Planes();
                                            $TipoServicio->LlenarComboProcRx();
                                          ?>

                                      </select>

                                    </div>
              
                                  </div>
                             </div>


                             <div class="row">
                                  <div class="col-md-12">
                                    <div class=" form-group col-md-12">
                                      <label class=" col-md-3">PROCEDIMIENTOS TOMO</label>
                                      <select id="procedimientosTomo" title="Selecionar"  class="selectpicker col-md-9" multiple data-live-search="true">
                                        
                                          <?php
                                            $TipoServicio = new Con_Planes();
                                            $TipoServicio->LlenarComboProcTomo();
                                          ?>

                                      </select>

                                    </div>
              
                                  </div>
                             </div>
          
                           </div>
                      
                                                        
                    </div>                        
                    <div class="box-footer">                        
                      <button type="reset" class="btn btn-info" id="LimpiarPlan"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                      <button type="submit" id="GuardarPlan" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar(F10)</button>                
                      <button type="submit" id="ModificarPlan" class="btn btn-primary"><i class="fa fa-pencil-square" aria-hidden="true"></i> MODIFICAR(F11)</button>
                      <button type="submit" id="EliminarPlan" class="btn btn-danger pull-right"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                    </div>
                  </form>
                </div>
                 <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                  <div class="x_panel">
                    <div class="x_title">
                      <h2>Planes Registrados</h2>
                       <ul class="nav navbar-right panel_toolbox">
                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                        </li>
                             
                       </ul>
                      <div class="clearfix"></div>
                     </div>
                    <div class="x_content">
                      <table id="datatablePlan" class="table table-striped table-bordered tablaPequeña">
                          <thead>
                            <tr>
                              <th>Id</th>                                
                              <th>NOMBRE</th>
                              <th>VALOR</th>
                              <th>DESCUENTO</th>
                              <th>PROCEDIMIENTOS</th>
                              <th>LABORATORIO</th>
                              <th>RX</th>
                              <th>ECO</th>
                              <th>TAC/RM</th>
                            </tr>
                          </thead>
                          <tbody class="pointer tablaLinea">
                                  <?php

                                 //$Perfil = new Con_Planes();

                                 //$Perfil->CargarPlan();
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
    



    <script src="js/Js_Planes.js"></script> 
    




