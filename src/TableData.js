import React from "react";

function TableData({
    onClick,
    data = { color: 'transparent', type: 'empty', r:0, c:0 } }) {
    return <td style={{
        backgroundColor: data.color,
        borderWidth: 1,
        borderStyle: 'solid',
        width: '50px',
        height: '50px'
    }} onClick={onClick}>
        {data.r +','+ data.c}
    </td>;
}

export default TableData;
