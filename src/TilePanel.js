import React from "react";
import Button, { ButtonGroup } from "@atlaskit/button";

import EmojiFlagsIcon from "@atlaskit/icon/glyph/emoji/flags";
import EditorImageBorderIcon from "@atlaskit/icon/glyph/editor/image-border";
import HomeIcon from "@atlaskit/icon/glyph/home";
import EmojiNatureIcon from "@atlaskit/icon/glyph/emoji/nature";

function TilePanel({ activeBlock, onClick }) {
    return (
        <div>
            Tiles:
            <ButtonGroup>
                <Button
                    isSelected={activeBlock === 0}
                    onClick={() => onClick(0)}
                    iconBefore={
                        <EmojiFlagsIcon isSelected={true} label="Start" />
                    }>
                    Start
                </Button>

                <Button
                    isSelected={activeBlock === 1}
                    onClick={() => onClick(1)}
                    iconBefore={<HomeIcon label="Finish" />}>
                    Finish
                </Button>
                <Button
                    isSelected={activeBlock === 2}
                    onClick={() => onClick(2)}
                    iconBefore={<EmojiNatureIcon label="Block" />}>
                    Block
                </Button>
                <Button
                    isSelected={activeBlock === 3}
                    onClick={() => onClick(3)}
                    iconBefore={<EditorImageBorderIcon label="Empty" />}>
                    Clear
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default TilePanel;
