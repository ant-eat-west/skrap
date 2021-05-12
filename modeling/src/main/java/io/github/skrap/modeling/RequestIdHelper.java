package io.github.skrap.modeling;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * web工具类，包含获取ip，文件服务器地址，构建http参数等功能
 *
 * @author MeiKefu
 */
@Slf4j
public class RequestIdHelper {

	public static final String HEADER_REQUEST_ID = "X-DACP-RequestId";

	public static final ThreadLocal<String> REQUEST_ID = new ThreadLocal();

	public static String generatorRequestId(HttpServletRequest request){
		String requestId = getHeaderRequestId(request);
		if(StringUtils.isBlank(requestId)){
//			requestId = SimpleKeyHelper.genUuid(32);
			requestId = "111";
		}
		REQUEST_ID.set(requestId);
		return requestId;
	}

	/*public static boolean isInternalFeign(HttpServletRequest request){
		String requestId = getHeaderRequestId(request);
		if(StringUtils.isBlank(requestId)){
			return false;
		}else{
			PostTokenAuthHelper postTokenAuthHelper = BeanHelper.getBean(PostTokenAuthHelper.class);
			return postTokenAuthHelper.verifyToken(requestId);
		}
	}*/

	public static String getHeaderRequestId(HttpServletRequest request){
		return request.getHeader(HEADER_REQUEST_ID);
	}

}
