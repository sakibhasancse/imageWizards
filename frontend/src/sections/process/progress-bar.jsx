import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


const ProgressBar = ({ loading }) => (
    <Box sx={{ mt: 3, textAlign: 'center' }}>
        {loading && <CircularProgress />}
    </Box>
);

ProgressBar.propTypes = {
    loading: PropTypes.bool.isRequired,
};
export default ProgressBar;