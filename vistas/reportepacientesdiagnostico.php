<div class="col-md-12">
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">REPORTE DE PACIENTES POR DIAGNÓSTICO</h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
        </div>
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

                <div class="form-group col-md-4">
                    <label for="Nombre">CIE-10</label>
                    <select id="cbmCie" class="selectpicker show-tick form-control" data-live-search="true">

                    </select>
                </div>

                <div class="form-group col-md-2">
                    <label for="Nombre">PROCEDIMIENTO</label>
                    <select id="cbmProcedimiento" name="instruccion" class="selectpicker show-tick form-control" data-live-search="true">
                        <?php
                        $obj = new Con_Agenda();
                        $obj->LlenarComboParteDiario();
                        ?>
                    </select>
                </div>
                <div class="form-group col-md-2">
                    <br>
                    <button id="CargarReporte" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> CONSULTAR</button>
                </div>
            </div>
            <div class="col-md-12">
                <table width="100%" id="TablaReporte" class="table table-striped table-bordered nowrap">
                    <thead>
                        <tr>
                            <th>FECHA</th>
                            <th>PACIENTE</th>
                            <th>DIRECCIÓN</th>
                            <th>TELEFONO</th>
                            <th>CIE-10</th>
                            <th>PROCEDIMIENTO</th>
                            <th>EVOLUCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script src="js/Js_ReportePacientesDiagnostico.js?v=1.0"></script>