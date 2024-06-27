import React, { createContext, useState, useContext } from 'react';

export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

