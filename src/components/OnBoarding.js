import React from 'react'

import Box from 'components/Box'
import Typography from 'components/Typography'

const OnBoarding = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100%"
  >
    <Typography variant="typo12" mb={42} color="gray.0">
      Ache bons livros.
    </Typography>
    <Typography
      variant="typo8"
      color="gray.0"
      style={{ maxWidth: 368, textAlign: 'center' }}
      mt={68}
    >
      Organizada anualmente pela Edusp desde 1999, a Festa do Livro da USP é um
      evento já tradicional na Universidade de São Paulo que procura aproximar
      editoras e leitores, oferecendo livros de qualidade a um preço especial.
    </Typography>
    <Typography
      variant="typo8"
      color="gray.0"
      style={{ maxWidth: 368, textAlign: 'center' }}
      mt={20}
    >
      Essa aplicação busca ser uma maneira de achar livros bacanas da maneira
      mais natural possível.
    </Typography>
  </Box>
)

export default OnBoarding
