<div class="col-md-12" style="margin-top: 1em;">
  <div class="box box-default box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">CONSULTAS PENDIENTES</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="box-body ">

        <div class="col-md-12">
          
          <div class="form-group col-md-2">    
              <label for="Nombre">SERVICIOS</label>                      
              <select id="cbmServico"  name="instruccion" class="form-control input-sm" >                  
                  <option value="0">Seleccionar..</option>
                  <option value="1">CONSULTA EXTERNA</option>
                  <option value="2">ESTOMATOLOGIA</option>
                  <option value="3">SERVICIOS MEDICOS</option>
                  <option value="4">LABORATORIO</option>
                  <option value="5">RX</option>
                  <option value="6">ECO</option>
                  <option value="7">TAC/RMN</option>
              </select>
           </div>

           <div class="form-group col-md-2">    
              <label for="Nombre">ESPECIALIDAD</label>                      
              <select id="cbmEspecialidad"  name="instruccion" class="form-control input-sm" >
                  <option value="0">Seleccionar..</option>
                  
              </select>
           </div>

           <div class="form-group col-md-2" id="ComboMedico">
              <label for="Nombre">MEDICOS</label>
                <select id="cbmMedico" name="cbmMEDICO" class="form-control input-sm" >  
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
              <br>
              <button type="submit" id="CargarInforme" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
          </div>

          <div class="form-group col-md-2" >    
              <br>
              <button type="submit" id="ImprimirInforme" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR (F10)</button>
          </div>

      </div>    

      <div class="col-md-12" id="Tabla" style="max-height: 500px; overflow-y: auto;">
            
            
                <table width="100%" id="datatableConsultasPendientes" style="font-size: 12px !important;" class="table table-striped table-bordered nowrap" >
                  <thead>
                    <tr style="font-size: 12px !important;margin:0.5em;">                                          
                      <th>FECHA</th> 
                      <th>N FACTURA</th>   
                      <th>PACIENTE</th>
                      <th>TELEFONO</th>
                      <th>DIRECCIÓN</th>                        
                      <th>DOCTOR RESPONSABLE</th>                                              
                      <th>SERVICIO</th>                         
                      <th>TOTAL</th>                       
                      <th>TURNO</th>
                      <th>ESTADO</th>
                      <th>ACCIONES</th>                       
                    </tr>
                  </thead>
                  <tbody class="pointer" id="cuerpoConsulta">
                    
                  </tbody>                  
                </table>
              <label id="TotalConsultas">MONTO TOTAL $ 0.0 </label>
        </div>       
    </div>
   </div>
</div>
<script src="js/Js_ConsultasPendientes.js?v=1.1"></script>