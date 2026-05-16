            <div class="col-md-12 ">
              <div class="box box-default box-solid">

                <div class="box-header with-border">
                  <h3 class="box-title">INGRESOS Y EGRESOS</h3>
                  <label style="display: none;" id="IdMovimientoImprimir">0</label>
                </div>
                <div class="box-body">
                  <div class="col-md-12">
                    <div class="form-group col-md-2">
                      <label for="Nombre"># REFERENCIA</label>
                      <input type="text" required class="form-control input-sm" autocomplete="off" id="NumeroFactMovi" required name="nombreCome" placeholder="001-0001-0001">
                    </div>
                    <div class="form-group col-md-2">
                      <label for="Nombre">BODEGAS </label>
                      <select id="bodegaMovi" required name="instruccion" class="form-control input-sm">
                        <?php
                        $TipoServicio = new Con_Bodega();
                        $TipoServicio->LlenarComboBodega();
                        ?>
                      </select>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="Nombre">PROVEEDORES</label>
                      <select id="proveMovi" required name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                        <option value="0">Seleccionar..</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label for="Nombre">TIPO DE MOVIMIENTO</label>
                      <select id="movimiento" required name="movimiento" class="form-control input-sm">
                        <option value="SELECCIONAR">SELECCIONAR</option>
                        <option value="INGRESO">INGRESO</option>
                        <option value="EGRESO">EGRESO</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group col-md-3">
                      <label for="Nombre">MOTIVO</label>
                      <select id="tipoMovi" required name="instruccion" class="form-control input-sm">
                        <option value="0">Seleccionar..</option>
                        <?php
                        $TipoServicio = new Con_Bodega();
                        $TipoServicio->LlenarComboTipoMotivo();
                        ?>
                      </select>
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Nombre">FECHA</label>
                      <input class="form-control input-sm" type="date" id="fechaMovi" required value="<?php echo date("Y-m-d"); ?>">
                      <label style="display: none;" class="form-control input-sm" id="HoraMovi"> <?php echo date("H:i:s"); ?></label>
                    </div>
                    <div class="form-group col-md-6">
                      <label style="display: none;" id="nombreEsta" nombreEstablecimiento="<?php echo $_SESSION['nombreComercial'] ?>">OBSERVACIONES: </label>
                      <label style="display: none;" id="nombreUsuario" nombreUsuario="<?php echo $_SESSION['usuario'] ?>">OBSERVACIONES: </label>
                      <label for="OBSERVACIONES">OBSERVACIONES: </label>
                      <textarea rows="3" id="textAreaMovi" class="form-control input-sm" name="OBSERVACIONES" style="resize: none;"></textarea>
                    </div>
                  </div>
                  <div class="col-md-12" style="margin-bottom:1em;">
                    <div class="col-md-2">
                      <button id="consultasFacturaMotivo" type="button" class="btn btn-default"> <img src="imagenes/pastilla.png" /> INVENTARIO (F2)</button>
                    </div>
                    <button style="margin-left: 5em" id="consultamovimiento" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-consulta-movimiento"> <img src="imagenes/magnifier.png" /> CONSULTAR MOVIMIENTO (F3)</button>
                    <button style="margin-left: 5em" id="consultaorden" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-consulta-orden"> <img src="imagenes/magnifier.png" /> CARGAR ORDEN (F4)</button>
                    <button style="margin-left: 5em; display: none;" id="imprimirMovimiento" type="button" class="btn btn-success"> REIMPRIMIR</button>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="box box-primary">
                    <div class="row">
                      <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="x_panel">
                          <div class="x_content">
                            <table id="datatableDetalleFactFarmacia2" width="100%" class="table table-striped table-bordered table-condensed">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>ITEM</th>
                                  <th>PRESENTACION</th>
                                  <th>CANTIDAD</th>
                                  <th>PRECIO</th>
                                  <th>PRECIO CAJA</th>
                                  <th>SUBTOTAL</th>
                                  <th>IVA</th>
                                  <th>DESCUENTO</th>
                                  <th>TOTAL</th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody class="pointer">

                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="box-footer">
                  <button type="reset" class="btn btn-info" id="LimpiarMotivos"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>
                  <button type="submit" class="btn btn-success" id="GuardarMotivos"> <i class="fa fa-refresh" aria-hidden="true"></i> Guardar (F10)</button>
                  <button class="btn btn-warning" id="CargarExcel"> <i class="fa fa-file" aria-hidden="true"></i> Cargar Excel</button>
                  <div class="pull-right">
                    <label style="margin-left:2em;">SUBTOTAL : <span style="font-weight: bold; font-size: 16px;" id="subtotal">------</span></label>
                    <label style="margin-left:2em;">DESCUENTO : <span style="font-weight: bold; font-size: 16px;" id="descuento">------</span></label>
                    <label style="margin-left:2em;">IVA : <span style="font-weight: bold; font-size: 16px;" id="iva">------</span></label><label style="margin-left:2em;">TOTAL : <span style="font-weight: bold; font-size: 16px;" id="total">------</span></label>
                  </div>
                </div>

              </div>
            </div>



            <div class="modal  fade" id="modal-consultasMotivo" tabindex='-1'>
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Bodega</h4>
                  </div>
                  <div class="modal-body">
                    <div class="box-body">
                      <div class="col-md-12">
                        <div class="form-group col-md-4">
                          <input type="text" class="form-control input-sm" autocomplete="off" id="nombreComercialF" name="CÉDULA" placeholder="Nombre Comercial">
                        </div>
                        <div class="form-group col-md-4">
                          <input type="text" class="form-control input-sm" autocomplete="off" id="presentacionF" name="CÉDULA" placeholder="Presentacion">
                        </div>
                        <div class="form-group col-md-4">
                          <input type="text" class="form-control input-sm" autocomplete="off" id="principioF" name="CÉDULA" placeholder="Principio Activo">
                        </div>
                        <div class="x_content">
                          <table id="datatableModalMotivo" width="100%" class="table table-striped table-bordered table-condensed">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>NOMBRE COMERCIAL</th>
                                <th>PRESENTACION</th>
                                <th>PRINCIPIO 1</th>
                                <th>PRINCIPIO 2</th>
                                <th>PRINCIPIO 3</th>
                                <th>PRINCIPIO 4</th>
                                <th>COSTO</th>
                                <th>PVP 1</th>
                                <th>PVP 2</th>
                                <th>IVA</th>
                                <th>GALENICA</th>
                                <th>PVP CAJA</th>
                                <th>NIVEL 1</th>
                                <th>NIVEL 2</th>
                                <th>STOCK CAJA</th>
                                <th>FRACCIONES STOCK</th>
                                <th>CANTIDAD 2</th>
                                <th>PRESE 1</th>
                                <th>PRESE 2</th>
                                <th>STOCK FRACCIONES</th>
                              </tr>
                            </thead>
                            <tbody>
                              
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>


            <div class="modal  fade" id="modal-despacho2" tabindex='-1'>
              <div class="modal-dialog">
                <div class="modal-content" style="width: 60%; margin-left: 25%">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="NombreComercialPresentacion"> </h4>
                  </div>
                  <div class="modal-body">
                    <div class="form-check col-md-6">
                      <label><input type="radio" value="" name="PresentacionDespacho" id="PresentacionDespacho3" checked> <span class="label-text" id="PresentacionDespacho1"></span></label>
                    </div>
                    <div class="form-check col-md-6">
                      <label><input type="radio" value="" name="PresentacionDespacho" id="PresentacionDespacho4"> <span class="label-text" id="PresentacionDespacho2"></span></label>
                    </div>
                    <input type="number" class="form-control input-sm" autocomplete="off" id="ElegirCantidad" placeholder="Cantidad">
                    <label id="IdDetalle" style="display: none;"></label>
                    <label id="NombreComercialDetalle" style="display: none;"></label>
                    <label id="Costo1Detalle" style="display: none;"></label>
                    <label id="Costo2Detalle" style="display: none;"></label>
                    <label id="Descuento1Detalle" style="display: none;"></label>
                    <label id="Descuento2Detalle" style="display: none;"></label>
                    <label id="Pvp1Detalle" style="display: none;"></label>
                    <label id="Pvp2Detalle" style="display: none;"></label>
                    <label id="StockCaja" style="display: none;"></label>
                    <label id="StockUnidad" style="display: none;"></label>
                    <label id="IvaDetalle" style="display: none;"></label>
                    <label id="PresentacionNo" style="display: none;"></label>
                  </div>
                  <div class="modal-footer">
                    <button type="button" style="margin-top: 0.30em;" class="btn btn-success pull-right" id="AgregarProductos"> <i class="fa fa-plus" aria-hidden="true"></i> Agregar</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal  fade" id="modal-consulta-movimiento" tabindex='-1'>
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span></button>
                    <div class="form-group col-md-3">
                      <label for="Nombre">FECHA DESDE </label>
                      <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d"); ?>">
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Nombre">FECHA HASTA</label>
                      <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaF" value="<?php echo date("Y-m-d"); ?>">
                    </div>

                    <div class="form-group col-md-1">
                      <label for="Nombre" style="color: #00a7d0;">----</label>
                      <button type="submit" id="BuscarMovimientoF" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                    </div>
                  </div>
                  <div class="modal-body">
                    <div class="box-body">
                      <div class="col-md-12">
                        <div class="form-group col-md-4">
                          <input type="text" class="form-control input-sm" autocomplete="off" id="facturaF" name="CÉDULA" placeholder="001-001-0000001">
                        </div>
                        <div class="form-group col-md-4">
                          <input type="text" class="form-control input-sm" autocomplete="off" id="proveedorF" name="CÉDULA" placeholder="Proveedor">
                        </div>
                        <div class="form-group col-md-4">
                          <input type="text" class="form-control input-sm" autocomplete="off" id="tipoMovimientoF" name="CÉDULA" placeholder="Ingreso/Egreso">
                        </div>
                        <div class="x_content">
                          <table id="datatableDetalleMovimiento" width="100%" class="table table-striped table-bordered table-condensed">
                            <thead>
                              <tr>
                                <th>FACTURA</th>
                                <th>PROVEEDOR</th>
                                <th>TIPO MOVIMIENTO</th>
                                <th>FECHA</th>
                                <th>VALOR</th>
                                <th>ID</th>
                              </tr>
                            </thead>
                            <tbody class="pointer tablaPerfil">
                              <?php
                              /*$espe = new Con_Bodega();
                    $espe->CargarInventario2();*/
                              ?>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal  fade" id="modal-consulta-orden" tabindex='-1'>
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span></button>
                    <div class="form-group col-md-3">
                      <label for="Nombre">FECHA DESDE </label>
                      <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d"); ?>">
                    </div>
                    <div class="form-group col-md-3">
                      <label for="Nombre">FECHA HASTA</label>
                      <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaF" value="<?php echo date("Y-m-d"); ?>">
                    </div>

                    <div class="form-group col-md-1">
                      <label for="Nombre" style="color: #00a7d0;">----</label>
                      <button type="submit" id="BuscarOrden" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                    </div>
                  </div>
                  <div class="modal-body">
                    <div class="box-body">
                      <div class="col-md-12">
                        <div class="form-group col-md-6">
                          <input type="text" class="form-control input-sm" autocomplete="off" id="numeroO" name="CÉDULA" placeholder="0000001">
                        </div>
                        <div class="form-group col-md-6">
                          <input type="text" class="form-control input-sm" autocomplete="off" id="proveedorO" name="CÉDULA" placeholder="PROVEEDOR">
                        </div>
                        <div class="x_content">
                          <table id="datatableDetalleOrden" width="100%" class="table table-striped table-bordered table-condensed">
                            <thead>
                              <tr>
                                <th>NUMERO</th>
                                <th>PROVEEDOR</th>
                                <th>FECHA</th>
                                <th>ESTADO</th>
                              </tr>
                            </thead>
                            <tbody>
                              
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal  fade modalImportar2" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">

                  <div class="modal-header btn-info">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title">IMPORTAR STOCK DESDE EXCEL</h4>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-md-2">
                        <a href="documentos/ModeloStock.xlsx" download title="DESCARGAR ARCHIVO MODELO">
                          <img src="imagenes/filedownload.png">
                        </a>
                      </div>
                      <div class="col-md-2">
                        <div class="btn-file btn btn-sm btn-default" title="AGREGAR DESDE EXCEL">
                          <img src="imagenes/excel.png">
                          <input type="file" id="AddExcel2" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                        </div>
                      </div>
                      <div class="col-md-12" style="max-height: 300px;overflow-y: auto;margin-top: 2em;">
                        <table id="TablaImportar2" width="100%" class="table table-striped table-bordered table-hover dt-responsive ">
                          <thead>
                            <tr>
                              <th>Codigo</th>
                              <th>Nombre</th>
                              <th>Stock</th>
                              <th>Fracciones</th>
                              <th>Costo</th>
                            </tr>
                          </thead>
                          <tbody id="capaImportar2">
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    <button type="button" id="GuardarDatosExcel2" data-dismiss="modal" class="btn btn-success">Aceptar</button>
                  </div>
                </div>
              </div>
            </div>

            <script src="js/Js_movimiento.js?v=1.10"></script>