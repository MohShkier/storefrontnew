import React from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';

const MyCountdownComponent = () => {
    const targetDate = new Date('2024-07-27T03:00:00+03:00');

    const renderer = ({ days, hours, minutes,seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            return <span className='hidden'>Countdown completed</span>;
        } else {
            return (
                <div className="flex justify-center items-center space-x-4">
                <div className="text-center bg-red-200 py-2 px-4 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">{days}</div>
                  <div className="text-sm text-red-600">يوم</div>
                </div>
                <div className="text-center bg-red-200 py-2 px-4 rounded-lg ">
                  <div className="text-3xl font-bold text-red-600">{hours}</div>
                  <div className="text-sm text-red-600">ساعة</div>
                </div>
                <div className="text-center bg-red-200 py-2 px-4 rounded-lg ">
                  <div className="text-3xl font-bold text-red-600">{minutes}</div>
                  <div className="text-sm text-red-600">دقيقة</div>
                </div>
                     <div className="text-center bg-red-200 py-2 px-4 rounded-lg ">
                  <div className="text-3xl font-bold text-red-600">{seconds}</div>
                  <div className="text-sm text-red-600">ثانية</div>
                </div>
              </div>
            );
        }
    };

    return (
        <div className='flex justify-center pt-[5rem] pb-[2rem] text-2xl font-bold'>
            <Countdown date={targetDate} renderer={renderer} />
        </div>
    );
};

export default MyCountdownComponent;
