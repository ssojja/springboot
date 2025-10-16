import React from 'react';

export function SearchForm({category}) {
    // const category = [
    //     {"name":"제목", "value":"title"},
    //     {"name":"내용", "value":"content"}
    // ];

    return (
        <div>
            <div>
                <select name="search_cartegory" style={{width:"15%", marginRight:"5px"}}>
                    { category && category.map(item=>
                        <option value={item.value}>{item.name}</option>
                    )}
                </select>
                <input type="text" name="search_content" style={{width:"40%", marginRight:"5px"}}/>
                <button>검색하기</button>
            </div>
        </div>
    );
}

