package io.github.skrap.modeling;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * failure：失败是命令操作失败code为200
 * error： 为系统异常报错 ，code为5XX
 * @author meikefu
 * @date 2020-3-18
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Response<T> implements Serializable {
    private String requestId;
    private String code="-1";
    private T data;
    private boolean success=false;
    private String message;//业务异常描述
    private String devMsg;//调试异常信息

    public static Response error(String errMessage,String devMsg){
        return new Response(RequestIdHelper.REQUEST_ID.get(),"500",null,false,errMessage,devMsg);
    }

    public static Response error(String errCode, String errMessage,String devMsg){
        return new Response(RequestIdHelper.REQUEST_ID.get(),errCode,null,false,errMessage,devMsg);
    }

    public static Response failure(String message){
        return new Response(RequestIdHelper.REQUEST_ID.get(),"200",null,false,message,null);
    }

    public static <T> Response<T> failure(String message, T data){
        return new Response<>(RequestIdHelper.REQUEST_ID.get(),"200",data,false,message,null);
    }

    public static Response ok(){
        return new Response(RequestIdHelper.REQUEST_ID.get(),"200",null,true,"调用成功",null);
    }

    public static Response ok(String message){
        return new Response(RequestIdHelper.REQUEST_ID.get(),"200",null,true,message,null);
    }

    public static <T> Response<T> ok(T data){
        return new Response<>(RequestIdHelper.REQUEST_ID.get(),"200",data,true,null,null);
    }

    public static <T> Response<T> ok(String message, T data){
        return new Response<>(RequestIdHelper.REQUEST_ID.get(),"200",data,true,message,null);
    }
}
