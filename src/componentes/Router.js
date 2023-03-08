import { adminUser } from "../vistas/AdminUser.js";
import { home } from "../vistas/Home.js"
import { registro } from "./Registro.js";
import { usuarios } from "./Usuario.js";
import { v4 as uuidv4 } from 'uuid';
import multiavatar from '@multiavatar/multiavatar/esm'
import { editarPerfil } from "./EditarPerfil.js";
import { login } from "../vistas/Login.js";

export const router = {
    home: ()=>{
        document.querySelector('main').innerHTML = home.template;
        home.script()
    },
    //inyectamos las targetas para el formulario de editar
    admin: ()=>{
        document.querySelector('main').innerHTML = 
        `<div class="d-flex">
            <div class="tabla d-flex"></div>
            <div class="registro ps-5"></div>      
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="formEditar">
                    </form>
                    <div id="avatarE" class="w-50 ps-5 pb-4"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        `

        document.querySelector('.tabla').innerHTML = adminUser.template
        adminUser.script()
        document.querySelector('.registro').innerHTML = registro.template
        registro.script()
        
    },
    about: ()=>{
        document.querySelector('main').innerHTML = `<h1>About</h1>`

    },
    login: ()=>{
        document.querySelector('main').innerHTML = login.template;
        login.script()
    },
    //eliminar usuarios
    eliminar: (evento)=>{
        let usarioId = evento.target.dataset.id
        alert("Estás borrando el usuario con id: " + usarioId)
        const trId = document.getElementById(usarioId); 
        console.log(trId)
        trId.classList.add('fila-oculta')

    },
    //editar usuarios
    editar: (evento)=>{
        document.querySelector('#formEditar').innerHTML = editarPerfil.template
        editarPerfil.script()
        let usarioId = evento.target.dataset.id
        usuarios.forEach(usuario => {
            if(usuario.id == usarioId){
                document.getElementById('id').value=usuario.id 
                document.getElementById('nickE').value=usuario.nick
                document.getElementById('emailE').value=usuario.email
                document.getElementById('passwordE').value=usuario.password
                let svgCode = multiavatar(usuario.nick)
                document.querySelector('#avatarE').innerHTML = svgCode
            }
        });
    },
    //control del formulario de registrarse
    editarEnviar: (evento)=>{
        evento.preventDefault()

        var id = document.getElementById('id').value;
        //coger el valor del imput
        const inputNick = document.querySelector("#nickE").value
        const inputContraseña = document.querySelector("#passwordE").value
        const inputemail = document.querySelector("#emailE").value
        //buscar el usario mediante su ID
        const posicionUsuario = usuarios.findIndex(usuario=>usuario.id == id)
        const usuarioId = usuarios.find(usuario=>usuario.id == id) 
        //asigna en cada propiedad su valor
        usuarios[posicionUsuario].nick = inputNick
        usuarios[posicionUsuario].password = inputContraseña
        usuarios[posicionUsuario].email = inputemail
        

        // Selecciono la fila que deseas actualizar
        var row = document.getElementById(usuarioId.id);

        // Modifico los valores de las celdas
        row.cells[0].innerHTML = usuarioId.id;
        row.cells[1].innerHTML = inputNick;
        row.cells[2].innerHTML = inputemail;
        row.cells[3].innerHTML = inputContraseña;

        //Reemplazo la fila antigua con la fila modificada en su posición original
        var parent = row.parentNode;
        var nextSibling = row.nextSibling;
        parent.removeChild(row);
        parent.insertBefore(row, nextSibling);
                
    },
    añadir:(evento)=>{
        const inputNick = document.querySelector("#nick").value
        const inputContraseña = document.querySelector("#password").value
        const inputemail = document.querySelector("#email").value
        evento.preventDefault()

        const usuarioNuevo = 
            {
                nick:inputNick,
                email:inputemail,
                password: inputContraseña
            }
        

        let idNuevo = uuidv4() //libreria para id aleatoria
        usuarioNuevo.id = idNuevo
        usuarios.push(usuarioNuevo);

        var table = document.getElementById("cuerpoTabla");

        // Creo una nueva fila y celdas
        var tr = document.createElement("tr");
        tr.setAttribute("id", idNuevo);

        tr.innerHTML = `
        <th class="px-5">${usuarioNuevo.id}</th>
        <td class="px-5">${usuarioNuevo.nick}</td>
        <td class="px-5">${usuarioNuevo.email}</td>
        <td class="px-5">${usuarioNuevo.password}</td>
        <td class="px-5"><button data-id="${usuarioNuevo.id}" type="button" class="btn btn-danger eliminar" >Eliminar</button></td>
        <td class="px-5"><button data-id="${usuarioNuevo.id}" type="button" class="btn btn-info editar"  data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button></td>
        </tr>
        `

        console.log(tr)

        // Agrega la fila a la tabla

        table.appendChild(tr); //añadir fila

    },
    avatar:(evento)=>{ //genarar avatar
        let svgCode = multiavatar(evento.target.value)
        document.querySelector('#avatar').innerHTML = svgCode
    }
}