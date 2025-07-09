import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Link } from "react-router-dom";
import { Home, User, Briefcase, Code, MessageCircle, Mail } from "lucide-react";
import apiHandler from "./api/api_handler";
import INFO_TEMPLATE from "./models/info";

import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Info from "./components/Info";
import BlogPost from "./components/BlogPost";

const BottomNav = () => {
	const location = useLocation();

	const navItems = [
		{ path: "/about", icon: Home, label: "Home" },
		{ path: "/portfolio", icon: Briefcase, label: "Portfolio" },
		{ path: "/projects", icon: Code, label: "Projects" },
		{ path: "/blog", icon: MessageCircle, label: "Blog" },
		{ path: "/contact", icon: Mail, label: "Contact" },
	];

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 px-4 py-2 z-50">
			<div className="flex justify-around items-center max-w-md mx-auto">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = location.pathname === item.path;

					return (
						<NavLink
							key={item.path}
							to={item.path}
							className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
								isActive ? "text-violet-400 bg-violet-900/30" : "text-gray-400 hover:text-violet-300"
							}`}
						>
							<Icon className="w-6 h-6 mb-1" />
							<span className="text-xs font-medium">{item.label}</span>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};

const NavTabs = ({ onClose }) => (
	<div className="flex space-x-4 md:space-x-6 text-sm md:text-base font-medium overflow-x-auto pb-2">
		{["about", "portfolio", "projects", "blog", "contact"].map((tab) => (
			<NavLink
				key={tab}
				to={`/${tab}`}
				onClick={() => onClose?.()}
				className={({ isActive }) =>
					`px-3 py-2 rounded-lg hover:bg-violet-700/20 transition-colors duration-200 capitalize ${
						isActive ? "bg-violet-700/30 text-white" : "text-gray-300"
					}`
				}
			>
				{tab}
			</NavLink>
		))}
	</div>
);

function App() {
	const [count, setCount] = useState(1);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [personalInfo, setPersonalInfo] = useState(INFO_TEMPLATE);

	useEffect(() => {
		const fetchPersonalInfo = async () => {
			setPersonalInfo(await apiHandler.getInfo());
		};
		fetchPersonalInfo();
	}, []);

	useEffect(() => {
		if (count < 3) {
			const timer = setTimeout(() => {
				setCount((prev) => prev + 1);
			}, 1100);
			return () => clearTimeout(timer);
		}
	}, [count]);

	useEffect(() => {
		const handleLoad = () => {
			setTimeout(() => setIsLoaded(true), 500);
		};

		if (document.readyState === "complete") handleLoad();
		else window.addEventListener("load", handleLoad);

		return () => window.removeEventListener("load", handleLoad);
	}, []);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const MobileHeader = () => (
		<Link to="/">
			<div className="sticky top-0 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 px-4 py-4 z-40">
				<div className="flex items-center justify-between max-w-md mx-auto">
					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center">
							<User className="w-6 h-6 text-white" />
						</div>
						<div>
							<h1 className="text-white font-bold text-lg">{personalInfo.name}</h1>
							<p className="text-violet-300 text-sm">{personalInfo.designation}</p>
						</div>
					</div>
					<div className="w-2 h-2 bg-green-400 rounded-full"></div>
				</div>
			</div>
		</Link>
	);

	const Loader = () => (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="w-20 h-20 flex items-center justify-center">
				{[...Array(count)].map((_, index) => (
					<div key={index} className="w-32 h-32 flex items-center justify-center animate-bounce">
						<div className="bg-slate-100 w-3 h-3 border rounded-2xl"></div>
					</div>
				))}
			</div>
			<h1 className="text-center text-white animate-pulse text-2xl mt-4">{personalInfo.name}&apos;s Portfolio</h1>
		</div>
	);

	return (
		<Router>
			<div className="bg-gradient-to-br from-violet-950 via-slate-900 to-blue-900 min-h-screen">
				<div className="bg-slate-950/60 min-h-screen w-full overflow-x-hidden">
					{!isLoaded ? (
						<Loader />
					) : isMobile ? (
						<div className="pb-20">
							<MobileHeader />
							<div className="px-4 py-6 max-w-md mx-auto text-white">
								<Routes>
									<Route path="/" element={<Info />} />
									<Route path="/about" element={<About />} />
									<Route path="/portfolio" element={<Portfolio />} />
									<Route path="/projects" element={<Projects />} />
									<Route path="/blog" element={<Blog />} />
									<Route path="/contact" element={<Contact />} />
									<Route path="*" element={<Info />} />
								</Routes>
							</div>
							<BottomNav />
						</div>
					) : (
						<div className="max-w-7xl mx-auto px-4 py-6">
							{mobileMenuOpen && isMobile && <NavTabs onClose={() => setMobileMenuOpen(false)} />}

							<div className="flex flex-col md:flex-row md:gap-5">
								<div className="md:w-1/3 w-full mb-4 md:mb-0">
									<div className="rounded-2xl bg-slate-900/80 text-white p-4 overflow-y-auto max-h-[calc(100vh-6rem)]">
										<Info />
									</div>
								</div>
								<div className="md:w-2/3 w-full">
									<div className="rounded-2xl bg-slate-900/80 text-white overflow-y-auto max-h-[calc(100vh-6rem)]">
										<div className="sticky top-0 bg-slate-950/90 p-4 border-b border-violet-600/30 z-10">
											<NavTabs />
										</div>
										<div className="p-4">
											<Routes>
												<Route path="/" element={<About />} />
												<Route path="/about" element={<About />} />
												<Route path="/portfolio" element={<Portfolio />} />
												<Route path="/projects" element={<Projects />} />
												<Route path="/blog" element={<Blog />} />
												<Route path="/blog/:slug" element={<BlogPost />} />
												<Route path="/contact" element={<Contact />} />
												<Route path="*" element={<About />} />
											</Routes>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</Router>
	);
}

export default App;
