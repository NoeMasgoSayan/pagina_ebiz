import { createFacturas, onGetFacturas } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const facturasContainer = document.querySelector("#facturas-container");
const historialContainer = document.querySelector("#historial-container");

export const setupFacturas = () => {
  // READ
  onGetFacturas((querySnapshot) => {
    let facturasHtml = "";
    //
    let facturas = [];
    //
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      //
      const facturaId = doc.id;
      facturas.push({ id: facturaId, data });
      //

      facturasHtml += `
      <article class="factura-container"  data-id="${facturaId}">
        <p>empresa: ${data.empresa}</p>
        <p>factura #${data.numero}</p>
        <p>monto ${data.monto}</p>
        <button class="financiamiento" data-id="${facturaId}">solicitar financiamiento</button>
          <div class="opciones">
            <h3>opciones de financiamiento</h3>
            <p>opciones</p>
            <button class="opcion" data-id="${facturaId}" data-opcion="A">A</button>
            <button class="opcion" data-id="${facturaId}" data-opcion="B">B</button>
            <button class="opcion" data-id="${facturaId}" data-opcion="C">C</button>
          </div>
      </article>
      `;
    });

    //TODO: Mostrar las tareas en el DOM
    facturasContainer.innerHTML = facturasHtml;

    // Mostrar las opciones de financiamiento
    const botonesSolicitar = document.querySelectorAll(".financiamiento");

    botonesSolicitar.forEach((boton) => {
      boton.addEventListener("click", function () {
        // Mostrar el div con las opciones
        const opcionesDiv = this.nextElementSibling;
        if (
          opcionesDiv.style.display === "none" ||
          opcionesDiv.style.display === ""
        ) {
          opcionesDiv.style.display = "block";
        } else {
          opcionesDiv.style.display = "none";
        }
        // Se consigue el id del botón ``solicitar financiamiento``
        const solicitarId = boton.getAttribute("data-id");
        // Guardar en el localstorage
        localStorage.setItem("solicitarId", solicitarId);
      });
    });

    //TODO: Historial de transacciones
    const opciones = document.querySelectorAll(".opcion");

    opciones.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Se consigue el id de cada botón de ``opciones``
        const optionId = btn.getAttribute("data-id");
        // Id del botón ``solicitar financiamiento``
        const idSolicitar = localStorage.getItem("solicitarId");

        // Si son iguales debe agregarse al historial
        if (optionId === idSolicitar) {
          const facturaSeleccionada = facturas.find(
            (factura) => factura.id === optionId
          );
          if (facturaSeleccionada) {
            // Agregar la factura al historial
            let historialHtml = "";
            historialHtml += `
            <article class="transacciones">
              <p>Factura #${facturaSeleccionada.data.numero} aprobada por banco con opción ${btn.dataset.opcion}</p>
            </article>
            `;
            historialContainer.innerHTML += historialHtml;

            // Eliminar la factura del contenedor
            const facturaElement = document.querySelector(
              `.factura-container[data-id="${optionId}"]`
            );
            if (facturaElement) {
              facturaElement.remove();
            }
          }
        }
      });
    });
  });
};
