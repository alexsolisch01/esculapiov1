<?php

class Con_Enlaces{

	public function Enlaces(){

		$pagina = " ";
        if (isset($_GET["pagina"])) {
            $enlaces = $_GET["pagina"];
            if( isset($_SESSION["PerlaPantalla"][$enlaces]) || $enlaces =="salir" ){
                $pagina = "vistas/" . $enlaces . ".php";
            }else{
                if($_SESSION["perfil"]==1 || $_SESSION["perfil"] == 87){
					$pagina = "vistas/inicio.php";
				}
            }
        } else {
            if($_SESSION["perfil"]==1 || $_SESSION["perfil"] == 87){
				$pagina = "vistas/inicio.php";
			}
        }
        if ($pagina != " ") {
            include_once $pagina;
        }
	}
}