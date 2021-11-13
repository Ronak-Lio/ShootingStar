import React, { useEffect, useState } from 'react';
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import db from '../../../../firebase';
import AdminField from './AdminField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function User() {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [totalUser, setTotalUser] = useState([]);
    const [totalTeacher, setTotalTeacher] = useState([]);
    const [totalStudent, setTotalStudent] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const [showBox1, setShowBox1] = useState(false);
    const [showBox2, setShowBox2] = useState(false);


    useEffect(() => {
        setLoading(true)
        db.collection("users")
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

    useEffect(() => {
        setLoading(true);
        db.collection("students")
            .onSnapshot((snapshot) => {
                setTotalStudent(
                    snapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                );
                setLoading(false)
            })
    }, [])


    useEffect(() => {
        setLoading(true)
        db.collection("teachers")
            .onSnapshot((snapshot) => {
                setTotalTeacher(
                    snapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                )
                setLoading(false);
            })
    }, [])


    return (
        <div className="Admin_User">
            <div className="TotalUsers">
                <div className="totalUser__Header">
                    <div className="totalUser__Header__Head">
                        Total Users
                    </div> 
                        <div className="totalUser__Header__Cross" onClick={() => {
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
                            (totalUser.map((totalUser, Serial) => (
                                <AdminField totalUser={totalUser} Serial={Serial} />
                            )))
                    }
                </div>
                }
            </div>

            {/* for total teacher */}
            <div className="TotalUsers">
                <div className="totalUser__Header">
                <div className="totalUser__Header__Head">
                        Total Users
                </div>
                <div className="totalUser__Header__SecHead">
                        <div className="totalUser__Header__AddUser">
                            <Stack spacing={2} direction="row">
                                <Button variant="contained">Add User</Button>
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
                    </div>) : (totalTeacher.map((totalTeacher, Serial) => (
                        <AdminField totalUser={totalTeacher} Serial={Serial} />
                    )))}
                </div>}
            </div>

            {/* for total user */}
            <div className="TotalUsers">
            <div className="totalUser__Header">
                <div className="totalUser__Header__Head">
                        Total Users
                </div>
                <div className="totalUser__Header__SecHead">
                        <div className="totalUser__Header__AddUser">
                            <Stack spacing={2} direction="row">
                                <Button variant="contained">Add User</Button>
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
                    </div>) : (totalStudent.map((totalStudent, Serial) => (
                        <AdminField totalUser={totalStudent} Serial={Serial} />
                    )))}
                </div>}
            </div>
        </div>
    )
}

export default User
