import React, { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { id: 'all', name: 'All Services', icon: BuildingOfficeIcon },
    { id: 'documentation', name: 'Documentation', icon: BuildingOfficeIcon },
    { id: 'government', name: 'Government Services', icon: BuildingOfficeIcon },
    { id: 'logistics', name: 'Logistics', icon: BuildingOfficeIcon },
    { id: 'hr', name: 'HR Services', icon: BuildingOfficeIcon },
  ];

  const popularSearches = [
    'Business Registration',
    'Visa Processing',
    'Customs Clearance',
    'Document Translation',
    'Work Permits',
    'Company Formation'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate search processing
    setTimeout(() => {
      setIsSearching(false);
      // Handle search logic here
      console.log('Searching for:', searchQuery, 'in category:', selectedCategory);
    }, 1000);
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    // Trigger search immediately
    console.log('Quick search for:', query);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-blue-50">
      <div className="container-modern">
        {/* Section Header */}
        <div className="text-center mb-12 fade-in">
          <h2 className="text-gradient mb-4">
            Find the Right Service for Your Business
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search through our comprehensive range of logistics and business services 
            to find exactly what you need for your Saudi Arabian operations.
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto slide-up">
          <div className="card p-8 shadow-xl">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-6">
              {/* Category Selection */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-ring ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services, documents, or requirements..."
                  className="input pl-12 pr-4 py-4 text-lg w-full"
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="absolute inset-y-0 right-0 px-6 flex items-center btn btn-primary rounded-l-none"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Popular Searches:
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleQuickSearch(search)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 focus-ring"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search Results Preview */}
        {searchQuery && (
          <div className="mt-8 max-w-4xl mx-auto slide-up">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">
                Search Results for "{searchQuery}"
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BuildingOfficeIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">
                        {searchQuery} Service {item}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive solution for {searchQuery.toLowerCase()} requirements
                      </p>
                    </div>
                    <button className="btn btn-outline text-sm">
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: MagnifyingGlassIcon,
              title: 'Smart Search',
              description: 'AI-powered search that understands your business needs and suggests relevant services.'
            },
            {
              icon: MapPinIcon,
              title: 'Local Expertise',
              description: 'Deep understanding of Saudi Arabian regulations and business requirements.'
            },
            {
              icon: BuildingOfficeIcon,
              title: 'Comprehensive Solutions',
              description: 'End-to-end services from initial setup to ongoing operations and compliance.'
            }
          ].map((feature, index) => (
            <div key={index} className="text-center scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
