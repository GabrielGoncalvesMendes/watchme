import { useEffect, useState } from 'react';
import { Button } from '../components/Button';

import { api } from '../services/api';

interface SideBarProps {
  getSelectGenre(genreTitle: string): void;
  getSelectGenreId(genreId: number): void;
}
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({ getSelectGenre, getSelectGenreId }: SideBarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
      getSelectGenre(response.data.title);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number, genre: GenreResponseProps) {
    setSelectedGenreId(id);
    getSelectGenreId(id);
    getSelectGenre(genre.title);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id, genre)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}