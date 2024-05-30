import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const ImageView = ({ imageSrc, altText }) => (
    <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={imageSrc} alt={altText} style={{ maxWidth: '100%', height: 'auto' }} />
        <Typography variant="h6">{altText}</Typography>
    </Card>
);

ImageView.propTypes = {
    imageSrc: PropTypes.string,
    altText: PropTypes.string.isRequired,
};

ImageView.defaultProps = {
    imageSrc: null,
};
export default ImageView;
