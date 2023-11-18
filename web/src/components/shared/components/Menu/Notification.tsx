import React from 'react';
import { Box, ClickAwayListener } from '@mui/material';
import { NotificationContainerBox, SingleNotificationBox } from './styles';

interface Props {
  messages: string[];
  setIsNotificationOpen: () => void;
}

const Notification: React.FC<Props> = ({ messages, setIsNotificationOpen }) => {
  return (
    <ClickAwayListener onClickAway={setIsNotificationOpen}>
      <NotificationContainerBox>
        {messages.length ? (
          messages.map((msg, idx) => <SingleNotificationBox key={idx}>{msg}</SingleNotificationBox>)
        ) : (
          <Box sx={{ textAlign: 'center' }}>You have no new notifications</Box>
        )}
      </NotificationContainerBox>
    </ClickAwayListener>
  );
};

export default Notification;
