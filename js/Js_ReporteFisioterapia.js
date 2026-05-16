var filas = '';
var t1=0;


function CargarReporteFisioterapia(){    
    $.ajax({ 
        async:false,       
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarReporteFisioterapia",
            FechaD:$("#fechaDesde").val(),
            FechaH:$("#fechaHasta").val(),            
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
$(".body").on('click', "button#ConsultarReporte", function(ev) {
    filas = '';
    t1=0;
    
    $('#modal-cargando').modal();
    $("#cuerpoReporte").empty(); 
});

$('#modal-cargando').on('shown.bs.modal', function() {
    filas = '';
    t1=0;
    GenerarReportes();
});

function GenerarReportes(){
    var tabla = ' <table id="TablaReporte" width="100%" cellspacing="0" class="table table-striped table-bordered nowrap table-condensed">'
                        +'<thead>'
                          +'<tr>'
                            +'<th class="text-center">DETERMINACIONES</th>'
                            +'<th class="text-center">CANTIDAD</th>'                            
                          +'</tr>'
                        +'</thead>'
                        +'<tbody >';

    CargarReporteFisioterapia();

    tabla += filas;
        tabla += '</tbody>'
                        +'<tfoot>'
                          +'<tr>'
                            +'<th>USO INEC (Total LABORATORIO CLINICO)</th>'
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