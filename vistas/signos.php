<link rel="stylesheet" href="css/chosen.css">
<link rel="stylesheet" href="css/ImageSelect.css">

<script src="js/chosen.jquery.js" type="text/javascript"></script>
<script src="js/ImageSelect.jquery.js" type="text/javascript"></script>

<div class="col-md-12">
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">SIGNOS VITALES</h3>
    </div>
    <!-- /.box-header -->
    <!-- form start -->
    <div class="row">
      <div class="col-md-6">
        <form role="form" method="post" id="RegistroSigno">
          <input type="hidden" name="idPacienteSigno" id="idPacienteSigno">
          <input type="hidden" name="idFechaSigno" id="idFechaSigno">
          <label style="margin-left: 1em"> ESPECIALIDAD: </label>
          <span id="especialidad"> -------------- </span><br>

          <div class="form-group col-md-7">
            <label for="Nombre">PACIENTE </label>
            <label id="ApellidoP" class="form-control input-sm"></label>
          </div>

          <div class="form-group col-md-5">
            <label for="Nombre">EDAD </label>
            <label class="form-control input-sm" id="EdadS"></label>
          </div>

          <div class="col-md-3">
            <div class="form-group">
              <label for="">PRESIÓN ARTERIAL</label>
              <div class="input-group">
                <input name="remitosucursal" id="Presi1" onclick="javascript: limpia(this);" type="number" required class="form-control input-sm">
                <span class="input-group-addon">/</span>
                <input name="remitonumero" id="Presi2" onclick="javascript: limpia(this);" type="number" required class="form-control input-sm">
              </div>
            </div>
          </div>
          <input type="text" style="display: none;" class="form-control input-sm" id="turnoSigno" name="nombre">
          <input type="text" style="display: none;" class="form-control input-sm" id="horaInicio" name="nombre">

          <div class="form-group col-md-2">
            <label for="Nombre">PULSO </label>
            <input type="number" step="0.1" class="form-control input-sm" id="PulsoS" onclick="javascript: limpia(this);" required>
          </div>
          <div class="form-group col-md-2">
            <label for="Nombre">PESO </label>
            <input type="number" step="0.01" class="form-control input-sm" id="pesoSignos" onclick="javascript: limpia(this);" required>
          </div>
          <div class="form-group col-md-2">
            <label for="Nombre">TALLA </label>
            <input type="number" step="0.1" class="form-control input-sm" id="alturaSignos" onclick="javascript: limpia(this);" required>
          </div>

          <div class="form-group col-md-2">
            <label id="botao">IMC </label><br />
            <label required id="resultadoImcSignos" onclick="javascript: limpia(this);" onBlur="javascript: verifica(this);"> </label>
          </div>
          <div class="clearfix"></div>
          <div class="form-group col-md-2">
            <label for="Nombre">F.RESPE </label>
            <input type="number" step="0.1" class="form-control input-sm" id="frSignos" onclick="javascript: limpia(this);">
          </div>
          <div class="form-group col-md-2">
            <label for="Nombre">TEMP.AXILAR </label>
            <input type="number" step="0.1" class="form-control input-sm" id="TempA" onclick="javascript: limpia(this);">
          </div>
          <div class="form-group col-md-2">
            <label for="Nombre">TEMP.BUCAL </label>
            <input type="number" step="0.1" class="form-control input-sm" id="TempB" onclick="javascript: limpia(this);">
          </div>

          <div class="form-group col-md-2">
            <label for="Nombre">TEMP.RECTAL </label>
            <input type="number" step="0.1" class="form-control input-sm" id="TempR" onclick="javascript: limpia(this);">
          </div>
          <div class="form-group col-md-2">
            <label for="Nombre">P.CEFA </label>
            <input type="number" step="0.1" class="form-control input-sm" id="PeriC" onclick="javascript: limpia(this);">
          </div>
          <div class="form-group col-md-2">
            <label for="Nombre">P.ABDO </label>
            <input type="number" step="0.1" class="form-control input-sm" id="PeriA" onclick="javascript: limpia(this);">
          </div>
          <div class="form-group col-md-4">
            <label for="Nombre">TRIAGE :</label>
            <select class="my-select" id="AsignarS" name="asignars">
              <option value="SELECCIONAR">SELECCIONAR..</option>
              <option data-img-src="imagenes/rojo.png" value="RESUCITACION">RESUCITACION</option>
              <option data-img-src="imagenes/naranja.png" value="EMERGENCIA">EMERGENCIA</option>
              <option data-img-src="imagenes/amarillo.png" value="URGENCIA">URGENCIA</option>
              <option data-img-src="imagenes/verde.png" value="URGENCIA MENOR">URGENCIA MENOR</option>
              <option selected="true" data-img-src="imagenes/azul.png" value="SIN URGENCIA">SIN URGENCIA</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label for="Nombre">PRIORIDAD :</label>
            <select id="PrioridadS" name="prioridadS" class="my-select">
              <option value="SELECCIONAR">SIN PRIORIDAD</option>
              <option data-img-src="imagenes/silla.jpg" value="PACIENTE EN SILLA DE RUEDA">SILLAS DE RUEDA</option>
              <option data-img-src="imagenes/pregnancy.png" value="EMBARAZADA">EMBARAZADA</option>
              <option data-img-src="imagenes/mental.png" value="DISCAPACITADO">DISCAPACITADO</option>
              <option data-img-src="imagenes/tercera.jpg" value="TERCERA EDAD">TERCERA EDAD</option>
            </select>
          </div>
          <div class="col-md-12">
            <div id="consultasFactura" class="btn btn-default " data-toggle="modal" data-target="#modal-consultas"> <i class="fa fa-stethoscope" aria-hidden="true"></i>PACIENTES(F1)</div>
            <button type="submit" id="GuardarSigno" class="btn btn-success">Guardar(F10)</button>
            <button type="submit" id="ModificarSigno" disabled class="btn btn-dark"> Modificar(F11)</button>
            <button type="reset" class="btn btn-info" id="LimpiarSigno"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar(F12)</button>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        <table id="datatableUltimosSignosVitales" cellspacing="0" width="100%" class="table nowrap table-condensed">
          <thead>
            <tr>
              <th>FECHA</th>
              <th>PRESIÓN </th>
              <th>PULSO </th>
              <th>PESO </th>
              <th>TALLA </th>
              <th>IMC </th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-consultas" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">CONSULTA</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <h4 class="modal-title">SIGNOS VITALES
              <div class="col-md-3 pull-right">
                <input type="date" value="<?php echo date("Y-m-d"); ?>" class="form-control input-sm" id="FechaSigno">
              </div>
            </h4>
            <div class="x_content">
              <table id="datatableSignosVitales" width="100%" cellspacing="0" class="table nowrap table-condensed">
                <thead>
                  <tr>
                    <th># Fact</th>
                    <th>ESPECIALIDAD</th>
                    <th>APELLIDOS</th>
                    <th>NOMBRES</th>
                    <th>TURNO</th>
                    <th>DOCTOR RESPONSABLE</th>
                    <th>ESTADO</th>
                    <th>ESTADO</th>
                    <th>ESTADO</th>
                    <th>Consulta Item</th>
                  </tr>
                </thead>
                <tbody class="pointer tableSignosVitales">
                  <?php
                  //$Perfil = new Con_Signos();
                  //$Perfil->CargarPacientesSignos();
                  ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal  fade modalCodigo" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog   modal-sm" role="document">
    <div class="modal-content">

      <div class="modal-header btn-info">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
        </button>
        <h4 class="modal-title">CODIGO PERSONAL</h4>
      </div>
      <div class="modal-body">

        <div class="row">
          <div class="col-md-12">
            <input type="password" class="form-control" id="codigoPersonal">
          </div>
        </div>
        <div class="clearfix"></div>

      </div>
      <div class="modal-footer">
        <button type="button" id="GSigno" class="btn btn-success" data-dismiss="modal">Aceptar</button>
      </div>

    </div>
  </div>
</div>

<script>
  $(".my-select").chosen({
    width: "100%",
    html_template: '<img style="padding:0px;margin-right:4px" class="{class_name}" src="{url}">'
  });

  function limpia(elemento) {
    elemento.value = "";
  }
</script>

<script src="js/Js_Signos.js?v=1.7"></script>