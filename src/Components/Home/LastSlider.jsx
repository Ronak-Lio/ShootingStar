import React from 'react';
import './LastSlider.css';

function LastSlider() {
    return (
        <div className="LastSlider">
            <div className="LastSlider_In">
                <div className="slide_last_img">
                 <img src="/img/user.svg" alt=""/>
                </div>
                <div className="lastSlider_l1">
                Very helpful teachers with awesome flexibility.
                </div>
                <div className="lastSlider_l2">
                    <div className="lastSlider_l2_studentName">
                        Kartik Jain
                    </div>
                    <div className="lastSlider_l2_React">
                        Happy Student
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastSlider;