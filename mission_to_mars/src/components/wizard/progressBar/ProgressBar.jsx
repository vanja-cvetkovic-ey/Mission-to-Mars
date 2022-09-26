import { useContext } from 'react';
import { Stack } from 'react-bootstrap';
// import './ProgressBar.scss';
import WizardContext from '../../../context/WizardContext';

const ProgressBar = () => {
  const { startWizard, setCurrentPage, openPages, currentPage } =
    useContext(WizardContext);

  const handlePageChange = (page) => {
    if (openPages.includes(page)) {
      setCurrentPage(parseInt(page.at(-1)));
    }
  };

  if (startWizard) {
    return (
      <div className="d-flex flex-row align-items-center my-3">
        <span
          className={` border ${
            currentPage === 1 ? ' bg-dark text-white' : 'bg-light'
          } border p-3 d-flex align-items-center justify-content-center`}
          onClick={() => handlePageChange('page1')}
          style={{ width: '24px', height: '24px' }}
        >
          1
        </span>
        <div
          style={{ height: '2px' }}
          className={`ms-auto w-100 align-self-center bg-light border`}
        ></div>
        <span
          className={`${
            currentPage === 2 ? ' bg-dark text-white' : 'bg-light border'
          } border p-3 d-flex align-items-center justify-content-center`}
          onClick={() => handlePageChange('page2')}
          style={{ width: '24px', height: '24px' }}
        >
          2
        </span>
        <div
          style={{ height: '2px' }}
          className={`ms-auto w-100 align-self-center  bg-light border`}
        ></div>
        <span
          className={`border ${
            currentPage === 3 ? ' bg-dark text-white' : 'bg-light'
          } p-3 d-flex align-items-center justify-content-center`}
          onClick={() => handlePageChange('page3')}
          style={{ width: '24px', height: '24px' }}
        >
          3
        </span>
      </div>

      // <div className="ProgressBar">
      //   <div className="container flex-row">
      //     <span
      //       className={`page ${openPages.includes(
      //         'page1'
      //       )} display-center current-${currentPage === 1}`}
      //       onClick={() => handlePageChange('page1')}
      //     >
      //       1
      //     </span>
      //     <div className={`line ${openPages.includes('page2')}`}></div>
      //     <span
      //       className={`page ${openPages.includes('page2')} display-center`}
      //       onClick={() => handlePageChange('page2')}
      //     >
      //       2
      //     </span>
      //     <div className={`line ${openPages.includes('page3')}`}></div>
      //     <span
      //       className={`page ${openPages.includes('page3')} display-center`}
      //       onClick={() => handlePageChange('page3')}
      //     >
      //       3
      //     </span>
      //   </div>
      // </div>
    );
  }
};

export default ProgressBar;
