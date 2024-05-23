import React, { useState } from 'react';
import ImageView from './ImageView';
import Menu from './Menu';
import ProgressBar from './ProgressBar';
import { uploadImage } from '../services/api';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

const SegmentationComponent = ({ task }) => {
    const [originalImage, setOriginalImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (file) => {
        setOriginalImage(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append('image', file);
        formData.append('task', task);

        setLoading(true);
        uploadImage(formData).then(response => {
            setProcessedImage(`data:image/jpeg;base64,${response.data.image}`);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            console.log("Error happen", err.message)
        })
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Menu handleImageUpload={handleImageUpload} />
                    <ProgressBar loading={loading} />
                    <ImageView imageSrc={originalImage} altText="Original Image" />
                </Col>
                <Col>
                    <ImageView imageSrc={processedImage} altText="Processed Image" />
                </Col>
            </Row>
        </Container>
    );
};

export default SegmentationComponent;
