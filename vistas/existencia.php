<div class="col-md-12" style="margin-top: 1em;">
  <div class="box box-primary box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">EXISTENCIAS</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="box-body ">

        <div class="col-md-12">
          
          <div class="form-group col-md-3" >    
              <label for="Nombre">BODEGA</label>                      
              <select id="bodega"  name="instruccion" class="form-control input-sm" >
                        <?php
                          $TipoServicio = new Con_Bodega();
                          $TipoServicio->LlenarComboBodega();
                        ?>
              </select>
           </div>

           <div class="form-group col-md-3" >    
              <label for="Nombre">TIPO DE INFORME</label>                      
              <select id="cbmTipo"  name="instruccion" class="form-control input-sm" >
                       <option>RESUMIDO</option>
                       <option>DETALLADO</option>
              </select>
           </div>

           <div class="form-group col-md-3" >    
              <label for="Nombre">FECHA</label>                      
              <input class="form-control input-sm" autocomplete="off" type="date" id="FechaDesde" value="<?php echo date("Y-m-d");?>">
           </div>

          <div class="form-group col-md-2" >    
              <label for="Nombre" style="color: white;">----</label> 
              <button type="submit" id="CargarInforme" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
          </div>

          <div class="form-group col-md-2" >    
              <label for="Nombre" style="color: white;">----</label> 
              <button type="submit" id="ImprimirInforme" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR (F10)</button>
          </div>

          <div class="form-group col-md-2" >    
              <label for="Nombre" style="color: white;">----</label> 
              <button type="submit" id="ExportarExcel" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true"></i> EXPORTAR A EXCEL</button>
          </div>

      </div>    

      <div class="col-md-12" id="Resumido" style="display: none;">
        <table width="100%" id="" style="font-size: 14px !important;" >
                  <thead>
                    <tr style="font-size: 14px !important;margin:0.5em; border-bottom: 1px solid black;">                                          
                      <th>TOTAL NUMERO INVENTARIO</th>                        
                      <th>TOTAL STOCK INVENTARIO</th> 
                      <th style="text-align: right">COSTO TOTAL</th>                        
                    </tr>
                  </thead>
                  <tbody class="pointer" id="cuerpoExistenciaResumido">
                      
                  </tbody>                  
                </table>
        
      </div>  
      <div class="col-md-12" id="Tabla" style="display: none;">
            
            
                <table id="TablaExportar" width="100%" id="" style="font-size: 14px !important;" >
                  <thead>
                    <tr style="font-size: 14px !important;margin:0.5em; border-bottom: 1px solid black;">                                          
                      <th>PRODUCTO</th>                        
                      <th>PRESENTACION</th>      
                      <th style="text-align: right">IVA</th>                  
                      <th style="text-align: right">PERCHA</th>
                      <th style="text-align: right">COSTO</th>                         
                      <th style="text-align: right">STOCK</th>
                      <th style="text-align: right">STOCK CAJERO</th> 
                      <th style="text-align: right">COSTO TOTAL</th>                        
                      <th style="text-align: right">Fracciones</th>
                      <th style="text-align: right">Precio</th>
                      <th style="text-align: right">Cant1</th>
                      <th style="text-align: right">Cant2</th>
                      <th style="text-align: right">Precio Caja</th>
                    </tr>
                  </thead>
                  <tbody class="pointer" id="cuerpoExistencia">
                    
                  </tbody>                  
                </table>
              <label id="TotalInventario">TOTAL DEL INVENTARIO $ 0.0 </label>
        </div>

        <div class="col-md-12">
          <table id="TablaExportar2" class="table" width="100%" id="" style="font-size: 14px !important;" >
                  <thead>
                    <tr style="font-size: 14px !important;margin:0.5em; border-bottom: 1px solid black;">                                          
                      <th>PRODUCTO</th>                        
                      <th>PRESENTACION</th>      
                      <th style="text-align: right">IVA</th>                  
                      <th style="text-align: right">PERCHA</th>
                      <th style="text-align: right">COSTO</th>                         
                      <th style="text-align: right">STOCK</th>
                      <th style="text-align: right">STOCK CAJERO</th> 
                      <th style="text-align: right">COSTO TOTAL</th>                        
                      <th style="text-align: right">Fracciones</th>
                      <th style="text-align: right">Precio</th>
                      <th style="text-align: right">Cant1</th>
                      <th style="text-align: right">Cant2</th>
                    </tr>
                  </thead>
                  <tbody class="pointer" id="cuerpoExistencia">
                    
                  </tbody>                  
                </table>
        </div>       
    </div>
   </div>
</div>


<script src="Lib/node_modules2\file-saver\src/FileSaver.js"></script>
<script src="Lib/node_modules/xlsx/dist/xlsx.full.min.js"></script>
<script src="js/Js_Existencias.js?v=1.2"></script>
