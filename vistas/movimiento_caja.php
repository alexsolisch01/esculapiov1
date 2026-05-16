<div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">REGISTRO DE REFERENCIAS</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <div class="row">
              <div class="col-md-12">
                    <div class="form-group col-md-3" >    
                        <label id="IdPuntoVenta" for="Nombre" idPuntoVenta="<?php echo $_SESSION["puntoVenta"]?>">FECHA DESDE </label>                      
                        <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-3" >    
                        <label for="Nombre">FECHA HASTA</label>                      
                        <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaF" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-2" >    
                      <label for="Nombre" >&nbsp;</label> 
                      <button type="submit" id="BuscarFactura" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                    </div>

              </div>

              <div class="col-md-12">
                    <div class="col-sm-12" >
                      <div class="form-group">
                      <input type="text" class="form-control filtroPacientes" id="nombreFiltro" autocomplete="off" name="CÉDULA" placeholder="Cliente">
                    </div>
                        <table id="datatableIngreso" width="100%" class="table table-striped nowrap table-condensed table-bordered">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>NUMERO DE MOVIMIENTO</th>
                              <th>TIPO</th>                            
                              <th>CLIENTE</th>                                    
                              <th>VALOR</th>
                              <th>FECHA DE REGISTRO</th>
                            </tr>
                          </thead>
                          <tbody>
                            
                          </tbody>                  
                        </table>
                      </div>                      
                    </div>         

            </div>
          </div>
</div>  

<div class="modal fade" id="modal-ingresos" tabindex='5' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">TIPO DE PAGO - INGRESOS</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="x_content" style="height: 350px;max-height: 360px; "> 
                <label>CLIENTE: <label id="NombreCliente"> </label></label>              
                <table id="datatableIngresosDetalle" width="100%" class="table table-striped table-bordered">                
                  <thead>                      
                    <tr>
                      <th>ID</th>
                      <th>NUMERO DE INGRESO</th>
                      <th>TIPO</th>
                      <th>VALOR</th>
                      <th>TIPO PAGO</th>
                    </tr>
                  </thead>
                  <tbody class="pointer tablaPerfil">
                   
                  </tbody>                  
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<script src="js/Js_Cuenta.js"></script>