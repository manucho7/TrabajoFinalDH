window.addEventListener('load', function(){
    let formulario=document.querySelector('#iniciar');
    formulario.addEventListener("submit",function(evento){
        let errores=[];
        let email=document.querySelector("#email").value;
        if(email.trim()=="" || email.indexOf("@")==-1 || email.indexOf(".")==-1){                
            errores.push("El campo email esta incompleto");
        }
        let password=document.querySelector("#password").value;
        if(password.trim()==""){                
            errores.push("La contraseña es obligatoria");
        } else {
            if(password.length<8)
            {
            errores.push("La contrasenia debe contener al menos 8 caracteres");
            }
        }
        if(errores.length>0){
            evento.preventDefault()
        }
        let ulErrores=document.querySelector("div .erroresLogin ul");
        for( let a = 0; a<errores.length ;a++){
            ulErrores.innerHTML+="<li>" + errores[a] + "</li>";
        }
    });
})