import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './layout/Header/Header';
import Home from './pages/Home/Home';
import Applicationprocess from './pages/Applicationprocess';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyNotice from './pages/PrivacyNotice';
import ErrorPage from './pages/ErrorPage';
import Footer from './layout/Footer/Footer';

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
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
