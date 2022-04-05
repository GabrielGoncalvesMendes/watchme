import { useEffect, useState } from 'react';

import { Button } from './components/Button';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';


export function App() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar getSelectGenre={setSelectedGenre} getSelectGenreId={setSelectedGenreId} />
      <Content selectedGenreTitle={selectedGenre} selectedGenreId={selectedGenreId} />
    </div>
  )
}