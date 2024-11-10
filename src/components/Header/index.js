import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import SearchBox from 'components/SearchBox'
import Box from 'components/Box'
import Container from 'components/Container'
import { compose, position } from 'styled-system'

const HeaderWrapper = styled('div')(compose(position), {
  display: 'flex',
  flexWrap: 'wrap',
  position: 'sticky',
  boxShadow: `0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.15)}`,
  zIndex: 3,
  backdropFilter: 'blur(2px)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)', // adjust the color and opacity to your liking
})

const Header = ({ currentIndex, refreshIndexes, isBannerVisible }) => (
  <HeaderWrapper top={isBannerVisible ? 55 : 0}>
    <Container
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      flexWrap="wrap"
    >
      <img
        loading="lazy"
        style={{
          maxWidth: '900px',
          marginBottom: '10px',
          width: '100%',
          objectFit: 'contain',
        }}
        src="https://festadolivro.edusp.com.br/storage/events/event-1/event-banner-gallery-desktop/15b14334a3298203fa318a765bea6f8cf5e33f59_banner-gif-26-festalivro-usp-desktop.gif"
        alt="Banner 26 festa do livro"
      />
      <Box display="flex" style={{ width: '100%' }}>
        <SearchBox
          refreshIndexes={refreshIndexes}
          currentIndex={currentIndex}
          style={{ flex: '1' }}
        />
      </Box>
    </Container>
  </HeaderWrapper>
)

export default Header
