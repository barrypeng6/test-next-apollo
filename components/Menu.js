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

export default ({ id }) => (
  <Query query={getMenuQuery} variables={{
    search: {
      filter: {
        or: [
          {
            type: 'ids',
            ids: [id]
          },
          {
            type: 'exact',
            field: 'menuType',
            query: id
          }
        ]
      }
    }
  }}>
    {({ data: { getMenuList } }) => {
      const { data: menus } = getMenuList;
      const menu = menus[0];
      console.log('menu >>', menu)
      return (
        <>
          <ul>
            {menu.menuType}
            {menu.pages.map(({ title }) => (
              <li key={title.zh_TW}>{title.zh_TW}</li>
            ))}
          </ul>
        </>
      );
    }}
  </Query>
);