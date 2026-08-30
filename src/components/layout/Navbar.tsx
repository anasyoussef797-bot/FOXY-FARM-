import React from 'react';
import { HappyFarmHUD } from '../happyFarm/HappyFarmHUD';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenDinarBonus: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenDinarBonus,
}) => {
  return (
    <HappyFarmHUD
      currentTab={currentTab}
      onTabChange={onTabChange}
      onOpenDinarBonus={onOpenDinarBonus}
    />
  );
};
