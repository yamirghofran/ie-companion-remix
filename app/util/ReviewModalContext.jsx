import React, { createContext, useContext, useState } from 'react';

export const ReviewModalContext = createContext();

export const useReviewModal = () => useContext(ReviewModalContext);
