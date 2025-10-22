import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect, useRef } from "react";
import AdminPanel, { AdminPanelRef } from "@/components/AdminPanel";
import VideoModal from "@/components/VideoModal";
import AuthDialog from "@/components/AuthDialog";
import type { Video } from "@/components/AdminPanel";

const Index = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const adminPanelRef = useRef<AdminPanelRef>(null);

  const API_URL = "https://functions.poehali.dev/a842ae3d-4c06-42eb-9822-98283a367451";

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6 animate-float">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-xl opacity-50"></div>
                <Icon name="Trophy" size={80} className="text-primary relative z-10" />
              </div>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black text-impact glow-gold mb-4 tracking-wider">
              #MELLSTROYGAME
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Самые крупные выигрыши и невероятные заносы от легендарного стримера
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Badge variant="outline" className="text-lg px-6 py-3 bg-primary/10 border-primary text-primary hover:bg-primary/20">
                <Icon name="Eye" size={20} className="mr-2" />
                15M+ просмотров
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-secondary/10 border-secondary text-secondary hover:bg-secondary/20">
                <Icon name="TrendingUp" size={20} className="mr-2" />
                {videos.length}+ выигрышей
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-primary/10 border-primary text-primary hover:bg-primary/20">
                <Icon name="DollarSign" size={20} className="mr-2" />
                50M+ раздано
              </Badge>
            </div>
            
            {videos.length > 0 && (
              <Button 
                size="lg" 
                className="text-xl px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-2xl hover:scale-105 transition-transform"
                onClick={() => setSelectedVideo(videos[0])}
              >
                <Icon name="Play" size={24} className="mr-2" />
                Смотреть последний выигрыш
              </Button>
            )}
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-black text-impact text-primary">
                🎰 Топ выигрыши
              </h2>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Все видео
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto" />
                <p className="mt-4 text-muted-foreground">Загрузка видео...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <Card 
                    key={video.id}
                    className="group overflow-hidden bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div 
                      className="relative aspect-video overflow-hidden cursor-pointer"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <img 
                        src={video.thumbnail_url} 
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Badge className="bg-secondary text-secondary-foreground font-bold text-sm px-3 py-1">
                          <Icon name="Eye" size={16} className="mr-1" />
                          {video.views}
                        </Badge>
                      </div>

                      {isAuthenticated && (
                        <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-primary/90 hover:bg-primary text-primary-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              adminPanelRef.current?.openEditDialog(video);
                            }}
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-secondary/90 hover:bg-secondary text-secondary-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              adminPanelRef.current?.deleteVideo(video.id);
                            }}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-primary rounded-full p-4 shadow-2xl transform group-hover:scale-110 transition-transform">
                          <Icon name="Play" size={32} className="text-primary-foreground" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-primary/90 px-3 py-1 rounded-full">
                            <Icon name="DollarSign" size={20} className="text-primary-foreground" />
                            <span className="font-black text-primary-foreground text-lg">
                              {video.amount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl p-8 md:p-12 text-center border-2 border-primary/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjE1LDAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="flex gap-4">
                  <Icon name="Sparkles" size={48} className="text-primary animate-pulse" />
                  <Icon name="Award" size={48} className="text-secondary animate-pulse" />
                  <Icon name="Coins" size={48} className="text-primary animate-pulse" />
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-impact mb-4 text-primary">Подписывайся на соц. сети! #MELLSTROYGAME</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Подписывайся на канал и получай уведомления о новых выигрышах
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 font-bold">
                  <Icon name="Youtube" size={24} className="mr-2" />
                  YouTube
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6 font-bold"
                  onClick={() => window.open('https://t.me/mellstroyhelps', '_blank')}
                >
                  <Icon name="MessageCircle" size={24} className="mr-2" />
                  Telegram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            <span className="text-primary font-black text-impact text-2xl">#MELLSTROYGAME</span>
            {" "}- Легендарные выигрыши и раздачи
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Поддержка
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Icon name="Shield" size={20} className="mr-2" />
              Правила
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-primary"
              onClick={() => !isAuthenticated && setShowAuthDialog(true)}
            >
              <Icon name={isAuthenticated ? "LogOut" : "Lock"} size={20} className="mr-2" />
              {isAuthenticated ? "Выйти" : "Вход"}
            </Button>
          </div>
        </div>
      </footer>

      {!isAuthenticated && (
        <Button
          size="lg"
          className="fixed bottom-8 right-8 z-50 rounded-full w-16 h-16 shadow-2xl bg-primary/50 hover:bg-primary/70"
          onClick={() => setShowAuthDialog(true)}
        >
          <Icon name="Lock" size={28} />
        </Button>
      )}

      <AdminPanel 
        ref={adminPanelRef}
        onVideoUpdate={fetchVideos} 
        isAuthenticated={isAuthenticated}
      />
      
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.video_url}
          title={selectedVideo.title}
        />
      )}

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onAuthenticated={() => setIsAuthenticated(true)}
      />
    </div>
  );
};

export default Index;