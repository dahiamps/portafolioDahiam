//Rutinas para hablar con un servidor desde el cliente
//Rutinas para consumir un api con js puro

//Rutina pára hacer una peticion de tipo post

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
        //console.log(TOKEN);
        traerCanciones(TOKEN)
    })

function traerCanciones(token) {
    // //console.log(token);
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
    //   console.log(datos);
            // console.log(token);
            //console.log(datos.tracks);
            let pistas = datos.tracks;// arreglo de 10 elementos con informacion de mi artista
            // console.log(token);
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
        //pintar un div con la clase col
        let contenedorColumna = document.createElement("div");
        contenedorColumna.classList.add("col");

        // pintar un div con la clase card
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-100")

        //pintar una img con la clase card-img-top
        let foto = document.createElement("img");
        foto.classList.add("card-img-top");
        foto.src = pista.fotoAlbum;

        // pintar un div con la clase card-body
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



        //let p = document.createElement("p");
        //p.classList.add("card-text");
        //p.textContent=`Album`
        //h5.innerText("hola")
        // h1.textContent("Hola")
        //pintar el audio
        // let audio = document.createElement("audio");
        // audio.src = pista.Audio;

        /************************* */
        //necesito indicar que la foto va dentro de la tarjeta
        tarjeta.appendChild(foto);
        body.appendChild(h5);
        body.appendChild(h6);
        body.appendChild(h62);
        //body.appendChild(p);
        body.appendChild(audio);
        
        //necesito indicar que la tarjeta va dentro del contenedor columna
        contenedorColumna.appendChild(tarjeta);
        tarjeta.appendChild(body);
        //necesito indicar que el contenedor columna va dentro del contenedor contenedorPadre
        contenedorPadre.appendChild(contenedorColumna);


    })
}


// //1. url del servicio a consumir(Uri)¿PAra donde voy?
// const URL = "https://api.spotify.com/v1/artists/56n1NeXsTOOxjX3Z4lVMTJ/top-tracks?market=US";
// //2. Variable para almacenar token de acceso ¿Que permisos tengo?
// const TOKEN = "Bearer BQAsPP-odYG5-TjtmM6CGttrc8hRw5UOQCd6_AGvTZBAevS7_QEoaq0hhz1r2AfpdT4zkpnSzavHNFONvf-magApKn_TY8Iuv8y11-9OslCK1AwS7Ip1ww1e0orUQS-YyzmA-rbaGyG2";

// //3. Construir  la peticion al servidor¿Que voy a hacer, que datos de control llevo, llevo datos de usuario(Body)?

// let peticion = {
//     method: "GET",
//     headers: {
//         Authorization: TOKEN
//     }
// }
// //4. Ir al servidor(Con la funcion fetch)

// fetch(URL, peticion)
//     .then(function (respuesta) {
//         return (respuesta.json())
//     })
//     .then(function (datos) {
//         // console.log(datos);
//         // console.log(datos.tracks);
//         let pistas = datos.tracks;// arreglo de 10 elementos con informacion de mi artista

//         let datosFiltrados = pistas.map(function (pista) {

//             return ({
//                 nombre: pista.name,
//                 popularidad: pista.popularity,
//                 Audio: pista.preview_url,
//                 nombreAlbum: pista.album.name,
//                 fotoAlbum: pista.album.images[0].url


//             });
//         });
        // console.log(pistas);
//         console.log(datosFiltrados);
//         // let cancion = document.getElementById("cancion1");
//         // cancion.src=datosFiltrados[5].Audio

//         // console.log(datos.tracks[5]);
//         // console.log(datos.tracks[5].artists[0].name);
//         // console.log(datos.tracks[5].name);
//         // console.log(datos.tracks[5].preview_url);
//         // console.log(datos.tracks[5].album.images[0].url);
//         // console.log(datos.tracks[5].album.images[1].url);
//         // console.log(datos.tracks[5].album.images[2].url);
//         // imagen = "datos.tracks[5].album.images[0].url";
//         // musica.src = "datos.tracks[5].preview_url"
//     })




// // hacer 