import { useState, useEffect, useCallback } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import axios from 'axios';

import CardCarousel from './CardCarousel';

import Loader from '../../assets/Loader';
import useWindowSize from '../../hooks/useWindowSize';

const IMAGES_APIKEY = process.env.REACT_APP_IMAGES_APIKEY;
const IMAGES_COUNT = 16;
const IMGS_URL = `https://api.nasa.gov/planetary/apod?count=${IMAGES_COUNT}&api_key=${IMAGES_APIKEY}`;

const Carousel = () => {
  const [loading, setLoading] = useState(true);
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
    const fetchImgs = async () => {
      try {
        const { data } = await axios.get(IMGS_URL);
        setImgs(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErr(true);
      }
    };

    fetchImgs();
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
  }, [handleAmountActiveImgs]);

  const handleDotsAmount = useCallback(() => {
    if (imgs) {
      setLast(amount_activeImgs);
      const setOfImgs = imgs.slice(0, amount_activeImgs);
      setActiveImgs(setOfImgs);
      const numOfSliderPages = Array.from(
        { length: imgs.length / amount_activeImgs },
        (_, idx) => idx
      );

      setDots(numOfSliderPages);
    }
  }, [imgs, amount_activeImgs]);

  useEffect(() => {
    handleDotsAmount();
  }, [handleDotsAmount, width]);

  useEffect(() => {
    if (activeImgs) {
      setLoading(false);
      const setOfImgs = imgs.slice(first, last);
      setActiveImgs(setOfImgs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (round === 0) {
      setFirst(0);
      setLast(amount_activeImgs);
      setCounter(0);
    } else {
      setFirst(amount_activeImgs * round);
      setLast(amount_activeImgs * round + amount_activeImgs);
      setCounter(round);
    }
  };

  return (
    <div className="Carousel">
      {loading && <Loader />}
      {err && (
        <h4 className="error msg">
          Our images are still somewhere in the Univers <br /> enjoy the rest of
          content
        </h4>
      )}
      {!loading && !err && activeImgs && (
        <>
          <div className="flex-row">
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
              {activeImgs.map(({ url, title, explanation }) => (
                <CardCarousel
                  key={title}
                  url={url}
                  name={title}
                  explanation={explanation}
                />
              ))}
            </div>
            {last !== IMAGES_COUNT ? (
              <div className="arrow" onClick={handleNext}>
                <AiOutlineArrowRight />
              </div>
            ) : (
              <div className="arrow disabled">
                <AiOutlineArrowRight />
              </div>
            )}
          </div>
          <div className="dots">
            {dots.length < 6 && (
              <>
                {dots.map((dot) =>
                  dot === counter ? (
                    <div key={dot} className="dot active" />
                  ) : (
                    <div
                      key={dot}
                      className="dot"
                      onClick={() => dotsHandler(dot)}
                    />
                  )
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
