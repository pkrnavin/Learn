package com.openlearning.learn.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
//import javax.servlet.annotation.WebFilter;

/**
 * Servlet Filter implementation class CORSFilter
 */
//@WebFilter("/CORSFilter")
public class CORSFilter implements Filter {

    /**
     * Default constructor. 
     */
    public CORSFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * from Angular ajax call, to accept request, CORS adds from below links, 
	 * https://howtodoinjava.com/servlets/java-cors-filter-example/
	 * https://stackoverflow.com/questions/16351849/origin-is-not-allowed-by-access-control-allow-origin-how-to-enable-cors-using
	 * 
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		// place your code here
		
		//System.out.println("CORSFilter <> 11111");
		
		/* commented, not working */
		if(response instanceof HttpServletResponse){
			//System.out.println("CORSFilter <> 2222 <> response instanceof HttpServletResponse");
			HttpServletResponse alteredResponse = ((HttpServletResponse)response);
			addCorsHeader(alteredResponse);
		}
		
		chain.doFilter(request, response);
		
		
		/* commented, not working 
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        System.out.println("CORSFilter HTTP Request: " + request.getMethod());
 		
        // Authorize (allow) all domains to consume the content
        ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", "*");
        ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, PUT, POST");
 
        HttpServletResponse resp = (HttpServletResponse) servletResponse;
 
        // For HTTP OPTIONS verb/method reply with ACCEPTED status code -- per CORS handshake
        if (request.getMethod().equals("OPTIONS")) {
            resp.setStatus(HttpServletResponse.SC_ACCEPTED);
            return;
        }
 
        // pass the request along the filter chain
        chain.doFilter(request, servletResponse);*/

		/* commented, not working, request parameter not gets 
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, HEAD, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        
        chain.doFilter(servletRequest, servletResponse);*/
	}

	private void addCorsHeader(HttpServletResponse response){
        //TODO: externalize the Allow-Origin
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
        //response.addHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
        //response.addHeader("Access-Control-Allow-Headers", "Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers");
        //response.addHeader("Access-Control-Allow-Headers", "x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN");
        //response.addHeader("Access-Control-Allow-Headers", "Content-Type,X-Requested-With,Accept,Authorization,Origin,Access-Control-Request-Method,Access-Control-Request-Headers");
        response.addHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        response.addHeader("Access-Control-Max-Age", "1728000");
    }
	
	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
