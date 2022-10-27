document.addEventListener("DOMContentLoaded", function() {
    obtenerdatos();
    limpiardatos();
});

function obtenerdatos(){
    const btn = document.querySelector("#boton");
    btn.addEventListener("click", function(e)
    {
        const monto = document.querySelector("#monto").value;
        const anio = document.querySelector("#anio").value;
        if(monto != "")
        {
            if(document.querySelector("#alertMonto") != null)
            {
                eliminarAlerta("alertMonto");
            }
            if(anio != "")
            {
                if(document.querySelector("#alertAnio") != null)
                {
                    eliminarAlerta("alertAnio");
                }
                const div_datos = document.querySelector(".datos");
                let denominador = 0;
                for(let j=1; j<=anio;j++)
                {
                    denominador += j;
                }
                for(let i=anio; 1 <= i; i--)
                {
                    let p_anio = document.createElement("p");
                    let p_monto = document.createElement("p");
                    p_anio.id = "anio_mostrando";
                    p_monto.id = "monto_mostrando";
                    p_anio.textContent = i;
                    p_monto.textContent = monto*(i/denominador);
                    div_datos.appendChild(p_anio);
                    div_datos.appendChild(p_monto);
                }
            }
            else
            {
                crearAlerta("error", "No hay una cantidad de años", "alertAnio");
            }
        }
        else
        {
            crearAlerta("error", "No hay monto numerico", "alertMonto");
        }
    })
}

function limpiardatos(){
    const btnlimpiar = document.querySelector("#btn-limpiar");
    btnlimpiar.addEventListener("click", function(){
        const monto = document.querySelector("#monto");
        const anio = document.querySelector("#anio");
        const anio_mostrando = document.querySelectorAll("#anio_mostrando");
        const monto_mostrando = document.querySelectorAll("#monto_mostrando");
        monto.value = "";
        anio.value = "";
        monto_mostrando.forEach(monto => {
            monto.remove();
        });
        anio_mostrando.forEach(anio => {
            anio.remove();
        });
        if(document.querySelector("#alertMonto") != null)
        {
            eliminarAlerta("alertMonto");
        }
        if(document.querySelector("#alertAnio") != null)
        {
            eliminarAlerta("alertAnio");
        }
    })
}

function crearAlerta(tipo, mensaje, alerta){
    const div_alertas = document.querySelector("#alertas");
    const p = document.createElement("p");
    p.id = alerta;
    p.className = tipo;
    p.textContent = mensaje;
    div_alertas.appendChild(p);
}

function eliminarAlerta(alerta){
    let p_alerta = document.querySelector(`#${alerta}`);
    p_alerta.remove();
}