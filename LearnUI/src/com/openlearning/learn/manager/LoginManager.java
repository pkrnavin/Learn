package com.openlearning.learn.manager;

import java.sql.Connection;

import com.openlearning.learn.bean.LoginUserBean;
import com.openlearning.learn.dbi.LoginDBI;

public class LoginManager {

	/**
	 * user to login, to validate user credentials, to add 
	 * 
	 * @param con
	 * @param strUsername
	 * @param strPassword
	 * @throws Exception
	 */
	public LoginUserBean loginUser(Connection con, String strUsername, String strPassword) throws Exception {
		LoginDBI loginDBI = null;
		// TODO: `LoginUserBean`, to return 
		
		LoginUserBean loginUserBean = null;
		
		try {
			loginDBI = new LoginDBI();
			//System.out.println("LoginManager <> loginUser");
			
			// user login validation to add 
			loginUserBean = loginDBI.loginUser(con, strUsername, strPassword);
			
			loginDBI = null;
		} catch (Exception e) {
			throw e;
		}
		
		return loginUserBean;
	}
}
