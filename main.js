// Obtener todos los inputs con name="mascota"
var inputsMascota = document.getElementsByName("mascota");
let botonMascotaJugador = document.getElementById("boton-mascota");
// spans para mostrar mensajes
let spanMascotaJugador = document.getElementById("mascota-jugador");
let spanMascotaEnemigo = document.getElementById("mascota-enemigo");
let spanVidasJugador = document.getElementById("vidas-jugador");
let spanVidasEnemigo = document.getElementById("vidas-enemigo");
// botones de ataques
let botonFuego = document.getElementById("boton-fuego");
let botonAgua = document.getElementById("boton-agua");
let botonTierra = document.getElementById("boton-tierra");
let botones = [botonFuego, botonAgua, botonTierra];
// boton de reinicio
let botonReiniciar = document.getElementById("boton-reiniciar");
// secciones
let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
let sectionMensajes = document.getElementById("ventana-mensajes");
let sectionReinicio = document.getElementById("reinicio");
// variables globales
let ataqueJugador;
let ataqueEnemigo;
let mascotaJugador;
let mascotaEnemigo;
let vidasEnemigo = 3;
let vidasJugador = 3;

// 0=Hipodoge[0,1,0,0,] 1=Capipepo 2=Ratigueya 3=Langostelvis 4=Tucapalma 5=Pydos
const mokepons = [
  ["Hipodoge", 0, 1, 0],
  ["Capipepo", 0, 0, 1],
  ["Ratigueya", 1, 0, 0],
  ["Langostelvis", 1, 1, 0],
  ["Tucapalma", 0, 1, 1],
  ["Pydos", 1, 0, 1],
];
// 0=fuego 1=agua 2=tierra
const ataques = ["Fuego 🔥", "Agua 💧", "Tierra 🌱"];

const vidas = ["🖤🖤🖤", "💖🖤🖤", "💖💖🖤", "💖💖💖"];
//parte de funciones
function numAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarMascotaJugador() {
  // Recorrer todos los inputs para encontrar el seleccionado
  var x;
  for (var i = 0; i < inputsMascota.length; i++) {
    if (inputsMascota[i].checked) {
      x = inputsMascota[i].value;
      break;
    }
  }
  // se guarda la mascota seleccionada
  mascotaJugador = mokepons[parseInt(x)];
  spanMascotaJugador.innerHTML = mascotaJugador[0];
  ataquesDisponibles(mascotaJugador);
  // se le asigna una mascota aleatoria al enemigo
  mascotaEnemigo = mokepons[numAleatorio(0, 5)];
  spanMascotaEnemigo.innerHTML = mascotaEnemigo[0];
  spanVidasJugador.innerHTML = vidas[vidasJugador];
  spanVidasEnemigo.innerHTML = vidas[vidasEnemigo];
  // esconde y agrega secciones
  sectionSeleccionarMascota.style.display = "none";
  sectionSeleccionarAtaque.style.display = "flex";
}

function ataquesDisponibles(mokepon) {
  for (let j = 1; j < mokepon.length; j++) {
    if (mokepon[j] == 0) {
      botones[j - 1].disabled = true;
    } else {
      botones[j - 1].disabled = false;
    }
  }
}

function combate(value) {
  // seleccionarMascotaJugador();
  // botonMascotaJugador.disabled = true;
  ataqueJugador = value;
  let aceptable = true;
  while (aceptable) {
    ataqueEnemigo = numAleatorio(0, 2);
    if (mascotaEnemigo[ataqueEnemigo + 1] == 1) {
      aceptable = false;
    }
  }

  let resultado = ataqueJugador - ataqueEnemigo;
  // si resultado = -2,1 => ganaste
  if (ataqueJugador == ataqueEnemigo) {
    mensajePelea("EMPATE");
  } else if (resultado == -2 || resultado == 1) {
    mensajePelea("GANASTE");
    vidasEnemigo--;
  } else {
    mensajePelea("PERDISTE");
    vidasJugador--;
  }
  spanVidasJugador.innerHTML = vidas[vidasJugador];
  spanVidasEnemigo.innerHTML = vidas[vidasEnemigo];
  conteoVidas();
}

function mensajePelea(i) {
  // Crear el elemento p y asignarle un texto
  var parrafo = document.getElementById("parrafo");
  parrafo.textContent = `tu mascota atacó con ${ataques[ataqueJugador]}, la mascota enemiga atacó con ${ataques[ataqueEnemigo]}, ${i}`;
}

function conteoVidas() {
  var parrafo = document.getElementById("parrafo");
  if (vidasEnemigo == 0) {
    parrafo.textContent = "WE ARE THE CHAMPIONS";
    ataquesDisponibles([0, 0, 0, 0]);
    sectionReinicio.style.display = "block";
  } else if (vidasJugador == 0) {
    parrafo.textContent = "IT'S JUST ANOTHER BRICK IN THE WALL";
    ataquesDisponibles([0, 0, 0, 0]);
    sectionReinicio.style.display = "block";
  }
}

function reiniciarJuego() {
  location.reload();
}
// parte de modificadores
botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
// valores de botones 0=fuego 1=agua 2=tierra
botonFuego.addEventListener("click", function () {
  combate(parseInt(botonFuego.value));
});
botonAgua.addEventListener("click", function () {
  combate(parseInt(botonAgua.value));
});
botonTierra.addEventListener("click", function () {
  combate(parseInt(botonTierra.value));
});
// reiniciar juego
botonReiniciar.addEventListener("click", reiniciarJuego);
// esconder las secciones
sectionSeleccionarAtaque.style.display = "none";
sectionReinicio.style.display = "none";
