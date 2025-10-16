window.addEventListener('DOMContentLoaded', function() {
    createTable('all');
    filterMenuEvent();
})

function menuDefaultColor(menu) {
    menu.style.background = "rgb(137, 137, 135)";
    menu.style.borderLeft = "1px solid var(rgb(137, 137, 135))";
    menu.style.borderBottom = "2px solid var(rgb(137, 137, 135))";
}

function menuSelectColor(menu) {
    menu.style.background = "rgb(251, 67, 87)";
    menu.style.borderLeft = "1px solid var(rgb(251, 67, 87))";
    menu.style.borderBottom = "2px solid var(rgb(251, 67, 87))";
}

function filterMenuEvent() {
    let menuList = document.querySelectorAll(".filter-menu a");

    // 처음 호출 시 버튼 색상
    menuList.forEach(menu => {
        menu.id === 'all' ? menuSelectColor(menu) : menuDefaultColor(menu);
    })

    menuList.forEach((menu) => {
        menu.addEventListener('click', ()=>{
            menuList.forEach(menu => menuDefaultColor(menu));
            menuSelectColor(menu);
            createTable(menu.id);
        });
    });     
}

async function filterData(type) {
    let list = await getData();
    let filterList = list.filter((item) => item.type === type);
    console.log(filterList);
    return filterList;
}

async function getData() {
    let response = await fetch("../data/support.json");
    return response.json();
}

async function createTable(type) {
    let list = null;
    if(type === 'all'){
        list = await getData();
    } else {
        list = await filterData(type);
    }
    console.log(list);
    
    let output = `
        <table class="stable">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>구분</th>
                    <th>제목</th>
                    <th>등록일</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                ${ list.map((item, index) => `
                    <tr class="itemInfo">
                        <td>${index + 1}</td>
                        <td>[${item.type}]</td>
                        <td><a href="#">${item.title}</a></td>
                        <td>${item.rdate}</td>
                        <td>${item.hits}</td>
                    </tr>   
                `).join("")}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="5">1 2 3 4 5 >> </td>
                </tr>
            </tfoot>
        </table>
    `;
    document.querySelector(".stable")?.remove();
    document.querySelector("#before-table").insertAdjacentHTML('afterend', output);
}