import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
// @ts-ignore
import { AuthProvider } from "./hooks/useAuth.jsx";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home.jsx";
import SignIn from "@/pages/SignIn.jsx";
import SignUp from "@/pages/SignUp.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import Profile from "@/pages/Profile.jsx";
import HistoryPage from "@/pages/HistoryPage.jsx";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home as any} />
      <Route path="/signin" component={SignIn as any} />
      <Route path="/signup" component={SignUp as any} />
      <Route path="/dashboard" component={Dashboard as any} />
   
      <Route path="/profile" component={Profile as any} />
      <Route path="/history" component={HistoryPage as any} />
      <Route component={NotFound as any} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
