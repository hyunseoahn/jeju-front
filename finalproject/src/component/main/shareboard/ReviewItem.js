import React, {Component, useState} from 'react';
import {actionType, URL} from "../../../redux/config";
import axios from "axios";
import store from "../../../redux/store";
import { MDBBtn } from "mdbreact";

class ReviewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            saveType: "",
        }

    }

    onTriggerInput = (type = null) => {

        const {row} = this.props;
        var className = `.input_answer_${row.regroup}_${row.relevel}_${row.restep}`;
        console.log(className);

        let divInput = document.querySelector(className);

        if (this.state.saveType == type || type == null) {
            if (this.state.isOpen) {
                divInput.style.display = "none";
                this.setState({
                    isOpen: false,
                });
            } else {
                divInput.style.display = "block";
                this.setState({
                    isOpen: true,
                    saveType: type,
                });
            }
        } else {
            divInput.style.display = "block";
            this.setState({
                isOpen: true,
                saveType: type,
            });
        }
    }

    onSaveButton = () => {
        console.log(this.state.saveType);
        if (this.state.saveType == "insert") {
            this.onInsertSubAnswer();
        } else if (this.state.saveType == "update") {
            this.onUpdateSubAnswer();
        }
    }

    onInsertSubAnswer = () => {
        // 리뷰 대댓글 추가.
        let num = this.props.row.num;
        let regroup = this.props.row.regroup;
        let relevel = this.props.row.relevel;
        let restep = this.props.row.restep;
        let content = this.refs.content.value;
        let star = 0;
        let url = URL + "/share/insert" +
            "?" +
            "relevel=" + relevel +
            "&restep=" + restep +
            "&regroup=" + regroup;
        let data = {
            num: num,
            // regroup: regroup,
            // relevel: relevel,
            // restep: restep,
            content: content,
            star: star,
        }

        console.log(url, data);

        axios.post(url, data
        ).then(res => {
            console.log("onInsertAnswer res", res);
            store.dispatch({
                type: actionType.shareBoardUpdate,
            });
            this.onTriggerInput();
            this.refs.content.value = "";
        }).catch(err => {
            console.log("onInsertAnswer err", err);
        })
    }

    onDeleteSubAnswer = () => {
        let num = this.props.row.num;
        let regroup = this.props.row.regroup;
        let url = URL + "/share/deleteanswer" +
            "?num=" + num;

        console.log("onDeleteData", url);

        if (window.confirm("삭제하시겠습니까?")) {
            axios.post(url
            ).then(res => {
                console.log("onDeleteData() res", res);
                store.dispatch({
                    type: actionType.shareBoardUpdate,
                });
                // this.props.history.push("/share");
            }).catch(err => {
                console.log("onDeleteData() err", err);
            });
        }
    }

    onUpdateSubAnswer = () => {
        let num = this.props.row.num;
        let content = this.refs.content.value;
        let url = URL + "/share/updateanswer" +
            "?num=" + num +
            "&content=" + content;
        console.log("onUpdateSubAnswer", url);

        if (window.confirm("수정하시겠습니까?")) {
            axios.post(url
            ).then(res => {
                console.log("onUpdateSubAnswer() res", res);
                store.dispatch({
                    type: actionType.shareBoardUpdate,
                });
                // this.props.history.push("/share");
                this.refs.content.value = "";
                this.onTriggerInput();
            }).catch(err => {
                console.log("onUpdateSubAnswer() err", err);
            });
        }
    }

    render() {
        const {row} = this.props;

        return (
            <div style={{marginLeft: `calc(30px*${row.relevel})`}}>
                {row.num} / {row.photo} / {row.regroup} / {row.relevel} / {row.restep} / 내용 :
                <div style={{border: "1px solid", margin: "5px"}}>
                    {row.content}
                </div>
                <MDBBtn size="sm" color="deep-orange" 
                        onClick={this.onTriggerInput.bind(this, "insert")}
                        disabled={row.content.includes("삭제된 글입니다.") ? true : false}
                ><b style={{fontSize:'12px'}}>댓글 쓰기</b>
                </MDBBtn>
                &nbsp;
                <MDBBtn size="sm" color="deep-orange" 
                        onClick={this.onTriggerInput.bind(this, "update")}
                        disabled={row.content.includes("삭제된 글입니다.") ? true : false}
                ><b style={{fontSize:'12px'}}>댓글 수정</b>
                </MDBBtn>
                &nbsp;
                <MDBBtn size="sm" color="deep-orange" 
                        onClick={this.onDeleteSubAnswer.bind(this)}
                        disabled={row.content.includes("삭제된 글입니다.") ? true : false}
                ><b style={{fontSize:'12px'}}>댓글 삭제</b>
                </MDBBtn>

                {/*댓글 입력창 on/off*/}
                <div className={`input_answer_${row.regroup}_${row.relevel}_${row.restep}`}>
                    <textarea placeholder="댓글을 입력하세요" className="form-control"
                              style={{width: '800px', height: '100px',float:'left'}}
                              ref="content"
                    />
                    <MDBBtn  size="sm" color="deep-orange" style={{width:'160px',height:'90px',marginLeft:'13px'}}
                            onClick={this.onSaveButton.bind(this)}
                    ><b style={{fontSize:'18px'}}>저 장</b>
                    </MDBBtn>
                </div>
                <hr/>
            </div>
        )
    }
}

export default ReviewItem;
