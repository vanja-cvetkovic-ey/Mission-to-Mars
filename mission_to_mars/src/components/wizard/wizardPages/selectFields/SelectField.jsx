import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import WizardContext from '../../../../context/WizardContext';
import { WIZARD_PAGE_2 } from '../../../../shared/constants';

const SelectField = ({
  url,
  prevInfo,
  fieldName,
  handleDisabledOnChange,
  page2,
}) => {
  const { disabled } = useContext(WizardContext);
  const [citiesOpt, setCitiesOpt] = useState([]);
  const [zipsOpt, setZipsOpt] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const getZipOptions = async () => {
      try {
        const { data } = await axios.get(url);

        if (fieldName === 'city') {
          let cities = [];
          cities = data.filter((item) => {
            const isDuplicate = cities.find((city) => item.name === city.name);
            if (!isDuplicate) {
              cities.push(item);
              return true;
            }
            return false;
          });
          cities.sort((a, b) => (a.name > b.name ? 1 : -1));
          setCitiesOpt([{ name: 'city' }, ...cities]);
        } else {
          data.sort((a, b) => (a.code > b.code ? 1 : -1));
          setZipsOpt([{ code: 'zip' }, ...data]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!!prevInfo) {
      getZipOptions();
      return () => {
        controller.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page2.state, page2.city]);

  const selectCity = (
    <select
      name="city"
      data-live-search="true"
      className={`disabled-${disabled.city}`}
      value={page2.city}
      disabled={disabled.city}
      onChange={(e) => handleDisabledOnChange(e)}
    >
      {disabled.city || citiesOpt.length === 1 ? (
        <option>{WIZARD_PAGE_2.city_label}</option>
      ) : (
        citiesOpt.map((city) =>
          city.name === 'city' ? (
            <option disabled={true} value="" key="city" defaultValue>
              {`${page2.state[0]} cities:`}
            </option>
          ) : (
            <option key={city.name} value={city.name} disabled={false}>
              {city.name}
            </option>
          )
        )
      )}{' '}
    </select>
  );

  const selectZip = (
    <select
      name="zip"
      value={page2.zip}
      disabled={disabled.zip}
      className={`disabled-${disabled.zip}`}
      onChange={(e) => handleDisabledOnChange(e)}
    >
      {disabled.zip || zipsOpt.length === 1 ? (
        <option>{WIZARD_PAGE_2.zip_label}</option>
      ) : (
        zipsOpt.map((zip) =>
          zip.code === 'zip' ? (
            <option key={'zip'} value="" disabled={true} defaultValue>
              {`Postal codes in ${page2.city}`}
            </option>
          ) : (
            <option key={zip.code} value={zip.code} disabled={false}>
              {zip.code}
            </option>
          )
        )
      )}
    </select>
  );

  return fieldName === 'city' ? selectCity : selectZip;
};

export default SelectField;
