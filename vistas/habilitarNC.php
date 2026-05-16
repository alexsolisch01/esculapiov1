
      <div class="col-md-12">
          <div class="box box-primary box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">HABILITAR FACTURA PARA NOTA DE CREDITO</h3>                        
            </div>
            <div class="box-body">

              <div class="col-md-12">
                <!-- Custom Tabs -->
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab_1" data-toggle="tab">FC CONSULTAS</a></li>
                    <li><a href="#tab_2" data-toggle="tab">FC FARMACIA</a></li>
                                     
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="tab_1">
                     
                        <div class="box-body">
                    
                          <div class="col-md-12">
                              <div class="form-group col-md-2" >    
                                  <label for="Nombre">FECHA DESDE </label>                      
                                  <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d");?>">
                              </div>
                              <div class="form-group col-md-2" >    
                                  <label for="Nombre">FECHA HASTA</label>                      
                                  <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaF" value="<?php echo date("Y-m-d");?>">
                              </div>

                              <div class="form-group col-md-3" >    
                                  <label for="Nombre">Filtrar Por</label>                      
                                  <select id="cbmFiltro"  name="instruccion" class="form-control input-sm">                        
                                    
                                    <option value="S">AUTORIZADAS</option>
                                    
                                  </select>
                              </div>

                              <div class="form-group col-md-2" >    
                                  <label for="Nombre" style="color: white;">----</label> 
                                  <button type="submit" id="BuscarFactura" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                              </div>

                              <div class="form-group pull-right" style="margin-top: 1em;" >                          
                                  <button type="submit" id="habiiltarFcConsulta" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> HABILITAR</button>
                              </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group col-md-3">
                              <input type="text" class="form-control input-sm input-custom" autocomplete="off" id="numeroF" name="CÉDULA" placeholder="001-001-0000001">
                            </div>
                            <div class="form-group col-md-4">
                              <input type="text" class="form-control input-sm" id="pacienteF" autocomplete="off" name="CÉDULA" placeholder="Paciente">
                            </div>
                          

                            <div class="pull-right">
                                <div class="form-group col-md-2">
                                  <input class="marcarTodos" type="checkbox" nombre="marcarTodos" id="fancy-checkbox-default" name="fancy-checkbox-default" autocomplete="off" />
                                  <div class="btn-group" >
                                    <label for="fancy-checkbox-default" class="btn btn-default" id="marcarTodos">
                                              <span class="glyphicon glyphicon-ok"></span>
                                              <span> </span>MARCAR TODOS
                                    </label>
                                  </div>
                                </div>
                            </div>
                            
                            <div class="x_content">
                              <div style="margin-top: 8em; margin-left: 26em; display: none;" id="loaderPacientes" class="loader"></div>
                              <table id="datatableConsultaFactura" width="100%"  cellspacing="0" class="table nowrap table-condensed" >
                                <thead>
                                  <tr>
                                    <th></th>                        
                                    <th >FACTURA</th>                        
                                    <th >FECHA</th>                         
                                    <th >CLIENTE</th> 
                                    <th >PACIENTE</th>  
                                    <th>VALOR</th>
                                    <th>ESTADO</th>
                                    <th>CLAVE DE AUTORIZACION</th>
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
              <div class="tab-pane" id="tab_2">
                  <div class="box-body">
                    
                          <div class="col-md-12">
                              <div class="form-group col-md-2" >    
                                  <label for="Nombre">FECHA DESDE </label>                      
                                  <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeFFarmacia" value="<?php echo date("Y-m-d");?>">
                              </div>
                              <div class="form-group col-md-2" >    
                                  <label for="Nombre">FECHA HASTA</label>                      
                                  <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaFFarmacia" value="<?php echo date("Y-m-d");?>">
                              </div>

                              <div class="form-group col-md-3" >    
                                  <label for="Nombre">Filtrar Por</label>                      
                                  <select id="cbmFiltroFarmacia"  name="instruccion" class="form-control input-sm">                        
                                    
                                    <option value="S">AUTORIZADAS</option>
                                    
                                    
                                  </select>
                              </div>

                              <div class="form-group col-md-2" >    
                                  <label for="Nombre" style="color: white;">----</label> 
                                  <button type="submit" id="BuscarFacturaFarmacia" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                              </div>

                              <div class="form-group pull-right" style="margin-top: 1em;" >                          
                                  <button type="submit" id="habiiltarFcFarmacia" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> HABILITAR</button>
                              </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group col-md-3">
                              <input type="text" class="form-control input-sm input-custom" autocomplete="off" id="numeroFFarmacia" name="CÉDULA" placeholder="001-001-0000001">
                            </div>
                            <div class="form-group col-md-4">
                              <input type="text" class="form-control input-sm" id="pacienteFFarmacia" autocomplete="off" name="CÉDULA" placeholder="Paciente">
                            </div>
                            

                            <div class="pull-right">
                                <div class="form-group col-md-2">
                                  <input class="marcarTodosFarmacia" type="checkbox" nombre="marcarTodosFarmacia" id="fancy-checkbox-defaultFarmacia" name="fancy-checkbox-default" autocomplete="off" />
                                  <div class="btn-group" >
                                    <label for="fancy-checkbox-defaultFarmacia" class="btn btn-default" id="marcarTodosFarmacia">
                                              <span class="glyphicon glyphicon-ok"></span>
                                              <span> </span>MARCAR TODOS
                                    </label>
                                  </div>
                                </div>
                            </div>
                            
                            <div class="x_content">
                              <div style="margin-top: 8em; margin-left: 26em; display: none;" id="loaderPacientesFarmacia" class="loader"></div>
                              <table id="datatableConsultaFacturaFarmacia" width="100%"  cellspacing="0" class="table nowrap table-condensed" >
                                <thead>
                                  <tr>
                                    <th></th>                        
                                    <th >FACTURA</th>                        
                                    <th >FECHA</th>                         
                                    <th >CLIENTE</th> 
                                    <th >PACIENTE</th>  
                                    <th>VALOR</th>
                                    <th>ESTADO</th>
                                    <th>CLAVE DE AUTORIZACION</th>
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
    </div>
</div>




<div class="modal fade" id="modal-ride" tabindex='1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" >
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">RIDE</h4>
      </div>
      <div class="modal-body" id="Ride" style="height: 700px;">                

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>      
      </div>
    </div>
  </div>
</div>

<script src="js/Js_HabilitarNc.js"></script>         