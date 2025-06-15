import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, signupSchema, serviceRequestSchema, searchSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      const user = await storage.getUserByEmail(data.email);
      
      if (!user || user.password !== data.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In a real app, you'd use JWT or sessions
      const token = `token_${user.id}_${Date.now()}`;
      
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          username: user.username
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { confirmPassword, ...signupData } = req.body;
      const data = insertUserSchema.parse(signupData);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await storage.createUser(data);
      const token = `token_${user.id}_${Date.now()}`;
      
      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          username: user.username
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    // In a real app, you'd invalidate the token/session
    res.json({ message: "Logged out successfully" });
  });

  app.get("/api/auth/profile", async (req, res) => {
    // Simple auth check - in real app use proper JWT verification
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Mock user lookup from token
    const token = authHeader.slice(7);
    const userId = parseInt(token.split('_')[1]);
    
    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      username: user.username
    });
  });

  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  app.post("/api/services/request", async (req, res) => {
    try {
      const data = serviceRequestSchema.parse(req.body);
      
      // Extract user ID from auth header (simplified)
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const token = authHeader.slice(7);
      const userId = parseInt(token.split('_')[1]);
      
      const serviceRequest = await storage.createServiceRequest({
        ...data,
        userId
      });
      
      res.status(201).json(serviceRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create service request" });
    }
  });

  // Search routes
  app.get("/api/search", async (req, res) => {
    try {
      const { q: query, limit = 10 } = req.query;
      const data = searchSchema.parse({ query, limit: parseInt(limit as string) });
      
      const results = await storage.searchServices(data.query, data.limit);
      await storage.logSearchQuery(data.query, results.length);
      
      res.json({ results, total: results.length });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Search failed" });
    }
  });

  app.get("/api/search/suggestions", async (req, res) => {
    try {
      const { q: query } = req.query;
      if (!query || typeof query !== 'string') {
        return res.json([]);
      }
      
      const suggestions = await storage.getSearchSuggestions(query);
      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch suggestions" });
    }
  });

  app.get("/api/search/popular-tags", async (req, res) => {
    try {
      const popularTags = await storage.getPopularSearchTags();
      res.json(popularTags);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch popular tags" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
