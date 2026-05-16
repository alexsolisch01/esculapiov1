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
            Cie:$("#cbmCie").val().toString(),
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

var CargarCieJs = {  
  ajax: {
    url: "Ajax/Aj_Consulta.php",
    type: "POST",
    dataType: "json",
    data: {
      q: "{{{q}}}",
      Requerimiento: "CargarCieJs"
    }
  },
  locale: {
    emptyTitle: "Seleccionar"
  },
  preserveSelected: false,
  preprocessData: function(data) {    
    var array = [];
      array.push({'value': "0",'text': "Seleccionar"});
      $.each(data, function(i, value){
        array.push(
            {
                'value': value.id,
                'text': value.nombre
            }
        );
      });
    return array;
  }
};
$("#cbmCie").selectpicker().ajaxSelectPicker(CargarCieJs);