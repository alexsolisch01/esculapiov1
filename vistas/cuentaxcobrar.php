<div class="col-md-12" >
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li  class="active"><a href="#pendientes" data-toggle="tab"><span >INGRESO DE CAJA</span><small class="label pull-right bg-primary" style="margin-left: 2px; margin-top: 3px;">1</small></a></li>
            <li><a href="#servicios" data-toggle="tab">EGRESO DE CAJA<small class="label pull-right bg-primary" style="margin-left: 2px; margin-top: 3px;">2</small></a></li>
                
          </ul>  
          <div class="tab-content">
            <div class="active tab-pane" id="pendientes">
              <div class="box box-primary">
                <div class="box-body">
                  <div class="form-group col-md-6" > 
                    <label for="Nombre" id="" class="col-md-12" style="text-align: center; ">TIPO DE INGRESO</label>              
                    <div class="form-check col-md-5">
                      <label><input type="radio" value="" name="radio1" id="radio2Ingreso"> <span class="label-text"></span>ANTICIPO RECIBIDO</label>
                    </div>
                    <div class="form-check col-md-7">
                      <label><input type="radio" value="" name="radio1" id="radio1Ingreso"> <span class="label-text"></span>CANCELAR CUENTA POR COBRAR</label>
                    </div>
                    <div class="col-md-4" id="SaldoCuentas" style="display: none;">
                      <label for="Nombre">SALDO</label>              
                      <input type="number" class="form-control input-sm" step="0.01" id="SaldoACancelar" autocomplete="off" name="fechaAdmi" disabled placeholder="Saldo">
                    </div>
                    <div class="col-md-4" id="EstadoCuentas" style="display: none;">
                      <label for="Nombre">ESTADO</label>  
                      <input type="text" style="display: none;" value="<?php echo date("Y-m-d H:i:s");?>"  class="form-control input-sm" id="fechaHoy" >            
                      <button type="button" id="EstadoCuenta" class="btn btn-sm btn-default col-md-12">DEFINIR</button>
                    </div>
                    <div class="form-group col-md-3" id="ValorAnticipo">
                      <label for="Nombre">VALOR </label>
                      <input type="number" step="0.01" class="form-control input-sm" id="valorIngresado" name="rucAdmi" >
                    </div>
                    <div class="col-md-4" id="HistoricoCuentas">
                      <label for="Nombre">&nbsp;</label> 
                      <label id="IdAnticipo" style="display: none;">&nbsp;</label>              
                      <button type="button" id="HistoricoCuenta" class="btn btn-sm btn-default col-md-12">HISTORICO</button>
                    </div>
                    <div class="col-md-5" >
                      <button type="submit" id="EliminarAnti" style="margin-top: 1.5em; display: none;" class="btn btn-danger col-md-12"><i class="fa fa-pencil-square" aria-hidden="true"></i> ELIMINAR(F12)</button>
                    </div>
                  </div>
                  <div class="box-footer col-md-6">  
                    <div id="consultasFactura" class="btn btn-default " > <i class="fa fa-stethoscope" aria-hidden="true"></i> CONSULTA CLIENTE (F1)</div>  
                    <label for="Nombre" id="SecuencialRecibo" class="" style="text-align: center; font-size: 20px; margin-left: 6em;">IC-<?php echo $_SESSION["puntoEmision"]?>-0000000</label>                       
                  </div>
                  <div class="col-md-4 invoice-col">
                    <strong id="PuntoEmision" idPuntoVenta="<?php echo $_SESSION["puntoVenta"]?>" puntoEmision="<?php echo $_SESSION["puntoEmision"]?>" >Datos del Paciente</strong>
                    <address>
                      <strong fecha="" data-toggle="modal" data-target="#modal-modificar-paciente" idPaciente="0" cedulaPaciente="" direccionPaciente="" telefonoPaciente="" correoPaciente="" tipo="" id="nombreCompleto" >------</strong><br>
                    </address>
                  </div>
                   
                        
            
              <div class="col-md-12" id="TablaAnticipo" style="display: none;">
                <div class="box box-primary">
                  <div class="box-body">
                    <label style="display: none;" id="IdPacienteResultadoDetalle"></label>
                    <div class="col-md-12 nopadding">
                      <div class="col-sm-12" >
                        <table id="datatableCuentasCobrarDetalle" width="100%" cellspacing="0" class="table nowrap table-condensed">
                          <thead>
                            <tr>
                              <th>FACTURA</th>
                              <th>NUMERO DE PAGO</th>
                              <th>PERIODO</th>                            
                              <th>FECHA DE PAGO</th>                                    
                              <th>VALOR A PAGAR</th>
                              <th>VALOR PAGADO</th>
                              <th>SALDO</th>
                              <th>VALOR</th>
                              <th>TODO</th>
                              <th>ID CONSULTA</th>
                            </tr>
                          </thead>
                          <tbody class="pointer tableBodega" id="tbodyPaciente">
                            <?php
                              /*$espe = new Con_Cuenta();
                              $espe->CargarPrueba();*/
                            ?>     
                          </tbody>                  
                        </table>
                      </div>
                      <br>
                      <br>
                    </div>                   
                  </div>
                </div>
              </div>
              <div class="col-md-12" id="TablaAnticipoAnticipo" >
                <div class="box box-primary">
                  <div class="box-body">
                    <div class="row">
                      <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="x_panel">
                          <div class="x_content">
                            <table id="datatableAnti" width="100%" cellspacing="0" class="table nowrap table-condensed">
                              <thead>
                                <tr>
                                  <th>ID</th>                                
                                  <th>NOMBRES</th>
                                  <th>VALOR</th>
                                  <th>SALDO</th>
                                  <th>F.PAGO</th>
                                  <th>FECHA REGISTRO</th>
                                </tr>
                              </thead>
                              <tbody class="pointer tablaLinea">
                                <?php
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
              <div class="box-footer pull-right">
                    <button type="reset" class="btn btn-info" id="LimpiarDetalleCuentas"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                    <button type="submit" id="GuardarDetalleCuentas" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar (F10)</button> 
                  </div>
              </div>

              </div>
              
            </div>
            <div class="tab-pane" id="servicios">
              <div class="box box-primary">
                <div class="box-body">
                  <div class="col-md-12">
                    <div class="form-group col-md-3" >    
                        <label for="Nombre">FECHA DESDE </label>                      
                        <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeFE" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-3" >    
                        <label for="Nombre">FECHA HASTA</label>                      
                        <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaFE" value="<?php echo date("Y-m-d");?>">
                    </div>
                    <div class="form-group col-md-2" >    
                      <label for="Nombre" >&nbsp;</label> 
                      <button type="submit" id="BuscarFacturaE" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                    </div>
                    <div class="" style="margin-top: 1.8em;">
                      <div class="form-group col-md-2">
                        <input class="marcarTodos" type="checkbox" nombre="marcarTodos" id="fancy-checkbox-default" name="fancy-checkbox-default" autocomplete="off" />
                        <div class="btn-group" >
                          <label for="fancy-checkbox-default" class="btn btn-default" id="marcarTodos">
                                    <span class="glyphicon glyphicon-ok"></span>
                                    <span> </span>MARCAR TODOS
                          </label>
                        </div>
                      </div>
                  </div>
                    <div class="form-group col-md-3 pull-right" >
                      <label for="Nombre" id="SecuencialEgreso" class="" style="font-size: 20px; margin-top: -4em; float: right; margin-right: -2em;">EC-<?php echo $_SESSION["puntoEmision"]?>-0000000</label>  
                    </div>
                  </div>
                  <div class="col-md-12 nopadding">
                    <div class="col-sm-12" >
                      <div class="form-group">
                      <input type="text" class="form-control filtroPacientes" id="nombreFiltroE" autocomplete="off" name="CÉDULA" placeholder="Cliente">
                    </div>
                        <table id="datatableIngresoE" width="100%" cellspacing="0" class="table nowrap table-condensed">
                          <thead>
                            <tr>
                              <th></th>  
                              <th>ID</th>  
                              <th>NUMERO DE INGRESO</th>   
                              <th>CEDULA/RUC</th>                   
                              <th>CLIENTE</th>                                    
                              <th>VALOR</th>
                              <th>SALDO</th>
                              <th>FECHA DE REGISTRO</th>
                              <th>DIRECCION</th>
                              <th>TELEFONO</th>
                              <th>CORREO</th>
                            </tr>
                          </thead>
                          <tbody class="pointer tableBodega" id="tbodyPaciente">
                            <?php
                              /*$espe = new Con_Cuenta();
                              $espe->CargarPrueba();*/
                            ?>     
                          </tbody>                  
                        </table>
                      </div>
                      <br>
                      <br>
                    </div>   
                    <div class="box-footer pull-right">
                    <button type="reset" class="btn btn-info" id="LimpiarEgreso"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                    <button type="submit" id="GuardarEgreso" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar (F10)</button> 
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
        <div class="form-group col-md-3 pull-right" style="margin-top: -2em; margin-right: 3em;">
          <input class="prueba" type="checkbox" nombre="CambiarBuscador" id="fancy-checkbox-default1" name="fancy-checkbox-default1"  />
          <div class="btn-group" >
            <label for="fancy-checkbox-default1" class="btn btn-default" >
              <span class="glyphicon glyphicon-ok"></span>
              <span> </span>
            </label>
          </div>
        <label>CAMBIAR BUSCADOR</label>
      </div>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="form-group col-md-12" id="BuscadorSimple">
                <input type="text" class="form-control input-sm filtroPacientes" id="cedulaFiltroAnticipo" name="CÉDULA" placeholder="CÉDULA">
              </div>
              <div style="display: none;" id="BuscadorComplejo">
                <div class="form-group col-md-4">
                  <input type="text" class="form-control filtroPacientes" id="cedulaFiltroAnticipo2" autocomplete="off" name="CÉDULA" placeholder="Cédula">
                </div>
                <div class="form-group col-md-4">
                  <input type="text" class="form-control filtroPacientes" id="apellidoPFiltroAnticipo" autocomplete="off" name="CÉDULA" placeholder="Apellido Paterno">
                </div>
                <div class="form-group col-md-4">
                  <input type="text" class="form-control filtroPacientes" id="nombreFiltroAnticipo" autocomplete="off" name="CÉDULA" placeholder="Nombre">
                </div>
              </div>
              <div id="DivTablaDeudores" style="display: none;" class="x_content" style="height: 500px;max-height: 500px;overflow-y: auto;">  
                <table id="datatableAnticipo" width="100%" cellspacing="0" class="table nowrap table-condensed">                
                  <thead>                      
                    <tr>
                      <th>ID</th>
                      <th>CÉDULA</th>
                      <th>CLIENTE</th>                       
                      <th>TELEFONO</th>                     
                      <th>EMAIL</th>                     
                      <th>DIRECCIÓN</th>
                      <th style="display:none;">TIPO</th>
                    </tr>
                  </thead>
                  <tbody class="pointer tablaPerfil">
                   
                  </tbody>                  
                </table>
              </div>
              <div id="DivTablaAnticipo" style="display: none;" class="x_content" style="height: 500px;max-height: 500px;overflow-y: auto;">  
                <table id="datatableAnticipoSinDeuda" width="100%" cellspacing="0" class="table nowrap table-condensed">                
                  <thead>                      
                    <tr>
                      <th>ID</th>
                      <th>CÉDULA</th>
                      <th>CLIENTE</th>                       
                      <th>TELEFONO</th>                     
                      <th>EMAIL</th>                     
                      <th>DIRECCIÓN</th>
                      <th style="display:none;">TIPO</th>
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

<div class="modal fade" id="modal-historico" tabindex='3' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">HISTORICO</h4>
      </div>
      <div class="modal-body">
        <div class="" id="TablaHistoricoCobrar">
          <div class="box box-primary">
            <div class="box-body">
              <div class="nopadding">
                <div class="col-sm-12" >
                  <table id="datatableCuentasCobrarDetalleHistorico" width="100%" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                      <tr>
                        <th>FACTURA</th>
                        <th>NUMERO DE PAGO</th>
                        <th>PERIODO</th>                            
                        <th>FECHA DE PAGO</th>                                    
                        <th>VALOR A PAGAR</th>
                        <th>VALOR PAGADO</th>
                        <th>SALDO</th>
                        <th>ESTADO</th>
                        <th>ID CONSULTA</th>
                      </tr>
                    </thead>
                    <tbody class="pointer tableBodega" id="tbodyPaciente">
                      <?php
                        /*$espe = new Con_Cuenta();
                        $espe->CargarPrueba();*/
                      ?>     
                    </tbody>                  
                  </table>
                </div>
                <br>
                <br>
              </div>                   
            </div>
          </div>
        </div>
        <div class="" id="TablaHistoricoAnticipo" style="display: none;">
          <div class="box box-primary">
            <div class="box-body">
              <div class="nopadding">
                <div class="col-sm-12" >
                  <table id="datatableHistoricoAnti"  width="100%" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                      <tr>
                        <th>ID</th>                                
                        <th>NOMBRES</th>
                        <th>VALOR</th>
                        <th>SALDO</th>
                        <th>F.PAGO</th>
                        <th>FECHA REGISTRO</th>
                      </tr>
                    </thead>
                    <tbody class="pointer tablaLinea">
                    <?php
                      ?>
                    </tbody>
                  </table>
                </div>
                <br>
                <br>
              </div>                   
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-comprobante" tabindex='5' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">COMPROBANTES</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="x_content" style="height: 250px;max-height: 250px; overflow-y: auto;">                
                <table id="datatableComprobante" width="100%" cellspacing="0" class="table nowrap table-condensed">                
                  <thead>                      
                    <tr>
                      <th>NUMERO DE COMPROBANTE</th>
                      <th>FACTURA DE REFERENCIA</th>
                      <th>VALOR</th>
                      <th>FORMA PAGO</th>
                      <th>FECHA PAGO</th>
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

<div class="modal fade" id="modal-detalle-factura" tabindex='1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">DETALLE</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="x_content" style="height: 350px;max-height: 350px;">                
                <table id="datatableDetalleFactura" width="100%" cellspacing="0" class="table nowrap table-condensed">                
                  <thead>                      
                    <tr>
                      <th>NUMERO DE FACTURA</th>
                      <th>VALOR FACTURA</th>
                      <th>VALOR ANTICIPO</th>
                      <th>CLAVE</th>
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
                <table id="datatableIngresosDetalle" width="100%" cellspacing="0" class="table nowrap table-condensed">                
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


<div class="modal  fade" id="modal-cobrar" tabindex='9' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" style="width: 60%; margin-left: 25%">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">COBRAR</h4>
      </div>
      <div class="modal-body">
        <h4>TOTAL A CANCELAR <span class="pull-right" id="totalPagarCobrar">$ 00.00</span></h4>
        <h4>TOTAL COBRADO <span class="pull-right" id="totalCobradoCobrar">$ 00.00</span></h4>
        <h4>TOTAL CAMBIO <span class="pull-right" id="CambioConsulta">$ 00.00</span></h4>
        
        <div class="box box-body box-primary">
                        

            <div class="col-md-12 formaPago">
              <div class="col-md-12 efectivo">
                <label>TOTAL EN EFECTIVO</label>
                <input type="number" class="form-control col-md-4"  autocomplete="off" id="ValorRecibidoConsulta" placeholder="EFECTIVO">
              </div>
              <div class="col-md-12">
                <label class="form-control">TOTAL EN CHEQUE <i class="fa fa-plus pointer cheque" aria-hidden="true" ></i>
                <span class="pull-right" id="totalCheque">$ 00.00</span></label>
                
                  <div id="ccheque" style="display: none;"> 
                    
                    <div class="form-group col-md-4">
                        <label for="Nombre">BANCO</label>
                        <select id="banco" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                          <option value="0">Seleccionar..</option>
                            <?php
                              $banco = new Con_Banco();
                              $banco->LlenarComboBanco();
                            ?>
                        </select>
                      </div>

                      <div class="form-group col-md-4">
                        <label for="Nombre">NUMERO DE CHEQUE</label>
                        <input type="number" required class="form-control input-sm" autocomplete="off" id="NumeroCheque" >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">NUMERO DE CUENTA</label>
                        <input type="number" required class="form-control input-sm" autocomplete="off" id="CuentaCheque" >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">FECHA DE COBRO</label>
                        <input type="date" value="<?php echo date("Y-m-d");?>" required autocomplete="off" class="form-control input-sm" id="FechaCheque" >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">VALOR</label>
                        <input type="number" required class="form-control input-sm" autocomplete="off" id="ValorCheque" >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">REFERENCIA</label>
                        <input type="text" required class="form-control input-sm"  autocomplete="off" id="ReferenciaCheque" >
                      </div>
                  </div>
              </div>
              <div class="col-md-12">
                <label class="form-control">TOTAL EN TRANSFERENCIA <i class="fa fa-plus pointer transferencia" aria-hidden="true" ></i>
                <span class="pull-right" id="totalTransfencia">$ 00.00</span></label>
                
                  <div id="ctransferencia" style="display: none;"> 
                    
                    <div class="form-group col-md-4">
                        <label for="Nombre">BANCO</label>
                        <select id="bancoTrans" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                          <option value="0">Seleccionar..</option>
                            <?php
                              $banco = new Con_Banco();
                              $banco->LlenarComboBanco();
                            ?>
                        </select>
                      </div>

                      <div class="form-group col-md-4">
                        <label for="Nombre">AGENCIA</label>
                        <input type="text" required class="form-control input-sm" autocomplete="off" id="AgenciaTrans" >
                      </div>                      
                      <div class="form-group col-md-4">
                        <label for="Nombre">FECHA DE DEPOSITO</label>
                        <input type="date" value="<?php echo date("Y-m-d");?>" required autocomplete="off" class="form-control input-sm" id="FechaTransferencia" >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">MONTO</label>
                        <input type="number" required class="form-control input-sm" autocomplete="off" id="ValorTrasferencia" >
                      </div>
                      <div class="form-group col-md-8">
                        <label for="Nombre">OBSERVACIONES</label>
                        <input type="text" required class="form-control input-sm"  autocomplete="off" id="ObsevacionTransferencia" >
                      </div>
                  </div>
              </div>
              <div class="col-md-12" id="DivAnticipo" style="display: none;">
                <label class="form-control">ANTICIPO <i class="fa fa-plus pointer anticipo" aria-hidden="true" ></i>
                <span id="totalAnticipo" class="pull-right">$ 00.00</span></label>
                <div id="aanticipo" style="display: none;"> 
                  <div class="col-md-12" style="margin-top: 2em;">
                    <table id="datatableAnticipoCobrar" cellspacing="0" class="table  table-condensed">
                      <thead>
                        <tr>
                          <th>VALOR</th>
                          <th>FECHA REGISTRO</th>
                          <th>INGRESAR</th>
                          <th>TODO</th>
                        </tr>
                      </thead>
                      <tbody class="pointer tablaPerfil">
                                  
                      </tbody>                  
                    </table>
                  </div>
                </div>
              </div>       
              <div class="col-md-12">
                <label class="form-control">TOTAL EN TARJETA DE CREDITO  <i class="fa fa-plus pointer tarjeta" aria-hidden="true" ></i>
                <span id="totalTarjeta" class="pull-right">$ 00.00</span></label>
                  
                  <div id="ctarjeta" style="display: none;"> 
                    
                    <div class="form-group col-md-4" >
                                  <label for="Nombre">ENTIDAD</label>
                                  <select id="EntidadTarjeta" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                    <option value="0">Seleccionar..</option>
                                      <?php
                                        $banco = new Con_Banco();
                                        $banco->LlenarComboBanco2();
                                      ?>
                                  </select>
                               </div>
                       <div class="form-group col-md-4">
                          <label for="Nombre">FECHA DE VENCIMIENTO</label>
                          <input type="date" value="<?php echo date("Y-m-d");?>" required class="form-control input-sm" autocomplete="off" id="FechaTarjeta" >
                        </div>
                        <div class="form-group col-md-4">
                              <label for="Nombre">NUMERO DE REFERENCIA</label>
                              <input type="number" required class="form-control input-sm" autocomplete="off" id="NumeroReferencia" >
                        </div>
                        <div class="form-group col-md-4">
                            <label for="Nombre">VALOR COBRO</label> 
                            <input type="number" required class="form-control input-sm" autocomplete="off" id="ValorTarjeta" >
                        </div>
                        <div class="form-group col-md-4">
                              <label for="Nombre">RECARGO</label>
                              <input type="number" required class="form-control input-sm" autocomplete="off" id="RecargoTarjeta" >
                        </div>
                  

                  </div>
              </div>       
            </div>
          </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" style="margin-top: 0.30em;" class="btn btn-success pull-right" id="CobrarCuentasAnticipo"> <i class="fa fa-usd" aria-hidden="true"></i> Cobrar</button>
      </div>
    </div>
  </div>
</div>

<script src="Lib/moment.js"></script>
<script src="js/Js_Cuenta.js?v=1.0.2"></script>
<script src="js/Js_FormaCobroCuenta.js?=0.0.2"></script>