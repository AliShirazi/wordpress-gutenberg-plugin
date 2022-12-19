/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import { ColorPicker, PanelBody, ToggleControl, SelectControl } from '@wordpress/components'

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'

import { useSelect } from '@wordpress/data'

// MD5 Hash Library used for retrieving gravatar url
const md5 = require('md5')

/**
 * Retrieve the eligible users (author, editor, administrator) that can be selected
 * in the block. The SelectControl in the Editor will populate off these values.
 * @returns An array of objects.
 */
export function retrieveEligibleUsers () {
  // Send request to Wordpress REST API for eligible users.
  const data = useSelect((select) => {
    return select('core').getEntityRecords('root', 'user', { roles: ['author', 'editor', 'administrator'] })
  })

  // Has the request resolved?
  const isLoading = useSelect((select) => {
    return select('core/data').isResolving('core', 'getEntityRecords', [
      'root', 'user', { roles: ['author', 'editor', 'administrator'] }
    ])
  })

  // Show the loading state if we're still waiting.
  if (isLoading) {
    return { value: '', label: 'Loading Users' }
  }

  // If data found, parse and build array that contains the values needed for SelectControl
  if (data) {
    const options = [{ value: '', label: 'Select a User' }]
    data.forEach((user) => { // simple foreach loop
      options.push({ value: user.id, label: user.username + ': ' + user.name })
    })
    return options
    // Otherwise return eligible users not found
  } else {
    return { value: '', label: 'Eligible Users Not Found' }
  }
}

/**
 * Retrieve the selected user's data from the WordPress database after it has been selected in the
 * SelectControl. The attributes that are then set will be displayed in the block.
 * @param attributes - The attributes of the block.
 * @param setAttributes - Function that allows you to set the attributes of the block.
 */
export function returnSelectedUserData (attributes, setAttributes) {
  // Send request to Wordpress REST API for user data.
  const data = useSelect((select) => {
    if (attributes.selectedUserId) {
      return select('core').getEntityRecord('root', 'user', attributes.selectedUserId)
    }
  })

  // Has the request resolved?
  const isLoading = useSelect((select) => {
    return select('core/data').isResolving('core', 'getEntityRecord', [
      'root', 'user', attributes.selectedUserId])
  })

  // Show the loading state if we're still waiting.
  if (isLoading) {
    setAttributes({ userGravatarUrl: 'http://www.gravatar.com/avatar/?d=mp', userBio: 'Loading Data', userName: 'Loading Data' })
    return
  }

  // If data found, parse returned values that match to user attributes
  if (data) {
    setAttributes({ userGravatarUrl: 'http://www.gravatar.com/avatar/' + md5(data.email), userBio: data.description, userName: data.username })
    // Otherwise ask for another user to be selected. This also allows the appropiate message to be displayed when a user has not been selected yet.
  } else {
    setAttributes({ userGravatarUrl: 'http://www.gravatar.com/avatar/?d=mp', userBio: 'Select A User', userName: 'Select A User' })
  }
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param attributes - The attributes of the block.
 * @param setAttributes - Function that allows you to set the attributes of the block.
 *
 * @return {WPElement} Element to render.
 */

export default function Edit ({ attributes, setAttributes }) {
  const blockProps = useBlockProps()
  // Retrieve the User Data
  returnSelectedUserData(attributes, setAttributes)
  // Set the style for the block based on values that can be set in the ColorPicker panel settings.
  const divStyle = {
    color: attributes.textColor,
    backgroundColor: attributes.backgroundColor
  }
  // Render
  return (
        <div {...blockProps} style={divStyle}>
            {/* Build out the Settings in the Editor Mode using InspectorControls */}
            <InspectorControls>
                <PanelBody title="User">
                    <SelectControl
                        label='Select A User'
                        options={retrieveEligibleUsers()}
                        value={attributes.selectedUserId}
                        onChange={val => setAttributes({ selectedUserId: val })}

                    />
                    <ToggleControl
                        label="Gravatar"
                        help={
                            attributes.displayGravatar
                              ? 'Display Gravatar.'
                              : 'Hide Gravatar.'
                        }
                        checked={attributes.displayGravatar}
                        onChange={(val) => setAttributes({ displayGravatar: val })}
                    />
                    <ToggleControl
                        label="UserName"
                        help={
                            attributes.displayUserName
                              ? 'Display UserName.'
                              : 'Hide UserName.'
                        }
                        checked={attributes.displayUserName}
                        onChange={(val) => setAttributes({ displayUserName: val })}
                    />
                    <ToggleControl
                        label="Bio/Description"
                        help={
                            attributes.displayBio
                              ? 'Display Bio/Description.'
                              : 'Hide Bio/Description.'
                        }
                        checked={attributes.displayBio}
                        onChange={(val) => setAttributes({ displayBio: val })}
                    />
                </PanelBody>
                <PanelBody title="Colors" initialOpen={false}>
                    <h3>Text Color</h3>
                    <ColorPicker
                        color={attributes.textColor}
                        onChange={val => setAttributes({ textColor: val })}
                    />
                    <h3>Background Color</h3>
                    <ColorPicker
                        color={attributes.backgroundColor}
                        onChange={val => setAttributes({ backgroundColor: val })}
                    />
                </PanelBody>
            </InspectorControls>
            {/* Attributes will only be shown in the block based on the
            ToggleControl values set in the Settings Bar. */}
            <div className='block-section'>
                {attributes.displayGravatar &&
                    <img src={attributes.userGravatarUrl} />
                }
            </div>
            <div className='block-section'>
                {attributes.displayUserName &&
                    <p>{attributes.userName}</p>
                }
            </div>
            <div className='block-section'>
                {attributes.displayBio &&
                    <p>{attributes.userBio}</p>
                }
            </div>
        </div>
  )
}
