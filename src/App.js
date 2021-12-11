import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [percentage, setPercentage] = useState(0);
    const [progress,   setProgress] = useState(null);

    const download = () => {
        const documentStyles = document.documentElement.style;
        let progress = 0;
    
        setProgress('in-progress');
    
        axios({
            url: 'http://d0c1b51c8c72.ngrok.io/manageDatabase/downloadFile',
            onDownloadProgress(progressEvent) {
                progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);

                setPercentage(progress);

                documentStyles.setProperty('--progress', `${progress}%`);
            }
        }).then(response => {
            setProgress('finished');
             const url = window.URL.createObjectURL(new Blob([response.data]));  //Each time you call createObjectURL(), a new object URL is created, even if you've already created one for the same object.
            const link = document.createElement("a");    // It just creates a hyperlink element
            link.href = url;
            link.setAttribute("download", "http://d0c1b51c8c72.ngrok.io/download_row_data/weekly/sample.zip");
            // you can add new attribute values or change existing ones using the setAttribute( ) method. 
            // If you want to set the href value of a specific page on url="http://easy-designs.net"/>, you could do so using setAttribute( ):
            // //or any other extension
            document.body.appendChild(link);
            link.click();
            window.open("http://d0c1b51c8c72.ngrok.io/download_row_data/weekly/sample.zip");
        });
    };

    return (
        <div className={`progress-button ${progress}`}>
            <span className="loading-text">Loading</span>
                <button className="download-button" 
                onClick={download}
                // onClick={()=>window.open("http://d0c1b51c8c72.ngrok.io/download_row_data/weekly/sample.zip")}
                >
                    <span className="button-text">{progress === 'finished' ? '🎉 Done' : 'Download'}</span>
                </button>
            <span className="percentage">{percentage}%</span>
        </div>
    );
}

export default App;

















// import React, { useState } from 'react';
// // import axios from 'axios';
// import './App.css';
// // import GetAppIcon from '@material-ui/icons/GetApp';
// import { FadeLoader } from "react-spinners";

// function App() {
//     // const [percentage, setPercentage] = useState(0);

//     const [progress,   setProgress] = useState(false);

//     const download = () => {
//         // const documentStyles = document.documentElement.style;
//         // let progress = 0;
    
//         setProgress(true);
//         fetch( 'http://d0c1b51c8c72.ngrok.io/manageDatabase/downloadFile' )
//         .then((res) =>res.json()
//         )
//         .then(res =>{
//             setProgress(false);
//             if(res.status === 200)
//             window.open(res.filePath , '_self')
//             console.log(res)
//         })
//         .catch(error=>
//             console.log(error))
//         // axios({
//         //     url: 'http://d0c1b51c8c72.ngrok.io/manageDatabase/downloadFile',
//             // onDownloadProgress(progressEvent) {
//             //     progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);

//             //     setPercentage(progress);

//             //     documentStyles.setProperty('--progress', `${progress}%`);
//             // }
//         // }).then(response => {
//             // const url = window.URL.createObjectURL(new Blob([response.data]));
//             // const link = document.createElement("a");
//             // link.href = url;
//             // link.setAttribute("download", "http://d0c1b51c8c72.ngrok.io/download_row_data/weekly/sample.zip");
//             // //or any other extension
//             // document.body.appendChild(link);
//             // link.click();
//             // window.open("http://d0c1b51c8c72.ngrok.io/download_row_data/weekly/sample.zip");
//             // setProgress('finished');
//         // });
//     };

//     return (
//         <div className={`progress-button ${progress}`}>
//             {
//                 progress ? (
//                     <div className= {`Loader Upload`}>
//                     <FadeLoader 
//                     style={{ height: "15", width: "5", radius: "2" }}
//                     color={"#6FABF0"}>
//                     </FadeLoader>
//                 </div>
//                 ) : null
//             }
//             <div>
//             {/* <span className="loading-text">Loading</span> */}
//                 <button className="download-button" 
//                 onClick={download} 
//                 // onClick={()=>window.open("http://d0c1b51c8c72.ngrok.io/download_row_data/weekly/sample.zip")}
//                 >Download
//                     {/* <span className="button-text">{progress === 'finished' ? '🎉 Done' : 'Download'}</span> */}
//                 </button>
//             {/* <span className="percentage">{percentage}%</span> */}
//             </div>
//         </div>
//     );
// }

// export default App;
