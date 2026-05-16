<div class="col-md-12" >
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li class="active" id="tabLaboratorio"><a href="#consultas" data-toggle="tab"><span>AVANCES</span></a></li>
            <li><a href="#pendientes" data-toggle="tab"><span >FONDO DE CAJA</span></a></li>
            <li><a href="#servicios" data-toggle="tab">CUADRE DIARIO</a></li>     
          </ul>  
          <div class="tab-content">
            <div class="tab-pane" id="pendientes">
              <div class="box box-primary">
                <div class="box-body">
                  <div class="col-md-6">
                    <table id="tablaFondo" class="table table-striped table-bordered">
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
                      <label class="col-md-12">SUMA TOTAL $<span class="pull-right" id="SumaTotalFondo">0.00</span></label>
                    </div>   
                    <button type="submit" id="GuardarFondo" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                    <button type="submit" id="ReimprimirFondo"  class="btn btn-success"><i class="fa fa-print" aria-hidden="true"></i> REIMPRIMIR</button>
                  </div>             

                </div>
              </div>
            </div>
            <div class="tab-pane" id="servicios">
              <div class="box box-primary">
                <div class="box-body">
                  <div class="col-md-6">
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
                    <button type="submit" id="GuardarCuadreDiario" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                    <button type="submit" id="ReimprimirCuadre" style="display: none;" class="btn btn-success"><i class="fa fa-print" aria-hidden="true"></i> REIMPRIMIR</button>
                  </div>
                  <div class="col-md-6">
                    <table id="TablaEfectivo" class="table table-striped table-bordered">
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
                      <label class="col-md-12">SUMA TOTAL $<span class="pull-right" id="SumaTotalEfectivo">0.00</span></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="active tab-pane" id="consultas">
              <div class="box box-primary">
                <div class="box-body">
                  <div class="col-md-6">
                    <table id="tablaAvance" class="table table-striped table-bordered">
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
                      <label class="col-md-12">SUMA TOTAL $<span class="pull-right" id="SumaTotal">0.00</span></label>
                    </div>   
                    <button type="submit" id="GuardarAvance" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                    <button type="submit" id="ImprimirCuadreDiario" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Imprimir</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>        

<div class="modal fade" id="modal-ride" tabindex='1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" >
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">RIDE</h4>
      </div>
      <div class="modal-body" id="Ride" style="height: 700px;">                

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>      
      </div>
    </div>
  </div>
</div>



    <script src="js/Js_Cuadre.js?v=1.8"></script> 