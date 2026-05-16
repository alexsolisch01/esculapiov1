<input type="hidden" name="puntoVenta" id="puntoVenta" value="<?php echo $_SESSION["puntoVenta"]; ?>">
<input type="hidden" name="secuenciaPunto" id="secuenciaPunto" value="<?php echo $_SESSION["secuencia_fc"]; ?>">
<input type="hidden" name="establecimiento" id="establecimiento" value="<?php echo $_SESSION["establecimiento"]; ?>">
<input type="hidden" name="puntoEmision" id="puntoEmision" value="<?php echo $_SESSION["puntoEmision"]; ?>">
<input type="hidden" name="puntoDescuento" id="puntoDescuento" value="<?php echo $_SESSION["descuento"]; ?>">

<div class="col-md-12">
  <div class="box box-default box-solid" style="height: 200px;">
    <div class="box-header with-border">
      <h3 class="box-title">DATOS FACTURACION</h3>
      <div class="box-tools pull-right col-md-10">
        <div class="col-md-2" style="margin-top: 0.3em;">
          <a id="BuscarPaciente" style="margin-left: 0em;" href="" data-toggle="modal" data-target="#modal-buscar-paciente"><img src="imagenes/buscarPaci.png" /> Buscar (F1)</a>
        </div>
        <div id="DatosPaciente" class="form-group col-md-4" style="visibility: hidden;">
          <label for="happy" class="control-label col-md-6" style="text-align: right; margin-top: -0.4em; ">CONSUMIDOR FINAL</label>
          <div class="col-md-6">
            <div class="input-group">
              <div id="radioBtn" class="btn-group">
                <a id="SiCon" class="btn btn-success btn-sm active" data-toggle="happy" data-title="Y">SI</a>
                <span><a id="NoCon" class="btn btn-success btn-sm notActive" data-toggle="happy" data-title="N">NO</a></span>
              </div>
            </div>
          </div>
        </div>
        <div id="DatosCliente" class="form-group col-md-4" style="margin-left: -4em; visibility: hidden;">
          <label for="happy1" class="control-label col-md-6" style="text-align: right; margin-top: -0.4em;">MISMOS DATOS?</label>
          <div class="col-md-6">
            <div class="input-group">
              <div id="radioBtn" class="btn-group">
                <a id="Si" class="btn btn-success btn-sm active" data-toggle="happy1" data-title="Y">SI</a>
                <span data-toggle="modal" data-target="#modal-datos-cliente"><a id="No" class="btn btn-success btn-sm notActive" data-toggle="happy1" data-title="N">NO</a></span>
              </div>
            </div>
          </div>
        </div>
        <div id="limpiarFactFarmacia" class="pull-right">
          <img src="imagenes/broom.png">
          <strong>Limpiar</strong>
        </div>
      </div>
    </div>
    <div class="box-body">
      <div class="row invoice-info">
        <div class="col-md-4 invoice-col">
          <strong>Datos del Paciente</strong>
          <address>
            <strong fecha="" data-toggle="modal" data-target="#modal-modificar-paciente" idPaciente="0" id="nombreCompleto">------</strong><img style="margin-left: 5px;" data-toggle="modal" data-target="#modal-modificar-paciente" id="clickModificar" src="imagenes/lapi.png"><br>
            <span id="cedula">------</span><br>
            <span id="telefono">------</span><br>
            <span id="direccion">------</span><br>
            <span id="email">----------</span><br>
            <span style="display: none;" id="puntoSecuencia"><?php echo $_SESSION["puntoVentaSecuencia"] ?></span>
            <span> EDAD DEL PACIENTE: </span>
            <span id="edad">----</span>
          </address>
        </div>
        <!-- /.col -->
        <div class="col-sm-3 invoice-col">
          <strong>Datos del Cliente</strong>
          <select id="cbmTipoIde">
            <option value="1">Cedula/Ruc</option>
            <option value="2">Pasaporte</option>
          </select>
          <address>
            <strong idCliente="1" id="nombreCompletoCliente">CONSUMIDOR FINAL</strong><br>
            <span id="cedulaCliente">9999999999</span><br>
            <span id="direccionCliente">------</span><br>
            <span id="telefonoCliente">------</span><br>
            <span id="emailCliente">------</span>
          </address>
        </div>
        <!-- /.col -->
        <div class="col-md-5 invoice-col" style="margin-top: -1em;">
          <strong secuencia="<?php echo $_SESSION["establecimiento"] . "-" . $_SESSION["puntoEmision"] . "-" . $_SESSION["secuencia_fc"]; ?>" id="SecuenciaFacturaConsulta">FACTURA #: <?php echo $_SESSION["establecimiento"] . "-" . $_SESSION["puntoEmision"] . "-" . $_SESSION["secuencia_fc"]; ?> </strong><br>
          <span id="numeroMovimiento">EGRESO DE BODEGA # 0 </span><br>
          <span id="totalItemsConsulta">TOTAL DE ITEMS : 0 </span><br>
          <span id="totalDescuentoConsulta">TOTAL DESCUENTO : $ 00.00</span><br>

          <span id="totalCancelarSubtotal" style=" font-size: 14px;">SUBTOTAL : $ 00.00</span><br>
          <span id="totalCancelarIva" style=" font-size: 14px;"> IVA : $ 00.00</span><br>

          <span id="totalCancelarConsulta" style="font-weight: bold; font-size: 18px;">TOTAL A CANCELAR : $ 00.00</span><br>
          <span id="Vendedor">USUARIO : <?php echo $_SESSION["usuario"]; ?> </span><br>
          <button id="BuscarFactFarmacia" data-toggle="modal" data-target="#modal-consulta-factura-farmacia" type="button" style="margin-top: -11.30em;" class="btn btn-xs -default pull-right col-md-4" data-backdrop="static"> <i class="fa fa-search" aria-hidden="true"></i> BUSCAR FACTURA</button>
          <button type="button" style="margin-top: -8.50em;" class="btn btn-xs btn-default pull-right col-md-4" data-toggle="modal" data-target="#modal-consulta-receta" id="BuscarReceta" data-backdrop="static"> <i class="fa fa-search" aria-hidden="true"></i>BUSCAR RECETA</button>

          <button type="button" disabled="true" style="margin-top: -6em;" id="AnularFarmacia" class="btn btn-xs btn-danger pull-right col-md-4" data-backdrop="static"> <i class="fa fa-trash-o" aria-hidden="true"></i> ANULAR FACTURA</button>

          <button type="button" style="margin-top: -3.5em;" class="btn btn-xs btn-success pull-right col-md-4" id="CobrarConsulta" data-backdrop="static"> <i class="fa fa-usd" aria-hidden="true"></i> COBRAR (F10)</button>

          <button type="button" style="margin-top: -1.91em; display: none;" class="btn btn-xs btn-success pull-right col-md-4" id="ReimprimirFarmacia" data-backdrop="static"> <i class="fa fa-print" aria-hidden="true"></i> IMPRIMIR</button>

        </div>
        <!-- /.col -->
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-buscar-paciente" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">PACIENTES</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientesInv" id="cedulaFiltro" name="CÉDULA" placeholder="CÉDULA">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientesInv" id="apellidoPFiltro" name="CÉDULA" placeholder="Apellido Paterno">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientesInv" id="apellidoMFiltro" name="CÉDULA" placeholder="Apellido Materno">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientesInv" id="nombreFiltro" name="CÉDULA" placeholder="Nombre">
              </div>
              <div class="x_content" style="height: 500px;max-height: 500px;overflow-y: auto;">
                <table id="datatableFacturaInv" class="table table-striped table-condensed">
                  <thead style="font-size: 12px;">
                    <tr>
                      <th>ID</th>
                      <th>CÉDULA</th>
                      <th>APELLIDO PATERNO</th>
                      <th>APELLIDO MATERNO</th>
                      <th>NOMBRE</th>
                      <th>EMAIL</th>
                      <th style="display: none;">DIRECCIÓN</th>
                      <th>TÉLEFONO</th>
                      <th>FECHA REGISTRO HCU</th>
                    </tr>
                  </thead>
                  <tbody style="padding: 0;font-size: 11px;">

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

<div class="modal fade" id="modal-datos-cliente" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">AGREGAR CLIENTE</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <form id="AgregarCliente">
            <div class="form-group col-md-4">
              <label for="Nombre" style="color: red;">CÉDULA</label>
              <input type="text" class="form-control input-sm" autocomplete="off" required id="cedulaCliente" name="CÉDULA" placeholder="CÉDULA">
            </div>
            <div class="form-group col-md-4">
              <label for="Apellido" style="color: red;">APELLIDOS</label>
              <input type="text" class="form-control input-sm" autocomplete="off" required id="apellidoCliente" name="apellidos" placeholder="Apellido">
            </div>
            <div class="form-group col-md-4">
              <label for="Nombre" style="color: red;">NOMBRES</label>
              <input type="text" class="form-control input-sm" autocomplete="off" id="nombreCliente" name="nombres" placeholder="Nombre">
            </div>
            <div class="form-group col-md-4">
              <label for="TÉLEFONO Convencional">TÉLEFONO (OPCIONAL)</label>
              <input type="text" class="form-control input-sm" autocomplete="off" id="telefonoCliente" name="TÉLEFONO" placeholder="Convencional / Celular">
            </div>
            <div class="form-group col-md-4">
              <label for="Correo ELECTRÓNICO">CORREO ELECTRÓNICO (OPCIONAL)</label>
              <input type="email" class="form-control input-sm" autocomplete="off" id="emailCliente" name="correo" placeholder="Correo">
            </div>
            <div class="form-group col-md-4">
              <label for="DIRECCIÓN">DIRECCIÓN (OPCIONAL)</label>
              <input type="text" class="form-control input-sm" autocomplete="off" id="direccionCliente" name="DIRECCIÓN" placeholder="Consultorio / Domicilio">
            </div>
            <button type="submit" disabled id="ModificarCliente" style="margin-right: 1em;" class="btn btn-primary pull-right"> <i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
            <button type="submit" id="GuardarCliente" style="margin-right: 1em;" class="btn btn-success pull-right"> <i class="fa fa-plus" aria-hidden="true"></i> Agregar</button>
          </form>
        </div>
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="x_content">
                <table id="datatableClienteFacturaInv" width="100%" cellspacing="0" class="table  table-condensed">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>CÉDULA</th>
                      <th>APELLIDO PATERNO</th>
                      <th>APELLIDO MATERNO</th>
                      <th>NOMBRES</th>
                      <th>EMAIL</th>
                      <th>DIRECCIÓN</th>
                      <th>TÉLEFONO</th>
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
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal  fade" id="modal-consultas" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">FARMACIA</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" id="nombreComercialF" name="CÉDULA" placeholder="Nombre Comercial">
            </div>
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" id="presentacionF" name="CÉDULA" placeholder="Presentacion">
            </div>
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" id="principioF" name="CÉDULA" placeholder="Principio Activo">
            </div>
            <div class="x_content">
              <table id="datatableInventario" width="100%" cellspacing="0" class="table table-striped table-bordered table-condensed">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE COMERCIAL</th>
                    <th>PRESENTACION</th>
                    <th>COSTO</th>
                    <th>PRECIO UNIDAD</th>
                    <th>PRECIO CAJA</th>
                    <th>IVA</th>
                    <th>VALOR CAJA</th>
                    <th>NIVEL 1</th>
                    <th>NIVEL 2</th>
                    <th>STOCK CAJA</th>
                    <th>STOCK FRACCION</th>
                    <th>CANTIDAD 2</th>
                    <th>VALOR CAJA FRACCION</th>
                    <th>PRESENTACION 1</th>
                    <th>PRESENTACION 2</th>
                    <th>STOCK</th>
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

        <div class="box box-body box-default">


          <div class="col-md-12 formaPago">
            <div class="col-md-12 efectivo">
              <label>TOTAL EN EFECTIVO</label>
              <input type="number" class="form-control col-md-4" id="ValorRecibidoConsulta" placeholder="EFECTIVO">
            </div>
            <div class="col-md-12 fpcheque">
              <label class="form-control">TOTAL EN CHEQUE <i class="fa fa-plus pointer cheque" aria-hidden="true"></i>
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
                  <input type="number" required class="form-control input-sm" id="NumeroCheque">
                </div>
                <div class="form-group col-md-4">
                  <label for="Nombre">NUMERO DE CUENTA</label>
                  <input type="number" required class="form-control input-sm" id="CuentaCheque">
                </div>
                <div class="form-group col-md-4">
                  <label for="Nombre">FECHA DE COBRO</label>
                  <input type="date" value="<?php echo date("Y-m-d"); ?>" required class="form-control input-sm" id="FechaCheque">
                </div>
                <div class="form-group col-md-4">
                  <label for="Nombre">VALOR</label>
                  <input type="number" required class="form-control input-sm" id="ValorCheque">
                </div>
                <div class="form-group col-md-4">
                  <label for="Nombre">REFERENCIA</label>
                  <input type="text" required class="form-control input-sm" id="ReferenciaCheque">
                </div>
              </div>
            </div>
            <div class="col-md-12 fptransferencias">
              <label class="form-control">TOTAL EN TRANSFERENCIA <i class="fa fa-plus pointer transferencia" aria-hidden="true"></i>
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
                  <input type="text" required class="form-control input-sm" autocomplete="off" id="AgenciaTrans">
                </div>
                <div class="form-group col-md-4">
                  <label for="Nombre">FECHA DE DEPOSITO</label>
                  <input type="date" value="<?php echo date("Y-m-d"); ?>" required autocomplete="off" class="form-control input-sm" id="FechaTransferencia">
                </div>
                <div class="form-group col-md-4">
                  <label for="Nombre">MONTO</label>
                  <input type="number" required class="form-control input-sm" autocomplete="off" id="ValorTrasferencia">
                </div>
                <div class="form-group col-md-4">
                  <label for="Nombre">OBSERVACIONES</label>
                  <input type="text" required class="form-control input-sm" autocomplete="off" id="ObsevacionTransferencia">
                </div>
              </div>
            </div>
            <div class="col-md-12 fptarjeta">
              <label class="form-control">TOTAL EN TARJETA DE CREDITO <i class="fa fa-plus pointer tarjeta" aria-hidden="true"></i>
                <span id="totalTarjeta" class="pull-right">$ 00.00</span></label>

              <div id="ctarjeta" style="display: none;">
                <div class="form-group col-md-4 noPinPad">
                  <label for="Nombre">TIPO DE TARJETA</label>
                  <select id="TipoTarjeta" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                    <option value="Débito">Débito</option>
                    <option value="Crédito">Crédito</option>
                  </select>
                </div>
                <div class="form-group col-md-4">
                  <label for="Nombre">ENTIDAD</label>
                  <select id="EntidadTarjeta" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                    <option value="0">Seleccionar..</option>
                    <?php
                    $banco = new Con_Banco();
                    $banco->LlenarComboBanco2();
                    ?>
                  </select>
                </div>
                <div class="form-group col-md-4" style="display: none;">
                  <label for="Nombre">FECHA DE VENCIMIENTO</label>
                  <input type="date" value="<?php echo date("Y-m-d"); ?>" required class="form-control input-sm" autocomplete="off" id="FechaTarjeta">
                </div>
                <div class="form-group col-md-4">
                  <label for="Nombre">NUMERO DE TARJETA</label>
                  <input type="number" required class="form-control input-sm" autocomplete="off" id="NumeroTarjeta">
                </div>
                <div class="form-group col-md-4">
                  <label for="Nombre">NUMERO DE VOUCHER</label>
                  <input type="number" required class="form-control input-sm" autocomplete="off" id="NumeroVoucher">
                </div>
                <div class="form-group col-md-4">
                  <label for="Nombre">VALOR COBRO</label>
                  <input type="number" required class="form-control input-sm" autocomplete="off" id="ValorTarjeta">
                </div>
                <div class="form-check col-md-4" style="display: none;">
                  <label>
                    <br>
                    <input type="checkbox" value="ZUMPAGO" id="chZumpago"> <span class="label-text">PROCESAR CON ZUMPAGO</span>
                  </label>
                </div>
                <div class="form-group col-md-4" style="display: none;">
                  <label for="Nombre">RECARGO</label>
                  <select id="RecargoTarjeta" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>

                  </select>
                </div>


              </div>
            </div>
            <div class="col-md-12 fpcredito">
              <label class="form-control">CUENTAS POR COBRAR <i class="fa fa-plus pointer credito" aria-hidden="true"></i>
                <span id="totalCredito" class="pull-right">$ 00.00</span></label>

              <div id="ccredito" style="display: none;">


                <div class="col-md-3">
                  <label for="Nombre">PERIODO</label>
                  <select id="cbmPeriodoOdont" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                    <option value="0">Seleccionar..</option>
                    <option value="1">SEMANAL</option>
                    <option value="2">QUINCENAL</option>
                    <option value="3">MENSUAL</option>
                  </select>
                </div>

                <div class="col-md-3">
                  <label for="Nombre">FECHA INICIO</label>
                  <input type="date" value="<?php echo date("Y-m-d"); ?>" id="FechaInicio" class="form-control" name="">
                </div>
                <div class="col-md-3">
                  <label for="Nombre">MONTO TOTAL $</label>
                  <input type="number" step="any" class="form-control input-sm" id="montoT" name="precio">
                </div>
                <div class="col-md-3">
                  <label for="Nombre">DIVIDENDO</label>
                  <input type="number" disabled step="any" class="form-control input-sm" id="Pagos" name="precio">
                </div>

                <div class="col-md-12" style="margin-top: 2em;">
                  <table id="datatablePagosFarmacia" class="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>PAGO</th>
                        <th>$ MONTO</th>
                        <th>FECHA DE PAGO</th>
                      </tr>
                    </thead>
                    <tbody class="pointer tablaPerfil">
                      <?php
                      //$espe = new Con_Laboratorio();
                      //espe->CargarProcedimientosConsulta();
                      ?>
                    </tbody>
                  </table>

                </div>


              </div>
            </div>
            <div class="col-md-12 fpdividendo" id="DivAnticipo" style="display: none;">
              <label class="form-control">ANTICIPO <i class="fa fa-plus pointer anticipo" aria-hidden="true"></i>
                <span id="totalAnticipo" class="pull-right">$ 00.00</span></label>
              <div id="aanticipo" style="display: none;">
                <div class="col-md-12" style="margin-top: 2em;">
                  <table id="datatableAnticipoFarmacia" class="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>VALOR</th>
                        <th>FECHA REGISTRO</th>
                        <th>INGRESAR</th>
                        <th>TODO</th>
                      </tr>
                    </thead>
                    <tbody class="pointer tablaPerfil">
                      <?php
                      //$espe = new Con_Laboratorio();
                      //espe->CargarProcedimientosConsulta();
                      ?>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" style="margin-top: 0.30em;" class="btn btn-success pull-right" id="CobrarConsultaCobrar"> <i class="fa fa-usd" aria-hidden="true"></i> Cobrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal  fade" id="modal-despacho" tabindex='-1'>
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="NombreComercialPresentacion"> </h4>
      </div>
      <div class="modal-body">
        <div class="form-check col-md-6" style="display: none;" id="DespachoNivel1">
          <label><input type="radio" value="" name="PresentacionDespacho" id="PresentacionDespacho3" checked> <span class="label-text" id="PresentacionDespacho1"></span></label><br><label id="LabelPrecio2">Precio: </label><label id="Pvp2Detalle"></label><br><label id="LabelStock2">Stock: </label><label id="Stock2Detalle"></label>
        </div>
        <div class="form-check col-md-6" style="display: none;" id="DespachoNivel2">
          <label><input type="radio" value="" name="PresentacionDespacho" id="PresentacionDespacho4"> <span class="label-text" id="PresentacionDespacho2"></span></label><br><label id="LabelPrecio1">Precio: </label><label id="Pvp1Detalle"></label><br><label id="LabelStock1">Stock: </label><label id="Stock1Detalle"></label>
        </div>
        <input type="number" class="form-control input-sm" id="ElegirCantidad" placeholder="Cantidad">
        <label id="IdDetalle" style="display: none;"></label>
        <label id="NombreComercialDetalle" style="display: none;"></label>
        <label id="Costo1Detalle" style="display: none;"></label>
        <label id="IvaDetalle" style="display: none;"></label>
        <label id="ValorCajaDetalle" style="display: none;"></label>
        <label id="ValorCajaDetalleFracccion" style="display: none;"></label>
        <label id="Cantidad1" style="display: none;"></label>
        <label id="Cantidad2" style="display: none;"></label>
        <label id="Fracciones" style="display: none;"></label>


      </div>
      <div class="modal-footer">
        <button type="button" style="margin-top: 0.30em;" class="btn btn-success pull-right" id="AgregarProductos"> <i class="fa fa-plus" aria-hidden="true"></i> Agregar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal  fade" id="modal-despacho-remplazo" tabindex='-1'>
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="NombreComercialPresentacionR"> </h4>
      </div>
      <div class="modal-body">
        <div class="form-check col-md-6" style="display: none;" id="DespachoRemplazoNivel1">
          <label><input type="radio" value="" name="PresentacionDespachoR" id="PresentacionDespacho3R" checked> <span class="label-text" id="PresentacionDespacho1R"></span></label><br><label>Precio: </label><label id="Pvp2DetalleR"></label><br><label>Stock: </label><label id="Stock2DetalleR"></label>
        </div>
        <div class="form-check col-md-6" style="display: none;" id="DespachoRemplazoNivel2">
          <label><input type="radio" value="" name="PresentacionDespachoR" id="PresentacionDespacho4R"> <span class="label-text" id="PresentacionDespacho2R"></span></label><br><label>Precio: </label><label id="Pvp1DetalleR"></label><br><label>Stock: </label><label id="Stock1DetalleR"></label>
        </div>
        <input type="number" class="form-control input-sm" id="ElegirCantidadR" placeholder="Cantidad">
        <label id="IdDetalleR" style="display: none;"></label>
        <label id="NombreComercialDetalleR" style="display: none;"></label>
        <label id="Costo1DetalleR" style="display: none;"></label>
        <label id="IvaDetalleR" style="display: none;"></label>
        <label id="ValorCajaDetalleR" style="display: none;"></label>
        <label id="Cantidad1R" style="display: none;"></label>
        <label id="FraccionesR" style="display: none;"></label>

      </div>
      <div class="modal-footer">
        <button type="button" style="margin-top: 0.30em;" class="btn btn-success pull-right" id="AgregarProductosR"> <i class="fa fa-plus" aria-hidden="true"></i> Agregar</button>
      </div>
    </div>
  </div>
</div>

<div class="col-md-12" style="margin-top: -1em;">
  <div class="box box-default box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">FACTURACION DE FARMACIA</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
      </div>
    </div>
    <div class="box-body">
      <div class="col-md-12">
        <div class="col-md-2">
          <label for="Nombre">TIPO DE DESCUENTO</label>
          <select class="form-control" id="cbmTipoPago">
            <option value="0">Seleccionar..</option>
            <option value="1">Efectivo</option>
            <option value="2">Tarjeta Débito/Crédito</option>
          </select>
        </div>
        <div class="col-md-2"><br>
          <button id="consultasFactura" type="button" class="btn btn-default"> <img src="imagenes/pastilla.png" /> INVENTARIO (F2)</button>
        </div>
        <div class="form-group col-md-3" style="display: none;">
          <input type="text" class="form-control input-sm" id="CodigoDeBarra" name="CÉDULA" placeholder="Codigo de Barra">
        </div>
      </div>
      <div class="col-md-12"><br>
        <div class="box box-default">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
                <div class="x_content">
                  <table id="datatableDetalleFactFarmacia" class="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>ITEM</th>
                        <th>PRESENTACION</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        <th>SUBTOTAL</th>
                        <th>IVA</th>
                        <th>DESCUENTO</th>
                        <th>TOTAL</th>
                        <th></th>
                        <th></th>
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
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-modificar-paciente" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">DATOS PACIENTE</h4>
      </div>
      <div class="modal-body">
        <div class="box box-default">
          <form role="form" method="post" id="ModificarPacienteFact">
            <div class="box-body">
              <div class="form-group col-md-4">
                <label for="Nombre">CÉDULA / PASAPORTE</label>
                <input type="text" class="form-control input-sm" id="CedulaModificarPaciente" name="CÉDULAAdmi" placeholder="CÉDULA/PASAPORTE">
              </div>
              <div class="form-group col-md-4">
                <label for="Nombre">APELLIDO PATERNO</label>
                <input type="text" class="form-control input-sm" required id="ApellidoPModificarPaciente" name="apellidoAdmi" placeholder="APELLIDO PATERNO">
              </div>
              <div class="form-group col-md-4">
                <label for="Nombre">APELLIDO MATERNO</label>
                <input type="text" class="form-control input-sm" id="ApellidoMModificarPaciente" name="apellidoAdmi" placeholder="APELLIDO MATERNO">
              </div>
              <div class="form-group col-md-4">
                <label for="Nombre">NOMBRES</label>
                <input type="text" class="form-control input-sm" required id="NombreModificarPaciente" name="nombreAdmi" placeholder="NOMBRES">
              </div>
              <div class="form-group col-md-4">
                <label for="Fecha Nacimiento">FECHA NACIMIENTO</label>
                <input type="date" class="form-control input-sm" id="FechaModificarPaciente" name="fechaAdmi">
              </div>
              <div class="form-group col-md-4">
                <label for="Nombre">DIRECCIÓN</label>
                <input type="text" class="form-control input-sm" id="DireccionModificarPaciente" name="DIRECCIÓNAdmi" placeholder="DIRECCIÓN">
              </div>

              <div class="form-group col-md-4">
                <label for="Nombre">CANTON</label>
                <select id="CantonModificarPaciente" name="estadoDepa" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                  <option value="0">SELECCIONAR..</option>
                  <?php
                  $TipoServicio = new Con_Paciente();
                  $TipoServicio->LlenarDataListCanton();
                  ?>
                </select>
              </div>

              <div class="form-group col-md-4">
                <label for="Nombre">PARROQUIA</label>
                <select id="ParroquiaModificarPaciente" class="selectpicker show-tick form-control input-sm" data-live-search="true">

                </select>
              </div>

              <div class="form-group col-md-4">
                <label for="Nombre">SECTOR</label>
                <select id="SectorModificarPaciente" class="selectpicker show-tick form-control input-sm" data-live-search="true">

                </select>
              </div>

              <div class="form-group col-md-4">
                <label for="Nombre">TÉLEFONO</label>
                <input type="text" class="form-control input-sm" id="TelefonoModificarPaciente" name="TÉLEFONOAdmi" placeholder="FIJO O CELULAR...">
              </div>
              <div class="form-group col-md-4">
                <label for="Correo ELECTRÓNICO">CORREO ELECTRÓNICO</label>
                <input type="email" class="form-control input-sm" required value="<?php echo $_SESSION["correoBasura"]; ?>" id="CorreoModificarPaciente" name="correoAdmi" placeholder="CORREO">
              </div>
              <div class="form-group col-md-4">
                <label for="Nombre">ESTADO CIVIL</label>
                <select id="EstadoCivilModificarPaciente" name="ProvinciaAdmi" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                  <option value="0">Seleccionar..</option>
                  <option value="SOLTERO/A">SOLTERO/A</option>
                  <option value="CASADO/A">CASADO/A</option>
                  <option value="UNIDO/A">UNIDO/A</option>
                  <option value="DIVORCIADO/A">DIVORCIADO/A</option>
                  <option value="VIUDO/A">VIUDO/A</option>
                </select>
              </div>
              <div class="form-group col-md-4">
                <label for="Nombre">OCUPACION</label>
                <input type="text" class="form-control input-sm" id="OcupacionModificarPaciente" name="ocupacionAdmi" placeholder="OCUPACION">
              </div>
              <div class="form-group col-md-2">
                <label for="Nombre">IDENTIDAD DE GENERO</label>
                <select id="Genero2" name="Genero" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                  <option value="0">Seleccionar..</option>
                  <?php
                  $TipoServicio = new Con_consultaAmbu();
                  $TipoServicio->LlenarComboTipoGene2();
                  ?>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="Nombre">EDAD</label>
                <input type="text" class="form-control input-sm" disabled id="EdadModificarPaciente" name="" placeholder="EDAD">
              </div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
              <button type="reset" class="btn btn-info" id="LimpiarDatosFact"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>
              <button type="submit" id="GuardarModificarPaciente" class="btn btn-success " disabled><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar(F10)</button>
              <button type="submit" id="ModificarPaciente" class="btn btn-primary" disabled><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar(F11)</button>
            </div>

          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal  fade" id="modal-consulta-factura-farmacia" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4>FACTURAS REGISTRADAS FARMACIA</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm input-custom" id="numeroF" name="CÉDULA" placeholder="001-001-0000001">
            </div>
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" id="pacienteF" name="CÉDULA" placeholder="Paciente">
            </div>
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" id="clienteF" name="CÉDULA" placeholder="Cliente">
            </div>
            <div class="x_content">
              <table id="datatableConsultaFacturaFarmacia" width="100%" class="table table-striped table-bordered table-condensed">
                <thead>
                  <tr>
                    <th>NUMERO</th>
                    <th>PACIENTE</th>
                    <th>CLIENTE</th>
                    <th>FECHA</th>
                    <th>VALOR</th>
                    <th></th>
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

<div class="modal  fade" id="modal-consulta-receta" tabindex='15' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4>RECETAS REGISTRADAS</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm input-custom" autocomplete="off" id="numeroFReceta" name="CÉDULA" placeholder="10">
            </div>
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" id="pacienteFReceta" autocomplete="off" placeholder="Paciente">
            </div>

            <div class="x_content">
              <table id="datatableConsultaReceta" width="100%" class="table table-striped table-bordered table-condensed">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>PACIENTE</th>
                    <th>DOCTOR</th>
                    <th>FECHA</th>
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

<script src="js/Js_Farmacia.js?v=4.18"></script>



<script src="js/Js_FormaCobroFarmacia.js?v=1.10"></script>