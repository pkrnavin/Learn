package com.openlearning.learn.connect;

import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.Properties;

import com.openlearning.learn.utils.UtilsFactory;

public class DataBaseMaster {
	
	// DATABASE to connect, values to set from properties file 
	private static String DRIVER = null;
	private static String PROTOCAL = null;
	private static String DBHOST = null;
	private static String LOCALLISTERNPORT = null;
	private static String DBNAME = null;
	private static String DBUSERNAME = null;
	private static String DBPASSWORD = null;
	private static String AUTOCOMMIT = null;
	private static String MAXACTIVE = null;
	private static String MAXWAIT = null;
	
	// DATABASE connect URL from above values form, in below variable, to sets 
	private static String DATABASE_URL = null;
	
	
	
	/**
	 * to load load database properties values 
	 * 
	 * @param strLearnUIConfigPropFileFullPath
	 * @throws Exception
	 */
	public static void loadDatabaseProperties(String strLearnUIConfigPropFileFullPath) throws Exception {
		Properties prop = null;
		
		InputStream is = null;
		
		try {
			//System.out.println("DataBaseMaster <> loadDatabaseProperties");
			
			prop = new Properties();
			is = new FileInputStream(strLearnUIConfigPropFileFullPath);
			prop.load(is);
			
			// sets values 
			DRIVER = prop.getProperty("DRIVER");
			PROTOCAL = prop.getProperty("PROTOCAL");
			DBHOST = prop.getProperty("DBHOST");
			LOCALLISTERNPORT = prop.getProperty("LOCALLISTERNPORT");
			DBNAME = prop.getProperty("DBNAME");
			DBUSERNAME = prop.getProperty("DBUSERNAME");
			DBPASSWORD = prop.getProperty("DBPASSWORD");
			AUTOCOMMIT = prop.getProperty("AUTOCOMMIT");
			MAXACTIVE = prop.getProperty("MAXACTIVE");
			MAXWAIT = prop.getProperty("MAXWAIT");
			
			DATABASE_URL = "jdbc:"+PROTOCAL+"://"+DBHOST+":"+LOCALLISTERNPORT+"/"+DBNAME;
			//System.out.println("loadDatabaseProperties <> prop: "+prop.toString());
		} catch(Exception e) {
			throw e;
		} finally {
			UtilsFactory.close(is);
			is = null;
		}
	}
	
	/**
	 * get database connection 
	 * 
	 * @return
	 * @throws Exception
	 */
	public static Connection getConnection() throws Exception {
		Connection con = null;
		
		try {
			/* TODO: Java Database Driver, tutorial, to study 
			 *  of `Class.forName`, `DriverManager.getConnection`, `con.createStatement`, `stmt.execute...`  
			 */
			Class.forName(DRIVER);
			
			/* commented, checking tried 
			System.out.println("DATABASE_URL: "+DATABASE_URL);
			System.out.println("DBUSERNAME: "+DBUSERNAME);
			System.out.println("DBPASSWORD: "+DBPASSWORD);*/
			
			con = DriverManager.getConnection(DATABASE_URL, DBUSERNAME, DBPASSWORD);
		} catch(Exception e) {
			throw e;
		} finally {
		}
		
		return con;
	}
	
	/**
	 * to get connection, auto commit false 
	 * 
	 * @return
	 * @throws Exception
	 */
	public static Connection getConnectionAutoCommitFalse() throws Exception {
		Connection con = null;
		
		try {
			con = getConnection();
			con.setAutoCommit(false);
		} catch(Exception e) {
			throw e;
		}
		
		return con;
	}
	
	/**
	 * get database now time, 
	 * Note: from java gets, local time of `now()` returns, thinks 
	 *   (i.e. Timestamp local: GMT+5:30, DATABASE: UTC, from java gets in `now()` local Timestamp returns OR adds, thinks, 
	 *     to sync, in local: UTC time to add, to restart tomcat), thinks 
	 * 
	 * @param con
	 * @return
	 * @throws Exception
	 */
	public static Timestamp getNow(Connection con) throws Exception {
		String strQuery = null;
		
		Statement stmt = null;
		ResultSet rst = null;
		
		Timestamp tsNow = null;
		
		try {
			strQuery = "SELECT now() AS now;";
			
			stmt = con.createStatement();
			rst = stmt.executeQuery(strQuery);
			if ( rst.next() ) {
				tsNow = rst.getTimestamp("now");
			}
			
			//System.out.println("getNow <> tsNow: "+tsNow);
			
		} catch (Exception e) {
			throw e;
		} finally {
			// Note: to close below respective order   
			close(rst);
			rst = null;
			close(stmt);
			stmt = null;
			
			strQuery = null;
		}
		
		return tsNow;
	}
	
	
	/*********** from `RLIM`, below adds ***********/
	
	/**
	 * commit connection 
	 * 
	 * @param con
	 * @return
	 */
	public static boolean commitConnection(Connection con) {
		try{
			if( con != null )
				con.commit();
		}catch(Exception e){
			System.out.println("Exception in commitConnection: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public static void rollback(Connection con){
		try {
			con.rollback();
		} catch (SQLException e1) {
			System.out.println("Exception in rollback: "+e1.getMessage());
			e1.printStackTrace();
		}
	}

	public static boolean closeResultSet(ResultSet rst){
		try{
			if(rst != null )
				rst.close();
		}catch(Exception e){
			System.out.println("Exception while closing ResultSet: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean closeStatement(Statement sta){
		try{
			if(sta != null )
				sta.close();
		}catch(Exception e){
			System.out.println("Exception while closing Statement: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean closePreparedStatement(PreparedStatement sta){
		try{
			if(sta != null )
				sta.close();
		}catch(Exception e){
			System.out.println("Exception while closing Statement: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean closeConnection(Connection conn){
		try{
			if(conn != null )
				conn.close();
		}catch(Exception e){
			System.out.println("Exception while closing Connection: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean close(ResultSet rst){
		try{
			if(rst != null )
				rst.close();
		}catch(Exception e){
			System.out.println("Exception while closing ResultSet: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean close(Statement sta){
		try{
			if(sta != null )
				sta.close();
		}catch(Exception e){
			System.out.println("Exception while closing Statement: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean close(PreparedStatement sta){
		try{
			if(sta != null )
				sta.close();
		}catch(Exception e){
			System.out.println("Exception while closing Statement: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean close(Connection conn){
		try{
			if(conn != null )
				conn.close();
		}catch(Exception e){
			System.out.println("Exception while closing Connection: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	/**
	 * Returns last insert key 
	 * 
	 * @param stmt
	 * @return
	 * @throws Exception
	 */
	public static long returnKey(Statement stmt, int nColumnIndex) throws Exception {
		long lGeneratedKey = -1l;
		ResultSet rstPrimaryKey = null;
		
		try{
			rstPrimaryKey = stmt.getGeneratedKeys();
			while( rstPrimaryKey.next() ){
				lGeneratedKey = rstPrimaryKey.getLong(nColumnIndex);
			}
		} catch(Exception e){
			throw e;
		} finally {
			close(rstPrimaryKey);
			rstPrimaryKey = null;
		}
		
		return lGeneratedKey;
	}
	
	/**
	 * Returns last inserted key 
	 * 
	 * @param pstmt
	 * @return
	 * @throws Exception
	 */
	public static long returnKey(PreparedStatement pstmt, int nColumnIndex) throws Exception {
		long lGeneratedKey = -1l;
		ResultSet rstPrimaryKey = null;
		
		try{
			rstPrimaryKey = pstmt.getGeneratedKeys();
			while( rstPrimaryKey.next() ){
				lGeneratedKey = rstPrimaryKey.getLong(nColumnIndex);
			}
		} catch(Exception e){
			throw e;
		} finally {
			close(rstPrimaryKey);
			rstPrimaryKey = null;
		}
		
		return lGeneratedKey;
	}
	
	/*********** from `RLIM`, of above adds ***********/
}
