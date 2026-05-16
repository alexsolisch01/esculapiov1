<div class="col-md-12">
  <div class="box box-primary box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">VENTAS</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="box-body ">

        <div class="col-md-12">
          
          <div class="form-group col-md-3" >    
              <label for="Nombre">TIPO</label>                      
              <select id="cbmServico"  name="instruccion" class="form-control input-sm" >
                  <option value="3">TODOS</option>
                  <option value="1">CONSULTAS</option>
                  <option value="2">FARMACIA</option>                                    
              </select>
           </div>

           <div class="form-group col-md-2" >    
                <label for="Nombre">FECHA I </label>                      
                <input class="form-control input-sm" type="date" id="fechaDesdeI" value="<?php echo date("Y-m-d");?>">
           </div>

            <div class="form-group col-md-2" >    
                <label for="Nombre">FECHA F </label>                      
                <input class="form-control input-sm" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d");?>">
           </div>

          <div class="form-group col-md-2" >    
              <label for="Nombre" style="color: white;">----</label> 
              <button type="submit" id="CargarInforme" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
          </div>
          <div class="form-group col-md-2" >    
              <label for="Nombre" style="color: white;">----</label> 
              <button type="submit" id="ImprimirInformeImprimir" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR (F2)</button>
          </div>
      </div>    

      <div class="col-md-12" id="Tabla">
            
            
                <table id="TablaReporte" width="100%">
                  <thead>
                    <tr>                                                                
                      <th>CAJERO</th>                        
                      <th>VENTAS EFECTIVO</th>                                              
                      <th>VENTAS CREDITO</th> 
                      <th>DESCUENTO</th>                        
                      <th>TOTALES</th>
                      <th>NOTAS DE CREDITO</th>                                                            
                    </tr>
                  </thead>
                  <tbody class="pointer" id="cuerpoConsulta">
                    
                  </tbody>
                  <tfoot id="footer">
                    <tr>                                                                
                      <th></th>                        
                      <th>0.0</th>                                              
                      <th>0.0</th>                         
                      <th>0.0</th>
                      <th>0.0</th>
                      <th>0.0</th>                                                            
                    </tr>
                  </tfoot>                  
                </table>
              <label id="TotalConsultas">MONTO TOTAL GENERAL $ 0.0 </label>
        </div>       
    </div>
   </div>

</div>
<script src="js/Js_Ventas.js?v=1.1"></script>