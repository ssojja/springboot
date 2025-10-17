package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.Member;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class JdbcTemplateMemberRepository implements MemberRepository{

    private final JdbcTemplate jdbcTemplate;

    // 생성자
    // @Autowired의 경우 임의로 생성한 생성자에만 붙임
    public JdbcTemplateMemberRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);   // 커넥션 생성
    };

    @Override
    public Long findById(String id) {
        // jdbcTemplate객체를 이용하여 DB의 member 테이블에 select
        String sql = "Select count(*) from member where id = ?";
        Long count = jdbcTemplate.queryForObject(sql, Long.class, id);

        return count;
    }

    @Override
    public Long find(Member member) {
        // jdbcTemplate객체를 이용하여 DB의 member 테이블에 select
        String sql = "Select count(*) from member where id = ? and pwd = ?";
        Object[] param = {  member.getId(), member.getPwd() };
        Long count = jdbcTemplate.queryForObject(sql, Long.class, param);

        return count;
    }

    @Override
    public int save(Member member) {
        // jdbcTemplate객체를 이용하여 DB의 member 테이블에 insert
        String sql = "INSERT INTO member (id, pwd, name, phone, email, mdate) VALUES (?, ?, ?, ?, ?, now())";  // 보안 이슈로 prepareStatement
        Object[] param = {  member.getId(),
                            member.getPwd(),
                            member.getName(),
                            member.getPhone(),
                            member.getEmail()
                          };

        int rows = jdbcTemplate.update(sql, param);
        System.out.println("rows ==> " + rows);
        return rows;
    }
}
