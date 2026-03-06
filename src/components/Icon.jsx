import React from 'react';
import * as LucideIcons from 'lucide-react';

export const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 2, className = "" }) => {
    const LucideIcon = LucideIcons[name];
    if (!LucideIcon) return null;
    return <LucideIcon size={size} color={color} strokeWidth={strokeWidth} className={className} />;
};
