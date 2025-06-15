import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { searchAPI } from '../lib/api';
import { POPULAR_TAGS } from '../utils/constants';
import { useToast } from '../hooks/use-toast';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const { toast } = useToast();

  // Get search suggestions
  const { data: suggestions = [], isLoading: suggestionsLoading } = useQuery({
    queryKey: ['/api/search/suggestions', searchQuery],
    enabled: searchQuery.length > 2,
    retry: false,
    onError: (error) => {
      console.error('Failed to fetch suggestions:', error);
    }
  });

  // Get popular tags
  const { data: popularTags = POPULAR_TAGS } = useQuery({
    queryKey: ['/api/search/popular-tags'],
    retry: false,
    onError: () => {
      // Fallback to static tags if API fails
      console.warn('Using fallback popular tags');
    }
  });

  const handleSearchInput = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ في البحث",
        description: "يرجى إدخال كلمة للبحث",
      });
      return;
    }

    try {
      const response = await searchAPI.search(searchQuery);
      console.log('Search results:', response.data);
      
      toast({
        title: "نتائج البحث",
        description: `تم العثور على ${response.data.results?.length || 0} نتيجة`,
      });
      
      // Here you would typically navigate to a results page or update UI
      // For now, we'll just log the results
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        variant: "destructive",
        title: "خطأ في البحث",
        description: "حدث خطأ أثناء البحث، يرجى المحاولة مرة أخرى",
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // Automatically search when suggestion is selected
    setTimeout(() => handleSearch(), 100);
  };

  const selectTag = (tag) => {
    setSearchQuery(tag);
    setTimeout(() => handleSearch(), 100);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="py-16 bg-white" id="search-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 arabic-text">
            ابحث عن الخدمة التي تحتاجها
          </h3>
          <p className="text-lg text-gray-600">
            Find the service you need quickly and efficiently
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8" ref={searchRef}>
          <div className="relative">
            <input 
              type="text" 
              placeholder="أنا محتاج..." 
              value={searchQuery}
              onChange={handleSearchInput}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-4 pr-16 text-lg border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 arabic-text"
              dir="rtl"
            />
            <button 
              onClick={handleSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary text-white rounded-xl hover:bg-blue-800 transition-colors duration-200 flex items-center space-x-2"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span>ابحث</span>
            </button>
          </div>
          
          {/* Search Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 max-h-64 overflow-y-auto">
              {suggestionsLoading ? (
                <div className="p-4 text-center text-gray-500">جاري البحث...</div>
              ) : suggestions.length > 0 ? (
                <div className="p-4 space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      onClick={() => selectSuggestion(suggestion)}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200 arabic-text"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              ) : searchQuery.length > 2 ? (
                <div className="p-4 text-center text-gray-500">لا توجد اقتراحات</div>
              ) : null}
            </div>
          )}
        </div>

        {/* Popular Tags */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4 arabic-text">خدمات شائعة:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map((tag, index) => (
              <button 
                key={index}
                onClick={() => selectTag(tag)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-all duration-200 text-sm arabic-text"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
