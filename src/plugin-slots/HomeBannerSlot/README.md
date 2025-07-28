# Home Banner Slot

### Slot ID: `org.openedx.frontend.catalog.home_page.home_banner`

### Slot ID Aliases
* `home_page_banner_slot`

## Description

This slot is used to replace/modify/hide the entire home page banner.

## Examples

### Default content
![Home page banner slot with default content](./images/screenshot_default.png)

### Replaced with custom component
![🦶 in Home page banner slot](./images/screenshot_custom.png)

The following `env.config.tsx` will replace the home banner entirely (in this case with a centered `h1` tag)

```tsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.catalog.home_page.home_banner': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_home_banner_component',
            type: DIRECT_PLUGIN,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>Home banner</h1>
            ),
          },
        },
      ]
    }
  },
}

export default config;
```
