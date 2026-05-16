<div class="row">
  <div class="col-md-12">

    <div class="card">
      <div class="card-title">⚙️ Configuración General de la Empresa</div>
      <p>Aquí puedes configurar los detalles generales de tu empresa, incluyendo información básica, operativa y de correo electrónico.</p>
    </div>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js"></script>

  <form role="form" method="post" id="RegistroEmpresa">

  <div class="row">

  <!-- ================= MAIN ================= -->
  <div class="col-md-8">

    <!-- ===== EMPRESA ===== -->
    <div class="card">
      <div class="card-title">🏢 Información de la Empresa</div>

      <!-- LOGOS -->
      <!--<div class="row text-center">
        <div class="col-md-6">
          <label>Logo Principal</label>
          <div style="background:url(imagenes/user.png) center/cover; height:100px; border-radius:8px;" class="btn btn-default btn-file col-md-12">
            <input type="file" name="Logo1" id="Logo1">
          </div>
        </div>

        <div class="col-md-6">
          <label>Logo Reportería</label>
          <div style="background:url(imagenes/user.png) center/cover; height:100px; border-radius:8px;" class="btn btn-default btn-file col-md-12">
            <input type="file" name="Logo2" id="Logo2">
          </div>
        </div>
      </div>-->

      <div class="row">

        <!-- LOGO 1 -->
        <div class="col-md-6">
          <label>Logo Principal</label>

          <div class="logo-uploader" id="uploaderLogo1">
            <div class="logo-preview" id="previewLogo1"></div>

            <div class="logo-overlay">
              <span>Arrastrar o hacer clic</span>
            </div>
            
            <!--<div class="upload-loader">
              <div class="progress">
                <div class="progress-bar" id="progressLogo1"></div>
              </div>
            </div>-->

            <input type="file" id="Logo1" name="Logo1"
       accept=".jpg,.jpeg,.png,.svg,.bmp"
       class="input-file-hidden">
            <!--<input type="file" id="Logo1" name="Logo1" accept="image/*" class="input-file-hidden">-->
          </div>
        </div>

        <!-- LOGO 2 -->
        <div class="col-md-6">
          <label>Logo Reportería</label>

          <div class="logo-uploader" id="uploaderLogo2">
            <div class="logo-preview" id="previewLogo2"></div>

            <div class="logo-overlay">
              <span>Arrastrar o hacer clic</span>
            </div>

            <!--<div class="upload-loader">
              <div class="progress">
                <div class="progress-bar" id="progressLogo2"></div>
              </div>
            </div>-->
            <input type="file" id="Logo2" name="Logo2"
       accept=".jpg,.jpeg,.png,.svg,.bmp"
       class="input-file-hidden">
            <!--<input type="file" id="Logo2" name="Logo2" accept="image/*" class="input-file-hidden">-->
          </div>
        </div>

      </div>

      <div class="section-divider"></div>

      <div class="row">
        <div class="col-md-8">
          <label>Razón Social</label>
          <input type="text" class="form-control" id="Razon" name="razon">
        </div>

        <div class="col-md-4">
          <label>RUC</label>
          <input type="text" class="form-control" id="RucAdmi" name="rucAdmi">
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label>Representante Legal</label>
          <input type="text" class="form-control" id="RepreAdmin" name="repreAdmin">
        </div>

        <div class="col-md-6">
          <label>Actividad Comercial</label>
          <input type="text" class="form-control" id="Actividad" name="actividad">
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <label>Dirección</label>
          <input type="text" class="form-control" id="DireccionEmpre" name="DIRECCIÓNEmpre">
        </div>
      </div>
    </div>


    <!-- ===== OPERATIVO ===== -->
    <div class="card">
      <div class="card-title">⚙️ Información Operativa</div>

      <div class="row">
        <div class="col-md-4">
          <label>Tipo Personería</label>
          <select id="PersoneriaEmpre" name="personeria" class="form-control">
            <option value="0">Seleccionar..</option>
            <option value="N">NATURAL</option>
            <option value="J">JURIDICO</option>
          </select>
        </div>

        <div class="col-md-4">
          <label>Tipo Institución</label>
          <select id="Tipoinstitucion" name="licenciamiento" class="form-control">
            <option value="0">Seleccionar..</option>
            <?php
            $TipoServicio = new Con_Especialidad();
            $TipoServicio->LlenarComboTipoEstablecimiento2();
            ?>
          </select>
        </div>

        <div class="col-md-4">
          <label>Horario</label>
          <input type="text" class="form-control" id="HorarioEmpre">
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <label>Teléfono</label>
          <input type="text" class="form-control" id="TelefonoEmpre" name="TÉLEFONOEmpre">
        </div>
      </div>
    </div>

  </div>


  <!-- ================= SIDEBAR ================= -->
  <div class="col-md-4">

    <div class="card">
      <div class="card-title">📧 Configuración SMTP</div>

      <label>Host</label>
      <input type="text" class="form-control" id="hostSmtp">

      <label>Puerto</label>
      <input type="text" class="form-control" id="puertoSmtp">

      <label>SSL</label>
      <select id="cbmSmtpSecure" class="form-control">
        <option value="S">SI</option>
        <option value="N">NO</option>
      </select>

      <div class="section-divider"></div>

      <label>Correo Facturación</label>
      <input type="text" class="form-control" id="CorreoEmpre1">
      <div class="form-group password-field">
        <label>Contraseña Facturación</label>
        <input type="password" class="form-control" id="PsdCorreo1">
        <span class="glyphicon glyphicon-eye-open form-control-feedback toggle-password"
              data-target="#PsdCorreo1"
              title="Mostrar contraseña"></span>
      </div>

      <!--<label>Contraseña</label>
      <input type="password" class="form-control" id="PsdCorreo1">
      <span class="glyphicon glyphicon-eye-open toggle-password" data-target="#PsdCorreo1" title="Mostrar contraseña"></span>
      <button type="button" onclick="togglePass('PsdCorreo1')">👁</button>-->

      <label>Correo Resultados</label>
      <input type="text" class="form-control" id="CorreoEmpre2">

      <div class="form-group password-field">
        <label>Contraseña Resultados</label>
        <input type="password" class="form-control" id="PsdCorreo2">
        <span class="glyphicon glyphicon-eye-open form-control-feedback toggle-password"
              data-target="#PsdCorreo2"
              title="Mostrar contraseña"></span>
      </div>
      <!--<label>Contraseña</label>
      <input type="password" class="form-control" id="PsdCorreo2">
      <span class="glyphicon glyphicon-eye-open toggle-password" data-target="#PsdCorreo2" title="Mostrar contraseña"></span>
      <button type="button" onclick="togglePass('PsdCorreo2')">👁</button>-->
      
      <label>Correo Spam</label>
      <input type="text" class="form-control" id="CorreoEmpre3">

      <input type="hidden" id="PsdCorreo3" name="PsdCorreo3">
    </div>

  </div>

</div>


<!-- ===== ACTION BAR ===== -->
<div class="row">
  <div class="col-md-12 text-right" style="margin-top:10px;">

    <button type="button" id="CerrarEmpresa" class="btn btn-default">
      Cancelar
    </button>

    <button type="submit" id="ModificarEmpresa" class="btn btn-success">
      💾 Guardar Cambios
    </button>

  </div>

</div>
<script src="js/Js_Empresa.js?v=1.2"></script>
</form>
</div>
</div>