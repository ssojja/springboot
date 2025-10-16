import React from 'react';
import { faPlus } from 'react-icons/fa6';

export function ImageList({imgList, className}) {
    return (
        <ul className={className}>
            {imgList && imgList.map((img, index)=>
                <li key={index}>
                    <img src={img} />
                </li>
            )}
        </ul>
    );
}

