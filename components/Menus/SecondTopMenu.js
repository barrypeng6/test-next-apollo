import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const getMenuQuery = gql`
  query getMenuTest($search: searchInputObjectType) {
    getMenuList(search: $search) {
      data {
        menuType
        id
        pages {
          params {
            pageId
            url
            tags
            section
            query_string
            from
            size
            path
            displayMemberGroup
          }
          title {
            zh_TW
          }
        }
      }
    }
  }
`;

const menuVars = menuId => ({
  search: {
    filter: {
      or: [
        {
          type: 'ids',
          ids: [menuId]
        },
        {
          type: 'exact',
          field: 'menuType',
          query: menuId
        }
      ]
    }
  }
});

export default ({ menuId }) => (
  <Query query={getMenuQuery} variables={menuVars(menuId)}>
    {({ data: { getMenuList } }) => {
      const menu = getMenuList.data[0];
      console.log('menu >>', menu);
      return (
        <div>
          SecondTopMenu
          <ul>
            {menu.pages.map(({ title }) => (
              <li key={title.zh_TW}>{title.zh_TW}</li>
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);