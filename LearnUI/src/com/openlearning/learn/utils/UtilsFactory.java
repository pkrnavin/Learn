package com.openlearning.learn.utils;

import java.io.InputStream;
import java.io.Reader;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class UtilsFactory {

	/*********** from `RLIM`, below adds ***********/
	
	/**
	 * This method checked 'val1' is null OR length of val1 =0, 
	 * it will return EMPTY String 
	 * else it will return val1.
	 * 
	 * @param val1 
	 * @param val2 
	 * @return String
	 */
	public static String replaceNull(Object val1, String val2) {
		if (val1 == null || val1.toString().length() == 0)
			return val2;
		else
			return val1.toString();
	}
	
	public static String makeValidVarchar(String str, boolean bCoverWithQuote) {
		if( str != null)
			str = str.replaceAll("'","''").replaceAll("\\\\", "\\\\\\\\");
		else
			return null;
		
		if ( bCoverWithQuote ) {	// with quote 
			return "\'"+str+"\'";
		} else {	// without quote 
			return str;
		}
	}
	
	/**
	 * Closes the nested collection variable.
	 * 
	 * @param objCollection
	 */
	public static void clearCollectionHieracy(Object objCollection){
		try{
			if( objCollection == null ){
				
			}else if( objCollection instanceof JSONObject ) {
				JSONObject joCollection = (JSONObject)objCollection;
				Iterator it = joCollection.keySet().iterator();
				while( it.hasNext() ){
					Object str = it.next();
					clearCollectionHieracy( joCollection.get(str) );
				}
				joCollection.clear();
				joCollection = null;
			}else if( objCollection instanceof JSONArray ) {
				JSONArray jaCollection = (JSONArray)objCollection;
				for( int i=0; i < jaCollection.size(); i++ ){
					clearCollectionHieracy( jaCollection.get(i) );
				}
				jaCollection.clear();
				jaCollection = null;
			}else if( objCollection instanceof Map ) {
				Map mapCollection = (Map)objCollection;
				Iterator it = mapCollection.keySet().iterator();
				while( it.hasNext() ){
					Object str = it.next();
					clearCollectionHieracy( mapCollection.get(str) );
				}
				mapCollection.clear();
				mapCollection = null;
			}else if( objCollection instanceof List ) {
				List listCollection = (List)objCollection;
				for( int i=0; i < listCollection.size(); i++ ){
					clearCollectionHieracy( listCollection.get(i) );
				}
				listCollection.clear();
				listCollection = null;
			}else if( objCollection instanceof StringBuilder ) {
				StringBuilder sbCollection = (StringBuilder)objCollection;
				sbCollection.setLength(0);
			}else if( objCollection instanceof StringBuffer ) {
				StringBuffer sbCollection = (StringBuffer)objCollection;
				sbCollection.setLength(0);
			}/* from `RLIM` adds 
			else if( objCollection instanceof IncidentBean ) {
				((IncidentBean)objCollection).destory();
			}*/
			
			objCollection = null;
		}catch(Throwable t){
			System.out.println("Exception while clearCollectionHieracy: "+t.getMessage());
			t.printStackTrace();
		}
	}
	
	public static void throwExceptionIfSessionExpired(HttpSession session) throws ServletException {
		if( session == null || session.getAttribute("loginUser") == null ){
			throw new ServletException("SESSION_EXPIRED");
		}
	}
	
	public static JSONObject getJSONSuccessReturn( String strMessage ){
		JSONObject joReturn = new JSONObject();
		JSONObject joData = new JSONObject(); 
		
		joReturn.put("success", true);
		joReturn.put("failure", false);
		
		joData.put("message", strMessage);
		joReturn.put("data", joData);
		
		return joReturn;
	}
	
	public static JSONObject getJSONSuccessReturn( String strMessage, String strTitle ){
		JSONObject joReturn = new JSONObject();
		JSONObject joData = new JSONObject(); 
		
		joReturn.put("success", true);
		joReturn.put("failure", false);
		
		joReturn.put("title", strTitle);
		
		joData.put("message", strMessage);
		joReturn.put("data", joData);
		
		return joReturn;
	}

	public static JSONObject getJSONSuccessReturn( String strMessage, int nInsertedCount ){
		JSONObject joReturn = new JSONObject();
		JSONObject joData = new JSONObject(); 
		
		joReturn.put("success", true);
		joReturn.put("failure", false);
		
		joData.put("message", strMessage);
		joReturn.put("data", joData);
		joReturn.put("inserted", nInsertedCount);
		
		return joReturn;
	}
	
	public static JSONObject getJSONFailureReturn( String strMessage ){
		JSONObject joReturn = new JSONObject(); 
		
		joReturn.put("success", false);
		joReturn.put("failure", true);
		joReturn.put("errorMessage", (strMessage+"").replaceAll("\"","\\\""));
		
		return joReturn;
	}
	
	public static JSONObject getJSONFailureReturn( String strMessage, String strFocusTo){
		JSONObject joReturn = new JSONObject(); 
		
		joReturn.put("success", false);
		joReturn.put("failure", true);
		joReturn.put("errorMessage", (strMessage+"").replaceAll("\"","\\\""));
		joReturn.put("focusTo", strFocusTo);
		
		return joReturn;
	}
	

	/**
	 * Close the given InputStream 
	 * @param inputStream
	 * @return
	 */
	public static boolean close(InputStream inputStream){
		try{
			if(inputStream != null){
				inputStream.close();
			}
		}catch(Exception e){
			//LogManager.errorLog(e);
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	/**
	 * Close the given Reader
	 * 
	 * @param reader
	 * @return
	 */
	public static boolean close(Reader reader){
		try{
			if(reader != null){
				reader.close();
			}
		}catch(Exception e){
			//LogManager.errorLog(e);
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	/*********** from `RLIM`, of above adds ***********/
	
	
	// TODO: below adds to checking  
	/**
	 * gets JSON success response, of passing value `JSONObject` 
	 *  
	 * @param joData
	 * @return
	 */
	public static JSONObject getJSONSuccessReturn(JSONObject joData) {
		JSONObject joReturn = null;
		
		joReturn = getJSONSuccessReturn(joData.toString());
		
		return joReturn;
	}
	
	/**
	 * gets JSON success response, of passing value `JSONArray`
	 * 
	 * @param jaData
	 * @return
	 */
	public static JSONObject getJSONSuccessReturn(JSONArray jaData) {
		JSONObject joReturn = null;
		
		joReturn = getJSONSuccessReturn(jaData.toString());
		
		return joReturn;
	}
}
