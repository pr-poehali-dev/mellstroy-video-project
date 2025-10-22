CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    amount VARCHAR(50) NOT NULL,
    views VARCHAR(50) DEFAULT '0',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO videos (title, video_url, thumbnail_url, amount, views) VALUES
('НЕВЕРОЯТНЫЙ ЗАНОС 1.5М', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png', '1,500,000₽', '2.3M'),
('БЕЗУМНАЯ СЕРИЯ X1000', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png', '890,000₽', '1.8M'),
('РЕКОРДНЫЙ ВЫИГРЫШ', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png', '2,100,000₽', '3.1M'),
('ДЖЕКПОТ В ПРЯМОМ ЭФИРЕ', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png', '3,750,000₽', '4.2M'),
('МАКСИМАЛЬНЫЙ ЗАНОС', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png', '1,200,000₽', '2.9M'),
('ЛЕГЕНДАРНАЯ РАЗДАЧА', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://v3b.fal.media/files/b/lion/LzS38c7XnQrtshbubFg9b_output.png', '650,000₽', '1.5M');
