Estadística y Probabilidades: Gráficos de Control

Este proyecto corresponde a la materia **Estadística y Probabilidades**  
de la **Tecnicatura Superior en Desarrollo de Software**.  

El objetivo es **construir una página web en HTML5, CSS y JavaScript** que consuma datos de una API  
y muestre un **Gráfico de Control** con sus límites, la media y las muestras recolectadas.  

---

## 🚀 Funcionalidades
- 📡 **Consumo de API REST** con `fetch` (GET).  
- 📊 **Gráfico interactivo** con [Chart.js](https://www.chartjs.org/).  
- 🎚️ **Selector de casos (1 a 5)** para simular distintas situaciones.  
- ⚠️ **Alertas visuales** de anomalías (fuera de control o con tendencias).  
- 🎨 **Diseño responsivo y colores** para diferenciar estado normal, tendencia y fuera de control.  

---

## 🧩 Casos simulados
Los datos se obtienen desde:

https://apidemo.geoeducacion.com.ar/api/testing/control/%7Bn%7D

Donde `{n}` puede ser un valor entre **1 y 5**:

1. 🔴 **Fuera de control**  
2. 🟢 **Normal**  
3. 🟠 **Tendencia**: 2 de 3 puntos fuera de 2 sigmas  
4. 🟠 **Tendencia**: 4 de 5 puntos fuera de 1 sigma  
5. 🟠 **Tendencia**: 8 puntos consecutivos del mismo lado de la media  
