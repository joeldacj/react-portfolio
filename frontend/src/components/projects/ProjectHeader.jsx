// frontend/src/components/projects/ProjectHeader.jsx
import { useContext } from 'react';
import { FiClock, FiTag } from 'react-icons/fi';
import SingleProjectContext from '../../context/SingleProjectContext';

const ProjectSingleHeader = () => {
	const { singleProjectData, loading, error } = useContext(SingleProjectContext);

	if (loading) {
		return <p className="text-center mt-10">Cargando detalles del proyecto...</p>;
	}

	if (error) {
		return <p className="text-center mt-10 text-red-500">Error al cargar datos: {error}</p>;
	}

	// Si singleProjectData es null o no tiene ProjectHeader (aunque lo evitamos con defaultProjectStructure)
	// podrías añadir otra comprobación aquí, pero con defaultProjectStructure, siempre debería existir.
	if (!singleProjectData || !singleProjectData.ProjectHeader) {
		return <p className="text-center mt-10">No hay datos del proyecto disponibles.</p>;
	}


	return (
		<div>
			<p className="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-7">
				{singleProjectData.ProjectHeader.title}
			</p>
			<div className="flex">
				<div className="flex items-center mr-10">
					<FiClock className="text-lg text-ternary-dark dark:text-ternary-light" />
					<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
						{singleProjectData.ProjectHeader.publishDate}
					</span>
				</div>
				<div className="flex items-center">
					<FiTag className="text-lg text-ternary-dark dark:text-ternary-light" />
					<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
						{singleProjectData.ProjectHeader.tags}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProjectSingleHeader;