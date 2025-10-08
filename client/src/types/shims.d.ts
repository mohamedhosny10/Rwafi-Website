declare module "wouter" {
  import * as React from "react";
  export interface RouteProps {
    path?: string;
    children?: React.ReactNode;
  }
  export const Route: React.FC<RouteProps>;
  export const Switch: React.FC<{ children?: React.ReactNode }>;
  export function Link(props: {
    href: string;
    children?: React.ReactNode;
    className?: string;
  }): JSX.Element;
}

declare module "@tanstack/react-query" {
  import * as React from "react";
  export class QueryClient {}
  export const QueryClientProvider: React.ComponentType<any>;
}

declare module "./hooks/useAuth.jsx" {
  import * as React from "react";
  export const AuthProvider: React.ComponentType<any>;
  export function useAuth(): any;
}


