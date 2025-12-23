import React, { createContext, useContext, useState, useEffect } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Cek otomatis saat website dimuat
  useEffect(() => {
    const hasVisited = localStorage.getItem('numericalm_visited_v4');
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem('numericalm_visited_v4', 'true');
    }
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};