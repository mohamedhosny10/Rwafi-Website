// Type declarations for JSX files
declare module './hooks/useAuth.jsx' {
  export const useAuth: () => any;
}

declare module '@/pages/Home.jsx' {
  const Home: React.ComponentType;
  export default Home;
}

declare module '@/pages/SignIn.jsx' {
  const SignIn: React.ComponentType;
  export default SignIn;
}

declare module '@/pages/SignUp.jsx' {
  const SignUp: React.ComponentType;
  export default SignUp;
}

declare module '@/pages/Dashboard.jsx' {
  const Dashboard: React.ComponentType;
  export default Dashboard;
}

declare module '@/pages/Profile.jsx' {
  const Profile: React.ComponentType;
  export default Profile;
}

declare module '@/pages/HistoryPage.jsx' {
  const HistoryPage: React.ComponentType;
  export default HistoryPage;
}
