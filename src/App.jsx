import React from "react";
import { useEffect, useState } from "react";
import ScreenTooSmallErrorPage from "./components/ScreenTooSmallErrorPage";
import PathFindingVisualizer from "./components/PathFindingVisualizer";
import "./App.css";

const App = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <>
            {windowSize < 1000 && <ScreenTooSmallErrorPage />}
            {windowSize >= 1000 && (
				<>
					<div className="App">
						<PathFindingVisualizer />
					</div>
				</>
            )}
        </>
    );
};

export default App;
