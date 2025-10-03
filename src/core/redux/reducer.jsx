import { FetchLoader, FetchErr, invIDVar, getInstitutesVar, insertInstitutesVar, updateInstitutesVar, getAreaVar, updateAreaVar, deleteAreaUrlVar, insertAreaVar, getMemberVar, insertMemberVar, updateMemberVar, deleteMemberVar, getQualificationVar, insertQualificationVar, updateQualificationVar, deleteQualificationVar, deleteInstitutesVar, getUserVar, insertUserVar, updateUserVar, deleteUserVar, getFamilyMemberVar, insertFamilyMemberVar, updateFamilyMemberVar, deleteFamilyMemberVar } from "./action";
import initialState from "./initial.value";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    //Institutes
    case getInstitutesVar:
      return { ...state, institutes: action.payload };
    case insertInstitutesVar:
      return { ...state, institutes: [...state.institutes, action.payload] };
    case updateInstitutesVar:
      return {
        ...state,
        institutes: state.institutes.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case deleteInstitutesVar:
      return { ...state, institutes: state.institutes.filter((x) => x.id !== action.payload) };
    //Area
    case getAreaVar:
      return { ...state, area: action.payload };
    case insertAreaVar:
      return { ...state, area: [...state.area, action.payload] };
    case updateAreaVar:
      return { ...state, area: state.area.map((x) => x.areaId === action.payload.areaId ? action.payload : x) };
    case deleteAreaUrlVar:
      return { ...state, area: state.area.filter((x) => x.areaId !== action.payload) };
    //Qualification
    case getQualificationVar:
      return { ...state, qualification: action.payload };
    case insertQualificationVar:
      return { ...state, qualification: [...state.qualification, action.payload] };
    case updateQualificationVar:
      return { ...state, qualification: state.qualification.map((x) => x.qualificationId === action.payload.qualificationId ? action.payload : x) };
    case deleteQualificationVar:
      return { ...state, qualification: state.qualification.filter((x) => x.qualificationId !== action.payload) };
    //Member
    case getMemberVar:
      return { ...state, member: action.payload };
    case insertMemberVar:
      return { ...state, member: [...state.member, action.payload] };
    case updateMemberVar:
      return { ...state, member: state.member.map((x) => x.memberId === action.payload.memberId ? action.payload : x) };
    case deleteMemberVar:
      return { ...state, member: state.member.filter((x) => x.memberId !== action.payload) };
    //Family Member
    case getFamilyMemberVar:
      return { ...state, familyMember: action.payload };
    case insertFamilyMemberVar:
      return { ...state, familyMember: [...state.familyMember, action.payload] };
    case updateFamilyMemberVar:
      return { ...state, familyMember: state.familyMember.map((x) => x.id === action.payload.id ? action.payload : x) };
    case deleteFamilyMemberVar:
      return { ...state, familyMember: state.familyMember.filter((x) => x.id !== action.payload) };
    //Area
    case getUserVar:
      return { ...state, users: action.payload };
    case insertUserVar:
      return { ...state, users: [...state.users, action.payload] };
    case updateUserVar:
      return { ...state, users: state.users.map((x) => x.id === action.payload.id ? action.payload : x) };
    case deleteUserVar:
      return { ...state, users: state.users.filter((x) => x.id !== action.payload) };
    //InvID
    case invIDVar:
      return { ...state, invID: action.payload };


    case FetchErr:
      return { ...state, error: action.payload };
    case FetchLoader:
      return { ...state, loading: true, error: null };
    case "Product_list":
      return { ...state, product_list: action.payload };
    case "Dashbaord_RecentProduct":
      return { ...state, dashboard_recentproduct: action.payload };
    case "Dashbaord_ExpiredProduct":
      return { ...state, dashboard_expiredproduct: action.payload };
    case "Salesdashbaord_ExpiredProduct":
      return { ...state, saleshdashboard_recenttransaction: action.payload };
    case "Brand_list":
      return { ...state, brand_list: action.payload };

    case "Unit_Data":
      return { ...state, unit_data: action.payload };
    case "Variantattribute_Data":
      return { ...state, variantattributes_data: action.payload };
    case "Warranty_Data":
      return { ...state, warranty_data: action.payload };
    case "Barcode_Data":
      return { ...state, barcode_data: action.payload };
    case "Department_Data":
      return { ...state, departmentlist_data: action.payload };
    case "Designation_Data":
      return { ...state, designation_data: action.payload };
    case "Shiftlist_Data":
      return { ...state, shiftlist_data: action.payload };
    case "Attendenceemployee_Data":
      return { ...state, attendenceemployee_data: action.payload };
    case "toggle_header":
      return { ...state, toggle_header: action.payload };
    case "Invoicereport_Data":
      return { ...state, invoicereport_data: action.payload };
    case "Salesreturns_Data":
      return { ...state, salesreturns_data: action.payload };
    case "Quatation_Data":
      return { ...state, quotationlist_data: action.payload };
    case "customer_data":
      return { ...state, customerdata: action.payload };
    case "Userlist_data":
      return { ...state, userlist_data: action.payload };
    case "Rolesandpermission_data":
      return { ...state, rolesandpermission_data: action.payload };
    case "Deleteaccount_data":
      return { ...state, deleteaccount_data: action.payload };
    case "Attendenceadmin_data":
      return { ...state, attendanceadmin_data: action.payload };
    case "Leavesadmin_data":
      return { ...state, leavesadmin_data: action.payload };
    case "Leavestype_data":
      return { ...state, leavetypes_data: action.payload };
    case "Holiday_data":
      return { ...state, holiday_data: action.payload };
    case "Expiredproduct_data":
      return { ...state, expiredproduct_data: action.payload };
    case "Lowstock_data":
      return { ...state, lowstock_data: action.payload };
    case "Categotylist_data":
      return { ...state, categotylist_data: action.payload };
    case "Layoutstyle_data":
      return { ...state, layoutstyledata: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
