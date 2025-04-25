import { useState } from 'react';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoLight from '../../images/logo-light.svg';
import logoDark from '../../images/logo-dark.svg';
import { motion } from 'framer-motion';
import Button from '../reusable/Button';

const AppHeader = () => {
	return (
		<motion.nav
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			id="nav"
			className="sm:container sm:mx-auto"
		>
			<div className="z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center py-6">
				<div className="flex justify-between items-center px-4 sm:px-0">
					<div>
						<Link to="/">
								<h1 className="font-general-semibold text-2xl text-center sm:text-left text-ternary-dark dark:text-primary-light">JD</h1>
						</Link>
					</div>
				</div>
			</div>
		</motion.nav>
	);
};

export default AppHeader;
