import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import Footer from '../Global/Footer';


const AddNetwork = ({ axios }) => {

  //Notification
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });

  const [displayImg, setDisplayImg] = useState("")
  const [network, setNetwork] = useState({
    networkName: "",
    rpcUrl: "",
    apiKey: "",
    walletAddress: "",
    privateKey: "",
    image: displayImg,
  })

  const handleFormFieldChange = (fieldName, e) => {
    setNetwork({ ...network, [fieldName]: e.target.value })
  };

  const saveNetwork = () => {
    console.log(network);
    const { networkName, rpcUrl, apiKey, walletAddress, privateKey, image } = network;

    if (!networkName || !rpcUrl || !apiKey || !walletAddress || !privateKey || !image)
      return notifyError("Provide all data");

    let networkArray = [];
    const networkLists = localStorage.getItem("setNetworks");
    if (networkLists) {
      networkArray = JSON.parse(localStorage.getItem("setNetworks"));
      networkArray.push(network);
      localStorage.setItem("setNetworks", JSON.stringify(networkArray))
      notifySuccess("Network add Successfully")
      // window.location.reload();
    }
    else {
      networkArray.push(network);
      localStorage.setItem("setNetworks", JSON.stringify(networkArray))
      notifySuccess("Token add Successfully")
    }
    console.log(network);
  }

  const uploadToInfura = async (file) => {
    notifySuccess("Uploading File");
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: "6a3466cf0393ef9caf4c",
            pinata_secret_api_key: "eb14052d662e5e1959aa4c0fc4f3608e7621c5c5ad95aac3ce9ca2cf6ccfb4f2",
            "Content-Type":"multipart/form-data"
          }
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setNetwork({ ...network, image: ImgHash });
        setDisplayImg(ImgHash);
        notifySuccess("Uploaded Successfully");

      } catch (error) {
        notifyError("Unable to upload to Pinata");
        console.log(error);
      }
    }
  }

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  })

  const { getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
    isDragActive
  } = useDropzone({
    onDrop,
    maxSize: 500000000000
  });


  return (
    <div className='techwave_fn_content'>
      <div className="techwave_fn_page">
        <div className="techwave_fn_user_settings_page">
          <div className="techwave_fn_pagetitle">
            <h2 className="title"> Add Trading Tokens</h2>
          </div>
          <div className="container small">
            <div className="techwave_fn_user_settings">
              <form action="">
                <div className="user__settings">
                  <div className="settings_left">
                    <label htmlFor="input" className='fn__upload'>
                      {
                        displayImg == "" ? (
                          <span className="upload_content" {...getRootProps()}>
                            <span className='title'>Drag & Drop an Image</span>
                            <span className="fn__lined_text">
                              <span className="line"></span>
                              <span className="text">Ok</span>
                              <span className="line"></span>
                            </span>
                            <span className="title">Browse</span>
                            <span className="desc">Support JPG,JPEG and PNG</span>
                            <input type="file" accept='image/*' {...getInputProps()} />
                          </span>
                        ) : (
                          <img src={displayImg} className='prview_img' alt="" />
                        )
                      }
                    </label>
                  </div>

                  <div className="setting_right">
                    <div className="item">
                      <label htmlFor="name" className='input_label'>
                        Network Name
                      </label>
                      <div className="input_item">
                        <input type="text" className='input' placeholder='network' onChange={(e) => handleFormFieldChange("networkName", e)} />
                      </div>
                    </div>

                    <div className="item">
                      <label htmlFor="name" className='input_label'>
                        Alchemy Provider
                      </label>
                      <div className="input_item">
                        <input type="text" className='input' placeholder='RPC URL' onChange={(e) => handleFormFieldChange("rpcUrl", e)} />
                      </div>
                    </div>

                    <div className="item">
                      <label htmlFor="name" className='input_label'>
                        Alchemy API KEY
                      </label>
                      <div className="input_item">
                        <input type="text" className='input' placeholder='API KEY' onChange={(e) => handleFormFieldChange("apiKey", e)} />
                      </div>
                    </div>

                    <div className="item">
                      <label htmlFor="name" className='input_label'>
                        Wallet Address
                      </label>
                      <div className="input_item">
                        <input type="text" className='input' placeholder='Wallet Address' onChange={(e) => handleFormFieldChange("walletAddress", e)} />
                      </div>
                    </div>


                    <div className="item">
                      <label htmlFor="name" className='input_label'>
                        Private Key
                      </label>
                      <div className="input_item">
                        <input type="text" className='input' placeholder='Private Key' onChange={(e) => handleFormFieldChange("privateKey", e)} />
                      </div>
                    </div>

                    <div className="item">
                     <div>
                      <a onClick={()=>saveNetwork()} className='techwave_fn_button'>
                        Save Network
                      </a>
                     </div>
                    </div>



                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>

  )
}

export default AddNetwork
