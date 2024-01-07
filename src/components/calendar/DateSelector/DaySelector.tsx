import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { EffectCoverflow, Mousewheel } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.css';

import { useEffect, useRef } from 'react';
import { getMaximumDate } from 'src/utills/calendarUtils';
import './dateSelector.css';

interface DaySelectorProps {
  year: number;
  month: number;
  initialDay: number;
  onDayChange: (newDay: number) => void;
  resetTrigger: boolean;
}

const DaySelector = ({ year, month, initialDay, onDayChange, resetTrigger }: DaySelectorProps) => {
  const swiperRef = useRef(useSwiper());
  const initialIndex = initialDay - 1;

  useEffect(() => {
    if (swiperRef) {
      swiperRef.current.slideTo(initialIndex);
    }
    // eslint-disable-next-line
  }, [resetTrigger]);

  const maxDate = getMaximumDate({ year, month });
  const DayArr = Array.from({ length: maxDate }, (_, index) => index);

  return (
    <div className="Day-selector date-selector">
      <Swiper
        slidesPerView={5}
        direction={'vertical'}
        centeredSlides={true}
        initialSlide={initialIndex}
        mousewheel={true}
        slideToClickedSlide={true}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 25,
          stretch: 0,
          depth: 0,
          modifier: 1,
          slideShadows: false,
        }}
        onSlideChange={(swiper: SwiperType) => {
          onDayChange(swiper.activeIndex + 1);
        }}
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
        modules={[Mousewheel, EffectCoverflow]}
      >
        {DayArr.map((Day, index) => (
          <SwiperSlide key={Day} virtualIndex={index}>
            <h6>{Day + 1}일</h6>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DaySelector;
