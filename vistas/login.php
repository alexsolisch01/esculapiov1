<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Esculapio | Iniciar</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="css/main.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="css/blue.css">

  <!-- jQuery 3 -->
<script src="Lib/jquery4.3.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="Lib/bootstrap.min.js"></script>
<script src="Lib/sweetalert.min.js"></script>
<link rel="stylesheet" href="css/sweetalert-custom.css">
<script src="js/Js_Socket.js"></script>

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font 
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  <link href="css/TipoLetra.css?v=1.0" rel="stylesheet">-->
  <!--<style>
    /*.login-help a:hover {
      text-decoration: underline;
    }
    .form-group.has-feedback,
    .password-field {
      position: relative;
    }
    .form-group.has-feedback .form-control,
    .password-field .form-control {
      padding-right: 44px;
    }
    .form-group.has-feedback .form-control-feedback,
    .password-field .form-control-feedback {
      position: absolute;
      top: 50%;
      right: 12px;
      left: auto;
      transform: translateY(-50%);
      pointer-events: auto !important;
      z-index: 4;
      font-size: 18px;
      color: rgba(0,0,0,0.45);
      width: auto;
      height: auto;
      line-height: 1;
      padding: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
    }
    .password-field .form-control-feedback.glyphicon-eye-open,
    .password-field .form-control-feedback.glyphicon-eye-close {
      cursor: pointer;
    }
    .toggle-password:hover {
      color: rgba(0,0,0,0.75) !important;
    }
    .toggle-password:hover {
      color: rgba(0,0,0,0.75);
    }
    .login-box-msg {
      font-weight: 600;
    }
    @media (max-width: 768px) {
      body {
        background-attachment: scroll !important;
      }
      .login-box {
        margin: 3em auto !important;
        width: 90% !important;
      }
    }*/
  </style>-->
</head>
<body class="hold-transition login-page body" style="background-image: url('imagenes/Fondo1.png') ;background-repeat: no-repeat;  background-size: cover;
        background-attachment: fixed;
        background-position: center center;" >
<div class="login-box">
  <div class="login-logo">
    <a href="index.php" style="color: #1f0361"><b>ESCULAPIO</b></a>
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
          <!--<div class="checkbox icheck">
            <label>
              <input type="checkbox"> Recordarme
            </label>
          </div>-->
          <div class="login-help">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-6">
          <button type="submit" id="IniciarSesion" class="btn btn-primary btn-block btn-flat" href="" data-toggle="modal" data-target="#modal-default">Ingresar</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

    <?php
      //$ingreso = new Con_Usuario();
      //$ingreso -> InicioSesion();
    ?>

  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->


<!-- iCheck -->
<script src="Lib/icheck.min.js"></script>
<script src="js/Js_Login.js?v=1.0"></script>
<script>
  $(function () {
    //$('input').iCheck({
    //  checkboxClass: 'icheckbox_square-blue',
    //  radioClass: 'iradio_square-blue',
    //  increaseArea: '20%' /* optional */
    //});

    $(document).on('click', '.toggle-password', function () {
      var target = $($(this).data('target'));
      var type = target.attr('type') === 'password' ? 'text' : 'password';
      target.attr('type', type);
      $(this).toggleClass('glyphicon-eye-open glyphicon-eye-close');
      $(this).attr('title', type === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña');
    });

  });
</script>
</body>
</html>
