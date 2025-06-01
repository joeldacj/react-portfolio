// frontend/src/context/ProjectsContext.jsx
import { useState, createContext, useEffect } from 'react';

export const ProjectsContext = createContext();

export const ProjectsProvider = (props) => {
    const [projects, setProjects] = useState([]); // Inicializa como array vacío
    const [searchProject, setSearchProject] = useState('');
    const [selectProject, setSelectProject] = useState('');
    const [loading, setLoading] = useState(true); // Estado para la carga
    const [error, setError] = useState(null); // Estado para errores

    // Cargar proyectos desde el backend
    useEffect(() => {
        const fetchProjectsFromBackend = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:3001/api/projects');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                console.error("No se pudieron cargar los proyectos desde el backend:", err);
                setError(err.message);
                // Opcional: podrías poner unos datos por defecto aquí si el backend falla
                // setProjects([{ id: 'error', title: 'Error al cargar proyectos', category: '', img: '' }]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectsFromBackend();
    }, []); // El array vacío [] significa que este efecto se ejecuta solo una vez cuando el componente se monta

    // Search projects by project title
    const searchProjectsByTitle = projects.filter((item) => {
        if (!item.title) return false; // Manejar casos donde el título no exista en el item
        const result = item.title
            .toLowerCase()
            .includes(searchProject.toLowerCase())
            ? item
            : searchProject === ''
            ? item
            : '';
        return result;
    });

    // Select projects by project category
    const selectProjectsByCategory = projects.filter((item) => {
        if (!item.category) return false; // Manejar casos donde la categoría no exista
        let category =
            item.category.charAt(0).toUpperCase() + item.category.slice(1);
        return category.includes(selectProject);
    });

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                searchProject,
                setSearchProject,
                searchProjectsByTitle,
                selectProject,
                setSelectProject,
                selectProjectsByCategory,
                loading, // Exponer el estado de carga
                error,   // Exponer el estado de error
            }}
        >
            {props.children}
        </ProjectsContext.Provider>
    );
};