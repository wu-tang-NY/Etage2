import dynamic from 'next/dynamic';

// Lazy load sections to reduce initial bundle size
export const sectionsComponents = {
  PageSectionServices: dynamic(() => import('./services/index'), {
    ssr: false,
  }),
  PageSectionPrice: dynamic(() => import('./price/index'), {
    ssr: false,
  }),
  PageSectionReviews: dynamic(() => import('./reviews/index'), {
    ssr: false,
  }),
  PageSectionOrder: dynamic(() => import('./order/index'), {
    ssr: false,
  }),
} as {
  PageSectionServices: React.ComponentType<any>;
  PageSectionPrice: React.ComponentType<any>;
  PageSectionReviews: React.ComponentType<any>;
  PageSectionOrder: React.ComponentType<any>;
};

export default sectionsComponents;

