window.addEventListener('load', function(){
    let formulario=document.querySelector('#registros');
    formulario.addEventListener("submit",function(evento){
        let errores=[];
        let nombre=document.querySelector("#nombrePersona");
        if(nombre.value.trim()==""){                
            errores.push("el campo nombre es obligatorio")
        } else {
            if(nombre.value.length<2)
            {
            errores.push("El campo nombre debe contener al menos 2 caracteres");
            }
        }
        let apellido=document.querySelector("#apellido");
        if(apellido.value.trim()==""){                
            errores.push("el campo apellido es obligatorio");
        } else {
            if(apellido.value.length<2)
            {
            errores.push("El campo apellido debe contener al menos 2 caracteres");
            }
        }
        let email=document.querySelector("#email");
        if(email.value.trim()=="" || email.value.indexOf("@")==-1 || email.value.indexOf(".")==-1){                
            errores.push("El campo email esta incompleto");
        }
        let contrasenia=document.querySelector("#password");
        if(contrasenia.value.trim()==""){                
            errores.push("La contraseña es obligatoria");
        } else {
            if(contrasenia.value.length<8)
            {
            errores.push("La contrasenia debe contener al menos 8 caracteres");
            }
        }
        let imagen=document.querySelector('#fileImage').value;
        if(imagen!=""){  
            if(imagen.includes(".jpg") || imagen.includes(".jpeg")||imagen.includes(".png")||imagen.includes(".gif")){
            } else errores.push("El formato de la imagen es invalido");         
        } 
        if(errores.length>0){
            evento.preventDefault()
        }
        let ulErrores=document.querySelector("div .errores ul");
        for( let a = 0; a<errores.length ;a++){
            ulErrores.innerHTML+="<li>" + errores[a] + "</li>";
        }
    })
})