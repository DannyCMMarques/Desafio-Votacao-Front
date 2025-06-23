import type { IconType } from "react-icons";

export interface MenuItem {
  id: number;
  label: string;
  link: string;
  icon: IconType;
  active: boolean;
}
