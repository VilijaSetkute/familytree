export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface Option {
  value: string;
  label: string;
  isDisabled: boolean;
}

export interface UserData {
  isActive: boolean;
  userName: string;
}

export type AccessData = Option | Option[] | null;

export const tabs = [
  { tabId: 0, tabName: 'Users' },
  { tabId: 1, tabName: 'Gallery' },
  { tabId: 2, tabName: 'Locations' },
  { tabId: 3, tabName: 'Tree' },
];

export const options = [
  { value: 'global_admin', label: 'Global Admin', isDisabled: true },
  { value: 'admin', label: 'Admin', isDisabled: false },
  { value: 'manage', label: 'Manage', isDisabled: false },
  { value: 'read', label: 'Read', isDisabled: false },
];
