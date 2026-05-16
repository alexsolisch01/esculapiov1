<div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">FISIOTERAPIA</h3>
            </div>
            <div class="row">
              <div class="col-md-12">
                    <div class="form-group col-md-2" >    
                        <label for="Nombre">FECHA DESDE </label>                      
                        <input class="form-control input-sm" type="date" id="fechaDesde" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-2" >    
                         <label for="Nombre">FECHA HASTA</label>                      
                        <input class="form-control input-sm" type="date" id="fechaHasta" value="<?php echo date("Y-m-d");?>">
                    </div>
                    

                    <div class="form-group col-md-2" >    
                        <br>
                        <button type="submit" id="ConsultarReporte" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i>CONSULTAR</button>
                    </div>
                    <div class="form-group col-md-2" >    
                        <br>
                        <button type="submit" id="ExportarrReporte" class="btn btn-warning"><i class="fa fa-file" aria-hidden="true"></i>EXPORTAR A EXCEL</button>
                    </div>                    
                </div>
                <div class="col-md-12" id="cuerpoReporte">
                  
                </div>
            </div>
          </div>
</div> 

<div class="modal fade"  id="modal-cargando" tabindex="-1"
    role="dialog" aria-hidden="true" data-keyboard="false" data-backdrop="static" >
    <div class="modal-dialog modal-sm" >
        <div class="modal-content" style="background:rgba(0,0,0,0);">              
            <div class="modal-body" aria-hidden="true">
              <div class="col-md-12" >
                  <div class="box box-primary box-solid">
                    <div class="box-header">
                      <h3 class="box-title">Generando Reporte..</h3>
                    </div>
                    <div class="box-body" >                    
                    </div>
                    <div class="overlay">
                      <i class="fa fa-refresh fa-spin"></i>
                    </div>
                  </div>
                </div>  
            </div>            
        </div>
    </div>
</div>
<script src="Lib/node_modules2\file-saver\src/FileSaver.js"></script>
<script src="Lib/node_modules/xlsx/dist/xlsx.full.min.js"></script>
<script src="js/Js_ReporteFisioterapia.js?v=0.2"></script>