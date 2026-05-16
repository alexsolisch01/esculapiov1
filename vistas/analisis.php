<div class="col-md-12">
    <div class="box box-primary box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">ORDEN DE COMPRA</h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div> <!-- /.box-tools -->
        </div><!-- /.box-header -->
        <div class="box-body">
            <div class="col-md-12">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs">
                        <li class="active" data-toggle="tooltip" title data-original-title="Paso 1" id="PestanaAnalisis"><a id="TabAnalisis" href="#analisis" data-toggle="tab">ANÁLISIS<small class="label pull-right badge bg-light-blue" style="margin-left: 2px; margin-top: 2px;">1</small></a></li>
                        <li data-toggle="tooltip" title data-original-title="Paso 2" id="PestanaOrden"><a id="TabOrden" href="#orden" data-toggle="tab">ORDEN<small class="label pull-right badge bg-light-blue" style="margin-left: 2px; margin-top: 2px;">2</small></a></li>
                    </ul>
                    <div class="tab-content">
                        <!-- /.tab-pane -->
                        <div class="active tab-pane" id="analisis">
                            <div class="box-body ">
                                <input style="display: none;" class="form-control input-sm" type="date" id="fechaMovi" required value="<?php echo date("Y-m-d"); ?>">
                                <label style="display: none;" class="form-control input-sm" id="HoraMovi"> <?php echo date("H:i:s"); ?></label>

                                <label style="display: none;" id="nombreEsta" nombreEstablecimiento="<?php echo $_SESSION['nombreComercial'] ?>">OBSERVACIONES: </label>
                                <div class="col-md-12">
                                    <div class="form-group col-md-2">
                                        <label for="Nombre">FECHA I</label>
                                        <input class="form-control input-sm" type="date" id="fechaDesdeI" value="<?php echo date("Y-m-d"); ?>">
                                    </div>

                                    <div class="form-group col-md-2">
                                        <label for="Nombre">FECHA F</label>
                                        <input class="form-control input-sm" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d"); ?>">
                                    </div>

                                    <div class="form-group col-md-2">+
                                        <label for="Nombre">FILTRAR</label>
                                        <select id="filtrarFecha" name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                            <option value="0">Seleccionar</option>
                                            <!-- <option value="1">HOY</option>
                                  <option value="2">AYER</option> -->
                                            <option value="3">LO QUE VA DE ESTE MES</option>
                                            <option value="4">EL MES ANTERIOR</option>
                                            <option value="7">DESDE HACE DOS MESES</option>
                                            <option value="8">DESDE HACE 3 MESES</option>
                                            <option value="9">DESDE HACE 6 MESES</option>
                                            <option value="5">LO QUE VA DE ESTE AÑO</option>
                                            <option value="6">EL AÑO ANTERIOR</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="Nombre">BODEGA</label>
                                        <select id="bodegaMovi" name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                            <option value="0">Seleccionar</option>
                                            <?php
                                            $TipoServicio = new Con_Bodega();
                                            $TipoServicio->LlenarComboBodega();
                                            ?>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="Nombre">PROVEEDORES</label>
                                        <select id="proveMovi" name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                            <option value="0">Todos</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="Nombre">LINEA DE FABRICACION</label>
                                        <select id="LineaBode" name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                            <option value="0">Seleccionar..</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-2 pull-right">
                                        <button type="submit" id="ordenCompra" class="btn btn-primary"><i class="fa fa-save" aria-hidden="true"></i> GENERAR ORDEN</button>
                                    </div>

                                    <div class="form-group col-md-2 pull-right">
                                        <button type="submit" id="CargarTablaAnalisis" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR</button>
                                    </div>



                                </div>

                                <div class="col-md-12" id="CargarAnalisis">
                                    <table width="100%" id="datatableAnalisis" class="table table-striped table-bordered transporte">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NOMBRE</th>
                                                <th>PRESENTACION</th>
                                                <th>UNIDAD</th>
                                                <th>CANTIDAD</th>
                                                <th class="text-center">U.C.</th>
                                                <th class="text-center">U.V.</th>
                                                <th class="text-center">ST.</th>
                                                <th>CAJA</th>
                                                <th>UNIDAD</th>
                                                <th>SUGERENCIA</th>
                                                <th>BONIFICADO</th>
                                                <th>FINANCIERO</th>
                                                <th><input type="checkbox" id="CheckTodos"></th>
                                                <!-- <th>PRECIO</th> -->
                                            </tr>
                                        </thead>
                                        <tbody class="pointer">
                                            <?php

                                            //$Perfil = new Con_Especialidad();

                                            //$Perfil->CargarTipoServicio();
                                            ?>
                                        </tbody>
                                    </table>

                                </div>


                            </div>
                        </div>
                        <div class="tab-pane" id="orden">
                            <div class="row">
                                <div class="col-md-3">
                                    <label for="Nombre">FECHA DESDE </label>
                                    <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesdeF" value="<?php echo date("Y-m-d"); ?>">
                                </div>
                                <div class="col-md-3">
                                    <label for="Nombre">FECHA HASTA</label>
                                    <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHastaF" value="<?php echo date("Y-m-d"); ?>">
                                </div>
                                <div class="col-md-6" style="margin-top: 20px;">
                                    <button type="submit" id="BuscarOrden" class="btn btn-primary pull-right"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                                </div>
                            </div>
                            <div class="row" style="margin-top: 10px;">
                                <div class="col-md-6">
                                    <input type="text" class="form-control" autocomplete="off" id="numeroO" name="CÉDULA" placeholder="0000001">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" autocomplete="off" id="proveedorO" name="CÉDULA" placeholder="PROVEEDOR">
                                </div>
                                <div class="x_content">
                                    <table id="datatableDetalleOrden" width="100%" class="table table-striped table-bordered table-condensed">
                                        <thead>
                                            <tr>
                                                <th>ACCIONES</th>
                                                <th>NUMERO</th>
                                                <th>PROVEEDOR</th>
                                                <th>FECHA</th>
                                                <th>ESTADO</th>
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
                </div>
                <div class="modal  fade" id="modalProveedor" tabindex='-1'>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">ORDEN A PROVEEDOR</h4>
                            </div>
                            <div class="modal-body">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="Nombre">PROVEEDORES</label>
                                        <select id="proveMoviFinal" name="instruccion" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                            <option value="0">Seleccionar</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" style="background-color: #fff; border: none;">
                                <button type="button" class="btn btn-success pull-right" id="generarOrden"> <i class="fa fa-save" aria-hidden="true"></i> GENERAR ORDEN</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal  fade" id="modalUltimasCompras" tabindex='-1'>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="tituloUltimasCompras">ÚLTIMAS COMPRAS</h4>
                            </div>
                            <div class="modal-body">
                                <div class="col-md-12">
                                    <table width="100%" id="datatableUltimasCompras" class="table table-striped table-bordered transporte">
                                        <thead>
                                            <tr>
                                                <th>FECHA</th>
                                                <th>PROVEEDOR</th>
                                                <th>CANTIDAD</th>
                                                <th>PRECIO</th>
                                                <th>TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody class="pointer">
                                            <?php

                                            //$Perfil = new Con_Especialidad();

                                            //$Perfil->CargarTipoServicio();
                                            ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer" style="background-color: #fff; border: none;">
                                <button type="button" class="btn btn-danger pull-right" data-dismiss="modal" id=""></i> CERRAR</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal  fade" id="modalOrden" tabindex='-1'>
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="tituloUltimasCompras">ORDEN</h4>
                            </div>
                            <div class="modal-body">
                                <div class="col-md-4">
                                    <label for="Nombre">NÚMERO ORDEN</label>
                                    <input class="form-control input-sm" autocomplete="off" type="text" disabled id="1">
                                </div>
                                <div class="col-md-4">
                                    <label for="Nombre">PROVEEDOR</label>
                                    <input class="form-control input-sm" autocomplete="off" type="text" disabled id="2">
                                </div>
                                <div class="col-md-4">
                                    <label for="Nombre">FECHA</label>
                                    <input class="form-control input-sm" autocomplete="off" type="text" disabled id="3">
                                </div>
                                <div class="col-md-12">
                                    <table width="100%" id="datatableDetalle" class="table table-striped table-bordered transporte">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>ITEM</th>
                                                <th>PRESENTACIÓN</th>
                                                <th>CANTIDAD</th>
                                            </tr>
                                        </thead>
                                        <tbody class="pointer">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer" style="background-color: #fff; border: none;">
                                <button type="button" class="btn btn-danger pull-right" style="margin-left: 10px;" data-dismiss="modal"></i> CERRAR</button>
                                <button type="button" class="btn btn-primary pull-right" id="Imprimir"></i> IMPRIMIR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<script src="js/Js_Analisis.js?v=1.6"></script>