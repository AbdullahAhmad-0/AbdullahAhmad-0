import { useState, useEffect } from "react";

const Projects = () => {
	const [activeCategory, setActiveCategory] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [selectedLanguages, setSelectedLanguages] = useState([]);

	// Sample projects data
	const projectsData = [
		{
			id: 1,
			title: "E-commerce Platform",
			description: "A full-featured online shopping platform with user authentication, product catalog, cart, and payment integration.",
			image: "/api/placeholder/600/400",
			category: "web development",
			languages: ["JavaScript", "React", "Node.js", "MongoDB"],
			link: "https://example.com/ecommerce",
			readMore: "abcd.com",
		},
		{
			id: 2,
			title: "Fitness Tracker App",
			description: "Mobile application for tracking workouts, nutrition, and personal fitness goals with analytics dashboard.",
			image: "/api/placeholder/600/400",
			category: "app development",
			languages: ["React Native", "Firebase", "Redux"],
			link: "https://example.com/fitness-app",
		},
		{
			id: 3,
			title: "Inventory Management System",
			description: "Desktop software for small businesses to manage inventory, sales, and generate reports.",
			image: "/api/placeholder/600/400",
			category: "software development",
			languages: ["Python", "SQLite", "PyQt"],
			link: "",
			readMore: "abcd.com",
		},
		{
			id: 4,
			title: "AI-Driven Chatbot",
			description: "Intelligent customer service chatbot trained on company-specific data to handle customer inquiries.",
			image: "/api/placeholder/600/400",
			category: "other",
			languages: ["Python", "TensorFlow", "NLP"],
			link: "https://example.com/chatbot",
			readMore: "abcd.com",
		},
		{
			id: 5,
			title: "Projects Website Template",
			description: "Responsive and customizable projects website template for developers and designers.",
			image: "/api/placeholder/600/400",
			category: "web development",
			languages: ["HTML", "CSS", "JavaScript"],
			link: "https://example.com/projects-template",
		},
		{
			id: 6,
			title: "Task Management Mobile App",
			description: "Cross-platform mobile application for managing tasks, projects, and team collaboration.",
			image: "/api/placeholder/600/400",
			category: "app development",
			languages: ["Flutter", "Dart", "Firebase"],
			link: "https://example.com/task-app",
			readMore: "abcd.com",
		},
		{
			id: 7,
			title: "Data Visualization Dashboard",
			description: "Interactive dashboard for visualizing complex datasets with filtering and export capabilities.",
			image: "/api/placeholder/600/400",
			category: "web development",
			languages: ["React", "D3.js", "Node.js"],
			link: "",
			readMore: "abcd.com",
		},
		{
			id: 8,
			title: "Point of Sale System",
			description: "Comprehensive POS system for retail businesses with inventory tracking and sales analytics.",
			image: "/api/placeholder/600/400",
			category: "software development",
			languages: ["C#", ".NET", "SQL Server"],
			link: "https://example.com/pos-system",
		},
	];

	const categories = ["all", "web development", "app development", "software development", "other"];

	// Extract all unique languages from projects data
	const allLanguages = [...new Set(projectsData.flatMap((item) => item.languages))].sort();

	// Filter projects items based on category, search term, and selected languages
	useEffect(() => {
		let filtered = projectsData;

		// Filter by category
		if (activeCategory !== "all") {
			filtered = filtered.filter((item) => item.category === activeCategory);
		}

		// Filter by search term
		if (searchTerm.trim() !== "") {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(item) =>
					item.title.toLowerCase().includes(term) ||
					item.description.toLowerCase().includes(term) ||
					item.languages.some((lang) => lang.toLowerCase().includes(term))
			);
		}

		// Filter by selected languages
		if (selectedLanguages.length > 0) {
			filtered = filtered.filter((item) => selectedLanguages.some((lang) => item.languages.includes(lang)));
		}

		setFilteredProjects(filtered);
	}, [activeCategory, searchTerm, selectedLanguages]);

	const toggleLanguage = (language) => {
		setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((lang) => lang !== language) : [...prev, language]));
	};

	return (
		<div>
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-violet-400 mb-4">My Projects</h2>
				<p className="text-gray-300 mb-4">
					Explore my recent projects across different domains. Each project represents a unique challenge and solution.
				</p>

				{/* Search and Filter Bar */}
				<div className="bg-slate-800/70 rounded-lg p-4 mb-6">
					<div className="flex flex-col md:flex-row gap-4 mb-4">
						<div className="flex-1">
							<input
								type="text"
								placeholder="Search projects..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
							/>
						</div>
						<div className="flex-1">
							<div className="relative">
								<select
									value={activeCategory}
									onChange={(e) => setActiveCategory(e.target.value)}
									className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500"
								>
									{categories.map((category) => (
										<option key={category} value={category}>
											{category.charAt(0).toUpperCase() + category.slice(1)}
										</option>
									))}
								</select>
								<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
									<svg
										className="w-5 h-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</div>
							</div>
						</div>
					</div>

					{/* Language filters */}
					<div>
						<h4 className="text-sm font-medium text-gray-400 mb-2">Filter by language:</h4>
						<div className="flex flex-wrap gap-2">
							{allLanguages.map((language) => (
								<button
									key={language}
									onClick={() => toggleLanguage(language)}
									className={`px-2 py-1 text-xs rounded-full transition-colors ${
										selectedLanguages.includes(language)
											? "bg-violet-600 text-white"
											: "bg-slate-700 text-gray-300 hover:bg-slate-600"
									}`}
								>
									{language}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredProjects.length > 0 ? (
						filteredProjects.map((item) => (
							<div
								key={item.id}
								className="bg-slate-800/50 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
							>
								<div className="relative group">
									<img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
									<div className="absolute inset-0 bg-violet-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
										{item.link && (
											<a
												href={item.link}
												target="_blank"
												rel="noopener noreferrer"
												className="px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md text-sm transition-colors"
											>
												View Project
											</a>
										)}
										{item.readMore && (
											<a
												href={item.readMore}
												className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
											>
												Read More
											</a>
										)}
									</div>
								</div>
								<div className="p-4">
									<h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
									<p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
									<div className="flex flex-col gap-2">
										<div className="flex items-center gap-2">
											<span className="text-xs bg-violet-900/50 px-2 py-1 rounded text-violet-300">{item.category}</span>
										</div>
										<div className="flex flex-wrap gap-1">
											{item.languages.map((lang, index) => (
												<span key={index} className="text-xs bg-slate-700 px-2 py-0.5 rounded text-blue-300">
													{lang}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-span-full text-center py-8">
							<p className="text-gray-400">No projects found matching your criteria.</p>
							<button
								onClick={() => {
									setActiveCategory("all");
									setSearchTerm("");
									setSelectedLanguages([]);
								}}
								className="mt-2 text-violet-400 hover:text-violet-300"
							>
								Clear filters
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Projects;
