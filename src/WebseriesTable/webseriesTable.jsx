import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import "./WebseriesTable.css";
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { MdFolderZip } from 'react-icons/md';
import { NavLink } from "react-router-dom";
//import { saveAs } from 'file-saver';


const WebseriesTable = ({ setedit }) => {
    const [series, setseries] = useState([])

    useEffect(() => {
        fetch("http://localhost:9000/get")
            .then(err => err.json())
            .then(json => { setseries(json) })
    }, [series])




    const handleedit = (id) => {
        const edit = series.filter((e) => {
            return e._id === id
        })

        setedit(edit)
    }


    const handledelete = (id) => {
        fetch("http://localhost:9000/delete", {
            method: "post",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                _id: id
            })
        })
            .then(err => err.json())
            .then(json => alert(json.mess))
    }

    const [count, setCount] = useState(1)
    const [showPage, setshowPage] = useState(5)
    const value = showPage * count
    const values = value - showPage

    const handleNext = () => {
        if (Math.ceil(series.length / showPage) === count) {
            setCount(count)
        } else {
            setCount(count + 1)
        }
    }
    const handlePrivics = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    
  //  const handledownload=(id)=>{
   
//  saveAs(id,'bad.zip')

  //  }


    return (
        <>
            <div className="gridfill">
                <div>
                    <Header />
                </div>
                <div className="gridnav">

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>SERIES NAME</th>
                                <th>SERIES TITLE</th>
                                <th>SERIES RATING</th>
                                <th>SERIES GENRE</th>
                                <th>SERIES LANGUAGE</th>
                                <th>SERIES QUALITY</th>
                                <th>SERIES ZIPFILE</th>
                                <th>SERIES SCREENSHOTS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {series.length == 0 ?
                                <tr>
                                    <td>----</td>
                                    <td>----</td>
                                    <td>----</td>
                                    <td>----</td>
                                    <td>----</td>
                                    <td>----</td>
                                    <td>----</td>
                                    <td>----</td>
                                    <td>----</td>
                                </tr> :
                                series && series.slice(values,value).map((e, i) => {

                                    return (
                                        <tr key={i}>
                                            <td>{e.name}</td>
                                            <td>{e.title}</td>
                                            <td>{e.rating}</td>
                                            <td>{e.genre}</td>
                                            <td>{e.language}</td>
                                            <td>{e.quality}</td>
                                            <td><a href={e.file[0]}><MdFolderZip className="file" /></a></td>
                                            <td>{e.image.map((eve, i) => {

                                                return (
                                                    <span key={i}>
                                                        <img src={eve} width={30} height={30} />
                                                    </span>
                                                )
                                            })}
                                            </td>
                                            <td>
                                                <NavLink to={"/"} ><FaEdit className="edit" onClick={() => handleedit(e._id)} /></NavLink>
                                                <MdDelete className="delete" onClick={() => handledelete(e._id)} />
                                            </td>
                                        </tr>
                                    )
                                })

                            }

                        </tbody>
                    </table>
                    {series.length===0 ? "":
                    <div className="page">
                        <div className="pagenation">
                            <button type="button" className="btn btn-primary" onClick={handlePrivics}>Previous</button>
                            <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
                        </div>
                    </div>
                    }
                </div>
            </div>




        </>
    )
}
export default WebseriesTable