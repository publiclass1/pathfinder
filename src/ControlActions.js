import React, { Fragment } from "react";
import Button, { ButtonGroup } from "@atlaskit/button";

function ControlActions({ onClick,value=1 }) {
    return (
        <Fragment>
            <ButtonGroup>
                <Button
                    appearance={"primary"}
                    spacing={"compact"}
                    onClick={() => onClick(value)}>
                    +
                </Button>
                <Button
                    appearance={"default"}
                    spacing={"compact"}
                    onClick={() => onClick(value * -1)}>
                    -
                </Button>
            </ButtonGroup>
        </Fragment>
    );
}

export default ControlActions;
