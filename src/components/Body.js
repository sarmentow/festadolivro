import React from 'react'
import { InstantSearch } from 'react-instantsearch-dom'

import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import Box from 'components/Box'
import Header from 'components/Header/index'
import BodyWrapper from 'components/BodyWrapper'
import EmptyView from 'components/EmptyView'
import OnBoarding from 'components/OnBoarding'
import Results from 'components/Results'
import Typography from 'components/Typography'

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
      <BodyWrapper>
        {/* <Sidebar /> */}
        <Box
          width={928}
          m="0 auto"
          py={4}
          pt={100}
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
