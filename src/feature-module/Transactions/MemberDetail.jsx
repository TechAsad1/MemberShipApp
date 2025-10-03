import { getImageFromUrl } from '../../helper/helpers';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getMember } from '../../core/redux/action';

const MemberDetail = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.member);
    const area = useSelector((state) => state.area);

    const { id } = useParams();
    const memberId = parseInt(id, 10);

    const member = posts.find((m) => m.memberId === memberId);

    const x = member
        ? {
            ...member,
            areaName: area.find((i) => i.areaID === member.areaID)?.areaName || "-",
        }
        : null;

    useEffect(() => {
        dispatch(getMember());
    }, [dispatch]);
    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Member Details</h4>
                            <h6>Full details of a member</h6>
                        </div>
                    </div>
                    {/* /add */}
                    <div className="row">
                        <div className="col-lg-8 col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="productdetails">
                                        <ul className="product-bar">
                                            <li>
                                                <h4>Member ID</h4>
                                                <h6>/Mem-{x?.memberId}</h6>
                                            </li>
                                            <li>
                                                <h4>Member Name</h4>
                                                <h6>{x?.memberName}</h6>
                                            </li>
                                            <li>
                                                <h4>CNICNo</h4>
                                                <h6>{x?.cnicno}</h6>
                                            </li>
                                            <li>
                                                <h4>FatherName</h4>
                                                <h6>{x?.fatherName}</h6>
                                            </li>
                                            <li>
                                                <h4>SurName</h4>
                                                <h6>{x?.surName}</h6>
                                            </li>
                                            <li>
                                                <h4>CellNo</h4>
                                                <h6>{x?.cellNo}</h6>
                                            </li>
                                            <li>
                                                <h4>MemberDOB</h4>
                                                <h6>{x?.memberDOB}</h6>
                                            </li>
                                            <li>
                                                <h4>PurminantAddress</h4>
                                                <h6>{x?.purminantAddress}</h6>
                                            </li>
                                            <li>
                                                <h4>CurrentAddress</h4>
                                                <h6>{x?.currentAddress}</h6>
                                            </li>
                                            <li>
                                                <h4>HouseStatus</h4>
                                                <h6>{x?.houseStatus}</h6>
                                            </li>
                                            <li>
                                                <h4>Area</h4>
                                                <h6>{x?.areaName}</h6>
                                            </li>
                                            <li>
                                                <h4>SourceOfIncome</h4>
                                                <h6>{x?.sourceOfIncome}</h6>
                                            </li>
                                            <li>
                                                <h4>MemberStatus</h4>
                                                <h6>{x?.memberStatus}</h6>
                                            </li>
                                            <li>
                                                <h4>Register Date</h4>
                                                <h6>{x?.regdate}</h6>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="slider-product-details">
                                        <div className="owl-carousel owl-theme product-slide">
                                            <div className="slider-product">
                                                {x?.membersPicPath && (
                                                    <img src={getImageFromUrl(x?.membersPicPath)} alt="img" />
                                                )}
                                                <br />
                                                {x?.membersPicPath2 && (
                                                    <img src={getImageFromUrl(x?.membersPicPath2)} alt="img" />
                                                )}
                                                <br />
                                                {x?.membersPicPath3 && (
                                                    <img src={getImageFromUrl(x?.membersPicPath3)} alt="img" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /add */}
                </div>
            </div>
        </div >
    )
}

export default MemberDetail
