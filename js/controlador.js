const URLPOST = "https://accounts.spotify.com/api/token"

let llave1 = "grant_type=client_credentials";
let llave2 = "client_id=8fe5574633ba401889f0743b286dc0dc";
let llave3 = "client_secret=831abeb1266c421c9652495c706f13f6";
let peticionPOST = {
    method: "POST",
    headers: { "Content-Type": 'application/x-www-form-urlencoded' },
    body: llave1 + '&' + llave2 + '&' + llave3
}

fetch(URLPOST, peticionPOST)
    .then(function (respuesta) {
        return (respuesta.json())
    })
    .then(function (datos) {
        console.log(datos)
        const TOKEN = datos.token_type + ' ' + datos.access_token;
        
        traerCanciones(TOKEN)
    })

function traerCanciones(token) {
    
    const URL = "https://api.spotify.com/v1/artists/56n1NeXsTOOxjX3Z4lVMTJ/top-tracks?market=US";
    let peticion = {
        method: "GET",
        headers: {
            Authorization: token
        }
    }
    fetch(URL, peticion)
        .then(function (respuesta) {
            return (respuesta.json())

        })
        .then(function (datos) {
            depurarDatos(datos);
        }
        )


}
function depurarDatos(datos) {
            let pistas = datos.tracks;
    
            let datosFiltrados = pistas.map(function (pista) {

                return ({
                    nombre: pista.name,
                    popularidad: pista.popularity,
                    Audio: pista.preview_url,
                    nombreAlbum: pista.album.name,
                    fotoAlbum: pista.album.images[0].url


                });
            });
    console.log(datosFiltrados);
    pintarDatos(datosFiltrados);
}

function pintarDatos(datosFiltrados) {
    let contenedorPadre=document.getElementById("contenedorpadre");
    console.log(datosFiltrados);
    datosFiltrados.map(function (pista) {
        
        let contenedorColumna = document.createElement("div");
        contenedorColumna.classList.add("col");

        
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-100")

        
        let foto = document.createElement("img");
        foto.classList.add("card-img-top");
        foto.src = pista.fotoAlbum;

        
        let body = document.createElement("div");
        body.classList.add("card-body");


        let p = document.createElement("p");
        p.classList.add("card-text");


        
        let audio = document.createElement("audio");
        audio.src = pista.Audio;
        audio.controls = true;
            
        let h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.textContent = `Nombre: ${pista.nombre}`;
        
        let h6 = document.createElement("h6");
        h6.textContent = `Album: ${pista.nombreAlbum}`;


        let h62 = document.createElement("h6");
        h62.textContent = `Popularidad: ${pista.popularidad}`;



       
        tarjeta.appendChild(foto);
        body.appendChild(h5);
        body.appendChild(h6);
        body.appendChild(h62);
        
        body.appendChild(audio);
        
        
        contenedorColumna.appendChild(tarjeta);
        tarjeta.appendChild(body);
        
        contenedorPadre.appendChild(contenedorColumna);


    })
}

