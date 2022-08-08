import { APPLICATIONPROCES } from '../shared/constants';
import BackToHomeBtn from '../components/shared/BackToHomeBtn';

const Applicationprocess = () => {
  return (
    <div className="display-center">
      <h2>{APPLICATIONPROCES.heading}</h2>
      <BackToHomeBtn />
    </div>
  );
};

export default Applicationprocess;
