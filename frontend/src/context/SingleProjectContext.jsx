// frontend/src/context/SingleProjectContext.jsx
import { useState, createContext, useEffect } from 'react';

const SingleProjectContext = createContext();

// Estructura de datos por defecto para evitar errores si los datos tardan en cargar
const defaultProjectStructure = {
	ProjectHeader: { title: '', publishDate: '', tags: '' },
	ProjectImages: [],
	ProjectInfo: {
		ClientHeading: '',
		CompanyInfo: [],
		ObjectivesHeading: '',
		ObjectivesDetails: '',
		Technologies: [{ title: '', techs: [] }],
		ProjectDetailsHeading: '',
		ProjectDetails: [],
		SocialSharingHeading: '',
		SocialSharing: [],
	},
	RelatedProject: {
		title: '',
		Projects: [],
	},
};


export const SingleProjectProvider = ({ children }) => {
	const [singleProjectData, setSingleProjectData] = useState(defaultProjectStructure);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSingleProjectFromBackend = async () => {
            setLoading(true);
            setError(null);
			try {
				// NOTA: En una aplicación real, aquí probablemente tendrías un ID de proyecto
				// y harías algo como fetch(`http://localhost:3001/api/projects/${projectId}`);
				// Por ahora, el backend siempre devuelve el mismo proyecto en '/api/projects/single-project'
				const response = await fetch('http://localhost:3001/api/projects/single-project');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setSingleProjectData(data);
			} catch (err) {
				console.error("No se pudo cargar el detalle del proyecto desde el backend:", err);
                setError(err.message);
                // Mantenemos la estructura por defecto en caso de error
                setSingleProjectData(defaultProjectStructure);
			} finally {
                setLoading(false);
            }
		};

		fetchSingleProjectFromBackend();
	}, []); // Se ejecuta una vez al montar

	return (
		<SingleProjectContext.Provider
			value={{ singleProjectData, setSingleProjectData, loading, error }}
		>
			{children}
		</SingleProjectContext.Provider>
	);
};

export default SingleProjectContext;