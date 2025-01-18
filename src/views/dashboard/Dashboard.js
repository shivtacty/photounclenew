import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

const ImageGallery = () => {
  const [imagesData, setImageData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  
  const [imageToDelete, setImageToDelete] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = await axios.get("https://photouncle.com/gateway/web/genie/parent-photouncle/v2/SelectPictureAPI");
        if (response.status === 200) {
          setImageData(response.data);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [flag]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("https://photouncle.com/gateway/web/genie/parent-photouncle/v2/RetouchedPicsAPI");
        if (response.status === 200) {
          console.log(response.data);
          
          setSelectedImages(response.data);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };
    fetchData();
  }, [flag,deleteModalVisible]);

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

  const handleCommentChange = (index, event) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index].comment = event.target.value;
    setSelectedItems(updatedSelectedItems);
  };

  const handleSubmit = async () => {
    let data = new FormData();
    const formattedData = selectedItems.map(item => ({
      image_comments: item.comment,
      clientid: 2899,
      google_image_id: item.google_image_id,
      google_image: item.google_image,
    }));

    data.append('Photo', JSON.stringify(formattedData));

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://photouncle.com/gateway/web/genie/parent-photouncle/v2/ImageInsertApi.php',
      data: data
    };

    try {
      const response = await axios.request(config);
      setFlag(true);
      console.log(response.data);
      setShowSuccessToast(true); 
    } catch (error) {
      console.log(error);
    }
  };
  const localData =localStorage.getItem('authToken')

  
  const handleDeleteImage = async (imgId) => {
    setImageToDelete(imgId);
    setDeleteModalVisible(true);
    
    let data = new FormData();

    data.append('delete_image', imgId);
    data.append('clientid', localData);
    
    // const updatedSelectedItems = selectedItems.filter((itemIndex) => itemIndex !== imgId);
    // const updatedSelectedImages = selectedImages.filter((image) => image.id !== selectedImages[imgId].id);

    // setSelectedItems(updatedSelectedItems);
    // setSelectedImages(updatedSelectedImages);
console.log(flag);

    try {
      const config = {
        method: 'post',
        url: 'https://photouncle.com/gateway/web/genie/parent-photouncle/v2/ImageDeleteApi.php',
        data: data,
      };
      const response = await axios.request(config);
      if(response?.data?.status){
        console.log(response);
        
      
        console.log('Image deleted from server:', response.data);
        setFlag(true)
      }
      
      // alert('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    }
  };

  const handleDelete=()=>{
    setDeleteModalVisible(false)
  }

  return (
    <div className="p-4">
      <CTabs activeItemKey="total" style={{ border: '2px solid #ddd', borderRadius: '10px' }}>
        <div className="fixed-tab-header">
          <CTabList variant="tabs">
            <CTab itemKey="total">
              <span>Total Items</span>
              <CBadge color="info" className="ms-2">{imagesData.length}</CBadge>
            </CTab>
            <CTab itemKey="selected">
              <span>Selected Items</span>
              <CBadge color="success" className="ms-2">{loading ? "" : selectedImages.length}</CBadge>
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
                {imagesData.map((item, index) => (
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
                            onChange={(event) => handleCommentChange(index, event)}
                            placeholder="Add a comment"
                          />
                        </CCardBody>
                      )}
                    </CCard>
                  </CCol>
                ))}
              </CRow>
            )}

            {/* Submit Button */}
            <div
              className="d-flex justify-content-center mt-4"
              style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                width: '100%',
                textAlign: 'center',
              }}
            >
              <CButton color="primary" onClick={handleSubmit}>
                Submit Selected Items
              </CButton>
            </div>
          </CTabPanel>

          {/* Success Toast */}
          {showSuccessToast && (
            <CToast autohide={true} visible={showSuccessToast} color="success" className="position-fixed top-0 end-0 m-3">
              <CToastHeader closeButton>
                <strong className="me-auto">Success</strong>
              </CToastHeader>
              <CToastBody>
                The selected items have been successfully submitted!
              </CToastBody>
            </CToast>
          )}

<CTabPanel className="p-3" itemKey="selected">
            <CRow>
              {selectedImages.map((selectedIndex, index) => {
                console.log(selectedIndex);

                // const item = imagesData[selectedIndex];
                return (
                  <CCol key={selectedIndex?.google_image_id} sm="6" md="4" lg="3" className="mb-4">
                    <CCard className="shadow-sm border-0 position-relative">
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
                      <a href={selectedIndex.image_url} target="_blank" rel="noopener noreferrer">
                        <CImage
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
                        <CFormInput
                          className="mt-2"
                          type="text"
                          value={selectedIndex.comments}
                          // onChange={(event) => handleCommentChange(index, event)}
                          placeholder="Add a comment"
                        />
                      </CCardBody>
                    </CCard>
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
    <CButton
      color="danger"
      // onClick={() => {
      //   if (imageToDelete) {
      //     deleteImage(imageToDelete); 
      //     setDeleteModalVisible(false); 
      //   }
      // }}

      onClick={() => setDeleteModalVisible(false)}
    >
      Delete
    </CButton>
  </CModalFooter>
</CModal>

            </CRow>
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default ImageGallery;
