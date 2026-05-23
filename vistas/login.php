<?php if (!class_exists('Configuracion')) { include_once __DIR__ . '/../autoload.php'; } ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="csrf-token" content="<?php echo ValidacionSeguridad::generarCSRFToken(); ?>">
  <title><?php echo Configuracion::NOMBRE_APLICACION; ?> | Iniciar</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="css/main.css">
  <!-- Font Awesome 6 -->
  <link rel="stylesheet" href="css/font-awesome-6.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="css/blue.css">
  <!-- Favicon (multi-resolución) + Apple/Android touch icons -->
  <link rel="icon"             type="image/x-icon" href="favicon.ico">
  <link rel="icon"             type="image/png"    sizes="32x32"  href="favicon-32.png">
  <link rel="apple-touch-icon" sizes="180x180"     href="apple-touch-icon.png">
  <link rel="icon"             type="image/png"    sizes="192x192" href="android-chrome-192.png">
  
  <!-- jQuery 3 -->
  <!-- Nombre de la aplicación expuesto a JS desde Configuracion::NOMBRE_APLICACION. -->
  <script>var NOMBRE_APLICACION = <?php echo json_encode(Configuracion::NOMBRE_APLICACION); ?>;</script>
<script src="Lib/jquery4.3.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="Lib/bootstrap.min.js"></script>
<script src="Lib/sweetalert.min.js"></script>
<link rel="stylesheet" href="css/sweetalert-custom.css?v=2.1">
<script src="js/Js_Socket.js"></script>
</head>
<body class="hold-transition login-page body" style="background-image: url('imagenes/Fondo1.png') ;background-repeat: no-repeat;  background-size: cover;
        background-attachment: fixed;
        background-position: center center;" >
<div class="login-box">
  <div class="login-logo">
    <a href="index.php" title="<?php echo Configuracion::NOMBRE_APLICACION; ?>">
      <img src="imagenes/logo-esculapio.png" alt="<?php echo Configuracion::NOMBRE_APLICACION; ?>" style="max-width:240px; height:auto; display:block; margin:0 auto;">
    </a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg"><b>ACCEDER AL SISTEMA</b></p>

    <form action="#" method="post">
      <div class="form-group has-feedback">
        <input type="text" class="form-control" required name="Usuario" id="Usuario" placeholder="Usuario">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback password-field">
        <input type="password" class="form-control" required name="Pass" id="Pass" placeholder="Contraseña">
        <span class="glyphicon glyphicon-eye-open form-control-feedback toggle-password" data-target="#Pass" title="Mostrar contraseña"></span>
      </div>
      <div class="row">
        <div class="col-xs-6">
          <div class="login-help">
            <a href="#" id="ForgotPasswordLink">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-6">
          <button type="submit" id="IniciarSesion" class="btn btn-primary btn-block btn-flat" href="" data-toggle="modal" data-target="#modal-default">Ingresar</button>
        </div>
        <!-- /.col -->
      </div>
    </form>
  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->

<div class="modal fade" id="modalForgotPassword" tabindex="-1" role="dialog" aria-labelledby="forgotPasswordLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content" style="border-radius: 8px; border: none; box-shadow: 0 2px 12px rgba(0,0,0,0.3);">
      <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px 8px 0 0;">
        <h4 class="modal-title" id="forgotPasswordLabel" style="font-weight: 600; margin: 0;">
          <i class="fa-solid fa-key" style="margin-right: 8px;"></i>Recuperar contraseña
        </h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar" style="color: white; opacity: 0.8;"><span aria-hidden="true">&times;</span></button>
      </div>
      <form id="forgotPasswordForm">
        <div class="modal-body" style="padding: 20px;">
          <p style="color: #666; margin-bottom: 15px; font-size: 14px;">Ingresa tu usuario o correo registrado. Te enviaremos una contraseña temporal.</p>
          <div class="form-group">
            <label for="ForgotUsuario" style="font-weight: 500; color: #333;">Usuario o correo</label>
            <input type="text" class="form-control" id="ForgotUsuario" placeholder="Nombre de usuario o correo electrónico" required style="border-radius: 4px; border: 1px solid #ddd;">
          </div>
        </div>
        <div class="modal-footer" style="padding: 15px 20px; border-top: 1px solid #eee;">
          <button type="button" class="btn btn-default btn-flat" data-dismiss="modal" style="border-radius: 4px;">Cancelar</button>
          <button type="submit" class="btn btn-primary btn-flat" id="SubmitForgotPassword" style="border-radius: 4px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;">Enviar enlace</button>
          <span id="forgotLoading" style="display:none; margin-left:8px;">
            <i class="fa-solid fa-spinner fa-spin" aria-hidden="true" style="color: #667eea;"></i>
            <small class="text-muted" style="margin-left:6px;">Procesando...</small>
          </span>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}

/* Mejorar animación de loading */
#forgotLoading i.fa-spin {
  display: inline-block;
  animation: spin 1.5s linear infinite;
  -webkit-animation: spin 1.5s linear infinite;
  font-size: 16px;
}

/* Mejorar hover en link de olvido de contraseña */
#ForgotPasswordLink {
  color: #3c8dbc;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border-bottom: 1px dotted #3c8dbc;
}

#ForgotPasswordLink:hover {
  color: #2c6a8f;
  border-bottom: 1px solid #2c6a8f;
}
</style>

<script src="Lib/icheck.min.js"></script>
<script src="js/Js_Login.js?v=1.0"></script>
<script>
  $(function () {

    $(document).on('click', '.toggle-password', function () {
      var target = $($(this).data('target'));
      var type = target.attr('type') === 'password' ? 'text' : 'password';
      target.attr('type', type);
      $(this).toggleClass('glyphicon-eye-open glyphicon-eye-close');
      $(this).attr('title', type === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña');
    });

  });
</script>
<div class="login-footer" style="text-align:center; padding: 15px; margin-top: 20px; background: rgba(0,0,0,0.15); border-top: 2px solid rgba(255,255,255,0.2); border-radius: 8px;">
  <div style="font-size: 0.9rem; color: #fff; font-weight: 500; letter-spacing: 0.5px; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
    <i class="fa-solid fa-copyright" style="margin-right: 5px;"></i><strong><?php echo date('Y'); ?> <a href="<?php echo Configuracion::COPYRIGHT_URL; ?>" style="color: #fff; text-decoration: none; border-bottom: 1px solid #fff; transition: all 0.3s;" target="_blank"><?php echo Configuracion::COPYRIGHT_HOLDER; ?></a></strong>
  </div>
  <div style="font-size: 0.85rem; color: rgba(255,255,255,0.9); margin-top: 5px; letter-spacing: 0.3px;">
    <?php echo Configuracion::COPYRIGHT_NOTICE; ?>
  </div>
</div>
</body>
</html>