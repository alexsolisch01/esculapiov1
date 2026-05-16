<div class="col-md-12">
  <div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
      <li class="active"><a href="#tab_1" data-toggle="tab">Reporte por Pacintes</a></li>
      <li><a href="#tab_2" data-toggle="tab">Reporte Contabilidad</a></li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane active" id="tab_1">
        <div class="row">
          <div class="col-md-12">
            <div class="box  box-solid">
              <div class="box-body">
                <div class="col-md-12">

                  <div class="form-group col-md-2">
                    <label for="Nombre">FECHA DESDE </label>
                    <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesde" value="<?php echo date("Y-m-d"); ?>">
                  </div>

                  <div class="form-group col-md-2">
                    <label for="Nombre">FECHA HASTA </label>
                    <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHasta" value="<?php echo date("Y-m-d"); ?>">
                  </div>
                  <div class="form-group col-md-2">
                    <br>
                    <button id="CargarReporteLab" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                  </div>

                </div>

                <div class="col-md-12">


                  <table width="100%" id="TablaReporteLab" class="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>FECHA</th>
                        <th>FACTURA</th>
                        <th>PACIENTE</th>
                        <th>EDAD</th>
                        <th>PROCEDIMIENTO</th>
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
      <div class="tab-pane" id="tab_2">
        <div class="row">
          <div class="col-md-12">
            <div class="box  box-solid">
              <div class="box-body">
                <div class="col-md-12">

                  <div class="form-group col-md-2">
                    <label for="Nombre">FECHA DESDE </label>
                    <input class="form-control input-sm" autocomplete="off" type="date" id="fechaDesde2" value="<?php echo date("Y-m-d"); ?>">
                  </div>

                  <div class="form-group col-md-2">
                    <label for="Nombre">FECHA HASTA </label>
                    <input class="form-control input-sm" autocomplete="off" type="date" id="fechaHasta2" value="<?php echo date("Y-m-d"); ?>">
                  </div>

                  <div class="form-group col-md-2">
                    <label for="Nombre">TIPO </label>
                    <select class="form-control" id="cbmTipo">
                      <option value="1">RESUMIDO</option>
                      <option value="2">DETALLADO</option>
                    </select>
                  </div>

                  <div class="form-group col-md-2">
                    <br>
                    <button id="CargarReporteLab2" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR (F1)</button>
                  </div>

                </div>

                <div class="col-md-12">
                  <table width="100%" id="TablaReporteLab2" class="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>N°</th>
                        <th>FECHA</th>
                        <th>NOMINA</th>
                        <th>PROCEDIMIENTO</th>
                        <th>COBRADO</th>
                        <th>PAGADO</th>
                        <th>GANANCIA</th>
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

<script src="js/Js_ReporteLab.js?=1.1"></script>