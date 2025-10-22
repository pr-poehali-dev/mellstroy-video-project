import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Video {
  id: number;
  title: string;
  video_url: string;
  thumbnail_url: string;
  amount: string;
  views: string;
}

interface AdminPanelProps {
  onVideoUpdate: () => void;
}

const AdminPanel = ({ onVideoUpdate }: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
    thumbnail_url: "",
    amount: "",
    views: ""
  });
  const { toast } = useToast();

  const API_URL = "https://functions.poehali.dev/a842ae3d-4c06-42eb-9822-98283a367451";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const method = editingVideo ? 'PUT' : 'POST';
      const body = editingVideo 
        ? { ...formData, id: editingVideo.id }
        : formData;

      const response = await fetch(API_URL, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save video');

      toast({
        title: editingVideo ? "Видео обновлено!" : "Видео добавлено!",
        description: "Изменения сохранены успешно",
      });

      setIsOpen(false);
      setEditingVideo(null);
      setFormData({ title: "", video_url: "", thumbnail_url: "", amount: "", views: "" });
      onVideoUpdate();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить видео",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url,
      amount: video.amount,
      views: video.views
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить это видео?')) return;

    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) throw new Error('Failed to delete video');

      toast({
        title: "Видео удалено!",
        description: "Видео успешно удалено",
      });

      onVideoUpdate();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить видео",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="fixed bottom-8 right-8 z-50 rounded-full w-16 h-16 shadow-2xl bg-primary hover:bg-primary/90"
          onClick={() => {
            setEditingVideo(null);
            setFormData({ title: "", video_url: "", thumbnail_url: "", amount: "", views: "" });
          }}
        >
          <Icon name="Plus" size={28} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-impact">
            {editingVideo ? "Редактировать видео" : "Добавить видео"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Название видео</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="НЕВЕРОЯТНЫЙ ЗАНОС 1.5М"
              required
            />
          </div>
          <div>
            <Label htmlFor="video_url">Ссылка на видео (YouTube embed)</Label>
            <Input
              id="video_url"
              value={formData.video_url}
              onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
              required
            />
          </div>
          <div>
            <Label htmlFor="thumbnail_url">Ссылка на обложку</Label>
            <Input
              id="thumbnail_url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Сумма выигрыша</Label>
            <Input
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="1,500,000₽"
              required
            />
          </div>
          <div>
            <Label htmlFor="views">Количество просмотров</Label>
            <Input
              id="views"
              value={formData.views}
              onChange={(e) => setFormData({ ...formData, views: e.target.value })}
              placeholder="2.3M"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold">
            {editingVideo ? "Сохранить изменения" : "Добавить видео"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
export type { Video };
