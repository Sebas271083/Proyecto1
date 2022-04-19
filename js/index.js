//Variables

const btnEnviar = document.querySelector('#enviar');
const btnReser = document.querySelector('#boton-reset');
const formulario = document.querySelector('#enviar-mail');

//Vaciar campos

const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const telefono = document.querySelector('#telefono');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


eventListener();

function eventListener(){
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del formulario
    nombre.addEventListener('blur', validarFormulario)
    apellido.addEventListener('blur', validarFormulario)
    telefono.addEventListener('blur', validarFormulario)
    email.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)


    //Enviar Email

    formulario.addEventListener('submit', enviarEmail)

     //Reinicia el formulario

    btnReser.addEventListener('click', resetearFormulario);
}

//Funciones

function iniciarApp() {
    btnEnviar.disable= true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//Validar el formulario

function validarFormulario(e){


    if (e.target.value.length > 0) {

        //Elimina los errores...
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        
        e.target.classList.remove('bg-danger')
        e.target.classList.add('bg-success', 'p-2', 'text-dark', 'bg-opacity-10')

    } else{
        e.target.classList.remove('bg-success', 'p-2', 'text-dark', 'bg-opacity-10')
        e.target.classList.add('bg-danger')

        mostrarError('Todos los campos son obligatorios');
    }
    if (e.target.type === 'email'){
        

        if(er.test(e.target.value)){
            //Elimina los errores
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            e.target.classList.remove('bg-danger')
            e.target.classList.add('bg-success', 'p-2', 'text-dark', 'bg-opacity-10')
    
        } else{
            e.target.classList.remove('bg-success', 'p-2', 'text-dark', 'bg-opacity-10')
            e.target.classList.add('bg-danger')
    
            mostrarError('Email no valido');
        }
    }

    if(er.test(email.value) && nombre.value !== '' && apellido.value !== '' && telefono.value !== ''){
        btnEnviar.disable= false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    } 
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje
    
    mensajeError.classList.add('bg-danger', 'mt-5', 'text-light')

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0){
    formulario.appendChild(mensajeError);
    }

    setTimeout(()=>{
        mensajeError.remove(); //Elimina el mensaje de error
    }, 2000)
}

//Envia el Email

function enviarEmail(e){
    e.preventDefault();
    if(er.test(email.value) && nombre.value !== '' && apellido.value !== '' && telefono.value !== '') {

            //Mensaje que dice que se envio correctamente

            const parrafo = document.createElement('p');
            parrafo.textContent = 'El mensaje se envio correctamente';
            parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-success', 'mt-3', 'text-white', 'font-bold', 'uppercase')


            //Inserta el parrafo antes del spinner
            formulario.appendChild(parrafo)

            setTimeout(()=>{
                parrafo.remove(); //Elimina el mensaje de enviado
                resetearFormulario();
            }, 2000)
    }
}

//Funcion que resetea el formulario

function resetearFormulario(){
    formulario.reset();
    iniciarApp();
}

