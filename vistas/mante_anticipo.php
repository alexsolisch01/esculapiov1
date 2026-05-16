

        <div class="col-md-12" style="margin-top: 1em;">
          <div class="box box-primary box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">ANTICIPO</h3>

              
            </div>
            <form role="form" method="post" id="RegistroAnticipo">
              <div class="box-body">
                
                  <div class="col-md-4 invoice-col">
                       <strong>Datos del Paciente</strong>
                          <address>
                          <strong fecha="" data-toggle="modal" data-target="#modal-modificar-paciente" idPaciente="0" id="nombreCompleto" >
                                ------</strong><br>
                           </address>
                  </div>

                  <div class="form-group col-md-2">
                          <label for="Nombre">VALOR </label>
                          <input type="text"  class="form-control input-sm" id="valor" name="rucAdmi" >
                  </div>

                  <div class="col-md-3">
                       <label for="Nombre">TIPO DE PAGO</label>
                          <select id="pago"  name="movimiento" class="form-control input-sm">
                              <option value="SELECCIONAR">SELECCIONAR</option>
                              <option value="EFECTIVO">EFECTIVO</option>
                              <option value="TARJETA DE CREDITO">TARJETA DE CREDITO</option>
                              <option value="CHEQUE">CHEQUE</option>
                          </select>
                  </div> 
                  
<!-- **-----------TARJETA DE CREDITO---------** --> 

                           <div class="col-md-12 tarjeta" style="display: none;">

                              <div class="form-group col-md-3" >
                                  <label for="Nombre">ENTIDAD</label>
                                  <select id="tarjeta" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                    <option value="0">Seleccionar..</option>
                                      <?php
                                        $banco = new Con_Banco();
                                        $banco->LlenarComboBanco2();
                                      ?>
                                  </select>
                               </div>


            
                              <div class="form-group col-md-3" >
                              <label for="Nombre">FECHA DE VENCIMIENTO</label>
                              <input type="date" value="<?php echo date("Y-m-d");?>"  class="form-control input-sm" id="fechaTarjeta" >
                              </div>

                               <div class="form-group col-md-3">
                                <label for="Nombre">NUMERO REFERENCIA</label>
                                <input type="number"  class="form-control input-sm" id="numeroTarjeta" >
                              </div>
                      

                              <div class="form-group col-md-2">
                                <label for="Nombre">RECARGO</label>
                                <input type="numero"  class="form-control input-sm" id="recargaTarjeta" >
                              </div>

                          </div>

<!-- **-----------BANCO-----------** --> 

                           <div class="col-md-12 cheque" style="display: none;">

                              <div class="form-group col-md-3" >
                                  <label for="Nombre">BANCO</label>
                                  <select id="nombrebanco" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                    <option value="0">Seleccionar..</option>
                                      <?php
                                        $banco = new Con_Banco();
                                        $banco->LlenarComboBanco();
                                      ?>
                                  </select>
                               </div>

                               <div class="form-group col-md-3">
                                <label for="Nombre">NUMERO CHEQUE</label>
                                <input type="number"  class="form-control input-sm" id="numerocheque" >
                              </div>

                              <div class="form-group col-md-3">
                                <label for="Nombre">NUMERO CUENTA</label>
                                <input type="number"  class="form-control input-sm" id="numerocuenta" >
                              </div>
            
                              
                              <div class="form-group col-md-3" >
                              <label for="Nombre">FECHA DE COBRO</label>
                              <input type="date" value="<?php echo date("Y-m-d");?>"  class="form-control input-sm" id="fechacobro" >
                              </div>

                               
                      

                          </div>
                
              </div>
              <div class="box-footer">  
                      <div id="consultasFactura" class="btn btn-default " data-toggle="modal" data-target="#modal-default" > <i class="fa fa-stethoscope" aria-hidden="true"></i> CONSULTA CLIENTE (F1)</div>                       
                        <button type="reset" class="btn btn-info" id="LimpiarAnti"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                        <button type="submit" id="GuardarAnti" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar(F10)</button>                
                              
                        <button type="submit" id="EliminarAnti" class="btn btn-danger"><i class="fa fa-pencil-square" aria-hidden="true"></i> ELIMINAR(F12)</button>                                    

              </div>
            </form>
            <div class="box-body">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <div class="x_panel">
                        
                        <div class="x_content">
                          <table id="datatableAnti" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>Id</th>                                
                                  <th>NOMBRES</th>
                                  
                                  <th>VALOR</th>
                                  <th>F.PAGO</th>
                                  <th>FECHA REGISTRO</th>
                                 
                                           
                                </tr>
                              </thead>
                              <tbody class="pointer tablaLinea">
                                      <?php

                                     // $Perfil = new Con_Banco();

                                     // $Perfil->CargarAnticipo();  
                                      ?>
                              </tbody>
                            </table>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>



<div class="modal fade" id="modal-default" tabindex='1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">CLIENTES</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="form-group col-md-3">
                <input type="text" class="form-control input-sm filtroPacientes" id="cedulaFiltro" name="CÉDULA" placeholder="CÉDULA">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control input-sm filtroPacientes" id="apellidoPFiltro" name="CÉDULA" placeholder="Apellido Paterno">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control input-sm filtroPacientes" id="apellidoMFiltro" name="CÉDULA" placeholder="Apellido Materno">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control input-sm filtroPacientes" id="nombreFiltro" name="CÉDULA" placeholder="Nombre">
              </div>
              <div class="x_content" style="height: 500px;max-height: 500px;overflow-y: auto;">                
                <table id="datatableAnticipo" width="100%" class="table table-striped table-bordered">                
                  <thead>                      
                    <tr>
                      <th>ID</th>
                      <th>CÉDULA</th>
                      <th>APELLIDO PATERNO</th>
                      <th>APELLIDO MATERNO</th>
                      <th>NOMBRE</th>                        
                      <th>EMAIL</th>                     
                      <th>DIRECCIÓN</th>                     
                      <th>TÉLEFONO</th>
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

<script src="js/Js_Anticipo.js"></script>