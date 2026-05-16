<div class="col-md-12" style="margin-top: 1em;">
          <div class="box box-primary box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">FACTURAS</h3>                        
            </div>
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
                        <option value="N">NO AUTORIZADAS</option>
                        <option value="S">AUTORIZADAS</option>
                        <option value="D">DEVUELTAS</option>
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
                      <button type="submit" id="EnviarCorreo" class="btn btn-info"><i class="fa fa-send" aria-hidden="true"></i> Enviar Correo (F1)</button>
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
                  <table id="datatableConsultaFacturaNC"   class="table table-striped table-bordered">
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

<script src="js/Js_Srinc.js"></script>         