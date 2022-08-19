import { useContext } from 'react';

import './ProgressBar.scss';
import WizardContext from '../../../context/WizardContext';

const ProgressBar = () => {
  const { startWizard, setCurrentPage, openPages } = useContext(WizardContext);

  const handlePageChange = (page) => {
    if (openPages.includes(page)) {
      setCurrentPage(page);
    }
  };

  if (startWizard) {
    return (
      <div className="ProgressBar">
        <div className="container flex-row">
          <span
            className={`page ${openPages.includes('page1')} display-center`}
            onClick={() => handlePageChange('page1')}
          >
            1
          </span>
          <div className={`line ${openPages.includes('page2')}`}></div>
          <span
            className={`page ${openPages.includes('page2')} display-center`}
            onClick={() => handlePageChange('page2')}
          >
            2
          </span>
          <div className={`line ${openPages.includes('page3')}`}></div>
          <span
            className={`page ${openPages.includes('page3')} display-center`}
            onClick={() => handlePageChange('page3')}
          >
            3
          </span>
        </div>
      </div>
    );
  }
};

export default ProgressBar;
