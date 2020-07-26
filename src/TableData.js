import React from "react";
import EmojiFlagsIcon from "@atlaskit/icon/glyph/emoji/flags";
import EditorImageBorderIcon from "@atlaskit/icon/glyph/editor/image-border";
import HomeIcon from "@atlaskit/icon/glyph/home";
import EmojiNatureIcon from "@atlaskit/icon/glyph/emoji/nature";
// import EmojiTravelIcon from '@atlaskit/icon/glyph/emoji/travel';
import PresenceActiveIcon from '@atlaskit/icon/glyph/presence-active';

function TableData({
    onClick,
    onMouseOver,
    data = { color: "transparent", type: "empty", r: 0, c: 0 },
}) {
    let content = "";
    switch (data.type) {
        case "start":
            content = <EmojiFlagsIcon label="Start" primaryColor="#474747"/>;
            break;
        case "end":
            content = <HomeIcon label="End" primaryColor="#cf061e" />;
            break;
        case "block":
            content = <EmojiNatureIcon label="Block" primaryColor="#8fcc9f" />;
            break;
        case "visited":
            content = <PresenceActiveIcon label="Visited" primaryColor="#edb15c"/>
            break;
        default:
            content = <EditorImageBorderIcon label="Empty" primaryColor="#f7f7f7" />;
    }
    return (
        <td
            style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#f7f7f7",
                width: "35px",
                height: "35px",
            }}
            onClick={onClick}
            onMouseOver={onMouseOver}>
            {content}
        </td>
    );
}

export default TableData;
