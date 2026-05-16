<link href="css/handsontable.full.min.css" rel="stylesheet">
<link rel="stylesheet" href="css/handson.css">
  <!-- /.col -->
<div class="col-md-12 " style="margin-top: 1em;">
  <div class="box box-primary box-solid">
    <div class="box-header with-border">
      <h3 id="Limpiar" class="box-title">CONSULTA EXTERNA</h3>
        <div class="box-tools pull-right">
          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
          </button>
        </div>
    </div>
    <div class="box-body">
     <div class="col-md-12" >
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">


           <div class="box-footer">
            <button type="reset" class="btn btn-default " id="HcuPaciente" data-toggle="modal" data-target="#modal-consultas"> <img src="imagenes/paciente.png" /> UNIR</button>  
            
          </div>


          <div class="modal fade" id="modal-consultas" tabindex='-1'>
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">HISTORIA CLINICA UNICA</h4>
                  </div>
                  <div class="modal-body">
                    <div class="box-body">
                      <div class="col-md-12">
                        <div class="box-body">
                          <div class="col-md-14" >
                            <!--Accordion wrapper-->
<div class="accordion accordion-4" id="accordionEx2" role="tablist" aria-multiselectable="true">

    <!-- Accordion card -->
 
    <!-- Accordion card -->

    <!-- Accordion card -->
    <div class="card">

        <!-- Card header -->
        <div class="card-header z-depth-1 teal lighten-3" role="tab" id="heading11"  style="margin-left: -900px">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx2" href="#collapse11" aria-expanded="false" aria-controls="collapse11">
                <h4 class="mb-0 black-text text-center font-weight-bold text-uppercase">
                    INICIO DE ATENCION Y MOTIVO
                </h4>
            </a>
        </div>

        <!-- Card body -->
        <div id="collapse11" class="collapse" role="tabpanel" aria-labelledby="heading11" data-parent="#accordionEx2">
            <div class="card-body rgba-teal-strong white-text">
                 <div class="active tab-pane" id="servicio">
                                  <div class="box box-primary">
                                    
                                    <div id="ListaEnfe" class="box-body" style="max-height: 30em; overflow-y: auto;">
                                      <ul  bgcolor="LAVENDER" class="todo-list form-check" id="ListaAAP" >
                                        <li><span class="text">HORA </span>  <input type="time"> </li>
                                        <li><input type="checkbox" id="eInfancia" value="Enfermedad De La Infancia" ><span class="text">TRAUMA </span></li>
                                        <li><input type="checkbox" id="eAlergia" value="Enfermedad Alergia"><span class="text">CAUSA CLINICA  </span></li>
                                        <li><input type="checkbox" id="eCardiaca" value="Enfermedad Cardiaca"><span class="text"> CAUSA OBSTETRICA </span></li>
                                        <li><input type="checkbox" id="eRespiratoria" value="Enfermedad Respiratoria"><span class="text">CAUSA QUIRURGICA </span></li>
                                        <li><input type="checkbox" id="eDisgestiva" value="Enfermedad Digestiva"><span class="text">GRUPO SANGUINEO Y FACTOR RH  </span></li>
                                        <li><input type="checkbox" id="eNeurologica" value="Enfermedad Neurologica"><span class="text">NOTIFICACION A LA POLICIA </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text">OTRO MOTIVO  </span></li>
                                       
                                      </ul>
                                    </div> 
                                  </div>
                                </div>
                             </div>
                           </div>
                        </div>
    <!-- Accordion card -->

    <!-- Accordion card -->
    <div class="card">

        <!-- Card header -->
        <div class="card-header z-depth-1 teal lighten-2" role="tab" id="heading12" style="margin-left: -580px">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx2" href="#collapse12" aria-expanded="false" aria-controls="collapse12">
                <h4 class="mb-0 black-text text-center font-weight-bold text-uppercase">
                    ACCIDENTE  VIOLENCIA  INTOXICACION ENVENENAMIENTO O QUEMADURA
                </h4>
            </a>
        </div>

        <!-- Card body -->
        <div id="collapse12" class="collapse" role="tabpanel" aria-labelledby="heading12" data-parent="#accordionEx2">
            <div class="card-body rgba-teal-strong white-text">
                 <div class="active tab-pane" id="servicio">
                                  <div class="box box-primary">
                                    
                                    <div id="ListaEnfe" class="box-body" style="max-height: 30em; overflow-y: auto;">
                                      <ul  bgcolor="LAVENDER" class="todo-list form-check" id="ListaAAP" >
                                        
                                        <li><span class="text">FECHA - HORA </span>  <input type="datetime-local"> </li>
                                        
                                        <li><input type="checkbox" id="eInfancia" value="Enfermedad De La Infancia" ><span class="text">LUGAR DEL EVENTO </span></li>
                                        <li><input type="checkbox"  id="eAlergia" value="Enfermedad Alergia"><span class="text">DIRECCIÓN DEL EVENTO </span></li>
                                        <li><input type="checkbox" id="eCardiaca" value="Enfermedad Cardiaca"><span class="text"> CUSTODIA POLICIAL </span></li>
                                        <li><input type="checkbox" id="eRespiratoria" value="Enfermedad Respiratoria"><span class="text">ACCIDENTES DE TRANSITO </span></li>
                                        <li><input type="checkbox" id="eDisgestiva" value="Enfermedad Digestiva"><span class="text">CAIDA  </span></li>
                                        <li><input type="checkbox" id="eNeurologica" value="Enfermedad Neurologica"><span class="text">QUEMADURA </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> MORDEDURA  </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> AHOGAMIENTO  </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> CUERPO EXTRAÑO  </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> OTRO ACCIDENTE  </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> VIOLENCIA POR ARMA DE FUEGO  </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> VIOLENCIA POR ARMA C.PUNZANTE </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> VIOLENCIA POR RIÑA </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> VIOLENCIA FAMILIAR </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> ABUSO FISICO </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> ABUSO PSICOLOGICO </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> ABUSO SEXUAL </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> OTRA VIOLENCIA  </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> INTOXICACION ALCOHOLICA </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> INTOXICACION ALIMENTARIA </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> INTOXICACION X DROGAS </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> INHALACION DE GASES </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> OTRA INTOXICACION </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> ENVENENAMIENTO </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> PICADURA</span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> ANAFILAXIA </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text"> OBSERVACIONES </span></li>



                                       
                                      </ul>
                                    </div> 
                                  </div>
                                </div>
            </div>
        </div>
    </div>
    <!-- Accordion card -->

    <!-- Accordion card -->
    <div class="card">

        <!-- Card header -->
        <div class="card-header z-depth-1 teal lighten-1" role="tab" id="heading13" style="margin-left: -800px">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx2" href="#collapse13" aria-expanded="true" aria-controls="collapse13">
                <h4 class="mb-0 black-text text-center font-weight-bold text-uppercase">
                    ANTECEDENTES PERSONALES Y FAMILIARES
                </h4>
            </a>
        </div>

        <!-- Card body -->
        <div id="collapse13" class="collapse" role="tabpanel" aria-labelledby="heading13" data-parent="#accordionEx2">
            <div class="card-body rgba-teal-strong white-text">
                <div class="active tab-pane" id="servicio">
                                  <div class="box box-primary">
                                    
                                    <div id="ListaEnfe" class="box-body" style="max-height: 30em; overflow-y: auto;">
                                      <ul  bgcolor="LAVENDER" class="todo-list form-check" id="ListaAAP" >
                                        
                                        <li><input type="checkbox" id="eInfancia" value="Enfermedad De La Infancia" ><span class="text">ALERGICO </span></li>
                                        <li><input type="checkbox" id="eAlergia" value="Enfermedad Alergia"><span class="text">CLINICO  </span></li>
                                        <li><input type="checkbox" id="eCardiaca" value="Enfermedad Cardiaca"><span class="text"> GINECOLOGICO </span></li>
                                        <li><input type="checkbox" id="eRespiratoria" value="Enfermedad Respiratoria"><span class="text">TRAUMATOG </span></li>
                                        <li><input type="checkbox" id="eDisgestiva" value="Enfermedad Digestiva"><span class="text">QUIRURGICO</span></li>
                                        <li><input type="checkbox" id="eNeurologica" value="Enfermedad Neurologica"><span class="text">FARMACOLOGICO </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text">PSIQUIATRICO  </span></li>
                                        <li><input type="checkbox" id="eMetabolica" value="Enfermedad Metabolica"><span class="text">OTRO  </span></li>
                                       
                                      </ul>
                                    </div> 
                                  </div>
                                </div>
            </div>
        </div>
    </div>
    <!-- Accordion card -->

    <!-- Accordion card -->
    <div class="card">

        <!-- Card header -->
        <div class="card-header z-depth-1 teal" role="tab" id="heading14" style="margin-left: -770px">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx2" href="#collapse14" aria-expanded="false" aria-controls="collapse14">
                <h4 class="mb-0 black-text text-center font-weight-bold text-uppercase">
                    ENFERMEDAD ACTUAL Y REVISION DE SISTEMAS
                </h4>
            </a>
        </div>

        <!-- Card body -->
        <div id="collapse14" class="collapse" role="tabpanel" aria-labelledby="heading14" data-parent="#accordionEx2">
            <div class="card-body rgba-teal-strong white-text">
                <div class="active tab-pane" id="servicio">
                                  <div class="box box-primary">
                                    
                                    <div id="ListaEnfe" class="box-body" style="max-height: 30em; overflow-y: auto;">
                                      <ul  bgcolor="LAVENDER" class="todo-list form-check" id="ListaAAP" >
                                        
                                       
                                        <li><input type="checkbox" id="eAlergia" value="Enfermedad Alergia"><span class="text">VIA AEREA LIBRE  </span></li>
                                        <li><input type="checkbox" id="eCardiaca" value="Enfermedad Cardiaca"><span class="text"> VIA AEREA OBSTRUIDA </span></li>
                                        <li><input type="checkbox" id="eRespiratoria" value="Enfermedad Respiratoria"><span class="text">CONDICION ESTABLE </span></li>
                                        <li><input type="checkbox" id="eDisgestiva" value="Enfermedad Digestiva"><span class="text">CONDICION INESTABLE</span></li>
                                        
                                       
                                      </ul>
                                    </div> 
                                  </div>
                                </div>
            </div>
        </div>
    </div>


    <div class="card">

        <!-- Card header -->
        <div class="card-header z-depth-1 teal" role="tab" id="heading15" style="margin-left: -890px">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx2" href="#collapse15" aria-expanded="false" aria-controls="collapse15">
                <h4 class="mb-0 black-text text-center font-weight-bold text-uppercase">
                    EXAMEN FISICO Y DIAGNOSTICO
                </h4>
            </a>
        </div>

        <!-- Card body -->
        <div id="collapse15" class="collapse" role="tabpanel" aria-labelledby="heading15" data-parent="#accordionEx2">
            <div class="card-body rgba-teal-strong white-text">
                <div class="active tab-pane" id="servicio">
                                  <div class="box box-primary">
                                    
                                    <div id="ListaEnfe" class="box-body" style="max-height: 30em; overflow-y: auto;">
                                      <ul  bgcolor="LAVENDER" class="todo-list form-check" id="ListaAAP" >
                                        
                                       
                                        <li><input type="checkbox" id="eAlergia" value="Enfermedad Alergia"><span class="text">VIA AEREA OBSTRUIDA </span></li>
                                        <li><input type="checkbox" id="eCardiaca" value="Enfermedad Cardiaca"><span class="text"> CABEZA </span></li>
                                        <li><input type="checkbox" id="eRespiratoria" value="Enfermedad Respiratoria"><span class="text">CUELLO </span></li>
                                        <li><input type="checkbox" id="eDisgestiva" value="Enfermedad Digestiva"><span class="text">TORAX</span></li>
                                        <li><input type="checkbox" id="eDisgestiva" value="Enfermedad Digestiva"><span class="text">ABDOMEN</span></li>
                                        <li><input type="checkbox" id="eDisgestiva" value="Enfermedad Digestiva"><span class="text">COLUMNA</span></li>
                                        <li><input type="checkbox" id="eDisgestiva" value="Enfermedad Digestiva"><span class="text">PELVIS</span></li>
                                        <li><input type="checkbox" id="eDisgestiva" value="Enfermedad Digestiva"><span class="text">EXTREMIDADES</span></li>
                                        
                                       
                                      </ul>
                                    </div> 
                                  </div>
                                </div>
            </div>
        </div>
    </div>
    <!-- Accordion card -->

    <div class="card-header z-depth-1 teal" role="tab" id="6" style="margin-left: -910px">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx2" href="#collapse16" aria-expanded="false" aria-controls="collapse16">
                <h4 class="mb-0 black-text text-center font-weight-bold text-uppercase">
                    LOCALIZACION DE LESIONES
                </h4>
            </a>
        </div>

        <!-- Card body -->
        <div id="collapse16" class="collapse" role="tabpanel" aria-labelledby="heading16" data-parent="#accordionEx2">
            <div class="card-body rgba-teal-strong white-text">
                <div class="active tab-pane" id="servicio">
                                  <div class="box box-primary">
                                    <div class="grid-block" style="background-image: url(imagenes/cuerpo2.jpg) ; width: 67%; height: 60vh; background-repeat: no-repeat;">

                                    <div contenteditable="true"> </div>
                                    </div>
                                           <div class="box-body">
              <!-- See dist/js/pages/dashboard.js to activate the todoList plugin -->
              <ul class="todo-list pull-right" style="margin-top: -560px" >
                <li >
                  
                  <small class="label label-danger"> 1 </small>
                 
                  <span class="text">HERIDAS PENETRANTES</span>
               
                 
                </li>
                <li>
                      
                  <small class="label label-danger"> 2 </small>
                  <span class="text">HERIDA CORTANTE</span>
                  
                  
                </li>
                <li>
                      
                  <small class="label label-danger"> 3 </small>
                  <span class="text">FRACTURA EXPUESTA</span>

                  
                </li>
                <li>
                      
                  <small class="label label-danger"> 4 </small>
                  <span class="text">FRACTURA CERRADA</span>

                  
                </li>
                <li>
                      
                  <small class="label label-danger"> 5 </small>
                  <span class="text">CUERPO EXTRAÑO</span>

                  
                </li>
                <li>
                      
                  <small class="label label-danger"> 6 </small>
                  <span class="text">HEMORRAGIA</span>

                  
                </li>
                <li>
                      
                  <small class="label label-danger"> 7 </small>
                  <span class="text">MORDEDURA</span>
                  
                 
                </li>

                <li>
                      
                  <small class="label label-danger"> 8 </small>
                  <span class="text">PICADURA</span>
                  
                  
                </li>

                <li>
                      
                  <small class="label label-danger"> 9 </small>
                  <span class="text">MORDEDURA</span>
                  
                 
                </li>

                 <li>
                      
                  <small class="label label-danger"> 10 </small>
                  <span class="text">PICADURA</span>
                  
                 
                </li>
                 <li>
                      
                  <small class="label label-danger"> 11 </small>
                  <span class="text">EXCORACION</span>
                  
                
                </li>
                 <li>
                      
                  <small class="label label-danger"> 12 </small>
                  <span class="text">DEFORMIDAD O MASA</span>
                  
                  
                </li>
                 <li>
                      
                  <small class="label label-danger"> 13 </small>
                  <span class="text">HEMATOMA</span>
                  
                  
                </li>
                 <li>
                      
                  <small class="label label-danger"> 14 </small>
                  <span class="text">INFLACION</span>
                  
                  
                </li>
                 <li>
                      
                  <small class="label label-danger"> 15 </small>
                  <span class="text">LUXACION /DESGUISE</span>
                  
                  
                </li>

                 <li>
                      
                  <small class="label label-danger"> 16 </small>
                  <span class="text">DESGUINSE</span>
                  
                  
                </li>
              </ul>
            </div>

     
               </div>
            </div>
        </div>
    </div>
</div>
<!--/.Accordion wrapper-->
                          </div>
                        </div>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
            </div>

          
<script src="js/Js_NumeroALetras.js"></script>
<script src="js/Js_Agenda.js"></script>
<script src="js/Js_AgendaServicios.js"></script>
<script src="js/Js_AgendaReceta.js"></script>


