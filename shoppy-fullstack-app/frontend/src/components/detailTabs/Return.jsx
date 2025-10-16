import React, { useState, useEffect } from 'react';
import { axiosData } from '../../utils/dataFetch.js';

export function Return() {
    const [returnData, setReturnData] = useState({});

    useEffect(() => {
        const fetch = async () => {
            const jsonData = await axiosData("/data/productReturn.json");
            setReturnData(jsonData);
        }
        fetch();
    },[])

    // console.log(`returnData -> `,returnData);

    return (
        <div>
            <div style={{padding:"20px"}}></div>
            <h4>{returnData && returnData.title}</h4>
            <p style={{paddingBottom:"20px"}}>{returnData && returnData.description}</p>
            <table className='review-list-content'>
                <tbody>
                    { returnData.list && returnData.list.map((item,index) => 
                        <tr key={index}>
                            <td style={{width:"30%", textAlign:"center"}}>{item.title}</td>
                            <td>
                                <ul style={{textAlign:"left"}}>
                                    { item.infoList && item.infoList.map((item, index)=> 
                                            <li key={index}>{item}</li>
                                    )}
                                </ul>
                            </td>
                        </tr>
                    )}
                    <tr><td colSpan={2}></td></tr>
                </tbody>
            </table>
        </div>
    );
}

