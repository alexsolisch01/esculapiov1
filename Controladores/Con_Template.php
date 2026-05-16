<?php

class Con_Template{
	public function template(){
		//echo $_SESSION["usuario"];
		if(isset($_SESSION["validar"])){
			if($_SESSION["validar"]){
				include_once "vistas/Template.php";
			}else{
				include_once "vistas/login.php";
			}
		}else{
			include_once "vistas/login.php";
		}
	}
}