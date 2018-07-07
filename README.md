# UI3kitify Theme
UI3kitify Theme template based on [UIkit v3] (https://getuikit.com/) Theme UI3kit template for [OctoberCMS](https://octobercms.com/) sites.

Includes:
- latest UIkit v3 (beta) [source from official repository](https://github.com/uikit/uikit)
- [GulpJS-based build system](https://nystudio107.com/blog/a-gulp-workflow-for-frontend-development-automation) for development and production
- [NPM-based config system](https://nystudio107.com/blog/a-better-package-json-for-the-frontend) for development and production


## Installation
Add the theme to existing project while logged into OctoberCMS account online,
or interactively by searching it inside Settings/System/Updates/Themes in backend,
or with the following command-line instructions inside *project root*:
```
php artisan theme:install castus.ui3kit ui3kit
php artisan theme:use ui3kit
```
## Customizing UIkit
Global framework/theme styling parameters are overridable in the following SCSS files:
- [assets/scss/uikit3 SCSS](https://github.com/Eoler/oc-ui3kit-theme/blob/master/assets/scss/uikit3.scss)
- [assets/scss/uikit3themed SCSS](https://github.com/Eoler/oc-ui3kit-theme/blob/master/assets/scss/uikit3themed.scss)
Just copy definitions from base variables/mixins (don't forget to remove !default from variables).  

Comment out unwanted components/theming for leaner and faster UIkit custom build:
- [assets/scss/_components-import SCSS](https://github.com/Eoler/oc-ui3kit-theme/blob/master/assets/scss/_components-import.scss)
- [assets/es6/_theme-import SCSS](https://github.com/Eoler/oc-ui3kit-theme/blob/master/assets/scss/_theme-import.scss)

For in-depth customizations and optimizations follow the [SASS docs](https://getuikit.com/docs/sass).
