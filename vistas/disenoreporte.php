<!--<link href="css/ckEditor.css" rel="stylesheet">

<div class="row">
  <div class="col-md-12">
    <div class="box box-primary">
        <div class="row">
            <div class="col-md-12">
                <div class="box-body">
                    <main class="row">
                        <div class="col-md-12" style="z-index: 1000;">
                            <div class="col-md-2">
                            </div>
                            <div class="col-md-10">
                                <h1>DISEÑADOR DE DOCUMENTOS MÉDICOS</h1>
                                <div class="row">
                                    <div class="col-md-4">
                                        <h3>REPORTE </h3>
                                        <select id="cbmReporte" class="form-control" data-live-search="true">
                                            <option value="0">NINGUNO</option>
                                            <option value="1">RESULTADOS DE LABORATORIO</option>
                                            <option value="2">RECETA</option>
                                            <option value="3">ORDENES DE EXAMEN</option>
                                            <option value="4">FACTURA</option>
                                            <option value="5">NOTA DE CREDITO</option>
                                            <option value="6">RESULTADOS DE ECO</option>
                                            <option value="7">RESULTADOS DE RX</option>
                                            <option value="8">RESULTADOS DE TOMOGRAFIA</option>
                                            <option value="9">CERTIFICADO MÉDICO</option>
                                            <option value="10">CERTIFICADO DE ASISTENCIA</option>
                                        </select>
                                    </div>
                                    <div class="col-md-1">
                                        <br>
                                        <br>
                                        <button id="GuardarReporteDiseno" class="btn btn-success" title="GUARDAR REPORTE"><img src="imagenes/save.png"></button>
                                        <br>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="adjoined-bottom">
                            <div class="grid-container">
                                <div class="grid-width-100">
                                    <div id="editor">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<script src="Lib/ckeditor/ckeditor.js"></script>
<script src="js/Js_DisenoReporte.js"></script>-->
<div class="row">

  <div class="col-md-12">

    <div class="card">

      <div class="card-title">📝 Diseñador de Documentos Médicos</div>

      <!-- ===== CONTROLES ===== -->
        <div class="card">   
            <div class="row" style:"display:flex; align-items:center;">
                <div class="col-md-6">
                    <label class="form-label">REPORTE</label> 
                    <select id="cbmReporte" class="form-control" data-live-search="true">
                        <option value="0">NINGUNO</option>
                        <option value="1">RESULTADOS DE LABORATORIO</option>
                        <option value="2">RECETA</option>
                        <option value="3">ORDENES DE EXAMEN</option>
                        <option value="4">FACTURA</option>
                        <option value="5">NOTA DE CREDITO</option>
                        <option value="6">RESULTADOS DE ECO</option>
                        <option value="7">RESULTADOS DE RX</option>
                        <option value="8">RESULTADOS DE TOMOGRAFIA</option>
                        <option value="9">CERTIFICADO MÉDICO</option>
                        <option value="10">CERTIFICADO DE ASISTENCIA</option>
                    </select>
                </div>
            
                <div class="col-md-6" style="text-align:right;">
                    <button id="GuardarReporteDiseno" class="btn btn-success"> 💾 GUARDAR REPORTE</button>
                    <!--<button class="btn btn-default">👁 Vista previa</button>-->
                </div> 
            </div>
        </div>
        
        <!-- ===== EDITOR ===== -->
        <div class="card">

            <div class="card-title">✏️ Editor de Documento</div>

            <div class="editor-container">
                <div id="editor"></div>
            </div>

        </div>
    </div>

  </div>

</div>

<link href="css/ckEditor.css" rel="stylesheet">
<script src="Lib/ckeditor/ckeditor.js"></script>
<script src="js/Js_DisenoReporte.js"></script>