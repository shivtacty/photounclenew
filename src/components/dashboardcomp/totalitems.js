import React from 'react';
import { CRow, CCol, CCard, CCardBody, CImage, CFormCheck } from '@coreui/react';

const TotalItems = ({ imagesData, selectedItems, handleCheckboxChange }) => {
  return (
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
              // Show the checkbox on hover
              const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
              checkbox.style.opacity = '1';
              checkbox.style.transform = 'translate(-50%, -50%) scale(1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              // Hide the checkbox on hover out
              const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
              checkbox.style.opacity = '0';
              checkbox.style.transform = 'translate(-50%, -50%) scale(1.2)';
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
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(1.2)',
                  cursor: 'pointer',
                  opacity: '0', // Initially hidden
                  transition: 'opacity 0.3s, transform 0.3s', // Smooth transition for opacity and transform
                }}
              />
            </div>
          </CCard>
        </CCol>
      ))}
    </CRow>
  );
};

export default TotalItems;
