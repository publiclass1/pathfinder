import React from "react";
import ControlActions from "./ControlActions";
import Button from "@atlaskit/button";

function ControlPanel({ onRowClick, onColClick, onZoomClick, onReset }) {
    return (
        <div style={{ marginBottom: 20 }}>
            Controls
            <div>
                <span>Rows:</span>
                <ControlActions onClick={onRowClick} />
                <span style={{ marginLeft: 25 }}>Cols:</span>
                <ControlActions onClick={onColClick} />

                <span style={{ marginLeft: 25 }}>Zoom:</span>
                <ControlActions onClick={onZoomClick} value={0.1} />

                <span style={{ marginLeft: 25 }}></span>
                <Button type="button" onClick={onReset}>
                    Reset
                </Button>
            </div>
        </div>
    );
}

export default ControlPanel;
