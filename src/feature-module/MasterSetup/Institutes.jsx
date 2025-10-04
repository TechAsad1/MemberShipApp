import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/dist";
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
import { deleteInstitutes, getInstitutes } from "../../core/redux/action";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from "react";
import { format } from "date-fns";
import AddInstitutes from "./AddInstitutes"
import EditInstitutes from "./EditInstitutes"
import { useLoginData } from "../../helper/loginUserData";

const Institutes = () => {

  const dispatch = useDispatch();
  const postData = useSelector((state) => state.institutes);
  const institutes = useSelector((state) => state.institutes);
  const [getEditMode, setEditMode] = useState(false);
  const [search, setSearch] = useState({ name: "Choose Institutes", date: null, status: true });
  const [option, setOption] = useState([{ value: "Choose Institutes", label: 'Choose Institutes' }]);
  const [getInvId, setInvId] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [insertMode, setInsertMode] = useState(false);

  const loginUser = useLoginData();

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
      title: "Institutes",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
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
      sorter: (a, b) => a.active.length - b.active.length,
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
              data-bs-target="#edit-institutes"
              onClick={(e) => updateHandle(e, record.id)}
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link className="confirm-text p-2" to="#">
              <i
                data-feather="trash-2"
                className="feather-trash-2"
                onClick={(e) => showConfirmationAlert(e, record.id)}
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
        dispatch(deleteInstitutes(p));
      } else {
        MySwal.close();
      }
    });
  };

  //Custom Code
  useEffect(() => {
    dispatch(getInstitutes());
  }, [dispatch]);
  useEffect(() => {
    setOption((prev) => [
      prev[0],
      ...institutes.map((x) => ({
        value: x.name,
        label: x.name
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
      setDataSource(postData.sort((a, b) => a.id - b.id)
        .slice(0, postData.length));
    }
    else if (action === "oldest") {
      setDataSource(postData.sort((a, b) => b.id - a.id)
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
    if (search.name === "Choose Brand" && search.date === null) {
      setDataSource(postData.filter((x) => x.isActive === search.status));
    }
    else if (search.name != "Choose Brand" && search.date === null) {
      setDataSource(postData.filter((x) => x.brandName.toLowerCase().includes(search.name.toLowerCase()) && x.isActive === search.status));
    }
    else if (search.name === "Choose Brand" && search.date != null) {
      setDataSource(postData.filter((x) => format(x.createdDate, "yyyy-MM-dd") === search.date && x.isActive === search.status));
    }
    else {
      setDataSource(postData.filter((x) => x.brandName.toLowerCase().includes(search.name.toLowerCase()) && format(x.createdDate, "yyyy-MM-dd") === search.date && x.isActive === search.status));
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

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Institutes</h4>
                <h6>Manage your institutes</h6>
              </div>
            </div>
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-institutes"
                onClick={() => handleInsert()}
              >
                <PlusCircle className="me-2" />
                Add New Institutes
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
                {/* {loading && <h3>Loading...</h3>} */}
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
            {/* /product list */}
          </div>
        </div>
      </div>
      <AddInstitutes userId={loginUser?.userId} insertMode={insertMode} setInsertMode={setInsertMode}/>
      <EditInstitutes id={getInvId} isEditMode={getEditMode} setEditMode={setEditMode} />
    </div>
  );
};

export default Institutes;
