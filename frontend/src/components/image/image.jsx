
import styled from '@mui/system/styled';

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

export default ImageButton;
