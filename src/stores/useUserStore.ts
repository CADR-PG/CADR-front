import { create } from 'zustand';
import UserData from '../types/UserData';

interface State extends UserData {
  isLoggedIn: boolean;
}

interface Action {
  setUser: (data: State) => void;
  logoutUser: () => void;
}

const initialState: State = {
  isLoggedIn: false,
  email: '',
  isEmailConfirmed: false,
  firstName: '',
  lastName: '',
}

const useUserStore = create<State & Action>((set) => ({
  ...initialState,
  setUser: (data: State) => {
    set(data)
  },
  logoutUser: () => {
    console.log("logging out");
    set(initialState)
  }
}));

export default useUserStore;
