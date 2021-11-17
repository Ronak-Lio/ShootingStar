import React, { useEffect, useState } from 'react';
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import db from '../../../../firebase';
import AdminField from './AdminField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AdminFieldforcourses from './AdminFieldforcourses';
import UserSummary from './UserSummary';


function User() {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [totalUser, setTotalUser] = useState([]); 
    const [showBox, setShowBox] = useState(false);
    const [showBox1, setShowBox1] = useState(false);
    const [showBox2, setShowBox2] = useState(false);
    const [showBox3, setShowBox3] = useState(false);
    var totalTeacher=[];
    var totalStudent=[];
    var totalAdmin=[];

    useEffect(() => {
        setLoading(true)
        db.collection("addByAdmin")
            .onSnapshot((snapshot) => {
                setTotalUser(
                    snapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                );
                setLoading(false)
            })
    }, [])

    // total teacher
    const checkTeacher=(totalUser)=>{
        return totalUser?.data?.value==='teacher';
    }
  totalTeacher=totalUser.filter(checkTeacher);
console.log(totalTeacher.length);

    // total student
    const checkStudent=(totalUser)=>{
        return totalUser?.data?.value==='student';
    }
     totalStudent=totalUser.filter(checkStudent);

    //  total admin
    const checkAdmin=(totalUser)=>{
        return totalUser?.data?.value==='admin';
    }
     totalAdmin=totalUser.filter(checkAdmin);


    return (
        <div className="Admin_User">
            <div className="TotalUsers">
                <div className="totalUser__Header">
                    <div className="totalUser__Header__Head">
                        Total User
                    </div> 
                        <div className="totalUser__Header__Cross" onClick={()=>{
                            setShowBox(!showBox)
                        }}>
                            <ArrowDropDownRoundedIcon />
                        </div> 
                </div>
                {showBox && <div className="totalUser__Body">
                    {
                        loading ? (<div className="totalUser__Loading">
                            <div className="popupbodyImage_Loading">
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress style={{ fontSize: 110 }} />
                                </Box>
                            </div>
                        </div>) :
                        <>
                        <UserSummary user={totalUser.length} admin={totalAdmin.length} student={totalStudent.length} teacher={totalTeacher.length}/>
                            <>{totalUser.map((totalUser, Serial) => (
                                <AdminFieldforcourses totalUser={totalUser} Serial={Serial} show={false}/>
                            ))}</>
                            </>
                    }
                </div>
                }
            </div>

            {/* for total teacher */}
            <>
            <div className="TotalUsers">
                <div className="totalUser__Header">
                <div className="totalUser__Header__Head">
                        Total Teacher
                </div>
                <div className="totalUser__Header__SecHead">
                        <div className="totalUser__Header__AddUser">
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" onClick={()=>{
                                    history.push('/addteacher')
                                }}>Add Teacher</Button>
                            </Stack>
                        </div>
                        <div className="totalUser__Header__Cross" onClick={() => {
                            setShowBox1(!showBox1);
                        }}>
                            <ArrowDropDownRoundedIcon />
                        </div>
                    </div>
                    </div>
                {showBox1 && <div className="totalUser__Body">
                    {loading ? (<div className="totalUser__Loading">
                        <div className="popupbodyImage_Loading">
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress style={{ fontSize: 110 }} />
                            </Box>
                        </div>
                    </div>) : (
                        <>
                        <>{totalTeacher.length===0 && <div className="nodata">No Teacher</div>}</>
                    {totalTeacher.map((totalTeacher, Serial) => (
                        <>
                        <AdminField totalUser={totalTeacher} Serial={Serial} />
                        </>
                    ))}
                    </>
                    )
                    }
                </div>}
            </div>
            </>

            {/* for total user */}
            <>
            <div className="TotalUsers">
            <div className="totalUser__Header">
                <div className="totalUser__Header__Head">
                        Total Student
                </div>
                <div className="totalUser__Header__SecHead">
                        <div className="totalUser__Header__AddUser">
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" onClick={()=>{
                                    history.push('/addstudent')
                                }}>Add Student</Button>
                            </Stack>
                        </div>
                        <div className="totalUser__Header__Cross" onClick={() => {
                            setShowBox2(!showBox2);
                        }}>
                            <ArrowDropDownRoundedIcon />
                        </div>
                    </div>
                    </div>
                {showBox2 && <div className="totalUser__Body">
                    {loading ? (<div className="totalUser__Loading">
                        <div className="popupbodyImage_Loading">
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress style={{ fontSize: 110 }} />
                            </Box>
                        </div>
                    </div>) : (
                        <>
                        <>{totalStudent.length===0 && <div className="nodata">No Student</div>
                        }</>
                       {
                        totalStudent.map((totalStudent, Serial) => (
                        <AdminField totalUser={totalStudent} Serial={Serial} />
                    ))}
                    </>)}
                </div>}
            </div>
            </>

            <>
            <div className="TotalUsers">
            <div className="totalUser__Header">
                <div className="totalUser__Header__Head">
                        Total Admin
                </div>
                <div className="totalUser__Header__SecHead">
                        <div className="totalUser__Header__Cross" onClick={() => {
                            setShowBox3(!showBox3);
                        }}>
                            <ArrowDropDownRoundedIcon />
                        </div>
                    </div>
                    </div>
                {showBox3 && <div className="totalUser__Body">
                    {loading ? (<div className="totalUser__Loading">
                        <div className="popupbodyImage_Loading">
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress style={{ fontSize: 110 }} />
                            </Box>
                        </div>
                    </div>) : (
                        <>
                        <>{totalAdmin.length===0 && <div className="nodata">No Admin</div>
                        }</>
                       {
                        totalAdmin.map((totalStudent, Serial) => (
                        <AdminField totalUser={totalStudent} Serial={Serial} />
                    ))}
                    </>)}
                </div>}
            </div>
            </>

        </div>
    )
}

export default User
