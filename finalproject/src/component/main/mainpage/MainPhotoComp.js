import React, {Component} from 'react';
import jeju1 from "../../../image/jeju1.jpg";
import jeju2 from "../../../image/jeju2.jpg";
import jeju3 from "../../../image/jeju3.jpeg";
import udo1 from "../../../image/udo1.jpg";
import gsap from "gsap";
// import WaveBorder from "./WaveBorder";
// import {createMuiTheme, MuiThemeProvider, WithStyles} from "@material-ui/core";
// import {ThemeProvider} from 'styled-components';
// import theme from "./theme";
// import PropTypes from "prop-types";
// import styledComponents from "styled-components";

class MainPhotoComp extends Component {


    constructor(props) {
        super(props);


    }

    setImageScroll = (photoNum, preNum = 4) => {
        const duration = 3;
        const imgCnt = 4;
        let arrImg = [];

        //over index setting
        if (photoNum > imgCnt) {
            photoNum = 1;
        }

        //img element array setting.
        for (let i = 1; i <= imgCnt; i++) {
            let tempImgIdx = (photoNum - 1) + i;
            tempImgIdx = tempImgIdx > imgCnt ? tempImgIdx - imgCnt : tempImgIdx;
            arrImg.push(document.querySelector(`img.mainPhotoComp_img${tempImgIdx}`));
        }


        if (arrImg[0] != null) {
            //zIndex setting.
            for (let i = 0; i < imgCnt; i++) {
                arrImg[i].style.zIndex = imgCnt - i;
            }

            //tween action.
            gsap.fromTo(`.mainPhotoComp_img${photoNum}`
                , {
                    opacity: 0,
                }, {
                    opacity: 1,
                    duration: duration,
                });
            gsap.fromTo(`.mainPhotoComp_img${preNum}`
                , {
                    // opacity: 1,
                }, {
                    opacity: 0,
                    duration: duration,
                });

            //next action preparing.
            setTimeout(this.setImageScroll.bind(this, photoNum + 1, photoNum), (duration + 2) * 1000);
        }

    }

    componentDidMount() {
        for (let i = 0; i < 4; i++) {
            gsap.killTweensOf(`.mainPhotoComp_img${i + 1}`);
        }
        // this.setImageScroll(1, 4);
    }

    render() {
        return (
            <div className="mainPhotoComp">
                    <img className="mainPhotoComp_img1" src={jeju1}/>
                {/*<div>*/}
                {/*    <img className="mainPhotoComp_img2" src={jeju2}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <img className="mainPhotoComp_img3" src={jeju3}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <img className="mainPhotoComp_img4" src={udo1}/>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default MainPhotoComp
