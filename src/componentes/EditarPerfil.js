import { router } from "./Router"
import multiavatar from '@multiavatar/multiavatar/esm'

//Formulario para modificar el perfil del usuario
export const editarPerfil = {
    template:`
    <h2>Editar Perfil</h2>
    <form id="formEditar">
        <input type="hidden" id="id">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nick</label>
            <input type="text" class="form-control nicke" id="nickE" aria-describedby="nick">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input type="text" class="form-control" id="emailE" aria-describedby="email">
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="passwordE">
        </div>
        <div id="avatar" class="w-50"></div>
        <button type="submit" class="btn btn-primary enviarEditar">Editar</button>
    </form>
    `,
    script:()=>{
        console.log('hola, soy editarPerfil')
        
        const main = document.querySelector("main")
        //detectamos el evento click y comprovamos si tiene la clase enviarEditar. SI es true, cargará el router correspondiente
        main.addEventListener("click",(event)=>{
            if(event.target.classList.contains('enviarEditar')){
                router.editarEnviar(event)
            }
        })
        //Detectamos si el usuario está tecleando. Si es así, comprovamos si tiene esa clase y genera un avatar random (mediante el texto introducido)
        main.addEventListener("keydown",(event)=>{
            console.log("aaa")
            if(event.target.classList.contains('nicke')){
                let svgCode = multiavatar(event.target.value)
                document.querySelector('#avatarE').innerHTML = svgCode
            }
        })        
    }
}