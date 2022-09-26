import { Routes, Route } from 'react-router-dom';

// import './App.scss';
import Header from './layout/Header/Header';
import Home from './pages/Home/Home';
import Applicationprocess from './pages/Applicationprocess/Applicationprocess';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyNotice from './pages/PrivacyNotice';
import ErrorPage from './pages/ErrorPage';
import Footer from './layout/Footer/Footer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App d-flex flex-column bd-highlight min-vh-100 ">
      <Header />

      {/* <Container fluid className="flex-shrink-1"> */}
      {/* <Container fluid className="my-auto "> */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/applicationprocess" element={<Applicationprocess />} />

        <Route path="/privacynotices" element={<PrivacyNotice />} />
        <Route path="/termaandconditions" element={<TermsAndConditions />} />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      {/* </Container> */}

      <Footer />
    </div>
  );
}

export default App;
