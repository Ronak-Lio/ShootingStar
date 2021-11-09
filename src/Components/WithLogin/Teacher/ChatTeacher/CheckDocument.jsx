import React from 'react';
import { useHistory } from 'react-router-dom';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useStateValue } from '../../../../StateProvider';
import db from '../../../../firebase';
import { useState } from 'react';

function CheckDocument() {
    const history = useHistory();
    const [caption, setCaption] = useState('');
    const [
        {
            signInAs,
            user,
            teacherSubject,
            teacherSubjectId,
            teacherCourseId,
            selectImageChat,
        },
        dispatch
    ] = useStateValue();

    //   send image 
    const sendImage = (e) => {
        e.preventDefault();
        if (teacherCourseId && teacherSubjectId && selectImageChat) {
            db.collection("Courses")
                .doc(teacherCourseId)
                .collection("Subjects")
                .doc(teacherSubjectId)
                .collection("chat")
                .add({
                    // imageURL: imageURL,
                    caption: caption,
                })
                .then(() => {
                    setCaption('');
                });
        }
    }

    return (
        <div className="popupImage">
            <div className="popupImageIn">
                <div className="popupImageIntop">
                    <div className="nameImage">Selected Document</div>
                    <div
                        className="BackiconImage"
                        onClick={() => history.push('/main')}
                    >
                        <ClearRoundedIcon className="BackiconiImage" />
                    </div>
                </div>
                <div className="popupbodyImage">
                    <div className="popupbody_Image">
                        {selectImageChat && <img src={URL.createObjectURL(selectImageChat)} className="popupbody_Image" alt="" />}
                    </div>
                    <div className="button">
                        <input placeholder={'Caption'} value={caption} type="text" onChange={e => setCaption(e.target.value)} />
                        <div className="sendDiv">
                            <SendRoundedIcon id={'sendicon'} fontSize={'large'} onClick={sendImage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckDocument;
