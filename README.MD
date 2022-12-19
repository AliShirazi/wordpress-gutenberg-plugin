

A Gutenberg WordPress block to display user data for authors, editors, and administrators. 

Developed in Wordpress: 6.1

License URI: [GNU](https://www.gnu.org/licenses/gpl-2.0.html)


## Description

The user data is limited to gravatar(obtained through email), username, and bio/description. These data fields can be toggled on and off individually. Background color and text color can be specified as well.

The styling for the block width is set to auto based on the theme/container. Screens above 576px will have a set block width at 500px;

For backwards compatibility, if this section is missing, the full length of the short description will be used, and
Markdown parsed.

## Installation

1. Run the following through the command line when inside the root plugin directory. 

```bash
npm install
```

followed by

```bash
npm run build
```

2. Upload the plugin files to the `/wp-content/plugins/` directory.

3. Activate the plugin through the 'Plugins' screen in WordPress. The block will be called "User Info Display" 
and available under the "Media" category of Gutenberg blocks in the editor.

## Code Styling
Run in root directory
```bash
npm run lint:js
```
## Testing

The tests are specified in the specs folder in the project root. 
They are built on the e2e-test-utils library. https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils/

The recommended WordPress way to setup the testing environment is to run a Wordpress docker container. Follow the instructions here:

[https://developer.wordpress.org/block-editor/getting-started/devenv/](https://developer.wordpress.org/block-editor/getting-started/devenv/)

The container will run two instances of Wordpress, one for development and the other for testing. The files used for the Docker container will be stored in your '~/.wp-env' directory. 

1. Copy over the project root to the '/wp-content/plugins' directory for the testing instance(tests-WordPress). Follow the Installation section above.

2. Navigate in the command terminal to the project root in the plugins directory. Enter the following:

```bash
npm run test:e2e -- -u --puppeteer-interactive
```

The puppeteer-interactive part of the command will allow you to see the testing. It uses Chromium to navigate to the WordPress Test Installation (default port:8889)

## Screenshots

These can be found in the assets directory. Descriptions below:

1. Example of User Info Display Block in Editor View.

## Changelog

= 0.1.0 =
* Initial MVP Release
