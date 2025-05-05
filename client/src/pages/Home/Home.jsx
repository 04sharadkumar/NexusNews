import { useState, useEffect } from 'react';
import BreakingNewsAlert from './BreakingNewsAlert';
import NewsHero from './NewsHero';
import SpecialFeatures from './SpecialFeatures';
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Articles from './Articles';
import Content from './Content';

const NextGenNewsHome = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        
        setTimeout(() => {
        setIsLoading(false);

        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">

        <BreakingNewsAlert breakingNews={[]} />
        {isLoading ? (<LoadingSpinner />) :  
        (<> 
        <NewsHero />
        <Articles />
        <Content />
        <SpecialFeatures /> 
        
        </>)  }
      </main>
    </div>
  );
};

export default NextGenNewsHome;