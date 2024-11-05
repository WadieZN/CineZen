import React, { createContext, useState, useEffect } from 'react';

export const UserCollectionContext = createContext();

export const UserCollectionProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || {};
  });
  const [watchLater, setWatchLater] = useState(() => {
    return JSON.parse(localStorage.getItem('watchLater')) || {};
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('watchLater', JSON.stringify(watchLater));
  }, [watchLater]);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const updated = { ...prev };
      if (updated[item.id]) {
        delete updated[item.id];
      } else {
        updated[item.id] = item;
      }
      return updated;
    });
  };

  const toggleWatchLater = (item) => {
    setWatchLater((prev) => {
      const updated = { ...prev };
      if (updated[item.id]) {
        delete updated[item.id];
      } else {
        updated[item.id] = item;
      }
      return updated;
    });
  };

  const cleanList = (list) => Object.values(list).filter((item) => item);

  return (
    <UserCollectionContext.Provider
      value={{
        favorites: cleanList(favorites),
        watchLater: cleanList(watchLater),
        toggleFavorite,
        toggleWatchLater,
      }}
    >
      {children}
    </UserCollectionContext.Provider>
  );
};
