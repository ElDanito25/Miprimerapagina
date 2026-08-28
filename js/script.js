/* ============================================================
   ARCHIVO: js/script.js
   ¿QUÉ ES ESTO?: Aquí le damos "vida" a la página. JavaScript es
   el que hace que pasen cosas cuando el usuario hace clic,
   escribe, o recarga la página.

   Este archivo hace 3 trabajos:
   1) Dibujar las tarjetas de los libros (usando la lista de abajo)
   2) Guardar y mostrar los comentarios de la gente
   3) Armar el botón de WhatsApp con el mensaje correcto

   🧒 CONSEJO PARA EDITAR:
   - Para agregar un libro nuevo, solo copia un bloque dentro de
     "listaDeLibros" y cambia los datos. ¡No necesitas tocar el
     HTML ni el CSS!
   - Para cambiar el número de WhatsApp, busca "numeroWhatsApp"
     aquí abajo.
   ============================================================ */


/* ------------------------------------------------------------
   1) DATOS: LISTA DE LIBROS
   Esto es un "arreglo" (una lista) de "objetos" (fichas con
   datos). Cada { } es un libro con su información.

   ¿Cómo agrego un libro nuevo? Copia y pega un bloque completo
   { ... }, ponle una coma después del anterior, y cambia los
   valores. ¡Así de fácil! La página lo dibujará solo.
   ------------------------------------------------------------ */
const listaDeLibros = [
  {
    id: "inagotable",                 // Un nombre único para identificar el libro (sin espacios)
    titulo: "Inagotable",
    autor: "Paola Gutiérrez",
    subtitulo: "Una historia de amor, perdón y redención",
    imagen: "img/inagotable.png",     // Ruta de la portada dentro de la carpeta "img"
    descripcion:
      "Una novela sobre el amor que no se agota, el perdón que sana " +
      "y la redención que transforma. Una historia para sentir con el corazón.",
    precio: "$30.000 COP",            // ✏️ Cambia el precio aquí cuando quieras
    numeroWhatsApp: "+573046031495",   // ✏️ Cambia esto por el número real (con código de país, sin + ni espacios)
  },

  /* 👉 Para agregar el próximo libro de Paola, descomenta y edita
     este ejemplo (quita las "/*" y "*​/" de los extremos):

  {
    id: "nombre-del-libro",
    titulo: "Título del libro",
    autor: "Paola Gutiérrez",
    subtitulo: "Un subtítulo corto",
    imagen: "img/otro-libro.png",
    descripcion: "Descripción breve del libro.",
    precio: "$30.000 COP",
    numeroWhatsApp: "+573046031495",
  },

  */
];


/* ------------------------------------------------------------
   2) DIBUJAR LAS TARJETAS DE LOS LIBROS EN LA PANTALLA
   ------------------------------------------------------------ */
function dibujarLibros() {
  // Buscamos la "caja vacía" que dejamos en el HTML
  const contenedor = document.getElementById("contenedor-libros");

  // Recorremos CADA libro de la lista, uno por uno
  listaDeLibros.forEach((libro) => {
    // Armamos el mensaje que se enviará por WhatsApp al hacer clic en "Comprar"
    const mensaje = `Hola Paola, quiero comprar el libro "${libro.titulo}" 😊`;
    const enlaceWhatsApp =
      "https://wa.me/" + libro.numeroWhatsApp + "?text=" + encodeURIComponent(mensaje);
    // encodeURIComponent convierte espacios y tildes en un formato
    // que los enlaces web pueden entender sin romperse.

    // Creamos un <article> nuevo (una cajita) para este libro
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-libro";

    // Le ponemos todo el HTML de adentro usando los datos del libro.
    // Las comillas invertidas ` ` permiten escribir texto largo y
    // meter variables adentro con ${ }.
    tarjeta.innerHTML = `
      <div class="tarjeta-libro__imagen-wrap">
        <img
          class="tarjeta-libro__imagen"
          src="${libro.imagen}"
          alt="Portada del libro ${libro.titulo}"
        />
      </div>
      <div class="tarjeta-libro__cuerpo">
        <h3 class="tarjeta-libro__titulo">${libro.titulo}</h3>
        <p class="tarjeta-libro__autor">Por ${libro.autor}</p>
        <p class="tarjeta-libro__descripcion">${libro.subtitulo}. ${libro.descripcion}</p>
        <p class="tarjeta-libro__precio">${libro.precio}</p>
        <a
          class="tarjeta-libro__boton"
          href="${enlaceWhatsApp}"
          target="_blank"
          rel="noopener"
        >
          🟢 Comprar por WhatsApp
        </a>
      </div>
    `;

    // Agregamos la tarjeta ya lista dentro del contenedor en el HTML
    contenedor.appendChild(tarjeta);
  });

  // Además, hacemos que el botón flotante de WhatsApp use los datos
  // del PRIMER libro de la lista (por ahora solo hay uno).
  if (listaDeLibros.length > 0) {
    const libroPrincipal = listaDeLibros[0];
    const mensajeFlotante = `Hola Paola, quiero más información sobre "${libroPrincipal.titulo}" 😊`;
    const botonFlotante = document.getElementById("boton-whatsapp");
    botonFlotante.href =
      "https://wa.me/" + libroPrincipal.numeroWhatsApp +
      "?text=" +
      encodeURIComponent(mensajeFlotante);
  }
}


/* ------------------------------------------------------------
   3) COMENTARIOS DE LOS LECTORES
   Usamos "localStorage", que es como una cajita de memoria que
   el navegador guarda en la computadora del visitante. Así, si
   alguien escribe un comentario y cierra la página, al volver a
   entrar, su comentario sigue ahí.
   ------------------------------------------------------------ */

const CLAVE_GUARDADO = "comentarios-inagotable"; // Nombre de la "cajita" en localStorage

// Trae todos los comentarios guardados (o una lista vacía si no hay ninguno)
function obtenerComentariosGuardados() {
  const datosGuardados = localStorage.getItem(CLAVE_GUARDADO);

  // Si nunca se ha guardado nada, devolvemos una lista vacía
  if (!datosGuardados) {
    return [];
  }

  // Si sí hay datos, los convertimos de texto a una lista real de JavaScript
  return JSON.parse(datosGuardados);
}

// Guarda la lista completa de comentarios en la memoria del navegador
function guardarComentarios(listaComentarios) {
  localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(listaComentarios));
}

// Dibuja en pantalla todos los comentarios guardados
function dibujarComentarios() {
  const listaComentarios = obtenerComentariosGuardados();
  const contenedor = document.getElementById("lista-comentarios");

  // Limpiamos lo que había antes, para no repetir comentarios al redibujar
  contenedor.innerHTML = "";

  // Si todavía no hay comentarios, mostramos un mensaje amigable
  if (listaComentarios.length === 0) {
    contenedor.innerHTML = `<li class="sin-comentarios">Sé el primero en dejar un comentario ✨</li>`;
    return; // "return" corta la función aquí, no sigue de largo
  }

  // Recorremos los comentarios del MÁS NUEVO al MÁS VIEJO
  const comentariosOrdenados = [...listaComentarios].reverse();

  comentariosOrdenados.forEach((comentario) => {
    const elementoLista = document.createElement("li");
    elementoLista.className = "comentario";

    elementoLista.innerHTML = `
      <div class="comentario__cabecera">
        <span class="comentario__nombre">${comentario.nombre}</span>
        <span class="comentario__fecha">${comentario.fecha}</span>
      </div>
      <p class="comentario__mensaje">${comentario.mensaje}</p>
    `;

    contenedor.appendChild(elementoLista);
  });
}

// Convierte cualquier texto en "seguro" para mostrar, evitando que
// alguien escriba código HTML raro dentro de su comentario.
function textoSeguro(texto) {
  const div = document.createElement("div");
  div.textContent = texto; // El navegador escapa automáticamente el HTML aquí
  return div.innerHTML;
}

// Escuchamos el momento en que alguien envía el formulario de comentarios
function activarFormularioDeComentarios() {
  const formulario = document.getElementById("formulario-comentario");

  formulario.addEventListener("submit", function (evento) {
    // Evita que la página se recargue (que es lo que hace un formulario normalmente)
    evento.preventDefault();

    const campoNombre = document.getElementById("input-nombre");
    const campoMensaje = document.getElementById("input-mensaje");

    const nombre = campoNombre.value.trim();     // .trim() quita espacios sobrantes
    const mensaje = campoMensaje.value.trim();

    // Si algún campo está vacío, avisamos y no seguimos
    if (nombre === "" || mensaje === "") {
      alert("Por favor escribe tu nombre y tu comentario 🙂");
      return;
    }

    // Creamos el nuevo comentario como un objeto
    const nuevoComentario = {
      nombre: textoSeguro(nombre),
      mensaje: textoSeguro(mensaje),
      fecha: new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    // Lo agregamos a la lista guardada y volvemos a guardar todo
    const listaComentarios = obtenerComentariosGuardados();
    listaComentarios.push(nuevoComentario);
    guardarComentarios(listaComentarios);

    // Volvemos a dibujar los comentarios en pantalla (ahora con el nuevo)
    dibujarComentarios();

    // Limpiamos el formulario para que quede listo para otro comentario
    formulario.reset();
  });
}


/* ------------------------------------------------------------
   4) AÑO ACTUAL EN EL PIE DE PÁGINA
   Así nunca hay que editar el HTML a mano cada año nuevo.
   ------------------------------------------------------------ */
function mostrarAnioActual() {
  const espacioAnio = document.getElementById("anio-actual");
  espacioAnio.textContent = new Date().getFullYear();
}


/* ------------------------------------------------------------
   5) PUNTO DE PARTIDA: cuando la página termina de cargar,
   ejecutamos todas nuestras funciones en orden.
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  dibujarLibros();               // Pinta las tarjetas de libros
  dibujarComentarios();          // Muestra los comentarios guardados
  activarFormularioDeComentarios(); // Activa el formulario para poder comentar
  mostrarAnioActual();           // Pone el año actual en el pie de página
});
