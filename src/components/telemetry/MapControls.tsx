type MapControlsProps = {
    mode: "2d" | "3d";
    setMode: (mode: "2d" | "3d") => void;
    currentView: "real" | "nice";   
    setCurrentView: (view: "real" | "nice") => void;
};

function MapControls({ mode, setMode, currentView, setCurrentView }: MapControlsProps) {
    return (
        <div className="absolute top-4 right-4 translate-x-0 md:right-auto md:left-4 z-[1001] flex shadow-lg" role="group">
            <button
                onClick={() => setMode(mode === "2d" ? "3d" : "2d")}
                type = "button"
                className={`text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading font-medium leading-5 rounded-s-base text-sm px-3 py-2 focus:outline-none'
                    ${mode === "2d"
                        ? "bg-slate-800 text-white rounded-lg"
                        : "bg-slate-800 text-white rounded-l-lg"}`}
            >
                {mode === "2d" ? "Przełącz na 3D" : "Przełącz na 2D"}
            </button>

            {mode === "3d" && (
                <button
                    onClick={() => setCurrentView(currentView === "real" ? "nice" : "real")}
                    className={`text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading font-medium leading-5 rounded-s-base text-sm px-3 py-2 focus:outline-none'                 
                        ${currentView === "real" 
                            ? "bg-slate-800 text-white rounded-r-lg" 
                            : "bg-slate-800 text-white rounded-r-lg"}`}
                >
                    {currentView === "real" ? "Trajektoria uproszczona" : "Trajektoria rzeczywista"}
                </button>
            )}
        </div>
    );    
}

export default MapControls;