//Creando prototipos

//Los prototipos son simplemente objetos

//todos los objectos tienen un prototipo a menos
//a menos que yo explicitamente los ponga en null

var prototipoRectangulo ={}

prototipoRectangulo.perimetro=function(){
	return this.ancho*2 + this.alto*2;
}

var unRectangulo= Object.create(prototipoRectangulo);

unRectangulo.ancho=10;
unRectangulo.alto=20;
unRectangulo.perimetro();

prototipoRectangulo.area=function(){
	return this.ancho*this.alto;
}

unRectangulo.area();

//------------------------------------------//

var lampara={encendida:true}
lampara.__proto__;
lampara.__proto__===unRectangulo.__proto__;//false

var clima={temperatura:20,humedad:0.2}
clima.__proto__;

clima.__proto__===lampara.__proto__;//true

//todos los objectos tienen el mismo prototipo
//a menos que sea definido por Object.create

//----------------------------------------//

var pepita = {energia:100};
pepita.volar = function(distancia) {
   this.energia = this.energia - 2 * distancia;  
};

var anastasia=Object.create(pepita);
anastasia.cantar=function(){
};

//PREGUNTA
//Cuando tengo una cadena de prototipos 
//(es decir, cuando tengo un objeto que tienen prototipo, 
//y este otro prototipo, y así) la forma de buscar un método
//al enviar un mensaje es la siguiente:

//El método se buscará en la instancia receptora 
//y luego en cada uno de los prototipos,
// hasta que se alcance el final de la cadena de prototipos.
//Recién allí, si el método no se encuentra, se producirá un error.


//_____________________________________________________________//

//Crea el prototipoHormigueroBuenazo que es muy similar al prototipoHormiguero 
//con la pequeña diferencia de que los hormigueros que crea el prototipoHormigueroBuenazo
//en vez de expulsar a sus miembros, no hacen nada.

var prototipoHormiguero = {
   depositarAlimento: function(cantidadAlimento) {
      this.cantidadDeAlimento += cantidadAlimento;
   }, 
   agregarHormiga: function(hormiga) {
     this.hormigas.push(hormiga);
   },
   reclamarAlimento: function(hormiga) {
    this.hormigas.forEach(function(h){
      h.entregarAlimentoA(this);
    }, this);
   },
   expulsar: function(cantidad) {
     this.hormigas.splice(0, 2);
   }
};

var prototipoHormigueroBuenazo=Object.create(prototipoHormiguero);
	prototipoHormigueroBuenazo.expulsar=function(cantidad){
}

//__________________________________________________//

var prototipoHormigaComun = {
  recolectar: function(cantidad) {
    this.cantidadDeAlimentoTransportado += this.cantidadAlimentoARecolectar(cantidad);
  },
  cantidadAlimentoARecolectar: function(cantidad) {
    return cantidad;
  },
  entregarAlimentoA: function(hormiguero) {
   hormiguero.depositarAlimento(this.cantidadDeAlimentoTransportado);
   this.cantidadDeAlimentoTransportado = 0;
  }
};

var prototipoHormigaPerezosa=Object.create(prototipoHormigaComun);
prototipoHormigaPerezosa.cantidadAlimentoARecolectar=function(cantidad){
  return cantidad/2;
}

//--------------------------------------//
//FUNCION CONSTRUCTORA
//----------------------------------------

function Celular(unNivelBateria, unNivelBateriaMaximo){
	this.nivelBateria=unNivelBateria;
	this.nivelBateriaMaximo=unNivelBateriaMaximo;
}

var unCelular=new Celular(0,500);

//Constructor con prototipo

Celular.protype={
	cargar:function(){
		this.nivelBateria=this.nivelBateriaMaximo;
	},
	mandarMensaje:function(){
		this.nivelBateria -=1;
	}
}

//________________//

//Modifica este código de forma que se pueda crear múltiples televisores,
//con valores diferentes de vidaUtilEnHoras, de la siguiente forma:
//var televisor = new Televisor(10000);
//var otroTelevisor = new Televisor(2000);

function Televisor(vidaUtilEnHoras){
	this.vidaUtilEnHoras=vidaUtilEnHoras;
}

Televisor.prototype={
  encender:function(){
      	this.vidaUtilEnHoras-=0.01;
	}
}


//-------------------------------------------------//
//-------------------JERARQUIAS--------------------//
function HormigaComun(){
	this.cantidadDeAlimentoTransportado=0;
}
HormigaComun.prototype={
	recolectar:function(cantidad){
		this.cantidadDeAlimentoTransportado +=
		this.cantidadAlimentoARecolectar(cantidad);
	},
	cantidadARecolectar:function(cantidad){
		return cantidad;
	}
}

//Cuando usamos jerarquia, llamamos los metodos mas
//especificos con la llamada call
function HormigaConEsteroides(cantidadEsteroides){
	HormigaComun.call(this);
	this.cantidadEsteroides=cantidadEsteroides;
}

var quehormiga=new HormigaConEsteroides(10);
quehormiga.cantidadEsteroides;
quehormiga.cantidadDeAlimentoTransportado;//necesita del call


//----------------------------------------------------//
//----------------PROTOTYPE CON JERARQUIAS-------------//

HormigaConEsteroides.prototype=Object.create(HormigaComun.prototype)

HormigaConEsteroides.prototype.cantidadARecolectar=function(cantidad){
	return cantidad*this.cantidadEsteroides;
}

//-----------------------------------------------------------//
//Se necesita que las hormigas sepan defenderse de enemigos, para ello necesitas agregar la función defenderDe en sus prototipos. Cómo se defiende una hormiga, depende de su tipo:
/*Las hormigas guerreras le envían al enemigo el mensaje generarDanio
Las hormigas recolectoras le envían al enemigo el mensaje hacerCosquillas
No es necesario modelar a los enemigos; basta con saber que estos entienden
 los mensajes generarDanio y hacerCosquillas.+/
