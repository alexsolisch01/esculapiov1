<!--<div class="col-md-12">
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">PUNTOS DE VENTA</h3>
        </div>
        <div class="box-body ">
            <div class="row">
                <div class="col-md-12">
                    <button id="nuevoRegistro" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <br>
                    <table id="datatablePuntoVenta" cellspacing="0" class="table nowrap table-condensed">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Establecimiento</th>
                                <th>Punto De Emision</th>
                                <th>Nombre</th>
                                <th>Ambiente</th>
                                <th>Secuencia FC</th>
                                <th>Secuencia NC</th>
                                <th>Secuencia NB</th>
                                <th>Secuencia RET</th>
                                <th>Impresora</th>
                                <th>USUARIO REGISTRO</th>
                                <th>FECHA DE REGISTRO</th>
                                <th>% DESC</th>
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
<div class="modal fade modalNuevo" tabindex='1' data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">ESTABLECIMIENTO</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <form role="form" method="post" id="RegistroPuntoVenta">
                            <div class="form-group col-md-6" id="MoverEstablecimiento">
                                <label for="Nombre">ESTABLECIMIENTO</label>
                                <select id="Establecimiento" name="TipoServicio" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                    <option value="0">Seleccionar..</option>
                                    <?php
                                    /*$TipoServicio = new Con_Establecimiento();
                                    $TipoServicio->LlenarCombo();
                                    */?>
                                </select>
                            </div>
                            <div class="form-group col-md-6" id="PuntoVentaDiv">
                                <label for="Nombre" id="nombrePE">PUNTO DE EMISIÓN</label>
                                <select id="CodigoPunto" name="TipoServicio" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                    <option value="0">Seleccionar..</option>
                                    <?php
                                    /*$TipoServicio = new Con_Establecimiento();
                                    $TipoServicio->LlenarPuntoEmision();
                                    */?>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Nombre">AMBIENTE</label>
                                <select id="AmbientePunto" name="codigo" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                    <option value="0">Seleccionar..</option>
                                    <option value="PRUEBA">PRUEBA</option>
                                    <option value="PRODUCCION">PRODUCCION</option>
                                </select>
                            </div>
                            <div class="col-md-6" style="display: none">
                                <input type="text" id="SecuenciaOculta">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Nombre">NOMBRE</label>
                                <input type="text" class="form-control input-sm" autocomplete="off" id="NombrePunto" name="nombre" placeholder="Nombre">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Nombre">NOMBRE IMPRESORA</label>
                                <input type="text" class="form-control input-sm" autocomplete="off" id="ImpresoraPunto" name="nombre" placeholder="Nombre Impresora">
                            </div>
                            <div class="form-group col-md-12">
                                <label for="Nombre" class="col-md-12">SECUENCIA</label>
                                <div class="col-md-12">
                                    <div class="col-md-6" style="text-align: right; margin-top: 0.5em;">
                                        <label for="Nombre">FACTURA:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="number" tipoDato="Numero" class="form-control input-sm" autocomplete="off" id="SecuenciaFc" name="factura" placeholder="Numero" value="0">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-6" style="text-align: right; margin-top: 0.5em;">
                                        <label for="Nombre">NOTA DE CRÉDITO:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="number" tipoDato="Numero" class="form-control input-sm" autocomplete="off" id="SecuenciaNc" name="factura" placeholder="Numero" value="0">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-6" style="text-align: right; margin-top: 0.5em;">
                                        <label for="Nombre">NOTA DE DÉBITO:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="number" tipoDato="Numero" class="form-control input-sm" autocomplete="off" id="SecuenciaNb" name="factura" placeholder="Numero" value="0">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-6" style="text-align: right; margin-top: 0.5em;">
                                        <label for="Nombre">RETENCIÓN:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="number" tipoDato="Numero" class="form-control input-sm" autocomplete="off" id="SecuenciaRe" name="retencion" placeholder="Numero" value="0">
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="col-md-6" style="text-align: right; margin-top: 0.5em;">
                                        <label for="Nombre">% MAX. DESCUENTO:</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="number" step="0.01" max="100" tipoDato="Numero" class="form-control input-sm" autocomplete="off" id="descuento" name="retencion" value="0">
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-12">
                                <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                                <button type="submit" id="GuardarPunto" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                                <button type="submit" id="ModificarPunto" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="js/Js_PuntoVenta.js?v=1.1"></script>-->
<div class="row">

  <div class="col-md-12">

    <div class="card">
      <div class="card-title">🏪 Puntos de Venta</div>

      <div class="text-right" style="margin-bottom:10px;">
        <button id="nuevoRegistro" class="btn btn-primary">
          ➕ Nuevo Punto de Venta
        </button>
      </div>

      <div class="table-responsive saas-table-container">
        <table id="datatablePuntoVenta" class="table saas-table">
          <thead>
            <tr>
              <th>Acciones</th>
              <th>Establecimiento</th>
              <th>Punto Emisión</th>
              <th>Nombre</th>
              <th>Ambiente</th>
              <th>Secuencia FC</th>
              <th>Secuencia NC</th>
              <th>Secuencia NB</th>
              <th>Secuencia RET</th>
              <th>Impresora</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>% Desc</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

    </div>

  </div>

</div>

<!-- MODAL -->
<div class="modal fade modalNuevo" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">

    <div class="modal-content">

      <div class="modal-header">
        <h4 class="card-title">🏪 Punto de Venta</h4>
      </div>

      <div class="modal-body">

        <form id="RegistroPuntoVenta">

          <div class="row">

            <div class="col-md-6">
              <label>Establecimiento</label>
              <select id="Establecimiento" class="form-control">
                <option value="0">Seleccionar..</option>
                <?php
                $TipoServicio = new Con_Establecimiento();
                $TipoServicio->LlenarCombo();
                ?>
              </select>
            </div>

            <div class="col-md-6">
              <label>Punto Emisión</label>
              <select id="CodigoPunto" class="form-control">
                <option value="0">Seleccionar..</option>
                <?php
                $TipoServicio->LlenarPuntoEmision();
                ?>
              </select>
            </div>

          </div>

          <div class="row">

            <div class="col-md-6">
              <label>Ambiente</label>
              <select id="AmbientePunto" class="form-control">
                <option value="PRUEBA">PRUEBA</option>
                <option value="PRODUCCION">PRODUCCION</option>
              </select>
            </div>

            <div class="col-md-6">
              <label>Nombre</label>
              <input type="text" class="form-control" id="NombrePunto">
            </div>

          </div>

          <div class="row">

            <div class="col-md-6">
              <label>Impresora</label>
              <input type="text" class="form-control" id="ImpresoraPunto">
            </div>

          </div>

          <hr>

          <div class="row">

            <div class="col-md-3">
              <label>Factura</label>
              <input type="number" class="form-control" id="SecuenciaFc">
            </div>

            <div class="col-md-3">
              <label>Nota Crédito</label>
              <input type="number" class="form-control" id="SecuenciaNc">
            </div>

            <div class="col-md-3">
              <label>Nota Débito</label>
              <input type="number" class="form-control" id="SecuenciaNb">
            </div>

            <div class="col-md-3">
              <label>Retención</label>
              <input type="number" class="form-control" id="SecuenciaRe">
            </div>

          </div>

          <div class="row">

            <div class="col-md-4">
              <label>% Descuento</label>
              <input type="number" class="form-control" id="descuento">
            </div>

          </div>

          <div class="text-right" style="margin-top:15px;">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              Cancelar
            </button>
            <button type="submit" id="GuardarPunto" class="btn btn-success">
              💾 Guardar Cambios
            </button>
            <button type="submit" id="ModificarPunto" class="btn btn-primary">
              Modificar
            </button>
          </div>

        </form>

      </div>

    </div>

  </div>
</div>

<script src="js/Js_PuntoVenta.js?v=2.0"></script>