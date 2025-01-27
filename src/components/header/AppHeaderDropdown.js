import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/Action/AuthAction'
const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Handle logout action
  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/');
    
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
      <CDropdownItem   onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2"  />
          Logout
        </CDropdownItem>
      </CDropdownToggle>

    </CDropdown>
  )
}

export default AppHeaderDropdown
