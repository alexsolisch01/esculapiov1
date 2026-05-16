<div class="col-md-12">
    <div class="nav-tabs-custom">
      <ul class="nav nav-tabs">        
        <li class="active"><a href="#tab_2" data-toggle="tab">CONSULTAS DE MORBILIDAD Y PREVENCIÓN DE ESTOMATOLOGÍA Y/U ODONTOLOGÍA</a></li>
        <li><a href="#tab_1" data-toggle="tab">ACTIVIDADES DE ESTOMATOLOGÍA Y/U ODONTOLOGÍA</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane" id="tab_1">
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
                    
                    <div class="form-group col-md-2">
                          <label for="Nombre">TIPO DE SERVICIO</label>
                            <select id="TipoServicio" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                              <option value="13">ESTOMATOLOGÍA</option>
                            </select>
                    </div> 

                    <div class="form-group col-md-2">
                          <label for="Nombre">GRUPO ESTADÍSTICO</label>
                          <select id="GrupoEstadistico" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="7">ODONTOLOGO</option>                             
                          </select>
                    </div> 

                    <div class="form-group col-md-2">
                          <label for="Especialidad">ESPECIALIDAD</label>
                            <select id="Especialidad" name="Especialidad" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                              <option value="0">TODAS..</option>
                              
                            </select>
                    </div>

                    <div class="form-group col-md-2">
                          <label for="Nombre">TIPO DE DIAGNOSTICO</label>
                            <select id="TipoDiagnostico" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                              <option value="0">TODAS..</option>
                              <option value="MORBILIDAD">MORBILIDAD</option>
                              <option value="PREVENCION-GENERAL">PREVENCION-GENERAL</option>                              
                            </select>
                    </div>

                    <div class="col-md-3" >
                          <label for="Nombre">ACTIVIDADES</label>
                          <select id="cbmProcedimiento" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                            
                          </select>
                    </div>

                    <div class="form-group col-md-2" >    
                        <br>
                        <button type="submit" id="ConsultarReporte" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR</button>
                    </div>   
                    <div class="form-group col-md-2" >    
                        <br>
                        <button type="submit" id="ExportarrReporte" class="btn btn-warning"><i class="fa fa-file" aria-hidden="true"></i> EXPORTAR A EXCEL</button>
                    </div>                                     
                </div>

                <div class="col-md-12" id="cuerpoReporte">
                  
                </div>
            </div>
        </div>
        <div class="tab-pane active" id="tab_2">
          <div class="row">
              <div class="col-md-12">
                    <div class="form-group col-md-2" >    
                        <label for="Nombre">FECHA DESDE </label>                      
                        <input class="form-control input-sm" type="date" id="fechaDesde2" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-2" >    
                         <label for="Nombre">FECHA HASTA</label>                      
                        <input class="form-control input-sm" type="date" id="fechaHasta2" value="<?php echo date("Y-m-d");?>">
                    </div>
                    
                    <div class="form-group col-md-2">
                          <label for="Nombre">TIPO DE SERVICIO</label>
                            <select id="TipoServicio2" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                              <option value="13">ESTOMATOLOGÍA</option>
                            </select>
                    </div> 

                    <div class="form-group col-md-2">
                          <label for="Nombre">GRUPO ESTADÍSTICO</label>
                          <select id="GrupoEstadistico2" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="7">ODONTOLOGO</option>                             
                          </select>
                    </div> 

                    <div class="form-group col-md-2">
                          <label for="Especialidad">ESPECIALIDAD</label>
                            <select id="Especialidad2" name="Especialidad" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                              <option value="0">TODAS..</option>
                              
                            </select>
                    </div>

                    <div class="form-group col-md-2">
                          <label for="Nombre">TIPO DE DIAGNOSTICO</label>
                            <select id="TipoDiagnostico2" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                              <option value="0">TODAS..</option>
                              <option value="MORBILIDAD">MORBILIDAD</option>
                              <option value="PREVENCION-GENERAL">PREVENCION-GENERAL</option>                              
                            </select>
                    </div>

                    <div class="form-group col-md-2">
                          <label for="Nombre">CLASE DE DIAGNOSTICO</label>
                            <select id="ClaseDiagnostico2" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                              <option value="0">TODOS..</option>
                              <option value="PRIMERA">PRIMERA</option>
                              <option value="SUBSECUENTE">SUBSECUENTE</option>                              
                            </select>
                    </div>

                    
                    <div class="col-md-2 form-group ">
                        <label for="Nombre">GRUPO DE EDAD</label>
                        <select id="cbmGrupoEdad2" class="selectpicker show-tick form-control" data-live-search="true">
                              <option value="0" min="-1" max="-1">Todas</option>
                              <option value="1" min="0" max="1">Menos de 1 mes</option>
                              <option value="2" min="2" max="11">1 a 11 meses</option>
                              <option value="3" min="12" max="48">1 a 4 años</option>
                              <option value="4" min="49" max="108">5 a 9 años</option>
                              <option value="5" min="109" max="168">10 a 14 años</option>
                              <option value="6" min="169" max="228">15 a 19 años</option>
                              <option value="7" min="229" max="420">20 a 35 años</option>
                              <option value="8" min="421" max="588">36 a 49 años</option>
                              <option value="9" min="589" max="768">50 a 64 años</option>
                              <option value="10" min="769" max="99999">65 y mas años</option>
                              <option value="11" min="null" max="null">Edad no especificada</option>
                        </select>                                                  
                    </div>

                    <div class="form-group col-md-2" >    
                        <br>
                        <button type="submit" id="ConsultarReporte2" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR</button>
                    </div>   
                    <div class="form-group col-md-2" >    
                        <br>
                        <button type="submit" id="ExportarrReporte2" class="btn btn-warning"><i class="fa fa-file" aria-hidden="true"></i> EXPORTAR A EXCEL</button>
                    </div>                                     
                </div>

                <div class="col-md-12" id="cuerpoReporte2">
                  
                </div>
            </div>
        </div>

      </div>
    <!-- /.tab-content -->
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
<script src="js/Js_ReporteOdontologia.js?v=1.7"></script>