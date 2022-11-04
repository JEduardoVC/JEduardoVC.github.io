document.addEventListener("DOMContentLoaded", function() {
    depreciacion();
    triangulopascal();
    conversion()
});

function depreciacion(){
    obtenerdatos();
    limpiardatos();
}

function triangulopascal(){
    obtenerfilas();
    limpiarPascal();
}

function conversion(){
    obtenerConversion();
    limpiarConversion();
}

function obtenerdatos(){
    const btn = document.querySelector("#boton");
    if(btn != undefined)
    {
        btn.addEventListener("click", function()
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
    
}

function limpiardatos(){
    const btnlimpiar = document.querySelector("#btn-limpiar");
    if(btnlimpiar != undefined)
    {
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
}

function obtenerfilas()
{
    const btn = document.querySelector("#btn_crear");
    if(btn != undefined)
    {
        btn.addEventListener("click", function(){
            const num_filas = document.querySelector("#num_filas").value;
            if(num_filas != "")
            {
                if(document.querySelector("#filas") != null)
                {
                    eliminarAlerta("filas");
                }
                const div_triangulo = document.querySelector(".triangulo");
                const triangulo = trianguloPascal(num_filas);
                const div_renglon = document.createElement("div");
                div_renglon.className = "text-center";
                div_renglon.id = "triangulo-contenido";
                for(let i = 0 ; i < num_filas ; i++)
                {
                    const renglon = document.createElement("p");
                    let contenido = "";
                    for(let j = 0 ; j <= i ; j++)
                    {
                        contenido += triangulo[i][j]
                        contenido += "  ";
                    }
                    renglon.textContent = contenido;
                    div_renglon.appendChild(renglon);
                }
                div_triangulo.appendChild(div_renglon);
            }
            else
            {
                crearAlerta("error","No hay un numero de filas para realizar el ejercicio", "filas");
            }
        })
    }
}

function trianguloPascal(n) {

    resultado=[[1], [1, 1]];
    for (let l=3; l<=n; l++) {
        resultado.push(
            [...Array(l)].map((el, i, a) =>

                i==0 || i==a.length-1 ? 1 : resultado[l-2][i-1]+resultado[l-2][i]
            )
        );
    }
    return resultado;
}

function limpiarPascal(){
    const btnlimpiar = document.querySelector("#limpiarPascal");
    if(btnlimpiar != undefined)
    {
        btnlimpiar.addEventListener("click", function(){
            const div_renglon = document.querySelectorAll("#triangulo-contenido");
            div_renglon.forEach(parrafo => {
                parrafo.remove();
            })
            const num_filas = document.querySelector("#num_filas");
            num_filas.value = "";
            if(document.querySelector("#filas") != null)
            {
                eliminarAlerta("filas");
            }
        })
    }
}

function obtenerConversion(){
    const btn = document.querySelector("#convertir");
    if(btn != undefined)
    {
        btn.addEventListener("click", function(){
            let numero = document.querySelector("#numero").value;
            if(numero)
            {
                if(document.querySelector("#sinnumero") != null)
                {
                    eliminarAlerta("sinnumero");
                }
                cantidad_numeros = numero.length;
                let unidad;
                let decena;
                let centena;
                let num;
                let texto;
                let texto_irregular;
                let texto_mil;
                switch(cantidad_numeros){
                    case 1:
                         texto = unidades(parseInt(numero));
                         imprimirLetras(texto);
                        break;
                    case 2:
                        if(numerosIrregulares(numero)){
                            switch(numero){
                                case "11":
                                    texto = "once";
                                    break;
                                case "12":
                                    texto = "doce";
                                    break;
                                case "13":
                                    texto = "trece";
                                case "14":
                                    texto = "quince";
                                    break;
                                case "15":
                                    texto = "quince";
                                    break;
                                }
                        }
                        else
                        {
                            unidad = numero % 10;
                            decena = (numero % 100) - unidad;
                            texto = existeDecena(decena) ? decenas(decena) : "";
                            texto += existeUnidad(unidad) ? " y " + unidades(unidad) : "";
                        }
                        imprimirLetras(texto);
                        break;
                    case 3:
                        texto = obtenerNumeroIrregulares(numero);
                        imprimirLetras(texto);
                        break;
                    case 4:
                        texto = obtenerNumeroIrregulares(numero);
                         num = numero / 1000;
                         num = Math.trunc(num);
                         texto_mil = miles(num);
                         texto = texto_mil + texto;
                         imprimirLetras(texto);
                        break;
                    case 5:
                        texto = obtenerNumeroIrregulares(numero);
                        num = numero / 1000;
                        num = Math.trunc(num);
                        texto_mil = miles(num);
                        texto = texto_mil + texto;
                        imprimirLetras(texto);
                        break;
                    case 6:
                        texto = obtenerNumeroIrregulares(numero);
                        num = numero / 1000;
                        num = Math.trunc(num);
                        texto_mil = miles(num);
                        texto = texto_mil + texto;
                        imprimirLetras(texto);
                        break;
                    case 7:
                        texto = obtenerNumeroIrregulares(numero);
                        let millon;
                        millon = numero / 1000000;
                        millon = Math.trunc(millon);
                        let texto_millon = obtenerMillones(millon);
                        num = numero / 1000;
                        n = num - parseInt(millon + "000");
                        num = Math.trunc(n);
                        texto_mil = miles(num);
                        texto = texto_millon + texto_mil + texto;
                        imprimirLetras(texto);
                        break;
                }           
            }
            else{
                crearAlerta("error","No ha anotado el numero a convertir", "sinnumero");
            }
        })
    }
}
function unidades(unidad){
    switch(unidad){
        case 1: 
            return "uno";
        case 2: 
            return "dos";
        case 3: 
            return "tres";
        case 4: 
            return "cuatro";
        case 5: 
            return "cinco";
        case 6: 
            return "seis";
        case 7: 
            return "siete";
        case 8: 
            return "ocho"; 
        case 9: 
            return "nueve";   
    }
}

function decenas(decena){
    switch(decena){
        case 10: 
            return "diez";
        case 20: 
            return "veinte";
        case 30: 
            return "treinta";
        case 40: 
            return "cuarenta";
        case 50: 
            return "cincuenta";
        case 60: 
            return "sesenta";
        case 70: 
            return "setenta";
        case 80: 
            return "ochenta"; 
        case 90: 
            return "noventa";   
    }
}

function centenas(centena){
    switch(centena){
        case 100: 
            return "cien";
        case 200: 
            return "doscientos";
        case 300: 
            return "trescientos";
        case 400: 
            return "cuatrocientos";
        case 500: 
            return "quinientos";
        case 600: 
            return "seiscientos";
        case 700: 
            return "setecientos";
        case 800: 
            return "ochocientos"; 
        case 900: 
            return "novecientos";
        default:
            return "ciento";
    }
}

function obtenerMillones(millon){
    switch(millon){
        case 1: 
        return "un millon ";
    case 2: 
        return "dos millones ";
    case 3: 
        return "tres millones ";
    case 4: 
        return "cuatro millones ";
    case 5: 
        return "cinco millones ";
    case 6: 
        return "seis millones ";
    case 7: 
        return "siete millones ";
    case 8: 
        return "ocho millones "; 
    case 9: 
        return "nueve millones ";   
    }
}

function imprimirLetras(texto){
    const div_principal = document.querySelector("#letras");
    const parrafo = document.createElement("p");
    parrafo.classList = "text-letras text-center"
    parrafo.textContent = texto;
    parrafo.id = "mostrar-texto"
    div_principal.appendChild(parrafo);
}

function miles(num){
    let texto_mil;
    let texto;
    let unidad;
    let decena;
    switch(num.toString().length)
    {
        case 1:
            if(num == 1){
                texto_mil = existeUnidad(Math.trunc(num)) ? "mil " : "";
            }
            else
            {
                texto_mil = existeUnidad(Math.trunc(num)) ? unidades(Math.trunc(num)) + " mil " : "";
            }
            break;
        case 2:
            if(numerosIrregulares(num)){
                switch(num){
                    case "11":
                        texto = "once";
                        break;
                    case "12":
                        texto = "doce";
                        break;
                    case "13":
                        texto = "trece";
                    case "14":
                        texto = "quince";
                        break;
                    case "15":
                        texto = "quince";
                        break;
                    }
            }
            else
            {
                unidad = num % 10;
                decena = (num % 100) - unidad;
                texto = existeDecena(decena) ? decenas(decena) : "";
                texto += existeUnidad(unidad) ? " y " + unidades(unidad) : "";
            }
            texto_mil = texto + " mil ";
            break;
        case 3:
            texto = obtenerNumeroIrregulares(num);
            texto_mil = texto + " mil ";
            break;
    }

    return texto_mil;
}

function obtenerNumeroIrregulares(numero)
{
    let decena;
    let centena;
    let texto_irregular;
    let texto;
    decena = numero % 100;
                    if(numerosIrregulares(decena)){
                        switch(decena){
                            case 11:
                                texto_irregular = "once";
                                break;
                            case 12:
                                texto_irregular = "doce";
                                break;
                            case 13:
                                texto_irregular = "trece";
                            case 14:
                                texto_irregular = "catorce";
                                break;
                            case 15:
                                texto_irregular = "quince";
                                break;
                        }
                        centena = (numero % 1000) - decena;
                        if(centena == 100){
                            texto = "ciento ";
                        }
                        else{
                            texto = centenas(centena) + " ";
                        }
                        texto += texto_irregular;
                    }
                    else if(numero == "100"){   
                        texto = centenas(parseInt(numero));
                    }
                    else
                    {
                        centena = (numero % 1000) - decena;
                        if(centena == 100){
                            texto = "ciento ";
                            texto_irregular = obtenerCentasLetras(numero, false);
                        }
                        else{
                            texto = obtenerCentasLetras(numero);
                            texto_irregular = "";
                        }
                        texto += texto_irregular;
                    }
                    return texto;
}

function numerosIrregulares(numero){
    if(numero == 11 || numero == 12 || numero == 13 || numero == 14 || numero == 15){
        return true
    }
    return false;
}

function obtenerCentasLetras(numero_convertir, haycentena = true)
{
    let texto;
    let unidad;
    let decena;
    let centena;
    unidad = numero_convertir % 10;
    decena = (numero_convertir % 100) - unidad;
    if(haycentena)
    {
        centena = (numero_convertir % 1000) - decena - unidad;
        texto = existeCentena(centena) ? centenas(centena) + " " : "";
    }
    else{
        texto = existeCentena(centena) ? "" + "" : "";
    }
    texto += existeDecena(decena) ?  decenas(decena) + " y " : "";
    texto += existeUnidad(unidad) ? unidades(unidad) : "";
    return texto;
}

function unidadesMillar(unidadeMillar){
    switch(unidadeMillar){
        case 1000: 
            return "Mil";
        case 2000:
        case 3000:
        case 4000:
        case 5000:
        case 6000:
        case 7000:
        case 8000:
        case 9000:
            return "mil";
  
    }
}

function obtenermiles(numero){
    let unidad;
    let decena;
    let centena;
    if(numero%10)
    {
        unidad = numero % 10;
        decena = (numero % 100) - unidad;
        centena = (numero % 1000) - decena - unidad;
    }
    else
    {
        decena = (numero % 100);
        centena = (numero % 1000) - decena;
    }
}

function existeUnidad(numero){
    if(numero != 0){
        return true;
    }
    return false;
}
function existeDecena(numero){
    if(numero != 0){
        return true;
    }
    return false;
}
function existeCentena(numero){
    if(numero != 0){
        return true;
    }
    return false;
}
function limpiarConversion()
{
    const btnlimpiar = document.querySelector("#eliminar_letras");
    if(btnlimpiar != undefined){
        btnlimpiar.addEventListener("click", function(){
            let parrafo = document.querySelector("#mostrar-texto");
            const input = document.querySelector("#numero");
            input.value = "";
            parrafo.remove();
            if(document.querySelector("#sinnumero") != null)
            {
                eliminarAlerta("sinnumero");
            }
        })
    }
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