import { useState, useCallback } from "react";
import MyCheckbox from "../../components/MyCheckBox/MyCheckbox";
interface IGraph3DUI {
    showHidePoints: Function;
    showHideEdges: Function;
    showHidePolygons: Function;
}
const Graph3DUI: React.FC<IGraph3DUI> = ({ showHidePoints, showHideEdges, showHidePolygons }) => {
    const [showPanel, setShowPanel] = useState(false);

    const showHidePanel = useCallback(() => {
        setShowPanel(!showPanel);
    }, [setShowPanel, showPanel]);

    return (
        <div className="flex">
            <button onClick={showHidePanel}>{showPanel ? "🔙" : "🔜"}</button>
            <div id="Checkbox3D">
                {showPanel && (
                    <div>
                        <MyCheckbox text={"Точки"} checked={true} onClick={showHidePoints} />
                        <MyCheckbox text={"Грани"} checked={true} onClick={showHideEdges} />
                        <MyCheckbox text={"Полингоны"} checked={true} onClick={showHidePolygons} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Graph3DUI;
