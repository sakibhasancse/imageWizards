import React from 'react';
import '../App.css';
import SegmentationComponent from '../components/SegmentationComponent';

const EyeFundusSegmentation = () => {
    return <SegmentationComponent task="extract_blood_vessels" />;
};

export default EyeFundusSegmentation;