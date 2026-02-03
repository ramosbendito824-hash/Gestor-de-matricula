const cursos = {
    tecnicos: [
        'Técnico Laboral en Auxiliar Administrativo',
        'Técnico Laboral en Auxiliar Contable',
        'Técnico Laboral en Gestión Empresarial',
        'Técnico Laboral en Auxiliar de Talento Humano',
        'Técnico Laboral en Mercadeo y Ventas',
        'Técnico Laboral en Auxiliar de Producción Gráfica (Diseño Gráfico)',
        'Técnico Laboral en Sistemas',
        'Técnico Laboral en Instalador de Sistemas de Refrigeración Comercial e Industrial',
        'Técnico Laboral en Auxiliar de Primera Infancia',
        'Técnico Laboral en Auxiliar de Enfermería',
        'Técnico Laboral en Seguridad y Salud en el Trabajo',
        'Técnico Laboral en Auxiliar de Farmacia',
        'Técnico Laboral en Visitador Médico'
    ],
    academicos: [
        'Validación por Ciclos (Primaria y Bachillerato)',
        'Conocimientos Académicos en Inglés - Nivel A1',
        'Conocimientos Académicos en Inglés - Nivel A2',
        'Conocimientos Académicos en Inglés - Nivel B1',
        'Conocimientos Académicos en Inglés - Nivel B2'
    ],
    cortos: [
        'Curso de Vigilancia Privada',
        'Seminario de Ejercicio Práctico de Tiro',
        'Fundamentación en Vigilancia y Seguridad Privada',
        'Curso de Primeros Auxilios',
        'Curso de Atención al Cliente',
        'Curso de Ofimática',
        'Curso Básico de Sistemas',
        'Curso de Marketing Digital',
        'Curso de Emprendimiento',
        'Curso de Manipulación de Alimentos',
        'Curso de Seguridad Industrial',
        'Curso de Belleza / Estética'
    ]
};

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const selectCursos = document.getElementById('cursos');
const selectHorarios = document.getElementById('horarios');
const inputFechaInicio = document.getElementById('fechaInicio');
const btnGenerar = document.getElementById('btnGenerar');
const btnCopiar = document.getElementById('btnCopiar');
const mensajeSection = document.getElementById('mensajeSection');
const mensajeTexto = document.getElementById('mensajeTexto');
const alertaCopia = document.getElementById('alertaCopia');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        checkboxes.forEach(cb => {
            if (cb !== this) {
                cb.checked = false;
            }
        });
        actualizarSelect();
    });
});

function actualizarSelect() {
    selectCursos.innerHTML = '';
    const checkboxMarcado = Array.from(checkboxes).find(cb => cb.checked);
    
    if (!checkboxMarcado) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = '-- Selecciona una categoría --';
        selectCursos.appendChild(option);
        return;
    }
    
    const optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.textContent = '-- Selecciona un programa --';
    selectCursos.appendChild(optionDefault);
    
    const categoria = checkboxMarcado.value;
    cursos[categoria].forEach(curso => {
        const option = document.createElement('option');
        option.value = curso;
        option.textContent = curso;
        selectCursos.appendChild(option);
    });
}

btnGenerar.addEventListener('click', function() {
    const cursoSeleccionado = selectCursos.value;
    const horarioSeleccionado = selectHorarios.value;
    const fechaInicio = inputFechaInicio.value;

    // Validar que todos los campos estén completos
    if (!cursoSeleccionado) {
        alert('⚠️ Por favor selecciona un programa');
        return;
    }
    if (!horarioSeleccionado) {
        alert('⚠️ Por favor selecciona un horario');
        return;
    }
    if (!fechaInicio) {
        alert('⚠️ Por favor ingresa la fecha de inicio');
        return;
    }

    // Generar el mensaje
    const mensaje = `Tu matrícula fue procesada con éxito en el programa: ${cursoSeleccionado.toUpperCase()}
En el horario ⏰: ${horarioSeleccionado}
Su fecha de inicio programada es para el próximo: ${fechaInicio}

Debe acercarse al momento de iniciar sus clases al área de recepción para que le sea tomada la foto del carnet y seguro estudiantil.

Es importante resaltar que, por motivos de papelería, no se hace reembolso de dinero.

Recuerde acercarse al departamento de cartera para realizar el acuerdo de pago y así mismo el abono de su primera cuota.

Bienvenido a esta gran familia, que tenga un feliz inicio de clases.

📍 *ESTAMOS UBICADOS*
Cra 38 N° 54 - 60, BARRIO EL RECREO/BARRANQUILLA`;

    mensajeTexto.value = mensaje;
    mensajeSection.classList.add('active');
    
    // Scroll suave hacia el mensaje
    mensajeSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

btnCopiar.addEventListener('click', function() {
    mensajeTexto.select();
    document.execCommand('copy');
    
    alertaCopia.innerHTML = '<div class="exito">✅ Mensaje copiado al portapapeles</div>';
    alertaCopia.style.display = 'block';
    
    setTimeout(() => {
        alertaCopia.style.display = 'none';
    }, 3000);
});
