import React from 'react'
import Box from '@mui/material/Box'

interface BackgroundImageProps {
  image: string
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ image }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        opacity: 0.4,
        zIndex: -1,
        overflow: 'hidden'
      }}
    >
      <Box
        component="img"
        src={image}
        alt=""
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Box>
  )
}

export default BackgroundImage