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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var filas2 = '';
var t12=0;

$(".body").on('change', "#TipoServicio2", function(ev){
    CargarEspecialidades2();
});
$(".body").on('change', "#GrupoEstadistico2", function(ev){
    CargarEspecialidades2();
});

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
        $("#Especialidad2").append('<option value="0">TODOS..</option>');        
        $.each(respuesta, function(i, value) {

            elemento += ' <option value="'+value[0]+'">'+value[1]+'</option> ';  
        });
        $("#Especialidad2").append(elemento);
        $('.selectpicker').selectpicker('refresh');
    });
}

function CargarReporteEnfermedades2(genero,min,max){    
    $.ajax({ 
        async:false,       
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarReporteEnfermedades",
            FechaD:$("#fechaDesde2").val(),
            FechaH:$("#fechaHasta2").val(),
            Genero:genero,            
            Diagnostico:$("#TipoDiagnostico2").val(),            
            Especialidad:$("#Especialidad2").val(),
            Grupo:$("#GrupoEstadistico2").val(),
            Tipo:$('#TipoServicio2').val(),
            Frecuencia:$("#cbmFrecuencia2").val(),
            Min:min,
            Max:max
        },
        dataType: 'JSON',
    }).done(function(respuesta) {            
        $.each(respuesta, function(i, value) {
            if(value[1]==null ){
                value[1]=0;
            }
            filas2 +=      '<tr>'
                            +'<td>'+value[0]+'</td>'
                            +'<td>'+value[1]+'</td>'                            
                            +'<td>'+value[2]+'</td>'                            
                          +'</tr>';
            t12+=parseFloat(value[1]);
        });
                      
    });
}
$(".body").on('click', "button#ConsultarReporte2", function(ev) {
    filas2 = '';
    t12=0;    
    $('#modal-cargando2').modal();
    $("#cuerpoReporte2").empty(); 
});

$('#modal-cargando2').on('shown.bs.modal', function() {
    
        filas2 = '';
        t12=0;
        GenerarReportes2($("#TipoDiagnostico2 option:selected").html(),$("#Genero22").val(),$("#Genero22 option:selected").html());    
    
    $('#modal-cargando2').modal('hide');
});

function GenerarReportes2(tipo,genero,ngenero){
    var tabla = '';
    CargarReporteEnfermedades2(genero,$("#cbmGrupoEdad2 option:selected").attr("min"),$("#cbmGrupoEdad2 option:selected").attr("max"));
    tabla = ' <table id="TablaReporte2" width="100%" cellspacing="0" class="table table-striped table-bordered nowrap table-condensed">'
                        +'<thead>'
                          +'<tr>'
                            +'<th class="text-center">CODIGO</th>'
                            +'<th class="text-center">CANTIDAD</th>'
                            +'<th class="text-center">DESCRIPCION DE LAS CAUSAS</th>'
                          +'</tr>'                          
                        +'</thead>'
                        +'<tbody>';

        tabla += filas2;
            tabla += '</tbody>'
                            +'<tfoot>'
                              +'<tr>'
                                +'<th>USO INEC (Total '+$("#TipoDiagnostico2 option:selected").html()+' '+ngenero+')</th>'
                                +'<th>'+t12+'</th>'
                                +'<th></th>'
                              +'</tr>'
                              +'<tr>'
                                +'<th>TOTALES DE '+$("#ClaseDiagnostico2 option:selected").html()+' '+ngenero+' ('+$("#TipoDiagnostico2 option:selected").html()+')</th>'
                                +'<th>'+t12+'</th>'
                                +'<th></th>'
                              +'</tr>'
                            +'</tfoot>'
                          +'</table> ';

        if(t12!=0){
            $("#cuerpoReporte2").append('<div class="col-md-6">'+tabla+'</div>');
        }  
    
}

$(".body").on('click', "button#ExportarrReporte2", function(ev) {        
    CrearExcel2('xlsx',"Reporte "+$("#TipoServicio2 option:selected").html()+" "+$("#TipoDiagnostico2").val()+".xlsx");        
});

function CrearExcel2(type, fn, dl) {

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