import React, {memo} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {equals} from 'ramda';

const ListViewComponent = ({
  onLoadMore,
  onRefreshing,
  canLoadMore = false,
  enableRefresh = true,
  refreshing = false,
  ...rest
}) => {
  const loadMore = () => {
    if (canLoadMore && onLoadMore && typeof onLoadMore === 'function') {
      onLoadMore();
    }
  };
  const refresh = () => {
    if (onRefreshing && typeof onRefreshing === 'function') {
      onRefreshing();
    }
  };
  return (
    <FlatList
      refreshControl={
        enableRefresh && (
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        )
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.001}
      {...rest}
    />
  );
};

export const ListView = memo(ListViewComponent, (prevProps, nextProps) =>
  equals(prevProps, nextProps),
);
