import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import styled from '@mui/system/styled';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

import ImageButton from 'src/components/image/image';

const AddImageButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    padding: '16px',
    boxShadow: theme.shadows[2],
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));

const NewImageMenu = ({ handleImageUpload, loadPreviewImage, oldImages }) => (
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
        {oldImages.map((image, index) => (
            <Grid item key={index}>
                <ImageButton
                    type="button"
                    onClick={() => loadPreviewImage(image)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            loadPreviewImage(image);
                        }
                    }}
                >
                    <img
                        src={image.org}
                        alt={`uploaded-images-${index}`}
                        style={{ width: '80px', height: '80px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                    />
                </ImageButton>
            </Grid>
        ))}
    </Grid>
);

NewImageMenu.propTypes = {
    handleImageUpload: PropTypes.func.isRequired,
    oldImages: PropTypes.arrayOf(
        PropTypes.shape({
            org: PropTypes.string.isRequired,
            proc: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    loadPreviewImage: PropTypes.func.isRequired
};

export default NewImageMenu;
