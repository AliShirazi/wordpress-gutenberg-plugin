import {
  enablePageDialogAccept,
  createNewPost,
  getEditedPostContent,
  insertBlock
} from '@wordpress/e2e-test-utils'

describe('User Gutenberg Block', () => {
  beforeAll(async () => {
    await enablePageDialogAccept()
  })
  beforeEach(async () => {
    await createNewPost()
  })

  it('User Info Display Block successfully added to page', async () => {
    await insertBlock('User Info Display')
    // Check if block was inserted
    expect(await page.$('[data-type="wp-engine/gutenberg"]')).not.toBeNull()
    expect(await getEditedPostContent()).toMatchSnapshot()
  })
})
