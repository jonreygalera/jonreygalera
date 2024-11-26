import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  EllipsisHorizontalCircleIcon,
  HomeIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline';
import Navigation from '../../components/navigation/Navigation';
import IconButton from '../../components/iconButton/IconButton';
import INavigationItem from '../../interface/INavigationItem';

const NAVIGATOR_ITEMS: INavigationItem[] = [
  { key: 'nav-item-home', label: 'Home', icon: HomeIcon, path: '/' },
  { key: 'nav-item-ideas', label: 'Ideas', icon: PuzzlePieceIcon, path: '/ideas' },
  { key: 'nav-item-talk', label: 'Talk', icon: ChatBubbleLeftRightIcon },
  { key: 'nav-item-others', label: 'Others', icon: EllipsisHorizontalCircleIcon, path: '/others' },
  { key: 'nav-item-profile', label: 'Profile', icon: EllipsisHorizontalCircleIcon, path: '/profile' },
];

const Navigator: React.FC = () => {
  const navigate = useNavigate();
  const [selectedNavigationItem, setSelectedNavigationItem] = useState<INavigationItem>(
    NAVIGATOR_ITEMS[0]
  );

  const handleOnSelectedItem = (navigationItem: INavigationItem) => {
    setSelectedNavigationItem(navigationItem);
    if (navigationItem.path) {
      navigate(navigationItem.path);
    }
  };

  return (
    <Navigation className="ml-5 top-36">
      {NAVIGATOR_ITEMS.map((navigationItem) => (
        <IconButton
          key={navigationItem.key}
          icon={navigationItem.icon}
          onClick={() => handleOnSelectedItem(navigationItem)}
          active={selectedNavigationItem.key === navigationItem.key}
          label={navigationItem.label}
        />
      ))}
    </Navigation>
  );
};

export default Navigator;
