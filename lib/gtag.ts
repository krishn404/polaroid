

// Define types for the 'gtag' function arguments
type GtagConfigArguments = [
  'config',
  string, 
  { page_path: string }
];

type GtagEventArguments = [
  'event',
  string, 
  {
    event_category: string;
    event_label: string;
    value: number;
  }
];

// Extend the global window interface to include gtag method
declare global {
  interface Window {
    gtag: (...args: GtagConfigArguments | GtagEventArguments) => void;
  }
}

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID; 
if (!GA_TRACKING_ID) {
  throw new Error('Google Analytics tracking ID is missing.');
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
