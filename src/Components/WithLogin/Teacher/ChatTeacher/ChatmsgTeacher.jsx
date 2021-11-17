import React, { useState } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Player } from 'video-react';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

function ChatmsgTeacher({ message }) {
    const [popupshowImageFUll, setPopupshowImageFUll] = useState(false);
    const [popupshowPdfFUll, setPopupshowPdfFUll] = useState(false);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    console.log(message.data?.fileUrl);
    return (
        <>
            {popupshowImageFUll && (
                <div className="popupChatTeacher">
                    <div
                        className="popUpTOP"
                        onClick={() => setPopupshowImageFUll(!popupshowImageFUll)}
                    >
                        <div className="popUpTOP__first">
                            <h6>{message.data?.sendby && message.data?.sendby}</h6>
                        </div>
                        <ClearRoundedIcon className="backIconChat" />
                    </div>
                    <div className="popupbodyImage_Img">
                        <img src={message.data?.imageURL} alt="" className="popupbody_Image_img" />
                    </div>
                </div>
            )}
            {popupshowPdfFUll && (
                <div className="popupChatTeacher">
                    <div
                        className="popUpTOP"
                        onClick={() => setPopupshowPdfFUll(!popupshowPdfFUll)}
                    >
                        <div className="popUpTOP__first">
                            <h6>{message.data?.sendby && message.data?.sendby}</h6>
                        </div>
                        <ClearRoundedIcon className="backIconChat" />
                    </div>
                    <div className="popupbodyImage_Img"> 
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={message.data?.fileUrl}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker> 
                    </div>
                </div>
            )}
            <div className="chatTeacher__message__my">
                <h6>{message.data?.sendby && message.data?.sendby}</h6>
                <div className="chatTeacher__message_div">
                    {message.data?.imageURL && <div onClick={() => {
                        setPopupshowImageFUll(!popupshowImageFUll);
                    }}>
                        <img src={message.data?.imageURL} alt="" className='imageMessage' />
                        <p>{message.data?.imageOriginalName}</p>
                    </div>}
                    {message.data?.videoURL && <>
                        <div className='videoMessage'>
                            <Player
                                playsInline
                                poster="/assets/poster.png"
                                src={message.data?.videoURL}
                            />
                            <div className="Name_Download">
                            <p>{message.data?.videoOriginalName}</p>
                            <a href={message.data?.videoURL}><ArrowCircleDownRoundedIcon fontSize="large" /></a>
                            </div>
                        </div>

                    </>
                    }
                    <h5>
                        {message.data?.message && message.data?.message}
                    </h5>
                            
                        {message.data?.fileUrl && <h5 onClick={()=>{setPopupshowPdfFUll(true)
                        
                        }}>{message.data?.fileName}</h5>}

                    {message.data?.caption && <h5>
                        {message.data?.caption}
                    </h5>}
                    <p className="dateChat">{message.data?.date}</p>
                </div>
            </div>
        </>
    )
}

export default ChatmsgTeacher;
