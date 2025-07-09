import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { Home, User, Briefcase, Code, MessageCircle, Mail } from "lucide-react";

import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Info from "./components/Info";


const BottomNav = () => {
    const location = useLocation();
    
    const navItems = [
        { path: "/", icon: Home, label: "Home" },
        { path: "/portfolio", icon: Briefcase, label: "Portfolio" },
        { path: "/projects", icon: Code, label: "Projects" },
        { path: "/blog", icon: MessageCircle, label: "Blog" },
        { path: "/contact", icon: Mail, label: "Contact" }
    ];
    
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 px-4 py-2 z-50">
            <div className="flex justify-around items-center max-w-md mx-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || 
                                   (item.path === "/" && location.pathname === "/about");
                    
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                                isActive 
                                    ? "text-violet-400 bg-violet-900/30" 
                                    : "text-gray-400 hover:text-violet-300"
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

function App() {
    const [count, setCount] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);

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

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    return (
        <Router>
            <div className="bg-gradient-to-br from-violet-950 via-slate-900 to-blue-900 min-h-screen">
                <div className="bg-slate-950/60 min-h-screen">
                    {isLoaded ? (
                        <div className="pb-20"> {/* Space for bottom nav */}
                            {/* Header */}
                            <div className="sticky top-0 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 px-4 py-4 z-40">
                                <div className="flex items-center justify-between max-w-md mx-auto">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-white font-bold text-lg">Abdullah Ahmad</h1>
                                            <p className="text-violet-300 text-sm">Developer</p>
                                        </div>
                                    </div>
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="px-4 py-6">
                                <div className="max-w-md mx-auto">
                                    <Routes>
                                        <Route path="/" element={<Info />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/portfolio" element={<Portfolio />} />
                                        <Route path="/projects" element={<Projects />} />
                                        <Route path="/blog" element={<Blog />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="*" element={<About />} />
                                    </Routes>
                                </div>
                            </div>

                            {/* Bottom Navigation */}
                            <BottomNav />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-screen">
                            <div className="w-20 h-20 flex items-center justify-center">
                                {[...Array(count)].map((_, index) => (
                                    <div key={index} className="w-32 h-32 flex items-center justify-center animate-bounce">
                                        <div className="bg-slate-100 w-3 h-3 border rounded-2xl"></div>
                                    </div>
                                ))}
                            </div>
                            <h1 className="text-center flex items-center justify-center text-white animate-pulse text-2xl mt-4">
                                Abdullah Ahmad Portfolio
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </Router>
    );
}

export default App;