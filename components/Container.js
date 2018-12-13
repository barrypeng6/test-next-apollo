import React from 'react';
import { FixedTopContainer, TwoTopsContainer } from '../components';

export default ({ page }) => {
  const { container } = page;
  console.log('container', container);
  switch (container) {
    case 'DefaultContainer': {
      return <>DefaultContainer</>;
    }
    case 'FixedTopContainer': {
      return <FixedTopContainer page={page} />;
    }
    case 'TwoTopsContainer': {
      return <TwoTopsContainer page={page} />;
    }
    case 'FixedTopContainerWithSidebar': {
      return <>FixedTopContainerWithSidebar</>;
    }
    case 'TwoTopsContainerWithSidebar': {
      return <>TwoTopsContainerWithSidebar</>;
    }
    case 'FixedEndsContainer': {
      return <>FixedEndsContainer</>;
    }
    default:
      return null;
  }
}