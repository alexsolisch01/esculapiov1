      <div class="col-md-12">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab_1" data-toggle="tab">NC CONSULTA</a></li>
              <li><a href="#tab_2" data-toggle="tab">NC FARMACIA</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tab_1">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group col-md-2" >    
                        <label for="Nombre">FECHA DESDE </label>                      
                        <input class="form-control input-sm" type="date" id="fechaDesdeC" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-2" >    
                         <label for="Nombre">FECHA HASTA</label>                      
                        <input class="form-control input-sm" type="date" id="fechaHastaC" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-2" >    
                        <br>
                        <button type="submit" id="BuscarNCC" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i>CONSULTAR</button>
                    </div>                    
                  </div>
                  <div class="col-md-12">
                    <table id="datatableNotaCredito"  width="100%" class="table nowrap table-striped table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th>NUMERO NC</th>
                          <th>NUMERO FC</th>
                          <th>PACIENTE</th>
                          <th>CLIENTE</th>
                          <th>FECHA</th> 
                          <th>VALOR</th>
                          <th></th>
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
                          <th></th> 
                          <th>$ 0.00</th>
                          <th></th>
                        </tr>
                      </tfoot>                 
                    </table>
                  </div>
                </div>
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_2">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group col-md-2" >    
                        <label for="Nombre">FECHA DESDE </label>                      
                        <input class="form-control input-sm" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-2" >    
                         <label for="Nombre">FECHA HASTA</label>                      
                        <input class="form-control input-sm" type="date" id="fechaHastaF" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-2" >    
                        <br>
                        <button type="submit" id="BuscarNCF" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i>CONSULTAR</button>
                    </div>                    
                  </div>
                  <div class="col-md-12">
                    <table id="datatableNotaCreditoF"  width="100%" class="table nowrap table-striped table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th>NUMERO NC</th>
                          <th>NUMERO FC</th>
                          <th>PACIENTE</th>
                          <th>CLIENTE</th>
                          <th>FECHA</th> 
                          <th>VALOR</th>
                          <th></th>
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
                          <th></th> 
                          <th>$ 0.00</th>
                          <th></th>
                        </tr>
                      </tfoot>                  
                    </table>
                  </div>
                </div>
              </div>
              <!-- /.tab-pane -->              
            </div>
            <!-- /.tab-content -->
          </div>
      </div>    

<script src="js/Js_ReporteNc.js?v=1.0"></script>      
