/* eslint-disable react/react-in-jsx-scope */
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor'

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *.
 * @param attributes - The attributes of the block.
 * @return {WPElement} Element to render.
 */
export default function save ({ attributes }) {
  const blockProps = useBlockProps.save()
  // Set the style for the block based on values that can be set in the ColorPicker panel settings.
  const divStyle = {
    color: attributes.textColor,
    backgroundColor: attributes.backgroundColor
  }
  // Render
  // Attributes will only be shown in the block based on the
  // ToggleControl values set in the Settings Bar.
  return (
		<div {...blockProps} style={divStyle}>
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
