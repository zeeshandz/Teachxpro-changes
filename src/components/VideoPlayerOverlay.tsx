import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, Rewind, FastForward } from 'lucide-react';

interface VideoPlayerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

function VideoPlayerOverlay({ isOpen, onClose }: VideoPlayerOverlayProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [showControls, setShowControls] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout>();
  const playAttemptRef = React.useRef<NodeJS.Timeout>();
  
  const videoSource = "https://mpkzvmeaezzezslchdls.supabase.co/storage/v1/object/public/intro-video//teachxprointro-compressed.mp4";

  const togglePlay = async () => {
    if (videoRef.current) {
      if (playAttemptRef.current) {
        clearTimeout(playAttemptRef.current);
      }

      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.error('Playback failed:', err);
          // Retry play after a short delay
          playAttemptRef.current = setTimeout(async () => {
            try {
              await videoRef.current?.play();
              setIsPlaying(true);
            } catch (retryErr) {
              console.error('Retry failed:', retryErr);
              setError('Failed to start playback. Please try again.');
            }
          }, 300);
        }
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setCurrentTime(videoRef.current.currentTime);
      setProgress(progress);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const width = bounds.width;
      const percentage = x / width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    setError('Failed to load video. Please try again later.');
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const cleanup = () => {
      if (playAttemptRef.current) {
        clearTimeout(playAttemptRef.current);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      cleanup();
    };
  }, []);

  React.useEffect(() => {
    return () => {
      if (playAttemptRef.current) {
        clearTimeout(playAttemptRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-5xl bg-black/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-white/10 rounded-full backdrop-blur-sm transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video">
              <div
                className="relative w-full h-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onError={handleError}
                  src={videoSource}
                  playsInline
              />

              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <div className="text-white text-center p-4">
                    <p className="text-red-400 mb-2">{error}</p>
                    <button
                      onClick={() => {
                        setError(null);
                        if (videoRef.current) {
                          videoRef.current.load();
                        }
                      }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Video Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-[2px]"
              >
                {/* Progress Bar */}
                <div
                  className="relative h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer group"
                  onClick={handleProgressClick}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:from-blue-400 group-hover:to-purple-400 transition-colors"
                    style={{ width: `${progress}%` }}
                  />
                  <div className="absolute -top-2 -bottom-2 left-0 right-0">
                    <div
                      className="h-4 w-4 bg-white shadow-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ transform: `translateX(${progress}%)` }}
                    />
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => skip(-10)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Rewind className="h-5 w-5 text-white" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="p-3 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6 text-white" />
                      ) : (
                        <Play className="h-6 w-6 text-white" />
                      )}
                    </button>

                    <button
                      onClick={() => skip(10)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <FastForward className="h-5 w-5 text-white" />
                    </button>

                    <div className="flex items-center gap-2 group relative">
                      <button
                        onClick={toggleMute}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="h-5 w-5 text-white" />
                        ) : (
                          <Volume2 className="h-5 w-5 text-white" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-0 group-hover:w-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>

                    <span className="text-sm text-white/80">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {}}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Settings className="h-5 w-5 text-white" />
                    </button>

                    <button
                      onClick={toggleFullscreen}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {isFullscreen ? (
                        <Minimize className="h-5 w-5 text-white" />
                      ) : (
                        <Maximize className="h-5 w-5 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VideoPlayerOverlay;