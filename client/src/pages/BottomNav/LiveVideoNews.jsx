import React, { useState, useEffect, useRef } from "react";
import { FaHeart, FaUser, FaArrowLeft, FaBookmark, FaVolumeUp, FaVolumeMute,FaClosedCaptioning} from "react-icons/fa";
import { Link } from "react-router-dom";

const LiveVideoNews = () => {
  const [count,setCount] = useState(100)
  const [videos] = useState([
    
    { 
      id: 1,
      links: {
        'Auto': "https://www.youtube.com/embed/xRPjKQtRXR8?enablejsapi=1",
        'HD': "https://www.youtube.com/embed/xRPjKQtRXR8?enablejsapi=1&vq=hd1080",
        '720p': "https://www.youtube.com/embed/xRPjKQtRXR8?enablejsapi=1&vq=hd720",
        '480p': "https://www.youtube.com/embed/xRPjKQtRXR8?enablejsapi=1&vq=medium",
        '360p': "https://www.youtube.com/embed/xRPjKQtRXR8?enablejsapi=1&vq=small",
        '240p': "https://www.youtube.com/embed/xRPjKQtRXR8?enablejsapi=1&vq=tiny",
        '144p': "https://www.youtube.com/embed/xRPjKQtRXR8?enablejsapi=1&vq=smallest"
      },
      title: "NASA LIVE STREAM", 
      description: "This is an ISS live earth view happening right now from space at the International Space Station.", 
      username: "Nasa",
      captions: true,
      category: "ScienceTv"
    },
    
    // Technology Category
    { 
      
      id: 2,
      links: {
        'Auto': "https://www.youtube.com/embed/Nq2wYlWFucg?enablejsapi=1",
        'HD'  : "https://www.youtube.com/embed/Nq2wYlWFucg?enablejsapi=1&vq=hd1080",
        '720p': "https://www.youtube.com/embed/Nq2wYlWFucg?enablejsapi=1&vq=hd720",
        '480p': "https://www.youtube.com/embed/Nq2wYlWFucg?enablejsapi=1&vq=medium",
        '360p': "https://www.youtube.com/embed/Nq2wYlWFucg?enablejsapi=1&vq=small",
        '240p': "https://www.youtube.com/embed/Nq2wYlWFucg?enablejsapi=1&vq=tiny",
        '144p': "https://www.youtube.com/embed/Nq2wYlWFucg?enablejsapi=1&vq=smallest"
      },
      title: "Tech Innovations", 
      description: "Latest tech reveals from CES 2023 - see the future before it happens!", 
      username: "Ajj Tak",
      likes: 189300,
      comments: 5300,
      shares: 4100,
      captions: true,
      category: "technology"
    },
    
    // Sports Category 
    
    
    { 
      id: 3,
      links: {
        'Auto': "https://www.youtube.com/embed/wRugKdhD2Bg?enablejsapi=1",
        'HD': "https://www.youtube.com/embed/wRugKdhD2Bg?enablejsapi=1&vq=hd1080",
        '720p': "https://www.youtube.com/embed/wRugKdhD2Bg?enablejsapi=1&vq=hd720",
        '480p': "https://www.youtube.com/embed/wRugKdhD2Bg?enablejsapi=1&vq=medium",
        '360p': "https://www.youtube.com/embed/wRugKdhD2Bg?enablejsapi=1&vq=small",
        '240p': "https://www.youtube.com/embed/wRugKdhD2Bg?enablejsapi=1&vq=tiny",
        '144p': "https://www.youtube.com/embed/wRugKdhD2Bg?enablejsapi=1&vq=smallest"
      },
      title: "", 
      description: "Relive the most exciting moments from last night's championship game!", 
      username: "NEWS24",
      captions: false,
      category: "sports"
    },
    
    // Entertainment Category
    { 
      id: 4,
      links: {
        'Auto': "https://www.youtube.com/embed/UDmxooFKjlU?enablejsapi=1",
        'HD': "https://www.youtube.com/embed/UDmxooFKjlU?enablejsapi=1&vq=hd1080",
        '720p': "https://www.youtube.com/embed/UDmxooFKjlU?enablejsapi=1&vq=hd720",
        '480p': "https://www.youtube.com/embed/UDmxooFKjlU?enablejsapi=1&vq=medium",
        '360p': "https://www.youtube.com/embed/UDmxooFKjlU?enablejsapi=1&vq=small",
        '240p': "https://www.youtube.com/embed/UDmxooFKjlU?enablejsapi=1&vq=tiny",
        '144p': "https://www.youtube.com/embed/UDmxooFKjlU?enablejsapi=1&vq=smallest"
      },
      title: "Celebrity Interviews", 
      description: "Exclusive backstage interviews with your favorite stars at the awards show.", 
      username: "CNBC_Tv18",
      likes: 178500,
      comments: 6200,
      shares: 3800,
      captions: true,
      category: "entertainment"
    },
    
    // Science Category
    { 
      id: 5,
      links: {
        'Auto': "https://www.youtube.com/embed/bcssKkDKASU?enablejsapi=1",
        'HD': "https://www.youtube.com/embed/bcssKkDKASU?enablejsapi=1&vq=hd1080",
        '720p': "https://www.youtube.com/embed/bcssKkDKASU?enablejsapi=1&vq=hd720",
        '480p': "https://www.youtube.com/embed/bcssKkDKASU?enablejsapi=1&vq=medium",
        '360p': "https://www.youtube.com/embed/bcssKkDKASU?enablejsapi=1&vq=small",
        '240p': "https://www.youtube.com/embed/bcssKkDKASU?enablejsapi=1&vq=tiny",
        '144p': "https://www.youtube.com/embed/bcssKkDKASU?enablejsapi=1&vq=smallest"
      },
      title: "Space Exploration", 
      description: "NASA's latest discoveries from the James Webb Space Telescope.", 
      username: "Lofi_Music",
      likes: 156200,
      comments: 3400,
      shares: 2900,
      captions: true,
      category: "science"
    },
    
    // Cooking Category
    { 
      id: 6,
      links: {
        'Auto': "https://www.youtube.com/embed/rEKifG2XUZg?enablejsapi=1",
        'HD': "https://www.youtube.com/embed/rEKifG2XUZg?enablejsapi=1&vq=hd1080",
        '720p': "https://www.youtube.com/embed/rEKifG2XUZg?enablejsapi=1&vq=hd720",
        '480p': "https://www.youtube.com/embed/rEKifG2XUZg?enablejsapi=1&vq=medium",
        '360p': "https://www.youtube.com/embed/rEKifG2XUZg?enablejsapi=1&vq=small",
        '240p': "https://www.youtube.com/embed/rEKifG2XUZg?enablejsapi=1&vq=tiny",
        '144p': "https://www.youtube.com/embed/rEKifG2XUZg?enablejsapi=1&vq=smallest"
      },
      title: "5 Minute Recipes", 
      description: "Learn to make delicious meals in just 5 minutes - perfect for busy weeknights!", 
      username: "CartoonNetwork",
      likes: 98700,
      comments: 2100,
      shares: 1500,
      captions: false,
      category: "cooking"
    }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interactions, setInteractions] = useState(() => 
    videos.reduce((acc, video) => ({
      ...acc,
      [video.id]: { liked: false, saved: false }
    }), {})
  );
  const [videoSettings, setVideoSettings] = useState({
    muted: true,
    captions: false,
    quality: 'Auto',
    showQualityMenu: false
  });
  
  const videoRefs = useRef([]);
  const videoContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const touchStartY = useRef(0);

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Handle wheel navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (videoContainerRef.current?.contains(e.target)) {
        e.preventDefault();
        
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          setCurrentIndex(prev => {
            const direction = e.deltaY > 0 ? 1 : -1;
            return Math.min(Math.max(prev + direction, 0), videos.length - 1);
          });
        }, 150);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [videos.length]);

  // Handle touch events for mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e) => {
      const endY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - endY;
      
      if (Math.abs(diff) > 50) {
        setCurrentIndex(prev => {
          return diff > 0 
            ? Math.min(prev + 1, videos.length - 1)
            : Math.max(prev - 1, 0);
        });
      }
    };

    const container = videoContainerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [videos.length]);

  // Video management
  useEffect(() => {
    videoRefs.current.forEach((iframe, index) => {
      if (iframe && iframe.contentWindow) {
        if (index !== currentIndex) {
          // Pause all other videos
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        } else {
          // Configure current video
          const settings = [
            `{"event":"command","func":"${videoSettings.muted ? 'mute' : 'unMute'}","args":""}`,
            `{"event":"command","func":"setPlaybackQuality","args":"${videoSettings.quality}"}`,
            `{"event":"command","func":"${videoSettings.captions ? 'showCaptions' : 'hideCaptions'}","args":""}`,
            '{"event":"command","func":"playVideo","args":""}'
          ];
          
          settings.forEach(setting => {
            iframe.contentWindow.postMessage(setting, '*');
          });
        }
      }
    });
  }, [currentIndex, videoSettings]);

  const toggleInteraction = (videoId, type) => {
    setInteractions(prev => ({
      ...prev,
      [videoId]: {
        ...prev[videoId],
        [type]: !prev[videoId][type]
      }
    }));
  };

  const toggleSetting = (setting) => {
    setVideoSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const changeQuality = (quality) => {
    setVideoSettings(prev => ({ ...prev, quality, showQualityMenu: false }));
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 flex items-center px-4 py-3 bg-gradient-to-b from-black/80 to-transparent z-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          aria-label="Go back"
        >
          <FaArrowLeft className="text-xl text-white group-hover:text-gray-300 transition-colors" />
          <h1 className="text-xl font-bold text-white">News Reels</h1>
        </Link>
      </header>

      {/* Video Container */}
      <div 
        ref={videoContainerRef} 
        className="w-full h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
      >
        {videos.map((video, index) => (
          <section 
            key={video.id}
            className="w-full h-full snap-start relative flex items-center justify-center"
          >
            {/* Video Player */}
            <div className="relative w-full h-full max-w-md">
              <iframe
                ref={(el) => (videoRefs.current[index] = el)}
                className="absolute inset-0 w-full h-full"
                src={`${video.links[videoSettings.quality]}&autoplay=${index === currentIndex ? 1 : 0}&mute=${videoSettings.muted ? 1 : 0}&controls=0&modestbranding=1&rel=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
            </div>

            {/* Video Info */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 z-10">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <FaUser className="text-gray-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">@{video.username}</span>
                    <button 
                      className="px-3 py-0.5 text-xs font-medium border border-white/50 rounded-full text-white hover:bg-white/10 transition-colors"
                      aria-label={`Follow ${video.username}`}
                    >
                      Follow
                    </button>
                  </div>
                  <p className="text-sm text-gray-200 mt-1">{video.description}</p>
                </div>
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-5 items-center z-10">
              <button 
                onClick={() => toggleInteraction(video.id, 'liked')}
                className="flex flex-col items-center group"
                aria-label={interactions[video.id]?.liked ? "Unlike" : "Like"}
              >
                <div className="p-2 rounded-full group-hover:bg-white/10 transition-colors">
                  <FaHeart 
                    size={24} 
                    className={interactions[video.id]?.liked ? "text-red-500" : "text-white"}

                    onClick={()=>{
                      if (!interactions[video.id]?.liked) {
                        setCount(count+1)
                        
                      }
                    }} 
                  />
                </div>
                <span className="text-xs text-white mt-1">
                  <p>{count}k</p>
                </span>
              </button>
                         
              
              <button 
                onClick={() => toggleInteraction(video.id, 'saved')}
                className="flex flex-col items-center group"
                aria-label={interactions[video.id]?.saved ? "Unsave" : "Save"}
              >
                <div className="p-2 rounded-full group-hover:bg-white/10 transition-colors">
                  <FaBookmark 
                    size={24} 
                    className={interactions[video.id]?.saved ? "text-blue-400" : "text-white"} 
                  />
                </div>
              </button>
              
              {/* Sound Toggle */}
              <button 
                onClick={() => toggleSetting('muted')}
                className="flex flex-col items-center group"
                aria-label={videoSettings.muted ? "Unmute" : "Mute"}
              >
                <div className="p-2 rounded-full group-hover:bg-white/10 transition-colors">
                  {videoSettings.muted ? (
                    <FaVolumeMute size={24} className="text-white" />
                  ) : (
                    <FaVolumeUp size={24} className="text-white" />
                  )}
                </div>
              </button>
              
              {/* Captions Toggle (if available) */}
              {video.captions && (
                <button 
                  onClick={() => toggleSetting('captions')}
                  className="flex flex-col items-center group"
                  aria-label={videoSettings.captions ? "Hide captions" : "Show captions"}
                >
                  <div className={`p-2 rounded-full group-hover:bg-white/10 transition-colors ${videoSettings.captions ? 'text-blue-400' : 'text-white'}`}>
                    <FaClosedCaptioning size={24} />
                  </div>
                </button>
              )}
              
              {/* Quality Selector */}
              <div className="relative">
                <button 
                  onClick={() => toggleSetting('showQualityMenu')}
                  className="flex flex-col items-center group"
                  aria-label="Video quality options"
                >
                  <div className="p-2 rounded-full group-hover:bg-white/10 transition-colors">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">{videoSettings.quality}</span>
                    </div>
                  </div>
                </button>
                
                {videoSettings.showQualityMenu && (
                  <div className="absolute bottom-full right-0 mb-2 w-24 bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl z-20">
                    {['Auto', 'HD', '720p', '480p', '360p', '240p', '144p'].map(quality => (
                      <button
                      key={quality}
                      onClick={() => changeQuality(quality)}
                      className={`w-full px-3 py-2 text-left text-sm ${videoSettings.quality === quality ? 'bg-blue-500 text-white' : 'text-gray-200 hover:bg-gray-700'}`}>
                      {quality}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Navigation Indicators */}
      <nav className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white scale-125' : 'bg-gray-500 hover:bg-gray-400'}`}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </nav>
    </div>
  );
};

export default LiveVideoNews;