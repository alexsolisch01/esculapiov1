      <div class="col-md-12" style="margin-top: 1em;">
          <div class="box box-primary box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">ARQUEO DE CAJA</h3>                        
            </div>
            <div class="box-body">

        <div class="col-md-12">
          <!-- Custom Tabs -->
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab_1" data-toggle="tab">ARQUEO DE CAJA</a></li>                                             
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tab_1">
                <div class="box-body">
                  <div class="col-md-12">
                      <div class="form-group col-md-3" >    
                          <label for="Nombre">FECHA</label>                      
                          <input class="form-control input-sm" autocomplete="off" type="date" id="fechaCuadreDesdeF" value="<?php echo date("Y-m-d");?>">
                      </div>
                      <div class="form-group col-md-3">                
                          <label for="Fecha Nacimiento">PUNTO DE VENTA</label>
                          <select id="puntoVenta"  class="selectpicker show-tick form-control input-sm" data-live-search="true">
                              <option value="0">Todos</option>
                            </select>
                      </div>                      
                      <div class="form-group col-md-2" >    
                          <br>
                          <button type="submit" id="CargarCuadre" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                      </div>

                    

                  </div>

                  <div class="col-md-6" id="CuadreCajaAdmin">
                    <table id="tablaCuadreDiario" class="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>TIPO</th>
                          <th></th>                                   
                          <th>TOTAL</th>                        
                        </tr>
                      </thead>
                      <tbody class="pointer tableBodega" id="tbodyPaciente">
                        <tr>
                          <td>FONDO DE CAJA</td>
                          <td id="FondoCaja"></td>
                          <td id="TotalFondo"></td>
                        </tr>
                        
                        
                        <tr>
                          <td>ANTICIPOS RECIBIDOS</td>
                          <td id="numeroAnticiposR"></td>
                          <td id="TotalAnticipoRecibido"></td>
                        </tr>
                        <tr>
                          <td colspan="3" style="display: none;width: 100%;" id="TablaIcAnticipo">
                            <table id="FacturasIcAnticipo" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>NUMERO</th>                                  
                                  <th>TOTAL</th>
                                  <th>FORMA PAGO</th>                                          
                                </tr>
                              </thead>
                              <tbody class="pointer tableBodega" id="tbodyPaciente">                                
                              </tbody>                  
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>LIQ. CUENTAS X COBRAR</td>
                          <td id="numeroAbonos"></td>
                          <td id="TotalAbonos"></td>
                        </tr>
                        <tr>
                          <td>AVANCES</td>
                          <td id="numeroAvance">                            
                          </td>
                          <td id="TotalAvance"></td>
                        </tr>
                        <tr>
                          <td colspan="3" style="display: none;width: 100%;" id="tablaAvanceS">
                            <table id="HoraAvance" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>FECHA-HORA</th>                                  
                                  <th>TOTAL</th>
                                </tr>
                              </thead>
                              <tbody class="pointer tableBodega" id="tbodyPaciente">                                
                              </tbody>                  
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="3" style="display: none;width: 100%;" id="TablaIcAbono">
                            <table id="FacturasIcAbono" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>NUMERO</th>                                  
                                  <th>TOTAL</th>
                                  <th>FORMA PAGO</th>                                          
                                </tr>
                              </thead>
                              <tbody class="pointer tableBodega" id="tbodyPaciente">                                
                              </tbody>                  
                            </table>
                          </td>
                        </tr>
                        
                        <tr>
                          <td>CUENTAS X COBRAR</td>
                          <td id="numeroCuentasxC"></td>
                          <td id="TotalCuentas"></td>
                        </tr>
                        <tr>
                          <td colspan="3" style="display: none;width: 100%;" id="TablaFacturasCredito">
                            <table id="FacturasCredito" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>NUMERO</th>                                  
                                  <th>TOTAL</th>
                                  <th>PAGADO</th>                                          
                                </tr>
                              </thead>
                              <tbody class="pointer tableBodega" id="tbodyPaciente">                                
                              </tbody>                  
                            </table>
                          </td>
                        </tr> 
                        <tr>
                          <td>ANTICIPOS DEVENGADOS</td>
                          <td id="numeroAnticiposA"></td>
                          <td id="TotalAnticipoAplicado"></td>
                        </tr>
                        <tr>
                          <td colspan="3" style="display: none;width: 100%;" id="TablaFacturasAnticipo">
                            <table id="FacturasAnticipo" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>NUMERO</th>                                  
                                  <th>TOTAL</th>
                                  <th>PAGADO</th>                                          
                                </tr>
                              </thead>
                              <tbody class="pointer tableBodega" id="tbodyPaciente">                                
                              </tbody>                  
                            </table>
                          </td>
                        </tr>                       
                        <tr>
                          <td>NOTAS DE CREDITO</td>
                          <td id="numeroNc"></td>
                          <td id="totalNc">$ 0.0</td>
                        </tr>
                        <tr>
                          <td colspan="3" style="display: none;width: 100%;" id="TablaNC">
                            <table id="FacturasNC" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>NUMERO NC</th>                                  
                                  <th>NUMERO FC</th>
                                  <th>TOTAL</th>                                          
                                </tr>
                              </thead>
                              <tbody class="pointer tableBodega" id="tbodyPaciente">                                
                              </tbody>                  
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>EGRESOS DE CAJA</td>
                          <td id="numeroEgresos"></td>
                          <td id="TotalEgresos">$0.0</td>
                        </tr>
                        <tr>
                          <td colspan="3" style="display: none;width: 100%;" id="TablaEgresos">
                            <table id="FacturasEgresos" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>NUMERO</th>                                  
                                  <th>TOTAL</th>
                                  <th>FORMA PAGO</th>                                          
                                </tr>
                              </thead>
                              <tbody class="pointer tableBodega" id="tbodyPaciente">                                
                              </tbody>                  
                            </table>
                          </td>
                        </tr>
                        
                        <tr>
                          <td>CHEQUE</td>
                          <td id="numeroCheques">                                    
                          </td>
                          <td id="TotalCheque"></td>
                        </tr>
                        <tr>                          
                          <td colspan="3" style="display: none;width: 100%;" id="TablaFacturasCheque">
                          <table id="FacturasCheque" class="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <th>NUMERO</th>
                                <th>BANCO</th>
                                <th>TOTAL</th>
                                <th>PAGADO</th>                                          
                              </tr>
                            </thead>
                            <tbody class="pointer tableBodega" id="tbodyPaciente">                                
                            </tbody>                  
                          </table>
                          </td>                          
                          
                        </tr>
                        <tr>
                          <td>TARJETA DE CREDITO</td>
                          <td id="numeroTarjeta"></td>
                          <td id="TotalTarjeta"></td>
                        </tr>
                        <tr>
                          <td colspan="3" style="display: none;width: 100%;" id="TablaFacturasTarjeta">
                            <table id="FacturasVoucher" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>NUMERO</th>
                                  <th>TARJETA</th>                                  
                                  <th>TOTAL</th>
                                  <th>PAGADO</th>                                          
                                </tr>
                              </thead>
                              <tbody class="pointer tableBodega" id="tbodyPaciente">                                
                              </tbody>                  
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>TRANSFERENCIAS</td>
                          <td id="numeroTransferencias">                                    
                          </td>
                          <td id="TotalTransferencias"></td>
                        </tr>
                        <tr>                          
                          <td colspan="3" style="display: none;width: 100%;" id="TablaFacturasTransferencias">
                          <table id="FacturasTransferencias" class="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <th>NUMERO</th>
                                <th>BANCO</th>
                                <th>TOTAL</th>
                                <th>PAGADO</th>                                          
                              </tr>
                            </thead>
                            <tbody class="pointer tableBodega" id="tbodyPaciente">                                
                            </tbody>                  
                          </table>
                          </td>                          
                          
                        </tr>                                                              
                      </tbody>                  
                    </table>                     
                    <button type="submit" id="GuardarCuadreADMIN" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                  </div>
                  
                  <div class="col-md-6">                  
                    <table id="TablaEfectivoSupervisor" class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>DENOMINACION</th>
                                  <th>CANTIDAD</th>                                   
                                  <th>TOTAL</th>                        
                                </tr>
                              </thead>
                              <tbody class="pointer tableBodega" id="tbodyPaciente">
                                <tr>
                                  <td>0.01</td>
                                  <td><input type="number" value="0" class="cantidadDenominacion "></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>0.05</td>
                                  <td><input type="number" value="0" class="cantidadDenominacion "></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>0.10</td>
                                  <td><input type="number" value="0" class="cantidadDenominacion "></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>0.25</td>
                                  <td><input type="number" value="0" class="cantidadDenominacion "></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>0.50</td>
                                  <td><input type="number" value="0" class="cantidadDenominacion "></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>1.00</td>
                                  <td><input type="number" value="0" class="cantidadDenominacion "></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>5.00</td>
                                  <td><input type="number" value="0" class="cantidadDenominacion "></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>10.00</td>
                                  <td><input type="number" value="0" class="cantidadDenominacion "></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>20.00</td>
                                  <td><input type="number" value="0" class="cantidadDenominacion "></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>50.00</td>
                                  <td><input type="number" value="0" class="cantidadDenominacion "></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>100.00</td>
                                  <td><input type="number" value="0" class="cantidadDenominacion "></td>
                                  <td></td>
                                </tr>
                              </tbody>                  
                            </table>
                    <div class="col-md-12">
                      <label class="col-md-12">SUMA TOTAL $<span class="pull-right" id="SumaTotalEfectivoSupervisor">0.00</span></label>
                    </div>
                  </div>

                </div>

              </div>
           
              
            </div>
          </div>
        </div>        
      </div>
    </div>
</div>



<script src="js/Js_Arqueo.js"></script>
