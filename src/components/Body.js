import React, { useContext, useState } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import { FiEye, FiTrash, FiClipboard, FiXCircle } from 'react-icons/fi'

import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import Box from 'components/Box'
import Header from 'components/Header/index'
import BodyWrapper from 'components/BodyWrapper'
import EmptyView from 'components/EmptyView'
import OnBoarding from 'components/OnBoarding'
import Results from 'components/Results'
import Typography from 'components/Typography'
import { CartContext } from 'context/CartContext'
import theme from 'theme'
import styled from 'styled-components'

const Button = styled.button`
  font-size: 16px;
  border: 1px solid ${theme.colors.gray[5]}
  background: none;
  padding: 10px;
  color: ${theme.colors.gray[2]};
  margin-right: 10px;
  border: none;
  &:active {
    background: ${theme.colors.gray[8]};
  }
  border-radius: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const IndexContent = ({ currentIndex }) => {
  if (!currentIndex) return <OnBoarding />
  if (currentIndex?.stats?.numberOfDocuments > 0) return <Results />
  return (
    <EmptyView buttonLink="https://docs.meilisearch.com/reference/api/documents.html">
      <Typography
        variant="typo8"
        style={{ textAlign: 'center' }}
        mb={32}
        color="gray.0"
      >
        There’s no document in the selected index
      </Typography>
    </EmptyView>
  )
}

const Body = ({
  currentIndex,
  indexes,
  getIndexesList,
  setCurrentIndex,
  requireApiKeyToWork,
  isApiKeyBannerVisible,
}) => {
  const { meilisearchJsClient, instantMeilisearchClient } =
    useMeilisearchClientContext()

  const { cartItems, removeItemFromCart, clearCart } = useContext(CartContext)
  const parseCurrency = (value) => {
    // Remove any non-numeric characters except for the comma (which is used as a decimal separator in some locales)
    const cleanedValue = value.replace(/[^0-9,]/g, '')

    // Replace the comma with a dot (which is the standard decimal separator in JavaScript)
    const decimalValue = cleanedValue.replace(',', '.')

    // Parse the string into a float
    return parseFloat(decimalValue)
  }
  const [cartVisible, setCartVisible] = useState(false)
  const calculateTotalPrice = () => {
    let acc = 0
    cartItems.forEach((item) => {
      acc += parseCurrency(item.price_discount)
    })
    return acc
  }

  const handleCopyToClipboard = () => {
    const cartItemsMarkdown = cartItems
      .sort((a, b) => a.publisher.localeCompare(b.publisher))
      .map(
        (item) =>
          `- (${item.publisher}) ${item.name} by ${item.authors} - ${item.price_discount}`
      )
      .join('\n')

    navigator.clipboard.writeText(cartItemsMarkdown)
  }

  return (
    <InstantSearch
      indexName={currentIndex ? currentIndex.uid : ''}
      searchClient={instantMeilisearchClient}
    >
      <Header
        indexes={indexes}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        requireApiKeyToWork={requireApiKeyToWork}
        client={meilisearchJsClient}
        refreshIndexes={getIndexesList}
        isBannerVisible={isApiKeyBannerVisible}
      />
      <Box
        m="0 auto"
        py={4}
        display="flex"
        flexDirection="row"
        fleWrap="wrap"
        mb={4}
      >
        <Button
          type="button"
          onClick={() => {
            setCartVisible(!cartVisible)
          }}
        >
          <FiEye /> <span>Lista de leitura</span>
        </Button>
        <Button type="button" onClick={clearCart}>
          <FiTrash /> <span>Limpar lista</span>
        </Button>
        <Button type="button" onClick={handleCopyToClipboard}>
          <FiClipboard /> <span>Copiar lista como texto</span>
        </Button>
      </Box>
      {cartVisible && (
        <Box m="0 auto" py={4} display="flex" flexDirection="column" mb={4}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: theme.space[3],
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: theme.colors.gray[10],
                  borderBottom: `1px solid ${theme.colors.gray[5]}`,
                }}
              >
                <th
                  style={{
                    padding: theme.space[2],
                    color: theme.colors.gray[4],
                    textAlign: 'left',
                  }}
                >
                  Livro
                </th>
                <th
                  style={{
                    padding: theme.space[2],
                    color: theme.colors.gray[4],
                    textAlign: 'left',
                  }}
                >
                  Preço com desconto
                </th>
                <th
                  style={{
                    padding: theme.space[2],
                    color: theme.colors.gray[4],
                    textAlign: 'center',
                  }}
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {[...cartItems]
                .sort((a, b) => a.publisher.localeCompare(b.publisher))
                .map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: `1px solid ${theme.colors.gray[5]}`,
                    }}
                  >
                    <td
                      style={{
                        padding: theme.space[2],
                        color: theme.colors.gray[3],
                      }}
                    >
                      <b style={{ color: theme.colors.main.default }}>
                        ({item.publisher})
                      </b>{' '}
                      {item.name} de {item.authors}
                    </td>
                    <td style={{ padding: theme.space[2] }}>
                      {item.price_discount}
                    </td>
                    <td
                      style={{ padding: theme.space[2], textAlign: 'center' }}
                    >
                      <Button
                        type="button"
                        onClick={() => removeItemFromCart(item)}
                      >
                        <FiXCircle />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h2
            style={{
              textAlign: 'right',
              marginTop: theme.space[3],
            }}
          >
            Total: R${calculateTotalPrice()}
          </h2>
          <h2
            style={{
              textAlign: 'right',
              marginTop: theme.space[3],
            }}
          >
            {' '}
            Livros: {cartItems.length}
          </h2>
        </Box>
      )}
      <BodyWrapper>
        <Box
          width={928}
          m="0 auto"
          py={4}
          display="flex"
          flexDirection="column"
        >
          <IndexContent currentIndex={currentIndex} />
        </Box>
      </BodyWrapper>
    </InstantSearch>
  )
}

export default Body
