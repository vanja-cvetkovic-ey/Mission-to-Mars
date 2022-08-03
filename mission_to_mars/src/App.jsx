import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Home from './pages/Home';
import Applicationprocess from './pages/Applicationprocess';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyNotice from './pages/PrivacyNotice';
import Footer from './layout/Footer';
import Loader from './assets/Loader';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacynotices" element={<PrivacyNotice />} />
          <Route path="/termaandconditions" element={<TermsAndConditions />} />
          <Route path="/applicationprocess" element={<Applicationprocess />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
