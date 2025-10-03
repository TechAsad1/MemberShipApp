import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../Router/all_routes";
import {
    ArrowLeft,
    Calendar,
    ChevronDown,
    ChevronUp,
    Info,
} from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import { getArea, getInstitutes, getQualification, setToogleHeader } from "../../core/redux/action";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import withReactContent from 'sweetalert2-react-content';
import Swal from "sweetalert2";
import { DatePicker } from "antd";
import Select from "react-select";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import Webcam from "react-webcam";
import "./style.css"
import { IoCloseCircle } from "react-icons/io5";
import config from "../../config"

const AddNewMember = () => {
    const route = all_routes;
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const renderCollapseTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Collapse
        </Tooltip>
    );

    //Custom Code
    // const [userId, setUserId] = useState(0);
    const areas = useSelector((state) => state.area);
    const educations = useSelector((state) => state.qualification);
    const institutes = useSelector((state) => state.institutes);

    const [errors, setErrors] = useState({});

    const [areaList, setAreaList] = useState([{ value: 0, label: "Choose Area" }]);
    const [selectArea, setSelectArea] = useState(areaList[0]);

    const [educationList, setEducationList] = useState([]);
    const [selectEducation, setSelectEducation] = useState([{ value: 0, label: "Choose Option" }]);

    const [institutesList, setInstitutesList] = useState([]);
    const [selectInstitutes, setSelectInstitutes] = useState([{ value: 0, label: "Choose Option" }]);

    //HouseStatus
    const selectHouseStatusList = [
        { value: "Choose House Status", label: "Choose House Status" },
        { value: "Own", label: "Own" },
        { value: "Rental", label: "Rental" }
    ];
    const [selectHouseStatus, setSelectHouseStatus] = useState(selectHouseStatusList[0]);

    //MemberStatus
    const memberStatusList = [
        { value: "Choose Member Status", label: "Choose Member Status" },
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" }
    ];
    const [selectMemberStatus, setSelectMemberStatus] = useState(memberStatusList[1]);

    //Relation
    const relation = [
        { value: "Choose Option", label: "Choose Option" },
        { value: "Son", label: "Son" },
        { value: "Daughter", label: "Daughter" }
    ];
    const [selectRelation, setSelectRelation] = useState(relation[0]);
    //Source Of Income
    const sourceOfIncomeList = [
        { value: "Choose Option", label: "Choose Option" },
        { value: "Business", label: "Business" },
        { value: "Private Job", label: "Private Job" },
        { value: "Government Job", label: "Government Job" },
        { value: "Rental Income", label: "Rental Income" }
    ];
    const [selectSourceOfIncome, setSelectSourceOfIncome] = useState(sourceOfIncomeList[0]);

    const [familyErrors, setFamilyErrors] = useState({});
    //Ref
    const memberNameRef = useRef();
    const cNICNoRef = useRef();
    const fatherNameRef = useRef();
    const purminantAddressRef = useRef();

    useEffect(() => {
        dispatch(getArea());
        dispatch(getQualification());
        dispatch(getInstitutes());
    }, [dispatch]);
    //Areas
    useEffect(() => {
        setAreaList((prev) => [
            prev[0],
            ...areas.map((x) => ({
                value: x.areaId,
                label: x.areaName
            }))
        ]);
    }, [areas]);
    //Educations
    useEffect(() => {
        if (educations?.length) {
            setEducationList([
                { value: "", label: "Choose Option" },
                ...educations.map((x) => ({
                    value: x.qualificationId,
                    label: x.qualificationName
                }))
            ]);
        }
    }, [educations]);
    //Institiutes
    useEffect(() => {
        if (institutes?.length) {
            setInstitutesList([
                { value: "", label: "Choose Option" },
                ...institutes.map((x) => ({
                    value: x.id,
                    label: x.name
                }))
            ]);
        }
    }, [institutes]);
    //Image
    // const handleImage = (e) => {
    //     const file = e.target.files;
    //     if (file) {
    //         // Allowed image extensions
    //         const validExtensions = ["jpg", "jpeg", "png", "gif"];
    //         const fileExtension = file[0].name.split(".").pop().toLowerCase();
    //         if (!validExtensions.includes(fileExtension)) {
    //             errorAlert(null);
    //             return;
    //         }
    //         setIsImageChange(true);
    //         setImgFile(e.target.files[0]);
    //         setIsImageVisible(true);
    //         const reader = new FileReader();
    //         reader.onloadend = (r) => {
    //             setImage(r.target.result);
    //         };
    //         reader.readAsDataURL(e.target.files[0]);
    //     }
    // }
    const validate = () => {
        let tempErrors = {};
        if (formData.memberName === "") {
            tempErrors.membernameErr = "Member name required!";
            setErrors(tempErrors);
            memberNameRef.current.classList.add("is-invalid");
        }
        else {
            memberNameRef.current.classList.remove("is-invalid");
            setErrors({ ...errors, membernameErr: "", });
        }
        return Object.keys(tempErrors).length === 0;
    };
    const [formData, setFormData] = useState({
        createdBy: 1, imgPath: "", date: new Date(), memberName: "", cnicno: "", fatherName: "", surName: "", cellNo: "",
        oldCardNo: "",
        purminantAddress: "",
        currentAddress: "",
        houseStatus: "",
        areaId: 0,
        sourceOfIncome: "",
        qualificationId: 0,
        otherQualification: "",
        membersPicPath: "",
        membersBiometricPath: "",
        memberStatus: true,
        verifiedBy: 0,
        userID: 1,
        isContributor: false
    });
    //Submit
    const handleSubmit = async () => {
        if (validate()) {
            let path = "";
            const temp = {
                cnicno: formData.cnicno, memberName: formData.memberName, fatherName: formData.fatherName, surName: formData.surName, cellNo: formData.cellNo,
                memberDob: dOBDateState, oldCardNo: formData.oldCardNo, purminantAddress: formData.purminantAddress, currentAddress: formData.currentAddress,
                houseStatus: formData.houseStatus, areaId: formData.areaId, sourceOfIncome: formData.sourceOfIncome, qualificationId: formData.qualificationId,
                otherQualification: formData.otherQualification, membersPicPath: path, membersBiometricPath: formData.membersBiometricPath,
                memberStatus: formData.memberStatus, regdate: regDateState, verifiedBy: formData.verifiedBy, entryDate: regDateState, userId: formData.userID,
                isContributor: formData.isContributor,
                MembersPicPath: (imageList[0] != null) ? imageList[0] : null,
                MembersPicPath2: (imageList[1].length > 0) ? imageList[1] : null,
                MembersPicPath3: (imageList[2].length > 1) ? imageList[2] : null
            };
            const memberUrl = config.url + "Member";
            await axios.post(memberUrl, temp).then((e) => {
                const familyMemberUrl = config.url + `FamilyMember/${e.data}`;
                axios.post(familyMemberUrl, familyMemberList).then(() => {
                    successAlert(null);
                });
            });
        }
    };
    //PopUp
    const MySwal = withReactContent(Swal);
    const successAlert = () => {
        MySwal.fire({
            icon: "success",
            title: "Record updated successfully",
            confirmButtonText: "Ok",
        })
    };
    const handleEducation = (selected) => {
        setFormData({ ...formData, qualificationId: selected.value });
        setSelectEducation(educationList.find((x) => x.value === selected.value));
    };
    const handleInstitutes = (selected) => {
        setSelectInstitutes(institutesList.find((x) => x.value === selected.value));
    };
    const handleArea = (selected) => {
        setFormData({ ...formData, areaId: selected.value });
        setSelectArea(areaList.find((x) => x.value === selected.value));
    };
    const handleSourceOfIncome = (e) => {
        setFormData({ ...formData, sourceOfIncome: e.value });
        setSelectSourceOfIncome(sourceOfIncomeList.find((x) => x.value === e.value));
    }
    // const handleInstitutes = (selected) => {
    //     setFormData({ ...formData, institutes: selected.value });
    //     setSelectInstitutes(institutesList.find((x) => x.value === selected.value));
    // };
    const handleHouseStatus = (selected) => {
        setFormData({ ...formData, houseStatus: selected.value });
        setSelectHouseStatus(selected);
    };
    const handleMemberStatus = (selected) => {
        if (selected.value === "Active")
            setFormData({ ...formData, memberStatus: true });
        else
            setFormData({ ...formData, memberStatus: false });
        setSelectMemberStatus(selected);
    };
    const handleRelation = (selected) => {
        setSelectRelation(selected);
    };
    // const navigate = useNavigate();
    // const val = localStorage.getItem("userID");
    // useEffect(() => {
    //     if (!isNaN(val) && Number.isInteger(Number(val)) && Number(val) > 0) {
    //         const id = Number(val);
    //         setUserId(id);
    //     }
    //     else
    //         navigate(route.signin);
    // }, [navigate]);
    // if (userId === 0)
    //     return null;
    const [familyMemberList, setFamilyMemberList] = useState([]);
    //FamilyMember Ref
    const familyMemberNameRef = useRef();
    const ageRef = useRef();
    const allowEducationRef = useRef();
    const allowBookRef = useRef();

    const [regDateState, setRegDateState] = useState(new Date());
    const [dOBDateState, setDOBDateState] = useState(new Date());

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleDate = (e) => {
        if (e) {
            setRegDateState(e);
        }
    }
    const handleDateDOB = (e) => {
        if (e) {
            setDOBDateState(e);
        }
    }

    const handleFamilyMemberAdd = async () => {
        let tempErrors = {};
        if (!familyMemberNameRef.current.value.trim()) {
            tempErrors.familyMembernameErr = "Member name is required!";
            setFamilyErrors(tempErrors);
            return false;
        }
        else if (!selectRelation?.value || selectRelation.value === "Choose Option") {
            tempErrors.relationsErr = "Relation required!";
            setFamilyErrors(tempErrors);
            return false;
        }
        else if (!ageRef.current.value || ageRef.current.value <= 0) {
            tempErrors.ageErr = "Member age invalid!";
            setFamilyErrors(tempErrors);
            return false;
        }
        else {
            if (Object.keys(tempErrors).length > 0) return false;
            const newMember = {
                name: familyMemberNameRef.current.value,
                relation: selectRelation?.label || "",
                age: Number(ageRef.current.value),
                qualificationId: selectEducation?.value || "0",
                instituteId: selectInstitutes?.value || "0",
                educationAllw: allowEducationRef.current.checked,
                bookAllw: allowBookRef.current.checked,
            };
            if (isUpdateMode)
                setFamilyMemberList((prev) =>
                    prev.map((item, index) =>
                        index === indexNumber ? { ...item, ...newMember } : item
                    )
                );
            else
                setFamilyMemberList((prev) => [...prev, newMember]);
            setFamilyErrors({ ...familyErrors, familyMembernameErr: "", relationsErr: "", ageErr: "", institute: "" });
            familyMemberNameRef.current.value = "";
            ageRef.current.value = "0";
            await delay(500);
            handleRelation(relation[0]);
            handleEducation(educationList[0]);
            handleInstitutes(institutesList[0]);
            setIsUpdateMode(false);
            allowEducationRef.current.checked = false;
            allowBookRef.current.checked = false;
            return true;
        }
    };
    const handleFamilyMemberRemove = (index) => {
        familyMemberRemoveAlert(index);
    };
    const handleFamilyMemberEdit = (index) => {
        setIsUpdateMode(true);
        const row = familyMemberList.filter((_, i) => i === index);
        familyMemberNameRef.current.value = row[0].name;
        ageRef.current.value = row[0].age;
        handleRelation(relation.find((e) => e.value === row[0].relation));
        if (row[0].qualificationId > 0)
            handleEducation(educationList.find((e) => e.value === row[0].qualificationId));
        else
            handleEducation(educationList[0]);
        if (row[0].instituteId > 0)
            handleInstitutes(institutesList.find((e) => e.value === row[0].instituteId));
        else
            handleInstitutes(institutesList[0]);
        allowEducationRef.current.checked = row[0].educationAllw;
        allowBookRef.current.checked = row[0].bookAllw;
        setIndexNumber(index);
    };
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [indexNumber, setIndexNumber] = useState(0);
    const familyMemberRemoveAlert = (index) => {
        MySwal.fire({
            title: "Are you sure you want to delete this record ?",
            // text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#00ff00",
            confirmButtonText: "Yes, delete it!",
            cancelButtonColor: "#ff0000",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                const updated = familyMemberList.filter((_, i) => i !== index);
                setFamilyMemberList(updated);
            } else {
                MySwal.close();
            }
        });
    };

    const [imageList, setImageList] = useState([]);
    const webCamRef = useRef();
    const handleAddMemberPic = () => {
        if (imageList.length < 3) {
            const capture = webCamRef.current.getScreenshot();
            setImageList((e) => [...e, capture]);
        }
        else
            imgQtyAlert();
    }
    const imgQtyAlert = () => {
        MySwal.fire({
            icon: "error",
            title: "You cannot add images more then 3",
            confirmButtonText: "Ok",
        })
    };
    const handleRemoveMemberPic = (i) => {
        setImageList((e) => e.filter((_, a) => a != i));
    }
    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Update Member</h4>
                            {/* <h6>Create new Member</h6> */}
                        </div>
                    </div>
                    <ul className="table-top-head">
                        <li>
                            <div className="page-btn">
                                <Link to={route.viewMember} className="btn btn-secondary">
                                    <ArrowLeft className="me-2" />
                                    Back to Member
                                </Link>
                            </div>
                        </li>
                        <li>
                            <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                                <Link
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Collapse"
                                    id="collapse-header"
                                    className={data ? "active" : ""}
                                    onClick={() => {
                                        dispatch(setToogleHeader(!data));
                                    }}
                                >
                                    <ChevronUp className="feather-chevron-up" />
                                </Link>
                            </OverlayTrigger>
                        </li>
                    </ul>
                </div>
                {/* /add */}
                <div className="card">
                    <div className="card-body add-product pb-0">
                        <div
                            className="accordion-card-one accordion"
                            id="accordionExample"
                        >
                            <div className="accordion-item">
                                <div className="accordion-body">
                                    <div className="row">
                                        <div className="col-lg-9">

                                            <div className="row">
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3 add-product">
                                                        <label className="form-label">CNIC No#</label>
                                                        <input type="text" className="form-control" value={formData.cnicno} ref={cNICNoRef} onChange={(e) => setFormData({ ...formData, cnicno: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Manual Card#</label>
                                                        <input type="text" className="form-control" value={formData.oldCardNo} onChange={(e) => setFormData({ ...formData, oldCardNo: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Member Name</label>
                                                        <input type="text" className={"form-control " + (errors.membernameErr ? "is-invalid" : "")} value={formData.memberName} ref={memberNameRef} onChange={(e) => setFormData({ ...formData, memberName: e.target.value })} required />
                                                        {errors.membernameErr && <p style={{ "color": "#dc3545", "padding": "3px" }}>{errors.membernameErr}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3 add-product">
                                                        <label className="form-label">Father Name</label>
                                                        <input type="text" className="form-control" value={formData.fatherName} ref={fatherNameRef} onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Sur Name</label>
                                                        <input type="text" className="form-control" value={formData.surName} onChange={(e) => setFormData({ ...formData, surName: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Mobile Number#</label>
                                                        <input type="text" className="form-control" value={formData.cellNo} onChange={(e) => setFormData({ ...formData, cellNo: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3 add-product">
                                                        <label className="form-label">Perment Address</label>
                                                        <input type="text" className="form-control" ref={purminantAddressRef} value={formData.purminantAddress} onChange={(e) => setFormData({ ...formData, purminantAddress: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Current Address</label>
                                                        <input type="text" className="form-control" value={formData.currentAddress} onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">House Status</label>
                                                        <Select
                                                            classNamePrefix="react-select"
                                                            placeholder="Choose House Status"
                                                            options={selectHouseStatusList}
                                                            value={selectHouseStatus}
                                                            onChange={handleHouseStatus}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3 add-product">
                                                        <label className="form-label">Area</label>
                                                        <Select
                                                            classNamePrefix="react-select"
                                                            placeholder="Choose Area"
                                                            options={areaList}
                                                            value={selectArea}
                                                            onChange={handleArea}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Source Of Income</label>
                                                        <Select
                                                            classNamePrefix="react-select"
                                                            placeholder="Choose Source Of Income"
                                                            options={sourceOfIncomeList}
                                                            value={selectSourceOfIncome}
                                                            onChange={handleSourceOfIncome}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Education</label>
                                                        <Select
                                                            classNamePrefix="react-select"
                                                            placeholder="Choose Education"
                                                            options={educationList}
                                                            value={selectEducation}
                                                            onChange={handleEducation}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3 add-product">
                                                        <label className="form-label">Skills Qualification</label>
                                                        <input type="text" className="form-control" value={formData.otherQualification} onChange={(e) => setFormData({ ...formData, otherQualification: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Member Status</label>
                                                        <Select
                                                            classNamePrefix="react-select"
                                                            placeholder="Choose Member Status"
                                                            options={memberStatusList}
                                                            value={selectMemberStatus}
                                                            onChange={handleMemberStatus}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Is Contributor</label>
                                                        <input className="form-check-input" type="checkbox" onChange={(e) => setFormData({ ...formData, isContributor: e.target.checked })} id="check1" name="option1" value="something" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-body">
                                                <div className="row">
                                                    <div className="col-lg-6 col-sm-6 col-12">
                                                        <div className="input-blocks">
                                                            <label>Register Date</label>
                                                            <div className="input-groupicon calender-input">
                                                                <Calendar className="info-img" />
                                                                <DatePicker
                                                                    selected={regDateState}
                                                                    onChange={(date) => handleDate(date)}
                                                                    type="date"
                                                                    className="datetimepicker"
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholder={regDateState}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-sm-6 col-12">
                                                        <div className="input-blocks">
                                                            <label>Member Date Of Birth</label>
                                                            <div className="input-groupicon calender-input">
                                                                <Calendar className="info-img" />
                                                                <DatePicker
                                                                    selected={dOBDateState}
                                                                    onChange={(date) => handleDateDOB(date)}
                                                                    type="date"
                                                                    className="datetimepicker"
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholder={dOBDateState}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-lg-3 accordion-item">
                                            <div className="accordion-header" id="headingOne">
                                                <div
                                                    className="accordion-button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseOne"
                                                    aria-controls="collapseOne"
                                                >
                                                    <div className="addproduct-icon">
                                                        <h5>
                                                            <Info className="add-info" />
                                                            <span>Member Picture</span>
                                                        </h5>
                                                        <Link to="#">
                                                            <ChevronDown className="chevron-down-add" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                id="collapseOne"
                                                className="accordion-collapse collapse show"
                                                aria-labelledby="headingOne"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">

                                                    <div className="row">
                                                        <div className="col-12">
                                                            <Webcam width="170px" height="170px" ref={webCamRef} screenshotFormat="image/jpeg" />

                                                            <div className="row">
                                                                <div className="col-10">
                                                                    <button className="btn rounded primaryBtn" onClick={handleAddMemberPic}>Capture</button>
                                                                </div>
                                                                {/* {WebCamImage && (
                                                                        <img src={WebCamImage} width={100} height={100} />
                                                                    )} */}
                                                            </div>

                                                            {/* <div className="new-employee-field">
                                                                    <div className="input-blocks mb-0">
                                                                        <div className="image-upload mb-0">
                                                                            <input type="file" accept="image/*" onChange={handleImage} />
                                                                            <div className="image-uploads">
                                                                                <h4>Capture</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                                        </div>
                                                        <div className="col-12 d-flex" style={{ marginTop: "5px" }}>

                                                            {imageList.map((i, index) => (
                                                                <div className="imgBlock rounded" key={index}>
                                                                    <IoCloseCircle className="remove-product-icon" onClick={() => handleRemoveMemberPic(index)} />
                                                                    <img src={i} width={100} height={100} />
                                                                </div>
                                                                // <div className="new-employee-field">
                                                                //     <div className="profile-pic-upload mb-2">
                                                                //         <div className="profile-pic" ref={picRef}>
                                                                //             {!isImageVisible && <span>
                                                                //                 <PlusCircle className="plus-down-add" />
                                                                //                 Member Picture
                                                                //             </span>}
                                                                //             {isImageVisible && <Link to="#" style={{ position: "absolute", top: "7px", right: "7px" }}>
                                                                //                 <X className="x-square-add remove-product" onClick={handleRemoveProduct} />
                                                                //             </Link>}
                                                                //         </div>
                                                                //     </div>
                                                                // </div>
                                                            ))}




                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <label className="form-label">Family Member</label>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Family Member Name</th>
                                                <th>Relation</th>
                                                <th>Age</th>
                                                <th>Education</th>
                                                <th>Institute</th>
                                                <th>AllowEducation</th>
                                                <th>AllowBook</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {familyMemberList.map((i, index) => (
                                                <tr key={index}>
                                                    <td>{i.name}</td>
                                                    <td>{i.relation}</td>
                                                    <td>{i.age}</td>
                                                    <td>{educationList.find((e) => e.value === i.qualificationId)?.label || ""}</td>
                                                    <td>{institutesList.find((e) => e.value === i.instituteId)?.label || ""}</td>
                                                    <td>
                                                        {i.educationAllw ? (<><FaCheck /> Yes</>
                                                        ) : (<><IoClose /> No</>)}
                                                    </td>
                                                    <td>
                                                        {i.bookAllw ? (<><FaCheck /> Yes</>
                                                        ) : (<><IoClose /> No</>)}
                                                    </td>
                                                    <td>
                                                        <h3>
                                                            <RiEdit2Fill onClick={() => handleFamilyMemberEdit(index)} style={{ "margin-right": "10px", "cursor": "pointer" }} />
                                                            <MdDeleteForever onClick={() => handleFamilyMemberRemove(index)} style={{ "cursor": "pointer" }} />
                                                        </h3>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="d-flex border-top m-0 p-2 rounded row">
                                        <div className="col-lg-2 col-sm-4 col-12 flex-fill">
                                            <label className="form-label">Family Member Name</label>
                                            <input type="text" className={'form-control ${familyErrors.familyMembernameErr?"is-invalid":""}'} ref={familyMemberNameRef} placeholder="family member name"></input>
                                            {familyErrors.familyMembernameErr && <p style={{ "color": "#dc3545", "padding": "3px" }}>Member name required!</p>}
                                        </div>
                                        <div className="col-lg-2 col-sm-4 col-12 flex-fill">
                                            <label className="form-label">Relation</label>
                                            <Select
                                                classNamePrefix="react-select"
                                                placeholder="Choose Option"
                                                options={relation}
                                                value={selectRelation}
                                                onChange={handleRelation}
                                            />
                                            {familyErrors.relationsErr && <p style={{ "color": "#dc3545", "padding": "3px" }}>Relation required!</p>}
                                        </div>
                                        <div className="col-lg-2 col-sm-4 col-12 flex-fill">
                                            <label className="form-label">Age</label>
                                            <input type="text" className="form-control" ref={ageRef} defaultValue={0}></input>
                                            {familyErrors.ageErr && <p style={{ "color": "#dc3545", "padding": "3px" }}>Member age required!</p>}
                                        </div>
                                        <div className="col-lg-2 col-sm-4 col-12 flex-fill">
                                            <label className="form-label">Education</label>
                                            <Select
                                                classNamePrefix="react-select"
                                                placeholder="Choose Option"
                                                options={educationList}
                                                value={selectEducation}
                                                onChange={handleEducation}
                                            />
                                        </div>
                                        <div className="col-lg-2 col-sm-4 col-12 flex-fill">
                                            <label className="form-label">Institute</label>
                                            <Select
                                                classNamePrefix="react-select"
                                                placeholder="Choose Option"
                                                options={institutesList}
                                                value={selectInstitutes}
                                                onChange={handleInstitutes}
                                            />
                                        </div>
                                        <div className="col-lg-2 col-sm-6 col-12 row flex-fill" style={{ paddingTop: "20px", paddingLeft: "15px" }}>
                                            <div className="col-lg-8 col-sm-6 col-12">
                                                <div className="col-12 flex-fill">
                                                    <label className="form-label">Education allow</label>
                                                    <input className="form-check-input" type="checkbox" ref={allowEducationRef} style={{ marginLeft: "5px", "cursor": "pointer" }} />
                                                </div>
                                                <div className="col-12 flex-fill">
                                                    <label className="form-label">Book Allow</label>
                                                    <input className="form-check-input" type="checkbox" ref={allowBookRef} style={{ marginLeft: "5px", "cursor": "pointer" }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12 flex-fill d-flex align-items-center">
                                                <h3>
                                                    <button type="button" className="btn" onClick={handleFamilyMemberAdd} style={{ background: "#092C4C", color: "white", cursor: "pointer" }}>
                                                        {isUpdateMode ? (
                                                            <>
                                                                Update
                                                            </>) :
                                                            (<>
                                                                Add
                                                            </>)
                                                        }
                                                    </button>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="btn-addproduct mb-4">
                        <button type="button" className="btn btn-cancel me-2">Cancel</button>
                        <button type="submit" className="btn btn-submit" onClick={handleSubmit}>Insert</button>
                    </div>
                </div>
                {/* /add */}
            </div>
        </div>
    );
};

export default AddNewMember;



// invoice_line_ids.sale_line_ids.order_id.x_studio_final_destination_2

// for record in self:
//     record['x_studio_final_destinations'] = record.invoice_line_ids.mapped('sale_line_ids').mapped('order_id').x_studio_final_destinations_2