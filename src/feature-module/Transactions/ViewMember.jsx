import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/dist";
import Swal from "sweetalert2";
import Table from "../../core/pagination/datatable";
import Select from "react-select";
import Sliders from "feather-icons-react/build/IconComponents/Sliders";
import {
  Filter,
  PlusCircle,
  StopCircle,
  Eye,
  Zap,
} from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { deleteMember, getMember } from "../../core/redux/action";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
import { dateFormat } from "../../helper/helpers";
import { all_routes } from "../../Router/all_routes";
import ViewFamilyMember from "./ViewFamilyMember";

const ViewMember = () => {

  const route = all_routes;
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.member);
  // const users = useSelector((state) => state.users);
  const [search, setSearch] = useState({ name: "Choose Member", status: false });
  const [option, setOption] = useState([{ value: "Choose Member", label: 'Choose Member' }]);
  const [dataSource, setDataSource] = useState([]);
  const [viewMode, setViewMode] = useState(false);
  const [memberRow, setMemberRow] = useState([]);

  // const [loginUser, setLoginUser] = useState(null);

  const oldandlatestvalue = [
    { value: "date", label: "Sort by Date" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];
  const status = [
    { value: "choose Status", label: "Choose Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "InActive" },
  ];
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const columns = [
    {
      title: "CNIC-No#",
      dataIndex: "cnicno",
      sorter: (a, b) => a.cnicno.length - b.cnicno.length,
    },
    // {
    //   title: "Member Name",
    //   dataIndex: "createdBy",
    //   render: (x, r) => {
    //     const user = users?.find((a) => a.userId === r.createdBy);
    //     return <span>{user?.userName || "Unknown"}</span>;
    //   },
    //   sorter: (a, b) => {
    //     const nameA = users?.find((u) => u.userId === a.createdBy)?.userName || "";
    //     const nameB = users?.find((u) => u.userId === b.createdBy)?.userName || "";
    //     return nameA.localeCompare(nameB);
    //   }
    // },
    {
      title: "Member Name",
      dataIndex: "memberName",
      sorter: (a, b) => a.memberName.length - b.memberName.length,
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
      sorter: (a, b) => a.fatherName.length - b.fatherName.length,
    },
    {
      title: "CreatedDate",
      dataIndex: "regdate",
      render: (x) => { return <span>{dateFormat(x)}</span> },
      sorter: (a, b) => a.regdate.length - b.regdate.length,
    },
    {
      title: "Member Status",
      dataIndex: "memberStatus",
      render: (x) => (
        <div>
          {x && (<span className="badge badge-linesuccess">Active</span>)}
          {!x && (<span className="badge badge-linedanger">InActive</span>)}
        </div>
      ),
      sorter: (a, b) => a.memberStatus.length - b.memberStatus.length,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link className="me-2 p-2" to={`${route.memberDetail}/${record.memberId}`}>
              <Eye className="feather-view" />
            </Link>
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#viewFamilyMember"
              onClick={(e) => updateHandle(e, record.memberId)}
            >
              <Eye className="feather-view" />
            </Link>
            <Link
              className="me-2 p-2"
              to={`${route.editNewMember}/${record.memberId}`}
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link className="confirm-text p-2" to="#">
              <i
                data-feather="trash-2"
                className="feather-trash-2"
                onClick={(e) => showConfirmationAlert(e, record.memberId)}
              ></i>
            </Link>
          </div>
        </div>
      ),
    },
  ];
  const MySwal = withReactContent(Swal);
  const showConfirmationAlert = (e, p) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          className: "btn btn-success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        dispatch(deleteMember(p));
      } else {
        MySwal.close();
      }
    });
  };

  //Custom Code
  useEffect(() => {
    dispatch(getMember());
    // dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    setOption((prev) => [
      prev[0],
      ...postData.map((x) => ({
        value: x.memberName,
        label: x.memberName
      }))
    ]);
    searchEngine("", "");
  }, [postData]);
  //Search Engine
  const searchEngine = (action, key) => {
    if (action === "newest") {
      setDataSource(postData.sort((a, b) => a.memberId - b.memberId)
        .slice(0, postData.length));
    }
    else if (action === "oldest") {
      setDataSource(postData.sort((a, b) => b.memberId - a.memberId)
        .slice(0, postData.length));
    }
    else if (action === "filter") {
      handleFilter();
    }
    else {
      setDataSource(postData.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(key.toLowerCase())
        )
      ));
    }
  }
  const handleFilter = () => {
    let filtered = postData;
    if (search.name === "Choose Member" && search.status === false) {
      filtered = postData;
    }
    else if (search.name === "Choose Member" && search.status !== false) {
      filtered = postData.filter((x) => x.memberStatus === search.status);
    }
    else {
      filtered = postData.filter((x) => x.memberName.toLowerCase().includes(search.name.toLowerCase()) && x.memberStatus === search.status);
    }
    setDataSource(filtered);
  }
  const handleStatus = (e) => {
    if (e.toLowerCase() === "active") {
      setSearch({ ...search, status: true })
    }
    else {
      setSearch({ ...search, status: false })
    }
  }
  const updateHandle = (e, id) => {
    setMemberRow(dataSource.filter((i) => i.memberId === id));
  }

  // const navigate = useNavigate();
  // const val = localStorage.getItem("userID");
  // useEffect(() => {
  //   if (!isNaN(val) && Number.isInteger(Number(val)) && Number(val) > 0) {
  //     const id = Number(val);
  //     setLoginUser(users.find((i) => i.userId === id));
  //   }
  //   else
  //     navigate(route.signin);
  // }, [users, navigate]);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>View Member</h4>
                <h6>Manage your members</h6>
              </div>
            </div>
            <div className="page-btn">
              <Link to={route.addNewMember} className="btn btn-added">
                <PlusCircle className="me-2 iconsize" />
                Add New Member
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-body">
              <div className="table-top">
                <div className="search-set">
                  <div className="search-input">
                    <input
                      type="text"
                      placeholder="Search"
                      className="form-control form-control-sm formsearch"
                      onChange={(e) => searchEngine("search", e.target.value)}
                    />
                    <Link to className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                  </div>
                </div>
                <div className="search-path">
                  <Link
                    className={`btn btn-filter ${isFilterVisible ? "setclose" : ""
                      }`}
                    id="filter_search"
                  >
                    <Filter
                      className="filter-icon"
                      onClick={toggleFilterVisibility}
                    />
                    <span onClick={toggleFilterVisibility}>
                      <ImageWithBasePath
                        src="assets/img/icons/closes.svg"
                        alt="img"
                      />
                    </span>
                  </Link>
                </div>
                <div className="form-sort">
                  <Sliders className="info-img" />
                  <Select
                    className="img-select"
                    classNamePrefix="react-select"
                    options={oldandlatestvalue}
                    placeholder="Newest"
                    onChange={(e) => searchEngine(e.value, "")}
                  />
                </div>
              </div>
              {/* /Filter */}

              <div
                className={`card${isFilterVisible ? " visible" : ""}`}
                id="filter_inputs"
                style={{ display: isFilterVisible ? "block" : "none" }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <Zap className="info-img" />
                        <Select
                          className="img-select"
                          classNamePrefix="react-select"
                          options={option}
                          placeholder="Choose Member"
                          onChange={(e) => setSearch({ ...search, name: e.value })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <i data-feather="stop-circle" className="info-img" />
                        <StopCircle className="info-img" />
                        <Select
                          className="img-select"
                          classNamePrefix="react-select"
                          options={status}
                          placeholder="Choose Status"
                          onChange={(e) => handleStatus(e.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                      <div className="input-blocks" onClick={() => searchEngine("filter", "")}>
                        <Link className="btn btn-filters ms-auto">
                          {" "}
                          <i
                            data-feather="search"
                            className="feather-search"
                          />{" "}
                          Search{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* /Filter */}
              <div className="table-responsive">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
            {/* /product list */}
          </div>
        </div>
      </div>
      <ViewFamilyMember memberRow={memberRow} viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
};
export default ViewMember;
