<div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">AUTORIZAR DEVOLUCION DE ANTICIPOS RECIBIDOS</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <div class="row">
              <div class="col-md-12">
                <div class="form-group col-md-3" >    
                        <label for="Nombre">FECHA DESDE</label>                      
                        <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeFEHabilitar" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-3" >    
                        <label for="Nombre">FECHA HASTA</label>                      
                        <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaFEHabilitar" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-2" >    
                      <label for="Nombre" >&nbsp;</label> 
                      <button type="submit" id="BuscarFacturaEHabilitar" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                    </div>
                    <div class="" style="margin-top: 1.8em;">
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
                   <div class="col-md-12">
                      <input type="text" class="form-control filtroPacientes" id="nombreFiltroEHabilitar" autocomplete="off" name="CÉDULA" placeholder="Cliente">
                    </div>
                    <div class="col-md-12">
                      <table id="datatableIngresoHabilitarE" width="100%" class="table table-striped table-bordered nowrap table-condensed">
                          <thead>
                            <tr>
                              <th></th>  
                              <th>ID</th>   
                              <th>CEDULA/RUC</th>                   
                              <th>CLIENTE</th>                                    
                              <th>VALOR</th>
                              <th>SALDO</th>
                              <th>FECHA DE REGISTRO</th>
                              <th>ESTADO</th>
                            </tr>
                          </thead>
                          <tbody>
                               
                          </tbody>                  
                        </table>
                    </div>
                    <div class="box-footer pull-right">
                        <button type="reset" class="btn btn-info" id="LimpiarEgreso"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                        <button type="submit" id="HabilitarEgreso" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar (F10)</button> 
                        <button type="submit" id="HabilitarEgresoFacturacion" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar Habilitar Facturacion (F11)</button> 
                    </div> 

              </div>              
            </div>
          </div>
</div>          
<script src="js/Js_HabilitarEgreso.js"></script>