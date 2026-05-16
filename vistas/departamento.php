<div class="col-md-12">
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">DEPARTAMENTOS</h3>
        </div>
        <div class="box-body ">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="col-md-1">
                    <button id="nuevoRegistro" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
            </div>
            <div class="col-md-12">
                <br><br>
                <table id="datatableDepartamento" cellspacing="0" class="table nowrap table-condensed" width="100%">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>NOMBRE</th>
                            <th>CUENTA CONTABLE </th>
                            <th>CUENTA PRESUPUESTARIA </th>
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
                <h4 class="modal-title">DEPARTAMENTO</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <form role="form" method="post" id="RegistroDepartamento">
                            <div class="form-group col-md-6">
                                <label for="Nombre">NOMBRE</label>
                                <input type="text" required class="form-control input-sm" autocomplete="off" id="DescripcionDepa" name="descripciondepa" placeholder="DESCRIPCION DEL DEPARTAMENTO">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Nombre">CUENTA CONTABLE</label>
                                <input type="text" required class="form-control input-sm" autocomplete="off" id="CuentaContable" name="cuentacontable" placeholder="CUENTA CONTABLE">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Nombre">CUENTA PRESUPUESTARIA</label>
                                <input type="text" required class="form-control input-sm" autocomplete="off" id="CuentaPresupuestaria" name="cuentapresupuestaria" placeholder="CUENTA PRESUPUESTARIA">
                            </div>
                            <div class="col-md-12">
                                <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                                <button type="submit" id="GuardarDepa" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                                <button type="submit" id="ModificarDepa" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="js/Js_Departamento.js?v=1.0"></script>