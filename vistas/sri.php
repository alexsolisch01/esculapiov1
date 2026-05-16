<div class="col-md-12">
                <!-- Custom Tabs -->
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab_1" data-toggle="tab">FC CONSULTAS</a></li>
                                   <li><a href="#tab_2" data-toggle="tab">FC FARMACIA</a></li>
                                   <li><a href="#tab_3" data-toggle="tab">NOTAS DE CREDITO CONSULTA</a></li>
                                   <li><a href="#tab_4" data-toggle="tab">NOTAS DE CREDITO FARMACIA</a></li>                                     
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="tab_1">
                     
                        <div class="box-body">
                    
                          <div class="col-md-12">
                              <div class="form-group col-md-2" >    
                                  <label for="Nombre" id="firmarnuevamente">FECHA DESDE </label>                      
                                  <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d");?>">
                              </div>
                              <div class="form-group col-md-2" >    
                                  <label for="Nombre">FECHA HASTA</label>                      
                                  <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaF" value="<?php echo date("Y-m-d");?>">
                              </div>

                              <div class="form-group col-md-3" >    
                                  <label for="Nombre">Filtrar Por</label>                      
                                  <select id="cbmFiltro"  name="instruccion" class="form-control input-sm">                        
                                    <option value="N">NO AUTORIZADAS</option>
                                    <option value="S">AUTORIZADAS</option>
                                    <option value="D">DEVUELTAS</option>
                                    <option value="A">ANULADAS</option>
                                    <option value="T">TODAS</option>
                                  </select>
                              </div>

                              <div class="form-group col-md-2" >    
                                  <label for="Nombre" style="color: white;">----</label> 
                                  <button type="submit" id="BuscarFactura" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                              </div>

                              <div class="form-group pull-right" style="margin-top: 1em;" >                          
                                  <button type="submit" id="autoriazarLote" class="btn btn-warning"><img src="imagenes/sri.png" /> AUTORIZAR (F10)</button>
                              </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group col-md-3">
                              <input type="text" class="form-control input-sm input-custom" autocomplete="off" id="numeroF" name="CÉDULA" placeholder="001-001-0000001">
                            </div>
                            <div class="form-group col-md-4">
                              <input type="text" class="form-control input-sm" id="pacienteF" autocomplete="off" name="CÉDULA" placeholder="Paciente">
                            </div>
                            <div class="form-group col-md-2">                      
                                  <button type="submit" id="EnviarCorreo" class="btn btn-info"><i class="fa fa-send" aria-hidden="true"></i> Enviar Correo (F2)</button>
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
                              <table id="datatableConsultaFactura" width="100%"  cellspacing="0" class="table nowrap table-condensed">
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
                                <tbody class="pointer tablaPerfil">
                                  <?php
                                    /*$espe = new Con_Bodega();
                                    $espe->CargarInventario2();*/
                                  ?>
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
                                    <option value="N">NO AUTORIZADAS</option>
                                    <option value="S">AUTORIZADAS</option>
                                    <option value="D">DEVUELTAS</option>
                                    <option value="A">ANULADAS</option>
                                    <option value="T">TODAS</option>
                                  </select>
                              </div>

                              <div class="form-group col-md-2" >    
                                  <label for="Nombre" style="color: white;">----</label> 
                                  <button type="submit" id="BuscarFacturaFarmacia" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                              </div>

                              <div class="form-group pull-right" style="margin-top: 1em;" >                          
                                  <button type="submit" id="autoriazarLoteFarmacia" class="btn btn-warning"><img src="imagenes/sri.png" /> AUTORIZAR (F10)</button>
                              </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group col-md-3">
                              <input type="text" class="form-control input-sm input-custom" autocomplete="off" id="numeroFFarmacia" name="CÉDULA" placeholder="001-001-0000001">
                            </div>
                            <div class="form-group col-md-4">
                              <input type="text" class="form-control input-sm" id="pacienteFFarmacia" autocomplete="off" name="CÉDULA" placeholder="Paciente">
                            </div>
                            <div class="form-group col-md-2">                      
                                  <button type="submit" id="EnviarCorreoFarmacia" class="btn btn-info"><i class="fa fa-send" aria-hidden="true"></i> Enviar Correo (F2)</button>
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
                              <table id="datatableConsultaFacturaFarmacia" width="100%"  cellspacing="0" class="table nowrap table-condensed">
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
                                <tbody class="pointer tablaPerfil">
                                  <?php
                                    /*$espe = new Con_Bodega();
                                    $espe->CargarInventario2();*/
                                  ?>
                                </tbody>                  
                              </table>
                            </div>
                          </div>
                          
                        </div>
              </div>

              <div class="tab-pane" id="tab_3">
                  
                  <div class="box-body">
              
                  <div class="col-md-12">
                      <div class="form-group col-md-2" >    
                          <label for="Nombre">FECHA DESDE </label>                      
                          <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeFNcCon" value="<?php echo date("Y-m-d");?>">
                      </div>
                      <div class="form-group col-md-2" >    
                          <label for="Nombre">FECHA HASTA</label>                      
                          <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaFNcCon" value="<?php echo date("Y-m-d");?>">
                      </div>

                      <div class="form-group col-md-3" >    
                          <label for="Nombre">Filtrar Por</label>                      
                          <select id="cbmFiltroNcCon"  name="instruccion" class="form-control input-sm">                        
                            <option value="N">NO AUTORIZADAS</option>
                            <option value="S">AUTORIZADAS</option>
                            <option value="D">DEVUELTAS</option>
                            <option value="T">TODAS</option>
                          </select>
                      </div>

                      <div class="form-group col-md-2" >    
                          <label for="Nombre" style="color: white;">----</label> 
                          <button type="submit" id="BuscarFacturaNcCon" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                      </div>

                      <div class="form-group pull-right" style="margin-top: 1em;" >                          
                          <button type="submit" id="autoriazarLoteNcCon" class="btn btn-warning"><img src="imagenes/sri.png" /> AUTORIZAR (F10)</button>
                      </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group col-md-3">
                      <input type="text" class="form-control input-sm input-custom" autocomplete="off" id="numeroFNcCon" name="CÉDULA" placeholder="001-001-0000001">
                    </div>
                    <div class="form-group col-md-4">
                      <input type="text" class="form-control input-sm" id="pacienteFNcCon" autocomplete="off" name="CÉDULA" placeholder="Paciente">
                    </div>
                    <div class="form-group col-md-2">                      
                          <button type="submit" id="EnviarCorreoNcCon" class="btn btn-info"><i class="fa fa-send" aria-hidden="true"></i> Enviar Correo (F2)</button>
                    </div>

                    <div class="pull-right">
                        <div class="form-group col-md-2">
                          <input class="marcarTodosNcCon" type="checkbox" nombre="marcarTodosNcCon" id="fancy-checkbox-defaultNcCon" name="fancy-checkbox-default" autocomplete="off" />
                          <div class="btn-group" >
                            <label for="fancy-checkbox-defaultNcCon" class="btn btn-default" id="marcarTodosNcCon">
                                      <span class="glyphicon glyphicon-ok"></span>
                                      <span> </span>MARCAR TODOS
                            </label>
                          </div>
                        </div>
                    </div>
                    
                    <div class="x_content">
                      <div style="margin-top: 8em; margin-left: 26em; display: none;" id="loaderPacientesNcCon" class="loader"></div>
                      <table id="datatableConsultaFacturaNC" width="100%"  cellspacing="0" class="table nowrap table-condensed">
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
                        <tbody class="pointer tablaPerfil">
                          <?php
                            /*$espe = new Con_Bodega();
                            $espe->CargarInventario2();*/
                          ?>
                        </tbody>                  
                      </table>
                    </div>
                  </div>
                  
                </div>

              </div>

              <div class="tab-pane" id="tab_4">
                  
                  <div class="box-body">
              
                  <div class="col-md-12">
                      <div class="form-group col-md-2" >    
                          <label for="Nombre">FECHA DESDE </label>                      
                          <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeFNcFarm" value="<?php echo date("Y-m-d");?>">
                      </div>
                      <div class="form-group col-md-2" >    
                          <label for="Nombre">FECHA HASTA</label>                      
                          <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaFNcFarm" value="<?php echo date("Y-m-d");?>">
                      </div>

                      <div class="form-group col-md-3" >    
                          <label for="Nombre">Filtrar Por</label>                      
                          <select id="cbmFiltroNcFarm"  name="instruccion" class="form-control input-sm">                        
                            <option value="N">NO AUTORIZADAS</option>
                            <option value="S">AUTORIZADAS</option>
                            <option value="D">DEVUELTAS</option>
                            <option value="T">TODAS</option>
                          </select>
                      </div>

                      <div class="form-group col-md-2" >    
                          <label for="Nombre" style="color: white;">----</label> 
                          <button type="submit" id="BuscarFacturaNcFarm" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                      </div>

                      <div class="form-group pull-right" style="margin-top: 1em;" >                          
                          <button type="submit" id="autoriazarLoteNcFarm" class="btn btn-warning"><img src="imagenes/sri.png" /> AUTORIZAR (F10)</button>
                      </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group col-md-3">
                      <input type="text" class="form-control input-sm input-custom" autocomplete="off" id="numeroFNcFarm" name="CÉDULA" placeholder="001-001-0000001">
                    </div>
                    <div class="form-group col-md-4">
                      <input type="text" class="form-control input-sm" id="pacienteFNcFarm" autocomplete="off" name="CÉDULA" placeholder="Paciente">
                    </div>
                    <div class="form-group col-md-2">                      
                          <button type="submit" id="EnviarCorreoNcFarm" class="btn btn-info"><i class="fa fa-send" aria-hidden="true"></i> Enviar Correo (F2)</button>
                    </div>

                    <div class="pull-right">
                        <div class="form-group col-md-2">
                          <input class="marcarTodosNcFarm" type="checkbox" nombre="marcarTodosNcCon" id="fancy-checkbox-defaultNcFarm" name="fancy-checkbox-default" autocomplete="off" />
                          <div class="btn-group" >
                            <label for="fancy-checkbox-defaultNcFarm" class="btn btn-default" id="marcarTodosNcFarm">
                                      <span class="glyphicon glyphicon-ok"></span>
                                      <span> </span>MARCAR TODOS
                            </label>
                          </div>
                        </div>
                    </div>
                    
                    <div class="x_content">
                      <div style="margin-top: 8em; margin-left: 26em; display: none;" id="loaderPacientesNcFarm" class="loader"></div>
                      <table id="datatableConsultaFacturaNCFarm" width="100%"  cellspacing="0" class="table nowrap table-condensed">
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
                        <tbody class="pointer tablaPerfil">
                          <?php
                            /*$espe = new Con_Bodega();
                            $espe->CargarInventario2();*/
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

<script src="js/Js_Sri.js?v=0.2"></script>              