<?php

class SubirArchivo{

	public function SubirFotos($carpeta,$nombre,$imagen){

			$foto = $imagen["tmp_name"];
			$ruta="";
			$aleatorio = mt_rand(0, 999);

			if (exif_imagetype($foto) == IMAGETYPE_JPEG) {
			   
			

				$ruta = "../imagenes/".$carpeta."/".$nombre.$aleatorio.".jpg";				
				$origen = imagecreatefromjpeg($foto);

				//$destino = imagecrop($origen, ["x"=>0, "y"=>0, "width"=>960, "height"=>720]);

				imagejpeg($origen,$ruta);

			}elseif(exif_imagetype($foto) == IMAGETYPE_PNG) {
			   
			

				$ruta = "../imagenes/".$carpeta."/".$nombre.$aleatorio.".png";

				$origen = imagecreatefrompng($foto);

				//$destino = imagecrop($origen, ["x"=>0, "y"=>0, "width"=>960, "height"=>720]);

				imagepng($origen,$ruta);

			}else{
				

				$ruta="../imagenes/imagen.png";
			}

			return $ruta;

	}

	public function SubirArchivos($carpeta,$nombre,$file){

			$ruta = "";
			

				//if(mime_content_type($file['tmp_name']) == 'application/x-pkcs12'){
					$ruta = "../documentos/".$carpeta."/".$nombre.".p12";
				//}

				if(!empty(basename( $file['name']))){

					if(move_uploaded_file($file['tmp_name'], $ruta)) { 	
					
					} else{
						$ruta="";
					}

				}else{
					$ruta="";
					
				}

			return $ruta;

	}
	public function EliminarArchivo($ruta){
			
			if(unlink($ruta)){
				return true;
			}else{
				return false;
			}
	}


}