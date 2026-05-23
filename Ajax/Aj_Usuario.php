<?php
declare(strict_types=1);

ob_start();

require_once __DIR__ . '/../Configuraciones/SesionSegura.php';
session_start();

require_once "autoloadAjax.php";
require_once __DIR__ . "/../Configuraciones/ValidacionSeguridad.php";

header('Content-Type: application/json; charset=utf-8');

function generarHashSeguro(string $password): string
{
    $passwordEncriptada = Encriptacion::encriptar(
        $password,
        'CLAVE_ENCRIPTACION'
    );

    return password_hash(
        $passwordEncriptada,
        PASSWORD_BCRYPT
    );
}

function validarPasswordSegura(
    string $passwordIngresada,
    string $hashGuardado
): bool {

    $passwordEncriptada = Encriptacion::encriptar(
        $passwordIngresada,
        'CLAVE_ENCRIPTACION'
    );

	if (
        password_verify(
            $passwordEncriptada,
            $hashGuardado
        )
    ) {
        return true;
    }

    // COMPATIBILIDAD CON CONTRASEÑAS ANTIGUAS
    if (
        password_verify(
            $passwordIngresada,
            $hashGuardado
        )
    ) {
        return true;
    }

    return false;
}

/**
 * True si el hash corresponde al esquema "legacy" (sin capa de encriptación previa).
 * Implementación: el hash es legacy si verifica con la password en plano pero NO con
 * la versión encriptada. Se usa para detectar candidates a re-hash post-login.
 */
function esHashLegacy(string $passwordIngresada, string $hashGuardado): bool
{
    $passwordEncriptada = Encriptacion::encriptar($passwordIngresada, 'CLAVE_ENCRIPTACION');
    return password_verify($passwordIngresada, $hashGuardado)
        && !password_verify($passwordEncriptada, $hashGuardado);
}

function generarPasswordTemporalSegura(): string
{
    // 16 caracteres hex = 64 bits de entropía
    return strtoupper(
        bin2hex(random_bytes(8))
    );
}

/**
 * True si el usuario actual puede ejecutar el cambio sobre $usuarioIdObjetivo.
 *
 * Reglas:
 *  - El usuario puede cambiar su propia contraseña (Id == $_SESSION['id']).
 *  - El super admin puede cambiar la contraseña de cualquier usuario.
 *  - Hay una ventana de excepción "cambio_psd_autorizado" (5 min) que se
 *    setea en el login cuando el usuario entra con contraseña temporal:
 *    permite el primer ModificaContra sin sesión todavía iniciada.
 */
function puedeCambiarPasswordDe(int $usuarioIdObjetivo): bool
{
    if ($usuarioIdObjetivo <= 0) return false;

    // Caso 1: sesión activa, propio usuario
    if (isset($_SESSION['id']) && (int)$_SESSION['id'] === $usuarioIdObjetivo) {
        return true;
    }

    // Caso 2: super admin
    if (class_exists('Tenancy') && Tenancy::esSuperAdmin()) {
        return true;
    }

    // Caso 3: ventana de "primer cambio post-login-temporal"
    if (isset($_SESSION['cambio_psd_autorizado'])) {
        $aut = $_SESSION['cambio_psd_autorizado'];
        if (
            isset($aut['user_id'], $aut['expires']) &&
            (int)$aut['user_id'] === $usuarioIdObjetivo &&
            time() < (int)$aut['expires']
        ) {
            return true;
        }
    }

    return false;
}

/**
 * Reescribe la tabla puente usuario_perfil con la unión {default} ∪ extras.
 * - Borra los registros previos del usuario.
 * - Inserta el perfil por defecto + cada perfil extra (deduplicados por la UNIQUE).
 */
function sincronizarPerfilesUsuario(int $idUsuario, int $idPerfilDefault, array $perfilesExtra): void
{
    if ($idUsuario <= 0) return;

    $conexion = (new Conexion())->conectar();
    if ($conexion === null) return;

    // Limpia los perfiles actuales del usuario
    $del = $conexion->prepare("DELETE FROM usuario_perfil WHERE id_usuario = :u");
    $del->execute(array(':u' => $idUsuario));

    // Construye la lista única: default + extras
    $todos = array();
    if ($idPerfilDefault > 0) $todos[] = $idPerfilDefault;
    foreach ($perfilesExtra as $p) {
        $p = intval($p);
        if ($p > 0) $todos[] = $p;
    }
    $todos = array_values(array_unique($todos));

    if (empty($todos)) return;

    $ins = $conexion->prepare("INSERT IGNORE INTO usuario_perfil (id_usuario, id_perfil) VALUES (:u, :p)");
    foreach ($todos as $p) {
        $ins->execute(array(':u' => $idUsuario, ':p' => $p));
    }
}

if (isset($_POST['Requerimiento'])) {


	if ($_POST['Requerimiento'] == "ExisteSesion") {

		$dao = new Dao();

		$dao->Campo("s.id", "");
		$dao->Campo("s.id_usuario", "");
		$dao->Campo("u.psd", "");


		$dao->TablasInnerAlias("sesiones", "s", "usuario", "u");
		$dao->Where("u.usuario", "'" . $_POST["Usuario"] . "'", "and");
		$dao->Where("s.id_estado", '1', "");
		$dao->Limite("0,1");
		$respuesta = $dao->Consultar();
		$confirma = true;
		$id = 0;
		foreach (($respuesta ?? []) as $row => $item) {
			$passwordIngresada = (string)($_POST["Pass"] ?? '');

			//if (password_verify($_POST["Pass"], $item['psd']) && $_POST["Pass"] != '1234') {
			if (
					validarPasswordSegura(
						$passwordIngresada,
						$item['psd']
					)
				) 
			{
				$confirma = false;
				$id = $item[1];
			}
		}
		$jsondata = array();
		$jsondata[0] = $confirma;
		$jsondata[1] = $id;
		ob_clean();
		echo json_encode($jsondata);
		exit;
	}

	if ($_POST['Requerimiento'] == "IniciarSesion") {
		// Validar CSRF token
		if (empty($_POST['csrf_token']) || !ValidacionSeguridad::validarCSRFToken($_POST['csrf_token'])) {
			http_response_code(403);
			ob_clean();
			echo json_encode(['error' => 'Token inválido', 'code' => 403]);
			exit;
		}

		$ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

		// Whitelist de caracteres del username para prevenir SQL injection
		// (la clase Dao concatena el valor directamente al SQL).
		$usuarioInput = (string)($_POST["Usuario"] ?? '');
		if (!preg_match('/^[A-Za-z0-9._@\-]{1,80}$/', $usuarioInput)) {
			ob_clean();
			echo json_encode(array("UsuarioIncorrecto"));
			exit;
		}

		$dao = new Dao();

		$dao->Campo("u.id", "");
		$dao->Campo("u.usuario", "");
		$dao->Campo("u.psd", "");
		$dao->Campo("u.es_temporal", "");
		$dao->Campo("u.id_perfil", "");
		$dao->Campo("u.id_empleado", "");
		$dao->Campo("p.id_establecimiento", "");
		$dao->Campo("u.id_punto_venta", "");
		$dao->Campo("e.foto", "");
		$dao->Campo("pe.secuencia", "");
		$dao->Campo("es.id", "");
		$dao->Campo("p.secuencia_fc", "");
		$dao->Campo("p.impresora", "");
		$dao->Campo("CONCAT(e.apellidos,' ',e.nombres) nombresEmple", "");
		$dao->Campo("e.id", "");
		$dao->Campo("es.nombre_comercial", "");
		$dao->Campo("p.descuento", "");
		$dao->Campo("p.secuencia_nc", "");

		// Datos básicos que SIGUEN en `empresa`. El resto (logo, direccion, telefono,
		// horario, SMTP, correos) vive ahora en empresa_contacto / empresa_branding /
		// empresa_smtp / empresa_correo y se carga vía Tenancy::sincronizarDatosEmpresaActiva()
		// que se llama más abajo.
		$dao->Campo("ep.razon_social", "");
		$dao->Campo("ep.ruc", "");

		$dao->Campo("e.firma", "");
		$dao->Campo("e.cedula", "");

		// Multi-tenant: id real de la empresa + flag super admin del perfil
		$dao->Campo("ep.id", "id_empresa_real");
		// FASE 8: el super admin se deriva del ámbito del rol del perfil.
		$dao->Campo("(SELECT r.ambito FROM rol r WHERE r.id = prf.id_rol)", "ambito_rol");

		$dao->TablasInnerAlias("usuario", "u", "punto_venta", "p");
		$dao->TablasInnerAlias("usuario", "u", "empleado", "e");
		$dao->TablasInnerAlias("usuario", "u", "perfil", "prf");
		$dao->TablasInnerAlias("punto_venta", "p", "punto_emision", "pe");
		$dao->TablasInnerAlias("punto_venta", "p", "establecimiento", "es");
		$dao->TablasInnerAlias("establecimiento", "es", "empresa", "ep");
		$dao->Where("u.id_estado", "1", "and");
		$dao->Where("u.usuario", "'" . $usuarioInput . "'", "");

		$respuesta = $dao->Consultar();
		$jsondata = array();
		$jsondata[0] = "UsuarioIncorrecto";
		
		foreach (($respuesta ?? []) as $row => $item) {
			$usuarioId = $item[0];

			// 1. Verificar si usuario está bloqueado
			if (ValidacionSeguridad::estaBloqueado($usuarioId)) {
				ValidacionSeguridad::registrarIntentoFallido($usuarioId, $ip);
				$jsondata[0] = "UsuarioBloqueado";
				$jsondata[1] = "Usuario bloqueado por exceso de intentos. Intente en 15 minutos.";
				echo json_encode($jsondata);
				exit;
			}

			$passwordIngresada = (string)($_POST["Pass"] ?? '');

			// 1. Contraseña inválida → registrar fallo y salir
			if (!validarPasswordSegura($passwordIngresada, $item['psd'])) {
				ValidacionSeguridad::registrarIntentoFallido($usuarioId, $ip);
				$jsondata[0] = "PsdIncorrecta";
				continue;
			}

			// 2. Contraseña temporal → exigir cambio antes de entrar
			if ($item['es_temporal'] == 1) {
				if (ValidacionSeguridad::hasExpiradoTemporal($usuarioId)) {
					ValidacionSeguridad::registrarIntentoFallido($usuarioId, $ip);
					$jsondata[0] = "ContraseñaTemporalExpirada";
					$jsondata[1] = "La contraseña temporal ha expirado. Solicite una nueva.";
					ob_clean();
					echo json_encode($jsondata);
					exit;
				}

				ValidacionSeguridad::registrarIntentoExitoso($usuarioId, $ip);

				// Habilitar el cambio de contraseña inmediato (ventana de 5 min)
				// sin necesidad de tener una sesión iniciada todavía.
				$_SESSION['cambio_psd_autorizado'] = array(
					'user_id' => (int)$usuarioId,
					'expires' => time() + 300
				);

				$jsondata[0] = "NuevoUsuario";
				$jsondata[1] = $usuarioId;
				continue;
			}

			// 3. Re-hash silencioso si el hash era legacy (sin capa de Encriptacion)
			if (esHashLegacy($passwordIngresada, $item['psd'])) {
				$reHash = generarHashSeguro($passwordIngresada);
				$daoRe  = new Dao();
				$daoRe->Modificar(
					"usuario",
					array("psd" => $reHash),
					"id=" . (int)$usuarioId,
					(int)$usuarioId
				);
				$item['psd'] = $reHash;
			}

			// 4. Login normal
			{
				// Prevención de session fixation: nuevo ID de sesión al autenticar.
				session_regenerate_id(true);
				ValidacionSeguridad::registrarIntentoExitoso($usuarioId, $ip);
						$_SESSION["QUICKCONT_INTEGRADO_A_QUICKCONT"] = "NO";
						$_SESSION["impresora"] = $item[11];
						$_SESSION["validar"] = true;
						$_SESSION["usuario"] = $item["usuario"];
						$_SESSION["id"] = $item[0];
						$_SESSION["foto"] = Repositorio::urlPublica($item["foto"]);
						$_SESSION["firma"] = $item["firma"];
						$_SESSION["perfil"] = $item["id_perfil"];
						$_SESSION["empleado"] = $item["id_empleado"];
						$_SESSION["establecimiento"] = str_pad((string)$item[9],  3, "0", STR_PAD_LEFT);
						$_SESSION["puntoVenta"] = $item["id_punto_venta"];
						$_SESSION["puntoEmision"] = $item["secuencia"];
						$_SESSION["secuencia_fc"] = str_pad((string)$item[10],  9, "0", STR_PAD_LEFT);
						$_SESSION["secuencia_nc"] = str_pad((string)$item[16],  9, "0", STR_PAD_LEFT);
						$_SESSION["cedula"] = $item["cedula"];

						$_SESSION["nombres"] = $item[12];
						$_SESSION["id_empleado"] = $item[13];
						$_SESSION["nombreComercial"] = $item[14];
						$_SESSION["descuento"] = $item[15];
						$_SESSION["puntoVentaSecuencia"] = $item[8];

						// Los campos derivados de empresa (razon_social, ruc, direccion, logo,
						// SMTP, correos, etc.) ya no se asignan acá. Los rellena
						// Tenancy::sincronizarDatosEmpresaActiva() más abajo, que lee de
						// empresa + empresa_contacto + empresa_branding + empresa_correo + empresa_smtp.

						// Multi-tenant
						$_SESSION["id_empresa"]      = $item["id_empresa_real"];
						$_SESSION["es_super_admin"]  = (($item["ambito_rol"] ?? '') === 'GLOBAL') ? 1 : 0;

						// empresa_activa siempre debe ser una empresa concreta:
						//  - Usuario normal: su propia empresa.
						//  - Super admin: la primera empresa activa de la BD por defecto.
						if ($_SESSION["es_super_admin"] === 1) {
							$_SESSION["empresa_activa"] = Tenancy::primeraEmpresaActiva();
							if ($_SESSION["empresa_activa"] <= 0) {
								// No hay empresas en BD; fallback a la del usuario para no quedar en 0
								$_SESSION["empresa_activa"] = (int)$item["id_empresa_real"];
							}
						} else {
							$_SESSION["empresa_activa"] = (int)$item["id_empresa_real"];
						}

						// Sobrescribe los datos de empresa en sesión con los de empresa_activa
						// (relevante sobre todo para super admin cuya empresa_activa puede ≠ id_empresa_real).
						Tenancy::sincronizarDatosEmpresaActiva();

						/* Perfiles disponibles del usuario (relación M:N usuario_perfil).
						 * Si no hay registros en usuario_perfil (legacy), fallback al perfil único de usuario.id_perfil. */
						$daoPerf = new Dao();
						$daoPerf->Campo("p.id", "");
						$daoPerf->Campo("p.nombre", "");
						$daoPerf->Campo("(SELECT r.ambito FROM rol r WHERE r.id = p.id_rol)", "ambito_rol");
						$daoPerf->TablasInnerAlias("usuario_perfil", "up", "perfil", "p");
						$daoPerf->Where("up.id_usuario", $usuarioId, "");
						$daoPerf->Ordenar("p.nombre ASC");
						$perfilesRows = $daoPerf->Consultar();

						$perfilesDisponibles = array();
						foreach (($perfilesRows ?? []) as $pr) {
							$perfilesDisponibles[] = array(
								"id"             => (int)$pr["id"],
								"nombre"         => $pr["nombre"],
								"es_super_admin" => (($pr["ambito_rol"] ?? '') === 'GLOBAL') ? 1 : 0
							);
						}

						if (empty($perfilesDisponibles)) {
							// Fallback legacy: usuario.id_perfil único
							$daoPerf2 = new Dao();
							$daoPerf2->Campo("id", "");
							$daoPerf2->Campo("nombre", "");
							$daoPerf2->Campo("(SELECT r.ambito FROM rol r WHERE r.id = perfil.id_rol)", "ambito_rol");
							$daoPerf2->Tabla("perfil", "");
							$daoPerf2->Where("id", (int)$item["id_perfil"], "");
							$fallback = $daoPerf2->Consultar();
							if (!empty($fallback)) {
								$perfilesDisponibles[] = array(
									"id"             => (int)$fallback[0]["id"],
									"nombre"         => $fallback[0]["nombre"],
									"es_super_admin" => (($fallback[0]["ambito_rol"] ?? '') === 'GLOBAL') ? 1 : 0
								);
							}
						}

						$_SESSION["perfiles_disponibles"] = $perfilesDisponibles;

						$dao = new Dao();

						$dao->Campo("id", "");
						$dao->Campo("parametro", "");
						$dao->Campo("descripcion", "");
						$dao->Campo("valor", "");
						$dao->Campo("usuario_modifico", "");
						$dao->Campo("fecha_modifico", "");

						$dao->Tabla("parametros", "");

						$respuesta = $dao->Consultar();

						$_SESSION["CHEQUES"] = "0";
						$_SESSION["TRANSFERENCIAS"] = "0";
						$_SESSION["TARJETA"] = "0";
						$_SESSION["CREDITO"] = "0";

						foreach (($respuesta ?? []) as $row => $item) {
							if ($item[0] == 1 && $item[3] == 1) {
								$_SESSION["FcElentronica"] = "Online";
							}
							if ($item[0] == 3 && $item[3] == 1) {
								$_SESSION["FcElentronica"] = "Manual";
							}

							if ($item[0] == 5 && $item[3] == 1) {
								$_SESSION["FcElentronica"] = "2";
							}
							if ($item[0] == 6 && $item[3] == 1) {
								$_SESSION["FcElentronica"] = "4";
							}
							if ($item[0] == 7 && $item[3] == 1) {
								$_SESSION["FcElentronica"] = "6";
							}
							if ($item[0] == 8) {
								$_SESSION["FcCorreos"] = $item[3];
							}

							if ($item[0] == 10 && $item[3] == 1) {
								$_SESSION["CHEQUES"] = "1";
							}
							if ($item[0] == 11 && $item[3] == 1) {
								$_SESSION["TRANSFERENCIAS"] = "1";
							}
							if ($item[0] == 12 && $item[3] == 1) {
								$_SESSION["TARJETA"] = "1";
							}
							if ($item[0] == 13 && $item[3] == 1) {
								$_SESSION["CREDITO"] = "1";
							}

							if ($item[0] >= 14 && $item[0] < 22 || $item[0]==23) {
								$_SESSION["QUICKCONT_".$item[1]] = $item[3];
							}
							if ($item[0] == 22 && $item[3] == 1) {
								$_SESSION["INVENTARIOSINSTOCK"] = "1";
							}
							if ($item[0] == 24) {
								$_SESSION["HABILITARDESCUENTOPREDEFINIDO"] = $item[3];
							}
						}
						$jsondata[0] = "UsuarioNormal";
			}
		}
		ob_clean();
		echo json_encode($jsondata);
		exit;
	}
	if ($_POST['Requerimiento'] == "CerrarSesion") {

		if (isset($_SESSION['usuario'])) {
			if ($_SESSION['usuario'] == $_POST['Usuario']) {
			}
		}
		$jsondata = array();
		$jsondata[0] = true;
		ob_clean();
		echo json_encode($jsondata);
		exit;
	}

	/* =========================================================
	 * CAMBIAR PERFIL ACTIVO (combo header)
	 * - Valida que el usuario tenga ese perfil asignado.
	 * - Actualiza $_SESSION["perfil"] y $_SESSION["es_super_admin"].
	 * - Si el nuevo perfil NO es super admin, limpia empresa_activa.
	 * ========================================================= */

	if ($_POST['Requerimiento'] == "CambiarPerfilActivo") {

		if (!isset($_SESSION["id"])) {
			ob_clean();
			echo json_encode(array(false, "Sin sesión activa"));
			exit;
		}

		$idPerfilNuevo = intval($_POST["IdPerfil"] ?? 0);

		if (!Tenancy::tienePerfil($idPerfilNuevo)) {
			ob_clean();
			echo json_encode(array(false, "Perfil no autorizado para este usuario"));
			exit;
		}

		// FASE 8: el flag se deriva del ámbito del rol del perfil destino.
		$dao = new Dao();
		$dao->Campo("id", "");
		$dao->Campo("(SELECT r.ambito FROM rol r WHERE r.id = perfil.id_rol)", "ambito_rol");
		$dao->Tabla("perfil", "");
		$dao->Where("id", $idPerfilNuevo, "");
		$rows = $dao->Consultar();

		if (empty($rows)) {
			ob_clean();
			echo json_encode(array(false, "Perfil inexistente"));
			exit;
		}

		$_SESSION["perfil"]         = (int)$rows[0]["id"];
		$_SESSION["es_super_admin"] = (($rows[0]["ambito_rol"] ?? '') === 'GLOBAL') ? 1 : 0;

		// empresa_activa siempre debe apuntar a una empresa concreta.
		//  - Si el nuevo perfil NO es super admin, forzar a la empresa propia del usuario.
		//  - Si SÍ es super admin y no había empresa_activa, usar la primera activa.
		if ((int)$_SESSION["es_super_admin"] !== 1) {
			$_SESSION["empresa_activa"] = (int)($_SESSION["id_empresa"] ?? 0);
		} elseif (empty($_SESSION["empresa_activa"])) {
			$primera = Tenancy::primeraEmpresaActiva();
			$_SESSION["empresa_activa"] = $primera > 0 ? $primera : (int)($_SESSION["id_empresa"] ?? 0);
		}

		// Refresca razón social y demás datos derivados con la empresa activa resultante
		Tenancy::sincronizarDatosEmpresaActiva();

		ob_clean();
		echo json_encode(array(true));
		exit;
	}

	/* =========================================================
	 * CAMBIAR EMPRESA ACTIVA (solo super admin)
	 * IdEmpresa = 0 → ver todas las empresas (sin filtro)
	 * ========================================================= */

	if ($_POST['Requerimiento'] == "CambiarEmpresaActiva") {

		if (!Tenancy::esSuperAdmin()) {
			ob_clean();
			echo json_encode(array(false, "Solo super admin puede cambiar de empresa"));
			exit;
		}

		$idEmpresa = intval($_POST["IdEmpresa"] ?? 0);

		// Debe ser una empresa concreta (ya no se permite "Todas" = 0).
		if ($idEmpresa <= 0) {
			ob_clean();
			echo json_encode(array(false, "Debe seleccionar una empresa"));
			exit;
		}

		$dao = new Dao();
		$dao->Campo("id", "");
		$dao->Tabla("empresa", "");
		$dao->Where("id", $idEmpresa, "and");
		$dao->Where("id_estado", "1", "");
		if (empty($dao->Consultar())) {
			ob_clean();
			echo json_encode(array(false, "Empresa inválida o inactiva"));
			exit;
		}

		$_SESSION["empresa_activa"] = $idEmpresa;

		// Refresca razón social, dirección, logo, RUC, SMTP, etc. con la nueva empresa
		Tenancy::sincronizarDatosEmpresaActiva();

		ob_clean();
		echo json_encode(array(true));
		exit;
	}
	if ($_POST['Requerimiento'] == "GuardarUsuario") {

		$passwordTemporal = generarPasswordTemporalSegura();
		$passHash         = generarHashSeguro($passwordTemporal);

		$idPerfilDefault  = intval($_POST["Perfil"]);
		$perfilesExtra    = isset($_POST["PerfilesExtra"]) && is_array($_POST["PerfilesExtra"])
			? array_map('intval', $_POST["PerfilesExtra"])
			: array();

		$datos = array(
			"usuario"               => $_POST["Usuario"],
			"psd"                   => $passHash,
			"id_empleado"           => $_POST["Empleado"],
			"id_perfil"             => $idPerfilDefault,
			"id_estado"             => 1,
			"id_punto_venta"        => $_POST["Punto"],
			"es_temporal"           => 1,
			"fecha_temporal_expira" => date('Y-m-d H:i:s', strtotime('+1 day')),
			"usuario_creacion"      => (int)($_SESSION["id"] ?? 0)
		);

		$dao = new Dao();
		$resp = $dao->Guardar("usuario", $datos);

		ob_clean();

		if (!isset($resp[0]) || $resp[0] !== true) {
			echo json_encode(array(
				"success" => false,
				"mensaje" => "No se pudo crear el usuario"
			));
			exit;
		}

		$nuevoUsuarioId = intval($resp[1]);
		sincronizarPerfilesUsuario($nuevoUsuarioId, $idPerfilDefault, $perfilesExtra);

		echo json_encode(array(
			"success"           => true,
			"password_temporal" => $passwordTemporal
		));
		exit;
	}

	if ($_POST['Requerimiento'] == "ModificarUsuario") {

		$idUsuario       = intval($_POST['Id']);
		$idPerfilDefault = intval($_POST["Perfil"]);
		$perfilesExtra   = isset($_POST["PerfilesExtra"]) && is_array($_POST["PerfilesExtra"])
			? array_map('intval', $_POST["PerfilesExtra"])
			: array();

		$datos = array(
			"id_perfil"      => $idPerfilDefault,
			"usuario"        => $_POST["Usuario"],
			"id_punto_venta" => $_POST["Punto"],
			"usuario_modifica" => (int)($_SESSION["id"] ?? 0)
		);

		$dao = new Dao();
		$resp = $dao->Modificar("usuario", $datos, "id=".$idUsuario, $idUsuario);

		ob_clean();

		if (!isset($resp[0]) || $resp[0] !== true) {
			echo json_encode(array(false, "No se pudo modificar el usuario"));
			exit;
		}

		sincronizarPerfilesUsuario($idUsuario, $idPerfilDefault, $perfilesExtra);

		echo json_encode(array(true));
		exit;
	}

	/* =========================================================
	 * CONSULTAR PERFILES DEL USUARIO (para llenar el multi-select en edición)
	 * Devuelve [true, {id_perfil_default, perfiles_extra: [int,...]}] o [false]
	 * ========================================================= */

	if ($_POST['Requerimiento'] == "ConsultarPerfilesUsuario") {

		$idUsuario = intval($_POST['Id']);
		if ($idUsuario <= 0) {
			ob_clean();
			echo json_encode(array(false, "Id inválido"));
			exit;
		}

		$dao1 = new Dao();
		$dao1->Campo("id_perfil", "");
		$dao1->Tabla("usuario", "");
		$dao1->Where("id", $idUsuario, "");
		$u = $dao1->Consultar();
		if (empty($u)) {
			ob_clean();
			echo json_encode(array(false, "Usuario no encontrado"));
			exit;
		}
		$idDefault = (int)$u[0]['id_perfil'];

		$dao2 = new Dao();
		$dao2->Campo("id_perfil", "");
		$dao2->Tabla("usuario_perfil", "");
		$dao2->Where("id_usuario", $idUsuario, "");
		$rows = $dao2->Consultar();

		$extras = array();
		foreach (($rows ?? []) as $r) {
			$pid = (int)$r['id_perfil'];
			if ($pid !== $idDefault) $extras[] = $pid;
		}

		ob_clean();
		echo json_encode(array(
			true,
			array(
				"id_perfil_default" => $idDefault,
				"perfiles_extra"    => $extras
			)
		));
		exit;
	}

	if ($_POST['Requerimiento'] == "EliminarUsuario") {
		$dao = new Dao();
		$dao->EliminarAjax("usuario", $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "GrabarContraseña") {

		// 1. CSRF
		if (empty($_POST['csrf_token']) || !ValidacionSeguridad::validarCSRFToken($_POST['csrf_token'])) {
			http_response_code(403);
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Token inválido'));
			exit;
		}

		$usuarioId     = (int)($_POST['Id'] ?? 0);
		$nuevaPassword = (string)($_POST["Password"] ?? '');

		if ($usuarioId <= 0 || $nuevaPassword === '') {
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Datos incompletos'));
			exit;
		}

		// 2. Autorización (propio usuario, super admin o ventana temporal)
		if (!puedeCambiarPasswordDe($usuarioId)) {
			http_response_code(403);
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Sin permisos para cambiar esta contraseña'));
			exit;
		}

		// 3. Fortaleza
		$validacion = ValidacionSeguridad::validarContrasena($nuevaPassword);
		if (!$validacion['valido']) {
			ob_clean();
			echo json_encode(array('valido' => false, 'errores' => $validacion['errores']));
			exit;
		}

		// 4. No reutilización
		if (ValidacionSeguridad::esContraseñaReutilizada($usuarioId, $nuevaPassword)) {
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'No puede usar una contraseña anterior. Elija una diferente.'));
			exit;
		}

		// 5. Hash anterior para historial
		$dao_get = new Dao();
		$dao_get->Campo("psd", "");
		$dao_get->Tabla("usuario", "");
		$dao_get->Where("id", $usuarioId, "");
		$respuesta = $dao_get->Consultar();

		if (empty($respuesta)) {
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Usuario no encontrado'));
			exit;
		}
		$psd_anterior = $respuesta[0]['psd'] ?? '';

		$razon = (isset($_SESSION['id']) && (int)$_SESSION['id'] !== $usuarioId)
			? 'cambio_admin'
			: 'cambio_usuario';

		ValidacionSeguridad::registrarCambioContrasena($usuarioId, $psd_anterior, $razon);

		// 6. Update
		$passHash = generarHashSeguro($nuevaPassword);
		$datos = array(
			"psd"                   => $passHash,
			"es_temporal"           => 0,
			"fecha_temporal_expira" => NULL,
			"ultimo_cambio_psd"     => date('Y-m-d H:i:s'),
			"intentos_fallidos"     => 0
		);

		$dao = new Dao();
		$dao->Modificar("usuario", $datos, "id=" . $usuarioId, $usuarioId);

		ob_clean();
		echo json_encode(array('valido' => true, 'mensaje' => 'Contraseña actualizada correctamente'));
		exit;
	}

	if ($_POST['Requerimiento'] == "CargarMenu") {

		$dao = new Dao();

		$dao->Campo("pp.id_pantalla", "");

		$dao->TablasInnerAlias("perfil_pantalla", "pp", "pantalla", "p");
		$dao->Where("p.id_estado", "1", "and");
		$dao->Where("pp.id_perfil", $_SESSION["perfil"], "");


		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "ModificaContra") {

		// 1. CSRF
		if (empty($_POST['csrf_token']) || !ValidacionSeguridad::validarCSRFToken($_POST['csrf_token'])) {
			http_response_code(403);
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Token inválido'));
			exit;
		}

		$usuarioId     = (int)($_POST['Id'] ?? 0);
		$nuevaPassword = (string)($_POST["Segundo"] ?? '');

		// 2. Autorización: el Id solicitado debe coincidir con el usuario en sesión
		//    o con la ventana de "primer cambio post-login-temporal".
		if (!puedeCambiarPasswordDe($usuarioId)) {
			http_response_code(403);
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Sin permisos para cambiar esta contraseña'));
			exit;
		}

		// 3. Fortaleza
		$validacion = ValidacionSeguridad::validarContrasena($nuevaPassword);
		if (!$validacion['valido']) {
			ob_clean();
			echo json_encode(array('valido' => false, 'errores' => $validacion['errores']));
			exit;
		}

		// 4. No reutilización
		if (ValidacionSeguridad::esContraseñaReutilizada($usuarioId, $nuevaPassword)) {
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'No puede usar una contraseña anterior. Elija una diferente.'));
			exit;
		}

		// 5. Hash anterior para historial
		$dao_get = new Dao();
		$dao_get->Campo("psd", "");
		$dao_get->Tabla("usuario", "");
		$dao_get->Where("id", $usuarioId, "");
		$respuesta    = $dao_get->Consultar();
		$psd_anterior = $respuesta[0]['psd'] ?? '';

		ValidacionSeguridad::registrarCambioContrasena($usuarioId, $psd_anterior, 'cambio_usuario');

		// 6. Update
		$passHash = generarHashSeguro($nuevaPassword);
		$datos = array(
			"psd"                   => $passHash,
			"es_temporal"           => 0,
			"fecha_temporal_expira" => NULL,
			"ultimo_cambio_psd"     => date('Y-m-d H:i:s'),
			"intentos_fallidos"     => 0
		);

		$dao = new Dao();
		$resultado = $dao->Modificar("usuario", $datos, "id=" . $usuarioId, $usuarioId);

		if (!isset($resultado[0]) || $resultado[0] !== true) {
			error_log('[Aj_Usuario][ModificaContra] Error al actualizar contraseña para user_id=' . $usuarioId . ': ' . ($resultado[1] ?? 'sin detalles'));
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Error al guardar la contraseña. Intente de nuevo.'));
			exit;
		}

		// 7. Consumir la ventana de cambio temporal si se usó
		unset($_SESSION['cambio_psd_autorizado']);

		ob_clean();
		echo json_encode(array('valido' => true, 'mensaje' => 'Contraseña actualizada correctamente'));
		exit;
	}

	if ($_POST['Requerimiento'] == "Resetear") {

		// 1. CSRF
		if (empty($_POST['csrf_token']) || !ValidacionSeguridad::validarCSRFToken($_POST['csrf_token'])) {
			http_response_code(403);
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Token inválido'));
			exit;
		}

		// 2. Autorización: solo super admin puede resetear contraseñas
		if (!class_exists('Tenancy') || !Tenancy::esSuperAdmin()) {
			http_response_code(403);
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Solo el super admin puede resetear contraseñas'));
			exit;
		}

		$usuarioId = (int)($_POST['Id'] ?? 0);
		if ($usuarioId <= 0) {
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Id inválido'));
			exit;
		}

		$passwordTemporal = generarPasswordTemporalSegura();
		$passHash         = generarHashSeguro($passwordTemporal);

		// Capturar hash anterior para historial
		$dao_get = new Dao();
		$dao_get->Campo("psd", "");
		$dao_get->Tabla("usuario", "");
		$dao_get->Where("id", $usuarioId, "");
		$prev = $dao_get->Consultar();
		if (empty($prev)) {
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Usuario no encontrado'));
			exit;
		}
		$psd_anterior = $prev[0]['psd'] ?? '';

		$datos = array(
			"psd"                   => $passHash,
			"es_temporal"           => 1,
			"fecha_temporal_expira" => date('Y-m-d H:i:s', strtotime('+1 day'))
		);

		$dao = new Dao();
		$dao->Modificar("usuario", $datos, "id=" . $usuarioId, $usuarioId);

		ValidacionSeguridad::registrarCambioContrasena($usuarioId, $psd_anterior, 'reset_admin');

		ob_clean();
		echo json_encode(array(
			'valido'            => true,
			'mensaje'           => 'Contraseña temporal generada',
			'password_temporal' => $passwordTemporal
		));
		exit;
	}

	if ($_POST['Requerimiento'] == "OlvidoContrasena") {

		/* ============================================================
		 * Política:
		 *  - CSRF obligatorio.
		 *  - Rate limit por IP (5 intentos / 15 min).
		 *  - Respuesta uniforme (anti-enumeración): siempre el mismo
		 *    mensaje para "usuario inexistente", "sin email", "enviado".
		 *  - El UPDATE de la contraseña se hace SOLO si el correo se envió.
		 * ============================================================ */

		// 1. CSRF
		if (empty($_POST['csrf_token']) || !ValidacionSeguridad::validarCSRFToken($_POST['csrf_token'])) {
			http_response_code(403);
			ob_clean();
			echo json_encode(array('valido' => false, 'mensaje' => 'Token inválido'));
			exit;
		}

		// 2. Rate limit
		$ipCliente = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
		if (!ValidacionSeguridad::rateLimitOlvido($ipCliente)) {
			ob_clean();
			echo json_encode(array(
				'valido'  => false,
				'mensaje' => 'Demasiadas solicitudes. Intente nuevamente en unos minutos.'
			));
			exit;
		}

		// Mensaje uniforme para no enumerar usuarios
		$mensajeUniforme = 'Si la cuenta existe y tiene correo asociado, recibirá una contraseña temporal en breve.';

		$buscar = trim((string)($_POST['Usuario'] ?? ''));
		if ($buscar === '') {
			ob_clean();
			echo json_encode(array('valido' => true, 'mensaje' => $mensajeUniforme));
			exit;
		}

		// 3. Búsqueda con prepared statement (sin SQL injection)
		$conexion = (new Conexion())->conectar();
		$esEmail  = filter_var($buscar, FILTER_VALIDATE_EMAIL) !== false;

		$sql = $esEmail
			? "SELECT u.id, u.usuario, u.psd, e.email,
					CONCAT(e.apellidos,' ',e.nombres) nombresEmpleado
				FROM usuario u
				INNER JOIN empleado e ON e.id = u.id_empleado
				WHERE u.id_estado = 1 AND e.email = :buscar
				LIMIT 1"
			: "SELECT u.id, u.usuario, u.psd, e.email,
					CONCAT(e.apellidos,' ',e.nombres) nombresEmpleado
				FROM usuario u
				INNER JOIN empleado e ON e.id = u.id_empleado
				WHERE u.id_estado = 1 AND u.usuario = :buscar
				LIMIT 1";

		$stmt = $conexion->prepare($sql);
		$stmt->execute(array(':buscar' => $buscar));
		$item = $stmt->fetch(PDO::FETCH_ASSOC);

		// 4. Usuario no encontrado o sin email → responder uniforme (no revelar)
		if (empty($item) || empty($item['email'])) {
			error_log('[Aj_Usuario][OlvidoContrasena] sin match para "' . $buscar . '" desde IP ' . $ipCliente);
			ob_clean();
			echo json_encode(array('valido' => true, 'mensaje' => $mensajeUniforme));
			exit;
		}

		$usuarioId       = (int)$item['id'];
		$psdAnterior     = (string)$item['psd'];
		$temporaryPass   = generarPasswordTemporalSegura();
		$hashTemporal    = generarHashSeguro($temporaryPass);

		// 5. Preparar PHPMailer ANTES de tocar la BD
		$autoloadPath = __DIR__ . "/../mail/vendor/autoload.php";
		if (!file_exists($autoloadPath)) {
			error_log('[Aj_Usuario][OlvidoContrasena] autoload PHPMailer no encontrado: ' . $autoloadPath);
			ob_clean();
			// No revelamos el detalle al usuario; respondemos uniforme
			echo json_encode(array('valido' => true, 'mensaje' => $mensajeUniforme));
			exit;
		}
		require_once $autoloadPath;
		if (!class_exists(\PHPMailer\PHPMailer\PHPMailer::class)) {
			error_log('[Aj_Usuario][OlvidoContrasena] PHPMailer no disponible');
			ob_clean();
			echo json_encode(array('valido' => true, 'mensaje' => $mensajeUniforme));
			exit;
		}

		// 6. Intentar enviar el correo PRIMERO
		$subject = "Recuperación de contraseña - " . Configuracion::NOMBRE_APLICACION;
		$message = "Hola " . $item['nombresEmpleado'] . ",\n\n"
		         . "Se ha generado una contraseña temporal para su usuario: " . $item['usuario'] . ".\n"
		         . "Contraseña temporal: " . $temporaryPass . "\n\n"
		         . "Por favor ingrese al sistema y cambie su contraseña de inmediato.\n\n"
		         . "Si no solicitó esta recuperación, contacte al administrador.\n";

		$mailerSent = false;
		try {
			$mail = new PHPMailer\PHPMailer\PHPMailer(true);
			$mail->isSMTP();
			$mail->SMTPAuth   = true;
			$mail->Host       = Encriptacion::desencriptar(Configuracion::SMTP_HOST);
			$mail->Username   = Encriptacion::desencriptar(Configuracion::SMTP_USER);
			$mail->Password   = Encriptacion::desencriptar(Configuracion::SMTP_PASSWORD);
			$mail->SMTPSecure = Configuracion::SMTP_SECURE;
			$mail->Port       = Encriptacion::desencriptar(Configuracion::SMTP_PORT);
			$mail->CharSet    = 'UTF-8';
			$mail->setFrom(Encriptacion::desencriptar(Configuracion::SMTP_FROM_EMAIL), Configuracion::SMTP_FROM_NAME);
			$mail->addAddress($item['email']);
			$mail->isHTML(false);
			$mail->Subject = $subject;
			$mail->Body    = $message;
			$mailerSent    = $mail->send();
		} catch (\Throwable $e) {
			error_log('[Aj_Usuario][OlvidoContrasena] SMTP error: ' . $e->getMessage());
		}

		if (!$mailerSent) {
			// NO actualizamos la contraseña si no se pudo enviar el correo:
			// la sesión del usuario sigue siendo válida y no queda bloqueado.
			ob_clean();
			echo json_encode(array('valido' => true, 'mensaje' => $mensajeUniforme));
			exit;
		}

		// 7. Solo ahora persistimos la contraseña temporal
		$datos = array(
			"psd"                   => $hashTemporal,
			"es_temporal"           => 1,
			"fecha_temporal_expira" => date('Y-m-d H:i:s', strtotime('+1 day'))
		);
		$dao_update = new Dao();
		$resultado = $dao_update->Modificar("usuario", $datos, "id=" . $usuarioId, $usuarioId);

		if (!isset($resultado[0]) || $resultado[0] !== true) {
			error_log('[Aj_Usuario][OlvidoContrasena] Error al actualizar contraseña temporal para user_id=' . $usuarioId . ': ' . ($resultado[1] ?? 'sin detalles'));
			ob_clean();
			echo json_encode(array('valido' => true, 'mensaje' => $mensajeUniforme));
			exit;
		}

		ValidacionSeguridad::registrarCambioContrasena($usuarioId, $psdAnterior, 'temporal_reset');

		ob_clean();
		echo json_encode(array('valido' => true, 'mensaje' => $mensajeUniforme));
		exit;
	}

	if ($_POST['Requerimiento'] == "EliminarEmpleado") {

		$datos = array("id_estado" => 2);
		$dao = new Dao();
		$dao->ModificarAjax("empleado", $datos, "id=" . $_POST['Id'], $_POST['Id']);
	}

	if ($_POST['Requerimiento'] == "cargarPantalla") {

		$dao = new Dao();

		$dao->Campo("t.nombre", "");


		$dao->TablasInnerAlias("medico_especialidad", "ms", "especialidad", "e");
		$dao->TablasInnerAlias("especialidad", "e", "tipo_servicio", "t");
		$dao->Where("ms.id_empleado", $_SESSION["id_empleado"], "");


		$dao->ConsultarAjax();
	}

	if ($_POST['Requerimiento'] == "CargarMensajesPorUsuario") {

		$dao = new Dao();

		$sql = ' SELECT X.* 
				FROM
				(SELECT c.id,c.id_receptor,e.nombres,c.fecha_registro,e.foto,c.sms,c.id_emisor
				FROM chat c INNER JOIN empleado e ON (e.id = c.id_receptor)
				WHERE  c.id_emisor =' . $_SESSION['id_empleado'] . ' and C.id_receptor = ' . $_POST['Empleado'] . '
				UNION 
				SELECT c.id,c.id_receptor,e.nombres,c.fecha_registro,e.foto,c.sms,c.id_emisor
				FROM chat c INNER JOIN empleado e ON (e.id = c.id_receptor)
				WHERE c.id_receptor =' . $_SESSION['id_empleado'] . ' and C.id_emisor = ' . $_POST['Empleado'] . ' 
				) X ORDER BY X.fecha_registro';
		/*if($_POST['Estado']==23){
			$sql =' SELECT X.* 
				FROM
				(
				SELECT c.id,c.id_receptor,e.nombres,c.fecha_registro,e.foto,c.sms,c.id_emisor
				FROM chat c INNER JOIN empleado e ON (e.id = c.id_receptor)
				WHERE c.id_estado=23 and c.id_receptor ='.$_SESSION['id_empleado'].' and C.id_emisor = '.$_POST['Empleado'].' 
				) X ORDER BY X.fecha_registro';
		}*/
		// La foto del empleado se entrega como URL pública (proxy si es ruta del repositorio).
		$rows = $dao->ConsultarSqlNativo($sql);
		foreach (($rows ?? []) as &$rChat) {
			if (isset($rChat['foto'])) $rChat['foto'] = Repositorio::urlPublica($rChat['foto']);
			if (isset($rChat[4]))      $rChat[4]      = Repositorio::urlPublica($rChat[4]);
		}
		unset($rChat);
		echo json_encode($rows ?? [], JSON_FORCE_OBJECT);
	}

	if ($_POST['Requerimiento'] == "EnviarMensaje") {

		$datos = array(

			"id_emisor" => $_SESSION["id_empleado"],
			"id_receptor" => $_POST["Empleado"],
			"id_estado" => 1,
			"sms" => $_POST["Mensaje"]
		);

		$dao = new Dao();
		$dao->GuardarAjax("chat", $datos);
	}
	if ($_POST['Requerimiento'] == "ActualizarMensajesALeidos") {

		$datos = array("id_estado" => 23);

		$dao = new Dao();
		$dao->ModificarAjax("chat", $datos, "id_receptor=" . $_SESSION['id_empleado'] . ' and id_emisor=' . $_POST["Empleado"], $_POST['Empleado']);
	}

	if ($_POST['Requerimiento'] == "CargarUsuarioPorPuntoVenta") {

		$dao = new Dao();
		$dao->Campo("u.usuario", "");
		$dao->Tabla("usuario", "u");
		$dao->Where("u.id_punto_venta", $_POST["Punto"], "");

		$dao->ConsultarAjax();
	}
	if ($_POST['Requerimiento'] == "CargarTablaUsuarioJS") {

		$start  = isset($_POST['start'])  ? max(0, intval($_POST['start']))  : 0;
		$length = isset($_POST['length']) ? intval($_POST['length'])         : -1;

		$busqueda = isset($_POST["search"]["value"]) ? trim($_POST["search"]["value"]) : "";

		// Whitelist columnas ordenables (vista: Acciones, Empleado, Perfil, Perfiles, Usuario, Punto, Fecha)
		$colsOrden = array(
			0 => null,
			1 => 'e.apellidos',
			2 => 'p.nombre',
			3 => null,                      // badge total_perfiles (subquery, no ordenable trivialmente)
			4 => 'u.usuario',
			5 => 'pv.nombre',
			6 => 'u.fecha_registro'
		);
		$idxOrden = isset($_POST['order'][0]['column']) ? intval($_POST['order'][0]['column']) : 1;
		$dirOrden = (isset($_POST['order'][0]['dir']) && strtolower($_POST['order'][0]['dir']) === 'desc') ? 'DESC' : 'ASC';
		$colOrden = (isset($colsOrden[$idxOrden]) && $colsOrden[$idxOrden] !== null) ? $colsOrden[$idxOrden] : 'e.apellidos';

		// Scope multi-tenant: usuario.id_empresa es directo
		$idEmpScope = Tenancy::idEmpresaScope();

		// --- Total sin filtro de búsqueda ---
		$daoT = new Dao();
		$daoT->TablasInnerAlias("usuario","u","empleado","e");
		$daoT->TablasInnerAlias("usuario","u","perfil","p");
		$daoT->TablasInnerAlias("usuario","u","punto_venta","pv");
		$daoT->TablasInnerAlias("punto_venta","pv","punto_emision","pe");
		$daoT->Where("u.id_estado","1","and");
		$daoT->Where("u.id_empresa", $idEmpScope, "");
		$totalData = $daoT->ContarFilas();

		// --- Total filtrado ---
		if ($busqueda === "") {
			$totalFiltered = $totalData;
		} else {
			$daoF = new Dao();
			$daoF->TablasInnerAlias("usuario","u","empleado","e");
			$daoF->TablasInnerAlias("usuario","u","perfil","p");
			$daoF->TablasInnerAlias("usuario","u","punto_venta","pv");
			$daoF->TablasInnerAlias("punto_venta","pv","punto_emision","pe");
			$daoF->Where("u.id_estado","1","and");
			$daoF->Where("u.id_empresa", $idEmpScope, "and");
			$daoF->Filtrar("Concat(e.apellidos,' ',e.nombres,' ',u.usuario)", $busqueda, "");
			$totalFiltered = $daoF->ContarFilas();
		}

		// --- Página de datos ---
		$dao = new Dao();

		$dao->Campo("u.id","");//0
		$dao->Campo("Concat(e.apellidos,' ',e.nombres)","");//1
		$dao->Campo("p.nombre","");//2
		$dao->Campo("(SELECT COUNT(*) FROM usuario_perfil up WHERE up.id_usuario = u.id)","total_perfiles");//3
		$dao->Campo("u.usuario","");//4
		$dao->Campo("pv.nombre","");//5
		$dao->Campo("u.fecha_registro","");//6
		$dao->Campo("pe.secuencia","");//7

		$dao->TablasInnerAlias("usuario","u","empleado","e");
		$dao->TablasInnerAlias("usuario","u","perfil","p");
		$dao->TablasInnerAlias("usuario","u","punto_venta","pv");
		$dao->TablasInnerAlias("punto_venta","pv","punto_emision","pe");

		// Convención Dao: operador "and"/"or" se concatena al final; el último clause va con "".
		$dao->Where("u.id_estado", "1", "and");
		if ($busqueda !== "") {
			$dao->Where("u.id_empresa", $idEmpScope, "and");
			$dao->Filtrar("Concat(e.apellidos,' ',e.nombres,' ',u.usuario)", $busqueda, "");
		} else {
			$dao->Where("u.id_empresa", $idEmpScope, "");
		}

		$dao->Ordenar($colOrden . " " . $dirOrden);
		$dao->AsignarLimite($start, $length);

		$respuesta = $dao->Consultar();
		$data = array();
		foreach (($respuesta ?? []) as $item) {

			$editar   = '<button class="action-btn edit btnEditar" registro="' . $item[0] . '" title="Modificar"><i class="fa fa-pencil"></i></button>';
			$eliminar = '<button class="action-btn delete btnEliminar" registro="' . $item[0] . '" title="Eliminar"><i class="fa fa-trash-o"></i></button>';
			$resetear = '<button class="action-btn reset btnResetear" registro="' . $item[0] . '" title="Resetear Contraseña"><i class="fa fa-refresh"></i></button>';

			$item[0] = $editar . $eliminar . $resetear;

			$totalPerf  = intval($item[3]);
			$badgeClass = $totalPerf > 1 ? 'badge badge-info' : 'badge';
			$item[3]    = '<span class="' . $badgeClass . '" title="Perfiles asignados">' . $totalPerf . '</span>';

			$data[] = $item;
		}

		ob_clean();
		echo json_encode(array(
			"draw"            => intval($_POST["draw"]),
			"recordsTotal"    => $totalData,
			"recordsFiltered" => $totalFiltered,
			"data"            => $data
		));
		exit;
	}
}
