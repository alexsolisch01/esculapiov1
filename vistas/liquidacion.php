<div class="col-md-12">
  <div class="box box-default box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">REPORTE DE LIQUIDACION</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="box-body ">

        <div class="col-md-12">
          
          <div class="form-group col-md-2">    
              <label for="Nombre">TIPO</label>                      
              <select id="cbmTipo"  name="instruccion" class="form-control input-sm" >                  
                  <option value="1">RESUMIDO</option>
                  <option value="2">DETALLADO</option>
              </select>
           </div>

          <div class="form-group col-md-2" >    
              <label for="Nombre">SERVICIOS</label>                      
              <select id="cbmServico"  name="instruccion" class="form-control input-sm" >                  
                  <option value="1">CONSULTA EXTERNA</option>
                  <option value="2">ESTOMATOLOGIA</option>
                  <option value="3">SERVICIOS MEDICOS</option>
                  <option value="4">LABORATORIO</option>
                  <option value="5">RX</option>
                  <option value="6">ECO</option>
                  <option value="7">TAC/RMN</option>
              </select>
           </div>

           <div class="form-group col-md-2" >    
              <label for="Nombre">ESPECIALIDAD</label>                      
              <select id="cbmEspecialidad"  name="instruccion" class="form-control input-sm" >
                  <option value="0">Todos..</option>
                  
              </select>
           </div>

           <div class="form-group col-md-2" id="ComboMedico">
              <label for="Nombre">MEDICOS</label>
                <select id="cbmMedico"  name="cbmMEDICO" class="form-control input-sm" >
                  <option value="0">Todos..</option>
                  
              </select>
            </div>

           <div class="form-group col-md-2" >    
                <label for="Nombre">FECHA DESDE </label>                      
                <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeI" value="<?php echo date("Y-m-d");?>">
           </div>

           <div class="form-group col-md-2" >    
                <label for="Nombre">FECHA HASTA </label>                      
                <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d");?>">
           </div>

          <div class="form-group col-md-2" >    
              <label for="Nombre" style="color: white;">----</label> 
              <button type="submit" id="CargarInforme" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
          </div>

          <div class="form-group col-md-2" >    
              <label for="Nombre" style="color: white;">----</label> 
              <button type="submit" id="ImprimirInforme" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR (F10)</button>
          </div>

      </div>    

      <div class="col-md-12" id="TablaResumido">
          <div style="margin-top: 16em;margin-left: 35em; display: none;" id="loaderPlantilla" class="loader"> </div>
                <table width="100%" id="tablaLiquidacion" >
                  <thead>
                    <tr>                                          
                      <th>MEDICO</th>
                      <th>ITEM</th>    
                      <th>TOTAL PACIENTES</th>
                      <th>ATENDIDOS</th>                        
                      <th>NO ATENDIDOS</th>                                              
                      <th>TOTAL</th>                         
                      <th>%</th>
                      <th>MEDICO</th>
                      <th>INSTITUCION</th>
                    </tr>
                  </thead>
                  <tbody class="pointer" id="cuerpoConsulta">
                    
                  </tbody>                 
                </table>                
        </div>
        <div class="col-md-12" id="TablaDetallado" style="display: none;">
          <div style="margin-top: 16em;margin-left: 35em; display: none;" id="loaderPlantilla2" class="loader"> </div>
          <table width="100%" id="tablaLiquidacionDetallado" >
                  <thead>
                    <tr>                                          
                      <th>ESPECIALIDAD</th>
                      <th>MEDICO</th>    
                      <th>FACTURA</th>
                      <th>FECHA</th>
                      <th>PACIENTE</th>                        
                      <th>PROCEDIMIENTO</th>                                              
                      <th>PRECIO</th>                         
                      <th>%</th>
                      <th>MEDICO</th>
                      <th>INSTITUCION</th>
                    </tr>
                  </thead>
                  <tbody class="pointer" id="cuerpoConsulta">
                    
                  </tbody>                 
                </table>              
        </div>       
    </div>
   </div>
</div>
<script src="js/Js_Liquidacion.js?v=1.3"></script>