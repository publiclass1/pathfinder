import React, { useState, useEffect, useCallback } from 'react';
import range from 'lodash/range';
import uniqBy from 'lodash/uniqBy';

import TableData from './TableData';


const BoxTypes = {
  START: {
    type: 'start',
    color: 'blue'
  },
  END: {
    type: 'end',
    color: 'green'
  },
  BLOCK: {
    type: 'block',
    color: 'grey'
  },
  EMPTY: {
    type: 'empty',
    color: 'white'
  },
  VISIT: {
    type: 'visited',
    color: 'yellow'
  },
};

const activeButtonStyle = {
  borderStyle: 'solid',
  borderWidth: 3,
  borderColor: 'orange'
};

const sleep = (time) => new Promise(res => setTimeout(() => res(), time * 1000));


function App() {
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(11);
  const [zoom, setZoom] = useState(1);
  const [pathFindStatus, setPathFindStatus] = useState();
  const [activeBlock, setActiveBlock] = useState(-1);
  const [startCoordinate, setStartCoordinate] = useState([]);
  const [endCoordinate, setEndCoordinate] = useState([]);
  const [blocksCoordinate, setBlocksCoordinate] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  const [mainBox, setMainBox] = useState({});
  const [emptyBoxes, setEmptBoxes] = useState([]);

  const handleOnChangeRow = useCallback((inc) => {
    const newTableRows = [...tableRows];
    if (inc > 0) {
      newTableRows.push(range(cols).map((ci) => ({ r: rows, c: ci, type: 'empty', color: 'white' })));
    } else {
      newTableRows.pop();
    }
    setTableRows(newTableRows);
    setRows(rows + inc);
  }, [cols, rows, tableRows]);

  const handleOnChangeCol = (inc) => {
    console.log({ rows, cols })
    const newTableRows = [...tableRows];
    if (inc > 0) {
      newTableRows.map((row, ri) => {
        row.push({ r: ri, c: cols, type: 'empty', color: 'white' });
        return row;
      })
    } else {
      newTableRows.map(row => {
        row.pop();
        return row;
      });
    }
    setTableRows(newTableRows);
    setCols(cols + inc);
  }

  const updateTableRows = useCallback((data, boxType) => {
    const newTableRows = [...tableRows];
    newTableRows[data.r][data.c] = {
      ...newTableRows[data.r][data.c],
      ...boxType
    };
    setTableRows(newTableRows);
  }, [tableRows]);

  const handleOnClick = (data) => () => {
    const newTableRows = [...tableRows];
    let oldData = newTableRows[data.r][data.c]
    let newData = {};
    switch (activeBlock) {
      case 0:
        newData = BoxTypes.START;
        setStartCoordinate([data.r, data.c])
        break;
      case 1:
        newData = BoxTypes.END;
        setEndCoordinate([data.r, data.c])
        break;
      case 2:
        newData = BoxTypes.BLOCK;
        const blocks = [...blocksCoordinate];
        blocks.push([data.r, data.c]);
        setBlocksCoordinate(blocks);
        break;
      case 3:
      default:
        newData = BoxTypes.EMPTY;
        if (oldData.type === BoxTypes.START.type) {
          setStartCoordinate([]);
          setEmptBoxes([]);
        }
        else if (oldData.type === BoxTypes.END.type) {
          setEndCoordinate([]);
        } else if (oldData.type === BoxTypes.BLOCK.type) {
          setBlocksCoordinate([]);
        }
    }
    newTableRows[data.r][data.c] = {
      ...oldData,
      ...newData
    };
    setTableRows(newTableRows);
  }

  const getAroundBlocks = useCallback((coordinate) => {
    const r = coordinate[0];
    const c = coordinate[1];
    const getRow = (row) => row || [];
    if (r > -1 && c > -1) {
      return [
        getRow(tableRows[r])[c + 1], //right
        getRow(tableRows[r - 1])[c + 1], //topright
        getRow(tableRows[r - 1])[c], //top
        getRow(tableRows[r - 1])[c - 1], //topleft
        getRow(tableRows[r])[c - 1], //left
        getRow(tableRows[r + 1])[c - 1], //botleft
        getRow(tableRows[r + 1])[c], //bottom
        getRow(tableRows[r + 1])[c + 1], //botright
      ]
        .filter(e => e); //available
    }
    return [];
  }, [tableRows]);

  const handlePathFinder = () => {
    if (!startCoordinate.length) {
      alert('No start entry.');
      return;
    }
    // if(!endCoordinate.length){
    //   return alert('No end entry');
    // }
    setPathFindStatus('start');
    setEmptBoxes(getAroundBlocks(startCoordinate));
  }

  const findEndBox = useCallback(async() => {
    if (emptyBoxes.length) {
      const newEmptyBoxes = [];
      for (let emptyBox of emptyBoxes) {
        if (emptyBox.type === BoxTypes.END.type) {
          setPathFindStatus('found');
          setEmptBoxes([]);
          break;
        }
        // await sleep(0.1);

        updateTableRows(emptyBox, BoxTypes.VISIT);
        const aroundBoxs = getAroundBlocks([emptyBox.r, emptyBox.c]);
        if (aroundBoxs.filter(e => e.type === BoxTypes.END.type).length) {
          setPathFindStatus('found');
          setEmptBoxes([]);
          break;
        }
        const newEmptyBoxList = aroundBoxs.filter(e => e.type === BoxTypes.EMPTY.type);
        newEmptyBoxes.push(...newEmptyBoxList);
      }
      const uniqueEmptyBoxes = uniqBy(newEmptyBoxes, e => e.id)
        .filter(u => emptyBoxes.filter(e => e.id === u.id).length === 0);
      setEmptBoxes(uniqueEmptyBoxes);
    }
  }, [emptyBoxes, getAroundBlocks, updateTableRows]);

  // trigger on start find path
  useEffect(() => {
    if (pathFindStatus === 'start') {
      findEndBox();
    }
    if (pathFindStatus === 'found') {
      console.log('Found');
    }
  }, [findEndBox, pathFindStatus]);

  // initial rows and cols
  useEffect(() => {
    const data = range(rows)
      .map((r) => range(cols)
        .map((c) => {
          return ({ id: `${r}:${c}`, r, c, ...BoxTypes.EMPTY });
        }));

    setTableRows(data);
  }, []);


  return (
    <div className="App">
      <div style={{ marginBottom: 20 }}>
        Controls
        <div>
          <span>Rows:</span>
          <button type='button'
            onClick={() => handleOnChangeRow(1)}>
            +
        </button>
          <button
            onClick={() => handleOnChangeRow(-1)}>
            -
        </button>
          <span style={{ marginLeft: 25 }}>Cols:</span>
          <button type='button'
            onClick={() => handleOnChangeCol(1)}>
            +
        </button>
          <button
            onClick={() => handleOnChangeCol(-1)}>
            -
        </button>


          <span style={{ marginLeft: 25 }}>Zoom:</span>
          <button type='button'
            onClick={() => setZoom(zoom + 0.1)}>
            +
        </button>
          <button
            onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}>
            -
        </button>
        </div>


      </div>
      <div>
        Tile Types:
    <div>
          <label>
            Start
            <button type='button'
              onClick={() => setActiveBlock(0)}
              style={{
                width: 30, height: 30,
                backgroundColor: 'blue',
                ...(activeBlock === 0 ? activeButtonStyle : {})
              }} />
          </label>

          <label>
            Finish
            <button type='button'
              onClick={() => setActiveBlock(1)}
              style={{
                width: 30, height: 30,
                backgroundColor: 'green',
                ...(activeBlock === 1 ? activeButtonStyle : {})
              }} />
          </label>

          <label>
            Block
            <button type='button'
              onClick={() => setActiveBlock(2)}
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'grey',
                ...(activeBlock === 2 ? activeButtonStyle : {})
              }} />
          </label>

          <label>
            Empty
            <button type='button'
              onClick={() => setActiveBlock(3)}
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'white',
                ...(activeBlock === 3 ? activeButtonStyle : {})
              }} />
          </label>
        </div>
      </div>

      <div>
        <button type='button'
          onClick={handlePathFinder}
          style={{ backgroundColor: 'white', borderRadius: 5 }}>
          Start Path Find
  </button>
      </div>
      <div>
        Tables
        <table>
          <tbody style={{
            borderWidth: 1,
            borderStyle: 'solid',
            height: 'calc(100% - 35)',
            width: 'calc(100% - 35)',
            margin: 35,
            zoom: zoom
          }}>
            {
              tableRows.map((r, ri) =>
                <tr key={'r' + ri}>
                  {
                    r.map((c, ci) => <TableData
                      onClick={handleOnClick(c)}
                      key={ri + '-' + ci}
                      data={c}
                    />)
                  }
                </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
