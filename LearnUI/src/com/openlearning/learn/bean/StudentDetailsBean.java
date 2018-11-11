package com.openlearning.learn.bean;

import java.sql.Timestamp;

import net.sf.json.JSONObject;

public class StudentDetailsBean {
	
	// Student details's TABLE Bean 
	
	private int nStudentId;	// Note: primitive dataType to add, of NOT NULL column 
	private int nUserId;
	private String strFirstName;
	private String strLastName;
	private String strFatherName;
	private String strMotherName;
	private String strAddress;
	private String strEmailId;
	private Timestamp tsEmailVerifiedOn;
	private String strPhoneNumber;
	private String strNationality;
	private Timestamp tsDateOfBirth;
	private String strTransport;
	private String strInterests;
	private int nCreatedBy;
	private Timestamp tsCreatedOn;
	private Integer nModifiedBy;	// Note: column has `null`, so datatype class, to adds tries 
	private Timestamp tsModifiedOn;
	
	// TODO: fromJSON, toJSON to add, of grid, edit form keys same to add
	
	
	public int getStudentId() {
		return nStudentId;
	}
	public void setStudentId(int nStudentId) {
		this.nStudentId = nStudentId;
	}
	
	public int getUserId() {
		return nUserId;
	}
	public void setUserId(int nUserId) {
		this.nUserId = nUserId;
	}
	
	public String getFirstName() {
		return strFirstName;
	}
	public void setFirstName(String strFirstName) {
		this.strFirstName = strFirstName;
	}
	
	public String getLastName() {
		return strLastName;
	}
	public void setLastName(String strLastName) {
		this.strLastName = strLastName;
	}
	
	public String getFatherName() {
		return strFatherName;
	}
	public void setFatherName(String strFatherName) {
		this.strFatherName = strFatherName;
	}
	
	public String getMotherName() {
		return strMotherName;
	}
	public void setMotherName(String strMotherName) {
		this.strMotherName = strMotherName;
	}
	
	public String getAddress() {
		return strAddress;
	}
	public void setAddress(String strAddress) {
		this.strAddress = strAddress;
	}
	
	public String getEmailId() {
		return strEmailId;
	}
	public void setEmailId(String strEmailId) {
		this.strEmailId = strEmailId;
	}
	
	public Timestamp getEmailVerifiedOn() {
		return tsEmailVerifiedOn;
	}
	public void setEmailVerifiedOn(Timestamp tsEmailVerifiedOn) {
		this.tsEmailVerifiedOn = tsEmailVerifiedOn;
	}
	
	public String getPhoneNumber() {
		return strPhoneNumber;
	}
	public void setPhoneNumber(String strPhoneNumber) {
		this.strPhoneNumber = strPhoneNumber;
	}
	
	public String getNationality() {
		return strNationality;
	}
	public void setNationality(String strNationality) {
		this.strNationality = strNationality;
	}
	
	public Timestamp getDateOfBirth() {
		return tsDateOfBirth;
	}
	public void setDateOfBirth(Timestamp tsDateOfBirth) {
		this.tsDateOfBirth = tsDateOfBirth;
	}
	
	public String getTransport() {
		return strTransport;
	}
	public void setTransport(String strTransport) {
		this.strTransport = strTransport;
	}
	
	public String getInterests() {
		return strInterests;
	}
	public void setInterests(String strInterests) {
		this.strInterests = strInterests;
	}
	
	public int getCreatedBy() {
		return nCreatedBy;
	}
	public void setCreatedBy(int nCreatedBy) {
		this.nCreatedBy = nCreatedBy;
	}
	
	public Timestamp getCreatedOn() {
		return tsCreatedOn;
	}
	public void setCreatedOn(Timestamp tsCreatedOn) {
		this.tsCreatedOn = tsCreatedOn;
	}
	
	public Integer getModifiedBy() {
		return nModifiedBy;
	}
	public void setModifiedBy(Integer nModifiedBy) {
		this.nModifiedBy = nModifiedBy;
	}
	
	public Timestamp getModifiedOn() {
		return tsModifiedOn;
	}
	public void setModifiedOn(Timestamp tsModifiedOn) {
		this.tsModifiedOn = tsModifiedOn;
	}
	
	// TODO: fromJSON, toJSON, toString value set, to chekcing, 
	
	/**
	 * from JSON to set in Bean 
	 *  
	 * @param joStudentDetails
	 */
	public void fromJSON(JSONObject joStudentDetails) {
		this.nStudentId = joStudentDetails.getInt("studentId");
		this.nUserId = joStudentDetails.getInt("userId");
		this.strFirstName = joStudentDetails.getString("firstName");
		this.strLastName = joStudentDetails.getString("lastName");
		this.strFatherName = joStudentDetails.getString("fatherName");
		this.strMotherName = joStudentDetails.getString("motherName");
		this.strAddress = joStudentDetails.getString("address");
		this.strEmailId = joStudentDetails.getString("emailId");
		this.tsEmailVerifiedOn = (! joStudentDetails.has("emailVerifiedOnMillis") ? null : new Timestamp(joStudentDetails.getLong("emailVerifiedOnMillis")));
		this.strPhoneNumber = joStudentDetails.getString("phoneNumber");
		this.strNationality = joStudentDetails.getString("nationality");
		this.tsDateOfBirth = new Timestamp(joStudentDetails.getLong("dateOfBirthMillis"));
		this.strTransport = joStudentDetails.getString("transport");
		this.strInterests = joStudentDetails.getString("interests");
		this.nCreatedBy = joStudentDetails.getInt("createdBy");
		this.tsCreatedOn = new Timestamp(joStudentDetails.getLong("createdOnMillis"));
		this.nModifiedBy = joStudentDetails.getInt("modifiedBy");	// Note: column has `null`, so datatype class, adds tries 
		this.tsModifiedOn = (! joStudentDetails.has("modifiedOnMillis") ? null : new Timestamp(joStudentDetails.getLong("modifiedOnMillis")));
	}
	
	/**
	 * to return JSON 
	 * 
	 * @return
	 */
	public JSONObject toJSON() {
		JSONObject joStudentDetails = new JSONObject();
		
		joStudentDetails.put("studentId", this.nStudentId);
		joStudentDetails.put("userId", this.nUserId);
		joStudentDetails.put("firstName", this.strFirstName);
		joStudentDetails.put("lastName", this.strLastName);
		joStudentDetails.put("fatherName", this.strFatherName);
		joStudentDetails.put("motherName", this.strMotherName);
		joStudentDetails.put("address", this.strAddress);
		joStudentDetails.put("emailId", this.strEmailId);
		joStudentDetails.put("emailVerifiedOnMillis", (this.tsEmailVerifiedOn == null ? null : this.tsEmailVerifiedOn.getTime()));
		joStudentDetails.put("phoneNumber", this.strPhoneNumber);
		joStudentDetails.put("nationality", this.strNationality);
		joStudentDetails.put("dateOfBirthMillis", this.tsDateOfBirth.getTime());
		joStudentDetails.put("transport", this.strTransport);
		joStudentDetails.put("interests", this.strInterests);
		joStudentDetails.put("createdBy", this.nCreatedBy);
		joStudentDetails.put("createdOnMillis", this.tsCreatedOn.getTime());
		joStudentDetails.put("modifiedBy", this.nModifiedBy);
		joStudentDetails.put("modifiedOnMillis", (this.tsModifiedOn == null ? null : this.tsModifiedOn.getTime()));
		
		return joStudentDetails;
	}
	
	/**
	 * to return JSON value in string 
	 * 
	 * @return
	 */
	public String toJSONString() {
		JSONObject joStudentDetails = null;
		
		joStudentDetails = this.toJSON();
		
		return joStudentDetails.toString();
	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		//return super.toString();
		
		StringBuilder sbStudentDetails = new StringBuilder();
		
		sbStudentDetails.append("[studentId=").append(this.nStudentId).append(", ")
						.append("userId=").append(this.nUserId).append(", ")
						.append("firstName=").append(this.strFirstName).append(", ")
						.append("lastName=").append(this.strLastName).append(", ")
						.append("fatherName=").append(this.strFatherName).append(", ")
						.append("motherName=").append(this.strMotherName).append(", ")
						.append("address=").append(this.strAddress).append(", ")
						.append("emailId=").append(this.strEmailId).append(", ")
						.append("emailVerifiedOn=").append(this.tsEmailVerifiedOn).append(", ")
						.append("emailVerifiedOnMillis=").append((this.tsEmailVerifiedOn == null ? null : this.tsEmailVerifiedOn.getTime())).append(", ")
						.append("phoneNumber=").append(this.strPhoneNumber).append(", ")
						.append("nationality=").append(this.strNationality).append(", ")
						.append("dateOfBirth=").append(this.tsDateOfBirth).append(", ")
						.append("dateOfBirthMillis=").append(this.tsDateOfBirth.getTime()).append(", ")
						.append("transport=").append(this.strTransport).append(", ")
						.append("interests=").append(this.strInterests).append(", ")
						.append("createdBy=").append(this.nCreatedBy).append(", ")
						.append("createdOn=").append(this.tsCreatedOn).append(", ")
						.append("createdOnMillis=").append((this.tsCreatedOn == null ? null : this.tsCreatedOn.getTime())).append(", ")	// before insert value prints, error occurs, so adds tries 
						.append("modifiedBy=").append(this.nModifiedBy).append(", ")
						.append("modifiedOn=").append(this.tsModifiedOn).append(", ")
						.append("modifiedOnMillis=").append((this.tsModifiedOn == null ? null : this.tsModifiedOn.getTime())).append("]");
		
		return sbStudentDetails.toString();
	}
}
