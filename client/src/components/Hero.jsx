const Hero = () => {
  const scrollToServices = () => {
    document.getElementById('services-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleLearnMore = () => {
    document.getElementById('search-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e40af" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 arabic-text">
            أي خدمة؟
          </h1>
          
          {/* English Tagline */}
          <h2 className="text-2xl lg:text-3xl font-semibold text-primary mb-4">
            Your Gateway to Saudi Market Success
          </h2>
          
          {/* Arabic Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto arabic-text" dir="rtl">
            اجعل دخولك إلى السوق السعودي أمراً سهلاً مع حلولنا اللوجستية الشاملة
          </p>
          
          {/* English Subtitle */}
          <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto">
            Streamline your business entry into Saudi Arabia with our comprehensive logistics solutions
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToServices}
              className="px-8 py-4 bg-primary text-white rounded-full hover:bg-blue-800 transition-all duration-200 transform hover:scale-105 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              ابدأ الآن
            </button>
            <button 
              onClick={handleLearnMore}
              className="px-8 py-4 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-200 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
