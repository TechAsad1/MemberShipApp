import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { all_routes } from "../../Router/all_routes";
import {
    ArrowLeft,
    Calendar,
    ChevronUp,
    ChevronDown,
    Info,
} from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import { getArea, getFamilyMember, getInstitutes, getMember, getQualification, setToogleHeader } from "../../core/redux/action";
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
import { IoCloseCircle } from "react-icons/io5";
import config from "../../config"
import { getImageFromUrl } from "../../helper/helpers";
import webcam from "../../images/webcam.png";

const EditNewMember = () => {
    const route = all_routes;
    const dispatch = useDispatch();
    const data = useSelector((state) => state.toggle_header);
    const renderCollapseTooltip = (props) => (
        <Tooltip id="refresh-tooltip" {...props}>
            Collapse
        </Tooltip>
    );

    //Custom Code
    const areas = useSelector((state) => state.area);
    const educations = useSelector((state) => state.qualification);
    const members = useSelector((state) => state.member);
    const familyMembers = useSelector((state) => state.familyMember);
    const institutes = useSelector((state) => state.institutes);

    const [errors, setErrors] = useState({});

    const [areaList, setAreaList] = useState([{ value: 0, label: "Choose Area" }]);
    const [selectArea, setSelectArea] = useState(areaList[0]);

    const [educationList, setEducationList] = useState([]);
    const [selectEducation, setSelectEducation] = useState([{ value: 0, label: "Choose Option" }]);
    const [selectFamilyEducation, setSelectFamilyEducation] = useState([{ value: 0, label: "Choose Option" }]);

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
    const [selectMemberStatus, setSelectMemberStatus] = useState(memberStatusList[0]);

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
        dispatch(getMember());
        dispatch(getFamilyMember());
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

    const { id } = useParams();
    const memberId = parseInt(id, 10);

    useEffect(() => {
        if (members.length > 0) {
            const x = members.find((e) => e.memberId === memberId);
            if (x) {
                if (x.regdate)
                    setRegDateState(x.regdate);
                if (x.memberDob)
                    setDOBDateState(x.memberDob);
                setFormData({
                    ...formData, memberName: x.memberName, cnicno: x.cnicno, fatherName: x.fatherName, surName: x.surName, cellNo: x.cellNo,
                    oldCardNo: x.oldCardNo, purminantAddress: x.purminantAddress, currentAddress: x.currentAddress, houseStatus: x.houseStatus, areaId: x.areaId, sourceOfIncome: x.sourceOfIncome,
                    qualificationId: x.qualificationId, otherQualification: x.otherQualification, membersBiometricPath: x.membersBiometricPath,
                    memberStatus: x.memberStatus, verifiedBy: x.verifiedBy, userID: x.userID, isContributor: x.isContributor,
                    membersPicPath: x.membersPicPath,
                    membersPicPath2: x.membersPicPath2,
                    membersPicPath3: x.membersPicPath3
                });
                setImageList([]);
                if (x.membersPicPath && x.membersPicPath != "")
                    setImageList((e) => [...e, x.membersPicPath]);
                if (x.membersPicPath2 && x.membersPicPath2 != "")
                    setImageList((e) => [...e, x.membersPicPath2]);
                if (x.membersPicPath3 && x.membersPicPath3 != "")
                    setImageList((e) => [...e, x.membersPicPath3]);
                isContributorRef.current.checked = x.isContributor;
                setSelectSourceOfIncome(sourceOfIncomeList.find((i) => i.value === x.sourceOfIncome));
                setSelectArea(areaList.find((i) => i.value === x.areaId));
                setSelectHouseStatus(selectHouseStatusList.find((i) => i.value === x.houseStatus));
                setSelectEducation(educationList.find((i) => i.value === x.qualificationId));
                if (x.memberStatus)
                    setSelectMemberStatus(memberStatusList.find((i) => i.value === "Active"));
                else
                    setSelectMemberStatus(memberStatusList.find((i) => i.value === "Inactive"));
            }
        }
    }, [members, educationList, memberId]);
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
        memberStatus: "",
        verifiedBy: 1,
        userID: 1,
        isContributor: false
    });
    //Submit
    const handleSubmit = async () => {
        if (validate()) {
            const temp = {
                cnicno: formData.cnicno, memberName: formData.memberName, fatherName: formData.fatherName, surName: formData.surName, cellNo: formData.cellNo,
                memberDob: dOBDateState, oldCardNo: formData.oldCardNo, purminantAddress: formData.purminantAddress, currentAddress: formData.currentAddress,
                houseStatus: formData.houseStatus, areaId: formData.areaId, sourceOfIncome: formData.sourceOfIncome, qualificationId: formData.qualificationId,
                otherQualification: formData.otherQualification, membersBiometricPath: formData.membersBiometricPath,
                memberStatus: formData.memberStatus, regdate: regDateState, verifiedBy: formData.verifiedBy, entryDate: regDateState, userId: formData.userID,
                isContributor: formData.isContributor,
                MembersPicPath: (imageList[0] != null) ? imageList[0] : null,
                MembersPicPath2: (imageList.length === 2) ? imageList[1] : null,
                MembersPicPath3: (imageList.length === 3) ? imageList[2] : null
            };
            const memberUrl = config.url + "Member";
            await axios.put(memberUrl + `/${memberId}`, temp).then(() => {
                axios.post(config.url + `FamilyMember/${memberId}`, familyMemberList).then(() => {
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
    const handleFamilyEducation = (selected) => {
        setSelectFamilyEducation(educationList.find((x) => x.value === selected.value));
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
    const [familyMemberList, setFamilyMemberList] = useState([]);
    useEffect(() => {
        setFamilyMemberList(familyMembers.filter((i) => i.rid === memberId));
    }, [familyMembers]);
    //FamilyMember Ref
    const familyMemberNameRef = useRef();
    const ageRef = useRef();
    const allowEducationRef = useRef();
    const allowBookRef = useRef();
    const isContributorRef = useRef();

    const [regDateState, setRegDateState] = useState(null);
    const [dOBDateState, setDOBDateState] = useState(null);

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
                qualificationId: selectFamilyEducation?.value || "0",
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
            clearChildRow();
            return true;
        }
    };
    const clearChildRow = async () => {
        setFamilyErrors({ ...familyErrors, familyMembernameErr: "", relationsErr: "", ageErr: "", institute: "" });
        familyMemberNameRef.current.value = "";
        ageRef.current.value = "0";
        await delay(500);
        handleRelation(relation[0]);
        handleFamilyEducation(educationList[0]);
        handleInstitutes(institutesList[0]);
        setIsUpdateMode(false);
        allowEducationRef.current.checked = false;
        allowBookRef.current.checked = false;
    }
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
            showCancelButton: true,
            confirmButtonColor: "#00ff00",
            confirmButtonText: "Yes, delete it!",
            cancelButtonColor: "#ff0000",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                const updated = familyMemberList.filter((_, i) => i !== index);
                setFamilyMemberList(updated);
                if (indexNumber === index)
                    clearChildRow();
            } else {
                MySwal.close();
            }
        });
    };

    const [imageList, setImageList] = useState([]);
    const webCamRef = useRef();
    const handleAddMemberPic = () => {
        if (webCamRef.current && webCamRef.current.getScreenshot) {
            const capture = webCamRef.current.getScreenshot();

            if (capture) {
                if (imageList.length < 3) {
                    setImageList((prev) => [...prev, capture]);
                } else {
                    imgQtyAlert();
                }
            } else {
                msgAlert("Webcam not ready yet, no screenshot captured");
            }
        }
        else {
            msgAlert("Webcam not connected!");
        }
    }
    const imgQtyAlert = () => {
        MySwal.fire({
            icon: "error",
            title: "You cannot add images more then 3",
            confirmButtonText: "Ok",
        })
    };
    const msgAlert = (msg) => {
        MySwal.fire({
            icon: "error",
            title: msg,
            confirmButtonText: "Ok",
        })
    };
    const handleRemoveMemberPic = (i) => {
        setImageList((e) => e.filter((_, a) => a != i));
    }

    const [hasCamera, setHasCamera] = useState(false);
    useEffect(() => {
        const updateDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            setHasCamera(devices.some((d) => d.kind === "videoinput"));
        };

        navigator.mediaDevices.addEventListener("devicechange", updateDevices);

        updateDevices(); // initial check

        return () => {
            navigator.mediaDevices.removeEventListener("devicechange", updateDevices);
        };
    }, []);

    const isBase64String = (e) => {
        if (!e)
            return false;
        if (e.startsWith("data:image")) return true;
        else return false;
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
                                                        <input className="form-check-input" type="checkbox" ref={isContributorRef} onChange={(e) => setFormData({ ...formData, isContributor: e.target.checked })} id="check1" name="option1" />
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
                                                            {hasCamera ? (
                                                                <Webcam width="170px" height="170px" ref={webCamRef} screenshotFormat="image/jpeg" />
                                                            ) : (
                                                                <img src={webcam} alt="webcam" width="170px" height="170px" />
                                                            )}
                                                            <div className="row">
                                                                <div className="col-10">
                                                                    <button className="btn rounded primaryBtn" onClick={handleAddMemberPic}>Capture</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 d-flex" style={{ marginTop: "5px" }}>

                                                            {imageList.map((i, index) => (
                                                                <div className="imgBlock rounded" key={index}>
                                                                    <IoCloseCircle className="remove-product-icon" onClick={() => handleRemoveMemberPic(index)} />
                                                                    <img src={isBase64String(i) ? i : getImageFromUrl(i)} width={100} height={100} />
                                                                </div>
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
                                            <input type="number" className="form-control" ref={ageRef} defaultValue={0}></input>
                                            {familyErrors.ageErr && <p style={{ "color": "#dc3545", "padding": "3px" }}>Member age required!</p>}
                                        </div>
                                        <div className="col-lg-2 col-sm-4 col-12 flex-fill">
                                            <label className="form-label">Education</label>
                                            <Select
                                                classNamePrefix="react-select"
                                                placeholder="Choose Option"
                                                options={educationList}
                                                value={selectFamilyEducation}
                                                onChange={handleFamilyEducation}
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
                                        <div className="col-lg-2 col-sm-6 col-12 row flex-fill" style={{ "padding-top": "20px", "padding-left": "15px" }}>
                                            <div className="col-lg-8 col-sm-6 col-12">
                                                <div className="col-12 flex-fill">
                                                    <label className="form-label">Education allow</label>
                                                    <input className="form-check-input" type="checkbox" ref={allowEducationRef} style={{ "margin-left": "5px", "cursor": "pointer" }} />
                                                </div>
                                                <div className="col-12 flex-fill">
                                                    <label className="form-label">Book Allow</label>
                                                    <input className="form-check-input" type="checkbox" ref={allowBookRef} style={{ "margin-left": "5px", "cursor": "pointer" }} />
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
                        <button type="submit" className="btn btn-submit" onClick={handleSubmit}>Save Changes</button>
                    </div>
                </div>
                {/* /add */}
            </div>
        </div>
    );
};

export default EditNewMember;



// invoice_line_ids.sale_line_ids.order_id.x_studio_final_destination_2

// for record in self:
//     record['x_studio_final_destinations'] = record.invoice_line_ids.mapped('sale_line_ids').mapped('order_id').x_studio_final_destinations_2