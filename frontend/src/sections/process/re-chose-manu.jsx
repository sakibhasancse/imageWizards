import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

const ReChoseMenu = ({ handleImageUpload }) => (
    <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="file-upload">
            <input
                accept="image/*"
                id="file-upload"
                type="file"
                onChange={(e) => handleImageUpload(e.target.files[0])}
            />
            <Button variant="contained" component="span">
                Add Image
            </Button>
        </label>
    </Card>
);

ReChoseMenu.propTypes = {
    handleImageUpload: PropTypes.func.isRequired,
};

export default ReChoseMenu;
