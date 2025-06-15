import { useQuery } from '@tanstack/react-query';
import { servicesAPI } from '../lib/api';
import { SERVICES } from '../utils/constants';
import ServiceCard from './ServiceCard';
import { useToast } from '../hooks/use-toast';

const ServicesGrid = () => {
  const { toast } = useToast();

  // Fetch services from API with fallback to static data
  const { data: services = SERVICES, isLoading, error } = useQuery({
    queryKey: ['/api/services'],
    retry: false,
    onError: (error) => {
      console.warn('Failed to fetch services from API, using static data:', error);
    }
  });

  const handleServiceClick = async (service) => {
    try {
      console.log('Service selected:', service);
      
      // Make API call to request service
      const response = await servicesAPI.request({
        serviceId: service.id,
        details: `User requested ${service.nameEn} service`
      });

      toast({
        title: "تم تقديم الطلب",
        description: `تم تقديم طلب للخدمة: ${service.nameAr}`,
      });

      console.log('Service request submitted:', response.data);
      
    } catch (error) {
      console.error('Failed to submit service request:', error);
      
      toast({
        variant: "destructive", 
        title: "خطأ في تقديم الطلب",
        description: "حدث خطأ أثناء تقديم الطلب، يرجى المحاولة مرة أخرى",
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50" id="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 arabic-text">
              خدماتنا المتميزة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive services designed to facilitate your business operations in Saudi Arabia
            </p>
          </div>
          
          {/* Loading Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 arabic-text">
            خدماتنا المتميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive services designed to facilitate your business operations in Saudi Arabia
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-center">
              تم تحميل البيانات المحلية - قد تكون بعض الخدمات غير متاحة
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onClick={handleServiceClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
