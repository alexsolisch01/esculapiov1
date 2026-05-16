var filas = '';
var t1=0;

$(".body").on('change', "#TipoServicio", function(ev){
    CargarEspecialidades();
});
$(".body").on('change', "#GrupoEstadistico", function(ev){
    CargarEspecialidades();
});

function CargarEspecialidades(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Especialidad.php",
        data: {
            Requerimiento: "CararEspecialidades",
            GrupoEstadistico:$("#GrupoEstadistico").val(),
            Tipo:$('#TipoServicio').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {   
    
        var elemento = '';
        $("#Especialidad").empty();
        $("#Especialidad").append('<option value="0">TODOS..</option>');        
        $.each(respuesta, function(i, value) {

            elemento += ' <option value="'+value[0]+'">'+value[1]+'</option> ';  
        });
        $("#Especialidad").append(elemento);
        $('.selectpicker').selectpicker('refresh');
    });
}

function CargarReporteMorbilidad(genero,rango,min,max){    
    $.ajax({ 
        async:false,       
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarReporteMorbilidad",
            FechaD:$("#fechaDesde").val(),
            FechaH:$("#fechaHasta").val(),
            Genero:genero,            
            Diagnostico:$("#TipoDiagnostico").val(),            
            Especialidad:$("#Especialidad").val(),
            ClaseDiagnostico:$("#ClaseDiagnostico").val(),
            Grupo:$("#GrupoEstadistico").val(),
            Tipo:$('#TipoServicio').val(),
            Min:min,
            Max:max
        },
        dataType: 'JSON',
    }).done(function(respuesta) {   
    console.log(respuesta)         
        $.each(respuesta, function(i, value) {
            if(value[1]==null ){
                value[1]=0;
            }
            filas +=      '<tr>'
                            +'<td>'+rango+'</td>'
                            +'<td>'+value[0]+'</td>'                            
                          +'</tr>';
            t1+=parseFloat(value[0]);
        });
                      
    });
}
$(".body").on('click', "button#ConsultarReporte", function(ev) {
    filas = '';
    t1=0;
    
    $('#modal-cargando').modal();
    $("#cuerpoReporte").empty(); 
});

$('#modal-cargando').on('shown.bs.modal', function() {
    filas = '';
    t1=0;
    GenerarReportes($("#Genero2").val(),$("#Genero2 option:selected").html());
});

function GenerarReportes(genero,ngenero){
    var tabla = ' <table id="TablaReporte" width="100%" cellspacing="0" class="table table-striped table-bordered nowrap table-condensed">'
                        +'<thead>'
                          +'<tr>'
                            +'<th class="text-center"></th>'
                            +'<th class="text-center">'+$("#GrupoEstadistico option:selected").html()+'</th>'                            
                          +'</tr>'
                        +'</thead>'
                        +'<tbody >';

    if($("#cbmGrupoEdad").val()!="0"){
        CargarReporteMorbilidad(genero,
                                $("#cbmGrupoEdad option:selected").html(),
                                $("#cbmGrupoEdad option:selected").attr("min"),
                                $("#cbmGrupoEdad option:selected").attr("max"));
    }else{
        var vector = $('.body').find("#cbmGrupoEdad option");
        $.each(vector, function(a) {
            if($(this).val()!=0){
                CargarReporteMorbilidad(genero,
                                        $(this).html(),
                                        $(this).attr("min"),
                                        $(this).attr("max"));
            }
        });
    }

    tabla += filas;
        tabla += '</tbody>'
                        +'<tfoot>'
                          +'<tr>'
                            +'<th>USO INEC (Total '+$("#TipoDiagnostico option:selected").html()+' '+ngenero+')</th>'
                            +'<th>'+t1+'</th>'
                          +'</tr>'
                          +'<tr>'
                            +'<th>TOTALES DE '+$("#ClaseDiagnostico option:selected").html()+' CONSULTAS - '+ngenero+' ('+$("#TipoDiagnostico option:selected").html()+')</th>'
                            +'<th>'+t1+'</th>'
                          +'</tr>'
                        +'</tfoot>'
                      +'</table> ';
    if(t1!=0){
        $("#cuerpoReporte").append('<div class="col-md-6">'+tabla+'</div>');
    }                  
    
    $('#modal-cargando').modal('hide');
}

$(".body").on('click', "button#ExportarrReporte", function(ev) {        
    CrearExcel('xlsx',"Reporte "+$("#TipoDiagnostico").val()+".xlsx");        
});

function CrearExcel(type, fn, dl) {

    var padre = document.getElementById('cuerpoReporte');
    var hijos = padre.getElementsByTagName('table');
    var wb = XLSX.utils.book_new();

    for (var i = 0; i < hijos.length; i++) {
        var t = hijos[i];
         var hoja = XLSX.utils.table_to_sheet(t,{raw:false});
         wb.SheetNames.push("hoja"+(i+1));
         wb.Sheets["hoja"+(i+1)] = hoja;
    }
    return dl ?
                XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
                XLSX.writeFile(wb, fn || ('test.' + (type || 'xlsx')), {cellStyles:true});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".body").on('change',"#TipoDiagnostico2", function(evt) {
    if($(this).val()=="PREVENCION-EDAD FERTIL"){
        
        $('select#cbmEF').find('option[tipo="frmEF"]').css("display","block");
        $('select#cbmEF').find('option[tipo="frmPF"]').css("display","none");
        $('select#cbmEF').find('option[tipo="frmDOC"]').css("display","none");
        
      }

      if($(this).val()=="PLANIFICACION FAMILIAR"){
        
        $('select#cbmEF').find('option[tipo="frmEF"]').css("display","none");
        $('select#cbmEF').find('option[tipo="frmPF"]').css("display","block");
        $('select#cbmEF').find('option[tipo="frmDOC"]').css("display","none");
        
      }
      if($(this).val()=="DETECCION OPORTUNA DEL CANCER"){
        
        $('select#cbmEF').find('option[tipo="frmEF"]').css("display","none");
        $('select#cbmEF').find('option[tipo="frmPF"]').css("display","none");
        $('select#cbmEF').find('option[tipo="frmDOC"]').css("display","block");
        
      }

      $('.selectpicker').selectpicker('refresh');
   
});
$("#TipoDiagnostico2").change();



var filas2 = '';
var t12=0;
var t22=0;
CargarEspecialidades2();
function CargarEspecialidades2(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Especialidad.php",
        data: {
            Requerimiento: "CararEspecialidades",
            GrupoEstadistico:$("#GrupoEstadistico2").val(),
            Tipo:$('#TipoServicio2').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {   
    
        var elemento = '';
        $("#Especialidad2").empty();
        $("#Especialidad2").append('<option value="0">TODAS..</option>');        
        $.each(respuesta, function(i, value) {

            elemento += ' <option value="'+value[0]+'">'+value[1]+'</option> ';  
        });
        $("#Especialidad2").append(elemento);
        $('.selectpicker').selectpicker('refresh');
    });
}
$(".body").on('change', "#TipoServicio2", function(ev){
    CargarEspecialidades2();
});
$(".body").on('change', "#GrupoEstadistico2", function(ev){
    CargarEspecialidades2();
});
function CargarReporteMetodosPrevencion(rango,min,max){    
    $.ajax({ 
        async:false,       
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarReportMetodosPrevencion",
            FechaD:$("#fechaDesde2").val(),
            FechaH:$("#fechaHasta2").val(),
            Diagnostico:$("#TipoDiagnostico2").val(),
            ClaseDiagnostico:$("#ClaseDiagnostico2").val(),                    
            Especialidad:$("#Especialidad2").val(),
            Grupo:$("#GrupoEstadistico").val(),
            Tipo:$('#TipoServicio').val(),
            Actividades:$('#cbmEF').val(),
            Min:min,
            Max:max
        },
        dataType: 'JSON',
    }).done(function(respuesta) {   
         console.log(respuesta)
        $.each(respuesta, function(i, value) {
            if(value[1]==null ){
                value[1]=0;
            }
            filas2 +=      '<tr>'
                            +'<td>'+value[0]+'</td>'
                            +'<td>'+value[1]+'</td>'                            
                          +'</tr>';
            t12+=parseFloat(value[1]);
        });
                      
    });
}

$(".body").on('click', "button#ConsultarReporte2", function(ev) {
    filas2 = '';
    t12=0;
    t22=0;
        
    $('#modal-cargando2').modal();
    $("#cuerpoReporte2").empty(); 
});

$('#modal-cargando2').on('shown.bs.modal', function() {
    GenerarReportes2()
});

function GenerarReportes2(){
    
var tabla = "";
var clasediag = $("#ClaseDiagnostico2").val();
if(clasediag==0){
    clasediag = "PRIMERA + SUBSECUENTE";
}
    if($("#cbmGrupoEdad2").val()!="0"){
        tabla = ' <table id="TablaReporte2" width="100%" cellspacing="0" class="table table-striped table-bordered nowrap table-condensed">'
                        +'<thead>'
                          +'<tr>'
                            +'<th class="text-center">METODOS DE '+$("#TipoDiagnostico2 option:selected").html()+'</th>'
                            +'<th class="text-center">'+$("#cbmGrupoEdad2 option:selected").html()+'</th>'                            
                          +'</tr>'
                        +'</thead>'
                        +'<tbody >';

        CargarReporteMetodosPrevencion($("#cbmGrupoEdad2 option:selected").html(),
                                $("#cbmGrupoEdad2 option:selected").attr("min"),
                                $("#cbmGrupoEdad2 option:selected").attr("max"));
        tabla += filas2;
            tabla += '</tbody>'
                            +'<tfoot>'
                              +'<tr>'
                                +'<th>USO INEC (Total '+$("#TipoDiagnostico2 option:selected").html()+') CLASE DE DIAGNOSTICO '+clasediag+'</th>'
                                +'<th>'+t12+'</th>'
                              +'</tr>'                          
                            +'</tfoot>'
                          +'</table> ';
        if(t12!=0){
            $("#cuerpoReporte2").append('<div class="col-md-6">'+tabla+'</div>');
        }
    }else{
        var vector = $('.body').find("#cbmGrupoEdad2 option");
        $.each(vector, function(a) {
            if($(this).val()!=0){
                tabla = ' <table id="TablaReporte2" width="100%" cellspacing="0" class="table table-striped table-bordered nowrap table-condensed">'
                        +'<thead>'
                          +'<tr>'
                            +'<th class="text-center">METODOS DE '+$("#TipoDiagnostico2 option:selected").html()+'</th>'
                            +'<th class="text-center">'+$(this).html()+'</th>'                            
                          +'</tr>'
                        +'</thead>'
                        +'<tbody >';
                filas2 = '';
                t12=0;
                t22=0;
                CargarReporteMetodosPrevencion($(this).html(),
                                        $(this).attr("min"),
                                        $(this).attr("max"));

                tabla += filas2;
                tabla += '</tbody>'
                                +'<tfoot>'
                                  +'<tr>'
                                    +'<th>USO INEC (Total '+$("#TipoDiagnostico2 option:selected").html()+') CLASE DE DIAGNOSTICO '+clasediag+'</th>'
                                    +'<th>'+t12+'</th>'
                                  +'</tr>'                          
                                +'</tfoot>'
                              +'</table> ';
            if(t12!=0){
                $("#cuerpoReporte2").append('<div class="col-md-6">'+tabla+'</div>');
            }
            }
        });
    }

                      
    
    $('#modal-cargando2').modal('hide');
}
$(".body").on('click', "button#ExportarrReporte2", function(ev) {        
    CrearExcel2('xlsx',"Reporte "+$("#TipoServicio2 option:selected").html()+" "+$("#TipoDiagnostico2").val()+".xlsx");        
});

function CrearExcel2(type, fn, dl) {

    var padre = document.getElementById('cuerpoReporte2');
    var hijos = padre.getElementsByTagName('table');
    var wb = XLSX.utils.book_new();

    for (var i = 0; i < hijos.length; i++) {
        var t = hijos[i];
         var hoja = XLSX.utils.table_to_sheet(t,{raw:false});
         wb.SheetNames.push("hoja"+(i+1));
         wb.Sheets["hoja"+(i+1)] = hoja;
    }
    return dl ?
                XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
                XLSX.writeFile(wb, fn || ('test.' + (type || 'xlsx')), {cellStyles:true});
}