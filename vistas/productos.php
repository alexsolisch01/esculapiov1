<div class="col-md-12">
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">PRODUCTOS</h3>
        </div>
        <div class="box-body ">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="col-md-1">
                    <button id="nuevoRegistro" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group col-md-2 ">
                    <label for="Nombre">BODEGAS </label>
                    <select id="bodegaMoviIN" required name="instruccion" class="form-control input-sm">
                        <option value="0">Seleccionar</option>
                        <?php
                        $TipoServicio = new Con_Bodega();
                        $TipoServicio->LlenarComboBodega();
                        ?>
                    </select>
                </div>
                <div class="form-group col-md-2">
                    <label for="Nombre">&nbsp;</label>
                    <input type="text" class="form-control input-sm" id="nombreComercialF1" placeholder="Nombre Comercial">
                </div>
                <div class="form-group col-md-2">
                    <label for="Nombre">&nbsp;</label>
                    <input type="text" class="form-control input-sm" id="presentacionF1" placeholder="Presentacion">
                </div>
                <div class="form-group col-md-2">
                    <label for="Nombre">&nbsp;</label>
                    <input type="text" class="form-control input-sm" id="principioF1" placeholder="Principio Activo">
                </div>
                <div class="form-group col-md-2">
                    <label for="Nombre">&nbsp;</label>
                    <input type="text" class="form-control input-sm" autocomplete="off" id="lineafabricacionF1" placeholder="Linea de Fabricacion">
                </div>
                <div class="form-group col-md-2">
                    <label for="Nombre">&nbsp;</label>
                    <input type="text" class="form-control input-sm" autocomplete="off" id="clasificacionF1" placeholder="Clasificacion Farmacologica">
                </div>
            </div>
            <div class="col-md-12">
                <br><br>
                <table id="datatableBog" width="100%" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                        <tr>
                            <th></th>
                            <th>NOMBRE COMERCIAL</th>
                            <th>PRESENTACION</th>
                            <th>LINEA</th>
                            <th>CLASIFICACION</th>
                            <th>PRINCIPIO 1</th>
                            <th>PRINCIPIO 2</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
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
                <h4 class="modal-title">PRODUCTO</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <form role="form" method="post" id="RegistroPadre">
                            <div class="form-group col-md-6">
                                <label for="Nombre">BODEGA</label>
                                <select id="CataBode" name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                    <option value="0">Seleccionar..</option>
                                    <?php
                                    $TipoServicio = new Con_Bodega();
                                    $TipoServicio->LlenarComboBodega();
                                    ?>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Nombre">LINEA</label>
                                <select id="LineaBode" name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                    <option value="0">Seleccionar..</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Nombre">NOMBRE COMERCIAL</label>
                                <input type="text" required class="form-control input-sm" autocomplete="off" id="NombreBode" name="nombrecomer" placeholder="Descripcion...">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Nombre">P.GALENICA</label>
                                <select id="PreseBode" name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                    <option value="0">Seleccionar..</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Nombre">P.COMERCIAL</label>
                                <input type="text" required class="form-control input-sm" autocomplete="off" id="PresentacionInventario" name="nombrecomer" placeholder="Descripcion...">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Nombre">C.FARMACOLOGICA</label>
                                <select id="ClasiBode" name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                    <option value="0">Seleccionar..</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>P.Activo</th>
                                            <th>Cantidad</th>
                                            <th>U.M</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style="max-width: 150px;">
                                                <select id="PABode1" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                                    <option value="0">Seleccionar..</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="number" tipoDato="Numero" step="0.01" class="form-control input-sm" id="CanteBode1" value="0">
                                            </td>
                                            <td>
                                                <select id="UM1" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                                    <option value="0">-</option>
                                                    <option value="%">%</option>
                                                    <option value="CC">CC</option>
                                                    <option value="DL">DL</option>
                                                    <option value="GR">GR</option>
                                                    <option value="KG">KG</option>
                                                    <option value="MG">MG</option>
                                                    <option value="ML">ML</option>
                                                    <option value="OZ">OZ</option>
                                                    <option value="PG">PG</option>
                                                    <option value="PL">PL</option>
                                                    <option value="UFC">UFC</option>
                                                    <option value="UG">UG</option>
                                                    <option value="UI">UI</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="max-width: 150px;">
                                                <select id="PABode2" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                                    <option value="0">Seleccionar..</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="number" tipoDato="Numero" step="0.01" class="form-control input-sm" id="CanteBode2" value="0">
                                            </td>
                                            <td>
                                                <select id="UM2" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                                    <option value="0">-</option>
                                                    <option value="%">%</option>
                                                    <option value="CC">CC</option>
                                                    <option value="DL">DL</option>
                                                    <option value="GR">GR</option>
                                                    <option value="KG">KG</option>
                                                    <option value="MG">MG</option>
                                                    <option value="ML">ML</option>
                                                    <option value="OZ">OZ</option>
                                                    <option value="PG">PG</option>
                                                    <option value="PL">PL</option>
                                                    <option value="UFC">UFC</option>
                                                    <option value="UG">UG</option>
                                                    <option value="UI">UI</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="max-width: 150px;">
                                                <select id="PABode3" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                                    <option value="0">Seleccionar..</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="number" tipoDato="Numero" step="0.01" class="form-control input-sm" id="CanteBode3" value="0">
                                            </td>
                                            <td>
                                                <select id="UM3" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                                    <option value="0">-</option>
                                                    <option value="%">%</option>
                                                    <option value="CC">CC</option>
                                                    <option value="DL">DL</option>
                                                    <option value="GR">GR</option>
                                                    <option value="KG">KG</option>
                                                    <option value="MG">MG</option>
                                                    <option value="ML">ML</option>
                                                    <option value="OZ">OZ</option>
                                                    <option value="PG">PG</option>
                                                    <option value="PL">PL</option>
                                                    <option value="UFC">UFC</option>
                                                    <option value="UG">UG</option>
                                                    <option value="UI">UI</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="max-width: 150px;">
                                                <select id="PABode4" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                                    <option value="0">Seleccionar..</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="number" tipoDato="Numero" step="0.01" class="form-control input-sm" id="CanteBode4" value="0">
                                            </td>
                                            <td>
                                                <select id="UM4" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                                    <option value="0">-</option>
                                                    <option value="%">%</option>
                                                    <option value="CC">CC</option>
                                                    <option value="DL">DL</option>
                                                    <option value="GR">GR</option>
                                                    <option value="KG">KG</option>
                                                    <option value="MG">MG</option>
                                                    <option value="ML">ML</option>
                                                    <option value="OZ">OZ</option>
                                                    <option value="PG">PG</option>
                                                    <option value="PL">PL</option>
                                                    <option value="UFC">UFC</option>
                                                    <option value="UG">UG</option>
                                                    <option value="UI">UI</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Nombre">CODIGO DE BARRA</label>
                                <input type="" class="form-control input-sm" autocomplete="off" id="CodiBode" name="nombrecomer" placeholder="Codigo de Barra">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="Nombre" class="col-md-12" style="margin-left: 1em;">IVA</label>
                                <div class="form-check col-md-4">
                                    <label><input type="radio" value="" name="radio1" id="radio1" checked> <span class="label-text"></span>SI</label>
                                </div>
                                <div class="form-check col-md-4">
                                    <label><input type="radio" value="" name="radio1" id="radio2" checked> <span class="label-text"></span>NO</label>
                                </div>
                            </div>
                            <div class="form-group col-md-3" id="DivValorCaja">
                                <label for="Fecha Nacimiento">VALOR EMPAQUE</label>
                                <input type="number" class="form-control input-sm" step="0.01" autocomplete="off" id="ValorCaja" name="fechaAdmi" placeholder="Precio Caja">
                            </div>
                            <br>
                            <div class="col-md-6">
                                <label for="percha">PERCHA</label>
                                <select id="percha" name="percha" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                    <?php
                                    for ($i = 1; $i < 20; $i++) {
                                        echo '<option value="' . $i . '">' . $i . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                            <div class="clearfix"></div>
                            <div class="form-group col-md-6" style="display: none;" id="DivCostoInventario">
                                <label for="Fecha Nacimiento">COSTO INVENTARIO</label>
                                <input type="number" class="form-control input-sm" id="FechaBode" autocomplete="off" name="fechaAdmi" disabled placeholder="Costo Inventario">
                            </div>
                            <div class="form-group col-md-6" style="display: none;" id="DivCantidadActual">
                                <label for="Fecha Nacimiento">CANTIDAD ACTUAL</label>
                                <input type="number" class="form-control input-sm" autocomplete="off" id="StockBode" name="fechaAdmi" disabled placeholder="StockMinimo">
                            </div>
                            <div class="col-md-12">
                                <table id="Presentacion1" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>PRESENTACION</th>
                                            <th colspan="3">DESCRIPCION</th>
                                        </tr>
                                    </thead>
                                    <tbody class="pointer tablaBode" style="margin: 0px;">
                                        <tr id="Nivel1">
                                            <td id="presentacion2">DEFINIR</td>
                                            <td><input type="number" style="width: 6em; margin-bottom: -3em" id="cantidad1" name="nombrecomer" value="1"></td>
                                            <td><input type="number" step='0.01' required style="width: 6em;" id="costo1" value="15" disabled name="nombrecomer"></td>
                                            <td><span id="ModalPorcentaje" data-toggle="modal" data-target="#modal-porcentaje" class="btn btn-primary"><span>%</span></span></td>
                                        </tr>
                                        <tr id="Nivel2">
                                            <td id="presentacion1">
                                                <select id="PresenBode" name="instruccion" style="width: 100% ;height : 2.35em; appearance:none;-webkit-appearance:none;-ms-appearance:none;-o-appearance:none;">
                                                    <option values="(NINGUNO)">(NINGUNO)</option>
                                                    <option value="CAJA">CAJA</option>
                                                    <option value="PAQUETE">PAQUETE</option>
                                                    <option value="FUNDA">FUNDA</option>
                                                    <option value="SOBRE">SOBRE</option>
                                                    <option value="LATA">LATA</option>
                                                    <option values="FRASCO">FRASCO</option>
                                                    <option values="AMPOLLA">AMPOLLA</option>
                                                    <option values="TUBO">TUBO</option>
                                                    <option values="JERINGA">JERINGA</option>
                                                    <option values="SUERO">SUERO</option>
                                                    <option values="CATÉTER">CATÉTER</option>
                                                    <option values="ENVASE">ENVASE</option>
                                                    <option values="CAPSULA">CAPSULA</option>
                                                    <option values="TABLETA">TABLETA</option>
                                                    <option values="COMPRIMIDO">COMPRIMIDO</option>
                                                    <option values="GOTERO">GOTERO</option>
                                                    <option values="GRAGEA">GRAGEA</option>
                                                    <option values="MARIPOSA">MARIPOSA</option>
                                                    <option values="OVULO">OVULO</option>
                                                    <option values="SONDA">SONDA</option>
                                                    <option values="TARRO">TARRO</option>
                                                    <option values="PARCHE">PARCHE</option>
                                                    <option values="SUPOSITORIO">SUPOSITORIO</option>
                                                    <option values="SPRAY">SPRAY</option>
                                                    <option values="INHALADOR">INHALADOR</option>
                                                    <option values="UNIDAD">UNIDAD</option>
                                                    <option values="CASETTE">CASETTE</option>
                                                    <option values="GALON">GALON</option>
                                                    <option values="TABLETAS VAGINALES">TABLETAS VAGINALES</option>
                                                    <option values="CANECA">CANECA</option>
                                                    <option values="BIDON">BIDON</option>
                                                    <option values="ROLLO">ROLLO</option>
                                                    <option values="BLISTER">BLISTER</option>
                                                    <option values="APLICADOR VAGINAL">APLICADOR VAGINAL</option>
                                                    <option values="SACHET">SACHET</option>
                                                    <option values="JARETA">JARETA</option>
                                                    <option values="COMPRIMIDO RECUBIERTO">COMPRIMIDO RECUBIERTO</option>
                                                </select>
                                            </td>
                                            <td><input type="number" style="width: 6em;" value="0" id="cantidad2" name="nombrecomer"></td>
                                            <td><input type="number" style="width: 6em;" id="costo2" disabled value="15" name="nombrecomer"></td>
                                            <td><span id="ModalPorcentaje1" data-toggle="modal" data-target="#modal-porcentaje" class="btn btn-primary"><span>%</span></span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-12" id="VerTabla">
                                <table id="Presentacion2" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>UTILIDAD</th>
                                            <th>COSTO+UTIL.</th>
                                            <th>IVA</th>
                                            <th>P.V.P. ($)</th>
                                            <th>PVP EFECTIVO</th>
                                            <th>PVP TARJETA</th>
                                        </tr>
                                    </thead>
                                    <tbody class="pointer tablaBode">
                                        <tr id="Nivel11">
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="utilidad1" name="nombrecomer"></td>
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="costoutilidad1" name="nombrecomer"></td>
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="iva1" name="nombrecomer"></td>
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="pvp1" name="nombrecomer"></td>
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="pvpefe1" name="nombrecomer"></td>
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="pvptar1" name="nombrecomer"></td>
                                        </tr>
                                        <tr id="Nivel22">
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="utilidad2" name="nombrecomer"></td>
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="costoutilidad2" name="nombrecomer"></td>
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="iva2" name="nombrecomer"></td>
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="pvp2" name="nombrecomer"></td>
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="pvpefe2" name="nombrecomer"></td>
                                            <td><input type="number" step='0.01' disabled style="width: 5em; margin-top: 0.3em; margin-bottom: 0.3em" id="pvptar2" name="nombrecomer"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="form-group col-md-6">
                                <label>DESCUENTO PARA EFECTIVO</label>
                                <input type="number" class="form-control input-sm" step="0.01" autocomplete="off" id="DescuentoEfectivo" >
                            </div>

                            <div class="form-group col-md-6">
                                <label>DESCUENTO PARA TARJETA</label>
                                <input type="number" class="form-control input-sm" step="0.01" autocomplete="off" id="DescuentoTarjeta">
                            </div>

                            <div class="col-md-12">
                                <label>PRESCRIPCIÓN</label>
                                <textarea id="txtPrescripcion" class="form-control" rows="3"></textarea>
                            </div>

                            <div class="col-md-12">
                                <br>
                                <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                                <button type="submit" id="Guardarbog" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                                <button type="submit" id="Modificarbog" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal  fade" id="modal-porcentaje" tabindex='-1'>
        <div class="modal-dialog">
          <div class="modal-content" style="width: 60%; margin-left: 25%">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">DEFINIR UTILIDAD</h4>
            </div>
            <div class="modal-body">
              <div class="box box-body" id="DefinirPorcentaje">
                <div class="form-check col-md-6">
                  <label><input type="radio" value="VALOR" name="radioPorcentaje" id="radioPorcentajeValor"> <span class="label-text"></span>Por Valor</label>
                </div>
                <div class="form-check col-md-6">
                  <label><input type="radio" value="PORCENTAJE" name="radioPorcentaje" id="radioPorcentajePorcentaje" checked> <span class="label-text"></span>Por Porcentaje</label>
                </div>
              </div>
              <div class="box box-body" id="PorValor" style="display: none">
                <div class="col-md-12 form-group">
                  <div class="col-md-6">
                    <h5>VALOR PVP ($)</h5>
                  </div>
                  <div class="col-md-6">
                    <input type="number" class="form-control input-sm" id="PVPValor" placeholder="0.00" value="0.00">
                  </div>
                </div>
              </div>
              <div class="box box-body" id="PorPorcentaje">
                <div class="col-md-12 form-group">
                  <div class="col-md-6">
                    <h5>% DE UTILIDAD</h5>
                  </div>
                  <div class="col-md-6">
                    <input type="number" class="form-control input-sm" id="PVPValorPorcentaje" placeholder="0.00" value="15">
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" style="margin-top: 0.30em;" data-dismiss="modal" class="btn btn-success pull-right" id="CambiarPorcenjate"> <i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
            </div>
          </div>
        </div>
      </div>

<script src="js/Js_Producto.js?v=1.13"></script>