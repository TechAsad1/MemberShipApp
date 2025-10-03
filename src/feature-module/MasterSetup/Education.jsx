import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom/dist";
import Swal from "sweetalert2";
import Table from "../../core/pagination/datatable";
import Select from "react-select";
import Sliders from "feather-icons-react/build/IconComponents/Sliders";
import {
  Calendar,
  Filter,
  PlusCircle,
  StopCircle,
  Zap,
} from "feather-icons-react/build/IconComponents";
import { DatePicker } from "antd";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { deleteQualification, getQualification } from "../../core/redux/action";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
import { format } from "date-fns";
import { all_routes } from "../../Router/all_routes";
import AddEducation from "./AddEducation";
import EditEducation from "./EditEducation";

const Education = () => {

  const route = all_routes;
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.qualification);
  const users = useSelector((state) => state.users);
  const [getEditMode, setEditMode] = useState(false);
  const [search, setSearch] = useState({ name: "Choose Qualification", date: null, status: true });
  const [option, setOption] = useState([{ value: "Choose Qualification", label: 'Choose Qualification' }]);
  const [getInvId, setInvId] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [insertMode, setInsertMode] = useState(false);

  // const [postData, setPosts] = useState([]);
  const [loginUser, setLoginUser] = useState(null);

  // useEffect(() => {
  //     setPosts(postData1);
  //   // if (loginUser) {
  //   // } else {
  //   //   setPosts([]);
  //   // }
  // }, [loginUser, postData1]);
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
      title: "Education",
      dataIndex: "qualificationName",
      sorter: (a, b) => a.qualificationName.length - b.qualificationName.length,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (x) => (
        <div>
          {x && (<span className="badge badge-linesuccess">Active</span>)}
          {!x && (<span className="badge badge-linedanger">InActive</span>)}
        </div>
      ),
      sorter: (a, b) => a.isActive.length - b.isActive.length,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-education"
              onClick={(e) => updateHandle(e, record.qualificationId)}
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link className="confirm-text p-2" to="#">
              <i
                data-feather="trash-2"
                className="feather-trash-2"
                onClick={(e) => showConfirmationAlert(e, record.qualificationId)}
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
        dispatch(deleteQualification(p));
      } else {
        MySwal.close();
      }
    });
  };

  //Custom Code
  useEffect(() => {
    dispatch(getQualification());
  }, [dispatch]);
  useEffect(() => {
    setOption((prev) => [
      prev[0],
      ...(postData || []).map((x) => ({
        value: x.qualificationName,
        label: x.qualificationName
      }))
    ]);
    searchEngine("", "");
  }, [postData]);
  const updateHandle = (e, id) => {
    setEditMode(true);
    setInvId(id);
  }
  //Search Engine
  const searchEngine = (action, key) => {
    if (action === "newest") {
      setDataSource(postData.sort((a, b) => a.qualificationID - b.qualificationID)
        .slice(0, postData.length));
    }
    else if (action === "oldest") {
      setDataSource(postData.sort((a, b) => b.qualificationID - a.qualificationID)
        .slice(0, postData.length));
    }
    else if (action === "filter") {
      handleFilter();
    }
    else {
      setDataSource(postData?.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(key.toLowerCase())
        )
      ));
    }
  }
  const handleFilter = () => {
    if (search.name === "Choose Education" && search.date === null) {
      setDataSource(postData.filter((x) => x.isActive === search.status));
    }
    else if (search.name != "Choose Education" && search.date === null) {
      setDataSource(postData.filter((x) => x.qualificationName.toLowerCase().includes(search.name.toLowerCase()) && x.isActive === search.status));
    }
    else if (search.name === "Choose Education" && search.date != null) {
      setDataSource(postData.filter((x) => format(x.createdDate, "yyyy-MM-dd") === search.date && x.isActive === search.status));
    }
    else {
      setDataSource(postData.filter((x) => x.qualificationName.toLowerCase().includes(search.name.toLowerCase()) && format(x.createdDate, "yyyy-MM-dd") === search.date && x.isActive === search.status));
    }
  }
  const handleStatus = (e) => {
    if (e.toLowerCase() === "active") {
      setSearch({ ...search, status: true })
    }
    else {
      setSearch({ ...search, status: false })
    }
  }
  const handleDate = (e) => {
    if (e != null) {
      setSearch({ ...search, date: format(e.$d, "yyyy-MM-dd") })
    }
    else {
      setSearch({ ...search, date: null })
    }
  }
  const handleInsert = () => {
    setInsertMode(true);
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
                <h4>Education</h4>
                <h6>Manage your education</h6>
              </div>
            </div>
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-education"
                onClick={() => handleInsert()}
              >
                <PlusCircle className="me-2" />
                Add New Education
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
                          placeholder="Choose Brand"
                          onChange={(e) => setSearch({ ...search, name: e.value })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <Calendar className="info-img" />
                        <div className="input-groupicon">
                          <DatePicker
                            type="date"
                            className="filterdatepicker"
                            dateFormat="dd-MM-yyyy"
                            placeholder="Choose Date"
                            onChange={(e) => handleDate(e)}
                          />
                        </div>
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
      <AddEducation userId={loginUser?.userId} insertMode={insertMode} setInsertMode={setInsertMode}/>
      <EditEducation id={getInvId} isEditMode={getEditMode} setEditMode={setEditMode} />
    </div>
  );
};

export default Education;
