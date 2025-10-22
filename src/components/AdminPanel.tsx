import { useState, useRef, forwardRef, useImperativeHandle } from "react";
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
  isAuthenticated: boolean;
}

export interface AdminPanelRef {
  openEditDialog: (video: Video) => void;
  deleteVideo: (id: number) => void;
}

const AdminPanel = forwardRef<AdminPanelRef, AdminPanelProps>(({ onVideoUpdate, isAuthenticated }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [uploading, setUploading] = useState(false);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
    thumbnail_url: "",
    amount: "",
    views: "",
    video_file: null as File | null,
    thumbnail_file: null as File | null
  });
  const { toast } = useToast();

  const API_URL = "https://functions.poehali.dev/a842ae3d-4c06-42eb-9822-98283a367451";
  const UPLOAD_URL = "https://functions.poehali.dev/213422a8-c223-4d25-891f-9d1dff5157bd";

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Failed to upload file');
    
    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setUploading(true);
      
      let videoUrl = formData.video_url;
      let thumbnailUrl = formData.thumbnail_url;

      if (formData.video_file) {
        videoUrl = await uploadFile(formData.video_file);
      }

      if (formData.thumbnail_file) {
        thumbnailUrl = await uploadFile(formData.thumbnail_file);
      }

      const method = editingVideo ? 'PUT' : 'POST';
      const body = editingVideo 
        ? { ...formData, id: editingVideo.id, video_url: videoUrl, thumbnail_url: thumbnailUrl }
        : { ...formData, video_url: videoUrl, thumbnail_url: thumbnailUrl };

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
      setFormData({ 
        title: "", 
        video_url: "", 
        thumbnail_url: "", 
        amount: "", 
        views: "",
        video_file: null,
        thumbnail_file: null
      });
      onVideoUpdate();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить видео",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url,
      amount: video.amount,
      views: video.views,
      video_file: null,
      thumbnail_file: null
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

  useImperativeHandle(ref, () => ({
    openEditDialog: handleEdit,
    deleteVideo: handleDelete
  }));

  if (!isAuthenticated) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="fixed bottom-8 right-8 z-50 rounded-full w-16 h-16 shadow-2xl bg-primary hover:bg-primary/90"
          onClick={() => {
            setEditingVideo(null);
            setFormData({ 
              title: "", 
              video_url: "", 
              thumbnail_url: "", 
              amount: "", 
              views: "",
              video_file: null,
              thumbnail_file: null
            });
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
            <Label>Видео</Label>
            <div className="space-y-2">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => videoFileInputRef.current?.click()}
              >
                <Icon name="Upload" size={20} className="mr-2" />
                {formData.video_file ? formData.video_file.name : "Загрузить видео с устройства"}
              </Button>
              <input
                ref={videoFileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, video_file: file, video_url: "" });
                  }
                }}
              />
              <div className="text-center text-sm text-muted-foreground">или</div>
              <Input
                id="video_url"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value, video_file: null })}
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
                disabled={!!formData.video_file}
              />
            </div>
          </div>

          <div>
            <Label>Обложка</Label>
            <div className="space-y-2">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => thumbnailFileInputRef.current?.click()}
              >
                <Icon name="Image" size={20} className="mr-2" />
                {formData.thumbnail_file ? formData.thumbnail_file.name : "Загрузить обложку с устройства"}
              </Button>
              <input
                ref={thumbnailFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, thumbnail_file: file, thumbnail_url: "" });
                  }
                }}
              />
              <div className="text-center text-sm text-muted-foreground">или</div>
              <Input
                id="thumbnail_url"
                value={formData.thumbnail_url}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value, thumbnail_file: null })}
                placeholder="https://example.com/image.jpg"
                disabled={!!formData.thumbnail_file}
              />
            </div>
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
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 font-bold"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Загрузка...
              </>
            ) : (
              editingVideo ? "Сохранить изменения" : "Добавить видео"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
});

AdminPanel.displayName = "AdminPanel";

export default AdminPanel;
export type { Video };