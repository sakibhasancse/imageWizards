import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import BugReportIcon from '@mui/icons-material/BugReport'; // Add this import

import AppWidget from '../app-widget';

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
    </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={6}>
          <AppWidget
            title="Blood Vessels"
            icon={<BloodtypeIcon sx={{ fontSize: 48, color: 'primary.main' }} />}
            link="/process/vessel"
            sx={{ bgcolor: 'background.paper', color: 'text.primary' }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={6}>
          <AppWidget
            title="Lesions"
            icon={<BugReportIcon sx={{ fontSize: 48, color: 'error.main' }} />}
            link="/process/lesion"
            sx={{ bgcolor: 'background.paper', color: 'text.primary' }}
          />
        </Grid>
      </Grid>

    </Container>
  );
}
