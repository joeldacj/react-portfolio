// frontend/src/components/projects/ProjectsGrid.jsx
import { useContext } from 'react'; // Ya lo tienes
import { FiSearch } from 'react-icons/fi'; // Ya lo tienes
import ProjectSingle from './ProjectSingle'; // Ya lo tienes
import { ProjectsContext } from '../../context/ProjectsContext'; // Ya lo tienes
import ProjectsFilter from './ProjectsFilter'; // Ya lo tienes

const ProjectsGrid = () => {
	const {
		projects, // Este ahora viene del backend
		searchProject,
		setSearchProject,
		searchProjectsByTitle,
		selectProject,
		setSelectProject,
		selectProjectsByCategory,
		loading, // NUEVO: estado de carga del contexto
		error,   // NUEVO: estado de error del contexto
	} = useContext(ProjectsContext);

	// ... (resto de tu componente: el div del título, el div con el input de búsqueda y el filtro)

    if (loading) {
		return <section className="py-5 sm:py-10 mt-5 sm:mt-10"><p className="text-center">Cargando proyectos...</p></section>;
	}

	if (error) {
		return <section className="py-5 sm:py-10 mt-5 sm:mt-10"><p className="text-center text-red-500">Error al cargar proyectos: {error}</p></section>;
	}

	return (
		<section className="py-5 sm:py-10 mt-5 sm:mt-10">
			{/* ... (El título y la barra de búsqueda/filtros que ya tienes) ... */}
			<div className="text-center">
				<p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
					Mis proyectos
				</p>
			</div>

			<div className="mt-4">
				<h3
					className="font-general-regular text-center text-secondary-dark dark:text-ternary-light text-md sm:text-xl mb-3"
				>
					Explora mis proyectos, fíltralos por categoría o busca por nombre.
				</h3>
				<div
					className="flex justify-between border-b border-primary-light dark:border-secondary-dark pb-3 gap-3"
				>
					{/* Input de búsqueda y ProjectsFilter como los tienes */}
                    <div className="flex justify-between gap-2">
						<span className="hidden sm:block bg-primary-light dark:bg-ternary-dark p-2.5 shadow-sm rounded-xl cursor-pointer">
							<FiSearch className="text-ternary-dark dark:text-ternary-light w-5 h-5"></FiSearch>
						</span>
						<input
							onChange={(e) => {
								setSearchProject(e.target.value);
							}}
							className="font-general-medium pl-3 pr-1 sm:px-4 py-2 border border-gray-200 dark:border-secondary-dark rounded-lg text-sm sm:text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
							id="name"
							name="name"
							type="search"
							required=""
							placeholder="Buscar proyectos"
							aria-label="Name"
						/>
					</div>
					<ProjectsFilter setSelectProject={setSelectProject} />
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10">
				{/* Tu lógica actual para mostrar proyectos (selectProject ? selectProjectsByCategory.map(...) : ...) */}
                {/* Debería funcionar igual, pero ahora 'projects' viene del backend */}
                {selectProject
					? selectProjectsByCategory.map((project) => (
							<ProjectSingle
								title={project.title}
								category={project.category}
								image={project.img}
								key={project.id}
							/>
					  ))
					: searchProject
					? searchProjectsByTitle.map((project) => (
							<ProjectSingle
								title={project.title}
								category={project.category}
								image={project.img}
								key={project.id}
							/>
					  ))
					: projects.map((project) => ( // 'projects' es el estado que viene del backend
							<ProjectSingle
								title={project.title}
								category={project.category}
								image={project.img}
								key={project.id}
							/>
					  ))}
			</div>
		</section>
	);
};

export default ProjectsGrid;