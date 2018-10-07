package com.openlearning.learn.utils;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

public class Constants {
	
	// `Constants.properties` file full path; below values of the file 
	public static String CONSTANTS_PATH = null;
	
	public static String RESOURCE_PATH = null;
	public static String LEARNUI_CONFIG_FILE_FULLPATH = null;
	
	
	// below in computer folder's properties file values 
	public static String TEST = null;
	
	
	
	
	/**
	 * load constants properties file values 
	 * 
	 * @param strConstantsPropFileFullPath
	 * @throws Exception
	 */
	public static void loadConstantsProperties(String strConstantsPropFileFullPath) throws Exception {
		Properties prop = null;
		
		InputStream is = null;
		
		try {
			prop = new Properties();
			is = new FileInputStream(strConstantsPropFileFullPath);
			prop.load(is);
			
			RESOURCE_PATH = prop.getProperty("RESOURCE_PATH");
			LEARNUI_CONFIG_FILE_FULLPATH = RESOURCE_PATH + prop.getProperty("EXT_LEARNUI_CONFIG_FILE_PATH");
			
			//System.out.println("RESOURCE_PATH: "+RESOURCE_PATH);
			//System.out.println("LEARNUI_CONFIG_FILE_FULLPATH: "+LEARNUI_CONFIG_FILE_FULLPATH);
		} catch(Exception e) {
			//System.out.println("Exception in loadConstantsProperties(): "+e.getMessage());
			//e.printStackTrace();
			throw e;
		} finally {
			UtilsFactory.close(is);
			is = null;
		}
	}
	
	/**
	 * load computer folder's config properties file values 
	 * 
	 * @param strLearnUIConfigPropFileFullPath
	 * @throws Exception
	 */
	public static void loadLearnUIConfigProperties(String strLearnUIConfigPropFileFullPath) throws Exception {
		Properties prop = null;
		
		InputStream is = null;
		
		try {
			prop = new Properties();
			is = new FileInputStream(strLearnUIConfigPropFileFullPath);
			prop.load(is);
			
			TEST = prop.getProperty("TEST");
			
			//System.out.println("TEST: "+TEST);
		} catch (Exception e) {
			//System.out.println("Exception in loadLearnUIConfigProperties(): "+e.getMessage());
			throw e;
		} finally {
			UtilsFactory.close(is);
			is = null;
		}
	}
}
