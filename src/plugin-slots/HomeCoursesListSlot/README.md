# Home Courses List Slot

### Slot ID: `org.openedx.frontend.catalog.home_page.home_courses_list`

### Slot ID Aliases
* `home_page_courses_list_slot`

## Description

This slot is used to replace/modify/hide the entire home page courses list.

## Examples

### Default content
![Home page courses list with default content](./images/screenshot_default.png)

### Replaced with custom component
![🦶 in Home page courses list slot](./images/screenshot_custom.png)

The following `env.config.tsx` will replace the home page courses list entirely (in this case with a centered 🗺️ `h1`)

```tsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.catalog.home_page.home_courses_list': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_home_courses_list_component',
            type: DIRECT_PLUGIN,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>Home Courses List</h1>
            ),
          },
        },
      ]
    }
  },
}

export default config;
```
