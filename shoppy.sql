/* 데이터베이스 생성*/
create database shoppy;

/* 데이터베이스 열기 */
use shoppy;
select database();

/* 테이블 목록 확인 */
show tables;

/* member 테이블 생성 */
create table member(
	id		varchar(50)	primary key,
    pwd 	varchar(50)	not null,
    name	varchar(20)	not null,
    phone	char(13),
    email	varchar(50)	not null,
    mdate	date
);

/* pwd 사이즈 변경 */
alter table member modify column pwd varchar(100) not null;

/* mysql은 수정, 삭제 시 update mode를 변경 */
SET SQL_SAFE_UPDATES = 0; 

show tables;
desc member;

select * from member;
select count(*) from member where id = "test";

delete from member
where mdate = '2025-10-20';

select pwd from member where id = "test";


/*****************************
	상품 테이블 생성 : product
******************************/
create table product(
	pid		int		auto_increment primary key,
    name 	varchar(200)	not null,
	price	long,
    info	varchar(200),
    rate	double,
    image	varchar(100),
    imgList	json
);

DROP TABLE product;

desc product;
select * from product;
insert into product(name, price, info, rate, image, imgList)
	values
    ("후드티", 15000, "분홍색 후드티", 4.2, "1.webp", JSON_Array("1.webp", "1.webp", "1.webp")),
    ("후드티", 15000, "검정색 후드티", 2.2, "2.webp", JSON_Array("2.webp", "2.webp", "2.webp")),
    ("원피스", 25000, "원피스", 4, "3.webp", JSON_Array("3.webp", "3.webp", "3.webp")),
    ("반바지", 12000, "반바지", 3.2, "4.webp", JSON_Array("4.webp", "4.webp", "4.webp")),
    ("티셔츠", 20000, "티셔츠", 5, "5.webp", JSON_Array("5.webp", "5.webp", "5.webp")),
    ("스트레치 비스트 드레스", 55000, "스트레치 비스트 드레스", 3, "6.webp", JSON_Array("6.webp", "6.webp", "6.webp")),
    ("자켓", 115000, "자켓", 3.5, "7.webp", JSON_Array("7.webp", "7.webp", "7.webp"));
    
select pid, name, price, info, rate, trim(image) as image, igmList from product;
select distinct(pid) as pid from product;

/***********************************************
	상품 상세정보 테이블 생성 : product_detailinfo
************************************************/
create table product_detailinfo(
	did			int				auto_increment	primary key,
    title_en	varchar(100)	not null,
    title_ko	varchar(100)	not null,
    pid			int				not null,
    list		json,	-- nodeJs(JSON), springboot(String, List<>)
    constraint fk_product_pid	foreign key(pid) references product(pid)
    on delete cascade
    on update cascade
);

-- DROP TABLE product_detailinfo; 
desc product_detailinfo;
select * from product_detailinfo;

-- mysql에서 json, csv, excel... 데이터 파일을 업로드 하는 경로
show variables like 'secure_file_priv';

-- product.json 파일의 detailinfo 정보 매핑
insert into product_detailinfo(title_en, title_ko, pid, list)
select 
	jt.title_en,
    jt.title_ko,
    jt.pid,
    jt.list
from
	json_table(
		cast(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/products.json') 
				AS CHAR CHARACTER SET utf8mb4 ),
		'$[*]' COLUMNS (
			 title_en   	VARCHAR(100)  PATH '$.detailInfo.title_en',
			 title_ko   	VARCHAR(100)  PATH '$.detailInfo.title_ko',
			 list   	json PATH '$.detailInfo.list',
			 pid		int	 PATH '$.pid'
		   )   
    ) as jt ;

-- pid : 1에 대한 상품 정보와 상세 정보 출력
select * from product p, product_detailinfo pd where p.pid = pd.pid and p.pid = 1;

select did, title_en as titleEn, title_ko as titleKo, pid, list from product_detailinfo where pid = 1;

/*************************************
	상품 QnA 테이블 생성 : product_qna
**************************************/
desc product_qna;
create table product_qna(
	qid			int				auto_increment	primary key,
    title		varchar(100)	not null,
    content		varchar(200),
    is_complete	boolean,
    is_lock		boolean,
    id			varchar(50)		not null,
    pid			int				not null,
    cdate		datetime,
    constraint fk_product_qpid	foreign key(pid) references product(pid)
		on delete cascade  on update cascade,
	constraint fk_member_id	foreign key(id) references member(id)
		on delete cascade  on update cascade	
);

select * from product_qna;
-- DROP TABLE cart;  

-- product_qna data insert
insert into product_qna(title, content, is_complete, is_lock, id, pid, cdate)
select 
	jt.title,
    jt.content,
    jt.is_complete,
    jt.is_lock,
    jt.id,
    jt.pid,
    jt.cdate
from
	json_table(
		cast(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/productQnA.json') 
				AS CHAR CHARACTER SET utf8mb4 ),
		'$[*]' COLUMNS (
			 title   		VARCHAR(100)  PATH '$.title',
			 content   		VARCHAR(200)  PATH '$.content',
			 is_complete	boolean  PATH '$.isComplete',
			 is_lock   		boolean  PATH '$.isLock',
			 id				varchar(50)	 PATH '$.id',
			 pid			int	 PATH '$.pid',
             cdate			datetime	PATH '$.cdate'
		   )   
    ) as jt ;

select * from product_qna;
-- hong 회원이 분홍색 후드티(pid:1) 상품에 쓴 QnA 조회
-- 회원아이디, 회원명, 가입날짜, 상품명, 상품가격, QnA 제목, 내용, 등록날짜
select 
	m.id, 
	m.name, 
    m.mdate, 
    p.pid, 
    p.name, 
    p.price, 
    pq.title, 
    pq.content, 
    pq.cdate
from member m, product p, product_qna pq 
where m.id = pq.id 
and p.pid = pq.pid
and m.id = "hong" and p.pid = 1;

select qid, title, content, is_complete as isComplete, is_lock as isLock, id, pid, cdate from product_qna where pid = 1;

/****************************************************
	상품 Return/Delivery 테이블 생성 : product_return
*****************************************************/
show tables;
create table product_return (
	rid			int				auto_increment	primary key,
    title		varchar(100)	not null,
    description	varchar(200),
    list		json
);

desc product_return;
select * from product_return;

-- product_return data insert
insert into product_return(title, description, list)
select 
	jt.title,
    jt.description,
    jt.list
from
	json_table(
		cast(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/productReturn.json') 
				AS CHAR CHARACTER SET utf8mb4 ),
		'$[*]' COLUMNS (
			 title   		VARCHAR(100)  	PATH '$.title',
			 description   	VARCHAR(200)  	PATH '$.description',
			 list			json  			PATH '$.list'
		   )   
    ) as jt ;

/******************************
	장바구니 테이블 생성 : cart
*******************************/
-- pid, id, size, qty, cdate
create table cart(
	cid		int			auto_increment	primary key,
    size	char(2)		not null,
	qty		int			not null,
    pid		int			not null,
    id		varchar(50)	not null,
    cdate	datetime	not null,
    constraint fk_cart_pid	foreign key(pid) references product(pid)
	on delete cascade	on update cascade,
	constraint fk_cart_id	foreign key(id) references member(id)
	on delete cascade	on update cascade
);

desc cart;
select * from cart;

-- my sql은 수정, 삭제 시 update mode를 변경
set SQL_SAFE_UPDATES = 0;

-- delete from cart where cid in (1,2);
-- pid:1, size를 이용하여 상품의 존재 check table
-- checkQty = 1인 경우 cid(o) 유효 데이터
-- checkQty = 0인 경우 cid(x) 무효 데이터
SELECT 
      ifnull(MAX(cid), 0) AS cid,
      COUNT(*) AS checkQty
    FROM cart
    WHERE pid = 1 AND size = 'xs' AND id = 'test';

-- 장바구니 상품 갯수 조회
select count(qty) from cart where id = "test";
select ifnull(sum(qty), 0) as sumQty from cart where id = "test";

-- 장바구니 리스트 조회
-- 어떤 회원이 어떤 상품을 몇 개 넣었는가?

select
        m.id,
        p.pid,
        p.name,
        p.image,
        p.price,
        c.size,
        c.qty,
        c.cid
from product p, cart c, member m
where p.pid = c.pid
        and c.id = m.id
        and m.id = "test";

select ifnull(sum(qty), 0) as sumQty from cart where id = "test";
select * from cart where id = "test";

-- 장바구니 총 상품 가격 : qty(cart), price (product)
select 
	sum(c.qty * p.price) as totalPrice 
from cart c 
inner join product p on c.pid = p.pid
where c.id = "test";

-- 회원별 장바구니 리스트 조회
select 
	m.id,    
	m.name as mname,
	m.phone,
	m.email,
    p.pid,
    p.name,
	p.image,
	p.price,
	c.size,
    c.qty,
    c.cid,
    (select 
		sum(c.qty * p.price) as totalPrice 
	from cart c 
	inner join product p on c.pid = p.pid
	where c.id = "test") as total_price
from member m, product p, cart c
where m.id = c.id
	and p.pid = c.pid
    and m.id = "test";

-- 장바구니 리스트 view 생성
show tables from information_schema;
select * from information_schema.views where table_schema = 'shoppy';

drop view view_cartList;

select * from view_cartList where id = "test";

create view view_cartList
as
select
	m.id,
	m.name as mname,
	m.phone,
	m.email,
	p.pid,
	p.name,
	p.info,
	p.image,
	p.price,
	c.size,
	c.qty,
	c.cid,
    t.totalPrice
 from member m, product p, cart c,
	(select c.id, sum(c.qty * p.price) as totalPrice 
		from cart c 
		inner join product p on c.pid = p.pid
        group by c.id) as t
 where m.id = c.id
	and p.pid = c.pid
    and c.id = t.id;

select id, mname, phone, email, pid, name, info, image, price, size, qty, vc.cid, totalPrice 
from view_cartList vc,
	(select c.cid, sum(c.qty * p.price) as totalPrice 
		from cart c 
		inner join product p on c.pid = p.pid
		where c.id = "kim" 
        group by c.cid) as total
where vc.cid = total.cid;

-- select a, (select ~~~) as b <-- 스칼라 서브쿼리
-- from test, (select ~~~) as t <-- 인라인뷰
-- where id = (select ~~~) <-- 서브쿼리

/****************************************
		고객센터 테이블 생성 : support
*****************************************/
create table support(
	sid		int				auto_increment	primary key,
    title	varchar(100)	not null,
    content	varchar(200),
    stype	varchar(30)		not null,
    hits	int,
    rdate	datetime
);

show tables;
select * from support;
select sid, title, stype, hits, rdate from support;
desc support;

insert into support(title, stype, hits, rdate)
select 
	jt.title,
    jt.stype,
    jt.hits,
    jt.rdate
from
	json_table(
		cast(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/support_list.json') 
				AS CHAR CHARACTER SET utf8mb4 ),
		'$[*]' COLUMNS (
			 title   	VARCHAR(100)  	PATH '$.title',
			 stype   	VARCHAR(30)  	PATH '$.type',
			 hits		int  			PATH '$.hits',
			 rdate		datetime  		PATH '$.rdate'
		   )   
    ) as jt ;

select distinct stype from support;


select sid, title, stype, hits, rdate from support;
select sid, title, stype, hits, rdate from support where stype = "event";





