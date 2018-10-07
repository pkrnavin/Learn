package com.openlearning.learn.bean;

import java.sql.Timestamp;

import net.sf.json.JSONObject;

public class LoginUserBean {
	
	
	private int nUserId;
	private String strUserName;
	private String strFullName;
	private int nCreatedBy;
	private Timestamp tsCreatedOn;
	private Integer nModifiedBy;	// Note: follows, of column has `null`, of `int` datatype default `0` returns, thinks, so datatype's wrapper class to set to adds; 
	private Timestamp tsModifiedOn;

	
	public int getUserId() {
		return nUserId;
	}
	public void setUserId(int nUserId) {
		this.nUserId = nUserId;
	}
	
	public String getUserName() {
		return strUserName;
	}
	public void setUserName(String strUserName) {
		this.strUserName = strUserName;
	}
	
	public String getFullName() {
		return strFullName;
	}
	public void setFullName(String strFullName) {
		this.strFullName = strFullName;
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
	
	
	
	// TODO: below to checking 
	
	/* LoginUserBean below to chcecking, 
	 * - respective variable value sets, from 
	 *     - database ResultSet sets 
	 *     - fromJSON sets 
	 * - toJSON returns 
	 * - toString 
	 * - `modified_on` of below 
	 *     - value available 
	 *     - value `NULL` 
	 */
	
	/**
	 * from JSON, to set the values in the bean 
	 * 
	 * @param joLoginUser
	 */
	public void fromJSON(JSONObject joLoginUser) {
		this.nUserId = joLoginUser.getInt("userId");
		this.strUserName = joLoginUser.getString("userName");
		this.strFullName = joLoginUser.getString("fullName");
		this.nCreatedBy = joLoginUser.getInt("createdBy");
		//System.out.println("fromJSON <> Timestamp <> createdOn: "+new Timestamp(joLoginUser.getLong("createdOnMillis")));
		this.tsCreatedOn = new Timestamp(joLoginUser.getLong("createdOnMillis"));
		this.nModifiedBy = joLoginUser.getInt("modifiedBy");
		//System.out.println("fromJSON <> has modifiedOnMillis: "+joLoginUser.has("modifiedOnMillis"));
		this.tsModifiedOn = (! joLoginUser.has("modifiedOnMillis") ? null : new Timestamp(joLoginUser.getLong("modifiedOnMillis")));
	}
	
	
	/**
	 * to return JSON 
	 * 
	 * @return
	 */
	public JSONObject toJSON() {
		JSONObject joLoginUser = new JSONObject();
		
		joLoginUser.put("userId", this.nUserId);
		joLoginUser.put("userName", this.strUserName);
		joLoginUser.put("fullName", this.strFullName);
		joLoginUser.put("createdBy", this.nCreatedBy);
		//joLoginUser.put("createdOn", this.tsCreatedOn);	// commented, Timestamp in JSONObject returns 
		joLoginUser.put("createdOnMillis", this.tsCreatedOn.getTime());
		joLoginUser.put("modifiedBy", this.nModifiedBy);
		//joLoginUser.put("modifiedOn", this.tsModifiedOn);
		joLoginUser.put("modifiedOnMillis", (this.tsModifiedOn == null ? null : this.tsModifiedOn.getTime()));
		
		return joLoginUser;
	}
	
	/**
	 * to return JSON value in string 
	 * 
	 * @return
	 */
	public String toJSONString() {
		JSONObject joLoginUser = null;
		
		joLoginUser = this.toJSON();
		
		return joLoginUser.toString();
	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		StringBuilder sbLoginUser = new StringBuilder();
		
		// Note: of `modified_by` `NULL` in column, ResultSet get returns `0`, 
		
		sbLoginUser	.append("[userId=").append(this.nUserId).append(", ")
					.append("userName=").append(this.strUserName).append(", ")
					.append("fullName=").append(this.strFullName).append(", ")
					.append("createdBy=").append(this.nCreatedBy).append(", ")
					.append("createdOn=").append(this.tsCreatedOn).append(", ")
					.append("createdOnMillis=").append(this.tsCreatedOn.getTime()).append(", ")
					.append("modifiedBy=").append(this.nModifiedBy).append(", ")
					.append("modifiedOn=").append(this.tsModifiedOn).append(", ")
					.append("modifiedOnMillis=").append((this.tsModifiedOn == null ? null : this.tsModifiedOn.getTime())).append("]");
		
		return sbLoginUser.toString();
	}
}
