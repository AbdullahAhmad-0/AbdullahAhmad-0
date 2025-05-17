import { useState, useEffect } from "react";

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
        <div className="bg-gradient-to-tr from-violet-950 via-slate-900 to-blue-900">
            <div className="bg-slate-950/60 w-full h-[100vh] max-w-[100vw] max-h-[100vh] overflow-hidden">
                {isLoaded ? (
                    <div>
                        <div className="max-w-7xl mx-auto">
                            <div className="m-5 h-full flex justify-between gap-5">
                                <div className="w-1/3">
                                    <div className="w-full rounded-2xl border-4 border-neon-blue max-h-[calc(100vh-2.5rem)] overflow-y-auto overflow-x-hidden text-white">
                                        
                                    </div>
                                </div>
                                <div className="w-2/3">
                                    <div className="w-full rounded-2xl border-4 border-neon-blue max-h-[calc(100vh-2.5rem)] overflow-y-auto overflow-x-hidden text-white">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-20 h-20 flex items-center justify-center">
                            {[...Array(count)].map((_, index) => (
                                <div key={index} className="w-32 h-32 flex items-center justify-center animate-bounce">
                                    <div className="bg-slate-100 w-3 h-3 border rounded-2xl"></div>
                                </div>
                            ))}
                        </div>
                        <h1 className="text-center flex items-center justify-center text-white animate-pulse text-2xl">Abdullah Ahmad Portfolio</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
