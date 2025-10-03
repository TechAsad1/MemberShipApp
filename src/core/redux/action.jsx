import axios from "axios";
//import moment from "moment";
import config from "../../config";

export const product_list = () => ({ type: "Product_list" });
export const set_product_list = (payload) => ({
  type: "Product_list",
  payload,
});
export const dashboard_recentproduct = () => ({
  type: "Dashbaord_RecentProduct",
});
export const setdashboard_recentproduct = (payload) => ({
  type: "Dashbaord_RecentProduct",
  payload,
});
export const dashboard_expiredproduct = () => ({
  type: "Dashbaord_ExpiredProduct",
});
export const setdashboard_expiredproduct = (payload) => ({
  type: "Dashbaord_ExpiredProduct",
  payload,
});
export const saleshdashboard_recenttransaction = () => ({
  type: "Salesdashbaord_ExpiredProduct",
});
export const setsaleshdashboard_recenttransaction = (payload) => ({
  type: "Salesdashbaord_ExpiredProduct",
  payload,
});
export const brand_list = () => ({ type: "Brand_list" });
export const setbrand_list = (payload) => ({
  type: "Brand_list",
  payload,
});
export const unit_data = () => ({ type: "Unit_Data" });
export const setunit_data = (payload) => ({
  type: "Unit_Data",
  payload,
});
export const variantattributes_data = () => ({ type: "Variantattribute_Data" });
export const setvariantattributes_data = (payload) => ({
  type: "Variantattribute_Data",
  payload,
});
export const warranty_data = () => ({ type: "Warranty_Data" });
export const setwarranty_data = (payload) => ({
  type: "Warranty_Data",
  payload,
});
export const barcode_data = () => ({ type: "Barcode_Data" });
export const setbarcode_data = (payload) => ({
  type: "Barcode_Data",
  payload,
});
export const departmentlist_data = () => ({ type: "Department_Data" });
export const setdepartmentlist_data = (payload) => ({
  type: "Department_Data",
  payload,
});
export const designation_data = () => ({ type: "Designation_Data" });
export const setdesignation_data = (payload) => ({
  type: "Designation_Data",
  payload,
});
export const shiftlist_data = () => ({ type: "Shiftlist_Data" });
export const setshiftlist_data = (payload) => ({
  type: "Shiftlist_Data",
  payload,
});
export const attendenceemployee_data = () => ({
  type: "Attendenceemployee_Data",
});
export const setattendenceemployee_data = (payload) => ({
  type: "Attendenceemployee_Data",
  payload,
});
export const toogleHeader_data = () => ({ type: "toggle_header" });
export const setToogleHeader = (payload) => ({
  type: "toggle_header",
  payload,
});
export const invoicereport_data = () => ({ type: "Invoicereport_Data" });
export const setinvoicereport_data = (payload) => ({
  type: "Invoicereport_Data",
  payload,
});
export const salesreturns_data = () => ({ type: "Salesreturns_Data" });
export const setsalesreturns_data = (payload) => ({
  type: "Salesreturns_Data",
  payload,
});
export const quotationlist_data = () => ({ type: "Quatation_Data" });
export const setquotationlist_data = (payload) => ({
  type: "Quatation_Data",
  payload,
});
export const customer_data = () => ({ type: "customer_data" });
export const setcustomer_data = (payload) => ({
  type: "customer_data",
  payload,
});
export const userlist_data = () => ({ type: "Userlist_data" });
export const setuserlist_data = (payload) => ({
  type: "Userlist_data",
  payload,
});
export const rolesandpermission_data = () => ({
  type: "Rolesandpermission_data",
});
export const setrolesandpermission_data = (payload) => ({
  type: "Rolesandpermission_data",
  payload,
});
export const deleteaccount_data = () => ({ type: "Deleteaccount_data" });
export const setdeleteaccount_data = (payload) => ({
  type: "Deleteaccount_data",
  payload,
});
export const attendanceadmin_data = () => ({ type: "Attendenceadmin_data" });
export const setattendanceadmin_data = (payload) => ({
  type: "Attendenceadmin_data",
  payload,
});
export const leavesadmin_data = () => ({ type: "Leavesadmin_data" });
export const setleavesadmin_data = (payload) => ({
  type: "Leavesadmin_data",
  payload,
});
export const leavetypes_data = () => ({ type: "Leavestype_data" });
export const setleavetypes_data = (payload) => ({
  type: "Leavestype_data",
  payload,
});
export const holiday_data = () => ({ type: "Holiday_data" });
export const setholiday_data = (payload) => ({
  type: "Holiday_data",
  payload,
});
export const expiredproduct_data = () => ({ type: "Expiredproduct_data" });
export const setexpiredproduct_data = (payload) => ({
  type: "Expiredproduct_data",
  payload,
});
export const lowstock_data = () => ({ type: "Lowstock_data" });
export const setlowstock_data = (payload) => ({
  type: "Lowstock_data",
  payload,
});
export const categotylist_data = () => ({ type: "Categotylist_data" });
// export const setcategotylist_data = (payload) => ({
//   type: "Categotylist_data",
//   payload,
// });
export const setLayoutChange = (payload) => ({
  type: "Layoutstyle_data",
  payload,
});

export const FetchErr = "FetchErr";
export const FetchLoader = "FetchLoader";
//Institutes
const mainUrl = config.url;
const institutesUrl = mainUrl + "institutes";
export const getInstitutesVar = "InstitutesList";
export const getInstitutes = () => async (dispatch) => {
  dispatch({ type: FetchLoader });
  try {
    const response = await axios.get(institutesUrl);
    dispatch({ type: getInstitutesVar, payload: response.data });
  } catch (error) {
    dispatch({ type: FetchErr, payload: error.message });
  }
};
export const insertInstitutesVar = " insertInstitutes";
export const insertInstitutes = (x) => async (dispatch) => {
  try {
    const temp = { name: x.name, isActive: x.isActive };
    await axios.post(institutesUrl, temp).then((e) => {
      dispatch({ type: insertInstitutesVar, payload: e.data });
    });
  }
  catch (err) { console.log(err) }
};
export const updateInstitutesVar = "updateInstitutes";
export const updateInstitutes = (id, x) => async (dispatch) => {
  try {
    const temp = { name: x.name, isActive: x.isActive };
    await axios.put(institutesUrl + `/${id}`, temp).then((e) => {
      dispatch({ type: updateInstitutesVar, payload: e.data });
    })
  }
  catch (err) { console.log(err) }
};
export const deleteInstitutesVar = "deleteInstitutes";
export const deleteInstitutes = (id) => async (dispatch) => {
  try {
    await axios.delete(institutesUrl + `/${id}`).then(() => {
      dispatch({ type: deleteInstitutesVar, payload: id });
    });
  }
  catch (err) {
    console.log(err);
  }
};

//Member
const memberUrl = mainUrl + "Member";
export const getMemberVar = "MemberList";
export const getMember = () => async (dispatch) => {
  try {
    const rec = await axios.get(memberUrl);
    dispatch({ type: getMemberVar, payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertMemberVar = "InsertMember";
export const insertMember = (x) => async (dispatch) => {
  try {
    await axios.post(memberUrl, x).then((e) => {
      dispatch({ type: insertMemberVar, payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateMemberVar = "UpdateMember";
export const updateMember = (x) => async (dispatch) => {
  try {
    await axios.post(memberUrl, x).then((e) => {
      dispatch({ type: updateMemberVar, payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteMemberVar = "DeleteMember";
export const deleteMember = (id) => async (dispatch) => {
  try {
    await axios.delete(memberUrl + `/${id}`).then(() => {
      dispatch({ type: deleteMemberVar, payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//Family-Member
const familyMemberUrl = mainUrl + "FamilyMember";
export const getFamilyMemberVar = "FamilyMemberList";
export const getFamilyMember = () => async (dispatch) => {
  try {
    const rec = await axios.get(familyMemberUrl);
    dispatch({ type: getFamilyMemberVar, payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertFamilyMemberVar = "InsertFamilyMember";
export const insertFamilyMember = (x, id) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:5247/api/FamilyMember/${id}`, x).then((e) => {
      dispatch({ type: insertFamilyMemberVar, payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateFamilyMemberVar = "UpdateFamilyMember";
export const updateFamilyMember = (x) => async (dispatch) => {
  try {
    await axios.post(familyMemberUrl, x).then((e) => {
      dispatch({ type: updateFamilyMemberVar, payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteFamilyMemberVar = "DeleteFamilyMember";
export const deleteFamilyMember = (id) => async (dispatch) => {
  try {
    await axios.delete(familyMemberUrl + `/${id}`).then((e) => {
      dispatch({ type: deleteFamilyMemberVar, payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//Qualification
const qualificationUrl = mainUrl + "Qualification";
export const getQualificationVar = "QualificationList";
export const getQualification = () => async (dispatch) => {
  try {
    const rec = await axios.get(qualificationUrl);
    dispatch({ type: getQualificationVar, payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertQualificationVar = "InsertQualification";
export const insertQualification = (x) => async (dispatch) => {
  try {
    await axios.post(qualificationUrl, { qualificationName: x.name, isActive: x.isActive }).then((e) => {
      dispatch({ type: insertQualificationVar, payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateQualificationVar = "UpdateQualification";
export const updateQualification = (id, x) => async (dispatch) => {
  try {
    await axios.put(qualificationUrl + `/${id}`, { qualificationName: x.name, isActive: x.isActive }).then((e) => {
      dispatch({ type: updateQualificationVar, payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteQualificationVar = "DeleteQualification";
export const deleteQualification = (id) => async (dispatch) => {
  try {
    await axios.delete(qualificationUrl + `/${id}`).then(() => {
      dispatch({ type: deleteQualificationVar, payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//Area
const areaUrl = mainUrl + "Area";
export const getAreaVar = "AreaList";
export const getArea = () => async (dispatch) => {
  try {
    const rec = await axios.get(areaUrl);
    dispatch({ type: getAreaVar, payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertAreaVar = "InsertArea";
export const insertArea = (x) => async (dispatch) => {
  try {
    await axios.post(areaUrl, x).then((e) => {
      dispatch({ type: insertAreaVar, payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateAreaVar = "UpdateArea";
export const updateArea = (id, x) => async (dispatch) => {
  try {
    await axios.put(areaUrl + `/${id}`, { areaName: x.areaName, isActive: x.isActive }).then((e) => {
      dispatch({ type: updateAreaVar, payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteAreaUrlVar = "DeleteArea";
export const deleteArea = (id) => async (dispatch) => {
  try {
    await axios.delete(areaUrl + `/${id}`).then(() => {
      dispatch({ type: deleteAreaUrlVar, payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//Users
const userUrl = mainUrl + "User";
export const getUserVar = "UserList";
export const getUsers = () => async (dispatch) => {
  try {
    const rec = await axios.get(userUrl);
    dispatch({ type: getUserVar, payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertUserVar = "InsertUser";
export const insertUser = (x) => async (dispatch) => {
  try {
    await axios.post(userUrl, { createdBy: 1, username: x.username, email: x.email, password: x.password, isActive: x.isActive }).then((e) => {
      dispatch({ type: insertUserVar, payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateUserVar = "UpdateUser";
export const updateUser = (id, x) => async (dispatch) => {
  try {
    await axios.put(userUrl + `/${id}`, x).then((e) => {
      dispatch({ type: updateUserVar, payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteUserVar = "DeleteUser";
export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(userUrl + `/${id}`).then(() => {
      dispatch({ type: deleteUserVar, payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};






//InvID
export const invIDVar = "InvID";
export const setInvID = (val) => (dispatch) => {
  dispatch({ type: invIDVar, payload: val });
};



