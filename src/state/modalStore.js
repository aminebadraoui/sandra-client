import { create } from 'zustand'

const useModalStore = create((set) => ({
  showLoginModal: false,
  showRegisterModal: false,

  closeLoginModal: () => {
    set((state) => {
      const newState = { showLoginModal: false }

      return newState
    })
  },

  openLoginModal: () => {
    set((state) => {
      const newState = { showLoginModal: true }

      return newState
    })
  },

  closeRegisterModal: () => {
    set((state) => {
      const newState = { showRegisterModal: false }

      return newState
    })
  },

  openRegisterModal: () => {
    set((state) => {
      const newState = { showRegisterModal: true }

      return newState
    })
  },


}))

export default useModalStore