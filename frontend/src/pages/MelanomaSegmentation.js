import React from 'react';

import '../App.css';
import SegmentationComponent from '../components/SegmentationComponent';

const MelanomaSegmentation = () => {
    return <SegmentationComponent task="extract_lesions" />;
};

export default MelanomaSegmentation;