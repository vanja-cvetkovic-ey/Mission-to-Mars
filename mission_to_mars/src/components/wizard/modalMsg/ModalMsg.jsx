import { useNavigate } from 'react-router-dom';

import './ModalMsg.scss';
import Loader from '../../../assets/Loader';

const ModalMsg = ({ success, loading }) => {
  let navigate = useNavigate();

  const hanldeClick = () => {
    navigate('/');
  };

  return (
    <div className="modal display-center">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="modal-container display-center">
          {success ? (
            <div className="content">
              <h2>Thanks for filling out our form!</h2>
              <div className="p-text">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum
              </div>
            </div>
          ) : (
            <div className="content">
              <h2>We have a little problem.</h2>
              <div className="p-text">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum
              </div>
            </div>
          )}
          <div className="footer">
            <button className="btn-cta" onClick={hanldeClick}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalMsg;
