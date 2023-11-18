import React from 'react';
import { Box, ClickAwayListener } from '@mui/material';

interface Props {
  messages: string[];
  setIsNotificationOpen: () => void;
}

const Notification: React.FC<Props> = ({ messages, setIsNotificationOpen }) => {
  return (
    <ClickAwayListener onClickAway={setIsNotificationOpen}>
      <Box
        display="flex"
        flexDirection="column"
        position="absolute"
        sx={{
          borderRadius: '8px',
          backgroundColor: 'white',
          padding: '12px',
          right: 0,
          minWidth: '200px',
          textAlign: 'left',
          overflow: 'auto',
        }}
      >
        {messages.length ? (
          messages.map((msg, idx) => (
            <Box key={idx} padding="8px 4px" sx={{ borderBottom: '1px solid gray' }}>
              {msg}
            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: 'center' }}>You have no new notifications</Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default Notification;
