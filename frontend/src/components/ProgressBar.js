import React from 'react';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';

const ProgressBar = ({ loading }) => {
    return loading ? < BootstrapProgressBar animated now = { 100 }
    /> : null;
};

export default ProgressBar;