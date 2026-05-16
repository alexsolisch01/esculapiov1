<div class="col-md-12">
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">PRESENTACIÓN GALENICA</h3>
        </div>
        <div class="box-body ">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="col-md-1">
                    <button id="nuevoRegistro" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
            </div>
            <div class="col-md-12">
                <br><br>
                <table id="datatableUnidad" width="100%" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>DESCRIPCION</th>
                            <th>PREFIJO</th>
                            <th>FECHA DE REGISTRO</th>
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
                <h4 class="modal-title">PRESENTACIÓN GALENICA</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <form role="form" method="post" id="RegistroUnidad">
                            <div class="form-group col-md-12">
                                <label for="Nombre">DESCRIPCION</label>
                                <input type="text" class="form-control input-sm" autocomplete="off" id="DescripcionUni" name="descripcionuni" placeholder="NOMBRE DE LA UNIDADES...">
                            </div>
                            <div class="form-group col-md-12">
                                <label for="Nombre">PREFIJO</label>
                                <input type="text" class="form-control input-sm" autocomplete="off" id="PrefijoUni" name="prefijouni" placeholder="PREFIJO DE SU UNIDADES">
                            </div>
                            <div class="col-md-12">
                                <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                                <button type="submit" id="GuardarUni" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                                <button type="submit" id="ModificarUni" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="js/Js_Presentacion.js?v=1.0"></script>