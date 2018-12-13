import React from 'react';
import { FixedTopMenu, SecondTopMenu } from '../components'

const getFixedTopMenuId = ({ fixedtop }) => fixedtop.menuId || fixedtop.module.replace('-', '');
const getSecondTopMenuId = ({ secondtop }) => secondtop.menuId || secondtop.module.replace('-', '');

export default ({ page }) => {
  return (
    <>
      <h2>TwoTopsContainer</h2>
      <FixedTopMenu menuId={getFixedTopMenuId(page)} />
      <SecondTopMenu menuId={getSecondTopMenuId(page)} />
    </>
  )
};
