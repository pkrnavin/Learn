 package com.openlearning.learn.controller;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;	// commented, to include respective `jar`, thinks 
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.openlearning.learn.bean.LoginUserBean;
import com.openlearning.learn.connect.DataBaseMaster;
import com.openlearning.learn.manager.LoginManager;
import com.openlearning.learn.utils.UtilsFactory;

import net.sf.json.JSONObject;

/**
 * Servlet implementation class LoginController
 */
//@WebServlet("/LoginController")
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public LoginController() {
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
	
	
	protected void doAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO: `./loginSession` to adds, to login
		
		String strAction = request.getServletPath();
		
		// from `Appedo` adds 
		HttpSession session = request.getSession(false);
		//System.out.println("LoginController <> 11111 <> session: "+session);
		
		/* User login request 
		 * - (1) `Angular` login from ajax call, response message return 
		 * - (2) form submit, redirect page 
		 */
		if ( strAction.equals("/loginSession") ) {
			//System.out.println("txtUsername: "+request.getParameter("txtUsername"));
			//System.out.println("txtPassword: "+request.getParameter("txtPassword"));
			
			Connection con = null;
			
			String strUsername = "", strPassword = "", strJoLoginUser = "", strRespQueryString = "", strFromLibraryCode = "";
			
			LoginManager loginManager = null;
			
			LoginUserBean loginUserBean = null, loginUserBeanFromJSON = null;
			
			JSONObject joLoginUser = null, joResp = null;
			
			try {
				loginManager = new LoginManager();
				
				// TODO: DATABASE `Connection` to create `con = <DATABASEMASTER.getConnection()>`
				con = DataBaseMaster.getConnection();
				
				strUsername = request.getParameter("txtUsername");
				strPassword = request.getParameter("txtPassword");
				strFromLibraryCode = request.getParameter("fromLibCode");
				
				/*System.out.println("LoginController <> loginSession");
				System.out.println("strUsername: "+strUsername);
				System.out.println("strPassword: "+strPassword);
				System.out.println("strFromLibrary: "+strFromLibraryCode);*/
				
				// user to login, to validate user credentials 
				loginUserBean = loginManager.loginUser(con, strUsername, strPassword);
				//System.out.println("loginUserBean: "+loginUserBean);
				
				// creates session thinks 
				session = request.getSession(true);
				//System.out.println("/loginSession <> 2222222 <> session: "+session);
				
				// user logged in details, to set session 
				session.setAttribute("loginUser", loginUserBean);
				
				//System.out.println("LoginController <> loginUserBean: "+loginUserBean);
				
				/* commented, below checking, tried of `LoginUserBean` 
				System.out.println("----------- LoginUserBean toJSON, fromJSON, toString ------------");
				// below adds to checking, loginUserBean `toJSON` 
				joLoginUser = loginUserBean.toJSON();
				strJoLoginUser = loginUserBean.toJSONString();
				System.out.println("joLoginUser: "+joLoginUser);
				System.out.println("strJoLoginUser: "+strJoLoginUser);
				
				// below adds, loginUserBean `fromJSON`, values to set in Bean, to checking tries 
				joLoginUser.put("userName", joLoginUser.getString("userName")+"_FROMJSON");
				loginUserBeanFromJSON = new LoginUserBean();
				loginUserBeanFromJSON.fromJSON(joLoginUser);
				System.out.println("loginUserBeanFromJSON: "+loginUserBeanFromJSON);
				System.out.println("loginUserBeanFromJSON.getUserName(): "+loginUserBeanFromJSON.getUserName());*/
				
				// TODO: loginUserBean to return, from above method, to set in Bean 
				
				// TODO: loginUserBean to set in session 
				
				// TODO: loginUserBean fromJSON, toJSON, toString to cheking 
				
				// TODO: redirect to add 
				
				//strRespQueryString = "_smsg=USER_LOGGED_IN";
				
				
				joResp = UtilsFactory.getJSONSuccessReturn("LOGIN_SUCCESS");
				
				loginManager = null;
			} catch(Exception e) {
				System.out.println("Exception in /loginSession: "+e.getMessage());
				e.printStackTrace();
				/* Note: loginUser validation, known exception of `InvalidUser`, `PasswordNotMatches`, `UserNotExists`, java exception returns, 
				 *   of known errorCode to show respective message in UI, else `Problem with services` to show to add 
				 */
				strRespQueryString = "_err="+e.getMessage();
				joResp = UtilsFactory.getJSONFailureReturn(e.getMessage());
			} finally {
				// TODO: to close `Connection` 
				DataBaseMaster.close(con);
				con = null;
				
				strUsername = null;
				strPassword = null;
				
				loginManager = null;
				
				/* commented, response redirect html to add 
				response.sendRedirect("./view/html/#!/loginResponse?"+strRespQueryString);*/
				
				//System.out.println("Login <> 111222333");
				if ( strFromLibraryCode.equals("ANGULAR") ) {	// (1) 
					response.getWriter().write(joResp.toString());
				} else {	// (2) 
					response.sendRedirect("./loginLogoutResponseRedirect.html?fromLibCode="+strFromLibraryCode+"&"+strRespQueryString);	
				}
			}
		} else if( strAction.equals("/logoutSession") ) {
			// to logout user 
			
			String strRedirectURI = "", strFromLibraryCode = "", strRespQueryString = "";
			
			JSONObject joResp = null;
			
			try {
				//System.out.println("/logoutSession <> 111111");

				strFromLibraryCode = request.getParameter("fromLibCode");
				
				session = request.getSession(false);
				//System.out.println("/logoutSession <> session: "+session);
				if ( session == null || session.getAttribute("loginUser") == null ) {
					//System.out.println("/logoutSession <> 2222222 <> user not login");
					
					/* commented, response redirect html to add 
					strRedirectURI = "#!/login";*/
					
					strRespQueryString = "_err=SESSION_EXPIRED";
					
					joResp = UtilsFactory.getJSONSuccessReturn("SESSION_EXPIRED");	// `StudentApp`, success return redirect to `/login` page, 
				} else {
					//System.out.println("/logoutSession <> 3333 <> logout");
					
					// removes user's session
					session.removeAttribute("loginUser");
					session.invalidate();
					
					// Note: after logout, login sysout `session` value changes, thinks 
					//System.out.println("/logoutSession <> after session invalidate <> session: "+session);
					
					/* commented, response redirect html to add 
					strRedirectURI = "#!/loginResponse?_smsg=LOGOUT_SUCCESS";*/
					
					strRespQueryString = "_smsg=LOGOUT_SUCCESS";
					
					joResp = UtilsFactory.getJSONSuccessReturn("LOGOUT_SUCCESS");
				}
			} catch (Exception e) {
				System.out.println("Exception in /logoutSession: "+e.getMessage());
				e.printStackTrace();
				joResp = UtilsFactory.getJSONFailureReturn(e.getMessage());
			} finally {
				//System.out.println("strRedirectURI: "+strRedirectURI);
				
				/* commented, response redirect html to add 
				//response.sendRedirect("./view/html/"+strRedirectURI);	// commented, to adds inside folder
				response.sendRedirect("AngularJS/view/html/"+strRedirectURI);*/
				
				if ( strFromLibraryCode.equals("ANGULAR") ) {
					response.getWriter().write(joResp.toString());
				} else {
					response.sendRedirect("./loginLogoutResponseRedirect.html?fromLibCode="+strFromLibraryCode+"&"+strRespQueryString);
				}
				
				strAction = null;
				strRedirectURI = null;
			}
		}
	}
}
