import { useNavigate } from 'react-router-dom';

import './ModalMsg.scss';
import Loader from '../../../assets/Loader';
import { SUBMITED_RESPONSE } from '../../../shared/constants';

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
              <h2>{SUBMITED_RESPONSE.resolved_header}</h2>
              <div className="p-text">{SUBMITED_RESPONSE.resolved_text}</div>
            </div>
          ) : (
            <div className="content">
              <h2>{SUBMITED_RESPONSE.reject_header}</h2>
              <div className="p-text">{SUBMITED_RESPONSE.reject_text}</div>
            </div>
          )}
          <div className="modal-footer">
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
