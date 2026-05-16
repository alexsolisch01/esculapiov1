<div class="col-md-12" style="margin-top: 1em;">
  <div class="box box-primary box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">MOVIMIENTO DE CUENTAS POR COBRAR</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="box-body">
      <div class="col-md-12" >
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li  class="active"><a href="#pendientes" data-toggle="tab"><span >CUENTAS POR COBRAR</span><small class="label pull-right bg-primary" style="margin-left: 2px; margin-top: 3px;">1</small></a></li>
            <li><a href="#servicios" data-toggle="tab">EGRESO DE CAJA<small class="label pull-right bg-primary" style="margin-left: 2px; margin-top: 3px;">2</small></a></li>
          </ul>  
          <div class="tab-content">
            <div class="active tab-pane" id="pendientes">
              <div class="box box-primary">
                <div class="box-body">
                  <div class="col-md-12">
                    <div class="form-group col-md-3" >    
                        <label for="Nombre">FECHA DESDE </label>                      
                        <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeDeuda" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-3" >    
                        <label for="Nombre">FECHA HASTA</label>                      
                        <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaDeuda" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-2" >    
                      <label for="Nombre" >&nbsp;</label> 
                      <button type="submit" id="BuscarDeudas" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                    </div>
                     <div class="form-group col-md-2" >    
                      <label for="Nombre" >&nbsp;</label> 
                      <button type="submit" id="ImprimirDeudas" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR (F2)</button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <div class="x_panel">
                        <div style="" id="BuscadorComplejo">
                          <div class="form-group col-md-4">
                            <input type="text" class="form-control filtroPacientes" id="numeroDeudas" autocomplete="off" name="001-001-00000000" placeholder="Numero">
                          </div>
                          <div class="form-group col-md-8">
                            <input type="text" class="form-control filtroPacientes" id="nombreDeudas" autocomplete="off" name="CÉDULA" placeholder="Persona">
                          </div>
                        </div>
                        <div id="DivTablaDeudores" style="" class="x_content" style="height: 500px;max-height: 500px;overflow-y: auto;">  
                          <table id="datatableMovimientoCxC" width="100%" class="table table-striped table-bordered table-condensed nowrap">  
                            <thead>                      
                              <tr>
                                <th style="text-align: center;">COMPROBANTE</th>
                                <th style="text-align: center;">EMISION</th>
                                <th style="text-align: center;">PERSONA</th>
                                <th style="text-align: center;">VALOR</th>
                                <th style="text-align: center;">ID CLIENTE</th>
                                <th style="text-align: center;">ID CONSULTA</th>
                              </tr>
                            </thead>
                            <tbody class="pointer tablaPerfil">
                             
                            </tbody>                  
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="servicios">
              <div class="box box-primary">
                <div class="box-body">
                  <div class="col-md-12">
                    
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

<!--<script src="Lib/web/viewer.js"></script>-->
<script src="Lib/moment.js"></script>
<script src="js/Js_MovCxC.js?v=1.0"></script>