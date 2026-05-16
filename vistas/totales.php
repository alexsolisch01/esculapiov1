<div class="col-md-12" >
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">REPORTE DE ATENCIONES</h3>
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
            
            
                <table width="100%" id="TablaReporte" class="table table-striped table-bordered" >
                  <thead>
                    <tr>                                          
                      <th>SERVICIO</th> 
                      <th>ESPECIALIDAD</th> 
                      <th>TOTAL PACIENTES</th>   
                      <th>TOTAL $</th>                      
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                  <tfoot>
                    <tr>                                          
                      <th></th> 
                      <th></th> 
                      <th></th>   
                      <th></th>                      
                    </tr>
                  </tfoot>                  
                </table>              
        </div>       
    </div>
   </div>
</div>
<script src="js/Js_ReporteAtenciones.js?v=1.0"></script>