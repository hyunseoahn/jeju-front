import axios from 'axios';
import React,{Component}  from 'react';
import {URL} from '../../../redux/config';

class NoticeContent extends Component
{
    constructor({match})
    {
        super();
        this.num=match.params.num;
        this.state={
            selectData:[]
        }
    }
    onSelectData=()=>{
        let url=URL + "/notice/detail";

        axios.get(url)
        .then(res=>{
            this.setState({
                selectData:res.data
            })
        })
    }

    componentWillMount() {
        this.onSelectData();
    }

    render(){
        const {selectData}=this.state;

        return (
            <div>
                <table className="table table-bordered"
                style={{width:'400px'}}>
                    <caption><h3>{selectData.title}</h3></caption>
                    <tbody>
                        <tr>
                            <td>
                                <b>작성자:{selectData.subject}</b>
                                &nbsp;&nbsp;
                               <pre>내용:{selectData.content}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align='center'>
                                <button type="button" className="btn
                                btn-success btn-sm"
                                style={{marginLeft:'100px',width:'100px'}}
                                onClick="">수정</button>
                                <button type="button" className="btn
                                btn-success btn-sm"
                                style={{marginLeft:'100px',width:'100px'}}
                                onClick="">삭제</button>

                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default NoticeContent;