package com.springboot.shoppy_fullstack_app.repositoty;

import com.springboot.shoppy_fullstack_app.dto.ProductDto;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailinfoDto;
import com.springboot.shoppy_fullstack_app.dto.ProductQnaDto;
import com.springboot.shoppy_fullstack_app.dto.ProductReturnDto;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class JdbcTemplateProductRepository implements ProductRepository{

    private JdbcTemplate jdbcTemplate;

    // 생성자
    // @Autowired의 경우 임의로 생성한 생성자에만 붙임
    public JdbcTemplateProductRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);   // 커넥션 생성
    };

    @Override
    public ProductReturnDto findReturn() {
        String sql = "select rid, title, description, list from product_return";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(ProductReturnDto.class));
    }

    @Override
    public List<ProductQnaDto> findQna(int pid) {
        String sql = """
                    select 
                        qid, 
                        title, 
                        content, 
                        is_complete as isComplete, 
                        is_lock as isLock, 
                        id, 
                        pid, 
                        cdate 
                    from product_qna where pid = ?
                """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ProductQnaDto.class), pid);
    }

    @Override
    public ProductDetailinfoDto findProductDetailinfo(int pid) {
        String sql = "select did, title_en as titleEn, title_ko as titleKo, pid, list"
                    + " from product_detailinfo"
                    + " where pid = ?";
        ProductDetailinfoDto productInfo = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(ProductDetailinfoDto.class), pid);
        return productInfo;
    }

    @Override
    public List<ProductDto> findAll() {
        String sql = "select pid, name, price, info, rate, trim(image) as image, imgList from product";
        List<ProductDto> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ProductDto.class));
        return list;
    }

    @Override
    public ProductDto findByPid(int pid) {
        String sql = "select pid, name, price, info, rate, trim(image) as image, imgList from product where pid = ?";
        ProductDto product = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(ProductDto.class), pid);
        return product;
    }
}
