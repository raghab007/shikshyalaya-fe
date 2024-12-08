import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School'; // Icon for Courses
import GroupIcon from '@mui/icons-material/Group'; // Icon for Users
import PersonIcon from '@mui/icons-material/Person'; // Icon for Instructors
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';

// Customized styling to replace Toolpad branding with Shicshyalaya text
const CustomDashboardLayout = styled(DashboardLayout)(({ theme }) => ({
  // Hide the Toolpad logo and branding
  '& .Toolpad-Branding': {
    display: 'none', // Hide the Toolpad logo and text
  },
  '& .Toolpad-Header': {
    display: 'none', // Hide the header if Toolpad branding is part of the header
  },
  '& .Shicshyalaya-Branding': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
}));

const NAVIGATION = [
  {
    kind: 'header',
    title: 'E-Learning Management',
  },
  {
    segment: 'courses',
    title: 'Courses',
    icon: <SchoolIcon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <GroupIcon />,
  },
  {
    segment: 'instructors',
    title: 'Instructors',
    icon: <PersonIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function ELearningDashboard(props) {
  const { window } = props;
  const router = useDemoRouter('/courses');
  const demoWindow = window ? window() : undefined;

  // Function to render content based on active tab
  const renderContent = (activeTab) => {
    switch (activeTab) {
      case 'courses':
        return (
          <>
            <h2>Courses</h2>
            <Skeleton height={200} />
            <p>Here you can manage and view available courses for students.</p>
          </>
        );
      case 'users':
        return (
          <>
            <h2>Users</h2>
            <Skeleton height={200} />
            <p>View and manage the users (students) who have registered on the platform.</p>
          </>
        );
      case 'instructors':
        return (
          <>
            <h2>Instructors</h2>
            <Skeleton height={200} />
            <p>Manage and view the instructors who create and manage courses on the platform.</p>
          </>
        );
      default:
        return (
          <>
            <h2>Welcome</h2>
            <p>Select a section to manage.</p>
          </>
        );
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <CustomDashboardLayout>
        <div className="Shicshyalaya-Branding">
          Shicshyalaya
        </div>
        <PageContainer>
          <Grid container spacing={1}>
            <Grid size={12}>
              {/* Render content based on the current active tab */}
              {renderContent(router.pathname.replace('/', ''))}
            </Grid>
          </Grid>
        </PageContainer>
      </CustomDashboardLayout>
    </AppProvider>
  );
}
