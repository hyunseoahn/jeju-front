import React, {Component} from "react";
import store from "../../../redux/store";
import ItemComp from "./ItemComp";
import axios from "axios";
import PageComp from "./PageComp";
import './TourCss.css';
import Tourintro from './Tourintro';
import {URL} from "../../../redux/config";

class TourPageComp extends Component {

    state = {
        area: store.getState().spotView,
        spotList: [],
        pageNum: '0'
    }

    constructor(props) {
        super(props);

        console.log("TourPageComp this.props", this.props);

        //const { history, location } = this.props;
        //console.log("Tour url 출력 : " + this.location.pathname);
        //console.log("Tour Page props 출력 : " + history + location.state);

        store.subscribe(function () {
            console.log("TourPageComp subscribe()");
            this.setState({
                spotView: store.getState().spotView
            });
        }.bind(this));

        console.log("tour page : " + this.state.area);
        this.currentPage = 1;
        this.totalCount = 0;
        this.perPage = 12; // 한페이지당 보여질 글의 갯수
        this.perBlock = 5; // 한블럭당 출력할 페이지의 갯수
        this.totalPage = 0; // 총 페이지의 갯수
        this.startPage = 0; // 각 블럭당 시작 페이지 번호
        this.endPage = 0; // 각 블럭당 끝페이지 번호
        this.start = 0; // 각 블럭당 불러올 글의 시작번호
        this.end = 0; // 각 블럭당 글의 끝번호
        this.no = 0; // 각 페이지에서 출력할 시작번호

        this.select = 'star';
    }

    getList = () => {

        // 나머지가 있을 경우에는 1페이지 더 추가 (예 : 총글수가 9이고 한페이지당 2개씩 볼 경우)
        this.totalPage = Math.floor(this.totalCount / this.perPage) + (this.totalCount % this.perPage > 0 ? 1 : 0);

        // 시작페이지와 끝페이지 구하기
        this.startPage = Math.floor((this.currentPage - 1) / this.perBlock) * this.perBlock + 1;
        this.endPage = this.startPage + this.perBlock - 1;
        // 마지막 블럭은 endPage를 totalPage로 해놔야 한다.
        if (this.endPage > this.totalPage)
            this.endPage = this.totalPage;

        // mysql은 첫 글이 0번이므로 +1 안해도됨 (오라클은 1번)
        this.start = (this.currentPage - 1) * this.perPage;

        this.no = this.totalCount - (this.currentPage - 1) * this.perPage;

        let url = URL + "/spot/list?start=" + this.start + "&perPage=" + this.perPage + "&label2=" + this.state.area +
            "&select=" + this.select;

        axios.get(url)
            .then(res => {
                this.setState({
                    spotList: res.data
                })
            }).catch(err => {
            console.log("spotlist getList 오류 : " + err);
        })
    }

    getTotalCount = () => {
        let url = URL + "/spot/count?label2=" + this.state.area;

        axios.get(url)
            .then(res => {
                this.totalCount = res.data;
                this.getList();
            }).catch(err => {
            console.log("spotlist getTotalCount 오류 : " + err);
        })
    }

    componentWillMount() {
        console.log("투어 페이지 willMount");
        this.getTotalCount();

    }

    componentWillUnmount() {
        console.log("투어 페이지 willunMount");
    }

    componentDidUpdate() {
        console.log("투어 페이지 DidUpdate");
    }

    paginate = (num) => {

        this.currentPage = num;
        this.getList();
    }

    selectChange = (e) => {
        this.select = e.target.value;
        this.getList();
    }

    render() {
        console.log("TourPageComp render()", this.props);
        return (
            <div>
                <Tourintro area={this.state.area}/>

                <br/><br/>
                {this.state.area}

                <select onChange={this.selectChange.bind(this)} value={this.select} style={{float: 'right'}}>
                    <option value="star">평점순</option>
                    <option value="likes">좋아요순</option>
                    <option value="title">제목순</option>
                </select>

                <br/><br/>
                {/* list 출력 */}
                {this.state.spotList.map((row, idx) => (
                    <ItemComp row={row} key={idx} history={this.props.history}></ItemComp>
                ))}

                {/* 페이징 */}
                <PageComp area={this.state.area} startPage={this.startPage} endPage={this.endPage}
                          currentPage={this.currentPage}
                          totalPage={this.totalPage} paginate={this.paginate.bind(this)}></PageComp>
            </div>
        )
    }

}

export default TourPageComp;
