let chart;

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

    // Mostrar alerta según caso
    let mensaje = "";
    switch(parseInt(caso)) {
        case 1: mensaje = "⚠️ Situación FUERA DE CONTROL"; break;
        case 2: mensaje = "✅ Proceso en control normal"; break;
        case 3: mensaje = "⚠️ Tendencia: 2 de 3 puntos fuera de 2 sigmas"; break;
        case 4: mensaje = "⚠️ Tendencia: 4 de 5 puntos fuera de 1 sigma"; break;
        case 5: mensaje = "⚠️ Tendencia: 8 puntos consecutivos del mismo lado"; break;
    }
    document.getElementById("alerta").innerText = mensaje;
}