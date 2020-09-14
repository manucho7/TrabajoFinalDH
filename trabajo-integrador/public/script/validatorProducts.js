window.addEventListener('load', function(){
    let formulario = document.querySelector(".formProduct")
    formulario.addEventListener("submit", function(evento){
        let errores = [];
        let titulo = document.querySelector("#nombre-producto").value;
        
            if(titulo.trim().length < 5){
                errores.push("el titulo del producto debe tener 5 o mas caracteres")
            }


        let descripcion = document.querySelector(".textarea").value;
        if(descripcion.trim().length < 20){
            errores.push("La descripcion debe contener al menos 20 caracteres");
        }

        let imagen=document.querySelector('#img').value;
        if(imagen!=""){  
            if(imagen.includes(".jpg") || imagen.includes(".jpeg")||imagen.includes(".png")||imagen.includes(".gif")){
            } else errores.push("El formato de la imagen es invalido");
        }

        if(errores.length > 0){
            evento.preventDefault();
        }
        let ulErrores=document.querySelector("div .errores ul");
        for( let a = 0; a<errores.length ;a++){
            ulErrores.innerHTML+="<li>" + errores[a] + "</li>";
        }
    })
})