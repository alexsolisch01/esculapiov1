<!--<div class="col-md-12">
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">CIE-10</h3>
        </div>
        <div class="box-body ">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="col-md-1">
                    <button id="nuevoRegistro" class="btn btn-sm btn-default" title="NUEVO REGISTRO"><img src="imagenes/nuevo.png"></button>
                </div>
            </div>
            <div class="col-md-12">
                <br><br>
                <table id="datatableCie" width="100%" cellspacing="0" class="table nowrap table-condensed">
                    <thead>
                        <tr>
                            <th></th>
                            <th>CÓDIGO</th>
                            <th>DESCRIPCIÓN</th>
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
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">CIE-10</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <form role="form" method="post" id="FrmRegistro">
                            <div class="form-group col-md-12">
                                <label for="Nombre">CÓDIGO</label>
                                <input type="text" required class="form-control input-sm" autocomplete="off" id="codigoCie">
                            </div>
                            <div class="form-group col-md-12">
                                <label for="Nombre">DESCRIPCIÓN</label>
                                <input type="text" required class="form-control input-sm" autocomplete="off" id="descripcionCie">
                            </div>
                            <div class="col-md-12">
                                <button type="reset" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                                <button type="submit" id="GuardarIngreso" class="btn btn-success pull-right"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                                <button type="submit" id="ModificarIngreso" class="btn btn-primary pull-right"><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="js/Js_Cie.js?v=1.0"></script>-->
<div class="row">

<div class="col-md-12">

  <div class="card">

    <div class="card-title">🩺 CIE-10</div>

    <!-- BOTÓN -->
    <div class="text-right" style="margin-bottom:10px;">
      <button id="nuevoRegistro" class="btn btn-primary">
        ➕ Nuevo Registro
      </button>
    </div>

    <!-- TABLA -->
    <div class="table-responsive saas-table-container">

      <table id="datatableCie" class="table saas-table">

        <thead>
          <tr>
            <th>Acciones</th>
            <th>Código</th>
            <th>Descripción</th>
          </tr>
        </thead>

        <tbody></tbody>

      </table>

    </div>

  </div>

</div>

</div>

<!-- ================= MODAL ================= -->
<div class="modal fade modalNuevo" tabindex='1' data-backdrop="static" data-keyboard="false">

  <div class="modal-dialog modal-sm">

    <div class="modal-content">

      <div class="modal-header">
        <h4 class="card-title">🩺 CIE-10</h4>
      </div>

      <div class="modal-body">

        <form role="form" method="post" id="FrmRegistro">

          <div class="card">

            <div class="card-title">📋 Información</div>

            <div class="row">

              <div class="col-md-12">
                <label class="form-label">Código</label>
                <input type="text" required class="form-control" autocomplete="off" id="codigoCie">
              </div>

              <div class="col-md-12">
                <label class="form-label">Descripción</label>
                <input type="text" required class="form-control" autocomplete="off" id="descripcionCie">
              </div>

            </div>

          </div>

          <!-- BOTONES -->
          <div class="text-right" style="margin-top:15px;">

            <button type="reset" class="btn btn-default" data-dismiss="modal">
              Cancelar
            </button>

            <button type="submit" id="GuardarIngreso" class="btn btn-success">
              💾 Guardar
            </button>

            <button type="submit" id="ModificarIngreso" class="btn btn-primary">
              Modificar
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>

</div>

<script src="js/Js_Cie.js?v=1.0"></script>