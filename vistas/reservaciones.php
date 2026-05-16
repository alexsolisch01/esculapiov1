<div class="col-md-12" >
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">REPORTE DE RESERVACIONES</h3>
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
                <label for="Nombre">FECHA HASTA </label>                      
                <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHasta" value="<?php echo date("Y-m-d");?>">
           </div>
           <div class="form-group col-md-2">
             <br>
              <button id="CargarReporte" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR</button>
           </div>
          
      </div>    

      <div class="col-md-12"  >
        <table width="100%" id="TablaReporte" class="table table-striped table-bordered nowrap" >
          <thead>
            <tr>
              <th>PACIENTE</th>
              <th>TELEFONO</th>
              <th>FECHA</th> 
              <th>ESPECIALIDAD</th>
              <th>PROCEDIMIENTO</th>
              <th>MEDICO</th>
              <th>CONFIRMADA</th>
              <th>CANCELADA</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>          
        </table>              
        </div>       
    </div>
   </div>
</div>
<script src="js/Js_Rreservaciones.js?v=1.0"></script>