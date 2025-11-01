import React from 'react';
import { Eye, EyeOff, Edit2, Save, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const Header = ({ 
  userName, 
  showPrivate, 
  editMode, 
  onTogglePrivacy, 
  onToggleEdit,
  onShare 
}) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {userName} Finance Tracker
        </h1>
        <p className="text-slate-400 mt-1">Control financiero en tiempo real</p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="secondary" 
          icon={showPrivate ? Eye : EyeOff}
          onClick={onTogglePrivacy}
        >
          {showPrivate ? 'Ocultar' : 'Mostrar'}
        </Button>
        
        <Button 
          variant={editMode ? 'success' : 'primary'}
          icon={editMode ? Save : Edit2}
          onClick={onToggleEdit}
        >
          {editMode ? 'Guardar' : 'Editar'}
        </Button>
        
        <Button 
          variant="purple" 
          icon={Share2}
          onClick={onShare}
        >
          Compartir
        </Button>
      </div>
    </div>
  );
};