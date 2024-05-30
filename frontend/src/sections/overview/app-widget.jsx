import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function AppWidget({ title, icon, link, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        ...sx,
      }}
      {...other}
    >
      {icon && (
        <Box sx={{ mr: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </Box>
      )}

      <Box>
        <Typography variant="h6" sx={{ mb: 1, color }}>
          {title}
        </Typography>
        <Link href={link} variant="body2" sx={{ color: 'primary.main' }}>
          Try Processing
        </Link>
      </Box>
    </Card>
  );
}

AppWidget.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
