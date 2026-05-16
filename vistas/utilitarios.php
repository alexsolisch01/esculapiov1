<div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">UTILIDADES DEL SISTEMA</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <div class="row">              
              <div class="col-md-6">
                <h3>ACTUALIZACION DE GENERO</h3>
                <table id="datatablePacientes" width="100%" cellspacing="0" class="table nowrap table-condensed">
                  <thead>
                    <tr>
                      <th>A. PATERNO</th>
                      <th>A. MATERNO</th>
                      <th>NOMBRES</th>
                      <th>MASCULINO</th>
                      <th>FEMENINO</th>
                    </tr>
                  </thead>
                  <tbody>
                        
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                <h3>UNIFICADOR DE HISTORIAS CLINICAS</h3>
                <div class="col-md-12">
                  <label>PACIENTE A UNIFICAR</label>
                  <select id="cbmPaciente1" class="form-control input-sm selectpicker" data-live-search="true"></select>                  
                </div>

                <div class="col-md-12">
                  <br>
                  <label>PACIENTE A ELIMINAR</label>
                  <select id="cbmPaciente2" class="form-control input-sm selectpicker" data-live-search="true"></select>
                </div>
                <div class="col-md-12 text-center">
                  <br>
                  <button type="submit" id="UnificarHCU" class="btn btn-success"><i class="fa fa-process" aria-hidden="true"></i>UNIFICAR Y ELIMINAR HCU</button>
                </div>
              </div>

              <div class="col-md-6">
                <h3>HABILITAR DOCUMENTOS DEVUELTOS (CLAVE DE ACCESO REGISTRADA)</h3>
                <div class="col-md-12 text-center">
                  <br>
                  <button type="submit" id="HabilitarDocumentos" class="btn btn-success"><i class="fa fa-process" aria-hidden="true"></i>HABILITAR</button>
                </div>
              </div>

              <div class="col-md-6">
                <h3>IGUALAR STOCK DE CAJEROS AL KARDEX</h3>
                <div class="col-md-12 text-center">
                  <br>
                  <button type="submit" id="ActualizarStock" class="btn btn-success"><i class="fa fa-process" aria-hidden="true"></i>PROCESAR</button>
                </div>
              </div>

            </div>
          </div>
</div>          
<script src="js/Js_Utilidades.js?v=1.2"></script> 