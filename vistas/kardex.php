<!-- /.col -->
<div class="col-md-12 ">
  <div class="box box-primary box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">Kardex</h3>
        <div class="box-tools pull-right">
          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
          </button>
        </div>
    </div>
            <!-- /.box-header -->
    <div class="box-body">
        
       <div class="col-md-12" >
        
        <div class="form-group col-md-5">
            <label for="Nombre">INVENTARIO </label>
            <input type="text" class="form-control input-sm" autocomplete="off" id="NombreInventario" name="INVENTARIO">
        </div>              
        <div class="form-group col-md-2" >    
            <label for="Nombre">DESDE </label>                      
             <input class="form-control input-sm" type="date" autocomplete="off" id="fecha_Desde" value="<?php echo date("Y-m-d");?>">
        </div>
        <div class="form-group col-md-2" >    
            <label for="Nombre">HASTA</label>                      
            <input class="form-control input-sm" autocomplete="off" type="date" id="fecha_Hasta" value="<?php echo date("Y-m-d");?>">
        </div>
                      
        <div class="form-group col-md-1">    
            <label for="Nombre" style="color: white;">----</label> 
            <button type="button" id="Consultarkardex" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i>(F1)</button>
        </div>
        <div class="form-group col-md-1">    
            <label for="Nombre" style="color: white;">----</label> 
            <button type="button" id="Imprimirkardex" class="btn btn-success"><i class="fa fa-print" aria-hidden="true"></i>(F2)</button>
        </div>
        <div class="col-md-5" id="VerProductosKardexPadre" style="margin-top: -1.3em;height: 200px;max-height: 250px; overflow-y: auto;overflow-x: hidden;" >
                     
              <div id="VerProductosKardex">
                
              </div>
        </div>
      </div>
      <div class="col-md-12" >
        <div class="box box-primary">                
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
              <h4 id="producto">---</h4>            
                <div class="x_content" id="contenerdorTabla">                           
                  <table id="datatableDetallekardex" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                      <tr>                                              
                        <th rowspan="2" class="text-center">FECHA</th>
                        <th rowspan="2" class="text-center">CONCEPTO</th>
                        <th rowspan="2" class="text-center">NUMERO</th>                       
                        <th colspan="3" class="text-center btn-warning">ENTRADAS</th>
                        <th colspan="3" class="text-center btn-info">SALIDAS</th>
                        <th colspan="3" class="text-center btn-success">SALDOS</th>
                      </tr>
                      <tr>
                        <th class="btn-warning">CANTIDAD</th>
                        <th class="btn-warning">PRECIO</th>
                        <th class="btn-warning">TOTAL</th>
                        <th class="btn-info">CANTIDAD</th>                            
                        <th class="btn-info">PRECIO</th>
                        <th class="btn-info">TOTAL</th>
                        <th class="btn-success">CANTIDAD</th>                            
                        <th class="btn-success">PRECIO</th>
                        <th class="btn-success">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody >
                                                                                             
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





<div class="modal  fade" id="modal-bdkardex" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="probar">CONSULTA </h4>
      </div>
      <div class="modal-body" id="modalCargarMovimiento">
        <div class="box box-primary" id="consultamovimientotab">
                  <div class="box-header with-border">
                    <h3 class="box-title">INGRESOS Y EGRESOS</h3>
                  </div>                    
                  <div class="box-body" >
                    <div class="col-md-12">
                      <div class="form-group col-md-2">
                        <label for="Nombre"># FACTURA</label>
                        <input type="text" required class="form-control input-sm" id="NumeroFactMovi" name="nombreCome" placeholder="001-0001-0001">
                      </div>
                      <div class="form-group col-md-2">
                        <label for="Nombre">BODEGAS </label>
                        <select id="bodegaMovi"  name="instruccion" class="form-control input-sm" >
                          <?php
                            $TipoServicio = new Con_Bodega();
                            $TipoServicio->LlenarComboBodega();
                          ?>
                        </select>
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">PROVEEDORES</label>
                        <select id="proveMovi"  name="instruccion" class="form-control input-sm">
                          <option value="0">Seleccionar..</option>
                          <?php
                            $TipoServicio = new Con_Bodega();
                            $TipoServicio->LlenarComboProveedor();
                          ?>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label for="Nombre">TIPO DE MOVIMIENTO</label>
                        <select id="movimiento"  name="movimiento" class="form-control input-sm">
                          <option value="SELECCIONAR">SELECCIONAR</option>
                          <option value="INGRESO">INGRESO</option>
                          <option value="EGRESO">EGRESO</option>
                        </select>
                      </div>  
                    </div>
                    <div class="col-md-12">                       
                      <div class="form-group col-md-3">
                        <label for="Nombre">MOTIVO</label>
                        <select id="tipoMovi"  name="instruccion" class="form-control input-sm">
                          <option value="0">Seleccionar..</option>
                               <?php
                                $TipoServicio = new Con_Bodega();
                                $TipoServicio->LlenarComboTipoMotivo();
                              ?>
                        </select>
                      </div>
                      <div class="form-group col-md-3" >    
                        <label for="Nombre">FECHA</label>                      
                        <input class="form-control input-sm" type="date" id="fechaMovi" value="<?php echo date("Y-m-d");?>">
                        <label style="display: none;" class="form-control input-sm" id="HoraMovi"> <?php echo date("H:i:s");?></label>
                      </div>
                      <div class="form-group col-md-6" > 
                        <label style="display: none;" id="nombreEsta" nombreEstablecimiento="<?php echo $_SESSION['nombreComercial'] ?>" >OBSERVACIONES: </label>
                        <label style="display: none;" id="nombreUsuario" nombreUsuario="<?php echo $_SESSION['usuario'] ?>" >OBSERVACIONES: </label>                       
                        <label for="OBSERVACIONES">OBSERVACIONES: </label>
                        <textarea rows="3" id="textAreaMovi" class="form-control input-sm" name="OBSERVACIONES" style="resize: none;"></textarea>
                      </div>
                    </div>
                  </div> 
                  <div class="col-md-12" >
                    <div class="box box-primary">                
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <div class="x_panel">                          
                            <div class="x_content">                           
                              <table id="datatableDetalleFactFarmacia2" class="table table-striped table-bordered">
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>ITEM</th>
                                    <th>PRESENTACION</th>
                                    <th>CANTIDAD</th>
                                    <th>PRECIO</th>
                                    <th>PVP CAJA</th>
                                    <th>SUBTOTAL</th>
                                    <th>IVA</th>
                                    <th>DESCUENTO</th>                            
                                    <th>TOTAL</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody class="pointer">
                                                                                                         
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="box-footer">
                    <div class="pull-right">        
                      <label style ="margin-left:2em;">SUBTOTAL : <span style="font-weight: bold; font-size: 16px;" id="subtotal" >------</span></label> 
                      <label style ="margin-left:2em;">DESCUENTO : <span style="font-weight: bold; font-size: 16px;" id="descuento" >------</span></label> 
                      <label style ="margin-left:2em;">IVA : <span style="font-weight: bold; font-size: 16px;" id="iva" >------</span></label><label style ="margin-left:2em;">TOTAL : <span style="font-weight: bold; font-size: 16px;" id="total" >------</span></label> 
                    </div>
                  </div>
                </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>






                             




<!--<script src="js/Js_movimiento.js"></script>-->
<script src="js/Js_Kardex.js?v=1.0"></script>


