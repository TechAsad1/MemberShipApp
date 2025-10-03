import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from "sweetalert2";
import { Link } from 'feather-icons-react/build/IconComponents';
import { Table } from 'antd';
import { getFamilyMember } from '../../core/redux/action';
import { dateFormat } from "../../helper/helpers";

const ViewFamilyMember = (p) => {
    const dispatch = useDispatch();
    const postData = useSelector((state) => state.familyMember);
    const [dataSource, setDataSource] = useState([]);
    //Modal IsVisible
    const handleModalClose = () => {
        p.setViewMode(false);
    }
    const columns = [
        {
            title: "Family Member Name",
            dataIndex: "name",
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: "Relation",
            dataIndex: "relation",
            sorter: (a, b) => a.relation.length - b.relation.length,
        },
        {
            title: "Age",
            dataIndex: "age",
            sorter: (a, b) => a.age.length - b.age.length,
        },
        {
            title: "Education",
            dataIndex: "education",
            sorter: (a, b) => a.education.length - b.education.length,
        },
        {
            title: "Institute",
            dataIndex: "institute",
            sorter: (a, b) => a.institute.length - b.institute.length,
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
                            data-bs-target="#viewFamilyMember"
                        // onClick={(e) => updateHandle(e, record.memberId)}
                        >
                            <i data-feather="edit" className="feather-edit"></i>
                        </Link>
                        <Link className="confirm-text p-2" to="#">
                            <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                            // onClick={(e) => showConfirmationAlert(e, record.memberId)}
                            ></i>
                        </Link>
                    </div>
                </div>
            ),
        },
    ];
    useEffect(() => {
        dispatch(getFamilyMember());
    }, [dispatch]);
    useEffect(() => {
        if (p.memberRow?.[0]?.memberId) {
            setDataSource(postData.filter((i) => i.rid === p.memberRow[0].memberId));
        }
    }, [postData, p.memberRow]);

    return (
        <div>
            {/* Edit Brand */}
            <div className="modal fade" id="viewFamilyMember" onClick={handleModalClose}>
                <div className="modal-dialog modal-dialog-centered sales-details-modal">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Family Members</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={handleModalClose}
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body custom-modal-body new-employee-field">
                                    <div className="table-responsive">
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th>Member Name</th>
                                                    <th>CNIC No#</th>
                                                    <th>Location</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{p.memberRow?.[0]?.memberName}</td>
                                                    <td>{p.memberRow?.[0]?.cnicno}</td>
                                                    <td>{p.memberRow?.[0]?.currentAddress}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Table columns={columns} dataSource={dataSource} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Brand */}
        </div>
    )
}

export default ViewFamilyMember
