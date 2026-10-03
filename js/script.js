fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("ip").value = data.ip;
    });

const ua = navigator.userAgent;

// Dispositivo
let dispositivo = "PC";

if (/iPhone|Android.*Mobile|Windows Phone/i.test(ua)) {
    dispositivo = "Móvil";
} else if (/iPad|Android/i.test(ua)) {
    dispositivo = "Tablet";
}

// Sistema operativo
let sistema = "Desconocido";

if (/Windows/i.test(ua)) {
    sistema = "Windows";
} else if (/Android/i.test(ua)) {
    sistema = "Android";
} else if (/iPhone|iPad|iPod/i.test(ua)) {
    sistema = "iOS";
} else if (/Macintosh/i.test(ua)) {
    sistema = "macOS";
} else if (/Linux/i.test(ua)) {
    sistema = "Linux";
}

// Navegador
let navegador = "Desconocido";

if (/Edg/i.test(ua)) {
    navegador = "Microsoft Edge";
} else if (/Chrome/i.test(ua)) {
    navegador = "Google Chrome";
} else if (/Firefox/i.test(ua)) {
    navegador = "Firefox";
} else if (/Safari/i.test(ua)) {
    navegador = "Safari";
}

document.getElementById("dispositivo").value = dispositivo;
document.getElementById("sistema").value = sistema;
document.getElementById("navegador").value = navegador;

document.getElementById("miFormulario").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;

    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo enviar el formulario");
        }

        // Avisar al HTML principal
        window.parent.postMessage({
            formularioEnviado: true
        }, "*");
    })
    .catch(error => {
        console.error("Error:", error);
    });
});