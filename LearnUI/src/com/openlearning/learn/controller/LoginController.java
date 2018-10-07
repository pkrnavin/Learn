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
		
		// User login request 
		if ( strAction.equals("/loginSession") ) {
			//System.out.println("txtUsername: "+request.getParameter("txtUsername"));
			//System.out.println("txtPassword: "+request.getParameter("txtPassword"));
			
			Connection con = null;
			
			String strUsername = "", strPassword = "", strJoLoginUser = "", strRespQueryString = "";
			
			LoginManager loginManager = null;
			
			LoginUserBean loginUserBean = null, loginUserBeanFromJSON = null;
			
			JSONObject joLoginUser = null;
			
			try {
				loginManager = new LoginManager();
				
				// TODO: DATABASE `Connection` to create `con = <DATABASEMASTER.getConnection()>`
				con = DataBaseMaster.getConnection();
				
				strUsername = request.getParameter("txtUsername");
				strPassword = request.getParameter("txtPassword");
				
				//System.out.println("LoginController <> loginSession");
				
				// user to login, to validate user credentials 
				loginUserBean = loginManager.loginUser(con, strUsername, strPassword);
				//System.out.println("loginUserBean: "+loginUserBean);
				
				// creates session thinks 
				session = request.getSession(true);
				//System.out.println("/loginSession <> 2222222 <> session: "+session);
				
				// user logged in details, to set session 
				session.setAttribute("loginUser", loginUserBean);
				
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
				
				loginManager = null;
			} catch(Exception e) {
				System.out.println("Exception in /loginSession: "+e.getMessage());
				e.printStackTrace();
				/* Note: loginUser validation, known exception of `InvalidUser`, `PasswordNotMatches`, `UserNotExists`, java exception returns, 
				 *   of known errorCode to show respective message in UI, else `Problem with services` to show to add 
				 */
				strRespQueryString = "_err="+e.getMessage();
			} finally {
				// TODO: to close `Connection` 
				DataBaseMaster.close(con);
				con = null;
				
				strUsername = null;
				strPassword = null;
				
				loginManager = null;
				
				response.sendRedirect("./view/html/#!/loginResponse?"+strRespQueryString);
			}
		} else if( strAction.equals("/logoutSession") ) {
			// to logout user 
			
			String strRedirectURI = "";
			
			try {
				//System.out.println("/logoutSession <> 111111");
				
				session = request.getSession(false);
				//System.out.println("/logoutSession <> session: "+session);
				if ( session == null || session.getAttribute("loginUser") == null ) {
					//System.out.println("/logoutSession <> 2222222 <> user not login");
					strRedirectURI = "#!/login";
				} else {
					//System.out.println("/logoutSession <> 3333 <> logout");
					
					// removes user's session
					session.removeAttribute("loginUser");
					session.invalidate();
					
					// Note: after logout, login sysout `session` value changes, thinks 
					//System.out.println("/logoutSession <> after session invalidate <> session: "+session);
					
					strRedirectURI = "#!/loginResponse?_smsg=LOGOUT_SUCCESS";
				}
			} catch (Exception e) {
				System.out.println("Exception in /logoutSession: "+e.getMessage());
				e.printStackTrace();
			} finally {
				//System.out.println("strRedirectURI: "+strRedirectURI);
				response.sendRedirect("./view/html/"+strRedirectURI);
				
				strAction = null;
				strRedirectURI = null;
			}
		}
	}
}
