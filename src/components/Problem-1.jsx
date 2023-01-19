import React, { useEffect, useState } from "react";

const Problem1 = () => {
    // hook variable declaration
    const [filteredResult, setFilteredResult] = useState([]);
    const [allInputs, setAllInputs] = useState([]);
    const [show, setShow] = useState("all");

    const handleClick = val => {
        setShow(val);
    };

    useEffect(() => {
        if (show.toLowerCase() === "all") {
            setFilteredResult(allInputs);
        } else if (show.toLowerCase() === "active") {
            const filterData = allInputs.filter(d => d.status === "active");
            setFilteredResult(filterData);
        } else if (show.toLowerCase() === "completed") {
            const filterData = allInputs.filter(d => d.status === "completed");
            setFilteredResult(filterData);
        }
    }, [show, allInputs, setFilteredResult]);

    const handleSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const status = e.target.status.value;
        const data = { name, status };
        setAllInputs([...allInputs, data]);
    };

    // make decision about sorting
    useEffect(() => {
        const sortedActiveArr = filteredResult.filter(item => item.status === "active").sort((a, b) => a.name.localeCompare(b.name));
        const completedArr = filteredResult.filter(item => item.status === "completed").sort((a, b) => a.name.localeCompare(b.name));
        setFilteredResult([...sortedActiveArr, ...completedArr]);
        const pendingArr = filteredResult.filter(item => item.status === "pending").sort((a, b) => a.name.localeCompare(b.name));
        setFilteredResult([...sortedActiveArr, ...completedArr, ...pendingArr]);
        const archieveArr = filteredResult.filter(item => item.status === "archive").sort((a, b) => a.name.localeCompare(b.name));
        const others = filteredResult.filter(
            item =>
                item.status !== "archive" &&
                item.status !== "active" &&
                item.status !== "completed" &&
                item.status !== "pending" &&
                item.status !== "archive"
        );
        setFilteredResult([...sortedActiveArr, ...completedArr, ...pendingArr, ...archieveArr, ...others]);
    }, [filteredResult]);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input type="text" name="name" className="form-control" placeholder="Name" />
                        </div>
                        <div className="col-auto">
                            <input type="text" name="status" className="form-control" placeholder="Status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === "all" && "active"}`} type="button" onClick={() => handleClick("all")}>
                                All
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === "active" && "active"}`} type="button" onClick={() => handleClick("active")}>
                                Active
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === "completed" && "active"}`} type="button" onClick={() => handleClick("completed")}>
                                Completed
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResult.map(data => {
                                return (
                                    <tr>
                                        <td>{data.name}</td>
                                        <td>{data.status}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
