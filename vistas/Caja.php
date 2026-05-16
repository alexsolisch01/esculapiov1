<div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">REPORTE DE CAJA</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <div class="row">
              <div class="col-md-12">
                              <div class="form-group col-md-2" >    
                                  <label for="Nombre">FECHA  I</label>                      
                                  <input class="form-control input-sm" type="date" id="fechaDesdeI" value="<?php echo date("Y-m-d");?>">
                              </div>

                              <div class="form-group col-md-2" >    
                                  <label for="Nombre">FECHA  F</label>                      
                                  <input class="form-control input-sm" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d");?>">
                              </div>
                              

                              <div class="form-group col-md-3" >    
                                  <label for="Nombre">TIPO DE INFORME</label>                      
                                  <select id="cbmFiltro"  name="instruccion" class="form-control input-sm">                        
                                    <option value="R">RESUMIDO</option>
                                    <option value="D">DETALLADO</option>
                                    
                                  </select>
                              </div>

                              <div class="form-group col-md-2" >    
                                  <label for="Nombre" style="color: white;">----</label> 
                                  <button type="submit" id="CargarInforme" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                              </div>

                              <div class="form-group col-md-2" >    
                                  <label for="Nombre" style="color: white;">----</label> 
                                  <button type="submit" id="ImprimirInforme" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR (F10)</button>
                              </div>

                              <div class="col-md-12" id="Cajeros">
                              
                                                            
                              </div>
              </div>
            </div>
          </div>
</div>          
<script src="js/Js_Caja.js?=1.1"></script>