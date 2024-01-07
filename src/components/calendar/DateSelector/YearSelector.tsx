import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { EffectCoverflow, Mousewheel } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.css';

import { CALENDAR_API } from 'src/constants/API';
import { useEffect, useRef } from 'react';
import './dateSelector.css';

interface YearSelectorProps {
  initialYear: number;
  onYearChange: (newYear: number) => void;
  resetTrigger: boolean;
}

const YearSelector = ({ initialYear, onYearChange, resetTrigger }: YearSelectorProps) => {
  const swiperRef = useRef(useSwiper());
  const initialIndex = initialYear - CALENDAR_API.minYear;

  useEffect(() => {
    if (swiperRef) {
      swiperRef.current.slideTo(initialIndex);
    }
    // eslint-disable-next-line
  }, [resetTrigger]);

  const yearArr = Array.from(
    { length: CALENDAR_API.maxYear - CALENDAR_API.minYear },
    (_, index) => CALENDAR_API.minYear + index
  );

  return (
    <div className="year-selector date-selector">
      <Swiper
        slidesPerView={5}
        direction={'vertical'}
        centeredSlides={true}
        initialSlide={initialIndex}
        mousewheel={true}
        effect={'coverflow'}
        slideToClickedSlide={true}
        coverflowEffect={{
          rotate: 25,
          stretch: 0,
          depth: 0,
          modifier: 1,
          slideShadows: false,
        }}
        onSlideChange={(swiper: SwiperType) => {
          onYearChange(swiper.activeIndex + CALENDAR_API.minYear);
        }}
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
        modules={[Mousewheel, EffectCoverflow]}
      >
        {yearArr.map((year, index) => (
          <SwiperSlide key={year} virtualIndex={index}>
            <h6>{year}년</h6>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default YearSelector;
