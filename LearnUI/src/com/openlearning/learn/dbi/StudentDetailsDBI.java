package com.openlearning.learn.dbi;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.openlearning.learn.bean.LoginUserBean;
import com.openlearning.learn.bean.StudentDetailsBean;
import com.openlearning.learn.connect.DataBaseMaster;
import com.openlearning.learn.utils.UtilsFactory;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class StudentDetailsDBI {
	
	/**
	 * to insert student details 
	 * 
	 * @param con
	 * @param studentDetailsBean
	 * @param loginUserBean
	 * @throws Exception
	 */
	public void insertStudentDetails(Connection con, StudentDetailsBean studentDetailsBean, LoginUserBean loginUserBean) throws Exception {
		PreparedStatement pstmt = null;
		
		StringBuilder sbQuery = new StringBuilder();
		
		int nRowsInserted = -1;
		
		long lStudentId = -1;
		
		try {
			sbQuery	.append("INSERT INTO lu_student_details ")
					.append("(user_id, first_name, last_name, father_name, mother_name, ")
					.append("  address, email_id, phone_number, nationality, date_of_birth, ")
					.append("  transport, interests, created_by, created_on) ")
					.append("VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now());");
			
			//System.out.println("sbQuery: "+sbQuery.toString());
			
			pstmt = con.prepareStatement(sbQuery.toString(), PreparedStatement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, loginUserBean.getUserId());
			pstmt.setString(2, studentDetailsBean.getFirstName());
			pstmt.setString(3, studentDetailsBean.getLastName());
			pstmt.setString(4, studentDetailsBean.getFatherName());
			pstmt.setString(5, studentDetailsBean.getMotherName());
			pstmt.setString(6, studentDetailsBean.getAddress());
			pstmt.setString(7, studentDetailsBean.getEmailId());
			pstmt.setString(8, studentDetailsBean.getPhoneNumber());
			pstmt.setString(9, studentDetailsBean.getNationality());
			pstmt.setTimestamp(10, studentDetailsBean.getDateOfBirth());
			pstmt.setString(11, studentDetailsBean.getTransport());
			pstmt.setString(12, studentDetailsBean.getInterests());
			pstmt.setInt(13, loginUserBean.getUserId());
			
			nRowsInserted = pstmt.executeUpdate();
			//System.out.println("nRowsInserted: "+nRowsInserted);
			
			// to get inserted ROW id 
			/* commented, error occurs 
			lStudentId = DataBaseMaster.returnKey(pstmt, 0);
			System.out.println("col index 0 <> lStudentId: "+lStudentId);*/
			
			/* commented, below col index, adds to checking to try */
			lStudentId = DataBaseMaster.returnKey(pstmt, 1);
			//System.out.println("col index 1 <> lStudentId: "+lStudentId);
			
			/* commented, error occurs of multiple above, below adds; `user_id` returns, thinks 
			lStudentId = DataBaseMaster.returnKey(pstmt, 2);
			System.out.println("col index 2 <> lStudentId: "+lStudentId);*/
			
			// to sets, inserted 
			studentDetailsBean.setStudentId((int) lStudentId);
			
		} catch(Exception e) {
			throw e;
		} finally {
			DataBaseMaster.close(pstmt);
			pstmt = null;
			
			UtilsFactory.clearCollectionHieracy(sbQuery);
			sbQuery = null;
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
		PreparedStatement pstmt = null, pstmtCnt = null;
		ResultSet rst = null, rstCnt = null;
		
		StringBuilder sbQuery = new StringBuilder();
		
		JSONObject joStudent = null, joResult = null;
		
		JSONArray jaStudentDetails = null;
		
		long lTotalResults = -1L;
		
		try {
			joResult = new JSONObject();
			jaStudentDetails = new JSONArray();
			
			// to get count total rows, to returns, of pagination to add 
			sbQuery	.append("SELECT count(*) AS total_results ")
					.append("FROM lu_student_details lsd ")
					.append("INNER JOIN user_master um ON um.user_id = lsd.user_id ")
					.append("  AND um.user_id = ? ")
					.append("LEFT JOIN user_master um_cb ON um_cb.user_id = lsd.created_by ")
					.append("LEFT JOIN user_master um_mb ON um_mb.user_id = lsd.modified_by ");
			
			pstmtCnt = con.prepareStatement(sbQuery.toString());
			pstmtCnt.setInt(1, nUserId);
			rstCnt = pstmtCnt.executeQuery();
			if ( rstCnt.next() ) {
				lTotalResults = rstCnt.getLong("total_results");
			}
			
			// Note: after INNER JOIN, LEFT JOIN, to adds, 
			// to get rows 
			sbQuery.setLength(0);
			sbQuery	.append("SELECT lsd.*, ")
					.append("  um.user_id, um.user_name, ")
					.append("  um_cb.user_id, um_cb.user_name AS created_by_user_name, ")
					.append("  um_mb.user_id, um_mb.user_name AS modified_by_user_name ")
					.append("FROM lu_student_details lsd ")
					.append("INNER JOIN user_master um ON um.user_id = lsd.user_id ")
					.append("  AND um.user_id = ? ")
					.append("LEFT JOIN user_master um_cb ON um_cb.user_id = lsd.created_by ")
					.append("LEFT JOIN user_master um_mb ON um_mb.user_id = lsd.modified_by ")
					.append("ORDER BY lsd.created_on DESC ");
			if( strLimit != null && strLimit.length() > 0 ) {
				/* `Appedo` module services, below pagination parameter to set to adds, thinks 
				 * Note: of parameter sets, as `toString` in memory string value sets, of following time calls, 
				 *   string refers available of before value in memory, of `string`, thinks, so LIMIT, OFFSET parameter to set to add, 
				 */
				sbQuery.append("LIMIT ? ");
				if( strOffset != null && strOffset.length() > 0 ) {
					sbQuery.append("OFFSET ? ");
				}
			}
			
			//System.out.println("sbQuery: "+sbQuery.toString());
			
			pstmt = con.prepareStatement(sbQuery.toString());
			pstmt.setInt(1, nUserId);
			if( strLimit != null && strLimit.length() > 0 ) {
				pstmt.setInt(2, Integer.parseInt(strLimit));
				if( strOffset != null && strOffset.length() > 0 ) {
					pstmt.setInt(3, Integer.parseInt(strOffset));
				}
			}
			rst = pstmt.executeQuery();
			while ( rst.next() ) {
				joStudent = new JSONObject();
				joStudent.put("studentId", rst.getInt("student_id"));
				joStudent.put("userId", rst.getInt("user_id"));
				joStudent.put("firstName", rst.getString("first_name"));
				joStudent.put("lastName", rst.getString("last_name"));
				joStudent.put("fatherName", rst.getString("father_name"));
				joStudent.put("motherName", rst.getString("mother_name"));
				joStudent.put("address", rst.getString("address"));
				joStudent.put("emailId", rst.getString("email_id"));
				joStudent.put("emailVerifiedOnMillis", (rst.getTimestamp("email_verified_on") == null ? null : rst.getTimestamp("email_verified_on").getTime()));
				joStudent.put("phoneNumber", rst.getString("phone_number"));
				joStudent.put("nationality", rst.getString("nationality"));
				joStudent.put("dateOfBirthMillis", rst.getTimestamp("date_of_birth").getTime());
				joStudent.put("transport", rst.getString("transport"));
				joStudent.put("interests", rst.getString("interests"));
				joStudent.put("createdBy", rst.getInt("created_by"));
				//joStudent.put("createdOn", rst.getTimestamp("created_on"));
				joStudent.put("createdOnMillis", rst.getTimestamp("created_on").getTime());
				joStudent.put("modifiedBy", rst.getInt("modified_by"));
				//joStudent.put("modifiedOn", rst.getTimestamp("modified_on"));
				joStudent.put("modifiedOnMillis", (rst.getTimestamp("modified_on") == null ? null : rst.getTimestamp("modified_on").getTime()));
				joStudent.put("createdByUserName", rst.getString("created_by_user_name"));
				joStudent.put("modifiedByUserName", rst.getString("modified_by_user_name"));
				
				jaStudentDetails.add(joStudent);
			}
			joResult.put("totalResults", lTotalResults);
			joResult.put("studentDetailsData", jaStudentDetails);
			
		} catch(Exception e) {
			throw e;
		} finally {
			DataBaseMaster.close(rstCnt);
			rstCnt = null;
			DataBaseMaster.close(pstmtCnt);
			pstmtCnt = null;
			
			DataBaseMaster.close(rst);
			rst = null;
			DataBaseMaster.close(pstmt);
			pstmt = null;
			
			UtilsFactory.clearCollectionHieracy(sbQuery);
			sbQuery = null;
		}
		
		return joResult;
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
		PreparedStatement pstmt = null;
		ResultSet rst = null;

		StringBuilder sbQuery = new StringBuilder();
		
		JSONObject joStudent = null;
		
		try {
			/* to get user's particular student details; Note: `user_id` to add, respective loggedIn user student details to get, 
			 * (i.e. of manual passing of `student_id` of varies user's `student_id`, ROW not to return, so `user_id` to add, 
			 *     to return user's loggedin student details; to protection of user's student details to get), tries 
			*/
			sbQuery	.append("SELECT lsd.*, ")
					.append("  um.user_id, um.user_name, um.full_name ")
					.append("FROM lu_student_details lsd ")
					.append("INNER JOIN user_master um ON um.user_id = lsd.user_id ")
					.append("  AND lsd.student_id = ? AND um.user_id = ? ");
			
			//System.out.println("getUserStudentDetails <> sbQuery: "+sbQuery.toString());
			
			pstmt = con.prepareStatement(sbQuery.toString());
			pstmt.setInt(1, nStudentId);
			pstmt.setInt(2, loginUserBean.getUserId());
			rst = pstmt.executeQuery();
			// Note: one row to returns, so `if` to add 
			if ( rst.next() ) {
				joStudent = new JSONObject();
				joStudent.put("studentId", rst.getInt("student_id"));
				joStudent.put("userId", rst.getInt("user_id"));
				joStudent.put("firstName", rst.getString("first_name"));
				joStudent.put("lastName", rst.getString("last_name"));
				joStudent.put("fatherName", rst.getString("father_name"));
				joStudent.put("motherName", rst.getString("mother_name"));
				joStudent.put("address", rst.getString("address"));
				joStudent.put("emailId", rst.getString("email_id"));
				joStudent.put("emailVerifiedOnMillis", (rst.getTimestamp("email_verified_on") == null ? null : rst.getTimestamp("email_verified_on").getTime()));
				joStudent.put("phoneNumber", rst.getString("phone_number"));
				joStudent.put("nationality", rst.getString("nationality"));
				joStudent.put("dateOfBirthMillis", rst.getTimestamp("date_of_birth").getTime());
				joStudent.put("transport", rst.getString("transport"));
				joStudent.put("interests", rst.getString("interests"));
				joStudent.put("createdBy", rst.getInt("created_by"));
				//joStudent.put("createdOn", rst.getTimestamp("created_on"));
				joStudent.put("createdOnMillis", rst.getTimestamp("created_on").getTime());
				joStudent.put("modifiedBy", rst.getInt("modified_by"));
				//joStudent.put("modifiedOn", rst.getTimestamp("modified_on"));
				joStudent.put("modifiedOnMillis", (rst.getTimestamp("modified_on") == null ? null : rst.getTimestamp("modified_on").getTime()));
			}
			
		} catch(Exception e) {
			throw e;
		} finally {
			DataBaseMaster.close(rst);
			rst = null;
			DataBaseMaster.close(pstmt);
			pstmt = null;
			
			UtilsFactory.clearCollectionHieracy(sbQuery);
			sbQuery = null;
		}
		
		return joStudent;
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
		PreparedStatement pstmt = null;
		
		StringBuilder sbQuery = new StringBuilder();
		
		int nRowsUpdated = -1;
		
		try {
			/* to update student details; 
			 * Note: in WHERE `user_id` to add, as manual passing of `studentId` user loggedin's student details to update, 
			 *   (i.e. varies user's student details not to update, so `user_id` to adds, tries) 
			 */
			sbQuery	.append("UPDATE lu_student_details SET ")
					.append("  first_name = ?, last_name = ?, father_name = ?, mother_name = ?, ")
					.append("  address = ?, email_id = ?, phone_number = ?, nationality = ?, date_of_birth = ?, ")
					.append("  transport = ?, interests = ?, modified_by = ?, modified_on = now() ")
					.append("WHERE student_id = ? AND user_id = ? ");
			
			//System.out.println("updateStudentDetails <> sbQuery: "+sbQuery.toString());
			
			pstmt = con.prepareStatement(sbQuery.toString());
			pstmt.setString(1, studentDetailsBean.getFirstName());
			pstmt.setString(2, studentDetailsBean.getLastName());
			pstmt.setString(3, studentDetailsBean.getFatherName());
			pstmt.setString(4, studentDetailsBean.getMotherName());
			pstmt.setString(5, studentDetailsBean.getAddress());
			pstmt.setString(6, studentDetailsBean.getEmailId());
			pstmt.setString(7, studentDetailsBean.getPhoneNumber());
			pstmt.setString(8, studentDetailsBean.getNationality());
			pstmt.setTimestamp(9, studentDetailsBean.getDateOfBirth());
			pstmt.setString(10, studentDetailsBean.getTransport());
			pstmt.setString(11, studentDetailsBean.getInterests());
			pstmt.setInt(12, loginUserBean.getUserId());
			pstmt.setInt(13, studentDetailsBean.getStudentId());
			pstmt.setInt(14, loginUserBean.getUserId());
			
			nRowsUpdated = pstmt.executeUpdate();
			
			//System.out.println("nRowsUpdated: "+nRowsUpdated);
		} catch(Exception e) {
			throw e;
		} finally {
			DataBaseMaster.close(pstmt);
			pstmt = null;
			
			UtilsFactory.clearCollectionHieracy(sbQuery);
			sbQuery = null;
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
		PreparedStatement pstmt = null;

		StringBuilder sbQuery = new StringBuilder();
		
		int nRowsDeleted = -1;
		
		try {
			/* Note: in WHERE `user_id` to add, as manual passing of `studentId` user loggedin's student details to affect, 
			 *   (i.e. varies user's student details not to affect, so `user_id` to adds, tries)
			 */
			sbQuery.append("DELETE FROM lu_student_details WHERE student_id = ? AND user_id = ? ");
			
			pstmt = con.prepareStatement(sbQuery.toString());
			pstmt.setInt(1, nStudentId);
			pstmt.setInt(2, loginUserBean.getUserId());
			
			nRowsDeleted = pstmt.executeUpdate();
			
		} catch(Exception e) {
			throw e;
		} finally {
			DataBaseMaster.close(pstmt);
			pstmt = null;
			
			UtilsFactory.clearCollectionHieracy(sbQuery);
			sbQuery = null;
		}
		
		return nRowsDeleted;
	}
	
	/**
	 * to get student's record history details (i.e. the row's INSERT, UPDATE, DELETE operations), 
	 *   of particular student's records history details to get 
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
		PreparedStatement pstmt = null, pstmtCnt = null;
		ResultSet rst = null, rstCnt = null;
		
		StringBuilder sbQuery = new StringBuilder();
		
		JSONObject joStudent = null, joResult = null;
		
		JSONArray jaStudentDetails = null;
		
		long lTotalResults = -1L;
		
		try {
			joResult = new JSONObject();
			jaStudentDetails = new JSONArray();
			
			/* Note: from UI `nStudentId` passing, to get respective loggedin user's student history details, below WHERE in `user_id` to add, tried 
			 *   (i.e. from firebug of varies user's student id passing not to show, the details to show respective user's student id )
			 */
			// to get count total rows, to returns, of pagination to add 
			sbQuery	.append("SELECT count(*) AS total_results ")
					.append("FROM lu_student_details_history lsdh ")
					.append("INNER JOIN user_master um ON um.user_id = lsdh.user_id ")
					.append("  AND um.user_id = ? AND lsdh.student_id = ? ")
					.append("LEFT JOIN user_master um_cb ON um_cb.user_id = lsdh.created_by ")
					.append("LEFT JOIN user_master um_mb ON um_mb.user_id = lsdh.modified_by ");
			
			pstmtCnt = con.prepareStatement(sbQuery.toString());
			pstmtCnt.setInt(1, loginUserBean.getUserId());
			pstmtCnt.setInt(2, nStudentId);
			rstCnt = pstmtCnt.executeQuery();
			if ( rstCnt.next() ) {
				lTotalResults = rstCnt.getLong("total_results");
			}
			
			// to get rows 
			sbQuery.setLength(0);
			sbQuery	.append("SELECT lsdh.*, ")
					.append("  um_cb.user_id, um_cb.user_name AS created_by_user_name, ")
					.append("  um_mb.user_id, um_mb.user_name AS modified_by_user_name ")
					.append("FROM lu_student_details_history lsdh ")
					.append("INNER JOIN user_master um ON um.user_id = lsdh.user_id ")
					.append("  AND um.user_id = ? AND lsdh.student_id = ? ")
					.append("LEFT JOIN user_master um_cb ON um_cb.user_id = lsdh.created_by ")
					.append("LEFT JOIN user_master um_mb ON um_mb.user_id = lsdh.modified_by ")
					.append("ORDER BY lsdh.done_on DESC ");
					//.append("LIMIT 10 OFFSET 0; ")
			if( strLimit != null && strLimit.length() > 0 ) {
				sbQuery.append("LIMIT ? ");
				if( strOffset != null && strOffset.length() > 0 ) {
					sbQuery.append("OFFSET ? ");
				}
			}
			
			pstmt = con.prepareStatement(sbQuery.toString());
			pstmt.setInt(1, loginUserBean.getUserId());
			pstmt.setInt(2, nStudentId);
			if( strLimit != null && strLimit.length() > 0 ) {
				pstmt.setInt(3, Integer.parseInt(strLimit));
				if( strOffset != null && strOffset.length() > 0 ) {
					pstmt.setInt(4, Integer.parseInt(strOffset));
				}
			}
			rst = pstmt.executeQuery();
			while ( rst.next() ) {
				joStudent = new JSONObject();
				joStudent.put("operation", rst.getString("operation"));
				joStudent.put("doneOnMillis", rst.getTimestamp("done_on").getTime());
				joStudent.put("studentId", rst.getInt("student_id"));
				joStudent.put("userId", rst.getInt("user_id"));
				joStudent.put("firstName", rst.getString("first_name"));
				joStudent.put("lastName", rst.getString("last_name"));
				joStudent.put("fatherName", rst.getString("father_name"));
				joStudent.put("motherName", rst.getString("mother_name"));
				joStudent.put("address", rst.getString("address"));
				joStudent.put("emailId", rst.getString("email_id"));
				joStudent.put("emailVerifiedOnMillis", (rst.getTimestamp("email_verified_on") == null ? null : rst.getTimestamp("email_verified_on").getTime()));
				joStudent.put("phoneNumber", rst.getString("phone_number"));
				joStudent.put("nationality", rst.getString("nationality"));
				joStudent.put("dateOfBirthMillis", rst.getTimestamp("date_of_birth").getTime());
				joStudent.put("transport", rst.getString("transport"));
				joStudent.put("interests", rst.getString("interests"));
				joStudent.put("createdBy", rst.getInt("created_by"));
				//joStudent.put("createdOn", rst.getTimestamp("created_on"));
				joStudent.put("createdOnMillis", rst.getTimestamp("created_on").getTime());
				joStudent.put("modifiedBy", rst.getInt("modified_by"));
				//joStudent.put("modifiedOn", rst.getTimestamp("modified_on"));
				joStudent.put("modifiedOnMillis", (rst.getTimestamp("modified_on") == null ? null : rst.getTimestamp("modified_on").getTime()));
				joStudent.put("createdByUserName", rst.getString("created_by_user_name"));
				joStudent.put("modifiedByUserName", rst.getString("modified_by_user_name"));
				
				jaStudentDetails.add(joStudent);
			}
			joResult.put("totalResults", lTotalResults);
			joResult.put("studentDetailsData", jaStudentDetails);
			
		} catch(Exception e) {
			throw e;
		} finally {
			DataBaseMaster.close(rstCnt);
			rstCnt = null;
			DataBaseMaster.close(pstmtCnt);
			pstmtCnt = null;
			
			DataBaseMaster.close(rst);
			rst = null;
			DataBaseMaster.close(pstmt);
			pstmt = null;
			
			UtilsFactory.clearCollectionHieracy(sbQuery);
			sbQuery = null;
		}
		
		return joResult;
	}
}
