
function CargarConsultasPendientes(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarConsultasPendientes",
            Servicio:$('#cbmServico').val(),
            Medico:$('#cbmMedico').val(),
            FechaDesde:$('#fechaDesdeI').val(),
            FechaHasta:$('#fechaDesdeF').val(),
            Especialidad:$('#cbmEspecialidad').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta);
        var elemento = '';
        var total =0;
        $.each(respuesta, function(i, value) {

            var estado = '<span class="btn btn-sm nopaddingBoton btn-warning">PENDIENTE</span>';
            if(value[10]=="9"){
               estado = '<span class="btn btn-sm nopaddingBoton btn-warning">SIGNOS VITALES</span>';
            }
            if(value[9]=="19"){
               estado = '<span class="btn btn-sm nopaddingBoton btn-success">ATENDIDO</span>';
            }
            if(value[9]=="25"){
               estado = '<span class="btn btn-sm nopaddingBoton btn-primary">NOTA CREDITO</span>';
            }
            elemento += '<tr>'
                                          +'<td>'+value[0]+'</td>'
                                          +'<td>'+value[8]+'</td>'
                                          +'<td>'+value[1]+'</td>'
                                          +'<td>'+value[5]+'</td>'
                                          +'<td>'+value[6]+'</td>'
                                          +'<td>'+value[2]+'</td>'
                                          +'<td>'+value[3]+'</td>'
                                          +'<td>$'+value[4]+'</td>'
                                          +'<td>'+value[7]+'</td>'
                                          +'<td>'+estado+'</td>'
                                          +'<td class="text-right">'
                                          +'<button class="btn btn-sm btn-info nopaddingBoton" title="Ver Detalles"><i class="fa fa-eye"></i></button> '
                                          +'<button class="btn btn-sm btn-warning nopaddingBoton" title="Editar"><i class="fa fa-edit"></i></button> '
                                          +'<button class="btn btn-sm btn-danger nopaddingBoton" title="Eliminar"><i class="fa fa-trash"></i></button>'
                                          +'</td>'
                                          +'</tr>'    
                                          if(value[4]!=null){
                                              total+=parseFloat(value[4]);
                                          }

                                        

        });
        $("#cuerpoConsulta").append(elemento);
        $("#TotalConsultas").html("MONTO TOTAL $ "+total.toFixed(2));

        // Inicializar DataTable con paginación
        $('#datatableConsultasPendientes').DataTable({
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": false,
            "responsive": true,
            "pageLength": 10,
            "language": {
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "zeroRecords": "No se encontraron resultados",
                "info": "Mostrando página _PAGE_ de _PAGES_",
                "infoEmpty": "No hay registros disponibles",
                "infoFiltered": "(filtrado de _MAX_ registros totales)",
                "search": "Buscar:",
                "paginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            }
        });
    });

}


$(".body").on('click', "button#CargarInforme", function(ev) {
        $("#cuerpoConsulta").empty();
        CargarConsultasPendientes();
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
  +'width: 100%;'
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


    $('.body').find('label#tituloReporte').html('REPORTE DE CONSULTAS PENDIENTES');
    $("#reporteFechaLocal").html("Fecha "+$('#fechaDesdeI').val()+" - "+$('#fechaDesdeF').val());

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

$(".body").on('click', "button#ImprimirInforme", function(ev) {

  Imprimir();
});

$(".body").on('change', "select#cbmServico", function(ev) {
    CargarEspecialidades();        
});

//CargarEspecialidades();   
function CargarEspecialidades(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Especialidad.php",
        data: {
            Requerimiento: "CargarEspecialidades",
            Servicio:$('#cbmServico').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        
        var elemento = '';
        $("#cbmEspecialidad").empty();
        $("#cbmEspecialidad").append('<option value="0">Todos..</option>');
        $("#cbmMedico").empty();
        $("#cbmMedico").append('<option value="0">Todos..</option>');
        $.each(respuesta, function(i, value) {

            elemento += ' <option value="'+value[0]+'">'+value[1]+'</option> ';  
        });
        $("#cbmEspecialidad").append(elemento);
    });

}

function CargarMedicoEspecialidades(especialidad){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Especialidad.php",
        data: {
            Requerimiento: "CargarMedicoEspecialidades",
            Especialidad:especialidad,
            Servicio:$('#cbmServico').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) { 
      
        var elemento = '';
        $("#cbmMedico").empty();
        $("#cbmMedico").append('<option value="0">Todos..</option>');
        $.each(respuesta, function(i, value) {

            elemento += ' <option value="'+value[0]+'">'+value[2]+' '+value[1]+'</option> ';  
        });
        $("#cbmMedico").append(elemento);
    });

}
$(".body").on('change', "select#cbmEspecialidad", function(ev) {
  var especialidad = $(this).val();
  CargarMedicoEspecialidades(especialidad);
});