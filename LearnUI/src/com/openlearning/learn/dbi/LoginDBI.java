package com.openlearning.learn.dbi;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.openlearning.learn.bean.LoginUserBean;
import com.openlearning.learn.connect.DataBaseMaster;
import com.openlearning.learn.utils.UtilsFactory;

public class LoginDBI {
	
	
	/**
	 * user to login, to validate user credentials, to add 
	 * 
	 * @param con
	 * @param strUsername
	 * @param strPassword
	 * @throws Exception
	 */
	public LoginUserBean loginUser(Connection con, String strUsername, String strPassword) throws Exception {
		StringBuilder sbQuery = new StringBuilder();
		// TODO: `LoginUserBean`, to return 
		
		// TODO: PreparedStatemet, ResultSet to add 
		PreparedStatement pstmt = null;
		ResultSet rst = null;
		
		LoginUserBean loginUserBean = null;
		
		try {
			//System.out.println("LoginDBI <> loginUser");
			
			/* TODO: to get data from DATABASE of given `userName`, user credentials to validate, 
			 *   Note: in query `WHERE` `userName` to add, `rst.prevoius` to add, of query returns more than ONE ROW, to throw exception 
			 */
			
			sbQuery	.append("SELECT * ")
					.append("FROM user_master ")
					.append("WHERE user_name = ? ");
					/*// below adds, to checking, of more than one ROW returns, to throw Exception 
					.append("  OR 1 = 1 ")
					.append("ORDER BY user_id ");*/
			
			// TODO: below to cheking 
			
			//System.out.println("sbQuery: "+sbQuery.toString());
			
			pstmt = con.prepareStatement(sbQuery.toString(), ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
			pstmt.setString(1, strUsername);
			rst = pstmt.executeQuery();
			
			//System.out.println("rst.previous(): "+rst.previous());
			
			/* from link adds; moves cursor to last ROW, below `rst.previous()` last's before ROW returns, to return last ROW, so commented 
			rst.last();*/
			
			//if ( rst.previous() ) {	// commented, returns `false`, of first
			// below from `Appedo-UI-Credentials-Service` adds 
			if ( rst.next() ) {
				// validation to add, if query returns more than one ROW 
				if ( rst.next() ) {
					/* commented chceking tried 
					System.out.println("rst.next() + 1 <> 1111111");
					System.out.println("user_id: "+rst.getInt("user_id")+" <> user_name: "+rst.getString("user_name"));*/
					
					// to throw exception, of multiple ROWS returns 
					throw new Exception("INVALID_USER");
				} else {
					// to move cursor before ROW; as above `rst.next()` 2 times calls, 
					rst.previous();
					
					/* commented chceking tried 
					System.out.println("rst.next() <> 22222222");
					System.out.println("user_id: "+rst.getInt("user_id")+" <> user_name: "+rst.getString("user_name"));*/
					
					if ( ! strPassword.equals(rst.getString("password")) ) {
						//System.out.println("password not matches <> 33333333");
						// to throw exception, of password not matches 
						throw new Exception("PASSWORD_NOT_MATCHES");
					}
					//System.out.println("LoginUserBean value sets <> 44444444");
					
					// to sets in LoginUserBean 
					loginUserBean = new LoginUserBean();
					loginUserBean.setUserId(rst.getInt("user_id"));
					loginUserBean.setUserName(rst.getString("user_name"));
					loginUserBean.setFullName(rst.getString("full_name"));
					loginUserBean.setCreatedBy(rst.getInt("created_by"));
					loginUserBean.setCreatedOn(rst.getTimestamp("created_on"));
					//System.out.println("modified_by: "+rst.getInt("modified_by"));
					loginUserBean.setModifiedBy(rst.getInt("modified_by"));
					loginUserBean.setModifiedOn(rst.getTimestamp("modified_on"));
				}
			}
			
			if ( loginUserBean == null ) {
				//System.out.println("user not exists <> 555555");
				// to throw exception, of user not exists 
				throw new Exception("USER_NOT_EXISTS");
			}
			
		} catch (Exception e) {
			throw e;
		} finally {
			// TODO: to close ResultSet, PreparedStatemet
			DataBaseMaster.close(rst);
			rst = null;
			DataBaseMaster.close(pstmt);
			pstmt = null;
			
			//strQuery = null;
			UtilsFactory.clearCollectionHieracy(sbQuery);
			sbQuery = null;
		}
		
		return loginUserBean;
	}
}
