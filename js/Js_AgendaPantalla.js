var pantallaAcargar = "";
function cargarPantalla() {

	$.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Usuario.php",
        data: {
            Requerimiento: "cargarPantalla"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
    	var numero =0;
    	var especialidades = "";
        
    	$.each(respuesta, function(i, iten) {

    			especialidades =especialidades+" "+iten[0]+"\n";	
               numero = i;
        });
            if(respuesta[0][0]=="ESTOMATOLOGÍA"){            
                window.location.href = "index.php?pagina=odontograma";
            }
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

cargarPantalla();