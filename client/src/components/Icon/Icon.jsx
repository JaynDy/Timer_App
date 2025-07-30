import React from "react";
import { iconsMap } from "./iconsMap";

export const Icon = ({ name, className, style, onClick }) => {
  const iconSrc = iconsMap[name];

  if (!iconSrc) return null;

  return (
    <img src={iconSrc} className={className} style={style} onClick={onClick} />
  );
};
