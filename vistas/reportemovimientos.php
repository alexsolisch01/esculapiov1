

<div class="col-md-12" style="margin-top: 1em;">
  <div class="box box-primary box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">REPORTE COMPRAS</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
      </div>
    </div>
    
    <div class="box-body">
              
                  <div class="col-md-12">
                      <div class="form-group col-md-2" >    
                          <label for="Nombre">FECHA DESDE </label>                      
                          <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesde" value="<?php echo date("Y-m-d");?>">
                      </div>
                      <div class="form-group col-md-2" >    
                          <label for="Nombre">FECHA HASTA</label>                      
                          <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHasta" value="<?php echo date("Y-m-d");?>">
                      </div>
                      <div class="form-group col-md-2">
                          <label for="Nombre">TIPO</label>
                         <select id="movimientoC" required  name="movimiento" class="form-control input-sm">
                          <option value="SELECCIONAR">SELECCIONAR</option>
                          <option value="INGRESO">INGRESO</option>
                          <option value="EGRESO">EGRESO</option>
                        </select>
                      </div>
                      <div class="form-group col-md-3">
                          <label for="Nombre">MOTIVO</label>
                          <select id="tipoMoviC" required  name="instruccion" class="form-control input-sm">
                          <option value="0">SELECCIONAR</option>
                               <?php
                                $TipoServicio = new Con_Bodega();
                                $TipoServicio->LlenarComboTipoMotivo();
                              ?>
                        </select>
                      </div>
                      <div class="form-group col-md-2" >    
                          <button type="submit" id="CagarReporteMovimientos" style="margin-top: 20px;" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR</button>
                      </div>
                      <div class="form-group col-md-1" >    
                        <button type="submit" id="ImprimirReporteMovimientos" style="margin-top: 20px; margin-left: -40px;" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR (F2)</button>
                    </div>
                  </div>
                  <div class="col-md-12">                              
                    <div class="x_content">
                      <div style="margin-top: 8em; margin-left: 26em; display: none;" id="loaderPacientes" class="loader"></div>
                      <table id="datatableReporteMovimiento" class="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>FACTURA</th>
                            <th>PROVEEDOR</th>
                            <th>TIPO MOVIMIENTO</th>
                            <th>FECHA</th>
                            <th>VALOR</th>
                            <th>ID</th>
                          </tr>
                        </thead>
                        <tbody class="pointer tablaPerfil">
                          <?php
                            /*$espe = new Con_Bodega();
                            $espe->CargarInventario2();*/
                          ?>
                        </tbody>
                        <tfoot id="pieTabla">
                          <tr>
                            <th></th>
                            <th></th>
                            <th></th>                                                               
                            <th></th> 
                            <th id="totalCosto">$ 0.00 </th>
                            <th></th>
                          </tr>
                      </tfoot>                   
                      </table>

                      
                    </div>
                  </div>
                  
                </div>

   </div>
   <div class="col-md-12">
  <div class="col-md-3" style="display: none; left: 0;" id="LogoImagen"><img style="margin-left: -110px;" src="imagenes/LOGO.png" width="100" height="80" ></div>
  <div class="col-md-6" style="display: none; margin-left: 100px; left: 50;" id="LogoImagen2">
    <center>
    <div class="" style="text-align: center; line-height: 12px; font-size: 12px; margin-left: 100px;">
      <label style="font-size: 16px;">Laboratorio Clínico</label><br>
      <label style="color: #000000;">Horario de atención:<span style="color: #000000;"> Lunes a Sábado de 08H00 am a 16H00 pm</span><br>
        <span>Calle Sucre entre 24 de Mayo y 31 de Octubre</span><br>
          Telfs.: 2024521 / 0991086017<br>
          Samborondón- Ecuador</label>
    </div>
    </center>
  </div>
  <div class="pull-right col-md-3" style="display: none;" id="LogoImagen3"><img class="pull-right" src="imagenes/LogoArquidiosis.jpg" width="130" height="50" ></div>
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



<script src="js/Js_ReporteMovimiento.js"></script>              