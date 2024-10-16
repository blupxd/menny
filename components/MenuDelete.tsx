import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { deleteMenu } from "@/lib/handlers";

interface MenuDeleteProps {
  show: boolean;
  id: string;
  onClose: () => void;
  reload?: () => void;
}
const MenuDelete: React.FC<MenuDeleteProps> = ({
  id,
  reload,
  show,
  onClose,
}) => {
  if (!show) return null; // Do not render the popup if `show` is false
  return (
    <div className="fixed bg-black/50 z-10 left-0 top-0 right-0 bottom-0 flex justify-center items-center">
      <Card className="max-h-max">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            Are you sure you want to delte this menu?
          </CardTitle>
          <CardDescription>ID: {id}</CardDescription>
          <p className="text-xs text-red-500">
            Warning: This action is irreversible
          </p>
          <CardContent className="p-4 flex items-center justify-center space-x-4">
            <Button
              onClick={() => {
                deleteMenu(id);
                if (reload) reload();
                location.replace("/dashboard");
                onClose();
              }}
              variant="secondary"
            >
              Confirm
            </Button>
            <Button variant="destructive" onClick={onClose}>
              Cancel
            </Button>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default MenuDelete;
