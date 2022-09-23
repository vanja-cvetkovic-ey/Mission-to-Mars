import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

// import './ModalMsg.scss';
import Loader from '../../../assets/Loader';
import { SUBMITED_RESPONSE } from '../../../shared/constants';
import { Button } from 'react-bootstrap';

const ModalMsg = ({ success, loading, show }) => {
  let navigate = useNavigate();

  const hanldeClick = () => {
    navigate('/');
  };

  return (
    <>
      {loading ? (
        <Modal show={show}>
          <Loader />
        </Modal>
      ) : (
        <Modal show={show} onHide={hanldeClick}>
          {success ? (
            <>
              <Modal.Header className="p-5" closeButton>
                <Modal.Title>{SUBMITED_RESPONSE.resolved_header}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="px-5">
                <div className="p-text">{SUBMITED_RESPONSE.resolved_text}</div>
              </Modal.Body>
            </>
          ) : (
            <>
              <Modal.Header className="px-5 py-4" closeButton>
                <Modal.Title>{SUBMITED_RESPONSE.reject_header}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="px-5">
                <div className="p-text">{SUBMITED_RESPONSE.reject_text}</div>
              </Modal.Body>
            </>
          )}
          <Modal.Footer className="px-5">
            <Button className="btn-cta" onClick={hanldeClick}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ModalMsg;
