import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

const AuthDialog = ({ isOpen, onClose, onAuthenticated }: AuthDialogProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "Роман" && password === "22") {
      onAuthenticated();
      onClose();
      toast({
        title: "Добро пожаловать!",
        description: "Вы успешно авторизовались",
      });
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверный логин или пароль",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-impact text-center">
            <Icon name="Lock" size={32} className="inline-block mb-2 text-primary" />
            <br />
            Вход в админ-панель
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Логин</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите логин"
              required
              autoFocus
            />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold text-lg py-6">
            <Icon name="LogIn" size={20} className="mr-2" />
            Войти
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
