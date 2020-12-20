import React from 'react';

const Home = React.lazy(() => import('./views/home/Home'));
const Profile = React.lazy(() => import('./views/profile/Profile'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home, protected: false },
  { path: '/profile', name: 'Profile', component: Profile, protected: true },
];

export default routes;
