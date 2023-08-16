import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import "./Webseries.css";
import fast from "../logo/fast.gif"

const Webseries = ({ edit }) => {
    const [editid, seteditid] = useState()
    const [show, setshow] = useState(false)
    const [name, setname] = useState("")
    const [title, settitle] = useState("")
    const [image, setimage] = useState("")
    const [rating, setrating] = useState("")
    const [genre, setgenre] = useState("")
    const [language, setlanguage] = useState("")
    const [quality, setquality] = useState("")
    const [screenshot, setscreenshot] = useState([])
    const [file, setfile] = useState("")
    const [id, setid] = useState("1")
    const [preview, setpreview] = useState("preview")
    const [previews, setpreviews] = useState([])
    const [mess,setmess]=useState("")



    useEffect(() => {
        if (edit.length > 0) {
            edit.forEach((e) => {
                seteditid(e._id)
                setname(e.name)
                settitle(e.title)
                setimage("")
                setrating(e.rating)
                setgenre(e.genre)
                setlanguage(e.language)
                setquality(e.quality)
                setfile("")
                setscreenshot("")
            })
            setshow(true)
        } else {
            setshow(false)
        }


    }, [])



    const handlesave = () => {
        let formdata = new FormData()
        formdata.append("_id", editid)
        formdata.append("name", name)
        formdata.append("id", id)
        formdata.append("title", title)
        formdata.append("rating", rating)
        formdata.append("genre", genre)
        formdata.append("language", language)
        formdata.append("quality", quality)
        formdata.append("file", file)
        formdata.append("file", image)
        Array.from(screenshot).forEach((e) => {
            formdata.append("file", e)
        })



      


        if (name && title && rating && genre && language && quality && file && image && screenshot && id) {
        
             

                fetch('http://localhost:9000/edit', {
                    method: 'POST',
                    body: formdata
                })
                    .then(res => res.json())
                    .then(json => {alert(json.mess)
                      setmess("")
                    
                    })
                    setmess("series save")

            

        } else {
            alert("fill the all new edit upload files")
        }


    }



    const handleReset = () => {
        window.location.reload(true)
        setshow(false)

    }



    const handleclick = () => {
        let formdata = new FormData()
        formdata.append("name", name)
        formdata.append("id", id)
        formdata.append("title", title)
        formdata.append("rating", rating)
        formdata.append("genre", genre)
        formdata.append("language", language)
        formdata.append("quality", quality)
        formdata.append("file", file)
        formdata.append("file", image)
        Array.from(screenshot).forEach((e) => {
            formdata.append("file", e)
        })

        if (name && title && rating && genre && language && quality && file && image && screenshot && id) {
          


                        fetch('http://localhost:9000/post', {
                            method: 'POST',
                            body: formdata
                        })
                            .then(res => res.json())
                            .then(json => {alert(json.mess)
                            setmess("")
                            })
                            setmess("series save")

                  
        } else {
            alert("fill the all filed")
        }



    }





    return (
        <>
        {mess==="series save" ?  <div className="overlay"><img src={fast} className="img9"/></div> :""}
            <div className="gridfill">
                <div>
                    <Header />
                </div>
                <div className="gridnav" >
                    <div className="gridsize">
                        <div className="inputlal">
                            <label className="label">WEBSERIES NAME</label>
                            <input className="form-control form-control-lg inputsize" type="text" placeholder="WEBSERIES NAME" value={name} onChange={(e) => setname(e.target.value)} />

                        </div>
                        <div className="inputlal">
                            <label className="label">WEBSERIES TITLE</label>
                            <input className="form-control form-control-lg  inputsize" type="text" placeholder="WEBSERIES TITLE" value={title} onChange={(e) => settitle(e.target.value)} />

                        </div>
                        <div className="inputlal">
                            <div className="fleximg">
                                <div>
                                    <label className="label">WEBSERIES IMAGE</label>
                                    <input className="form-control form-control-lg  inputsize" type="file" accept=".jpg, .jpeg" onChange={(e) => { setimage(e.target.files[0]); setpreview(URL.createObjectURL(e.target.files[0])) }} />
                                </div>
                                <div>
                                    {preview == "preview" ? <h4>image preview</h4> : <img src={preview} className="img2" />}
                                </div>
                            </div>

                        </div>
                        <div className="inputlal">
                            <label className="label">WEBSERIES RATING</label>
                            <select className="form-select form-select-lg mb-3 inputsize" value={rating} onChange={(e) => setrating(e.target.value)}>
                                <option >SELECT RATING</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>

                        </div>
                        <div className="inputlal">
                            <label className="label">WEBSERIES GENRE</label>
                            <input className="form-control form-control-lg  inputsize" type="text" placeholder="WEBSERIES GENRE" value={genre} onChange={(e) => setgenre(e.target.value)} />

                        </div>
                        <div className="inputlal">
                            <label className="label">WEBSERIES LANGUAGE</label>
                            <select className="form-select form-select-lg mb-3 inputsize" value={language} onChange={(e) => setlanguage(e.target.value)}>
                                <option >SELECT LANGUAGE</option>
                                <option value="Hindi-English">Hindi-English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="English">English</option>
                            </select>

                        </div>
                        <div className="inputlal">
                            <label className="label">WEBSERIES QUALITY</label>
                            <select className="form-select form-select-lg mb-3 inputsize" value={quality} onChange={(e) => setquality(e.target.value)}>
                                <option >SELECT QUALITY</option>
                                <option value="720p">720p</option>
                            </select>
                        </div>
                        <div className="inputlal">
                            <div className="fleximg">
                                <div>
                                    <label className="label">WEBSERIES SCREENSHOTS</label>
                                    <input className="form-control form-control-lg inputsize" type="file" accept=".jpg, .jpeg"  multiple  onChange={(e) => {
                                        if(e.target.files.length < 4){
                                        setscreenshot(e.target.files);
                                        const a = Array.from(e.target.files).map((eve) => URL.createObjectURL(eve))
                                        setpreviews(a)
                                    }else if(e.target.files.length > 3){
                                      alert("please upload screenshot min and max 3")
                                      setscreenshot("")
                                    }

                                    }} />
                                </div>
                                {previews.length == 0 ? <h4>image previews</h4> :
                                    previews.map((e, i) => {
                                        return (
                                            <div key={i}>
                                                <img src={e} className="img2" />
                                            </div>
                                        )
                                    })

                                }
                            </div>
                        </div>
                        <div className="inputlal">
                            <label className="label">WEBSERIES ZIPFILE</label>
                            <input className="form-control form-control-lg inputsize" type="file"accept=".zip,.x-zip-compressed" onChange={(e) => setfile(e.target.files[0])} />

                        </div>
                        <div className="inputlal">
                            {show === false ? <button type="button" className="btn btn-primary" onClick={handleclick}>SUBMIT</button> : <span><button type="button" className="btn btn-primary" onClick={handlesave}>EDIT SAVE</button> <button type="reset" className="btn btn-danger" onClick={handleReset}>RESET</button></span>}
                        </div>


                    </div>



                </div>


            </div>

        </>
    )
}
export default Webseries