import { useState, useEffect, createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '../lib/api';
import { useToast } from './use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get user profile on mount if token exists
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['/api/auth/profile'],
    enabled: !!localStorage.getItem('authToken'),
    retry: false,
    onSuccess: (data) => {
      setUser(data);
      setIsAuthenticated(true);
    },
    onError: () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (response) => {
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/profile'] });
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "أهلاً بك في روافي",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الدخول",
        description: error.response?.data?.message || "تحقق من بياناتك وحاول مرة أخرى",
      });
    }
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: authAPI.signup,
    onSuccess: (response) => {
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/profile'] });
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "أهلاً بك في روافي",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "خطأ في إنشاء الحساب",
        description: error.response?.data?.message || "حدث خطأ أثناء إنشاء الحساب",
      });
    }
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      queryClient.clear();
      toast({
        title: "تم تسجيل الخروج",
        description: "نراك قريباً",
      });
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const userObj = JSON.parse(savedUser);
        setUser(userObj);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    return loginMutation.mutateAsync(credentials);
  };

  const signup = async (userData) => {
    return signupMutation.mutateAsync(userData);
  };

  const logout = async () => {
    return logoutMutation.mutateAsync();
  };

  const value = {
    user,
    isAuthenticated,
    isLoading: isLoading || profileLoading,
    login,
    signup,
    logout,
    isLoginLoading: loginMutation.isPending,
    isSignupLoading: signupMutation.isPending,
    isLogoutLoading: logoutMutation.isPending
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
