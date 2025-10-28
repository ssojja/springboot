/* 데이터베이스 생성*/
create database ssf;

/* 데이터베이스 열기 */
use ssf;
select database();

/* 테이블 목록 확인 */
show tables;
-- drop table ssf_user;

/* user 테이블 생성 */
CREATE TABLE `ssf_user` (
	`user_key`		VARCHAR(100)	primary key		COMMENT '회원고유번호',
	`user_email`	VARCHAR(50)		NOT NULL		COMMENT '이메일',
	`user_username`	VARCHAR(20)		NOT NULL		COMMENT '이름',
	`user_userpwd`	VARCHAR(50)		NOT NULL		COMMENT '비밀번호',
	`user_banned`	VARCHAR(1)		NULL			COMMENT '정지여부',
	`user_signout`	VARCHAR(1)		NULL			COMMENT '회원탈퇴',
	`user_signin`	DATE			NOT NULL		COMMENT '가입날짜',
	`user_snsprov`	VARCHAR(100)	NULL			COMMENT 'SNS제공자종류',
	`user_snsid`	VARCHAR(100)	NULL			COMMENT '사용자SNS고유ID'
);

-- ALTER TABLE `ssf_user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
-- 	`user_key`
-- );

desc ssf_user;
select * from ssf_user;
