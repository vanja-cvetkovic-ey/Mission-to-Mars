import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import WizardContext from '../../../../context/WizardContext';
import { WIZARD_PAGE_2, URL } from '../../../../shared/constants';
import Spinner from '../../../../assets/Spinner';

const controller = new AbortController();

const SelectField = ({
  prevInfo,
  fieldName,
  handleDisabledOnChange,
  handleValueValidation,
  errors_page2,
  page2,
}) => {
  const { disabled } = useContext(WizardContext);
  const [loadingCity, setLoadingCity] = useState();
  const [loadingZip, setLoadingZip] = useState();
  const [citiesOpt, setCitiesOpt] = useState([]);
  const [zipsOpt, setZipsOpt] = useState([]);

  const handleCitiesFetch = async () => {
    try {
      setLoadingCity(true);
      const { data } = await axios.get(
        `${URL.states}/${page2.state[0]}/cities`
      );
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
      setLoadingCity(false);
    } catch (error) {
      handleValueValidation('city', true, errors_page2);
    }
  };

  const handleZipFetch = async () => {
    try {
      setLoadingZip(true);
      const { data } = await axios.get(
        `${URL.states}/${page2.state[0]}/cities/${page2.city}/postalcodes`
      );
      data.sort((a, b) => (a.code > b.code ? 1 : -1));
      setZipsOpt([{ code: 'zip' }, ...data]);
      setLoadingZip(false);
    } catch (error) {
      handleValueValidation('zip', true, errors_page2);
    }
  };

  useEffect(() => {
    if (!prevInfo) {
      setLoadingCity(true);
    } else {
      handleCitiesFetch();
      return () => {
        controller.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevInfo]);

  useEffect(() => {
    if (!page2.city) {
      setLoadingZip(true);
    } else {
      handleZipFetch();
      return () => {
        controller.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page2.city]);

  const selectCity = (
    <div className="row-item row-item-3">
      <div className="info">
        <span>*</span> {WIZARD_PAGE_2.city_label}
        {!!prevInfo && loadingCity && <Spinner />}
      </div>
      <select
        name="city"
        data-live-search="true"
        value={page2.city}
        className={`disabled-${loadingCity}`}
        disabled={loadingCity}
        onChange={(e) => handleDisabledOnChange(e)}
      >
        {disabled.city || citiesOpt.length < 2 || loadingCity ? (
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
        )}
      </select>
      <span className="error-text">{errors_page2.city}</span>
    </div>
  );

  const selectZip = (
    <div className="row-item row-item-3">
      <div className="info">
        <span>*</span> {WIZARD_PAGE_2.zip_label}
        {!!page2.city && loadingZip && <Spinner />}
      </div>
      <select
        name="zip"
        value={page2.zip}
        disabled={loadingZip}
        className={`disabled-${loadingZip}`}
        onChange={(e) => handleDisabledOnChange(e)}
      >
        {disabled.zip || zipsOpt.length < 2 || loadingZip ? (
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

      <span className="error-text">{errors_page2.zip}</span>
    </div>
  );

  return fieldName === 'city' ? selectCity : selectZip;
};

export default SelectField;
