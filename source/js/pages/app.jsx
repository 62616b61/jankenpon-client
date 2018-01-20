import React from 'react'
import { Flex, Box } from 'reflexbox'

import '../../style/index.global.css'

const Root = (props) => {
  return (
    <Flex justify='center'>
      <Box w={2 / 3}>
        <p>Home</p>
      </Box>
    </Flex>
  )
}

export default Root
