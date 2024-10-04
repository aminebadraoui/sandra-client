import { create } from 'zustand'

const useModalStore = create((set) => ({
  showLoginModal: false,
  showRegisterModal: false,
  registerModalRole: null,  // Add this line

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
      const newState = { showRegisterModal: false, registerModalRole: null }  // Reset the role when closing

      console.log("closeRegisterModal", state)

      return newState
    })
  },

  openRegisterModal: (role) => {
    set((state) => {
      const newState = { showRegisterModal: true, registerModalRole: role }

      return newState
    })
  },
}))

export default useModalStore