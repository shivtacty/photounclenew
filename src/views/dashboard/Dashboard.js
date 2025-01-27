import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CFormCheck,
  CImage,
  CFormInput,
  CButton,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
  CCardText,
  CBadge,
  CToast,
  CToastBody,
  CToastHeader,
  CSpinner,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CFormLabel,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { CardText } from 'react-bootstrap';


const ImageGallery = () => {
  const [imagesData, setImageData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const [showDeleteTost, setShowDeleteTost] = useState(false)
  const [message, setMessage] = useState('')

  const handleOpenCarousel = () => {
    setShowCarousel(true);
  };

  // console.log(showSuccessToast);
  
  // const handleCloseCarousel = () => {
  //   setShowCarousel(false);
  // };


  // //console.log(localstorageData)

  const localData1 = localStorage.getItem('authToken')

  const data = JSON.parse(localData1)

  const localData = data?.pid
  //console.log(localData);

  useEffect(()=>{
    console.log(showDeleteTost);
    
    if(showDeleteTost){
      setTimeout(()=>{
        setShowDeleteTost(false)

      },5000)
    }

  },[showDeleteTost])

  useEffect(()=>{
    console.log(showSuccessToast);
    
    if(showSuccessToast){
      setTimeout(()=>{
        setShowSuccessToast(false)

      },5000)
    }

  },[showSuccessToast])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        let response = await axios.get(`https://plum-termite-772310.hostingersite.com/photouncle/api/selectedApi?email=${data.pemail}&name=${data.FirstName}&instituteid=${data.InstituteName}&pid=${data.pid}`);
        // console.log(response);

        if (response.status === 200) {
        
          setImageData(response?.data?.data);
        } else {
          setImageData([])
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [flag, deleteModalVisible]);

  // console.log(imageToDelete);

  useEffect(() => {
    setFlag(false);

    const fetchData = async () => {
      try {
        let response = await axios.get(`https://plum-termite-772310.hostingersite.com/photouncle/api/retouchedApi?email=${data.pemail}&name=${data.FirstName}&instituteid=${data.InstituteName}&pid=${data.pid}`);
        // console.log(response);

        if (response.status === 200) {
          //console.log(response.data);

          setSelectedImages(response.data?.data);
        } else {
          setSelectedImages([]);

        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };
    fetchData();
  }, [flag, deleteModalVisible]);

  const handleCheckboxChange = (item) => {
    const updatedSelectedItems = [...selectedItems];
    const isSelected = updatedSelectedItems.some(
      (selectedItem) => selectedItem.google_image_id === item.google_image_id
    );

    if (isSelected) {
      const filteredItems = updatedSelectedItems.filter(
        (selectedItem) => selectedItem.google_image_id !== item.google_image_id
      );
      setSelectedItems(filteredItems);
    } else {
      updatedSelectedItems.push({ ...item, comment: "" });
      setSelectedItems(updatedSelectedItems);
    }
  };

  const handleCommentChange = (itemId, event) => {
    const updatedSelectedItems = selectedItems.map(item =>
      item.google_image_id === itemId
        ? { ...item, comment: event.target.value }
        : item
    );
    setSelectedItems(updatedSelectedItems);
  };




  const handleSubmit = async () => {
    let data = new FormData();
    const formattedData = selectedItems.map(item => ({
      image_comments: item.comment,
      clientid: localData,
      google_image_id: item.google_image_id,
      google_image: item.google_image,
    }));

    data.append('Photo', JSON.stringify(formattedData));

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://plum-termite-772310.hostingersite.com/photouncle/api/ImageInsertApi',
      data: data
    };

    try {
      const response = await axios.request(config);
      // console.log(response);

      if (response.data.status) {
        // console.log(response.data.data);
        setFlag(true);
        setShowSuccessToast(true);
      }

    } catch (error) {
      //console.log(error);
    }
  };

  // console.log(flag);


  const handleDelete = async () => {
    setDeleteModalVisible(false);

    if (imageToDelete) {
      let data = new FormData();
      data.append('delete_image', imageToDelete);
      data.append('clientid', localData);

      try {
        const config = {
          method: 'post',
          url: 'https://plum-termite-772310.hostingersite.com/photouncle/api/ImageDeleteApi',
          data: data,
        };
        const response = await axios.request(config);
        // console.log(response.data);

        if (response?.data?.status) {
          // console.log('Image deleted successfully:', response.data);
          setMessage(response?.data?.message)
          setShowDeleteTost(true)
          setFlag(true);
        } else {
          console.error('Failed to delete image');
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };
  // console.log(message);


  const handleDeleteImage = (imgId) => {
    setImageToDelete(imgId);
    setDeleteModalVisible(true);
  };

  const carouselRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (carouselRef.current && !carouselRef.current.contains(event.target)) {
        setShowCarousel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <CTabs activeItemKey="total" >
        <div className="fixed-tab-header" >
          <CTabList variant="tabs" className='d-flex justify-content-center w-100'  >
            <CTab itemKey="total" className='tabname'>
              <span>Total Items</span>
              <CBadge color="info" className="ms-2">{imagesData ? imagesData?.length : ""}</CBadge>
            </CTab>
            <CTab itemKey="selected" className='tabname'>
              <span>Selected Items</span>
              <CBadge color="success" className="ms-2">{selectedImages ? selectedImages.length : ''}</CBadge>
            </CTab>
          </CTabList>
        </div>

        <CTabContent>
          <CTabPanel className="p-3" itemKey="total">
            <div className="container mt-1">
              <CRow className="text-center">
                <CCol sm="4" className="mb-4">
                  <CCard className="shadow-sm border-0">
                    <CCardBody>
                      <CImage
                        src="https://photouncle.com/gateway/web/genie/parent-mybaby247/eye-24-512.png"
                        alt="View Zoom"
                        width="70"
                        height="70"
                        className="mb-3"
                      />
                      <CCardText
                        component="p"
                        style={{
                          fontFamily: 'Calibri',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#333',
                        }}
                      >
                        1. Click image to View / Zoom
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol sm="4" className="mb-4">
                  <CCard className="shadow-sm border-0">
                    <CCardBody>
                      <CImage
                        src="https://photouncle.com/gateway/web/genie/parent-mybaby247/Very-Basic-Checked-checkbox-icon.png"
                        alt="Select Images"
                        width="70"
                        height="70"
                        className="mb-3"
                      />
                      <CCardText
                        component="p"
                        style={{
                          fontFamily: 'Calibri',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#333',
                        }}
                      >
                        2. Check/Select images for editing
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol sm="4" className="mb-4">
                  <CCard className="shadow-sm border-0">
                    <CCardBody>
                      <CImage
                        src="https://photouncle.com/gateway/web/genie/parent-mybaby247/submitbutton.png"
                        alt="Submit"
                        width="70"
                        height="70"
                        className="mb-3"
                      />
                      <CCardText
                        component="p"
                        style={{
                          fontFamily: 'Calibri',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#333',
                        }}
                      >
                        3. Click the Submit button
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <CSpinner color="primary" />
                <span className="ms-2">Loading images...</span>
              </div>
            ) : (
              <CRow>
                {imagesData ? imagesData?.map((item, index) => (
                  <CCol key={index} sm="6" md="4" lg="3" className="mb-4">
                    <CCard
                      className="shadow-sm border-0 position-relative"
                      style={{
                        overflow: 'hidden',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="position-relative">
                        <a href={item?.image_url} target="_blank" rel="noopener noreferrer">
                          <CImage
                            className="img-fluid rounded"
                            src={item?.image_url}
                            style={{ width: '100%', objectFit: 'cover' }}
                          />
                        </a>
                        <CFormCheck
                          type="checkbox"
                          checked={selectedItems.some(selectedItem => selectedItem.google_image_id === item.google_image_id)}
                          onChange={() => handleCheckboxChange(item)}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            transform: 'scale(1.2)',
                            cursor: 'pointer',
                          }}
                        />
                      </div>

                      {selectedItems.some(selectedItem => selectedItem.google_image_id === item.google_image_id) && (
                        <CCardBody>
                          <CFormInput
                            type="text"
                            value={selectedItems.find(selectedItem => selectedItem.google_image_id === item.google_image_id)?.comment || ''}
                            onChange={(event) => handleCommentChange(item.google_image_id, event)}
                            placeholder="Add a comment"
                          />
                        </CCardBody>
                      )}
                    </CCard>
                  </CCol>
                )) : <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                  <CSpinner color="primary" />
                  <span className="ms-2">No Data</span>
                </div>}

              </CRow>
            )}

            {/* Submit Button */}
            <div
              className="d-flex justify-content-center mt-4 " id="submitbtn"

            >
              <CButton color="primary" onClick={handleSubmit}>
                Submit Selected Items
              </CButton>
            </div>
          </CTabPanel>

          {/* Success Toast */}
          {showSuccessToast && (
            <CToast autohide={true} visible={showSuccessToast} color="success" className="position-fixed top-0 end-0 m-3" style={{ zIndex: '9999' }}>
              {/* <CToastHeader closeButton>
                <strong className="me-auto">Success</strong>
              </CToastHeader> */}
              <CToastBody>
                The selected items have been successfully submitted!
              </CToastBody>
            </CToast>
          )}
          {showDeleteTost && (
            <CToast autohide={true} visible={showDeleteTost} color="danger" className="position-fixed top-0 end-0 m-3" style={{ zIndex: '9999' }}>

              <CToastBody>
                {message}
              </CToastBody>
            </CToast>
          )}



          {/* {showSuccessoast && (
            <CToast autohide={true} visible={showSuccessToast} color="success" className="position-fixed top-0 end-0 m-3" style={{zIndex:'9999'}}>
              
              <CToastBody>
               {message}
              </CToastBody>
            </CToast>
          )} */}


          <CTabPanel className="p-3" itemKey="selected">
            <CRow>
              {selectedImages.map((selectedIndex, index) => {
                //console.log(selectedIndex);

                // const item = imagesData[selectedIndex];
                return (
                  <CCol key={selectedIndex?.google_image_id} sm="6" md="4" lg="3" className="mb-4">
                    <CCard className="shadow-sm border-0 position-relative cursor-pointer">
                      <CIcon
                        icon={cilTrash}
                        className="position-absolute top-0 end-0 m-2"
                        style={{
                          color: 'red',
                          fontSize: '1.8rem',
                          cursor: 'pointer',
                          boxShadow: 'rgb(1 1 18 / 94%) 1px -1px 5px 0px',
                          width: '35px',
                          height: '35px',
                          padding: '7px',
                          borderRadius: '5px',
                          background: 'white',
                        }}
                        onClick={() => handleDeleteImage(selectedIndex?.google_image_id)}

                      />
                      <a rel="noopener noreferrer">
                        <CImage
                          onClick={handleOpenCarousel}
                          className="img-fluid rounded"
                          src={selectedIndex.image_url}
                          style={{ width: '100%', objectFit: 'cover' }}
                        />
                      </a>

                      <CCardBody>
                        {/* <CCardText
                          className='p-1'
                          component="p"
                          style={{
                            fontFamily: 'Calibri',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#333',
                          }}
                        >
                          {selectedIndex?.google_image}
                        </CCardText> */}

                        <CFormLabel >Comment:</CFormLabel>
                        <CardText className="mt-2">
                          {selectedIndex.comments}
                        </CardText>
                      </CCardBody>
                    </CCard  >
                  </CCol>
                );
              })}


              <CModal
                visible={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
                alignment="center"
              >
                <CModalHeader closeButton>
                  <CModalTitle>Confirm Deletion</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  Are you sure you want to delete this image?
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}>
                    Cancel
                  </CButton>
                  <CButton color="danger" onClick={handleDelete}>
                    Delete
                  </CButton>
                </CModalFooter>
              </CModal>

            </CRow>
          </CTabPanel>
        </CTabContent>
      </CTabs>

      <div className="">

        {showCarousel && (
          <>
            <div className="overlay" />
            <div ref={carouselRef}>
              <Carousel className="test1">
                {selectedImages.map((item) => (
                  <Carousel.Item key={item.google_image_id}>
                    <CImage className="img-fluid rounded" src={item.image_url} />
                    <Carousel.Caption>
                      <h3>{item.google_image}</h3>
                      <p>{item.comments}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </>
        )}
      </div>


    </div>
  );
};

export default ImageGallery;
