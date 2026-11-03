import React from 'react';

export const IconBase = ({ size = 18, color = 'currentColor', className = '', style = {}, children, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    {...props}
  >
    {children}
  </svg>
);

export const SendIcon = (props) => (
  <IconBase {...props}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </IconBase>
);

export const PlayIcon = (props) => (
  <IconBase {...props}>
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>
  </IconBase>
);

export const CopyIcon = (props) => (
  <IconBase {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </IconBase>
);

export const CheckIcon = (props) => (
  <IconBase {...props}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </IconBase>
);

export const TrashIcon = (props) => (
  <IconBase {...props}>
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </IconBase>
);

export const PlusIcon = (props) => (
  <IconBase {...props}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </IconBase>
);

export const HistoryIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </IconBase>
);

export const FolderIcon = (props) => (
  <IconBase {...props}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </IconBase>
);

export const BookmarkIcon = (props) => (
  <IconBase {...props}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </IconBase>
);

export const VariableIcon = (props) => (
  <IconBase {...props}>
    <path d="M4 7c0-2.21 1.79-4 4-4s4 1.79 4 4v10c0 2.21 1.79 4 4 4s4-1.79 4-4"></path>
    <line x1="4" y1="12" x2="20" y2="12"></line>
  </IconBase>
);

export const SunIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </IconBase>
);

export const MoonIcon = (props) => (
  <IconBase {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </IconBase>
);

export const SparklesIcon = (props) => (
  <IconBase {...props}>
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"></path>
  </IconBase>
);

export const DownloadIcon = (props) => (
  <IconBase {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </IconBase>
);

export const SearchIcon = (props) => (
  <IconBase {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </IconBase>
);

export const TerminalIcon = (props) => (
  <IconBase {...props}>
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </IconBase>
);

export const ClockIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 14 14"></polyline>
  </IconBase>
);

export const ZapIcon = (props) => (
  <IconBase {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </IconBase>
);

export const ShieldIcon = (props) => (
  <IconBase {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </IconBase>
);

export const CodeIcon = (props) => (
  <IconBase {...props}>
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </IconBase>
);

export const RefreshCwIcon = (props) => (
  <IconBase {...props}>
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </IconBase>
);

export const AlertCircleIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </IconBase>
);

export const CheckCircleIcon = (props) => (
  <IconBase {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </IconBase>
);

export const ChevronRightIcon = (props) => (
  <IconBase {...props}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </IconBase>
);

export const ChevronLeftIcon = (props) => (
  <IconBase {...props}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </IconBase>
);

export const ChevronDownIcon = (props) => (
  <IconBase {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </IconBase>
);

export const CloseIcon = (props) => (
  <IconBase {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </IconBase>
);

export const LayersIcon = (props) => (
  <IconBase {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </IconBase>
);

export const AlignLeftIcon = (props) => (
  <IconBase {...props}>
    <line x1="17" y1="10" x2="3" y2="10"></line>
    <line x1="21" y1="6" x2="3" y2="6"></line>
    <line x1="21" y1="14" x2="3" y2="14"></line>
    <line x1="17" y1="18" x2="3" y2="18"></line>
  </IconBase>
);

export const KeyIcon = (props) => (
  <IconBase {...props}>
    <path d="M21 2l-2 2m-1.5 1.5L16 7l-2 2-3 3-1-1-3 3 1 1-4 4a2.83 2.83 0 0 1-4-4l4-4 1 1 3-3-1-1 3-3 1.5-1.5z"></path>
  </IconBase>
);

export const GlobeIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </IconBase>
);

export const FileTextIcon = (props) => (
  <IconBase {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </IconBase>
);

export const WandIcon = (props) => (
  <IconBase {...props}>
    <path d="M15 4V2"></path>
    <path d="M15 16v-2"></path>
    <path d="M8 9h2"></path>
    <path d="M20 9h2"></path>
    <path d="M17.8 11.8L19 13"></path>
    <path d="M15 9h0"></path>
    <path d="M17.8 6.2L19 5"></path>
    <path d="M3 21l9-9"></path>
    <path d="M12.2 6.2L11 5"></path>
  </IconBase>
);
