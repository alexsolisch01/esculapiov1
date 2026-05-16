var tablaClienteCuentas = null;

function LlenarTablaCuentas(fechaDesde,fechaHasta) {
    tablaClienteCuentas = $('#datatableMovimientoCxC').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_MovCuenta.php",
            data: {
                Requerimiento: "CargarCuentasTodas",
                FechaDesde: fechaDesde,
                FechaHasta: fechaHasta
            },
            type: "POST"
        },
        scrollY: 450,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4, 5],
            "orderable": false
        },{
            "targets": [3],
            "className": 'pull-right'
        },{
            "targets": [4, 5],
            "visible": false
        }]
    });
    tablaClienteCuentas.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableMovimientoCxC tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableMovimientoCxC_filter input').unbind();
    $('#datatableMovimientoCxC_filter input').remove();
    $('#datatableMovimientoCxC_filter label').remove();
    $('input#numeroDeudas').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaClienteCuentas.column(0).search($('input#numeroDeudas').val()).draw();
            tablaClienteCuentas.column(2).search($('input#nombreDeudas').val()).draw();
        //}
    });
    $('input#nombreDeudas').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaClienteCuentas.column(0).search($('input#numeroDeudas').val()).draw();
            tablaClienteCuentas.column(2).search($('input#nombreDeudas').val()).draw();
        //}
    });
    /*$('input#cedulaFiltroAnticipo').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaClienteSinDeuda.column(0).search($('input#cedulaFiltroAnticipo').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableAnticipoSinDeuda tbody tr td').eq(0).click();
        }
    });*/
}

LlenarTablaCuentas($('input#fechaDesdeDeuda').val(),$('input#fechaHastaDeuda').val());

$(".body").on('click', "button#BuscarDeudas", function(ev) {
    try{
        tablaClienteCuentas.destroy();
    }catch(error){}
    var fechaDesde = $('input#fechaDesdeDeuda').val();
    var fechaHasta = $('input#fechaHastaDeuda').val();
    LlenarTablaCuentas(fechaDesde,fechaHasta);
});

$(".body").on('click', "button#ImprimirDeudas", function(ev) {
    printTextAreaMovimientos();
});

function printTextAreaMovimientos(){
    var cuerpo2 = '';
    var total = 0;
    if($('.body').find("#datatableMovimientoCxC tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<table style="margin-top: 1em; width: 100%; border-collapse: collapse; font-size:12px;"><thead style="border-top: 1px solid black; border-bottom: 1px solid black;"><tr><th style"width: 20%;">COMPROBANTE</th><th style"width: 20%;">EMISION</th><th style"width: 50%;">PERSONA</th><th style"width: 10%;">VALOR</th></tr></thead><tbody style="border-bottom: 1px solid black;">';
        var vector = $('.body').find("#datatableMovimientoCxC tbody tr");
        var selec = '';
        $.each(vector, function(a) {
            var comprobante = $(this).find('td').eq(0).html();
            var emision = $(this).find('td').eq(1).html();
            var persona = $(this).find('td').eq(2).html();            
            var valor =  $(this).find('td').eq(3).html();;
            var valorS =  $(this).find('td').eq(3).html().replace('$ ', '');
            total += parseFloat(valorS);
            selec += '<tr><td style="font-size:12px;">'+comprobante+'</td><td style="font-size:12px;">'+emision+'</td><td style="font-size:12px;">'+persona+'</td><td style="font-size:12px; text-align: right;">'+valor+'</td></tr>';
            
        });
        var filaAdicional = '<tr style="border-top: 1px solid black; border-bottom: 1px solid black;"><td style="font-size:12px;"></td><td style="font-size:12px;"></td><td style="font-size:12px;"></td><td style="font-size:12px; text-align: right; font-weight:bold;">$ '+total.toFixed(2)+'</td></tr>';
        cuerpo2 += selec+filaAdicional+'</tbody></table></div><br>';
    }
    
    var comprobante = '<div style="width:100%; text-align: center; border: 2px solid black; margin-top: 1em; margin-bottom: 1em;"><label style="font-weight:bold; font-size: small; text-align: center;">MOVIMIENTOS DE CUENTAS POR COBRAR</label><br></div>';
    var empresa = '<div style="width:100%; text-align: center; margin-top: 0.2em; margin-bottom: 0.2em;"><label style="font-weight:bold; font-size: small; text-align: center;">FUNDACION SANTA ISABEL MADRE DEL PRECURSOR</label><br></div>';
    
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
    
    
   if($('.body').find("#datatableMovimientoCxC tbody tr").find('td').html()!="No existen datos"){
     childWindow = window.open('','_blank');
    childWindow.document.write('<html><head></head><body>');
    childWindow.document.write('<div style="margin-top:-1.2em;"></div>');
        childWindow.document.write('<div style="margin-top:20px;" ></div>');
        childWindow.document.write(empresa);
        childWindow.document.write(comprobante);
        childWindow.document.write(cuerpo2+piereporte);
        childWindow.document.write('</div>');
        childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');    
    }else{
      swal("Esculapio!", "No existen Datos para Imprimir", "error");
      return;
    }
}