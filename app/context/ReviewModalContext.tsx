import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from '@remix-run/react';

type ReviewModalContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  professor: string;
  setProfessor: React.Dispatch<React.SetStateAction<string>>;
  course: string;
  setCourse: React.Dispatch<React.SetStateAction<string>>;
};

const ReviewModalContext = createContext<ReviewModalContextType | undefined>(undefined);

export const ReviewModalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(searchParams.get('modal') === 'review');
  const [professor, setProfessor] = useState(searchParams.get('professor') || '');
  const [course, setCourse] = useState(searchParams.get('course') || '');

  useEffect(() => {
    if (open) {
      const newParams: Record<string, string> = { modal: 'review' };
      if (professor) newParams.professor = professor;
      if (course) newParams.course = course;
      setSearchParams(newParams, { replace: true });
    } else {
      // Clear all parameters when closing the modal
      setSearchParams({}, { replace: true });
    }
  }, [open, professor, course, setSearchParams]);

  return (
    <ReviewModalContext.Provider value={{ open, setOpen, professor, setProfessor, course, setCourse }}>
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