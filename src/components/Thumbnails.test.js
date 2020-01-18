import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup, render} from '@testing-library/react'
import Thumbnails from './Thumbnails'
import fileData from '../test-data/source-filesystem-file-data'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Thumbnails', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Thumbnails path='/level-one' data={fileData} currentPage={1} 
        baseUrl='/' />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('displays the correct number of thumbnail images', () => {
    const {getAllByTestId} = render(
      <Thumbnails path='/level-one/level-two/level-three' data={fileData} 
        currentPage={2} baseUrl='/' />
    )
    expect(getAllByTestId('file').length).toBe(17)
  })

})