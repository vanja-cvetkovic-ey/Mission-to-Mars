import { useState, useEffect, useCallback } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import axios from 'axios';

import CardCarousel from './CardCarousel';
import Dot from './Dot';
import Loader from '../../assets/Loader';
import useWindowSize from '../../hooks/useWindowSize';

const IMGS_URL =
  'https://api.nasa.gov/planetary/apod?count=16&api_key=0T4UKBIFkSsjphqPhG1tuY7uSDOMAVAnlcDniPUj';

const Carousel = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [imgs, setImgs] = useState(null);
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(0);
  const [amount_activeImgs, setAmount_activeImgs] = useState();
  const [activeImgs, setActiveImgs] = useState(null);
  const [counter, setCounter] = useState(0);
  const [dots, setDots] = useState([]);

  const { width } = useWindowSize();

  useEffect(() => {
    setLoading(true);
    axios.get(IMGS_URL).then((response) => {
      setImgs(response.data);
    });
  }, []);

  const handleAmountActiveImgs = useCallback(() => {
    if (width > 1280) {
      setAmount_activeImgs(4);
    }
    if ((width > 900) & (width <= 1280)) {
      setAmount_activeImgs(3);
    }
    if ((width > 599) & (width <= 900)) {
      setAmount_activeImgs(2);
    }
    if (width <= 599) {
      setAmount_activeImgs(1);
    }
  }, [width]);

  useEffect(() => {
    handleAmountActiveImgs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleAmountActiveImgs]);

  useEffect(() => {
    if (imgs !== null) {
      setLast(amount_activeImgs);
      console.log(amount_activeImgs);
      const setOfImgs = imgs.slice(0, amount_activeImgs);
      setActiveImgs(setOfImgs);
      setLoading(false);
      const setOfDots = [];
      const ratio = imgs.length / amount_activeImgs;
      for (let i = 0; i < ratio; i++) {
        setOfDots[i] = i;
      }
      setDots(setOfDots);
    }
  }, [imgs, width]);

  useEffect(() => {
    if (activeImgs !== null) {
      setLoading(false);
      const setOfImgs = imgs.slice(first, last);
      setActiveImgs(setOfImgs);
    }
  }, [first, last]);

  const handleNext = () => {
    setFirst((prev) => prev + amount_activeImgs);
    setLast((prev) => prev + amount_activeImgs);
    setCounter((prev) => prev + 1);
  };

  const handlePrev = () => {
    setFirst((prev) => prev - amount_activeImgs);
    setLast((prev) => prev - amount_activeImgs);
    setCounter((prev) => prev - 1);
  };

  const dotsHandler = (round) => {
    console.log(round);
    let setOfImgs = [];

    if (round === 0) {
      setFirst(0);
      setLast(amount_activeImgs);
      setCounter(0);
    } else {
      setFirst(amount_activeImgs * round);
      setLast(amount_activeImgs * round + amount_activeImgs);
      setCounter(round);
    }
    console.log(setOfImgs);
  };

  return (
    <div className="Carousel">
      {loading && !err && !activeImgs && <Loader />}
      {!loading && err && !activeImgs && (
        <h4 className="error msg">
          Our messages are still out of the earth <br /> please try again later
        </h4>
      )}
      {!loading && !err && activeImgs && (
        <>
          <div className="flex-row">
            {/* <div className="arrow">
            <AiOutlineArrowLeft />
          </div> */}
            {first !== 0 ? (
              <div className="arrow" onClick={handlePrev}>
                <AiOutlineArrowLeft />
              </div>
            ) : (
              <div className="arrow disabled">
                <AiOutlineArrowLeft />
              </div>
            )}

            <div className="panel">
              {activeImgs.map((img, index) => (
                <CardCarousel
                  key={index}
                  url={img.url}
                  name={img.title}
                  explanation={img.explanation}
                />
              ))}
            </div>
            {last !== 16 ? (
              <div className="arrow" onClick={handleNext}>
                <AiOutlineArrowRight />
              </div>
            ) : (
              <div className="arrow disabled">
                <AiOutlineArrowRight />
              </div>
            )}
          </div>
          {dots.length > 6 ? (
            <div className="dots"></div>
          ) : (
            <div className="dots">
              {dots.map((dot) =>
                dot === counter ? (
                  <div key={dot} className="dot active"></div>
                ) : (
                  <div
                    key={dot}
                    className="dot"
                    onClick={() => dotsHandler(dot)}
                  ></div>
                )
              )}
            </div>
          )}
        </>
      )}
      <div className="dots">
        {/* {dots.map((dot) =>
          dot === counter ? (
            <div key={dot} className="dot active"></div>
          ) : (
            <div
              key={dot}
              className="dot"
              onClick={() => dotsHandler(dot)}
            ></div>
          )
        )} */}
      </div>
    </div>
  );
};

export default Carousel;
