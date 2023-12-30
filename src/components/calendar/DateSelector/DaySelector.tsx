import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { EffectCoverflow, Mousewheel } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { Swiper as SwiperType } from 'swiper';

import './dateSelector.css';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { useEffect, useRef } from 'react';
import { getMaximumDate } from 'src/utills/calendarUtils';

interface DaySelectorProps {
  year: number;
  month: number;
  initialDay: number;
  onDayChange: (newDay: number) => void;
}

const DaySelector = ({ year, month, initialDay, onDayChange }: DaySelectorProps) => {
  const editorState = useSelector((state: RootState) => state.editor);
  const swiperRef = useRef(useSwiper());
  const initialIndex = initialDay - 1;

  useEffect(() => {
    if (swiperRef) {
      swiperRef.current.slideTo(initialIndex);
    }
    // eslint-disable-next-line
  }, [editorState.editing]);

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
