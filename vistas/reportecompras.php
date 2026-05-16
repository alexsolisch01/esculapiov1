

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
                      <div class="form-group col-md-3">
                          <label for="Nombre">PROVEEDORES</label>
                          <select id="proveMovi"  name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar</option>
                          </select>
                      </div>
                      <div class="form-group col-md-3">
                          <label for="Nombre">INVENTARIO</label>
                          <select id="proveInve"  name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar</option>
                            <?php
                              $espe = new Con_Empleado();
                              $espe->LlenarComboInventario();
                            ?>
                          </select>
                      </div>
                      <div class="form-group col-md-2">
                          <label for="Nombre">TIPO</label>
                          <select id="tipoDatos"  name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">RESUMIDO</option>
                            <option value="1">DETALLADO</option>
                          </select>
                      </div>
                      <div class="form-group col-md-1 pull-right" >    
                        <button type="submit" id="ImprimirReporteCompra" style="margin-top: 20px; margin-left: -40px;" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR (F2)</button>
                    </div>
                      <div class="form-group col-md-2 pull-right" >    
                          <button type="submit" id="CagarReporteCompras" style="margin-top: 20px;" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR</button>

                      </div>
                      

                  </div>
                  <div class="col-md-12">                              
                    <div class="x_content">
                      <div style="margin-top: 8em; margin-left: 26em; display: none;" id="loaderPacientes" class="loader"></div>
                      <table id="datatableReporteCompras"  width="100%" class="table table-striped table-bordered">
                        <thead>
                          <tr>                                           
                            <th>FECHA</th> 
                            <th>INVENTARIO</th> 
                            <th>PRESENTACION</th>
                            <th>CANT. COMPRADA</th>
                            <th>COSTO</th>
                            <th>CANT. ACTUAL</th>
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
                            <th id="totalCantidadComprada">$ 0.00</th> 
                            <th id="totalCosto">$ 0.00 </th>
                            <th id="totalCantidadActual">$ 0.00</th>
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


<script src="js/Js_ReporteCompras.js?v=1.0"></script>              