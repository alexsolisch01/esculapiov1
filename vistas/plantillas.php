<link href="css/handsontable.full.min.css" rel="stylesheet">
      <div class="col-md-12">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li id="TabProc" class="active"><a href="#MEDICO" data-toggle="tab">LABORATORIO</a></li>
              <li id="TabPlantilla" style="display: none;"><a href="#plantilla" data-toggle="tab">PLANTILLA</a></li>
              <li id="TabProcRx" ><a href="#rx" data-toggle="tab">RAYOS X</a></li>
              <li id="TabPlantillaRx" style="display: none;"><a href="#plantillarx" data-toggle="tab">PLANTILLA RX</a></li>  
              <li id="TabProcEco"><a href="#eco" data-toggle="tab">ECOGRAFÍA</a></li>
              <li id="TabPlantillaEco" style="display: none;"><a href="#plantillaeco" data-toggle="tab">PLANTILLA ECO</a></li>
              <li id="TabProcTac"><a href="#tac" data-toggle="tab">TAC/RMN</a></li>
              <li id="TabPlantillaTac" style="display: none;"><a href="#plantillaTac" data-toggle="tab">PLANTILLA TAC/RMN</a></li>         
            </ul>
            <div class="tab-content">
              <div class="active tab-pane" id="MEDICO">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <table id="datatableProLabPlantilla" cellspacing="0" class="table nowrap table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>                            
                              <th>NOMBRE</th>
                              <th>PLANTILLA</th>
                            </tr>
                          </thead>
                          <tbody>
                            <?php
                              $Perfil = new Con_Laboratorio();
                              $Perfil->CargarProLabNombre();
                            ?>
                          </tbody>
                        </table>
                  </div>
                </div>
              </div>

              <div class="tab-pane" id="rx">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <table id="datatableProRxPlantilla" cellspacing="0" class="table nowrap table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>                            
                              <th>NOMBRE</th>
                              <th>PLANTILLA 1</th>
                              <th>PLANTILLA 2</th>
                              <th>PLANTILLA 3</th>
                            </tr>
                          </thead>
                          <tbody>
                            <?php
                              $Perfil = new Con_Rx();
                              $Perfil->CargarProRxNombre();
                            ?>
                          </tbody>
                        </table>
                  </div>
                </div>
              </div>
              
              <div class="tab-pane" id="eco">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <table id="datatableProEcoPlantilla" cellspacing="0" class="table nowrap table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>                            
                              <th>NOMBRE</th>
                              <th>PLANTILLA 1</th>
                              <th>PLANTILLA 2</th>
                              <th>PLANTILLA 3</th>
                            </tr>
                          </thead>
                          <tbody >
                            <?php
                              $Perfil = new Con_Eco();
                              $Perfil->CargarProEcoNombre();
                            ?>
                          </tbody>
                        </table>
                  </div>
                </div>
              </div>

              <div class="tab-pane" id="tac">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                     <table id="datatableProTacPlantilla" cellspacing="0" class="table nowrap table-condensed" width="100%">
                          <thead>
                            <tr>
                              <th>ID</th>                            
                              <th>NOMBRE</th>
                              <th>PLANTILLA 1</th>
                              <th>PLANTILLA 2</th>
                              <th>PLANTILLA 3</th>
                            </tr>
                          </thead>
                          <tbody >
                            <?php
                              $Perfil = new Con_Tac();
                              $Perfil->CargarProTacNombre();
                            ?>
                          </tbody>
                        </table>
                  </div>
                </div>
              </div>

              <div class="tab-pane" id="plantilla">
                <div class="row">
                  <div class="form-group col-md-6" id="nombreProcedimiento">
                  <label for="Apellido">PROCEDIMIENTO:</label>               
                        <label id="nppp">NOMBRE PROCEDIMIENTO</label>
                  </div>
                  <div style="display: none;" class="form-group col-md-6" id="idProcedimiento">                
                        <label for="Apellido">ID </label>
                  </div>
                  <div id="datatableHandsome" class="dataTable" ></div>
                
                  <button type=""  class="btn btn-success" id="copiarDatos"> <i class="fa fa-print" aria-hidden="true"></i> Imprimir</button>
                  <button type=""  class="btn btn-success pull-right" id="GuardarPlantilla"> <i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                  <div class="x_content" style="display: none;">
                    <table id="datatablePrueba"  class="table">
                      <thead>
                        <tr>
                          <th>PROCEDIMIENTO</th>                            
                          <th>RESULTADO</th> 
                          <th>UNIDAD DE MEDIDA</th>                       
                          <th>DESCRIPCION</th>
                          <th>MIN</th>
                          <th>MAX</th>
                        </tr>
                      </thead>
                      <tbody class="pointer tablaEquipo">
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="tab-pane" id="plantillarx">
                <div class="row">
                  <div class="form-group col-md-12" id="nombreProcedimientoRx">
                    <div class="form-group col-md-6">                
                          <label for="Apellido">NOMBRE DE LA PLANTILLA</label>
                          <input type="text" class="form-control input-sm" id="nombrePlantilla" placeholder="Nombre de la Plantilla">
                    </div>
                  <div class="form-group col-md-6">  
                        <label for="Apellido">PROCEDIMIENTO:</label><br>               
                        <label id="nombreRx">NOMBRE PROCEDIMIENTO</label>
                    </div>
                  </div>
                  <div style="display: none;" class="form-group col-md-6" id="idProcedimientoRx">                
                        <label for="Apellido">ID </label>
                        <span>Nplantilla </span>
                  </div>
                  <button type="" style="margin-right: 1em;" class="btn btn-success pull-right" id="GuardarPlantillaRx"> <i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                  <div class="box-body pad">
                        <form id="AlergiasForm">
                          <textarea id="plantillarxWord" class="textarea" placeholder="Ingrese el texto aqui"
                                    style="width: 100%; height: 600px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                        </form>
                  </div>
                  
                </div>
              </div>

              <div class="tab-pane" id="plantillaeco">
                <div class="row">
                  <div class="form-group col-md-12" id="nombreProcedimientoEco">                  
                    <div class="form-group col-md-6">                
                          <label for="Apellido">NOMBRE DE LA PLANTILLA</label>
                          <input type="text" class="form-control input-sm" id="nombrePlantilla" placeholder="Nombre de la Plantilla">
                    </div>
                    <div class="form-group col-md-6">  
                        <label for="Apellido">PROCEDIMIENTO:</label><br>               
                        <label id="nombreRx">NOMBRE PROCEDIMIENTO</label>
                    </div>
                  </div>
                  <div style="display: none;" class="form-group col-md-6" id="idProcedimientoEco">                
                        <label for="Apellido">ID </label>
                        <span>Nplantilla </span>
                  </div>
                  
                  <button type="" style="margin-right: 1em;" class="btn btn-success pull-right" id="GuardarPlantillaEco"> <i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                  <div class="box-body pad">
                        <form id="AlergiasForm">
                          <textarea id="plantillaecoWord" class="textarea" placeholder="Ingrese el texto aqui"
                                    style="width: 100%; height: 600px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                        </form>
                  </div>
                  
                </div>
              </div>

              <div class="tab-pane" id="plantillaTac">
                <div class="row">
                  <div class="form-group col-md-12" id="nombreProcedimientoTac">                  
                    <div class="form-group col-md-6">                
                          <label for="Apellido">NOMBRE DE LA PLANTILLA</label>
                          <input type="text" class="form-control input-sm" id="nombrePlantilla" placeholder="Nombre de la Plantilla">
                    </div>
                    <div class="form-group col-md-6">  
                        <label for="Apellido">PROCEDIMIENTO:</label><br>               
                        <label id="nombreRx">NOMBRE PROCEDIMIENTO</label>
                    </div>
                  </div>
                  <div style="display: none;" class="form-group col-md-6" id="idProcedimientoTac">                
                        <label for="Apellido">ID </label>
                        <span>Nplantilla </span>
                  </div>
                  
                  <button type="" style="margin-right: 1em;" class="btn btn-success pull-right" id="GuardarPlantillaTac"> <i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>
                  <div class="box-body pad">
                        <form id="AlergiasForm">
                          <textarea id="plantillaTacWord" class="textarea" placeholder="Ingrese el texto aqui"
                                    style="width: 100%; height: 600px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                        </form>
                  </div>
                  
                </div>
              </div>
            </div>
            <!-- /.tab-content -->
          </div>
      </div>

        
<script src="Lib/jspdf.min.js"></script>
<script src="Lib/bootstrap3-wysihtml5.all.min.js"></script>
<script src="Lib/handsontable.full.min.js"></script>
<script src="js/Js_Plantilla.js?v=1.0"></script>
<script src="js/Js_PlantillaRx.js"></script>
<script src="js/Js_PlantillaEco.js"></script>
<script src="js/Js_PlantillaTac.js"></script>
