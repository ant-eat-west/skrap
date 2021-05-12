package io.github.skrap.modeling;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.Predicate;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 抽象RestController
 *
 * @author MeiKefu
 * @date 2020-4-12
 */
@NoRepositoryBean
@Slf4j
public abstract class AbstractRestController<R extends JpaRepositoryImplementation,D> {

    protected final R repository;
    protected final String prefixEventName;

    public AbstractRestController(R repository,String prefixEventName) {
        this.repository = repository;
        this.prefixEventName = prefixEventName;
    }

    @ApiOperation(value="通过{id}获取对象",notes="通用id查询对象", httpMethod = "GET")
    @ApiParam(name="id", value ="编号", required = true)
    @GetMapping(value="/{id}")
    public D findById(@PathVariable String id) {
        return (D) repository.findById(id);
    }

    @ApiOperation(value="通过{ids}获取对象列表,逗号拼接",notes="通用id查询对象", httpMethod = "GET")
    @ApiParam(name="ids", value ="编号,逗号拼接", required = true)
    @GetMapping(value="/list/{ids}")
    public List<D> findByIds(@PathVariable String[] ids)throws Exception {
        return repository.findAllById(Arrays.asList(ids));
    }

    @ApiOperation(value="获取所有对象",notes="获取所有对象，无需参数", httpMethod = "GET")
    @GetMapping(value="/list")
    public List<D> list() {
        return repository.findAll();
    }

    @ApiOperation(value="通过参数查询对象",notes="通过参数查询对象", httpMethod ="GET")
    @ApiImplicitParam(name="props", value ="参数键值对", required = true, dataType="Map", paramType="query")
    @GetMapping(value="/find")
    public List<D> find(@RequestParam Map<String,Object> props) {
        return repository.findAll(getSpecification(props));
    }

    @ApiOperation(value="通过参数分页查询对象",notes="通过参数分页查询对象", httpMethod ="GET")
    @ApiImplicitParams({
            @ApiImplicitParam(name="props", value ="参数键值对", required = true, dataType="Map", paramType="query"),
            @ApiImplicitParam(name="pageNum", value ="页码", required = true, dataType="int", paramType="query"),
            @ApiImplicitParam(name="pageSize", value ="分页数", required = true, dataType="int", paramType="query")
    })
    @GetMapping(value="/search")
    public Page<D> search(
            HttpServletRequest request,
            @RequestParam(value = "pageNum", defaultValue = "0") final Integer pageNum,
            @RequestParam(value = "pageSize", defaultValue = "10") final Integer pageSize) {
        final Map<String,Object> props = new HashMap<>();
        request.getParameterMap().forEach(
                (k,v) -> {
                    if(!k.equals("pageNum") && !k.equals("pageSize")){
                        props.put(k, v[0]);
                    }
                }
        );

        Pageable pageable = PageRequest.of(pageNum, pageSize);
        try {
            Page<D> users =  repository.findAll( getSpecification(props), pageable);
            return users;
        } catch (Exception e) {
            log.error("分页查询出错",e.getMessage(),e);
        }
        return Page.empty();
    }


    @ApiOperation(value="保存对象信息",notes="保存对象信息", httpMethod = "POST")
    @ApiParam(name="domain", value ="对象信息", required = true)
    @PostMapping(value="/create")
    public Response<D> create(@RequestBody D domain) {
        Object obj = repository.save(domain);
        sendMesage(prefixEventName+":create",domain);
        return Response.ok("保存成功",(D) obj);
    }

    @ApiOperation(value="更新对象信息",notes="更新对象信息", httpMethod = "POST")
    @ApiParam(name="domain", value ="对象信息", required = true)
    @PostMapping(value="/update")
    public Response<D> update(@RequestBody D domain) {
        repository.save(domain);
        sendMesage(prefixEventName+":update",domain);
        return Response.ok("更新成功",domain);
    }

    @ApiOperation(value="删除对象",notes="删除对象，参数为对象编码", httpMethod = "POST")
    @ApiParam(name="id", value ="对象编码", required = true)
    @PostMapping(value="/delete/{id}")
    public Response delete(@PathVariable("id") String id) {
        repository.deleteById(id);
        sendMesage(prefixEventName+":delete",id);
        return Response.ok("删除成功");
    }

    @ApiOperation(value="批量保存对象信息",notes="批量保存对象信息", httpMethod = "POST")
    @ApiParam(name="iterable", value ="对象信息", required = true)
    @PostMapping(value="/createBatch")
    public Response<List<D>> createBatch(@RequestBody List<D> iterable) {
        List list = repository.saveAll(iterable);
        sendMesage(prefixEventName+":create:batch","ok");
        return Response.ok("批量保存成功",list);
    }

    @ApiOperation(value="批量更新对象信息",notes="批量更新对象信息", httpMethod = "POST")
    @ApiParam(name="iterable", value ="对象信息", required = true)
    @PostMapping(value="/updateBatch")
    public Response<List<D>> updateBatch(@RequestBody List<D> iterable) {
        List list = repository.saveAll(iterable);
        sendMesage(prefixEventName+":update:batch","ok");
        return Response.ok("批量更新成功",list);
    }

    @ApiOperation(value="批量删除对象信息",notes="批量更新对象信息", httpMethod = "POST")
    @ApiParam(name="iterable", value ="对象信息", required = true)
    @PostMapping(value="/deleteBatch")
    public Response deleteBatch(@RequestBody List<D> iterable) {
        repository.deleteAll(iterable);
        sendMesage(prefixEventName+":delete:batch","ok");
        return Response.ok("批量删除成功");
    }

    private Specification getSpecification(Map<String,Object> props){
        return (root, query, cb) -> {
            final List<Predicate> predicates = new ArrayList<>();
            props.forEach((key,value)->{
                if(value instanceof String){
                    predicates.add(cb.like(cb.upper(root.get(key)).as(String.class),"%" + value.toString().toUpperCase() + "%"));
                }else if(value instanceof Integer){
                    predicates.add(cb.equal(root.get(key).as(String.class),(Integer)value));
                }else if(value instanceof List){
                    //predicates.add(cb.in(root.get(key).as(String.class),));
                }else{
                    log.warn("不支持数据类型{},{}",value.getClass());
                }
            });
            query.where( cb.and(predicates.toArray(new Predicate[0])));
            return query.getRestriction();
        };
    }


    protected void sendMesage(String eventName, Object eventData){
//        eventSource.output().send(MessageBuilder.withPayload(eventData).setHeader(EVENT_NAME_KEY,eventName).build());
    }
}
