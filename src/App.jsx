import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Info from "./components/Info";

function App() {
    const [count, setCount] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const NavTabs = () => (
        <div className="flex space-x-4 md:space-x-6 text-sm md:text-base font-medium overflow-x-auto pb-2">
            {["about", "portfolio", "projects", "blog", "contact"].map((tab) => (
                <NavLink
                    key={tab}
                    to={`/${tab}`}
                    onClick={() => setMobileMenuOpen(false)}
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

    return (
        <Router>
            <div className="bg-gradient-to-tr from-violet-950 via-slate-900 to-blue-900">
                <div className="bg-slate-950/60 w-full min-h-screen max-w-full overflow-x-hidden">
                    {isLoaded ? (
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="py-6">
                                {/* Mobile menu button */}
                                {isMobile && (
                                    <div className="flex justify-between items-center mb-4">
                                        <h1 className="text-white text-xl font-bold">Abdullah Ahmad</h1>
                                        <button
                                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                            className="text-white p-2 rounded-lg bg-violet-700/30 hover:bg-violet-700/50"
                                        >
                                            <span className="sr-only">Open menu</span>
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                {mobileMenuOpen ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                )}

                                {/* Mobile menu */}
                                {isMobile && mobileMenuOpen && (
                                    <div className="mb-4">
                                        <NavTabs />
                                    </div>
                                )}

                                <div className="flex flex-col md:flex-row md:gap-5">
                                    {/* Sidebar */}
                                    {(!isMobile || window.location.pathname === "/about") && (
                                        <div className={`${isMobile ? "w-full mb-4" : "w-1/3"} transition-all duration-300`}>
                                            <div className="w-full rounded-2xl lborder-4 lborder-violet-600 max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden text-white bg-slate-900/80 p-4">
                                                <Info />
                                            </div>
                                        </div>
                                    )}

                                    {/* Main content */}
                                    <div className={`${isMobile ? "w-full" : "w-2/3"} transition-all duration-300`}>
                                        <div className="w-full rounded-2xl lborder-4 lborder-violet-600 max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden text-white bg-slate-900/80">
                                            {!isMobile && (
                                                <div className="sticky top-0 bg-slate-950/90 p-4 lborder-b lborder-violet-600/30 z-10">
                                                    <NavTabs />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <Routes>
                                                    <Route path="/" element={<About />} />
                                                    <Route path="/about" element={<About />} />
                                                    <Route path="/portfolio" element={<Portfolio />} />
                                                    <Route path="/projects" element={<Projects />} />
                                                    <Route path="/blog" element={<Blog />} />
                                                    <Route path="/contact" element={<Contact />} />
                                                    <Route path="*" element={<About />} />
                                                </Routes>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <h1 className="text-center flex items-center justify-center text-white animate-pulse text-2xl">
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
