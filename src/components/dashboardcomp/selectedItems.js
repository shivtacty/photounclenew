import React, { useState } from 'react';
import { CRow, CCol, CCard, CCardBody, CImage, CFormInput, CModal, CModalBody, CModalHeader, CModalTitle, CCarousel, CCarouselItem } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

const SelectedItems = ({ selectedImages, handleDeleteImage, handleCommentChange, selectedItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Function to open the modal and set the selected image index
  const openModal = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <CRow>
        {selectedImages.map((selectedIndex, index) => {
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
                    onClick={() => openModal(index)} // Open the modal when the image is clicked
                  />
                </a>
                <CCardBody>
                  <CFormInput
                    className="mt-2"
                    type="text"
                    value={selectedIndex?.comment || ''}
                    onChange={(event) => handleCommentChange(index, event)}
                    placeholder="Add a comment"
                  />
                </CCardBody>
              </CCard>
            </CCol>
          );
        })}
      </CRow>

      {/* Modal for Image Slider */}
      <CModal visible={showModal} onClose={closeModal} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Image Slider</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCarousel activeIndex={selectedImageIndex} onSelect={setSelectedImageIndex}>
            {selectedImages.map((selectedIndex, index) => (
              <CCarouselItem key={selectedIndex?.google_image_id}>
                <CImage
                  src={selectedIndex.image_url}
                  alt={`Slide ${index}`}
                  className="d-block w-100"
                  style={{ objectFit: 'cover', maxHeight: '500px' }}
                />
              </CCarouselItem>
            ))}
          </CCarousel>
        </CModalBody>
      </CModal>
    </>
  );
};

export default SelectedItems;
