import React from 'react';

import classes from './Temperature.module.css';

const temperature = (props) => {
    return(
        <div className={classes.TemperatureWrapper}>
            {console.log(props)}
            {Math.round(props.degrees)}<span className={classes.TemperatureSymbol}>°C</span>
        </div>
    );
}

export default temperature;