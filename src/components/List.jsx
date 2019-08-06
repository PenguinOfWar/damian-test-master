import React from 'react';

const list = (props) => {
    return (
        <li>
            <button onClick={props.delEvent}>Delete All</button>
        </li>

    )

}
export default list;