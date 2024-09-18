
import './App.css';
import Navbar from './components/features/Navbar';


import RegisterModal from './components/features/RegisterModal';
import useModalStore from './state/modalStore';
import SigninModal from './components/features/SigninModal';




function App() {
  const showLoginModal = useModalStore(state => state.showLoginModal)
  const showRegisterModal = useModalStore(state => state.showRegisterModal)

  return (
    <div >
      {showLoginModal && <SigninModal />}
      {showRegisterModal && <RegisterModal />}

      <Navbar />
      <div className='pt-[50px]' >
        <div className='px-16 py-8 h-full'>
          <div> Content </div>
        </div>
      </div>

    </div>
  );
}

export default App;
