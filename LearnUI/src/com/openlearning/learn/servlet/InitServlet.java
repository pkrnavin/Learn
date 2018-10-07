package com.openlearning.learn.servlet;

import java.sql.Connection;
import java.sql.Timestamp;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import com.openlearning.learn.connect.DataBaseMaster;
import com.openlearning.learn.utils.Constants;

/**
 * Servlet implementation class InitServlet
 */
//@WebServlet("/InitServlet")
public class InitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public static String realPath = null;
	
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public InitServlet() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
		
		System.out.println("InitServlet <> init() <> 1111111");
		ServletContext context = null;
		
		Connection con = null;
		
		Timestamp tsDBNow = null;
		
		try {
			context = getServletContext();
			
			realPath = context.getRealPath("//");
			System.out.println("realPath: "+realPath);
			
			// gets Constant properties, file full path 
			Constants.CONSTANTS_PATH = getConstantsPath(context);
			//System.out.println("CONSTANTS_PATH: "+Constants.CONSTANTS_PATH);
			
			// loads Constants Properties
			Constants.loadConstantsProperties(Constants.CONSTANTS_PATH);
			
			// loads computer folder's config properties values; Note: the file path, set in above method 
			Constants.loadLearnUIConfigProperties(Constants.LEARNUI_CONFIG_FILE_FULLPATH);
			
			
			// TODO: to load DATABASE connection values from properties file
			
			/* Note:
			 * - Database properties values change in the file, to load to set the change value, Tomcat to restart 
			 * - in `./reloadConfigProperties`, of load Database properties, not to adds, 
			 *     as problem occurs thinks, of more users accessing the application, onTheFly reload database values, data problem occurs, thinks 
			 *     so to restart Tomcat the database properties values, to set, 
			 */
			
			// to load Database properties values; 
			DataBaseMaster.loadDatabaseProperties(Constants.LEARNUI_CONFIG_FILE_FULLPATH);
			
			con = DataBaseMaster.getConnection();
			
			// below adds checking; get data from database 
			tsDBNow = DataBaseMaster.getNow(con);
			
			System.out.println("InitServlet <> init() <> tsDBNow: "+tsDBNow);
		} catch(Exception e) {
			System.out.println("Exception in InitServlet: "+e.getMessage());
			e.printStackTrace();
		} finally {
			DataBaseMaster.close(con);
			con = null;
		}
	}
	
	/**
	 * get constants properties, file full path 
	 * 
	 * @param context
	 * @return
	 */
	public static String getConstantsPath(ServletContext context) {
		return realPath + context.getInitParameter("CONSTANTS_PROPERTIES_FILE_PATH");	// commented `+ "-";` adds, exception message prints to checking, tried
	}
}
