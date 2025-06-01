// backend/server.js
const express = require('express');
const cors = require('cors'); // Importa cors
const app = express();
const PORT = 3001; // Puedes usar otro puerto si el 3001 está ocupado

// === MIDDLEWARE ===
app.use(cors()); // Habilita CORS para permitir peticiones desde tu frontend
app.use(express.json()); // Para que Express pueda entender el JSON en el cuerpo de las peticiones POST

// === DATOS DE EJEMPLO (MOCK DATA) ===
// Vamos a tomar algunos datos de tus archivos originales para servirlos desde aquí
const projectsData = [
    {
        id: 1,
        title: 'Google Health Platform (Servido desde Backend)',
        category: 'Web Application',
        img: '/images/web-project-2.jpg', // Asumimos que las imágenes siguen en public/images del frontend
    },
    {
        id: 2,
        title: 'Phoenix Digital Agency (Servido desde Backend)',
        category: 'Mobile Application',
        img: '/images/mobile-project-2.jpg',
    },
    {
        id: 3,
        title: 'Project Management UI (Servido desde Backend)',
        category: 'UI/UX Design',
        img: '/images/ui-project-1.jpg',
    },
    // Puedes añadir más si quieres, o los 6 que tienes en tu projects.js
];

const singleProjectData = { // Solo un ejemplo para el proyecto individual
    ProjectHeader: {
        title: 'Detalle Proyecto Ejemplo (Servido desde Backend)',
        publishDate: 'Oct 26, 2023',
        tags: 'Backend / API Simulado',
    },
    ProjectImages: [
        { id: 1, title: 'Imagen 1', img: '/images/ui-project-1.jpg' },
        { id: 2, title: 'Imagen 2', img: '/images/web-project-2.jpg' },
        { id: 3, title: 'Imagen 3', img: '/images/mobile-project-2.jpg' },
    ],
    ProjectInfo: {
        ClientHeading: 'Acerca del Cliente (Backend)',
        CompanyInfo: [{ id: 1, title: 'Nombre', details: 'Empresa Ejemplo Backend' }],
        ObjectivesHeading: 'Objetivo (Backend)',
        ObjectivesDetails: 'Este es un objetivo traído desde el backend simulado.',
        Technologies: [{ title: 'Tecnologías (Backend)', techs: ['Node.js', 'Express'] }],
        ProjectDetailsHeading: 'Desafío (Backend)',
        ProjectDetails: [{ id: 1, details: 'Detalles del proyecto cargados desde el servidor backend.' }],
        SocialSharingHeading: 'Compartir (Backend)',
        SocialSharing: [],
    },
    RelatedProject: {
        title: 'Proyectos Relacionados (Backend)',
        Projects: [
            { id: 1, title: 'Otro Proyecto Backend 1', img: '/images/mobile-project-1.jpg' },
            { id: 2, title: 'Otro Proyecto Backend 2', img: '/images/web-project-1.jpg' },
        ],
    },
};


// === RUTAS (ENDPOINTS) ===
app.get('/', (req, res) => {
    res.send('¡Hola desde el Backend del Portafolio!');
});

// Endpoint para obtener todos los proyectos
app.get('/api/projects', (req, res) => {
    console.log('Petición recibida en /api/projects');
    res.json(projectsData);
});

// Endpoint para obtener datos del proyecto individual (ejemplo simple)
app.get('/api/projects/single-project', (req, res) => {
    console.log('Petición recibida en /api/projects/single-project');
    res.json(singleProjectData);
});

// (Opcional) Endpoint para manejar el formulario de "Hire Me"
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log('--- Nuevo Mensaje Recibido (Hire Me Modal) ---');
    console.log('Nombre:', name);
    console.log('Email:', email);
    console.log('Asunto/Categoría:', subject);
    console.log('Mensaje:', message);
    console.log('-----------------------------------------------');
    // Simplemente respondemos que se recibió. No guardamos en DB por simplicidad.
    res.status(200).json({ success: true, message: 'Mensaje recibido en el backend!' });
});


// === INICIAR EL SERVIDOR ===
app.listen(PORT, () => {
    console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});