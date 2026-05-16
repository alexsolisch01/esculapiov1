var editorElement = null;
if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
  CKEDITOR.tools.enableHtml5Elements(document);

// The trick to keep the editor in the sample quite small
// unless user specified own height.
CKEDITOR.config.height = 400;
CKEDITOR.config.width = 'auto';
CKEDITOR.config.tabSpaces = 4;

CKEDITOR.config.extraPlugins = 'lineheight';

var initSample = (function () {
  var wysiwygareaAvailable = isWysiwygareaAvailable(),
    isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');
  return function () {
    editorElement = CKEDITOR.document.getById('editor');

    // Depending on the wysiwygarea plugin availability initialize classic or inline editor.
    if (wysiwygareaAvailable) {
      CKEDITOR.replace('editor');
    } else {
      editorElement.setAttribute('contenteditable', 'true');
      CKEDITOR.inline('editor');

      // TODO we can consider displaying some info box that
      // without wysiwygarea the classic editor may not work.
    }
  };

  function isWysiwygareaAvailable() {
    // If in development mode, then the wysiwygarea must be available.
    // Split REV into two strings so builder does not replace it :D.
    if (CKEDITOR.revision == ('%RE' + 'V%')) {
      return true;
    }

    return !!CKEDITOR.plugins.get('wysiwygarea');
  }
})();

initSample();



$("body").on('change', "#cbmReporte", function (ev) {

  if ($(this).val() == "0") {
    CKEDITOR.instances.editor.setData("");
  } else {
    CargarDiseñoRide($(this).val());
  }

});

function CargarDiseñoCheque() {
  var reporte = '{persona}{0.00}{totalletras}{ciudad}{fecha}';

  var gurdado = CargarReporteDiseno(1);
  if (gurdado.length > 0) {
    CKEDITOR.instances.editor.setData(gurdado[0].replace(/°/g, '"'));
  } else {
    CKEDITOR.instances.editor.setData(reporte);
  }
}

function CargarDiseñoRide(numero) {
  var reporte = '';

  var gurdado = CargarReporteDiseno(numero);
  if (gurdado.length > 0) {
    CKEDITOR.instances.editor.setData(gurdado[0].replace(/°/g, '"'));
  } else {
    CKEDITOR.instances.editor.setData(reporte);
  }
}

function GuardarReporteDiseno(reporte, html, estilos) {

  $.ajax({
    method: "POST",
    url: "Ajax/Aj_Parametros.php",
    data: {
      Requerimiento: "GuardarReporteDiseno",
      Reporte: reporte,
      HTML: html.replace(/"/g, "°"),
      Estilos: estilos.replace(/"/g, "°")
    },
    dataType: 'JSON',
  }).done(function (respuesta) {
    console.log(respuesta)
    if (respuesta[0] == true) {

      swal("Esculapio!", "Reporte Guardado.!", "success");

      return;
    }
    if (respuesta[0] == false) {
      swal("Esculapio!", "Ocurrio un error al guardar.", "error");
      return;
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  });

}

$("body").on('click', "#GuardarReporteDiseno", function (evt) {

  evt.preventDefault();  // evita que se envie el formulario

  var reporte = $('#cbmReporte').val();
  var estilos = $("iframe.cke_wysiwyg_frame").contents().find('head').html();
  var html = CKEDITOR.instances.editor.getData();
  if (reporte == 0) {
    swal("Esculapio!", "Seleccione un Reporte.", "warning");
    return;
  }
  if (html == "") {
    swal("Esculapio!", "El Reporte esta vacio", "warning");

    return;
  }

  swal({
    title: "Esculapio",
    text: "Seguro Que Desea Guardar?",
    icon: "info",
    buttons: true,
    dangerMode: false,
  })
    .then((confirma) => {
      if (confirma) {
        GuardarReporteDiseno(reporte, html, estilos);
      } else {
      }
    });
});


function CrearPdf(reporte, html, estilos) {

  $.ajax({
    method: "POST",
    url: "Ajax/Aj_Parametros.php",
    data: {
      Requerimiento: "CrearPdf",
      Reporte: reporte,
      HTML: html.replace(/"/g, "°"),
      Estilos: estilos.replace(/"/g, "°")
    },
    dataicon: 'JSON',
  }).done(function (respuesta) {
    console.log(respuesta)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  });

}

$("body").on('click', "#CrearPdf", function (evt) {

  evt.preventDefault();  // evita que se envie el formulario

  var reporte = $('#cbmReporte').val();
  var estilos = $("iframe.cke_wysiwyg_frame").contents().find('head').html();
  var html = CKEDITOR.instances.editor.getData();
  if (reporte == 0) {
    swal("QuickCont!", "Seleccione un Reporte.", "warning");
    return;
  }
  if (html == "") {
    swal("QuickCont!", "El Reporte esta vacio", "warning");
    return;
  }

  CrearPdf(reporte, html, estilos);
});

