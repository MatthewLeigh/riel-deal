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
        overflow: 'hidden',
        width: '100vw',
        minHeight: '100dvh',
      }}
    >
      <Box
        component="img"
        src={image}
        alt=""
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '100dvh',
          objectFit: 'cover',
        }}
      />
    </Box>
  )
}

export default BackgroundImage