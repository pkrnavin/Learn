package com.openlearning.learn.controller;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;	// commented, to include respective `jar`, thinks 
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.openlearning.learn.bean.LoginUserBean;
import com.openlearning.learn.servlet.InitServlet;
import com.openlearning.learn.utils.Constants;
import com.openlearning.learn.utils.UtilsFactory;

import net.sf.json.JSONObject;

/**
 * Servlet implementation class LoginController
 */
//@WebServlet("/LoginController")
public class Controller extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public Controller() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/* commented 
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());*/
		doAction(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/* commented 
		// TODO Auto-generated method stub
		doGet(request, response);*/
		doAction(request, response);
	}
	
	/**
	 * Get the request and do the needful.
	 * Call respective model 
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");

		HttpSession session = request.getSession();
		
		String strAction = request.getServletPath();
		
		ServletContext context = getServletContext();
		
		//System.out.println("strAction: "+strAction);
		
		// to reload config properties, of constants in project folder, computer's folder 
		if ( strAction.equals("/reloadConfigProperties") ) {
			String strResponse = "<STRONG>LearnUI</STRONG>: ";
			
			try {
				//System.out.println("Controller <> /reloadConfigProperties <> 111111");
				
				// gets Constant properties, file full path 
				Constants.CONSTANTS_PATH = InitServlet.getConstantsPath(context);
				//System.out.println("CONSTANTS_PATH: "+Constants.CONSTANTS_PATH);
				
				// loads Constants Properties
				Constants.loadConstantsProperties(Constants.CONSTANTS_PATH);
				
				// loads computer folder's config properties values 
				Constants.loadLearnUIConfigProperties(Constants.LEARNUI_CONFIG_FILE_FULLPATH);
				
				// Note: `Database` properties reload, not adds, as problem occurs, thinks; comment adds in `InitServlet` 
				
				strResponse += "Constants, LearnUI config properties loaded";
			} catch(Exception e) {
				System.out.println("Exception in /reloadConfigProperties: "+e.getMessage());
				e.printStackTrace();
				strResponse += "<STRONG style=\"color: red;\">Exception occured load config properties</STRONG>";
			} finally {
				response.getWriter().write(strResponse);
			}
		} 
		else if ( strAction.equals("/getLoginUserDetails") ) {	// gets login user details 
			LoginUserBean loginUserBean = null;
			
			JSONObject joRtn = null;
			
			/* commented, // below adds, to checking to try `UtilsFactory.getJSONSuccessReturn(<JSONArray>)` S
			JSONArray jaLoginUsers = null;*/
			JSONObject joLoginUser = null;
			
			try {
				//System.out.println("/getLoginUserDetails <> 111111");
				//System.out.println("session: "+session);
				
				// to throw, exception of loginUser session not exists 
				UtilsFactory.throwExceptionIfSessionExpired(session);
				
				loginUserBean = (LoginUserBean) session.getAttribute("loginUser");
				//loginUserBean = null;	// adds, to catch `Exception` to call, to cheking tries, 
				joLoginUser = loginUserBean.toJSON();
				//System.out.println("loginUserBean: "+loginUserBean);
				
				joRtn = UtilsFactory.getJSONSuccessReturn(joLoginUser);
				//System.out.println("/getLoginUserDetails <> toJSON <> joRtn: "+joRtn);
				
				/* commented, below adds, to checking to try `UtilsFactory.getJSONSuccessReturn(<JSONObject || JSONArray>)` 
				// below to add, of `data` in `message` key to set, to add 
				joRtn = UtilsFactory.getJSONSuccessReturn(loginUserBean.toJSONString());
				System.out.println("/getLoginUserDetails <> toJSONString <> joRtn: "+joRtn);
				
				// below adds to checking 
				jaLoginUsers = new JSONArray();
				jaLoginUsers.add(joLoginUser);
				jaLoginUsers.add(joLoginUser);
				jaLoginUsers.add(joLoginUser);
				System.out.println("/getLoginUserDetails <> JSONArray data: "+UtilsFactory.getJSONSuccessReturn(jaLoginUsers));
				System.out.println("/getLoginUserDetails <> JSONArray string data: "+UtilsFactory.getJSONSuccessReturn(jaLoginUsers.toString()));*/
				
			} catch(ServletException se) {
				System.out.println("ServletException in /getLoginUserDetails: "+se.getMessage());
				se.printStackTrace();
				// Note: below throws adds, tries; as of `Session Expired` error, to transition to `#/login` screen to add 
				throw se;
			} catch(Exception e) {
				System.out.println("Exception in /getLoginUserDetails: "+e.getMessage());
				e.printStackTrace();
				joRtn = UtilsFactory.getJSONFailureReturn("Unable to getLoginUserDetails. ");
			} finally {
				// below adds, of session not exists, to throw exception `500`, below `null` adds, tried 
				if ( joRtn != null ) {
					response.getWriter().write(joRtn.toString());
				}
			}
		} else if ( strAction.equals("/isSessionExists") ) {	// to cehck user session exists
			JSONObject joRtn = null;
			
			try {
				//System.out.println("/isSessionExists <> 1111111");
				//System.out.println("session: "+session);
				// to throw, exception of loginUser session not exists 
				UtilsFactory.throwExceptionIfSessionExpired(session);
				
				// below exists 
				//System.out.println("/isSessionExists <> 222222");
				joRtn = UtilsFactory.getJSONSuccessReturn("Valid session");
			} catch(Exception e) {
				System.out.println("Exception in /isSessionExists: "+e.getMessage());
				e.printStackTrace();
				joRtn = UtilsFactory.getJSONFailureReturn("Session not exists");
			} finally {
				//System.out.println("/isSessionExists <> joRtn: "+joRtn);
				response.getWriter().write(joRtn.toString());
			}
		}
	}
}
