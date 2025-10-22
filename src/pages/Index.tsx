import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  const winVideos = [
    {
      id: 1,
      title: "НЕВЕРОЯТНЫЙ ЗАНОС 1.5М",
      views: "2.3M",
      thumbnail: "https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png",
      amount: "1,500,000₽",
      date: "2 дня назад"
    },
    {
      id: 2,
      title: "БЕЗУМНАЯ СЕРИЯ X1000",
      views: "1.8M",
      thumbnail: "https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png",
      amount: "890,000₽",
      date: "5 дней назад"
    },
    {
      id: 3,
      title: "РЕКОРДНЫЙ ВЫИГРЫШ",
      views: "3.1M",
      thumbnail: "https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png",
      amount: "2,100,000₽",
      date: "1 неделю назад"
    },
    {
      id: 4,
      title: "ДЖЕКПОТ В ПРЯМОМ ЭФИРЕ",
      views: "4.2M",
      thumbnail: "https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png",
      amount: "3,750,000₽",
      date: "2 недели назад"
    },
    {
      id: 5,
      title: "МАКСИМАЛЬНЫЙ ЗАНОС",
      views: "2.9M",
      thumbnail: "https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png",
      amount: "1,200,000₽",
      date: "3 недели назад"
    },
    {
      id: 6,
      title: "ЛЕГЕНДАРНАЯ РАЗДАЧА",
      views: "1.5M",
      thumbnail: "https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png",
      amount: "650,000₽",
      date: "1 месяц назад"
    }
  ];

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
                100+ выигрышей
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-primary/10 border-primary text-primary hover:bg-primary/20">
                <Icon name="DollarSign" size={20} className="mr-2" />
                50M+ раздано
              </Badge>
            </div>
            
            <Button size="lg" className="text-xl px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-2xl hover:scale-105 transition-transform">
              <Icon name="Play" size={24} className="mr-2" />
              Смотреть последний выигрыш
            </Button>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {winVideos.map((video, index) => (
                <Card 
                  key={video.id}
                  className="group cursor-pointer overflow-hidden bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-secondary text-secondary-foreground font-bold text-sm px-3 py-1">
                        <Icon name="Eye" size={16} className="mr-1" />
                        {video.views}
                      </Badge>
                    </div>
                    
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
                        <Badge variant="outline" className="bg-black/50 border-primary/50 text-white">
                          {video.date}
                        </Badge>
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
              
              <h2 className="text-4xl md:text-5xl font-black text-impact mb-4 text-primary">
                Не пропусти следующий занос!
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Подписывайся на канал и получай уведомления о новых выигрышах
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 font-bold">
                  <Icon name="Youtube" size={24} className="mr-2" />
                  YouTube
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6 font-bold">
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
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Icon name="Info" size={20} className="mr-2" />
              О проекте
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
