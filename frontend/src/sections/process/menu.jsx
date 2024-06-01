import React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import styled from '@mui/system/styled';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const suggestedImages = [
    'https://static.remove.bg/uploader-examples/person/8_thumbnail.jpg',
    'https://static.remove.bg/uploader-examples/person/8_thumbnail.jpg',
    'https://static.remove.bg/uploader-examples/person/8_thumbnail.jpg',
    'https://static.remove.bg/uploader-examples/person/8_thumbnail.jpg'
];

const ImageButton = styled('button')({
    border: 'none',
    background: 'none',
    padding: 0,
    cursor: 'pointer',
    display: 'block',
    '&:hover img': {
        transform: 'scale(1.05)',
        transition: 'transform 0.2s ease-in-out'
    }
});

const Menu = ({ handleImageUpload, navigate }) => (
    <Card sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 600, margin: 'auto' }}>
        <label htmlFor="file-upload">
            <input
                accept="image/*"
                id="file-upload"
                type="file"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                style={{ display: 'none' }}
            />
            <Button variant="contained" component="span" sx={{ mt: 8, mb: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}>
                Upload Image
            </Button>
        </label>
        <Typography variant="body1" gutterBottom>
            or drop a file, paste image
        </Typography>
        <Typography variant="body1" gutterBottom>
            No image? Try one of these:
        </Typography>
        <Grid container spacing={2} justifyContent="center">
            {suggestedImages.map((src, index) => (
                <Grid item key={index}>
                    <ImageButton
                        type="button"
                        onClick={() => handleImageUpload(src)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleImageUpload(src);
                            }
                        }}
                    >
                        <img
                            src={src}
                            alt={`suggested-${index}`}
                            style={{ width: '100px', height: '100px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                        />
                    </ImageButton>
                </Grid>
            ))}
        </Grid>
    </Card>
);

Menu.propTypes = {
    handleImageUpload: PropTypes.func.isRequired,
    navigate: PropTypes.func
};

export default Menu;
