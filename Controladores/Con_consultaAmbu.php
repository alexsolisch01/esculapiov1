<?php

class Con_consultaAmbu{

    public function LlenarComboTipoEspe(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("especialidad","");
		$dao->Where("id_estado","1","");
		$dao->Ordenar("nombre");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}

	 public function LlenarComboTipoGene(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("genero","");
		$dao->Where("id_estado","1","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}


	public function LlenarComboTipoGene2(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("genero2","");
		$dao->Where("id_estado","1","");
		$dao->Ordenar("id desc");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}

	public function LlenarComboTipoRela(){

		$dao = new Dao();
		$opciopnes = '';
		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("tipo_relacion","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			$opciopnes.= ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}
		return $opciopnes;

	}


	public function LlenarComboTipoEtnia(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("etnia","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}

public function LlenarComboTipoMigra(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("migrante","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}


	public function LlenarComboTipoMigra2(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("migrante2","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}

	public function LlenarComboTipoPrioridad(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("prioridad","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}

	public function LlenarComboTipoSector(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("residencia","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}
	public function LlenarComboTipoAfi(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("afiliacion","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}


public function LlenarComboTipoNivel(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");

		$dao->Tabla("instruccion","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}

	public function LlenarComboCategoria(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		
		$dao->Tabla("categoria","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';


		}

	}

	public function LlenarComboRelacion(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		
		$dao->Tabla("tipo_relacion","");
		$dao->Where("id_estado","1","");

		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';


		}

	}


	public function LlenarComboTipoProvincia(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		
		$dao->Tabla("provincia","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}


	public function LlenarComboTipoCanton(){

		$dao = new Dao();

		$dao->Campo("id","");
		$dao->Campo("nombre","");
		
		$dao->Tabla("parroquia","");
		$dao->Where("id_estado","1","");


		$respuesta =$dao->Consultar();

		foreach ($respuesta as $row => $item){
			
			echo ' <option value='.$item['id'].'>'.$item['nombre'].'</option>';
		}

	}
}