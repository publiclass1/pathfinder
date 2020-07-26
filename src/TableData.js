import React from "react";

function TableData({
    onClick,
    onMouseOver,
    data = { color: 'transparent', type: 'empty', r:0, c:0 } }) {
    return <td style={{
        backgroundColor: data.color,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#e2e2e2',
        width: '25px',
        height: '25px'
    }} onClick={onClick} onMouseOver={onMouseOver}>
        {/* {data.r +','+ data.c} */}
    </td>;
}

export default TableData;
