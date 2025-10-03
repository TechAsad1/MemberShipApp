import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from "sweetalert2";
import { updateUser } from '../../core/redux/action';

const EditUser = (p) => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const [formData, setFormData] = useState({ username: "", email: "", password: "", isActive: true });
    const [errors, setErrors] = useState({});
    //Ref
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        if (p.isEditMode) {
            const res = users.find((i) => i.id === Number(p.id));
            setFormData({ ...formData, username: res.username, email: res.email, password: res.password, isActive: res.isActive });
        }
    }, [p.isEditMode])
    //Validation
    const validate = () => {
        let tempErrors = {};
        if (formData.username === "") {
            tempErrors.nameErr = "Username is required";
            setErrors(tempErrors);
        }
        else if (formData.email === "") {
            tempErrors.emailErr = "Email is required";
            setErrors(tempErrors);
        }
        else if (formData.password === "") {
            tempErrors.passwordErr = "Password is required";
            setErrors(tempErrors);
        }
        else {
            setErrors({ ...errors, nameErr: "", emailErr: "", passwordErr: "" });
        }
        return Object.keys(tempErrors).length === 0;
    };
    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate(e)) {
            dispatch(updateUser(p.id, formData));
            successAlert(null);
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
    //Modal IsVisible
    const handleModalClose = () => {
        p.setEditMode(false);
    }
    const handleIsActive = () => {
        if (formData.isActive)
            setFormData({ ...formData, isActive: false });
        else
            setFormData({ ...formData, isActive: true });
    }

    return (
        <div>
            {/* Edit Brand */}
            <div className="modal fade" id="edit-user" onClick={handleModalClose}>
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Update User</h4>
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
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.nameErr ? "is-invalid" : ""}`}
                                                value={formData.username}
                                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                ref={nameRef}
                                            />
                                            {errors.nameErr && <p style={{ color: "#ff7676" }}>{errors.nameErr}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.emailErr ? "is-invalid" : ""}`}
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                ref={emailRef}
                                            />
                                            {errors.emailErr && <p style={{ color: "#ff7676" }}>{errors.emailErr}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.passwordErr ? "is-invalid" : ""}`}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                ref={passwordRef}
                                            />
                                            {errors.passwordErr && <p style={{ color: "#ff7676" }}>{errors.passwordErr}</p>}
                                        </div>
                                        <div className="mb-0">
                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                <span className="status-label">Status</span>
                                                <input
                                                    type="checkbox"
                                                    id="user4"
                                                    className="check"
                                                    checked={formData.isActive}
                                                />
                                                <label htmlFor="user4" className="checktoggle" onClick={handleIsActive} />
                                            </div>
                                        </div>
                                        <div className="modal-footer-btn">
                                            <button
                                                type="button"
                                                className="btn btn-cancel me-2"
                                                data-bs-dismiss="modal"
                                                onClick={handleModalClose}
                                            >
                                                Cancel
                                            </button>
                                            <button to="#" className="btn btn-submit">
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
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

export default EditUser
