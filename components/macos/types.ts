export type WindowId =
  | "finder"
  | "orbit"
  | "dossier"
  | "about"
  | "resume"
  | "terminal"
  | "contact"
  | "settings";

export interface WindowState {
  id: WindowId;
  title: string;
  iconType: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  prevBounds?: { x: number; y: number; width: number; height: number };
}

export type FinderViewMode = "icons" | "list" | "columns";

export interface DesktopItem {
  id: string;
  title: string;
  icon: string;
  type: "folder" | "app" | "file";
  action: () => void;
}

export interface MenuItem {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
  action?: () => void;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}
