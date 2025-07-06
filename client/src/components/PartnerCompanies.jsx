import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Sample partner companies data - can be moved to a separate file or API
const partnerCompanies = [
  {
    id: 1,
    name: 'Saudi Aramco',
    logo: 'https://via.placeholder.com/200x100/1e40af/ffffff?text=Aramco',
    description: 'Leading energy company'
  },
  {
    id: 2,
    name: 'SABIC',
    logo: 'https://via.placeholder.com/200x100/059669/ffffff?text=SABIC',
    description: 'Global chemicals company'
  },
  {
    id: 3,
    name: 'STC',
    logo: 'https://via.placeholder.com/200x100/dc2626/ffffff?text=STC',
    description: 'Telecommunications leader'
  },
  {
    id: 4,
    name: 'Al Rajhi Bank',
    logo: 'https://via.placeholder.com/200x100/7c3aed/ffffff?text=Al+Rajhi',
    description: 'Islamic banking services'
  },
  {
    id: 5,
    name: 'Maaden',
    logo: 'https://via.placeholder.com/200x100/ea580c/ffffff?text=Maaden',
    description: 'Mining and metals'
  },
  {
    id: 6,
    name: 'NEOM',
    logo: 'https://via.placeholder.com/200x100/0891b2/ffffff?text=NEOM',
    description: 'Future city project'
  },
  {
    id: 7,
    name: 'Red Sea Global',
    logo: 'https://via.placeholder.com/200x100/be123c/ffffff?text=Red+Sea',
    description: 'Tourism development'
  },
  {
    id: 8,
    name: 'Qiddiya',
    logo: 'https://via.placeholder.com/200x100/166534/ffffff?text=Qiddiya',
    description: 'Entertainment destination'
  }
];

const PartnerCompanies = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const containerRef = React.useRef(null);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === partnerCompanies.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === partnerCompanies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? partnerCompanies.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container-modern">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-gradient mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We partner with the most respected companies across Saudi Arabia and beyond, 
            delivering exceptional logistics solutions that drive business success.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 btn btn-secondary w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus-ring"
            aria-label="Previous partner"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 btn btn-secondary w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus-ring"
            aria-label="Next partner"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              ref={containerRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 4)}%)`,
                width: `${(partnerCompanies.length / 4) * 100}%`
              }}
            >
              {partnerCompanies.map((company, index) => (
                <div
                  key={company.id}
                  className="flex-shrink-0 w-1/4 px-4"
                  style={{ width: `${100 / 4}%` }}
                >
                  <div className="card card-hover p-6 h-48 flex flex-col items-center justify-center text-center group">
                    <div className="w-32 h-16 mb-4 overflow-hidden rounded-lg bg-white shadow-sm border">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      {company.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {company.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(partnerCompanies.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * 4)}
                className={`w-3 h-3 rounded-full transition-all duration-200 focus-ring ${
                  Math.floor(currentIndex / 4) === index
                    ? 'bg-primary scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 lg:hidden">
          {partnerCompanies.slice(0, 8).map((company) => (
            <div key={company.id} className="card card-hover p-4 text-center">
              <div className="w-16 h-8 mx-auto mb-3 overflow-hidden rounded bg-white shadow-sm border">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-full h-full object-contain p-1"
                  loading="lazy"
                />
              </div>
              <h4 className="font-medium text-sm text-foreground">
                {company.name}
              </h4>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 slide-up">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Ready to Partner with Rwafi?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join our network of trusted partners and experience seamless logistics solutions 
              that drive your business forward in the Saudi Arabian market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary">
                Become a Partner
              </button>
              <button className="btn btn-outline">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCompanies; 