	function CamposLLenos(campos) {
	    var isEmpty = false;
	    $.each(campos, function(j, iten) {
	        if (typeof campos[j] == 'undefined' || campos[j] == null || campos[j] == '') {
	            isEmpty = true;
	        }
	        if (typeof campos[j] == 'number' && isNaN(campos[j])) {
	            isEmpty = true;
	        }
	        if (campos[j] instanceof Date && isNaN(Number(campos[j]))) {
	            isEmpty = true;
	        }
	        if (isEmpty) {
	            swal("Esculapio!", "Llene los campos obligatorios", "error");
	        }
	    });
	    return isEmpty;
	}

	function AgregarFila(tabla, campos) {
	    var t = $(tabla).DataTable();
	    t.row.add(campos).draw(false);
	}

	function ModificarFila(tabla, campos, id) {
	    var t = $(tabla).DataTable();

	    var fila = $(tabla + ' td:nth-child(1):contains(' + id + ')').filter(function() {
	        return $.trim($(this).text()) == id;
	    });

	    t.row(fila.parent()).remove().draw(false);
	    t.row.add(campos).draw(false);
	}

	function EliminarFila(tabla, id) {
	    var t = $(tabla).DataTable();
	    var fila = $(tabla + ' td:nth-child(1):contains(' + id + ')').filter(function() {
	        return $.trim($(this).text()) == id;
	    });
	    t.row(fila.parent()).remove().draw(false);
	}

	function InactivarFila(tabla, id) {
	    var t = $(tabla).DataTable();
	    var fila = $(tabla + ' td:nth-child(1):contains(' + id + ')').filter(function() {
	        return $.trim($(this).text()) == id;
	    });
	    fila.parent().attr('estado', "2");
	    fila.parent().css("background-color", "#f39c12");
	}

	function ActivarFila(tabla, id) {
	    var t = $(tabla).DataTable();
	    var fila = $(tabla + ' td:nth-child(1):contains(' + id + ')').filter(function() {
	        return $.trim($(this).text()) == id;
	    });
	    fila.parent().attr('estado', "1");
	    fila.parent().css("background-color", "");
	}

	function AgregarItem(combo, item) {
	    $(combo).append('<option value=' + item[0] + '>' + item[1] + '</option>');
	}
	$('.body table tbody').on('dblclick', 'tr', function(evt) {
		if($(this).parent().parent().attr("id")=="datatableCuentasCobrarDetalle"){
			return;
		}
		if($(this).parent().parent().attr("id")=="datatableAnalisis"){
			return;
		}
	    if ($(this).hasClass('selected')) {
	        $(this).removeClass('selected');
	    } else {
	        $('table tr.selected').removeClass('selected');
	        $(this).addClass('selected');
	    }
	    $(".content-wrapper").animate({ scrollTop: 0 }, 400);
	});
	$('.body table#datatableAgregarPlantilla tbody').on('dblclick', 'tr', function(evt) {
	    $(this).removeClass('selected');
	});

	function CargarFila(posiciones, campos, fila) {
	    if (fila != null) {
	        $.each(campos, function(j, iten) {
	            try {
	                var tagName = campos[j].prop("tagName").toLowerCase();
	                if (tagName == 'input' && tagName != 'select') {
	                    campos[j].val(fila[posiciones[j]]);
	                }
	                if (tagName == 'select') {
	                    var id = "#" + campos[j].attr('id');
	                    var p = $(id + " option:contains(" + fila[posiciones[j]] + ")").attr('value');
	                    $(id).val(p);

	                } else {
	                    campos[j].val(fila[posiciones[j]]);
	                }
	            } catch (error) {
	                console.log(error);
	            }
	        });

	    }
	    $('.selectpicker').selectpicker('refresh');
	}

	function Mensaje(mensaje, tipo, retorna) {
	    if (retorna) {
	        swal({
	            title: "Esculapio",
	            text: mensaje,
	            icon: tipo,
	            buttons: ["Cancelar", "OK!"],
	            dangerMode: false,
	        }).then((confirma) => {
	            return confirma;
	        });
	    } else {
	        swal("Esculapio!", mensaje, tipo);
	    }
	}

	function parametroURL(_par) {
	    var _p = null;
	    if (location.search) location.search.substr(1).split("&").forEach(function(pllv) {
	        var s = pllv.split("="), //separamos llave/valor
	            ll = s[0],
	            v = s[1] && decodeURIComponent(s[1]); //valor hacemos encode para prevenir url encode
	        if (ll == _par) { //solo nos interesa si es el nombre del parametro a buscar
	            if (_p == null) {
	                _p = v; //si es nula, quiere decir que no tiene valor, solo textual
	            } else if (Array.isArray(_p)) {
	                _p.push(v); //si ya es arreglo, agregamos este valor
	            } else {
	                _p = [_p, v]; //si no es arreglo, lo convertimos y agregamos este valor
	            }
	        }
	    });
	    return _p;
	}
	$('#radioBtn a').on('click', function() {
	    var sel = $(this).data('title');
	    var tog = $(this).data('toggle');
	    $('#' + tog).prop('value', sel);
	    $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
	    $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
	})
	$(document).ready(function() {
	    $('.body').find('tr[estado=2]').css("background-color", "#f39c12");
	});



    if($("span#nombresUsuario").attr("perfil")==60){
    	if (parametroURL('pagina')=='signos') {
			$("li#agendaPendientes").remove();
			$("li#agendaAtendidos").remove();
			$("#MenuLateral").append('<li><a href="index.php?pagina=agenda"><i class="fa fa-book"></i> <span>AGENDA</span></a></li>');
		}
		if (parametroURL('pagina') != 'agenda' && parametroURL('pagina')!='signos' && parametroURL('pagina')!='odontograma') {
			//window.location.href = "index.php?pagina=agenda";
		}
    }
    var confirma = true;
    $(document).keydown(function(tecla) {
    	//39 derecha
    	//37 izquierda
    	//27 ESC
    	//alert(tecla.keyCode);
    	if(swal.getState().isOpen){

    		 if(tecla.keyCode==27){
    		 	tecla.preventDefault();
    		 	swal.close();
    		 	return;
    		 }

    		 $(".swal-modal").draggable();

    		if(tecla.keyCode==39){
    			document.activeElement.blur();
    			$('button.swal-button--confirm').focus();
    			$('button.swal-button--confirm').addClass('focusSwall');
    			$('button.swal-button--cancel').removeClass('focusSwall');
    			confirma = true;
    		}
    		if(tecla.keyCode==37){
    			document.activeElement.blur();
    			confirma = false;
    			$('button.swal-button--cancel').focus();
    			$('button.swal-button--confirm').removeClass('focusSwall');
    			$('button.swal-button--cancel').addClass('focusSwall');
    		}
    		if(tecla.keyCode==13){
    			if(confirma){
	    			$('button.swal-button--confirm').click();
	    		}else{
	    			$('button.swal-button--cancel').click();
	    		}
    		}


    	}
    });

$("body").on('change', "input[type=text]", function(ev) {
	if($(this).hasClass("noupper")){
		return;
	}
	this.value = this.value.toUpperCase();
});

var eliminar = 0;

function destruirTablaTemporalFinal(){
	$.ajax({
		async:false,
		method: "POST",
		url: "Ajax/Aj_ManteBodega.php",
		data: {
			Requerimiento: "DestruirTablaTemporal"
		},
		dataType: "JSON",
		});
}

if (parametroURL('pagina')=='farmacia') {
        destruirTablaTemporalFinal();
}

$('#titulo').html(parametroURL('pagina'));
function validarruc(number)
{
	var dto = number.length;
	  var valor;
	  var acu=0;
	  if(number==""){
	   return false;
	   }

	    if(number=="0992835656001"){
	   return true;
	   }


	  else{
	   for (var i=0; i<dto; i++){
		   valor = number.substring(i,i+1);
		   if(valor==0||valor==1||valor==2||valor==3||valor==4||valor==5||valor==6||valor==7||valor==8||valor==9){
		    acu = acu+1;
		   }
	   }
	   if(acu==dto){
	    while(number.substring(10,13)!=001){
	     return false;
	    }
	    while(number.substring(0,2)>24){
	     return false;
	    }
	    return true;
	   }
	   else{
	   return false;
	   }
	  }
}
function ValidarCedula(numeroCedula){

  /**
     * 1.- Se debee validar que tnga 10 numeros
     * 2.- Se extrae los dos primero digitos de la izquierda y compruebo que existan las regiones
     * 3.- Extraigo el ultimo digito de la cedula
     * 4.- Extraigo Todos los pares y los sumo
     * 5.- Extraigo Los impares los multiplico x 2 si el numero resultante es mayor a 9 le restamos 9 al resultante
     * 6.- Extraigo el primer Digito de la suma (sumaPares + sumaImpares)
     * 7.- Conseguimos la decena inmediata del digito extraido del paso 6 (digito + 1) * 10
     * 8.- restamos la decena inmediata - suma / si la suma nos resulta 10, el decimo digito es cero
     * 9.- Paso 9 Comparamos el digito resultante con el ultimo digito de la cedula si son iguales todo OK sino existe error.
     */

     var cedula = numeroCedula;
     if(cedula=="1310010101"){
     	return true;
     }
     if(cedula.length == 13){
     	return true;
     }

     //Preguntamos si la cedula consta de 10 digitos
     if(cedula.length == 10){

        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0,2);

        //Pregunto si la region existe ecuador se divide en 24 regiones
        if( digito_region >= 1 && digito_region <=24 ){

          // Extraigo el ultimo digito
          var ultimo_digito   = cedula.substring(9,10);

          //Agrupo todos los pares y los sumo
          var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

          //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
          var numero1 = cedula.substring(0,1);
          var numero1 = (numero1 * 2);
          if( numero1 > 9 ){ var numero1 = (numero1 - 9); }

          var numero3 = cedula.substring(2,3);
          var numero3 = (numero3 * 2);
          if( numero3 > 9 ){ var numero3 = (numero3 - 9); }

          var numero5 = cedula.substring(4,5);
          var numero5 = (numero5 * 2);
          if( numero5 > 9 ){ var numero5 = (numero5 - 9); }

          var numero7 = cedula.substring(6,7);
          var numero7 = (numero7 * 2);
          if( numero7 > 9 ){ var numero7 = (numero7 - 9); }

          var numero9 = cedula.substring(8,9);
          var numero9 = (numero9 * 2);
          if( numero9 > 9 ){ var numero9 = (numero9 - 9); }

          var impares = numero1 + numero3 + numero5 + numero7 + numero9;

          //Suma total
          var suma_total = (pares + impares);

          //extraemos el primero digito
          var primer_digito_suma = String(suma_total).substring(0,1);

          //Obtenemos la decena inmediata
          var decena = (parseInt(primer_digito_suma) + 1)  * 10;

          //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
          var digito_validador = decena - suma_total;

          //Si el digito validador es = a 10 toma el valor de 0
          if(digito_validador == 10)
            var digito_validador = 0;

          //Validamos que el digito validador sea igual al de la cedula
          if(digito_validador == ultimo_digito){
            return true;
          }else{
            return false;
          }

        }else{
          // imprimimos en consola si la region no pertenece
          return false;
        }
     }else{
        //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
        return false;
     }
}


function ValidarFormasPago(){

	var Fpcheque = $("#Fpcheque").val();
	var Fptransferencias = $("#FpTransfencias").val();
	var Fptarjeta = $("#FpTarjeta").val();
	var Fpcredito = $("#FpCredito").val();

	var FcSri = $("#FcSri").val();

	var FcCorreos = $("#FcCorreos").val();

	if(Fpcheque==0){
		$('.fpcheque').fadeOut(0);
	}
	if(Fptransferencias==0){
		$('.fptransferencias').fadeOut(0);
	}
	if(Fptarjeta==0){
		$('.fptarjeta').fadeOut(0);
	}
	if(Fpcredito==0){
		$('.fpcredito').fadeOut(0);
	}

	if(FcSri!="Online" && FcSri !="Manual" && $("#nombresUsuario").attr("perfil")==85){
		EnviarComprobantesSri();
	}

}
//ActualizarStockKardex();
function EnviarComprobantesSri(){

	//////////////////////////////////////////////////////////////////////////////////
	////////////////		CONSULTA
	//////////////////////////////////////////////////////////////////////////////////

	var msecPerMinuteC = 1000 * 60;
	msecPerMinuteC = msecPerMinuteC*10;

	var tidC = setInterval(function() {
	            EnviarXmlSri();
	            if (new Date().getHours()==22) {
	            	ActualizarStockKardex();
	            }
	}, msecPerMinuteC);
	//////////////////////////////////////////////////////////////////////////////////
	////////////////		FARMACIA
	//////////////////////////////////////////////////////////////////////////////////
	var msecPerMinuteF = 1000 * 60;
	msecPerMinuteF = msecPerMinuteF*20;

	var tidF = setInterval(function() {
	            EnviarXmlSriFarmacia();
	}, msecPerMinuteF);

	//////////////////////////////////////////////////////////////////////////////////
	////////////////		NC CONSULTA
	//////////////////////////////////////////////////////////////////////////////////

	var msecPerMinuteNC = 1000 * 60;
	msecPerMinuteNC = msecPerMinuteNC*15;

	var tidNC = setInterval(function() {
	            EnviarXmlSriNcCon();
	}, msecPerMinuteNC);


	//////////////////////////////////////////////////////////////////////////////////
	////////////////		NC FARMACIA
	//////////////////////////////////////////////////////////////////////////////////

	var msecPerMinuteNF = 1000 * 60;
	msecPerMinuteNF = msecPerMinuteNF*15;

	var tidNF = setInterval(function() {
	            EnviarXmlSriNcFarm();
	}, msecPerMinuteNF);
}
function ActualizarStockKardex() {

    $.ajax({
    	async:false,
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento :"ActualizarStockKardex"
        },
        dataType: "JSON",

    });
}
//CorregirCosto();
function CorregirCosto() {

    $.ajax({
    	async:false,
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento :"CorregirCosto"
        },
        dataType: "JSON",

    });
}

function EnviarXmlSri() {



    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sri.php",
        data: {
            Requerimiento :"ValidarComprobanteOffiline"
        },
        dataType: "JSON",

    }).done(function(respuesta) {
        console.log(respuesta);


            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {

                    Requerimiento :"autorizacionComprobanteOffiline"
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
            }).fail(function(jqXHR, textStatus, errorThrown) {
            	console.log(errorThrown);
            });



    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

function EnviarXmlSriFarmacia() {



    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sri.php",
        data: {
            Requerimiento :"ValidarComprobanteOffilineFarmacia"
        },
        dataType: "JSON",

    }).done(function(respuesta) {
        console.log(respuesta);


            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {

                    Requerimiento :"autorizacionComprobanteOffilineFarmacia"
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            });



    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

function EnviarXmlSriNcCon() {



    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sri.php",
        data: {
            Requerimiento :"ValidarComprobanteOffilineNcCon"
        },
        dataType: "JSON",

    }).done(function(respuesta) {
        console.log(respuesta);


            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {

                    Requerimiento :"autorizacionComprobanteOffilineNcCon"
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            });



    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

function EnviarXmlSriNcFarm() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sri.php",
        data: {
            Requerimiento :"ValidarComprobanteOffilineNcFarm"
        },
        dataType: "JSON",

    }).done(function(respuesta) {
        console.log(respuesta);


            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {

                    Requerimiento :"autorizacionComprobanteOffilineNcFarm"
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            });



    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

function caracteresCorreoValido(email){
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (caract.test(email) == false){
        return false;
    }else{
        return true;
    }
}

function validarruc(number)
{
	 var dto = number.length;
	  var valor;
	  var acu=0;
	  if(number==""){
	   alert('No has ingresado ningún dato, porfavor ingresar los datos correspondientes.');
	   }
	  else{
	   for (var i=0; i<dto; i++){
	   valor = number.substring(i,i+1);
	   if(valor==0||valor==1||valor==2||valor==3||valor==4||valor==5||valor==6||valor==7||valor==8||valor==9){
	    acu = acu+1;
	   }
	   }
	   if(acu==dto){
	    while(number.substring(10,13)!=001){
	     alert('Los tres últimos dígitos no tienen el código del RUC 001.');
	     return;
	    }
	    while(number.substring(0,2)>24){
	     alert('Los dos primeros dígitos no pueden ser mayores a 24.');
	     return;
	    }
	    alert('El RUC está escrito correctamente');
	    alert('Se procederá a analizar el respectivo RUC.');
	    var porcion1 = number.substring(2,3);
	    if(porcion1<6){
	     alert('El tercer dígito es menor a 6, por lo \ntanto el usuario es una persona natural.\n');
	    }
	    else{
	     if(porcion1==6){
	      alert('El tercer dígito es igual a 6, por lo \ntanto el usuario es una entidad pública.\n');
	     }
	     else{
	      if(porcion1==9){
	       alert('El tercer dígito es igual a 9, por lo \ntanto el usuario es una sociedad privada.\n');
	      }
	     }
	    }
	   }
	   else{
	   alert("ERROR: Por favor no ingrese texto");
	   }
	  }
}

ValidarFormasPago();
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var table = $.fn.dataTable.fnTables(true);
             if ( table.length > 0 ) {
                  $(table).dataTable().fnAdjustColumnSizing();
                }
});

$(".modal-dialog").draggable({
        handle:".modal-header,.modal-footer",
});

function CambiarFoto(foto){
	var formData = new FormData();
    formData.append('Requerimiento', "CambiarFoto");
    formData.append('Foto', foto);

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Empleado Guardado.!", "success");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$("body").on('click', "#CambiarFoto", function(ev) {
	var foto = $(".body").find('input#fotoUser')[0].files[0];
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Guardar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            CambiarFoto(foto);
        } else {
        }
    });
});

function VisualizarFoto(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function(e) {
            $(input).parent().css({
                "background": "url(" + e.target.result + ") no-repeat",
                "background-size": "cover",
                "height": "15em",
                "background-position": "center center"
            });
        }
    }
}
$('.body').find('input#fotoUser').change(function() {
    VisualizarFoto(this);
});

function formatoDinero(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};

$(".body li.user-footer").on('click', "a#CambiarContra", function (evt) {
    var primer = '';
    var segundo = '';
    var idg = $(this).attr("fol");
    swal("Por Favor cambie su contraseña antes de continuar", {
        content: {
            element: "input",
            attributes: {
                id: "PrimeraPass",
                placeholder: "Escriba su nueva contraseña",
                type: "password",
            },
        },
        buttons: {
            cancel: true,
            confirm: true
        },
    }).then((value) => {
        if (value) {
            primer = value;
            swal("Confirmar Contraseña", {
                content: {
                    element: "input",
                    attributes: {
                        id: "SegundaPass",
                        placeholder: "Repita su nueva contraseña",
                        type: "password",
                    },
                    buttons: {
                        cancel: true,
                        confirm: true
                    },
                },
            }).then((value1) => {
                segundo = value1;
                if (value1 == value) {
                    CambiarContra(idg, segundo);
                } else {
                    swal("Las Contraseñas Ingresadas no Coinciden, Por Favor intente nuevamente")
                }
            });
        }
    });
});

function CambiarContra(id, segundo) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Usuario.php",
        data: {
            Requerimiento: "ModificaContra",
            Segundo: segundo,
            Id: id
        },
        dataType: "JSON",
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio", "Contraseña Cambiada se cerrará la Sesión! ", "success", {
                buttons: {
                    confirm: true,
                },
            }).then((value) => {
                window.location.href = "index.php?pagina=salir";
            });
        } else {
            return;
        }
    })
};

$(".body").on('click', "li#ListaPaciente a#nombrePaciente", function (evt) {
    var id = $(this).attr('idPaciente');
    var nombre = $(this).text();
    $(".body form#DatosPacientes").find('input#nombrePacienteMedico').val(nombre);
});

function CargarReporteDiseno(reporte){
	var html = [];
	$.ajax({
	   async:false,
	   method:"POST",
	   url:"Ajax/Aj_Parametros.php",
	   data: {Requerimiento:"CargarReporteDiseno",
			   Reporte:reporte
		   },
		dataType: 'JSON',

   }).done(function(respuesta) {
	 $.each(respuesta, function(i, value) {                
		   html.push(value[0]);
		   html.push(value[1]);
	   });        
   }).fail( function(jqXHR, textStatus, errorThrown ) {
	   console.log(errorThrown)                    
   });
   return html;
}