import React, { createContext, useState, useContext } from 'react';

type ReviewModalContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewModalContext = createContext<ReviewModalContextType | undefined>(undefined);

export const ReviewModalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <ReviewModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ReviewModalContext.Provider>
  );
};

export const useReviewModal = () => {
  const context = useContext(ReviewModalContext);
  if (context === undefined) {
    throw new Error('useReviewModal must be used within a ReviewModalProvider');
  }
  return context;
};