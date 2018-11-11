package com.openlearning.learn.manager;

import java.sql.Connection;

import com.openlearning.learn.bean.LoginUserBean;
import com.openlearning.learn.bean.StudentDetailsBean;
import com.openlearning.learn.dbi.StudentDetailsDBI;

import net.sf.json.JSONObject;

public class StudentDetailsManager {
	
	/**
	 * to add Student details 
	 * 
	 * @param con
	 * @param studentDetailsBean
	 * @param loginUserBean
	 * @throws Exception
	 */
	public void addStudentDetails(Connection con, StudentDetailsBean studentDetailsBean, LoginUserBean loginUserBean) throws Exception {
		StudentDetailsDBI studentDetailsDBI = null;
		
		try {
			studentDetailsDBI = new StudentDetailsDBI();
			
			// to insert student details 
			studentDetailsDBI.insertStudentDetails(con, studentDetailsBean, loginUserBean);
			
			studentDetailsDBI = null;
		} catch(Exception e) {
			throw e;
		}
	}
	
	/**
	 * to get user's student details 
	 * 
	 * @param con
	 * @param nUserId
	 * @return
	 * @throws Exception
	 */
	public JSONObject getUserStudentsDetails(Connection con, int nUserId, String strLimit, String strOffset) throws Exception {
		StudentDetailsDBI studentDetailsDBI = null;
		
		JSONObject joStudentDetailsResult = null;
		
		try {
			studentDetailsDBI = new StudentDetailsDBI();
			
			// to get user's student details 
			joStudentDetailsResult = studentDetailsDBI.getUserStudentsDetails(con, nUserId, strLimit, strOffset);
			
			studentDetailsDBI = null;
		} catch (Exception e) {
			throw e;
		}
		
		return joStudentDetailsResult;
	}
	
	/**
	 * to get user's particular student details of given `student_id`, 
	 * 
	 * @param con
	 * @param nStudentId
	 * @param loginUserBean
	 * @return
	 * @throws Exception
	 */
	public JSONObject getUserStudentDetails(Connection con, int nStudentId, LoginUserBean loginUserBean) throws Exception {
		StudentDetailsDBI studentDetailsDBI = null;
		
		JSONObject joStudentDetails = null;
		
		try {
			studentDetailsDBI = new StudentDetailsDBI();
			
			// to user's particular student details 
			joStudentDetails = studentDetailsDBI.getUserStudentDetails(con, nStudentId, loginUserBean);
			
			studentDetailsDBI = null;
		} catch(Exception e) {
			throw e;
		}
		
		return joStudentDetails;
	}
	
	/**
	 * to user's update student details 
	 * 
	 * @param con
	 * @param studentDetailsBean
	 * @param loginUserBean
	 * @return
	 * @throws Exception
	 */
	public int updateStudentDetails(Connection con, StudentDetailsBean studentDetailsBean, LoginUserBean loginUserBean) throws Exception {
		StudentDetailsDBI studentDetailsDBI = null;
		
		int nRowsUpdated = -1;
		
		try {
			studentDetailsDBI = new StudentDetailsDBI();
			
			// to user's update student details 
			nRowsUpdated = studentDetailsDBI.updateStudentDetails(con, studentDetailsBean, loginUserBean);
			
			studentDetailsDBI = null;
		} catch(Exception e) {
			throw e;
		}
		
		return nRowsUpdated;
	}
	
	/**
	 * to delete row 
	 * 
	 * @param con
	 * @param nStudentId
	 * @param loginUserBean
	 * @return
	 * @throws Exception
	 */
	public int deleteRow(Connection con, int nStudentId, LoginUserBean loginUserBean) throws Exception {
		StudentDetailsDBI studentDetailsDBI = null;
		
		int nRowsDeleted = -1;
		
		try {
			studentDetailsDBI = new StudentDetailsDBI();
			
			// to delete row  
			nRowsDeleted = studentDetailsDBI.deleteRow(con, nStudentId, loginUserBean);
			
			studentDetailsDBI = null;
		} catch(Exception e) {
			throw e;
		}
		
		return nRowsDeleted;
	}
	
	/**
	 * to get student's record history details 
	 * 
	 * @param con
	 * @param nStudentId
	 * @param loginUserBean
	 * @param strLimit
	 * @param strOffset
	 * @return
	 * @throws Exception
	 */
	public JSONObject getStudentRecordHistoryDetails(Connection con, int nStudentId, LoginUserBean loginUserBean, String strLimit, String strOffset) throws Exception {
		StudentDetailsDBI studentDetailsDBI = null;
		
		JSONObject joStudentHistoryDetailsResult = null;
		
		try {
			studentDetailsDBI = new StudentDetailsDBI();
			
			// to get student's record history details 
			joStudentHistoryDetailsResult = studentDetailsDBI.getStudentRecordHistoryDetails(con, nStudentId, loginUserBean, strLimit, strOffset);
			
			studentDetailsDBI = null;
		} catch(Exception e) {
			throw e;
		}
		
		return joStudentHistoryDetailsResult;
	}
}
