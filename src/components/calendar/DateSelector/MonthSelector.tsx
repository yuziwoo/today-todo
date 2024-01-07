import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { EffectCoverflow, Mousewheel } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { useEffect, useRef } from 'react';
import 'swiper/swiper-bundle.css';
import './dateSelector.css';

interface MonthSelectorProps {
  initialMonth: number;
  onMonthChange: (newMonth: number) => void;
  resetTrigger: boolean;
}

const MonthSelector = ({ initialMonth, onMonthChange, resetTrigger }: MonthSelectorProps) => {
  const swiperRef = useRef(useSwiper());
  const initialIndex = initialMonth;

  useEffect(() => {
    if (swiperRef) {
      swiperRef.current.slideTo(initialIndex);
    }
    // eslint-disable-next-line
  }, [resetTrigger]);

  const MonthArr = Array.from({ length: 12 }, (_, index) => index);

  return (
    <div className="Month-selector date-selector">
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
          onMonthChange(swiper.activeIndex);
        }}
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
        modules={[Mousewheel, EffectCoverflow]}
      >
        {MonthArr.map((Month, index) => (
          <SwiperSlide key={Month} virtualIndex={index}>
            <h6>{Month + 1}월</h6>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MonthSelector;
