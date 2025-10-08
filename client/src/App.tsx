import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./hooks/useAuth.jsx";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home.jsx";
import SignIn from "@/pages/SignIn.jsx";
import SignUp from "@/pages/SignUp.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import FAQ from "@/pages/FAQ.jsx";
import Profile from "@/pages/Profile.jsx";
import HistoryPage from "@/pages/HistoryPage.jsx";

function Router() {
  return (
    <Switch>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/signin">
      <SignIn />
    </Route>
    <Route path="/signup">
      <SignUp />
    </Route>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
    <Route path="/profile">
      <Profile />
    </Route>
    <Route path="/history">
      <HistoryPage />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider children={<><Toaster /><Router /></>} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
