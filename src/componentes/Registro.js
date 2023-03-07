import { router } from "./Router"
//Formulario para registrarse
export const registro = {
    template:`
    <h1 class="pb-3">Regristo</h1> 
    <form id="form2" class="needs-validation" novalidate>
        <div class="mb-3">
            <label for="nick" class="form-label">Nick:</label>
            <input id="nick" type="text" class="form-control w-50 nick" required pattern="[A-Z_]{1,10}">
            <!-- mensaje si valida -->
            <div class="valid-feedback">Todo estupendo</div>
            <!-- mensaje si no valida -->
            <div class="invalid-feedback">Solo mayusculas, del 1 y 10, no espacios y solo _</div>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control w-50" id="email" value="" required>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control w-50" id="password" required maxlength="16" minlength="6">
            <!-- mensaje si valida -->
            <div class="valid-feedback">Todo estupendo</div>
            <!-- mensaje si no valida -->
            <div class="invalid-feedback">Minimo 6 y maximo 16</div>
        </div>
        <div id="avatar" class="w-25"></div>
        <button id="enviar" type="submit" class="btn btn-primary">Registrarse</button>
    </form>
    `,
    script: ()=>{
        //detactamos el id enviar del boton
        const botonRegistro=document.querySelector("#enviar")
        //escuchamos el evento click y añadimos el elemento
        botonRegistro.addEventListener("click", router.añadir)
        //seleccionamos los inputs
        const input = document.querySelector("input")
        //añadimos el evento keydown, comprovamos si tiene la clase nick. Si es true, añade el avatar
        input.addEventListener("keydown",(event)=>{
            if(event.target.classList.contains('nick')){
                router.avatar(event)
            }
        })     
        
        // //validacion
        document.querySelector('#nick').classList.add('was-validated');
        // para form2
        document.querySelector('#enviar').addEventListener('click', (e)=>{
            e.preventDefault();
            console.log('validandooooo');
            //Añadimos la clase was-validated para que se muestre la validación de boostrap
            document.querySelector('#form2').classList.add('was-validated');
            if(form2.checkValidity()){
                form2.classList.remove('was-validated')
            }
        });
    }
}