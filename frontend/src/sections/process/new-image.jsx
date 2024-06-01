import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import styled from '@mui/system/styled';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const uploadedImages = [
    'https://static.remove.bg/uploader-examples/person/8_thumbnail.jpg',
    'https://static.remove.bg/uploader-examples/person/8_thumbnail.jpg',
    'https://static.remove.bg/uploader-examples/person/8_thumbnail.jpg',
    'https://static.remove.bg/uploader-examples/person/8_thumbnail.jpg'
];

const AddImageButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    padding: '16px',
    boxShadow: theme.shadows[2],
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));

const NewImageMenu = ({ handleImageUpload }) => (
    <Grid container spacing={2} alignItems="center">
        <Grid item>
            <label htmlFor="add-image">
                <input
                    accept="image/*"
                    id="add-image"
                    type="file"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    style={{ display: 'none' }}
                />
                <AddImageButton component="span">
                    <AddIcon fontSize="large" />
                </AddImageButton>
            </label>
        </Grid>
        {uploadedImages.map((src, index) => (
            <Grid item key={index}>
                <img
                    src={src}
                    alt={`uploaded-${index}`}
                    style={{ width: '100px', height: '100px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                />
            </Grid>
        ))}
    </Grid>
);

NewImageMenu.propTypes = {
    handleImageUpload: PropTypes.func.isRequired,
};

export default NewImageMenu;
