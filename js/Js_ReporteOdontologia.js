var filas = '';
var t1=0;
var t2=0;
CargarEspecialidades();
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
        $("#Especialidad").append('<option value="0">TODAS..</option>');        
        $.each(respuesta, function(i, value) {

            elemento += ' <option value="'+value[0]+'">'+value[1]+'</option> ';  
        });
        $("#Especialidad").append(elemento);
        $('.selectpicker').selectpicker('refresh');
    });
}

function CargarReporteOdontologiaProcedimientos(min,max){    
    $.ajax({ 
        async:false,       
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarReporteOdontologiaProcedimientos",
            FechaD:$("#fechaDesde").val(),
            FechaH:$("#fechaHasta").val(),
            Diagnostico:$("#TipoDiagnostico").val(),
            ClaseDiagnostico:0,
            Actividades:$("#cbmProcedimiento").val(),            
            Especialidad:$("#Especialidad").val(),
            Min:min,
            Max:max
        },
        dataType: 'JSON',
    }).done(function(respuesta) {            
        $.each(respuesta, function(i, value) {
            if(value[1]==null ){
                value[1]=0;
            }
            filas +=      '<tr>'
                            +'<td>'+value[0]+'</td>'
                            +'<td>'+value[1]+'</td>'                            
                          +'</tr>';
            t1+=parseFloat(value[1]);
        });
                      
    });
}
function CargarReporteOdontologiaOrdenes(){    
    $.ajax({ 
        async:false,       
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarReporteOdontologiaOrdenes",
            FechaD:$("#fechaDesde").val(),
            FechaH:$("#fechaHasta").val(),
            Diagnostico:$("#TipoDiagnostico").val(),            
            Especialidad:$("#Especialidad").val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
               
        $.each(respuesta, function(i, value) {
            if(value[1]==null ){
                value[1]=0;
            }
            filas +=      '<tr>'
                            +'<td>Número de Radiografías Dentales</td>'
                            +'<td>'+value[0]+'</td>'                            
                          +'</tr>';
            t2+=parseFloat(value[0]);
        });
                      
    });
}
$(".body").on('click', "button#ConsultarReporte", function(ev) {
    filas = '';
    t1=0;
    t2=0;
    if($("#TipoServicio").val()=="0"){
        swal("Esculapio!", "Seleccione el tipo de servicio.", "warning");
        return;
    }
    if($("#GrupoEstadistico").val()=="0"){
        swal("Esculapio!", "Seleccione el grupo estadistico.", "warning");
        return;
    }    
    $('#modal-cargando').modal();
    $("#cuerpoReporte").empty(); 
});

$('#modal-cargando').on('shown.bs.modal', function() {
    GenerarReportes()
});

function GenerarReportes(){
    var tabla = ' <table id="TablaReporte" width="100%" cellspacing="0" class="table table-striped table-bordered nowrap table-condensed">'
                        +'<thead>'
                          +'<tr>'
                            +'<th class="text-center">Actividades</th>'
                            +'<th class="text-center">Numero</th>'                            
                          +'</tr>'
                        +'</thead>'
                        +'<tbody >';

    CargarReporteOdontologiaProcedimientos(-1,-1);
    

    tabla += filas;
        tabla += '</tbody>'
                        +'<tfoot>'
                          +'<tr>'
                            +'<th>USO INEC (Total '+$("#TipoDiagnostico option:selected").html()+')</th>'
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
    CrearExcel('xlsx',"Reporte "+$("#TipoServicio option:selected").html()+" "+$("#TipoDiagnostico").val()+".xlsx");        
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
function CargarProcedimientosParteDiario(ids){

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarProcedimientosParteDiario",
            Ids:ids
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        $("select#cbmProcedimiento").empty();
        $("select#cbmProcedimiento").append('<<option value="0">TODOS..</option>');
        $.each(respuesta, function(i, value) {
            var elem = ' <option value="'+value[1]+'">'+value[1]+'</option> ';
            $("select#cbmProcedimiento").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');
        

     }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });   
}

CargarProcedimientosParteDiario("12,14,17,18,19,24,29,31,43,44,46,47,48,49,51,52,53,54,55,56");    



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

function CargarReporteOdontologiaEdad(rango,min,max){    
    $.ajax({ 
        async:false,       
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarReporteOdontologiEdad",
            FechaD:$("#fechaDesde2").val(),
            FechaH:$("#fechaHasta2").val(),
            Diagnostico:$("#TipoDiagnostico2").val(),
            ClaseDiagnostico:$("#ClaseDiagnostico2").val(),                    
            Especialidad:$("#Especialidad2").val(),
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
            filas2 +=      '<tr>'
                            +'<td>'+rango+'</td>'
                            +'<td>'+value[0]+'</td>'                            
                          +'</tr>';
            t12+=parseFloat(value[0]);
        });
                      
    });
}

$(".body").on('click', "button#ConsultarReporte2", function(ev) {
    filas2 = '';
    t12=0;
    t22=0;
    if($("#TipoServicio2").val()=="0"){
        swal("Esculapio!", "Seleccione el tipo de servicio.", "warning");
        return;
    }
    if($("#GrupoEstadistico2").val()=="0"){
        swal("Esculapio!", "Seleccione el grupo estadistico.", "warning");
        return;
    }    
    $('#modal-cargando').modal();
    $("#cuerpoReporte2").empty(); 
});

$('#modal-cargando').on('shown.bs.modal', function() {
    GenerarReportes2()
});

function GenerarReportes2(){
    var tabla = ' <table id="TablaReporte2" width="100%" cellspacing="0" class="table table-striped table-bordered nowrap table-condensed">'
                        +'<thead>'
                          +'<tr>'
                            +'<th class="text-center"></th>'
                            +'<th class="text-center">'+$("#GrupoEstadistico2 option:selected").html()+'</th>'                            
                          +'</tr>'
                        +'</thead>'
                        +'<tbody >';

    if($("#cbmGrupoEdad2").val()!="0"){
        CargarReporteOdontologiaEdad($("#cbmGrupoEdad2 option:selected").html(),
                                $("#cbmGrupoEdad2 option:selected").attr("min"),
                                $("#cbmGrupoEdad2 option:selected").attr("max"));
    }else{
        var vector = $('.body').find("#cbmGrupoEdad2 option");
        $.each(vector, function(a) {
            if($(this).val()!=0){
                CargarReporteOdontologiaEdad($(this).html(),
                                        $(this).attr("min"),
                                        $(this).attr("max"));
            }
        });
    }

    tabla += filas2;
        tabla += '</tbody>'
                        +'<tfoot>'
                          +'<tr>'
                            +'<th>USO INEC (Total '+$("#TipoDiagnostico option:selected").html()+')</th>'
                            +'<th>'+t12+'</th>'
                          +'</tr>'                          
                        +'</tfoot>'
                      +'</table> ';
    if(t12!=0){
        $("#cuerpoReporte2").append('<div class="col-md-6">'+tabla+'</div>');
    }                  
    
    $('#modal-cargando').modal('hide');
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