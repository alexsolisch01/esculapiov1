
function CargarExistencias(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarExistencias",
            Bodega:$('#bodega').val(),
            Fecha:$("#FechaDesde").val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        var elemento = '';
        var elemento2 = '';
        var total =0;
        var stocktotal =0;
        var invtotal =0;
        $.each(respuesta, function(i, value) {
          var datos = [value[0],value[1],value[7],value[6],value[2],value[3],value[4],value[5],value[8],value[9],value[10],value[11]];
          tablaexis.row.add(datos);
			elemento += '<tr>'
                                          +'<td>'+value[0]+'</td>'
                                          +'<td>'+value[1]+'</td>'
                                          +'<td style="text-align: right">'+value[7]+'</td>'
                                          +'<td style="text-align: right">'+value[6]+'</td>'
                                          +'<td style="text-align: right">'+parseFloat(value[2]).toFixed(2)+'</td>'
                                          +'<td style="text-align: right">'+value[3]+'</td>'
                                          +'<td style="text-align: right">'+value[4]+'</td>'
                                          +'<td style="text-align: right">'+parseFloat(value[5]).toFixed(2)+'</td>'
                                          +'<td style="text-align: right">'+value[8]+'</td>'
                                          +'<td style="text-align: right">'+parseFloat(value[9]).toFixed(2)+'</td>'
                                          +'<td style="text-align: right">'+value[10]+'</td>'
                                          +'<td style="text-align: right">'+value[11]+'</td>'
                                          +'<td style="text-align: right">'+value[12]+'</td>'
                                        +'</tr>';

                                        if(value[5]!=null){
                                            total+=parseFloat(value[5]);
                                            stocktotal+=parseFloat(value[3]);
                                            invtotal++;
                                        }

                                        

        });
        elemento2 += '<tr>'
                                          +'<td style="text-align: center">'+invtotal+'</td>'
                                          +'<td style="text-align: center">'+stocktotal+'</td>'
                                          +'<td style="text-align: right">'+total.toFixed(2)+'</td>'
                                        +'</tr>';
        $("#cuerpoExistenciaResumido").append(elemento2);
        $("#cuerpoExistencia").append(elemento);
        $("#TotalInventario").html("TOTAL INVENTARIO =====================> $ "+total.toFixed(2));
        tablaexis.draw();
        //$("#TotalInventarioR").html("TOTAL INVENTARIO =====================> $ "+total.toFixed(2));
    });

}


$(".body").on('click', "button#CargarInforme", function(ev) {
        $("#cuerpoExistencia").empty();
        $("#cuerpoExistenciaResumido").empty();
        if($("#cbmTipo").val()!="RESUMIDO"){
          $("#Tabla").fadeIn(0);
          $("#Resumido").fadeOut(0);
        }else{
          $("#Resumido").fadeIn(0);
          $("#Tabla").fadeOut(0);
        }        
        CargarExistencias();
});

function Imprimir() {

  var estilos2 ='.page-header, .page-header-space {'
  +'height: 120px;'
+'}'
+''
+'.page-footer, .page-footer-space {'
  +'height: 50px;'
+''
+'}'
+''
+'.page-footer {'
  +'position: fixed;'
  +'bottom: 0;'
  +'width: 100%;'
+'}'
+''
+'.page-header {'
  +'position: fixed;'
  +'top: 0mm;'
  +'width: 100%;'
+'}'
+''
+'.page {'
  +'page-break-after: always;'
  +'width: 130%;'
+'}'
+''
+'@media print {'
   +'thead {display: table-header-group;} '
   +'tfoot {display: table-footer-group;}'
+'   '
   +'button {display: none;}'
+'   '
   +'body {margin: 0;}'
+'}';

    var piereporte =  '<div style="width: 100%;margin-top: 1em;">'
                        +'<table style="width: 100%;font-size:13px;">'
                            +'<thead>'
                                +'<th></th>'
                                +'<th></th>'
                                +'<th></th>'
                            +'</thead>'
                            +'<tbody>'
                                +'<tr>'
                                    +'<td>USUARIO : '+$("#nombresUsuario").html()+'</td>'
                                    +'<td>FECHA : '+$("#FechaActualEsculapio").val()+'</td>'
                                    +'<td>'+$("#nombrePc").val()+'</span></td>'
                                +'</tr>'                                                                
                            +'</tbody>'
                        +'</table>'
                    +'</div> '; 

    $('.body').find('label#tituloReporte').html('REPORTE DE EXISTENCIAS');
    $("#reporteFechaLocal").html("Fecha "+$('#FechaDesde').val());

    childWindow = window.open('','_blank');    
    childWindow.document.write('<html>')
    childWindow.document.write('<head>')
    childWindow.document.write('<style type="text/css">'+estilos2+'</style>')
    childWindow.document.write('</head>')
    childWindow.document.write('<body>')
    childWindow.document.write('<div class="page-header">')
    childWindow.document.write($('.body').find('div#cabeceraLocal').html())
    childWindow.document.write('</div>')
    childWindow.document.write('<table>')
    childWindow.document.write('<thead>')
    childWindow.document.write('<tr>')
    childWindow.document.write('<td>')
    childWindow.document.write('<!--place holder for the fixed-position header-->')
    childWindow.document.write('<div class="page-header-space"></div>')
    childWindow.document.write('</td>')
    childWindow.document.write('</tr>')
    childWindow.document.write('</thead>')
    childWindow.document.write('<tbody>')
    childWindow.document.write('<tr>')
    childWindow.document.write('<td>')
    childWindow.document.write('<!--*** CONTENT GOES HERE ***-->')
    //childWindow.document.write('<div class="page">'+cuerpo2+'</div>');
    childWindow.document.write('<div class="page">'+$('#Tabla').html()+piereporte+'</div>');
    childWindow.document.write('</div>')
    childWindow.document.write('</td>')
    childWindow.document.write('</tr>')
    childWindow.document.write('</tbody>')
    childWindow.document.write('<tfoot>')
    childWindow.document.write('<tr>')
    childWindow.document.write('<td>')
    childWindow.document.write('<!--place holder for the fixed-position footer-->')
    childWindow.document.write('<div class="page-footer-space"></div>')
    childWindow.document.write('</td>')
    childWindow.document.write('</tr>')
    childWindow.document.write('</tfoot>')
    childWindow.document.write('</table>')
    childWindow.document.write('</body>')
    childWindow.document.write('<script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script>')
    childWindow.document.write('</html>')

}
function Imprimir2() {

  var estilos2 ='.page-header, .page-header-space {'
  +'height: 120px;'
+'}'
+''
+'.page-footer, .page-footer-space {'
  +'height: 50px;'
+''
+'}'
+''
+'.page-footer {'
  +'position: fixed;'
  +'bottom: 0;'
  +'width: 100%;'
+'}'
+''
+'.page-header {'
  +'position: fixed;'
  +'top: 0mm;'
  +'width: 100%;'
+'}'
+''
+'.page {'
  +'page-break-after: always;'
  +'width: 130%;'
+'}'
+''
+'@media print {'
   +'thead {display: table-header-group;} '
   +'tfoot {display: table-footer-group;}'
+'   '
   +'button {display: none;}'
+'   '
   +'body {margin: 0;}'
+'}';

    var piereporte =  '<div style="width: 100%;margin-top: 1em;">'
                        +'<table style="width: 100%;font-size:13px;">'
                            +'<thead>'
                                +'<th></th>'
                                +'<th></th>'
                                +'<th></th>'
                            +'</thead>'
                            +'<tbody>'
                                +'<tr>'
                                    +'<td>USUARIO : '+$("#nombresUsuario").html()+'</td>'
                                    +'<td>FECHA : '+$("#FechaActualEsculapio").val()+'</td>'
                                    +'<td>'+$("#nombrePc").val()+'</span></td>'
                                +'</tr>'                                                                
                            +'</tbody>'
                        +'</table>'
                    +'</div> '; 

    $('.body').find('label#tituloReporte').html('REPORTE DE EXISTENCIAS');
    $("#reporteFechaLocal").html("Fecha "+$('#FechaDesde').val());

    childWindow = window.open('','_blank');    
    childWindow.document.write('<html>')
    childWindow.document.write('<head>')
    childWindow.document.write('<style type="text/css">'+estilos2+'</style>')
    childWindow.document.write('</head>')
    childWindow.document.write('<body>')
    childWindow.document.write('<div class="page-header">')
    childWindow.document.write($('.body').find('div#cabeceraLocal').html())
    childWindow.document.write('</div>')
    childWindow.document.write('<table>')
    childWindow.document.write('<thead>')
    childWindow.document.write('<tr>')
    childWindow.document.write('<td>')
    childWindow.document.write('<!--place holder for the fixed-position header-->')
    childWindow.document.write('<div class="page-header-space"></div>')
    childWindow.document.write('</td>')
    childWindow.document.write('</tr>')
    childWindow.document.write('</thead>')
    childWindow.document.write('<tbody>')
    childWindow.document.write('<tr>')
    childWindow.document.write('<td>')
    childWindow.document.write('<!--*** CONTENT GOES HERE ***-->')
    //childWindow.document.write('<div class="page">'+cuerpo2+'</div>');
    childWindow.document.write('<div class="page">'+$('#Resumido').html()+piereporte+'</div>');
    childWindow.document.write('</div>')
    childWindow.document.write('</td>')
    childWindow.document.write('</tr>')
    childWindow.document.write('</tbody>')
    childWindow.document.write('<tfoot>')
    childWindow.document.write('<tr>')
    childWindow.document.write('<td>')
    childWindow.document.write('<!--place holder for the fixed-position footer-->')
    childWindow.document.write('<div class="page-footer-space"></div>')
    childWindow.document.write('</td>')
    childWindow.document.write('</tr>')
    childWindow.document.write('</tfoot>')
    childWindow.document.write('</table>')
    childWindow.document.write('</body>')
    childWindow.document.write('<script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script>')
    childWindow.document.write('</html>')

}

$(".body").on('click', "button#ImprimirInforme", function(ev) {
  if($("#cbmTipo").val()!="RESUMIDO"){
    Imprimir();  
  }else{
    Imprimir2();
  }
  
});


$(".body").on('click', "button#ExportarExcel", function(ev) {
  CrearExcel('xlsx',"Existencias.xlsx");
});


function CrearExcel(type, fn, dl) {
    var elt = document.getElementById('TablaExportar');
    var wb = XLSX.utils.table_to_book(elt, {sheet:"Existencias",raw:true});
    return dl ?
        XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
        XLSX.writeFile(wb, fn || ('test.' + (type || 'xlsx')), {cellStyles:true});
}

var tablaexis = $('#TablaExportar2').DataTable({
    'paging': false,
    'lengthChange': false,
    dom: '<"top"lBf>rt<"bottom"ip>',
    'searching': true,
    'ordering': false,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true,
    buttons: [{
            extend: 'excelHtml5'
        }, {
            extend: 'pdfHtml5'
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }, {
            extend: 'print',
            text: 'Imprimir',
            exportOptions: {
                columns: ':visible'
            }
        }], 
});