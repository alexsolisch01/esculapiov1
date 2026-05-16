<div class="col-md-12" style="margin-top: 1em;">
  <div class="box box-primary box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">REPORTE DE FACTURAS</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="box-body ">

                            <div class="col-md-12">
                              <div class="form-group col-md-2" >    
                                  <label for="Nombre">FECHA  </label>                      
                                  <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d");?>">
                              </div>
                              

                              <div class="form-group col-md-3" >    
                                  <label for="Nombre">LOTE DE FACTURAS</label>                      
                                  <select id="cbmFiltro"  class="form-control input-sm">                        
                                    <option value="1">LOTE 1 (00:00:00-11:59:59)</option>
                                    <option value="2">LOTE 2 (12:00:00-23:59:59)</option>
                                    <option value="3">TODAS</option>
                                  </select>
                              </div>

                              <div class="form-group col-md-2" >    
                                  <label for="Nombre" style="color: white;">----</label> 
                                  <button type="submit" id="CargarInforme" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                              </div>

                             

                          </div>    
            
                        <div class="col-md-12">
                          <table id="FacturasExcel" class="table table-striped table-bordered">
                            <thead>
                              <tr>                                
                                <th>Tipo de Comprobante</th>
                                <th>Número de Factura</th>
                                <th>Emisión</th>
                                <th>Hora</th>
                                <th>Tipo de Persona</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Cédula/Ruc</th>
                                <th>Efectivo</th>
                                <th>Monto Cheques</th>
                                <th>Monto Tarjetas</th>
                                <th>Monto a Crédito</th>
                                <th>Vencimiento</th>
                                <th>Monto Anticipo</th>
                                <th>Base Ret. Imp. Renta</th>
                                <th>% Ret. Imp. Renta</th>
                                <th>Valor Ret. Imp. Renta</th>
                                <th>Casillero Ret. Imp. Renta</th>
                                <th>Base Ret. IVA</th>
                                <th>% Ret. IVA</th>
                                <th>Valor Ret. IVA</th>
                                <th>Casillero Ret. IVA</th>
                                <th>Número de Retención</th>
                                <th>Número de Autorización de Retención</th>
                                <th>% Cargo x Otros</th>
                                <th>Contacto</th>
                                <th>Zona de Ventas</th>
                                <th>Referencia</th>
                                <th>Tarjeta</th>
                                <th>Número Tarjeta</th>
                                <th>Número Voucher</th>
                                <th>Aut. de Voucher</th>
                                <th>Banco</th>
                                <th>Número Cuenta</th>
                                <th>Número Cheque</th>
                                <th>Eliminar</th>
                                <th>Clave SRI</th>
                                <th>NumeroAutorizacion</th>
                                <th>FechaAutorizacion</th>
                                <th>Identificacion Vendedor</th>
                                <th>Vendedor</th>
                                <th>Email</th>
                                <th>Estado AUT</th>
                                <th>Nota</th>
                              </tr>
                            </thead>
                            <tbody class="pointer">
                              <?php

                                          //$Perfil = new Con_Especialidad();

                                          //$Perfil->CargarTipoServicio();
                                ?>
                            </tbody>
                          </table>                          
                          
                          <table id="FacturasExcel2" class="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <th>Tipo de Comprobante</th>
                                <th>Número de Factura</th>
                                <th>Emisión</th>
                                <th>Hora</th>
                                <th>Tipo de Persona</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Cédula/Ruc</th>
                                <th>Efectivo</th>
                                <th>Monto Cheques</th>
                                <th>Monto Tarjetas</th>
                                <th>Monto a Crédito</th>
                                <th>Vencimiento</th>
                                <th>Monto Anticipo</th>
                                <th>Base Ret. Imp. Renta</th>
                                <th>% Ret. Imp. Renta</th>
                                <th>Valor Ret. Imp. Renta</th>
                                <th>Casillero Ret. Imp. Renta</th>
                                <th>Base Ret. IVA</th>
                                <th>% Ret. IVA</th>
                                <th>Valor Ret. IVA</th>
                                <th>Número de Retención</th>
                                <th>Número de Autorización de Retención</th>
                                <th>% Cargo x Otros</th>
                                <th>Contacto</th>
                                <th>Zona de Ventas</th>
                                <th>Referencia</th>
                                <th>No.de factira que modifica</th>
                                <th>Eliminar</th>
                              </tr>
                            </thead>
                            <tbody class="pointer tablaTipoServicio">
                              <?php

                                          //$Perfil = new Con_Especialidad();

                                          //$Perfil->CargarTipoServicio();
                                ?>
                            </tbody>
                          </table>


                           <table id="FacturasExcel3" class="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <th>Tipo de Comprobante</th>
                                <th>Número de Factura</th>
                                <th>Codigo de Item</th>
                                <th>Descripcion</th>
                                <th>Línea de Item</th>
                                <th>Unidad de Medida</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>% de Descuento</th>
                                <th>Graba Iva</th>
                                <th>Código de Cuenta</th>
                                <th>Nombre de la Cuenta Contable</th>
                                <th>Nota</th>
                                <th>Centro de Costos</th>
                                <th>SubCentro de Costos</th>
                                <th>Tipo Item</th>
                              </tr>
                            </thead>
                            <tbody class="pointer tablaTipoServicio">
                              <?php

                                          //$Perfil = new Con_Especialidad();

                                          //$Perfil->CargarTipoServicio();
                                ?>
                            </tbody>
                          </table> 

                           <table id="FacturasExcel4" class="table table-striped table-bordered">
                            <thead>
                              <tr>
                              
                                <th>Número de Movim. de Caja</th>
                                <th>Emisión</th>
                                <th>Hora</th>
                                <th>Tipo de Persona</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Cédula/Ruc</th>
                                <th>Efectivo</th>
                                <th>Monto Cheques</th>
                                <th>Monto Tarjetas</th>
                                <th>Tipo Comprobante que abona</th>
                                <th>Comprobante que abona</th>
                                <th>Monto del Abono</th>
                                <th>Monto del Anticipo</th>
                                <th>Base Ret. Imp.Renta</th>
                                <th>% Ret.Imp.Renta</th>
                                <th>Valor Ret. Imp.Renta</th>
                                <th>Casillero Ret. Imp.Renta</th>
                                <th>Base Ret.IVA</th>
                                <th>% Ret.IVA</th>
                                <th>Valor Ret.IVA</th>
                                <th>Casillero Ret.IVA</th>
                                <th>Número de Retencion</th>
                                <th>Autorizacion</th>
                                <th>Concepto</th>
                                <th>Contacto</th>
                                <th>Zona de Ventas</th>
                                <th>Tarjeta</th>
                                <th>Número Tarjeta</th>
                                <th>Número Voucher</th>
                                <th>Aut. de Voucher</th>
                                <th>Banco</th>
                                <th>Número Cuenta</th>
                                <th>Número Cheque</th>
                              </tr>
                            </thead>
                            <tbody class="pointer tablaTipoServicio">
                              <?php

                                          //$Perfil = new Con_Especialidad();

                                          //$Perfil->CargarTipoServicio();
                                ?>
                            </tbody>
                          </table>                                                   
                        </div>
                      
    </div>
   </div>
</div>


<script src="Lib/node_modules2\file-saver\src/FileSaver.js"></script>
<script src="Lib/node_modules/xlsx/dist/xlsx.full.min.js"></script>
<script src="js/Js_Facturas.js"></script>