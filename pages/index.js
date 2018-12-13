import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Menu, Container } from '../components'

const getPageQuery = gql`
  query getPages($search: searchInputObjectType) {
    getStoreList {
      data {
        homePageId
      }
    }
    getPageList(search: $search) {
      data {
        id
        container
        title {
          zh_TW
        }
        path
        pageType
        fixedtop {
          menuId
          module
        }
        secondtop {
          menuId
          module
        }
        sidebar {
          menuId
          module
        }
        fixedbottom {
          menuId
          module
        }
        useBottom
      }
    }
  }
`;

const vars = {
  search: {
    size: 30,
    from: 0,
    sort: [{ field: "createdOn", order: "asc" }],
    filter: {
      and: [
        { type: "exact", field: "pageType", query: "home" }
      ]
    }
  }
};

const getPage = ({ getStoreList, getPageList }) => {
  const homePageId = getStoreList.data[0].homePageId || '';

  if (!homePageId)
    return getPageList.data[0];

  return getPageList.data.find(page => page.id === homePageId);
}

const getMenu = page => {
  ['fixedtop', 'secondtop', 'sidebar', 'fixedbottom'].map()
}

export default () => (
  <Query query={getPageQuery} variables={vars}>
    {({ loading, error, data: { getStoreList, getPageList } }) => {
      const page = getPage({ getStoreList, getPageList });
      console.log('page', page);
      return <Container page={page} />;
    }}
  </Query>
);
