import { 
  users, 
  services, 
  serviceRequests, 
  searchQueries,
  type User, 
  type InsertUser,
  type Service,
  type ServiceRequest
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service operations
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  searchServices(query: string, limit: number): Promise<Service[]>;
  
  // Service request operations
  createServiceRequest(request: Omit<ServiceRequest, 'id' | 'createdAt'>): Promise<ServiceRequest>;
  
  // Search operations
  logSearchQuery(query: string, results: number): Promise<void>;
  getSearchSuggestions(query: string): Promise<string[]>;
  getPopularSearchTags(): Promise<string[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private serviceRequests: Map<number, ServiceRequest>;
  private searchQueries: Map<number, any>;
  private currentUserId: number;
  private currentServiceId: number;
  private currentRequestId: number;
  private currentSearchId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.serviceRequests = new Map();
    this.searchQueries = new Map();
    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentRequestId = 1;
    this.currentSearchId = 1;
    
    // Initialize with default services
    this.initializeServices();
  }

  private initializeServices() {
    const defaultServices = [
      {
        id: this.currentServiceId++,
        nameEn: 'Topping Up',
        nameAr: 'زيادة الرصيد',
        descriptionEn: 'Reporting a payment to Rwafi Finance team so they can top up your account.',
        descriptionAr: 'ابلاغ فريق حسابات روافي بعملية دفع حتي يقوموا بتحديث الحسابات و زيادة الرصيد',
        icon: 'wallet',
        category: 'financial',
        isActive: true
      },
      {
        id: this.currentServiceId++,
        nameEn: 'Transfer Request',
        nameAr: 'طلب تحويل',
        descriptionEn: 'Balance refund or transfer between accounts.',
        descriptionAr: 'استرداد او تحويل الرصيد بين الحسابات',
        icon: 'transfer',
        category: 'financial',
        isActive: true
      },
      {
        id: this.currentServiceId++,
        nameEn: 'Complaint',
        nameAr: 'تقديم شكوى',
        descriptionEn: 'Report a complaint to Rwafi Management team.',
        descriptionAr: 'تقديم شكوي للفريق الاداري لروافي الأحلام',
        icon: 'message',
        category: 'support',
        isActive: true
      },
      {
        id: this.currentServiceId++,
        nameEn: 'Government Affairs',
        nameAr: 'الخدمات الحكومية',
        descriptionEn: 'Request government affair service.',
        descriptionAr: 'طلب خدمات حكومية كتجديد الأقامة و الخروج و العودة',
        icon: 'building',
        category: 'government',
        isActive: true
      }
    ];

    defaultServices.forEach(service => {
      this.services.set(service.id, service as Service);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(service => service.isActive);
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async searchServices(query: string, limit: number): Promise<Service[]> {
    const allServices = Array.from(this.services.values());
    const lowerQuery = query.toLowerCase();
    
    const matches = allServices.filter(service => 
      service.isActive && (
        service.nameEn.toLowerCase().includes(lowerQuery) ||
        service.nameAr.includes(query) ||
        service.descriptionEn.toLowerCase().includes(lowerQuery) ||
        service.descriptionAr.includes(query) ||
        service.category.toLowerCase().includes(lowerQuery)
      )
    );
    
    return matches.slice(0, limit);
  }

  async createServiceRequest(request: Omit<ServiceRequest, 'id' | 'createdAt'>): Promise<ServiceRequest> {
    const id = this.currentRequestId++;
    const serviceRequest: ServiceRequest = {
      ...request,
      id,
      createdAt: new Date()
    };
    this.serviceRequests.set(id, serviceRequest);
    return serviceRequest;
  }

  async logSearchQuery(query: string, results: number): Promise<void> {
    const id = this.currentSearchId++;
    const searchQuery = {
      id,
      query,
      results,
      createdAt: new Date()
    };
    this.searchQueries.set(id, searchQuery);
  }

  async getSearchSuggestions(query: string): Promise<string[]> {
    const suggestions = [
      'خدمات التوثيق والتصديق',
      'تجديد الإقامة',
      'السجل التجاري',
      'رخصة القيادة',
      'التأمين الاجتماعي',
      'المحاكم والقضايا',
      'التموين والدعم',
      'الخروج والعودة'
    ];
    
    if (query.length < 2) return [];
    
    return suggestions.filter(suggestion => 
      suggestion.includes(query)
    ).slice(0, 5);
  }

  async getPopularSearchTags(): Promise<string[]> {
    return [
      'المحاكم',
      'التوثيق', 
      'السجل التجاري',
      'رخصة',
      'مركباتي',
      'التموين',
      'التأمين الاجتماعي'
    ];
  }
}

export const storage = new MemStorage();
