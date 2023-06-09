

//////////// FORMULARIO INICIO ///////////////////////

const formularioInicio = document.getElementById('formInicio');
const textoModalDirecc = document.getElementsByClassName("textoModalDirecc");

function CiudadesContacto(direccion, telefonoCentral) {
  this.direccion = direccion;
  this.telefonoCentral = telefonoCentral;
  this.saludar = function () {
    Swal.fire({
      icon: 'success',
      iconColor: '#C2EEA0',
      title: '¡Somos vecinos!',
      html: `<p><b>Estamos en:</b> ${this.direccion}</br></p>` + `<p><b>Nuestro teléfono central es :</b> ${this.telefonoCentral}</p>` + `<p><br><i>¡Copia el siguiente código y obtiene un 15% de descuento en tu reserva! <b>SJKDKA02</b></i></br></br></p>`,
    })
  }
};


const MADRID = new CiudadesContacto(
  "Tirso de Molina 16. Centro. Madrid. / Calle Postas 61. Aranjuez. Madrid. / Alamos Plateados 2722. Alcalá de Henares. Madrid.", "617 926 462");
const MURCIA = new CiudadesContacto(
  "Calle Santa Catalina 37. Centro. Murcia.", "968 281 271");
const ALICANTE = new CiudadesContacto(
  "Rbla. de Méndez Núñez, 38. Alicante. / Calle del Dr. Bergez, 78. Alicante.", "936 744 465");
const VALENCIA = new CiudadesContacto(
  "Carrer de Borriana, 52. València. Valencia. / Pl. Virgen Asunción, 15. Ayora. Valencia.", "963 348 896");


formularioInicio.addEventListener('submit', confirmarCiudad);
function confirmarCiudad(e) {
  let ciudad = document.getElementById('ciudadUsuario').value.toUpperCase();
  e.preventDefault()
  if (ciudad == "MADRID") {
    MADRID.saludar();
  }
  else if (ciudad == "MURCIA") {
    MURCIA.saludar();
  }
  else if (ciudad == "ALICANTE") {
    ALICANTE.saludar();
  }
  else if (ciudad == "VALENCIA") {
    VALENCIA.saludar();
  }
  else {
    Swal.fire({
      icon: 'error',
      iconColor: 'red',
      title: '¡Opss!',
      html: `<p><b>Lo sentimos, no estamos en la ciudad que nos indicaste, por ahora ;)</b></p>` + `<p><br>Te invitamos a formar parte de nuestra comunidad.</br></p>`,
      customClass: {
        popup: 'noSomosVecinos'
      }
    })
  }
}


///////////// TRAER CARDS SERVICIOS ///////////////////////

document.addEventListener('DOMContentLoaded', traerCards);
const contenedor = document.querySelector("#contenedorCards");

async function traerCards() {
  const url = "https://raw.githubusercontent.com/morganiJuanPablo/cardServicios/main/cardServicios.json";
  try {
    const resultado = await fetch(url);
    const respuesta = await resultado.json();
    const productos = respuesta.cardServicios;
    pintarProductos(productos);
  } catch (error) {
    console.log(error);
  }
};
function pintarProductos(productos) {
  console.log(productos);
  productos.forEach((prod) => {
    const { Título, Imagen, Detalle, Precio } = prod;
    contenedor.innerHTML += `
      <div class="card1">
        <h3>${Título}</h3>
        <img src="${Imagen}" alt="Guardería por hora">
        <div>
          <p>${Detalle}</p>
        </div>
        <p class="precioServicios">A solo <b>${Precio}</b>Є</p>
      </div>
    `;
  });
};

//////////// UNIRSE A LA COMUNIDAD ///////////////////////

function UsuariosComunidad(comunidadNombreUsuario, comunidadNombreMascota, comunidadCiudadUsuario, comunidadEdadMascota, comunidadMailUsuario, comunidadRazaMascota) {
  this.comunidadNombreUsuario = comunidadNombreUsuario;
  this.comunidadNombreMascota = comunidadNombreMascota;
  this.comunidadCiudadUsuario = comunidadCiudadUsuario;
  this.comunidadEdadMascota = comunidadEdadMascota;
  this.comunidadMailUsuario = comunidadMailUsuario;
  this.comunidadRazaMascota = comunidadRazaMascota;
  this.bienvenida = function () {
    Toastify({
      text: `¡Enhorabuena!\nBienvenido ${this.comunidadNombreUsuario}. Tú y ${this.comunidadNombreMascota} ya forman parte de nuestra comunidad.`,
      duration: 5000,
      className: "saludoBienvenida",
      position: 'center',
      style: {
        background: "#9BE165",
        height: '10rem',

      }
    }).showToast();
  }
}

const enviarComunidad = document.getElementById("enviarComunidad");

enviarComunidad.addEventListener('click', confirmarUsuario);

function confirmarUsuario(e) {
  e.preventDefault();

  let nombreUsuario = document.getElementById("comunidadNombreUsuario").value.toUpperCase();
  let nombreMascota = document.getElementById("comunidadNombreMascota").value.toUpperCase();
  let ciudadUsuario = document.getElementById("comunidadCiudadUsuario").value.toUpperCase();
  let edadMascota = document.getElementById("comunidadEdadMascota").value.toUpperCase();
  let mailUsuario = document.getElementById("comunidadMailUsuario").value.toUpperCase();
  let razaMascota = document.getElementById("comunidadRazaMascota").value.toUpperCase();

  const aceptoCondiciones = document.getElementById('aceptoCondiciones').checked;

  if (nombreUsuario === "" || nombreMascota === "" || ciudadUsuario === "" || edadMascota === "" || mailUsuario === "" || razaMascota === "") {
    Toastify({
      text: "Debes llenar todos los campos.",
      duration: 2000,
      className: "avisoCheckFalse",
      position: 'center',
      style: {
        background: "red",
      }
    }).showToast();
  } else if (aceptoCondiciones == false) {
    Toastify({
      text: "Debes aceptar las condiciones.",
      duration: 2000,
      className: "avisoCheckFalse",
      position: 'center',
      style: {
        background: "red",
      }
    }).showToast();
  } else {
    let nuevoUsuario = new UsuariosComunidad(nombreUsuario, nombreMascota, ciudadUsuario, edadMascota, mailUsuario, razaMascota);
    nuevoUsuario.bienvenida();
    localStorage.setItem("Nombre y Apellido", nombreUsuario);
    localStorage.setItem("Ciudad", ciudadUsuario);
    localStorage.setItem("E-mail", mailUsuario);
    localStorage.setItem("Nombre mascota", nombreMascota);
    localStorage.setItem("Edad (años)", edadMascota);
    localStorage.setItem("Raza", razaMascota);
  }
}


////////////// COMPLETAR RESERVA /////////////////////////// 

let totalReserva = 0;


const agregoPeluqueria = document.getElementById("agregoPeluqueria");
agregoPeluqueria.addEventListener(`click`, agregoPeluqueriaAlTotal);
function agregoPeluqueriaAlTotal(e) {
  e.preventDefault();
  Toastify({
    text: "Añadiste Peluquería canina",
    duration: 2500,
    className: "peluqueriaAñadida",
    position: 'right',
    gravity: 'bottom',
    style: {
      background: "#F8AC44",
    }
  }).showToast();

  totalReserva += 30;
}

const agregoVeterinaria = document.getElementById("agregoVeterinaria");
agregoVeterinaria.addEventListener(`click`, agregoVeterinariaAlTotal);
function agregoVeterinariaAlTotal(e) {
  e.preventDefault();
  Toastify({
    text: "Añadiste Servicio de veterinaria",
    duration: 2500,
    className: "peluqueriaAñadida",
    position: 'right',
    gravity: 'bottom',
    style: {
      background: "#F8AC44",
    }
  }).showToast();

  totalReserva += 45;
}

const nuevaReserva = document.getElementById("enviarReserva");
nuevaReserva.addEventListener(`click`, reservar);
function reservar(e) {
  e.preventDefault();
  //////////// CONFIRMAR RESERVA LLENANDO DATOS ///////////////////////

  const cantidadHoras = document.getElementById("horasGuarderia").value;

  let totalPrecioHoras = cantidadHoras * 5;

  const codigoPromocional = document.getElementById("codigoDescuento").value.toUpperCase();

  if (cantidadHoras !== "" && cantidadHoras !== "0") {
    Toastify({
      text: `¡Ya casi lo tienes!\nVe al final de la página y completa la reserva.`,
      duration: 4000,
      className: "saludoBienvenida",
      position: 'center',
      style: {
        background: "#9BE165",
        height: '10rem',
      }
    }).showToast();

    totalReserva += totalPrecioHoras;

    if (codigoPromocional == "SJKDKA02") {
      totalReserva -= (totalReserva * 0.15);
    }


    const seccionConfirmarReserva = document.getElementById("padreSeccionConfirmarReserva");
    seccionConfirmarReserva.className = "padreSeccionConfirmarReserva";



    const contenidoHTML = `
  <div id="formularioDatosCliente">
    <p class="textoAgradecimiento">¡Gracias por confiar en nosotros!</p>
    <p class="total"><i>Total = <b>${totalReserva}</b>Є</i></p>
    <p class="indicaciones">Completa los siguientes campos con tus datos y nos pondremos en contacto contigo dentro de la mayor brevedad posible para coordinar los servicios reservados.<br><b>¡EL PAGO SE REALIZA PERSONALMENTE CUANDO NOS VISITEN!</b></p>
    <div class="contenedorFormConfirmReserva">
      <form action="">
        <label for="reservaNombreUsuario">Nombre y Apellido</label>
        <input type="text" id="reservaNombreUsuario" />
      </form>
      <form action="">
        <label for="reservaMovilUsuario">Teléfono móvil</label>
        <input type="number" id="reservaMovilUsuario" />
      </form>
      <form action="">
        <label for="reservaCiudadUsuario">Ciudad en la que vives</label>
        <input type="text" id="reservaCiudadUsuario" />
      </form>
      <form action="">
        <label for="reservaMailUsuario">E-mail</label>
        <input type="email" id="reservaMailUsuario" />
      </form>
    </div>
  </div>
  <div class="contenedoresBtns">
    <button type="submit" id="btnConfirmarReserva">Enviar</button>
    <button type="submit" id="btnCancelarReserva">Cancelar</button>
  </div>`;

    seccionConfirmarReserva.innerHTML = contenidoHTML;

    function UsuariosReserva(reservaNombreUsuario, reservaMovilUsuario, reservaCiudadUsuario, reservaMailUsuario) {
      this.reservaNombreUsuario = reservaNombreUsuario;
      this.reservaMovilUsuario = reservaMovilUsuario;
      this.reservaCiudadUsuario = reservaCiudadUsuario;
      this.reservaMailUsuario = reservaMailUsuario;
      this.mensajeReserva = function () {
        Swal.fire({
          icon: 'success',
          iconColor: '#C2EEA0',
          title: '¡Enhorabuena!',
          html: `<p><b>Gracias por confiar en nosotros ${this.reservaNombreUsuario}.</b><br>` + `<p>Un representante se pondrá en contacto contigo para que podamos coordinar la reserva que has realizado.</p>` + `<p><br><br><i>¡Esperamos verlos pronto!</i></br></br></p>`,
        });
      };
    }

    const botonReserva = document.getElementById("btnConfirmarReserva");
    botonReserva.addEventListener('click', confirmarReserva);

    function confirmarReserva() {
      let reservaNombre = document.getElementById("reservaNombreUsuario").value.toUpperCase();
      let reservaMovil = Number(document.getElementById("reservaMovilUsuario").value);
      let reservaCiudad = document.getElementById("reservaCiudadUsuario").value.toUpperCase();
      let reservaMail = document.getElementById("reservaMailUsuario").value.toUpperCase();

      if (reservaNombre && reservaMovil && reservaCiudad && reservaMail) {
        const newReserva = new UsuariosReserva(reservaNombre, reservaMovil, reservaCiudad, reservaMail);
        newReserva.mensajeReserva();
        localStorage.setItem("Nombre del interesado", reservaNombre);
        localStorage.setItem("Móvil", reservaMovil);
        localStorage.setItem("Ciudad en la que vive", reservaCiudad);
        localStorage.setItem("E-mail", reservaMail);
      } else {
        Toastify({
          text: "Debes llenar todos los campos.",
          duration: 2000,
          className: "avisoCheckFalse",
          position: 'center',
          style: {
            background: "red",
          }
        }).showToast();
      }
    }

    const botonCancelar = document.getElementById("btnCancelarReserva");
    botonCancelar.addEventListener('click', cancelarReserva);

    function cancelarReserva(e) {
      e.preventDefault();
      Swal.fire({
        icon: 'warning',
        iconColor: 'white',
        html: `<p class="hasCancelado">¡Has cancelado la reserva!</p>`,
        showConfirmButton: false,
        customClass: {
          popup: 'modalReservaCancelada'
        }
      });
      seccionConfirmarReserva.remove();
    }
  } else {
    Toastify({
      text: "No has indicado la cantidad de horas.",
      duration: 2000,
      className: "avisoCheckFalse",
      position: 'center',
      style: {
        background: "red",
      }
    }).showToast();
  }
}