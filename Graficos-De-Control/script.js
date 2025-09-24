let chart;

function analizarDatos(valores, media, lsc, lic) {
    const datos = valores.map(v => v.y);
    
    // Verificar puntos fuera de límites
    const fueraLimites = datos.some(valor => valor > lsc || valor < lic);
    
    // Verificar 2 de 3 puntos fuera de 2 sigmas
    const dosSigmas = (lsc - media) * (2/3);
    let contadorDosSigmas = 0;
    for(let i = 0; i < datos.length - 2; i++) {
        const ventana = datos.slice(i, i + 3);
        const fueraDosSigmas = ventana.filter(v => 
            Math.abs(v - media) > dosSigmas
        ).length;
        if(fueraDosSigmas >= 2) contadorDosSigmas++;
    }
    
    // Verificar 4 de 5 puntos fuera de 1 sigma
    const unaSigma = (lsc - media) * (1/3);
    let contadorUnaSigma = 0;
    for(let i = 0; i < datos.length - 4; i++) {
        const ventana = datos.slice(i, i + 5);
        const fueraUnaSigma = ventana.filter(v => 
            Math.abs(v - media) > unaSigma
        ).length;
        if(fueraUnaSigma >= 4) contadorUnaSigma++;
    }
    
    // Verificar 8 puntos consecutivos del mismo lado
    let ochoConsecutivos = false;
    for(let i = 0; i < datos.length - 7; i++) {
        const ventana = datos.slice(i, i + 8);
        const todosSobreMedia = ventana.every(v => v > media);
        const todosBajoMedia = ventana.every(v => v < media);
        if(todosSobreMedia || todosBajoMedia) {
            ochoConsecutivos = true;
            break;
        }
    }
    
    // Determinar mensaje y tipo de alerta
    let mensaje = "";
    let tipoAlerta = "";
    
    if(fueraLimites) {
        mensaje = "⚠️ Situación FUERA DE CONTROL";
        tipoAlerta = "danger";
    } else if(contadorDosSigmas > 0) {
        mensaje = "⚠️ Tendencia: 2 de 3 puntos fuera de 2 sigmas";
        tipoAlerta = "warn";
    } else if(contadorUnaSigma > 0) {
        mensaje = "⚠️ Tendencia: 4 de 5 puntos fuera de 1 sigma";
        tipoAlerta = "warn";
    } else if(ochoConsecutivos) {
        mensaje = "⚠️ Tendencia: 8 puntos consecutivos del mismo lado";
        tipoAlerta = "warn";
    } else {
        mensaje = "✅ Proceso en control normal\n(No hay puntos fuera de los límites ni patrones anómalos)";
        tipoAlerta = "ok";
    }
    
    return { mensaje, tipoAlerta };
}

async function cargarDatos() {
    const caso = document.getElementById("caso").value;
    const url = `https://apidemo.geoeducacion.com.ar/api/testing/control/${caso}`;
    
    const res = await fetch(url);
    const data = await res.json();
    const valores = data.data[0].valores;
    const media = data.data[0].media;
    const lsc = data.data[0].lsc;
    const lic = data.data[0].lic;

    const labels = valores.map(v => v.x);
    const datos = valores.map(v => v.y);

    if (chart) chart.destroy();

    const ctx = document.getElementById('grafico').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Valores',
                    data: datos,
                    borderColor: 'blue',
                    fill: false
                },
                {
                    label: 'Media',
                    data: labels.map(() => media),
                    borderColor: 'green',
                    borderDash: [5,5],
                    fill: false
                },
                {
                    label: 'LSC',
                    data: labels.map(() => lsc),
                    borderColor: 'red',
                    borderDash: [5,5],
                    fill: false
                },
                {
                    label: 'LIC',
                    data: labels.map(() => lic),
                    borderColor: 'red',
                    borderDash: [5,5],
                    fill: false
                }
            ]
        }
    });

    const resultado = analizarDatos(valores, media, lsc, lic);
    let alerta = document.getElementById("alerta");
    alerta.className = ""; // limpiar clases previas
    alerta.classList.add(resultado.tipoAlerta);
    alerta.innerText = resultado.mensaje;
}
