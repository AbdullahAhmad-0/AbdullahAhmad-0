import { useState, useEffect } from "react";
import apiHandler from "../api/api_handler";
import ABOUT_TEMPLATE from "../models/about";

const About = () => {
	const [activeSection, setActiveSection] = useState("about");
	const [aboutData, setAboutData] = useState(ABOUT_TEMPLATE);

	useEffect(() => {
		const fetchAboutData = async () => {
			setAboutData(await apiHandler.getAbout());
		};
		fetchAboutData();
	}, []);

	const renderAboutContent = () => {
		return (
			<div>
				<h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent gradient-text  mb-4">{aboutData.about.title}</h3>
				<div className="space-y-4">
					{aboutData.about.content.split("\n\n").map((paragraph, index) => (
						<p key={index} className="text-gray-300">
							{paragraph}
						</p>
					))}
				</div>
			</div>
		);
	};

	const renderSkillsContent = () => {
		return (
			<div>
				<h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent gradient-text  mb-4">{aboutData.skills.title}</h3>

				<div className="mb-8">
					<h4 className="text-lg font-semibold text-blue-400 mb-3">Technical Skills</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{aboutData.skills.technical.map((skill, index) => (
							<div key={index} className="mb-2">
								<div className="flex justify-between mb-1">
									<span className="text-gray-300">{skill.name}</span>
									<span className="text-gray-400">{skill.level}%</span>
								</div>
								<div className="w-full bg-gray-700 rounded-full h-2.5">
									<div
										className="bg-gradient-to-r from-violet-500 to-blue-500 h-2.5 rounded-full"
										style={{ width: `${skill.level}%` }}
									></div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mb-8">
					<h4 className="text-lg font-semibold text-blue-400 mb-3">Soft Skills</h4>
					<div className="flex flex-wrap gap-2">
						{aboutData.skills.soft.map((skill, index) => (
							<span key={index} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-gray-300">
								{skill}
							</span>
						))}
					</div>
				</div>

				<div>
					<h4 className="text-lg font-semibold text-blue-400 mb-3">Languages</h4>
					<div className="flex flex-wrap gap-2">
						{aboutData.skills.languages.map((language, index) => (
							<span key={index} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-gray-300">
								{language}
							</span>
						))}
					</div>
				</div>
			</div>
		);
	};

	const renderEducationContent = () => {
		return (
			<div>
				<h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent gradient-text  mb-4">{aboutData.education.title}</h3>
				<div className="space-y-6">
					{aboutData.education.timeline.map((item, index) => (
						<div key={index} className="relative pl-8 pb-6 border-l-2 border-violet-700 last:border-0 last:pb-0">
							<div className="absolute left-[-8px] top-0 w-4 h-4 bg-violet-600 rounded-full border-4 border-slate-900"></div>
							<div className="bg-slate-800 rounded-lg p-4">
								<h4 className="text-lg font-medium text-blue-400">{item.degree}</h4>
								<div className="flex justify-between items-center mb-2">
									<p className="text-gray-300">{item.institution}</p>
									<p className="text-gray-400 text-sm">{item.year}</p>
								</div>
								<p className="text-gray-400 text-sm">{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	const renderExperienceContent = () => {
		return (
			<div>
				<h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent gradient-text  mb-4">{aboutData.experience.title}</h3>
				<div className="space-y-6">
					{aboutData.experience.timeline.map((item, index) => (
						<div key={index} className="relative pl-8 pb-6 border-l-2 border-violet-700 last:border-0 last:pb-0">
							<div className="absolute left-[-8px] top-0 w-4 h-4 bg-violet-600 rounded-full border-4 border-slate-900"></div>
							<div className="bg-slate-800 rounded-lg p-4">
								<h4 className="text-lg font-medium text-blue-400">{item.position}</h4>
								<div className="flex justify-between items-center mb-2">
									<p className="text-gray-300">{item.company}</p>
									<p className="text-gray-400 text-sm">{item.year}</p>
								</div>
								<p className="text-gray-400 mb-2">{item.description}</p>
								<div className="mt-2">
									<p className="text-sm font-medium text-gray-300 mb-1">Key Achievements:</p>
									<ul className="list-disc list-inside text-sm text-gray-400">
										{item.achievements.map((achievement, i) => (
											<li key={i}>{achievement}</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	const renderCertificatesContent = () => {
		return (
			<div>
				<h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent gradient-text mb-4">{aboutData.certifications.title}</h3>
				<div className="space-y-6">
					{aboutData.certifications.timeline.map((cert, index) => (
						<div key={index} className="relative pl-8 pb-6 border-l-2 border-violet-700 last:border-0 last:pb-0">
							<div className="absolute left-[-8px] top-0 w-4 h-4 bg-violet-600 rounded-full border-4 border-slate-900"></div>
							<div className="bg-slate-800 rounded-lg p-4">
								<h4 className="text-lg font-medium text-blue-400">{cert.name}</h4>
								<div className="flex justify-between items-center mb-2">
									<p className="text-gray-300">{cert.institution}</p>
									<p className="text-gray-400 text-sm">{cert.year}</p>
								</div>
								<p className="text-gray-400 mb-2 text-sm">{cert.description}</p>
								<div className="flex space-x-4 mt-4">
									{cert.url && (
										<a
											href={cert.url}
											target="_blank"
											rel="noopener noreferrer"
											className="px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 bg-violet-600 text-white hover:bg-violet-500"
										>
											View Certificate
										</a>
									)}
									{cert.see_more_url && (
										<a
											href={cert.see_more_url}
											className="px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 bg-violet-600 text-white hover:bg-violet-500"
										>
											See More
										</a>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	const renderContent = () => {
		switch (activeSection) {
			case "about":
				return renderAboutContent();
			case "skills":
				return renderSkillsContent();
			case "education":
				return renderEducationContent();
			case "experience":
				return renderExperienceContent();
			case "certificates":
				return renderCertificatesContent();
			default:
				return renderAboutContent();
		}
	};

	return (
		<div>
			<div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-lg overflow-x-auto">
				{["about", "skills", "education", "experience", "certificates"].map((section) => (
					<button
						key={section}
						onClick={() => setActiveSection(section)}
						className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
							activeSection === section ? "bg-violet-600 text-white" : "text-gray-300 hover:bg-slate-700"
						}`}
					>
						{section.charAt(0).toUpperCase() + section.slice(1)}
					</button>
				))}
			</div>

			<div className="transition-all duration-300 ease-in-out">{renderContent()}</div>
		</div>
	);
};

export default About;
