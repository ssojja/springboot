import React, { useState, useEffect } from 'react';
import { axiosData } from '../../utils/dataFetch.js';

export function QnA() {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [openQid, setOpenQid] = useState(null);

    useEffect(()=>{
        const load = async () => {
            const jsonData = await axiosData("/data/productQnA.json");
            setData(jsonData);
        }
        load();
    },[]);

    const handleToggle = (qid) => {
        setOpenQid(prev => prev === null ? qid : null);
        // setOpenQid(prev => (prev === null) ? null : qid);
    }

    const handleToggleButton = () => {
        setIsOpen(!isOpen);
    }

    // console.log(`data -> `, data);

    return (
        <div>
            <div style={{paddingTop:"20px"}}>
                {isOpen && 
                    <button type='button' style={{backgroundColor:"green"}} onClick={handleToggleButton}>상품문의</button>
                }

                {!isOpen && 
                    <button type='button' style={{backgroundColor:"coral"}} onClick={handleToggleButton}>상품문의</button>
                }
                {!isOpen && <span>버튼이 오렌지색입니다.</span>}
            </div>
            <table className='review-list-content'>
                <tbody>
                    { data && data.map((item, index)=> 
                        <tr key={index}>
                            <td style={{width:"10%"}}>
                                {item.isComplete ? <span>답변완료</span> : <span>답변준비중</span>}
                            </td>
                            <td style={{width:"60%"}}>
                                <span style={{cursor:"pointer"}} onClick={()=>handleToggle(item.qid)}>{item.title}</span>
                                {item.isLock && <span>비밀글</span>}
                                {openQid === item.qid && <span>{item.content}</span>}
                            </td>
                            <td style={{width:"15%"}}>{item.id}</td>
                            <td>{item.cdate}</td>
                        </tr>

                    )}
                    <tr>
                        <td colSpan={2}> {"<<"} 1 2 3 4 5 {">>"}</td>
                    </tr>   
                </tbody>
            </table>
        </div>
    );
}

