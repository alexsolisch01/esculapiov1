
function CargarFacturasCabecera(desde,hasta){

	$.ajax({
        async:false,        
        method: "POST",
        url: "Ajax/Aj_Facturas.php",
        data: {
            Requerimiento: "CargarFacturasCabecera",           
            Desde:desde,
            Hasta:hasta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        
        $.each(respuesta, function(i, value) {
            
              
              var elemento = '<tr>'              
                                +'<td>'+value["FV"]+'</td>'
                                +'<td>'+value[1]+'</td>'
                                +'<td>'+value[2]+'</td>'
                                +'<td>'+value[3]+'</td>'
                                +'<td>'+value[4]+'</td>'
                                +'<td>'+value[5]+'</td>'
                                +'<td>'+value[6]+'</td>'
                                +'<td>'+value[7]+'</td>'
                                +'<td>'+value[8]+'</td>'
                                +'<td>'+value[9]+'</td>'
                                +'<td>'+value[10]+'</td>'
                                +'<td>'+value[11]+'</td>'
                                +'<td>'+value[12]+'</td>'
                                +'<td>'+value[13]+'</td>'
                                +'<td>'+value[14]+'</td>'
                                +'<td>'+value[15]+'</td>'
                                +'<td>'+value[16]+'</td>'
                                +'<td>'+value[17]+'</td>'
                                +'<td>'+value[18]+'</td>'
                                +'<td>'+value[19]+'</td>'
                                +'<td>'+value[20]+'</td>'
                                +'<td>'+value[21]+'</td>'
                                +'<td>'+value[22]+'</td>'
                                +'<td>'+value[23]+'</td>'
                                +'<td>'+value[24]+'</td>'
                                +'<td>'+value[25]+'</td>'
                                +'<td>'+value[26]+'</td>'
                                +'<td>'+value[27]+'</td>'
                                +'<td>'+value[28]+'</td>'
                                +'<td>'+value[29]+'</td>'
                                +'<td>'+value[30]+'</td>'
                                +'<td>'+value[31]+'</td>'
                                +'<td>'+value[32]+'</td>'
                                +'<td>'+value[33]+'</td>'
                                +'<td>'+value[34]+'</td>'
                                +'<td>'+value[35]+'</td>'
                                +'<td>'+value[36]+'</td>'
                                +'<td>'+value[37]+'</td>'
                                +'<td>'+value[38]+'</td>'
                                +'<td>'+value[39]+'</td>'
                                +'<td>'+value[40]+'</td>'
                                +'<td>'+value[41]+'</td>'
                                +'<td>'+value[42]+'</td>'
                                +'<td>'+value[43]+'</td>'
                                +'<td>'+value[44]+'</td>'
                                +'<td>'+value[45]+'</td>'
                              +'</tr>';
                    $("#FacturasExcel tbody").append(elemento);          

        });
        
        
    });

}

function CargarFacturasDetalle(desde,hasta){

    $.ajax({
        async:false,        
        method: "POST",
        url: "Ajax/Aj_Facturas.php",
        data: {
            Requerimiento: "CargarFacturasDetalle",           
            Desde:desde,
            Hasta:hasta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        
        $.each(respuesta, function(i, value) {
            console.log(value)
              
              var elemento = '<tr>'              
                                +'<td>'+value["FV"]+'</td>'
                                +'<td>'+value["numero"]+'</td>'
                                +'<td>'+value['codigo']+'</td>'
                                +'<td>'+value[3]+'</td>'
                                +'<td>'+value[4]+'</td>'
                                +'<td>'+value[5]+'</td>'
                                +'<td>'+value["cantidad"]+'</td>'
                                +'<td>'+value[7]+'</td>'
                                +'<td>'+value[8]+'</td>'
                                +'<td>'+value[9]+'</td>'
                                +'<td>'+value[10]+'</td>'
                                +'<td>'+value[11]+'</td>'
                                +'<td>'+value[12]+'</td>'
                                +'<td>'+value[13]+'</td>'
                                +'<td>'+value[14]+'</td>'
                                +'<td>'+value[15]+'</td>'
                              +'</tr>';
                    $("#FacturasExcel3 tbody").append(elemento);          

        });
        
        
    });

}

$(".body").on('click', "button#CargarInforme", function(ev) {
		var desde = $("#fechaDesdeF").val();
        var hasta = $("#fechaDesdeF").val();

		if($("#cbmFiltro").val()==1){
			desde = desde +" 00:00:00";
			hasta = hasta +" 11:59:59";
		}
		if($("#cbmFiltro").val()==2){
			desde = desde +" 12:00:00";
			hasta = hasta +" 23:59:59";
		}
		if($("#cbmFiltro").val()==3){
			desde = desde +" 00:00:00";
			hasta = hasta +" 23:59:59";
		}
		$("#FacturasExcel tbody").empty(); 
        $("#FacturasExcel3 tbody").empty(); 
        CargarFacturasCabecera(desde,hasta);
        CargarFacturasDetalle(desde,hasta);
        
        CrearExcel('xlsx',"LOTE "+$("#cbmFiltro").val()+".xlsx");
        
});

       


function CrearExcel(type, fn, dl) {
    var elt = document.getElementById('FacturasExcel');
    var wb = XLSX.utils.table_to_book(elt, {sheet:"Factura",raw:true});

    var hoja2 = XLSX.utils.table_to_sheet(document.getElementById('FacturasExcel2'));

        wb.SheetNames.push("NotCre");
        wb.Sheets["NotCre"] = hoja2;

    var hoja3 = XLSX.utils.table_to_sheet(document.getElementById('FacturasExcel3'));

        wb.SheetNames.push("Detalles");
        wb.Sheets["Detalles"] = hoja3;

     var hoja4 = XLSX.utils.table_to_sheet(document.getElementById('FacturasExcel4'));

        wb.SheetNames.push("Ingresos_a_Caja");
        wb.Sheets["Ingresos_a_Caja"] = hoja4;

    return dl ?
        XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
        XLSX.writeFile(wb, fn || ('test.' + (type || 'xlsx')), {cellStyles:true});
}