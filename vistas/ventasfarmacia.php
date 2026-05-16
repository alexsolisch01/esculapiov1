<div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">VENTAS DE FARMACIA</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <div class="row">
              <div class="col-md-12">
                      <div class="col-md-3" >    
                          <label for="Nombre">FECHA DESDE </label>                      
                          <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeVIF" value="<?php echo date("Y-m-d");?>">
                      </div>
                      <div class="col-md-3" >    
                          <label for="Nombre">FECHA HASTA</label>                      
                          <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaVFF" value="<?php echo date("Y-m-d");?>">
                      </div>

                      

                      <div class="col-md-2" >    
                          <label for="Nombre" style="color: white;">----</label> 
                          <button type="submit" id="CagarReporteVentasFarmacia" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR</button>

                      </div>
                      <div class="col-md-2" >    
                        <label for="Nombre" style="color: white;">----</label> 
                        <button type="submit" id="ImprimirReporteFarmacia" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR (F2)</button>
                    </div>

                    <div class="col-md-12">                      
                          <table id="datatableVentasFarmacia"  width="100%" cellspacing="0" class="table nowrap table-condensed">
                              <thead>
                                <tr>                                           
                                  <th >Fecha</th>                                                                             
                                  <th >Costo</th> 
                                  <th >Sub Total</th>
                                  <th >Desc</th>
                                  <th >Base 12</th>
                                  <th >Iva</th>
                                  <th >Base 0</th>
                                  <th >T Comp</th>
                                  <th >Utilidad</th>
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
                                  <th ></th>                                                                             
                                  <th id="totalCosto">$ 0.0</th> 
                                  <th id="totalSubtotal">$ 0.0 </th>
                                  <th id="totalDescuento">$ 0.0</th>
                                  <th id="totalBase12">$ 0.0 </th>
                                  <th id="totalIva">$ 0.0</th>
                                  <th id="totalBase0">$ 0.0 </th>
                                  <th id="totalVentas">$ 0.0</th>
                                  <th id="totalUtilidad">$ 0.0</th>
                                </tr>
                            </tfoot>
                          </table>
                    </div>
              </div>
              
            </div>
          </div>
</div>          
<script src="js/Js_Ventas.js?v=1.2"></script>              