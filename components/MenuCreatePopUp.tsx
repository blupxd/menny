import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import MenuForm from './forms/MenuForm';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface MenuCreatePopUpProps {
  show: boolean;
  onClose: () => void;
}

const MenuCreatePopUp: React.FC<MenuCreatePopUpProps> = ({ show, onClose }) => {
  if (!show) return null; // Do not render the popup if `show` is false

  return (
    <div className="fixed top-0 right-0 flex items-center justify-center left-0 md:left-[300px] z-30 bottom-0 bg-black/80">
      <Button onClick={onClose} className="absolute top-6 right-6 bg-transparent" size="icon" variant="secondary">
        <X className="w-6 h-6" />
      </Button>
      <Card className="max-h-max">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">Enter a name for your menu</CardTitle>
          <CardDescription className="text-xs">Give your new menu a name</CardDescription>
          <CardContent className="p-0">
            <MenuForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default MenuCreatePopUp;
