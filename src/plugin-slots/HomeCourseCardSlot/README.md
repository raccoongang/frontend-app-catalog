# Home Courses List Slot

### Slot ID: `org.openedx.frontend.catalog.home_page.home_course_card`

### Slot ID Aliases
* `home_page_course_card_slot`

## Description

This slot is used to replace/modify/hide the entire home page course card.

## Examples

### Default content
![Home page course card with default content](./images/screenshot_default.png)

### Replaced with custom component
![🦶 in Home page course card slot](./images/screenshot_custom.png)

The following `env.config.tsx` will replace the course card entirely (in this case with a centered 🗺️ `h1`)

```tsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.catalog.home_page.home_course_card': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_home_course_card_component',
            type: DIRECT_PLUGIN,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>Home Course Card</h1>
            ),
          },
        },
      ]
    }
  },
}

export default config;
```
