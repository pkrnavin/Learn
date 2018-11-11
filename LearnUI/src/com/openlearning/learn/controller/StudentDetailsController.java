package com.openlearning.learn.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Timestamp;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.openlearning.learn.bean.LoginUserBean;
import com.openlearning.learn.bean.StudentDetailsBean;
import com.openlearning.learn.connect.DataBaseMaster;
import com.openlearning.learn.manager.StudentDetailsManager;
import com.openlearning.learn.utils.UtilsFactory;

import net.sf.json.JSONObject;

/**
 * Servlet implementation class LoginController
 */
//@WebServlet("/LoginController")
public class StudentDetailsController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public StudentDetailsController() {
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
	
	/**
	 * Get the request and do the needful.
	 * Call respective model 
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	protected void doAction(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");

		HttpSession session = request.getSession();
		
		// to throw exception, of user not logged in 
		UtilsFactory.throwExceptionIfSessionExpired(session);
		
		String strAction = request.getServletPath();
		
		ServletContext context = getServletContext();
		
		if ( strAction.equals("/addStudentDetails") ) {
			Connection con = null;
			
			LoginUserBean loginUserBean = null;
			
			StudentDetailsBean studentDetailsBean = null;
			
			StudentDetailsManager studentDetailsManager = null;
			
			JSONObject joRtn = null;
			
			try {
				studentDetailsManager = new StudentDetailsManager();
				
				con = DataBaseMaster.getConnectionAutoCommitFalse();
				
				loginUserBean = (LoginUserBean) session.getAttribute("loginUser");
				
				//System.out.println("/addStudentDetails <> 111111111");
				
				studentDetailsBean = new StudentDetailsBean();
				studentDetailsBean.setUserId(loginUserBean.getUserId());
				studentDetailsBean.setFirstName(request.getParameter("firstName"));
				studentDetailsBean.setLastName(request.getParameter("lastName"));
				studentDetailsBean.setFatherName(request.getParameter("fatherName"));
				studentDetailsBean.setMotherName(request.getParameter("motherName"));
				studentDetailsBean.setAddress(request.getParameter("address"));
				studentDetailsBean.setEmailId(request.getParameter("email"));
				studentDetailsBean.setPhoneNumber(request.getParameter("phoneNumber"));
				studentDetailsBean.setNationality(request.getParameter("nationality"));
				studentDetailsBean.setDateOfBirth(new Timestamp( Long.parseLong((request.getParameter("dateOfBirth"))) ));
				studentDetailsBean.setTransport(request.getParameter("transportMode"));
				studentDetailsBean.setInterests(request.getParameter("interests"));
				
				//System.out.println("BEFORE INSERT <> studentDetailsBean: "+studentDetailsBean);
				
				// to insert student details 
				studentDetailsManager.addStudentDetails(con, studentDetailsBean, loginUserBean);
				
				//System.out.println("AFTER INSERT <> studentDetailsBean: "+studentDetailsBean);
				
				// commit connection 
				DataBaseMaster.commitConnection(con);
				
				joRtn = UtilsFactory.getJSONSuccessReturn("Student details added. ");
				
				studentDetailsManager = null;
				studentDetailsBean = null;
			} catch(Exception e) {
				// exception occurs, to rollback inserted 
				DataBaseMaster.rollback(con);
				
				System.out.println("Exception in /addStudentDetails: "+e.getMessage());
				e.printStackTrace();
				joRtn = UtilsFactory.getJSONFailureReturn("Unable to add student details. ");
			} finally {
				DataBaseMaster.close(con);
				con = null;
				
				response.getWriter().write(joRtn.toString());
			}
		} else if ( strAction.equals("/getUserStudentsDetails") ) {
			// to get user's students details, grid data 
			Connection con = null;
			
			LoginUserBean loginUserBean = null;
			
			StudentDetailsManager studentDetailsManager = null;
			
			JSONObject joRtn = null, joResultStudentDetails = null;
			
			/* commented, // below to checking, to try `StudentDetailsBean` fromJSON, toJSON, toString, to checking 
			StudentDetailsBean studentDetailsBeanFromJSON = null;
			JSONObject joStudent = null;
			JSONArray jaStudentDetailsData = null;*/
			
			try {
				studentDetailsManager = new StudentDetailsManager();
				
				con = DataBaseMaster.getConnection();
				
				//System.out.println("/getUserStudentsDetails <> 111111");
				
				loginUserBean = (LoginUserBean) session.getAttribute("loginUser");
				
				String strLimit = request.getParameter("limit");
				String strOffset = request.getParameter("offset");
				
				//System.out.println("/getUserStudentsDetails <> 11111111 <> strLimit: "+strLimit+" <> strOffset: "+strOffset);
				
				// to get user's student details 
				joResultStudentDetails = studentDetailsManager.getUserStudentsDetails(con, loginUserBean.getUserId(), strLimit, strOffset);
				//System.out.println("joResultStudentDetails: "+joResultStudentDetails);
				
				/* commented, // below adds to chekcing to try, of fromJSON, toJSON, toString 
				jaStudentDetailsData = joResultStudentDetails.getJSONArray("studentDetailsData");
				//joStudent = jaStudentDetailsData.getJSONObject(jaStudentDetailsData.size() - 1);
				joStudent = jaStudentDetailsData.getJSONObject(jaStudentDetailsData.size() - 3);
				joStudent.put("emailVerifiedOnMillis", System.currentTimeMillis());
				studentDetailsBeanFromJSON = new StudentDetailsBean();
				studentDetailsBeanFromJSON.fromJSON(joStudent);
				
				System.out.println("studentDetailsBeanFromJSON: "+studentDetailsBeanFromJSON);
				studentDetailsBeanFromJSON.setFirstName(studentDetailsBeanFromJSON.getFirstName() + "_FromJSON");
				System.out.println("studentDetailsBeanFromJSON.toJSON(): "+studentDetailsBeanFromJSON.toJSON());
				System.out.println("studentDetailsBeanFromJSON: "+studentDetailsBeanFromJSON);
				*/
				
				// to add response to returns, 
				joRtn = UtilsFactory.getJSONSuccessReturn(joResultStudentDetails);
				
				studentDetailsManager = null;
			} catch(Exception e) {
				System.out.println("Exception in /getUserStudentsDetails: "+e.getMessage());
				e.printStackTrace();
				joRtn = UtilsFactory.getJSONFailureReturn("Unable to get user students details. ");
			} finally {
				DataBaseMaster.close(con);
				con = null;
				
				response.getWriter().write(joRtn.toString());
			}
		} else if ( strAction.equals("/getUserStudentDetails") ) {
			// edit click, to load to set value in form, to get user's particular student details of given `student_id`, 
			Connection con = null;
			
			LoginUserBean loginUserBean = null;
			
			StudentDetailsManager studentDetailsManager = null;
			
			JSONObject joRtn = null, joStudentDetails = null;
			
			int nStudentId = 0;
			
			try {
				studentDetailsManager = new StudentDetailsManager();
				
				con = DataBaseMaster.getConnection();
				
				loginUserBean = (LoginUserBean) session.getAttribute("loginUser");
				
				nStudentId = Integer.parseInt(request.getParameter("studentId"));
				
				//System.out.println("/getUserStudentDetails <> 222222");
				//System.out.println("nStudentId: "+nStudentId);
				
				// to get user's particular student details of given `student_id`, 
				joStudentDetails = studentDetailsManager.getUserStudentDetails(con, nStudentId, loginUserBean);
				
				joRtn = UtilsFactory.getJSONSuccessReturn(UtilsFactory.replaceNull(joStudentDetails, ""));
				
				//System.out.println("joRtn: "+joRtn);
				
				studentDetailsManager = null;
			} catch (Exception e) {
				System.out.println("Exception in /getUserStudentDetails: "+e.getMessage());
				e.printStackTrace();
				joRtn = UtilsFactory.getJSONFailureReturn("Unable to get user student details. ");
			} finally {
				DataBaseMaster.close(con);
				con = null;
				
				response.getWriter().write(joRtn.toString());
			}
		} else if ( strAction.equals("/updateStudentDetails") ) {
			// to update user's student details 
			Connection con = null;
			
			LoginUserBean loginUserBean = null;
			
			StudentDetailsBean studentDetailsBean = null;
			
			StudentDetailsManager studentDetailsManager = null;
			
			JSONObject joRtn = null;
			
			int nRtnRowsUpdated = -1;
			
			try {
				studentDetailsManager = new StudentDetailsManager();
				
				con = DataBaseMaster.getConnectionAutoCommitFalse();
				
				loginUserBean = (LoginUserBean) session.getAttribute("loginUser");
				
				//System.out.println("/updateStudentDetails <> 2222222");
				
				studentDetailsBean = new StudentDetailsBean();
				studentDetailsBean.setStudentId(Integer.parseInt(request.getParameter("studentId")));
				studentDetailsBean.setUserId(loginUserBean.getUserId());
				studentDetailsBean.setFirstName(request.getParameter("firstName"));
				studentDetailsBean.setLastName(request.getParameter("lastName"));
				studentDetailsBean.setFatherName(request.getParameter("fatherName"));
				studentDetailsBean.setMotherName(request.getParameter("motherName"));
				studentDetailsBean.setAddress(request.getParameter("address"));
				studentDetailsBean.setEmailId(request.getParameter("email"));
				studentDetailsBean.setPhoneNumber(request.getParameter("phoneNumber"));
				studentDetailsBean.setNationality(request.getParameter("nationality"));
				studentDetailsBean.setDateOfBirth(new Timestamp( Long.parseLong((request.getParameter("dateOfBirth"))) ));
				studentDetailsBean.setTransport(request.getParameter("transportMode"));
				studentDetailsBean.setInterests(request.getParameter("interests"));
				
				// to user's update student details 
				nRtnRowsUpdated = studentDetailsManager.updateStudentDetails(con, studentDetailsBean, loginUserBean);
				//System.out.println("/updateStudentDetails <> nRtnRowsUpdated: "+nRtnRowsUpdated);

				// commit connection 
				DataBaseMaster.commitConnection(con);
				
				joRtn = UtilsFactory.getJSONSuccessReturn("Student details, "+nRtnRowsUpdated+" row(s) updated. ");
				
				studentDetailsManager = null;
			} catch(Exception e) {
				// exception occurs, to rollback inserted 
				DataBaseMaster.rollback(con);
				
				System.out.println("Exception in /updateStudentDetails: "+e.getMessage());
				e.printStackTrace();
				joRtn = UtilsFactory.getJSONFailureReturn("Unable to update students details. ");
			} finally {
				DataBaseMaster.close(con);
				con = null;
				
				response.getWriter().write(joRtn.toString());
			}
		} else if ( strAction.equals("/deleteRow") ) {
			// to delete row 
			Connection con = null;
			
			LoginUserBean loginUserBean = null;
			
			StudentDetailsManager studentDetailsManager = null;
			
			JSONObject joRtn = null;

			int nStudentId = 0, nRtnRowsDeleted = -1;
			
			try {
				studentDetailsManager = new StudentDetailsManager();
				
				con = DataBaseMaster.getConnectionAutoCommitFalse();
				
				loginUserBean = (LoginUserBean) session.getAttribute("loginUser");
				
				nStudentId = Integer.parseInt(request.getParameter("studentId"));
				
				//System.out.println("/deleteRow <> nStudentId: "+nStudentId);
				
				// to delete row 
				nRtnRowsDeleted = studentDetailsManager.deleteRow(con, nStudentId, loginUserBean);
				//System.out.println("/deleteRow <> nRtnRowsDeleted: "+nRtnRowsDeleted);
				
				// commit connection 
				DataBaseMaster.commitConnection(con);
				
				joRtn = UtilsFactory.getJSONSuccessReturn(nRtnRowsDeleted+" row(s) deleted.");
			} catch(Exception e) {
				// exception occurs, to rollback inserted 
				DataBaseMaster.rollback(con);
				
				System.out.println("Exception in /deleteRow: "+e.getMessage());
				e.printStackTrace();
				joRtn = UtilsFactory.getJSONFailureReturn("Unable to delete row. ");
			} finally {
				DataBaseMaster.close(con);
				con = null;
				
				response.getWriter().write(joRtn.toString());
			}
			
		} else if ( strAction.equals("/getStudentRecordHistoryDetails") ) {
			// to get student's record history details 
			Connection con = null;
			
			LoginUserBean loginUserBean = null;
			
			StudentDetailsManager studentDetailsManager = null;
			
			JSONObject joRtn = null, joResultStudentDetails = null;
			
			int nStudentId = 0;
			
			try {
				studentDetailsManager = new StudentDetailsManager();

				con = DataBaseMaster.getConnection();
				
				//System.out.println("/getStudentRecordHistoryDetails <> 111111");
				
				nStudentId = Integer.parseInt(request.getParameter("studentId"));
				
				loginUserBean = (LoginUserBean) session.getAttribute("loginUser");
				
				String strLimit = request.getParameter("limit");
				String strOffset = request.getParameter("offset");
				
				//System.out.println("nStudentId: "+nStudentId);
				
				// to get student's record history details 
				joResultStudentDetails = studentDetailsManager.getStudentRecordHistoryDetails(con, nStudentId, loginUserBean, strLimit, strOffset);
				
				joRtn = UtilsFactory.getJSONSuccessReturn(joResultStudentDetails);
				
				//System.out.println("joRtn: "+joRtn);
				
				studentDetailsManager = null;
			} catch(Exception e) {
				System.out.println("Exception in /getStudentRecordHistoryDetails: "+e.getMessage());
				e.printStackTrace();
				joRtn = UtilsFactory.getJSONFailureReturn("Unable to getStudentRecordHistoryDetails. ");
			} finally {
				DataBaseMaster.close(con);
				con = null;
				
				response.getWriter().write(joRtn.toString());
			}
		}	
	}
}
