import React, { useEffect, useState } from "react";
import db from "../../../../firebase";

function Showsubject({ course, id, sub,email }) {
    const [already, setAlready] = useState(false);
    const [alreadyadd, setAlreadyadd] = useState('');
    const [alreadyaddSub, setAlreadyaddSub] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(false);
    const [onlyOne, setOnlyOne] = useState(false)
    const [userInfo,setUserInfo]=useState([]);

    useEffect(()=>{
        setLoading(true);
       if(email){
           db.collection('users').where('email', '==',email ).get()
           .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                setUserInfo(doc.id);
                setLoading(false);
               })
               setLoading(false);
           })
       }
    },[email]);

    useEffect(() => {
        setLoading(true);
        // var subjectsArrs = alreadyaddSub?.subjects && alreadyaddSub?.subjects;
        if (course && id) {
            db.collection('addByAdmin').doc(id).collection('courses').where('name', '==', course?.data?.name).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setAlreadyadd(doc.id);
                        console.log(doc.id);
                        console.log("d0c.data", doc.data());
                        setAlreadyaddSub(doc.data());
                        setLoading(false);
                    })
                    setLoading(false);
                })
        }
    }, [loading1, onlyOne]);

    const addSubject = () => {
        setLoading1(true);
        if (!loading) {
            db.collection('addByAdmin').doc(id).collection('courses').where('name', '==', course?.data?.name).get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty === true) {
                        if (!onlyOne) {
                            console.log("add");
                            db.collection('addByAdmin').doc(id).collection('courses').add({
                                name: course.data.name,
                                subjects: [sub],
                            })
                            setAlreadyaddSub([sub]);
                            setOnlyOne(true)
                            setLoading1(false);
                        }
                    }
                    querySnapshot.forEach((doc) => {
                        setAlreadyadd(doc.id);
                        setAlreadyaddSub(doc.data());

                        if (!onlyOne) {
                            setLoading1(false);
                            var subjectsArray = doc.data()?.subjects;
                            subjectsArray.push(sub);
                            console.log("update");
                            db.collection('addByAdmin').doc(id).collection('courses').doc(doc.id).update({
                                name: course.data.name,
                                subjects: subjectsArray
                            }).then(() => {
                                setOnlyOne(true);
                            })
                        }
                        setLoading(false);
                    })
                })
        }
    }

    const removeSubject = () => {
        setLoading1(true);
        if (!loading) {
            db.collection('addByAdmin').doc(id).collection('courses').where('name', '==', course?.data?.name).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setAlreadyadd(doc.id);
                        setAlreadyaddSub(doc.data());
                        setLoading1(false);
                        const index = doc.data()?.subjects.indexOf(sub);
                        var subjectsArray = doc.data()?.subjects;
                        // subjectsArray.push(sub);
                        if (index > -1) {
                            subjectsArray.splice(index, 1);
                        }
                        console.log("update");
                        db.collection('addByAdmin').doc(id).collection('courses').doc(doc.id).update({
                            name: course.data.name,
                            subjects: subjectsArray
                        })
                        setLoading(false);
                    })
                    if(userInfo){
                        db.collection('users').doc(userInfo).update({
                        currentCourse:'',
                        currentCourseID:'',
                        currentSubject:'',
                        currentSubjectID:'',
                    })}
                })
        }
    }

    return (
        <>
            <div className="showsubject"> 
                    {loading1 ? <>loading</> : (alreadyaddSub?.subjects && alreadyaddSub?.subjects.includes(sub) ?
                        <button className="showSubject__button" onClick={removeSubject}>Remove {sub} in course</button>
                        :
                        (loading ? <>loading</> : <button onClick={addSubject}>Add <b>{sub}</b> in course</button>))
                    } 
            </div>
        </>
    )
}

export default Showsubject