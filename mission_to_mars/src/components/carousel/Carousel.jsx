import { useState, useEffect, useCallback } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import axios from 'axios';

import CardCarousel from './CardCarousel';

import Loader from '../../assets/Loader';
import useWindowSize from '../../hooks/useWindowSize';
import { Col, Row, Button, Container } from 'react-bootstrap';

const IMAGES_APIKEY = process.env.REACT_APP_IMAGES_APIKEY;
const IMAGES_COUNT = 32;
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
    if (width > 1200) {
      setAmount_activeImgs(4);
    }
    if ((width > 992) & (width <= 1200)) {
      setAmount_activeImgs(3);
    }
    if ((width > 768) & (width <= 992)) {
      setAmount_activeImgs(2);
    }
    if (width <= 768) {
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
    <Row className="g-0 mt-5 py-5">
      <Container
        className="d-flex justify-content-center flex-column align-items-center"
        style={{ minHeight: '42vh' }}
      >
        {loading && <Loader />}
        {err && (
          <h4 className="error msg">
            Our images are still somewhere in the Univers <br /> enjoy the rest
            of content
          </h4>
        )}
        {activeImgs && (
          <>
            <Row className="g-0">
              <Col
                xs={1}
                className="my-auto col-1 d-flex justify-content-center"
              >
                {first !== 0 ? (
                  <Button variant="dark" onClick={handlePrev}>
                    <AiOutlineArrowLeft />
                  </Button>
                ) : (
                  <Button variant="dark" className="arrow disabled">
                    <AiOutlineArrowLeft />
                  </Button>
                )}
              </Col>
              <Col xs={10} className="g-0 px-1 px-xs-0">
                <Row style={{ maxHeight: '100%' }}>
                  {activeImgs.map(({ url, title, explanation }) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                      <CardCarousel
                        key={title}
                        url={url}
                        name={title}
                        explanation={explanation}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col
                xs={1}
                className="my-auto col-1 d-flex justify-content-center"
              >
                {last !== IMAGES_COUNT ? (
                  <Button variant="dark" onClick={handleNext}>
                    <AiOutlineArrowRight />
                  </Button>
                ) : (
                  <Button variant="dark" className="arrow disabled">
                    <AiOutlineArrowRight />
                  </Button>
                )}
              </Col>
            </Row>
            <Row className="d-inline-flex justify-content-center w-100 mt-3">
              {amount_activeImgs >= 3 && (
                <>
                  {dots.map((dot) =>
                    dot === counter ? (
                      <div
                        key={dot}
                        className="m-2 rounded-circle border bg-secondary dot g-0"
                        style={{ width: '18px', height: '18px' }}
                      />
                    ) : (
                      <div
                        key={dot}
                        onClick={() => dotsHandler(dot)}
                        className="m-2 rounded-circle border bg-light dot g-0"
                        style={{ width: '18px', height: '18px' }}
                      />
                    )
                  )}
                </>
              )}
            </Row>
          </>
        )}
      </Container>
    </Row>
  );
};

export default Carousel;
